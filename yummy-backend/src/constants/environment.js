const env = process.env.NODE_ENV || 'development';
const isDev = env === 'development';
const isProd = env === 'production';
const JWT_KEY = process.env.JWT_KEY || 'n0T0k3nD3f1N3d';

module.exports = { 
  isDev,
  isProd,
  env,
  JWT_KEY
}