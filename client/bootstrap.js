import '@material/mwc-icon'
import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { ADD_MORENDA } from '@things-factory/more-base'
import { navigate, store, subscribe, unsubscribe } from '@things-factory/shell'
import { html } from 'lit-html'
import { openSigninPopup, openDomainSelectPopup } from './open-popup'

export default function bootstrap() {
  async function readySigninPopup() {
    return await import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "signin" */
      './pages/signin.js'
    )
  }
  async function readyDomainSelectPopup() {
    return await import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "domain-select" */
      './pages/domain-select.js'
    )
  }

  function onAuthentication(on) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'info',
          message: i18next.t('text.you.are.now.in', {
            state: {
              text: i18next.t(on ? 'text.signed in' : 'text.signed out')
            }
          })
        }
      })
    )
  }

  function onError(e) {
    var { detail = {} } = e
    var { message } = detail
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'error',
          message: i18next.t(`text.${message}`)
        }
      })
    )
  }

  readySigninPopup()
  readyDomainSelectPopup()

  auth.on('signin', ({ accessToken, domains, redirectTo }) => {
    onAuthentication(true)
    auth.profile()
  })
  auth.on('signout', () => {
    onAuthentication(false)
    unsubscribe()
    location.replace('/')
  })
  auth.on('profile', async ({ credential }) => {
    subscribe({
      ...credential
    })

    if (credential.locale) i18next.changeLanguage(credential.locale)

    const { domain, domains } = credential
    if (!domain?.subdomain) {
      openDomainSelectPopup()
      return
    }

    const checkinSucceeded = await auth.checkin(domain?.subdomain)

    if (checkinSucceeded) {
      const domainPathMatched = location.pathname.match(/domain\/(\w+)\/?/)
      const currentDomain = domainPathMatched?.[1]

      if (currentDomain != domain?.subdomain) navigate(`/domain/${domain?.subdomain}`, true)
    }
  })

  auth.on(auth.authRequiredEvent, () => {
    openSigninPopup()
  })

  auth.on('error', onError)

  /* add user profile morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html` <mwc-icon>account_circle</mwc-icon> `,
      name: html` <i18n-msg msgid="text.auth profile"></i18n-msg> `,
      action: () => {
        navigate('profile')
      }
    }
  })

  /* add sign-out morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html` <mwc-icon>exit_to_app</mwc-icon> `,
      name: html` <i18n-msg msgid="field.sign out"></i18n-msg> `,
      action: () => {
        auth.signout()
      }
    }
  })
}
