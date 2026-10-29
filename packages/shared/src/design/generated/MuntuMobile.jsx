// GERADO a partir de "MUNTU Mobile.dc.html" por tools/dc2rn.py — não editar à mão.
// Para mudar o visual, edite o ficheiro de desenho e volte a gerar.
/* eslint-disable */
import React from 'react';
import * as R from '../runtime';
import { MuntuLogo } from './MuntuLogo';
import { MuntuMark } from './MuntuMark';

const DCLogic = R.DCLogic;
const location = R.location;
const window = R.win;
const document = R.doc;

class Component extends DCLogic {
  state = { sc:null, role:null, tel:'923 481 220', pw:'', showPw:false, err:'', forgot:false,
    day:0, res:{ '0-1':true }, sms:true, wa:false, meio:'express', payTel:'923 481 220', pay:'idle', bio:true, fug:true,
    ptSel:0, freq:2, ptDays:['ter','qui'], ptHour:'18:00', ptSent:false,
    cob:{}, nao:{}, manual:{}, rq:'', smsDone:{}, ptMark:{}, rqSt:{}, readN:{}, onShift:true,
    eqTab:'now', tq: (this.props.screen==='t4' || this.props.screen==='t1') ? { n5000:10, n2000:8, n1000:9, n500:6, n200:5, coin:1000 } : { n5000:0, n2000:0, n1000:0, n500:0, n200:0, coin:0 }, tRev: (this.props.screen==='t4' || this.props.screen==='t1'), tOpt: (this.props.screen==='t4' || this.props.screen==='t1') ? 'reg' : '', tJust: (this.props.screen==='t4' || this.props.screen==='t1') ? 'Recontado duas vezes. Falta uma nota de 5 000.' : '', tPay: (this.props.screen==='t4' || this.props.screen==='t1') ? { tpa:'ok', exp:'ok', ref:'ok', pen:'ok' } : {}, tPend: (this.props.screen==='t4' || this.props.screen==='t1') ? { q1:'rec', q2:'rec', q3:'rec', q4:'res', q5:'prob' } : {}, tExc:false, tExcMot:'', tPw:'', tDone:false, tBusy:false, tErr:'', ob:{ nome:'Paulo Neto', tel:'927 220 001', email:'', pw:'', gym:'Mwangolé Fit', nif:'5417 2290 11', city:'Luanda', fils:['Talatona','Kilamba','Maianga'], ok:false }, obErr:'', imOwner:false, imL: (this.props.screen==='a4' || this.props.screen==='a5') ? { mem:true, stf:true } : {}, imMerge:{ mem:true, stf:true }, imErr:{}, imDone:false, smAud:{ mem:true, stf:true }, smText:null, smWhen:'now', smSt:'form', smSent:0, smRetry:false, nfN:'Viana', nfC:'Luanda', nfFrom:'Talatona', nfX:{ planos:true, horarios:true, regras:true, perm:true, avisos:true }, nfTeam:['Celma Bento'], nfDone:false, nfErr:'', cfCat:'Todos', cfExtra:0, rgV:{ dRec:10, dGes:25, dFin:20000, eFin:0 }, rgBio:true, rgSaved:false, riRew:'mes', riCond:2, riRev:{}, miCopied:false, refCode:'', kTab:'risk', kLim:7, kRLim:7, kOpen:null, kMot:'', kRes:'', kDone:{}, wait:{ '0-4':1 }, offer:true, offerMsg:'', cash:'', just:'', occT:'', occX:[], hTo:'Teresa Lunda', hSt:'form', hErr:'', lSt:{}, lSent:{}, o8Tab:'pot', acts:null, acMsg:'', acKind:'', xTipo:'desafio', xT:'', xD:'', xIni:'2026-11-04', xFim:'2026-11-30', xHora:'18:00', xCap:'20', xUnit:'treinos', xPremio:'', xFil:'Talatona', xErr:'', m3tab:'aulas', desJ:{ d1:true }, evJ:{}, nNome:'', nTel:'', nBi:'', nPlan:'rede', nMeio:'TPA', nSms:true, nErr:'', nRes:null, cMem:'MS', cSel:null, cDoc:'fr', cMeio:'TPA', cCh:['SMS'], cErr:'', cRes:null, docs:[], seqN:1204, toT:'Todos', pri:'normal', aText:'', sentA:[] };
  componentDidUpdate(pp) { if ((pp.screen !== this.props.screen || pp.role !== this.props.role) && this.state.sc) this.setState({ sc:null, role:null }); }
  componentWillUnmount() { clearTimeout(this.t1); clearTimeout(this.t3); clearInterval(this.t4); clearTimeout(this.t5); }
  go = sc => this.setState({ sc });
  renderVals() {
    const s = this.state, sc = s.sc || this.props.screen || 'l1';
    const fs = x => ({ t:'rececao', a:'dono', m:'membro', r:'rececao', f:'financas', p:'pt', o:'dono' })[(x||'')[0]];
    const xr = this.props.screen==='x1' ? (this.props.role || 'pt') : null;
    const ps = this.props.screen || 'l1', shared = x => x==='m6' || x[0]==='e' || x==='x1' || x==='k1';
    const role = xr && !s.role && sc==='x1' ? xr : s.role || (shared(sc) ? ((shared(ps) && this.props.role) || fs(ps) || (sc==='m6' ? 'membro' : 'rececao')) : fs(sc)) || 'rececao';
    const ids = ['t0','t1','t2','t3','t4','a1','a2','a3','a4','a5','o9','o10','o11','o12','m8','k1','e3','o8','p3','o7','x1','r3','r4','l1','m1','m2','m3','m4','m5','m6','m7','r1','r2','f1','f2','p1','p2','e1','e2','o1','o2','o3','o4','o5','o6'], is = {}; ids.forEach(k => is[k] = sc === k);
    const TABS = { membro:[['m1','Acesso'],['m3','Actividades'],['m7','PT'],['m2','Plano'],['m4','Conta']], rececao:[['r1','Entradas'],['r2','Membros'],['r3','Inscrever'],['r4','Cobrar'],['e1','Avisos']],
      financas:[['f1','Resumo'],['f2','Cobranças'],['e1','Avisos'],['e2','Turno']], pt:[['p1','Agenda'],['p2','Pedidos'],['p3','Actividades'],['e1','Avisos'],['e2','Turno']],
      dono:[['o1','Painel'],['o5','Equipa'],['o7','Actividades'],['o2','Aprovações'],['o4','Conta']] };
    const alias = { a3: 'o4', o9:'o4', o10:'o4', o11:'o4', o12:'o4', m8:'m4', k1: TABS[role][0][0], e3: 'e2', o8:'o1', m6: TABS[role][0][0], m5:'m2', o6:'o5', o3:'o1', x1: role==='dono' ? 'o7' : 'p3' }, cur = alias[sc] || sc;
    const ST = { pago:['Entrou','#2e7d4f','#e3efe6'], divida:['Bloqueado','#b42318','#f7e1de'], visita:['Visita rede','#7a5800','#f5ecd0'], vencer:['A vencer','#7a5800','#f5ecd0'], congelado:['Congelado','#55524b','#ebe6d6'],
      aberto:['Aberto','#2e7d4f','#e3efe6'], fechado:['Fechado','#55524b','#ebe6d6'], dif:['Diferença','#b42318','#f7e1de'], concl:['Concluída','#55524b','#ebe6d6'], entrou:['Presente','#2e7d4f','#e3efe6'],
      aceite:['Aceite','#2e7d4f','#e3efe6'], recusado:['Recusado','#b42318','#f7e1de'], urgente:['Urgente','#b42318','#f7e1de'], normal:['Informação','#55524b','#ebe6d6'], recusou:['Não entrou','#55524b','#ebe6d6'] };
    const st = k => ({ l:ST[k][0], c:ST[k][1], bg:ST[k][2] });
    const kn = v => String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
    const sel = on => ({ bd: on ? '#1d1c1a' : '#d9d4c4', bg: on ? '#1d1c1a' : 'transparent', c: on ? '#fbfaf7' : '#1d1c1a', on });

    const qr = []; for (let y=0;y<21;y++) for (let x=0;x<21;x++) { const ex = x>=14?x-14:x, ey = y>=14?y-14:y; const fin = (x<7||x>=14)&&(y<7||y>=14)&&!(x>=14&&y>=14);
      const on = fin ? (ex===0||ex===6||ey===0||ey===6||(ex>=2&&ex<=4&&ey>=2&&ey<=4)) : ((x*7+y*13+x*y*3)%5)<2; qr.push(on?'#1d1c1a':'transparent'); }
    const tg = k => ({ bg: s[k] ? '#1d1c1a' : '#d9d4c4', x: s[k] ? 19 : 3, flip: () => this.setState({ [k]: !s[k] }) });

    // staff
    const STAFF = [['CB','Celma Bento','Recepção','Talatona',1,'06:58','38h','98%','412 entradas validadas',0],['TL','Teresa Lunda','Recepção','Talatona',0,'Entra 14:00','36h','94%','371 entradas validadas',0],
      ['RM','Rui Manuel','Recepção','Kilamba',1,'07:04','35h','86%','2 activações sem pagamento',1],['JA','Jorge Afonso','Finanças','Rede',1,'08:30','40h','100%','94% cobrado em Outubro',0],
      ['NS','Nuno Sebastião','PT','Talatona',1,'06:15','42h','97%','46 sessões · 9 clientes',0],['LP','Leonor Paím','PT','Talatona',1,'07:20','30h','92%','31 sessões · 6 clientes',0],['HM','Hélio Matias','PT','Kilamba',0,'Entra 17:00','28h','89%','27 sessões · 7 clientes',0]]
      .map(([i,n,r,f,on,since,h,ass,k,w]) => ({ i,n,r,f,on:!!on,since,h,ass,k, kc: w ? '#b42318' : '#6b675f', bar: w ? '#b42318' : '#1d1c1a', oc: on ? '#2e7d4f' : '#9a958b', pt: r==='PT' }));
    const presN = STAFF.filter(p => p.on).length;
    const onFloor = STAFF.filter(p => p.on && p.f==='Talatona').map(p => Object.assign({}, p, { pt: p.pt && role==='membro' }));
    const eq = { pres: presN + ' de ' + STAFF.length, presMembro: onFloor.length + ' na Talatona', onFloor, all: STAFF,
      showNow: s.eqTab==='now', showStats: s.eqTab==='stats',
      tabs: [['now','Presentes'],['stats','Estatísticas · Out']].map(([k,l]) => ({ l, on:s.eqTab===k, bg: s.eqTab===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ eqTab:k }) })),
      kpis: [['249h','Horas no mês'],['94%','Assiduidade'],['104','Sessões PT']].map(([v,l]) => ({ v,l })) };

    // lotação
    const OCC = [22,48,64,41,28,20,24,30,26,22,30,52,78,92,70,44,18], nowI = 3, CAP = 120, now = OCC[nowI];
    const lvl = now < 50 ? 'Tranquilo' : now < 85 ? 'Moderado' : 'Cheio';
    const lot = { now, lvl, hora:'09:41', pct: Math.round(now/CAP*100)+'%', cap: Math.round(now/CAP*100) + '% da lotação · máximo ' + CAP + ' pessoas',
      tip: 'Mais calmo entre as 11:00 e as 14:00. Mais cheio às 19:00.',
      bars: OCC.map((v,i) => ({ h: Math.round(v/92*100)+'%', c: i===nowI ? '#c8640c' : i<nowI ? '#1d1c1a' : '#d9d4c4', t: (6+i)+'h · '+v+' pessoas' })) };

    // aulas
    const W = ['Qui','Sex','Sáb','Dom','Seg','Ter','Qua'], N = [29,30,31,1,2,3,4];
    const AU = [['06:30','Funcional','Nuno Sebastião · Sala 1',20],['07:30','Spinning','Leonor Paím · Sala 2',16],['12:15','Treino de força','Nuno Sebastião · Sala 1',12],['18:00','Kizomba fit','Leonor Paím · Sala 2',24],['19:00','Cross training','Hélio Matias · Box',14],['20:00','Pilates','Ana Sousa · Sala 3',10]];
    const aulas = AU.map(([h,n,d,cap],i) => { const key = s.day+'-'+i, on = !!s.res[key], wq = s.wait[key], left = Math.max(0, (cap*7 + i*5 + s.day*3) % (cap+1) - (i===4 && s.day===0 ? 99 : 0)) - (on?1:0); const full = left<=0 && !on;
      return { h, n, d: d + ' · ' + (full ? (wq ? 'lotada · és o #' + (wq+1) + ' na fila' : 'lotada · lista de espera') : left + ' vagas'), full, l: on ? 'Reservado' : full ? (wq ? 'Na fila' : 'Lista de espera') : 'Reservar', bg: on ? '#c8640c' : full && wq ? '#ebe6d6' : 'transparent', c: '#1d1c1a', bd: on ? '1px solid #c8640c' : full && wq ? '1px solid #ebe6d6' : '1px solid #1d1c1a',
        toggle: () => full && !on ? this.setState(x => ({ wait: Object.assign({}, x.wait, { [key]: x.wait[key] ? 0 : 2 }) })) : this.setState(x => ({ res: Object.assign({}, x.res, { [key]: !x.res[key] }) })) }; });

    const DES = [['d1','Novembro sem falhas','20 treinos em 30 dias. Conta pelo check-in.',6,20,'treinos',142,'30 Nov','Prémio: 1 mês grátis para os 3 primeiros.',0],
      ['d2','Desafio de força','Supino, agachamento e peso morto. Avaliado pelo teu PT.',0,3,'avaliações',58,'15 Dez','Medalha e destaque no ginásio.',0],
      ['d3','Talatona vs Kilamba','Filial com mais check-ins ganha. Participas pela tua filial.',1840,3000,'check-ins',610,'15 Nov','A filial vencedora ganha uma aula aberta com DJ.',1]];
    const DES_J0 = { d1:true };
    const EVT = [['e1','9','Nov','Sáb · 07:00','Corrida da Marginal','Marginal de Luanda · 5 km',40,22],['e2','16','Nov','Sáb · 10:00','Workshop de nutrição','Talatona · Sala 3',12,9],['e3','23','Nov','Sáb · 09:00','Treino aberto · traz um amigo','Todas as filiais',0,0]];
    // PT booking
    const PTS = [['NS','Nuno Sebastião','Força e hipertrofia',8000,1],['LP','Leonor Paím','Mobilidade e pilates',7000,1],['HM','Hélio Matias','Cross training',7500,0]];
    const P = PTS[s.ptSel], DAYS = [['seg','Seg'],['ter','Ter'],['qua','Qua'],['qui','Qui'],['sex','Sex'],['sab','Sáb']];
    const ready = s.ptDays.length === s.freq && !!s.ptHour, sess = s.freq * 4;
    const pt = { idle: !s.ptSent, sent: s.ptSent,
      pts: PTS.map(([i,n,e,p,on],k) => ({ i,n,e, price: kn(p)+' Kz', on: k===s.ptSel, bd: k===s.ptSel ? '2px solid #1d1c1a' : '1px solid #e4e0d6', bg: k===s.ptSel ? '#fff' : 'transparent', oc: on ? '#2e7d4f' : '#9a958b', ol: on ? 'No ginásio agora' : 'Entra às 17:00', pick:() => this.setState({ ptSel:k }) })),
      freqs: [1,2,3].map(f => Object.assign(sel(s.freq===f), { l: f+'×', pick:() => this.setState(x => ({ freq:f, ptDays: x.ptDays.slice(-f) })) })),
      days: DAYS.map(([k,l]) => Object.assign(sel(s.ptDays.includes(k)), { l, pick:() => this.setState(x => { const has = x.ptDays.includes(k); let d = has ? x.ptDays.filter(y => y!==k) : x.ptDays.concat(k); if (d.length > x.freq) d = d.slice(-x.freq); return { ptDays:d }; }) })),
      hours: ['06:30','07:30','12:00','18:00','19:00','20:00'].map(h => Object.assign(sel(s.ptHour===h), { l:h, pick:() => this.setState({ ptHour:h }) })),
      daysHint: s.ptDays.length + ' de ' + s.freq + ' escolhidos',
      sum: sess + ' sessões · ' + P[1].split(' ')[0], sum2: (s.ptDays.map(k => DAYS.find(d => d[0]===k)[1]).join(', ') || 'Escolhe os dias') + ' · ' + s.ptHour, total: kn(sess*P[3]),
      dis: !ready, op: ready ? 1 : .35,
      reservar: () => ready && this.setState({ ptSent:true }), reset: () => this.setState({ ptSent:false }),
      sentMsg: 'Pedido enviado a ' + P[1] + ': ' + sess + ' sessões, ' + s.ptDays.map(k => DAYS.find(d => d[0]===k)[1]).join(' e ') + ' às ' + s.ptHour + '. Recebes a confirmação aqui e por SMS.' };

    // payment
    const meios = [['express','Multicaixa Express','Confirma no telemóvel'],['ref','Referência Multicaixa','Paga no ATM ou no banco online'],['tpa','TPA na recepção','Paga ao entrar no ginásio']];

    // recepção
    const CI = [['c1','09:38','Ana Domingos','Rede · Mensal','pago',0],['c2','09:31','Edson Mateus','Local · Mensal','pago',0],['c3','09:24','Mário Sebastião','Local · Mensal · 12 dias em atraso','divida',30000],['c4','09:12','Joana Kiala','Híbrido · de Kilamba','pago',0],['c5','09:02','Bruno Kianda','Kianda Fitness · visita de rede','visita',0]];
    const r1list = Object.keys(s.manual).map(n => ({ id:'m-'+n, h:'09:41', n, p:'Entrada manual', k:'pago', v:0 })).concat(CI.map(([id,h,n,p,k,v]) => ({ id,h,n,p,k,v })));
    const r1 = { queue: 3, bloq: 1, hoje: 168 + Object.keys(s.manual).length, list: r1list.map(c => { const k = s.cob[c.id] ? 'pago' : s.nao[c.id] ? 'recusou' : c.k; return { h:c.h, n:c.n, p: (s.cob[c.id] ? 'Pago no TPA · entrou' : c.p) + (this.props.semRede && ['c1','c2','c3'].includes(c.id) ? ' · por sincronizar' : ''), s:st(k), blocked: k==='divida', v: kn(c.v), cobrar:() => this.setState({ sc:'r4', cMem:'MS', cSel:null, cRes:null, cErr:'' }), recusar:() => this.setState(x => ({ nao:Object.assign({}, x.nao, { [c.id]:true }) })) }; }) };
    const MEM = [['AD','Ana Domingos','#4821 · Rede Mensal','pago','18 dias'],['MS','Mário Sebastião','#4511 · Local Mensal','divida','12 dias em atraso'],['KM','Kátia Muondo','#4822 · Rede Mensal','pago','18 dias'],['JK','Joana Kiala','#4602 · Híbrido','vencer','vence em 3 dias'],['EM','Edson Mateus','#4790 · Local Mensal','pago','24 dias'],['CL','Celso Lima','#4700 · Local Mensal','congelado','até 15 Nov']];
    const q = s.rq.trim().toLowerCase();
    const r2l = MEM.filter(r => !q || (r[1]+' '+r[2]).toLowerCase().includes(q)).map(([i,n,d,k,dias]) => { const done = !!s.manual[n], can = (k==='pago'||k==='vencer');
      return { i,n,d,dias, can: can, cant: !can, s:st(k), cl: k==='divida' ? 'Cobrar' : st(k).l, cobrar:() => k==='divida' && this.setState({ sc:'r4', cMem:i, cSel:null, cRes:null, cErr:'' }), bl: done ? 'Entrou ✓' : 'Registar entrada', bbg: done ? '#e3efe6' : '#1d1c1a', bc: done ? '#2e7d4f' : '#fbfaf7', entrar:() => !done && this.setState(x => ({ manual:Object.assign({}, x.manual, { [n]:true }) })) }; });
    const r2 = { q:s.rq, setQ: e => this.setState({ rq:e.target.value }), list:r2l, empty:!r2l.length, total:'612' };

    // finanças
    const EXP = [['Dinheiro',88000],['Multicaixa Express',64500],['TPA',22000],['Transferência',10000]], tot = EXP.reduce((a,b) => a+b[1],0);
    const f1 = { hoje: kn(tot), meios: EXP.map(([l,v]) => ({ l, v:kn(v), w: Math.round(v/88000*100)+'%' })),
      mes: [['2 450 000','Esperado'],['2 302 000','Recebido'],['94%','Cobrado']].map(([v,l]) => ({ v,l })),
      caixas: [['Talatona · Manhã','Celma Bento · desde 07:00',88000,'aberto'],['Kilamba · Manhã','Rui Manuel · desde 07:00',54000,'aberto'],['Maianga · Ontem','Fecho às 22:04 · −2 000 Kz',164500,'dif']].map(([n,d,v,k]) => ({ n,d,v:kn(v),s:st(k) })) };
    const DEV = [['Mário Sebastião','Local Mensal · 12 dias',30000],['Celso Pedro','Rede Mensal · 9 dias',45000],['Luísa Tomás','Híbrido · 21 dias',38000],['Paulo Jorge','Local Mensal · 33 dias',30000]];
    const allSent = DEV.every(d => s.smsDone[d[0]]);
    const f2 = { n: DEV.length, total: kn(DEV.reduce((a,d) => a+d[2],0)), allDis: allSent, allOp: allSent ? .35 : 1,
      all: () => this.setState(x => { const o = Object.assign({}, x.smsDone); DEV.forEach(d => { if (!o[d[0]]) o[d[0]] = '09:42'; }); return { smsDone:o }; }),
      list: DEV.map(([n,d,v]) => { const done = s.smsDone[n]; return { n,d, v:'−'+kn(v), info: done ? 'SMS entregue às ' + done : '', dis: !!done, op: done ? .35 : 1, sms:() => this.setState(x => ({ smsDone:Object.assign({}, x.smsDone, { [n]:'09:42' }) })) }; }) };

    // PT
    const AG = [['a1','06:30','Kátia Muondo','Força · sessão 5 de 8','concl'],['a2','07:30','Edson Mateus','Hipertrofia · sessão 2 de 12','concl'],['a3','12:15','Joana Kiala','Força · sessão 7 de 8','agend'],['a4','18:00','Mário Sebastião','Avaliação inicial','agend'],['a5','19:00','Ana Domingos','Força · sessão 1 de 8','agend']];
    const p1 = { semana: 18, clientes: 9, list: AG.map(([id,h,n,d,k]) => { const kk = s.ptMark[id] ? 'entrou' : k; return { h,n,d, can: kk==='agend', done: kk!=='agend', s: st(kk==='agend'?'concl':kk), mark:() => this.setState(x => ({ ptMark:Object.assign({}, x.ptMark, { [id]:true }) })) }; }) };
    const RQ = [['q1','KM','Kátia Muondo','Rede Mensal · cliente nova','2× por semana · Ter e Qui','18:00 · a partir de 4 Nov',64000],['q2','BK','Bruno Kianda','Kianda Fitness · rede','3× por semana · Seg, Qua e Sex','07:30 · a partir de 3 Nov',96000],['q3','SL','Sara Lopes','Local Mensal','1× por semana · Sáb','09:00 · a partir de 8 Nov',32000]];
    const p2l = RQ.map(([id,i,n,plan,dias,hora,v]) => { const r = s.rqSt[id]; return { i,n,plan,dias,hora, v: kn(v)+' Kz', open:!r, closed:!!r, s: st(r||'aceite'), yes:() => this.setState(x => ({ rqSt:Object.assign({}, x.rqSt, { [id]:'aceite' }) })), no:() => this.setState(x => ({ rqSt:Object.assign({}, x.rqSt, { [id]:'recusado' }) })) }; });
    const p2 = { list:p2l, open: p2l.filter(r => r.open).length };

    // avisos
    const AV = [['n1','urgente','Catraca 2 da Talatona em manutenção até às 12:00. Validar entradas manualmente na app.','Paulo Neto','Hoje · 07:10','Recepção',4,4],['n2','normal','O novo preço do Rede Mensal entra em vigor a 1 Dez. Os membros já foram avisados por SMS.','Paulo Neto','Ontem · 18:40','Todos',6,9],['n3','normal','Reunião de equipa no sábado às 15:00, sala 3.','Jorge Afonso','Seg · 09:00','Todos',9,9]];
    const e1l = AV.map(([id,p,t,de,h,to]) => { const rd = !!s.readN[id]; return { p:st(p), t,de,h,to, unread:!rd, isRead:rd, op: rd ? .6 : 1, read:() => this.setState(x => ({ readN:Object.assign({}, x.readN, { [id]:true }) })) }; });
    const un = e1l.filter(a => a.unread).length;
    const e1 = { list:e1l, unread: un ? un + (un===1 ? ' por ler' : ' por ler') : 'Tudo lido' };
    const ROLE = { rececao:['Recepção','Celma Bento','Talatona','924 310 115'], financas:['Finanças','Jorge Afonso','Rede','925 700 410'], pt:['Personal trainer','Nuno Sebastião','Talatona','926 118 902'], dono:['Dono','Paulo Neto','Rede','927 220 001'], membro:['Membro','Kátia Muondo','Talatona','923 481 220'] }[role];
    const WK = [['Seg',8.1],['Ter',7.9],['Qua',8.2],['Qui',5.2],['Sex',0],['Sáb',0],['Dom',0]];
    const e2 = { name:ROLE[1], filial:ROLE[2], tel:ROLE[3], state: s.onShift ? 'Em turno desde 06:58' : 'Fora de turno', time: s.onShift ? '2h 43m' : '—', bg: s.onShift ? '#c8640c' : '#ebe6d6', dot: s.onShift ? '#1d1c1a' : '#9a958b', cta: s.onShift ? ((role==='rececao' || role==='financas') ? 'Passar turno' : 'Terminar turno') : 'Iniciar turno',
      chipDot: s.onShift ? '#2e7d4f' : '#9a958b', toggle:() => (s.onShift && (role==='rececao' || role==='financas')) ? this.setState({ sc:'e3', role, hSt:'form' }) : this.setState({ onShift: !s.onShift }), week: '29h 24m', days: WK.map(([l,h],i) => ({ l, h: Math.max(4, Math.round(h/8.2*100))+'%', c: i===3 ? '#c8640c' : h ? '#1d1c1a' : '#e4e0d6' })) };
    const TO = ['Todos','Recepção','Finanças','PT'], TOT = { Todos:9, 'Recepção':3, 'Finanças':1, PT:3 };
    const sentList = s.sentA.concat(AV.map(([id,p,t,de,h,to,r,n]) => ({ p,t,h,to,r,n })));
    const o6 = { text:s.aText, setText: e => this.setState({ aText:e.target.value }),
      to: TO.map(t => Object.assign(sel(s.toT===t), { l:t, pick:() => this.setState({ toT:t }) })),
      pri: [['normal','Informação'],['urgente','Urgente']].map(([k,l]) => Object.assign(sel(s.pri===k), { l, pick:() => this.setState({ pri:k }) })),
      dis: !s.aText.trim(), op: s.aText.trim() ? 1 : .35, cta: 'Enviar a ' + (s.toT==='Todos' ? 'toda a equipa' : s.toT) + ' · ' + TOT[s.toT],
      send: () => { if (!s.aText.trim()) return; this.setState(x => ({ aText:'', sentA:[{ p:x.pri, t:x.aText.trim(), h:'Agora', to:x.toT, r:0, n:TOT[x.toT] }].concat(x.sentA) })); },
      list: sentList.map(a => ({ p:st(a.p), t:a.t, h:a.h, to:a.to, read: a.r + ' de ' + a.n, w: Math.round(a.r/a.n*100)+'%' })) };

    // inscrição
    const PL = [['local','Local Mensal','Só a filial Talatona',30000],['rede','Rede Mensal','Todas as filiais e rede MUNTU',45000],['hibrido','Híbrido','Talatona e Kilamba',38000]];
    const MEIOS = ['TPA','Dinheiro','Express','Referência'];
    const selP = PL.find(p => p[0]===s.nPlan);
    const refU = s.refCode.trim().toUpperCase(), refOk = refU==='KATIA-4822', selfRef = refOk && s.nTel.replace(/\D/g,'')==='923481220';
    const r3 = { ref:s.refCode, setRef:e => this.setState({ refCode:e.target.value }), refMsg: !refU ? '' : selfRef ? 'Não elegível: o número é o mesmo do indicador.' : refOk ? 'Indicado por Kátia Muondo · elegível. A recompensa sai quando pagar 2 mensalidades.' : 'Código não encontrado.', refC: refOk && !selfRef ? '#2e7d4f' : '#b42318', form: !s.nRes, done: !!s.nRes, res: s.nRes || {}, nome:s.nNome, tel:s.nTel, bi:s.nBi, sms:s.nSms, err:s.nErr,
      setNome: e => this.setState({ nNome:e.target.value, nErr:'' }), setTel: e => this.setState({ nTel:e.target.value, nErr:'' }), setBi: e => this.setState({ nBi:e.target.value }), flipSms: () => this.setState({ nSms:!s.nSms }),
      plans: PL.map(([k,l,d,v]) => ({ l, d, v:kn(v), on:s.nPlan===k, dot: s.nPlan===k ? '#1d1c1a' : 'transparent', pick:() => this.setState({ nPlan:k }) })),
      meios: MEIOS.map(x => Object.assign(sel(s.nMeio===x), { l:x, pick:() => this.setState({ nMeio:x }) })),
      sum: selP[1] + ' · Novembro · ' + s.nMeio, total: kn(selP[3]),
      again: () => this.setState({ nRes:null, nNome:'', nTel:'', nBi:'' }),
      submit: () => { if (s.nNome.trim().split(/\s+/).length < 2) return this.setState({ nErr:'Indica o nome e o apelido.' }); const t = s.nTel.replace(/\D/g,''); if (t.length !== 9) return this.setState({ nErr:'O telemóvel tem 9 dígitos.' });
        const doc = 'FR TAL/2026/' + s.seqN, first = s.nNome.trim().split(/\s+/)[0];
        this.setState(x => ({ seqN:x.seqN+1, nRes:{ nome:x.nNome.trim(), num:'Membro #4823', plan:selP[1], doc, v:kn(selP[3]), sent:x.nSms, tel:x.nTel,
          sms:'MWANGOLÉ FIT: Bem-vindo(a), ' + first + '! Plano ' + selP[1] + ' activo até 29 Nov. Factura ' + doc + ' de ' + kn(selP[3]) + ' Kz: muntu.ao/f/7QX4. Senha temporária: 4821-KM.' },
          docs:[{ doc, n:x.nNome.trim(), h:'Agora', v:kn(selP[3]), st:'SMS entregue', c:'#2e7d4f' }].concat(x.docs) })); } };
    // cobrar / facturar
    const CM = { AD:['Ana Domingos','#4821 · Rede Mensal','923 118 402','pago',45000], MS:['Mário Sebastião','#4511 · Local Mensal','924 776 310','divida',30000], KM:['Kátia Muondo','#4822 · Rede Mensal','923 481 220','pago',45000], JK:['Joana Kiala','#4602 · Híbrido','925 902 118','vencer',38000], EM:['Edson Mateus','#4790 · Local Mensal','923 554 017','pago',30000] };
    const cm = CM[s.cMem] || CM.MS;
    const IT = [['nov','Mensalidade Novembro',cm[1].split(' · ')[1],cm[4],0]].concat(cm[3]==='divida' ? [['out','Mensalidade Outubro','Em atraso há 12 dias',cm[4],1]] : []).concat([['pt','Pacote PT · 8 sessões','Nuno Sebastião',64000,0],['cartao','2ª via do cartão de acesso','Cartão com QR',2500,0]]);
    const defSel = cm[3]==='divida' ? ['out'] : ['nov'];
    const cs = s.cSel || defSel, cTot = IT.filter(i => cs.includes(i[0])).reduce((a,i) => a+i[3], 0);
    const payNow = s.cDoc==='fr', chLabel = s.cCh.join(' e ') || 'sem envio';
    const docHist = s.docs.concat([['FR TAL/2026/1201','Ana Domingos','09:12',45000,'SMS entregue','#2e7d4f'],['FT TAL/2026/0088','Celso Pedro','08:47',45000,'Por pagar · SMS entregue','#7a5800'],['FR TAL/2026/1199','Kátia Muondo','08:21',30000,'SMS entregue','#2e7d4f']].map(([doc,n,h,v,st,c]) => ({ doc,n,h,v:kn(v),st,c })));
    const r4 = { form: !s.cRes, done: !!s.cRes, res: s.cRes || {}, mem: s.cMem, err:s.cErr, payNow,
      mems: Object.keys(CM).map(i => ({ i, l: CM[i][0] + (CM[i][3]==='divida' ? ' · em dívida' : '') })),
      setMem: e => this.setState({ cMem:e.target.value, cSel:null, cErr:'' }),
      m: { n:cm[0], d:cm[1], tel:cm[2], s:st(cm[3]) },
      items: IT.map(([k,l,d,v,late]) => { const on = cs.includes(k); return { l, d, v:kn(v), on, bg: on ? '#1d1c1a' : 'transparent', tick: on ? '✓' : '', dc: late ? '#b42318' : '#6b675f', flip:() => this.setState({ cSel: on ? cs.filter(x => x!==k) : cs.concat(k), cErr:'' }) }; }),
      docs: [['fr','Factura-recibo','Pago agora'],['ft','Factura','Paga depois · prazo 8 dias']].map(([k,l,d]) => ({ l, d, on:s.cDoc===k, bg: s.cDoc===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ cDoc:k }) })),
      meios: MEIOS.map(x => Object.assign(sel(s.cMeio===x), { l:x, pick:() => this.setState({ cMeio:x }) })),
      canais: ['SMS','WhatsApp'].map(x => Object.assign(sel(s.cCh.includes(x)), { l:x, pick:() => this.setState(y => ({ cCh: y.cCh.includes(x) ? y.cCh.filter(z => z!==x) : y.cCh.concat(x) })) })),
      sum: cs.length + (cs.length===1 ? ' item' : ' itens') + ' · ' + (payNow ? s.cMeio : 'a pagar até 6 Nov'), total: kn(cTot),
      cta: (payNow ? 'Cobrar e emitir factura-recibo' : 'Emitir factura') ,
      docCount: docHist.length + ' emitidos', hist: docHist,
      nova: () => this.setState({ cRes:null, cSel:null }),
      reenviar: () => this.setState(x => ({ cRes:Object.assign({}, x.cRes, { again:'Reenviado ✓' }) })),
      submit: () => { if (!cs.length) return this.setState({ cErr:'Escolhe pelo menos um item.' });
        const pref = payNow ? 'FR' : 'FT', doc = pref + ' TAL/2026/' + (payNow ? s.seqN : '0089'), first = cm[0].split(' ')[0];
        const sms = 'MWANGOLÉ FIT: Olá ' + first + ', ' + (payNow ? 'recebemos ' + kn(cTot) + ' Kz. Factura-recibo ' : 'tens a factura ') + doc + (payNow ? '' : ' de ' + kn(cTot) + ' Kz para pagar até 6 Nov. Paga no Multicaixa Express ou na recepção') + '. Ver: muntu.ao/f/3HT9';
        this.setState(x => ({ seqN: payNow ? x.seqN+1 : x.seqN, cErr:'',
          cRes:{ title: payNow ? 'Pago e enviado' : 'Factura emitida e enviada', doc, n:cm[0], v:kn(cTot), meio: payNow ? x.cMeio : 'Por pagar', tel: cm[2] + ' · ' + chLabel, sms, again:'Reenviar SMS' },
          docs:[{ doc, n:cm[0], h:'Agora', v:kn(cTot), st: payNow ? 'SMS entregue' : 'Por pagar · SMS entregue', c: payNow ? '#2e7d4f' : '#7a5800' }].concat(x.docs),
          cob: (cm[3]==='divida' && payNow) ? Object.assign({}, x.cob, { c3:true }) : x.cob })); } };
    // actividades
    const ACT0 = [['a1','desafio','30 dias de mobilidade','4 Nov – 4 Dez · Talatona','Meta 20 sessões','Leonor Paím','pt','pendente'],
      ['a2','aula','Funcional ao ar livre','Sábados · 07:00 · Talatona','20 vagas','Nuno Sebastião','pt','pendente'],
      ['a3','desafio','Desafio de força','Até 15 Dez · Todas as filiais','Meta 3 avaliações','Nuno Sebastião','pt','aprovado'],
      ['a4','desafio','Novembro sem falhas','1–30 Nov · Todas as filiais','Meta 20 treinos','Paulo Neto','dono','publicado'],
      ['a5','evento','Corrida da Marginal','Sáb 9 Nov · 07:00 · Marginal','40 vagas','Paulo Neto','dono','publicado'],
      ['a6','aula','Kettlebell iniciação','Quintas · 19:00 · Kilamba','12 vagas','Nuno Sebastião','pt','recusado']]
      .map(([id,tipo,t,when,meta,by,br,st]) => ({ id,tipo,t,when,meta,by,br,st }));
    const acts = s.acts || ACT0;
    const ACS = { pendente:['A aguardar aprovação','#7a5800','#f5ecd0'], aprovado:['Publicado','#2e7d4f','#e3efe6'], publicado:['Publicado','#2e7d4f','#e3efe6'], recusado:['Recusado','#b42318','#f7e1de'] };
    const TL = { aula:'Aula', desafio:'Desafio', evento:'Evento' };
    const setSt = (id, st) => this.setState(x => ({ acts:(x.acts || ACT0).map(a => a.id===id ? Object.assign({}, a, { st }) : a), acMsg: st==='aprovado' ? 'Aprovado. Já aparece aos membros em Actividades.' : 'Recusado. O PT foi avisado.', acKind: st }));
    const isPT = role === 'pt', me = isPT ? 'Nuno Sebastião' : 'Paulo Neto';
    const mine = isPT ? acts.filter(a => a.by===me) : acts;
    const row = a => ({ tipo:TL[a.tipo], t:a.t, when:a.when, meta:a.meta, by:a.by, s:{ l:ACS[a.st][0], c:ACS[a.st][1], bg:ACS[a.st][2] }, canApprove: role==='dono' && a.st==='pendente', yes:() => setSt(a.id,'aprovado'), no:() => setSt(a.id,'recusado') });
    const pend = mine.filter(a => a.st==='pendente').map(row), pub = mine.filter(a => a.st==='aprovado'||a.st==='publicado').map(row), rec = mine.filter(a => a.st==='recusado').map(row);
    const allPend = acts.filter(a => a.st==='pendente').map(row);
    const ac = { pend: role==='dono' ? allPend : pend, pub, rec, pendN: (role==='dono' ? allPend : pend).length + '', pubN: pub.length+'', recN: rec.length+'',
      pendEmpty: !(role==='dono' ? allPend : pend).length, pubEmpty: !pub.length, recEmpty: !rec.length, pendN0: allPend.length > 0,
      msg: s.acMsg, msgBg: s.acKind==='recusado' ? '#f7e1de' : s.acKind==='pendente' ? '#f5ecd0' : '#e3efe6', msgC: s.acKind==='recusado' ? '#b42318' : s.acKind==='pendente' ? '#7a5800' : '#2e7d4f' };
    const xDes = s.xTipo==='desafio';
    const fmtD = v => { if (!v) return ''; const [y,mo,d] = v.split('-'); return +d + ' ' + ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][+mo-1]; };
    const x1 = { kicker: isPT ? 'Proposta · vai para aprovação do dono' : 'Publica directamente aos membros', t:s.xT, d:s.xD, ini:s.xIni, fim:s.xFim, hora:s.xHora, cap:s.xCap, unit:s.xUnit, premio:s.xPremio, err:s.xErr,
      isDes:xDes, notDes:!xDes, iniL: xDes ? 'Início' : s.xTipo==='aula' ? 'Primeira aula' : 'Data', fimL: xDes ? 'Fim' : s.xTipo==='aula' ? 'Última aula' : 'Termina',
      ph: { aula:'Ex. Treino funcional ao ar livre', desafio:'Ex. 30 dias de mobilidade', evento:'Ex. Corrida da Marginal' }[s.xTipo],
      tipos: [['aula','Aula'],['desafio','Desafio'],['evento','Evento']].map(([k,l]) => ({ l, on:s.xTipo===k, bg: s.xTipo===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ xTipo:k, xErr:'' }) })),
      horas: ['06:30','07:00','07:30','12:00','18:00','19:00','20:00'], units: ['treinos','check-ins','sessões','avaliações'],
      fils: ['Talatona','Kilamba','Maianga','Todas'].map(f => Object.assign(sel(s.xFil===f), { l:f, pick:() => this.setState({ xFil:f }) })),
      note: isPT ? 'Fica pendente até o dono aprovar em Aprovações. Só depois aparece aos membros.' : 'Publicada de imediato. Os membros da filial recebem notificação na app.',
      noteBg: isPT ? '#f5ecd0' : '#ebe6d6', cta: isPT ? 'Enviar para aprovação' : 'Publicar',
      setT: e => this.setState({ xT:e.target.value, xErr:'' }), setD: e => this.setState({ xD:e.target.value }), setIni: e => this.setState({ xIni:e.target.value }), setFim: e => this.setState({ xFim:e.target.value }),
      setHora: e => this.setState({ xHora:e.target.value }), setCap: e => this.setState({ xCap:e.target.value.replace(/\D/g,'') }), setUnit: e => this.setState({ xUnit:e.target.value }), setPremio: e => this.setState({ xPremio:e.target.value }),
      submit: () => { if (s.xT.trim().length < 4) return this.setState({ xErr:'Dá um título à actividade.' }); if (!s.xCap) return this.setState({ xErr: xDes ? 'Indica a meta.' : 'Indica o número de vagas.' });
        const when = (xDes ? fmtD(s.xIni) + ' – ' + fmtD(s.xFim) : fmtD(s.xIni) + ' · ' + s.xHora) + ' · ' + (s.xFil==='Todas' ? 'Todas as filiais' : s.xFil);
        const a = { id:'n'+Date.now(), tipo:s.xTipo, t:s.xT.trim(), when, meta: xDes ? 'Meta ' + s.xCap + ' ' + s.xUnit : s.xCap + ' vagas', by:me, br:role, st: isPT ? 'pendente' : 'publicado' };
        this.setState(x => ({ acts:[a].concat(x.acts || ACT0), xT:'', xD:'', xPremio:'', xErr:'', sc: isPT ? 'p3' : 'o7', role,
          acMsg: isPT ? '"' + a.t + '" enviada ao dono. Recebes aviso quando for aprovada.' : '"' + a.t + '" publicada. Já aparece aos membros.', acKind: isPT ? 'pendente' : 'publicado' })); } };
    // recuperação
    const MOT_R = ['Viagem','Lesão','Insatisfação','Falta de tempo','Outro'], RES_R = ['Sem resposta','Vai voltar','Voltou','Cancelou'];
    const MOT_N = ['Preço','Mudou de zona','Falta de tempo','Insatisfação','Outro'], RES_N = ['Renovou','Vai renovar','Não renova','Sem resposta'];
    const RISK = [['k1','Edson Mateus','Local Mensal',12,'frequência −60%','Celma Bento','rececao'],['k2','Joana Kiala','Híbrido',9,'frequência −45%','Nuno Sebastião','pt'],['k3','Bruno Lopes','Rede Mensal',16,'frequência −80%','Celma Bento','rececao'],
      ['k4','Sara Domingos','Local Mensal',23,'sem entradas','Teresa Lunda','rececao'],['k5','Hélder Pinto','Rede Mensal',31,'sem entradas','Leonor Paím','pt'],['k6','Marta Neto','Local Mensal',8,'frequência −50%','Nuno Sebastião','pt']];
    const REN = [['n1','Ana Domingos','Rede Mensal',3,45000,'Sem atrasos',0],['n2','Joana Kiala','Híbrido',3,38000,'1 atraso em 6 meses',0],['n3','Celso Pedro','Rede Mensal',6,45000,'3 atrasos em 6 meses',1],['n4','Luísa Tomás','Híbrido',11,38000,'Sem atrasos',0],['n5','Paulo Jorge','Local Mensal',14,30000,'2 atrasos em 6 meses',1]];
    const GOOD = { 'Voltou':1, 'Vai voltar':1, 'Renovou':1, 'Vai renovar':1 };
    const mineK = r => role==='dono' || (role==='pt' ? r[6]==='pt' && r[5]==='Nuno Sebastião' : r[6]==='rececao');
    const kRow = (id, motivos, results) => { const open = s.kOpen===id, d = s.kDone[id];
      return { open, todo: !d, done: !!d, s: d ? (GOOD[d.r] ? { l:d.r, c:'#2e7d4f', bg:'#e3efe6' } : { l:d.r, c:'#55524b', bg:'#ebe6d6' }) : st('normal'),
        toggle: () => this.setState({ kOpen: open ? null : id, kMot:'', kRes:'' }), close: () => this.setState({ kOpen:null }),
        motivos: motivos.map(x => Object.assign(sel(s.kMot===x), { l:x, pick:() => this.setState({ kMot:x }) })),
        results: results.map(x => Object.assign(sel(s.kRes===x), { l:x, pick:() => this.setState({ kRes:x }) })),
        save: () => s.kRes && this.setState(x => ({ kOpen:null, kDone:Object.assign({}, x.kDone, { [id]:{ r:x.kRes, m:x.kMot } }) })) }; };
    const riskL = RISK.filter(mineK).filter(r => r[3] >= s.kLim).map(r => Object.assign({ n:r[1], plan:r[2], days:r[3], freq:r[4], resp: r[5].split(' ')[0] + ' (' + (r[6]==='pt' ? 'PT' : 'recepção') + ')' }, kRow(r[0], MOT_R, RES_R)));
    const renL = (role==='pt' ? [] : REN).filter(r => r[3] <= s.kRLim).map(r => Object.assign({ n:r[1], plan:r[2], days:r[3], v:kn(r[4]), hist:r[5], hc: r[6] ? '#b42318' : '#6b675f', canCharge: role==='rececao', cobrar:() => this.setState({ sc:'r4', role:'rececao', cMem:'MS', cSel:null, cRes:null }) }, kRow(r[0], MOT_N, RES_N)));
    const recCount = 9 + Object.values(s.kDone).filter(d => GOOD[d.r]).length;
    const todoN = RISK.filter(mineK).filter(r => !s.kDone[r[0]]).length + (role==='pt' ? 0 : REN.filter(r => r[3] <= 7 && !s.kDone[r[0]]).length);
    const k1 = { kicker: { rececao:'Recepção · Talatona', pt:'Os teus clientes', dono:'Toda a rede' }[role] || 'Talatona', isRisk: s.kTab==='risk', isRen: s.kTab==='ren', todoN, excl: 4,
      recKz: kn(312000 + Object.entries(s.kDone).filter(([id,d]) => d.r==='Renovou').reduce((a,[id]) => a + (REN.find(r => r[0]===id) || [0,0,0,0,0])[4], 0)), recSub: recCount + ' membros voltaram ou renovaram · de 23 contactados',
      tabs: [['risk','Em risco', RISK.filter(mineK).length],['ren','Renovações', role==='pt' ? 0 : REN.length]].filter(t => role!=='pt' || t[0]==='risk').map(([k,l,n]) => ({ l, n, on:s.kTab===k, bg: s.kTab===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ kTab:k }) })),
      lims: [7,14,30].map(v => Object.assign(sel(s.kLim===v), { l: v+' dias', pick:() => this.setState({ kLim:v }) })),
      rlims: [3,7,15].map(v => Object.assign(sel(s.kRLim===v), { l: v+' dias', pick:() => this.setState({ kRLim:v }) })),
      risk: riskL, riskEmpty: !riskL.length, ren: renL };
    // passagem de turno
    const cashExp = 108000, cashN = parseInt(String(s.cash).replace(/\D/g,''),10);
    const hasCash = !isNaN(cashN), dif = hasCash ? cashN - cashExp : 0;
    const OCC0 = [['avaria','Catraca 2 em manutenção','Reportado às 07:10 · técnico chega às 11:00'],['reclam','Ar condicionado da sala 2 fraco','Reclamação de Ana Domingos · 08:30']];
    const OST = { avaria:{ l:'Avaria', c:'#b42318', bg:'#f7e1de' }, reclam:{ l:'Reclamação', c:'#7a5800', bg:'#f5ecd0' }, nota:{ l:'Nota', c:'#55524b', bg:'#ebe6d6' } };
    const e3 = { kicker: (role==='financas' ? 'Rede' : 'Talatona') + ' · Manhã · 06:58–14:00', form: s.hSt==='form', waiting: s.hSt==='wait', done: s.hSt==='done', to:s.hTo, tos:['Teresa Lunda','Rui Manuel'], err:s.hErr,
      cash:s.cash, setCash: e => this.setState({ cash:e.target.value, hErr:'' }), cashExp: kn(cashExp),
      digital: [['TPA',22000],['Multicaixa Express',64500],['Transferência',10000]].map(([l,v]) => ({ l, v:kn(v) })),
      dif: hasCash ? (dif>0?'+':dif<0?'−':'') + kn(Math.abs(dif)) + ' Kz' : 'Conte o dinheiro', difBg: !hasCash ? '#ebe6d6' : dif===0 ? '#e3efe6' : '#f7e1de', difC: !hasCash ? '#55524b' : dif===0 ? '#2e7d4f' : '#b42318',
      needJust: hasCash && dif!==0, just:s.just, setJust: e => this.setState({ just:e.target.value, hErr:'' }),
      pend: [['2 cobranças por fazer','Mário Sebastião · Celso Pedro'],['1 factura por emitir','Bar · venda #1094 · 3 500 Kz']].map(([t,d]) => ({ t,d })),
      occ: OCC0.map(([k,t,d]) => ({ s:OST[k], t, d })).concat(s.occX.map(t => ({ s:OST.nota, t, d:'Agora · ' + ROLE[1] }))),
      occText:s.occT, setOcc: e => this.setState({ occT:e.target.value }), addOcc: () => s.occT.trim() && this.setState(x => ({ occX:x.occX.concat(x.occT.trim()), occT:'' })),
      setTo: e => this.setState({ hTo:e.target.value }),
      doneMsg: 'Confirmado por ' + s.hTo + ' às 14:02.' + (hasCash && dif!==0 ? ' A diferença de ' + kn(Math.abs(dif)) + ' Kz fica no turno de ' + ROLE[1] + ', com a justificação, e vai para aprovação do dono.' : ' Sem diferenças.'),
      submit: () => { if (!hasCash) return this.setState({ hErr:'Conte o dinheiro em caixa antes de entregar.' }); if (dif!==0 && s.just.trim().length < 5) return this.setState({ hErr:'Há diferença. Escreva a justificação.' });
        this.setState({ hSt:'wait', hErr:'' }); clearTimeout(this.t3); this.t3 = setTimeout(() => this.setState({ hSt:'done', onShift:false }), 2500); } };
    // receitas perdidas
    const LOST = [['l1','Desconto','Desconto de 25% acima do limite de 10%',14000,'Talatona · inscrição #4822','Celma Bento','pot','Pedir justificação'],
      ['l2','Pagamento','30 000 Kz recebidos sem inscrição associada',30000,'Kilamba · TPA 09:14','Rui Manuel','pot','Associar a membro'],
      ['l3','Estorno','Estorno sem documento de suporte',30000,'Talatona · NC 0031','Celma Bento','pot','Pedir documento'],
      ['l4','Sessões PT','3 sessões dadas sem pacote cobrado',24000,'Talatona','Nuno Sebastião','pot','Cobrar ao membro'],
      ['l5','Acesso','O mesmo QR usado 3 vezes em 10 minutos',0,'Talatona · catraca 1','—','pot','Rever entradas'],
      ['l6','Mensalidades','14 mensalidades vencidas há mais de 30 dias',135000,'Rede','Jorge Afonso','conf','Enviar cobrança'],
      ['l7','Caixa','Diferença de caixa por justificar',8000,'Kilamba · tarde 27/10','Rui Manuel','conf','Pedir justificação'],
      ['l8','Desconto','Desconto de 15% sem aprovação',6000,'Maianga · 21/10','Teresa Lunda','res','']];
    const lst = l => s.lSt[l[0]] || l[6];
    const sum = k => LOST.filter(l => lst(l)===k).reduce((a,l) => a+l[3],0);
    const o8l = LOST.filter(l => lst(l)===s.o8Tab).map(l => { const sent = !!s.lSent[l[0]]; return { cat:l[1], t:l[2], v: l[3] ? kn(l[3]) + ' Kz' : 'Sem valor', o:l[4], r:l[5], open: lst(l)!=='res', canConf: lst(l)==='pot', a:l[7], sent, op: sent ? .35 : 1,
      sentMsg: 'Pedido enviado a ' + l[5].split(' ')[0] + ' · aguarda resposta', act:() => this.setState(x => ({ lSent:Object.assign({}, x.lSent, { [l[0]]:true }) })),
      conf:() => this.setState(x => ({ lSt:Object.assign({}, x.lSt, { [l[0]]:'conf' }) })), res:() => this.setState(x => ({ lSt:Object.assign({}, x.lSt, { [l[0]]:'res' }) })) }; });
    const o8 = { potKz: kn(sum('pot') + sum('conf')), list:o8l, empty:!o8l.length,
      kpis: [[kn(sum('pot')),'Por rever','#1d1c1a'],[kn(sum('conf')),'Confirmado','#b42318'],[kn(sum('res')),'Resolvido','#2e7d4f']].map(([v,l,c]) => ({ v,l,c })),
      tabs: [['pot','Por rever'],['conf','Confirmadas'],['res','Resolvidas']].map(([k,l]) => ({ l, n: LOST.filter(x => lst(x)===k).length, on:s.o8Tab===k, bg: s.o8Tab===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ o8Tab:k }) })) };
    // serviços incluídos
    const inc = [['Sessões de PT','5 de 8','3 por usar · expiram a 13 Nov',62,'#1d1c1a','#6b675f','Marcar','m7'],['Reposição de sessão','1 por repor','Cancelada pelo treinador a 22 Out',0,'#c8640c','#b42318','Marcar','m7'],['Avaliação física','0 de 1','Incluída no plano · ainda por marcar',0,'#1d1c1a','#6b675f','Marcar',''],['Aulas de grupo','Ilimitadas','6 este mês',100,'#d9d4c4','#6b675f','','']]
      .map(([l,v,d,w,c,dc,a,go]) => ({ l,v,d, w: w+'%', c, dc, a, hasA: !!a, act:() => go ? this.go(go) : this.setState({ sc:'m3', m3tab:'aulas' }) }));
    // onboarding
    const ob0 = s.ob, setOb = o => this.setState(x => ({ ob:Object.assign({}, x.ob, o), obErr:'' }));
    const stepN = { a1:1, a2:2, a3:3, a4:4, a5:5 }[sc] || 1, onb = !s.imOwner;
    const KIND = [['mem','Membros','Nome, telefone, plano e data de fim','membros_' ,'1 243 linhas',[['Nome',1],['Telefone',1],['Plano',1],['Data de fim',1],['NIF',1],['Notas',0]],1214,23,6,[['118','Joana K.','Telefone com 8 dígitos'],['402','—','Nome em falta'],['977','Rui Pinto','Plano “Promo 2023” não existe']]],
      ['stf','Funcionários','Nome, telefone e função','equipa_','9 linhas',[['Nome',1],['Telefone',1],['Função',1],['Filial',1]],9,0,0,[]]];
    const slug = (ob0.gym || 'ginasio').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'_');
    const im = { err: s.imErr.own, cta: s.imDone ? 'Importado ✓' : 'Confirmar importação',
      confirm: () => { if (!Object.keys(s.imL).length) return this.setState({ imErr:{ own:'Carrega pelo menos uma planilha.' } }); this.setState({ imDone:true, imErr:{} }); },
      kinds: KIND.map(([k,l,d,f,lines,cols,ok,dup,bad,errs]) => { const ld = !!s.imL[k], mg = !!s.imMerge[k], showE = s.imErr[k] === 'open';
        return { l, d, empty:!ld, loaded:ld, ph:'Arrasta ou escolhe · .xlsx · .csv', bd: ld ? '#1d1c1a' : '#e4e0d6', bg: ld ? '#fff' : 'transparent', file: f + slug + '.xlsx · ' + lines,
          load:() => this.setState(x => ({ imL:Object.assign({}, x.imL, { [k]:true }) })),
          cols: cols.map(([n,ok2]) => ({ l: n + (ok2 ? ' ✓' : ' · ignorar'), bg: ok2 ? '#e3efe6' : '#ebe6d6', c: ok2 ? '#2e7d4f' : '#6b675f' })),
          res: [[kn(ok + (mg ? dup : 0)),'Válidos','#2e7d4f'],[dup+'','Duplicados', dup ? '#7a5800' : '#55524b'],[bad+'','Com erro', bad ? '#b42318' : '#55524b']].map(([v,l2,c]) => ({ v, l:l2, c })),
          mergeOn: mg, mergeBg: mg ? '#1d1c1a' : 'transparent', mergeTick: mg ? '✓' : '', merge:() => this.setState(x => ({ imMerge:Object.assign({}, x.imMerge, { [k]: !x.imMerge[k] }) })),
          errL: bad ? (showE ? 'Ocultar erros' : 'Ver ' + bad + ' erros · ficam de fora') : 'Sem erros', showErr: showE && !!bad, errs: errs.map(([l2,n,p]) => ({ l:l2, n, p })),
          toggleErr:() => bad && this.setState(x => ({ imErr:Object.assign({}, x.imErr, { [k]: x.imErr[k]==='open' ? '' : 'open' }) })) }; }) };
    const memN = s.imL.mem ? 1214 + (s.imMerge.mem ? 23 : 0) : 0, stfN = s.imL.stf ? 9 : 0;
    const smDefault = (ob0.gym || 'O teu ginásio').toUpperCase() + ' está agora na MUNTU. Entra na app com o teu número e a senha temporária {senha}: muntu.ao/app';
    const smText = s.smText == null ? smDefault : s.smText, smTot = (s.smAud.mem ? memN : 0) + (s.smAud.stf ? stfN : 0);
    const pv = smText.replace('{senha}','KM-4821').replace('{nome}','Kátia');
    const sm = { form: s.smSt==='form', sending: s.smSt==='sending', done: s.smSt==='done', text: smText, setText: e => this.setState({ smText:e.target.value }), pvName:'Kátia Muondo', preview: pv,
      chars: pv.length + ' caracteres · ' + (pv.length > 160 ? '2 SMS por pessoa' : '1 SMS por pessoa'),
      aud: [['mem','Membros', memN ? kn(memN) + ' com telefone válido' : 'Nenhum importado'],['stf','Funcionários', stfN ? stfN + ' pessoas' : 'Nenhum importado']].map(([k,l,d]) => ({ l, d, on: !!s.smAud[k], bg: s.smAud[k] ? '#1d1c1a' : 'transparent', tick: s.smAud[k] ? '✓' : '', flip:() => this.setState(x => ({ smAud:Object.assign({}, x.smAud, { [k]: !x.smAud[k] }) })) })),
      when: [['now','Enviar agora'],['tom','Amanhã · 09:00']].map(([k,l]) => Object.assign(sel(s.smWhen===k), { l, pick:() => this.setState({ smWhen:k }) })),
      total: kn(smTot), saldo: 'Incluídas 2 000 SMS no arranque · restam ' + kn(Math.max(0, 2000 - smTot)), sent: kn(s.smSent), pct: (smTot ? Math.round(s.smSent/smTot*100) : 0) + '%',
      cta: smTot ? (s.smWhen==='now' ? 'Enviar a ' + kn(smTot) + ' pessoas' : 'Agendar para amanhã') : 'Ninguém seleccionado',
      doneMsg: s.smWhen==='now' ? kn(Math.max(0, smTot - 8)) + ' entregues. Cada pessoa já pode entrar na app.' : 'Agendado para amanhã às 09:00 · ' + kn(smTot) + ' pessoas.',
      failMsg: s.smRetry ? '8 reenviadas · 3 entregues' : (s.smWhen==='now' ? '8 falharam · número inválido' : 'Podes cancelar até lá'), retryL: s.smRetry ? '' : (s.smWhen==='now' ? 'Reenviar' : 'Cancelar'),
      retry:() => this.setState({ smRetry:true }),
      send:() => { if (!smTot) return; if (s.smWhen!=='now') return this.setState({ smSt:'done' }); this.setState({ smSt:'sending', smSent:0 }); clearInterval(this.t4); this.t4 = setInterval(() => { const n = Math.min(smTot, this.state.smSent + Math.ceil(smTot/8)); this.setState({ smSent:n }); if (n >= smTot) { clearInterval(this.t4); this.setState({ smSt:'done' }); } }, 300); } };
    const NEXT = { a1:'a2', a2:'a3', a3:'a4', a4:'a5' }, PREV = { a2:'a1', a3:'a2', a4:'a3', a5:'a4' };
    const ob = { nome:ob0.nome, tel:ob0.tel, email:ob0.email, pw:ob0.pw, gym:ob0.gym, nif:ob0.nif, city:ob0.city, ok:ob0.ok, err:s.obErr, onb, own: !onb,
      cities:['Luanda','Benguela','Huambo','Lobito','Lubango','Cabinda'],
      setNome:e => setOb({ nome:e.target.value }), setTel:e => setOb({ tel:e.target.value }), setEmail:e => setOb({ email:e.target.value }), setPw:e => setOb({ pw:e.target.value }),
      setGym:e => setOb({ gym:e.target.value }), setNif:e => setOb({ nif:e.target.value }), setCity:e => setOb({ city:e.target.value }),
      fils: ob0.fils.map((v,i) => ({ v, n: String(i+1).padStart(2,'0'), canDel: ob0.fils.length > 1, set:e => setOb({ fils: ob0.fils.map((x,j) => j===i ? e.target.value : x) }), del:() => setOb({ fils: ob0.fils.filter((x,j) => j!==i) }) })),
      filN: ob0.fils.length + (ob0.fils.length===1 ? ' filial' : ' filiais'), addFil:() => setOb({ fils: ob0.fils.concat('') }),
      steps: ['Conta','Ginásio','Importar','Confirmar','Avisar'].map((l,i) => ({ l, c: i+1 < stepN ? '#1d1c1a' : i+1===stepN ? '#c8640c' : '#e4e0d6' })),
      stepLabel: 'Passo ' + stepN + ' de 5 · ' + ['Responsável','Ginásio e filiais','Importar dados','Confirmar dados','Enviar credenciais'][stepN-1],
      backL: stepN===1 ? 'Entrar' : 'Voltar', back:() => this.setState({ sc: PREV[sc] || 'l1', role:null, obErr:'' }),
      cta: { a1:'Continuar', a2:'Continuar', a3: Object.keys(s.imL).length ? 'Rever e confirmar' : 'Continuar sem importar', a4:'Confirmar dados' }[sc] || 'Continuar',
      summary: [['Ginásio', (ob0.gym||'—') + ' · NIF ' + (ob0.nif||'—'), ob0.city,'#1d1c1a'],['Filiais', ob0.fils.filter(Boolean).join(', ') || '—', ob0.fils.filter(Boolean).length+'','#1d1c1a'],['Membros a importar', s.imL.mem ? (s.imMerge.mem ? '23 duplicados fundidos' : '23 duplicados por rever') : 'Sem importação', kn(memN),'#1d1c1a'],['Funcionários', s.imL.stf ? 'Recebem acesso pela função' : 'Sem importação', stfN+'','#1d1c1a'],['Linhas com erro', s.imL.mem ? 'Ficam de fora · corriges depois' : '—', s.imL.mem ? '6' : '0', s.imL.mem ? '#b42318' : '#1d1c1a']].map(([l,d,v,c]) => ({ l,d,v,c })),
      plans: s.imL.mem ? [['Local Mensal',30000,412],['Rede Mensal',45000,286],['Híbrido',38000,516]].map(([n,v,mm]) => ({ n, v:kn(v), m:mm })) : [['Ainda sem planos','—','0']].map(([n,v,mm]) => ({ n, v, m:mm })),
      okBg: ob0.ok ? '#1d1c1a' : 'transparent', okTick: ob0.ok ? '✓' : '', flipOk:() => setOb({ ok: !ob0.ok }),
      next:() => { if (sc==='a1') { if (ob0.nome.trim().split(/\s+/).length < 2) return this.setState({ obErr:'Indica o nome e o apelido.' }); if (ob0.tel.replace(/\D/g,'').length !== 9) return this.setState({ obErr:'O telemóvel tem 9 dígitos.' }); if (ob0.pw.length < 8) return this.setState({ obErr:'A senha tem pelo menos 8 caracteres.' }); }
        if (sc==='a2') { if (ob0.gym.trim().length < 3) return this.setState({ obErr:'Indica o nome do ginásio.' }); if (!ob0.fils.some(f => f.trim())) return this.setState({ obErr:'Junta pelo menos uma filial.' }); }
        if (sc==='a4' && !ob0.ok) return this.setState({ obErr:'Confirma os dados para continuar.' });
        this.setState({ sc: NEXT[sc], role:'dono', obErr:'' }); },
      finish:() => this.setState({ sc:'o1', role:'dono' }) };
    // nova filial
    const NFX = [['planos','Planos e preços','5 planos'],['horarios','Horários e turnos','Manhã 06–14 · Tarde 14–22'],['regras','Regras de aprovação','Limites de desconto, estornos, despesas'],['perm','Permissões da equipa','Recepção, finanças e PT'],['avisos','Avisos automáticos','12 SMS da jornada do membro']];
    const nf = { form:!s.nfDone, done:s.nfDone, n:s.nfN, c:s.nfC, from:s.nfFrom, err:s.nfErr,
      setN:e => this.setState({ nfN:e.target.value, nfErr:'' }), setC:e => this.setState({ nfC:e.target.value }), setFrom:e => this.setState({ nfFrom:e.target.value }),
      items: NFX.map(([k,l,d]) => ({ l, d, on:!!s.nfX[k], bg: s.nfX[k] ? '#1d1c1a' : 'transparent', tick: s.nfX[k] ? '✓' : '', flip:() => this.setState(x => ({ nfX:Object.assign({}, x.nfX, { [k]: !x.nfX[k] }) })) })),
      team: ['Celma Bento','Teresa Lunda','Rui Manuel','Hélio Matias'].map(n => Object.assign(sel(s.nfTeam.includes(n)), { l: n.split(' ')[0], pick:() => this.setState(x => ({ nfTeam: x.nfTeam.includes(n) ? x.nfTeam.filter(y => y!==n) : x.nfTeam.concat(n) })) })),
      doneMsg: 'Filial ' + (s.nfN || 'nova') + ' criada a partir de ' + s.nfFrom + '. Copiado: ' + NFX.filter(x => s.nfX[x[0]]).map(x => x[1].toLowerCase()).join(', ') + '. Equipa: ' + (s.nfTeam.join(', ') || 'por atribuir') + '.',
      create:() => { if (s.nfN.trim().length < 3) return this.setState({ nfErr:'Dá um nome à filial.' }); this.setState({ nfDone:true }); } };
    // comparador
    const MET = { ret:['Retenção',[['Talatona',82],['Kilamba',74],['Maianga',69]],'%','Membros activos a 1 Ago que continuam activos.'], rec:['Receita',[['Talatona',3588000],['Kilamba',2136000],['Maianga',1182000]],'kz','Recebido, não facturado.'], cus:['Custos',[['Talatona',1420000],['Kilamba',980000],['Maianga',610000]],'kz','Salários, renda, manutenção e SMS.'], ocu:['Ocupação',[['Talatona',71],['Kilamba',64],['Maianga',58]],'%','Média nas horas de abertura, por check-in.'], pt:['PT',[['Talatona',78],['Kilamba',61],['Maianga',40]],'%','Horas de PT ocupadas sobre as disponíveis.'] };
    const mk = s.cmpM || 'ret', MM = MET[mk], mx = Math.max(...MM[1].map(x => x[1]));
    const cmp = { metrics: Object.keys(MET).map(k => Object.assign(sel(mk===k), { l: MET[k][0], pick:() => this.setState({ cmpM:k }) })),
      bars: MM[1].map(([n,v],i) => ({ n, v: MM[2]==='%' ? v+'%' : (v/1e6).toFixed(2).replace('.',',') + ' M', w: Math.round(v/mx*100)+'%', c: i===0 ? '#1d1c1a' : '#8a867d' })), note: 'Mesmos critérios em todas as filiais. ' + MM[3] };
    // cofre
    const DOCS = [['Contrato de arrendamento','Contratos','Talatona','Jan 2024','Conservar até 2034','Dono','pdf',0],['Licença de actividade','Licenças','Kilamba','Nov 2025','Expira em 21 dias · renovar','Dono · Finanças','pdf',1],['Factura · manutenção passadeiras','Manutenção','Talatona','12 Out','Conservar até 2036','Dono · Finanças','pdf',0],['Comprovativo · renda Outubro','Comprovativos','Maianga','01 Out','Conservar até 2036','Finanças','jpg',0],['Contrato · Nuno Sebastião','Contratos','Rede','Mar 2025','Enquanto activo + 5 anos','Dono','pdf',0],['Seguro de responsabilidade','Licenças','Rede','Fev 2026','Válido até Fev 2027','Dono','pdf',0]];
    const allDocs = Array.from({ length:s.cfExtra }, (_,i) => ['Documento carregado ' + (i+1),'Comprovativos','Talatona','Agora','Conservar até 2036','Dono · Finanças','pdf',0]).concat(DOCS);
    const cf = { total: allDocs.length, alert: 'Licença de actividade da Kilamba expira em 21 dias.',
      cats: ['Todos','Contratos','Comprovativos','Manutenção','Licenças'].map(c => Object.assign(sel(s.cfCat===c), { l:c, pick:() => this.setState({ cfCat:c }) })),
      list: allDocs.filter(d => s.cfCat==='Todos' || d[1]===s.cfCat).map(([n,cat,f,dt,keep,perm,ext,al]) => ({ n,cat,f,dt,keep,perm, ext:ext.toUpperCase(), kc: al ? '#b42318' : '#6b675f' })),
      upload:() => this.setState(x => ({ cfExtra:x.cfExtra+1, cfCat:'Todos' })) };
    // regras
    const V = s.rgV, stepV = (k, d, min, max) => () => this.setState(x => ({ rgV:Object.assign({}, x.rgV, { [k]: Math.min(max, Math.max(min, x.rgV[k] + d)) }), rgSaved:false }));
    const pc = v => v + '%', kz2 = v => v ? kn(v) + ' Kz' : 'Nenhum';
    const rg = { bio:s.rgBio, bioBg: s.rgBio ? '#1d1c1a' : '#d9d4c4', bioX: s.rgBio ? 19 : 3, flipBio:() => this.setState({ rgBio:!s.rgBio, rgSaved:false }), saved:s.rgSaved, save:() => this.setState({ rgSaved:true }),
      rules: [
        { n:'Descontos', d:'Acima do limite vai para o nível seguinte', tiers:[{ who:'Recepção até', v:pc(V.dRec), edit:1, dec:stepV('dRec',-5,0,50), inc:stepV('dRec',5,0,50) },{ who:'Gestor até', v:pc(V.dGes), edit:1, dec:stepV('dGes',-5,0,100), inc:stepV('dGes',5,0,100) },{ who:'Acima disso', v:'Dono', fixed:1 }] },
        { n:'Estornos', d:'Recepção pede, nunca aprova', tiers:[{ who:'Finanças aprova até', v:kz2(V.eFin), edit:1, dec:stepV('eFin',-5000,0,100000), inc:stepV('eFin',5000,0,100000) },{ who:'Acima disso', v:'Dono', fixed:1 }] },
        { n:'Despesas', d:'Com recibo anexado', tiers:[{ who:'Finanças até', v:kz2(V.dFin), edit:1, dec:stepV('dFin',-5000,0,500000), inc:stepV('dFin',5000,0,500000) },{ who:'Acima disso', v:'Dono', fixed:1 }] },
        { n:'Alteração de preços', d:'Membros avisados por SMS 30 dias antes', tiers:[{ who:'Quem aprova', v:'Só o dono', fixed:1 }] }
      ].map(r => Object.assign(r, { tiers: r.tiers.map(t => Object.assign({ edit:false, fixed:false }, t, { edit: !!t.edit, fixed: !!t.fixed })) })) };
    // indicações
    const REW = { mes:'1 mês grátis', meio:'50% na mensalidade', kz:'10 000 Kz de crédito' };
    const ri = { short: REW[s.riRew] + ' após ' + s.riCond + (s.riCond===1 ? ' mensalidade' : ' mensalidades'),
      kpis: [['18','Inscrições por indicação · Out'],['684 000','Kz recebidos dos indicados'],['135 000','Kz em recompensas'],['5,1×','Retorno']].map(([v,l]) => ({ v,l })),
      rewards: Object.keys(REW).map(k => Object.assign(sel(s.riRew===k), { l: REW[k], pick:() => this.setState({ riRew:k }) })),
      conds: [1,2,3].map(n => Object.assign(sel(s.riCond===n), { l: n + (n===1 ? ' mensalidade' : ' mensalidades'), pick:() => this.setState({ riCond:n }) })),
      rev: [['v1','Bruno Lopes indicado por Kátia Muondo','Mesmo NIF que um ex-membro de Abril'],['v2','Sara Lopes indicada por Edson Mateus','Mesmo telefone que o indicador']].filter(v => !s.riRev[v[0]]).map(([id,t,why]) => ({ t, why, yes:() => this.setState(x => ({ riRev:Object.assign({}, x.riRev, { [id]:'ok' }) })), no:() => this.setState(x => ({ riRev:Object.assign({}, x.riRev, { [id]:'no' }) })) })),
      top: [['Kátia Muondo','4 indicações · 3 pagas',152000],['Edson Mateus','3 indicações · 2 pagas',90000],['Ana Domingos','2 indicações · 2 pagas',90000]].map(([n,d,v]) => ({ n,d,v:kn(v) })) };
    ri.hasRev = ri.rev.length > 0;
    const MI = [['Sara Domingos','Inscrita a 3 Set · 2 de 2 mensalidades pagas',2,'libertada'],['Bruno Lopes','Inscrito a 12 Out · 1 de 2 mensalidades pagas',1,'pendente'],['Hélder Pinto','Convite enviado a 20 Out · ainda não se inscreveu',0,'convite']];
    const MIS = { libertada:{ l:'Recompensa libertada', c:'#2e7d4f', bg:'#e3efe6' }, pendente:{ l:'A aguardar pagamento', c:'#7a5800', bg:'#f5ecd0' }, convite:{ l:'Convite enviado', c:'#55524b', bg:'#ebe6d6' } };
    const mi = { code:'KATIA-4822', rule: 'Ganhas ' + REW[s.riRew] + ' quando quem indicaste pagar ' + s.riCond + (s.riCond===1 ? ' mensalidade.' : ' mensalidades.'), earned:'1 mês ganho',
      copyL: s.miCopied ? 'Copiado ✓' : 'Copiar', copy:() => this.setState({ miCopied:true }), wa:() => this.setState({ miCopied:false }), sms:() => this.setState({ miCopied:false }),
      list: MI.map(([n,d,p,k]) => ({ n,d, w: Math.round(p/2*100)+'%', s:MIS[k] })) };
    // receber turno
    const DEN = [['n5000','Notas de 5 000',5000],['n2000','Notas de 2 000',2000],['n1000','Notas de 1 000',1000],['n500','Notas de 500',500],['n200','Notas de 200',200],['coin','Moedas · valor total',1]];
    const tCount = DEN.reduce((a,[k,l,v]) => a + (s.tq[k]||0)*v, 0), tExp = 85000, tDif = tCount - tExp;
    const setQ = (k, val) => this.setState(x => ({ tq:Object.assign({}, x.tq, { [k]: Math.max(0, val) }), tErr:'' }));
    const PAYS = [['tpa','TPA','Fecho do terminal às 14:00 · 6 operações',22000],['exp','Multicaixa Express','14 confirmações no extracto',64500],['ref','Referências Multicaixa','2 pagamentos',10000],['pen','Por confirmar','1 transferência · não entra na caixa',15000]];
    const PACT = { ok:['Conferido','#2e7d4f','#e3efe6'], pend:['Fica pendente','#7a5800','#f5ecd0'], prob:['Problema','#b42318','#f7e1de'] };
    const PEND = [['q1','cob','Cobrança · Mário Sebastião','30 000 Kz · 12 dias em atraso'],['q2','doc','Factura por emitir','Bar · venda #1094 · 3 500 Kz'],['q3','rec','Reclamação · ar condicionado da sala 2','Ana Domingos · aguarda resposta'],['q4','res','Reserva PT · Kátia Muondo 18:00','Confirmar com Nuno Sebastião'],['q5','oco','Catraca 2 em manutenção','Técnico chega às 15:00']];
    const PK = { cob:['Cobrança','#7a5800','#f5ecd0'], doc:['Documento','#55524b','#ebe6d6'], rec:['Reclamação','#b42318','#f7e1de'], res:['Reserva','#55524b','#ebe6d6'], oco:['Ocorrência','#b42318','#f7e1de'] };
    const PEA = { rec:['Recebido','#1d1c1a','#fbfaf7'], res:['Resolvido','#2e7d4f','#fbfaf7'], prob:['Problema','#b42318','#fbfaf7'] };
    const a3 = (cur, opts, pick) => opts.map(([k,l,c]) => ({ l, on: cur===k, bd: cur===k ? c : '#d9d4c4', bg: cur===k ? c : 'transparent', c: cur===k ? '#fbfaf7' : '#1d1c1a', pick:() => pick(k) }));
    const payDone = PAYS.every(p => s.tPay[p[0]]), pendDone = PEND.every(p => s.tPend[p[0]]), cashDone = s.tRev && (tDif===0 || (s.tOpt && s.tOpt!=='recount'));
    const tStep = { t1:1, t2:2, t3:3, t4:4 }[sc] || 0;
    const giverOk = !s.tExc;
    const tv = { steps: ['Dinheiro','Pagamentos','Pendências','Confirmar'].map((l,i) => ({ l, c: i+1 < tStep ? '#1d1c1a' : i+1===tStep ? '#c8640c' : '#e4e0d6' })),
      stepLabel: 'Passo ' + tStep + ' de 4 · ' + (['','Contar dinheiro','Outros meios de pagamento','Rever pendências','Assinar a passagem'][tStep]),
      backL: tStep===1 ? 'Resumo' : 'Voltar', back:() => this.setState({ sc: ['t0','t0','t1','t2','t3'][tStep], role:'rececao', tErr:'' }),
      giverSt: s.tExc ? 'já saiu' : 'confirmou às 14:01',
      tiles: [['Caixa', cashDone ? (tDif===0 ? 'Conferido' : 'Com ressalva') : 'Por conferir', cashDone ? (tDif===0 ? '#2e7d4f' : '#7a5800') : '#1d1c1a'],['Pagamentos', payDone ? 'Conferidos' : 'Por conferir', payDone ? '#2e7d4f' : '#1d1c1a'],['Pendências', pendDone ? 'Revistas' : (PEND.length - Object.keys(s.tPend).length) + ' por rever', pendDone ? '#2e7d4f' : '#1d1c1a'],['Ocorrências','1 registada','#1d1c1a']].map(([l,v,c]) => ({ l,v,c })),
      startL: (s.tRev || Object.keys(s.tPay).length || Object.keys(s.tPend).length) ? 'Continuar conferência' : 'Iniciar conferência',
      start:() => this.setState({ sc: !cashDone ? 't1' : !payDone ? 't2' : !pendDone ? 't3' : 't4', role:'rececao' }),
      excL: s.tExc ? 'Recebimento sem conferência conjunta' : 'A Celma já saiu?', excA: s.tExc ? 'Anular' : 'Receber sem ela →', flipExc:() => this.setState({ tExc: !s.tExc }),
      hidden: !s.tRev, revealed: s.tRev, counted: kn(tCount), expected: kn(tExp),
      formula: '20 000 inicial + 68 000 entradas em dinheiro − 0 reembolsos − 3 000 saídas autorizadas',
      dif: (tDif>0?'+':tDif<0?'−':'') + kn(Math.abs(tDif)) + ' Kz', hasDif: s.tRev && tDif!==0, difL: tDif===0 ? 'Sem diferença' : 'Diferença por apurar', difBg: tDif===0 ? '#e3efe6' : '#f7e1de', difC: tDif===0 ? '#2e7d4f' : '#b42318',
      den: DEN.map(([k,l,v]) => ({ l, aria: l, q: String(s.tq[k]||0), ro: s.tRev, bd: s.tRev ? '#e4e0d6' : '#1d1c1a', sub: kn((s.tq[k]||0)*v), dec:() => setQ(k, (s.tq[k]||0) - (k==='coin' ? 100 : 1)), inc:() => setQ(k, (s.tq[k]||0) + (k==='coin' ? 100 : 1)), set: e => setQ(k, parseInt(e.target.value.replace(/\D/g,''),10) || 0) })),
      opts: [['recount','Recontar o dinheiro','Voltar às denominações e corrigir a contagem.'],['reg','Registar divergência','Guardar a diferença e receber o turno com ressalva.'],['rev','Pedir revisão do responsável','Encaminhar ao dono ou supervisor, sem apagar os registos.']].map(([k,l,d]) => ({ l, d, on: s.tOpt===k, bd: s.tOpt===k ? '2px solid #1d1c1a' : '1px solid #e4e0d6', bg: s.tOpt===k ? '#fff' : 'transparent', dot: s.tOpt===k ? '#1d1c1a' : 'transparent', pick:() => k==='recount' ? this.setState({ tRev:false, tOpt:'', tErr:'' }) : this.setState({ tOpt:k, tErr:'' }) })),
      needJust: s.tOpt==='reg' || s.tOpt==='rev', just: s.tJust, setJust: e => this.setState({ tJust:e.target.value, tErr:'' }),
      cta1: !s.tRev ? 'Submeter contagem' : 'Continuar', err: s.tErr,
      next1:() => { if (!s.tRev) { if (!tCount) return this.setState({ tErr:'Introduz a contagem antes de submeter.' }); return this.setState({ tRev:true, tErr:'' }); } if (tDif!==0 && !s.tOpt) return this.setState({ tErr:'Escolhe como proceder com a diferença.' }); if (tDif!==0 && s.tJust.trim().length < 5) return this.setState({ tErr:'Escreve uma justificação curta.' }); this.setState({ sc:'t2', role:'rececao', tErr:'' }); },
      pays: PAYS.map(([k,l,d,v]) => ({ l, d, v: kn(v) + ' Kz', acts: a3(s.tPay[k], k==='pen' ? [['pend','Fica pendente','#7a5800'],['ok','Confirmado','#2e7d4f'],['prob','Problema','#b42318']] : [['ok','Conferido','#2e7d4f'],['pend','Sem comprovativo','#7a5800'],['prob','Problema','#b42318']], kk => this.setState(x => ({ tPay:Object.assign({}, x.tPay, { [k]:kk }), tErr:'' }))) })),
      next2:() => payDone ? this.setState({ sc:'t3', role:'rececao', tErr:'' }) : this.setState({ tErr:'Confere todos os meios de pagamento.' }),
      pend: PEND.map(([id,k,t,d]) => ({ t, d, k:{ l:PK[k][0], c:PK[k][1], bg:PK[k][2] }, acts: a3(s.tPend[id], [['rec','Recebido','#1d1c1a'],['res','Resolvido','#2e7d4f'],['prob','Problema','#b42318']], kk => this.setState(x => ({ tPend:Object.assign({}, x.tPend, { [id]:kk }), tErr:'' }))) })),
      next3:() => pendDone ? this.setState({ sc:'t4', role:'rececao', tErr:'' }) : this.setState({ tErr:'Marca todas as pendências.' }),
      sum: [['Dinheiro', kn(tCount) + ' Kz contados · esperado ' + kn(tExp), !cashDone ? ['Por conferir','#55524b','#ebe6d6'] : tDif===0 ? ['Conferido','#2e7d4f','#e3efe6'] : s.tOpt==='rev' ? ['Em revisão','#b42318','#f7e1de'] : ['Com ressalva','#7a5800','#f5ecd0']],
        ['Outros meios', '111 500 Kz em TPA, Express e referências', !payDone ? ['Por conferir','#55524b','#ebe6d6'] : Object.values(s.tPay).includes('prob') ? ['Com problema','#b42318','#f7e1de'] : ['Conferidos','#2e7d4f','#e3efe6']],
        ['Pendências', Object.values(s.tPend).filter(v => v==='rec').length + ' recebidas · ' + Object.values(s.tPend).filter(v => v==='res').length + ' resolvidas · ' + Object.values(s.tPend).filter(v => v==='prob').length + ' problema', !pendDone ? ['Por rever','#55524b','#ebe6d6'] : ['Revistas','#2e7d4f','#e3efe6']],
        ['Ocorrências','Catraca 2 em manutenção', ['1 aberta','#7a5800','#f5ecd0']]].map(([l,d,[a,b,c]]) => ({ l, d, s:{ l:a, c:b, bg:c } })),
      ressalva: cashDone && tDif!==0, giverOk, exc: s.tExc, excMot: s.tExcMot, setExcMot: e => this.setState({ tExcMot:e.target.value, tErr:'' }),
      pw: s.tPw, setPw: e => this.setState({ tPw:e.target.value, tErr:'' }), notDone: !s.tDone, done: s.tDone, busy: s.tBusy, busyOp: s.tBusy ? .5 : 1,
      cta4: s.tBusy ? 'A registar…' : (cashDone && tDif!==0 ? 'Receber com ressalva' : 'Assumir turno'),
      confirm:() => { if (s.tBusy || s.tDone) return; if (!cashDone || !payDone || !pendDone) return this.setState({ tErr:'Há passos por concluir.' }); if (s.tExc && s.tExcMot.trim().length < 4) return this.setState({ tErr:'Indica o motivo da ausência da Celma.' }); if (s.tPw.length < 6) return this.setState({ tErr:'Confirma com a tua senha.' });
        this.setState({ tBusy:true, tErr:'' }); clearTimeout(this.t5); this.t5 = setTimeout(() => this.setState({ tBusy:false, tDone:true, tPw:'' }), 900); },
      doneT: tDif!==0 ? 'Turno recebido com ressalva' : 'Turno assumido', doneBg: tDif!==0 ? '#f5ecd0' : '#e3efe6', doneC: tDif!==0 ? '#7a5800' : '#2e7d4f',
      doneMsg: 'Registado às 14:03 pela hora do servidor. ' + (tDif!==0 ? 'A diferença de ' + kn(Math.abs(tDif)) + ' Kz fica associada ao turno da manhã' + (s.tOpt==='rev' ? ' e foi enviada ao dono para revisão.' : ', com a tua justificação.') : 'Sem diferenças.') + (s.tExc ? ' Recebimento sem conferência conjunta, a aguardar o supervisor.' : ''),
      open:() => this.setState({ sc:'r1', role:'rececao' }) };
    // login
    const RMAP = { '923':['membro','m1'], '924':['rececao','t0'], '925':['financas','f1'], '926':['pt','p1'], '927':['dono','o1'] };
    const l1 = { hello:'Boa tarde', tel:s.tel, pw:s.pw, err:s.err, forgot:s.forgot, pwType: s.showPw ? 'text' : 'password', pwLabel: s.showPw ? 'Ocultar' : 'Mostrar',
      roles: ['Membro','Recepção','Finanças','PT','Gestão'],
      setTel: e => this.setState({ tel:e.target.value, err:'' }), setPw: e => this.setState({ pw:e.target.value, err:'' }), togglePw: () => this.setState({ showPw:!s.showPw }),
      forgotOn: () => this.setState({ forgot:!s.forgot, err:'' }),
      entrar: () => { const t = String(s.tel).replace(/\D/g,''); if (t.length !== 9) return this.setState({ err:'O número tem 9 dígitos.' }); if (s.pw.length < 6) return this.setState({ err:'A senha tem pelo menos 6 caracteres.' }); const r = RMAP[t.slice(0,3)] || RMAP['923']; this.setState({ role:r[0], sc:r[1], pw:'', err:'', forgot:false }); } };

    const kind = role, tabs = TABS[kind];
    return { is, qr, lot, eq, pt, r1, r2, r3, r4, ac, x1, k1, e3, o8, inc, tv, ob, im, sm, nf, cmp, cf, rg, ri, mi, goA1:() => this.setState({ sc:'a1', role:null, imOwner:false }), goO3:() => this.setState({ sc:'o3', role:'dono', nfDone:false }), goO4:() => this.setState({ sc:'o4', role:'dono' }), goO9:() => this.setState({ sc:'o9', role:'dono', nfDone:false }), goO10:() => this.setState({ sc:'o10', role:'dono' }), goO11:() => this.setState({ sc:'o11', role:'dono' }), goO12:() => this.setState({ sc:'o12', role:'dono' }), goImport:() => this.setState({ sc:'a3', role:'dono', imOwner:true, imDone:false }), goM8:() => this.go('m8'), goM4:() => this.go('m4'), offline: !!this.props.semRede, homeLabel: { membro:'Acesso', rececao:'Entradas', financas:'Resumo', pt:'Agenda', dono:'Painel' }[role], goHome: () => this.go(TABS[role][0][0]), goK1: () => this.setState({ sc:'k1', role }), goO8: () => this.setState({ sc:'o8', role:'dono' }), o2count: (allPend.length + 3) + ' pedidos à espera', goX1: () => this.setState({ sc:'x1', role, xErr:'' }), goActs: () => this.setState({ sc: role==='dono' ? 'o7' : 'p3', role }), goFiliais: () => this.go('o3'), lotBack: { membro:'Acesso', rececao:'Entradas', financas:'Resumo', pt:'Agenda', dono:'Painel' }[role], goBackLot: () => this.go(TABS[role][0][0]), goTurno: () => this.go('e2'), goR1: () => this.go('r1'), f1, f2, p1, p2, e1, e2, o6, l1,
      roleName: ROLE[0], gymName:'MWANGOLÉ FIT', oGymName:'MWANGOLÉ FIT',
      barBg: sc==='m1' ? '#c8640c' : '#fbfaf7', showTabs: sc!=='l1' && sc[0]!=='t' && !['a1','a2','a4','a5'].includes(sc) && !(sc==='a3' && !s.imOwner),
      tabs: tabs.map(([id,l],i) => ({ l, n:'0'+(i+1), go:() => this.go(id), cur: id===cur ? 'page' : undefined, bar: id===cur ? 'inset 0 3px 0 #c8640c' : 'none' })),
      goPay: () => this.setState({ sc:'m5', pay:'idle' }), goPlano: () => this.go('m2'), goLot: () => this.go('m6'), goAcesso: () => this.go('m1'), goPT: () => this.go('m7'),
      goR2: () => this.go('r2'), goEquipa: () => this.setState({ sc:'o5', role:'dono' }), goAvisos: () => this.setState({ sc:'o6', role:'dono' }),
      sair: () => this.setState({ sc:'l1', role:null }), sairM: () => this.setState({ sc:'l1', role:null }), sairO: () => this.setState({ sc:'l1', role:null }),
      m3: { offer: s.offer && s.day===0, offerT: 'Aceita até 10:12 · 14 min', offerA: 'Cross training · hoje 19:00 · Box', offerMsg: s.day===0 ? s.offerMsg : '',
        offerYes: () => this.setState(x => ({ offer:false, res:Object.assign({}, x.res, { '0-4':true }), wait:Object.assign({}, x.wait, { '0-4':0 }), offerMsg:'Vaga confirmada. Cross training às 19:00.' })),
        offerNo: () => this.setState(x => ({ offer:false, wait:Object.assign({}, x.wait, { '0-4':0 }), offerMsg:'A vaga passou ao próximo da fila.' })),
        isAulas: s.m3tab==='aulas', isDes: s.m3tab==='des', isEvt: s.m3tab==='evt',
        tabs: [['aulas','Aulas',AU.length],['des','Desafios',DES.length],['evt','Eventos',EVT.length]].map(([k,l,n]) => ({ l, n, on:s.m3tab===k, bg: s.m3tab===k ? '#fbfaf7' : 'transparent', pick:() => this.setState({ m3tab:k }) })),
        des: DES.map(([id,t,d,prog,goal,unit,people,end,prize,auto]) => { const j = auto || !!s.desJ[id]; return { t,d,prog:kn(prog),goal:kn(goal),unit, pct: Math.round(prog/goal*100)+'%', people: people + (!auto && j && !DES_J0[id] ? 1 : 0) - (!auto && !j && DES_J0[id] ? 1 : 0), end, prize, joined:j,
          rank: j ? (auto ? 'Talatona lidera' : prog > 0 ? '#14 de ' + people : 'Novo') : '', s: j ? { l:'A participar', c:'#2e7d4f', bg:'#e3efe6' } : { l:'Aberto', c:'#7a5800', bg:'#f5ecd0' }, bg: j ? '#fff' : 'transparent', bd: j ? '#1d1c1a' : '#e4e0d6',
          canJoin: !auto, cta: j ? 'Sair' : 'Participar', toggle:() => this.setState(x => ({ desJ:Object.assign({}, x.desJ, { [id]: !x.desJ[id] }) })) }; }),
        evt: EVT.map(([id,d,mo,w,t,l,cap,taken]) => { const j = !!s.evJ[id]; const left = cap ? cap - taken - (j?1:0) : null; return { d, m:mo, w, t, l, v: cap ? left + ' vagas de ' + cap : 'Sem limite de vagas', cta: j ? 'Inscrito ✓' : 'Inscrever', bg: j ? '#e3efe6' : '#1d1c1a', c: j ? '#2e7d4f' : '#fbfaf7', bd: j ? '1px solid #2e7d4f' : '0', toggle:() => this.setState(x => ({ evJ:Object.assign({}, x.evJ, { [id]: !x.evJ[id] }) })) }; }),
        dia: W[s.day] + ' ' + N[s.day], aulas, days: W.map((w,i) => ({ w, n:N[i], on:i===s.day, bg: i===s.day?'#1d1c1a':'#ebe6d6', c: i===s.day?'#fbfaf7':'#1d1c1a', pick:() => this.setState({ day:i }) })) },
      m4: { sms: tg('sms'), wa: tg('wa') },
      m5: { tel:s.payTel, setTel: e => this.setState({ payTel:e.target.value }), express: s.meio==='express', idle: s.pay==='idle', waiting: s.pay==='waiting', done: s.pay==='done',
        cta: { express:'Pedir pagamento', ref:'Gerar referência', tpa:'Avisar a recepção' }[s.meio],
        wait: s.meio==='express' ? 'Abre o Multicaixa Express no ' + s.payTel + ' e confirma 45 000,00 Kz.' : s.meio==='ref' ? 'Entidade 11 024 · Referência 482 210 931. Válida 48 horas.' : 'A recepção da Talatona foi avisada. Paga no TPA ao entrar.',
        meios: meios.map(([k,l,d]) => ({ l, d, on: s.meio===k, dot: s.meio===k?'#1d1c1a':'transparent', pick:() => this.setState({ meio:k, pay:'idle' }) })),
        pagar: () => { this.setState({ pay:'waiting' }); if (s.meio==='express') { clearTimeout(this.t1); this.t1 = setTimeout(() => this.setState({ pay:'done' }), 3000); } } },
      o3: [['Talatona',1240000,1196000,612,'71%',184,''],['Kilamba',780000,712000,428,'64%',121,'2 alertas'],['Maianga',430000,394000,244,'58%',76,'']].map(([n,e,r,a,o,ch,al]) => ({ n, e:kn(e), r:kn(r), a, o, ch, pct: Math.round(r/e*100)+'%', al: al || Math.round(r/e*100)+'% cobrado', ac: al ? '#b42318' : '#2e7d4f' })),
      o4: { bio: tg('bio'), fug: tg('fug'), equipa: STAFF.slice(0,3).map(p => ({ i:p.i, n:p.n, d:p.r + ' · ' + p.f })) },
      pays: [['Outubro','13 Out · Express','45 000,00'],['Setembro','13 Set · Express','45 000,00'],['Agosto','13 Ago · Dinheiro','45 000,00']].map(([t,d,v]) => ({t,d,v})),
      fugas: [['2 subscrições activadas sem pagamento','Kilamba · hoje 09:14'],['Membro gratuito com 14 check-ins','Talatona · ontem'],['Caixa movimentado às 23:12','Maianga · sábado']].map(([t,d]) => ({t,d})),
      pedidos: [['Fecho de caixa · Kilamba','Diferença no turno da tarde','−8 000,00'],['Preço · Rede Mensal','286 membros activos','50 000,00']].map(([k,t,v]) => ({k,t,v})) };
  }
}

function render(v) {
  return (
    <>
    <R.E s="flex:1;width:100%;height:100%;background:#fbfaf7;color:#1d1c1a;display:flex;flex-direction:column;overflow:hidden;font-family:Outfit,system-ui,sans-serif">
      <R.E s={`height:${R.s(v.__safeTop)};flex-shrink:0;background:${R.s(v.barBg)}`} />
      {v.is?.m1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column">
          <R.E s="background:#c8640c;padding:12px 24px 28px;display:flex;flex-direction:column;gap:24px">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" descriptorColor="#1d1c1a" descriptorInk="#f3ecd9" />
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em">{R.x(v.gymName)}</R.T>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Olá, Kátia"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"O teu acesso"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;padding:22px 24px;display:flex;flex-direction:column;gap:16px;align-items:center">
            <R.E s="background:#fff;border:1px solid #e4e0d6;padding:14px">
              <R.G s="display:grid;grid-template-columns:repeat(21,8px);grid-auto-rows:8px">
                {R.list(v.qr).map((c, $index) => (<React.Fragment key={$index}>
                  <R.E s={`background:${R.s(c)}`} />
                </React.Fragment>))}
              </R.G>
            </R.E>
            <R.T s="font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#55524b">{"QR renova em 00:24 · aproxima da catraca"}</R.T>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:stretch;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goLot} tag="button">
              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Agora no ginásio"}</R.T>
                <R.T s="font-size:15px;font-weight:500">{R.x(v.lot?.now)}{" pessoas · "}{R.x(v.lot?.lvl)}</R.T>
              </R.E>
              <R.T s="font-size:16px">{"→"}</R.T>
            </R.E>
            <R.G s="align-self:stretch;display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
              <R.E s="padding:18px;display:flex;flex-direction:column;gap:6px">
                <R.T s="font-size:36px;font-weight:300;line-height:1">{"18"}</R.T>
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Dias restantes"}</R.T>
              </R.E>
              <R.E s="padding:18px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
                <R.E s="display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#2e7d4f">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Pago"}</R.T>
                </R.E>
                <R.T s="font-size:14px;font-weight:500">{"Rede · Mensal"}</R.T>
              </R.E>
            </R.G>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Rede · Mensal"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"O meu plano"}</R.T>
          </R.E>
          <R.E s="background:#c8640c;padding:24px;display:flex;flex-direction:column;gap:14px">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Próxima mensalidade · 13 Nov"}</R.T>
            <R.T s="font-size:40px;font-weight:300;line-height:1">{"45 000,00"}</R.T>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.goPay} tag="button">
              <R.T>{"Pagar com Multicaixa Express"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:24px;display:flex;flex-direction:column;gap:10px">
            <R.E s="display:flex;justify-content:space-between;align-items:baseline">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Incluído no plano"}</R.T>
              <R.T s="font-size:11px;color:#6b675f">{"até 13 Nov"}</R.T>
            </R.E>
            {R.list(v.inc).map((x, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:6px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;gap:12px;font-size:14px">
                  <R.T s="font-weight:500">{R.x(x?.l)}</R.T>
                  <R.T>{R.x(x?.v)}</R.T>
                </R.E>
                <R.E s="height:4px;background:#ebe6d6">
                  <R.E s={`display:block;height:4px;width:${R.s(x?.w)};background:${R.s(x?.c)}`} />
                </R.E>
                <R.E s={`display:flex;justify-content:space-between;gap:12px;font-size:12px;color:${R.s(x?.dc)}`}>
                  <R.T>{R.x(x?.d)}</R.T>
                  {x?.hasA ? (<>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;padding:0;border:0;background:transparent;color:#9a4c08;font-size:12px;cursor:pointer;font-family:inherit" onPress={x?.act} tag="button">
                      <R.T>{R.x(x?.a)}</R.T>
                    </R.E>
                  </>) : null}
                </R.E>
              </R.E>
            </React.Fragment>))}
            <R.E s="height:10px" />
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Pagamentos"}</R.T>
            {R.list(v.pays).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;justify-content:space-between;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.E s="display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-weight:500">{R.x(p?.t)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                </R.E>
                <R.T s="text-align:right">{R.x(p?.v)}</R.T>
              </R.E>
            </React.Fragment>))}
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;padding-top:12px">{"Filiais"}</R.T>
            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
              <R.T s="padding:6px 10px;background:#ebe6d6;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase">{"Talatona · base"}</R.T>
              <R.T s="padding:6px 10px;background:#ebe6d6;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase">{"Kilamba"}</R.T>
              <R.T s="padding:6px 10px;background:#ebe6d6;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase">{"Maianga"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:28px;padding:0;border:0;background:transparent;font-size:10px;font-weight:600;letter-spacing:.2em;color:#6b675f;cursor:pointer" onPress={v.goFiliais} tag="button">
                <R.T>{"FILIAIS · 3 →"}</R.T>
              </R.E>
            </R.E>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Outubro"}</R.T>
          </R.E>
          <R.E s="padding:0 0 14px">
            <R.E s="padding:14px 24px 0;flex-shrink:0">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goLot} tag="button">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Agora no ginásio"}</R.T>
                  <R.T s="font-size:15px;font-weight:500">{R.x(v.lot?.now)}{" pessoas · "}{R.x(v.lot?.lvl)}</R.T>
                </R.E>
                <R.T s="font-size:16px">{"→"}</R.T>
              </R.E>
            </R.E>
            <R.G s="padding:8px 24px 0;flex-shrink:0;display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:4px;padding:12px 14px;border:1px solid #1d1c1a;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={v.goK1} tag="button">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Recuperação"}</R.T>
                <R.T s="font-size:14px;font-weight:500">{R.x(v.k1?.recKz)}{" Kz →"}</R.T>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;flex-direction:column;gap:4px;padding:12px 14px;border:1px solid #1d1c1a;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={v.goO8} tag="button">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Receitas perdidas"}</R.T>
                <R.T s="font-size:14px;font-weight:500">{R.x(v.o8?.potKz)}{" Kz →"}</R.T>
              </R.E>
            </R.G>
          </R.E>
          <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
            <R.E s="padding:18px 24px;display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:22px;font-weight:300">{"2 450 000"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Kz · Esperada"}</R.T>
            </R.E>
            <R.E s="padding:18px 24px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
              <R.T s="font-size:22px;font-weight:300">{"2 302 000"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Kz · Recebida"}</R.T>
            </R.E>
            <R.E s="grid-column:1 / 3;background:#c8640c;padding:20px 24px;display:flex;justify-content:space-between;align-items:flex-end">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Kz · Diferença"}</R.T>
              <R.T s="font-size:34px;font-weight:300;line-height:1">{"148 000,00"}</R.T>
            </R.E>
          </R.G>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:24px;display:flex;flex-direction:column">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 0 18px;margin-bottom:18px;border:0;border-bottom:1px solid #e4e0d6;background:transparent;color:#1d1c1a;cursor:pointer;text-align:left" onPress={v.goEquipa} tag="button">
              <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">
                <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                <R.T>{"Equipa presente · "}{R.x(v.eq?.pres)}</R.T>
              </R.E>
              <R.T s="font-size:13px;color:#9a4c08">{"Ver →"}</R.T>
            </R.E>
            <R.E s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;display:flex;align-items:center;gap:10px;padding-bottom:10px">
              <R.E s="width:8px;height:8px;border-radius:50%;background:#b42318" />
              <R.T>{"Fugas detectadas"}</R.T>
            </R.E>
            {R.list(v.fugas).map((f, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:3px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.T s="font-size:14px">{R.x(f?.t)}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{R.x(f?.d)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.o2count)}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Aprovações"}</R.T>
          </R.E>
          <R.E s="background:#ebe6d6;padding:24px;display:flex;flex-direction:column;gap:14px">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Estorno · Talatona · 08:40"}</R.T>
            <R.T s="font-size:36px;font-weight:300;line-height:1">{"−30 000,00"}</R.T>
            <R.T s="font-size:14px;line-height:1.45">{"Edson Mateus · cobrança duplicada no TPA. Pedido por Celma Bento."}</R.T>
            <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:8px">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase" tag="button">
                <R.T>{"Recusar"}</R.T>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase" tag="button">
                <R.T>{"Aprovar · Face ID"}</R.T>
              </R.E>
            </R.G>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:8px 24px 24px">
            {v.ac?.pendN0 ? (<>
              <R.T s="padding-top:12px"><R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Actividades propostas pelos PT"}</R.T></R.T>
              {R.list(v.ac?.pend).map((a, $index) => (<React.Fragment key={$index}>
                <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                  <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                    <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                      <R.T>{R.x(a?.s?.l)}</R.T>
                    </R.E>
                  </R.E>
                  <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                  <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                  <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                  {a?.canApprove ? (<>
                    <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                        <R.T>{"Recusar"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                        <R.T>{"Aprovar"}</R.T>
                      </R.E>
                    </R.G>
                  </>) : null}
                </R.E>
              </React.Fragment>))}
              <R.E s="height:16px" />
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Outros pedidos"}</R.T>
            </>) : null}
            {R.list(v.pedidos).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;justify-content:space-between;gap:12px;padding:16px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;flex-direction:column;gap:3px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{R.x(p?.k)}</R.T>
                  <R.T s="font-size:14px">{R.x(p?.t)}</R.T>
                </R.E>
                <R.T s="font-size:14px;font-weight:500;white-space:nowrap">{R.x(p?.v)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 18px;display:flex;flex-direction:column;gap:6px">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · Talatona"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Actividades"}</R.T>
          </R.E>
          <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin:0 24px;padding:4px;background:#ebe6d6" role="tablist">
            {R.list(v.m3?.tabs).map((t, $index) => (<React.Fragment key={$index}>
              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                <R.T>{R.x(t?.l)}</R.T>
                <R.T s="font-size:10px;font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.G>
          {v.m3?.isAulas ? (<>
            {v.m3?.offer ? (<>
              <R.E s="margin:12px 24px 0;padding:14px 16px;background:#c8640c;display:flex;flex-direction:column;gap:10px" role="status">
                <R.E s="display:flex;justify-content:space-between;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Vagou um lugar para ti"}</R.T>
                  <R.T s="font-size:11px;font-weight:600">{R.x(v.m3?.offerT)}</R.T>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(v.m3?.offerA)}</R.T>
                <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={v.m3?.offerNo} tag="button">
                    <R.T>{"Passar"}</R.T>
                  </R.E>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={v.m3?.offerYes} tag="button">
                    <R.T>{"Aceitar vaga"}</R.T>
                  </R.E>
                </R.G>
              </R.E>
            </>) : null}
            {v.m3?.offerMsg ? (<>
              <R.T s="margin:12px 24px 0;padding:10px 14px;background:#ebe6d6;font-size:13px" role="status">{R.x(v.m3?.offerMsg)}</R.T>
            </>) : null}
            <R.E s="padding-top:10px;border-bottom:1px solid #e4e0d6">
              <R.G s="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:4px 24px 14px">
                {R.list(v.m3?.days).map((d, $index) => (<React.Fragment key={$index}>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:54px;border:0;background:${R.s(d?.bg)};color:${R.s(d?.c)};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer`} onPress={d?.pick} a_pressed={d?.on} tag="button">
                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(d?.w)}</R.T>
                    <R.T s="font-size:17px;font-weight:300;line-height:1">{R.x(d?.n)}</R.T>
                  </R.E>
                </React.Fragment>))}
              </R.G>
            </R.E>
            <R.E s="flex:1;min-height:0;overflow:auto;padding:0 24px 16px">
              {R.list(v.m3?.aulas).map((a, $index) => (<React.Fragment key={$index}>
                <R.G s="display:grid;grid-template-columns:58px minmax(0,1fr) auto;gap:12px;align-items:center;padding:14px 0;border-bottom:1px solid #e4e0d6">
                  <R.T s="font-size:20px;font-weight:300">{R.x(a?.h)}</R.T>
                  <R.E s="display:flex;flex-direction:column;gap:3px;min-width:0">
                    <R.T s="font-size:14px;font-weight:500">{R.x(a?.n)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(a?.d)}</R.T>
                  </R.E>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;min-width:92px;padding:0 10px;border:${R.s(a?.bd)};background:${R.s(a?.bg)};color:${R.s(a?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`} onPress={a?.toggle} tag="button">
                    <R.T>{R.x(a?.l)}</R.T>
                  </R.E>
                </R.G>
              </React.Fragment>))}
            </R.E>
          </>) : null}
          {v.m3?.isDes ? (<>
            <R.E s="flex:1;min-height:0;overflow:auto;padding:14px 24px 16px;display:flex;flex-direction:column;gap:12px">
              <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"Propostos pela organização do ginásio. O progresso conta pelo check-in ou pela avaliação do PT."}</R.T>
              {R.list(v.m3?.des).map((d, $index) => (<React.Fragment key={$index}>
                <R.E s={`display:flex;flex-direction:column;gap:12px;padding:16px;background:${R.s(d?.bg)};border:1px solid ${R.s(d?.bd)}`}>
                  <R.E s="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
                    <R.E s="display:flex;flex-direction:column;gap:4px">
                      <R.T s="font-size:16px;font-weight:500">{R.x(d?.t)}</R.T>
                      <R.T s="font-size:12px;line-height:1.4;color:#55524b">{R.x(d?.d)}</R.T>
                    </R.E>
                    <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(d?.s?.bg)};color:${R.s(d?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                      <R.T>{R.x(d?.s?.l)}</R.T>
                    </R.E>
                  </R.E>
                  {d?.joined ? (<>
                    <R.E s="display:flex;flex-direction:column;gap:6px">
                      <R.E s="display:flex;justify-content:space-between;font-size:13px">
                        <R.T><R.T s="font-size:22px;font-weight:300">{R.x(d?.prog)}</R.T>{" de "}{R.x(d?.goal)}{" "}{R.x(d?.unit)}</R.T>
                        <R.T s="color:#55524b">{R.x(d?.rank)}</R.T>
                      </R.E>
                      <R.E s="height:6px;background:#fbfaf7">
                        <R.E s={`display:block;height:6px;width:${R.s(d?.pct)};background:#c8640c`} />
                      </R.E>
                    </R.E>
                  </>) : null}
                  <R.T s="font-size:12px;color:#55524b">{R.x(d?.prize)}</R.T>
                  <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                    <R.T s="font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#6b675f">{R.x(d?.people)}{" a participar · até "}{R.x(d?.end)}</R.T>
                    {d?.canJoin ? (<>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:36px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={d?.toggle} tag="button">
                        <R.T>{R.x(d?.cta)}</R.T>
                      </R.E>
                    </>) : null}
                  </R.E>
                </R.E>
              </React.Fragment>))}
            </R.E>
          </>) : null}
          {v.m3?.isEvt ? (<>
            <R.E s="flex:1;min-height:0;overflow:auto;padding:6px 24px 16px">
              {R.list(v.m3?.evt).map((e, $index) => (<React.Fragment key={$index}>
                <R.E s="display:flex;gap:14px;padding:16px 0;border-bottom:1px solid #e4e0d6">
                  <R.E s="width:56px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:8px 0;background:#ebe6d6">
                    <R.T s="font-size:24px;font-weight:300;line-height:1">{R.x(e?.d)}</R.T>
                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(e?.m)}</R.T>
                  </R.E>
                  <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px">
                    <R.T s="font-size:15px;font-weight:500">{R.x(e?.t)}</R.T>
                    <R.T s="font-size:12px;color:#55524b">{R.x(e?.w)}{" · "}{R.x(e?.l)}</R.T>
                    <R.T s="font-size:11px;color:#6b675f">{R.x(e?.v)}</R.T>
                    <R.E s="display:flex;gap:6px;padding-top:6px">
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:${R.s(e?.bd)};background:${R.s(e?.bg)};color:${R.s(e?.c)};font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`} onPress={e?.toggle} tag="button">
                        <R.T>{R.x(e?.cta)}</R.T>
                      </R.E>
                    </R.E>
                  </R.E>
                </R.E>
              </React.Fragment>))}
            </R.E>
          </>) : null}
        </R.E>
      </>) : null}
      {v.is?.m4 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;align-items:center;gap:16px;border-bottom:1px solid #e4e0d6">
            <R.E s="width:56px;height:56px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#1d1c1a;color:#fbfaf7;font-size:16px;font-weight:600;letter-spacing:.08em">
              <R.T>{"KM"}</R.T>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:4px">
              <R.T s="font-size:22px;font-weight:400;letter-spacing:.12em;text-transform:uppercase">{"Kátia Muondo"}</R.T>
              <R.T s="font-size:12px;color:#6b675f">{"Membro #4822 · desde Mar 2025"}</R.T>
            </R.E>
          </R.E>
          <R.G s="display:grid;grid-template-columns:repeat(3,1fr);background:#ebe6d6">
            <R.E s="padding:16px 24px;display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:26px;font-weight:300;line-height:1">{"14"}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Entradas · Out"}</R.T>
            </R.E>
            <R.E s="padding:16px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
              <R.T s="font-size:26px;font-weight:300;line-height:1">{"6"}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Aulas · Out"}</R.T>
            </R.E>
            <R.E s="padding:16px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
              <R.T s="font-size:15px;font-weight:500;line-height:1.75">{"Talatona"}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Filial base"}</R.T>
            </R.E>
          </R.G>
          <R.E s="flex:1;overflow:auto;padding:8px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Telemóvel"}</R.T>
              <R.T s="color:#6b675f">{"923 481 220"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Email"}</R.T>
              <R.T s="color:#6b675f">{"katia.muondo@gmail.com"}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;all:unset;cursor:pointer" onPress={v.m4?.sms?.flip} tag="button">
              <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.T>{"Avisos por SMS"}</R.T>
                <R.E s={`width:40px;height:24px;flex-shrink:0;background:${R.s(v.m4?.sms?.bg)};position:relative;transition:background .15s`}>
                  <R.E s={`position:absolute;top:3px;left:${R.s(v.m4?.sms?.x)}px;width:18px;height:18px;background:#fbfaf7;transition:left .15s`} />
                </R.E>
              </R.E>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;all:unset;cursor:pointer" onPress={v.m4?.wa?.flip} tag="button">
              <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.T>{"Avisos por WhatsApp"}</R.T>
                <R.E s={`width:40px;height:24px;flex-shrink:0;background:${R.s(v.m4?.wa?.bg)};position:relative;transition:background .15s`}>
                  <R.E s={`position:absolute;top:3px;left:${R.s(v.m4?.wa?.x)}px;width:18px;height:18px;background:#fbfaf7;transition:left .15s`} />
                </R.E>
              </R.E>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;font-size:14px;font-family:inherit;width:100%" onPress={v.goM8} tag="button">
              <R.T>{"Indica e ganha"}</R.T>
              <R.T s="color:#9a4c08">{"1 mês grátis →"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Congelar plano"}</R.T>
              <R.T s="color:#6b675f">{"Até 30 dias por ano →"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Histórico de entradas"}</R.T>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Ajuda e termos"}</R.T>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="flex:1;min-height:16px" />
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.sairM} tag="button">
              <R.T>{"Terminar sessão"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m5 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 24px;display:flex;flex-direction:column;gap:10px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goPlano} tag="button">
              <R.T>{"← O meu plano"}</R.T>
            </R.E>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Pagamento"}</R.T>
          </R.E>
          <R.E s="background:#c8640c;padding:20px 24px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Kz · Rede Mensal"}</R.T>
              <R.T s="font-size:12px">{"Novembro · vence a 13 Nov"}</R.T>
            </R.E>
            <R.T s="font-size:34px;font-weight:300;line-height:1">{"45 000,00"}</R.T>
          </R.E>
          <R.E s="flex:1;overflow:auto;padding:20px 24px;display:flex;flex-direction:column;gap:10px">
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Meio de pagamento"}</R.T>
            <R.E s="display:flex;flex-direction:column" role="radiogroup">
              {R.list(v.m5?.meios).map((o, $index) => (<React.Fragment key={$index}>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={o?.pick} role="radio" a_checked={o?.on} tag="button">
                  <R.E s="width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;display:flex;align-items:center;justify-content:center">
                    <R.E s={`width:8px;height:8px;background:${R.s(o?.dot)}`} />
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(o?.l)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(o?.d)}</R.T>
                  </R.E>
                </R.E>
              </React.Fragment>))}
            </R.E>
            {v.m5?.idle ? (<>
              <R.E s="display:flex;flex-direction:column;gap:14px;padding-top:8px">
                {v.m5?.express ? (<>
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Telemóvel Express"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:18px;font-weight:400;letter-spacing:.04em;outline:none;font-family:inherit" tag="input" value={v.m5?.tel} onChange={v.m5?.setTel} inputMode="tel" />
                  </R.E>
                </>) : null}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.m5?.pagar} tag="button">
                  <R.T>{R.x(v.m5?.cta)}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.m5?.waiting ? (<>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:16px;background:#f5ecd0;color:#7a5800" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#c99a1b" />
                  <R.T>{"A aguardar confirmação"}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.45;color:#1d1c1a">{R.x(v.m5?.wait)}</R.T>
              </R.E>
            </>) : null}
            {v.m5?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:16px;background:#e3efe6;color:#2e7d4f" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Pago"}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.45;color:#1d1c1a">{"Recibo FR TAL/2026/1203 enviado por SMS. Plano activo até 13 Dez."}</R.T>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Outubro · 3 filiais"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Filiais"}</R.T>
          </R.E>
          <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
            <R.E s="padding:16px 24px;display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:22px;font-weight:300">{"1 284"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Membros activos"}</R.T>
            </R.E>
            <R.E s="padding:16px 24px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
              <R.T s="font-size:22px;font-weight:300">{"94%"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Cobrado · rede"}</R.T>
            </R.E>
          </R.G>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 16px">
            <R.E s="display:flex;flex-direction:column;gap:12px;padding-bottom:18px;border-bottom:1px solid #e4e0d6">
              <R.E s="display:flex;justify-content:space-between;align-items:baseline">
                <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Comparar"}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"últimos 90 dias"}</R.T>
              </R.E>
              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                {R.list(v.cmp?.metrics).map((x, $index) => (<React.Fragment key={$index}>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                    <R.T>{R.x(x?.l)}</R.T>
                  </R.E>
                </React.Fragment>))}
              </R.E>
              {R.list(v.cmp?.bars).map((b, $index) => (<React.Fragment key={$index}>
                <R.G s="display:grid;grid-template-columns:76px minmax(0,1fr) 72px;gap:10px;align-items:center;font-size:13px">
                  <R.T>{R.x(b?.n)}</R.T>
                  <R.E s="height:10px;background:#ebe6d6">
                    <R.E s={`display:block;height:10px;width:${R.s(b?.w)};background:${R.s(b?.c)}`} />
                  </R.E>
                  <R.T s="text-align:right;font-weight:500">{R.x(b?.v)}</R.T>
                </R.G>
              </React.Fragment>))}
              <R.T s="font-size:11px;line-height:1.45;color:#6b675f">{R.x(v.cmp?.note)}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%;margin:16px 0 4px" onPress={v.goO9} tag="button">
              <R.T>{"+ Nova filial"}</R.T>
            </R.E>
            {R.list(v.o3).map((f, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:12px;padding:18px 0;border-bottom:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:13px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(f?.n)}</R.T>
                  <R.E s={`display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${R.s(f?.ac)}`}>
                    <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(f?.ac)}`} />
                    <R.T>{R.x(f?.al)}</R.T>
                  </R.E>
                </R.E>
                <R.E s="display:flex;justify-content:space-between;align-items:baseline;gap:12px">
                  <R.T s="font-size:24px;font-weight:300">{R.x(f?.r)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{"de "}{R.x(f?.e)}{" Kz"}</R.T>
                </R.E>
                <R.E s="height:6px;background:#ebe6d6">
                  <R.E s={`height:6px;width:${R.s(f?.pct)};background:#c8640c`} />
                </R.E>
                <R.G s="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:15px">{R.x(f?.a)}</R.T>
                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#6b675f">{"Activos"}</R.T>
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:15px">{R.x(f?.o)}</R.T>
                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#6b675f">{"Ocupação agora"}</R.T>
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:15px">{R.x(f?.ch)}</R.T>
                    <R.T s="font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#6b675f">{"Check-ins hoje"}</R.T>
                  </R.E>
                </R.G>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o4 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 24px;display:flex;align-items:center;gap:16px;border-bottom:1px solid #e4e0d6">
            <R.E s="width:56px;height:56px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#c8640c;color:#1d1c1a;font-size:16px;font-weight:600;letter-spacing:.08em">
              <R.T>{"PN"}</R.T>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:4px">
              <R.T s="font-size:22px;font-weight:400;letter-spacing:.12em;text-transform:uppercase">{"Paulo Neto"}</R.T>
              <R.T s="font-size:12px;color:#6b675f">{"Dono · Mwangolé Fit"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;overflow:auto;padding:20px 24px;display:flex;flex-direction:column">
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding-bottom:10px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Equipa"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#9a4c08">{"+ Convidar"}</R.T>
            </R.E>
            {R.list(v.o4?.equipa).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;font-size:11px;font-weight:600">
                  <R.T>{R.x(p?.i)}</R.T>
                </R.E>
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:14px">{R.x(p?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                </R.E>
              </R.E>
            </React.Fragment>))}
            <R.T s="padding:20px 0 4px"><R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Gestão do ginásio"}</R.T></R.T>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;width:100%" onPress={v.goO9} tag="button">
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:14px">{"Abrir nova filial"}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{"Copia planos, regras e permissões"}</R.T>
              </R.E>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;width:100%" onPress={v.goO11} tag="button">
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:14px">{"Regras de aprovação"}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{"Descontos, estornos, despesas e preços"}</R.T>
              </R.E>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;width:100%" onPress={v.goO10} tag="button">
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:14px">{"Cofre de documentos"}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{"Contratos, comprovativos, manutenção"}</R.T>
              </R.E>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;width:100%" onPress={v.goImport} tag="button">
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:14px">{"Importar dados"}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{"Membros e funcionários de planilhas"}</R.T>
              </R.E>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:14px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;width:100%" onPress={v.goO12} tag="button">
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:14px">{"Programa de indicação"}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{R.x(v.ri?.short)}</R.T>
              </R.E>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.T s="padding:20px 0 10px"><R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Controlo"}</R.T></R.T>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;all:unset;cursor:pointer" onPress={v.o4?.bio?.flip} tag="button">
              <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.T>{"Aprovar com Face ID"}</R.T>
                <R.E s={`width:40px;height:24px;flex-shrink:0;background:${R.s(v.o4?.bio?.bg)};position:relative;transition:background .15s`}>
                  <R.E s={`position:absolute;top:3px;left:${R.s(v.o4?.bio?.x)}px;width:18px;height:18px;background:#fbfaf7;transition:left .15s`} />
                </R.E>
              </R.E>
            </R.E>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;all:unset;cursor:pointer" onPress={v.o4?.fug?.flip} tag="button">
              <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.T>{"Alertas de fugas por SMS"}</R.T>
                <R.E s={`width:40px;height:24px;flex-shrink:0;background:${R.s(v.o4?.fug?.bg)};position:relative;transition:background .15s`}>
                  <R.E s={`position:absolute;top:3px;left:${R.s(v.o4?.fug?.x)}px;width:18px;height:18px;background:#fbfaf7;transition:left .15s`} />
                </R.E>
              </R.E>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Desconto máximo · recepção"}</R.T>
              <R.T s="color:#6b675f">{"10%"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Tolerância antes de bloquear"}</R.T>
              <R.T s="color:#6b675f">{"7 dias"}</R.T>
            </R.E>
            <R.E s="flex:1;min-height:16px" />
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.sairO} tag="button">
              <R.T>{"Terminar sessão"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.l1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="position:relative;flex:1;display:flex;flex-direction:column;padding:12px 24px 24px;overflow:hidden">
            <R.E s="position:absolute;right:-120px;top:40px;pointer-events:none">
              <MuntuMark variant="C" color="#ebe6d6" size={320} />
            </R.E>
            <R.E s="position:relative">
              <MuntuLogo variant="C" color="#1d1c1a" size={22} descriptor="Ginásio" />
            </R.E>
            <R.E s="position:relative;flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:26px;padding-bottom:8px">
              <R.E s="display:flex;flex-direction:column;gap:10px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.l1?.hello)}</R.T>
                <R.T s="font-size:40px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1">{"Entrar"}</R.T>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Número de telemóvel"}</R.T>
                <R.E s="display:flex;align-items:center;gap:12px;border-bottom:1px solid #1d1c1a">
                  <R.T s="font-size:18px;font-weight:400;letter-spacing:.04em;text-transform:none;color:#8a867d">{"+244"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:46px;border:0;background:transparent;padding:0;color:#1d1c1a;font-size:18px;font-weight:400;letter-spacing:.04em;outline:none;font-family:inherit;flex:1;min-width:0" tag="input" value={v.l1?.tel} onChange={v.l1?.setTel} inputMode="tel" autoComplete="tel" />
                </R.E>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Senha"}</R.T>
                <R.E s="display:flex;align-items:center;gap:12px;border-bottom:1px solid #1d1c1a">
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:46px;border:0;background:transparent;padding:0;color:#1d1c1a;font-size:18px;font-weight:400;letter-spacing:.04em;outline:none;font-family:inherit;flex:1;min-width:0" tag="input" value={v.l1?.pw} onChange={v.l1?.setPw} type={v.l1?.pwType} placeholder="••••••••" autoComplete="current-password" />
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.l1?.togglePw} tag="button">
                    <R.T>{R.x(v.l1?.pwLabel)}</R.T>
                  </R.E>
                </R.E>
              </R.E>
              {v.l1?.err ? (<>
                <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                  <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                  <R.T>{R.x(v.l1?.err)}</R.T>
                </R.E>
              </>) : null}
              {v.l1?.forgot ? (<>
                <R.T s="padding:12px 14px;background:#ebe6d6;font-size:13px;line-height:1.5" role="status">{"Pede à recepção do teu ginásio para repor a senha. Recebes uma senha temporária no telemóvel."}</R.T>
              </>) : null}
              <R.E s="display:flex;flex-direction:column;gap:14px">
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.l1?.entrar} tag="button">
                  <R.T>{"Entrar"}</R.T>
                </R.E>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:center;height:32px;padding:0;border:0;background:transparent;color:#9a4c08;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.l1?.forgotOn} tag="button">
                  <R.T>{"Esqueci a senha"}</R.T>
                </R.E>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;justify-content:space-between;align-items:center;height:52px;padding:0;border:0;border-top:1px solid #e4e0d6;background:transparent;color:#1d1c1a;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.goA1} tag="button">
                <R.T>{"Tens um ginásio? Cria a conta"}</R.T>
                <R.T s="color:#9a4c08">{"→"}</R.T>
              </R.E>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m6 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 22px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goBackLot} tag="button">
              <R.T>{"← "}{R.x(v.lotBack)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · Talatona · "}{R.x(v.lot?.hora)}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Ginásio agora"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;align-items:flex-end;justify-content:space-between;gap:12px;padding-bottom:14px">
              <R.E s="display:flex;flex-direction:column;gap:6px">
                <R.T s="font-size:64px;font-weight:300;line-height:.9">{R.x(v.lot?.now)}</R.T>
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Pessoas · por check-in"}</R.T>
              </R.E>
              <R.E s="display:flex;align-items:center;gap:8px;padding:6px 10px;background:#e3efe6;color:#2e7d4f;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">
                <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                <R.T>{R.x(v.lot?.lvl)}</R.T>
              </R.E>
            </R.E>
            <R.E s="height:8px;background:#ebe6d6">
              <R.E s={`height:8px;width:${R.s(v.lot?.pct)};background:#c8640c`} />
            </R.E>
            <R.T s="padding:8px 0 22px;font-size:12px;color:#6b675f">{R.x(v.lot?.cap)}</R.T>
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Hoje, hora a hora"}</R.T>
            <R.E s="height:120px;display:flex;align-items:flex-end;gap:3px;padding-top:14px">
              {R.list(v.lot?.bars).map((b, $index) => (<React.Fragment key={$index}>
                <R.E s={`flex:1;height:${R.s(b?.h)};background:${R.s(b?.c)}`} title={b?.t} />
              </React.Fragment>))}
            </R.E>
            <R.E s="display:flex;justify-content:space-between;padding:6px 0 4px;font-size:10px;color:#6b675f">
              <R.T>{"06"}</R.T>
              <R.T>{"10"}</R.T>
              <R.T>{"14"}</R.T>
              <R.T>{"18"}</R.T>
              <R.T>{"22"}</R.T>
            </R.E>
            <R.T s="padding:6px 0 22px;font-size:13px;line-height:1.5">{R.x(v.lot?.tip)}</R.T>
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding-bottom:6px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Equipa presente"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.eq?.presMembro)}</R.T>
            </R.E>
            {R.list(v.eq?.onFloor).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.06em">
                  <R.T>{R.x(p?.i)}</R.T>
                </R.E>
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(p?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(p?.r)}{" · desde "}{R.x(p?.since)}</R.T>
                </R.E>
                {p?.pt ? (<>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 10px;border:1px solid #1d1c1a;background:transparent;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;color:#1d1c1a" onPress={v.goPT} tag="button">
                    <R.T>{"Reservar"}</R.T>
                  </R.E>
                </>) : null}
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m7 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 22px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Personal trainer · 4 semanas"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Reservar PT"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.pt?.idle ? (<>
              <R.E s="display:flex;flex-direction:column;gap:22px">
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Treinador"}</R.T>
                  <R.E s="height:10px" />
                  {R.list(v.pt?.pts).map((p, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:12px;padding:12px;margin-bottom:6px;border:${R.s(p?.bd)};background:${R.s(p?.bg)};text-align:left;cursor:pointer;color:#1d1c1a`} onPress={p?.pick} a_pressed={p?.on} tag="button">
                      <R.E s="width:40px;height:40px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#1d1c1a;color:#fbfaf7;font-size:11px;font-weight:600;letter-spacing:.06em">
                        <R.T>{R.x(p?.i)}</R.T>
                      </R.E>
                      <R.E s="flex:1;display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(p?.n)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{R.x(p?.e)}</R.T>
                        <R.E s={`display:flex;align-items:center;gap:6px;font-size:11px;color:${R.s(p?.oc)}`}>
                          <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(p?.oc)}`} />
                          <R.T>{R.x(p?.ol)}</R.T>
                        </R.E>
                      </R.E>
                      <R.T s="font-size:13px;font-weight:500;white-space:nowrap">{R.x(p?.price)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Vezes por semana"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.pt?.freqs).map((f, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(f?.bd)};background:${R.s(f?.bg)};color:${R.s(f?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={f?.pick} a_pressed={f?.on} tag="button">
                        <R.T>{R.x(f?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.E s="display:flex;justify-content:space-between;align-items:baseline">
                    <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Dias"}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(v.pt?.daysHint)}</R.T>
                  </R.E>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.pt?.days).map((d, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(d?.bd)};background:${R.s(d?.bg)};color:${R.s(d?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={d?.pick} a_pressed={d?.on} tag="button">
                        <R.T>{R.x(d?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Hora"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.pt?.hours).map((h, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(h?.bd)};background:${R.s(h?.bg)};color:${R.s(h?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={h?.pick} a_pressed={h?.on} tag="button">
                        <R.T>{R.x(h?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="background:#c8640c;padding:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
                  <R.E s="display:flex;flex-direction:column;gap:4px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{R.x(v.pt?.sum)}</R.T>
                    <R.T s="font-size:12px">{R.x(v.pt?.sum2)}</R.T>
                  </R.E>
                  <R.T s="font-size:26px;font-weight:300;line-height:1;white-space:nowrap">{R.x(v.pt?.total)}</R.T>
                </R.E>
                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;opacity:${R.s(v.pt?.op)}`} onPress={v.pt?.reservar} disabled={v.pt?.dis} tag="button">
                  <R.T>{"Pedir reserva"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.pt?.sent ? (<>
              <R.E s="display:flex;flex-direction:column;gap:14px;padding:20px;background:#e3efe6" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#2e7d4f">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Pedido enviado"}</R.T>
                </R.E>
                <R.T s="font-size:15px;line-height:1.5">{R.x(v.pt?.sentMsg)}</R.T>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.pt?.reset} tag="button">
                  <R.T>{"Fazer outro pedido"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.r1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Talatona · Turno da manhã"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Entradas"}</R.T>
            </R.E>
          </R.E>
          {v.offline ? (<>
            <R.E s="background:#1d1c1a;color:#ebe6d6;padding:12px 24px;display:flex;flex-direction:column;gap:4px" role="status">
              <R.E s="display:flex;align-items:center;gap:8px;font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">
                <R.E s="width:8px;height:8px;border-radius:50%;background:#e0b23c" />
                <R.T>{"Sem rede · a funcionar localmente"}</R.T>
              </R.E>
              <R.T s="font-size:12px;line-height:1.45">{R.x(v.r1?.queue)}{" entradas em fila para sincronizar. Express e referência ficam por confirmar até a rede voltar."}</R.T>
            </R.E>
          </>) : null}
          <R.E s="padding:14px 24px 0;flex-shrink:0">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goLot} tag="button">
              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Agora no ginásio"}</R.T>
                <R.T s="font-size:15px;font-weight:500">{R.x(v.lot?.now)}{" pessoas · "}{R.x(v.lot?.lvl)}</R.T>
              </R.E>
              <R.T s="font-size:16px">{"→"}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:8px 24px 0;flex-shrink:0">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goK1} tag="button">
              <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#c8640c" />
              <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Recuperação"}</R.T>
                <R.T s="font-size:15px;font-weight:500">{R.x(v.k1?.todoN)}{" contactos por fazer"}</R.T>
              </R.E>
              <R.T s="font-size:16px">{"→"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding-bottom:8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Ao vivo · "}{R.x(v.r1?.hoje)}{" hoje"}</R.T>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;color:#1d1c1a" onPress={v.goR2} tag="button">
                <R.T>{"+ Entrada manual"}</R.T>
              </R.E>
            </R.E>
            {R.list(v.r1?.list).map((c, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:10px;padding:13px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;align-items:center;gap:12px">
                  <R.T s="font-size:15px;font-weight:300;width:44px">{R.x(c?.h)}</R.T>
                  <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(c?.n)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(c?.p)}</R.T>
                  </R.E>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(c?.s?.bg)};color:${R.s(c?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(c?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                {c?.blocked ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-left:56px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={c?.cobrar} tag="button">
                      <R.T>{"Cobrar "}{R.x(c?.v)}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={c?.recusar} tag="button">
                      <R.T>{"Não entra"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.r2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Talatona · "}{R.x(v.r2?.total)}{" membros"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Membros"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="height:48px;display:flex;align-items:center;gap:12px;padding:0 14px;background:#ebe6d6;margin-bottom:10px">
              <R.E s="width:12px;height:12px;border:1.5px solid #55524b;border-radius:50%;flex-shrink:0" />
              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;flex:1;min-width:0;height:46px;border:0;background:transparent;outline:none;font-family:inherit;font-size:15px;color:#1d1c1a" accessibilityLabel="Procurar membro" tag="input" value={v.r2?.q} onChange={v.r2?.setQ} placeholder="Nome, telefone ou nº de membro" />
            </R.E>
            {R.list(v.r2?.list).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.06em">
                  <R.T>{R.x(p?.i)}</R.T>
                </R.E>
                <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(p?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}{" · "}{R.x(p?.dias)}</R.T>
                </R.E>
                {p?.can ? (<>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 10px;border:0;background:${R.s(p?.bbg)};color:${R.s(p?.bc)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={p?.entrar} tag="button">
                    <R.T>{R.x(p?.bl)}</R.T>
                  </R.E>
                </>) : null}
                {p?.cant ? (<>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 10px;border:1px solid ${R.s(p?.s?.c)};background:${R.s(p?.s?.bg)};color:${R.s(p?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;white-space:nowrap`} onPress={p?.cobrar} tag="button">
                    <R.T>{R.x(p?.cl)}</R.T>
                  </R.E>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.r2?.empty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:16px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Nenhum membro encontrado."}</R.T>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.f1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Rede · Hoje, 29 Out"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Finanças"}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:0 0 14px">
            <R.E s="padding:14px 24px 0;flex-shrink:0">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goLot} tag="button">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Agora no ginásio"}</R.T>
                  <R.T s="font-size:15px;font-weight:500">{R.x(v.lot?.now)}{" pessoas · "}{R.x(v.lot?.lvl)}</R.T>
                </R.E>
                <R.T s="font-size:16px">{"→"}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.E s="background:#c8640c;padding:18px 24px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Kz · Recebido hoje"}</R.T>
            <R.T s="font-size:34px;font-weight:300;line-height:1">{R.x(v.f1?.hoje)}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Por meio de pagamento"}</R.T>
            <R.E s="height:8px" />
            {R.list(v.f1?.meios).map((x, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:6px;padding:10px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;font-size:14px">
                  <R.T>{R.x(x?.l)}</R.T>
                  <R.T>{R.x(x?.v)}</R.T>
                </R.E>
                <R.E s="height:4px;background:#ebe6d6">
                  <R.E s={`display:block;height:4px;width:${R.s(x?.w)};background:#1d1c1a`} />
                </R.E>
              </R.E>
            </React.Fragment>))}
            <R.E s="height:18px" />
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Outubro"}</R.T>
            <R.E s="height:8px" />
            <R.G s="display:grid;grid-template-columns:1fr 1fr 1fr;background:#ebe6d6">
              {R.list(v.f1?.mes).map((x, $index) => (<React.Fragment key={$index}>
                <R.E s="padding:14px;display:flex;flex-direction:column;gap:6px;border-right:1px solid #d9d4c4">
                  <R.T s="font-size:16px;font-weight:400">{R.x(x?.v)}</R.T>
                  <R.T s="font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase">{R.x(x?.l)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.G>
            <R.E s="height:18px" />
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Caixas"}</R.T>
            <R.E s="height:8px" />
            {R.list(v.f1?.caixas).map((x, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(x?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                  <R.T s="font-size:14px">{R.x(x?.v)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(x?.s?.bg)};color:${R.s(x?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(x?.s?.l)}</R.T>
                  </R.E>
                </R.E>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.f2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.f2?.n)}{" membros em dívida"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Cobranças"}</R.T>
            </R.E>
          </R.E>
          <R.E s="background:#ebe6d6;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;gap:12px">
            <R.E s="display:flex;flex-direction:column;gap:4px">
              <R.T s="font-size:24px;font-weight:300;line-height:1">{R.x(v.f2?.total)}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Kz · Por cobrar"}</R.T>
            </R.E>
            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;padding:0 14px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;opacity:${R.s(v.f2?.allOp)}`} onPress={v.f2?.all} disabled={v.f2?.allDis} tag="button">
              <R.T>{"SMS a todos"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {R.list(v.f2?.list).map((d, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(d?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(d?.d)}</R.T>
                  <R.T s="font-size:11px;color:#2e7d4f">{R.x(d?.info)}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:6px">
                  <R.T s="font-size:14px;color:#b42318">{R.x(d?.v)}</R.T>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0 10px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;opacity:${R.s(d?.op)}`} onPress={d?.sms} disabled={d?.dis} tag="button">
                    <R.T>{"Enviar SMS"}</R.T>
                  </R.E>
                </R.E>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.p1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Nuno Sebastião · Hoje"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Agenda"}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:0 0 14px">
            <R.E s="padding:14px 24px 0;flex-shrink:0">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goLot} tag="button">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#2e7d4f" />
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Agora no ginásio"}</R.T>
                  <R.T s="font-size:15px;font-weight:500">{R.x(v.lot?.now)}{" pessoas · "}{R.x(v.lot?.lvl)}</R.T>
                </R.E>
                <R.T s="font-size:16px">{"→"}</R.T>
              </R.E>
            </R.E>
            <R.E s="padding:8px 24px 0;flex-shrink:0">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:100%;display:flex;align-items:center;gap:12px;padding:14px 16px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;text-align:left;cursor:pointer" onPress={v.goK1} tag="button">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#c8640c" />
                <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6b675f">{"Clientes em risco"}</R.T>
                  <R.T s="font-size:15px;font-weight:500">{R.x(v.k1?.todoN)}{" por contactar"}</R.T>
                </R.E>
                <R.T s="font-size:16px">{"→"}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
            <R.E s="padding:16px 24px;display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:24px;font-weight:300;line-height:1">{R.x(v.p1?.semana)}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Sessões esta semana"}</R.T>
            </R.E>
            <R.E s="padding:16px 24px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
              <R.T s="font-size:24px;font-weight:300;line-height:1">{R.x(v.p1?.clientes)}</R.T>
              <R.T s="font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Clientes activos"}</R.T>
            </R.E>
          </R.G>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {R.list(v.p1?.list).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.T s="font-size:18px;font-weight:300;width:52px">{R.x(a?.h)}</R.T>
                <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(a?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(a?.d)}</R.T>
                </R.E>
                {a?.can ? (<>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 10px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer" onPress={a?.mark} tag="button">
                    <R.T>{"Presente"}</R.T>
                  </R.E>
                </>) : null}
                {a?.done ? (<>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </>) : null}
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.p2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.p2?.open)}{" por responder"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Pedidos"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {R.list(v.p2?.list).map((r, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:12px;padding:16px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;align-items:center;gap:12px">
                  <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.06em">
                    <R.T>{R.x(r?.i)}</R.T>
                  </R.E>
                  <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(r?.plan)}</R.T>
                  </R.E>
                  <R.T s="font-size:13px;font-weight:500;white-space:nowrap">{R.x(r?.v)}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:3px;padding:12px;background:#ebe6d6;font-size:13px">
                  <R.T>{R.x(r?.dias)}</R.T>
                  <R.T s="color:#55524b">{R.x(r?.hora)}</R.T>
                </R.E>
                {r?.open ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:42px" onPress={r?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:42px" onPress={r?.yes} tag="button">
                      <R.T>{"Aceitar"}</R.T>
                    </R.E>
                  </R.G>
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
      </>) : null}
      {v.is?.e1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.e1?.unread)}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Avisos"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {R.list(v.e1?.list).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s={`display:flex;flex-direction:column;gap:10px;padding:16px 0;border-top:1px solid #e4e0d6;opacity:${R.s(a?.op)}`}>
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.p?.bg)};color:${R.s(a?.p?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.p?.l)}</R.T>
                  </R.E>
                  <R.T s="font-size:11px;color:#6b675f">{R.x(a?.h)}</R.T>
                </R.E>
                <R.T s="font-size:15px;line-height:1.5">{R.x(a?.t)}</R.T>
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:12px;color:#6b675f">{R.x(a?.de)}{" · para "}{R.x(a?.to)}</R.T>
                  {a?.unread ? (<>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={a?.read} tag="button">
                      <R.T>{"Marcar como lido"}</R.T>
                    </R.E>
                  </>) : null}
                  {a?.isRead ? (<>
                    <R.T s="font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#2e7d4f">{"Lido ✓"}</R.T>
                  </>) : null}
                </R.E>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.e2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.e2?.name)}{" · "}{R.x(v.e2?.filial)}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Turno"}</R.T>
            </R.E>
          </R.E>
          <R.E s={`background:${R.s(v.e2?.bg)};padding:20px 24px;display:flex;flex-direction:column;gap:14px`}>
            <R.E s="display:flex;align-items:center;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">
              <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(v.e2?.dot)}`} />
              <R.T>{R.x(v.e2?.state)}</R.T>
            </R.E>
            <R.T s="font-size:40px;font-weight:300;line-height:1">{R.x(v.e2?.time)}</R.T>
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.e2?.toggle} tag="button">
              <R.T>{R.x(v.e2?.cta)}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Esta semana · "}{R.x(v.e2?.week)}</R.T>
            <R.E s="height:10px" />
            <R.G s="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;align-items:end;height:90px">
              {R.list(v.e2?.days).map((d, $index) => (<React.Fragment key={$index}>
                <R.E s="display:flex;flex-direction:column;justify-content:flex-end;align-items:center;gap:6px;height:100%">
                  <R.E s={`width:100%;height:${R.s(d?.h)};background:${R.s(d?.c)}`} />
                  <R.T s="font-size:9px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#6b675f">{R.x(d?.l)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.G>
            <R.E s="height:18px" />
            <R.E s="display:flex;justify-content:space-between;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Perfil"}</R.T>
              <R.T s="color:#6b675f">{R.x(v.roleName)}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Telemóvel"}</R.T>
              <R.T s="color:#6b675f">{R.x(v.e2?.tel)}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;padding:14px 0;border-top:1px solid #e4e0d6;font-size:14px">
              <R.T>{"Alterar senha"}</R.T>
              <R.T s="color:#6b675f">{"→"}</R.T>
            </R.E>
            <R.E s="flex:1;min-height:16px" />
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.sair} tag="button">
              <R.T>{"Terminar sessão"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o5 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 22px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · "}{R.x(v.eq?.pres)}{" presentes"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Equipa"}</R.T>
          </R.E>
          <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:4px;margin:14px 24px 0;padding:4px;background:#ebe6d6" role="tablist">
            {R.list(v.eq?.tabs).map((t, $index) => (<React.Fragment key={$index}>
              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                <R.T>{R.x(t?.l)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.G>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.eq?.showNow ? (<>
              <R.E s="display:flex;flex-direction:column">
                {R.list(v.eq?.all).map((p, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #e4e0d6">
                    <R.E s="width:36px;height:36px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.06em">
                      <R.T>{R.x(p?.i)}</R.T>
                    </R.E>
                    <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                      <R.T s="font-size:14px;font-weight:500">{R.x(p?.n)}</R.T>
                      <R.T s="font-size:12px;color:#6b675f">{R.x(p?.r)}{" · "}{R.x(p?.f)}</R.T>
                    </R.E>
                    <R.E s={`display:flex;align-items:center;gap:6px;font-size:11px;font-weight:600;letter-spacing:.08em;color:${R.s(p?.oc)};white-space:nowrap`}>
                      <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(p?.oc)}`} />
                      <R.T>{R.x(p?.since)}</R.T>
                    </R.E>
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </>) : null}
            {v.eq?.showStats ? (<>
              <R.E s="display:flex;flex-direction:column">
                <R.G s="display:grid;grid-template-columns:repeat(3,1fr);background:#ebe6d6;margin-bottom:8px">
                  {R.list(v.eq?.kpis).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s="padding:14px;display:flex;flex-direction:column;gap:6px">
                      <R.T s="font-size:20px;font-weight:300;line-height:1">{R.x(x?.v)}</R.T>
                      <R.T s="font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(x?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.G>
                {R.list(v.eq?.all).map((p, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;flex-direction:column;gap:8px;padding:12px 0;border-bottom:1px solid #e4e0d6">
                    <R.E s="display:flex;align-items:center;gap:12px">
                      <R.E s="width:32px;height:32px;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:#ebe6d6;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.06em">
                        <R.T>{R.x(p?.i)}</R.T>
                      </R.E>
                      <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(p?.n)}</R.T>
                        <R.T s={`font-size:12px;color:${R.s(p?.kc)}`}>{R.x(p?.k)}</R.T>
                      </R.E>
                      <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
                        <R.T s="font-size:14px">{R.x(p?.h)}</R.T>
                        <R.T s="font-size:10px;color:#6b675f">{R.x(p?.ass)}{" assiduidade"}</R.T>
                      </R.E>
                    </R.E>
                    <R.E s="height:4px;background:#ebe6d6;margin-left:44px">
                      <R.E s={`display:block;height:4px;width:${R.s(p?.ass)};background:${R.s(p?.bar)}`} />
                    </R.E>
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </>) : null}
          </R.E>
          <R.E s="padding:12px 24px 14px;border-top:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%" onPress={v.goAvisos} tag="button">
              <R.T>{"Enviar aviso à equipa"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o6 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 22px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goEquipa} tag="button">
              <R.T>{"← Equipa"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Enviados por SMS e na app"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Avisos"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:14px;padding-bottom:20px">
              <R.E s="display:flex;flex-direction:column;gap:8px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Para"}</R.T>
                <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                  {R.list(v.o6?.to).map((t, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(t?.bd)};background:${R.s(t?.bg)};color:${R.s(t?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={t?.pick} a_pressed={t?.on} tag="button">
                      <R.T>{R.x(t?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Prioridade"}</R.T>
                <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                  {R.list(v.o6?.pri).map((p, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(p?.bd)};background:${R.s(p?.bg)};color:${R.s(p?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={p?.pick} a_pressed={p?.on} tag="button">
                      <R.T>{R.x(p?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
              </R.E>
              <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:15px;line-height:1.45;color:#1d1c1a;resize:none;outline:none" accessibilityLabel="Texto do aviso" tag="textarea" value={v.o6?.text} onChange={v.o6?.setText} placeholder="Escreve o aviso…" rows="3" />
              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;opacity:${R.s(v.o6?.op)}`} onPress={v.o6?.send} disabled={v.o6?.dis} tag="button">
                <R.T>{R.x(v.o6?.cta)}</R.T>
              </R.E>
            </R.E>
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Enviados"}</R.T>
            <R.E s="height:6px" />
            {R.list(v.o6?.list).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.p?.bg)};color:${R.s(a?.p?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.p?.l)}</R.T>
                  </R.E>
                  <R.T s="font-size:11px;color:#6b675f">{R.x(a?.h)}{" · "}{R.x(a?.to)}</R.T>
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
      </>) : null}
      {v.is?.r3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Talatona · novo membro"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Inscrever"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.r3?.form ? (<>
              <R.E s="display:flex;flex-direction:column;gap:20px">
                <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Dados"}</R.T>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Nome completo"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:17px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.r3?.nome} onChange={v.r3?.setNome} placeholder="Ex. Kátia Muondo" />
                </R.E>
                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Telemóvel"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:17px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.r3?.tel} onChange={v.r3?.setTel} placeholder="9xx xxx xxx" inputMode="tel" />
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"BI ou NIF"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:17px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.r3?.bi} onChange={v.r3?.setBi} placeholder="Opcional" />
                  </R.E>
                </R.G>
                <R.E s="display:flex;flex-direction:column;gap:8px">
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Código de indicação · opcional"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;text-transform:uppercase" tag="input" value={v.r3?.ref} onChange={v.r3?.setRef} placeholder="Ex. KATIA-4822" />
                  </R.E>
                  {v.r3?.refMsg ? (<>
                    <R.T s={`font-size:12px;line-height:1.45;color:${R.s(v.r3?.refC)}`}>{R.x(v.r3?.refMsg)}</R.T>
                  </>) : null}
                </R.E>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Plano"}</R.T>
                  <R.E s="height:8px" />
                  <R.E s="display:flex;flex-direction:column" role="radiogroup">
                    {R.list(v.r3?.plans).map((p, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:13px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={p?.pick} role="radio" a_checked={p?.on} tag="button">
                        <R.E s="width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;display:flex;align-items:center;justify-content:center">
                          <R.E s={`width:8px;height:8px;background:${R.s(p?.dot)}`} />
                        </R.E>
                        <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                          <R.T s="font-size:14px;font-weight:500">{R.x(p?.l)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                        </R.E>
                        <R.T s="font-size:14px;white-space:nowrap">{R.x(p?.v)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Pagamento do 1º mês"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.r3?.meios).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                        <R.T>{R.x(x?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6;font-size:14px;cursor:pointer">
                  <R.T>{"Enviar factura e senha por SMS"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;width:20px;height:20px;accent-color:#1d1c1a" tag="input" onChange={v.r3?.flipSms} type="checkbox" checked={v.r3?.sms} />
                </R.E>
                <R.E s="background:#c8640c;padding:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
                  <R.E s="display:flex;flex-direction:column;gap:4px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Kz · A cobrar agora"}</R.T>
                    <R.T s="font-size:12px">{R.x(v.r3?.sum)}</R.T>
                  </R.E>
                  <R.T s="font-size:28px;font-weight:300;line-height:1">{R.x(v.r3?.total)}</R.T>
                </R.E>
                {v.r3?.err ? (<>
                  <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                    <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                    <R.T>{R.x(v.r3?.err)}</R.T>
                  </R.E>
                </>) : null}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.r3?.submit} tag="button">
                  <R.T>{"Inscrever e cobrar"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.r3?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:14px;padding:20px;background:#e3efe6" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#2e7d4f">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Membro inscrito"}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:4px">
                  <R.T s="font-size:20px;font-weight:500">{R.x(v.r3?.res?.nome)}</R.T>
                  <R.T s="font-size:13px;color:#55524b">{R.x(v.r3?.res?.num)}{" · "}{R.x(v.r3?.res?.plan)}</R.T>
                </R.E>
                <R.E s="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid #c5dccb;border-bottom:1px solid #c5dccb;font-size:14px">
                  <R.T>{R.x(v.r3?.res?.doc)}</R.T>
                  <R.T>{R.x(v.r3?.res?.v)}{" Kz"}</R.T>
                </R.E>
                {v.r3?.res?.sent ? (<>
                  <R.E s="display:flex;flex-direction:column;gap:6px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"SMS enviado para "}{R.x(v.r3?.res?.tel)}</R.T>
                    <R.T s="background:#fbfaf7;padding:12px 14px;font-size:14px;line-height:1.5">{R.x(v.r3?.res?.sms)}</R.T>
                  </R.E>
                </>) : null}
                <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.r3?.again} tag="button">
                    <R.T>{"Nova inscrição"}</R.T>
                  </R.E>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.goR1} tag="button">
                    <R.T>{"Concluir"}</R.T>
                  </R.E>
                </R.G>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.r4 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Cobranças e facturas"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Cobrar"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.r4?.form ? (<>
              <R.E s="display:flex;flex-direction:column;gap:18px">
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Membro"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:17px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.r4?.mem} onChange={v.r4?.setMem}>
                    {R.list(v.r4?.mems).map((o, $index) => (<React.Fragment key={$index}><R.O value={o?.i} label={o?.l} /></React.Fragment>))}
                  </R.Sel>
                </R.E>
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px;background:#ebe6d6">
                  <R.E s="display:flex;flex-direction:column;gap:3px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(v.r4?.m?.n)}</R.T>
                    <R.T s="font-size:12px;color:#55524b">{R.x(v.r4?.m?.d)}{" · "}{R.x(v.r4?.m?.tel)}</R.T>
                  </R.E>
                  <R.E s={`display:inline-flex;padding:4px 8px;background:${R.s(v.r4?.m?.s?.bg)};color:${R.s(v.r4?.m?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(v.r4?.m?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"O que cobrar"}</R.T>
                  <R.E s="height:8px" />
                  {R.list(v.r4?.items).map((it, $index) => (<React.Fragment key={$index}>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:13px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={it?.flip} role="checkbox" a_checked={it?.on} tag="button">
                      <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(it?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                        <R.T>{R.x(it?.tick)}</R.T>
                      </R.E>
                      <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(it?.l)}</R.T>
                        <R.T s={`font-size:12px;color:${R.s(it?.dc)}`}>{R.x(it?.d)}</R.T>
                      </R.E>
                      <R.T s="font-size:14px;white-space:nowrap">{R.x(it?.v)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Documento"}</R.T>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:4px;background:#ebe6d6">
                    {R.list(v.r4?.docs).map((d, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;padding:10px 8px;border:0;background:${R.s(d?.bg)};color:#1d1c1a;text-align:left;cursor:pointer;display:flex;flex-direction:column;gap:3px`} onPress={d?.pick} a_pressed={d?.on} tag="button">
                        <R.T s="font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(d?.l)}</R.T>
                        <R.T s="font-size:11px;color:#55524b">{R.x(d?.d)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.G>
                </R.E>
                {v.r4?.payNow ? (<>
                  <R.E s="display:flex;flex-direction:column;gap:10px">
                    <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Meio de pagamento"}</R.T>
                    <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                      {R.list(v.r4?.meios).map((x, $index) => (<React.Fragment key={$index}>
                        <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                          <R.T>{R.x(x?.l)}</R.T>
                        </R.E>
                      </React.Fragment>))}
                    </R.E>
                  </R.E>
                </>) : null}
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Enviar ao cliente"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.r4?.canais).map((c, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(c?.bd)};background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={c?.pick} a_pressed={c?.on} tag="button">
                        <R.T>{R.x(c?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="background:#c8640c;padding:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
                  <R.E s="display:flex;flex-direction:column;gap:4px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Kz · Total"}</R.T>
                    <R.T s="font-size:12px">{R.x(v.r4?.sum)}</R.T>
                  </R.E>
                  <R.T s="font-size:28px;font-weight:300;line-height:1">{R.x(v.r4?.total)}</R.T>
                </R.E>
                {v.r4?.err ? (<>
                  <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                    <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                    <R.T>{R.x(v.r4?.err)}</R.T>
                  </R.E>
                </>) : null}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.r4?.submit} tag="button">
                  <R.T>{R.x(v.r4?.cta)}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.r4?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:18px">
                <R.E s="display:flex;flex-direction:column;gap:14px;padding:20px;background:#e3efe6" role="status">
                  <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#2e7d4f">
                    <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                    <R.T>{R.x(v.r4?.res?.title)}</R.T>
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:4px">
                    <R.T s="font-size:20px;font-weight:500">{R.x(v.r4?.res?.doc)}</R.T>
                    <R.T s="font-size:13px;color:#55524b">{R.x(v.r4?.res?.n)}{" · "}{R.x(v.r4?.res?.v)}{" Kz · "}{R.x(v.r4?.res?.meio)}</R.T>
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:6px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"SMS enviado para "}{R.x(v.r4?.res?.tel)}</R.T>
                    <R.T s="background:#fbfaf7;padding:12px 14px;font-size:14px;line-height:1.5">{R.x(v.r4?.res?.sms)}</R.T>
                  </R.E>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.r4?.reenviar} tag="button">
                      <R.T>{R.x(v.r4?.res?.again)}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.r4?.nova} tag="button">
                      <R.T>{"Nova cobrança"}</R.T>
                    </R.E>
                  </R.G>
                </R.E>
              </R.E>
            </>) : null}
            <R.E s="height:22px" />
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding-bottom:6px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Documentos de hoje"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.r4?.docCount)}</R.T>
            </R.E>
            {R.list(v.r4?.hist).map((h, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:center;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6">
                <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:13px;font-weight:500">{R.x(h?.doc)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(h?.n)}{" · "}{R.x(h?.h)}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
                  <R.T s="font-size:14px">{R.x(h?.v)}</R.T>
                  <R.T s={`font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${R.s(h?.c)}`}>{R.x(h?.st)}</R.T>
                </R.E>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.p3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} title="Turno e conta" tag="button">
                <R.E s={`width:6px;height:6px;border-radius:50%;background:${R.s(v.e2?.chipDot)}`} />
                <R.T>{R.x(v.roleName)}</R.T>
              </R.E>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Propostas ao dono"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Actividades"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.ac?.msg ? (<>
              <R.E s={`display:flex;align-items:flex-start;gap:10px;padding:12px 14px;margin-bottom:12px;background:${R.s(v.ac?.msgBg)};color:${R.s(v.ac?.msgC)};font-size:13px;line-height:1.45;font-weight:500`} role="status">
                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px;background:${R.s(v.ac?.msgC)}`} />
                <R.T>{R.x(v.ac?.msg)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;margin-bottom:18px" onPress={v.goX1} tag="button">
              <R.T>{"+ Nova actividade"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"À espera de aprovação"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ac?.pendN)}</R.T>
            </R.E>
            {R.list(v.ac?.pend).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                {a?.canApprove ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                      <R.T>{"Aprovar"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.ac?.pendEmpty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Sem propostas pendentes."}</R.T>
            </>) : null}
            <R.E s="height:18px" />
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Publicadas"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ac?.pubN)}</R.T>
            </R.E>
            {R.list(v.ac?.pub).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                {a?.canApprove ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                      <R.T>{"Aprovar"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.ac?.pubEmpty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Ainda não tens actividades publicadas."}</R.T>
            </>) : null}
            <R.E s="height:18px" />
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Recusadas"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ac?.recN)}</R.T>
            </R.E>
            {R.list(v.ac?.rec).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                {a?.canApprove ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                      <R.T>{"Aprovar"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.ac?.recEmpty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Nenhuma recusada."}</R.T>
            </>) : null}
            <R.E s="height:18px" />
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o7 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 22px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #e4e0d6">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · aulas, desafios e eventos"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase">{"Actividades"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.ac?.msg ? (<>
              <R.E s={`display:flex;align-items:flex-start;gap:10px;padding:12px 14px;margin-bottom:12px;background:${R.s(v.ac?.msgBg)};color:${R.s(v.ac?.msgC)};font-size:13px;line-height:1.45;font-weight:500`} role="status">
                <R.E s={`width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:5px;background:${R.s(v.ac?.msgC)}`} />
                <R.T>{R.x(v.ac?.msg)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;margin-bottom:18px" onPress={v.goX1} tag="button">
              <R.T>{"+ Nova actividade"}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Propostas dos PT"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ac?.pendN)}</R.T>
            </R.E>
            {R.list(v.ac?.pend).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                {a?.canApprove ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                      <R.T>{"Aprovar"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.ac?.pendEmpty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Sem propostas pendentes."}</R.T>
            </>) : null}
            <R.E s="height:18px" />
            <R.E s="display:flex;justify-content:space-between;align-items:center;padding:6px 0 8px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Publicadas"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ac?.pubN)}</R.T>
            </R.E>
            {R.list(v.ac?.pub).map((a, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(a?.tipo)}</R.T>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(a?.s?.bg)};color:${R.s(a?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(a?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.T s="font-size:15px;font-weight:500">{R.x(a?.t)}</R.T>
                <R.T s="font-size:12px;line-height:1.45;color:#55524b">{R.x(a?.when)}{" · "}{R.x(a?.meta)}</R.T>
                <R.T s="font-size:11px;color:#6b675f">{"Criado por "}{R.x(a?.by)}</R.T>
                {a?.canApprove ? (<>
                  <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px;padding-top:4px">
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.no} tag="button">
                      <R.T>{"Recusar"}</R.T>
                    </R.E>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;cursor:pointer" onPress={a?.yes} tag="button">
                      <R.T>{"Aprovar"}</R.T>
                    </R.E>
                  </R.G>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.ac?.pubEmpty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Sem actividades publicadas."}</R.T>
            </>) : null}
            <R.E s="height:18px" />
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.x1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goActs} tag="button">
              <R.T>{"← Actividades"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.x1?.kicker)}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Nova actividade"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:18px 24px 20px;display:flex;flex-direction:column;gap:20px">
            <R.E s="display:flex;flex-direction:column;gap:10px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Tipo"}</R.T>
              <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px;background:#ebe6d6">
                {R.list(v.x1?.tipos).map((t, $index) => (<React.Fragment key={$index}>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:40px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer`} onPress={t?.pick} a_pressed={t?.on} tag="button">
                    <R.T>{R.x(t?.l)}</R.T>
                  </R.E>
                </React.Fragment>))}
              </R.G>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
              <R.T>{"Título"}</R.T>
              <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.t} onChange={v.x1?.setT} placeholder={v.x1?.ph} />
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
              <R.T>{"Descrição"}</R.T>
              <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:15px;line-height:1.45;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.x1?.d} onChange={v.x1?.setD} placeholder="O que é, para quem, o que conta para o progresso" rows="3" />
            </R.E>
            <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{R.x(v.x1?.iniL)}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.ini} onChange={v.x1?.setIni} type="date" />
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{R.x(v.x1?.fimL)}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.fim} onChange={v.x1?.setFim} type="date" />
              </R.E>
            </R.G>
            {v.x1?.notDes ? (<>
              <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Hora"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.x1?.hora} onChange={v.x1?.setHora}>
                    {R.list(v.x1?.horas).map((h, $index) => (<React.Fragment key={$index}><R.O value={h} label={h} /></React.Fragment>))}
                  </R.Sel>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Vagas"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.cap} onChange={v.x1?.setCap} inputMode="numeric" />
                </R.E>
              </R.G>
            </>) : null}
            {v.x1?.isDes ? (<>
              <R.E s="display:flex;flex-direction:column;gap:20px">
                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Meta"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.cap} onChange={v.x1?.setCap} inputMode="numeric" />
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Conta por"}</R.T>
                    <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.x1?.unit} onChange={v.x1?.setUnit}>
                      {R.list(v.x1?.units).map((u, $index) => (<React.Fragment key={$index}><R.O value={u} label={u} /></React.Fragment>))}
                    </R.Sel>
                  </R.E>
                </R.G>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Prémio · opcional"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.x1?.premio} onChange={v.x1?.setPremio} placeholder="Ex. 1 mês grátis para os 3 primeiros" />
                </R.E>
              </R.E>
            </>) : null}
            <R.E s="display:flex;flex-direction:column;gap:10px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Filial"}</R.T>
              <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                {R.list(v.x1?.fils).map((f, $index) => (<React.Fragment key={$index}>
                  <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;min-width:48px;padding:0 12px;border:1px solid ${R.s(f?.bd)};background:${R.s(f?.bg)};color:${R.s(f?.c)};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={f?.pick} a_pressed={f?.on} tag="button">
                    <R.T>{R.x(f?.l)}</R.T>
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </R.E>
            <R.T s={`padding:12px 14px;background:${R.s(v.x1?.noteBg)};font-size:13px;line-height:1.5`}>{R.x(v.x1?.note)}</R.T>
            {v.x1?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.x1?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.x1?.submit} tag="button">
              <R.T>{R.x(v.x1?.cta)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.k1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goHome} tag="button">
              <R.T>{"← "}{R.x(v.homeLabel)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.k1?.kicker)}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Recuperação"}</R.T>
          </R.E>
          <R.E s="background:#c8640c;padding:16px 24px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px">
            <R.E s="display:flex;flex-direction:column;gap:4px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"Recuperados em Outubro"}</R.T>
              <R.T s="font-size:12px">{R.x(v.k1?.recSub)}</R.T>
            </R.E>
            <R.E s="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
              <R.T s="font-size:28px;font-weight:300;line-height:1">{R.x(v.k1?.recKz)}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{"Kz recebidos"}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:14px 24px 0">
            <R.G s="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;padding:4px;background:#ebe6d6" role="tablist">
              {R.list(v.k1?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                  <R.T>{R.x(t?.l)}</R.T>
                  <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.G>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.k1?.isRisk ? (<>
              <R.E s="display:flex;flex-direction:column">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:8px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Sem entradas há"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.k1?.lims).map((l, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(l?.bd)};background:${R.s(l?.bg)};color:${R.s(l?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={l?.pick} a_pressed={l?.on} tag="button">
                        <R.T>{R.x(l?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.T s="font-size:12px;line-height:1.45;color:#6b675f;padding-bottom:10px">{"Comparado com o padrão habitual de cada membro. Excluídos "}{R.x(v.k1?.excl)}{" membros com plano congelado ou pausa autorizada."}</R.T>
                {R.list(v.k1?.risk).map((r, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;flex-direction:column;gap:6px;padding:14px 0;border-top:1px solid #e4e0d6">
                    <R.E s="display:flex;align-items:flex-start;gap:12px">
                      <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{"Última entrada há "}{R.x(r?.days)}{" dias · "}<R.T s="color:#b42318">{R.x(r?.freq)}</R.T></R.T>
                        <R.T s="font-size:11px;color:#6b675f">{R.x(r?.plan)}{" · resp. "}{R.x(r?.resp)}</R.T>
                      </R.E>
                      {r?.todo ? (<>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={r?.toggle} tag="button">
                          <R.T>{"Contactar"}</R.T>
                        </R.E>
                      </>) : null}
                      {r?.done ? (<>
                        <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(r?.s?.bg)};color:${R.s(r?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                          <R.T>{R.x(r?.s?.l)}</R.T>
                        </R.E>
                      </>) : null}
                    </R.E>
                    {r?.open ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:12px;padding:14px;margin-top:4px;background:#ebe6d6">
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Motivo"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(r?.motivos).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Resultado do contacto"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(r?.results).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px" onPress={r?.close} tag="button">
                            <R.T>{"Cancelar"}</R.T>
                          </R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px" onPress={r?.save} tag="button">
                            <R.T>{"Guardar"}</R.T>
                          </R.E>
                        </R.G>
                      </R.E>
                    </>) : null}
                  </R.E>
                </React.Fragment>))}
                {v.k1?.riskEmpty ? (<>
                  <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Ninguém neste intervalo."}</R.T>
                </>) : null}
              </R.E>
            </>) : null}
            {v.k1?.isRen ? (<>
              <R.E s="display:flex;flex-direction:column">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding-bottom:10px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Vence nos próximos"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.k1?.rlims).map((l, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(l?.bd)};background:${R.s(l?.bg)};color:${R.s(l?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={l?.pick} a_pressed={l?.on} tag="button">
                        <R.T>{R.x(l?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                {R.list(v.k1?.ren).map((r, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;flex-direction:column;gap:6px;padding:14px 0;border-top:1px solid #e4e0d6">
                    <R.E s="display:flex;align-items:flex-start;gap:12px">
                      <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                        <R.T s="font-size:12px;color:#55524b">{"Vence em "}{R.x(r?.days)}{" dias · "}{R.x(r?.v)}{" Kz"}</R.T>
                        <R.T s={`font-size:11px;color:${R.s(r?.hc)}`}>{R.x(r?.plan)}{" · "}{R.x(r?.hist)}</R.T>
                      </R.E>
                      {r?.todo ? (<>
                        <R.E s="display:flex;flex-direction:column;gap:6px">
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={r?.toggle} tag="button">
                            <R.T>{"Contactar"}</R.T>
                          </R.E>
                          {r?.canCharge ? (<>
                            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={r?.cobrar} tag="button">
                              <R.T>{"Cobrar"}</R.T>
                            </R.E>
                          </>) : null}
                        </R.E>
                      </>) : null}
                      {r?.done ? (<>
                        <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(r?.s?.bg)};color:${R.s(r?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                          <R.T>{R.x(r?.s?.l)}</R.T>
                        </R.E>
                      </>) : null}
                    </R.E>
                    {r?.open ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:12px;padding:14px;margin-top:4px;background:#ebe6d6">
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Motivo"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(r?.motivos).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Resultado do contacto"}</R.T>
                        <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                          {R.list(r?.results).map((x, $index) => (<React.Fragment key={$index}>
                            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                              <R.T>{R.x(x?.l)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                        <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px" onPress={r?.close} tag="button">
                            <R.T>{"Cancelar"}</R.T>
                          </R.E>
                          <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px" onPress={r?.save} tag="button">
                            <R.T>{"Guardar"}</R.T>
                          </R.E>
                        </R.G>
                      </R.E>
                    </>) : null}
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.e3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goTurno} tag="button">
              <R.T>{"← Turno"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.e3?.kicker)}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Passar turno"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.e3?.form ? (<>
              <R.E s="display:flex;flex-direction:column;gap:20px">
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Caixa do turno"}</R.T>
                  <R.E s="height:8px" />
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:8px;padding:8px 0;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Meio"}</R.T>
                    <R.T s="text-align:right">{"Esperado"}</R.T>
                    <R.T s="text-align:right">{"Contado"}</R.T>
                  </R.G>
                  <R.G s="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:8px;align-items:center;padding:10px 0;border-top:1px solid #e4e0d6;font-size:14px">
                    <R.E s="display:flex;flex-direction:column;gap:2px">
                      <R.T>{"Dinheiro"}</R.T>
                      <R.T s="font-size:11px;color:#6b675f">{"inclui fundo 20 000"}</R.T>
                    </R.E>
                    <R.T s="text-align:right">{R.x(v.e3?.cashExp)}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:38px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;text-align:right;font-family:inherit;font-size:15px;outline:none;width:100%;min-width:0" accessibilityLabel="Dinheiro contado" tag="input" value={v.e3?.cash} onChange={v.e3?.setCash} placeholder="Contar" inputMode="numeric" />
                  </R.G>
                  {R.list(v.e3?.digital).map((x, $index) => (<React.Fragment key={$index}>
                    <R.G s="display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr) minmax(0,1fr);gap:8px;align-items:center;padding:10px 0;border-top:1px solid #e4e0d6;font-size:14px">
                      <R.T>{R.x(x?.l)}</R.T>
                      <R.T s="text-align:right">{R.x(x?.v)}</R.T>
                      <R.T s="text-align:right;font-size:11px;font-weight:600;letter-spacing:.08em;color:#2e7d4f">{"Confirmado ✓"}</R.T>
                    </R.G>
                  </React.Fragment>))}
                  <R.E s={`display:flex;justify-content:space-between;align-items:center;padding:12px 14px;margin-top:6px;background:${R.s(v.e3?.difBg)};color:${R.s(v.e3?.difC)};font-size:14px;font-weight:500`}>
                    <R.T>{"Diferença"}</R.T>
                    <R.T>{R.x(v.e3?.dif)}</R.T>
                  </R.E>
                  {v.e3?.needJust ? (<>
                    <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f;padding-top:12px">
                      <R.T>{"Justificação · obrigatória"}</R.T>
                      <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.e3?.just} onChange={v.e3?.setJust} placeholder="O que aconteceu" rows="2" />
                    </R.E>
                  </>) : null}
                </R.E>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Pendências que passam"}</R.T>
                  <R.E s="height:6px" />
                  {R.list(v.e3?.pend).map((p, $index) => (<React.Fragment key={$index}>
                    <R.E s="display:flex;flex-direction:column;gap:2px;padding:12px 0;border-top:1px solid #e4e0d6">
                      <R.T s="font-size:14px">{R.x(p?.t)}</R.T>
                      <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Ocorrências"}</R.T>
                  <R.E s="height:6px" />
                  {R.list(v.e3?.occ).map((o, $index) => (<React.Fragment key={$index}>
                    <R.E s="display:flex;align-items:flex-start;gap:10px;padding:12px 0;border-top:1px solid #e4e0d6">
                      <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(o?.s?.bg)};color:${R.s(o?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                        <R.T>{R.x(o?.s?.l)}</R.T>
                      </R.E>
                      <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                        <R.T s="font-size:14px">{R.x(o?.t)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(o?.d)}</R.T>
                      </R.E>
                    </R.E>
                  </React.Fragment>))}
                  <R.E s="display:flex;gap:8px;padding-top:8px">
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;height:40px;font-size:14px" accessibilityLabel="Nova ocorrência" tag="input" value={v.e3?.occText} onChange={v.e3?.setOcc} placeholder="Nova ocorrência ou avaria" />
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px" onPress={v.e3?.addOcc} tag="button">
                      <R.T>{"Juntar"}</R.T>
                    </R.E>
                  </R.E>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Entregar a"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.e3?.to} onChange={v.e3?.setTo}>
                    {R.list(v.e3?.tos).map((t, $index) => (<React.Fragment key={$index}><R.O value={t} label={t} /></React.Fragment>))}
                  </R.Sel>
                </R.E>
                {v.e3?.err ? (<>
                  <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                    <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                    <R.T>{R.x(v.e3?.err)}</R.T>
                  </R.E>
                </>) : null}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.e3?.submit} tag="button">
                  <R.T>{"Entregar turno"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.e3?.waiting ? (<>
              <R.E s="display:flex;flex-direction:column;gap:10px;padding:18px;background:#f5ecd0;color:#7a5800" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#c99a1b" />
                  <R.T>{"A aguardar confirmação"}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.5;color:#1d1c1a">{R.x(v.e3?.to)}{" confirma a contagem e as pendências na app dela."}</R.T>
              </R.E>
            </>) : null}
            {v.e3?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:12px;padding:18px;background:#e3efe6;color:#2e7d4f" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Turno entregue"}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.5;color:#1d1c1a">{R.x(v.e3?.doneMsg)}</R.T>
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:44px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.sair} tag="button">
                  <R.T>{"Terminar sessão"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o8 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goHome} tag="button">
              <R.T>{"← Painel"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · Outubro"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Receitas perdidas"}</R.T>
          </R.E>
          <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:#ebe6d6">
            {R.list(v.o8?.kpis).map((x, $index) => (<React.Fragment key={$index}>
              <R.E s="padding:14px 16px;display:flex;flex-direction:column;gap:6px;border-right:1px solid #d9d4c4">
                <R.T s={`font-size:19px;font-weight:300;line-height:1;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                <R.T s="font-size:9px;font-weight:600;letter-spacing:.16em;text-transform:uppercase">{R.x(x?.l)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.G>
          <R.E s="padding:14px 24px 0">
            <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;padding:4px;background:#ebe6d6" role="tablist">
              {R.list(v.o8?.tabs).map((t, $index) => (<React.Fragment key={$index}>
                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:${R.s(t?.bg)};color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px`} onPress={t?.pick} role="tab" a_selected={t?.on} tag="button">
                  <R.T>{R.x(t?.l)}</R.T>
                  <R.T s="font-weight:400;color:#6b675f">{R.x(t?.n)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.G>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.T s="font-size:12px;line-height:1.45;color:#6b675f;padding-bottom:6px">{"Indícios para rever. Uma suspeita só passa a perda depois de confirmada."}</R.T>
            {R.list(v.o8?.list).map((l, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(l?.cat)}</R.T>
                  <R.T s="font-size:15px;font-weight:500;white-space:nowrap">{R.x(l?.v)}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.45">{R.x(l?.t)}</R.T>
                <R.T s="font-size:12px;color:#6b675f">{R.x(l?.o)}{" · resp. "}{R.x(l?.r)}</R.T>
                {l?.sent ? (<>
                  <R.T s="font-size:12px;font-weight:500;color:#7a5800">{R.x(l?.sentMsg)}</R.T>
                </>) : null}
                {l?.open ? (<>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap;padding-top:2px">
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;opacity:${R.s(l?.op)}`} onPress={l?.act} disabled={l?.sent} tag="button">
                      <R.T>{R.x(l?.a)}</R.T>
                    </R.E>
                    {l?.canConf ? (<>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={l?.conf} tag="button">
                        <R.T>{"Confirmar perda"}</R.T>
                      </R.E>
                    </>) : null}
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={l?.res} tag="button">
                      <R.T>{"Resolvido"}</R.T>
                    </R.E>
                  </R.E>
                </>) : null}
              </R.E>
            </React.Fragment>))}
            {v.o8?.empty ? (<>
              <R.T s="display:block;margin:1em 0;margin:0;padding:14px 0;border-top:1px solid #e4e0d6;font-size:13px;color:#6b675f">{"Nada nesta lista."}</R.T>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.a1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 16px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.back} tag="button">
              <R.T>{"← "}{R.x(v.ob?.backL)}</R.T>
            </R.E>
            <MuntuLogo variant="C" color="#1d1c1a" size={18} descriptor="Ginásio" />
          </R.E>
          <R.E s="padding:0 24px 16px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">
              {R.list(v.ob?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Criar conta"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:20px 24px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:20px">
              <R.T s="font-size:14px;line-height:1.5;color:#55524b">{"A conta do dono do ginásio. Depois juntas filiais, equipa e membros."}</R.T>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Nome do responsável"}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.ob?.nome} onChange={v.ob?.setNome} placeholder="Ex. Paulo Neto" />
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Telemóvel"}</R.T>
                <R.E s="display:flex;align-items:center;gap:10px;border-bottom:1px solid #1d1c1a">
                  <R.T s="font-size:16px;color:#8a867d;font-weight:400;letter-spacing:.02em;text-transform:none">{"+244"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;border-bottom:0" tag="input" value={v.ob?.tel} onChange={v.ob?.setTel} inputMode="tel" />
                </R.E>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Email"}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.ob?.email} onChange={v.ob?.setEmail} placeholder="Para facturas da MUNTU" inputMode="email" />
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Senha"}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.ob?.pw} onChange={v.ob?.setPw} type="password" placeholder="Mínimo 8 caracteres" />
              </R.E>
            </R.E>
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.ob?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.ob?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.next} tag="button">
              <R.T>{R.x(v.ob?.cta)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.a2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 16px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.back} tag="button">
              <R.T>{"← "}{R.x(v.ob?.backL)}</R.T>
            </R.E>
            <MuntuLogo variant="C" color="#1d1c1a" size={18} descriptor="Ginásio" />
          </R.E>
          <R.E s="padding:0 24px 16px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">
              {R.list(v.ob?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"O ginásio"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:20px 24px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:20px">
              <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                <R.T>{"Nome do ginásio"}</R.T>
                <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.ob?.gym} onChange={v.ob?.setGym} placeholder="Ex. Mwangolé Fit" />
              </R.E>
              <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"NIF"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.ob?.nif} onChange={v.ob?.setNif} inputMode="numeric" />
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Cidade"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.ob?.city} onChange={v.ob?.setCity}>
                    {R.list(v.ob?.cities).map((c, $index) => (<React.Fragment key={$index}><R.O value={c} label={c} /></React.Fragment>))}
                  </R.Sel>
                </R.E>
              </R.G>
              <R.E s="display:flex;flex-direction:column">
                <R.E s="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:6px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Filiais"}</R.T>
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.filN)}</R.T>
                </R.E>
                {R.list(v.ob?.fils).map((f, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;align-items:center;gap:12px;padding:10px 0;border-top:1px solid #e4e0d6">
                    <R.T s="font-size:13px;font-weight:300;width:24px">{R.x(f?.n)}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;height:38px;font-size:15px;border-bottom:0" accessibilityLabel="Nome da filial" tag="input" value={f?.v} onChange={f?.set} placeholder="Nome ou bairro da filial" />
                    {f?.canDel ? (<>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;width:32px;border:0;background:transparent;color:#6b675f;font-size:18px;cursor:pointer" onPress={f?.del} accessibilityLabel="Remover filial" tag="button">
                        <R.T>{"×"}</R.T>
                      </R.E>
                    </>) : null}
                  </R.E>
                </React.Fragment>))}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:40px;margin-top:6px" onPress={v.ob?.addFil} tag="button">
                  <R.T>{"+ Adicionar filial"}</R.T>
                </R.E>
              </R.E>
            </R.E>
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.ob?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.ob?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.next} tag="button">
              <R.T>{R.x(v.ob?.cta)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.a3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          {v.ob?.onb ? (<>
            <R.E s="padding:12px 24px 16px;display:flex;justify-content:space-between;align-items:center">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.back} tag="button">
                <R.T>{"← "}{R.x(v.ob?.backL)}</R.T>
              </R.E>
              <MuntuLogo variant="C" color="#1d1c1a" size={18} descriptor="Ginásio" />
            </R.E>
            <R.E s="padding:0 24px 16px;display:flex;flex-direction:column;gap:8px">
              <R.G s="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">
                {R.list(v.ob?.steps).map((s, $index) => (<React.Fragment key={$index}>
                  <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
                </React.Fragment>))}
              </R.G>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.stepLabel)}</R.T>
            </R.E>
            <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Importar dados"}</R.T></R.T>
          </>) : null}
          {v.ob?.own ? (<>
            <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goO4} tag="button">
                <R.T>{"← Conta"}</R.T>
              </R.E>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · importação assistida"}</R.T>
              <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Importar dados"}</R.T>
            </R.E>
          </>) : null}
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:14px">
              <R.T s="font-size:14px;line-height:1.5;color:#55524b">{"Planilha Excel ou CSV, ou exportação do sistema antigo. Nada é gravado antes de confirmares."}</R.T>
              {R.list(v.im?.kinds).map((k, $index) => (<React.Fragment key={$index}>
                <R.E s={`display:flex;flex-direction:column;gap:12px;padding:16px;border:1px solid ${R.s(k?.bd)};background:${R.s(k?.bg)}`}>
                  <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                    <R.E s="display:flex;flex-direction:column;gap:2px">
                      <R.T s="font-size:15px;font-weight:500">{R.x(k?.l)}</R.T>
                      <R.T s="font-size:12px;color:#6b675f">{R.x(k?.d)}</R.T>
                    </R.E>
                    {k?.empty ? (<>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap" onPress={k?.load} tag="button">
                        <R.T>{"Carregar"}</R.T>
                      </R.E>
                    </>) : null}
                  </R.E>
                  {k?.empty ? (<>
                    <R.E s="height:64px;display:flex;align-items:center;justify-content:center;border:1px dashed #c9c3b1;background:repeating-linear-gradient(45deg,#f4f1ea 0 6px,#fbfaf7 6px 12px);font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#6b675f">
                      <R.T>{R.x(k?.ph)}</R.T>
                    </R.E>
                  </>) : null}
                  {k?.loaded ? (<>
                    <R.E s="display:flex;flex-direction:column;gap:10px">
                      <R.T s="font-family:ui-monospace,Menlo,monospace;font-size:12px">{R.x(k?.file)}</R.T>
                      <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                        {R.list(k?.cols).map((c, $index) => (<React.Fragment key={$index}>
                          <R.T s={`padding:4px 8px;background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase`}>{R.x(c?.l)}</R.T>
                        </React.Fragment>))}
                      </R.E>
                      <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));background:#fbfaf7">
                        {R.list(k?.res).map((r, $index) => (<React.Fragment key={$index}>
                          <R.E s="padding:10px;display:flex;flex-direction:column;gap:4px">
                            <R.T s={`font-size:18px;font-weight:300;line-height:1;color:${R.s(r?.c)}`}>{R.x(r?.v)}</R.T>
                            <R.T s="font-size:9px;font-weight:600;letter-spacing:.14em;text-transform:uppercase">{R.x(r?.l)}</R.T>
                          </R.E>
                        </React.Fragment>))}
                      </R.G>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:10px;padding:0;border:0;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;font-size:13px" onPress={k?.merge} role="checkbox" a_checked={k?.mergeOn} tag="button">
                        <R.E s={`width:16px;height:16px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(k?.mergeBg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:11px`}>
                          <R.T>{R.x(k?.mergeTick)}</R.T>
                        </R.E>
                        <R.T>{"Fundir duplicados pelo telefone"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;padding:0;border:0;background:transparent;color:#9a4c08;font-size:13px;cursor:pointer;font-family:inherit" onPress={k?.toggleErr} tag="button">
                        <R.T>{R.x(k?.errL)}</R.T>
                      </R.E>
                      {k?.showErr ? (<>
                        <R.E s="display:flex;flex-direction:column;background:#fbfaf7;padding:4px 12px">
                          {R.list(k?.errs).map((e, $index) => (<React.Fragment key={$index}>
                            <R.E s="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid #e4e0d6;font-size:12px">
                              <R.T>{"Linha "}{R.x(e?.l)}{" · "}{R.x(e?.n)}</R.T>
                              <R.T s="color:#b42318">{R.x(e?.p)}</R.T>
                            </R.E>
                          </React.Fragment>))}
                        </R.E>
                      </>) : null}
                    </R.E>
                  </>) : null}
                </R.E>
              </React.Fragment>))}
              {v.ob?.onb ? (<>
                <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"Também podes começar sem importar e inscrever membros na recepção."}</R.T>
              </>) : null}
            </R.E>
          </R.E>
          {v.ob?.onb ? (<>
            <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
              {v.ob?.err ? (<>
                <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                  <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                  <R.T>{R.x(v.ob?.err)}</R.T>
                </R.E>
              </>) : null}
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.next} tag="button">
                <R.T>{R.x(v.ob?.cta)}</R.T>
              </R.E>
            </R.E>
          </>) : null}
          {v.ob?.own ? (<>
            <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6">
              {v.im?.err ? (<>
                <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                  <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                  <R.T>{R.x(v.im?.err)}</R.T>
                </R.E>
              </>) : null}
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%" onPress={v.im?.confirm} tag="button">
                <R.T>{R.x(v.im?.cta)}</R.T>
              </R.E>
            </R.E>
          </>) : null}
        </R.E>
      </>) : null}
      {v.is?.a4 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 16px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.back} tag="button">
              <R.T>{"← "}{R.x(v.ob?.backL)}</R.T>
            </R.E>
            <MuntuLogo variant="C" color="#1d1c1a" size={18} descriptor="Ginásio" />
          </R.E>
          <R.E s="padding:0 24px 16px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">
              {R.list(v.ob?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Confirmar"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column">
              {R.list(v.ob?.summary).map((x, $index) => (<React.Fragment key={$index}>
                <R.E s="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:13px 0;border-bottom:1px solid #e4e0d6">
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:14px">{R.x(x?.l)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                  </R.E>
                  <R.T s={`font-size:16px;font-weight:500;white-space:nowrap;color:${R.s(x?.c)}`}>{R.x(x?.v)}</R.T>
                </R.E>
              </React.Fragment>))}
              <R.E s="height:16px" />
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Planos encontrados"}</R.T>
              <R.E s="height:6px" />
              {R.list(v.ob?.plans).map((p, $index) => (<React.Fragment key={$index}>
                <R.E s="display:flex;justify-content:space-between;gap:12px;padding:11px 0;border-top:1px solid #e4e0d6;font-size:14px">
                  <R.T>{R.x(p?.n)}</R.T>
                  <R.T s="color:#55524b">{R.x(p?.v)}{" Kz · "}{R.x(p?.m)}{" membros"}</R.T>
                </R.E>
              </React.Fragment>))}
              <R.E s="height:16px" />
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:flex-start;gap:12px;padding:14px;border:0;background:#ebe6d6;text-align:left;cursor:pointer;color:#1d1c1a;font-size:13px;line-height:1.5" onPress={v.ob?.flipOk} role="checkbox" a_checked={v.ob?.ok} tag="button">
                <R.E s={`width:18px;height:18px;flex-shrink:0;margin-top:1px;border:1.5px solid #1d1c1a;background:${R.s(v.ob?.okBg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px`}>
                  <R.T>{R.x(v.ob?.okTick)}</R.T>
                </R.E>
                <R.T>{"Confirmo que os dados estão correctos e que os membros aceitaram ser contactados pelo ginásio."}</R.T>
              </R.E>
            </R.E>
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.ob?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.ob?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.next} tag="button">
              <R.T>{R.x(v.ob?.cta)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.a5 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 16px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.ob?.back} tag="button">
              <R.T>{"← "}{R.x(v.ob?.backL)}</R.T>
            </R.E>
            <MuntuLogo variant="C" color="#1d1c1a" size={18} descriptor="Ginásio" />
          </R.E>
          <R.E s="padding:0 24px 16px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(5,1fr);gap:4px">
              {R.list(v.ob?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.ob?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Avisar todos"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.sm?.form ? (<>
              <R.E s="display:flex;flex-direction:column;gap:18px">
                <R.T s="font-size:14px;line-height:1.5;color:#55524b">{"Cada pessoa recebe uma SMS com o seu número de acesso e uma senha temporária."}</R.T>
                <R.E s="display:flex;flex-direction:column">
                  {R.list(v.sm?.aud).map((a, $index) => (<React.Fragment key={$index}>
                    <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={a?.flip} role="checkbox" a_checked={a?.on} tag="button">
                      <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(a?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                        <R.T>{R.x(a?.tick)}</R.T>
                      </R.E>
                      <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                        <R.T s="font-size:14px;font-weight:500">{R.x(a?.l)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(a?.d)}</R.T>
                      </R.E>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Mensagem"}</R.T>
                  <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.5;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.sm?.text} onChange={v.sm?.setText} rows="4" />
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:6px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Pré-visualização · "}{R.x(v.sm?.pvName)}</R.T>
                  <R.T s="background:#ebe6d6;padding:12px 14px;font-size:14px;line-height:1.5">{R.x(v.sm?.preview)}</R.T>
                  <R.T s="font-size:11px;color:#6b675f">{R.x(v.sm?.chars)}</R.T>
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Quando"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.sm?.when).map((w, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(w?.bd)};background:${R.s(w?.bg)};color:${R.s(w?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={w?.pick} a_pressed={w?.on} tag="button">
                        <R.T>{R.x(w?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.E s="display:flex;justify-content:space-between;align-items:center;padding:14px;background:#c8640c">
                  <R.E s="display:flex;flex-direction:column;gap:3px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"SMS a enviar"}</R.T>
                    <R.T s="font-size:12px">{R.x(v.sm?.saldo)}</R.T>
                  </R.E>
                  <R.T s="font-size:28px;font-weight:300;line-height:1">{R.x(v.sm?.total)}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.sm?.sending ? (<>
              <R.E s="display:flex;flex-direction:column;gap:14px;padding:20px;background:#ebe6d6" role="status">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"A enviar"}</R.T>
                <R.T s="font-size:40px;font-weight:300;line-height:1">{R.x(v.sm?.sent)}{" "}<R.T s="font-size:16px;color:#55524b">{"de "}{R.x(v.sm?.total)}</R.T></R.T>
                <R.E s="height:6px;background:#fbfaf7">
                  <R.E s={`display:block;height:6px;width:${R.s(v.sm?.pct)};background:#c8640c`} />
                </R.E>
              </R.E>
            </>) : null}
            {v.sm?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:12px;padding:18px;background:#e3efe6" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#2e7d4f">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Credenciais enviadas"}</R.T>
                </R.E>
                <R.T s="font-size:15px;line-height:1.5;color:#1d1c1a">{R.x(v.sm?.doneMsg)}</R.T>
                <R.E s="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid #c5dccb;font-size:13px;color:#1d1c1a">
                  <R.T>{R.x(v.sm?.failMsg)}</R.T>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;padding:0;border:0;background:transparent;color:#9a4c08;font-size:13px;cursor:pointer;font-family:inherit" onPress={v.sm?.retry} tag="button">
                    <R.T>{R.x(v.sm?.retryL)}</R.T>
                  </R.E>
                </R.E>
              </R.E>
            </>) : null}
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.sm?.form ? (<>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%" onPress={v.sm?.send} tag="button">
                <R.T>{R.x(v.sm?.cta)}</R.T>
              </R.E>
            </>) : null}
            {v.sm?.done ? (<>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%" onPress={v.ob?.finish} tag="button">
                <R.T>{"Entrar no painel"}</R.T>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o9 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goO3} tag="button">
              <R.T>{"← Filiais"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Replica uma filial existente"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Nova filial"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.nf?.form ? (<>
              <R.E s="display:flex;flex-direction:column;gap:20px">
                <R.G s="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px">
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Nome"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.nf?.n} onChange={v.nf?.setN} placeholder="Ex. Viana" />
                  </R.E>
                  <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                    <R.T>{"Cidade"}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.nf?.c} onChange={v.nf?.setC} />
                  </R.E>
                </R.G>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Copiar de"}</R.T>
                  <R.Sel s="padding:1px 2px;border:1px solid #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;cursor:pointer" tag="select" value={v.nf?.from} onChange={v.nf?.setFrom}>
                    <R.O value={"Talatona"} label={"Talatona"} />
                    <R.O value={"Kilamba"} label={"Kilamba"} />
                    <R.O value={"Maianga"} label={"Maianga"} />
                  </R.Sel>
                </R.E>
                <R.E s="display:flex;flex-direction:column">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"O que copiar"}</R.T>
                  <R.E s="height:6px" />
                  <R.E s="display:flex;flex-direction:column">
                    {R.list(v.nf?.items).map((x, $index) => (<React.Fragment key={$index}>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:center;gap:14px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a" onPress={x?.flip} role="checkbox" a_checked={x?.on} tag="button">
                        <R.E s={`width:18px;height:18px;flex-shrink:0;border:1.5px solid #1d1c1a;background:${R.s(x?.bg)};color:#fbfaf7;display:flex;align-items:center;justify-content:center;font-size:12px;line-height:1`}>
                          <R.T>{R.x(x?.tick)}</R.T>
                        </R.E>
                        <R.E s="flex:1;display:flex;flex-direction:column;gap:2px">
                          <R.T s="font-size:14px;font-weight:500">{R.x(x?.l)}</R.T>
                          <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                        </R.E>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                <R.T s="padding:12px 14px;background:#ebe6d6;font-size:13px;line-height:1.5">{"Membros, pagamentos, caixas e documentos pessoais não são copiados."}</R.T>
                <R.E s="display:flex;flex-direction:column;gap:10px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Equipa inicial"}</R.T>
                  <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                    {R.list(v.nf?.team).map((t, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(t?.bd)};background:${R.s(t?.bg)};color:${R.s(t?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={t?.pick} a_pressed={t?.on} tag="button">
                        <R.T>{R.x(t?.l)}</R.T>
                      </R.E>
                    </React.Fragment>))}
                  </R.E>
                </R.E>
                {v.nf?.err ? (<>
                  <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                    <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                    <R.T>{R.x(v.nf?.err)}</R.T>
                  </R.E>
                </>) : null}
                <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.nf?.create} tag="button">
                  <R.T>{"Criar filial"}</R.T>
                </R.E>
              </R.E>
            </>) : null}
            {v.nf?.done ? (<>
              <R.E s="display:flex;flex-direction:column;gap:12px;padding:18px;background:#e3efe6" role="status">
                <R.E s="display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#2e7d4f">
                  <R.E s="width:8px;height:8px;border-radius:50%;background:#2e7d4f" />
                  <R.T>{"Filial criada"}</R.T>
                </R.E>
                <R.T s="font-size:15px;line-height:1.5;color:#1d1c1a">{R.x(v.nf?.doneMsg)}</R.T>
                <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.goO3} tag="button">
                    <R.T>{"Ver filiais"}</R.T>
                  </R.E>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;height:44px" onPress={v.goImport} tag="button">
                    <R.T>{"Importar membros"}</R.T>
                  </R.E>
                </R.G>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o10 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goO4} tag="button">
              <R.T>{"← Conta"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.gymName)}{" · "}{R.x(v.cf?.total)}{" documentos"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Cofre"}</R.T>
          </R.E>
          <R.E s="padding:14px 24px 0">
            <R.E s="display:flex;gap:6px;flex-wrap:wrap">
              {R.list(v.cf?.cats).map((c, $index) => (<React.Fragment key={$index}>
                <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(c?.bd)};background:${R.s(c?.bg)};color:${R.s(c?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={c?.pick} a_pressed={c?.on} tag="button">
                  <R.T>{R.x(c?.l)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.cf?.alert ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;margin-bottom:10px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="status">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.cf?.alert)}</R.T>
              </R.E>
            </>) : null}
            {R.list(v.cf?.list).map((d, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="width:36px;height:44px;flex-shrink:0;display:flex;align-items:flex-end;justify-content:center;padding-bottom:6px;background:#ebe6d6;font-family:ui-monospace,Menlo,monospace;font-size:9px;color:#55524b">
                  <R.T>{R.x(d?.ext)}</R.T>
                </R.E>
                <R.E s="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                  <R.T s="font-size:14px;font-weight:500">{R.x(d?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(d?.cat)}{" · "}{R.x(d?.f)}{" · "}{R.x(d?.dt)}</R.T>
                  <R.T s={`font-size:11px;color:${R.s(d?.kc)}`}>{R.x(d?.keep)}</R.T>
                  <R.T s="font-size:11px;color:#6b675f">{"Acesso: "}{R.x(d?.perm)}</R.T>
                </R.E>
              </R.E>
            </React.Fragment>))}
            <R.E s="height:12px" />
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:48px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.cf?.upload} tag="button">
              <R.T>{"+ Carregar documento"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o11 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goO4} tag="button">
              <R.T>{"← Conta"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Quem pode autorizar o quê"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Regras"}</R.T>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {R.list(v.rg?.rules).map((r, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:10px;padding:16px 0;border-bottom:1px solid #e4e0d6">
                <R.E s="display:flex;flex-direction:column;gap:2px">
                  <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(r?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}</R.T>
                </R.E>
                {R.list(r?.tiers).map((t, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;align-items:center;gap:10px;font-size:14px">
                    <R.T s="flex:1">{R.x(t?.who)}</R.T>
                    {t?.edit ? (<>
                      <R.E s="display:flex;align-items:center;gap:0;border:1px solid #1d1c1a">
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:32px;height:32px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={t?.dec} accessibilityLabel="Diminuir" tag="button">
                          <R.T>{"−"}</R.T>
                        </R.E>
                        <R.T s="min-width:84px;text-align:center;font-size:13px;font-weight:500">{R.x(t?.v)}</R.T>
                        <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:32px;height:32px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={t?.inc} accessibilityLabel="Aumentar" tag="button">
                          <R.T>{"+"}</R.T>
                        </R.E>
                      </R.E>
                    </>) : null}
                    {t?.fixed ? (<>
                      <R.T s="font-size:13px;color:#55524b">{R.x(t?.v)}</R.T>
                    </>) : null}
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </React.Fragment>))}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 0;border:0;border-bottom:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;font-size:14px;font-family:inherit" onPress={v.rg?.flipBio} role="checkbox" a_checked={v.rg?.bio} tag="button">
              <R.T>{"Aprovar com Face ID"}</R.T>
              <R.E s={`width:40px;height:24px;flex-shrink:0;background:${R.s(v.rg?.bioBg)};position:relative`}>
                <R.E s={`position:absolute;top:3px;left:${R.s(v.rg?.bioX)}px;width:18px;height:18px;background:#fbfaf7`} />
              </R.E>
            </R.E>
            <R.E s="height:16px" />
            {v.rg?.saved ? (<>
              <R.T s="padding:12px 14px;margin-bottom:10px;background:#e3efe6;color:#2e7d4f;font-size:13px;font-weight:500" role="status">{"Regras guardadas. Aplicam-se a partir de agora em todas as filiais."}</R.T>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.rg?.save} tag="button">
              <R.T>{"Guardar regras"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.o12 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goO4} tag="button">
              <R.T>{"← Conta"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Membros que trazem membros"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Indicações"}</R.T>
          </R.E>
          <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
            {R.list(v.ri?.kpis).map((x, $index) => (<React.Fragment key={$index}>
              <R.E s="padding:14px 24px;display:flex;flex-direction:column;gap:6px;border-bottom:1px solid #d9d4c4">
                <R.T s="font-size:22px;font-weight:300;line-height:1">{R.x(x?.v)}</R.T>
                <R.T s="font-size:9px;font-weight:600;letter-spacing:.18em;text-transform:uppercase">{R.x(x?.l)}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.G>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.ri?.hasRev ? (<>
              <R.E s="display:flex;flex-direction:column;padding-bottom:16px">
                <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"A validar"}</R.T>
                <R.E s="height:6px" />
                {R.list(v.ri?.rev).map((v, $index) => (<React.Fragment key={$index}>
                  <R.E s="display:flex;flex-direction:column;gap:8px;padding:12px 0;border-top:1px solid #e4e0d6">
                    <R.T s="font-size:14px">{R.x(v?.t)}</R.T>
                    <R.T s="font-size:12px;color:#b42318">{R.x(v?.why)}</R.T>
                    <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:38px" onPress={v?.no} tag="button">
                        <R.T>{"Não elegível"}</R.T>
                      </R.E>
                      <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;padding:0 12px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;white-space:nowrap;height:38px" onPress={v?.yes} tag="button">
                        <R.T>{"Validar"}</R.T>
                      </R.E>
                    </R.G>
                  </R.E>
                </React.Fragment>))}
              </R.E>
            </>) : null}
            <R.E s="display:flex;flex-direction:column;gap:14px;padding-bottom:16px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Regras"}</R.T>
              <R.E s="display:flex;flex-direction:column;gap:8px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Recompensa do membro"}</R.T>
                <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                  {R.list(v.ri?.rewards).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                      <R.T>{R.x(x?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
              </R.E>
              <R.E s="display:flex;flex-direction:column;gap:8px">
                <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Liberta após"}</R.T>
                <R.E s="display:flex;gap:6px;flex-wrap:wrap">
                  {R.list(v.ri?.conds).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;min-width:44px;padding:0 10px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                      <R.T>{R.x(x?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
              </R.E>
              <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"Elegível: número e NIF novos, sem inscrição nos últimos 6 meses. A recompensa só sai com pagamento confirmado."}</R.T>
            </R.E>
            <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Quem mais indica"}</R.T>
            <R.E s="height:6px" />
            {R.list(v.ri?.top).map((t, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;justify-content:space-between;gap:12px;padding:12px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.E s="display:flex;flex-direction:column;gap:2px">
                  <R.T>{R.x(t?.n)}</R.T>
                  <R.T s="font-size:12px;color:#6b675f">{R.x(t?.d)}</R.T>
                </R.E>
                <R.T s="white-space:nowrap">{R.x(t?.v)}{" Kz"}</R.T>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.m8 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:4px 24px 20px;display:flex;flex-direction:column;gap:8px;border-bottom:1px solid #e4e0d6">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;align-self:flex-start;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.goM4} tag="button">
              <R.T>{"← Conta"}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Programa de indicação"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Indica e ganha"}</R.T>
          </R.E>
          <R.E s="background:#c8640c;padding:18px 24px;display:flex;flex-direction:column;gap:12px">
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase">{"O teu código"}</R.T>
            <R.T s="font-size:30px;font-weight:400;letter-spacing:.14em;line-height:1">{R.x(v.mi?.code)}</R.T>
            <R.T s="font-family:ui-monospace,Menlo,monospace;font-size:12px">{"muntu.ao/i/"}{R.x(v.mi?.code)}</R.T>
            <R.G s="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={v.mi?.wa} tag="button">
                <R.T>{"WhatsApp"}</R.T>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={v.mi?.sms} tag="button">
                <R.T>{"SMS"}</R.T>
              </R.E>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:38px;border:1px solid #1d1c1a;background:transparent;color:#1d1c1a;font-size:10px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;cursor:pointer" onPress={v.mi?.copy} tag="button">
                <R.T>{R.x(v.mi?.copyL)}</R.T>
              </R.E>
            </R.G>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:6px;padding-bottom:18px">
              <R.T s="font-size:15px;font-weight:500;line-height:1.4">{R.x(v.mi?.rule)}</R.T>
              <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"Quem indicas tem de ser novo no ginásio. A recompensa é libertada quando o pagamento for confirmado."}</R.T>
            </R.E>
            <R.E s="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:6px">
              <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"As tuas indicações"}</R.T>
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.mi?.earned)}</R.T>
            </R.E>
            {R.list(v.mi?.list).map((r, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:8px;padding:13px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px">
                  <R.E s="display:flex;flex-direction:column;gap:2px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(r?.n)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(r?.d)}</R.T>
                  </R.E>
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(r?.s?.bg)};color:${R.s(r?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(r?.s?.l)}</R.T>
                  </R.E>
                </R.E>
                <R.E s="height:4px;background:#ebe6d6">
                  <R.E s={`display:block;height:4px;width:${R.s(r?.w)};background:#c8640c`} />
                </R.E>
              </R.E>
            </React.Fragment>))}
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.t0 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 18px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid #e4e0d6">
            <R.E s="display:flex;justify-content:space-between;align-items:center">
              <MuntuLogo variant="C" color="#1d1c1a" size={20} descriptor="Ginásio" />
              <R.T s="padding:5px 8px;background:#1d1c1a;color:#fbfaf7;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Recepção"}</R.T>
            </R.E>
            <R.E s="display:flex;flex-direction:column;gap:6px">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Quinta-feira · Turno da tarde"}</R.T>
              <R.T s="font-size:32px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Receber turno"}</R.T>
            </R.E>
          </R.E>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.E s="display:flex;flex-direction:column;gap:6px;padding:16px;background:#ebe6d6">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Turno anterior"}</R.T>
              <R.T s="font-size:20px;font-weight:400;letter-spacing:.08em">{"Manhã · 07:00–14:00"}</R.T>
              <R.T s="font-size:13px;color:#55524b">{"Entregue por Celma Bento · "}{R.x(v.tv?.giverSt)}</R.T>
              <R.T s="font-size:13px;color:#55524b">{"Recebido por Teresa Lunda · tu"}</R.T>
            </R.E>
            <R.G s="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e4e0d6;margin:14px 0;border:1px solid #e4e0d6">
              {R.list(v.tv?.tiles).map((t, $index) => (<React.Fragment key={$index}>
                <R.E s="background:#fbfaf7;padding:14px;display:flex;flex-direction:column;gap:6px">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(t?.l)}</R.T>
                  <R.T s={`font-size:16px;font-weight:500;color:${R.s(t?.c)}`}>{R.x(t?.v)}</R.T>
                </R.E>
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:13px;font-weight:600;letter-spacing:.06em">{"O que precisas de fazer?"}</R.T>
            <R.T s="font-size:14px;line-height:1.5;color:#55524b;padding-top:4px">{"Conferir o dinheiro, verificar os pagamentos e rever as pendências antes de assumir o turno. O progresso fica guardado."}</R.T>
            <R.E s="flex:1;min-height:16px" />
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 0;border:0;border-top:1px solid #e4e0d6;background:transparent;text-align:left;cursor:pointer;color:#1d1c1a;font-size:13px;font-family:inherit" onPress={v.tv?.flipExc} tag="button">
              <R.T>{R.x(v.tv?.excL)}</R.T>
              <R.T s="color:#9a4c08">{R.x(v.tv?.excA)}</R.T>
            </R.E>
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.start} tag="button">
              <R.T>{R.x(v.tv?.startL)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.t1 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 14px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.back} tag="button">
              <R.T>{"← "}{R.x(v.tv?.backL)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Receber turno"}</R.T>
          </R.E>
          <R.E s="padding:0 24px 14px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
              {R.list(v.tv?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.tv?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Contar dinheiro"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.tv?.hidden ? (<>
              <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding-bottom:10px">{"Conta a caixa por denominação. O valor esperado só aparece depois de submeteres a contagem."}</R.T>
            </>) : null}
            {R.list(v.tv?.den).map((d, $index) => (<React.Fragment key={$index}>
              <R.G s="display:grid;grid-template-columns:minmax(0,1fr) 116px 84px;gap:10px;align-items:center;padding:9px 0;border-top:1px solid #e4e0d6;font-size:14px">
                <R.T>{R.x(d?.l)}</R.T>
                <R.E s={`display:flex;align-items:center;border:1px solid ${R.s(d?.bd)}`}>
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:32px;height:32px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={d?.dec} disabled={d?.ro} accessibilityLabel="Menos" tag="button">
                    <R.T>{"−"}</R.T>
                  </R.E>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;width:50px;height:32px;border:0;background:transparent;text-align:center;font-family:inherit;font-size:14px;outline:none;min-width:0" accessibilityLabel={d?.aria} tag="input" value={d?.q} onChange={d?.set} inputMode="numeric" readOnly={d?.ro} />
                  <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;width:32px;height:32px;border:0;background:transparent;font-size:16px;cursor:pointer;color:#1d1c1a" onPress={d?.inc} disabled={d?.ro} accessibilityLabel="Mais" tag="button">
                    <R.T>{"+"}</R.T>
                  </R.E>
                </R.E>
                <R.T s="text-align:right">{R.x(d?.sub)}</R.T>
              </R.G>
            </React.Fragment>))}
            <R.E s="display:flex;justify-content:space-between;align-items:baseline;padding:14px 0;border-top:1px solid #1d1c1a">
              <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Dinheiro contado"}</R.T>
              <R.T s="font-size:24px;font-weight:300">{R.x(v.tv?.counted)}{" Kz"}</R.T>
            </R.E>
            {v.tv?.revealed ? (<>
              <R.E s="display:flex;flex-direction:column;gap:12px">
                <R.G s="display:grid;grid-template-columns:1fr 1fr;background:#ebe6d6">
                  <R.E s="padding:14px;display:flex;flex-direction:column;gap:6px">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Saldo esperado"}</R.T>
                    <R.T s="font-size:22px;font-weight:300">{R.x(v.tv?.expected)}{" Kz"}</R.T>
                  </R.E>
                  <R.E s="padding:14px;display:flex;flex-direction:column;gap:6px;border-left:1px solid #d9d4c4">
                    <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Contado"}</R.T>
                    <R.T s="font-size:22px;font-weight:300">{R.x(v.tv?.counted)}{" Kz"}</R.T>
                  </R.E>
                </R.G>
                <R.T s="font-size:11px;line-height:1.5;color:#6b675f">{R.x(v.tv?.formula)}</R.T>
                <R.E s={`padding:16px;background:${R.s(v.tv?.difBg)};color:${R.s(v.tv?.difC)};display:flex;flex-direction:column;gap:4px`}>
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{R.x(v.tv?.difL)}</R.T>
                  <R.T s="font-size:34px;font-weight:300;line-height:1">{R.x(v.tv?.dif)}</R.T>
                </R.E>
                {v.tv?.hasDif ? (<>
                  <R.E s="display:flex;flex-direction:column;gap:10px">
                    <R.T s="font-size:12px;line-height:1.5;color:#6b675f">{"A diferença não prova, por si só, que houve fraude ou que alguém é responsável."}</R.T>
                    <R.T s="font-size:13px;font-weight:600">{"Como pretendes proceder?"}</R.T>
                    {R.list(v.tv?.opts).map((o, $index) => (<React.Fragment key={$index}>
                      <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;display:flex;align-items:flex-start;gap:12px;padding:12px;border:${R.s(o?.bd)};background:${R.s(o?.bg)};text-align:left;cursor:pointer;color:#1d1c1a`} onPress={o?.pick} role="radio" a_checked={o?.on} tag="button">
                        <R.E s="width:16px;height:16px;flex-shrink:0;margin-top:2px;border:1.5px solid #1d1c1a;display:flex;align-items:center;justify-content:center">
                          <R.E s={`width:8px;height:8px;background:${R.s(o?.dot)}`} />
                        </R.E>
                        <R.E s="display:flex;flex-direction:column;gap:2px">
                          <R.T s="font-size:14px;font-weight:500">{R.x(o?.l)}</R.T>
                          <R.T s="font-size:12px;line-height:1.4;color:#55524b">{R.x(o?.d)}</R.T>
                        </R.E>
                      </R.E>
                    </React.Fragment>))}
                    {v.tv?.needJust ? (<>
                      <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                        <R.T>{"Justificação"}</R.T>
                        <R.In s="padding:2px;border:1px solid #767676;background:#fff;font-size:13.333px;width:100%;padding:10px 12px;border:1px solid #d9d4c4;background:#fff;font-family:inherit;font-size:14px;line-height:1.45;color:#1d1c1a;resize:none;outline:none;text-transform:none;letter-spacing:0;font-weight:400" tag="textarea" value={v.tv?.just} onChange={v.tv?.setJust} placeholder="O que verificaste" rows="2" />
                      </R.E>
                    </>) : null}
                  </R.E>
                </>) : null}
              </R.E>
            </>) : null}
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.tv?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.tv?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.next1} tag="button">
              <R.T>{R.x(v.tv?.cta1)}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.t2 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 14px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.back} tag="button">
              <R.T>{"← "}{R.x(v.tv?.backL)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Receber turno"}</R.T>
          </R.E>
          <R.E s="padding:0 24px 14px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
              {R.list(v.tv?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.tv?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Pagamentos"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding-bottom:10px">{"Confere cada meio com o registo e os comprovativos. Pagamentos por confirmar não contam como dinheiro em caixa."}</R.T>
            {R.list(v.tv?.pays).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;justify-content:space-between;align-items:flex-start;gap:12px">
                  <R.E s="display:flex;flex-direction:column;gap:3px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(p?.l)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                  </R.E>
                  <R.T s="font-size:15px;white-space:nowrap">{R.x(p?.v)}</R.T>
                </R.E>
                <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px">
                  {R.list(p?.acts).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                      <R.T>{R.x(x?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.G>
              </R.E>
            </React.Fragment>))}
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.tv?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.tv?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.next2} tag="button">
              <R.T>{"Continuar"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.t3 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 14px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.back} tag="button">
              <R.T>{"← "}{R.x(v.tv?.backL)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Receber turno"}</R.T>
          </R.E>
          <R.E s="padding:0 24px 14px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
              {R.list(v.tv?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.tv?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Pendências"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            <R.T s="font-size:13px;line-height:1.5;color:#55524b;padding-bottom:10px">{"Marca cada caso como recebido, resolvido ou problema. Os que recebes passam a ser teus."}</R.T>
            {R.list(v.tv?.pend).map((p, $index) => (<React.Fragment key={$index}>
              <R.E s="display:flex;flex-direction:column;gap:10px;padding:14px 0;border-top:1px solid #e4e0d6">
                <R.E s="display:flex;align-items:flex-start;gap:10px">
                  <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(p?.k?.bg)};color:${R.s(p?.k?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                    <R.T>{R.x(p?.k?.l)}</R.T>
                  </R.E>
                  <R.E s="flex:1;display:flex;flex-direction:column;gap:3px">
                    <R.T s="font-size:14px;font-weight:500">{R.x(p?.t)}</R.T>
                    <R.T s="font-size:12px;color:#6b675f">{R.x(p?.d)}</R.T>
                  </R.E>
                </R.E>
                <R.G s="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px">
                  {R.list(p?.acts).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:34px;border:1px solid ${R.s(x?.bd)};background:${R.s(x?.bg)};color:${R.s(x?.c)};font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;cursor:pointer`} onPress={x?.pick} a_pressed={x?.on} tag="button">
                      <R.T>{R.x(x?.l)}</R.T>
                    </R.E>
                  </React.Fragment>))}
                </R.G>
              </R.E>
            </React.Fragment>))}
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.tv?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.tv?.err)}</R.T>
              </R.E>
            </>) : null}
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.next3} tag="button">
              <R.T>{"Continuar"}</R.T>
            </R.E>
          </R.E>
        </R.E>
      </>) : null}
      {v.is?.t4 ? (<>
        <R.E s="flex:1;display:flex;flex-direction:column;min-height:0">
          <R.E s="padding:12px 24px 14px;display:flex;justify-content:space-between;align-items:center">
            <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:32px;padding:0;border:0;background:transparent;color:#6b675f;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;cursor:pointer" onPress={v.tv?.back} tag="button">
              <R.T>{"← "}{R.x(v.tv?.backL)}</R.T>
            </R.E>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Receber turno"}</R.T>
          </R.E>
          <R.E s="padding:0 24px 14px;display:flex;flex-direction:column;gap:8px">
            <R.G s="display:grid;grid-template-columns:repeat(4,1fr);gap:4px">
              {R.list(v.tv?.steps).map((s, $index) => (<React.Fragment key={$index}>
                <R.E s={`height:4px;background:${R.s(s?.c)}`} title={s?.l} />
              </React.Fragment>))}
            </R.G>
            <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{R.x(v.tv?.stepLabel)}</R.T>
          </R.E>
          <R.T s="padding:0 24px 18px;border-bottom:1px solid #e4e0d6"><R.T s="font-size:28px;font-weight:400;letter-spacing:.18em;text-transform:uppercase;line-height:1.05">{"Assumir turno"}</R.T></R.T>
          <R.E s="flex:1;min-height:0;overflow:auto;padding:16px 24px 20px;display:flex;flex-direction:column">
            {v.tv?.notDone ? (<>
              <R.E s="display:flex;flex-direction:column;gap:16px">
                <R.E s="display:flex;flex-direction:column">
                  {R.list(v.tv?.sum).map((x, $index) => (<React.Fragment key={$index}>
                    <R.E s="display:flex;justify-content:space-between;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid #e4e0d6">
                      <R.E s="display:flex;flex-direction:column;gap:2px">
                        <R.T s="font-size:14px">{R.x(x?.l)}</R.T>
                        <R.T s="font-size:12px;color:#6b675f">{R.x(x?.d)}</R.T>
                      </R.E>
                      <R.E s={`display:inline-flex;align-items:center;gap:6px;padding:4px 8px;background:${R.s(x?.s?.bg)};color:${R.s(x?.s?.c)};font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap`}>
                        <R.T>{R.x(x?.s?.l)}</R.T>
                      </R.E>
                    </R.E>
                  </React.Fragment>))}
                </R.E>
                {v.tv?.ressalva ? (<>
                  <R.T s="padding:14px;background:#f5ecd0;color:#7a5800;font-size:13px;line-height:1.5">{"Recebes o turno com ressalva: confirmas que recebeste, mas não que o caixa está correcto. A diferença fica aberta até ser resolvida."}</R.T>
                </>) : null}
                <R.T s="font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase">{"Assinaturas"}</R.T>
                <R.E s="display:flex;flex-direction:column;gap:4px;padding:12px 14px;background:#ebe6d6">
                  <R.T s="font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">{"Entrega · Celma Bento"}</R.T>
                  {v.tv?.giverOk ? (<>
                    <R.T s="font-size:14px;color:#2e7d4f">{"Confirmou os valores declarados às 14:01 ✓"}</R.T>
                  </>) : null}
                  {v.tv?.exc ? (<>
                    <R.T s="font-size:13px;line-height:1.45">{"Já saiu. Recebimento sem conferência conjunta, com aprovação do supervisor."}</R.T>
                    <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0;height:38px;font-size:14px" accessibilityLabel="Motivo" tag="input" value={v.tv?.excMot} onChange={v.tv?.setExcMot} placeholder="Motivo · obrigatório" />
                  </>) : null}
                </R.E>
                <R.E s="display:flex;flex-direction:column;gap:8px;font-size:10px;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:#6b675f">
                  <R.T>{"Recebe · Teresa Lunda · confirma com a tua senha"}</R.T>
                  <R.In s="padding:1px 2px;border:2px inset #767676;background:#fff;font-size:13.333px;height:44px;border:0;border-bottom:1px solid #1d1c1a;background:transparent;padding:0;color:#1d1c1a;font-size:16px;font-weight:400;letter-spacing:.02em;outline:none;font-family:inherit;text-transform:none;width:100%;min-width:0" tag="input" value={v.tv?.pw} onChange={v.tv?.setPw} type="password" placeholder="••••••••" autoComplete="current-password" />
                </R.E>
                <R.T s="font-size:11px;line-height:1.5;color:#6b675f">{"A hora é registada pelo servidor. Depois de assumido, os valores não podem ser editados; correcções geram um ajuste com motivo e autor."}</R.T>
              </R.E>
            </>) : null}
            {v.tv?.done ? (<>
              <R.E s={`display:flex;flex-direction:column;gap:10px;padding:18px;background:${R.s(v.tv?.doneBg)}`} role="status">
                <R.E s={`display:flex;align-items:center;gap:10px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${R.s(v.tv?.doneC)}`}>
                  <R.E s={`width:8px;height:8px;border-radius:50%;background:${R.s(v.tv?.doneC)}`} />
                  <R.T>{R.x(v.tv?.doneT)}</R.T>
                </R.E>
                <R.T s="font-size:14px;line-height:1.5">{R.x(v.tv?.doneMsg)}</R.T>
              </R.E>
            </>) : null}
          </R.E>
          <R.E s="padding:12px 24px 16px;border-top:1px solid #e4e0d6;display:flex;flex-direction:column;gap:8px">
            {v.tv?.err ? (<>
              <R.E s="display:flex;align-items:center;gap:10px;padding:12px 14px;background:#f7e1de;color:#b42318;font-size:13px;font-weight:500" role="alert">
                <R.E s="width:8px;height:8px;border-radius:50%;flex-shrink:0;background:#b42318" />
                <R.T>{R.x(v.tv?.err)}</R.T>
              </R.E>
            </>) : null}
            {v.tv?.notDone ? (<>
              <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%;opacity:${R.s(v.tv?.busyOp)}`} onPress={v.tv?.confirm} disabled={v.tv?.busy} tag="button">
                <R.T>{R.x(v.tv?.cta4)}</R.T>
              </R.E>
            </>) : null}
            {v.tv?.done ? (<>
              <R.E s="padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;height:52px;border:0;background:#1d1c1a;color:#fbfaf7;font-size:12px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;width:100%" onPress={v.tv?.open} tag="button">
                <R.T>{"Abrir painel da recepção"}</R.T>
              </R.E>
            </>) : null}
          </R.E>
        </R.E>
      </>) : null}
      {v.showTabs ? (<>
        <R.E s="height:72px;flex-shrink:0;border-top:1px solid #e4e0d6;display:flex;background:#fbfaf7">
          {R.list(v.tabs).map((t, $index) => (<React.Fragment key={$index}>
            <R.E s={`padding:1px 6px;border:2px outset #767676;background:#efefef;font-size:13.333px;text-align:center;flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:0;background:transparent;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#1d1c1a;box-shadow:${R.s(t?.bar)};cursor:pointer`} onPress={t?.go} a_current={t?.cur} tag="button">
              <R.T s="font-size:12px;font-weight:300;letter-spacing:0">{R.x(t?.n)}</R.T>
              <R.T>{R.x(t?.l)}</R.T>
            </R.E>
          </React.Fragment>))}
        </R.E>
      </>) : null}
    </R.E>
    </>
  );
}

export const MuntuMobile = R.makeDC(Component, render, {"screen": "l1", "role": "rececao", "semRede": false}, "MuntuMobile");
export default MuntuMobile;
