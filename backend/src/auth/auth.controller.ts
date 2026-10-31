import { Body, Controller, Get, Headers, HttpCode, Inject, Post } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { z } from 'zod';
import { parse, phone, uuid } from '../common/zod.js';
import { DATABASE, type Database } from '../db/database.js';
import { branches } from '../db/schema.js';
import { AuthService } from './auth.service.js';
import { Ctx, Public, Roles, type AuthCtx } from './context.js';

const password = z.string().min(6, 'A senha tem pelo menos 6 caracteres.').max(128);

const RegisterGym = z.object({
  dono: z.object({ nome: z.string().trim().min(2), telefone: phone, senha: password }),
  ginasio: z.object({ nome: z.string().trim().min(2), nif: z.string().trim().optional(), cidade: z.string().trim().optional(), filiais: z.array(z.string().trim().min(2)).min(1).max(50) }),
});
const Login = z.object({ telefone: phone, senha: z.string().min(1), organizacaoId: uuid.optional() });
const Refresh = z.object({ refreshToken: z.string().min(20), organizacaoId: uuid.optional() });
const Invite = z.object({ nome: z.string().trim().min(2), telefone: phone, perfil: z.enum(['gerente', 'rececao', 'financas', 'pt', 'vigilante']), filiais: z.array(uuid).nullable().default(null) });
const ChangePassword = z.object({ actual: z.string().min(1), nova: password });

@Controller()
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    @Inject(DATABASE) private readonly database: Database,
  ) {}

  @Public()
  @Post('auth/registar-ginasio')
  register(@Body() body: unknown, @Headers('user-agent') device?: string) {
    const b = parse(RegisterGym, body);
    return this.auth.registerGym({ owner: { name: b.dono.nome, phone: b.dono.telefone, password: b.dono.senha }, gym: { name: b.ginasio.nome, nif: b.ginasio.nif, city: b.ginasio.cidade, branches: b.ginasio.filiais } }, device);
  }

  @Public()
  @HttpCode(200)
  @Post('auth/entrar')
  login(@Body() body: unknown, @Headers('user-agent') device?: string) {
    const b = parse(Login, body);
    return this.auth.login(b.telefone, b.senha, b.organizacaoId, device);
  }

  @Public()
  @HttpCode(200)
  @Post('auth/renovar')
  refresh(@Body() body: unknown, @Headers('user-agent') device?: string) {
    return this.auth.refresh(parse(Refresh, body).refreshToken, device);
  }

  @Public()
  @HttpCode(204)
  @Post('auth/sair')
  async logout(@Body() body: unknown) {
    await this.auth.logout(parse(Refresh, body).refreshToken);
  }

  @HttpCode(204)
  @Post('auth/senha')
  async changePassword(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(ChangePassword, body);
    await this.auth.changePassword(ctx.userId, b.actual, b.nova);
  }

  @Get('auth/eu')
  me(@Ctx() ctx: AuthCtx) {
    return ctx;
  }

  @Roles('gerente')
  @Post('equipa')
  invite(@Ctx() ctx: AuthCtx, @Body() body: unknown) {
    const b = parse(Invite, body);
    return this.auth.inviteStaff(ctx, { name: b.nome, phone: b.telefone, role: b.perfil, branchIds: b.filiais });
  }

  @Get('filiais')
  listBranches(@Ctx() ctx: AuthCtx) {
    return this.database.withOrg(ctx, (tx) => tx.select().from(branches).where(eq(branches.orgId, ctx.orgId)));
  }
}
