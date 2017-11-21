import {
  FB_SHARE_ID
} from 'containers/App/constants'

export const fbShare = (product) => {
  const options = {
    appId: FB_SHARE_ID, // facebook developer ID
    status: true,
    xfbml: true, // parse social plugins on this page
    version: 'v2.10' // use version 2.1
  }

  FB.init(options)

  if (FB) {
    FB.ui({
      method: 'share_open_graph',
      action_type: 'og.shares',
      action_properties: JSON.stringify({
        object: {
          'og:url': window.location.href,
          'og:title': product.get('title'),
          'og:description': product.get('details').replace(/(&nbsp;|<([^>]+)>)/ig, ' '),
          'og:image': product.get('image'),
          'og:image:alt': product.get('title')
        }
      })
    }, response => {
      console.log('response: ', response)
    })
  }
}
