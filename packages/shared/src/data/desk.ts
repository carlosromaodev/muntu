/* Dados do desenho "MUNTU Desktop v8" (fonte: design/MUNTU Desktop v8.dc.html). */
/* eslint-disable */

export type St = { l: string; c: string; bg: string };
export const ST: Record<string, St> = { ...{
  pago:{l:'Pago',c:'#2e7d4f',bg:'#e3efe6'}, ok:{l:'Confirmado',c:'#2e7d4f',bg:'#e3efe6'}, ativo:{l:'Activo',c:'#2e7d4f',bg:'#e3efe6'}, entregue:{l:'Entregue',c:'#2e7d4f',bg:'#e3efe6'}, aprovado:{l:'Aprovado',c:'#2e7d4f',bg:'#e3efe6'},
  vencer:{l:'A vencer',c:'#7a5800',bg:'#f5ecd0'}, pendente:{l:'Estorno pendente',c:'#7a5800',bg:'#f5ecd0'}, convite:{l:'Convite pendente',c:'#7a5800',bg:'#f5ecd0'}, agendado:{l:'Agendado',c:'#7a5800',bg:'#f5ecd0'},
  divida:{l:'Em dívida',c:'#b42318',bg:'#f7e1de'}, bloq:{l:'Bloqueado',c:'#b42318',bg:'#f7e1de'}, retro:{l:'Data passada',c:'#b42318',bg:'#f7e1de'}, suspenso:{l:'Suspenso',c:'#b42318',bg:'#f7e1de'}, falhou:{l:'Falhou',c:'#b42318',bg:'#f7e1de'}, recusado:{l:'Recusado',c:'#b42318',bg:'#f7e1de'},
  congelado:{l:'Congelado',c:'#55524b',bg:'#ebe6d6'}, rede:{l:'Na rede',c:'#1d1c1a',bg:'#ebe6d6'}
}, ...{ conciliado:{l:'Conciliado',c:'#2e7d4f',bg:'#e3efe6'}, comissao:{l:'Comissão',c:'#7a5800',bg:'#f5ecd0'}, falta:{l:'Não encontrado',c:'#b42318',bg:'#f7e1de'}, porpagar:{l:'Por pagar',c:'#7a5800',bg:'#f5ecd0'}, validada:{l:'Validada',c:'#2e7d4f',bg:'#e3efe6'}, recusada:{l:'Recusada',c:'#b42318',bg:'#f7e1de'}, liquidado:{l:'Liquidado',c:'#2e7d4f',bg:'#e3efe6'}, aliquidar:{l:'A liquidar',c:'#7a5800',bg:'#f5ecd0'}, certo:{l:'Certo',c:'#2e7d4f',bg:'#e3efe6'}, aprovacao:{l:'Em aprovação',c:'#7a5800',bg:'#f5ecd0'} } };

const CATS: Record<number, string> = {1:'Mensalidades',2:'Bar',3:'Estornos',4:'Inscrições',5:'Despesas',6:'Mensalidades',7:'Mensalidades',8:'Caixa'};
export type LedgerRow = { id: number; h: string; d: string; o: string; m: string; v: number; st: string; fac: string; note?: string; dia: string; turno: string; cat: string };
export const LEDGER: LedgerRow[] = [
  ...([
  {id:1,h:'09:12',d:'Mensalidade Rede',o:'Ana Domingos · #4821',m:'Multicaixa Express',v:45000,st:'ok',fac:'FR TAL/2026/1201'},
  {id:2,h:'08:55',d:'Bar · 2 águas, 1 batido',o:'Venda #1093',m:'Dinheiro',v:3500,st:'ok',fac:'FR TAL/2026/1200'},
  {id:3,h:'08:40',d:'Estorno · cobrança duplicada',o:'Edson Mateus · #4790',m:'TPA',v:-30000,st:'pendente',fac:'NC TAL/2026/0031',note:'Estorno pedido às 08:40. A aguardar aprovação do dono.'},
  {id:4,h:'08:21',d:'Inscrição Local',o:'Kátia Muondo · #4822',m:'TPA',v:30000,st:'ok',fac:'FR TAL/2026/1199'},
  {id:5,h:'08:02',d:'Despesa · limpeza',o:'Recibo anexado',m:'Dinheiro',v:-12500,st:'ok',fac:'—'},
  {id:6,h:'07:48',d:'Mensalidade com data de 20/10',o:'Mário Sebastião · #4511',m:'Dinheiro',v:30000,st:'retro',fac:'—',note:'Movimentos com data passada precisam de aprovação. Pedido enviado ao dono.'},
  {id:7,h:'07:30',d:'Mensalidade Híbrido',o:'Joana Kiala · #4602',m:'Transferência',v:38000,st:'ok',fac:'FR TAL/2026/1198'},
  {id:8,h:'07:00',d:'Abertura de caixa',o:'Turno da manhã',m:'Dinheiro',v:20000,st:'ok',fac:'—'}
] as any[]).map((r) => ({ ...r, dia: 'Hoje', turno: 'manha', cat: CATS[r.id] })),
  ...([ {id:9,h:'18:40',d:'Mensalidade Rede',o:'Paulina Muxima · #4702',m:'Multicaixa Express',v:45000,st:'ok',fac:'FR TAL/2026/1196',turno:'tarde',cat:'Mensalidades'},
  {id:10,h:'17:15',d:'Bar · 4 batidos',o:'Venda #1088',m:'Dinheiro',v:6000,st:'ok',fac:'FR TAL/2026/1195',turno:'tarde',cat:'Bar'},
  {id:11,h:'16:02',d:'Inscrição Híbrido',o:'Wilson Tchiyaka · #4655',m:'TPA',v:38000,st:'ok',fac:'FR TAL/2026/1194',turno:'tarde',cat:'Inscrições'},
  {id:12,h:'14:00',d:'Abertura de caixa · tarde',o:'Teresa Lunda',m:'Dinheiro',v:20000,st:'ok',fac:'—',turno:'tarde',cat:'Caixa'},
  {id:13,h:'13:55',d:'Sangria · para o cofre',o:'Celma Bento',m:'Dinheiro',v:-60000,st:'ok',fac:'—',turno:'manha',cat:'Caixa'},
  {id:14,h:'11:20',d:'Despesa · manutenção passadeira',o:'Factura TecFit 0912',m:'Transferência',v:-85000,st:'ok',fac:'—',turno:'manha',cat:'Despesas'},
  {id:15,h:'09:05',d:'Mensalidade Local',o:'Edson Mateus · #4790',m:'Dinheiro',v:30000,st:'ok',fac:'FR TAL/2026/1188',turno:'manha',cat:'Mensalidades'},
  {id:16,h:'07:00',d:'Abertura de caixa · manhã',o:'Celma Bento',m:'Dinheiro',v:20000,st:'ok',fac:'—',turno:'manha',cat:'Caixa'}
] as any[]).map((r) => ({ ...r, dia: 'Ontem' })),
];

export const FIL = { talatona: { n: 'Talatona', e: 1240000, r: 1196000, a: 612, ch: '2,8%', o: '71%' }, kilamba: { n: 'Kilamba', e: 780000, r: 712000, a: 428, ch: '3,6%', o: '64%' }, maianga: { n: 'Maianga', e: 430000, r: 394000, a: 244, ch: '3,1%', o: '58%' } } as const;
export type FilKey = keyof typeof FIL;
export const EXP_CASH = { dinheiro: 88000, express: 64500, tpa: 22000, transf: 10000 };
export const SAMPLE = { nome: 'Kátia', valor: '45 000 Kz', data: '13/11', referencia: '00512 884 231', ginasio: 'Mwangolé Fit' };
export const fill = (t: string, v: Record<string, string>) => t.replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m));
export const PV = 1500;

export const LINES = [{t:'Estorno a aguardar aprovação · Edson Mateus',f:'talatona',v:30000},{t:'Desconto acima do limite (25%)',f:'talatona',v:14000},{t:'2 subscrições activadas sem pagamento',f:'kilamba',v:60000},{t:'Diferença no fecho de caixa · tarde',f:'kilamba',v:8000},{t:'Mensalidades em atraso há mais de 30 dias',f:'maianga',v:36000}];
export const FUGAS = [{t:'2 subscrições activadas sem pagamento por Rui Manuel',f:'kilamba',h:'hoje 09:14'},{t:'Membro gratuito com 14 check-ins esta semana',f:'talatona',h:'ontem'},{t:'Movimento de caixa às 23:12, fora do horário',f:'maianga',h:'sábado'},{t:'Operador com estornos 3× acima da média',f:'kilamba',h:'esta semana'}];
export const OCC = [22,48,64,41,28,20,24,30,26,22,30,52,78,92,70,44,18];
export const PLANS = [{id:'local',n:'Local',scope:'Local',d:'Só a filial Talatona',p:30000},{id:'rede',n:'Rede',scope:'Rede',d:'Todas as filiais',p:45000},{id:'hibrido',n:'Híbrido',scope:'Híbrido',d:'Talatona + 4 entradas/mês noutras',p:38000},{id:'teste',n:'Teste grátis',scope:'7 dias',d:'1 por pessoa, validado por BI e telefone',p:0,disabled:true,note:'Já usado por este BI em 12/03/2026'}];
export const PLANOS = [{id:1,n:'Local Mensal',scope:'Local',p:30000,acesso:'Filial de inscrição',hor:'06:00–22:00',desc:'10%',ativos:412},{id:2,n:'Rede Mensal',scope:'Rede',p:45000,acesso:'Todas as filiais',hor:'06:00–22:00',desc:'10%',ativos:286},{id:3,n:'Híbrido',scope:'Híbrido',p:38000,acesso:'Base + 4 entradas/mês',hor:'06:00–22:00',desc:'10%',ativos:142},{id:4,n:'Piscina Manhã',scope:'Por horário',p:15000,acesso:'Piscina · Talatona',hor:'06:00–10:00',desc:'5%',ativos:58},{id:5,n:'Rede Anual',scope:'Rede',p:450000,acesso:'Todas as filiais',hor:'06:00–22:00',desc:'15%',ativos:96},{id:6,n:'Estudante',scope:'Local',p:22000,acesso:'Filial de inscrição',hor:'10:00–17:00',desc:'0%',ativos:0}];
export const REGRAS = [['Regime de turnos','2 turnos · Manhã 06–14 · Tarde 14–22'],['Tolerância antes de bloquear','7 dias'],['Desconto máximo · recepção','10%'],['Congelamento máximo por ano','30 dias'],['Teste grátis','1 por BI e telefone'],['Movimentos com data passada','Exigem aprovação do dono'],['Aviso de mudança de preço','SMS 30 dias antes']];
export const RULES = [
  {n:'Boas-vindas',trig:'Após inscrição paga',hora:'Imediato',ch:'WhatsApp',on:true,sent:38,tpl:'Bem-vinda ao {ginasio}, {nome}! O teu QR de acesso: muntu.ao/q/8KD2. Plano activo até {data}.'},
  {n:'Vence em 3 dias',trig:'3 dias antes do vencimento',hora:'10:00',ch:'SMS',on:true,sent:412,tpl:'{ginasio}: Olá {nome}, a tua mensalidade de {valor} vence a {data}. Paga por Multicaixa Express ou ref. {referencia}.'},
  {n:'Vence hoje',trig:'No dia do vencimento',hora:'08:00',ch:'SMS',on:true,sent:296,tpl:'{ginasio}: {nome}, a tua mensalidade de {valor} vence hoje. Ref. Multicaixa {referencia}.'},
  {n:'Em atraso',trig:'3 dias após o vencimento',hora:'10:00',ch:'SMS',on:true,sent:188,tpl:'{ginasio}: {nome}, a mensalidade de {valor} está em atraso desde {data}. Regulariza para manter o acesso. Ref. {referencia}.'},
  {n:'Acesso bloqueado',trig:'7 dias após o vencimento',hora:'10:00',ch:'SMS',on:true,sent:64,tpl:'{ginasio}: {nome}, o teu acesso foi suspenso por falta de pagamento ({valor}). Paga com a ref. {referencia} e entra de imediato.'},
  {n:'Pagamento confirmado',trig:'Quando o pagamento entra',hora:'Imediato',ch:'SMS',on:true,sent:251,tpl:'{ginasio}: Recebemos {valor}. Obrigado, {nome}! Factura em muntu.ao/f/TAL1202.'},
  {n:'Fim de congelamento',trig:'1 dia antes de reactivar',hora:'09:00',ch:'SMS',on:true,sent:12,tpl:'{ginasio}: {nome}, o teu plano volta a estar activo a {data}. Até já!'},
  {n:'Sentimos a tua falta',trig:'14 dias sem check-in',hora:'18:00',ch:'SMS',on:false,sent:0,tpl:'{nome}, há 14 dias que não te vemos no {ginasio}. O teu plano continua activo até {data}.'},
  {n:'Aniversário',trig:'No dia de anos',hora:'09:00',ch:'WhatsApp',on:false,sent:0,tpl:'Parabéns, {nome}! O {ginasio} oferece-te um batido no bar esta semana.'}
];
export const LOG = [
  {id:1,h:'10:00',n:'Mário Sebastião',tel:'923 114 802',a:'Vence em 3 dias',ch:'SMS',st:'agendado',why:'Na fila'},
  {id:2,h:'10:00',n:'Paulina Muxima',tel:'912 778 340',a:'Vence em 3 dias',ch:'SMS',st:'agendado',why:'Na fila'},
  {id:3,h:'09:14',n:'Kátia Muondo',tel:'923 456 789',a:'Boas-vindas',ch:'WhatsApp',st:'entregue',why:'Lida 09:15'},
  {id:4,h:'08:00',n:'Yola Fernandes',tel:'931 220 517',a:'Em atraso',ch:'SMS',st:'entregue',why:''},
  {id:5,h:'08:00',n:'Délcio Ngola',tel:'924 663 091',a:'Em atraso',ch:'SMS',st:'entregue',why:''},
  {id:6,h:'08:00',n:'Ivone Cassoma',tel:'92 300 1',a:'Em atraso',ch:'SMS',st:'falhou',why:'Número inválido'},
  {id:7,h:'07:42',n:'Ana Domingos',tel:'923 870 115',a:'Pagamento confirmado',ch:'SMS',st:'entregue',why:''},
  {id:8,h:'Ontem',n:'Wilson Tchiyaka',tel:'926 551 004',a:'Vence hoje',ch:'SMS',st:'falhou',why:'Telefone desligado'}
];
export const APPR = [
  {id:'a1',k:'Estorno · Talatona · 08:40',t:'Edson Mateus · cobrança duplicada no TPA. Pedido por Celma Bento.',v:-30000},
  {id:'a2',k:'Fecho de caixa · Kilamba',t:'Diferença no turno da tarde. Justificação: troco dado a mais.',v:-8000},
  {id:'a3',k:'Preço · Rede Mensal',t:'De 45 000 para 50 000 Kz. Os 286 membros recebem SMS 30 dias antes.',v:50000}
];
export const MEMBERS = [
  {id:'4821',n:'Délcio Ngola',plano:'Rede · Mensal',valor:45000,base:'Talatona',st:'divida',since:'Fev 2024',tel:'924 663 091',app:'activa',turno:'Tarde',d:'00',e:'02'},
  {id:'4610',n:'Ana Domingos',plano:'Rede · Mensal',valor:45000,base:'Talatona',st:'pago',since:'Mai 2023',tel:'923 870 115',app:'activa',turno:'Manhã',d:'18',e:'11'},
  {id:'4602',n:'Joana Kiala',plano:'Híbrido',valor:38000,base:'Kilamba',st:'pago',since:'Jan 2025',tel:'925 410 228',app:'activa',turno:'Manhã',d:'22',e:'09'},
  {id:'4511',n:'Mário Sebastião',plano:'Local · Trimestral',valor:30000,base:'Talatona',st:'vencer',since:'Ago 2024',tel:'923 114 802',app:'pendente',turno:'Manhã',d:'01',e:'07'},
  {id:'4477',n:'Yola Fernandes',plano:'Local · Mensal',valor:30000,base:'Talatona',st:'bloq',since:'Mar 2025',tel:'931 220 517',app:'activa',turno:'Tarde',d:'00',e:'03'},
  {id:'4390',n:'Nelson Kapinga',plano:'Rede · Anual',valor:37500,base:'Talatona',st:'pago',since:'Out 2022',tel:'923 552 760',app:'activa',turno:'Manhã',d:'214',e:'14'},
  {id:'4702',n:'Paulina Muxima',plano:'Rede · Mensal',valor:45000,base:'Maianga',st:'vencer',since:'Jul 2025',tel:'912 778 340',app:'activa',turno:'Tarde',d:'03',e:'08'},
  {id:'4822',n:'Kátia Muondo',plano:'Rede · Mensal',valor:45000,base:'Talatona',st:'pago',since:'Out 2026',tel:'923 456 789',app:'pendente',turno:'Manhã',d:'30',e:'01'},
  {id:'4655',n:'Wilson Tchiyaka',plano:'Híbrido',valor:38000,base:'Kilamba',st:'vencer',since:'Fev 2026',tel:'926 551 004',app:'activa',turno:'Tarde',d:'05',e:'06'},
  {id:'4790',n:'Edson Mateus',plano:'Local · Mensal',valor:30000,base:'Talatona',st:'pago',since:'Set 2025',tel:'922 309 448',app:'activa',turno:'Manhã',d:'11',e:'10'},
  {id:'4533',n:'Feliciana Sousa',plano:'Rede · Mensal',valor:45000,base:'Talatona',st:'congelado',since:'Nov 2024',tel:'923 640 119',app:'activa',turno:'Tarde',d:'15',e:'00'},
  {id:'K-2210',n:'Bruno Kianda',plano:'Rede · Kianda Fitness',valor:0,base:'Kianda Fitness',st:'rede',since:'—',tel:'—',app:'—',turno:'—',d:'03',e:'03'}
];
export const BAN = { pago:'', vencer:'Vence em breve. Aviso SMS agendado para hoje às 10:00.', divida:'Mensalidade por pagar há 12 dias. Acesso bloqueado até pagar. 4 avisos SMS entregues.', bloq:'Plano expirou há 3 dias. Acesso bloqueado. Aviso SMS entregue hoje às 08:00.', congelado:'Plano congelado até 10/11/2026 a pedido do membro. Aviso de reactivação agendado.', rede:'Membro do Kianda Fitness. Acesso válido pela Rede MUNTU: 3 de 6 visitas este mês.' };
export const AV = { pago:[['13/10 · 07:51','Pagamento confirmado','SMS','entregue'],['10/10 · 10:00','Vence em 3 dias','SMS','entregue']], vencer:[['Hoje · 10:00','Vence em 3 dias','SMS','agendado'],['13/09 · 07:40','Pagamento confirmado','SMS','entregue']], divida:[['08/10 · 10:00','Acesso bloqueado','SMS','entregue'],['04/10 · 10:00','Em atraso','SMS','entregue'],['01/10 · 08:00','Vence hoje','SMS','entregue'],['28/09 · 10:00','Vence em 3 dias','SMS','entregue']], bloq:[['Hoje · 08:00','Em atraso','SMS','entregue'],['23/10 · 08:00','Vence hoje','SMS','entregue']], congelado:[['09/11 · 09:00','Fim de congelamento','SMS','agendado'],['26/09 · 11:20','Plano congelado','SMS','entregue']], rede:[] };
export const CX_HIST = [['26/10','Kilamba','Rui Manuel','Manhã','07:00–14:01',212000,212000,'certo',''],['25/10','Talatona','Teresa Lunda','Tarde','14:00–22:04',164500,164500,'certo',''],['25/10','Talatona','Celma Bento','Manhã','07:00–14:02',188000,186000,'aprovado','Troco errado · aprovado'],['25/10','Kilamba','Rui Manuel','Tarde','14:00–22:10',143000,135000,'aprovacao','Troco dado a mais'],['25/10','Maianga','Adilson Neto','Manhã','06:58–14:00',96000,96000,'certo',''],['24/10','Talatona','Teresa Lunda','Tarde','14:00–22:01',171000,171000,'certo',''],['24/10','Talatona','Celma Bento','Manhã','07:00–14:00',192500,192500,'certo',''],['24/10','Kilamba','Rui Manuel','Tarde','14:02–22:15',150000,138000,'recusado','Sem justificação válida']];
export const ACC = [{id:'cxm',t:'Dinheiro',n:'Caixa Talatona · Manhã',v:88000,meta:'Aberto às 07:00 · Celma Bento'},{id:'cxt',t:'Dinheiro',n:'Caixa Talatona · Tarde',v:0,meta:'Abre às 14:00 · Rui Manuel'},{id:'cof',t:'Dinheiro',n:'Cofre · Talatona',v:340000,meta:'Última sangria ontem às 13:55'},{id:'bai',t:'Banco',n:'BAI · Conta à ordem',v:2140000,meta:'Extracto importado hoje às 08:00'},{id:'mcx',t:'A liquidar',n:'Multicaixa Express',v:64500,meta:'Liquida amanhã na conta BAI'},{id:'tpa',t:'A liquidar',n:'TPA · BFA',v:22000,meta:'Liquida amanhã · comissão 1,5%'}];
export const AGE = [['1–7 dias',18,612000,'#c99a1b'],['8–30 dias',16,584000,'#c8640c'],['31–60 dias',9,342000,'#b42318'],['Mais de 60 dias',3,135000,'#1d1c1a']];
export const DEV = [['Délcio Ngola','12 dias',45000,'Acesso bloqueado · 08/10'],['Ivone Cassoma','41 dias',90000,'SMS falhou · número inválido'],['Gerson Kiluange','64 dias',135000,'Acesso bloqueado · 30/08'],['Marta Kapalo','9 dias',38000,'Em atraso · 20/10'],['Yola Fernandes','3 dias',30000,'Em atraso · hoje 08:00']];
export const PAG = [{id:'p1',d:'Salários de Outubro',c:'Pessoal',ve:'30/10',v:1280000,st:'agendado'},{id:'p2',d:'Renda Talatona · Novembro',c:'Instalações',ve:'05/11',v:450000,st:'porpagar'},{id:'p3',d:'ENDE · Electricidade',c:'Serviços',ve:'28/10',v:96400,st:'porpagar'},{id:'p4',d:'EPAL · Água',c:'Serviços',ve:'02/11',v:18200,st:'porpagar'},{id:'p5',d:'Manutenção de passadeiras',c:'Equipamento',ve:'25/10',v:85000,st:'pago'},{id:'p6',d:'Pacote de 5 000 SMS',c:'Comunicação',ve:'15/11',v:60000,st:'agendado'},{id:'p7',d:'Rede MUNTU · liquidação',c:'Rede',ve:'31/10',v:108000,st:'agendado'}];
export const CON = [{id:'c1',d:'25/10',o:'Multicaixa Express',r:'Lote 2510-112',sis:1240000,ext:1240000,st:'conciliado',why:''},{id:'c2',d:'25/10',o:'TPA · BFA',r:'Lote 88341',sis:318000,ext:313230,st:'comissao',why:'Comissão de 1,5% do banco',act:'Lançar comissão'},{id:'c3',d:'25/10',o:'Depósito do cofre',r:'Talão 004512',sis:400000,ext:400000,st:'conciliado',why:''},{id:'c4',d:'24/10',o:'Transferência · Joana Kiala',r:'Ref. 7781',sis:38000,ext:0,st:'falta',why:'Não aparece no extracto BAI',act:'Pedir comprovativo'},{id:'c5',d:'24/10',o:'Multicaixa Express',r:'Lote 2410-098',sis:1105500,ext:1105500,st:'conciliado',why:''}];
export const OPS = [['Celma Bento','Manhã · Talatona','manha',312,'2 · 6%',1,-2000,''],['Rui Manuel','Tarde · Kilamba','tarde',204,'9 · 21%',6,-8000,'Rever'],['Teresa Lunda','Tarde · Talatona','tarde',188,'1 · 4%',0,0,''],['Adilson Neto','Manhã · Maianga','manha',141,'3 · 10%',2,0,'']];
export const TREND = [['Mai',2.21,2.05],['Jun',2.26,2.12],['Jul',2.30,2.08],['Ago',2.35,2.19],['Set',2.41,2.27],['Out',2.45,2.30]];
export const PARC = [{n:'Kianda Fitness',c:'Luanda · Talatona',since:'Mar 2025',rec:64,env:31,st:'ativo',why:'',tel:'923 400 110'},{n:'Benguela Gym Center',c:'Benguela',since:'Jun 2025',rec:12,env:18,st:'ativo',why:'',tel:'934 220 018'},{n:'Huambo Power',c:'Huambo',since:'—',rec:0,env:0,st:'convite',why:'Convite enviado a 22/10. Ainda sem resposta.',tel:'941 551 300'},{n:'Lobito Strong',c:'Lobito',since:'Jan 2026',rec:22,env:9,st:'suspenso',why:'Liquidação de Setembro por pagar. Visitas recusadas até regularizar.',tel:'938 117 640'},{n:'Viana Box',c:'Luanda · Viana',since:'Ago 2025',rec:30,env:14,st:'ativo',why:'',tel:'925 870 334'}];
export const VIS = [['09:02','Bruno Kianda','Kianda Fitness','in','Rede Kianda','validada',''],['08:47','Sara Lopes','Viana Box','in','Rede Viana','validada',''],['08:30','Hélder Pinto','Lobito Strong','in','Rede Lobito','recusada','Parceiro suspenso'],['Ontem 19:10','Nelson Kapinga','Benguela Gym Center','out','Rede Anual','validada',''],['Ontem 18:22','Ana Domingos','Kianda Fitness','out','Rede Mensal','validada',''],['Ontem 07:15','Mário Sebastião','Viana Box','out','Local Trimestral','recusada','Plano sem acesso à rede'],['Ontem 06:58','Inês Tavares','Kianda Fitness','in','Rede Kianda','validada','']];
export const LIQ = [['Outubro','Kianda Fitness',64,31,'aliquidar','31/10'],['Outubro','Viana Box',30,14,'aliquidar','31/10'],['Outubro','Lobito Strong',22,9,'aliquidar','31/10'],['Outubro','Benguela Gym Center',12,18,'aliquidar','31/10'],['Setembro','Kianda Fitness',58,27,'liquidado','30/09'],['Setembro','Viana Box',26,12,'liquidado','30/09'],['Setembro','Lobito Strong',20,6,'porpagar','30/09']];
export const REDE_REG = [['Preço por visita','1 500,00 Kz'],['Visitas por membro por mês','Até 6'],['Planos com acesso à rede','Rede Mensal · Rede Anual · Híbrido'],['Dados partilhados','Nome, foto e validade do acesso'],['Comissão MUNTU','5% do saldo positivo'],['Liquidação','Automática no último dia do mês']];
export type Member = (typeof MEMBERS)[number];
