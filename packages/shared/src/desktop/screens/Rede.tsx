import React from 'react';
import { useTheme } from '../../theme';
import { PARCEIROS } from '../../data/sample';
import { kn, kzSigned } from '../../lib/format';
import { useNav } from '../../shell/nav';
import { useNotify } from '../../shell/notify';
import { Btn, Cell, Page, PageHeader, Section, StatBand, Status, T, Table } from '../../ui';

export function Rede() {
  const { bp } = useTheme();
  const notify = useNotify();
  return (
    <Page>
      <PageHeader eyebrow="Acesso entre ginásios · Outubro 2026" title="Rede MUNTU" actions={<Btn label="Convidar ginásio" haptic="press" onPress={() => notify('Convite enviado por SMS', 'ok')} />} />
      <StatBand
        hero={{ label: 'Kz · Saldo do mês', value: kn(94000), sub: 'Liquidação automática a 31/10' }}
        stats={[
          { value: kn(186000), label: 'Kz · A receber' },
          { value: kn(92000), label: 'Kz · A pagar' },
          { value: '05', label: 'Parceiros' },
        ]}
      />
      <Section title="Ginásios parceiros">
        <Table
          rows={PARCEIROS}
          rowKey={(p) => p.n}
          minWidth={bp === 'medium' ? 700 : undefined}
          cols={[
            { key: 'n', label: 'Ginásio', flex: 1.3, render: (p) => <Cell strong>{p.n}</Cell>, compact: 'primary' },
            { key: 'c', label: 'Cidade', flex: 1, render: (p) => <Cell muted>{p.c}</Cell>, compact: 'secondary', text: (p) => p.c },
            { key: 'rec', label: 'Recebidas', w: 84, align: 'right', render: (p) => <Cell right>{p.rec}</Cell>, compact: 'secondary', text: (p) => `${p.rec} recebidas` },
            { key: 'env', label: 'Enviadas', w: 76, align: 'right', render: (p) => <Cell right>{p.env}</Cell>, compact: 'secondary', text: (p) => `${p.env} enviadas` },
            { key: 'saldo', label: 'Saldo', w: 130, align: 'right', render: (p) => <Cell strong right>{p.v === 0 ? '—' : kzSigned(p.v)}</Cell>, compact: 'end' },
            { key: 's', label: 'Estado', w: 180, render: (p) => <Status s={p.s} sub={p.why || undefined} />, compact: 'end' },
          ]}
        />
        <T v="small" size={13} style={{ paddingTop: 8 }}>
          Os parceiros só vêem acesso válido, nome e foto. Pagamentos, dados pessoais e avisos ficam no ginásio de origem.
        </T>
      </Section>
    </Page>
  );
}
