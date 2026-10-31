import { createApp } from './app.js';
import { loadEnv } from './config/env.js';

const env = loadEnv();
const { app } = await createApp(env);
await app.listen(env.PORT, '0.0.0.0');
console.log(`MUNTU API a ouvir em http://localhost:${env.PORT}/v1 (base de dados: ${env.DATABASE_URL.split('@').pop()})`);
