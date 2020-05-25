export async function openSigninPopup() {
  const el = document.createElement('auth-signin')
  el.active = true

  document.body.appendChild(el)

  return el
}
