import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/context.js';

@Controller()
export class HealthController {
  @Public()
  @Get('saude')
  health() {
    return { estado: 'ok', servico: 'muntu-api', versao: 'v1' };
  }
}
