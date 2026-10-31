import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { ZodError } from 'zod';
import { DomainError } from './errors.js';

/** Converte qualquer erro na forma { code, message, details } com mensagem em português. */
@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly log = new Logger('Erro');

  catch(err: unknown, host: ArgumentsHost) {
    const reply = host.switchToHttp().getResponse<FastifyReply>();
    if (err instanceof DomainError) {
      return reply.status(err.status).send({ code: err.code, message: err.message, details: err.details });
    }
    if (err instanceof ZodError) {
      return reply.status(400).send({
        code: 'DADOS_INVALIDOS',
        message: 'Há campos por preencher ou com valores inválidos.',
        details: { campos: err.issues.map((i) => ({ campo: i.path.join('.'), problema: i.message })) },
      });
    }
    if (err instanceof HttpException) {
      const status = err.getStatus();
      const msg = status === 404 ? 'Endereço não encontrado.' : status === 401 ? 'Sessão inválida ou expirada. Entre de novo.' : 'Pedido inválido.';
      return reply.status(status).send({ code: status === 401 ? 'SESSAO_INVALIDA' : 'PEDIDO_INVALIDO', message: msg });
    }
    // Erros do PostgreSQL que correspondem a regras de negócio.
    // O Drizzle embrulha o erro do PostgreSQL em `cause`.
    const raw = err as { code?: string; message?: string; cause?: { code?: string; message?: string } };
    const pg = raw?.cause?.code ? raw.cause : raw;
    if (pg?.code === 'P0001' && pg.message?.includes('imutável')) {
      return reply.status(409).send({ code: 'REGISTO_IMUTAVEL', message: 'Este registo não se altera nem se apaga. Use um estorno.' });
    }
    if (pg?.code === '23505') {
      return reply.status(409).send({ code: 'DUPLICADO', message: 'Já existe um registo com estes dados.' });
    }
    this.log.error(err instanceof Error ? err.stack : String(err));
    return reply.status(500).send({ code: 'ERRO_INTERNO', message: 'Algo correu mal do nosso lado. Tente de novo.' });
  }
}
