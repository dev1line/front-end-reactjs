// export const ENVIRONMENT = 'dev'
export const ENVIRONMENT = 'production'
const HOST = 'localhost' //'cms-keystonejs.herokuapp.com' //'54.159.116.102'
const PORT = process.env.PORT || '3001'

const apiEnv = {
  dev: `http://${HOST}:${PORT}/admin/api`,
  production: 'https://cms-keystonejs.herokuapp.com/admin/api'
}

export const API_CMS = apiEnv[ENVIRONMENT]
export const SERVER_API = `https://cms-keystonejs.herokuapp.com`
