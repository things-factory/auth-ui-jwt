import { i18next, localize } from '@things-factory/i18n-base'
import { PageView } from '@things-factory/shell'
import { css, html } from 'lit-element'
import '@material/mwc-button'

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
        <mwc-button
          label="${i18next.t('label.resend')}"
          @click=${async e => {
            var response = await fetch('/resend-verification-email', {
              credentials: 'include'
            })
          }}
        ></mwc-button>
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
