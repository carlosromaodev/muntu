# MUNTU Ginásio

Plataforma de gestão de ginásios: recepção, caixa e passagem de turno, finanças, personal trainers,
gestão do dono, rede de ginásios e a app do membro.
Um só código para **iOS, Android, web desktop e web mobile** (Expo + React Native).

## O visual vem directamente dos ficheiros de desenho

Os ficheiros de desenho do projecto estão em [`design/`](design). A app **não redesenha** os ecrãs à mão:
`tools/dc2rn.py` converte cada ficheiro de desenho (template, estilos, textos e lógica do protótipo) num
componente React Native, e `packages/shared/src/design/runtime.jsx` desenha-o em iOS, Android e web.
Tipografia (Outfit 300/400/500/600), cores, espaçamentos e o logotipo ficam exactamente como no desenho.

| Desenho | Componente gerado | Onde aparece |
|---|---|---|
| `MUNTU Desktop v8.dc.html` | `MuntuDesktop` | `web-desktop`; nativo em ecrãs ≥ 1024 px |
| `MUNTU Mobile.dc.html` | `MuntuMobile` | `web-mobile`; nativo no telemóvel |
| `Muntu Logo` · `Muntu Mark` · `Muntu Selo` | `MuntuLogo` · `MuntuMark` · `MuntuSelo` | usados pelos dois |

Quando o desenho mudar, substitua o ficheiro em `design/` e volte a gerar:

```bash
python3 tools/dc2rn.py design packages/shared/src/design/generated
```

As únicas adaptações ao protótipo estão declaradas em `tools/dc2rn.py` (secção `CONFIG`):
o mobile ocupa o ecrã inteiro e usa a área segura real em vez da barra de estado desenhada (9:41 · 5G);
no desktop a barra lateral fica fixa e o conteúdo tem scroll próprio.

## Arrancar (Windows, macOS ou Linux)

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install                # na raiz — instala as três apps e o pacote partilhado
npm run fix-deps           # alinha as versões com o Expo SDK instalado (recomendado na 1.ª vez)

npm run web:desktop        # web desktop  → http://localhost:8081
npm run web:mobile         # web mobile   → http://localhost:8082
npm run android            # Android (emulador ou Expo Go)
npm run ios                # iOS (simulador no macOS ou Expo Go no iPhone)
npm run build:web          # exporta as duas versões web para apps/*/dist
```

Abrir directamente um ecrã do protótipo: `http://localhost:8081/d6?role=dono` (desktop) ou
`http://localhost:8082/r1?role=rececao` (mobile). Sem ecrã, a app abre no ecrã de entrada do desenho.

## Estrutura

```
muntu/
├─ design/                ficheiros de desenho (fonte da verdade do visual)
├─ tools/dc2rn.py         conversor desenho → React Native
├─ apps/
│  ├─ ios-android/        app nativa (iPhone, iPad, Android) · EAS Build
│  ├─ web-desktop/        web para computador
│  └─ web-mobile/         web para o telemóvel, instalável (PWA)
└─ packages/shared/src/
   ├─ design/runtime.jsx  primitivos: caixa, texto, grelha, campos, listas, SVG
   ├─ design/css.js       conversão dos estilos CSS para React Native
   ├─ design/generated/   componentes gerados (não editar à mão)
   ├─ shell/              MuntuApp (escolhe desktop/mobile), fontes e área segura
   └─ lib/haptics.ts      vibração ao tocar (nativo)
```

## Lojas (a partir de `apps/ios-android`)

```bash
npx eas build --profile preview --platform android   # APK para testes internos
npx eas build --profile production --platform ios    # TestFlight / App Store
```

## Notas técnicas

- Expo SDK 54, React Native 0.81, Expo Router, react-native-svg, fonte Outfit (`@expo-google-fonts/outfit`).
- Os dados são os do protótipo (na lógica de cada desenho). O próximo passo é ligar as acções a uma API.
- Se o `npm install` avisar sobre versões, corra `npm run fix-deps`.
