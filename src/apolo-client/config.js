export const ENVIRONMENT = 'dev'
// export const ENVIRONMENT = 'production'
const HOST = 'cms-keystonejs.herokuapp.com' //'54.159.116.102'
const PORT = process.env.PORT || '3001'

const apiEnv = {
  dev: `https://${HOST}/admin/api`,
}

export const API_CMS = apiEnv['dev']
export const SERVER_API = `https://${HOST}`
