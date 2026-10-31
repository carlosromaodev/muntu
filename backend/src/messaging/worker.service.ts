import { Inject, Injectable, Logger, type OnApplicationBootstrap, type OnApplicationShutdown } from '@nestjs/common';
import { ENV, type Env } from '../config/env.js';
import { DispatcherService } from './dispatcher.service.js';
import { RemindersService } from './reminders.service.js';

/**
 * Processo agendado dentro da API: a cada WORKER_INTERVAL_SECONDS gera os
 * lembretes do dia e envia o outbox. Desligado nos testes (chamam runOnce).
 * Com várias instâncias da API, ligar só numa (WORKER_ENABLED=true) ou usar
 * um processo à parte; os envios são idempotentes em qualquer caso.
 */
@Injectable()
export class WorkerService implements OnApplicationBootstrap, OnApplicationShutdown {
  private readonly log = new Logger('Agendador');
  private timer: NodeJS.Timeout | null = null;
  private busy = false;

  constructor(
    @Inject(ENV) private readonly env: Env,
    private readonly dispatcher: DispatcherService,
    private readonly reminders: RemindersService,
  ) {}

  onApplicationBootstrap() {
    if (!this.env.WORKER_ENABLED) return;
    this.timer = setInterval(() => void this.tick(), this.env.WORKER_INTERVAL_SECONDS * 1000);
    this.timer.unref();
    void this.tick();
  }

  onApplicationShutdown() {
    if (this.timer) clearInterval(this.timer);
  }

  async tick() {
    if (this.busy) return;
    this.busy = true;
    try {
      const r = await this.reminders.runOnce();
      const d = await this.dispatcher.runOnce();
      if (r || d.enviadas || d.falhadas) this.log.log(`lembretes ${r} · enviadas ${d.enviadas} · a repetir/falhadas ${d.falhadas} · canceladas ${d.canceladas}`);
    } catch (e) {
      this.log.error(`Falha no agendador: ${(e as Error).message}`);
    } finally {
      this.busy = false;
    }
  }
}
