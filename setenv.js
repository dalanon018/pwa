/*eslint-disable*/
const env = process.env.NODE_ENV
if (env === 'production') {
  console.log(`TOKEN_URL=${process.env.TOKEN_URL}`)
  console.log(`API_BASE_URL=${process.env.API_BASE_URL}`)
  console.log(`APP_BASE_URL=${process.env.APP_BASE_URL}`)
  console.log(`STORE_LOCATOR_URL=${process.env.STORE_LOCATOR_URL}`)

  console.log(`FIREBASE_API_KEY=${process.env.FIREBASE_API_KEY}`)
  console.log(`FIREBASE_AUTH_DOMAIN=${process.env.FIREBASE_AUTH_DOMAIN}`)
  console.log(`FIREBASE_DATABASE_URL=${process.env.FIREBASE_DATABASE_URL}`)
  console.log(`FIREBASE_PROJECT_ID=${process.env.FIREBASE_PROJECT_ID}`)
  console.log(`FIREBASE_STORAGE_BUCKET=${process.env.FIREBASE_STORAGE_BUCKET}`)
  console.log(`FIREBASE_MESSAGING_SENDER_ID=${process.env.FIREBASE_MESSAGING_SENDER_ID}`)
  console.log(`FIREBASE_MAIN_OBJECT=${process.env.FIREBASE_MAIN_OBJECT}`)

  console.log(`FIREBASE_USERNAME=${process.env.FIREBASE_USERNAME}`)
  console.log(`FIREBASE_PASSWORD=${process.env.FIREBASE_PASSWORD}`)

  console.log(`OATH_CLIENT_ID=${process.env.OATH_CLIENT_ID}`)
  console.log(`OATH_CLIENT_SECRET=${process.env.OATH_CLIENT_SECRET}`)
  console.log(`OATH_RESPONSE_TYPE=${process.env.OATH_RESPONSE_TYPE}`)
  console.log(`OATH_GRANT_TYPE=${process.env.OATH_GRANT_TYPE}`)

  console.log(`RECAPTCHA_SITE_KEY=${process.env.RECAPTCHA_SITE_KEY}`)

} else {
  console.log(`TOKEN_URL=https://apidemo.cliqq.net:8443/accounts/oauth2/token`)
  console.log(`API_BASE_URL=https://apidemo.cliqq.net:8443/ecms/api/v1`)
  console.log(`APP_BASE_URL=http://localhost:3000`)
  console.log(`STORE_LOCATOR_URL=https://mapservice.cliqq.net/ajax/`)

  console.log(`FIREBASE_API_KEY=AIzaSyBaKhRjF4feFUsPyezk8Hmu0u_PCbNb2oI`)
  console.log(`FIREBASE_AUTH_DOMAIN=realtimedb-a1d19.firebaseapp.com`)
  console.log(`FIREBASE_DATABASE_URL=https://realtimedb-a1d19.firebaseio.com`)
  console.log(`FIREBASE_PROJECT_ID=realtimedb-a1d19`)
  console.log(`FIREBASE_STORAGE_BUCKET=realtimedb-a1d19.appspot.com`)
  console.log(`FIREBASE_MESSAGING_SENDER_ID=771793449038`)
  console.log(`FIREBASE_MAIN_OBJECT=transactions`)

  console.log(`FIREBASE_USERNAME=joshuacalpuerto@gmail.com`)
  console.log(`FIREBASE_PASSWORD=password`)

  console.log(`OATH_CLIENT_ID=ecms-pwa`)
  console.log(`OATH_CLIENT_SECRET=ecms-pwa-secret`)
  console.log(`OATH_RESPONSE_TYPE=token`)
  console.log(`OATH_GRANT_TYPE=client_credentials`)

  console.log(`RECAPTCHA_SITE_KEY=Le2aDEUAAAAAC_B5o0Xy4_DAAb7Cmvsdrd4ury0`)
}
