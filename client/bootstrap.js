import { html } from 'lit-html'

import '@material/mwc-icon'

import { store, navigate } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { ADD_MORENDA } from '@things-factory/more-base'
import { ADD_SETTING } from '@things-factory/setting-base'

import './pages/change-password'
import './partials/profile-let'

export default function bootstrap() {
  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 10,
      template: html`
        <profile-let></profile-let>
      `
    }
  })

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
  }

  auth.on('signin', () => {
    onAuthentication(true)
  })
  auth.on('signout', () => {
    onAuthentication(false)
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
        <mwc-icon>close</mwc-icon>
      `,
      name: html`
        <i18n-msg msgid="field.sign out"></i18n-msg>
      `,
      action: () => {
        auth.signout()
      }
    }
  })

  /* add change password setting */
  store.dispatch({
    type: ADD_SETTING,
    setting: {
      seq: 30,
      template: html`
        <setting-let>
          <i18n-msg slot="title" msgid="text.change password"></i18n-msg>
          <change-password slot="content"></change-password>
        </setting-let>
      `
    }
  })
}
