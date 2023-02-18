import local from './local';
import production from './production';

const configMap = {
  local,
  production
};

export const config = configMap[process.env.NODE_ENV ?? 'local'];
