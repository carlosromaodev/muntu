import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { FastifyRequest } from 'fastify';
import { Clock } from '../common/clock.js';
import { DomainError, forbidden } from '../common/errors.js';
import { ENV, type Env } from '../config/env.js';
import { PUBLIC, ROLES, type Role } from './context.js';
import { verifyAccess } from './tokens.js';

/** Valida o token de acesso e o perfil exigido pelo endpoint (RNF-02). */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(ENV) private readonly env: Env,
    private readonly clock: Clock,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const targets = [context.getHandler(), context.getClass()];
    if (this.reflector.getAllAndOverride<boolean>(PUBLIC, targets)) return true;
    const req = context.switchToHttp().getRequest<FastifyRequest>();
    const auth = req.headers.authorization ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
    const claims = token ? verifyAccess(token, this.env.JWT_SECRET, this.clock.now().getTime()) : null;
    if (!claims) throw new DomainError('SESSAO_INVALIDA', 'Sessão inválida ou expirada. Entre de novo.', 401);
    req.ctx = { userId: claims.sub, orgId: claims.org, roles: claims.roles, branchIds: claims.br, memberId: claims.mem };
    const roles = this.reflector.getAllAndOverride<Role[] | undefined>(ROLES, targets);
    if (roles?.length && !claims.roles.includes('dono') && !roles.some((r) => claims.roles.includes(r))) throw forbidden();
    return true;
  }
}
