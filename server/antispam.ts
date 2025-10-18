import { randomBytes } from 'crypto';

interface AntispamToken {
  token: string;
  timestamp: number;
}

// Store tokens in memory (en producción usarías Redis o similar)
const tokenStore = new Map<string, AntispamToken>();

// Limpiar tokens viejos cada 30 minutos
setInterval(() => {
  const now = Date.now();
  const THIRTY_MINUTES = 30 * 60 * 1000;
  
  for (const [token, data] of tokenStore.entries()) {
    if (now - data.timestamp > THIRTY_MINUTES) {
      tokenStore.delete(token);
    }
  }
}, 30 * 60 * 1000);

/**
 * Genera un token único para formulario
 */
export function generateAntispamToken(): string {
  const token = randomBytes(32).toString('hex');
  tokenStore.set(token, {
    token,
    timestamp: Date.now(),
  });
  return token;
}

/**
 * Valida el formulario contra spam
 * Honeypot + Time-based + Token validation
 */
export function validateAntispam(data: {
  token: string;
  honeypot?: string;
  timestamp: number;
}): { valid: boolean; error?: string } {
  // 1. Verificar honeypot (campo invisible)
  if (data.honeypot && data.honeypot.trim() !== '') {
    console.log('[Antispam] Honeypot detectado - bot bloqueado');
    return { valid: false, error: 'Bot detectado' };
  }

  // 2. Verificar token existe
  if (!tokenStore.has(data.token)) {
    console.log('[Antispam] Token inválido o expirado');
    return { valid: false, error: 'Token inválido' };
  }

  // 3. Verificar tiempo mínimo (evitar envíos instantáneos de bots)
  const MIN_TIME = 2000; // 2 segundos mínimo
  const timeSpent = Date.now() - data.timestamp;
  
  if (timeSpent < MIN_TIME) {
    console.log(`[Antispam] Formulario enviado demasiado rápido (${timeSpent}ms)`);
    return { valid: false, error: 'Formulario enviado demasiado rápido' };
  }

  // 4. Verificar tiempo máximo (el token expira en 30 minutos)
  const MAX_TIME = 30 * 60 * 1000; // 30 minutos
  if (timeSpent > MAX_TIME) {
    console.log('[Antispam] Token expirado');
    return { valid: false, error: 'Token expirado, recarga la página' };
  }

  // 5. Token válido, eliminarlo (uso único)
  tokenStore.delete(data.token);
  console.log('[Antispam] Validación exitosa');
  
  return { valid: true };
}
