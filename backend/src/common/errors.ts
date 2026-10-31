/**
 * Erro de negócio com código estável (para as apps) e mensagem em português
 * (para mostrar ao utilizador). Nunca expor códigos internos ao utilizador.
 */
export class DomainError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status = 400,
    readonly details?: Record<string, unknown>,
  ) {
    super(message);
  }
}

export const notFound = (what: string) => new DomainError('NAO_ENCONTRADO', `${what} não encontrado.`, 404);
export const forbidden = (message = 'Não tem permissão para esta acção.') => new DomainError('SEM_PERMISSAO', message, 403);
export const conflict = (code: string, message: string, details?: Record<string, unknown>) => new DomainError(code, message, 409, details);
