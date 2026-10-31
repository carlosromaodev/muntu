# 2. Requisitos funcionais

Formato: **ID · requisito · prioridade (M/S/C/W) · fase · origem**. As regras que limitam cada função estão em [04-regras-de-negocio.md](04-regras-de-negocio.md) (RN).

---

## AUT · Autenticação e sessão

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-AUT-01 | Entrar com número de telemóvel (9 dígitos, prefixo +244) e senha. | M | 1 | l1, d0 |
| RF-AUT-02 | Recuperar a senha: o dono/recepção repõe e o utilizador recebe uma senha temporária por SMS, válida 24 h e de troca obrigatória. | M | 1 | l1 |
| RF-AUT-03 | Sessão por dispositivo, com terminar sessão e lista de sessões activas (o dono pode terminar as da equipa). | M | 1 | m4, o4 |
| RF-AUT-04 | Confirmar acções sensíveis com biometria do dispositivo (Face ID/impressão digital) ou PIN do gestor quando não há biometria. | M | 1 | brief, o11 |
| RF-AUT-05 | Um utilizador pode ter vários perfis (ex.: PT e membro) e escolher com qual entra. | S | 2 | — |
| RF-AUT-06 | Primeiro acesso do membro por SMS: utilizador = telemóvel, código válido 24 h. | M | 1 | d2 (SMS de credenciais) |

## ORG · Organização, filiais e criação de conta

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-ORG-01 | Criar conta de ginásio em 5 passos: dados do dono → dados do ginásio (nome, NIF, cidade, filiais) → importar dados → confirmar → avisar a equipa e os membros. | M | 1 | a1–a5, dn |
| RF-ORG-02 | Importar membros e funcionários de planilhas (CSV/XLSX), com pré-visualização, erros por linha, fusão de duplicados e relatório final. | M | 1 | a3, o9 |
| RF-ORG-03 | Configurar regras gerais: regime de turnos e horários, tolerância antes de bloquear, congelamento máximo por ano, teste grátis, aviso de mudança de preço. | M | 1 | dg |
| RF-ORG-04 | Abrir nova filial copiando planos, regras e permissões de uma filial existente. | S | 3 | o10, df |
| RF-ORG-05 | Selector de filial (uma filial ou "todas") em todos os ecrãs de gestão. | S | 3 | d* barra lateral |

## EQP · Equipa e permissões

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-EQP-01 | Convidar funcionários com perfil, filiais (âmbito) e limites. | M | 1 | o4, de |
| RF-EQP-02 | Ver equipa presente agora (por turno e filial) e estatísticas do mês (horas, assiduidade, sessões de PT). | S | 2 | o3, de, dz |
| RF-EQP-03 | Desactivar um funcionário sem apagar o histórico; as acções dele continuam atribuídas a ele. | M | 1 | P2 |
| RF-EQP-04 | Registar entrada/saída de turno da equipa (ponto). | S | 2 | e2 |

## MEM · Membros

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-MEM-01 | Pesquisa universal por nome, telefone, NIF ou n.º de membro (⌘K no desktop). | M | 1 | m (Membros), d3 |
| RF-MEM-02 | Ficha do membro: estado (semáforo), plano, dias restantes, filial base, filiais acessíveis, histórico de pagamentos, entradas e contactos, acções rápidas (cobrar, renovar, congelar, check-in). | M | 1 | d3 |
| RF-MEM-03 | Filtros por estado (pago, a vencer, em dívida, bloqueado, congelado) e por filial. | M | 1 | d3 |
| RF-MEM-04 | Editar dados pessoais com trilha de alterações (quem, quando, valor antigo e novo). | M | 1 | P2 |
| RF-MEM-05 | Exportar a lista de membros. | S | 1 | P7 |
| RF-MEM-06 | Transferir um membro entre filiais preservando o histórico. | S | 3 | brief |

## PLA · Planos e subscrições

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-PLA-01 | Criar e editar planos: nome, preço, periodicidade (mensal, trimestral, anual), âmbito (local, rede, híbrido com N entradas/mês noutras filiais, por zona ou horário), horário permitido, desconto máximo. | M | 1 | d7, dp |
| RF-PLA-02 | Mostrar membros activos por plano; alterar o preço de um plano com membros activos gera aprovação e aviso SMS 30 dias antes. | M | 1 | d7, o5 |
| RF-PLA-03 | Teste grátis oficial: 1 por pessoa, validado por BI e telefone, com duração definida pelo dono. | M | 1 | d2 |
| RF-PLA-04 | Renovar subscrição (manual e automática com lembretes). | M | 1 | m2, brief |
| RF-PLA-05 | Congelar plano até ao máximo anual definido; reactivação automática com aviso na véspera. | S | 2 | m4, dg |
| RF-PLA-06 | Trocar de plano com cálculo proporcional. | S | 2 | brief |

## INS · Inscrição (fluxo único)

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-INS-01 | Inscrever em 4 passos: cliente → plano → pagamento → acesso, com barra de progresso, em menos de 40 s. | M | 1 | m (Inscrever), d2 |
| RF-INS-02 | Detectar duplicados por telefone, BI e NIF antes de criar. | M | 1 | d2 |
| RF-INS-03 | Ler o BI pela câmara (OCR) para preencher nome, data de nascimento e NIF. | C | 2 | brief |
| RF-INS-04 | Pagar já ou deixar pendente; a subscrição só activa com pagamento confirmado ou aprovação. | M | 1 | d2, RN-01 |
| RF-INS-05 | Enviar boas-vindas (SMS/WhatsApp) com credenciais da app, QR de acesso e factura. | M | 1 | d2 |

## PAG · Pagamentos e cobranças

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-PAG-01 | Receber por dinheiro, TPA, Multicaixa Express (pedido no telemóvel do cliente), referência Multicaixa e transferência. | M | 1 | m (Cobrar), dc |
| RF-PAG-02 | Estados do pagamento: pendente → confirmado / falhado / expirado; confirmação por webhook do agregador ou manual com comprovativo. | M | 1 | m2 |
| RF-PAG-03 | Cobrar a partir do check-in recusado: o membro paga e entra no mesmo fluxo. | M | 1 | m (Entradas) |
| RF-PAG-04 | Lista de cobranças (devedores) com envio de SMS de cobrança individual ou em lote, e registo da entrega. | M | 1 | f2, d9 |
| RF-PAG-05 | Membro paga e renova pela app (Express) e vê o histórico de recibos. | M | 1 | m2, m5 |
| RF-PAG-06 | Desconto no pagamento dentro do limite do perfil; acima disso, pedido de aprovação. | M | 1 | RN-20 |

## FAC · Facturação electrónica (AGT)

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-FAC-01 | Emitir factura-recibo (FR) em cada pagamento confirmado e factura (FT) para valores a cobrar. | M | 1 | m (Cobrar), dc |
| RF-FAC-02 | Séries por filial e por ano, numeração sequencial sem falhas. | M | 1 | brief, RN-30 |
| RF-FAC-03 | Corrigir só por nota de crédito (NC) com motivo; nunca editar nem apagar. | M | 1 | RN-31 |
| RF-FAC-04 | Comunicar as facturas à AGT pelo serviço oficial e guardar o código de validação devolvido. | M | 1 | RNF-30 |
| RF-FAC-05 | Exportar SAF-T (AO) por período. | M | 1 | RNF-30 |
| RF-FAC-06 | Enviar a factura ao cliente por SMS/WhatsApp (ligação) e permitir segunda via. | M | 1 | d2 |

## CAI · Caixa e tesouraria

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-CAI-01 | Livro razão: cada movimento ligado à sua origem (membro, subscrição, venda, despesa), com meio, valor, operador, filial, turno e hora do servidor. | M | 1 | d5 (Tesouraria) |
| RF-CAI-02 | Abrir caixa com fundo de troco. | M | 1 | d4 |
| RF-CAI-03 | Registar sangria (para o cofre), reforço de troco e despesa paga em dinheiro, com motivo. | M | 1 | d4 |
| RF-CAI-04 | Despesas acima de um valor exigem foto do comprovativo. | M | 1 | brief, o11 |
| RF-CAI-05 | Fechar caixa às cegas: contar notas, moedas e valores avulsos (com cêntimos) sem ver o esperado; a diferença só aparece no fim e exige justificação. | M | 1 | d4, t1 |
| RF-CAI-06 | Estornar um movimento: motivo obrigatório, pedido de aprovação, movimento inverso ligado ao original. | M | 1 | d5, RN-11 |
| RF-CAI-07 | Conciliar meios electrónicos (Express, TPA, referência, transferência) com os extractos/fecho do terminal. | M | 1 | d4, t2 |
| RF-CAI-08 | Histórico de turnos e de caixas, por filial e por turno, com diferenças. | M | 1 | d4 (histórico) |
| RF-CAI-09 | Cofre: entradas por sangria e saídas para depósito, com saldo. | S | 2 | d5 |

## TUR · Turnos e passagem de turno

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-TUR-01 | Receber turno em 4 passos: contar dinheiro (às cegas) → conferir outros meios de pagamento (valor contado vs. sistema, por meio) → rever pendências → assinar com senha. | M | 1 | t0–t4, dt |
| RF-TUR-02 | Registar divergência sem apagar os dados do turno anterior; escolher recontar, registar com ressalva ou pedir revisão do responsável. | M | 1 | t1, RN-13 |
| RF-TUR-03 | Receber sem o colega presente (excepção) com motivo obrigatório. | M | 1 | t0 |
| RF-TUR-04 | Passar turno: resumo do turno, pendências que passam, ocorrências registadas. | M | 1 | e3 |
| RF-TUR-05 | O progresso da conferência fica guardado (retomar depois). | M | 1 | t0 |

## PEN · Pendências e tarefas

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-PEN-01 | Pendências por tipo (cobrança, documento, reclamação, reserva, ocorrência), com responsável, origem, prazo e estado. | M | 1 | dq |
| RF-PEN-02 | Pendências passam de turno em turno até serem resolvidas; quem recebe passa a ser responsável. | M | 1 | t3 |
| RF-PEN-03 | Tarefas geradas pelo sistema a partir de sinais combinados (ex.: frequência em queda + renovação próxima + sessões de PT por fazer). | S | 2 | visão |

## APR · Aprovações

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-APR-01 | Pedido de aprovação com quem pede, o quê, quanto e porquê; aprovar ou recusar com biometria num toque. | M | 1 | o2, M5 |
| RF-APR-02 | Regras de aprovação configuráveis por nível: descontos (recepção até X%, gestor até Y%, acima: dono), estornos (finanças até X Kz, acima: dono), despesas (finanças até X Kz), preços (só o dono). | M | 1 | o11 |
| RF-APR-03 | Notificar o aprovador (push) e quem pediu (resultado). | M | 1 | o2 |
| RF-APR-04 | A acção pedida só produz efeito depois de aprovada; recusa com motivo. | M | 1 | RN-40 |
| RF-APR-05 | Histórico de aprovações por pessoa, tipo e valor. | M | 1 | o2 |

## ACE · Acesso e check-in

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-ACE-01 | QR de acesso dinâmico, renovado a cada 30 s, gerado e validado pelo servidor. | M | 1 | m1 |
| RF-ACE-02 | Validar o acesso: estado do plano, horário, filial e anti-passback; resposta "entra" ou "não entra" com o motivo ("Plano expirou há 3 dias"). | M | 1 | M6, m (Entradas) |
| RF-ACE-03 | Lista de entradas ao vivo na recepção, com recusas e acções (cobrar, não entra, entrada manual). | M | 1 | m (Entradas), d1 |
| RF-ACE-04 | Entrada manual com motivo (fica registada como manual). | M | 1 | m (Entradas) |
| RF-ACE-05 | Lotação ao vivo por filial (por check-in) e histórico hora a hora, visível ao membro. | M | 1 | m6, dz |
| RF-ACE-06 | Membros presentes agora, com pesquisa, filtro por zona e tempo dentro (só equipa). | S | 1 | m6, dz |
| RF-ACE-07 | Validação offline na catraca com dados em cache e sincronização posterior. | M | 2 | brief, RNF-10 |
| RF-ACE-08 | Reconhecimento facial opcional. | C | 2 | brief |

## OCO · Ocorrências

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-OCO-01 | Membro reporta ocorrência: tipo, zona, equipamento, descrição (10–400 caracteres), foto opcional, "alguém se magoou?" e envio anónimo. | M | 1 | e4 (membro) |
| RF-OCO-02 | Equipa regista ocorrência de turno: tipo, zona, descrição, foto, urgência (baixa, média, alta) e encaminhamento (manutenção, gestão, recepção). | M | 1 | e4 (equipa) |
| RF-OCO-03 | Acompanhar estado: recebida → em análise → resolvida, com notificação ao autor. | M | 1 | e4 |
| RF-OCO-04 | Ocorrência urgente (alta ou com ferido) avisa de imediato a recepção e o gestor. | M | 1 | RN-60 |
| RF-OCO-05 | Ocorrências entram nas pendências do turno até serem resolvidas. | M | 1 | e4, t3 |

## AVI · Avisos e comunicação

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-AVI-01 | Avisos internos à equipa (urgente/normal) por público (todos, recepção, finanças, PT), com confirmação de leitura. | M | 1 | e1, o8, da |
| RF-AVI-02 | Mensagens automáticas a membros por regra (boas-vindas, vence em 3 dias, vence hoje, em atraso, acesso bloqueado, pagamento confirmado, fim de congelamento, saudades, aniversário), com modelo, canal e hora. | M | 1 | d9 |
| RF-AVI-03 | Registo de envios (agendado, enviado, entregue, falhou) com motivo. | M | 1 | d9 |
| RF-AVI-04 | Envio manual com modelo ou texto livre e segmentação (expirados, em risco, por plano). | S | 2 | d9, brief |
| RF-AVI-05 | WhatsApp Business como canal. | S | 2 | brief |

## ACT · Aulas, actividades e eventos

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-ACT-01 | Calendário semanal de aulas com vagas, reserva e cancelamento pelo membro. | S | 2 | m3 |
| RF-ACT-02 | Lista de espera; quando vaga um lugar, oferta ao próximo com prazo para aceitar. | S | 2 | m3, RN-70 |
| RF-ACT-03 | Desafios e eventos com inscrição. | C | 2 | m3 |
| RF-ACT-04 | A equipa propõe actividades (aula, desafio, evento); o dono aprova antes de publicar. | S | 2 | e5, dx |

## PT · Personal trainer

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-PT-01 | Agenda do dia/semana entre filiais; marcar presença na sessão. | M | 1 | p1, dp |
| RF-PT-02 | Pedidos de reserva dos membros (dias, hora, início, valor); aceitar ou recusar. | M | 1 | m7, p2 |
| RF-PT-03 | Pacotes de sessões (ex.: 8 sessões) com contagem de sessões feitas e por fazer. | M | 1 | p1 |
| RF-PT-04 | Comissões calculadas automaticamente. | S | 2 | brief |
| RF-PT-05 | Avaliações físicas e planos de treino. | C | 2 | brief |

## RET · Retenção e recuperação

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-RET-01 | Lista de membros em risco (frequência em queda, pagamentos atrasados, sessões por fazer) com motivo e responsável. | S | 2 | k1, dk |
| RF-RET-02 | Renovações próximas (7/15/30 dias). | M | 1 | k1 |
| RF-RET-03 | Registar contacto: motivo (viagem, lesão, insatisfação, falta de tempo, outro), resultado (sem resposta, vai voltar, voltou, cancelou / renovou, vai renovar, não renova) e nota. | S | 2 | k1 |
| RF-RET-04 | Score de abandono por membro. | C | 2 | brief |

## PER · Receitas perdidas e detector de fugas

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-PER-01 | Receitas perdidas: potenciais, confirmadas e recuperadas, com causa (ex.: sessões de PT pagas e não dadas, mensalidades em atraso, subscrições sem pagamento). | S | 2 | o6, dl |
| RF-PER-02 | Alertas de fuga: subscrições activadas sem pagamento, membro gratuito com muitos check-ins, movimentos fora de horário, operadores com estornos acima da média. | S | 2 | d6, brief |
| RF-PER-03 | Esperado vs. recebido por filial, com a diferença explicada linha a linha. | M | 1 | d6 |

## IND · Indicações

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-IND-01 | Membro partilha o seu código e acompanha indicações. | S | 2 | m8 |
| RF-IND-02 | Recompensa (1 mês grátis, 50% numa mensalidade ou crédito em Kz) libertada após N mensalidades pagas pelo indicado; validação pelo dono quando há suspeita. | S | 2 | o12, RN-80 |

## MAR · Marca do ginásio

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-MAR-01 | Definir logotipo (PNG/SVG, até 2 MB), nome na app (até 22 caracteres) e cor de destaque. | S | 2 | o13, dp (dono) |
| RF-MAR-02 | Pré-visualizar o cartão de acesso do membro e avisar quando o contraste é baixo. | S | 2 | o13 |
| RF-MAR-03 | Aplicar a marca à app dos membros de todas as filiais; a interface da equipa mantém as cores MUNTU. | S | 2 | o13 |

## REL · Painel e relatórios

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-REL-01 | Painel do dono: receita esperada vs. recebida, activos, churn, ticket médio, ocupação por hora, aprovações pendentes e alertas. | M | 1 | o1, d6 |
| RF-REL-02 | Resumo financeiro: entradas do dia por meio, caixas abertos, devedores. | M | 1 | f1, d5 |
| RF-REL-03 | Comparativo entre filiais (receita, ocupação, churn). | S | 3 | o7, df |
| RF-REL-04 | Rentabilidade por plano, por PT e por filial. | C | 3 | brief |

## DOC · Cofre de documentos

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-DOC-01 | Guardar contratos, comprovativos e documentos de manutenção, com validade, alerta de vencimento e permissões de acesso. | S | 2 | o8 (Cofre) |

## RED · Rede MUNTU e corporativo

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-RED-01 | Convidar ginásios parceiros; estados: convite, activo, suspenso. | W | 4 | d8 |
| RF-RED-02 | Validar visitas de rede com o mesmo QR; o parceiro vê só nome, foto e validade. | W | 4 | d8 |
| RF-RED-03 | Liquidação mensal automática entre ginásios e comissão MUNTU. | W | 4 | d8 |
| RF-RED-04 | Planos corporativos com portal para a empresa (só utilização agregada). | W | 4 | brief |

## INT · Integrações, exportação e API

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-INT-01 | Exportar todos os dados da organização (membros, pagamentos, facturas, movimentos, auditoria) em formatos abertos. | M | 1 | P7 |
| RF-INT-02 | Integração com agregador de pagamentos (Multicaixa Express, referências) por webhook assinado. | M | 1 | brief |
| RF-INT-03 | Integração com fornecedor de SMS; WhatsApp Business na fase 2. | M | 1 | d9 |
| RF-INT-04 | API aberta e webhooks para contabilidade, ERP e parceiros. | W | 4 | brief |

## AUD · Auditoria

| ID | Requisito | P | F | Origem |
|---|---|---|---|---|
| RF-AUD-01 | Trilha de auditoria de todas as acções com efeito (quem, o quê, quando, onde, valor antes/depois, dispositivo). | M | 1 | P2 |
| RF-AUD-02 | Consultar a trilha por pessoa, entidade e período (dono e gestores). | M | 1 | P2 |
