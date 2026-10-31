# 4. Regras de negócio

As regras vivem no servidor. Valores entre parênteses são o **valor por omissão**, configurável pelo dono em *Gestão → Regras*.

## Acesso e subscrições

| ID | Regra |
|---|---|
| RN-01 | **Nenhum acesso sem pagamento.** Uma subscrição só fica activa com pagamento confirmado ou com aprovação explícita (pedido "activar sem pagamento"). |
| RN-02 | Estado do membro, calculado a partir da subscrição: **pago** (activa e dentro do período) · **a vencer** (vence nos próximos 5 dias) · **em dívida** (venceu, dentro da tolerância) · **bloqueado** (passou a tolerância) · **congelado**. |
| RN-03 | Tolerância antes de bloquear: (7 dias) depois do vencimento. Durante a tolerância o membro entra com aviso; depois, a entrada é recusada com motivo. |
| RN-04 | O acesso valida, por esta ordem: identidade (QR válido e não expirado), estado, âmbito do plano (filial), horário do plano, anti-passback, lotação máxima. O primeiro que falhar dá o motivo mostrado. |
| RN-05 | **QR dinâmico** muda a cada 30 s; um QR fora da janela (30 s + 30 s de tolerância de relógio) é recusado. |
| RN-06 | **Anti-passback:** o mesmo membro não entra duas vezes seguidas (sem saída ou sem passar o intervalo mínimo de 5 min) nem em duas filiais ao mesmo tempo. |
| RN-07 | Âmbito dos planos: **local** só na filial de inscrição; **rede** em todas as filiais da organização; **híbrido** filial base + (4) entradas/mês noutras; **por zona/horário** só na zona e no horário definidos. |
| RN-08 | Entrada manual pela recepção exige motivo e fica marcada como manual; entrada manual de membro bloqueado é um pedido de aprovação. |
| RN-09 | Teste grátis: (1) por pessoa, verificado por BI **e** telefone; duração fixa (7 dias). Um segundo teste para o mesmo BI ou telefone é recusado. |
| RN-10 | Congelamento: até (30) dias por ano civil; o período de congelamento estende a data de fim. Reactivação automática no fim, com aviso (1) dia antes. |

## Dinheiro, caixa e estornos

| ID | Regra |
|---|---|
| RN-11 | **Nada se apaga.** Não existe eliminar movimento, pagamento, factura nem registo de acesso. Corrige-se com **estorno**: movimento inverso, motivo obrigatório, ligado ao original, sujeito a aprovação. |
| RN-12 | Todo o movimento de caixa tem origem (membro, subscrição, venda, despesa, sangria, reforço, abertura), meio, valor em cêntimos, operador, filial, turno e hora do servidor. |
| RN-13 | **Fecho cego.** Quem fecha ou recebe o caixa conta sem ver o valor esperado. O esperado = fundo inicial + entradas em dinheiro − reembolsos − saídas autorizadas. Só depois de submeter a contagem a diferença é revelada. |
| RN-14 | Diferença ≠ 0 exige escolha (recontar, registar com ressalva ou pedir revisão) e justificação (≥ 5 caracteres). A diferença **não prova** culpa: fica associada ao turno, nunca descontada automaticamente. |
| RN-15 | A contagem aceita notas (5 000, 2 000, 1 000, 500, 200), moedas (100, 50, 20, 10, 5, 1) e um valor avulso com cêntimos (ex.: `12 434,50`). |
| RN-16 | Meios electrónicos conferem-se por meio: valor contado (fecho do TPA, extracto Express/referência, comprovativo de transferência) vs. valor no sistema. Igual → *conferido*; diferente → *problema*. Pagamentos *por confirmar* não contam como dinheiro em caixa. |
| RN-17 | Um caixa fechado não reabre sem aprovação do dono. |
| RN-18 | Movimentos com data passada exigem aprovação do dono. Datas futuras não são permitidas. |
| RN-19 | Despesas acima de (5 000 Kz) exigem foto do comprovativo. |

## Descontos, preços e aprovações

| ID | Regra |
|---|---|
| RN-20 | Limites de desconto por nível: recepção até (10%), gestor até (25%), acima disso só o dono. Cada plano tem também um desconto máximo próprio; aplica-se o menor. |
| RN-21 | Estornos: a recepção pede, **nunca aprova**. Finanças aprova até (0 Kz = nenhum); acima disso, o dono. |
| RN-22 | Despesas: finanças até (20 000 Kz); acima disso, o dono. |
| RN-23 | Alteração do preço de um plano com membros activos: só o dono aprova; os membros recebem SMS (30) dias antes; o novo preço aplica-se a partir da renovação seguinte. |
| RN-24 | Sempre exigem aprovação: activar subscrição sem pagamento, plano gratuito fora do teste oficial, desconto acima do limite, estorno, movimento com data passada, reabertura de caixa fechado, alteração de preço com membros activos, entrada manual de membro bloqueado. |
| RN-40 | A acção pedida fica **suspensa** até à decisão: aprovada → executa e regista quem aprovou; recusada → não produz efeito, com motivo. Ninguém aprova o próprio pedido. |
| RN-41 | Aprovar exige confirmação recente (biometria/PIN, ≤ 5 min). Pedidos sem decisão em (48 h) expiram. |

## Facturação

| ID | Regra |
|---|---|
| RN-30 | Numeração por **tipo + série + ano** (ex.: `FR TAL2026/1202`), sequencial e sem falhas; a série identifica a filial. Um número atribuído nunca é reutilizado. |
| RN-31 | Factura emitida não se edita nem se apaga; corrige-se com **nota de crédito** com motivo. |
| RN-32 | Pagamento confirmado → **factura-recibo (FR)**. Valor a cobrar (ex.: inscrição pendente) → **factura (FT)**, liquidada depois por recibo. |
| RN-33 | Cada documento guarda o hash do documento anterior da mesma série (cadeia) e o código de validação da AGT quando comunicado. |
| RN-34 | Emissão até 5 dias úteis depois da operação; envio ao cliente por ligação (SMS/WhatsApp). |

## Turnos e passagem de turno

| ID | Regra |
|---|---|
| RN-50 | Regime de turnos por filial: (2 turnos · manhã 06–14 · tarde 14–22) ou "dia". |
| RN-51 | A recepção do turno seguinte só abre o painel depois de **receber o turno**: conferir dinheiro, pagamentos e pendências, e assinar com a senha. |
| RN-52 | A conferência regista divergências **sem alterar** os dados do turno anterior. |
| RN-53 | Receber sem o colega presente é excepção: motivo obrigatório, fica marcado e o gestor é avisado. |
| RN-54 | Pendências recebidas passam a ter como responsável quem recebeu o turno. |
| RN-55 | O progresso da conferência é guardado; pode ser retomado no mesmo dispositivo ou noutro. |

## Ocorrências

| ID | Regra |
|---|---|
| RN-60 | Ocorrência com urgência **alta** ou com alguém magoado é urgente: avisa de imediato a recepção e o gestor da filial. |
| RN-61 | Campos obrigatórios: tipo, zona e descrição com 10 a 400 caracteres. Equipamento obrigatório quando o tipo é "Equipamento". |
| RN-62 | Identificador sequencial por organização (`OC-0142`). Estados: recebida → em análise → resolvida. |
| RN-63 | Membro responde em até (24 h); recebe SMS quando o estado muda. Ocorrência anónima não guarda o autor visível à equipa (guarda-se só para auditoria do dono). |
| RN-64 | Ocorrências da equipa ficam nas pendências até serem resolvidas. |

## Aulas, PT e actividades

| ID | Regra |
|---|---|
| RN-70 | Lista de espera: ao vagar um lugar, oferece-se ao primeiro da fila, que tem (15 min) para aceitar; se passar ou recusar, oferece-se ao seguinte. |
| RN-71 | Sessão de PT conta como feita só quando o PT marca presença; sessões pagas e não dadas no período contam como receita em risco. |
| RN-72 | Actividades propostas pela equipa só são publicadas depois de aprovadas pelo dono. |
| RN-73 | O PT só vê os seus alunos e nunca os pagamentos. |

## Comunicação

| ID | Regra |
|---|---|
| RN-75 | Lembretes de pagamento: (3 dias antes), no dia, (3 dias depois) em atraso e no bloqueio (7 dias depois). Cada lembrete envia-se uma vez por subscrição e período. |
| RN-76 | Mensagens a membros usam modelos com variáveis (`{nome}`, `{valor}`, `{data}`, `{referencia}`, `{ginasio}`); o membro pode recusar mensagens promocionais, nunca as de serviço (pagamento, bloqueio). |

## Indicações

| ID | Regra |
|---|---|
| RN-80 | A recompensa da indicação liberta-se depois de o indicado pagar (2) mensalidades. Indicações suspeitas (mesmo telefone/BI/dispositivo) vão para validação do dono. |

## Marca

| ID | Regra |
|---|---|
| RN-85 | Nome na app até 22 caracteres, em maiúsculas. Logotipo PNG/SVG/JPEG até 2 MB. A cor de destaque com contraste < 4,5:1 mostra aviso. A marca só se aplica à app dos membros. |

## Multi-filial e rede (fases 3 e 4)

| ID | Regra |
|---|---|
| RN-90 | Receita partilhada: quando um membro da filial A treina na filial B, a receita fica na origem ou divide-se por utilização, conforme a escolha do dono. |
| RN-91 | Rede MUNTU: preço por visita (1 500 Kz), até (6) visitas por membro por mês, só planos com acesso à rede; o parceiro vê só nome, foto e validade. |
| RN-92 | Liquidação automática no último dia do mês; comissão MUNTU de (5%) do saldo positivo; parceiro com liquidação em atraso fica **suspenso** e as visitas são recusadas. |
