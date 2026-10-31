import { loadEnv } from '../config/env.js';
import { Database } from './database.js';

const env = loadEnv();
const db = await Database.connect(env.DATABASE_URL);
const applied = await db.migrate();
console.log(applied.length ? `Migrações aplicadas: ${applied.join(', ')}` : 'Base de dados já actualizada.');
await db.close();
