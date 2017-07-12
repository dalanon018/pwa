/*eslint-disable*/
const env = process.env.NODE_ENV
if (env === 'production') {
  console.log(`API_BASE_URL=${process.env.API_BASE_URL}`)
  console.log(`APP_BASE_URL=${process.env.APP_BASE_URL}`)
} else {
  console.log(`API_BASE_URL=http://localhost:4000`)
  console.log(`APP_BASE_URL=http://localhost:3000`)
}
