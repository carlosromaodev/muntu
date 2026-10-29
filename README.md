# MUNTU

Plataforma de gestão de ginásios: recepção, caixa, turnos, retenção, rede de ginásios e a app do membro.
Um só código para **iOS, Android, web desktop e web mobile** (Expo + React Native).

## Arrancar (Windows, macOS ou Linux)

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install                # na raiz — instala as três apps e o pacote partilhado
npm run fix-deps           # alinha as versões com o Expo SDK instalado (recomendado na 1.ª vez)

npm run web:desktop        # web desktop  → http://localhost:8081
npm run web:mobile         # web mobile   → http://localhost:8082 (abrir no telemóvel ou em modo telemóvel do browser)
npm run android            # Android (emulador ou Expo Go)
npm run ios                # iOS (simulador no macOS ou Expo Go no iPhone)
npm run build:web          # exporta as duas versões web para apps/*/dist
```

Cada ecrã tem a sua rota: `/recepcao`, `/inscricao`, `/membro`, `/caixa`, `/turno`, `/tesouraria`, `/painel`,
`/aprovacoes`, `/retencao`, `/planos`, `/rede`, `/avisos` e, na app do membro, `/acesso` e `/plano`.
No avatar (canto superior direito) muda-se entre **Gestão do ginásio** e **App do membro**, o tema claro/escuro
e o modo **sem rede**. Na web desktop, **⌘K / Ctrl+K** abre a pesquisa de membros.

## Estrutura

```
muntu/
├─ apps/
│  ├─ ios-android/   App nativa (iPhone, iPad, Android) · Face ID, vibração, EAS Build
│  ├─ web-desktop/   Web para computador · navegação de topo, tabelas completas, ⌘K
│  └─ web-mobile/    Web para o browser do telemóvel · barra inferior, instalável (PWA)
└─ packages/
   └─ shared/        Tudo o que as três apps partilham
      └─ src/
         ├─ screens/   14 telas (gestao/ e membro/)
         ├─ ui/        design system: T, Btn, HoldButton, StatBand, Table, Sheet, Chips, QR, Logo…
         ├─ shell/     cabeçalho, navegação de topo, barra inferior, folhas, pesquisa, conta
         ├─ theme/     tokens da marca (claro e escuro), breakpoints
         ├─ lib/       formatação Kz, vibração, biometria
         ├─ store/     estado partilhado (Zustand)
         └─ data/      dados de exemplo — substituir pela API
```

Cada app tem apenas as rotas (`app/`), a configuração (`app.json`), os ícones e o modo de navegação.
As telas e as regras vivem uma só vez em `packages/shared`, por isso uma correcção chega às três apps ao mesmo tempo.

| App | Navegação | Específico |
|---|---|---|
| `ios-android` | barra inferior no telemóvel, topo no tablet | Face ID / impressão digital, vibração nativa, EAS Build |
| `web-desktop` | sempre no topo | pesquisa ⌘K, painel lateral de detalhe, tabelas com todas as colunas |
| `web-mobile` | sempre em baixo | PWA instalável, ecrã inteiro, vibração no Chrome Android |

### Responsividade

Três breakpoints (`theme/tokens.ts`): **telemóvel** < 720 px, **tablet** 720–1099 px, **desktop** ≥ 1100 px.

- Tabelas mostram todas as colunas no desktop e viram cartões empilhados no telemóvel (`ui/Table.tsx`).
- As faixas de números passam de uma linha (desktop) para destaque + grelha (tablet/telemóvel).
- Painéis de detalhe abrem ao lado no desktop e como folha inferior no telemóvel (`ui/Sheet.tsx`).

## As 14 telas

| Gestão | | Membro |
|---|---|---|
| 01 Recepção · 02 Inscrição · 03 Membro · 04 Caixa | 05 Turno · 06 Tesouraria · 07 Painel · 08 Aprovações | 13 Acesso (QR que renova a cada 30 s) |
| 09 Retenção · 10 Planos · 11 Rede · 12 Avisos SMS | | 14 O meu plano (Multicaixa Express) |

Destaques das três frentes do ciclo actual:

- **Confiança operacional** — fecho de caixa com contagem cega, passagem de turno com divergência registada sem apagar o turno anterior, trilha de auditoria só de acrescentar, estornos com aprovação.
- **Retenção e rentabilidade** — membros em risco (frequência a cair + renovação próxima + sessões por realizar) com tarefa para a equipa e registo do resultado; fugas de receita no painel.
- **Estrutura para expansão** — filiais, Rede MUNTU entre ginásios, planos e regras com aprovação do dono.

## Vibração e confirmação

| Momento | Vibração |
|---|---|
| Mudar de separador, chip, interruptor | `select` |
| Botões normais | `tap` |
| Cobrar, abrir caixa, criar tarefa | `press` |
| Segurar para aprovar — a cada passo / no fim | `select` / `heavy` antes do Face ID |
| Aprovado, pagamento recebido, turno recebido, caixa certo | `success` |
| Diferença no caixa, divergência no turno, pedido ao dono | `warning` |
| Pagamento recusado, biometria falhou, pedido recusado | `error` |

Mapa completo em `packages/shared/src/lib/haptics.ts`.

Acções que não se desfazem (aprovar, revelar o fecho de caixa, receber turno) usam **segurar para confirmar**
(`ui/HoldButton.tsx`): a barra enche com vibração, pede biometria e só então confirma. Soltar antes cancela.
Na web e em aparelhos sem biometria a confirmação passa sem Face ID (próximo passo: PIN do gestor).

## Lojas (a partir de `apps/ios-android`)

```bash
npx eas build --profile preview --platform android   # APK para testes internos
npx eas build --profile production --platform ios    # TestFlight / App Store
```

## Notas técnicas

- Expo SDK 54, React Native 0.81, Expo Router, Zustand, react-native-svg, fonte Outfit.
- A animação do botão de segurar usa a API `Animated` do React Native (sem plugin Babel). Se quiserem Reanimated 4, troca-se só em `HoldButton.tsx`.
- Se o `npm install` avisar sobre versões, corram `npm run fix-deps` — o Expo ajusta tudo ao SDK instalado.
- Os dados estão em `packages/shared/src/data/sample.ts`. Ao ligar a API, os ecrãs não precisam de mudar de estrutura.

## Próximos passos

1. Backend com as regras de negócio (contagem cega, trilha só de acrescentar, aprovações).
2. PIN do gestor para aparelhos sem biometria (`lib/auth.ts` devolve `unavailable`).
3. QR de acesso gerado no servidor, renovado a cada 30 s.
4. Integração Multicaixa Express através do agregador de pagamentos.
5. Modo sem rede na recepção (fila local de operações e SMS).
