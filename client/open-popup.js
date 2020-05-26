export function openPopup(tagname) {
  let attached = false
  let el = document.body.querySelector(tagname)
  if (el) attached = true
  else el = document.createElement(tagname)

  el.id = 'signin-popup'
  el.active = true

  if (!attached) document.body.appendChild(el)
  return el
}

export function openSigninPopup() {
  return openPopup('auth-signin')
}

export function openDomainSelectPopup() {
  return openPopup('auth-domain-select')
}
