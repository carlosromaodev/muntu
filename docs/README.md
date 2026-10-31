# Documentação do MUNTU

Software de gestão de ginásios para Angola: "cada pessoa, cada entrada, cada kwanza com dono".

## Como está organizada

| Documento | Para quê |
|---|---|
| [requisitos/01-visao-actores-e-ambito.md](requisitos/01-visao-actores-e-ambito.md) | Visão, princípios, perfis e o que entra em cada fase |
| [requisitos/02-requisitos-funcionais.md](requisitos/02-requisitos-funcionais.md) | O que o sistema faz, módulo a módulo (RF) |
| [requisitos/03-requisitos-nao-funcionais.md](requisitos/03-requisitos-nao-funcionais.md) | Como o sistema se comporta: segurança, desempenho, sem rede, lei (RNF) |
| [requisitos/04-regras-de-negocio.md](requisitos/04-regras-de-negocio.md) | As regras que o servidor faz cumprir (RN) |
| [requisitos/05-glossario.md](requisitos/05-glossario.md) | Termos do domínio |
| [requisitos/06-questoes-em-aberto.md](requisitos/06-questoes-em-aberto.md) | Decisões por tomar |
| [arquitectura/backend.md](arquitectura/backend.md) | Arquitectura do servidor, módulos e dados |
| [arquitectura/adr/](arquitectura/adr/) | Decisões de arquitectura registadas (ADR) |

## Convenções

- **Identificadores.** `RF-CAI-03` = requisito funcional 3 do módulo Caixa; `RNF-07` = requisito não funcional 7; `RN-12` = regra de negócio 12. Os identificadores não se reutilizam: um requisito retirado fica marcado como *Retirado*.
- **Prioridade (MoSCoW).** **M** obrigatório no MVP · **S** deve ter · **C** pode ter · **W** fica para depois.
- **Fase.** 1 MVP (um ginásio) · 2 operação completa · 3 multi-filial · 4 Rede MUNTU. Ver [visão](requisitos/01-visao-actores-e-ambito.md#fases).
- **Origem.** Cada requisito aponta para o brief de produto (`brief`) ou para o ecrã do protótipo que o mostra (`m4`, `d4`, `t1`…), em `design/MUNTU Prototipo Mobile.dc.html` e `design/MUNTU Prototipo Web.dc.html`.
- **Fonte de verdade.** As regras de negócio vivem no servidor. As apps mostram e pedem; o servidor decide.

## Fontes

- Brief de Produto e Design (26 Out 2026).
- Protótipos mobile e web (pasta `design/`).
- Descrição do projecto MUNTU (claude.ai).
