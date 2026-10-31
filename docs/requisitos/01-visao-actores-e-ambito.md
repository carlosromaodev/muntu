# 1. Visão, actores e âmbito

## 1.1 Visão

O MUNTU controla o que realmente acontece no ginásio, e não apenas o que o funcionário regista. Acompanha o negócio (receitas, despesas, contratos, turnos, filiais), a trajectória de cada membro (frequência, pagamentos, objectivos), o trabalho da equipa (turnos, passagens, tarefas, ocorrências) e a capacidade de crescer (filiais, empresas, parceiros).

O sistema não se limita a guardar informação: ajuda a garantir que o trabalho foi feito e que os problemas são resolvidos. Por exemplo, um membro que treina menos, com renovação próxima e sessões de PT por fazer, gera uma tarefa para a equipa contactar e registar o resultado.

## 1.2 Princípios (orientam todas as decisões)

| # | Princípio | Consequência no sistema |
|---|---|---|
| P1 | **Nenhum acesso sem pagamento.** | Uma subscrição só fica activa com pagamento confirmado ou aprovação explícita. |
| P2 | **Nada se apaga.** | Livro razão e trilha de auditoria só de acrescentar. Erros corrigem-se com estorno e motivo. |
| P3 | **Uma tarefa, um ecrã.** | Inscrição, pagamento e acesso no mesmo fluxo, em menos de 40 segundos. |
| P4 | **Funciona sem internet.** | Recepção e catracas operam durante cortes de rede ou energia e sincronizam depois. |
| P5 | **O dono vê a verdade no telemóvel.** | Acções sensíveis chegam como pedido de aprovação com biometria. |
| P6 | **Feito para Angola.** | Kwanzas, Multicaixa Express, dinheiro vivo, facturação electrónica AGT, SMS e WhatsApp. |
| P7 | **Os dados são do ginásio.** | Exportação completa a qualquer momento; fica porque ganha, não porque não consegue sair. |

## 1.3 Actores e perfis

Cada perfil tem um **âmbito** (que filiais vê) e **limites numéricos** configuráveis pelo dono. O que passa do limite gera um pedido de aprovação.

| Perfil | Superfície | O que faz | Limites |
|---|---|---|---|
| Dono | Mobile + desktop | Tudo, em todas as filiais; aprova acções sensíveis | Nenhum; recebe todos os alertas de fuga |
| Gerente regional | Desktop | Opera e aprova nas filiais atribuídas | Desconto e estorno até ao limite do dono |
| Gerente de filial | Desktop + mobile | Caixa, equipa, planos e relatórios da sua filial | Não cria planos de rede; aprova até ao seu limite |
| Recepção | Desktop (balcão) e mobile | Inscrições, cobranças, check-in manual, vendas, turnos | Sem eliminar, sem datas retroactivas, sem planos grátis; desconto máximo (ex.: 10%) |
| Finanças | Desktop + mobile | Tesouraria, facturas, cobranças, conciliação, despesas | Aprova estornos e despesas até ao limite |
| Personal trainer (PT) | Mobile | Agenda, alunos, sessões, pedidos de reserva, actividades | Só os seus alunos; sem acesso a pagamentos |
| Vigilante | Mobile/tablet na porta | Valida acessos, regista ocorrências | Só nome, foto e estado de acesso |
| Membro | App mobile | Acesso por QR, pagar, reservar aulas e PT, ocorrências | Só os seus dados |
| Empresa parceira | Portal web (fase 4) | Gere colaboradores inscritos e consumo | Só utilização agregada; nunca dados de saúde |
| Ginásio parceiro | Rede MUNTU (fase 4) | Recebe e envia visitas de rede | Vê apenas acesso válido, nome e foto |
| Sistemas externos | API | AGT, Multicaixa Express/agregador, SMS, WhatsApp, catracas | Credenciais por integração |

No protótipo, o prefixo do telemóvel define o perfil (923 membro, 924 recepção, 925 finanças, 926 PT, 927 dono). **Isto é só do protótipo**: em produção o perfil vem da conta.

## 1.4 Superfícies

- **App mobile** (iOS, Android, web mobile): execução diária. Membro, recepção em movimento, PT, dono, vigilante.
- **Web desktop**: profundidade. Balcão da recepção, tesouraria, análises, configuração, gestão de várias filiais.
- **Backend** único: as mesmas regras e a mesma fonte de dados para todas as superfícies.

## 1.5 Estrutura da organização

`Organização (empresa/dono) → Filiais → Zonas/Salas`. Cada filial tem caixa, stock, catracas e equipa próprios. Membros, planos e relatórios podem ser partilhados entre filiais da mesma organização. A Rede MUNTU liga organizações diferentes.

## 1.6 Fases

| Fase | Nome | Âmbito |
|---|---|---|
| 1 | **MVP: o ginásio funciona** (uma filial) | Inscrição em fluxo único; Multicaixa Express e dinheiro; livro razão imutável; caixa por turno com fecho cego; passagem de turno; aprovações no telemóvel do dono; QR dinâmico e check-in; perfis com limites; facturação AGT; app do membro básica (QR, pagar, plano); ocorrências; avisos à equipa. |
| 2 | **O ginásio melhora** | Modo offline completo; catracas e reconhecimento facial; app do PT com comissões; aulas com lista de espera; detector de fugas; score de abandono e recuperação; receitas perdidas; WhatsApp; produtos e stock; marca do ginásio na app. |
| 3 | **O ginásio expande-se** | Selector de filial; planos com âmbito (local, rede, híbrido, por horário); receita partilhada; painel comparativo; transferências de membros e stock; abrir nova filial a partir de um modelo. |
| 4 | **Ecossistema (Rede MUNTU)** | Acesso entre ginásios; créditos de visita; liquidação mensal; planos corporativos; marketplace; API aberta e webhooks. |

A rede só se constrói quando houver ginásios activos, procura real e transacções a funcionar. As fases 3 e 4 entram na **arquitectura** desde o início (organização, filiais, âmbitos), mas não no código do MVP.

## 1.7 Fora de âmbito (por agora)

- Contabilidade completa (o MUNTU exporta para o sistema de contabilidade).
- Processamento salarial.
- Perguntas em linguagem natural no painel do dono (fase posterior).
- Hardware de catraca próprio (integra-se com fornecedores).
