import '@material/mwc-icon'
import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { ADD_MORENDA } from '@things-factory/more-base'
import { navigate, store, subscribe, unsubscribe } from '@things-factory/shell'
import { html } from 'lit-html'

export default function bootstrap() {
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

  function onError(ex) {
    document.dispatchEvent(
      new CustomEvent('notify', {
        detail: {
          level: 'error',
          message: ex,
          ex
        }
      })
    )

    unsubscribe()
  }

  auth.on('signin', () => {
    onAuthentication(true)
  })
  auth.on('signout', () => {
    onAuthentication(false)
    unsubscribe()
  })
  auth.on('profile', ({ credential, domains }) => {
    subscribe({
      ...credential
    })

    if (credential.locale) i18next.changeLanguage(credential.locale)
  })
  auth.on('error', onError)

  /* add user profile morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html`
        <mwc-icon>account_circle</mwc-icon>
      `,
      name: html`
        <i18n-msg msgid="text.auth profile"></i18n-msg>
      `,
      action: () => {
        navigate('profile')
      }
    }
  })

  /* add sign-out morenda */
  store.dispatch({
    type: ADD_MORENDA,
    morenda: {
      icon: html`
        <mwc-icon>exit_to_app</mwc-icon>
      `,
      name: html`
        <i18n-msg msgid="field.sign out"></i18n-msg>
      `,
      action: () => {
        auth.signout()
      }
    }
  })
}
