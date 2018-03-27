/*eslint-disable*/
const env = process.env.NODE_ENV
if (env === 'production') {
  console.log(`TOKEN_URL=${process.env.TOKEN_URL}`)
  console.log(`API_BASE_URL=${process.env.API_BASE_URL}`)
  console.log(`APP_BASE_URL=${process.env.APP_BASE_URL}`)
  console.log(`MOBILE_REGISTRATION_URL=${process.env.MOBILE_REGISTRATION_URL}`)
  console.log(`STORE_LOCATOR_URL=${process.env.STORE_LOCATOR_URL}`)
  console.log(`LOYALTY_URL=${process.env.LOYALTY_URL}`)
  console.log(`RECENT_STORE_TOKEN=${process.env.RECENT_STORE_TOKEN}`)

  console.log(`FIREBASE_API_KEY=${process.env.FIREBASE_API_KEY}`)
  console.log(`FIREBASE_AUTH_DOMAIN=${process.env.FIREBASE_AUTH_DOMAIN}`)
  console.log(`FIREBASE_DATABASE_URL=${process.env.FIREBASE_DATABASE_URL}`)
  console.log(`FIREBASE_PROJECT_ID=${process.env.FIREBASE_PROJECT_ID}`)
  console.log(`FIREBASE_STORAGE_BUCKET=${process.env.FIREBASE_STORAGE_BUCKET}`)
  console.log(`FIREBASE_MESSAGING_SENDER_ID=${process.env.FIREBASE_MESSAGING_SENDER_ID}`)
  console.log(`FIREBASE_MAIN_OBJECT=${process.env.FIREBASE_MAIN_OBJECT}`)

  console.log(`OATH_CLIENT_ID=${process.env.OATH_CLIENT_ID}`)
  console.log(`OATH_CLIENT_SECRET=${process.env.OATH_CLIENT_SECRET}`)
  console.log(`OATH_RESPONSE_TYPE=${process.env.OATH_RESPONSE_TYPE}`)
  console.log(`OATH_GRANT_TYPE=${process.env.OATH_GRANT_TYPE}`)

  console.log(`RECAPTCHA_SITE_KEY=${process.env.RECAPTCHA_SITE_KEY}`)
  console.log(`FB_SHARE_ID=${process.env.FB_SHARE_ID}`)

} else {
  console.log(`TOKEN_URL=https://gw.cliqq.net:8443/accounts/oauth2/token`)
  console.log(`API_BASE_URL=https://gw.cliqq.net:8443/ecms/api/v1`)
  console.log(`APP_BASE_URL=https://cliqqshop.com`)
  console.log(`MOBILE_REGISTRATION_URL=https://gw.cliqq.net:8443`)
  console.log(`STORE_LOCATOR_URL=https://mapservice.cliqq.net/ajax/`)
  console.log(`LOYALTY_URL=http://test.apollo.com.ph:8084/RedemptionHost/ecmsApi`)
  console.log(`RECENT_STORE_TOKEN=MmsxN1N0b3JlTG9jYXRvclBhc3N3b3JkRm9yRTE=`)

  console.log(`FIREBASE_API_KEY=AIzaSyDYGxDAGSC8Tf6KY7bgyOx-ZFWQy3s1cn4`)
  console.log(`FIREBASE_AUTH_DOMAIN=cliqqshop.firebaseapp.com`)
  console.log(`FIREBASE_DATABASE_URL=https://cliqqshop.firebaseio.com`)
  console.log(`FIREBASE_PROJECT_ID=cliqqshop`)
  console.log(`FIREBASE_STORAGE_BUCKET=cliqqshop.appspot.com`)
  console.log(`FIREBASE_MESSAGING_SENDER_ID=656457472840`)
  console.log(`FIREBASE_MAIN_OBJECT=transactions`)

  console.log(`OATH_CLIENT_ID=ecms-pwa`)
  console.log(`OATH_CLIENT_SECRET=ecms-pwa-secret`)
  console.log(`OATH_RESPONSE_TYPE=token`)
  console.log(`OATH_GRANT_TYPE=client_credentials`)

  console.log(`RECAPTCHA_SITE_KEY=6Lfk5jkUAAAAAEAlugSVRXieKv3B9H3vFs4M8ZGd`)
  console.log(`FB_SHARE_ID=157843328155932`)
}
