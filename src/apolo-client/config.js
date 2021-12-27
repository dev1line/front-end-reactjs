export const ENVIRONMENT = 'dev'
// export const ENVIRONMENT = 'production'
const HOST_PD = 'cms-keystonejs.herokuapp.com'
const HOST = 'localhost'
//'54.159.116.102'
const PORT = '3003' //process.env.PORT ||

const apiEnv = {
  // dev:
  dev: `http://${HOST}:${PORT}/admin/api`,
  production: `https://${HOST_PD}/admin/api`,
}

export const API_CMS = apiEnv['dev']
export const SERVER_API = `http://${HOST}:${PORT}`
