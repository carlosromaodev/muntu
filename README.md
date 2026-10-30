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

> **iPhone:** o Expo Go exige sessão iniciada com a **mesma conta Expo** no computador e na app
> (`abrir-expo-go.cmd` pede o utilizador e a senha na primeira vez). O Android não exige.
> Se a conta Expo foi criada com Google ou GitHub (sem senha): em expo.dev › Account settings ›
> Access tokens crie um token e guarde-o, sozinho, em `scripts\expo-token.txt` (o ficheiro não vai para o Git).
>
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
│  │                          Toggle, Stepper, Progress, Bars, CountUp, QR, Icon, MoneyInput…
│  │                          motion.ts: as curvas e durações do movimento (uma só fonte)
│  ├─ data/                   dados do protótipo (mobile.ts e desk.ts, tirados dos desenhos)
│  ├─ store/                  estado partilhado (zustand): operação, receber turno, criar conta
│  ├─ mobile/                 TopBar, barra de separadores, ecrãs por papel
│  │   └─ screens/            auth, rececao, membro, equipa, dono, turno, onboarding, shared,
│  │                          ocorrencia, marca
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
  - A barra de separadores tem os ícones de linha do protótipo e um traço laranja no separador activo.
  - Os ecrãs de detalhe abrem por cima: `/recuperacao`, `/receber-turno/dinheiro`, `/nova-actividade`…
- **Desktop.** Cada secção do menu lateral é uma rota (`/rececao`, `/membros`, `/painel`, `/tesouraria`…).
  - O destaque do menu acompanha a rota com animação.
  - `⌘K` ou `Ctrl+K` abre a pesquisa de membros.

Para mudar rotas, edite o mapa em `tools/gen-routes.mjs` e corra `node tools/gen-routes.mjs`.

### Experiência nativa

- **Movimento.** Discreto e igual ao dos protótipos (`ui/motion.ts`):
  - uma só curva, `cubic-bezier(.2,.7,.2,1)`, sem molas nem ressaltos;
  - entrada dos blocos: aparece e sobe 14 px em 420 ms;
  - mensagens de confirmação: 380 ms; folhas: 320 ms; mudanças de cor: 200 ms;
  - botões encolhem para 97 % ao premir; barras de gráfico crescem em 600 ms;
  - os números só animam quando mudam (não contam a partir de zero);
  - com "reduzir movimento" ligado no telemóvel, as animações desligam-se.
  - Na web usam-se só as animações predefinidas do Reanimated: as personalizadas deixam os elementos em posição absoluta depois de animar.
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
