// GERADO a partir de "MUNTU Desktop v8.dc.html" por tools/dc2rn.py — não editar à mão.
// Para mudar o visual, edite o ficheiro de desenho e volte a gerar.
/* eslint-disable */
import React from 'react';
import * as R from '../runtime';
import { MuntuLogo } from './MuntuLogo';
import { MuntuSelo } from './MuntuSelo';

const DCLogic = R.DCLogic;
const location = R.location;
const window = R.win;
const document = R.doc;

const ST = {
  pago:{l:'Pago',c:'#2e7d4f',bg:'#e3efe6'}, ok:{l:'Confirmado',c:'#2e7d4f',bg:'#e3efe6'}, ativo:{l:'Activo',c:'#2e7d4f',bg:'#e3efe6'}, entregue:{l:'Entregue',c:'#2e7d4f',bg:'#e3efe6'}, aprovado:{l:'Aprovado',c:'#2e7d4f',bg:'#e3efe6'},
  vencer:{l:'A vencer',c:'#7a5800',bg:'#f5ecd0'}, pendente:{l:'Estorno pendente',c:'#7a5800',bg:'#f5ecd0'}, convite:{l:'Convite pendente',c:'#7a5800',bg:'#f5ecd0'}, agendado:{l:'Agendado',c:'#7a5800',bg:'#f5ecd0'},
  divida:{l:'Em dívida',c:'#b42318',bg:'#f7e1de'}, bloq:{l:'Bloqueado',c:'#b42318',bg:'#f7e1de'}, retro:{l:'Data passada',c:'#b42318',bg:'#f7e1de'}, suspenso:{l:'Suspenso',c:'#b42318',bg:'#f7e1de'}, falhou:{l:'Falhou',c:'#b42318',bg:'#f7e1de'}, recusado:{l:'Recusado',c:'#b42318',bg:'#f7e1de'},
  congelado:{l:'Congelado',c:'#55524b',bg:'#ebe6d6'}, rede:{l:'Na rede',c:'#1d1c1a',bg:'#ebe6d6'}
};
const kz = n => { const s = Math.abs(n).toFixed(2).split('.'); return (n < 0 ? '−' : '') + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ',' + s[1] + ' Kz'; };
const kn = n => kz(n).replace(' Kz','');
const fill = (t, v) => t.replace(/\{(\w+)\}/g, (m, k) => v[k] != null ? v[k] : m);
const SAMPLE = { nome:'Kátia', valor:'45 000 Kz', data:'13/11', referencia:'00512 884 231', ginasio:'Mwangolé Fit' };
const EXP = { dinheiro:88000, express:64500, tpa:22000, transf:10000 };
const FIL = { talatona:{n:'Talatona',e:1240000,r:1196000,a:612,ch:'2,8%',o:'71%'}, kilamba:{n:'Kilamba',e:780000,r:712000,a:428,ch:'3,6%',o:'64%'}, maianga:{n:'Maianga',e:430000,r:394000,a:244,ch:'3,1%',o:'58%'} };
const LINES = [{t:'Estorno a aguardar aprovação · Edson Mateus',f:'talatona',v:30000},{t:'Desconto acima do limite (25%)',f:'talatona',v:14000},{t:'2 subscrições activadas sem pagamento',f:'kilamba',v:60000},{t:'Diferença no fecho de caixa · tarde',f:'kilamba',v:8000},{t:'Mensalidades em atraso há mais de 30 dias',f:'maianga',v:36000}];
const FUGAS = [{t:'2 subscrições activadas sem pagamento por Rui Manuel',f:'kilamba',h:'hoje 09:14'},{t:'Membro gratuito com 14 check-ins esta semana',f:'talatona',h:'ontem'},{t:'Movimento de caixa às 23:12, fora do horário',f:'maianga',h:'sábado'},{t:'Operador com estornos 3× acima da média',f:'kilamba',h:'esta semana'}];
const OCC = [22,48,64,41,28,20,24,30,26,22,30,52,78,92,70,44,18];
const LEDGER = [
  {id:1,h:'09:12',d:'Mensalidade Rede',o:'Ana Domingos · #4821',m:'Multicaixa Express',v:45000,st:'ok',fac:'FR TAL/2026/1201'},
  {id:2,h:'08:55',d:'Bar · 2 águas, 1 batido',o:'Venda #1093',m:'Dinheiro',v:3500,st:'ok',fac:'FR TAL/2026/1200'},
  {id:3,h:'08:40',d:'Estorno · cobrança duplicada',o:'Edson Mateus · #4790',m:'TPA',v:-30000,st:'pendente',fac:'NC TAL/2026/0031',note:'Estorno pedido às 08:40. A aguardar aprovação do dono.'},
  {id:4,h:'08:21',d:'Inscrição Local',o:'Kátia Muondo · #4822',m:'TPA',v:30000,st:'ok',fac:'FR TAL/2026/1199'},
  {id:5,h:'08:02',d:'Despesa · limpeza',o:'Recibo anexado',m:'Dinheiro',v:-12500,st:'ok',fac:'—'},
  {id:6,h:'07:48',d:'Mensalidade com data de 20/10',o:'Mário Sebastião · #4511',m:'Dinheiro',v:30000,st:'retro',fac:'—',note:'Movimentos com data passada precisam de aprovação. Pedido enviado ao dono.'},
  {id:7,h:'07:30',d:'Mensalidade Híbrido',o:'Joana Kiala · #4602',m:'Transferência',v:38000,st:'ok',fac:'FR TAL/2026/1198'},
  {id:8,h:'07:00',d:'Abertura de caixa',o:'Turno da manhã',m:'Dinheiro',v:20000,st:'ok',fac:'—'}
];
const PLANS = [{id:'local',n:'Local',scope:'Local',d:'Só a filial Talatona',p:30000},{id:'rede',n:'Rede',scope:'Rede',d:'Todas as filiais',p:45000},{id:'hibrido',n:'Híbrido',scope:'Híbrido',d:'Talatona + 4 entradas/mês noutras',p:38000},{id:'teste',n:'Teste grátis',scope:'7 dias',d:'1 por pessoa, validado por BI e telefone',p:0,disabled:true,note:'Já usado por este BI em 12/03/2026'}];
const PLANOS = [{id:1,n:'Local Mensal',scope:'Local',p:30000,acesso:'Filial de inscrição',hor:'06:00–22:00',desc:'10%',ativos:412},{id:2,n:'Rede Mensal',scope:'Rede',p:45000,acesso:'Todas as filiais',hor:'06:00–22:00',desc:'10%',ativos:286},{id:3,n:'Híbrido',scope:'Híbrido',p:38000,acesso:'Base + 4 entradas/mês',hor:'06:00–22:00',desc:'10%',ativos:142},{id:4,n:'Piscina Manhã',scope:'Por horário',p:15000,acesso:'Piscina · Talatona',hor:'06:00–10:00',desc:'5%',ativos:58},{id:5,n:'Rede Anual',scope:'Rede',p:450000,acesso:'Todas as filiais',hor:'06:00–22:00',desc:'15%',ativos:96},{id:6,n:'Estudante',scope:'Local',p:22000,acesso:'Filial de inscrição',hor:'10:00–17:00',desc:'0%',ativos:0}];
const REGRAS = [['Regime de turnos','2 turnos · Manhã 06–14 · Tarde 14–22'],['Tolerância antes de bloquear','7 dias'],['Desconto máximo · recepção','10%'],['Congelamento máximo por ano','30 dias'],['Teste grátis','1 por BI e telefone'],['Movimentos com data passada','Exigem aprovação do dono'],['Aviso de mudança de preço','SMS 30 dias antes']];
const RULES = [
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
const LOG = [
  {id:1,h:'10:00',n:'Mário Sebastião',tel:'923 114 802',a:'Vence em 3 dias',ch:'SMS',st:'agendado',why:'Na fila'},
  {id:2,h:'10:00',n:'Paulina Muxima',tel:'912 778 340',a:'Vence em 3 dias',ch:'SMS',st:'agendado',why:'Na fila'},
  {id:3,h:'09:14',n:'Kátia Muondo',tel:'923 456 789',a:'Boas-vindas',ch:'WhatsApp',st:'entregue',why:'Lida 09:15'},
  {id:4,h:'08:00',n:'Yola Fernandes',tel:'931 220 517',a:'Em atraso',ch:'SMS',st:'entregue',why:''},
  {id:5,h:'08:00',n:'Délcio Ngola',tel:'924 663 091',a:'Em atraso',ch:'SMS',st:'entregue',why:''},
  {id:6,h:'08:00',n:'Ivone Cassoma',tel:'92 300 1',a:'Em atraso',ch:'SMS',st:'falhou',why:'Número inválido'},
  {id:7,h:'07:42',n:'Ana Domingos',tel:'923 870 115',a:'Pagamento confirmado',ch:'SMS',st:'entregue',why:''},
  {id:8,h:'Ontem',n:'Wilson Tchiyaka',tel:'926 551 004',a:'Vence hoje',ch:'SMS',st:'falhou',why:'Telefone desligado'}
];
const APPR = [
  {id:'a1',k:'Estorno · Talatona · 08:40',t:'Edson Mateus · cobrança duplicada no TPA. Pedido por Celma Bento.',v:-30000},
  {id:'a2',k:'Fecho de caixa · Kilamba',t:'Diferença no turno da tarde. Justificação: troco dado a mais.',v:-8000},
  {id:'a3',k:'Preço · Rede Mensal',t:'De 45 000 para 50 000 Kz. Os 286 membros recebem SMS 30 dias antes.',v:50000}
];
const NAV = [['d1','Recepção'],['d2','Inscrição'],['d3','Membros'],['d4','Caixa'],['d5','Tesouraria'],['d6','Painel'],['d7','Planos'],['d8','Rede'],['d9','Avisos SMS']];
Object.assign(ST, { conciliado:{l:'Conciliado',c:'#2e7d4f',bg:'#e3efe6'}, comissao:{l:'Comissão',c:'#7a5800',bg:'#f5ecd0'}, falta:{l:'Não encontrado',c:'#b42318',bg:'#f7e1de'}, porpagar:{l:'Por pagar',c:'#7a5800',bg:'#f5ecd0'}, validada:{l:'Validada',c:'#2e7d4f',bg:'#e3efe6'}, recusada:{l:'Recusada',c:'#b42318',bg:'#f7e1de'}, liquidado:{l:'Liquidado',c:'#2e7d4f',bg:'#e3efe6'}, aliquidar:{l:'A liquidar',c:'#7a5800',bg:'#f5ecd0'}, certo:{l:'Certo',c:'#2e7d4f',bg:'#e3efe6'}, aprovacao:{l:'Em aprovação',c:'#7a5800',bg:'#f5ecd0'} });
const CATS = {1:'Mensalidades',2:'Bar',3:'Estornos',4:'Inscrições',5:'Despesas',6:'Mensalidades',7:'Mensalidades',8:'Caixa'};
LEDGER.forEach(r => { r.dia = 'Hoje'; r.turno = 'manha'; r.cat = CATS[r.id]; });
[ {id:9,h:'18:40',d:'Mensalidade Rede',o:'Paulina Muxima · #4702',m:'Multicaixa Express',v:45000,st:'ok',fac:'FR TAL/2026/1196',turno:'tarde',cat:'Mensalidades'},
  {id:10,h:'17:15',d:'Bar · 4 batidos',o:'Venda #1088',m:'Dinheiro',v:6000,st:'ok',fac:'FR TAL/2026/1195',turno:'tarde',cat:'Bar'},
  {id:11,h:'16:02',d:'Inscrição Híbrido',o:'Wilson Tchiyaka · #4655',m:'TPA',v:38000,st:'ok',fac:'FR TAL/2026/1194',turno:'tarde',cat:'Inscrições'},
  {id:12,h:'14:00',d:'Abertura de caixa · tarde',o:'Teresa Lunda',m:'Dinheiro',v:20000,st:'ok',fac:'—',turno:'tarde',cat:'Caixa'},
  {id:13,h:'13:55',d:'Sangria · para o cofre',o:'Celma Bento',m:'Dinheiro',v:-60000,st:'ok',fac:'—',turno:'manha',cat:'Caixa'},
  {id:14,h:'11:20',d:'Despesa · manutenção passadeira',o:'Factura TecFit 0912',m:'Transferência',v:-85000,st:'ok',fac:'—',turno:'manha',cat:'Despesas'},
  {id:15,h:'09:05',d:'Mensalidade Local',o:'Edson Mateus · #4790',m:'Dinheiro',v:30000,st:'ok',fac:'FR TAL/2026/1188',turno:'manha',cat:'Mensalidades'},
  {id:16,h:'07:00',d:'Abertura de caixa · manhã',o:'Celma Bento',m:'Dinheiro',v:20000,st:'ok',fac:'—',turno:'manha',cat:'Caixa'}
].forEach(r => { r.dia = 'Ontem'; LEDGER.push(r); });
const MEMBERS = [
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
const BAN = { pago:'', vencer:'Vence em breve. Aviso SMS agendado para hoje às 10:00.', divida:'Mensalidade por pagar há 12 dias. Acesso bloqueado até pagar. 4 avisos SMS entregues.', bloq:'Plano expirou há 3 dias. Acesso bloqueado. Aviso SMS entregue hoje às 08:00.', congelado:'Plano congelado até 10/11/2026 a pedido do membro. Aviso de reactivação agendado.', rede:'Membro do Kianda Fitness. Acesso válido pela Rede MUNTU: 3 de 6 visitas este mês.' };
const AV = { pago:[['13/10 · 07:51','Pagamento confirmado','SMS','entregue'],['10/10 · 10:00','Vence em 3 dias','SMS','entregue']], vencer:[['Hoje · 10:00','Vence em 3 dias','SMS','agendado'],['13/09 · 07:40','Pagamento confirmado','SMS','entregue']], divida:[['08/10 · 10:00','Acesso bloqueado','SMS','entregue'],['04/10 · 10:00','Em atraso','SMS','entregue'],['01/10 · 08:00','Vence hoje','SMS','entregue'],['28/09 · 10:00','Vence em 3 dias','SMS','entregue']], bloq:[['Hoje · 08:00','Em atraso','SMS','entregue'],['23/10 · 08:00','Vence hoje','SMS','entregue']], congelado:[['09/11 · 09:00','Fim de congelamento','SMS','agendado'],['26/09 · 11:20','Plano congelado','SMS','entregue']], rede:[] };
const CX_HIST = [['26/10','Kilamba','Rui Manuel','Manhã','07:00–14:01',212000,212000,'certo',''],['25/10','Talatona','Teresa Lunda','Tarde','14:00–22:04',164500,164500,'certo',''],['25/10','Talatona','Celma Bento','Manhã','07:00–14:02',188000,186000,'aprovado','Troco errado · aprovado'],['25/10','Kilamba','Rui Manuel','Tarde','14:00–22:10',143000,135000,'aprovacao','Troco dado a mais'],['25/10','Maianga','Adilson Neto','Manhã','06:58–14:00',96000,96000,'certo',''],['24/10','Talatona','Teresa Lunda','Tarde','14:00–22:01',171000,171000,'certo',''],['24/10','Talatona','Celma Bento','Manhã','07:00–14:00',192500,192500,'certo',''],['24/10','Kilamba','Rui Manuel','Tarde','14:02–22:15',150000,138000,'recusado','Sem justificação válida']];
const ACC = [{id:'cxm',t:'Dinheiro',n:'Caixa Talatona · Manhã',v:88000,meta:'Aberto às 07:00 · Celma Bento'},{id:'cxt',t:'Dinheiro',n:'Caixa Talatona · Tarde',v:0,meta:'Abre às 14:00 · Rui Manuel'},{id:'cof',t:'Dinheiro',n:'Cofre · Talatona',v:340000,meta:'Última sangria ontem às 13:55'},{id:'bai',t:'Banco',n:'BAI · Conta à ordem',v:2140000,meta:'Extracto importado hoje às 08:00'},{id:'mcx',t:'A liquidar',n:'Multicaixa Express',v:64500,meta:'Liquida amanhã na conta BAI'},{id:'tpa',t:'A liquidar',n:'TPA · BFA',v:22000,meta:'Liquida amanhã · comissão 1,5%'}];
const AGE = [['1–7 dias',18,612000,'#c99a1b'],['8–30 dias',16,584000,'#c8640c'],['31–60 dias',9,342000,'#b42318'],['Mais de 60 dias',3,135000,'#1d1c1a']];
const DEV = [['Délcio Ngola','12 dias',45000,'Acesso bloqueado · 08/10'],['Ivone Cassoma','41 dias',90000,'SMS falhou · número inválido'],['Gerson Kiluange','64 dias',135000,'Acesso bloqueado · 30/08'],['Marta Kapalo','9 dias',38000,'Em atraso · 20/10'],['Yola Fernandes','3 dias',30000,'Em atraso · hoje 08:00']];
const PAG = [{id:'p1',d:'Salários de Outubro',c:'Pessoal',ve:'30/10',v:1280000,st:'agendado'},{id:'p2',d:'Renda Talatona · Novembro',c:'Instalações',ve:'05/11',v:450000,st:'porpagar'},{id:'p3',d:'ENDE · Electricidade',c:'Serviços',ve:'28/10',v:96400,st:'porpagar'},{id:'p4',d:'EPAL · Água',c:'Serviços',ve:'02/11',v:18200,st:'porpagar'},{id:'p5',d:'Manutenção de passadeiras',c:'Equipamento',ve:'25/10',v:85000,st:'pago'},{id:'p6',d:'Pacote de 5 000 SMS',c:'Comunicação',ve:'15/11',v:60000,st:'agendado'},{id:'p7',d:'Rede MUNTU · liquidação',c:'Rede',ve:'31/10',v:108000,st:'agendado'}];
const CON = [{id:'c1',d:'25/10',o:'Multicaixa Express',r:'Lote 2510-112',sis:1240000,ext:1240000,st:'conciliado',why:''},{id:'c2',d:'25/10',o:'TPA · BFA',r:'Lote 88341',sis:318000,ext:313230,st:'comissao',why:'Comissão de 1,5% do banco',act:'Lançar comissão'},{id:'c3',d:'25/10',o:'Depósito do cofre',r:'Talão 004512',sis:400000,ext:400000,st:'conciliado',why:''},{id:'c4',d:'24/10',o:'Transferência · Joana Kiala',r:'Ref. 7781',sis:38000,ext:0,st:'falta',why:'Não aparece no extracto BAI',act:'Pedir comprovativo'},{id:'c5',d:'24/10',o:'Multicaixa Express',r:'Lote 2410-098',sis:1105500,ext:1105500,st:'conciliado',why:''}];
const OPS = [['Celma Bento','Manhã · Talatona','manha',312,'2 · 6%',1,-2000,''],['Rui Manuel','Tarde · Kilamba','tarde',204,'9 · 21%',6,-8000,'Rever'],['Teresa Lunda','Tarde · Talatona','tarde',188,'1 · 4%',0,0,''],['Adilson Neto','Manhã · Maianga','manha',141,'3 · 10%',2,0,'']];
const TREND = [['Mai',2.21,2.05],['Jun',2.26,2.12],['Jul',2.30,2.08],['Ago',2.35,2.19],['Set',2.41,2.27],['Out',2.45,2.30]];
const PARC = [{n:'Kianda Fitness',c:'Luanda · Talatona',since:'Mar 2025',rec:64,env:31,st:'ativo',why:'',tel:'923 400 110'},{n:'Benguela Gym Center',c:'Benguela',since:'Jun 2025',rec:12,env:18,st:'ativo',why:'',tel:'934 220 018'},{n:'Huambo Power',c:'Huambo',since:'—',rec:0,env:0,st:'convite',why:'Convite enviado a 22/10. Ainda sem resposta.',tel:'941 551 300'},{n:'Lobito Strong',c:'Lobito',since:'Jan 2026',rec:22,env:9,st:'suspenso',why:'Liquidação de Setembro por pagar. Visitas recusadas até regularizar.',tel:'938 117 640'},{n:'Viana Box',c:'Luanda · Viana',since:'Ago 2025',rec:30,env:14,st:'ativo',why:'',tel:'925 870 334'}];
const VIS = [['09:02','Bruno Kianda','Kianda Fitness','in','Rede Kianda','validada',''],['08:47','Sara Lopes','Viana Box','in','Rede Viana','validada',''],['08:30','Hélder Pinto','Lobito Strong','in','Rede Lobito','recusada','Parceiro suspenso'],['Ontem 19:10','Nelson Kapinga','Benguela Gym Center','out','Rede Anual','validada',''],['Ontem 18:22','Ana Domingos','Kianda Fitness','out','Rede Mensal','validada',''],['Ontem 07:15','Mário Sebastião','Viana Box','out','Local Trimestral','recusada','Plano sem acesso à rede'],['Ontem 06:58','Inês Tavares','Kianda Fitness','in','Rede Kianda','validada','']];
const LIQ = [['Outubro','Kianda Fitness',64,31,'aliquidar','31/10'],['Outubro','Viana Box',30,14,'aliquidar','31/10'],['Outubro','Lobito Strong',22,9,'aliquidar','31/10'],['Outubro','Benguela Gym Center',12,18,'aliquidar','31/10'],['Setembro','Kianda Fitness',58,27,'liquidado','30/09'],['Setembro','Viana Box',26,12,'liquidado','30/09'],['Setembro','Lobito Strong',20,6,'porpagar','30/09']];
const REDE_REG = [['Preço por visita','1 500,00 Kz'],['Visitas por membro por mês','Até 6'],['Planos com acesso à rede','Rede Mensal · Rede Anual · Híbrido'],['Dados partilhados','Nome, foto e validade do acesso'],['Comissão MUNTU','5% do saldo positivo'],['Liquidação','Automática no último dia do mês']];
const PV = 1500;
class Component extends DCLogic {
  state = { xRole: this.props.role || (new URLSearchParams(location.search).get('role')) || null, xTel:'924 310 115', xPw:'', xShowPw:false, xErr:'', xForgot:false,
    qTab:'open', qType:'all', qSel:null, tStepX:0, tq:{ n5000:0, n2000:0, n1000:0, n500:0, n200:0, coin:0 }, tRev:false, tOpt:'', tJust:'', tPay:{}, tPend:{}, tExc:false, tExcMot:'', tPw:'', tDone:false, tBusy:false, tErr:'',
    nb:{ nome:'Paulo Neto', tel:'927 220 001', email:'', pw:'', gym:'Mwangolé Fit', nif:'5417 2290 11', city:'Luanda', fils:['Talatona','Kilamba','Maianga'], ok:false }, nStep:1, nErr:'', imL:{}, smText:null, smWhen:'now', smAud:{ mem:true, stf:true }, smSent:false,
    cMem:'MS', cSel:null, cDoc:'fr', cMeio:'TPA', cCh:['SMS'], cErr:'', cRes:null, cDocs:[], seqN:1204,
    kTab:'risk', kLim:7, kRLim:7, kOpen:null, kMot:'', kRes:'', kDone:{}, lSt:{}, lSent:{}, lTab:'pot',
    toT:'Todos', pri:'normal', aText:'', sentA:[], acts:null, acMsg:'', acKind:'', xTipo:'desafio', xT:'', xD:'', xIni:'2026-11-04', xFim:'2026-11-30', xCap:'20', xExtra:'', xFil:'Talatona', xErr2:'',
    ptMark:{}, rqSt:{}, cmpM:'ret', nfShow:false, nfN:'Viana', nfFrom:'Talatona', nfX:{ planos:true, horarios:true, regras:true, perm:true, avisos:true }, nfDone:false,
    gTab:'reg', rgV:{ dRec:10, dGes:25, dFin:20000, eFin:0 }, rgSaved:false, cfCat:'Todos', cfExtra:0, gImp:{}, gImpDone:false, riRew:'mes', riCond:2, riRev:{}, readN:{}, lgGym:0, lgGOpen:false, lgRole:'rececao', lgTel:'923 481 220', lgPin:'', lgFil:'talatona', lgTurno:'manha', lgErr:'', screen: this.props.screen || (new URLSearchParams(location.search).get('screen')) || 'd1', filial:'todas', caixa:true, step:0, secs:0, plan:'rede', pay:'express', payState:'idle', sent:false, sendCh:'SMS', mState:'divida',
    counts:{dinheiro:'86000',express:'64500',tpa:'22000',transf:'10000'}, close:'count', just:'', sel:null, est:'none', motivo:'', meio:'Todos', editPlan:null,
    smsDone:{}, mSms:[], composer:false, compTpl:0, compText:null, rules: RULES.map(r => ({ on:r.on, tpl:r.tpl, hora:r.hora, ch:r.ch })), rule:1, testSent:false, saved:false, logF:'Todos', resent:{}, appr:{}, turno:'manha', mSel:'4821', mTab:'resumo', mQ:'', mF:'Todos', credM:{}, reenvio:false, cxTab:'atual', cxMovs:[], cxForm:null, cxVal:'', cxMot:'', notas:{5000:'12',2000:'8',1000:'6',500:'4',200:'5',100:'8',50:'4'}, passado:false, tsTab:'mov', periodo:'Hoje', cat:'Todas', trf:false, trfDe:'cxm', trfPara:'cof', trfV:'', trfMot:'', trfDone:'', trfs:[], recon:{}, pagos:{}, dPer:'Mês', rTab:'parc', rSel:0 };
  componentDidMount() { const sp = this.props.screen || new URLSearchParams(location.search).get('screen'); const stp = +(this.props.step || new URLSearchParams(location.search).get('step')) || 0; if (sp==='dt' && stp && stp < 4) this.setState({ tStepX:stp }); if (sp==='dt' && stp===4) this.setState({ tq:{ n5000:10, n2000:8, n1000:9, n500:6, n200:5, coin:1000 }, tRev:true, tOpt:'reg', tJust:'Recontado duas vezes. Falta uma nota de 5 000.', tPay:{ tpa:'ok', exp:'ok', ref:'ok', pen:'pend' }, tPend:{ q1:'rec', q2:'rec', q3:'rec', q4:'res', q5:'prob' }, tStepX:4 }); if (sp==='dn') { const st = stp || 1; this.setState({ nStep:st, imL: st>=4 ? { mem:true, stf:true } : {} }); }  this.t = setInterval(() => { const s = this.state; if (s.screen === 'd2' && !s.sent) this.setState({ secs: s.secs + 1 }); }, 1000); }
  componentWillUnmount() { clearInterval(this.t); clearTimeout(this.p); }
  loginVals() {
    const s = this.state, rec = s.lgRole === 'rececao';
    const d = new Date(), hoje = d.toLocaleDateString('pt-PT', { weekday:'long', day:'numeric', month:'long' });
    const GY = [{ i:'MF', n:'Mwangolé Fit', d:'3 filiais · Luanda', f:'Talatona · Kilamba · Maianga', bg:'#1d1c1a', c:'#fbfaf7', fil:[['talatona','Talatona'],['kilamba','Kilamba'],['maianga','Maianga']] },
      { i:'MS', n:'Mwangolé Studio', d:'1 filial · Luanda', f:'Alvalade', bg:'#c8640c', c:'#1d1c1a', fil:[['alvalade','Alvalade']] },
      { i:'KF', n:'Kianda Fitness', d:'1 filial · Luanda', f:'Talatona', bg:'#55524b', c:'#fbfaf7', fil:[['talatona','Talatona']] }];
    const g = GY[s.lgGym];
    return { hoje, rec, g, gOpen:s.lgGOpen, gLabel: s.lgGOpen ? 'Fechar' : 'Trocar', gToggle: () => this.setState({ lgGOpen: !s.lgGOpen }),
      gyms: GY.map((x,i) => Object.assign({}, x, { sel: i===s.lgGym ? '#f4f1ea' : 'transparent', tick: i===s.lgGym ? '✓' : '', pick: () => this.setState({ lgGym:i, lgGOpen:false, lgFil: x.fil[0][0] }) })),
      fils: g.fil.map(([v,l]) => ({ v, l })), tel:s.lgTel, pin:s.lgPin, filial:s.lgFil, turno:s.lgTurno, err:s.lgErr,
      cta: rec ? 'Abrir turno' : 'Entrar na gestão',
      roles: [['rececao','Recepção'],['dono','Dono · Gestor']].map(([k,l]) => ({ l, on: s.lgRole===k, bg: s.lgRole===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ lgRole:k, lgErr:'' }) })),
      setTel: e => this.setState({ lgTel:e.target.value, lgErr:'' }), setPin: e => this.setState({ lgPin:e.target.value.replace(/\D/g,'').slice(0,4), lgErr:'' }),
      setFilial: e => this.setState({ lgFil:e.target.value }), setTurno: e => this.setState({ lgTurno:e.target.value }),
      entrar: () => { const t = String(s.lgTel).replace(/\D/g,''); if (t.length < 9) return this.setState({ lgErr:'Indique o número de telemóvel com 9 dígitos.' }); if (s.lgPin.length !== 4) return this.setState({ lgErr:'O PIN tem 4 dígitos.' }); this.setState({ lgErr:'', lgPin:'', filial: rec ? s.lgFil : 'todas', turno: rec ? s.lgTurno : (this.state.turno) }); this.go(rec ? 'd1' : 'd6'); },
      facts: [[g.fil.length + '', g.fil.length === 1 ? 'Filial' : 'Filiais'],['06:00','Abertura'],['22:00','Fecho']].map(([v,l]) => ({ v, l })) };
  }
  go = screen => { this.setState({ screen, cobOpen:false }); try { window.scrollTo(0, 0); } catch (e) {} };
  upd = (i, patch) => this.setState(st => ({ rules: st.rules.map((r, j) => j === i ? Object.assign({}, r, patch) : r), saved:false, testSent:false }));
  extra(s) {
    const hasT = this.props.turnos !== false, tk = hasT ? s.turno : 'dia';
    const TL = { manha:'Turno da manhã', tarde:'Turno da tarde', dia:'Dia inteiro' }, TS = { manha:'Manhã', tarde:'Tarde' };
    const filialL = s.filial==='todas' ? 'Todas as filiais' : FIL[s.filial].n, filialC = s.filial==='todas' ? 'Talatona' : FIL[s.filial].n;
    const ch = (key, cur, more) => l => ({ l, pressed: cur===l, bg: cur===l?'#1d1c1a':'transparent', color: cur===l?'#fbfaf7':'#1d1c1a', onClick:() => this.setState(Object.assign({ [key]:l }, more||{})) });
    const tabs = (key, cur, list) => list.map(([id,l]) => ({ l, sel: cur===id ? 'true' : 'false', bar: cur===id?'inset 0 -3px 0 #c8640c':'none', color: cur===id?'#1d1c1a':'#55524b', onClick:() => this.setState({ [key]:id }) }));
    const smsOf = n => ({ smsInfo: s.smsDone[n] ? 'SMS entregue às ' + s.smsDone[n] : '', smsDis: !!s.smsDone[n], smsOp: s.smsDone[n] ? .35 : 1, sms:() => this.setState(st => ({ smsDone: Object.assign({}, st.smsDone, { [n]:'09:41' }) })) });
    const goMember = id => this.setState({ screen:'d3', mSel:id, mTab:'resumo', composer:false, compText:null });
    const toInsc = () => this.setState({ screen:'d2', step:1 });
    const A = (l, primary, fn) => ({ l, onClick: fn, border: primary?'0':'1px solid #1d1c1a', bg: primary?'#1d1c1a':'transparent', color: primary?'#fbfaf7':'#1d1c1a' });
    const byName = n => (MEMBERS.find(m => m.n===n) || MEMBERS[0]).id;
    const checkins = [['07:42','Ana Domingos','Rede · Mensal','Talatona','pago'],['07:38','Edson Mateus','Local · Mensal','Talatona','pago'],['07:31','Joana Kiala','Híbrido','Kilamba → Talatona','rede','2 de 4 entradas noutra filial'],['07:25','Mário Sebastião','Local · Trimestral','Talatona','vencer','Vence amanhã · SMS às 10:00'],['07:12','Yola Fernandes','Local · Mensal','Talatona','bloq','Expirou há 3 dias'],['07:04','Nelson Kapinga','Rede · Anual','Talatona','pago']]
      .map(([h,n,p,f,k,why]) => ({ h,n,p,f,s:ST[k],why:why||'', onClick:() => goMember(byName(n)) }));
    // membros
    const mfm = { 'Todos':null, 'Activos':['pago'], 'Em dívida':['divida','bloq'], 'A vencer':['vencer'], 'Congelados':['congelado'], 'Rede':['rede'] };
    const q = s.mQ.trim().toLowerCase();
    const list = MEMBERS.filter(m => (!mfm[s.mF] || mfm[s.mF].indexOf(m.st) >= 0) && (!q || (m.n + ' ' + m.tel + ' ' + m.id).toLowerCase().indexOf(q) >= 0));
    const ini = n => n.split(' ').map(w => w[0]).slice(0,2).join('');
    const mList = list.map(m => ({ ini: ini(m.n), n:m.n, sub: m.plano + ' · ' + m.base, s: ST[m.st], bg: s.mSel===m.id?'#ebe6d6':'transparent', pressed: s.mSel===m.id, onClick:() => goMember(m.id) }));
    const M0 = MEMBERS.find(m => m.id===s.mSel) || MEMBERS[0];
    const isRede = M0.st==='rede', late = M0.st==='divida' || M0.st==='bloq';
    const months = [['01/10','Outubro'],['01/09','Setembro'],['01/08','Agosto'],['01/07','Julho'],['01/06','Junho'],['01/05','Maio']];
    const meios = ['Express','Express','Dinheiro','TPA','Express','Transferência'];
    const pays = isRede ? [] : months.map(([d,mo], i) => ({ d: d.slice(0,5), desc:(M0.plano.indexOf('Anual')>=0?'Prestação ':'Mensalidade ') + mo, m: meios[i], f:'FR TAL/2026/' + (1184 - i*203), v: kz(M0.valor), s: ST[i===0 && late ? 'divida' : 'pago'] }));
    const tN = M0.turno==='Tarde' ? ['18:40','19:05','18:12','19:30','18:55','18:20'] : ['07:15','06:58','07:32','07:05','06:50','07:40'];
    const dts = late ? ['26/10','14/10','12/10','10/10','08/10','06/10'] : ['26/10','24/10','23/10','21/10','19/10','17/10'];
    const entradas = dts.map((d,i) => { const bad = i===0 && late; return { d: d + ' · ' + tN[i], t: isRede ? 'Manhã' : M0.turno, f: isRede ? 'Talatona · visita' : (i===2 && M0.plano.indexOf('Rede')>=0 ? 'Kilamba' : M0.base), m: bad ? 'Recusada · pagamento em falta' : (i%3===1 ? 'Reconhecimento facial' : 'QR dinâmico'), c: bad ? '#b42318' : '#55524b' }; }).slice(0, isRede ? 3 : 6);
    const avisos = s.mSms.filter(x => x.mid===M0.id).concat(AV[M0.st].map(([d,n,c,k]) => ({ d, n, ch:c, s:ST[k] })));
    const acts = { pago:[A('Check-in',1),A('Cobrar',0,toInsc),A('Congelar')], vencer:[A('Renovar',1,toInsc),A('Check-in'),A('Lembrar por SMS',0,smsOf(M0.n).sms)], divida:[A('Cobrar ' + kz(M0.valor),1,toInsc),A('Pedir excepção')], bloq:[A('Renovar',1,toInsc),A('Pedir excepção')], congelado:[A('Descongelar',1),A('Ver pedido')], rede:[A('Libertar acesso',1),A('Ver auditoria')] }[M0.st];
    const prox = { pago:'13/11', vencer: M0.d==='01' ? 'Amanhã' : 'Em ' + Number(M0.d) + ' dias', divida:'Em atraso', bloq:'Expirou 23/10', congelado:'10/11', rede:'—' }[M0.st];
    const first = M0.n.split(' ')[0], last = M0.n.split(' ').slice(-1)[0];
    const strip = t => t.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const credT = s.credM[M0.id];
    const mm = { id:M0.id, n:M0.n, ini:ini(M0.n), since:M0.since, base:M0.base, plano:M0.plano, s:ST[M0.st], banner:BAN[M0.st], dias:M0.d, diasL: isRede?'Visitas restantes':M0.st==='congelado'?'Dias em pausa':'Dias restantes', prox, entMes:M0.e,
      appL: M0.app==='activa'?'Activa':M0.app==='pendente'?(credT?'Enviada':'Por activar'):'—',
      appTxt: M0.app==='activa' ? 'App activa. Último acesso hoje às 07:10. O membro vê o QR, o plano e os pagamentos.' : M0.app==='pendente' ? 'Ainda não entrou na área do cliente. Envie as credenciais para activar o acesso ao QR, plano e pagamentos.' : 'Gerida pelo ginásio de origem.',
      canCred: M0.app==='pendente' && !credT, credInfo: credT ? 'Credenciais enviadas por SMS às ' + credT + '. Código válido 24 h.' : '',
      sendCred:() => this.setState(st => ({ credM: Object.assign({}, st.credM, { [M0.id]:'09:52' }) })),
      actions:acts, filiais: isRede ? ['Talatona · visita'] : M0.plano.indexOf('Rede')>=0 ? [M0.base + ' · base'].concat(['Talatona','Kilamba','Maianga'].filter(f => f!==M0.base)) : [M0.base + ' · base'],
      pays, pays3: pays.slice(0,3), noPays: isRede, entradas, ent3: entradas.slice(0,3), avisos,
      tel:M0.tel, nif: isRede ? '—' : '00' + M0.id.replace(/\D/g,'') + '7LA04', email: isRede ? '—' : strip(first) + '.' + strip(last) + '@gmail.com', nasc: isRede ? '—' : '14/08/1993', emerg: isRede ? '—' : 'Família ' + last + ' · 923 000 112', turno:M0.turno };
    const mTabList = isRede ? [['resumo','Resumo'],['entradas','Entradas']] : [['resumo','Resumo'],['pagamentos','Pagamentos'],['entradas','Entradas'],['avisos','Avisos'],['dados','Dados']];
    const mt = {}; ['resumo','pagamentos','entradas','avisos','dados'].forEach(k => mt[k] = s.mTab===k);
    const MV = { nome:first, valor:kz(M0.valor).replace(',00',''), data:'01/10', referencia:'00512 884 ' + M0.id.replace(/\D/g,'').slice(-3), ginasio:'Mwangolé Fit' };
    const TPLS = [['Lembrete', s.rules[3].tpl],['Referência','{ginasio}: {nome}, paga {valor} com a referência {referencia} no Multicaixa Express ou ATM.'],['Livre','']];
    const compText = s.compText != null ? s.compText : fill(TPLS[s.compTpl][1], MV);
    // inscrição
    const credMsg = fill('{ginasio}: Bem-vinda, {nome}! Entra na tua área de cliente em muntu.ao/app · Utilizador: 923 456 789 · Código: 482117 (válido 24 h). O teu QR de acesso já está activo.', SAMPLE);
    // caixa
    const NOTAS = [5000,2000,1000,500,200,100,50];
    const revealed = s.close !== 'count';
    let cash = 0;
    const notaRows = NOTAS.map(v => { const qn = parseInt(s.notas[v], 10) || 0; cash += qn*v; return { l: kn(v).replace(',00',''), id:'n'+v, q: s.notas[v], sub: kz(qn*v), ro: revealed, onInput: e => { const x = e.target.value; this.setState(st => ({ notas: Object.assign({}, st.notas, { [v]:x }) })); } }; });
    const movEff = s.cxMovs.reduce((a,m) => a + m.v, 0), expCash = 88000 + movEff, cdif = cash - expCash;
    const FORML = { sangria:'Sangria · para o cofre', reforco:'Reforço de troco', despesa:'Despesa paga em dinheiro' };
    const baseMovs = LEDGER.filter(r => r.dia==='Hoje' && r.turno==='manha');
    const turnoMovs = s.cxMovs.concat(baseMovs).map(r => ({ h:r.h, d:r.d, m:r.m, v:(r.v>0?'+':'') + kz(r.v), c: r.v<0?'#b42318':'#1d1c1a' }));
    const openForm = t => () => this.setState({ cxForm:t, cxVal:'', cxMot:'' });
    const cxHist = CX_HIST.filter(r => (tk==='dia' || r[3]===TS[tk]) && (s.filial==='todas' || r[1]===FIL[s.filial].n)).map(([d,f,op,t,hr,e,c,st,why]) => ({ d,f,op,t: hasT ? 'Turno da ' + t.toLowerCase() : '',hr, e:kz(e), c:kz(c), dif: c===e ? '—' : kz(c-e), dc: c<e ? '#b42318' : '#1d1c1a', s:ST[st], why }));
    // tesouraria
    const per = s.periodo;
    const L2 = LEDGER.filter(r => (per==='Mês' || r.dia===per) && (tk==='dia' || r.turno===tk) && (s.meio==='Todos' || r.m===s.meio) && (s.cat==='Todas' || r.cat===s.cat));
    const ledger = L2.map(r => Object.assign({}, r, { dia: r.dia==='Hoje' ? '' : r.dia, tl: hasT ? TS[r.turno] : '', v:(r.v>0?'+':'') + kz(r.v), s:ST[r.st], pressed: s.sel===r.id, bg: s.sel===r.id?'#ebe6d6':'transparent', onClick:() => this.setState({ sel:r.id, est:'none', motivo:'' }) }));
    const ent = L2.reduce((a,r) => a + (r.v>0?r.v:0), 0), sai = L2.reduce((a,r) => a + (r.v<0?-r.v:0), 0);
    const selL = LEDGER.find(r => r.id===s.sel);
    const accs = ACC.filter(a => hasT || a.id!=='cxt').map(a => Object.assign({}, a, { n: !hasT && a.id==='cxm' ? 'Caixa Talatona' : a.n, v: a.v + s.trfs.reduce((x,t) => x + (t.para===a.id ? t.v : 0) - (t.de===a.id ? t.v : 0), 0) }));
    const saldo = accs.reduce((a,x) => a + x.v, 0);
    const pagar = PAG.map(p => { const st = s.pagos[p.id] ? 'pago' : p.st; return { d:p.d, c:p.c, ve: st==='pago' ? 'Pago' : p.ve, v:kz(p.v), s:ST[st], canPay: st==='porpagar', pay:() => this.setState(x => ({ pagos: Object.assign({}, x.pagos, { [p.id]:true }) })), raw: st==='pago' ? 0 : p.v }; });
    const maxAge = Math.max.apply(null, AGE.map(a => a[2]));
    // painel
    const F = { 'Semana':.24, 'Mês':1, 'Trimestre':2.9 }[s.dPer];
    const fk = s.filial, all = fk==='todas';
    const base6 = all ? Object.values(FIL).reduce((a,f) => ({ e:a.e+f.e, r:a.r+f.r }), {e:0,r:0}) : FIL[fk];
    const rnd = x => Math.round(x/500)*500;
    const de = rnd(base6.e*F), dr = rnd(base6.r*F);
    const dash = { scope: all ? 'Todas as filiais' : FIL[fk].n, e:kn(de), r:kn(dr), d:kn(de-dr), taxa: (Math.round(dr/de*1000)/10).toFixed(1).replace('.',',') + '%', rec: kn(rnd(1180000*F*(all?1:FIL[fk].r/2302000))),
      lines: LINES.filter(l => all || l.f===fk).map(l => ({ t:l.t, f:FIL[l.f].n, v:kz(rnd(l.v*F)) })), fugas: FUGAS.filter(l => all || l.f===fk).map(l => Object.assign({}, l, { f:FIL[l.f].n })) };
    const TR = hasT ? [{k:'manha',l:'Manhã',h:'06:00–14:00',sh:.58,ci:1540,nv:22,dc:-6000},{k:'tarde',l:'Tarde',h:'14:00–22:00',sh:.42,ci:1120,nv:16,dc:-10000}] : [{k:'dia',l:'Dia inteiro',h:'06:00–22:00',sh:1,ci:2660,nv:38,dc:-16000}];
    const turnoRows = TR.map(t => ({ l:t.l, h:t.h, v:kz(rnd(dr*t.sh)), w: Math.round(t.sh*100) + '%', c: (tk===t.k || tk==='dia' && t.k==='manha') ? '#c8640c' : '#1d1c1a', meta: Math.round(t.ci*F) + ' check-ins · ' + Math.round(t.nv*F) + ' novos membros · diferenças de caixa ' + kz(rnd(t.dc*F)) }));
    const trend = TREND.map(([m,e,r], i) => ({ m, ev: e.toFixed(2).replace('.',',') + ' M Kz', rv: r.toFixed(2).replace('.',',') + ' M Kz', he: Math.round((e-1.6)/0.9*100) + '%', hr: Math.round((r-1.6)/0.9*100) + '%', c: i===TREND.length-1 ? '#c8640c' : '#1d1c1a' }));
    const ops = OPS.filter(o => tk==='dia' || o[2]===tk).map(([n,t,k,cob,desc,est,dif,flag]) => ({ n, t, cob: Math.round(cob*F), desc, est, dif: dif===0 ? '—' : kz(rnd(dif*F)), c: flag ? '#b42318' : '#1d1c1a', flag }));
    // rede
    const parcs = PARC.map((p,i) => Object.assign({}, p, { v:(p.rec-p.env)*PV, i }));
    const ps0 = parcs[s.rSel] || parcs[0];
    const sgn = v => v===0 ? '—' : (v>0?'+':'') + kz(v);
    const visRow = v => ({ h:v[0], n:v[1], dir: v[3]==='in' ? v[2] + ' → Talatona' : 'Talatona → ' + v[2], p:v[4], v: v[5]==='validada' ? kz(PV) : '—', s:ST[v[5]], why: v[6] || (v[3]==='in' ? 'Recebida' : 'Enviada') });
    const pActs = { ativo:[A('Ver extracto',1),A('Suspender')], convite:[A('Reenviar convite',1)], suspenso:[A('Cobrar liquidação',1),A('Reactivar')] }[ps0.st];
    const recT = parcs.reduce((a,p) => a + p.rec, 0), envT = parcs.reduce((a,p) => a + p.env, 0);
    return {
      hasTurnos: hasT, turno: s.turno, setTurno: e => this.setState({ turno:e.target.value, sel:null }), turnoFull: TL[tk], turnoMin: tk==='tarde' ? 'turno da tarde' : 'turno da manhã', filialL, filialC,
      d1Eyebrow: 'Segunda, 26 Outubro · ' + TL[tk] + ' · ' + filialC, checkins, goD3:() => goMember('4821'),
      mQ:s.mQ, setMQ: e => this.setState({ mQ:e.target.value }), mChips: Object.keys(mfm).map(ch('mF', s.mF)), mList, mEmpty: mList.length===0, mCount: mList.length + (mList.length===1 ? ' membro' : ' membros'), mm, mTabs: tabs('mTab', s.mTab, mTabList), mt,
      compText, compCount: compText.length + ' caracteres · ' + Math.max(1, Math.ceil(compText.length/160)) + ' SMS', compEmpty: !compText.trim(), compOp: compText.trim()?1:.35,
      sendComp:() => this.setState(x => ({ composer:false, compText:null, mSms:[{ mid:M0.id, d:'Agora', n: TPLS[x.compTpl][0]==='Livre' ? 'Mensagem livre' : TPLS[x.compTpl][0], ch:'SMS', s:ST.entregue }].concat(x.mSms) })),
      credMsg, credCount: credMsg.length + ' caracteres · ' + Math.ceil(credMsg.length/160) + ' SMS', credState: s.sent ? 'Enviadas · aguarda primeiro acesso' : 'Por enviar',
      reenvioL: s.reenvio ? 'Reenviado' : 'Reenviar', reenviar: () => this.setState({ reenvio:true }),
      cxTabs: tabs('cxTab', s.cxTab, [['atual', hasT ? 'Turno actual' : 'Caixa de hoje'],['hist', hasT ? 'Histórico de turnos' : 'Histórico']]), cx:{ atual: s.cxTab==='atual', hist: s.cxTab==='hist' }, cxTurnoL: hasT ? 'Turno da manhã' : 'Caixa do dia',
      notaRows, cashTotal: kz(cash), elecRows: [['Multicaixa Express',64500],['TPA',22000],['Transferência',10000]].map(([l,v]) => ({ l, v:kz(v), s:ST.conciliado })),
      revealedC: revealed, expCashL: kz(expCash), cdifL: kz(cdif), cdifC: cdif<0 ? '#b42318' : '#2e7d4f', cxCount: String(turnoMovs.length).padStart(2,'0'),
      difBig: revealed ? kn(cdif) : '••••', difLabel: revealed ? (cdif===0 ? 'Caixa certo' : 'Precisa de justificação') : 'Oculta até fechar', difBg: !revealed ? '#ebe6d6' : cdif===0 ? '#e3efe6' : '#c8640c',
      cl:{ count: s.close==='count', zero: s.close==='revealed' && cdif===0, diff: s.close==='revealed' && cdif!==0, pending: s.close==='pending' },
      revelar:() => this.setState(st => ({ close:'revealed', counts: Object.assign({}, st.counts, { dinheiro: String(cash - movEff) }) })),
      turnoMovs, cxFormOn: !!s.cxForm, cxFormL: FORML[s.cxForm] || '', cxVal:s.cxVal, cxMot:s.cxMot, setCxVal: e => this.setState({ cxVal:e.target.value }), setCxMot: e => this.setState({ cxMot:e.target.value }),
      cxSangria: openForm('sangria'), cxReforco: openForm('reforco'), cxDespesa: openForm('despesa'), cxCancel:() => this.setState({ cxForm:null }),
      cxRegistar:() => { const v = parseFloat(String(s.cxVal).replace(/\s/g,'').replace(',','.')) || 0; if (!v) return; const sign = s.cxForm==='reforco' ? 1 : -1; this.setState(st => ({ cxMovs: [{ h:'09:' + (45 + st.cxMovs.length), d: FORML[st.cxForm] + (st.cxMot ? ' · ' + st.cxMot : ''), m:'Dinheiro', v: sign*v }].concat(st.cxMovs), cxForm:null, cxVal:'', cxMot:'' })); },
      passagem: hasT && (s.close==='pending' || (s.close==='revealed' && cdif===0)), passado: s.passado, notPassado: !s.passado, passar:() => this.setState({ passado:true }),
      cxHist, cxHistEmpty: cxHist.length===0,
      tsTabs: tabs('tsTab', s.tsTab, [['mov','Movimentos'],['contas','Contas'],['rec','A receber'],['pag','A pagar'],['con','Conciliação']]), tv:{ mov:s.tsTab==='mov', contas:s.tsTab==='contas', rec:s.tsTab==='rec', pag:s.tsTab==='pag', con:s.tsTab==='con' },
      ts:{ saldo:kn(saldo), ent:kn(ent), sai:kn(sai), pagar: kn(pagar.reduce((a,p) => a + p.raw, 0)) },
      perChips: ['Hoje','Ontem','Mês'].map(ch('periodo', per, { sel:null })), catChips: ['Todas','Mensalidades','Inscrições','Bar','Despesas','Estornos','Caixa'].map(ch('cat', s.cat, { sel:null })),
      ledger, ledgerEmpty: ledger.length===0, ledgerEmptyMsg: tk==='tarde' && per==='Hoje' ? 'O turno da tarde abre às 14:00 com Rui Manuel. Ainda sem movimentos.' : 'Sem movimentos com estes filtros.',
      hasSel: !!selL, sel: selL ? Object.assign({}, selL, { v:(selL.v>0?'+':'') + kz(selL.v), s:ST[selL.st] }) : { s:{} },
      contas: accs.map(a => ({ t:a.t, n:a.n, val:kn(a.v), meta:a.meta, onTrf:() => this.setState({ trf:true, trfDe:a.id, trfPara: a.id==='cof' ? 'bai' : 'cof', trfDone:'' }) })), contaOpts: accs.map(a => ({ id:a.id, n:a.n })),
      trf:s.trf, trfDe:s.trfDe, trfPara:s.trfPara, trfV:s.trfV, trfMot:s.trfMot, trfDone:s.trfDone,
      setTrfDe: e => this.setState({ trfDe:e.target.value }), setTrfPara: e => this.setState({ trfPara:e.target.value }), setTrfV: e => this.setState({ trfV:e.target.value }), setTrfMot: e => this.setState({ trfMot:e.target.value }), trfCancel:() => this.setState({ trf:false }),
      trfRegistar:() => { const v = parseFloat(String(s.trfV).replace(/\s/g,'').replace(',','.')) || 0; if (!v || s.trfDe===s.trfPara) { this.setState({ trfDone:'Indique um valor e duas contas diferentes.' }); return; } this.setState(st => ({ trfs: st.trfs.concat([{ de:st.trfDe, para:st.trfPara, v }]), trfV:'', trfMot:'', trfDone: v > 100000 ? 'Registada. Acima de 100 000 Kz fica a aguardar aprovação do dono.' : 'Transferência registada no livro razão.' })); },
      ageing: AGE.map(([l,n,v,c]) => ({ l, n, v:kn(v), w: Math.round(v/maxAge*100) + '%', c })), devedores: DEV.map(([n,d,v,u]) => Object.assign({ n, d, v:kz(v), u }, smsOf(n))),
      pagar, concil: CON.map(c => { const done = s.recon[c.id]; const st = done ? 'conciliado' : c.st; return { d:c.d, o:c.o, r:c.r, sis:kz(c.sis), ext:kz(c.ext), dif: c.ext===c.sis ? '—' : kz(c.ext-c.sis), dc: c.ext<c.sis ? '#b42318' : '#1d1c1a', s:ST[st], why: done ? 'Resolvido agora' : c.why, canRec: st!=='conciliado', act: c.act || 'Conciliar', rec:() => this.setState(x => ({ recon: Object.assign({}, x.recon, { [c.id]:true }) })) }; }),
      dPerChips: ['Semana','Mês','Trimestre'].map(ch('dPer', s.dPer)), dPerL: { 'Semana':'19 a 25 de Outubro', 'Mês':'Outubro 2026', 'Trimestre':'Agosto a Outubro 2026' }[s.dPer], dash, turnoRows,
      memK: [['1 284','Activos · +38'],['3,1%','Churn mensal'],['81%','Retenção 90 dias'],['3,6%','Inadimplência']].map(([v,l]) => ({ v, l })), trend, ops,
      rTabs: tabs('rTab', s.rTab, [['parc','Parceiros'],['vis','Visitas'],['liq','Liquidações'],['reg','Regras']]), rv:{ parc:s.rTab==='parc', vis:s.rTab==='vis', liq:s.rTab==='liq', reg:s.rTab==='reg' },
      rede:{ saldo:kn((recT-envT)*PV), rec:kn(recT*PV), pag:kn(envT*PV), vr:String(recT), ve:String(envT) },
      parceiros: parcs.map(p => ({ n:p.n, c:p.c, rec:p.rec, env:p.env, saldo:sgn(p.v), s:ST[p.st], pressed: s.rSel===p.i, bg: s.rSel===p.i ? '#ebe6d6' : 'transparent', onClick:() => this.setState({ rSel:p.i }) })),
      ps: Object.assign({}, ps0, { saldo:sgn(ps0.v), s:ST[ps0.st], vis: VIS.filter(v => v[2]===ps0.n).slice(0,3).map(visRow), noVis: !VIS.some(v => v[2]===ps0.n), actions:pActs }),
      visitas: VIS.map(visRow), liq: LIQ.map(([m,p,rec,env,st,d]) => ({ m, p, rec, env, saldo:sgn((rec-env)*PV), s:ST[st], d })), redeRegras: REDE_REG.map(([n,v]) => ({ n, v }))
    };
  }

  renderVals() { const b = this.baseVals(); return Object.assign(b, this.extraVals(b)); }
  extraVals(b) {
    const s = this.state, sc = s.screen;
    const kn = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    const sel = on => ({ bd: on ? '#1d1c1a' : '#d9d4c4', bg: on ? '#1d1c1a' : 'transparent', c: on ? '#fbfaf7' : '#1d1c1a', on });
    const tabB = on => on ? 'inset 0 -3px 0 #c8640c' : 'none';
    const ST = { pago:['Pago','#2e7d4f','#e3efe6'], divida:['Em dívida','#b42318','#f7e1de'], vencer:['A vencer','#7a5800','#f5ecd0'], aceite:['Aceite','#2e7d4f','#e3efe6'], recusado:['Recusado','#b42318','#f7e1de'], concl:['Concluída','#55524b','#ebe6d6'], entrou:['Presente','#2e7d4f','#e3efe6'], urgente:['Urgente','#b42318','#f7e1de'], normal:['Informação','#55524b','#ebe6d6'] };
    const st = k => ({ l:ST[k][0], c:ST[k][1], bg:ST[k][2] });
    const defRole = { dq:'rececao', d5:'financas', dp:'pt', d6:'dono', de:'dono', dl:'dono', df:'dono', dg:'dono', d7:'dono', d8:'dono', d9:'dono', dx:'dono' }[sc] || 'rececao';
    const role = s.xRole || defRole;
    const NAVS = { rececao:[['d1','Recepção'],['d2','Inscrição'],['d3','Membros'],['dc','Cobrar'],['d4','Caixa'],['dq','Pendências'],['dk','Recuperação'],['da','Avisos']],
      financas:[['d5','Tesouraria'],['d4','Caixa'],['dc','Facturas'],['dk','Renovações'],['da','Avisos']],
      pt:[['dp','Agenda'],['dx','Actividades'],['dk','Clientes em risco'],['da','Avisos']],
      dono:[['d6','Painel'],['dq','Pendências'],['de','Equipa'],['dx','Actividades'],['dl','Receitas perdidas'],['dk','Recuperação'],['df','Filiais'],['d7','Planos'],['dg','Gestão'],['d8','Rede'],['d9','Avisos SMS']] };
    const nav = NAVS[role].map(([id,label], i) => { const on = sc===id; return { label, num:String(i+1).padStart(2,'0'), onClick:() => this.go(id), cur: on ? 'page' : undefined, rbg: on ? '#c8640c' : 'transparent', rfg: on ? '#1d1c1a' : '#ebe6d6', rnum: on ? '#1d1c1a' : '#6b675f', badge:'' }; });
    const curNav = NAVS[role].find(n => n[0]===sc);
    const ALL = ['dq','d0','dt','dn','d1','d2','d3','d4','d5','d6','d7','d8','d9','dc','dk','dl','de','dx','dp','df','dg','da','dz'], is = {}; ALL.forEach(k => is[k] = sc===k);
    const WHO = { rececao:['TL','Teresa Lunda · Recepção','Recepção','Teresa Lunda'], financas:['JA','Jorge Afonso · Finanças','Finanças','Jorge Afonso'], pt:['NS','Nuno Sebastião · PT','Personal trainer','Nuno Sebastião'], dono:['PN','Paulo Neto · Dono','Dono','Paulo Neto'] }[role];
    const goR = (screen, r) => { this.setState({ screen, xRole:r }); try { window.scrollTo(0,0); } catch(e) {} };
    // login
    const RMAP = { '924':['rececao','dt'], '925':['financas','d5'], '926':['pt','dp'], '927':['dono','d6'] };
    const xl = { tel:s.xTel, pw:s.xPw, err:s.xErr, forgot:s.xForgot, pwType: s.xShowPw ? 'text' : 'password', pwL: s.xShowPw ? 'Ocultar' : 'Mostrar',
      setTel:e => this.setState({ xTel:e.target.value, xErr:'' }), setPw:e => this.setState({ xPw:e.target.value, xErr:'' }), togglePw:() => this.setState({ xShowPw:!s.xShowPw }), forgotOn:() => this.setState({ xForgot:!s.xForgot }),
      entrar:() => { const t = s.xTel.replace(/\D/g,''); if (t.length!==9) return this.setState({ xErr:'O número tem 9 dígitos.' }); if (s.xPw.length < 6) return this.setState({ xErr:'A senha tem pelo menos 6 caracteres.' }); if (t.startsWith('923')) return this.setState({ xErr:'Membros entram pela app no telemóvel.' }); const r = RMAP[t.slice(0,3)] || RMAP['924']; this.setState({ xPw:'', xErr:'' }); goR(r[1], r[0]); } };
    // lotação + staff
    const OCC = [22,48,64,41,28,20,24,30,26,22,30,52,78,92,70,44,18], nowI = 3, now = OCC[nowI];
    const STAFF = [['CB','Celma Bento','Recepção','Talatona',1,'06:58','38h','98%','412 entradas validadas',0],['TL','Teresa Lunda','Recepção','Talatona',0,'Entra 14:00','36h','94%','371 entradas validadas',0],['RM','Rui Manuel','Recepção','Kilamba',1,'07:04','35h','86%','2 activações sem pagamento',1],['JA','Jorge Afonso','Finanças','Rede',1,'08:30','40h','100%','94% cobrado em Outubro',0],['NS','Nuno Sebastião','PT','Talatona',1,'06:15','42h','97%','46 sessões · 9 clientes',0],['LP','Leonor Paím','PT','Talatona',1,'07:20','30h','92%','31 sessões · 6 clientes',0],['HM','Hélio Matias','PT','Kilamba',0,'Entra 17:00','28h','89%','27 sessões · 7 clientes',0]]
      .map(([i,n,r,f,on,since,h,ass,k,w]) => ({ i,n,r,f,on:!!on,since,h,ass,k, kc: w ? '#b42318' : '#55524b', bar: w ? '#b42318' : '#1d1c1a', oc: on ? '#2e7d4f' : '#9a958b' }));
    const xz = { segs: Array.from({ length:24 }, (_, i) => ({ c: i < Math.round(now/120*24) ? '#c8640c' : '#3a3834' })), peak:'19:00 · 92', calm:'11:00–14:00', lvl: now < 50 ? 'tranquilo' : now < 85 ? 'moderado' : 'cheio', pct: Math.round(now/120*100)+'%', cap: Math.round(now/120*100) + '% da lotação · máximo 120 pessoas',
      bars: OCC.map((v,i) => ({ h: Math.round(v/92*100)+'%', c: i===nowI ? '#c8640c' : i<nowI ? '#1d1c1a' : '#d9d4c4', t:(6+i)+'h · '+v, hr: String(6+i).padStart(2,'0'), v: i<=nowI ? String(v) : '', lc: i===nowI ? '#9a4c08' : '#6b675f' })), staff: STAFF.filter(p => p.on && p.f==='Talatona') };
    // receber turno
    const DEN = [['n5000','Notas de 5 000',5000],['n2000','Notas de 2 000',2000],['n1000','Notas de 1 000',1000],['n500','Notas de 500',500],['n200','Notas de 200',200],['coin','Moedas · valor total',1]];
    const tCount = DEN.reduce((a,[k,l,v]) => a + (s.tq[k]||0)*v, 0), tExp = 85000, tDif = tCount - tExp;
    const setQ = (k, v) => this.setState(x => ({ tq:Object.assign({}, x.tq, { [k]:Math.max(0,v) }), tErr:'' }));
    const PAYS = [['tpa','TPA','Fecho do terminal às 14:00 · 6 operações',22000],['exp','Multicaixa Express','14 confirmações no extracto',64500],['ref','Referências Multicaixa','2 pagamentos',10000],['pen','Por confirmar','1 transferência · não entra na caixa',15000]];
    const PEND = [['q1','cob','Cobrança · Mário Sebastião','30 000 Kz · 12 dias em atraso'],['q2','doc','Factura por emitir','Bar · venda #1094 · 3 500 Kz'],['q3','rec','Reclamação · ar condicionado da sala 2','Ana Domingos · aguarda resposta'],['q4','res','Reserva PT · Kátia Muondo 18:00','Confirmar com Nuno Sebastião'],['q5','oco','Catraca 2 em manutenção','Técnico chega às 15:00']];
    const PK = { cob:['Cobrança','#7a5800','#f5ecd0'], doc:['Documento','#55524b','#ebe6d6'], rec:['Reclamação','#b42318','#f7e1de'], res:['Reserva','#55524b','#ebe6d6'], oco:['Ocorrência','#b42318','#f7e1de'] };
    const a3 = (cur, opts, pick) => opts.map(([k,l,c]) => ({ l, on:cur===k, bd: cur===k ? c : '#d9d4c4', bg: cur===k ? c : 'transparent', c: cur===k ? '#fbfaf7' : '#1d1c1a', pick:() => pick(k) }));
    const payDone = PAYS.every(p => s.tPay[p[0]]), pendDone = PEND.every(p => s.tPend[p[0]]), cashDone = s.tRev && (tDif===0 || (s.tOpt && s.tOpt!=='recount'));
    const tStep = s.tStepX || 0, goT = n => this.setState({ tStepX:n, tErr:'' });
    const sBadge = (done, warn) => done ? (warn ? { l:'Com ressalva', c:'#7a5800', bg:'#f5ecd0' } : { l:'Feito', c:'#2e7d4f', bg:'#e3efe6' }) : { l:'Por fazer', c:'#55524b', bg:'#ebe6d6' };
    const dt = { s0:tStep===0, s1:tStep===1, s2:tStep===2, s3:tStep===3, s4:tStep===4, giverSt: s.tExc ? 'já saiu' : 'confirmou às 14:01',
      steps: [['Resumo',true,false],['Contar dinheiro',cashDone,tDif!==0],['Pagamentos',payDone,Object.values(s.tPay).includes('prob')],['Pendências',pendDone,Object.values(s.tPend).includes('prob')],['Assumir turno',s.tDone,tDif!==0]].map(([l,dn,w],i) => ({ l, n:'0'+i, s: i===0 ? { l:'', c:'transparent', bg:'transparent' } : sBadge(dn,w), cur: tStep===i ? 'step' : undefined, bar: tStep===i ? 'inset 3px 0 0 #c8640c' : 'none', go:() => goT(i) })),
      tiles: [['Caixa', cashDone ? (tDif===0 ? 'Conferido' : 'Com ressalva') : 'Por conferir', cashDone ? (tDif===0 ? '#2e7d4f' : '#7a5800') : '#1d1c1a'],['Pagamentos', payDone ? 'Conferidos' : 'Por conferir', payDone ? '#2e7d4f' : '#1d1c1a'],['Pendências', pendDone ? 'Revistas' : (PEND.length - Object.keys(s.tPend).length) + ' por rever', pendDone ? '#2e7d4f' : '#1d1c1a'],['Ocorrências','1 registada','#1d1c1a']].map(([l,v,c]) => ({ l,v,c })),
      startL: s.tRev ? 'Continuar conferência' : 'Iniciar conferência', start:() => goT(!cashDone ? 1 : !payDone ? 2 : !pendDone ? 3 : 4),
      excL: s.tExc ? 'Recebimento sem conferência conjunta' : 'A Celma já saiu?', excA: s.tExc ? 'Anular' : 'Receber sem ela →', flipExc:() => this.setState({ tExc:!s.tExc }),
      hidden:!s.tRev, revealed:s.tRev, counted:kn(tCount), expected:kn(tExp), formula:'20 000 inicial + 68 000 entradas em dinheiro − 0 reembolsos − 3 000 saídas autorizadas',
      dif:(tDif>0?'+':tDif<0?'−':'') + kn(Math.abs(tDif)) + ' Kz', hasDif: s.tRev && tDif!==0, difL: tDif===0 ? 'Sem diferença' : 'Diferença por apurar', difBg: tDif===0 ? '#e3efe6' : '#f7e1de', difC: tDif===0 ? '#2e7d4f' : '#b42318',
      den: DEN.map(([k,l,v]) => ({ l, q:String(s.tq[k]||0), ro:s.tRev, bd: s.tRev ? '#e4e0d6' : '#1d1c1a', sub:kn((s.tq[k]||0)*v), dec:() => setQ(k,(s.tq[k]||0)-(k==='coin'?100:1)), inc:() => setQ(k,(s.tq[k]||0)+(k==='coin'?100:1)), set:e => setQ(k, parseInt(e.target.value.replace(/\D/g,''),10)||0) })),
      opts: [['recount','Recontar o dinheiro','Voltar às denominações e corrigir a contagem.'],['reg','Registar divergência','Guardar a diferença e receber o turno com ressalva.'],['rev','Pedir revisão do responsável','Encaminhar ao dono, sem apagar os registos.']].map(([k,l,dd]) => ({ l, d:dd, on:s.tOpt===k, bd: s.tOpt===k ? '2px solid #1d1c1a' : '1px solid #e4e0d6', bg: s.tOpt===k ? '#fff' : 'transparent', dot: s.tOpt===k ? '#1d1c1a' : 'transparent', pick:() => k==='recount' ? this.setState({ tRev:false, tOpt:'' }) : this.setState({ tOpt:k, tErr:'' }) })),
      needJust: s.tOpt==='reg' || s.tOpt==='rev', just:s.tJust, setJust:e => this.setState({ tJust:e.target.value, tErr:'' }), err:s.tErr, cta1: !s.tRev ? 'Submeter contagem' : 'Continuar',
      next1:() => { if (!s.tRev) { if (!tCount) return this.setState({ tErr:'Introduz a contagem antes de submeter.' }); return this.setState({ tRev:true }); } if (tDif!==0 && !s.tOpt) return this.setState({ tErr:'Escolhe como proceder com a diferença.' }); if (tDif!==0 && s.tJust.trim().length < 5) return this.setState({ tErr:'Escreve uma justificação curta.' }); goT(2); },
      pays: PAYS.map(([k,l,dd,v]) => ({ l, d:dd, v:kn(v)+' Kz', acts: a3(s.tPay[k], k==='pen' ? [['pend','Fica pendente','#7a5800'],['ok','Confirmado','#2e7d4f'],['prob','Problema','#b42318']] : [['ok','Conferido','#2e7d4f'],['pend','Sem comprovativo','#7a5800'],['prob','Problema','#b42318']], kk => this.setState(x => ({ tPay:Object.assign({}, x.tPay, { [k]:kk }), tErr:'' }))) })),
      next2:() => payDone ? goT(3) : this.setState({ tErr:'Confere todos os meios.' }),
      pend: PEND.map(([id,k,t,dd]) => ({ t, d:dd, k:{ l:PK[k][0], c:PK[k][1], bg:PK[k][2] }, acts: a3(s.tPend[id], [['rec','Recebido','#1d1c1a'],['res','Resolvido','#2e7d4f'],['prob','Problema','#b42318']], kk => this.setState(x => ({ tPend:Object.assign({}, x.tPend, { [id]:kk }), tErr:'' }))) })),
      next3:() => pendDone ? goT(4) : this.setState({ tErr:'Marca todas as pendências.' }),
      sum: [['Dinheiro', kn(tCount)+' Kz contados · esperado '+kn(tExp), !cashDone ? ['Por conferir','#55524b','#ebe6d6'] : tDif===0 ? ['Conferido','#2e7d4f','#e3efe6'] : s.tOpt==='rev' ? ['Em revisão','#b42318','#f7e1de'] : ['Com ressalva','#7a5800','#f5ecd0']],['Outros meios','111 500 Kz em TPA, Express e referências', !payDone ? ['Por conferir','#55524b','#ebe6d6'] : ['Conferidos','#2e7d4f','#e3efe6']],['Pendências', Object.values(s.tPend).filter(v => v==='prob').length + ' com problema', !pendDone ? ['Por rever','#55524b','#ebe6d6'] : ['Revistas','#2e7d4f','#e3efe6']],['Ocorrências','Catraca 2 em manutenção',['1 aberta','#7a5800','#f5ecd0']]].map(([l,dd,[a,bb,c]]) => ({ l, d:dd, s:{ l:a, c:bb, bg:c } })),
      ressalva: cashDone && tDif!==0, giverOk:!s.tExc, exc:s.tExc, excMot:s.tExcMot, setExcMot:e => this.setState({ tExcMot:e.target.value }), pw:s.tPw, setPw:e => this.setState({ tPw:e.target.value, tErr:'' }),
      notDone:!s.tDone, done:s.tDone, busy:s.tBusy, busyOp: s.tBusy ? .5 : 1, cta4: s.tBusy ? 'A registar…' : (cashDone && tDif!==0 ? 'Receber com ressalva' : 'Assumir turno'),
      confirm:() => { if (s.tBusy || s.tDone) return; if (!cashDone || !payDone || !pendDone) return this.setState({ tErr:'Há passos por concluir.' }); if (s.tExc && s.tExcMot.trim().length < 4) return this.setState({ tErr:'Indica o motivo.' }); if (s.tPw.length < 6) return this.setState({ tErr:'Confirma com a tua senha.' }); this.setState({ tBusy:true }); clearTimeout(this.tx); this.tx = setTimeout(() => this.setState({ tBusy:false, tDone:true, tPw:'' }), 900); },
      doneT: tDif!==0 ? 'Turno recebido com ressalva' : 'Turno assumido', doneBg: tDif!==0 ? '#f5ecd0' : '#e3efe6', doneC: tDif!==0 ? '#7a5800' : '#2e7d4f',
      doneMsg:'Registado às 14:03 pela hora do servidor. ' + (tDif!==0 ? 'A diferença de ' + kn(Math.abs(tDif)) + ' Kz fica associada ao turno da manhã' + (s.tOpt==='rev' ? ' e foi enviada ao dono.' : ', com a tua justificação.') : 'Sem diferenças.'),
      open:() => goR('d1','rececao') };
    // criar conta
    const nb = s.nb, setNb = o => this.setState(x => ({ nb:Object.assign({}, x.nb, o), nErr:'' }));
    const KIND = [['mem','Membros','Nome, telefone, plano e data de fim','1 243 linhas',[['Nome',1],['Telefone',1],['Plano',1],['Data de fim',1],['NIF',1]],1237,23,6,'23 duplicados fundidos pelo telefone · 6 linhas com erro ficam de fora'],['stf','Funcionários','Nome, telefone, função e filial','9 linhas',[['Nome',1],['Telefone',1],['Função',1],['Filial',1]],9,0,0,'Recebem acesso conforme a função']];
    const slug = (nb.gym||'ginasio').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_');
    const kinds = (L, setL) => KIND.map(([k,l,dd,lines,cols,ok,dup,bad,note]) => ({ l, d:dd, empty:!L[k], loaded:!!L[k], bd: L[k] ? '#1d1c1a' : '#e4e0d6', bg: L[k] ? '#fff' : 'transparent', file:(k==='mem'?'membros_':'equipa_') + slug + '.xlsx · ' + lines, note,
      cols: cols.map(([n]) => ({ l:n+' ✓', bg:'#e3efe6', c:'#2e7d4f' })), res: [[kn(ok),'Válidos','#2e7d4f'],[dup+'','Duplicados','#7a5800'],[bad+'','Com erro', bad ? '#b42318' : '#55524b']].map(([v,l2,c]) => ({ v, l:l2, c })), load:() => setL(k) }));
    const memN = s.imL.mem ? 1237 : 0, stfN = s.imL.stf ? 9 : 0, smTot = (s.smAud.mem ? memN : 0) + (s.smAud.stf ? stfN : 0);
    const smText = s.smText == null ? (nb.gym||'O teu ginásio').toUpperCase() + ' está agora na MUNTU. Entra na app com o teu número e a senha temporária {senha}: muntu.ao/app' : s.smText;
    const NT = ['Responsável','Ginásio e filiais','Importar dados','Confirmar dados','Avisar membros e equipa'];
    const dn = { s1:s.nStep===1, s2:s.nStep===2, s3:s.nStep===3, s4:s.nStep===4, s5:s.nStep===5, kick:'Passo ' + s.nStep + ' de 5', title:NT[s.nStep-1], err:s.nErr, canBack:s.nStep>1,
      steps: NT.map((l,i) => ({ l, n:'0'+(i+1), op: i+1<=s.nStep ? 1 : .5, tick: i+1 < s.nStep ? '✓' : '', go:() => i+1 <= s.nStep && this.setState({ nStep:i+1 }) })),
      nome:nb.nome, tel:nb.tel, email:nb.email, pw:nb.pw, gym:nb.gym, nif:nb.nif, city:nb.city,
      setNome:e => setNb({ nome:e.target.value }), setTel:e => setNb({ tel:e.target.value }), setEmail:e => setNb({ email:e.target.value }), setPw:e => setNb({ pw:e.target.value }), setGym:e => setNb({ gym:e.target.value }), setNif:e => setNb({ nif:e.target.value }), setCity:e => setNb({ city:e.target.value }),
      fils: nb.fils.map((v,i) => ({ v, n:String(i+1).padStart(2,'0'), canDel: nb.fils.length>1, set:e => setNb({ fils:nb.fils.map((x,j) => j===i ? e.target.value : x) }), del:() => setNb({ fils:nb.fils.filter((x,j) => j!==i) }) })), addFil:() => setNb({ fils:nb.fils.concat('') }),
      kinds: kinds(s.imL, k => this.setState(x => ({ imL:Object.assign({}, x.imL, { [k]:true }) }))),
      summary: [['Ginásio', (nb.gym||'—') + ' · NIF ' + nb.nif, nb.city,'#1d1c1a'],['Filiais', nb.fils.filter(Boolean).join(', '), nb.fils.filter(Boolean).length+'','#1d1c1a'],['Membros a importar', s.imL.mem ? '23 duplicados fundidos' : 'Sem importação', kn(memN),'#1d1c1a'],['Funcionários', s.imL.stf ? 'Acesso pela função' : 'Sem importação', stfN+'','#1d1c1a'],['Linhas com erro', s.imL.mem ? 'Ficam de fora · corriges depois' : '—', s.imL.mem ? '6' : '0', s.imL.mem ? '#b42318' : '#1d1c1a']].map(([l,dd,v,c]) => ({ l, d:dd, v, c })),
      ok:nb.ok, okBg: nb.ok ? '#1d1c1a' : 'transparent', okTick: nb.ok ? '✓' : '', flipOk:() => setNb({ ok:!nb.ok }),
      aud: [['mem','Membros', memN ? kn(memN)+' com telefone válido' : 'Nenhum importado', memN],['stf','Funcionários', stfN ? stfN+' pessoas' : 'Nenhum importado', stfN]].map(([k,l,dd,n]) => ({ l, d:dd, v:'', on:!!s.smAud[k], bg: s.smAud[k] ? '#1d1c1a' : 'transparent', tick: s.smAud[k] ? '✓' : '', flip:() => this.setState(x => ({ smAud:Object.assign({}, x.smAud, { [k]:!x.smAud[k] }) })) })),
      text:smText, setText:e => this.setState({ smText:e.target.value }), preview: smText.replace('{senha}','KM-4821'), total:kn(smTot),
      when: [['now','Enviar agora'],['tom','Amanhã · 09:00']].map(([k,l]) => Object.assign(sel(s.smWhen===k), { l, pick:() => this.setState({ smWhen:k }) })),
      sentMsg: s.smSent ? (s.smWhen==='now' ? kn(Math.max(0,smTot-8)) + ' entregues · 8 falharam (número inválido).' : 'Agendado para amanhã às 09:00.') : '',
      cta: s.nStep===3 ? (Object.keys(s.imL).length ? 'Rever e confirmar' : 'Continuar sem importar') : s.nStep===5 ? (s.smSent ? 'Entrar no painel' : (smTot ? 'Enviar a ' + kn(smTot) + ' pessoas' : 'Continuar sem enviar')) : 'Continuar',
      back:() => this.setState({ nStep:Math.max(1, s.nStep-1), nErr:'' }),
      next:() => { const n = s.nStep;
        if (n===1) { if (nb.nome.trim().split(/\s+/).length<2) return this.setState({ nErr:'Indica o nome e o apelido.' }); if (nb.tel.replace(/\D/g,'').length!==9) return this.setState({ nErr:'O telemóvel tem 9 dígitos.' }); if (nb.pw.length<8) return this.setState({ nErr:'A senha tem pelo menos 8 caracteres.' }); }
        if (n===2 && nb.gym.trim().length<3) return this.setState({ nErr:'Indica o nome do ginásio.' });
        if (n===4 && !nb.ok) return this.setState({ nErr:'Confirma os dados para continuar.' });
        if (n===5) { if (!s.smSent && smTot) return this.setState({ smSent:true }); return goR('d6','dono'); }
        this.setState({ nStep:n+1, nErr:'' }); } };
    // cobrar
    const CM = { AD:['Ana Domingos','#4821 · Rede Mensal','923 118 402','pago',45000], MS:['Mário Sebastião','#4511 · Local Mensal','924 776 310','divida',30000], KM:['Kátia Muondo','#4822 · Rede Mensal','923 481 220','pago',45000], JK:['Joana Kiala','#4602 · Híbrido','925 902 118','vencer',38000], EM:['Edson Mateus','#4790 · Local Mensal','923 554 017','pago',30000] };
    const mm0 = String(s.cMem).startsWith('m:') ? MEMBERS.find(x => x.id===s.cMem.slice(2)) : null;
    const cm = mm0 ? [mm0.n, '#' + mm0.id + ' · ' + mm0.plano, mm0.tel, ({ divida:'divida', bloq:'divida', vencer:'vencer' })[mm0.st] || 'pago', mm0.valor] : (CM[s.cMem] || CM.MS), MEIOS = ['TPA','Dinheiro','Express','Referência'];
    const IT = [['nov','Mensalidade Novembro',cm[1].split(' · ').slice(1).join(' · '),cm[4]]].concat(cm[3]==='divida' ? [['out','Mensalidade Outubro','Em atraso há 12 dias',cm[4]]] : []).concat([['pt','Pacote PT · 8 sessões','Nuno Sebastião',64000],['cartao','2ª via do cartão','Cartão com QR',2500]]);
    const cs = s.cSel || (cm[3]==='divida' ? ['out'] : ['nov']), cTot = IT.filter(i => cs.includes(i[0])).reduce((a,i) => a+i[3],0), payNow = s.cDoc==='fr';
    const hist = s.cDocs.concat([['FR TAL/2026/1201','Ana Domingos','09:12',45000,'SMS entregue','#2e7d4f'],['FT TAL/2026/0088','Celso Pedro','08:47',45000,'Por pagar · SMS entregue','#7a5800'],['FR TAL/2026/1199','Kátia Muondo','08:21',30000,'SMS entregue','#2e7d4f']].map(([doc,n,h,v,stt,c]) => ({ doc,n,h,v:kn(v),st:stt,c })));
    const xc = { mem:s.cMem, setMem:e => this.setState({ cMem:e.target.value, cSel:null }), mems: (mm0 ? [{ i:s.cMem, l:cm[0] + (cm[3]==='divida' ? ' · em dívida' : '') }] : []).concat(Object.keys(CM).map(i => ({ i, l: CM[i][0] + (CM[i][3]==='divida' ? ' · em dívida' : '') }))), m:{ n:cm[0], d:cm[1], tel:cm[2], s:st(cm[3]) },
      items: IT.map(([k,l,dd,v]) => { const on = cs.includes(k); return { l, d:dd, v:kn(v)+' Kz', on, bg: on ? '#1d1c1a' : 'transparent', tick: on ? '✓' : '', flip:() => this.setState({ cSel: on ? cs.filter(x => x!==k) : cs.concat(k), cErr:'' }) }; }),
      docs: [['fr','Factura-recibo'],['ft','Factura · paga depois']].map(([k,l]) => Object.assign(sel(s.cDoc===k), { l, pick:() => this.setState({ cDoc:k }) })),
      canais: ['SMS','WhatsApp'].map(x => Object.assign(sel(s.cCh.includes(x)), { l:x, pick:() => this.setState(y => ({ cCh: y.cCh.includes(x) ? y.cCh.filter(z => z!==x) : y.cCh.concat(x) })) })),
      meios: MEIOS.map(x => Object.assign(sel(s.cMeio===x), { l:x, pick:() => this.setState({ cMeio:x }) })), payNow, err:s.cErr,
      sum: cs.length + (cs.length===1 ? ' item' : ' itens') + ' · ' + (payNow ? s.cMeio : 'a pagar até 6 Nov'), total:kn(cTot), cta: payNow ? 'Cobrar e emitir factura-recibo' : 'Emitir factura e enviar',
      res: s.cRes, docCount: hist.length + ' emitidos', hist,
      again:() => this.setState(x => ({ cRes:Object.assign({}, x.cRes, { againL:'Reenviado ✓' }) })), nova:() => this.setState({ cRes:null, cSel:null }),
      submit:() => { if (!cs.length) return this.setState({ cErr:'Escolhe pelo menos um item.' }); const doc = (payNow ? 'FR' : 'FT') + ' TAL/2026/' + (payNow ? s.seqN : '0089'), first = cm[0].split(' ')[0];
        const sms = 'MWANGOLÉ FIT: Olá ' + first + ', ' + (payNow ? 'recebemos ' + kn(cTot) + ' Kz. Factura-recibo ' + doc : 'tens a factura ' + doc + ' de ' + kn(cTot) + ' Kz para pagar até 6 Nov') + '. Ver: muntu.ao/f/3HT9';
        this.setState(x => ({ seqN: payNow ? x.seqN+1 : x.seqN, cRes:{ title: payNow ? 'Pago e enviado' : 'Factura enviada', doc, n:cm[0], v:kn(cTot), meio: payNow ? x.cMeio : 'Por pagar', tel: cm[2] + ' · ' + (x.cCh.join(' e ') || 'sem envio'), sms, againL:'Reenviar SMS' }, cDocs:[{ doc, n:cm[0], h:'Agora', v:kn(cTot), st: payNow ? 'SMS entregue' : 'Por pagar · SMS entregue', c: payNow ? '#2e7d4f' : '#7a5800' }].concat(x.cDocs) })); } };
    // recuperação
    const RISK = [['k1','Edson Mateus','Local Mensal','923 554 017',12,'−60%','Celma Bento','rececao','Viagem'],['k2','Joana Kiala','Híbrido','925 902 118',9,'−45%','Nuno Sebastião','pt','Lesão'],['k3','Bruno Lopes','Rede Mensal','924 118 330',16,'−80%','Celma Bento','rececao','Preço'],['k4','Sara Domingos','Local Mensal','931 440 812',23,'sem entradas','Teresa Lunda','rececao','Falta de tempo'],['k5','Hélder Pinto','Rede Mensal','923 870 552',31,'sem entradas','Leonor Paím','pt','Insatisfação'],['k6','Marta Neto','Local Mensal','926 300 141',8,'−50%','Nuno Sebastião','pt','Mudou de zona']];
    const REN = [['n1','Ana Domingos','Rede Mensal','923 118 402',3,45000,'Sem atrasos',0,'Preço'],['n2','Joana Kiala','Híbrido','925 902 118',3,38000,'1 atraso em 6 meses',0,'Falta de tempo'],['n3','Celso Pedro','Rede Mensal','927 004 611',6,45000,'3 atrasos em 6 meses',1,'Preço'],['n4','Luísa Tomás','Híbrido','923 667 290',11,38000,'Sem atrasos',0,'Mudou de zona'],['n5','Paulo Jorge','Local Mensal','924 330 908',14,30000,'2 atrasos',1,'Insatisfação']];
    const OFF = { 'Viagem':[['cong','Congelar o plano até 30 dias','Sem custo. O plano retoma quando voltar.'],['rede','Acesso à rede durante a viagem','Treina num ginásio parceiro da MUNTU.']],
      'Lesão':[['pausa','Pausa médica','Até 60 dias, com declaração médica.'],['aval','Avaliação gratuita com PT','Plano de regresso adaptado à lesão.']],
      'Preço':[['down','Mudar para Local Mensal','30 000 Kz por mês, só na filial de inscrição.'],['desc','15% durante 2 meses','Dentro do limite de desconto da recepção.']],
      'Falta de tempo':[['hor','Plano por horário','Mais barato, só nas horas que lhe convêm.'],['curto','Treinos de 30 minutos','Plano de treino curto preparado pelo PT.']],
      'Insatisfação':[['gest','Conversa com o gestor','O dono liga em 24 horas.'],['ptfree','Sessão de PT grátis','Para recomeçar com acompanhamento.']],
      'Mudou de zona':[['trans','Transferir para outra filial','Sem taxa de transferência.'],['planrede','Passar para Rede Mensal','Treina em qualquer filial.']] };
    const TPL = [['falta','Sentimos a tua falta', n => 'Olá ' + n + ', sentimos a tua falta no Mwangolé Fit. Está tudo bem? Se quiseres, ajudamos-te a voltar ao ritmo.'],['motivo','Perguntar o motivo', n => 'Olá ' + n + ', notámos que deixaste de vir. Podes dizer-nos porquê? Responde 1 Viagem, 2 Lesão, 3 Preço, 4 Falta de tempo, 5 Não estou satisfeito.'],['renov','Lembrar a renovação', n => 'Olá ' + n + ', o teu plano está a terminar. Queres renovar? Se algo não está a funcionar, diz-nos e ajustamos.'],['volta','Convite para voltar', n => 'Olá ' + n + ', esta semana tens uma sessão de PT grátis para recomeçar. Queres marcar?']];
    const MOTS = ['Viagem','Lesão','Preço','Falta de tempo','Insatisfação','Mudou de zona'], RESULTS = ['Vai voltar','Voltou','Renovou','Cancelou','Sem resposta'];
    const GOOD = { 'Voltou':1, 'Vai voltar':1, 'Renovou':1 };
    const mine = r => role==='dono' || role==='financas' || (role==='pt' ? r[6]==='Nuno Sebastião' : r[7]==='rececao');
    const tabK = role==='financas' ? 'ren' : role==='pt' ? 'risk' : s.kTab;
    const list0 = tabK==='risk' ? RISK.filter(mine).filter(r => r[4] >= s.kLim).map(r => ({ id:r[0], n:r[1], plan:r[2], tel:r[3], a:'Última entrada há ' + r[4] + ' dias', b:r[5], resp:r[6], why:r[8], kz:0 }))
      : REN.filter(r => r[4] <= s.kRLim).map(r => ({ id:r[0], n:r[1], plan:r[2], tel:r[3], a:'Vence em ' + r[4] + ' dias · ' + kn(r[5]) + ' Kz', b:r[6], resp:'Recepção', why:r[8], kz:r[5] }));
    const selId = list0.find(x => x.id===s.kSel) ? s.kSel : (list0[0] || {}).id, cur = list0.find(x => x.id===selId);
    const first = cur ? cur.n.split(' ')[0] : '';
    const thr = (s.kThr && s.kThr[selId]) || (cur ? [{ me:1, t: tabK==='risk' ? 'Lembrete automático: "' + first + ', o teu treino de hoje está à tua espera."' : 'Aviso automático de vencimento enviado.', h:'Há 5 dias · SMS', auto:1 }] : []);
    const reason = (s.kWhy && s.kWhy[selId]) || '';
    const offer = (s.kOff && s.kOff[selId]) || '';
    const done = s.kDone[selId] || '';
    const draft = s.kDraft != null ? s.kDraft : '';
    const setMap = (key, val) => this.setState(x => ({ [key]:Object.assign({}, x[key], { [selId]:val }) }));
    const push = (m) => this.setState(x => ({ kThr:Object.assign({}, x.kThr, { [selId]:((x.kThr && x.kThr[selId]) || thr).concat(m) }) }));
    const REPLY = { 'Viagem':'Estou fora de Luanda até ao fim do mês, por trabalho.', 'Lesão':'Magoei o joelho, o médico mandou parar 3 semanas.', 'Preço':'Está difícil pagar o plano este mês.', 'Falta de tempo':'Mudei de horário no trabalho, não consigo ir à tarde.', 'Insatisfação':'As máquinas estão sempre ocupadas à hora que vou.', 'Mudou de zona':'Mudei-me para o Kilamba, fica longe.' };
    const recN = 9 + Object.values(s.kDone).filter(v => GOOD[v]).length;
    const xk = { kick: { rececao:'Recepção · Talatona', pt:'Os teus clientes', dono:'Toda a rede', financas:'Renovações da rede' }[role],
      kpis: [[kn(312000 + Object.entries(s.kDone).filter(([id,v]) => v==='Renovou').reduce((acc,[id]) => acc + ((REN.find(r => r[0]===id)||[])[5]||0),0)),'Kz recuperados em Outubro', recN + ' membros voltaram ou renovaram'],[RISK.filter(mine).length+'','Em risco','Sem entradas ou com quebra de frequência'],[REN.length+'','Renovações em 15 dias','Precisam de contacto']].map(([v,l,dd]) => ({ v,l,d:dd })),
      tabs: [['risk','Em risco',RISK.filter(mine).length],['ren','Renovações',REN.length]].filter(t => role==='dono' || role==='rececao' || (role==='pt' ? t[0]==='risk' : t[0]==='ren')).map(([k,l,n]) => ({ l, n, on: tabK===k, bar: tabB(tabK===k), pick:() => this.setState({ kTab:k, kSel:null, kDraft:null }) })),
      lims: tabK==='risk' ? [7,14,30].map(v => Object.assign(sel(s.kLim===v), { l:v + '+ dias', pick:() => this.setState({ kLim:v }) })) : [3,7,15].map(v => Object.assign(sel(s.kRLim===v), { l:'Até ' + v + ' dias', pick:() => this.setState({ kRLim:v }) })),
      limL: tabK==='risk' ? 'Sem vir há' : 'Vence em',
      rows: list0.map(r => { const dn = s.kDone[r.id], on = r.id===selId, rs = s.kWhy && s.kWhy[r.id]; return { n:r.n, plan:r.plan, a:r.a, on, bg: on ? '#fff' : 'transparent', bar: on ? 'inset 3px 0 0 #c8640c' : 'none', st: dn ? { l:dn, c: GOOD[dn] ? '#2e7d4f' : '#55524b', bg: GOOD[dn] ? '#e3efe6' : '#ebe6d6' } : rs ? { l:rs, c:'#7a5800', bg:'#f5ecd0' } : (s.kThr && s.kThr[r.id]) ? { l:'Em conversa', c:'#1d1c1a', bg:'#ebe6d6' } : { l:'Por contactar', c:'#b42318', bg:'#f7e1de' }, pick:() => this.setState({ kSel:r.id, kDraft:null }) }; }),
      empty: !cur, has: !!cur,
      c: cur ? { n:cur.n, i:cur.n.split(' ').map(w => w[0]).slice(0,2).join(''), plan:cur.plan, tel:cur.tel, a:cur.a, b:cur.b, resp:cur.resp } : { n:'', i:'', plan:'', tel:'', a:'', b:'', resp:'' },
      thread: thr.map(m => ({ t:m.t, h:m.h, al: m.me ? 'flex-end' : 'flex-start', bg: m.me ? (m.auto ? '#ebe6d6' : '#1d1c1a') : '#fff', fg: m.me && !m.auto ? '#fbfaf7' : '#1d1c1a', bd: m.me ? 'none' : '1px solid #e4e0d6' })),
      tpls: TPL.filter(t => tabK==='risk' ? t[0]!=='renov' : t[0]!=='falta').map(([k,l,fn]) => ({ l, pick:() => this.setState({ kDraft: fn(first) }) })),
      draft, setDraft:e => this.setState({ kDraft:e.target.value }), noSend: !draft.trim(), sendOp: draft.trim() ? 1 : .35,
      send:() => { if (!draft.trim()) return; const ask = /Responde 1/.test(draft) || /porquê|Está tudo bem|algo não está/.test(draft); push([{ me:1, t:draft.trim(), h:'Agora · SMS' }]); this.setState({ kDraft:'' }); if (ask && !reason) { clearTimeout(this.kr); const id = selId, why = cur.why; this.kr = setTimeout(() => this.setState(x => ({ kThr:Object.assign({}, x.kThr, { [id]:(x.kThr[id]||[]).concat([{ me:0, t:REPLY[why], h:'Agora · resposta' }]) }), kWhy:Object.assign({}, x.kWhy, { [id]:why }) })), 1400); } },
      call: 'tel:' + (cur ? cur.tel.replace(/\s/g,'') : ''), wa: 'https://wa.me/244' + (cur ? cur.tel.replace(/\s/g,'') : ''),
      mots: MOTS.map(x => Object.assign(sel(reason===x), { l:x, pick:() => setMap('kWhy', x) })), hasReason: !!reason, noReason: !reason, reason,
      offers: (OFF[reason] || []).map(([k,l,dd]) => ({ l, d:dd, on: offer===k, bd: offer===k ? '2px solid #1d1c1a' : '1px solid #e4e0d6', bg: offer===k ? '#fff' : '#fbfaf7', dot: offer===k ? '#1d1c1a' : 'transparent', pick:() => setMap('kOff', k) })),
      noOffer: !offer, offerOp: offer ? 1 : .35,
      sendOffer:() => { const o = (OFF[reason]||[]).find(x => x[0]===offer); if (!o) return; push([{ me:1, t:first + ', temos uma proposta para ti: ' + o[1].toLowerCase() + '. ' + o[2] + ' Respondes SIM para activar.', h:'Agora · SMS' }]); },
      results: RESULTS.map(x => Object.assign(sel(done===x), { l:x, pick:() => this.setState(y => ({ kDone:Object.assign({}, y.kDone, { [selId]:x }) })) })) };
    // pendências
    const QK = { cob:['Cobrança','#7a5800','#f5ecd0'], doc:['Documento','#55524b','#ebe6d6'], rec:['Reclamação','#b42318','#f7e1de'], res:['Reserva','#1d1c1a','#ebe6d6'], oco:['Ocorrência','#b42318','#f7e1de'] };
    const Q0 = [['q1','cob','Cobrar Mário Sebastião','30 000 Kz · 12 dias em atraso. Prometeu pagar hoje à tarde.','Manhã · Celma Bento','Teresa Lunda','Hoje 18:00',2],['q2','doc','Emitir factura da venda #1094','Bar · 3 500 Kz. O cliente pediu factura com NIF.','Manhã · Celma Bento','Teresa Lunda','Hoje',1],['q3','rec','Ar condicionado da sala 2','Ana Domingos queixou-se duas vezes esta semana.','Manhã · Celma Bento','Paulo Neto','Amanhã',3],['q4','res','Confirmar reserva PT de Kátia Muondo','Quinta 18:00 com Nuno Sebastião.','Manhã · Celma Bento','Teresa Lunda','Hoje 17:00',1],['q5','oco','Catraca 2 em manutenção','Técnico chega às 15:00. Validar entradas manualmente.','Manhã · Celma Bento','Teresa Lunda','Hoje 15:00',2],['q6','cob','Transferência por confirmar · 15 000 Kz','Délcio Ngola enviou comprovativo. Falta ver no extracto.','Ontem tarde · Rui Manuel','Jorge Afonso','Hoje',4],['q7','doc','Contrato de Joana Kiala por assinar','Inscrição feita ontem sem assinatura.','Ontem tarde · Teresa Lunda','Teresa Lunda','Sexta',2]];
    const qSt = s.qSt || {}, qOwn = s.qOwn || {}, qN = s.qNotes || {}, extra = s.qExtra || [];
    const QA = extra.concat(Q0.map(([id,k,t,dd,orig,own,due,turns]) => ({ id,k,t,d:dd,orig,own,due,turns })));
    const meQ = WHO[3], isOpen = q => (qSt[q.id]||'open')!=='res';
    const qFilt = QA.filter(q => s.qTab==='res' ? !isOpen(q) : isOpen(q) && (s.qTab!=='mine' || (qOwn[q.id]||q.own)===meQ)).filter(q => s.qType==='all' || q.k===s.qType);
    const qSelId = qFilt.find(q => q.id===s.qSel) ? s.qSel : (qFilt[0]||{}).id, qc = QA.find(q => q.id===qSelId);
    const OWN = ['Teresa Lunda','Celma Bento','Jorge Afonso','Nuno Sebastião','Paulo Neto'];
    const qHist = qc ? [{ t:'Criada no turno ' + qc.orig.split(' · ')[0].toLowerCase(), w:qc.orig.split(' · ')[1], h: qc.orig.startsWith('Ontem') ? 'Ontem · 19:40' : 'Hoje · 09:12' }, { t:'Recebida na troca de turno', w:'Teresa Lunda', h:'Hoje · 14:03' }].concat((qN[qc.id]||[]).map(n => ({ t:n, w:meQ, h:'Agora' }))) : [];
    const xq = { open: QA.filter(isOpen).length,
      tabs: [['open','Abertas',QA.filter(isOpen).length],['mine','Minhas',QA.filter(q => isOpen(q) && (qOwn[q.id]||q.own)===meQ).length],['res','Resolvidas',QA.filter(q => !isOpen(q)).length]].map(([k,l,n]) => ({ l, n, on:s.qTab===k, bar:tabB(s.qTab===k), pick:() => this.setState({ qTab:k, qSel:null }) })),
      types: [['all','Todas']].concat(Object.keys(QK).map(k => [k, QK[k][0]])).map(([k,l]) => Object.assign(sel(s.qType===k), { l, pick:() => this.setState({ qType:k, qSel:null }) })),
      rows: qFilt.map(q => ({ t:q.t, due:q.due, own:qOwn[q.id]||q.own, on:q.id===qSelId, bg: q.id===qSelId ? '#fff' : 'transparent', bar: q.id===qSelId ? 'inset 3px 0 0 #c8640c' : 'none', k:{ l:QK[q.k][0], c:QK[q.k][1], bg:QK[q.k][2] }, turns: q.turns > 1 ? 'Passou ' + q.turns + ' turnos' : '', tc: q.turns > 2 ? '#b42318' : '#6b675f', pick:() => this.setState({ qSel:q.id }) })),
      empty: !qFilt.length, has: !!qc,
      c: qc ? { t:qc.t, d:qc.d, orig:qc.orig, due:qc.due, own:qOwn[qc.id]||qc.own, k:{ l:QK[qc.k][0], c:QK[qc.k][1], bg:QK[qc.k][2] }, res: !isOpen(qc), notRes: isOpen(qc), turns: qc.turns + (qc.turns===1 ? ' turno' : ' turnos') } : { t:'', d:'', orig:'', due:'', own:'', k:{ l:'', c:'', bg:'' }, res:false, notRes:true, turns:'' },
      owners: OWN.map(o => ({ v:o, l:o })), setOwn:e => this.setState(x => ({ qOwn:Object.assign({}, x.qOwn, { [qSelId]:e.target.value }) })),
      hist: qHist, note: s.qNote || '', setNote:e => this.setState({ qNote:e.target.value }), noNote: !(s.qNote||'').trim(), noteOp: (s.qNote||'').trim() ? 1 : .35,
      addNote:() => { const t = (s.qNote||'').trim(); if (!t) return; this.setState(x => ({ qNote:'', qNotes:Object.assign({}, x.qNotes, { [qSelId]:((x.qNotes||{})[qSelId]||[]).concat(t) }) })); },
      resolve:() => this.setState(x => ({ qSt:Object.assign({}, x.qSt, { [qSelId]:'res' }), qNotes:Object.assign({}, x.qNotes, { [qSelId]:((x.qNotes||{})[qSelId]||[]).concat('Resolvida') }) })),
      reopen:() => this.setState(x => ({ qSt:Object.assign({}, x.qSt, { [qSelId]:'open' }) })),
      escalate:() => this.setState(x => ({ qOwn:Object.assign({}, x.qOwn, { [qSelId]:'Paulo Neto' }), qNotes:Object.assign({}, x.qNotes, { [qSelId]:((x.qNotes||{})[qSelId]||[]).concat('Encaminhada ao dono') }) })),
      showNew: !!s.qNew, toggleNew:() => this.setState({ qNew:!s.qNew }), nt: s.qNt || '', setNt:e => this.setState({ qNt:e.target.value }), nk: s.qNk || 'oco', setNk:e => this.setState({ qNk:e.target.value }),
      create:() => { const t = (s.qNt||'').trim(); if (t.length < 3) return; const q = { id:'x'+Date.now(), k:s.qNk||'oco', t, d:'Criada agora.', orig:'Tarde · ' + meQ, own:meQ, due:'Hoje', turns:1 }; this.setState(x => ({ qExtra:[q].concat(x.qExtra||[]), qNew:false, qNt:'', qSel:q.id, qTab:'open', qType:'all' })); } };
    // receitas perdidas
    const LOST = [['l1','Desconto','Desconto de 25% acima do limite de 10%',14000,'Talatona · inscrição #4822','Celma Bento','pot','Pedir justificação'],['l2','Pagamento','30 000 Kz recebidos sem inscrição associada',30000,'Kilamba · TPA 09:14','Rui Manuel','pot','Associar a membro'],['l3','Estorno','Estorno sem documento de suporte',30000,'Talatona · NC 0031','Celma Bento','pot','Pedir documento'],['l4','Sessões PT','3 sessões dadas sem pacote cobrado',24000,'Talatona','Nuno Sebastião','pot','Cobrar ao membro'],['l5','Acesso','O mesmo QR usado 3 vezes em 10 minutos',0,'Talatona · catraca 1','—','pot','Rever entradas'],['l6','Mensalidades','14 mensalidades vencidas há mais de 30 dias',135000,'Rede','Jorge Afonso','conf','Enviar cobrança'],['l7','Caixa','Diferença de caixa por justificar',8000,'Kilamba · tarde 27/10','Rui Manuel','conf','Pedir justificação'],['l8','Desconto','Desconto de 15% sem aprovação',6000,'Maianga · 21/10','Teresa Lunda','res','']];
    const lst = l => s.lSt[l[0]] || l[6], lsum = k => LOST.filter(l => lst(l)===k).reduce((a,l) => a+l[3],0);
    const xp = { kpis: [[kn(lsum('pot')),'Kz · por rever','#1d1c1a','Indícios ainda não confirmados','#fbfaf7'],[kn(lsum('conf')),'Kz · confirmado','#b42318','Perda verificada','#fbfaf7'],[kn(lsum('res')),'Kz · resolvido','#2e7d4f','Recuperado ou justificado','#fbfaf7']].map(([v,l,c,dd,bg]) => ({ v,l,c,d:dd,bg })),
      tabs: [['pot','Por rever'],['conf','Confirmadas'],['res','Resolvidas']].map(([k,l]) => ({ l, n:LOST.filter(x => lst(x)===k).length, on:s.lTab===k, bar:tabB(s.lTab===k), pick:() => this.setState({ lTab:k }) })),
      list: LOST.filter(l => lst(l)===s.lTab).map(l => { const sent = !!s.lSent[l[0]]; return { cat:l[1], t:l[2], v: l[3] ? kn(l[3]) + ' Kz' : 'Sem valor', o:l[4], r:l[5], open: lst(l)!=='res', canConf: lst(l)==='pot', a:l[7], sent, op: sent ? .35 : 1, sentMsg:'Pedido enviado a ' + l[5].split(' ')[0], act:() => this.setState(x => ({ lSent:Object.assign({}, x.lSent, { [l[0]]:true }) })), conf:() => this.setState(x => ({ lSt:Object.assign({}, x.lSt, { [l[0]]:'conf' }) })), res:() => this.setState(x => ({ lSt:Object.assign({}, x.lSt, { [l[0]]:'res' }) })) }; }) };
    xp.empty = !xp.list.length;
    // equipa + avisos
    const AV = [['n1','urgente','Catraca 2 da Talatona em manutenção até às 15:00. Validar entradas manualmente.','Paulo Neto','Hoje · 07:10','Recepção',4,4],['n2','normal','O novo preço do Rede Mensal entra em vigor a 1 Dez. Os membros já foram avisados por SMS.','Paulo Neto','Ontem · 18:40','Todos',6,9],['n3','normal','Reunião de equipa no sábado às 15:00, sala 3.','Jorge Afonso','Seg · 09:00','Todos',9,9]];
    const TO = ['Todos','Recepção','Finanças','PT'], TOT = { Todos:9, 'Recepção':3, 'Finanças':1, PT:3 };
    const xe = { pres: STAFF.filter(p => p.on).length + ' de ' + STAFF.length, all:STAFF,
      kpis: [[STAFF.filter(p => p.on).length + ' de 7','Presentes agora','#1d1c1a','Por registo de turno','#fbfaf7'],['249h','Horas em Outubro','#1d1c1a','Toda a equipa','#fbfaf7'],['94%','Assiduidade média','#1d1c1a','Turnos cumpridos','#fbfaf7'],['104','Sessões de PT','#1d1c1a','3 treinadores','#fbfaf7']].map(([v,l,c,dd,bg]) => ({ v,l,c,d:dd,bg })),
      text:s.aText, setText:e => this.setState({ aText:e.target.value }), to: TO.map(t => Object.assign(sel(s.toT===t), { l:t, pick:() => this.setState({ toT:t }) })), pri: [['normal','Informação'],['urgente','Urgente']].map(([k,l]) => Object.assign(sel(s.pri===k), { l, pick:() => this.setState({ pri:k }) })),
      dis:!s.aText.trim(), op: s.aText.trim() ? 1 : .35, cta:'Enviar a ' + (s.toT==='Todos' ? 'toda a equipa' : s.toT) + ' · ' + TOT[s.toT],
      send:() => s.aText.trim() && this.setState(x => ({ aText:'', sentA:[{ p:x.pri, t:x.aText.trim(), h:'Agora', to:x.toT, r:0, n:TOT[x.toT] }].concat(x.sentA) })),
      sent: s.sentA.concat(AV.map(([id,p,t,de,h,to,r,n]) => ({ p,t,h,to,r,n }))).map(a => ({ p:st(a.p), t:a.t, h:a.h, to:a.to, read:a.r + ' de ' + a.n, w:Math.round(a.r/a.n*100)+'%' })) };
    const xvl = AV.map(([id,p,t,de,h,to]) => { const rd = !!s.readN[id]; return { p:st(p), urg: p==='urgente', i: de.split(' ').map(w => w[0]).join(''), bg: rd ? 'transparent' : '#fbfaf7', bd: rd ? '#e4e0d6' : '#d9d4c4', fw: rd ? 400 : 500, t,de,h,to, unread:!rd, isRead:rd, op: rd ? .6 : 1, read:() => this.setState(x => ({ readN:Object.assign({}, x.readN, { [id]:true }) })) }; });
    const un = xvl.filter(a => a.unread).length; const vF = s.vF || 'all'; nav.forEach((n,i) => { if (NAVS[role][i][0]==='da' && un) n.badge = String(un); if (NAVS[role][i][0]==='dq') n.badge = String(xq.open); }); const xv = { list: xvl.filter(a => vF==='all' || (vF==='unread' ? a.unread : a.urg)), unread: un ? un + ' por ler' : 'Tudo lido', empty: !xvl.filter(a => vF==='all' || (vF==='unread' ? a.unread : a.urg)).length, fs: [['all','Todos',xvl.length],['unread','Por ler',un],['urg','Urgentes',xvl.filter(a => a.urg).length]].map(([k,l,n]) => ({ l, n, on:vF===k, bg: vF===k ? '#1d1c1a' : 'transparent', c: vF===k ? '#fbfaf7' : '#1d1c1a', pick:() => this.setState({ vF:k }) })), readAll:() => this.setState({ readN:{ n1:true, n2:true, n3:true } }) };
    // actividades
    const ACT0 = [['a1','desafio','30 dias de mobilidade','4 Nov – 4 Dez · Talatona','Meta 20 sessões','Leonor Paím','pendente'],['a2','aula','Funcional ao ar livre','Sábados · 07:00 · Talatona','20 vagas','Nuno Sebastião','pendente'],['a3','desafio','Desafio de força','Até 15 Dez · Todas','Meta 3 avaliações','Nuno Sebastião','aprovado'],['a4','desafio','Novembro sem falhas','1–30 Nov · Todas','Meta 20 treinos','Paulo Neto','publicado'],['a5','evento','Corrida da Marginal','Sáb 9 Nov · 07:00','40 vagas','Paulo Neto','publicado'],['a6','aula','Kettlebell iniciação','Quintas · 19:00 · Kilamba','12 vagas','Nuno Sebastião','recusado']].map(([id,tipo,t,when,meta,by,stt]) => ({ id,tipo,t,when,meta,by,st:stt }));
    const acts = s.acts || ACT0, ACS = { pendente:['A aguardar aprovação','#7a5800','#f5ecd0'], aprovado:['Publicado','#2e7d4f','#e3efe6'], publicado:['Publicado','#2e7d4f','#e3efe6'], recusado:['Recusado','#b42318','#f7e1de'] }, TL = { aula:'Aula', desafio:'Desafio', evento:'Evento' };
    const isPT = role==='pt', me = isPT ? 'Nuno Sebastião' : 'Paulo Neto', minA = isPT ? acts.filter(a => a.by===me) : acts;
    const setSt = (id, v) => this.setState(x => ({ acts:(x.acts||ACT0).map(a => a.id===id ? Object.assign({}, a, { st:v }) : a), acMsg: v==='aprovado' ? 'Aprovado. Já aparece aos membros.' : 'Recusado. O PT foi avisado.', acKind:v }));
    const arow = a => ({ tipo:TL[a.tipo], t:a.t, when:a.when, meta:a.meta, by:a.by, s:{ l:ACS[a.st][0], c:ACS[a.st][1], bg:ACS[a.st][2] }, canApprove: role==='dono' && a.st==='pendente', wait: !(role==='dono' && a.st==='pendente'), yes:() => setSt(a.id,'aprovado'), no:() => setSt(a.id,'recusado') });
    const xDes = s.xTipo==='desafio', fmtD = v => { if (!v) return ''; const [y,mo,dd] = v.split('-'); return +dd + ' ' + ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][+mo-1]; };
    const pendA = minA.filter(a => a.st==='pendente').map(arow);
    const xa = { kick: isPT ? 'Propostas ao dono · ' + me : 'Aulas, desafios e eventos', pend:pendA, hasPend: pendA.length>0, pendT: isPT ? 'À espera de aprovação' : 'Propostas dos PT · aprovar', pub: minA.filter(a => a.st==='aprovado'||a.st==='publicado').map(arow), rec: minA.filter(a => a.st==='recusado').map(arow),
      msg:s.acMsg, msgBg: s.acKind==='recusado' ? '#f7e1de' : s.acKind==='pendente' ? '#f5ecd0' : '#e3efe6', msgC: s.acKind==='recusado' ? '#b42318' : s.acKind==='pendente' ? '#7a5800' : '#2e7d4f',
      formT: isPT ? 'Propor actividade' : 'Nova actividade', t:s.xT, d:s.xD, ini:s.xIni, fim:s.xFim, cap:s.xCap, extra:s.xExtra, err:s.xErr2,
      tipos: [['aula','Aula'],['desafio','Desafio'],['evento','Evento']].map(([k,l]) => ({ l, bg: s.xTipo===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ xTipo:k }) })),
      ph: { aula:'Ex. Treino funcional ao ar livre', desafio:'Ex. 30 dias de mobilidade', evento:'Ex. Corrida da Marginal' }[s.xTipo], iniL: xDes ? 'Início' : 'Data', fimL: xDes ? 'Fim' : 'Termina', capL: xDes ? 'Meta' : 'Vagas', extraL: xDes ? 'Prémio · opcional' : 'Hora', extraPh: xDes ? 'Ex. 1 mês grátis' : '18:00',
      fils: ['Talatona','Kilamba','Maianga','Todas'].map(f => Object.assign(sel(s.xFil===f), { l:f, pick:() => this.setState({ xFil:f }) })),
      note: isPT ? 'Fica pendente até o dono aprovar. Só depois aparece aos membros.' : 'Publicada de imediato. Os membros recebem notificação na app.', noteBg: isPT ? '#f5ecd0' : '#ebe6d6', cta: isPT ? 'Enviar para aprovação' : 'Publicar',
      setT:e => this.setState({ xT:e.target.value, xErr2:'' }), setD:e => this.setState({ xD:e.target.value }), setIni:e => this.setState({ xIni:e.target.value }), setFim:e => this.setState({ xFim:e.target.value }), setCap:e => this.setState({ xCap:e.target.value.replace(/\D/g,'') }), setExtra:e => this.setState({ xExtra:e.target.value }),
      submit:() => { if (s.xT.trim().length < 4) return this.setState({ xErr2:'Dá um título à actividade.' }); const a = { id:'n'+Date.now(), tipo:s.xTipo, t:s.xT.trim(), when: (xDes ? fmtD(s.xIni) + ' – ' + fmtD(s.xFim) : fmtD(s.xIni) + (s.xExtra ? ' · ' + s.xExtra : '')) + ' · ' + s.xFil, meta: xDes ? 'Meta ' + s.xCap : s.xCap + ' vagas', by:me, st: isPT ? 'pendente' : 'publicado' };
        this.setState(x => ({ acts:[a].concat(x.acts||ACT0), xT:'', xD:'', xExtra:'', acMsg: isPT ? '"' + a.t + '" enviada ao dono.' : '"' + a.t + '" publicada.', acKind: isPT ? 'pendente' : 'publicado' })); } };
    xa.hasRec = xa.rec.length > 0;
    // PT
    const AG = [['a1','06:30','Kátia Muondo','Força · sessão 5 de 8','concl'],['a2','07:30','Edson Mateus','Hipertrofia · sessão 2 de 12','concl'],['a3','12:15','Joana Kiala','Força · sessão 7 de 8','agend'],['a4','18:00','Mário Sebastião','Avaliação inicial','agend'],['a5','19:00','Ana Domingos','Força · sessão 1 de 8','agend']];
    const RQ = [['q1','Kátia Muondo','Rede Mensal','2× por semana · Ter e Qui','18:00 · a partir de 4 Nov',64000],['q2','Bruno Kianda','Kianda Fitness · rede','3× por semana · Seg, Qua e Sex','07:30 · a partir de 3 Nov',96000],['q3','Sara Lopes','Local Mensal','1× por semana · Sáb','09:00 · a partir de 8 Nov',32000]];
    const rq = RQ.map(([id,n,plan,dias,hora,v]) => { const r = s.rqSt[id]; return { n,plan,dias,hora, v:kn(v)+' Kz', open:!r, closed:!!r, s:st(r||'aceite'), yes:() => this.setState(x => ({ rqSt:Object.assign({}, x.rqSt, { [id]:'aceite' }) })), no:() => this.setState(x => ({ rqSt:Object.assign({}, x.rqSt, { [id]:'recusado' }) })) }; });
    const xt = { kpis: [['18','Sessões esta semana','#1d1c1a','4 por realizar','#fbfaf7'],['9','Clientes activos','#1d1c1a','2 em risco','#fbfaf7'],['78%','Horas ocupadas','#1d1c1a','De 30 h disponíveis','#fbfaf7'],['184 000','Kz · comissões','#1d1c1a','32 000 por confirmar','#fbfaf7']].map(([v,l,c,dd,bg]) => ({ v,l,c,d:dd,bg })),
      ag: AG.map(([id,h,n,dd,k]) => { const kk = s.ptMark[id] ? 'entrou' : k; return { h,n,d:dd, can:kk==='agend', done:kk!=='agend', s:st(kk==='agend'?'concl':kk), mark:() => this.setState(x => ({ ptMark:Object.assign({}, x.ptMark, { [id]:true }) })) }; }), rq, open: rq.filter(r => r.open).length };
    // filiais
    const FIL = [['Talatona',1240000,1196000,612,'71%',184,''],['Kilamba',780000,712000,428,'64%',121,'2 alertas'],['Maianga',430000,394000,244,'58%',76,'']];
    const MET = { ret:['Retenção',[82,74,69],'%','Membros activos a 1 Ago que continuam activos.'], rec:['Receita',[3588000,2136000,1182000],'kz','Recebido, não facturado.'], cus:['Custos',[1420000,980000,610000],'kz','Salários, renda, manutenção e SMS.'], ocu:['Ocupação',[71,64,58],'%','Média nas horas de abertura.'], pt:['PT',[78,61,40],'%','Horas de PT ocupadas sobre disponíveis.'] }, MM = MET[s.cmpM], mx = Math.max(...MM[1]);
    const NFX = [['planos','Planos e preços','5 planos'],['horarios','Horários e turnos','Manhã 06–14 · Tarde 14–22'],['regras','Regras de aprovação','Limites de desconto, estornos, despesas'],['perm','Permissões da equipa','Recepção, finanças e PT'],['avisos','Avisos automáticos','12 SMS da jornada']];
    const xf = { cards: FIL.map(([n,e,r,a,o,ch,al]) => ({ n, e:kn(e), r:kn(r), a, o, ch, pct:Math.round(r/e*100)+'%', al: al || Math.round(r/e*100)+'% cobrado', ac: al ? '#b42318' : '#2e7d4f' })),
      metrics: Object.keys(MET).map(k => Object.assign(sel(s.cmpM===k), { l:MET[k][0], pick:() => this.setState({ cmpM:k }) })), bars: FIL.map(([n],i) => ({ n, v: MM[2]==='%' ? MM[1][i]+'%' : (MM[1][i]/1e6).toFixed(2).replace('.',',') + ' M Kz', w: Math.round(MM[1][i]/mx*100)+'%', c: i===0 ? '#1d1c1a' : '#8a867d' })), note:'Mesmos critérios em todas as filiais. ' + MM[3],
      showNew:s.nfShow, hideNew:!s.nfShow, newL: s.nfShow ? 'Fechar' : 'Nova filial', toggleNew:() => this.setState({ nfShow:!s.nfShow, nfDone:false }), form:!s.nfDone, done:s.nfDone, n:s.nfN, from:s.nfFrom, setN:e => this.setState({ nfN:e.target.value }), setFrom:e => this.setState({ nfFrom:e.target.value }),
      items: NFX.map(([k,l,dd]) => ({ l, d:dd, v:'', on:!!s.nfX[k], bg: s.nfX[k] ? '#1d1c1a' : 'transparent', tick: s.nfX[k] ? '✓' : '', flip:() => this.setState(x => ({ nfX:Object.assign({}, x.nfX, { [k]:!x.nfX[k] }) })) })),
      doneMsg:'Filial ' + s.nfN + ' criada a partir de ' + s.nfFrom + '. Copiado: ' + NFX.filter(x => s.nfX[x[0]]).map(x => x[1].toLowerCase()).join(', ') + '.', create:() => this.setState({ nfDone:true }) };
    // gestão
    const V = s.rgV, stepV = (k, dd, mn, mxx) => () => this.setState(x => ({ rgV:Object.assign({}, x.rgV, { [k]:Math.min(mxx, Math.max(mn, x.rgV[k]+dd)) }), rgSaved:false }));
    const kz2 = v => v ? kn(v) + ' Kz' : 'Nenhum';
    const fix = o => Object.assign({ edit:false, fixed:false }, o);
    const DOCS = [['Contrato de arrendamento','Contratos','Talatona','Jan 2024','Conservar até 2034','Dono','pdf',0],['Licença de actividade','Licenças','Kilamba','Nov 2025','Expira em 21 dias · renovar','Dono · Finanças','pdf',1],['Factura · manutenção passadeiras','Manutenção','Talatona','12 Out','Conservar até 2036','Dono · Finanças','pdf',0],['Comprovativo · renda Outubro','Comprovativos','Maianga','01 Out','Conservar até 2036','Finanças','jpg',0],['Contrato · Nuno Sebastião','Contratos','Rede','Mar 2025','Enquanto activo + 5 anos','Dono','pdf',0],['Seguro de responsabilidade','Licenças','Rede','Fev 2026','Válido até Fev 2027','Dono','pdf',0]];
    const allDocs = Array.from({ length:s.cfExtra }, (_,i) => ['Documento carregado ' + (i+1),'Comprovativos','Talatona','Agora','Conservar até 2036','Dono · Finanças','pdf',0]).concat(DOCS);
    const REW = { mes:'1 mês grátis', meio:'50% na mensalidade', kz:'10 000 Kz de crédito' };
    const revL = [['v1','Bruno Lopes indicado por Kátia Muondo','Mesmo NIF que um ex-membro de Abril'],['v2','Sara Lopes indicada por Edson Mateus','Mesmo telefone que o indicador']].filter(v => !s.riRev[v[0]]).map(([id,t,why]) => ({ t, why, yes:() => this.setState(x => ({ riRev:Object.assign({}, x.riRev, { [id]:'ok' }) })), no:() => this.setState(x => ({ riRev:Object.assign({}, x.riRev, { [id]:'no' }) })) }));
    const xg = { isReg:s.gTab==='reg', isCof:s.gTab==='cof', isImp:s.gTab==='imp', isInd:s.gTab==='ind',
      tabs: [['reg','Regras de aprovação',''],['cof','Cofre de documentos',allDocs.length],['imp','Importar dados',''],['ind','Indicações','']].map(([k,l,n]) => ({ l, n, on:s.gTab===k, bar:tabB(s.gTab===k), pick:() => this.setState({ gTab:k }) })),
      rules: [{ n:'Descontos', d:'Acima do limite vai para o nível seguinte', tiers:[fix({ who:'Recepção até', v:V.dRec+'%', edit:true, dec:stepV('dRec',-5,0,50), inc:stepV('dRec',5,0,50) }),fix({ who:'Gestor até', v:V.dGes+'%', edit:true, dec:stepV('dGes',-5,0,100), inc:stepV('dGes',5,0,100) }),fix({ who:'Acima disso', v:'Dono', fixed:true })] },
        { n:'Estornos', d:'Recepção pede, nunca aprova', tiers:[fix({ who:'Finanças aprova até', v:kz2(V.eFin), edit:true, dec:stepV('eFin',-5000,0,100000), inc:stepV('eFin',5000,0,100000) }),fix({ who:'Acima disso', v:'Dono', fixed:true })] },
        { n:'Despesas', d:'Com recibo anexado', tiers:[fix({ who:'Finanças até', v:kz2(V.dFin), edit:true, dec:stepV('dFin',-5000,0,500000), inc:stepV('dFin',5000,0,500000) }),fix({ who:'Acima disso', v:'Dono', fixed:true })] },
        { n:'Alteração de preços', d:'Membros avisados por SMS 30 dias antes', tiers:[fix({ who:'Quem aprova', v:'Só o dono · Face ID', fixed:true })] }],
      saved:s.rgSaved, save:() => this.setState({ rgSaved:true }),
      cats: ['Todos','Contratos','Comprovativos','Manutenção','Licenças'].map(c => Object.assign(sel(s.cfCat===c), { l:c, pick:() => this.setState({ cfCat:c }) })),
      docs: allDocs.filter(x => s.cfCat==='Todos' || x[1]===s.cfCat).map(([n,cat,f,dtt,keep,perm,ext,al]) => ({ n,cat,f,dt:dtt,keep,perm, ext:ext.toUpperCase(), kc: al ? '#b42318' : '#55524b' })), upload:() => this.setState(x => ({ cfExtra:x.cfExtra+1, cfCat:'Todos' })),
      kinds: kinds(s.gImp, k => this.setState(x => ({ gImp:Object.assign({}, x.gImp, { [k]:true }) }))), impCta: s.gImpDone ? 'Importado ✓' : 'Confirmar importação', impMsg: s.gImpDone ? 'Membros importados. Podes enviar as credenciais em Avisos SMS.' : 'Nada é gravado antes de confirmares.', importar:() => Object.keys(s.gImp).length && this.setState({ gImpDone:true }),
      rk: [['18','Inscrições por indicação','#1d1c1a','Outubro','#fbfaf7'],['684 000','Kz dos indicados','#1d1c1a','Recebidos','#fbfaf7'],['135 000','Kz em recompensas','#1d1c1a','Custo','#fbfaf7'],['5,1×','Retorno','#2e7d4f','Receita sobre custo','#fbfaf7']].map(([v,l,c,dd,bg]) => ({ v,l,c,d:dd,bg })),
      rev:revL, revEmpty:!revL.length, top: [['Kátia Muondo','4 indicações · 3 pagas',152000],['Edson Mateus','3 indicações · 2 pagas',90000],['Ana Domingos','2 indicações · 2 pagas',90000]].map(([n,dd,v]) => ({ n,d:dd,v:kn(v) })),
      rewards: Object.keys(REW).map(k => Object.assign(sel(s.riRew===k), { l:REW[k], pick:() => this.setState({ riRew:k }) })), conds: [1,2,3].map(n => Object.assign(sel(s.riCond===n), { l: n + (n===1 ? ' mensalidade' : ' mensalidades'), pick:() => this.setState({ riCond:n }) })) };
    const openCob = id => this.setState({ cobOpen:true, cMem: id ? 'm:' + id : 'MS', cSel:null, cRes:null, cErr:'' });
    const byName = n => (MEMBERS.find(x => x.n===n) || {}).id;
    const M0 = MEMBERS.find(x => x.id===s.mSel) || MEMBERS[0];
    const mmOut = b.mm && b.mm.actions ? Object.assign({}, b.mm, { actions: b.mm.actions.map(a => /^(Cobrar|Renovar)/.test(a.l) ? Object.assign({}, a, { onClick:() => openCob(M0.id) }) : a) }) : b.mm;
    return { mm: mmOut, divida: (b.divida||[]).map(r => Object.assign({}, r, { cobrar:() => openCob(byName(r.n)) })), vencer: (b.vencer||[]).map(r => Object.assign({}, r, { cobrar:() => openCob(byName(r.n)) })),
      cob:{ open: !!s.cobOpen, form: !s.cRes, close:() => this.setState({ cobOpen:false, cRes:null }), page:() => this.setState({ cobOpen:false, screen:'dc' }) },
      rootMinH: this.props.__vh || '100vh', nav, is, app: !['d0','dt','dn'].includes(sc), who:{ i:WHO[0], t:WHO[1] + ' · Terminar sessão', r:WHO[2], n:WHO[3] }, railH: this.props.__vh || '100vh', crumb:{ a: role==='dono' ? 'Rede Mwangolé Fit' : 'Mwangolé Fit · Talatona', b: curNav ? curNav[1] : (sc==='dz' ? 'Ginásio agora' : sc==='da' ? 'Avisos' : '') }, railBars: OCC.map((v,i) => ({ h: Math.round(v/92*100)+'%', c: i===nowI ? '#c8640c' : i<nowI ? '#8a867d' : '#3a3834' })), isDono: role==='dono', isStaff: role!=='dono', avisosN: un, lotNow: now,
      xq, xl, xz, dt, dn, xc, xk, xp, xe, xv, xa, xt, xf, xg,
      goDN:() => this.setState({ screen:'dn', nStep:1 }), goD0:() => goR('d0', null), goDZ:() => this.go('dz'), goDA:() => this.go('da'), goImport:() => this.setState({ screen:'dg', gTab:'imp', xRole:'dono' }),
      sair:() => this.setState({ screen:'d0', xRole:null, tStepX:0, tDone:false }) };
  }
  baseVals() {
    const s = this.state, set = o => () => this.setState(o);
    const nav = NAV.map(([id,label], i) => ({ label, num:'0' + (i+1), onClick:() => this.go(id), cur: s.screen===id ? 'page' : undefined, bar: s.screen===id ? 'inset 0 -3px 0 #c8640c' : 'none', color: s.screen===id ? '#1d1c1a' : '#55524b', bl: i===0 ? '1px solid #e4e0d6' : '0' }));
    const is = {}; NAV.forEach(([k]) => is[k] = s.screen === k); is.d0 = s.screen === 'd0';
    const smsRow = (n, d, v) => { const done = s.smsDone[n]; return { n, d, v:kz(v), smsInfo: done ? 'SMS entregue às ' + done : '', smsDis: !!done, smsOp: done ? .35 : 1, sms:() => this.setState(st => ({ smsDone: Object.assign({}, st.smsDone, { [n]:'09:41' }) })) }; };
    const checkins = [['07:42','Ana Domingos','Rede · Mensal','Talatona','pago'],['07:38','Edson Mateus','Local · Mensal','Talatona','pago'],['07:31','Joana Kiala','Híbrido','Kilamba → Talatona','rede','2 de 4 entradas noutra filial'],['07:25','Mário Sebastião','Local · Trimestral','Talatona','vencer','Vence amanhã · SMS às 10:00'],['07:12','Yola Fernandes','Local · Mensal','Talatona','bloq','Expirou há 3 dias'],['07:04','Nelson Kapinga','Rede · Anual','Talatona','pago']]
      .map(([h,n,p,f,k,why]) => ({ h,n,p,f,s:ST[k],why:why||'', onClick:() => this.setState({ screen:'d3', mState: k==='bloq'?'divida':k==='rede'?'rede':'normal' }) }));
    const steps = ['Cliente','Plano','Pagamento','Acesso'].map((l,i) => ({ n:i+1, l, bar: i<s.step?'#1d1c1a':i===s.step?'#c8640c':'#e4e0d6', color: i<=s.step?'#1d1c1a':'#6b675f' }));
    const plan = PLANS.find(p => p.id === s.plan);
    const plans = PLANS.map(p => ({ ...p, price: p.p ? kn(p.p) + ' Kz' : '0,00 Kz', note:p.note||'', disabled:!!p.disabled, op:p.disabled?.5:1, pressed: s.plan===p.id, ring: s.plan===p.id?'inset 0 0 0 2px #1d1c1a, inset 0 6px 0 #c8640c':'none', bg: s.plan===p.id?'#fff':'#fbfaf7', onClick:() => this.setState({ plan:p.id }) }));
    const methods = [['express','Multicaixa Express','Push no telemóvel'],['tpa','TPA','Cartão'],['ref','Transferência','Por referência'],['dinheiro','Dinheiro','Conta no caixa']].map(([id,l,d]) => ({ l, d, pressed: s.pay===id, bg: s.pay===id?'#f4f1ea':'transparent', dot: s.pay===id?'#c8640c':'transparent', onClick:() => this.setState({ pay:id, payState:'idle' }) }));
    const cobrar = () => { this.setState({ payState:'waiting' }); clearTimeout(this.p); this.p = setTimeout(() => { if (this.state.payState==='waiting') this.setState({ payState:'ok', step:3 }); }, 3000); };
    const qr = []; for (let y=0;y<21;y++) for (let x=0;x<21;x++) { const ex = x>=14?x-14:x, ey = y>=14?y-14:y; const fin = (x<7||x>=14)&&(y<7||y>=14)&&!(x>=14&&y>=14); const on = fin ? (ex===0||ex===6||ey===0||ey===6||(ex>=2&&ex<=4&&ey>=2&&ey<=4)) : ((x*7+y*13+x*y*3)%5)<2; qr.push(on?'#1d1c1a':'transparent'); }
    const mm = String(Math.floor(s.secs/60)).padStart(2,'0'), ss = String(s.secs%60).padStart(2,'0');
    const nextDisabled = s.step===2 && s.payState!=='ok';
    const sendChs = ['SMS','WhatsApp'].map(l => ({ l, pressed: s.sendCh===l, bg: s.sendCh===l?'#1d1c1a':'transparent', color: s.sendCh===l?'#fbfaf7':'#1d1c1a', onClick:() => this.setState({ sendCh:l }) }));
    const welcome = fill(s.rules[0].tpl, Object.assign({}, SAMPLE, { data:'26/11' }));
    const MS = {
      normal:{s:ST.pago,banner:'',dias:'18',diasLabel:'Dias restantes',plano:'Rede · Mensal',prox:'13/11',ent:'09'},
      divida:{s:ST.divida,banner:'Mensalidade de Outubro por pagar há 12 dias. Acesso bloqueado até pagar. 4 avisos SMS entregues.',dias:'00',diasLabel:'Dias restantes',plano:'Rede · Mensal',prox:'Em atraso',ent:'02'},
      congelado:{s:ST.congelado,banner:'Plano congelado até 10/11/2026 a pedido do membro. Aviso de reactivação agendado.',dias:'15',diasLabel:'Dias em pausa',plano:'Rede · Mensal',prox:'10/11',ent:'00'},
      rede:{s:ST.rede,banner:'Membro do Kianda Fitness. Acesso válido pela Rede MUNTU: 3 de 6 visitas este mês.',dias:'03',diasLabel:'Visitas restantes',plano:'Rede · Kianda',prox:'—',ent:'03'}
    };
    const mb = MS[s.mState];
    const toInsc = () => this.setState({ screen:'d2', step:1 });
    const A = (l, primary, fn) => ({ l, onClick: fn, border: primary?'0':'1px solid #1d1c1a', bg: primary?'#1d1c1a':'transparent', color: primary?'#fbfaf7':'#1d1c1a' });
    const actions = { normal:[A('Check-in',1),A('Cobrar',0,toInsc),A('Renovar',0,toInsc),A('Congelar')], divida:[A('Cobrar 45 000,00 Kz',1,toInsc),A('Renovar',0,toInsc),A('Pedir excepção')], congelado:[A('Descongelar',1),A('Cobrar',0,toInsc),A('Renovar',0,toInsc)], rede:[A('Libertar acesso',1),A('Ver auditoria')] }[s.mState];
    const m = Object.assign({}, mb, { actions, showPay: s.mState!=='rede', redeOnly: s.mState==='rede', origem: s.mState==='rede' ? 'Kianda Fitness' : 'Desde Fev 2024 · base Talatona',
      filiais: s.mState==='rede' ? ['Talatona · visita'] : ['Talatona · base','Kilamba','Maianga'],
      pays: [['01/10','Mensalidade Outubro','Express','FR TAL/2026/1184',45000, s.mState==='divida'?'divida':'pago'],['01/09','Mensalidade Setembro','Express','FR TAL/2026/0977',45000,'pago'],['01/08','Mensalidade Agosto','Dinheiro','FR TAL/2026/0802',45000,'pago']].map(([d,desc,mt,f,v,k]) => ({d,desc,m:mt,f,v:kz(v),s:ST[k]})),
      entradas: [['26/10 · 07:15','Talatona','QR dinâmico'],['24/10 · 18:40','Kilamba','QR · outra filial'],['23/10 · 06:58','Talatona','Reconhecimento facial'],['21/10 · 19:02','Talatona','QR dinâmico']].map(([d,f,mt]) => ({d,f,m:mt})) });
    const baseAv = { normal:[['13/10 · 07:51','Pagamento confirmado','SMS','entregue'],['10/10 · 10:00','Vence em 3 dias','SMS','entregue']], divida:[['08/10 · 10:00','Acesso bloqueado','SMS','entregue'],['04/10 · 10:00','Em atraso','SMS','entregue'],['01/10 · 08:00','Vence hoje','SMS','entregue'],['28/09 · 10:00','Vence em 3 dias','SMS','entregue']], congelado:[['09/11 · 09:00','Fim de congelamento','SMS','agendado'],['26/09 · 11:20','Plano congelado','SMS','entregue']], rede:[] }[s.mState];
    const mAvisos = (s.mState==='rede' ? [] : s.mSms).concat(baseAv.map(([d,n,ch,k]) => ({ d,n,ch,s:ST[k] })));
    const MV = { nome:'Délcio', valor:'45 000 Kz', data:'01/10', referencia:'00512 884 117', ginasio:'Mwangolé Fit' };
    const TPLS = [['Lembrete', s.rules[3].tpl],['Referência','{ginasio}: {nome}, paga {valor} com a referência {referencia} no Multicaixa Express ou ATM.'],['Livre','']];
    const compText = s.compText != null ? s.compText : fill(TPLS[s.compTpl][1], MV);
    const compTpls = TPLS.map(([l], i) => ({ l, pressed: s.compTpl===i, bg: s.compTpl===i?'#1d1c1a':'transparent', color: s.compTpl===i?'#fbfaf7':'#1d1c1a', onClick:() => this.setState({ compTpl:i, compText:null }) }));
    const revealed = s.close !== 'count';
    let tc = 0, te = 0;
    const closeRows = [['dinheiro','Dinheiro'],['express','Multicaixa Express'],['tpa','TPA'],['transf','Transferência']].map(([k,l]) => {
      const c = parseFloat(String(s.counts[k]).replace(/\s/g,'').replace(',','.'))||0, d = c-EXP[k]; tc += c; te += EXP[k];
      return { l, id:'cx-'+k, val:s.counts[k], ro:revealed, esp: revealed?kz(EXP[k]):'••••', dif: revealed?(d===0?'—':kz(d)):'', difC: d<0?'#b42318':'#2e7d4f', onInput: e => { const v = e.target.value; this.setState(st => ({ counts:Object.assign({}, st.counts, { [k]:v }) })); } };
    });
    const td = tc - te;
    const cl = { count:s.close==='count', zero:s.close==='revealed'&&td===0, diff:s.close==='revealed'&&td!==0, pending:s.close==='pending' };
    const ledger = LEDGER.filter(r => s.meio==='Todos' || r.m===s.meio).map(r => ({ ...r, v:(r.v>0?'+':'')+kz(r.v), s:ST[r.st], pressed: s.sel===r.id, bg: s.sel===r.id?'#ebe6d6':'transparent', onClick:() => this.setState({ sel:r.id, est:'none', motivo:'' }) }));
    const selR = ledger.find(r => r.id === s.sel);
    const canEst = selR && selR.st==='ok' && LEDGER.find(r => r.id===s.sel).v>0;
    const chip = (key, cur) => l => ({ l, pressed: cur===l, bg: cur===l?'#1d1c1a':'transparent', color: cur===l?'#fbfaf7':'#1d1c1a', onClick:() => this.setState({ [key]:l, sel:null }) });
    const chips = ['Todos','Dinheiro','Multicaixa Express','TPA','Transferência'].map(chip('meio', s.meio));
    const fk = s.filial, all = fk==='todas';
    const sel6 = all ? Object.values(FIL).reduce((a,f) => ({ e:a.e+f.e, r:a.r+f.r }), {e:0,r:0}) : FIL[fk];
    const dash = { scope: all?'Todas as filiais':FIL[fk].n, e:kn(sel6.e), r:kn(sel6.r), d:kn(sel6.e-sel6.r), lines: LINES.filter(l => all||l.f===fk).map(l => ({ t:l.t, f:FIL[l.f].n, v:kz(l.v) })), fugas: FUGAS.filter(l => all||l.f===fk).map(l => Object.assign({}, l, { f:FIL[l.f].n })) };
    const mx = Math.max(...OCC);
    const occ = OCC.map((v,i) => ({ h: Math.round(v/mx*100)+'%', c: v===mx?'#c8640c':'#1d1c1a', l: i%2===0?String(6+i).padStart(2,'0'):'' }));
    const comp = Object.entries(FIL).map(([k,f]) => ({ n:f.n, r:kz(f.r), a:f.a, ch:f.ch, o:f.o, bg: (!all&&k===fk)?'#ebe6d6':'transparent', w: (!all&&k===fk)?600:400 }));
    const apprList = APPR.slice();
    if (s.close==='pending') apprList.unshift({ id:'cx', k:'Fecho de caixa · Talatona · agora', t:'Justificação: ' + s.just, v:td });
    if (s.est==='sent' && selR) apprList.unshift({ id:'est', k:'Estorno · Talatona · agora', t: selR.d + ' · ' + s.motivo, v:-LEDGER.find(r => r.id===s.sel).v });
    const appr = apprList.map(a => { const st = s.appr[a.id]; return { k:a.k, t:a.t, v:(a.v>0?'':'')+kz(a.v), open:!st, done:!!st, s: st?ST[st]:ST.agendado, yes:() => this.setState(x => ({ appr:Object.assign({}, x.appr, { [a.id]:'aprovado' }) })), no:() => this.setState(x => ({ appr:Object.assign({}, x.appr, { [a.id]:'recusado' }) })) }; });
    const approvals = appr.filter(a => a.open).length;
    const planos = PLANOS.map((p,i) => ({ ...p, num:String(i+1).padStart(2,'0'), bg: s.editPlan===p.id?'#f4f1ea':'transparent', price: kn(p.p), ativos: p.ativos?p.ativos+' activos':'Sem membros', editing: s.editPlan===p.id,
      warn: p.ativos ? 'Tem ' + p.ativos + ' membros activos. A alteração vai para aprovação do dono e cada membro recebe SMS 30 dias antes.' : 'Sem membros activos. Pode alterar o preço directamente.',
      editLabel: s.editPlan===p.id?'Pedir aprovação':'Alterar preço', onEdit:() => this.setState({ editPlan: s.editPlan===p.id?null:p.id }) }));
    const parceiros = [['Kianda Fitness','Luanda · Talatona',64,31,54000,'ativo'],['Benguela Gym Center','Benguela',12,18,-9000,'ativo'],['Huambo Power','Huambo',0,0,0,'convite','Enviado a 22/10'],['Lobito Strong','Lobito',22,9,19500,'suspenso','Liquidação de Setembro por pagar'],['Viana Box','Luanda · Viana',30,14,29500,'ativo']]
      .map(([n,c,rec,env,v,k,why]) => ({ n,c,rec,env, saldo: v===0?'—':(v>0?'+':'')+kz(v), s:ST[k], why:why||'' }));
    const rules = RULES.map((r,i) => { const st = s.rules[i]; return { num:'0'+(i+1), n:r.n, trig:r.trig + ' · ' + st.hora, ch:st.ch, sent: st.on ? String(r.sent) : 'Desligado', sentC: st.on?'#1d1c1a':'#6b675f', sel: s.rule===i, bg: s.rule===i?'#ebe6d6':'transparent', ariaOn:String(st.on), tBg: st.on?'#1d1c1a':'transparent', tJ: st.on?'flex-end':'flex-start', tK: st.on?'#c8640c':'#1d1c1a', toggle:() => this.upd(i, { on:!st.on }), select:() => this.setState({ rule:i, saved:false, testSent:false }) }; });
    const ri = s.rule, rs = s.rules[ri], prev = fill(rs.tpl, SAMPLE), parts = Math.max(1, Math.ceil(prev.length/160));
    const ed = { num:'0'+(ri+1), n:RULES[ri].n, trig:RULES[ri].trig, hora:rs.hora, tpl:rs.tpl, preview:prev, count: prev.length + ' caracteres · ' + parts + ' SMS por envio', countC: parts>1?'#b42318':'#55524b',
      setHora: e => this.upd(ri, { hora:e.target.value }), setTpl: e => this.upd(ri, { tpl:e.target.value }),
      chs: ['SMS','WhatsApp','SMS + WhatsApp'].map(l => ({ l, pressed: rs.ch===l, bg: rs.ch===l?'#1d1c1a':'transparent', color: rs.ch===l?'#fbfaf7':'#1d1c1a', onClick:() => this.upd(ri, { ch:l }) })),
      vars: ['{nome}','{valor}','{data}','{referencia}','{ginasio}'].map(v => ({ v, onClick:() => this.upd(ri, { tpl: rs.tpl + ' ' + v }) })) };
    const logF = { 'Todos':null, 'Agendados':'agendado', 'Entregues':'entregue', 'Falharam':'falhou' };
    const log = LOG.map(r => s.resent[r.id] ? Object.assign({}, r, { st:'agendado', why:'Reenvio às 10:15' }) : r).filter(r => !logF[s.logF] || r.st===logF[s.logF])
      .map(r => Object.assign({}, r, { s:ST[r.st], canResend: r.st==='falhou', resend:() => this.setState(x => ({ resent:Object.assign({}, x.resent, { [r.id]:true }) })) }));
    const logChips = Object.keys(logF).map(chip('logF', s.logF));
    return Object.assign({
      app: s.screen !== 'd0', login: this.loginVals(), sair: () => this.go('d0'),
      nav, is, filial:s.filial, setFilial: e => this.setState({ filial:e.target.value }), approvals, offline: !!this.props.semRede,
      goD2:() => this.go('d2'), goD3:() => this.setState({ screen:'d3', mState:'divida' }), goD4:() => this.go('d4'), goD6:() => this.go('d6'), goD9:() => this.go('d9'),
      caixa:s.caixa, caixaFechado:!s.caixa, abrirCaixa:set({ caixa:true, close:'count' }), checkins,
      divida:[['Yola Fernandes','Expirou há 3 dias',30000],['Délcio Ngola','Por pagar há 12 dias',45000]].map(a => smsRow(...a)),
      vencer:[['Mário Sebastião','Vence amanhã',30000],['Paulina Muxima','Vence em 3 dias',45000],['Wilson Tchiyaka','Vence em 5 dias',38000]].map(a => smsRow(...a)),
      timer: mm + ':' + ss, steps, st0:s.step===0, st1:s.step===1, st2:s.step===2, st3:s.step===3,
      cliente:[['nome','Nome completo','Nome e apelido'],['tel','Telefone','9 dígitos'],['nasc','Data de nascimento','dd/mm/aaaa'],['nif','NIF','Opcional']].map(([k,l,ph]) => ({ l, ph, v:(s.cli||{})[k] ?? ({ nome:'Kátia Domingos Muondo', tel:'923 456 789', nasc:'14/08/1996', nif:'' })[k], set:e => { const v = e.target.value; this.setState(x => ({ cli:Object.assign({ nome:'Kátia Domingos Muondo', tel:'923 456 789', nasc:'14/08/1996', nif:'' }, x.cli, { [k]:v }) })); } })),
      plans, methods, planName: plan.n, planPrice: kn(plan.p), pay:{ idle:s.payState==='idle', waiting:s.payState==='waiting', failed:s.payState==='failed' },
      cobrar, falhar:() => { clearTimeout(this.p); this.setState({ payState:'failed' }); }, qr, sent:s.sent, notSent:!s.sent, enviar:set({ sent:true }), sendChs, sendChL:s.sendCh, welcome,
      back:() => s.step===0 ? this.go('d1') : this.setState({ step:s.step-1, payState:'idle' }), backLabel: s.step===0?'Cancelar':'Voltar',
      next:() => s.step===3 ? this.setState({ screen:'d1', step:0, secs:0, payState:'idle', sent:false }) : this.setState({ step:s.step+1 }),
      nextLabel: ['Confirmar dados','Continuar','Continuar','Concluir'][s.step], nextDisabled, nextOp: nextDisabled?.35:1,
      m, mStates: [['normal','Activo'],['divida','Em dívida'],['congelado','Congelado'],['rede','Rede']].map(([id,l]) => ({ l, pressed: s.mState===id, bg: s.mState===id?'#1d1c1a':'transparent', color: s.mState===id?'#fbfaf7':'#1d1c1a', onClick:() => this.setState({ mState:id, composer:false }) })),
      mAvisos, mAvisosEmpty: mAvisos.length===0, canSms: s.mState!=='rede', composer:s.composer, compLabel: s.composer?'Cancelar':'Enviar SMS', toggleComp:() => this.setState({ composer:!s.composer, compText:null }),
      compTpls, compText, setComp: e => this.setState({ compText:e.target.value }), compCount: compText.length + ' caracteres · ' + Math.max(1, Math.ceil(compText.length/160)) + ' SMS', compEmpty: !compText.trim(), compOp: compText.trim()?1:.35,
      sendComp:() => this.setState(x => ({ composer:false, compText:null, mSms:[{ d:'Agora', n: TPLS[x.compTpl][0]==='Livre'?'Mensagem livre':TPLS[x.compTpl][0], ch:'SMS', s:ST.entregue }].concat(x.mSms) })),
      closeIntro: revealed ? 'O valor esperado só aparece depois da contagem. Diferenças precisam de justificação.' : 'Conte o caixa sem ver o valor esperado. Só depois de fechar vê a diferença.',
      colEsperado: revealed?'Esperado':'Esperado · oculto', colDif: revealed?'Diferença':'', closeRows, totContado:kz(tc), totContadoN:kn(tc), totEsp: revealed?kz(te):'••••', totDif: revealed?kz(td):'', totDifC: td<0?'#b42318':'#2e7d4f',
      difBig: revealed ? kn(td) : '••••', difLabel: revealed ? (td===0?'Caixa certo':'Precisa de justificação') : 'Oculta até fechar', difBg: !revealed ? '#ebe6d6' : td===0 ? '#e3efe6' : '#c8640c',
      cl, revelar:() => this.setState({ close:'revealed' }), just:s.just, setJust:e => this.setState({ just:e.target.value }), noJust:!s.just.trim(), justOp: s.just.trim()?1:.35, pedirFecho:() => this.setState({ close:'pending', caixa:false }),
      chips, ledger, ledgerEmpty: ledger.length===0, hasSel:!!selR, sel: selR||{s:{}}, closeSel:set({ sel:null }),
      est:{ can: canEst && s.est==='none', form: canEst && s.est==='form', sent: canEst && s.est==='sent' }, abrirEstorno:set({ est:'form' }),
      motivo:s.motivo, setMotivo:e => this.setState({ motivo:e.target.value }), noMotivo:!s.motivo.trim(), motivoOp: s.motivo.trim()?1:.35, pedirEstorno:set({ est:'sent' }),
      dash, occ, comp, appr, planos, regras: REGRAS.map(([n,v]) => ({ n, v })), parceiros,
      rules, ed, sentTotal: String(RULES.reduce((a,r,i) => a + (s.rules[i].on ? r.sent : 0), 0)).replace(/\B(?=(\d{3})+(?!\d))/g,' '),
      testar:set({ testSent:true }), testMsg: s.testSent ? 'Teste enviado para 923 456 789' : '', guardar:set({ saved:true }), saveLabel: s.saved ? 'Guardado' : 'Guardar', log, logChips
    }, this.extra(s));
  }
}

function render(v) {
  return (
    <>
    <R.E s={`min-height:${R.s(v.rootMinH)};min-width:1024px;background:#fbfaf7;color:#1d1c1a;display:flex;flex-direction:column`}>
      {v.is?.d0 ? (<>
        <R.G s={`flex:1;min-height:${R.s(v.rootMinH)};display:grid;grid-template-columns:minmax(440px,2fr) minmax(0,3fr)`}>
          <R.E s="background:#fbfaf7;padding:40px 56px;display:flex;flex-direction:column">
            <MuntuLogo variant="C" color="#1d1c1a" size={26} descriptor="Ginásio" />
            <R.E s="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;max-width:420px;padding:48px 0">
              <R.E s="display:flex;flex-direction:column;gap:12px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Recepção, finanças, PT e gestão"}</R.T>
                <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:44px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;line-height:1.1">{"Entrar"}</R.T>
              </R.E>
              <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                <R.T>{"Número de telemóvel"}</R.T>
                <R.E s="display:flex;align-items:center;gap:12px;border-bottom:1px solid #1d1c1a">
                  <R.T s="font-size:18px;font-weight:400;letter-spacing:.04em;text-transform:none;color:#8a867d">{"+244"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;border-bottom:0;font-size:18px" tag="input" value={v.xl?.tel} onChange={v.xl?.setTel} inputMode="tel" />
                </R.E>
              </R.E>
              <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                <R.T>{"Senha"}</R.T>
                <R.E s="display:flex;align-items:center;gap:12px;border-bottom:1px solid #1d1c1a">
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;border-bottom:0;font-size:18px" tag="input" value={v.xl?.pw} onChange={v.xl?.setPw} type={v.xl?.pwType} placeholder="••••••••" />
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.xl?.togglePw} tag="button">
                    <R.T>{R.x(v.xl?.pwL)}</R.T>
                  </R.E>
                </R.E>
              </R.E>
              {v.xl?.err ? (<>
                <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                  <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                  <R.T>{R.x(v.xl?.err)}</R.T>
                </R.E>
              </>) : null}
              {v.xl?.forgot ? (<>
                <R.T s="padding:12px 14px;background:#ebe6d6;font-size:13px;line-height:1.5" role="status">{"O dono repõe a senha em Gestão · Equipa. Recebes uma senha temporária por SMS."}</R.T>
              </>) : null}
              <R.E s="display:flex;align-items:center;justify-content:space-between;gap:16px">
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:52px;padding:0 40px" h="background:#c8640c;color:#1d1c1a" onPress={v.xl?.entrar} tag="button">
                  <R.T>{"Entrar"}</R.T>
                </R.E>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#9a4c08;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.xl?.forgotOn} tag="button">
                  <R.T>{"Esqueci a senha"}</R.T>
                </R.E>
              </R.E>
              <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"Na recepção, o turno da tarde abre primeiro a conferência do turno anterior."}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:16px;border-top:1px solid #e4e0d6;padding-top:18px">
              <R.T s="font-size:13px">{"Tens um ginásio?"}</R.T>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#9a4c08;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.goDN} tag="button">
                <R.T>{"Criar conta na MUNTU →"}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.E s="background:#c8640c;display:flex;flex-direction:column;justify-content:space-between;padding:40px 48px;color:#1d1c1a">
            <R.E s="display:flex;justify-content:flex-end;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">
              <R.T>{"Gestão de ginásios · Angola"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:center">
              <MuntuSelo size={300} color="#1d1c1a" grayColor="#7a3a06" markColor="#1d1c1a" />
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Copyright ©2026"}</R.T>
          </R.E>
        </R.G>
      </>) : null}
      {v.is?.dt ? (<>
        <R.E s={`flex:1;min-height:${R.s(v.rootMinH)};display:flex;flex-direction:column`}>
          <R.E s="height:64px;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:0 40px;border-bottom:1px solid #e4e0d6">
            <MuntuLogo variant="C" color="#1d1c1a" size={22} descriptor="Ginásio" />
            <R.E s="display:flex;align-items:center;gap:12px;font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">
              <R.T>{"Recepção · Talatona"}</R.T>
              <R.E s="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#1d1c1a;color:#fbfaf7;font-size:12px;letter-spacing:.08em">
                <R.T>{"TL"}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.G s="flex:1;display:grid;grid-template-columns:360px minmax(0,1fr)">
            <R.E s="border-right:1px solid #e4e0d6;padding:40px;display:flex;flex-direction:column;gap:24px;background:#f4f1ea">
              <R.E s="display:flex;flex-direction:column;gap:10px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Quinta-feira · Turno da tarde"}</R.T>
                <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:34px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Receber turno"}</R.T>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:4px;padding:16px;background:#fbfaf7">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Turno anterior"}</R.T>
                <R.T s="font-size:18px">{"Manhã · 07:00–14:00"}</R.T>
                <R.T s="font-size:13px;color:#55524b">{"Entregue por Celma Bento · "}{R.x(v.dt?.giverSt)}</R.T>
                <R.T s="font-size:13px;color:#55524b">{"Recebido por Teresa Lunda"}</R.T>
              </R.E>
              <R.E s="display:flex;flex-direction:column">
                {R.list(v.dt?.steps).map((s, $index) => (<React.Fragment key={$index}>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;box-shadow:${R.s(s?.bar)}`} onPress={s?.go} a_current={s?.cur} tag="button">
                    <R.T s="width:28px;font-size:13px;font-weight:300">{R.x(s?.n)}</R.T>
                    <R.T s="flex:1;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(s?.l)}</R.T>
                    <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(s?.s?.bg)};color:${R.s(s?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                      <R.T>{R.x(s?.s?.l)}</R.T>
                    </R.E>
                  </R.E>
                </React.Fragment>))}
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;margin-top:auto;display:flex;justify-content:space-between;gap:12px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;font-size:13px;font-family:inherit" onPress={v.dt?.flipExc} tag="button">
                <R.T>{R.x(v.dt?.excL)}</R.T>
                <R.T s="color:#9a4c08">{R.x(v.dt?.excA)}</R.T>
              </R.E>
            </R.E>
            <R.E s="min-width:0;padding:40px 48px;display:flex;flex-direction:column;gap:24px;max-width:1000px">
              {v.dt?.s0 ? (<>
                <R.E s="display:flex;flex-direction:column;gap:24px">
                  <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border:1px solid #e4e0d6">
                    {R.list(v.dt?.tiles).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:24px;display:flex;flex-direction:column;gap:10px;border-right:1px solid #e4e0d6">
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(t?.l)}</R.T>
                        <R.T s={`font-size:22px;font-weight:400;color:${R.s(t?.c)}`}>{R.x(t?.v)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.E s="display:flex;flex-direction:column;gap:8px;max-width:620px">
                    <R.T s="font-size:15px;font-weight:600">{"O que precisas de fazer?"}</R.T>
                    <R.T s="font-size:15px;line-height:1.6;color:#55524b">{"Conferir o dinheiro, verificar os pagamentos e rever as pendências antes de assumir o turno. O painel da recepção abre depois. O progresso fica guardado."}</R.T>
                  </R.E>
                  <R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:52px;padding:0 32px" onPress={v.dt?.start} tag="button">
                      <R.T>{R.x(v.dt?.startL)}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.dt?.s1 ? (<>
                <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(300px,1fr);gap:40px;align-items:start">
                  <R.E s="display:flex;flex-direction:column">
                    <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Contagem por denominação"}</R.T>
                    <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding:8px 0 12px">{"O valor esperado só aparece depois de submeteres."}</R.T>
                    {R.list(v.dt?.den).map((x, $index) => (<React.Fragment key={$index}>
                      <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 140px 110px;gap:14px;align-items:center;padding:10px 0;border-top:1px solid #e4e0d6;font-size:14px">
                        <R.T>{R.x(x?.l)}</R.T>
                        <R.E s={`display:flex;align-items:center;border:1px solid ${R.s(x?.bd)}`}>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:36px;height:36px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={x?.dec} disabled={x?.ro} accessibilityLabel="Menos" tag="button">
                            <R.T>{"−"}</R.T>
                          </R.E>
                          <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;width:60px;height:36px;border:0;background:transparent;text-align:center;font-family:inherit;font-size:14px;outline:none;min-width:0" accessibilityLabel={x?.l} tag="input" value={x?.q} onChange={x?.set} inputMode="numeric" readOnly={x?.ro} />
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:36px;height:36px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={x?.inc} disabled={x?.ro} accessibilityLabel="Mais" tag="button">
                            <R.T>{"+"}</R.T>
                          </R.E>
                        </R.E>
                        <R.T s="text-align:right">{R.x(x?.sub)}</R.T>
                      </R.G>
                    </React.Fragment>))}
                    <R.E s="display:flex;justify-content:space-between;align-items:baseline;padding:16px 0;border-top:1px solid #1d1c1a">
                      <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Dinheiro contado"}</R.T>
                      <R.T s="font-size:28px;font-weight:300">{R.x(v.dt?.counted)}{" Kz"}</R.T>
                    </R.E>
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:14px">
                    {v.dt?.hidden ? (<>
                      <R.E s="padding:24px;background:#ebe6d6;display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Saldo esperado"}</R.T>
                        <R.T s="font-size:28px;font-weight:300;color:#8a867d">{"Oculto até submeter"}</R.T>
                      </R.E>
                    </>) : null}
                    {v.dt?.revealed ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:14px">
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
                          <R.E s="padding:18px;display:flex;flex-direction:column;gap:6px">
                            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Esperado"}</R.T>
                            <R.T s="font-size:24px;font-weight:300">{R.x(v.dt?.expected)}{" Kz"}</R.T>
                          </R.E>
                          <R.E s="padding:18px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
                            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Contado"}</R.T>
                            <R.T s="font-size:24px;font-weight:300">{R.x(v.dt?.counted)}{" Kz"}</R.T>
                          </R.E>
                        </R.G>
                        <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{R.x(v.dt?.formula)}</R.T>
                        <R.E s={`padding:20px;background:${R.s(v.dt?.difBg)};color:${R.s(v.dt?.difC)};display:flex;flex-direction:column;gap:6px`}>
                          <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(v.dt?.difL)}</R.T>
                          <R.T s="font-size:40px;font-weight:300;line-height:1">{R.x(v.dt?.dif)}</R.T>
                        </R.E>
                        {v.dt?.hasDif ? (<>
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"A diferença não prova, por si só, que houve fraude ou que alguém é responsável."}</R.T>
                            {R.list(v.dt?.opts).map((o, $index) => (<React.Fragment key={$index}>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border:${R.s(o?.bd)};background:${R.s(o?.bg)};text-align:left;cursor:pointer;color:#1d1c1a`} onPress={o?.pick} role="radio" a_checked={o?.on} tag="button">
                                <R.E s="width:16px;height:16px;flex-shrink:0;margin-top:2px;border:1.5px solid #1d1c1a;display:flex;align-items:center;justify-content:center">
                                  <R.E s={`width:8px;height:8px;background:${R.s(o?.dot)}`} />
                                </R.E>
                                <R.E s="display:flex;flex-direction:column;gap:2px">
                                  <R.T s="font-size:14px;font-weight:500">{R.x(o?.l)}</R.T>
                                  <R.T s="font-size:12px;color:#55524b">{R.x(o?.d)}</R.T>
                                </R.E>
                              </R.E>
                            </React.Fragment>))}
                            {v.dt?.needJust ? (<>
                              <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none" accessibilityLabel="Justificação" tag="textarea" value={v.dt?.just} onChange={v.dt?.setJust} placeholder="Justificação" rows="2" />
                            </>) : null}
                          </R.E>
                        </>) : null}
                      </R.E>
                    </>) : null}
                    {v.dt?.err ? (<>
                      <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                        <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                        <R.T>{R.x(v.dt?.err)}</R.T>
                      </R.E>
                    </>) : null}
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dt?.next1} tag="button">
                      <R.T>{R.x(v.dt?.cta1)}</R.T>
                    </R.E>
                  </R.E>
                </R.G>
              </>) : null}
              {v.dt?.s2 ? (<>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Outros meios de pagamento"}</R.T>
                  <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding:8px 0 12px">{"Pagamentos por confirmar não contam como dinheiro em caixa."}</R.T>
                  {R.list(v.dt?.pays).map((p, $index) => (<React.Fragment key={$index}>
                    <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 140px auto;gap:20px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6">
                      <R.E s="display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(p?.l)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                      </R.E>
                      <R.T s="font-size:15px;text-align:right">{R.x(p?.v)}</R.T>
                      <R.E s="display:flex;gap:4px">
                        {R.list(p?.acts).map((x, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                            <R.T>{R.x(x?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.G>
                  </React.Fragment>))}
                  <R.E s="display:flex;gap:12px;align-items:center;padding-top:20px">
                    {v.dt?.err ? (<>
                      <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                        <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                        <R.T>{R.x(v.dt?.err)}</R.T>
                      </R.E>
                    </>) : null}
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dt?.next2} tag="button">
                      <R.T>{"Continuar"}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.dt?.s3 ? (<>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Pendências do turno da manhã"}</R.T>
                  <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding:8px 0 12px">{"O que recebes passa a ser teu. Sinaliza problemas em vez de os aceitar."}</R.T>
                  {R.list(v.dt?.pend).map((p, $index) => (<React.Fragment key={$index}>
                    <R.G s="display:grid;grid-template-columns:120px minmax(0,1fr) auto;gap:20px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6">
                      <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(p?.k?.bg)};color:${R.s(p?.k?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                        <R.T>{R.x(p?.k?.l)}</R.T>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(p?.t)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                      </R.E>
                      <R.E s="display:flex;gap:4px">
                        {R.list(p?.acts).map((x, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                            <R.T>{R.x(x?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.G>
                  </React.Fragment>))}
                  <R.E s="display:flex;gap:12px;align-items:center;padding-top:20px">
                    {v.dt?.err ? (<>
                      <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                        <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                        <R.T>{R.x(v.dt?.err)}</R.T>
                      </R.E>
                    </>) : null}
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dt?.next3} tag="button">
                      <R.T>{"Continuar"}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.dt?.s4 ? (<>
                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(320px,.9fr);gap:40px;align-items:start">
                  <R.E s="display:flex;flex-direction:column">
                    <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Resumo da conferência"}</R.T>
                    <R.E s="height:8px" />
                    {R.list(v.dt?.sum).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                        <R.E s="display:flex;flex-direction:column;gap:2px">
                          <R.T s="font-size:14px">{R.x(x?.l)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                        </R.E>
                        <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(x?.s?.bg)};color:${R.s(x?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                          <R.T>{R.x(x?.s?.l)}</R.T>
                        </R.E>
                      </R.E>
                    </React.Fragment>))}
                    {v.dt?.ressalva ? (<>
                      <R.T s="margin-top:12px;padding:14px;background:#f5ecd0;color:#7a5800;font-size:13px;line-height:1.5">{"Recebes o turno com ressalva: confirmas que recebeste, não que o caixa está correcto."}</R.T>
                    </>) : null}
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:16px">
                    {v.dt?.notDone ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:16px">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Assinaturas"}</R.T>
                        <R.E s="padding:14px;background:#ebe6d6;display:flex;flex-direction:column;gap:6px">
                          <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Entrega · Celma Bento"}</R.T>
                          {v.dt?.giverOk ? (<>
                            <R.T s="font-size:14px;color:#2e7d4f">{"Confirmou os valores declarados às 14:01 ✓"}</R.T>
                          </>) : null}
                          {v.dt?.exc ? (<>
                            <R.T s="font-size:13px">{"Já saiu · recebimento sem conferência conjunta, com aprovação do supervisor."}</R.T>
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;height:38px;font-size:14px" accessibilityLabel="Motivo" tag="input" value={v.dt?.excMot} onChange={v.dt?.setExcMot} placeholder="Motivo · obrigatório" />
                          </>) : null}
                        </R.E>
                        <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                          <R.T>{"Recebe · Teresa Lunda · a tua senha"}</R.T>
                          <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dt?.pw} onChange={v.dt?.setPw} type="password" placeholder="••••••••" />
                        </R.E>
                        <R.T s="font-size:11px;line-height:1.5;color:#6b675f">{"Hora registada pelo servidor. Valores imutáveis depois de assumir; correcções geram um ajuste com motivo e autor."}</R.T>
                        {v.dt?.err ? (<>
                          <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                            <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                            <R.T>{R.x(v.dt?.err)}</R.T>
                          </R.E>
                        </>) : null}
                        <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(v.dt?.busyOp)}`} onPress={v.dt?.confirm} disabled={v.dt?.busy} tag="button">
                          <R.T>{R.x(v.dt?.cta4)}</R.T>
                        </R.E>
                      </R.E>
                    </>) : null}
                    {v.dt?.done ? (<>
                      <R.E s={`display:flex;flex-direction:column;gap:12px;padding:20px;background:${R.s(v.dt?.doneBg)}`} role="status">
                        <R.T s={`font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${R.s(v.dt?.doneC)}`}>{R.x(v.dt?.doneT)}</R.T>
                        <R.T s="font-size:14px;line-height:1.5">{R.x(v.dt?.doneMsg)}</R.T>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dt?.open} tag="button">
                          <R.T>{"Abrir painel da recepção"}</R.T>
                        </R.E>
                      </R.E>
                    </>) : null}
                  </R.E>
                </R.G>
              </>) : null}
            </R.E>
          </R.G>
        </R.E>
      </>) : null}
      {v.is?.dn ? (<>
        <R.G s={`flex:1;min-height:${R.s(v.rootMinH)};display:grid;grid-template-columns:360px minmax(0,1fr)`}>
          <R.E s="background:#c8640c;padding:40px;display:flex;flex-direction:column;gap:28px">
            <MuntuLogo variant="C" color="#1d1c1a" size={22} descriptor="Ginásio" descriptorColor="#4a4640" descriptorInk="#f3ecd9" />
            <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:34px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Criar conta"}</R.T>
            <R.E s="display:flex;flex-direction:column">
              {R.list(v.dn?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:14px 0;border:0;border-top:1px solid rgba(29,28,26,.25);background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;opacity:${R.s(s?.op)}`} onPress={s?.go} tag="button">
                  <R.T s="width:28px;font-size:13px;font-weight:300">{R.x(s?.n)}</R.T>
                  <R.T s="flex:1;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(s?.l)}</R.T>
                  <R.T s="font-size:12px">{R.x(s?.tick)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;margin-top:auto;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#1d1c1a;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.goD0} tag="button">
              <R.T>{"← Já tenho conta"}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:48px 56px;display:flex;flex-direction:column;gap:28px;max-width:980px">
            <R.E s="display:flex;flex-direction:column;gap:10px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.dn?.kick)}</R.T>
              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{R.x(v.dn?.title)}</R.T>
            </R.E>
            {v.dn?.s1 ? (<>
              <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:28px 32px;max-width:720px">
                <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                  <R.T>{"Nome do responsável"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.nome} onChange={v.dn?.setNome} />
                </R.E>
                <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                  <R.T>{"Telemóvel"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.tel} onChange={v.dn?.setTel} />
                </R.E>
                <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                  <R.T>{"Email"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.email} onChange={v.dn?.setEmail} placeholder="Para facturas da MUNTU" />
                </R.E>
                <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                  <R.T>{"Senha"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.pw} onChange={v.dn?.setPw} type="password" placeholder="Mínimo 8 caracteres" />
                </R.E>
              </R.G>
            </>) : null}
            {v.dn?.s2 ? (<>
              <R.E s="display:flex;flex-direction:column;gap:28px;max-width:720px">
                <R.G s="display:grid;grid-template-columns:2fr 1fr 1fr;gap:28px 32px">
                  <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                    <R.T>{"Nome do ginásio"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.gym} onChange={v.dn?.setGym} />
                  </R.E>
                  <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                    <R.T>{"NIF"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.nif} onChange={v.dn?.setNif} />
                  </R.E>
                  <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                    <R.T>{"Cidade"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.dn?.city} onChange={v.dn?.setCity} />
                  </R.E>
                </R.G>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#1d1c1a">{"Filiais"}</R.T>
                  <R.E s="height:8px" />
                  {R.list(v.dn?.fils).map((f, $index) => (<React.Fragment key={$index}>
                    <R.E s="display:flex;align-items:center;gap:16px;padding:10px 0;border-top:1px solid #e4e0d6">
                      <R.T s="width:28px;font-size:13px;font-weight:300">{R.x(f?.n)}</R.T>
                      <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;height:38px;border-bottom:0" accessibilityLabel="Filial" tag="input" value={f?.v} onChange={f?.set} placeholder="Nome ou bairro" />
                      {f?.canDel ? (<>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:32px;height:32px;border:0;background:transparent;font-size:18px;color:#6b675f;cursor:pointer" onPress={f?.del} accessibilityLabel="Remover" tag="button">
                          <R.T>{"×"}</R.T>
                        </R.E>
                      </>) : null}
                    </R.E>
                  </React.Fragment>))}
                  <R.E s="padding-top:8px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dn?.addFil} tag="button">
                      <R.T>{"+ Adicionar filial"}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
              </R.E>
            </>) : null}
            {v.dn?.s3 ? (<>
              <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                {R.list(v.dn?.kinds).map((k, $index) => (<React.Fragment key={$index}>
                  <R.E s={`display:flex;flex-direction:column;gap:14px;padding:24px;border:1px solid ${R.s(k?.bd)};background:${R.s(k?.bg)}`}>
                    <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                      <R.E s="display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:16px;font-weight:500">{R.x(k?.l)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(k?.d)}</R.T>
                      </R.E>
                      {k?.empty ? (<>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={k?.load} tag="button">
                          <R.T>{"Carregar"}</R.T>
                        </R.E>
                      </>) : null}
                    </R.E>
                    {k?.empty ? (<>
                      <R.E s="height:120px;display:flex;align-items:center;justify-content:center;border:1px dashed #c9c3b1;background:repeating-linear-gradient(45deg,#f4f1ea 0 6px,#fbfaf7 6px 12px);font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#6b675f">
                        <R.T>{"Arrasta a planilha · .xlsx · .csv"}</R.T>
                      </R.E>
                    </>) : null}
                    {k?.loaded ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:12px">
                        <R.T s="font-family:ui-monospace,Menlo,monospace;font-size:12px">{R.x(k?.file)}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(k?.cols).map((c, $index) => (<React.Fragment key={$index}>
                            <R.T s={`padding:4px 8px;background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase`}>{R.x(c?.l)}</R.T>
                          </React.Fragment>))}
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:repeat(3,1fr);background:#ebe6d6">
                          {R.list(k?.res).map((r, $index) => (<React.Fragment key={$index}>
                            <R.E s="padding:12px;display:flex;flex-direction:column;gap:4px">
                              <R.T s={`font-size:22px;font-weight:300;color:${R.s(r?.c)}`}>{R.x(r?.v)}</R.T>
                              <R.T s="font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.G>
                        <R.T s="font-size:12px;color:#55524b">{R.x(k?.note)}</R.T>
                      </R.E>
                    </>) : null}
                  </R.E>
                </React.Fragment>))}
              </R.G>
            </>) : null}
            {v.dn?.s4 ? (<>
              <R.E s="display:flex;flex-direction:column;max-width:720px">
                {R.list(v.dn?.summary).map((x, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:14px 0;border-bottom:1px solid #e4e0d6">
                    <R.E s="display:flex;flex-direction:column;gap:2px">
                      <R.T s="font-size:14px">{R.x(x?.l)}</R.T>
                      <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                    </R.E>
                    <R.T s={`font-size:18px;font-weight:500;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                  </R.E>
                </React.Fragment>))}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;margin-top:18px;display:flex;align-items:flex-start;gap:12px;padding:14px;border:0;background:#ebe6d6;text-align:left;cursor:pointer;color:#1d1c1a;font-size:13px;line-height:1.5" onPress={v.dn?.flipOk} role="checkbox" a_checked={v.dn?.ok} tag="button">
                  <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(v.dn?.okBg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px`}>
                    <R.T>{R.x(v.dn?.okTick)}</R.T>
                  </R.E>
                  <R.T>{"Confirmo que os dados estão correctos e que os membros aceitaram ser contactados."}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.dn?.s5 ? (<>
              <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.8fr);gap:32px;align-items:start">
                <R.E s="display:flex;flex-direction:column;gap:18px">
                  <R.E s="display:flex;flex-direction:column">
                    {R.list(v.dn?.aud).map((a, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={a?.flip} role="checkbox" a_checked={a?.on} tag="button">
                        <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(a?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                          <R.T>{R.x(a?.tick)}</R.T>
                        </R.E>
                        <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                          <R.T s="font-size:14px;font-weight:500">{R.x(a?.l)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(a?.d)}</R.T>
                        </R.E>
                        <R.T s="font-size:14px;white-space:nowrap">{R.x(a?.v)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  <R.E s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                    <R.T>{"Mensagem"}</R.T>
                    <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.5;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.dn?.text} onChange={v.dn?.setText} rows="4" />
                  </R.E>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.dn?.when).map((w, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid ${R.s(w?.bd)};background:${R.s(w?.bg)};color:${R.s(w?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={w?.pick} a_pressed={w?.on} tag="button">
                        <R.T>{R.x(w?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Pré-visualização · Kátia Muondo"}</R.T>
                  <R.T s="background:#ebe6d6;padding:14px 16px;font-size:14px;line-height:1.5">{R.x(v.dn?.preview)}</R.T>
                  <R.E s="display:flex;justify-content:space-between;align-items:center;padding:16px;background:#c8640c">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"SMS a enviar"}</R.T>
                    <R.T s="font-size:30px;font-weight:300">{R.x(v.dn?.total)}</R.T>
                  </R.E>
                  {v.dn?.sentMsg ? (<>
                    <R.T s="padding:14px;background:#e3efe6;color:#2e7d4f;font-size:14px;line-height:1.5" role="status">{R.x(v.dn?.sentMsg)}</R.T>
                  </>) : null}
                </R.E>
              </R.G>
            </>) : null}
            {v.dn?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.dn?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="display:flex;gap:10px">
              {v.dn?.canBack ? (<>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dn?.back} tag="button">
                  <R.T>{"Voltar"}</R.T>
                </R.E>
              </>) : null}
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.dn?.next} tag="button">
                <R.T>{R.x(v.dn?.cta)}</R.T>
              </R.E>
            </R.E>
          </R.E>
        </R.G>
      </>) : null}
      {v.app ? (<>
        <R.E s={`display:flex;flex-direction:row;height:${R.s(v.__vh)};background:#f4f1ea`}>
          <R.E s="width:256px;flex-shrink:0;height:100%;background:#1d1c1a;color:#fbfaf7;display:flex;flex-direction:column;overflow:hidden" accessibilityLabel="Navegação">
            <R.E s="padding:28px 24px 22px">
              <MuntuLogo variant="C" color="#fbfaf7" size={20} descriptor="Ginásio" descriptorColor="#4a4640" descriptorInk="#d9d4c4" />
            </R.E>
            <R.G s="margin:0 24px;padding:14px 0 16px;border-top:1px solid #3a3834;border-bottom:1px solid #3a3834;display:grid;grid-template-columns:1fr 1fr;gap:14px">
              <R.E s="display:flex;flex-direction:column;gap:4px;font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#8a867d">
                <R.T>{"Filial"}</R.T>
                <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:34px;width:100%;border:0;border-bottom:1px solid #3a3834;background:transparent;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-family:inherit;outline:none;padding:0" tag="select" value={v.filial} onChange={v.setFilial}>
                  <R.O value={"todas"} label={"Todas"} />
                  <R.O value={"talatona"} label={"Talatona"} />
                  <R.O value={"kilamba"} label={"Kilamba"} />
                  <R.O value={"maianga"} label={"Maianga"} />
                </R.Sel>
              </R.E>
              {v.hasTurnos ? (<>
                <R.E s="display:flex;flex-direction:column;gap:4px;font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#8a867d">
                  <R.T>{"Turno"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:34px;width:100%;border:0;border-bottom:1px solid #3a3834;background:transparent;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;font-family:inherit;outline:none;padding:0" tag="select" value={v.turno} onChange={v.setTurno}>
                    <R.O value={"manha"} label={"Manhã"} />
                    <R.O value={"tarde"} label={"Tarde"} />
                    <R.O value={"dia"} label={"Dia"} />
                  </R.Sel>
                </R.E>
              </>) : null}
            </R.G>
            <R.E s="flex:1;min-height:0;overflow:auto;padding:18px 0;display:flex;flex-direction:column" accessibilityLabel="Secções">
              {R.list(v.nav).map((it, $index) => (<React.Fragment key={$index}>
                <R.G s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;position:relative;height:42px;flex-shrink:0;display:grid;grid-template-columns:32px minmax(0,1fr) auto;align-items:center;gap:8px;padding:0 24px;border:0;background:${R.s(it?.rbg)};color:${R.s(it?.rfg)};text-align:left;cursor:pointer;font-family:inherit`} h="background:#2a2926" onPress={it?.onClick} a_current={it?.cur} tag="button">
                  <R.T s={`font-size:13px;font-weight:300;color:${R.s(it?.rnum)}`}>{R.x(it?.num)}</R.T>
                  <R.T s="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{R.x(it?.label)}</R.T>
                  <R.T s={`font-size:11px;font-weight:600;color:${R.s(it?.rnum)}`}>{R.x(it?.badge)}</R.T>
                </R.G>
              </React.Fragment>))}
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;margin:0 24px;padding:16px 0 14px;border:0;border-top:1px solid #3a3834;background:transparent;color:#fbfaf7;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:10px;font-family:inherit" onPress={v.goDZ} title="Lotação por check-in" tag="button">
              <R.E s="display:flex;justify-content:space-between;align-items:baseline">
                <R.T s="font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#8a867d">{"No ginásio agora"}</R.T>
                <R.E s="display:flex;align-items:center;gap:6px;font-size:9px;font-weight:600;letter-spacing:.2em;color:#7fbf95">
                  <R.E s="width:6px;height:6px;border-radius:50%;background:#7fbf95" />
                  <R.T>{"CHECK-IN"}</R.T>
                </R.E>
              </R.E>
              <R.E s="display:flex;align-items:flex-end;gap:12px">
                <R.T s="font-size:40px;font-weight:300;line-height:.9">{R.x(v.lotNow)}</R.T>
                <R.E s="flex:1;height:32px;display:flex;align-items:flex-end;gap:2px">
                  {R.list(v.railBars).map((b, $index) => (<React.Fragment key={$index}>
                    <R.E s={`flex:1;height:${R.s(b?.h)};background:${R.s(b?.c)}`} />
                  </React.Fragment>))}
                </R.E>
              </R.E>
            </R.E>
            <R.E s="margin:0 24px;padding:14px 0 22px;border-top:1px solid #3a3834;display:flex;align-items:center;gap:12px">
              <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#c8640c;color:#1d1c1a;font-size:12px;font-weight:600;letter-spacing:.06em">
                <R.T>{R.x(v.who?.i)}</R.T>
              </R.E>
              <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{R.x(v.who?.n)}</R.T>
                <R.T s="font-size:9px;font-weight:600;letter-spacing:.24em;text-transform:uppercase;color:#8a867d">{R.x(v.who?.r)}</R.T>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 2px;border:0;background:transparent;color:#d9d4c4;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" h="color:#c8640c" onPress={v.sair} title="Terminar sessão" tag="button">
                <R.T>{"Sair"}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.E s="position:relative;flex:1;min-width:0;display:flex;flex-direction:column;overflow-y:auto">
            {v.cob?.open ? (<>
              <R.E s="position:absolute;inset:0;z-index:30;background:rgba(29,28,26,.42)">
                <R.E s={`position:sticky;top:0;height:${R.s(v.railH)};display:flex;align-items:center;justify-content:center;padding:32px`}>
                  <R.E s="width:min(640px,100%);max-height:100%;overflow:auto;background:#fbfaf7;display:flex;flex-direction:column" role="dialog" accessibilityLabel="Cobrar">
                    <R.E s="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:22px 28px;border-bottom:1px solid #e4e0d6">
                      <R.E s="display:flex;flex-direction:column;gap:4px">
                        <R.T s="font-size:20px;font-weight:500;letter-spacing:.12em;text-transform:uppercase">{"Cobrar"}</R.T>
                        <R.T s="font-size:13px;color:#6b675f">{R.x(v.xc?.m?.n)}{" · "}{R.x(v.xc?.m?.d)}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:40px;height:40px;border:0;background:transparent;font-size:22px;color:#55524b;cursor:pointer" onPress={v.cob?.close} accessibilityLabel="Fechar" tag="button">
                        <R.T>{"×"}</R.T>
                      </R.E>
                    </R.E>
                    {v.cob?.form ? (<>
                      <R.E s="padding:20px 28px 24px;display:flex;flex-direction:column;gap:18px">
                        <R.E s="display:flex;flex-direction:column">
                          {R.list(v.xc?.items).map((it, $index) => (<React.Fragment key={$index}>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={it?.flip} role="checkbox" a_checked={it?.on} tag="button">
                              <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(it?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px`}>
                                <R.T>{R.x(it?.tick)}</R.T>
                              </R.E>
                              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                                <R.T s="font-size:14px;font-weight:500">{R.x(it?.l)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(it?.d)}</R.T>
                              </R.E>
                              <R.T s="font-size:14px;white-space:nowrap">{R.x(it?.v)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Documento"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.docs).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Enviar ao cliente por"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.canais).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </R.G>
                        {v.xc?.payNow ? (<>
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Meio de pagamento"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.meios).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </>) : null}
                        {v.xc?.err ? (<>
                          <R.T s="padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px" role="alert">{R.x(v.xc?.err)}</R.T>
                        </>) : null}
                        <R.E s="display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:6px;border-top:1px solid #1d1c1a">
                          <R.E s="display:flex;flex-direction:column;gap:2px;padding-top:12px">
                            <R.T s="font-size:12px;color:#6b675f">{"Total · "}{R.x(v.xc?.sum)}</R.T>
                            <R.T s="font-size:32px;font-weight:300;line-height:1">{R.x(v.xc?.total)}{" Kz"}</R.T>
                          </R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:46px;padding:0 22px;margin-top:12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" h="background:#9a4c08" onPress={v.xc?.submit} tag="button">
                            <R.T>{R.x(v.xc?.cta)}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </>) : null}
                    {v.xc?.res ? (<>
                      <R.E s="padding:24px 28px;display:flex;flex-direction:column;gap:14px">
                        <R.E s="display:flex;align-items:center;gap:10px;font-size:13px;font-weight:600;color:#2e7d4f">
                          <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                          <R.T>{R.x(v.xc?.res?.title)}</R.T>
                        </R.E>
                        <R.T s="font-size:22px;font-weight:500">{R.x(v.xc?.res?.doc)}</R.T>
                        <R.T s="font-size:13px;color:#6b675f">{R.x(v.xc?.res?.v)}{" Kz · "}{R.x(v.xc?.res?.meio)}{" · SMS para "}{R.x(v.xc?.res?.tel)}</R.T>
                        <R.T s="background:#ebe6d6;padding:14px 16px;font-size:14px;line-height:1.5">{R.x(v.xc?.res?.sms)}</R.T>
                        <R.E s="display:flex;gap:8px;justify-content:flex-end">
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;padding:0 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={v.xc?.again} tag="button">
                            <R.T>{R.x(v.xc?.res?.againL)}</R.T>
                          </R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;padding:0 16px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={v.cob?.close} tag="button">
                            <R.T>{"Concluir"}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </>) : null}
                  </R.E>
                </R.E>
              </R.E>
            </>) : null}
            <R.E s="position:sticky;top:0;z-index:10;height:64px;display:flex;align-items:center;gap:16px;padding:0 40px;background:#fbfaf7;border-bottom:1px solid #e4e0d6">
              <R.E s="display:flex;align-items:baseline;gap:12px;min-width:0;white-space:nowrap">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.crumb?.a)}</R.T>
                <R.T s="color:#c9c3b1">{"/"}</R.T>
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#1d1c1a">{R.x(v.crumb?.b)}</R.T>
              </R.E>
              <R.E s="flex:1" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;flex:0 1 380px;min-width:180px;height:40px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 14px;border:0;background:#ebe6d6;color:#55524b;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;text-align:left" h="background:#e0d9c5" accessibilityLabel="Pesquisar membro" tag="button">
                <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"Pesquisar · nome, telefone, NIF"}</R.T>
                <R.T s="flex-shrink:0;color:#1d1c1a">{"⌘K"}</R.T>
              </R.E>
              {v.isDono ? (<>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;display:flex;align-items:center;gap:10px;padding:0 4px;border:0;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.goD6} tag="button">
                  <R.T>{"Aprovações"}</R.T>
                  <R.E s="min-width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:#c8640c;color:#1d1c1a;letter-spacing:0;font-size:12px">
                    <R.T>{R.x(v.approvals)}</R.T>
                  </R.E>
                </R.E>
              </>) : null}
            </R.E>
            {v.offline ? (<>
              <R.E s="background:#1d1c1a;color:#ebe6d6;display:flex;align-items:center;gap:12px;padding:12px 40px;font-size:13px" role="status">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#e0b23c" />
                <R.T s="font-weight:600;letter-spacing:.16em;text-transform:uppercase;font-size:11px">{"Sem rede"}</R.T>
                <R.T>{"Recepção e catracas continuam a funcionar. 7 operações e 12 SMS do "}{R.x(v.turnoMin)}{" em fila para sincronizar."}</R.T>
              </R.E>
            </>) : null}
            <R.E s="flex:1;background:#f4f1ea;padding-bottom:28px">
              {v.is?.d1 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.d1Eyebrow)}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Recepção"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={v.goD3} tag="button">
                        <R.T>{"Check-in manual"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.goD2} tag="button">
                        <R.T>{"Nova inscrição"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {v.caixa ? (<>
                      <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                        <R.T s="font-size:13px;font-weight:500">{"Kz · Em caixa desde 07:00"}</R.T>
                        <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{"184 500,00"}</R.T>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#1d1c1a;color:#fbfaf7" onPress={v.goD4} tag="button">
                          <R.T>{"Fechar caixa"}</R.T>
                        </R.E>
                      </R.E>
                    </>) : null}
                    {v.caixaFechado ? (<>
                      <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                        <R.T s="font-size:13px;font-weight:500">{"Caixa fechado"}</R.T>
                        <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{"—"}</R.T>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.abrirCaixa} tag="button">
                          <R.T>{"Abrir caixa"}</R.T>
                        </R.E>
                      </R.E>
                    </>) : null}
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"42"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Check-ins hoje"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"18"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Dentro agora"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"02"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Em dívida"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"03"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"A vencer"}</R.T>
                    </R.E>
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.6fr) minmax(320px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Check-ins recentes"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:52px minmax(120px,1.3fr) minmax(0,1fr) minmax(0,.9fr) 150px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Hora"}</R.T>
                          <R.T>{"Membro"}</R.T>
                          <R.T>{"Plano"}</R.T>
                          <R.T>{"Filial"}</R.T>
                          <R.T>{"Estado"}</R.T>
                        </R.G>
                        {R.list(v.checkins).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:grid;grid-template-columns:52px minmax(120px,1.3fr) minmax(0,1fr) minmax(0,.9fr) 150px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;border-left:0;border-right:0;border-bottom:0;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" h="background:#f4f1ea" onPress={r?.onClick} tag="button">
                            <R.T s="color:#6b675f">{R.x(r?.h)}</R.T>
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                            <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.p)}</R.T>
                            <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.f)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                <R.T>{R.x(r?.s?.l)}</R.T>
                              </R.E>
                              <R.T s="font-size:11px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.why)}</R.T>
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.E s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">
                            <R.E s="display:flex;align-items:center;gap:10px">
                              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                              <R.T>{"Em dívida"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="min-width:0">
                          {R.list(v.divida).map((r, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}{" · "}{R.x(r?.v)}</R.T>
                                <R.T s="font-size:11px;color:#2e7d4f">{R.x(r?.smsInfo)}</R.T>
                              </R.E>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(r?.smsOp)}`} h="background:#1d1c1a;color:#fbfaf7" onPress={r?.sms} disabled={r?.smsDis} tag="button">
                                <R.T>{"SMS"}</R.T>
                              </R.E>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={r?.cobrar} tag="button">
                                <R.T>{"Cobrar"}</R.T>
                              </R.E>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.E s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">
                            <R.E s="display:flex;align-items:center;gap:10px">
                              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#c99a1b" />
                              <R.T>{"A vencer"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="min-width:0">
                          {R.list(v.vencer).map((r, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}{" · "}{R.x(r?.v)}</R.T>
                                <R.T s="font-size:11px;color:#2e7d4f">{R.x(r?.smsInfo)}</R.T>
                              </R.E>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(r?.smsOp)}`} h="background:#1d1c1a;color:#fbfaf7" onPress={r?.sms} disabled={r?.smsDis} tag="button">
                                <R.T>{"Lembrar"}</R.T>
                              </R.E>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.d2 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Talatona · Uma tarefa, um ecrã"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Nova inscrição"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                        <R.T s="font-size:40px;font-weight:300;line-height:1">{R.x(v.timer)}</R.T>
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Meta 03:00"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="padding:0 40px 32px;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px" role="list" accessibilityLabel="Passos">
                    {R.list(v.steps).map((s, $index) => (<React.Fragment key={$index}>
                      <R.E s="display:flex;flex-direction:column;gap:10px" role="listitem">
                        <R.E s={`height:4px;background:${R.s(s?.bar)}`} />
                        <R.T s={`font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:${R.s(s?.color)}`}>{"0"}{R.x(s?.n)}{" · "}{R.x(s?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;padding:40px;min-height:440px;margin:0 40px 20px">
                    {v.st0 ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:24px;max-width:860px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Dados do cliente"}</R.T>
                        <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px 40px">
                          {R.list(v.cliente).map((f, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{R.x(f?.l)}</R.T>
                              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:20px;font-weight:300;color:#1d1c1a;letter-spacing:0;text-transform:none;outline:none;font-family:inherit;min-width:0" tag="input" value={f?.v} onChange={f?.set} placeholder={f?.ph} />
                            </R.E>
                          </React.Fragment>))}
                        </R.G>
                        <R.T s="font-size:13px;line-height:1.5;color:#55524b">{"O telefone é o acesso do membro à app. Recebe a senha temporária por SMS no fim da inscrição."}</R.T>
                      </R.E>
                    </>) : null}
                    {v.st1 ? (<>
                      <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid #e4e0d6;border-left:1px solid #e4e0d6">
                        {R.list(v.plans).map((p, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:12px;padding:24px;border:0;border-right:1px solid #e4e0d6;border-bottom:1px solid #e4e0d6;box-shadow:${R.s(p?.ring)};background:${R.s(p?.bg)};text-align:left;color:#1d1c1a;opacity:${R.s(p?.op)};min-height:240px;cursor:pointer;min-width:0`} onPress={p?.onClick} disabled={p?.disabled} a_pressed={p?.pressed} tag="button">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(p?.scope)}</R.T>
                            <R.T s="font-size:22px;font-weight:400;letter-spacing:.14em;text-transform:uppercase">{R.x(p?.n)}</R.T>
                            <R.T s="font-size:13px;color:#55524b">{R.x(p?.d)}</R.T>
                            <R.E s="flex:1" />
                            <R.T s="font-size:22px;font-weight:300">{R.x(p?.price)}</R.T>
                            <R.T s="font-size:12px;color:#b42318">{R.x(p?.note)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.G>
                    </>) : null}
                    {v.st2 ? (<>
                      <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:48px">
                        <R.E s="display:block;margin:0 2px;padding:.35em .75em .625em;border:2px groove #c0c0c0;border:0;margin:0;padding:0;display:flex;flex-direction:column">
                          <R.T s="display:block;padding:0 2px;font-size:12px;font-weight:500;color:#6b675f;padding:0 0 12px">{"Meio de pagamento"}</R.T>
                          {R.list(v.methods).map((m, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:60px;display:flex;align-items:center;gap:16px;padding:0 16px;border:0;border-top:1px solid #e4e0d6;background:${R.s(m?.bg)};font-size:15px;color:#1d1c1a;text-align:left;cursor:pointer`} h="background:#f4f1ea" onPress={m?.onClick} a_pressed={m?.pressed} tag="button">
                              <R.E s={`width:14px;height:14px;border:1px solid #1d1c1a;background:${R.s(m?.dot)};flex-shrink:0`} />
                              <R.T s="flex:1;font-weight:500">{R.x(m?.l)}</R.T>
                              <R.T s="font-size:12px;color:#6b675f">{R.x(m?.d)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.E s="background:#c8640c;padding:32px;display:flex;flex-direction:column;gap:16px">
                          <R.T s="font-size:13px;font-weight:500">{"Kz · A cobrar · "}{R.x(v.planName)}</R.T>
                          <R.T s="font-size:52px;font-weight:300;line-height:1">{R.x(v.planPrice)}</R.T>
                          <R.T s="font-size:13px">{"A subscrição só fica activa com o pagamento confirmado."}</R.T>
                          {v.pay?.idle ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.cobrar} tag="button">
                              <R.T>{"Cobrar agora"}</R.T>
                            </R.E>
                          </>) : null}
                          {v.pay?.waiting ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:8px;background:#fbfaf7;padding:16px" role="status">
                              <R.T s="margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap;color:#7a5800">{"À espera do Multicaixa Express"}</R.T>
                              <R.T s="font-size:13px;color:#55524b">{"Pedido enviado para 923 456 789. O cliente confirma no telemóvel."}</R.T>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;border:0;background:none;padding:0;font-size:12px;color:#55524b;text-decoration:underline;cursor:pointer" onPress={v.falhar} tag="button">
                                <R.T>{"Simular falha"}</R.T>
                              </R.E>
                            </R.E>
                          </>) : null}
                          {v.pay?.failed ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:10px;background:#fbfaf7;padding:16px" role="alert">
                              <R.T s="margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap;color:#b42318">{"Pagamento não confirmado"}</R.T>
                              <R.T s="font-size:13px;color:#55524b">{"O cliente recusou ou não tinha saldo. Tente de novo ou troque o meio."}</R.T>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.cobrar} tag="button">
                                <R.T>{"Tentar de novo"}</R.T>
                              </R.E>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </R.G>
                    </>) : null}
                    {v.st3 ? (<>
                      <R.G s="display:grid;grid-template-columns:auto minmax(0,1fr) minmax(0,1.1fr);gap:40px;align-items:start">
                        <R.E s="display:flex;flex-direction:column;gap:10px">
                          <R.E s="background:#fff;border:1px solid #e4e0d6;padding:16px">
                            <R.G s="display:grid;grid-template-columns:repeat(21,8px);grid-auto-rows:8px" role="img" accessibilityLabel="Código QR de acesso">
                              {R.list(v.qr).map((c, $index) => (<React.Fragment key={$index}>
                                <R.E s={`background:${R.s(c)}`} />
                              </React.Fragment>))}
                            </R.G>
                          </R.E>
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"QR de acesso activo"}</R.T>
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:14px;min-width:0">
                          <R.E s="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#2e7d4f">
                            <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                            <R.T>{"Pago e activo"}</R.T>
                          </R.E>
                          <R.T s="font-size:28px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;line-height:1.1">{"Kátia Muondo"}</R.T>
                          <R.T s="font-size:14px;color:#55524b">{R.x(v.planName)}{" · "}{R.x(v.planPrice)}{" Kz · Factura FR TAL/2026/1202"}</R.T>
                          <R.T s="margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap;padding-top:8px">{"Credenciais da área do cliente"}</R.T>
                          <R.E s="display:block;margin:1em 0;margin:0;display:flex;flex-direction:column;font-size:13px">
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Endereço"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"muntu.ao/app"}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Utilizador"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"923 456 789"}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Código temporário"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"482 117 · válido 24 h"}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Estado"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.credState)}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="background:#ebe6d6;padding:28px;display:flex;flex-direction:column;gap:14px;min-width:0">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f;color:#1d1c1a">{"Enviar credenciais por"}</R.T>
                          <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                            {R.list(v.sendChs).map((c, $index) => (<React.Fragment key={$index}>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                                <R.T>{R.x(c?.l)}</R.T>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                          <R.T s="background:#fbfaf7;padding:14px 16px;font-size:14px;line-height:1.5">{R.x(v.credMsg)}</R.T>
                          <R.T s="font-size:12px;color:#55524b">{R.x(v.credCount)}</R.T>
                          {v.notSent ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.enviar} tag="button">
                              <R.T>{"Enviar credenciais por "}{R.x(v.sendChL)}</R.T>
                            </R.E>
                          </>) : null}
                          {v.sent ? (<>
                            <R.E s="display:flex;align-items:center;gap:8px;font-size:14px;color:#2e7d4f" role="status">
                              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                              <R.T>{"Enviado por "}{R.x(v.sendChL)}{" para 923 456 789. Inscrição feita em "}{R.x(v.timer)}{"."}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#1d1c1a;color:#fbfaf7" onPress={v.reenviar} tag="button">
                              <R.T>{R.x(v.reenvioL)}</R.T>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </R.G>
                    </>) : null}
                  </R.E>
                  <R.E s="display:flex;justify-content:space-between;gap:16px;padding:24px 40px;border-top:1px solid #e4e0d6">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={v.back} tag="button">
                      <R.T>{R.x(v.backLabel)}</R.T>
                    </R.E>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(v.nextOp)}`} h="background:#9a4c08" onPress={v.next} disabled={v.nextDisabled} tag="button">
                      <R.T>{R.x(v.nextLabel)}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.is?.d3 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.filialL)}{" · base de membros"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Membros"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                        <R.T>{"Exportar"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.goD2} tag="button">
                        <R.T>{"Nova inscrição"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                      <R.T s="font-size:13px;font-weight:500">{"Membros activos"}</R.T>
                      <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{"1 284"}</R.T>
                      <R.T s="font-size:13px">{"+38 novos este mês"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"46"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Em dívida"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"92"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Vencem em 7 dias"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"81%"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Retenção 90 dias"}</R.T>
                    </R.E>
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:330px minmax(0,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="border-right:1px solid #e4e0d6;padding:24px 24px 32px 40px;display:flex;flex-direction:column;gap:16px">
                      <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%;height:44px;font-size:16px" accessibilityLabel="Pesquisar membro" tag="input" value={v.mQ} onChange={v.setMQ} placeholder="Nome, telefone ou n.º" />
                      <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                        {R.list(v.mChips).map((c, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                            <R.T>{R.x(c?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                      <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(v.mCount)}</R.T>
                      <R.E>
                        {R.list(v.mList).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:grid;grid-template-columns:36px minmax(0,1fr) 8px;gap:12px;align-items:center;padding:10px 8px;border:0;border-top:1px solid #e4e0d6;background:${R.s(r?.bg)};color:#1d1c1a;text-align:left;cursor:pointer`} h="background:#f4f1ea" onPress={r?.onClick} a_pressed={r?.pressed} tag="button">
                            <R.E s="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:#ebe6d6;font-size:11px;font-weight:600;letter-spacing:.08em">
                              <R.T>{R.x(r?.ini)}</R.T>
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                              <R.T s="font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                              <R.T s="font-size:12px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.sub)}</R.T>
                            </R.E>
                            <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(r?.s?.c)}`} title={r?.s?.l} />
                          </R.G>
                        </React.Fragment>))}
                        {v.mEmpty ? (<>
                          <R.T s="display:block;margin:1em 0;margin:0;padding:16px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Nenhum membro encontrado."}</R.T>
                        </>) : null}
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:32px 40px;display:flex;gap:24px;align-items:flex-start;flex-wrap:wrap">
                        <R.E s="width:96px;height:96px;flex-shrink:0;background:#ebe6d6;display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:300;letter-spacing:.1em;color:#55524b" role="img" accessibilityLabel={`Foto de ${R.s(v.mm?.n)}`}>
                          <R.T>{R.x(v.mm?.ini)}</R.T>
                        </R.E>
                        <R.E s="flex:1;min-width:220px;display:flex;flex-direction:column;gap:10px">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"N.º "}{R.x(v.mm?.id)}{" · desde "}{R.x(v.mm?.since)}{" · base "}{R.x(v.mm?.base)}</R.T>
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:30px;font-weight:400;letter-spacing:.16em;text-transform:uppercase;line-height:1.1">{R.x(v.mm?.n)}</R.T>
                          <R.E s="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
                            <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(v.mm?.s?.c)}`}>
                              <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(v.mm?.s?.c)}`} />
                              <R.T>{R.x(v.mm?.s?.l)}</R.T>
                            </R.E>
                            <R.T s="font-size:14px;color:#55524b">{R.x(v.mm?.plano)}</R.T>
                          </R.E>
                        </R.E>
                        <R.E s="display:flex;gap:8px;flex-wrap:wrap">
                          {R.list(v.mm?.actions).map((a, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;padding:0 16px;border:${R.s(a?.border)};background:${R.s(a?.bg)};color:${R.s(a?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={a?.onClick} tag="button">
                              <R.T>{R.x(a?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      {v.mm?.banner ? (<>
                        <R.E s={`display:flex;align-items:center;gap:12px;padding:14px 40px;background:${R.s(v.mm?.s?.bg)};color:${R.s(v.mm?.s?.c)};font-size:14px;font-weight:500`} role="status">
                          <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(v.mm?.s?.c)};flex-shrink:0`} />
                          <R.T>{R.x(v.mm?.banner)}</R.T>
                        </R.E>
                      </>) : null}
                      <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;padding:0 40px 20px">
                        <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                          <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.mm?.dias)}</R.T>
                          <R.T s="font-size:13px;font-weight:500;color:#55524b">{R.x(v.mm?.diasL)}</R.T>
                        </R.E>
                        <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                          <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.mm?.prox)}</R.T>
                          <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Próxima mensalidade"}</R.T>
                        </R.E>
                        <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                          <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.mm?.entMes)}</R.T>
                          <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Entradas este mês"}</R.T>
                        </R.E>
                        <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                          <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.mm?.appL)}</R.T>
                          <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Área do cliente"}</R.T>
                        </R.E>
                      </R.G>
                      <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4;overflow-x:auto" role="tablist">
                        {R.list(v.mTabs).map((t, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0;margin-right:32px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:${R.s(t?.color)};font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={t?.onClick} role="tab" a_selected={t?.sel} tag="button">
                            <R.T>{R.x(t?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                      {v.mt?.resumo ? (<>
                        <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:0 40px 20px">
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Últimos pagamentos"}</R.T>
                            </R.E>
                            <R.E s="min-width:0">
                              {R.list(v.mm?.pays3).map((r, $index) => (<React.Fragment key={$index}>
                                <R.G s="display:grid;grid-template-columns:48px minmax(0,1fr) auto;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                  <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                                  <R.E s="display:flex;flex-direction:column;gap:4px;min-width:0">
                                    <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.desc)}</R.T>
                                    <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                      <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                      <R.T>{R.x(r?.s?.l)}</R.T>
                                    </R.E>
                                  </R.E>
                                  <R.T s="white-space:nowrap">{R.x(r?.v)}</R.T>
                                </R.G>
                              </React.Fragment>))}
                              {v.mm?.noPays ? (<>
                                <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Pagamentos e dados ficam no ginásio de origem."}</R.T>
                              </>) : null}
                            </R.E>
                          </R.E>
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Últimas entradas"}</R.T>
                            </R.E>
                            <R.E s="min-width:0">
                              {R.list(v.mm?.ent3).map((r, $index) => (<React.Fragment key={$index}>
                                <R.G s="display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                  <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                                  <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                    <R.T>{R.x(r?.f)}</R.T>
                                    <R.T s={`font-size:12px;color:${R.s(r?.c)}`}>{R.x(r?.m)}</R.T>
                                  </R.E>
                                </R.G>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Filiais com acesso"}</R.T>
                            </R.E>
                            <R.E s="min-width:0">
                              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                                {R.list(v.mm?.filiais).map((f, $index) => (<React.Fragment key={$index}>
                                  <R.T s="padding:6px 10px;background:#ebe6d6;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase">{R.x(f)}</R.T>
                                </React.Fragment>))}
                              </R.E>
                            </R.E>
                          </R.E>
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Área do cliente"}</R.T>
                            </R.E>
                            <R.E s="min-width:0">
                              <R.E s="display:flex;flex-direction:column;gap:12px">
                                <R.T s="font-size:14px;line-height:1.5">{R.x(v.mm?.appTxt)}</R.T>
                                {v.mm?.canCred ? (<>
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.mm?.sendCred} tag="button">
                                    <R.T>{"Enviar credenciais por SMS"}</R.T>
                                  </R.E>
                                </>) : null}
                                {v.mm?.credInfo ? (<>
                                  <R.T s="font-size:13px;color:#2e7d4f" role="status">{R.x(v.mm?.credInfo)}</R.T>
                                </>) : null}
                              </R.E>
                            </R.E>
                          </R.E>
                        </R.G>
                      </>) : null}
                      {v.mt?.pagamentos ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Pagamentos · últimos 6 meses"}</R.T>
                          </R.E>
                          <R.E s="min-width:0">
                            <R.G s="display:grid;grid-template-columns:64px minmax(0,1fr) 110px 120px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"Data"}</R.T>
                              <R.T>{"Descrição"}</R.T>
                              <R.T s="text-align:right">{"Valor"}</R.T>
                              <R.T s="text-align:right">{"Estado"}</R.T>
                            </R.G>
                            {R.list(v.mm?.pays).map((r, $index) => (<React.Fragment key={$index}>
                              <R.G s="display:grid;grid-template-columns:64px minmax(0,1fr) 110px 120px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                                <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                  <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.desc)}</R.T>
                                  <R.T s="font-size:12px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.m)}{" · "}{R.x(r?.f)}</R.T>
                                </R.E>
                                <R.T s="text-align:right;white-space:nowrap">{R.x(r?.v)}</R.T>
                                <R.E s="justify-self:end">
                                  <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                    <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                    <R.T>{R.x(r?.s?.l)}</R.T>
                                  </R.E>
                                </R.E>
                              </R.G>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                      </>) : null}
                      {v.mt?.entradas ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Entradas · últimos 30 dias"}</R.T>
                          </R.E>
                          <R.E s="min-width:0">
                            <R.G s="display:grid;grid-template-columns:130px 80px minmax(0,1fr) minmax(0,1fr);gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"Data"}</R.T>
                              <R.T>{"Turno"}</R.T>
                              <R.T>{"Filial"}</R.T>
                              <R.T>{"Método"}</R.T>
                            </R.G>
                            {R.list(v.mm?.entradas).map((r, $index) => (<React.Fragment key={$index}>
                              <R.G s="display:grid;grid-template-columns:130px 80px minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                                <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.t)}</R.T>
                                <R.T>{R.x(r?.f)}</R.T>
                                <R.T s={`color:${R.s(r?.c)}`}>{R.x(r?.m)}</R.T>
                              </R.G>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                      </>) : null}
                      {v.mt?.avisos ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;max-width:820px">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Avisos ao membro"}</R.T>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#1d1c1a;color:#fbfaf7" onPress={v.toggleComp} tag="button">
                              <R.T>{R.x(v.compLabel)}</R.T>
                            </R.E>
                          </R.E>
                          <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                            {v.composer ? (<>
                              <R.E s="display:flex;flex-direction:column;gap:12px;padding:16px;background:#ebe6d6;margin-bottom:16px">
                                <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                                  {R.list(v.compTpls).map((c, $index) => (<React.Fragment key={$index}>
                                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                                      <R.T>{R.x(c?.l)}</R.T>
                                    </R.E>
                                  </React.Fragment>))}
                                </R.E>
                                <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;border:1px solid #1d1c1a;background:#fbfaf7;padding:10px;font-size:14px;line-height:1.45;color:#1d1c1a;resize:vertical" accessibilityLabel="Mensagem" tag="textarea" value={v.compText} onChange={v.setComp} rows="3" />
                                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:8px">
                                  <R.T s="font-size:12px;color:#55524b">{R.x(v.compCount)}</R.T>
                                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(v.compOp)}`} h="background:#9a4c08" onPress={v.sendComp} disabled={v.compEmpty} tag="button">
                                    <R.T>{"Enviar SMS"}</R.T>
                                  </R.E>
                                </R.E>
                              </R.E>
                            </>) : null}
                            {R.list(v.mm?.avisos).map((r, $index) => (<React.Fragment key={$index}>
                              <R.E s="display:flex;justify-content:space-between;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                                <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                                  <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                                  <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}{" · "}{R.x(r?.ch)}</R.T>
                                </R.E>
                                <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                  <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                  <R.T>{R.x(r?.s?.l)}</R.T>
                                </R.E>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                      </>) : null}
                      {v.mt?.dados ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;max-width:720px">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Dados pessoais"}</R.T>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                              <R.T>{"Editar"}</R.T>
                            </R.E>
                          </R.E>
                          <R.E s="min-width:0">
                            <R.E s="display:block;margin:1em 0;margin:0;display:flex;flex-direction:column;font-size:13px">
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Telefone"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.tel)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"NIF"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.nif)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Email"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.email)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Data de nascimento"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.nasc)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Contacto de emergência"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.emerg)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Turno habitual"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.mm?.turno)}</R.T>
                              </R.E>
                              <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                                <R.T s="color:#6b675f">{"Avisos por SMS"}</R.T>
                                <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"Aceite · "}{R.x(v.mm?.since)}</R.T>
                              </R.E>
                            </R.E>
                          </R.E>
                        </R.E>
                      </>) : null}
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.d4 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.filialC)}{" · "}{R.x(v.cxTurnoL)}{" · Celma Bento"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Caixa"}</R.T>
                    </R.E>
                  </R.E>
                  <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4;overflow-x:auto" role="tablist">
                    {R.list(v.cxTabs).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0;margin-right:32px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:${R.s(t?.color)};font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={t?.onClick} role="tab" a_selected={t?.sel} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  {v.cx?.atual ? (<>
                    <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                      <R.E s={`background:${R.s(v.difBg)};color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0`}>
                        <R.T s="font-size:13px;font-weight:500">{"Kz · Diferença do turno"}</R.T>
                        <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{R.x(v.difBig)}</R.T>
                        <R.T s="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(v.difLabel)}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"20 000,00"}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Fundo de troco"}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.cxCount)}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Movimentos do turno"}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"96 500,00"}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Electrónico conciliado"}</R.T>
                      </R.E>
                    </R.G>
                    <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:20px;padding:0 40px 20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Movimentos do turno"}</R.T>
                          <R.E s="display:flex;gap:6px">
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#1d1c1a;color:#fbfaf7" onPress={v.cxSangria} tag="button">
                              <R.T>{"Sangria"}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#1d1c1a;color:#fbfaf7" onPress={v.cxReforco} tag="button">
                              <R.T>{"Reforço"}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#1d1c1a;color:#fbfaf7" onPress={v.cxDespesa} tag="button">
                              <R.T>{"Despesa"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                          {v.cxFormOn ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:12px;padding:16px;background:#ebe6d6;margin-bottom:12px">
                              <R.T s="margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{R.x(v.cxFormL)}</R.T>
                              <R.G s="display:grid;grid-template-columns:140px minmax(0,1fr);gap:16px">
                                <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                                  <R.T>{"Valor (Kz)"}</R.T>
                                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="input" value={v.cxVal} onChange={v.setCxVal} inputMode="numeric" />
                                </R.E>
                                <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                                  <R.T>{"Motivo"}</R.T>
                                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="input" value={v.cxMot} onChange={v.setCxMot} />
                                </R.E>
                              </R.G>
                              <R.E s="display:flex;gap:8px">
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={v.cxCancel} tag="button">
                                  <R.T>{"Cancelar"}</R.T>
                                </R.E>
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.cxRegistar} tag="button">
                                  <R.T>{"Registar"}</R.T>
                                </R.E>
                              </R.E>
                            </R.E>
                          </>) : null}
                          {R.list(v.turnoMovs).map((r, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:48px minmax(0,1fr) minmax(0,.7fr) 110px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T s="color:#6b675f">{R.x(r?.h)}</R.T>
                              <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.d)}</R.T>
                              <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.m)}</R.T>
                              <R.T s={`text-align:right;white-space:nowrap;color:${R.s(r?.c)}`}>{R.x(r?.v)}</R.T>
                            </R.G>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Contagem do dinheiro"}</R.T>
                        </R.E>
                        <R.E s="min-width:0">
                          <R.T s="display:block;margin:1em 0;margin:0 0 16px;font-size:14px;line-height:1.5;color:#55524b">{R.x(v.closeIntro)}</R.T>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                            <R.T>{"Nota"}</R.T>
                            <R.T>{"Quantidade"}</R.T>
                            <R.T s="text-align:right">{"Subtotal"}</R.T>
                          </R.G>
                          {R.list(v.notaRows).map((r, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;padding:6px 0">
                              <R.T s="font-weight:500">{R.x(r?.l)}{" Kz"}</R.T>
                              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%;height:36px;font-size:18px;font-weight:300" tag="input" value={r?.q} onChange={r?.onInput} inputMode="numeric" readOnly={r?.ro} />
                              <R.T s="text-align:right;color:#55524b;white-space:nowrap">{R.x(r?.sub)}</R.T>
                            </R.G>
                          </React.Fragment>))}
                          <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;border-top:2px solid #1d1c1a;font-weight:600">
                            <R.T s="font-size:11px;letter-spacing:.18em;text-transform:uppercase">{"Dinheiro contado"}</R.T>
                            <R.E />
                            <R.T s="text-align:right;white-space:nowrap">{R.x(v.cashTotal)}</R.T>
                          </R.G>
                          {R.list(v.elecRows).map((r, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) auto 110px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T>{R.x(r?.l)}</R.T>
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                <R.T>{R.x(r?.s?.l)}</R.T>
                              </R.E>
                              <R.T s="text-align:right;white-space:nowrap">{R.x(r?.v)}</R.T>
                            </R.G>
                          </React.Fragment>))}
                          {v.revealedC ? (<>
                            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T>{"Dinheiro esperado"}</R.T>
                              <R.E />
                              <R.T s="text-align:right;white-space:nowrap">{R.x(v.expCashL)}</R.T>
                            </R.G>
                            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 90px minmax(0,1fr);gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;font-weight:600">
                              <R.T>{"Diferença"}</R.T>
                              <R.E />
                              <R.T s={`text-align:right;white-space:nowrap;color:${R.s(v.cdifC)}`}>{R.x(v.cdifL)}</R.T>
                            </R.G>
                          </>) : null}
                          <R.E s="display:flex;flex-direction:column;gap:14px;padding-top:20px">
                            {v.cl?.count ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#9a4c08" onPress={v.revelar} tag="button">
                                <R.T>{"Fechar e revelar diferença"}</R.T>
                              </R.E>
                            </>) : null}
                            {v.cl?.zero ? (<>
                              <R.E s="display:flex;align-items:center;gap:10px;font-size:15px;font-weight:500;color:#2e7d4f" role="status">
                                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                                <R.T>{"Sem diferença. Caixa fechado às 14:02."}</R.T>
                              </R.E>
                            </>) : null}
                            {v.cl?.diff ? (<>
                              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:500;color:#6b675f">
                                <R.T>{"Justificação · obrigatória"}</R.T>
                                <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;border:1px solid #1d1c1a;background:#fff;padding:12px;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;resize:vertical" tag="textarea" value={v.just} onChange={v.setJust} placeholder="Explique o que aconteceu" rows="3" />
                              </R.E>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start;opacity:${R.s(v.justOp)}`} h="background:#9a4c08" onPress={v.pedirFecho} disabled={v.noJust} tag="button">
                                <R.T>{"Pedir aprovação ao dono"}</R.T>
                              </R.E>
                            </>) : null}
                            {v.cl?.pending ? (<>
                              <R.E s="display:flex;align-items:center;gap:10px;font-size:15px;font-weight:500;color:#7a5800" role="status">
                                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#c99a1b" />
                                <R.T>{"Diferença de "}{R.x(v.cdifL)}{" enviada ao dono por SMS e na app."}</R.T>
                              </R.E>
                            </>) : null}
                          </R.E>
                        </R.E>
                      </R.E>
                    </R.G>
                    {v.passagem ? (<>
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Passagem de turno"}</R.T>
                        </R.E>
                        <R.E s="min-width:0">
                          <R.E s="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding-top:14px;border-top:1px solid #e4e0d6">
                            <R.E s="display:flex;flex-direction:column;gap:4px;flex:1;min-width:260px">
                              <R.T s="font-size:15px">{"Fundo de troco a entregar ao turno da tarde: "}<R.T s="font-weight:700;font-weight:600">{"20 000,00 Kz"}</R.T></R.T>
                              <R.T s="font-size:13px;color:#55524b">{"Recebe Rui Manuel · abertura às 14:00 · contagem confirmada pelos dois"}</R.T>
                            </R.E>
                            {v.notPassado ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.passar} tag="button">
                                <R.T>{"Confirmar entrega"}</R.T>
                              </R.E>
                            </>) : null}
                            {v.passado ? (<>
                              <R.E s="display:flex;align-items:center;gap:8px;font-size:14px;color:#2e7d4f" role="status">
                                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                                <R.T>{"Entregue a Rui Manuel às 14:02. Turno da tarde aberto."}</R.T>
                              </R.E>
                            </>) : null}
                          </R.E>
                        </R.E>
                      </R.E>
                    </>) : null}
                  </>) : null}
                  {v.cx?.hist ? (<>
                    <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                      <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                        <R.T s="font-size:13px;font-weight:500">{"Kz · Diferenças em Outubro"}</R.T>
                        <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{"−24 000,00"}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"52"}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Turnos fechados"}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"47"}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Sem diferença"}</R.T>
                      </R.E>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                        <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"02"}</R.T>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Em aprovação"}</R.T>
                      </R.E>
                    </R.G>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Turnos fechados"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:56px 84px minmax(0,1fr) 100px 110px 110px 100px 150px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Data"}</R.T>
                          <R.T>{"Filial"}</R.T>
                          <R.T>{"Operador"}</R.T>
                          <R.T>{"Horário"}</R.T>
                          <R.T s="text-align:right">{"Esperado"}</R.T>
                          <R.T s="text-align:right">{"Contado"}</R.T>
                          <R.T s="text-align:right">{"Diferença"}</R.T>
                          <R.T>{"Estado"}</R.T>
                        </R.G>
                        {R.list(v.cxHist).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:56px 84px minmax(0,1fr) 100px 110px 110px 100px 150px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                            <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.f)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                              <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.op)}</R.T>
                              <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#6b675f">{R.x(r?.t)}</R.T>
                            </R.E>
                            <R.T s="color:#55524b">{R.x(r?.hr)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.e)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.c)}</R.T>
                            <R.T s={`text-align:right;white-space:nowrap;font-weight:500;color:${R.s(r?.dc)}`}>{R.x(r?.dif)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                <R.T>{R.x(r?.s?.l)}</R.T>
                              </R.E>
                              <R.T s="font-size:11px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.why)}</R.T>
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                        {v.cxHistEmpty ? (<>
                          <R.T s="display:block;margin:1em 0;margin:0;padding:16px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Sem turnos fechados com estes filtros."}</R.T>
                        </>) : null}
                      </R.E>
                    </R.E>
                  </>) : null}
                </R.E>
              </>) : null}
              {v.is?.d5 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Livro razão · nada se apaga · "}{R.x(v.turnoFull)}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Tesouraria"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                        <R.T>{"Exportar"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" tag="button">
                        <R.T>{"Novo movimento"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                      <R.T s="font-size:13px;font-weight:500">{"Kz · Saldo consolidado"}</R.T>
                      <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{R.x(v.ts?.saldo)}</R.T>
                      <R.T s="font-size:13px">{"Caixas, cofre, banco e valores a liquidar"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.ts?.ent)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Entradas"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.ts?.sai)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Saídas"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"1 859 000"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · A receber"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.ts?.pagar)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · A pagar"}</R.T>
                    </R.E>
                  </R.G>
                  <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4;overflow-x:auto" role="tablist">
                    {R.list(v.tsTabs).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0;margin-right:32px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:${R.s(t?.color)};font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={t?.onClick} role="tab" a_selected={t?.sel} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  {v.tv?.mov ? (<>
                    <R.E s="display:flex;gap:24px 32px;flex-wrap:wrap;padding:20px 40px;border-bottom:1px solid #e4e0d6">
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Período"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                          {R.list(v.perChips).map((c, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                              <R.T>{R.x(c?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Meio"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                          {R.list(v.chips).map((c, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                              <R.T>{R.x(c?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Categoria"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                          {R.list(v.catChips).map((c, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                              <R.T>{R.x(c?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                    <R.E s="display:flex;align-items:stretch;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;flex:1;min-width:0;padding:32px 40px;overflow-x:auto">
                        <R.E s="min-width:680px">
                          <R.G s="display:grid;grid-template-columns:60px 64px minmax(0,1.3fr) minmax(0,1.1fr) minmax(0,.8fr) 120px 140px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                            <R.T>{"Hora"}</R.T>
                            <R.T>{"Turno"}</R.T>
                            <R.T>{"Movimento"}</R.T>
                            <R.T>{"Origem"}</R.T>
                            <R.T>{"Meio"}</R.T>
                            <R.T s="text-align:right">{"Valor"}</R.T>
                            <R.T>{"Estado"}</R.T>
                          </R.G>
                          {R.list(v.ledger).map((r, $index) => (<React.Fragment key={$index}>
                            <R.G s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:grid;grid-template-columns:60px 64px minmax(0,1.3fr) minmax(0,1.1fr) minmax(0,.8fr) 120px 140px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;border-left:0;border-right:0;border-bottom:0;background:${R.s(r?.bg)};color:#1d1c1a;text-align:left;cursor:pointer`} h="background:#f4f1ea" onPress={r?.onClick} a_pressed={r?.pressed} tag="button">
                              <R.E s="display:flex;flex-direction:column;gap:2px">
                                <R.T s="color:#6b675f">{R.x(r?.h)}</R.T>
                                <R.T s="font-size:11px;color:#6b675f">{R.x(r?.dia)}</R.T>
                              </R.E>
                              <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.tl)}</R.T>
                              <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.d)}</R.T>
                              <R.T s="color:#9a4c08;text-decoration:underline;text-underline-offset:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.o)}</R.T>
                              <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.m)}</R.T>
                              <R.T s="text-align:right;font-weight:500;white-space:nowrap">{R.x(r?.v)}</R.T>
                              <R.E s="min-width:0;overflow:hidden">
                                <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                  <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                  <R.T>{R.x(r?.s?.l)}</R.T>
                                </R.E>
                              </R.E>
                            </R.G>
                          </React.Fragment>))}
                          {v.ledgerEmpty ? (<>
                            <R.T s="display:block;margin:1em 0;margin:0;padding:24px 0;border-top:1px solid #e4e0d6;font-size:14px;color:#6b675f">{R.x(v.ledgerEmptyMsg)}</R.T>
                          </>) : null}
                        </R.E>
                      </R.E>
                      {v.hasSel ? (<>
                        <R.E s="width:320px;flex-shrink:0;border-left:1px solid #e4e0d6;padding:32px;display:flex;flex-direction:column;gap:16px" accessibilityLabel="Detalhe do movimento">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Movimento · "}{R.x(v.sel?.h)}</R.T>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;border:0;background:none;padding:4px;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;color:#1d1c1a" onPress={v.closeSel} accessibilityLabel="Fechar detalhe" tag="button">
                              <R.T>{"Fechar ✕"}</R.T>
                            </R.E>
                          </R.E>
                          <R.T s="font-size:36px;font-weight:300">{R.x(v.sel?.v)}</R.T>
                          <R.T s="font-size:15px;font-weight:500">{R.x(v.sel?.d)}</R.T>
                          <R.E s="display:block;margin:1em 0;margin:0;display:flex;flex-direction:column;font-size:13px">
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Origem"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.sel?.o)}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Meio"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.sel?.m)}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Categoria"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.sel?.cat)}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Operador"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"Celma Bento"}</R.T>
                            </R.E>
                            <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                              <R.T s="color:#6b675f">{"Factura AGT"}</R.T>
                              <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.sel?.fac)}</R.T>
                            </R.E>
                          </R.E>
                          {v.sel?.note ? (<>
                            <R.T s={`padding:12px;background:${R.s(v.sel?.s?.bg)};color:${R.s(v.sel?.s?.c)};font-size:13px;font-weight:500`} role="status">{R.x(v.sel?.note)}</R.T>
                          </>) : null}
                          {v.est?.can ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:44px;border:1px solid #b42318;background:transparent;color:#b42318;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#f7e1de" onPress={v.abrirEstorno} tag="button">
                              <R.T>{"Estornar"}</R.T>
                            </R.E>
                          </>) : null}
                          {v.est?.form ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:10px">
                              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:500;color:#6b675f">
                                <R.T>{"Motivo · obrigatório"}</R.T>
                                <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;border:1px solid #1d1c1a;background:#fff;padding:10px;font-size:14px;color:#1d1c1a;letter-spacing:0;text-transform:none;resize:vertical" tag="textarea" value={v.motivo} onChange={v.setMotivo} placeholder="Ex.: cobrança duplicada no TPA" rows="3" />
                              </R.E>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:44px;opacity:${R.s(v.motivoOp)}`} h="background:#9a4c08" onPress={v.pedirEstorno} disabled={v.noMotivo} tag="button">
                                <R.T>{"Pedir aprovação"}</R.T>
                              </R.E>
                              <R.T s="font-size:12px;line-height:1.5;color:#55524b">{"O original fica no livro razão. O estorno entra como novo movimento depois de aprovado."}</R.T>
                            </R.E>
                          </>) : null}
                          {v.est?.sent ? (<>
                            <R.T s="padding:12px;background:#f5ecd0;color:#7a5800;font-size:13px;font-weight:500" role="status">{"Pedido enviado ao dono por SMS. A aguardar aprovação com biometria."}</R.T>
                          </>) : null}
                        </R.E>
                      </>) : null}
                    </R.E>
                  </>) : null}
                  {v.tv?.contas ? (<>
                    <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;padding:0 40px 20px">
                      {R.list(v.contas).map((a, $index) => (<React.Fragment key={$index}>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                          <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(a?.t)}</R.T>
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:16px;font-weight:500;letter-spacing:.14em;text-transform:uppercase">{R.x(a?.n)}</R.T>
                          <R.T s="font-size:32px;font-weight:300;white-space:nowrap">{R.x(a?.val)}</R.T>
                          <R.T s="font-size:13px;color:#55524b">{R.x(a?.meta)}</R.T>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;align-self:flex-start" h="background:#1d1c1a;color:#fbfaf7" onPress={a?.onTrf} tag="button">
                            <R.T>{"Transferir"}</R.T>
                          </R.E>
                        </R.E>
                      </React.Fragment>))}
                    </R.G>
                    {v.trf ? (<>
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;max-width:1100px;margin:0 40px 20px">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Nova transferência entre contas"}</R.T>
                        </R.E>
                        <R.E s="min-width:0">
                          <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr)) minmax(0,1.4fr);gap:20px;padding-top:14px;gap:20px;padding:0 40px 20px">
                            <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"De"}</R.T>
                              <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="select" value={v.trfDe} onChange={v.setTrfDe}>
                                {R.list(v.contaOpts).map((o, $index) => (<React.Fragment key={$index}><R.O value={o?.id} label={o?.n} /></React.Fragment>))}
                              </R.Sel>
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"Para"}</R.T>
                              <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="select" value={v.trfPara} onChange={v.setTrfPara}>
                                {R.list(v.contaOpts).map((o, $index) => (<React.Fragment key={$index}><R.O value={o?.id} label={o?.n} /></React.Fragment>))}
                              </R.Sel>
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"Valor (Kz)"}</R.T>
                              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="input" value={v.trfV} onChange={v.setTrfV} placeholder="0" inputMode="numeric" />
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                              <R.T>{"Motivo"}</R.T>
                              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0;text-transform:none;width:100%" tag="input" value={v.trfMot} onChange={v.setTrfMot} placeholder="Ex.: sangria para o cofre" />
                            </R.E>
                          </R.G>
                          <R.E s="display:flex;gap:12px;align-items:center;flex-wrap:wrap;padding-top:20px">
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={v.trfCancel} tag="button">
                              <R.T>{"Cancelar"}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.trfRegistar} tag="button">
                              <R.T>{"Registar transferência"}</R.T>
                            </R.E>
                            <R.T s="font-size:13px;color:#2e7d4f" role="status">{R.x(v.trfDone)}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </>) : null}
                  </>) : null}
                  {v.tv?.rec ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Antiguidade da dívida"}</R.T>
                        <R.T s="font-size:13px;color:#55524b">{"Rede MUNTU a receber: 186 000,00 Kz · liquida a 31/10"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px">
                          {R.list(v.ageing).map((a, $index) => (<React.Fragment key={$index}>
                            <R.E s="background:#ebe6d6;padding:20px;display:flex;flex-direction:column;gap:10px;min-width:0">
                              <R.T s="font-size:12px;font-weight:500;color:#6b675f;color:#1d1c1a">{R.x(a?.l)}</R.T>
                              <R.T s="font-size:26px;font-weight:300;white-space:nowrap">{R.x(a?.v)}</R.T>
                              <R.E s="height:6px;background:#d9d4c4">
                                <R.E s={`display:block;height:6px;width:${R.s(a?.w)};background:${R.s(a?.c)}`} />
                              </R.E>
                              <R.T s="font-size:12px;color:#55524b">{R.x(a?.n)}{" membros"}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.G>
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Maiores devedores"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) 90px 120px minmax(0,1.3fr) 150px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Membro"}</R.T>
                          <R.T>{"Atraso"}</R.T>
                          <R.T s="text-align:right">{"Valor"}</R.T>
                          <R.T>{"Último aviso"}</R.T>
                          <R.E />
                        </R.G>
                        {R.list(v.devedores).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) 90px 120px minmax(0,1.3fr) 150px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                            <R.T s="color:#b42318">{R.x(r?.d)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.v)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                              <R.T s="font-size:13px;color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.u)}</R.T>
                              <R.T s="font-size:11px;color:#2e7d4f">{R.x(r?.smsInfo)}</R.T>
                            </R.E>
                            <R.E s="display:flex;gap:6px;justify-content:flex-end">
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;opacity:${R.s(r?.smsOp)}`} h="background:#1d1c1a;color:#fbfaf7" onPress={r?.sms} disabled={r?.smsDis} tag="button">
                                <R.T>{"SMS"}</R.T>
                              </R.E>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px" h="background:#9a4c08" onPress={v.goD3} tag="button">
                                <R.T>{"Cobrar"}</R.T>
                              </R.E>
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </>) : null}
                  {v.tv?.pag ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Contas a pagar"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) 90px 130px 120px 130px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Despesa"}</R.T>
                          <R.T>{"Categoria"}</R.T>
                          <R.T>{"Vence"}</R.T>
                          <R.T s="text-align:right">{"Valor"}</R.T>
                          <R.T>{"Estado"}</R.T>
                          <R.E />
                        </R.G>
                        {R.list(v.pagar).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr) 90px 130px 120px 130px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.d)}</R.T>
                            <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.c)}</R.T>
                            <R.T s="color:#6b675f">{R.x(r?.ve)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.v)}</R.T>
                            <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                              <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                              <R.T>{R.x(r?.s?.l)}</R.T>
                            </R.E>
                            {r?.canPay ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;justify-self:end" h="background:#1d1c1a;color:#fbfaf7" onPress={r?.pay} tag="button">
                                <R.T>{"Marcar pago"}</R.T>
                              </R.E>
                            </>) : null}
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </>) : null}
                  {v.tv?.con ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Conciliação bancária"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:56px minmax(0,1.4fr) 120px 120px 100px 170px 150px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Data"}</R.T>
                          <R.T>{"Origem"}</R.T>
                          <R.T s="text-align:right">{"Sistema"}</R.T>
                          <R.T s="text-align:right">{"Extracto"}</R.T>
                          <R.T s="text-align:right">{"Diferença"}</R.T>
                          <R.T>{"Estado"}</R.T>
                          <R.E />
                        </R.G>
                        {R.list(v.concil).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:56px minmax(0,1.4fr) 120px 120px 100px 170px 150px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="color:#6b675f">{R.x(r?.d)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                              <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.o)}</R.T>
                              <R.T s="font-size:12px;color:#6b675f">{R.x(r?.r)}</R.T>
                            </R.E>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.sis)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(r?.ext)}</R.T>
                            <R.T s={`text-align:right;white-space:nowrap;color:${R.s(r?.dc)}`}>{R.x(r?.dif)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                                <R.T>{R.x(r?.s?.l)}</R.T>
                              </R.E>
                              <R.T s="font-size:11px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.why)}</R.T>
                            </R.E>
                            {r?.canRec ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;justify-self:end" h="background:#1d1c1a;color:#fbfaf7" onPress={r?.rec} tag="button">
                                <R.T>{R.x(r?.act)}</R.T>
                              </R.E>
                            </>) : null}
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </>) : null}
                </R.E>
              </>) : null}
              {v.is?.d6 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.dash?.scope)}{" · "}{R.x(v.dPerL)}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Painel do dono"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                        {R.list(v.dPerChips).map((c, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                            <R.T>{R.x(c?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                      <R.T s="font-size:13px;font-weight:500">{"Kz · Diferença"}</R.T>
                      <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{R.x(v.dash?.d)}</R.T>
                      <R.T s="font-size:13px">{"O que devia ter entrado e não entrou"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.dash?.e)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Esperada"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.dash?.r)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Recebida"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.dash?.taxa)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Taxa de cobrança"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.dash?.rec)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · Recuperado por SMS"}</R.T>
                    </R.E>
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:0 40px 20px">
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;grid-column:1 / 3;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Aprovações · "}{R.x(v.approvals)}{" pendentes"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        {R.list(v.appr).map((a, $index) => (<React.Fragment key={$index}>
                          <R.E s="display:flex;align-items:center;gap:16px;padding:16px 0;border-top:1px solid #e4e0d6">
                            <R.E s="flex:1;display:flex;flex-direction:column;gap:4px;min-width:0">
                              <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(a?.k)}</R.T>
                              <R.T s="font-size:14px;line-height:1.4">{R.x(a?.t)}</R.T>
                            </R.E>
                            <R.T s="font-size:16px;font-weight:500;white-space:nowrap">{R.x(a?.v)}</R.T>
                            {a?.open ? (<>
                              <R.E s="display:flex;gap:6px">
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={a?.no} tag="button">
                                  <R.T>{"Recusar"}</R.T>
                                </R.E>
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={a?.yes} tag="button">
                                  <R.T>{"Aprovar"}</R.T>
                                </R.E>
                              </R.E>
                            </>) : null}
                            {a?.done ? (<>
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(a?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(a?.s?.c)}`} />
                                <R.T>{R.x(a?.s?.l)}</R.T>
                              </R.E>
                            </>) : null}
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Receita por turno"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        {R.list(v.turnoRows).map((t, $index) => (<React.Fragment key={$index}>
                          <R.E s="display:flex;flex-direction:column;gap:10px;padding:16px 0;border-top:1px solid #e4e0d6">
                            <R.E s="display:flex;justify-content:space-between;gap:12px;align-items:baseline">
                              <R.E s="display:flex;gap:10px;align-items:baseline">
                                <R.T s="font-size:13px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(t?.l)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(t?.h)}</R.T>
                              </R.E>
                              <R.T s="font-size:22px;font-weight:300;white-space:nowrap">{R.x(t?.v)}</R.T>
                            </R.E>
                            <R.E s="height:8px;background:#ebe6d6">
                              <R.E s={`display:block;height:8px;width:${R.s(t?.w)};background:${R.s(t?.c)}`} />
                            </R.E>
                            <R.T s="font-size:12px;color:#55524b">{R.x(t?.meta)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Membros"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px">
                          {R.list(v.memK).map((k, $index) => (<React.Fragment key={$index}>
                            <R.E s="background:#ebe6d6;padding:20px;display:flex;flex-direction:column;gap:8px">
                              <R.T s="font-size:30px;font-weight:300;line-height:1">{R.x(k?.v)}</R.T>
                              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(k?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.G>
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Esperada e recebida · 6 meses"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.E s="height:190px;display:flex;align-items:flex-end;gap:16px" role="img" accessibilityLabel="Receita esperada e recebida nos últimos 6 meses">
                          {R.list(v.trend).map((t, $index) => (<React.Fragment key={$index}>
                            <R.E s="flex:1;height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:6px">
                              <R.E s="flex:1;display:flex;align-items:flex-end;gap:3px">
                                <R.E s={`flex:1;height:${R.s(t?.he)};background:#d9d4c4`} title={`Esperada ${R.s(t?.ev)}`} />
                                <R.E s={`flex:1;height:${R.s(t?.hr)};background:${R.s(t?.c)}`} title={`Recebida ${R.s(t?.rv)}`} />
                              </R.E>
                              <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#6b675f;text-align:center">{R.x(t?.m)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.E s="display:flex;gap:20px;padding-top:12px;font-size:12px;color:#55524b">
                          <R.E s="display:flex;align-items:center;gap:6px">
                            <R.E s="width:10px;height:10px;background:#d9d4c4" />
                            <R.T>{"Esperada"}</R.T>
                          </R.E>
                          <R.E s="display:flex;align-items:center;gap:6px">
                            <R.E s="width:10px;height:10px;background:#1d1c1a" />
                            <R.T>{"Recebida"}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Ocupação por hora"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.E s="height:170px;display:flex;align-items:flex-end;gap:4px" role="img" accessibilityLabel="Pico de ocupação às 19h">
                          {R.list(v.occ).map((o, $index) => (<React.Fragment key={$index}>
                            <R.E s="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end">
                              <R.E s={`width:100%;height:${R.s(o?.h)};background:${R.s(o?.c)}`} />
                              <R.T s="font-size:10px;color:#6b675f;height:12px">{R.x(o?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        {v.hasTurnos ? (<>
                          <R.E s="display:flex;margin-top:8px;border-top:1px solid #1d1c1a">
                            <R.T s="flex:8;padding-top:6px;font-size:12px;font-weight:500;color:#6b675f;color:#1d1c1a">{"Manhã"}</R.T>
                            <R.T s="flex:9;padding:6px 0 0 6px;border-left:1px solid #1d1c1a;font-size:12px;font-weight:500;color:#6b675f;color:#1d1c1a">{"Tarde"}</R.T>
                          </R.E>
                        </>) : null}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"A diferença, linha a linha"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        {R.list(v.dash?.lines).map((l, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 72px 110px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T>{R.x(l?.t)}</R.T>
                            <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#6b675f">{R.x(l?.f)}</R.T>
                            <R.T s="text-align:right;font-weight:500;white-space:nowrap">{R.x(l?.v)}</R.T>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.E s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">
                          <R.E s="display:flex;align-items:center;gap:10px">
                            <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                            <R.T>{"Fugas detectadas"}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                      <R.E s="min-width:0">
                        {R.list(v.dash?.fugas).map((l, $index) => (<React.Fragment key={$index}>
                          <R.E s="display:flex;flex-direction:column;gap:3px;padding:14px 0;border-top:1px solid #e4e0d6">
                            <R.T s="font-size:14px">{R.x(l?.t)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{R.x(l?.f)}{" · "}{R.x(l?.h)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;grid-column:1 / 3;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Operadores"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) 90px 100px 70px 110px 70px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Operador"}</R.T>
                          <R.T>{"Turno · filial"}</R.T>
                          <R.T s="text-align:right">{"Cobranças"}</R.T>
                          <R.T s="text-align:right">{"Descontos"}</R.T>
                          <R.T s="text-align:right">{"Estornos"}</R.T>
                          <R.T s="text-align:right">{"Dif. caixa"}</R.T>
                          <R.E />
                        </R.G>
                        {R.list(v.ops).map((o, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr) 90px 100px 70px 110px 70px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(o?.n)}</R.T>
                            <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(o?.t)}</R.T>
                            <R.T s="text-align:right">{R.x(o?.cob)}</R.T>
                            <R.T s="text-align:right">{R.x(o?.desc)}</R.T>
                            <R.T s={`text-align:right;color:${R.s(o?.c)}`}>{R.x(o?.est)}</R.T>
                            <R.T s={`text-align:right;white-space:nowrap;color:${R.s(o?.c)}`}>{R.x(o?.dif)}</R.T>
                            <R.T s="justify-self:end;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#b42318">{R.x(o?.flag)}</R.T>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;grid-column:1 / 3">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Comparativo de filiais"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr) 60px 56px 72px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Filial"}</R.T>
                          <R.T s="text-align:right">{"Recebido"}</R.T>
                          <R.T s="text-align:right">{"Activos"}</R.T>
                          <R.T s="text-align:right">{"Churn"}</R.T>
                          <R.T s="text-align:right">{"Ocup."}</R.T>
                        </R.G>
                        {R.list(v.comp).map((c, $index) => (<React.Fragment key={$index}>
                          <R.G s={`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr) 60px 56px 72px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;background:${R.s(c?.bg)};font-weight:${R.s(c?.w)}`}>
                            <R.T>{R.x(c?.n)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(c?.r)}</R.T>
                            <R.T s="text-align:right">{R.x(c?.a)}</R.T>
                            <R.T s="text-align:right">{R.x(c?.ch)}</R.T>
                            <R.T s="text-align:right">{R.x(c?.o)}</R.T>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.d7 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Rede Mwangolé Fit · 3 filiais"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Planos e regras"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" tag="button">
                        <R.T>{"Novo plano"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));;gap:20px;padding:0 40px 20px">
                    {R.list(v.planos).map((p, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;background:${R.s(p?.bg)};min-width:0`}>
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:8px">
                          <R.T s="font-size:13px;font-weight:300">{R.x(p?.num)}</R.T>
                          <R.T s="padding:4px 8px;background:#ebe6d6;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(p?.scope)}</R.T>
                        </R.E>
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:20px;font-weight:400;letter-spacing:.14em;text-transform:uppercase">{R.x(p?.n)}</R.T>
                        <R.T s="font-size:32px;font-weight:300">{R.x(p?.price)}</R.T>
                        <R.E s="display:block;margin:1em 0;margin:0;display:flex;flex-direction:column;font-size:13px">
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Acesso"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(p?.acesso)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Horário"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(p?.hor)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Desconto máximo"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(p?.desc)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Membros"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(p?.ativos)}</R.T>
                          </R.E>
                        </R.E>
                        {p?.editing ? (<>
                          <R.T s="padding:12px;background:#f5ecd0;color:#7a5800;font-size:13px;line-height:1.45" role="status">{R.x(p?.warn)}</R.T>
                        </>) : null}
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;align-self:flex-start" h="background:#1d1c1a;color:#fbfaf7" onPress={p?.onEdit} tag="button">
                          <R.T>{R.x(p?.editLabel)}</R.T>
                        </R.E>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;max-width:1000px;margin:0 40px 20px">
                    <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                      <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Regras do negócio"}</R.T>
                    </R.E>
                    <R.E s="min-width:0">
                      {R.list(v.regras).map((r, $index) => (<React.Fragment key={$index}>
                        <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr) 100px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                          <R.T>{R.x(r?.n)}</R.T>
                          <R.T s="font-weight:500">{R.x(r?.v)}</R.T>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;justify-self:end" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                            <R.T>{"Alterar"}</R.T>
                          </R.E>
                        </R.G>
                      </React.Fragment>))}
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.is?.d8 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Acesso entre ginásios · Outubro 2026"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Rede MUNTU"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                        <R.T>{"Ver extracto"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" tag="button">
                        <R.T>{"Convidar ginásio"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                      <R.T s="font-size:13px;font-weight:500">{"Kz · Saldo do mês"}</R.T>
                      <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{R.x(v.rede?.saldo)}</R.T>
                      <R.T s="font-size:13px">{"Liquidação automática a 31/10"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.rede?.rec)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · A receber"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.rede?.pag)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Kz · A pagar"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.rede?.vr)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Visitas recebidas"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:clamp(22px,2.2vw,34px);font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.rede?.ve)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Visitas enviadas"}</R.T>
                    </R.E>
                  </R.G>
                  <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4;overflow-x:auto" role="tablist">
                    {R.list(v.rTabs).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0;margin-right:32px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:${R.s(t?.color)};font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={t?.onClick} role="tab" a_selected={t?.sel} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  {v.rv?.parc ? (<>
                    <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:20px;padding:0 40px 20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Ginásios parceiros"}</R.T>
                        </R.E>
                        <R.E s="min-width:0">
                          <R.G s="display:grid;grid-template-columns:minmax(150px,1fr) 64px 64px 110px 130px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                            <R.T>{"Ginásio · cidade"}</R.T>
                            <R.T s="text-align:right">{"Receb."}</R.T>
                            <R.T s="text-align:right">{"Envia."}</R.T>
                            <R.T s="text-align:right">{"Saldo"}</R.T>
                            <R.T>{"Estado"}</R.T>
                          </R.G>
                          {R.list(v.parceiros).map((p, $index) => (<React.Fragment key={$index}>
                            <R.G s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:grid;grid-template-columns:minmax(150px,1fr) 64px 64px 110px 130px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;border-left:0;border-right:0;border-bottom:0;background:${R.s(p?.bg)};color:#1d1c1a;text-align:left;cursor:pointer`} h="background:#f4f1ea" onPress={p?.onClick} a_pressed={p?.pressed} tag="button">
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(p?.n)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(p?.c)}</R.T>
                              </R.E>
                              <R.T s="text-align:right">{R.x(p?.rec)}</R.T>
                              <R.T s="text-align:right">{R.x(p?.env)}</R.T>
                              <R.T s="text-align:right;font-weight:500;white-space:nowrap">{R.x(p?.saldo)}</R.T>
                              <R.E s="min-width:0;overflow:hidden">
                                <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(p?.s?.c)}`}>
                                  <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(p?.s?.c)}`} />
                                  <R.T>{R.x(p?.s?.l)}</R.T>
                                </R.E>
                              </R.E>
                            </R.G>
                          </React.Fragment>))}
                          <R.T s="display:block;margin:1em 0;margin:16px 0 0;font-size:13px;color:#6b675f">{"Os parceiros só vêem acesso válido, nome e foto. Pagamentos, dados pessoais e avisos ficam no ginásio de origem."}</R.T>
                        </R.E>
                      </R.E>
                      <R.E s="border-left:1px solid #e4e0d6;padding:32px;display:flex;flex-direction:column;gap:16px;background:#f4f1ea" accessibilityLabel="Detalhe do parceiro">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Parceiro desde "}{R.x(v.ps?.since)}</R.T>
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:22px;font-weight:400;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{R.x(v.ps?.n)}</R.T>
                        <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(v.ps?.s?.c)}`}>
                          <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(v.ps?.s?.c)}`} />
                          <R.T>{R.x(v.ps?.s?.l)}</R.T>
                        </R.E>
                        <R.T s="font-size:36px;font-weight:300;white-space:nowrap">{R.x(v.ps?.saldo)}</R.T>
                        <R.E s="display:block;margin:1em 0;margin:0;display:flex;flex-direction:column;font-size:13px">
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Cidade"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.ps?.c)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Preço por visita"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{"1 500,00 Kz"}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Visitas recebidas"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.ps?.rec)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Visitas enviadas"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.ps?.env)}</R.T>
                          </R.E>
                          <R.E s="display:flex;justify-content:space-between;gap:8px;border-top:1px solid #e4e0d6;padding:9px 0">
                            <R.T s="color:#6b675f">{"Contacto"}</R.T>
                            <R.T s="display:block;margin-left:40px;margin:0;text-align:right">{R.x(v.ps?.tel)}</R.T>
                          </R.E>
                        </R.E>
                        {v.ps?.why ? (<>
                          <R.T s={`padding:12px;background:${R.s(v.ps?.s?.bg)};color:${R.s(v.ps?.s?.c)};font-size:13px;font-weight:500`} role="status">{R.x(v.ps?.why)}</R.T>
                        </>) : null}
                        <R.T s="margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap;padding-top:8px">{"Últimas visitas"}</R.T>
                        <R.E>
                          {R.list(v.ps?.vis).map((v, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid #d9d4c4;font-size:13px">
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500">{R.x(v?.n)}</R.T>
                                <R.T s="color:#6b675f">{R.x(v?.h)}{" · "}{R.x(v?.dir)}</R.T>
                              </R.E>
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(v?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(v?.s?.c)}`} />
                                <R.T>{R.x(v?.s?.l)}</R.T>
                              </R.E>
                            </R.E>
                          </React.Fragment>))}
                          {v.ps?.noVis ? (<>
                            <R.T s="display:block;margin:1em 0;margin:0;padding:10px 0;border-top:1px solid #d9d4c4;font-size:13px;color:#6b675f">{"Sem visitas este mês."}</R.T>
                          </>) : null}
                        </R.E>
                        <R.E s="display:flex;gap:8px;flex-wrap:wrap">
                          {R.list(v.ps?.actions).map((a, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:${R.s(a?.border)};background:${R.s(a?.bg)};color:${R.s(a?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} tag="button">
                              <R.T>{R.x(a?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.G>
                  </>) : null}
                  {v.rv?.vis ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Visitas na rede"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:90px minmax(0,1.1fr) minmax(0,1.4fr) minmax(0,1fr) 90px 170px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Hora"}</R.T>
                          <R.T>{"Membro"}</R.T>
                          <R.T>{"Origem → destino"}</R.T>
                          <R.T>{"Plano"}</R.T>
                          <R.T s="text-align:right">{"Valor"}</R.T>
                          <R.T>{"Estado"}</R.T>
                        </R.G>
                        {R.list(v.visitas).map((v, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:90px minmax(0,1.1fr) minmax(0,1.4fr) minmax(0,1fr) 90px 170px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="color:#6b675f">{R.x(v?.h)}</R.T>
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v?.n)}</R.T>
                            <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v?.dir)}</R.T>
                            <R.T s="color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v?.p)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap">{R.x(v?.v)}</R.T>
                            <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                              <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(v?.s?.c)}`}>
                                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(v?.s?.c)}`} />
                                <R.T>{R.x(v?.s?.l)}</R.T>
                              </R.E>
                              <R.T s="font-size:11px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v?.why)}</R.T>
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </>) : null}
                  {v.rv?.liq ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Liquidações"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:90px minmax(0,1.3fr) 80px 80px 120px 140px 80px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Mês"}</R.T>
                          <R.T>{"Parceiro"}</R.T>
                          <R.T s="text-align:right">{"Recebidas"}</R.T>
                          <R.T s="text-align:right">{"Enviadas"}</R.T>
                          <R.T s="text-align:right">{"Saldo"}</R.T>
                          <R.T>{"Estado"}</R.T>
                          <R.T s="text-align:right">{"Data"}</R.T>
                        </R.G>
                        {R.list(v.liq).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:90px minmax(0,1.3fr) 80px 80px 120px 140px 80px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.m)}</R.T>
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.p)}</R.T>
                            <R.T s="text-align:right">{R.x(r?.rec)}</R.T>
                            <R.T s="text-align:right">{R.x(r?.env)}</R.T>
                            <R.T s="text-align:right;white-space:nowrap;font-weight:500">{R.x(r?.saldo)}</R.T>
                            <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                              <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                              <R.T>{R.x(r?.s?.l)}</R.T>
                            </R.E>
                            <R.T s="text-align:right;color:#6b675f">{R.x(r?.d)}</R.T>
                          </R.G>
                        </React.Fragment>))}
                        <R.T s="display:block;margin:1em 0;margin:16px 0 0;font-size:13px;color:#6b675f">{"A MUNTU cobra 5% do saldo positivo. As facturas de cada liquidação são emitidas automaticamente."}</R.T>
                      </R.E>
                    </R.E>
                  </>) : null}
                  {v.rv?.reg ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;max-width:1000px;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px;flex-wrap:wrap">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Regras da rede"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        {R.list(v.redeRegras).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr) 100px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.T>{R.x(r?.n)}</R.T>
                            <R.T s="font-weight:500">{R.x(r?.v)}</R.T>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;justify-self:end" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                              <R.T>{"Alterar"}</R.T>
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                  </>) : null}
                </R.E>
              </>) : null}
              {v.is?.d9 ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Automações · SMS e WhatsApp"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Avisos"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" tag="button">
                        <R.T>{"Comprar SMS"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" tag="button">
                        <R.T>{"Novo aviso"}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(300px,1.4fr) repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    <R.E s="background:#c8640c;color:#1d1c1a;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:20px;min-width:0">
                      <R.T s="font-size:13px;font-weight:500">{"SMS disponíveis"}</R.T>
                      <R.T s="font-size:44px;font-weight:300;line-height:1;white-space:nowrap">{"4 820"}</R.T>
                      <R.T s="font-size:13px">{"Cerca de 21 dias ao ritmo actual"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(v.sentTotal)}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Enviados em Outubro"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"97,8%"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Taxa de entrega"}</R.T>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:8px;min-width:0">
                      <R.T s="font-size:32px;font-weight:300;line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{"62%"}</R.T>
                      <R.T s="font-size:13px;font-weight:500;color:#55524b">{"Pagam após aviso"}</R.T>
                    </R.E>
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.2fr) minmax(380px,1fr);;gap:20px;padding:0 40px 20px">
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                        <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Jornada do membro"}</R.T>
                      </R.E>
                      <R.E s="min-width:0">
                        <R.G s="display:grid;grid-template-columns:36px minmax(0,1fr) 110px 70px 48px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"N.º"}</R.T>
                          <R.T>{"Aviso · quando"}</R.T>
                          <R.T>{"Canal"}</R.T>
                          <R.T s="text-align:right">{"Mês"}</R.T>
                          <R.E />
                        </R.G>
                        {R.list(v.rules).map((r, $index) => (<React.Fragment key={$index}>
                          <R.G s={`display:grid;grid-template-columns:36px minmax(0,1fr) 110px 70px 48px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px;padding:0;background:${R.s(r?.bg)}`}>
                            <R.T s="padding:14px 0 14px 8px;font-size:13px;font-weight:300">{R.x(r?.num)}</R.T>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:3px;padding:14px 0;border:0;background:transparent;text-align:left;color:#1d1c1a;cursor:pointer;min-width:0" onPress={r?.select} a_pressed={r?.sel} tag="button">
                              <R.T s="font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                              <R.T s="font-size:12px;color:#55524b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.trig)}</R.T>
                            </R.E>
                            <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.ch)}</R.T>
                            <R.T s={`text-align:right;color:${R.s(r?.sentC)}`}>{R.x(r?.sent)}</R.T>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;justify-self:end;margin-right:8px;width:40px;height:22px;padding:2px;border:1px solid #1d1c1a;background:${R.s(r?.tBg)};display:flex;justify-content:${R.s(r?.tJ)};cursor:pointer`} onPress={r?.toggle} role="switch" a_checked={r?.ariaOn} accessibilityLabel={`Activar ${R.s(r?.n)}`} tag="button">
                              <R.E s={`width:16px;height:16px;background:${R.s(r?.tK)}`} />
                            </R.E>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="border-left:1px solid #e4e0d6;background:#f4f1ea;padding:32px 40px;display:flex;flex-direction:column;gap:18px;min-width:0" accessibilityLabel="Editar aviso">
                      <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Aviso "}{R.x(v.ed?.num)}{" · editar"}</R.T>
                      <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:22px;font-weight:400;letter-spacing:.14em;text-transform:uppercase">{R.x(v.ed?.n)}</R.T>
                      <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 110px;gap:16px">
                        <R.E s="display:flex;flex-direction:column;gap:6px">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Quando"}</R.T>
                          <R.E s="height:40px;display:flex;align-items:center;border-bottom:1px solid #1d1c1a;font-size:15px">
                            <R.T>{R.x(v.ed?.trig)}</R.T>
                          </R.E>
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Hora"}</R.T>
                          <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;font-size:15px;color:#1d1c1a;letter-spacing:0" tag="input" value={v.ed?.hora} onChange={v.ed?.setHora} />
                        </R.E>
                      </R.G>
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Canal"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                          {R.list(v.ed?.chs).map((c, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                              <R.T>{R.x(c?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:8px;font-size:12px;font-weight:500;color:#6b675f">
                        <R.T>{"Mensagem"}</R.T>
                        <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;border:1px solid #1d1c1a;background:#fbfaf7;padding:12px;font-size:14px;line-height:1.5;color:#1d1c1a;letter-spacing:0;text-transform:none;resize:vertical" tag="textarea" value={v.ed?.tpl} onChange={v.ed?.setTpl} rows="4" />
                      </R.E>
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">
                        <R.E s="display:flex;gap:4px;flex-wrap:wrap">
                          {R.list(v.ed?.vars).map((v, $index) => (<React.Fragment key={$index}>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:28px;padding:0 8px;border:1px solid #d9d4c4;background:#fbfaf7;color:#1d1c1a;font-size:12px;cursor:pointer" h="border-color:#1d1c1a" onPress={v?.onClick} accessibilityLabel={`Inserir ${R.s(v?.v)}`} tag="button">
                              <R.T>{R.x(v?.v)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.T s={`font-size:12px;color:${R.s(v.ed?.countC)};white-space:nowrap`}>{R.x(v.ed?.count)}</R.T>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Pré-visualização · Kátia Muondo"}</R.T>
                        <R.T s="background:#fbfaf7;border:1px solid #e4e0d6;padding:16px"><R.T s="background:#ebe6d6;padding:12px 14px;font-size:14px;line-height:1.5;max-width:320px">{R.x(v.ed?.preview)}</R.T></R.T>
                      </R.E>
                      <R.T s="display:block;margin:1em 0;margin:0;font-size:12px;line-height:1.5;color:#55524b">{"Não envia entre 21:00 e 08:00. O membro pode responder PARAR para deixar de receber."}</R.T>
                      <R.E s="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#1d1c1a;color:#fbfaf7" onPress={v.testar} tag="button">
                          <R.T>{"Enviar teste"}</R.T>
                        </R.E>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" h="background:#9a4c08" onPress={v.guardar} tag="button">
                          <R.T>{R.x(v.saveLabel)}</R.T>
                        </R.E>
                        <R.T s="font-size:12px;color:#2e7d4f" role="status">{R.x(v.testMsg)}</R.T>
                      </R.E>
                    </R.E>
                  </R.G>
                  <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;;margin:0 40px 20px">
                    <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                      <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Fila e histórico"}</R.T>
                      <R.E s="display:flex;gap:6px;flex-wrap:wrap" role="group">
                        {R.list(v.logChips).map((c, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid #1d1c1a;background:${R.s(c?.bg)};color:${R.s(c?.color)};font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer`} onPress={c?.onClick} a_pressed={c?.pressed} tag="button">
                            <R.T>{R.x(c?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0">
                      <R.G s="display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1fr) 90px 190px 100px;gap:16px;padding:0 0 10px;font-size:12px;font-weight:500;color:#6b675f">
                        <R.T>{"Hora"}</R.T>
                        <R.T>{"Membro"}</R.T>
                        <R.T>{"Aviso"}</R.T>
                        <R.T>{"Canal"}</R.T>
                        <R.T>{"Estado"}</R.T>
                        <R.E />
                      </R.G>
                      {R.list(v.log).map((r, $index) => (<React.Fragment key={$index}>
                        <R.G s="display:grid;grid-template-columns:60px minmax(0,1fr) minmax(0,1fr) 90px 190px 100px;gap:16px;align-items:center;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                          <R.T s="color:#6b675f">{R.x(r?.h)}</R.T>
                          <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                            <R.T s="font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{R.x(r?.tel)}</R.T>
                          </R.E>
                          <R.T s="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.a)}</R.T>
                          <R.T s="font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.ch)}</R.T>
                          <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                            <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;color:${R.s(r?.s?.c)}`}>
                              <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;background:${R.s(r?.s?.c)}`} />
                              <R.T>{R.x(r?.s?.l)}</R.T>
                            </R.E>
                            <R.T s="font-size:11px;color:#6b675f;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.why)}</R.T>
                          </R.E>
                          {r?.canResend ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;height:32px;justify-self:end" h="background:#1d1c1a;color:#fbfaf7" onPress={r?.resend} tag="button">
                              <R.T>{"Reenviar"}</R.T>
                            </R.E>
                          </>) : null}
                        </R.G>
                      </React.Fragment>))}
                    </R.E>
                  </R.E>
                </R.E>
              </>) : null}
              {v.is?.dc ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Talatona · recepção"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Cobrar e facturar"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Nova cobrança"}</R.T>
                        </R.E>
                        <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                          <R.T>{"Membro"}</R.T>
                          <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.xc?.mem} onChange={v.xc?.setMem}>
                            {R.list(v.xc?.mems).map((o, $index) => (<React.Fragment key={$index}><R.O value={o?.i} label={o?.l} /></React.Fragment>))}
                          </R.Sel>
                        </R.E>
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px;background:#ebe6d6">
                          <R.E s="display:flex;flex-direction:column;gap:3px">
                            <R.T s="font-size:15px;font-weight:500">{R.x(v.xc?.m?.n)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{R.x(v.xc?.m?.d)}{" · "}{R.x(v.xc?.m?.tel)}</R.T>
                          </R.E>
                          <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(v.xc?.m?.s?.bg)};color:${R.s(v.xc?.m?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                            <R.T>{R.x(v.xc?.m?.s?.l)}</R.T>
                          </R.E>
                        </R.E>
                        <R.E s="display:flex;flex-direction:column">
                          {R.list(v.xc?.items).map((it, $index) => (<React.Fragment key={$index}>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={it?.flip} role="checkbox" a_checked={it?.on} tag="button">
                              <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(it?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                                <R.T>{R.x(it?.tick)}</R.T>
                              </R.E>
                              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                                <R.T s="font-size:14px;font-weight:500">{R.x(it?.l)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(it?.d)}</R.T>
                              </R.E>
                              <R.T s="font-size:14px;white-space:nowrap">{R.x(it?.v)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:24px">
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Documento"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.docs).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Enviar por"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.canais).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </R.G>
                        {v.xc?.payNow ? (<>
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Meio de pagamento"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xc?.meios).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </>) : null}
                        <R.E s="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;padding:20px;background:#c8640c">
                          <R.E s="display:flex;flex-direction:column;gap:4px">
                            <R.T s="font-size:13px;font-weight:500">{"Kz · Total"}</R.T>
                            <R.T s="font-size:12px">{R.x(v.xc?.sum)}</R.T>
                          </R.E>
                          <R.T s="font-size:36px;font-weight:300;line-height:1">{R.x(v.xc?.total)}</R.T>
                        </R.E>
                        {v.xc?.err ? (<>
                          <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                            <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                            <R.T>{R.x(v.xc?.err)}</R.T>
                          </R.E>
                        </>) : null}
                        <R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xc?.submit} tag="button">
                            <R.T>{R.x(v.xc?.cta)}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      {v.xc?.res ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;background:#f4f8f5">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{R.x(v.xc?.res?.title)}</R.T>
                          </R.E>
                          <R.T s="font-size:22px;font-weight:500">{R.x(v.xc?.res?.doc)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(v.xc?.res?.n)}{" · "}{R.x(v.xc?.res?.v)}{" Kz · "}{R.x(v.xc?.res?.meio)}</R.T>
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"SMS para "}{R.x(v.xc?.res?.tel)}</R.T>
                          <R.T s="background:#ebe6d6;padding:14px 16px;font-size:14px;line-height:1.5">{R.x(v.xc?.res?.sms)}</R.T>
                          <R.E s="display:flex;gap:8px">
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xc?.again} tag="button">
                              <R.T>{R.x(v.xc?.res?.againL)}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xc?.nova} tag="button">
                              <R.T>{"Nova cobrança"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                      </>) : null}
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Documentos de hoje"}</R.T>
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(v.xc?.docCount)}</R.T>
                        </R.E>
                        <R.E>
                          {R.list(v.xc?.hist).map((h, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 110px;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500">{R.x(h?.doc)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(h?.n)}{" · "}{R.x(h?.h)}</R.T>
                              </R.E>
                              <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                                <R.T>{R.x(h?.v)}</R.T>
                                <R.T s={`font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${R.s(h?.c)}`}>{R.x(h?.st)}</R.T>
                              </R.E>
                            </R.G>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dq ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px">
                    <R.E s="display:flex;flex-direction:column;gap:6px">
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Pendências"}</R.T>
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Passam de turno em turno até alguém as resolver"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:42px;padding:0 22px" onPress={v.xq?.toggleNew} tag="button">
                      <R.T>{"Nova pendência"}</R.T>
                    </R.E>
                  </R.E>
                  {v.xq?.showNew ? (<>
                    <R.G s="margin:0 40px 20px;padding:18px 22px;background:#fbfaf7;border:1px solid #e4e0d6;display:grid;grid-template-columns:minmax(0,1fr) 200px auto auto;gap:16px;align-items:end">
                      <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                        <R.T>{"O que fica por fazer"}</R.T>
                        <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:15px;outline:none;font-family:inherit;min-width:0" tag="input" value={v.xq?.nt} onChange={v.xq?.setNt} placeholder="Ex. Ligar ao técnico da passadeira 4" />
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:6px;font-size:12px;font-weight:500;color:#6b675f">
                        <R.T>{"Tipo"}</R.T>
                        <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:15px;outline:none;font-family:inherit;min-width:0;cursor:pointer" tag="select" value={v.xq?.nk} onChange={v.xq?.setNk}>
                          <R.O value={"oco"} label={"Ocorrência"} />
                          <R.O value={"cob"} label={"Cobrança"} />
                          <R.O value={"doc"} label={"Documento"} />
                          <R.O value={"rec"} label={"Reclamação"} />
                          <R.O value={"res"} label={"Reserva"} />
                        </R.Sel>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xq?.toggleNew} tag="button">
                        <R.T>{"Cancelar"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xq?.create} tag="button">
                        <R.T>{"Criar"}</R.T>
                      </R.E>
                    </R.G>
                  </>) : null}
                  <R.G s="display:grid;grid-template-columns:400px minmax(0,1fr);gap:20px;padding:0 40px 20px;align-items:start">
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column">
                      <R.E s="display:flex;border-bottom:1px solid #e4e0d6" role="tablist">
                        {R.list(v.xq?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;flex:1;height:48px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                            <R.T>{R.x(t?.l)}</R.T>
                            <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                      <R.E s="padding:12px 18px;border-bottom:1px solid #e4e0d6">
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(v.xq?.types).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:28px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      {R.list(v.xq?.rows).map((r, $index) => (<React.Fragment key={$index}>
                        <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:6px;padding:14px 18px;border:0;border-bottom:1px solid #e4e0d6;background:${R.s(r?.bg)};box-shadow:${R.s(r?.bar)};text-align:left;cursor:pointer;color:#1d1c1a;font-family:inherit`} onPress={r?.pick} a_pressed={r?.on} tag="button">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:10px">
                            <R.T s={`padding:3px 7px;background:${R.s(r?.k?.bg)};color:${R.s(r?.k?.c)};font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase`}>{R.x(r?.k?.l)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{R.x(r?.due)}</R.T>
                          </R.E>
                          <R.T s="font-size:14px;font-weight:500;line-height:1.35">{R.x(r?.t)}</R.T>
                          <R.E s="display:flex;justify-content:space-between;gap:10px;font-size:12px;color:#6b675f">
                            <R.T>{R.x(r?.own)}</R.T>
                            <R.T s={`color:${R.s(r?.tc)}`}>{R.x(r?.turns)}</R.T>
                          </R.E>
                        </R.E>
                      </React.Fragment>))}
                      {v.xq?.empty ? (<>
                        <R.T s="display:block;margin:1em 0;margin:0;padding:18px;font-size:13px;color:#6b675f">{"Nada por aqui."}</R.T>
                      </>) : null}
                    </R.E>
                    {v.xq?.has ? (<>
                      <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column">
                        <R.E s="padding:22px 26px;display:flex;flex-direction:column;gap:10px;border-bottom:1px solid #e4e0d6">
                          <R.T s={`align-self:flex-start;padding:4px 8px;background:${R.s(v.xq?.c?.k?.bg)};color:${R.s(v.xq?.c?.k?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase`}>{R.x(v.xq?.c?.k?.l)}</R.T>
                          <R.T s="font-size:22px;font-weight:500;line-height:1.3">{R.x(v.xq?.c?.t)}</R.T>
                          <R.T s="font-size:14px;line-height:1.5;color:#55524b">{R.x(v.xq?.c?.d)}</R.T>
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-bottom:1px solid #e4e0d6">
                          <R.E s="padding:16px 26px;display:flex;flex-direction:column;gap:4px;border-right:1px solid #e4e0d6">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Origem"}</R.T>
                            <R.T s="font-size:14px">{R.x(v.xq?.c?.orig)}</R.T>
                          </R.E>
                          <R.E s="padding:16px 26px;display:flex;flex-direction:column;gap:4px;border-right:1px solid #e4e0d6">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Prazo"}</R.T>
                            <R.T s="font-size:14px">{R.x(v.xq?.c?.due)}{" · "}{R.x(v.xq?.c?.turns)}</R.T>
                          </R.E>
                          <R.E s="padding:16px 26px;display:flex;flex-direction:column;gap:4px;font-size:12px;font-weight:500;color:#6b675f">
                            <R.T>{"Responsável"}</R.T>
                            <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:28px;border:0;background:transparent;color:#1d1c1a;font-size:14px;font-family:inherit;cursor:pointer;padding:0;outline:none" tag="select" value={v.xq?.c?.own} onChange={v.xq?.setOwn}>
                              {R.list(v.xq?.owners).map((o, $index) => (<React.Fragment key={$index}><R.O value={o?.v} label={o?.l} /></React.Fragment>))}
                            </R.Sel>
                          </R.E>
                        </R.G>
                        <R.E s="padding:20px 26px;display:flex;flex-direction:column;gap:12px">
                          <R.T s="font-size:13px;font-weight:600">{"Histórico"}</R.T>
                          {R.list(v.xq?.hist).map((h, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:12px;align-items:baseline">
                              <R.E s="width:8px;height:8px;background:#1d1c1a" />
                              <R.T s="font-size:14px">{R.x(h?.t)}{" "}<R.T s="color:#6b675f">{"· "}{R.x(h?.w)}</R.T></R.T>
                              <R.T s="font-size:12px;color:#6b675f">{R.x(h?.h)}</R.T>
                            </R.G>
                          </React.Fragment>))}
                          <R.E s="display:flex;gap:8px;align-items:flex-end;padding-top:6px">
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:40px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:15px;outline:none;font-family:inherit;min-width:0;flex:1;font-size:14px" accessibilityLabel="Nota" tag="input" value={v.xq?.note} onChange={v.xq?.setNote} placeholder="Acrescentar nota para o próximo turno" />
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap;opacity:${R.s(v.xq?.noteOp)}`} onPress={v.xq?.addNote} disabled={v.xq?.noNote} tag="button">
                              <R.T>{"Anotar"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="padding:16px 26px;border-top:1px solid #e4e0d6;display:flex;gap:8px;justify-content:flex-end">
                          {v.xq?.c?.notRes ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xq?.escalate} tag="button">
                              <R.T>{"Encaminhar ao dono"}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xq?.resolve} tag="button">
                              <R.T>{"Marcar como resolvida"}</R.T>
                            </R.E>
                          </>) : null}
                          {v.xq?.c?.res ? (<>
                            <R.E s="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#2e7d4f;margin-right:auto">
                              <R.T>{"Resolvida"}</R.T>
                            </R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;padding:0 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xq?.reopen} tag="button">
                              <R.T>{"Reabrir"}</R.T>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </R.E>
                    </>) : null}
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dk ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px">
                    <R.E s="display:flex;flex-direction:column;gap:6px">
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Recuperação"}</R.T>
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.xk?.kick)}{" · contactar, perceber o motivo e propor uma solução"}</R.T>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {R.list(v.xk?.kpis).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:20px 24px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:6px">
                        <R.T s="font-size:30px;font-weight:300;line-height:1">{R.x(x?.v)}</R.T>
                        <R.T s="font-size:14px;font-weight:500">{R.x(x?.l)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:340px minmax(0,1fr);gap:20px;padding:0 40px 20px;align-items:start">
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column">
                      <R.E s="display:flex;border-bottom:1px solid #e4e0d6" role="tablist">
                        {R.list(v.xk?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;flex:1;height:48px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                            <R.T>{R.x(t?.l)}</R.T>
                            <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.E>
                      <R.E s="padding:14px 18px;display:flex;align-items:center;gap:10px;border-bottom:1px solid #e4e0d6">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f;white-space:nowrap">{R.x(v.xk?.limL)}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(v.xk?.lims).map((l, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid ${R.s(l?.bd)};background:${R.s(l?.bg)};color:${R.s(l?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={l?.pick} a_pressed={l?.on} tag="button">
                              <R.T>{R.x(l?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      {R.list(v.xk?.rows).map((r, $index) => (<React.Fragment key={$index}>
                        <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:6px;padding:14px 18px;border:0;border-bottom:1px solid #e4e0d6;background:${R.s(r?.bg)};box-shadow:${R.s(r?.bar)};text-align:left;cursor:pointer;color:#1d1c1a;font-family:inherit`} onPress={r?.pick} a_pressed={r?.on} tag="button">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:10px">
                            <R.T s="font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">{R.x(r?.n)}</R.T>
                            <R.T s={`flex-shrink:0;padding:3px 7px;background:${R.s(r?.st?.bg)};color:${R.s(r?.st?.c)};font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>{R.x(r?.st?.l)}</R.T>
                          </R.E>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(r?.plan)}{" · "}{R.x(r?.a)}</R.T>
                        </R.E>
                      </React.Fragment>))}
                      {v.xk?.empty ? (<>
                        <R.T s="display:block;margin:1em 0;margin:0;padding:18px;font-size:13px;color:#6b675f">{"Ninguém nesta lista."}</R.T>
                      </>) : null}
                    </R.E>
                    {v.xk?.has ? (<>
                      <R.G s="background:#fbfaf7;border:1px solid #e4e0d6;display:grid;grid-template-columns:minmax(0,1fr) 300px">
                        <R.E s="display:flex;flex-direction:column;border-right:1px solid #e4e0d6;min-width:0">
                          <R.E s="display:flex;align-items:center;gap:14px;padding:18px 22px;border-bottom:1px solid #e4e0d6">
                            <R.E s="width:44px;height:44px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;font-size:13px;font-weight:600">
                              <R.T>{R.x(v.xk?.c?.i)}</R.T>
                            </R.E>
                            <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                              <R.T s="font-size:16px;font-weight:500">{R.x(v.xk?.c?.n)}</R.T>
                              <R.T s="font-size:12px;color:#6b675f">{R.x(v.xk?.c?.plan)}{" · "}{R.x(v.xk?.c?.tel)}{" · "}{R.x(v.xk?.c?.b)}</R.T>
                            </R.E>
                            <R.E s="height:36px;padding:0 14px;display:flex;align-items:center;border:1px solid #1d1c1a;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-decoration:none" tag="a">
                              <R.T>{"Ligar"}</R.T>
                            </R.E>
                            <R.E s="height:36px;padding:0 14px;display:flex;align-items:center;border:1px solid #1d1c1a;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;text-decoration:none" tag="a">
                              <R.T>{"WhatsApp"}</R.T>
                            </R.E>
                          </R.E>
                          <R.E s="min-height:240px;max-height:340px;overflow:auto;padding:18px 22px;display:flex;flex-direction:column;gap:10px;background:#f4f1ea">
                            {R.list(v.xk?.thread).map((m, $index) => (<React.Fragment key={$index}>
                              <R.E s={`align-self:${R.s(m?.al)};max-width:78%;display:flex;flex-direction:column;gap:4px`}>
                                <R.T s={`padding:10px 14px;background:${R.s(m?.bg)};color:${R.s(m?.fg)};border:${R.s(m?.bd)};font-size:14px;line-height:1.45`}>{R.x(m?.t)}</R.T>
                                <R.T s={`align-self:${R.s(m?.al)};font-size:11px;color:#6b675f`}>{R.x(m?.h)}</R.T>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                          <R.E s="padding:14px 22px 18px;display:flex;flex-direction:column;gap:10px;border-top:1px solid #e4e0d6">
                            <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Mensagens prontas"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xk?.tpls).map((t, $index) => (<React.Fragment key={$index}>
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:30px;padding:0 12px;border:1px solid #d9d4c4;background:#fff;color:#1d1c1a;font-size:12px;cursor:pointer;font-family:inherit;white-space:nowrap" h="border-color:#1d1c1a" onPress={t?.pick} tag="button">
                                  <R.T>{R.x(t?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                            <R.E s="display:flex;gap:8px;align-items:flex-end">
                              <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;flex:1;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none" accessibilityLabel="Mensagem" tag="textarea" value={v.xk?.draft} onChange={v.xk?.setDraft} placeholder="Escreve uma mensagem ou escolhe uma pronta" rows="2" />
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:44px;padding:0 18px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;opacity:${R.s(v.xk?.sendOp)}`} onPress={v.xk?.send} disabled={v.xk?.noSend} tag="button">
                                <R.T>{"Enviar"}</R.T>
                              </R.E>
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="padding:18px 20px;display:flex;flex-direction:column;gap:18px">
                          <R.E s="display:flex;flex-direction:column;gap:8px">
                            <R.T s="font-size:13px;font-weight:600">{"1 · Motivo"}</R.T>
                            {v.xk?.noReason ? (<>
                              <R.T s="font-size:12px;line-height:1.45;color:#6b675f">{"Pergunta o motivo com uma mensagem pronta ou marca-o depois de falares com o cliente."}</R.T>
                            </>) : null}
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xk?.mots).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                          {v.xk?.hasReason ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:8px">
                              <R.T s="font-size:13px;font-weight:600">{"2 · Proposta para "}{R.x(v.xk?.reason)}</R.T>
                              {R.list(v.xk?.offers).map((o, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border:${R.s(o?.bd)};background:${R.s(o?.bg)};text-align:left;cursor:pointer;color:#1d1c1a;font-family:inherit`} onPress={o?.pick} role="radio" a_checked={o?.on} tag="button">
                                  <R.E s="width:14px;height:14px;flex-shrink:0;margin-top:2px;border:1.5px solid #1d1c1a;display:flex;align-items:center;justify-content:center">
                                    <R.E s={`width:6px;height:6px;background:${R.s(o?.dot)}`} />
                                  </R.E>
                                  <R.E s="display:flex;flex-direction:column;gap:2px">
                                    <R.T s="font-size:13px;font-weight:500">{R.x(o?.l)}</R.T>
                                    <R.T s="font-size:12px;color:#55524b">{R.x(o?.d)}</R.T>
                                  </R.E>
                                </R.E>
                              </React.Fragment>))}
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:#c8640c;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;opacity:${R.s(v.xk?.offerOp)}`} onPress={v.xk?.sendOffer} disabled={v.xk?.noOffer} tag="button">
                                <R.T>{"Enviar proposta"}</R.T>
                              </R.E>
                            </R.E>
                          </>) : null}
                          <R.E s="display:flex;flex-direction:column;gap:8px;padding-top:14px;border-top:1px solid #e4e0d6">
                            <R.T s="font-size:13px;font-weight:600">{"Resultado"}</R.T>
                            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                              {R.list(v.xk?.results).map((x, $index) => (<React.Fragment key={$index}>
                                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                  <R.T>{R.x(x?.l)}</R.T>
                                </R.E>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </R.E>
                      </R.G>
                    </>) : null}
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dl ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Rede Mwangolé Fit · Outubro"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Receitas perdidas"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {R.list(v.xp?.kpis).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:22px 24px;display:flex;flex-direction:column;gap:10px;background:${R.s(x?.bg)};border:1px solid #e4e0d6;min-width:0`}>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{R.x(x?.l)}</R.T>
                        <R.T s={`font-size:36px;font-weight:300;line-height:1;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{R.x(x?.d)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4" role="tablist">
                    {R.list(v.xp?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0 20px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                        <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:12px;margin:0 40px 20px">
                    <R.T s="font-size:13px;color:#55524b">{"Indícios para rever. Uma suspeita só passa a perda depois de confirmada."}</R.T>
                    <R.G s="display:grid;grid-template-columns:120px minmax(0,2fr) 120px minmax(0,1.2fr) minmax(0,1fr) 300px;gap:16px;padding:10px 0;font-size:12px;font-weight:500;color:#6b675f">
                      <R.T>{"Categoria"}</R.T>
                      <R.T>{"Ocorrência"}</R.T>
                      <R.T>{"Valor"}</R.T>
                      <R.T>{"Origem"}</R.T>
                      <R.T>{"Responsável"}</R.T>
                      <R.E />
                    </R.G>
                    {R.list(v.xp?.list).map((l, $index) => (<React.Fragment key={$index}>
                      <R.G s="display:grid;grid-template-columns:120px minmax(0,2fr) 120px minmax(0,1.2fr) minmax(0,1fr) 300px;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                        <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(l?.cat)}</R.T>
                        <R.E s="display:flex;flex-direction:column;gap:3px">
                          <R.T>{R.x(l?.t)}</R.T>
                          {l?.sent ? (<>
                            <R.T s="font-size:12px;color:#7a5800">{R.x(l?.sentMsg)}</R.T>
                          </>) : null}
                        </R.E>
                        <R.T s="font-weight:500">{R.x(l?.v)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(l?.o)}</R.T>
                        <R.T>{R.x(l?.r)}</R.T>
                        <R.E s="display:flex;justify-content:flex-end;gap:6px;flex-wrap:wrap">
                          {l?.open ? (<>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(l?.op)}`} onPress={l?.act} disabled={l?.sent} tag="button">
                              <R.T>{R.x(l?.a)}</R.T>
                            </R.E>
                            {l?.canConf ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={l?.conf} tag="button">
                                <R.T>{"Confirmar"}</R.T>
                              </R.E>
                            </>) : null}
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={l?.res} tag="button">
                              <R.T>{"Resolvido"}</R.T>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </R.G>
                    </React.Fragment>))}
                    {v.xp?.empty ? (<>
                      <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Nada nesta lista."}</R.T>
                    </>) : null}
                  </R.E>
                </R.E>
              </>) : null}
              {v.is?.de ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.xe?.pres)}{" presentes agora"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Equipa"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {R.list(v.xe?.kpis).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:22px 24px;display:flex;flex-direction:column;gap:10px;background:${R.s(x?.bg)};border:1px solid #e4e0d6;min-width:0`}>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{R.x(x?.l)}</R.T>
                        <R.T s={`font-size:36px;font-weight:300;line-height:1;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{R.x(x?.d)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Presença e estatísticas · Outubro"}</R.T>
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) 110px 56px 130px minmax(0,1.2fr);gap:16px;padding:10px 0;font-size:12px;font-weight:500;color:#6b675f">
                          <R.T>{"Funcionário"}</R.T>
                          <R.T>{"Agora"}</R.T>
                          <R.T>{"Horas"}</R.T>
                          <R.T>{"Assiduidade"}</R.T>
                          <R.T>{"Indicador"}</R.T>
                        </R.G>
                        {R.list(v.xe?.all).map((p, $index) => (<React.Fragment key={$index}>
                          <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) 110px 56px 130px minmax(0,1.2fr);gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                            <R.E s="display:flex;align-items:center;gap:12px">
                              <R.E s="width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;font-size:11px;font-weight:600">
                                <R.T>{R.x(p?.i)}</R.T>
                              </R.E>
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500">{R.x(p?.n)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(p?.r)}{" · "}{R.x(p?.f)}</R.T>
                              </R.E>
                            </R.E>
                            <R.E s={`display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:${R.s(p?.oc)}`}>
                              <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(p?.oc)}`} />
                              <R.T>{R.x(p?.since)}</R.T>
                            </R.E>
                            <R.T>{R.x(p?.h)}</R.T>
                            <R.E s="display:flex;align-items:center;gap:8px">
                              <R.E s="flex:1;height:4px;background:#ebe6d6">
                                <R.E s={`display:block;height:4px;width:${R.s(p?.ass)};background:${R.s(p?.bar)}`} />
                              </R.E>
                              <R.T s="font-size:12px">{R.x(p?.ass)}</R.T>
                            </R.E>
                            <R.T s={`font-size:13px;color:${R.s(p?.kc)}`}>{R.x(p?.k)}</R.T>
                          </R.G>
                        </React.Fragment>))}
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Enviar aviso à equipa"}</R.T>
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:8px">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Para"}</R.T>
                          <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                            {R.list(v.xe?.to).map((t, $index) => (<React.Fragment key={$index}>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(t?.bd)};background:${R.s(t?.bg)};color:${R.s(t?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={t?.pick} a_pressed={t?.on} tag="button">
                                <R.T>{R.x(t?.l)}</R.T>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:8px">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Prioridade"}</R.T>
                          <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                            {R.list(v.xe?.pri).map((p, $index) => (<React.Fragment key={$index}>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(p?.bd)};background:${R.s(p?.bg)};color:${R.s(p?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={p?.pick} a_pressed={p?.on} tag="button">
                                <R.T>{R.x(p?.l)}</R.T>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                        <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none" accessibilityLabel="Aviso" tag="textarea" value={v.xe?.text} onChange={v.xe?.setText} placeholder="Escreve o aviso…" rows="3" />
                        <R.E>
                          <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer;opacity:${R.s(v.xe?.op)}`} onPress={v.xe?.send} disabled={v.xe?.dis} tag="button">
                            <R.T>{R.x(v.xe?.cta)}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Enviados"}</R.T>
                        </R.E>
                        <R.E>
                          {R.list(v.xe?.sent).map((a, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                              <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                                <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.p?.bg)};color:${R.s(a?.p?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                  <R.T>{R.x(a?.p?.l)}</R.T>
                                </R.E>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(a?.h)}{" · "}{R.x(a?.to)}</R.T>
                              </R.E>
                              <R.T s="font-size:14px;line-height:1.5">{R.x(a?.t)}</R.T>
                              <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;color:#55524b">
                                <R.E s="flex:1;height:4px;background:#ebe6d6">
                                  <R.E s={`display:block;height:4px;width:${R.s(a?.w)};background:#2e7d4f`} />
                                </R.E>
                                <R.T>{"Lido por "}{R.x(a?.read)}</R.T>
                              </R.E>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dx ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.xa?.kick)}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Actividades"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      {v.xa?.hasPend ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;background:#fbf6ea">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{R.x(v.xa?.pendT)}</R.T>
                          </R.E>
                          <R.E>
                            {R.list(v.xa?.pend).map((a, $index) => (<React.Fragment key={$index}>
                              <R.G s="display:grid;grid-template-columns:100px minmax(0,1.6fr) minmax(0,1.2fr) auto;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(a?.tipo)}</R.T>
                                <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                  <R.T s="font-weight:500">{R.x(a?.t)}</R.T>
                                  <R.T s="font-size:12px;color:#6b675f">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                                </R.E>
                                <R.T s="font-size:12px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                                <R.E s="display:flex;justify-content:flex-end;gap:6px">
                                  {a?.canApprove ? (<>
                                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={a?.no} tag="button">
                                      <R.T>{"Recusar"}</R.T>
                                    </R.E>
                                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={a?.yes} tag="button">
                                      <R.T>{"Aprovar"}</R.T>
                                    </R.E>
                                  </>) : null}
                                  {a?.wait ? (<>
                                    <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                      <R.T>{R.x(a?.s?.l)}</R.T>
                                    </R.E>
                                  </>) : null}
                                </R.E>
                              </R.G>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                      </>) : null}
                      {v.xa?.msg ? (<>
                        <R.T s={`margin:20px 40px 0;padding:12px 14px;background:${R.s(v.xa?.msgBg)};color:${R.s(v.xa?.msgC)};font-size:13px;font-weight:500`} role="status">{R.x(v.xa?.msg)}</R.T>
                      </>) : null}
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Publicadas"}</R.T>
                        </R.E>
                        <R.E>
                          {R.list(v.xa?.pub).map((a, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:100px minmax(0,1.6fr) minmax(0,1.2fr) auto;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(a?.tipo)}</R.T>
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500">{R.x(a?.t)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                              </R.E>
                              <R.T s="font-size:12px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                              <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                <R.T>{R.x(a?.s?.l)}</R.T>
                              </R.E>
                            </R.G>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                      {v.xa?.hasRec ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Recusadas"}</R.T>
                          </R.E>
                          <R.E>
                            {R.list(v.xa?.rec).map((a, $index) => (<React.Fragment key={$index}>
                              <R.G s="display:grid;grid-template-columns:100px minmax(0,1.6fr) minmax(0,1.2fr) auto;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(a?.tipo)}</R.T>
                                <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                  <R.T s="font-weight:500">{R.x(a?.t)}</R.T>
                                  <R.T s="font-size:12px;color:#6b675f">{R.x(a?.when)}</R.T>
                                </R.E>
                                <R.T s="font-size:12px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                                <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                  <R.T>{R.x(a?.s?.l)}</R.T>
                                </R.E>
                              </R.G>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                      </>) : null}
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{R.x(v.xa?.formT)}</R.T>
                        </R.E>
                        <R.E s="display:flex;gap:4px;padding:4px;background:#ebe6d6">
                          {R.list(v.xa?.tipos).map((t, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;flex:1;height:38px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`} onPress={t?.pick} tag="button">
                              <R.T>{R.x(t?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                          <R.T>{"Título"}</R.T>
                          <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xa?.t} onChange={v.xa?.setT} placeholder={v.xa?.ph} />
                        </R.E>
                        <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                          <R.T>{"Descrição"}</R.T>
                          <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.xa?.d} onChange={v.xa?.setD} rows="3" />
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                          <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                            <R.T>{R.x(v.xa?.iniL)}</R.T>
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xa?.ini} onChange={v.xa?.setIni} type="date" />
                          </R.E>
                          <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                            <R.T>{R.x(v.xa?.fimL)}</R.T>
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xa?.fim} onChange={v.xa?.setFim} type="date" />
                          </R.E>
                        </R.G>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                          <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                            <R.T>{R.x(v.xa?.capL)}</R.T>
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xa?.cap} onChange={v.xa?.setCap} inputMode="numeric" />
                          </R.E>
                          <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                            <R.T>{R.x(v.xa?.extraL)}</R.T>
                            <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xa?.extra} onChange={v.xa?.setExtra} placeholder={v.xa?.extraPh} />
                          </R.E>
                        </R.G>
                        <R.E s="display:flex;flex-direction:column;gap:8px">
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Filial"}</R.T>
                          <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                            {R.list(v.xa?.fils).map((f, $index) => (<React.Fragment key={$index}>
                              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(f?.bd)};background:${R.s(f?.bg)};color:${R.s(f?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={f?.pick} a_pressed={f?.on} tag="button">
                                <R.T>{R.x(f?.l)}</R.T>
                              </R.E>
                            </React.Fragment>))}
                          </R.E>
                        </R.E>
                        <R.T s={`padding:12px 14px;background:${R.s(v.xa?.noteBg)};font-size:13px;line-height:1.5`}>{R.x(v.xa?.note)}</R.T>
                        {v.xa?.err ? (<>
                          <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                            <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                            <R.T>{R.x(v.xa?.err)}</R.T>
                          </R.E>
                        </>) : null}
                        <R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xa?.submit} tag="button">
                            <R.T>{R.x(v.xa?.cta)}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dp ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Nuno Sebastião · Talatona"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Agenda"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {R.list(v.xt?.kpis).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:22px 24px;display:flex;flex-direction:column;gap:10px;background:${R.s(x?.bg)};border:1px solid #e4e0d6;min-width:0`}>
                        <R.T s="font-size:13px;font-weight:500;color:#55524b">{R.x(x?.l)}</R.T>
                        <R.T s={`font-size:36px;font-weight:300;line-height:1;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{R.x(x?.d)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Hoje"}</R.T>
                        </R.E>
                        <R.E>
                          {R.list(v.xt?.ag).map((a, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:70px minmax(0,1fr) auto;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T s="font-size:20px;font-weight:300">{R.x(a?.h)}</R.T>
                              <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                <R.T s="font-weight:500">{R.x(a?.n)}</R.T>
                                <R.T s="font-size:12px;color:#6b675f">{R.x(a?.d)}</R.T>
                              </R.E>
                              <R.E>
                                {a?.can ? (<>
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={a?.mark} tag="button">
                                    <R.T>{"Presente"}</R.T>
                                  </R.E>
                                </>) : null}
                                {a?.done ? (<>
                                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                    <R.T>{R.x(a?.s?.l)}</R.T>
                                  </R.E>
                                </>) : null}
                              </R.E>
                            </R.G>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Pedidos de reserva"}</R.T>
                          <R.T s="font-size:12px;font-weight:500;color:#6b675f">{R.x(v.xt?.open)}{" por responder"}</R.T>
                        </R.E>
                        <R.E>
                          {R.list(v.xt?.rq).map((r, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;flex-direction:column;gap:10px;padding:16px 0;border-top:1px solid #e4e0d6">
                              <R.E s="display:flex;justify-content:space-between;gap:12px">
                                <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                  <R.T s="font-weight:500">{R.x(r?.n)}</R.T>
                                  <R.T s="font-size:12px;color:#6b675f">{R.x(r?.plan)}</R.T>
                                </R.E>
                                <R.T s="font-weight:500;white-space:nowrap">{R.x(r?.v)}</R.T>
                              </R.E>
                              <R.T s="font-size:13px;padding:10px 12px;background:#ebe6d6">{R.x(r?.dias)}{" · "}{R.x(r?.hora)}</R.T>
                              {r?.open ? (<>
                                <R.E s="display:flex;gap:6px">
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={r?.no} tag="button">
                                    <R.T>{"Recusar"}</R.T>
                                  </R.E>
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={r?.yes} tag="button">
                                    <R.T>{"Aceitar"}</R.T>
                                  </R.E>
                                </R.E>
                              </>) : null}
                              {r?.closed ? (<>
                                <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(r?.s?.bg)};color:${R.s(r?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                                  <R.T>{R.x(r?.s?.l)}</R.T>
                                </R.E>
                              </>) : null}
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </R.E>
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.df ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Rede Mwangolé Fit · 3 filiais"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Filiais"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xf?.toggleNew} tag="button">
                        <R.T>{R.x(v.xf?.newL)}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                    {R.list(v.xf?.cards).map((c, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:22px 24px;display:flex;flex-direction:column;gap:12px;border:1px solid #e4e0d6;background:#fbfaf7">
                        <R.E s="display:flex;justify-content:space-between;align-items:center">
                          <R.T s="font-size:14px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(c?.n)}</R.T>
                          <R.T s={`font-size:11px;font-weight:600;color:${R.s(c?.ac)}`}>{R.x(c?.al)}</R.T>
                        </R.E>
                        <R.T s="font-size:30px;font-weight:300">{R.x(c?.r)}{" "}<R.T s="font-size:13px;color:#6b675f">{"de "}{R.x(c?.e)}{" Kz"}</R.T></R.T>
                        <R.E s="height:6px;background:#ebe6d6">
                          <R.E s={`display:block;height:6px;width:${R.s(c?.pct)};background:#c8640c`} />
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-size:14px">
                          <R.E s="display:flex;flex-direction:column;gap:2px">
                            <R.T>{R.x(c?.a)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{"Activos"}</R.T>
                          </R.E>
                          <R.E s="display:flex;flex-direction:column;gap:2px">
                            <R.T>{R.x(c?.o)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{"Ocupação"}</R.T>
                          </R.E>
                          <R.E s="display:flex;flex-direction:column;gap:2px">
                            <R.T>{R.x(c?.ch)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{"Check-ins hoje"}</R.T>
                          </R.E>
                        </R.G>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                        <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Comparar · últimos 90 dias"}</R.T>
                        </R.E>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(v.xf?.metrics).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:14px;padding-top:8px">
                          {R.list(v.xf?.bars).map((b, $index) => (<React.Fragment key={$index}>
                            <R.G s="display:grid;grid-template-columns:120px minmax(0,1fr) 120px;gap:16px;align-items:center;font-size:14px">
                              <R.T>{R.x(b?.n)}</R.T>
                              <R.E s="height:14px;background:#ebe6d6">
                                <R.E s={`display:block;height:14px;width:${R.s(b?.w)};background:${R.s(b?.c)}`} />
                              </R.E>
                              <R.T s="text-align:right;font-weight:500">{R.x(b?.v)}</R.T>
                            </R.G>
                          </React.Fragment>))}
                        </R.E>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(v.xf?.note)}</R.T>
                      </R.E>
                    </R.E>
                    <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                      {v.xf?.showNew ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Nova filial"}</R.T>
                          </R.E>
                          {v.xf?.form ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:16px">
                              <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                                <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                                  <R.T>{"Nome"}</R.T>
                                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.xf?.n} onChange={v.xf?.setN} />
                                </R.E>
                                <R.E s="font-size:12px;font-weight:500;color:#6b675f;display:flex;flex-direction:column;gap:8px">
                                  <R.T>{"Copiar de"}</R.T>
                                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.xf?.from} onChange={v.xf?.setFrom}>
                                    <R.O value={"Talatona"} label={"Talatona"} />
                                    <R.O value={"Kilamba"} label={"Kilamba"} />
                                    <R.O value={"Maianga"} label={"Maianga"} />
                                  </R.Sel>
                                </R.E>
                              </R.G>
                              <R.E s="display:flex;flex-direction:column">
                                {R.list(v.xf?.items).map((x, $index) => (<React.Fragment key={$index}>
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={x?.flip} role="checkbox" a_checked={x?.on} tag="button">
                                    <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(x?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                                      <R.T>{R.x(x?.tick)}</R.T>
                                    </R.E>
                                    <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                                      <R.T s="font-size:14px;font-weight:500">{R.x(x?.l)}</R.T>
                                      <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                                    </R.E>
                                    <R.T s="font-size:14px;white-space:nowrap">{R.x(x?.v)}</R.T>
                                  </R.E>
                                </React.Fragment>))}
                              </R.E>
                              <R.T s="padding:12px 14px;background:#ebe6d6;font-size:13px;line-height:1.5">{"Membros, pagamentos, caixas e documentos pessoais não são copiados."}</R.T>
                              <R.E>
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xf?.create} tag="button">
                                  <R.T>{"Criar filial"}</R.T>
                                </R.E>
                              </R.E>
                            </R.E>
                          </>) : null}
                          {v.xf?.done ? (<>
                            <R.E s="padding:16px;background:#e3efe6;color:#1d1c1a;font-size:14px;line-height:1.5;display:flex;flex-direction:column;gap:12px" role="status">
                              <R.T>{R.x(v.xf?.doneMsg)}</R.T>
                              <R.E>
                                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.goImport} tag="button">
                                  <R.T>{"Importar membros"}</R.T>
                                </R.E>
                              </R.E>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </>) : null}
                      {v.xf?.hideNew ? (<>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                            <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Abrir nova filial"}</R.T>
                          </R.E>
                          <R.T s="font-size:14px;line-height:1.55;color:#55524b">{"Copia planos, horários, regras de aprovação, permissões e avisos automáticos de uma filial existente. Os dados pessoais ficam onde estão."}</R.T>
                          <R.E>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xf?.toggleNew} tag="button">
                              <R.T>{"Começar"}</R.T>
                            </R.E>
                          </R.E>
                        </R.E>
                      </>) : null}
                    </R.E>
                  </R.G>
                </R.E>
              </>) : null}
              {v.is?.dg ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap">
                    <R.E s="display:flex;flex-direction:column-reverse;gap:6px;min-width:0">
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Configuração do ginásio"}</R.T>
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Gestão"}</R.T>
                    </R.E>
                    <R.E s="display:flex;gap:8px;flex-wrap:wrap;align-items:center" />
                  </R.E>
                  <R.E s="display:flex;margin:0 40px 20px;border-bottom:1px solid #d9d4c4" role="tablist">
                    {R.list(v.xg?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;padding:0 20px;border:0;background:transparent;box-shadow:${R.s(t?.bar)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                        <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                  {v.xg?.isReg ? (<>
                    <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px;padding:0 40px 20px">
                      {R.list(v.xg?.rules).map((r, $index) => (<React.Fragment key={$index}>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:12px;">
                          <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{R.x(r?.n)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}</R.T>
                          {R.list(r?.tiers).map((t, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid #e4e0d6;font-size:14px">
                              <R.T s="flex:1">{R.x(t?.who)}</R.T>
                              {t?.edit ? (<>
                                <R.E s="display:flex;align-items:center;border:1px solid #1d1c1a">
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:34px;height:34px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={t?.dec} accessibilityLabel="Diminuir" tag="button">
                                    <R.T>{"−"}</R.T>
                                  </R.E>
                                  <R.T s="min-width:100px;text-align:center;font-size:13px;font-weight:500">{R.x(t?.v)}</R.T>
                                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:34px;height:34px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={t?.inc} accessibilityLabel="Aumentar" tag="button">
                                    <R.T>{"+"}</R.T>
                                  </R.E>
                                </R.E>
                              </>) : null}
                              {t?.fixed ? (<>
                                <R.T s="color:#55524b">{R.x(t?.v)}</R.T>
                              </>) : null}
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </React.Fragment>))}
                    </R.G>
                    <R.E s="padding:24px 40px;display:flex;gap:16px;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xg?.save} tag="button">
                        <R.T>{"Guardar regras"}</R.T>
                      </R.E>
                      {v.xg?.saved ? (<>
                        <R.T s="font-size:13px;color:#2e7d4f">{"Guardadas · aplicam-se já em todas as filiais."}</R.T>
                      </>) : null}
                    </R.E>
                  </>) : null}
                  {v.xg?.isCof ? (<>
                    <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:12px;margin:0 40px 20px">
                      <R.E s="display:flex;justify-content:space-between;align-items:center;gap:16px">
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(v.xg?.cats).map((c, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(c?.bd)};background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={c?.pick} a_pressed={c?.on} tag="button">
                              <R.T>{R.x(c?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xg?.upload} tag="button">
                          <R.T>{"+ Carregar documento"}</R.T>
                        </R.E>
                      </R.E>
                      <R.T s="padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="status">{"Licença de actividade da Kilamba expira em 21 dias."}</R.T>
                      <R.G s="display:grid;grid-template-columns:minmax(0,1.6fr) 140px 120px 110px minmax(0,1.2fr) 150px;gap:16px;padding:10px 0;font-size:12px;font-weight:500;color:#6b675f">
                        <R.T>{"Documento"}</R.T>
                        <R.T>{"Categoria"}</R.T>
                        <R.T>{"Filial"}</R.T>
                        <R.T>{"Data"}</R.T>
                        <R.T>{"Conservação"}</R.T>
                        <R.T>{"Acesso"}</R.T>
                      </R.G>
                      {R.list(v.xg?.docs).map((x, $index) => (<React.Fragment key={$index}>
                        <R.G s="display:grid;grid-template-columns:minmax(0,1.6fr) 140px 120px 110px minmax(0,1.2fr) 150px;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                          <R.E s="display:flex;align-items:center;gap:12px">
                            <R.E s="width:30px;height:36px;flex-shrink:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:4px;background:#ebe6d6;font-family:ui-monospace,Menlo,monospace;font-size:9px">
                              <R.T>{R.x(x?.ext)}</R.T>
                            </R.E>
                            <R.T s="font-weight:500">{R.x(x?.n)}</R.T>
                          </R.E>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(x?.cat)}</R.T>
                          <R.T>{R.x(x?.f)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(x?.dt)}</R.T>
                          <R.T s={`font-size:13px;color:${R.s(x?.kc)}`}>{R.x(x?.keep)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(x?.perm)}</R.T>
                        </R.G>
                      </React.Fragment>))}
                    </R.E>
                  </>) : null}
                  {v.xg?.isImp ? (<>
                    <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:0 40px 20px">
                      {R.list(v.xg?.kinds).map((k, $index) => (<React.Fragment key={$index}>
                        <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;">
                          <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                            <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                              <R.T s="font-weight:500">{R.x(k?.l)}</R.T>
                              <R.T s="font-size:12px;color:#6b675f">{R.x(k?.d)}</R.T>
                            </R.E>
                            {k?.empty ? (<>
                              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={k?.load} tag="button">
                                <R.T>{"Carregar"}</R.T>
                              </R.E>
                            </>) : null}
                          </R.E>
                          {k?.empty ? (<>
                            <R.E s="height:120px;display:flex;align-items:center;justify-content:center;border:1px dashed #c9c3b1;background:repeating-linear-gradient(45deg,#f4f1ea 0 6px,#fbfaf7 6px 12px);font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#6b675f">
                              <R.T>{"Arrasta a planilha · .xlsx · .csv"}</R.T>
                            </R.E>
                          </>) : null}
                          {k?.loaded ? (<>
                            <R.E s="display:flex;flex-direction:column;gap:12px">
                              <R.T s="font-family:ui-monospace,Menlo,monospace;font-size:12px">{R.x(k?.file)}</R.T>
                              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                                {R.list(k?.cols).map((c, $index) => (<React.Fragment key={$index}>
                                  <R.T s={`padding:4px 8px;background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase`}>{R.x(c?.l)}</R.T>
                                </React.Fragment>))}
                              </R.E>
                              <R.G s="display:grid;grid-template-columns:repeat(3,1fr);background:#ebe6d6">
                                {R.list(k?.res).map((r, $index) => (<React.Fragment key={$index}>
                                  <R.E s="padding:12px;display:flex;flex-direction:column;gap:4px">
                                    <R.T s={`font-size:22px;font-weight:300;color:${R.s(r?.c)}`}>{R.x(r?.v)}</R.T>
                                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.l)}</R.T>
                                  </R.E>
                                </React.Fragment>))}
                              </R.G>
                              <R.T s="font-size:12px;color:#55524b">{R.x(k?.note)}</R.T>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </React.Fragment>))}
                    </R.G>
                    <R.E s="padding:24px 40px;border-top:1px solid #e4e0d6;display:flex;gap:16px;align-items:center">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 24px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v.xg?.importar} tag="button">
                        <R.T>{R.x(v.xg?.impCta)}</R.T>
                      </R.E>
                      <R.T s="font-size:13px;color:#55524b">{R.x(v.xg?.impMsg)}</R.T>
                    </R.E>
                  </>) : null}
                  {v.xg?.isInd ? (<>
                    <R.E>
                      <R.G s="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;padding:0 40px 20px">
                        {R.list(v.xg?.rk).map((x, $index) => (<React.Fragment key={$index}>
                          <R.E s={`padding:22px 24px;display:flex;flex-direction:column;gap:10px;background:${R.s(x?.bg)};border:1px solid #e4e0d6;min-width:0`}>
                            <R.T s="font-size:13px;font-weight:500;color:#55524b">{R.x(x?.l)}</R.T>
                            <R.T s={`font-size:36px;font-weight:300;line-height:1;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                            <R.T s="font-size:12px;color:#55524b">{R.x(x?.d)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.G>
                      <R.G s="display:grid;grid-template-columns:minmax(0,1.5fr) minmax(360px,1fr);gap:20px;padding:0 40px 20px">
                        <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"A validar"}</R.T>
                            </R.E>
                            <R.E>
                              {R.list(v.xg?.rev).map((v, $index) => (<React.Fragment key={$index}>
                                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                  <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                    <R.T s="font-weight:500">{R.x(v?.t)}</R.T>
                                    <R.T s="font-size:12px;color:#6b675f">{R.x(v?.why)}</R.T>
                                  </R.E>
                                  <R.E s="display:flex;gap:6px">
                                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v?.no} tag="button">
                                      <R.T>{"Não elegível"}</R.T>
                                    </R.E>
                                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;white-space:nowrap;cursor:pointer" onPress={v?.yes} tag="button">
                                      <R.T>{"Validar"}</R.T>
                                    </R.E>
                                  </R.E>
                                </R.G>
                              </React.Fragment>))}
                              {v.xg?.revEmpty ? (<>
                                <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;font-size:13px;color:#6b675f">{"Nada por validar."}</R.T>
                              </>) : null}
                            </R.E>
                          </R.E>
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Quem mais indica"}</R.T>
                            </R.E>
                            <R.E>
                              {R.list(v.xg?.top).map((t, $index) => (<React.Fragment key={$index}>
                                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 140px;gap:16px;align-items:center;padding:13px 0;border-top:1px solid #e4e0d6;font-size:14px">
                                  <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                                    <R.T s="font-weight:500">{R.x(t?.n)}</R.T>
                                    <R.T s="font-size:12px;color:#6b675f">{R.x(t?.d)}</R.T>
                                  </R.E>
                                  <R.T s="text-align:right">{R.x(t?.v)}{" Kz"}</R.T>
                                </R.G>
                              </React.Fragment>))}
                            </R.E>
                          </R.E>
                        </R.E>
                        <R.E s="min-width:0;display:flex;flex-direction:column;gap:20px">
                          <R.E s="padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px;min-width:0;">
                            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;min-height:24px">
                              <R.T s="display:block;font-size:1.5em;font-weight:700;margin:.83em 0;margin:0;font-size:15px;font-weight:600;letter-spacing:.01em;color:#1d1c1a;white-space:nowrap">{"Regras do programa"}</R.T>
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:8px">
                              <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Recompensa"}</R.T>
                              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                                {R.list(v.xg?.rewards).map((x, $index) => (<React.Fragment key={$index}>
                                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                    <R.T>{R.x(x?.l)}</R.T>
                                  </R.E>
                                </React.Fragment>))}
                              </R.E>
                            </R.E>
                            <R.E s="display:flex;flex-direction:column;gap:8px">
                              <R.T s="font-size:12px;font-weight:500;color:#6b675f">{"Liberta após"}</R.T>
                              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                                {R.list(v.xg?.conds).map((x, $index) => (<React.Fragment key={$index}>
                                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                                    <R.T>{R.x(x?.l)}</R.T>
                                  </R.E>
                                </React.Fragment>))}
                              </R.E>
                            </R.E>
                            <R.T s="font-size:13px;line-height:1.5;color:#55524b">{"Elegível: número e NIF novos, sem inscrição nos últimos 6 meses. A recompensa só sai com pagamento confirmado."}</R.T>
                          </R.E>
                        </R.E>
                      </R.G>
                    </R.E>
                  </>) : null}
                </R.E>
              </>) : null}
              {v.is?.da ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px">
                    <R.E s="display:flex;flex-direction:column;gap:6px">
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Avisos"}</R.T>
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{R.x(v.xv?.unread)}{" · enviados pela gestão"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:42px;padding:0 20px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={v.xv?.readAll} tag="button">
                      <R.T>{"Marcar todos como lidos"}</R.T>
                    </R.E>
                  </R.E>
                  <R.E s="padding:0 40px 20px;max-width:900px;display:flex;flex-direction:column;gap:12px">
                    <R.E s="display:flex;gap:4px;padding:4px;background:#ebe6d6;align-self:flex-start">
                      {R.list(v.xv?.fs).map((f, $index) => (<React.Fragment key={$index}>
                        <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 14px;border:0;background:${R.s(f?.bg)};color:${R.s(f?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:8px;white-space:nowrap`} onPress={f?.pick} a_pressed={f?.on} tag="button">
                          <R.T>{R.x(f?.l)}</R.T>
                          <R.T s="font-weight:400;opacity:.7">{R.x(f?.n)}</R.T>
                        </R.E>
                      </React.Fragment>))}
                    </R.E>
                    {R.list(v.xv?.list).map((a, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:20px 24px;background:${R.s(a?.bg)};border:1px solid ${R.s(a?.bd)};display:flex;flex-direction:column;gap:14px;opacity:${R.s(a?.op)}`}>
                        <R.E s="display:flex;align-items:center;gap:12px">
                          <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600">
                            <R.T>{R.x(a?.i)}</R.T>
                          </R.E>
                          <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                            <R.T s="font-size:14px;font-weight:500">{R.x(a?.de)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f">{R.x(a?.h)}{" · para "}{R.x(a?.to)}</R.T>
                          </R.E>
                          <R.T s={`padding:4px 8px;background:${R.s(a?.p?.bg)};color:${R.s(a?.p?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase`}>{R.x(a?.p?.l)}</R.T>
                        </R.E>
                        <R.T s={`display:block;margin:1em 0;margin:0;font-size:16px;line-height:1.55;font-weight:${R.s(a?.fw)};text-wrap:pretty`}>{R.x(a?.t)}</R.T>
                        <R.E s="display:flex;justify-content:flex-end">
                          {a?.unread ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={a?.read} tag="button">
                              <R.T>{"Marcar como lido"}</R.T>
                            </R.E>
                          </>) : null}
                          {a?.isRead ? (<>
                            <R.T s="font-size:12px;font-weight:500;color:#2e7d4f">{"Lido ✓"}</R.T>
                          </>) : null}
                        </R.E>
                      </R.E>
                    </React.Fragment>))}
                    {v.xv?.empty ? (<>
                      <R.T s="display:block;margin:1em 0;margin:0;padding:24px;background:#fbfaf7;border:1px solid #e4e0d6;font-size:14px;color:#6b675f">{"Nenhum aviso neste filtro."}</R.T>
                    </>) : null}
                  </R.E>
                </R.E>
              </>) : null}
              {v.is?.dz ? (<>
                <R.E>
                  <R.E s="padding:32px 40px 24px;display:flex;align-items:center;justify-content:space-between;gap:24px">
                    <R.E s="display:flex;flex-direction:column;gap:6px">
                      <R.T s="display:block;font-size:2em;font-weight:700;margin:.67em 0;margin:0;font-size:26px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;line-height:1.15">{"Ginásio agora"}</R.T>
                      <R.T s="font-size:14px;color:#6b675f;white-space:nowrap">{"Talatona · actualizado às 09:41 pelos check-ins"}</R.T>
                    </R.E>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:360px minmax(0,1fr);gap:20px;padding:0 40px 20px">
                    <R.E s="background:#1d1c1a;color:#fbfaf7;padding:28px;display:flex;flex-direction:column;gap:20px">
                      <R.T s="font-size:12px;font-weight:500;color:#d9d4c4">{"Pessoas dentro agora"}</R.T>
                      <R.E s="display:flex;align-items:baseline;gap:12px">
                        <R.T s="font-size:120px;font-weight:300;line-height:.85">{R.x(v.lotNow)}</R.T>
                        <R.T s="font-size:15px;color:#d9d4c4">{"de 120"}</R.T>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;gap:8px">
                        <R.G s="display:grid;grid-template-columns:repeat(24,1fr);gap:3px">
                          {R.list(v.xz?.segs).map((g, $index) => (<React.Fragment key={$index}>
                            <R.E s={`height:18px;background:${R.s(g?.c)}`} />
                          </React.Fragment>))}
                        </R.G>
                        <R.T s="font-size:13px;color:#d9d4c4">{R.x(v.xz?.cap)}</R.T>
                      </R.E>
                      <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#3a3834;margin-top:auto">
                        <R.E s="background:#1d1c1a;padding:14px 0;display:flex;flex-direction:column;gap:4px">
                          <R.T s="font-size:12px;color:#8a867d">{"Estado"}</R.T>
                          <R.T s="font-size:16px;text-transform:capitalize">{R.x(v.xz?.lvl)}</R.T>
                        </R.E>
                        <R.E s="background:#1d1c1a;padding:14px 0 14px 16px;display:flex;flex-direction:column;gap:4px">
                          <R.T s="font-size:12px;color:#8a867d">{"Mais calmo"}</R.T>
                          <R.T s="font-size:16px">{R.x(v.xz?.calm)}</R.T>
                        </R.E>
                      </R.G>
                    </R.E>
                    <R.E s="background:#fbfaf7;border:1px solid #e4e0d6;padding:24px 28px;display:flex;flex-direction:column;gap:16px">
                      <R.E s="display:flex;justify-content:space-between;align-items:baseline">
                        <R.T s="font-size:15px;font-weight:600">{"Hoje, hora a hora"}</R.T>
                        <R.E s="display:flex;gap:16px;font-size:12px;color:#6b675f">
                          <R.E s="display:flex;align-items:center;gap:6px">
                            <R.E s="width:10px;height:10px;background:#1d1c1a" />
                            <R.T>{"Já passou"}</R.T>
                          </R.E>
                          <R.E s="display:flex;align-items:center;gap:6px">
                            <R.E s="width:10px;height:10px;background:#c8640c" />
                            <R.T>{"Agora"}</R.T>
                          </R.E>
                          <R.E s="display:flex;align-items:center;gap:6px">
                            <R.E s="width:10px;height:10px;background:#d9d4c4" />
                            <R.T>{"Habitual"}</R.T>
                          </R.E>
                        </R.E>
                      </R.E>
                      <R.G s="flex:1;min-height:260px;display:grid;grid-template-columns:repeat(17,minmax(0,1fr));gap:8px;align-items:end">
                        {R.list(v.xz?.bars).map((b, $index) => (<React.Fragment key={$index}>
                          <R.E s="height:100%;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px" title={b?.t}>
                            <R.T s="font-size:11px;color:#55524b">{R.x(b?.v)}</R.T>
                            <R.E s={`width:100%;height:${R.s(b?.h)};background:${R.s(b?.c)}`} />
                            <R.T s={`font-size:11px;color:${R.s(b?.lc)}`}>{R.x(b?.hr)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.G>
                      <R.T s="font-size:13px;color:#55524b">{"Pico habitual às "}{R.x(v.xz?.peak)}{" pessoas. Os valores futuros são a média das últimas 4 semanas."}</R.T>
                    </R.E>
                  </R.G>
                  <R.E s="margin:0 40px 20px;padding:24px 28px;background:#fbfaf7;border:1px solid #e4e0d6;display:flex;flex-direction:column;gap:14px">
                    <R.T s="font-size:15px;font-weight:600">{"Equipa presente"}</R.T>
                    <R.G s="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px">
                      {R.list(v.xz?.staff).map((p, $index) => (<React.Fragment key={$index}>
                        <R.E s="display:flex;align-items:center;gap:12px;padding:12px 14px;border:1px solid #e4e0d6;background:#fff">
                          <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;font-size:11px;font-weight:600">
                            <R.T>{R.x(p?.i)}</R.T>
                          </R.E>
                          <R.E s="display:flex;flex-direction:column;gap:2px;min-width:0">
                            <R.T s="font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">{R.x(p?.n)}</R.T>
                            <R.T s="font-size:12px;color:#6b675f;white-space:nowrap">{R.x(p?.r)}{" · desde "}{R.x(p?.since)}</R.T>
                          </R.E>
                        </R.E>
                      </React.Fragment>))}
                    </R.G>
                  </R.E>
                </R.E>
              </>) : null}
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
    </R.E>
    </>
  );
}

export const MuntuDesktop = R.makeDC(Component, render, {"turnos": true, "semRede": false, "screen": "d1", "role": "rececao", "step": 0}, "MuntuDesktop");
export default MuntuDesktop;
