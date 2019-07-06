import { html, css } from 'lit-element'

import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { localize, i18next } from '@things-factory/i18n-base'

export class AuthProfile extends localize(i18next)(PageView) {
  static get properties() {
    return {
      email: String,
      accessToken: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;

          text-transform: capitalize;
        }

        div {
          text-align: center;
        }

        [email] {
          text-transform: none;
        }

        #token {
          display: inline-block;
          max-width: 500px;
          overflow-wrap: break-word;
          text-align: left;
          border: 1px solid tomato;
          padding: 2px;
        }

        button {
          text-transform: uppercase;
        }
      `
    ]
  }

  firstUpdated() {
    auth.on('signin', accessToken => {
      this.setCredential(null)
      this.accessToken = accessToken
    })
    auth.on('signout', () => {
      this.setCredential(null)
      this.accessToken = ''
    })
    auth.on('profile', credential => {
      this.setCredential(credential)
    })

    this.setCredential(auth.credential)
    this.accessToken = auth.accessToken
  }

  setCredential(credential) {
    if (credential) {
      this.email = credential.email
    } else {
      this.email = ''
    }
  }

  get context() {
    return {
      title: i18next.t('text.auth profile')
    }
  }

  render() {
    return html`
      <div>
        <p><i18n-msg msgid="label.email"></i18n-msg> <b email>${this.email}</b></p>
      </div>
      <div>
        <p><i18n-msg msgid="label.token"></i18n-msg></p>
        <div id="token">${this.accessToken}</div>
      </div>
      <div>
        <button @click=${() => auth.signout()}><i18n-msg msgid="label.sign out"></i18n-msg></button>
      </div>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
