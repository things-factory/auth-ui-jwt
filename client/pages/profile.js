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
          background-color: var(--main-section-background-color);
        }
        .wrap {
          max-width: 550px;
          margin: 15px auto;
          text-align: center;
        }
        :host *:focus {
          outline: none;
        }
        .user {
          background: url(../assets/images/icon-profile.png) center top no-repeat;
          margin-top: 5%;
          padding: 210px 20px 20px 20px;
          color: var(--secondary-color);
          font: var(--header-bar-title);
          text-align: center;
        }
        #token {
          display: block;
          overflow-wrap: break-word;
          text-align: justify;
          font: normal 12px var(--theme-font);
        }
        label {
          font: bold 14px var(--theme-font);
          color: var(--primary-color);
        }
        button {
          background-color: var(--button-background-color);
          margin: var(--button-margin);
          height: var(--button-height);
          border-radius: var(--button-radius);
          border: var(--button-border);
          font: var(--button-font);
          color: var(--button-color);
          cursor: pointer;
        }
        button:hover,
        button:active {
          background-color: var(--button-active-background-color);
        }
        button:active {
          border: var(--button-active-border);
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
      <div class="wrap">
        <div class="user">
          ${this.email}
        </div>

        <div>
          <label><i18n-msg msgid="field.token"></i18n-msg></label>
          <span id="token">${this.accessToken}</span>
        </div>

        <button @click=${() => auth.signout()}><i18n-msg msgid="field.sign out"></i18n-msg></button>
        <button>change password</button>
      </div>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
