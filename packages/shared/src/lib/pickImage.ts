import { Platform } from 'react-native';

/**
 * Escolher uma imagem (logotipo, foto de ocorrência) e devolvê-la como data URL.
 * Na web abre o selector de ficheiros do browser. Nas apps nativas devolve
 * `null`: a galeria precisa do módulo expo-image-picker, ainda por instalar.
 */
export function pickImage(accept = 'image/*', maxBytes = 2 * 1024 * 1024): Promise<string | null | 'too-big'> {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) return resolve(null);
      if (f.size > maxBytes) return resolve('too-big');
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = () => resolve(null);
      r.readAsDataURL(f);
    };
    input.click();
  });
}

export const canPickImage = Platform.OS === 'web';
