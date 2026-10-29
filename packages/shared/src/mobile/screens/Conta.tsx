import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { GYM, MEMBRO } from '../../data/sample';
import { haptic } from '../../lib/haptics';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/notify';
import { Segmented, T, Toggle, em } from '../../ui';
import { MHeader, MScreen, MSection, PAD } from '../parts';

/** Conta — perfil, preferências e troca entre app do membro e app do dono. */
export function Conta() {
  const { c } = useTheme();
  const { go } = useNav();
  const notify = useNotify();
  const s = useMuntu();
  const [avisos, setAvisos] = useState(true);
  const membro = s.role === 'membro';
  const nome = membro ? MEMBRO.nome : GYM.dono;
  const ini = nome.split(' ').map((p) => p[0]).slice(0, 2).join('');

  const row = (label: string, sub: string | null, right: React.ReactNode, onPress?: () => void) => (
    <Pressable
      key={label}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      onPress={() => { haptic('tap'); onPress?.(); }}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, borderTopWidth: 1, borderColor: c.line }}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <T size={14} w={500}>{label}</T>
        {sub ? <T size={12} color={c.muted}>{sub}</T> : null}
      </View>
      {right}
    </Pressable>
  );

  return (
    <MScreen>
      <MHeader eyebrow={membro ? `${GYM.nome} · Membro #4822` : `${GYM.nome} · Dono`} title="Conta" />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, padding: PAD, backgroundColor: c.surface }}>
        <View style={{ width: 64, height: 64, backgroundColor: membro ? c.brand : c.invBg, alignItems: 'center', justifyContent: 'center' }}>
          <T size={22} w={300} color={membro ? '#1D1C1A' : c.invInk} style={{ letterSpacing: 2 }}>{ini}</T>
        </View>
        <View style={{ flex: 1, gap: 4 }}>
          <T size={18} w={400} style={{ letterSpacing: em(18, 0.12), textTransform: 'uppercase' }}>{nome}</T>
          <T size={12} color={c.ink2}>{membro ? `${MEMBRO.plano} · 923 456 789` : '3 filiais · 1 284 membros activos'}</T>
        </View>
      </View>
      <View style={{ padding: PAD, gap: 22 }}>
        <View style={{ gap: 10 }}>
          <MSection>Ver como</MSection>
          <Segmented
            value={s.role}
            onChange={(r) => {
              s.setRole(r);
              go(r === 'membro' ? 'acesso' : 'dono');
            }}
            options={[
              { v: 'membro', l: 'Membro' },
              { v: 'dono', l: 'Dono' },
            ]}
          />
        </View>
        <View style={{ gap: 10 }}>
          <MSection>Aparência</MSection>
          <Segmented
            value={s.themePref}
            onChange={s.setThemePref}
            options={[
              { v: 'light', l: 'Claro' },
              { v: 'dark', l: 'Escuro' },
              { v: 'system', l: 'Sistema' },
            ]}
          />
        </View>
        <View>
          {row(membro ? 'Avisos por SMS' : 'Pedidos de aprovação por SMS', membro ? 'Vencimento, pagamentos e aulas' : 'Estornos, caixa e preços', <Toggle value={avisos} onChange={setAvisos} label="Avisos por SMS" />)}
          {row('Face ID / impressão digital', membro ? 'Para pagar e abrir o QR' : 'Obrigatório para aprovar', <T size={11} w={600} color={c.ok} style={{ letterSpacing: em(11, 0.14), textTransform: 'uppercase' }}>Activo</T>)}
          {membro
            ? row('Congelar plano', 'Até 30 dias por ano', <T size={14}>→</T>, () => notify('Pedido de congelamento enviado à recepção', 'info'))
            : row('Simular sem rede', 'Como a recepção funciona offline', <Toggle value={s.offline} onChange={s.setOffline} label="Simular sem rede" />)}
          {row('Exportar os meus dados', 'Recebe um ficheiro por email', <T size={14}>→</T>, () => notify('Exportação pedida. Chega por email em minutos.', 'ok'))}
          {row('Terminar sessão', null, <T size={14}>→</T>, () => notify('Sessão de demonstração — nada a terminar', 'info'))}
        </View>
        <T size={11} color={c.muted}>MUNTU 0.1.0 · {GYM.nome}</T>
      </View>
    </MScreen>
  );
}
