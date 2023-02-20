import local from './local';
import production from './production';

const configMap = {
  local,
  production
} as const;

export const config = configMap[process.env.NODE_ENV as keyof typeof configMap] || configMap.local;
