# MUNTU Ginásio

Plataforma de gestão de ginásios: recepção, caixa e passagem de turno, finanças, personal trainers,
gestão do dono, rede de ginásios e a app do membro.
Um só código para **iOS, Android, web mobile e web desktop**, feito com Expo (SDK 58) e React Native.

## Arrancar no Windows

1. Abra `scripts\instalar.cmd`. O script:
   - prepara um Node 24 LTS portátil se o seu Node não for suportado;
   - instala as dependências;
   - corre o `expo-doctor`;
   - compila as quatro plataformas.

   O registo fica em `scripts\instalar.log`.
2. Depois use:

| Ficheiro | O que faz |
|---|---|
| `scripts\abrir-expo-go.cmd` | Servidor para a app **Expo Go** (telemóvel na mesma rede Wi-Fi; leia o QR). |
| `scripts\abrir-expo-go-tunel.cmd` | O mesmo, em modo túnel (o telemóvel pode estar noutra rede). |
| `scripts\abrir-web-desktop.cmd` | Desktop no navegador: http://localhost:8081 |
| `scripts\abrir-web-mobile.cmd` | Mobile no navegador: http://localhost:8082 |
| `scripts\verificar.cmd` | Volta a compilar tudo sem reinstalar (`scripts\verificar.log`). |

> O Expo Go das lojas só abre projectos do SDK 58. O Expo SDK 58 precisa de Node 22.13+, 24.3+ ou 26+.
> As versões ímpares, como a 25, não são suportadas.

### Entrar no protótipo

Use qualquer senha com 6 ou mais caracteres. O prefixo do número escolhe o papel:

| Número | Telemóvel | Desktop |
|---|---|---|
| 923 … | Membro | Não entra: os membros usam o telemóvel. |
| 924 … | Recepção (começa por receber o turno) | Recepção (começa por receber o turno) |
| 925 … | Finanças | Tesouraria |
| 926 … | Personal trainer | Agenda do PT |
| 927 … | Dono | Painel do dono |

## Estrutura

```
muntu/
├─ design/                    ficheiros de desenho (a referência visual)
├─ apps/
│  ├─ ios-android/app/        rotas da app nativa (geradas)
│  ├─ web-mobile/app/         rotas da web mobile (geradas, as mesmas da nativa)
│  └─ web-desktop/app/        rotas do desktop (geradas)
├─ packages/shared/src/
│  ├─ theme/tokens.ts         cores, tipografia Outfit, presets de texto
│  ├─ brand/                  Logo, Símbolo e Selo MUNTU (geometria exacta do desenho)
│  ├─ ui/                     componentes com animação e vibração:
│  │                          Button, Chip, Segmented, Tabs, Field, Select, Sheet, Toast,
│  │                          Toggle, Stepper, Progress, Bars, CountUp, QR…
│  ├─ data/                   dados do protótipo (mobile.ts e desk.ts, tirados dos desenhos)
│  ├─ store/                  estado partilhado (zustand): operação, receber turno, criar conta
│  ├─ mobile/                 TopBar, barra de separadores, ecrãs por papel
│  │   └─ screens/            auth, rececao, membro, equipa, dono, turno, onboarding, shared
│  └─ desktop/                Shell (menu lateral e cabeçalho), kit (KPIs, painéis, tabelas)
│      └─ screens/            recepcao, operacao, dono, equipa, fluxos
└─ tools/
   ├─ gen-routes.mjs          gera as rotas das três apps a partir de um só mapa
   └─ outline.py              resume um ecrã do desenho (textos, listas e acções)
```

### Navegação

- **Telemóvel (iOS, Android e web mobile).** Usa uma pilha nativa do Expo Router.
  - No iOS, desliza-se para voltar; no Android, a transição é lateral.
  - Cada papel tem os seus separadores: `/rececao/entradas`, `/dono/painel`, `/membro/acesso`…
  - A barra de separadores é numerada como no desenho e o indicador laranja desliza.
  - Os ecrãs de detalhe abrem por cima: `/recuperacao`, `/receber-turno/dinheiro`, `/nova-actividade`…
- **Desktop.** Cada secção do menu lateral é uma rota (`/rececao`, `/membros`, `/painel`, `/tesouraria`…).
  - O destaque do menu acompanha a rota com animação.
  - `⌘K` ou `Ctrl+K` abre a pesquisa de membros.

Para mudar rotas, edite o mapa em `tools/gen-routes.mjs` e corra `node tools/gen-routes.mjs`.

### Experiência nativa

- **Animações.** Feitas com Reanimated:
  - listas que entram em cascata;
  - indicadores de separador e controlos segmentados que deslizam;
  - números de KPI que contam;
  - barras de gráfico que crescem;
  - folhas que sobem do fundo e se fecham arrastando para baixo;
  - confirmações animadas.
- **Vibração.** O `expo-haptics` dá resposta ao tocar, seleccionar, ter sucesso, receber um aviso ou um erro.
- **Face ID e impressão digital.** O `expo-local-authentication` pede confirmação nas aprovações do dono.
- **Integração com o sistema.**
  - Áreas seguras, teclado que não tapa os campos, puxar para actualizar.
  - O botão "voltar" do Android fecha as folhas.

## Comandos

```bash
npm install
npm run web:desktop      # http://localhost:8081
npm run web:mobile       # http://localhost:8082
npm run start            # Expo Go / dev build
npm run build:web
npm run typecheck
npm run doctor
node tools/gen-routes.mjs
```

## Lojas (a partir de `apps/ios-android`)

```bash
npx eas build --profile preview --platform android
npx eas build --profile production --platform ios
```
