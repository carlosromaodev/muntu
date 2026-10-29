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

O desktop e o mobile são **dois desenhos diferentes**, fiéis aos ficheiros do projecto:

| Desenho | Onde aparece | Telas (rotas) |
|---|---|---|
| **MUNTU Desktop v4** — gestão do ginásio | `web-desktop`; nativo em ecrãs ≥ 1024 px | `/recepcao` `/inscricao` `/membro` `/caixa` `/tesouraria` `/painel` `/planos` `/rede` `/avisos` (D1–D9) |
| **MUNTU Mobile** — membro e dono | `web-mobile`; nativo no telemóvel | Membro: `/acesso` (M1) `/plano` (M2) `/aulas` `/conta` · Dono: `/dono` (O1) `/aprovacoes` (O2) `/filiais` `/conta` |

No mobile, em **Conta → Ver como** troca-se entre a app do membro e a app do dono. No desktop, o avatar **CB**
abre o tema e o modo **sem rede**, e **⌘K / Ctrl+K** abre a pesquisa de membros. O desktop mantém a largura mínima
do desenho (1024 px); numa janela mais estreita a página desloca-se na horizontal, como no protótipo.

## Estrutura

```
muntu/
├─ apps/
│  ├─ ios-android/   App nativa (iPhone, iPad, Android) · Face ID, vibração, EAS Build
│  ├─ web-desktop/   Web para computador · desenho desktop
│  └─ web-mobile/    Web para o browser do telemóvel · desenho mobile, instalável (PWA)
└─ packages/
   └─ shared/
      └─ src/
         ├─ desktop/   DesktopShell (cabeçalho + 9 separadores) e as telas D1–D9
         ├─ mobile/    MobileShell (barra inferior de 4 separadores) e as telas M1, M2, O1, O2, Aulas, Filiais, Conta
         ├─ ui/        design system partilhado: T, Btn, HoldButton, StatBand, Table, Sheet, Chips, QR, Logo…
         ├─ shell/     MuntuApp (escolhe o desenho), rotas, notificações
         ├─ theme/     tokens da marca (claro e escuro), breakpoints
         ├─ lib/       formatação Kz, vibração, biometria
         ├─ store/     estado partilhado (Zustand)
         └─ data/      dados de exemplo — substituir pela API
```

Cada app tem apenas as rotas (`app/`), a configuração (`app.json`), os ícones e o desenho que usa
(`ui="desktop"`, `ui="mobile"` ou `ui="auto"` em `app/[screen].tsx`). As telas, o design system e as regras vivem
uma só vez em `packages/shared`.

| App | Desenho | Específico |
|---|---|---|
| `ios-android` | mobile no telemóvel, desktop em ecrãs ≥ 1024 px | Face ID / impressão digital, vibração nativa, EAS Build |
| `web-desktop` | desktop | pesquisa ⌘K, painel lateral de detalhe, tabelas com todas as colunas |
| `web-mobile` | mobile | PWA instalável, ecrã inteiro, vibração no Chrome Android |

Quando a app mobile abre num ecrã largo (web mobile no computador, tablet em vertical), a coluna fica centrada com
560 px no máximo, para manter as proporções do desenho.

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

No mobile, aprovar um pedido usa **segurar para confirmar**
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
