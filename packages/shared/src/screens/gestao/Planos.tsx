import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { useMuntu } from '../../store';
import { PLANOS, REGRAS } from '../../data/sample';
import { kn } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/AppShell';
import { Btn, Cols, Field, KV, ListRow, Note, Page, PageHeader, Section, T, Tag } from '../../ui';

export function Planos() {
  const { c, compact } = useTheme();
  const { bottomInset } = useNav();
  const notify = useNotify();
  const addApproval = useMuntu((s) => s.addApproval);
  const [edit, setEdit] = useState<number | null>(null);
  const [preco, setPreco] = useState('');

  return (
    <Page bottomInset={bottomInset}>
      <PageHeader eyebrow="Rede Mwangolé Fit · 3 filiais" title="Planos e regras" actions={<Btn label="Novo plano" haptic="press" onPress={() => notify('Novo plano: em breve', 'info')} />} />
      <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: c.line }}>
        <Cols cols={{ compact: 1, medium: 2, wide: 3 }}>
          {PLANOS.map((p, i) => {
            const editing = edit === p.id;
            return (
              <Section key={p.id} style={{ backgroundColor: editing ? c.surface2 : 'transparent' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <T size={13} w={300}>{String(i + 1).padStart(2, '0')}</T>
                  <Tag>{p.scope}</Tag>
                </View>
                <T v="title" size={compact ? 18 : 20}>{p.n}</T>
                <T v="num" size={32}>{kn(p.p)}</T>
                <KV items={[['Acesso', p.acesso], ['Horário', p.hor], ['Desconto máximo', p.desc], ['Membros', p.ativos ? `${p.ativos} activos` : 'Sem membros']]} />
                {editing ? (
                  <View style={{ gap: 12 }}>
                    <Field label="Novo preço (Kz)" value={preco} onChangeText={setPreco} keyboardType="numeric" placeholder={kn(p.p)} big />
                    <Note bg={c.warnBg} color={c.warn}>
                      {p.ativos
                        ? `Tem ${p.ativos} membros activos. A alteração vai para aprovação do dono e cada membro recebe SMS 30 dias antes.`
                        : 'Sem membros activos. Pode alterar o preço directamente.'}
                    </Note>
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <Btn kind="outline" size="sm" label="Cancelar" onPress={() => setEdit(null)} />
                      <Btn
                        size="sm"
                        label={p.ativos ? 'Pedir aprovação' : 'Guardar'}
                        disabled={!preco.trim()}
                        haptic={p.ativos ? 'warning' : 'success'}
                        onPress={() => {
                          if (p.ativos) {
                            addApproval({ id: 'preco-' + p.id, kind: 'preco', k: `Preço · ${p.n}`, t: `De ${kn(p.p, 0)} para ${preco} Kz. Os ${p.ativos} membros recebem SMS 30 dias antes.`, v: parseInt(preco.replace(/\D/g, ''), 10) || 0 });
                            notify('Pedido de alteração de preço enviado ao dono', 'warn');
                          } else notify('Preço actualizado', 'ok');
                          setEdit(null);
                        }}
                      />
                    </View>
                  </View>
                ) : (
                  <Btn kind="outline" size="sm" label="Alterar preço" onPress={() => { setPreco(''); setEdit(p.id); }} />
                )}
              </Section>
            );
          })}
        </Cols>
      </View>
      <Section title="Regras do negócio" style={{ maxWidth: 1000 }}>
        <View>
          {REGRAS.map(([n, v]) => (
            <ListRow key={n} style={{ flexWrap: compact ? 'wrap' : 'nowrap' }}>
              <T size={14} style={{ flex: 1, minWidth: compact ? '60%' : 0 }}>{n}</T>
              <T v="bodyStrong" style={{ flex: compact ? undefined : 1 }}>{v}</T>
              <Btn kind="outline" size="sm" label="Alterar" onPress={() => notify('Regras alteradas pedem aprovação do dono', 'info')} />
            </ListRow>
          ))}
        </View>
      </Section>
    </Page>
  );
}
