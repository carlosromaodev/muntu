# 3. Requisitos não funcionais

Formato: **ID · requisito · como se verifica**.

## Segurança e privacidade

| ID | Requisito | Verificação |
|---|---|---|
| RNF-01 | **Isolamento entre ginásios.** Os dados de uma organização nunca são visíveis a outra, mesmo com um erro no código da aplicação: isolamento na base de dados (Row-Level Security) além do filtro na aplicação. | Testes que tentam ler dados de outra organização com o contexto errado e devem devolver zero linhas. |
| RNF-02 | **Permissões no servidor.** Cada operação valida perfil, âmbito de filial e limites no servidor; a app só esconde botões. | Testes de API por perfil (403 nos casos proibidos). |
| RNF-03 | **Senhas** guardadas com função de derivação lenta (scrypt ou argon2id) e sal por utilizador; nunca em claro nem em registos. | Revisão de código; teste de login. |
| RNF-04 | **Sessões** com token de acesso curto (≤ 15 min) e token de renovação rodado a cada uso, revogável por dispositivo. | Testes de expiração e de reutilização de token de renovação (revoga a família). |
| RNF-05 | **Acções sensíveis** (aprovar, estornar, fechar caixa, assinar turno) exigem confirmação recente: biometria no dispositivo ou senha/PIN validado pelo servidor. | Teste: aprovação sem confirmação recente é recusada. |
| RNF-06 | **Protecção de dados (Lei n.º 22/11).** Consentimento registado, finalidade declarada, acesso e rectificação pelo titular, minimização (o vigilante e o parceiro de rede vêem só nome, foto e estado), dados de saúde nunca partilhados com empresas. Notificação/registo junto da APD quando aplicável. | Matriz de dados por perfil; revisão jurídica. |
| RNF-07 | Tráfego só por HTTPS (TLS 1.2+); segredos em variáveis de ambiente/cofre, nunca no repositório. | Configuração de deploy; varrimento de segredos. |
| RNF-08 | Limitação de tentativas no login e nos endpoints públicos (por IP e por telefone). | Teste de limite. |
| RNF-09 | Webhooks de pagamento verificados por assinatura e idempotentes. | Teste com assinatura inválida e entrega repetida. |

## Funcionamento sem rede e sincronização

| ID | Requisito | Verificação |
|---|---|---|
| RNF-10 | **Recepção e catraca funcionam offline** durante cortes de rede ou energia: check-in validado com cache local, cobranças em dinheiro e registos guardados numa fila local, enviados quando a rede volta. | Teste de fila: operações offline sincronizam sem duplicar. |
| RNF-11 | **Idempotência.** Cada operação de escrita aceita uma chave de idempotência gerada pelo cliente; repetir a mesma chave devolve o mesmo resultado. | Teste: o mesmo pedido enviado duas vezes cria um registo. |
| RNF-12 | **Identificadores gerados no cliente** (UUID v7) para registos criados offline, ordenáveis no tempo. | Revisão do esquema. |
| RNF-13 | **Hora do servidor** é a hora oficial dos registos; a hora do dispositivo guarda-se à parte para auditoria de operações offline. | Revisão do esquema. |
| RNF-14 | Conflitos resolvem-se por regras do domínio, nunca por "o último ganha" em dinheiro: movimentos de caixa são acrescentados, não substituídos. | Testes de sincronização concorrente. |

## Integridade dos dados e auditoria

| ID | Requisito | Verificação |
|---|---|---|
| RNF-20 | **Livro razão e auditoria só de acrescentar**, garantido na base de dados (triggers que recusam UPDATE/DELETE), não só na aplicação. | Teste: UPDATE/DELETE na tabela falha. |
| RNF-21 | **Valores monetários** em cêntimos inteiros (Kz × 100); nunca vírgula flutuante. Formatação `30 000,00 Kz`. | Revisão do esquema; testes de soma com cêntimos. |
| RNF-22 | Operações de dinheiro em **transacções** com o nível de isolamento adequado; numeração de documentos sem falhas sob concorrência. | Teste de emissão concorrente de facturas. |
| RNF-23 | **Cópias de segurança** diárias com retenção de 30 dias e recuperação até um ponto no tempo (PITR); teste de reposição trimestral. | Relatório de reposição. |
| RNF-24 | Documentos fiscais conservados pelo prazo legal de arquivo. | Política de retenção. |

## Conformidade fiscal (Angola)

| ID | Requisito | Verificação |
|---|---|---|
| RNF-30 | **Facturação electrónica AGT** (Regime Jurídico das Facturas, Decreto Presidencial n.º 71/25, e especificações técnicas da AGT): software validado/certificado pela AGT, comunicação das facturas à AGT com código de validação, numeração sequencial por série e ano, correcção só por nota de crédito, conteúdo obrigatório (NIF, morada, descrição, impostos ou isenção, datas, identificação do software), emissão até 5 dias úteis, SAF-T (AO) anual. | Certificação AGT antes da produção; testes de conteúdo e numeração. |
| RNF-31 | Moeda: kwanza (AOA), com cêntimos. IVA conforme regime do ginásio (geral, simplificado, isento) configurável por organização. | Testes de cálculo de imposto. |

## Desempenho e capacidade

| ID | Requisito | Verificação |
|---|---|---|
| RNF-40 | Validação de acesso (QR → entra/não entra) em **< 300 ms** no p95 com rede, < 100 ms offline. | Teste de carga. |
| RNF-41 | API de leitura comum < 200 ms p95; escrita < 400 ms p95 (excluindo integrações externas). | Monitorização. |
| RNF-42 | Inscrição completa em < 40 s para um operador treinado (fluxo único). | Teste de usabilidade cronometrado. |
| RNF-43 | Capacidade inicial: 500 organizações, 2 000 filiais, 1 milhão de membros, picos de 50 check-ins/s. Crescimento horizontal sem mudar a arquitectura. | Teste de carga. |
| RNF-44 | Ligações móveis lentas (3G): respostas paginadas e compactas; imagens redimensionadas no servidor. | Teste com rede limitada. |

## Disponibilidade e operação

| ID | Requisito | Verificação |
|---|---|---|
| RNF-50 | Disponibilidade de 99,5% mensal no MVP (99,9% a partir da fase 3). O offline cobre as falhas para recepção e catraca. | Monitorização. |
| RNF-51 | Observabilidade: registos estruturados (JSON) com id de pedido, métricas e alertas; sem dados pessoais nos registos. | Revisão de registos. |
| RNF-52 | Tarefas agendadas (lembretes D-5/D-1/D-0, bloqueios por atraso, liquidação) idempotentes e com repetição em caso de falha. | Testes das tarefas. |
| RNF-53 | Integrações externas (AGT, pagamentos, SMS) por fila com repetição e registo de falhas; uma integração em baixo não bloqueia a recepção. | Teste com integração indisponível. |
| RNF-54 | Fuso horário: Africa/Luanda para regras de dia (vencimentos, turnos, relatórios); armazenamento em UTC. | Testes de fronteira de dia. |

## Usabilidade e acessibilidade

| ID | Requisito | Verificação |
|---|---|---|
| RNF-60 | Português de Angola, frases curtas, mensagens de erro humanas (nunca códigos internos). O servidor devolve um código estável **e** uma mensagem em português. | Revisão das mensagens da API. |
| RNF-61 | Estados obrigatórios em todos os ecrãs: vazio, a carregar, erro, sem rede, à espera de aprovação. | Revisão de ecrãs. |
| RNF-62 | Alvos de toque ≥ 44 px; contraste ≥ 4,5:1; suporte a "reduzir movimento" no telemóvel. | Revisão de acessibilidade. |

## Manutenção e evolução

| ID | Requisito | Verificação |
|---|---|---|
| RNF-70 | Backend modular por domínio; um módulo não acede às tabelas de outro sem passar pelo seu serviço. | Revisão de arquitectura. |
| RNF-71 | Migrações de base de dados versionadas, revistas e reversíveis quando possível; nunca alterar uma migração já aplicada. | Pipeline de migrações. |
| RNF-72 | Testes automáticos nas regras de negócio e na API (cobertura mínima de 80% nos módulos de dinheiro, acesso e aprovações). | Relatório de cobertura. |
| RNF-73 | Contrato da API documentado (OpenAPI) e versionado (`/v1`). | Documento gerado. |
| RNF-74 | Exportação completa dos dados de uma organização (portabilidade). | Teste de exportação. |
