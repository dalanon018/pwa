// URL request barebones with progress
export default function xhr (url, params) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    // On Complete Watch
    xhr.addEventListener('load', (e) => {
      const data = e.target
      if (data.status === 200) {
        resolve(data.response)
      } else {
        reject(data.response)
      }
    })
    // On Error Watch
    xhr.addEventListener('error', (e) => {
      reject(e)
    })

    // Call the endpoint
    xhr.open(params.method, url, true)
    xhr.send()
  })
}

// export function xhrFileRequest (url, params) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.onreadystatechange = () => {
//       if (xhr.readyState === XMLHttpRequest.DONE) {
//         resolve(xhr.response)
//       }
//     }
//     xhr.open(params.method, url, true)
//     xhr.responseType = 'arraybuffer'
//     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
//     xhr.setRequestHeader('Authorization', `JWT ${params.token}`)
//     xhr.send(params.body)
//   })
// }
