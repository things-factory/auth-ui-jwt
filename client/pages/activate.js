import '@material/mwc-button'
import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { PageView } from '@things-factory/shell'
import { css, html } from 'lit-element'

export class AuthActivate extends localize(i18next)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: var(--main-section-background-color);
        }
      `
    ]
  }

  render() {
    return html`
      <div class="wrap">
        <h1><i18n-msg msgid="text.your account is not activated."></i18n-msg></h1>
        <div id="button-area">
          <mwc-button
            label="${i18next.t('label.resend')}"
            @click=${async e => {
              var response = await fetch('/resend-verification-email', {
                credentials: 'include'
              })
            }}
          ></mwc-button>
          <mwc-button label="${i18next.t('button.logout')}" @click=${e => auth.signout()}></mwc-button>
        </div>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }
}

customElements.define('auth-activate', AuthActivate)
