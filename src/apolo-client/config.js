export const ENVIRONMENT = 'dev'
//export const ENVIRONMENT = "production";
const HOST = '54.159.116.102'
const PORT = process.env.PORT || '3001';

const apiEnv = {
  dev: `http://${HOST}:${PORT}/admin/api`,
}

export const API_CMS = apiEnv[ENVIRONMENT]
