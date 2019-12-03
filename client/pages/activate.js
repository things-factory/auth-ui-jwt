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
        <h1><i18n-msg msgid="text.your account is not activated"></i18n-msg></h1>
        <div id="button-area">
          <mwc-button label="${i18next.t('label.resend')}" @click=${e => this.requestResend(e)}></mwc-button>
          <mwc-button label="${i18next.t('button.logout')}" @click=${e => auth.signout()}></mwc-button>
        </div>
        <contact-us></contact-us>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async requestResend(e) {
    var timer
    var button = e.target
    try {
      var controller = new AbortController()
      var signal = controller.signal

      button.disabled = true
      timer = setTimeout(() => {
        controller.abort()
        throw new Error('timeout')
      }, 30 * 1000)

      var response = await fetch('/resend-verification-email', {
        credentials: 'include',
        signal
      })
      if (response && response.ok) {
        document.dispatchEvent(
          new CustomEvent('notify', {
            detail: {
              level: 'info',
              message: i18next.t('text.verification email resent')
            }
          })
        )
      }
    } catch (e) {
    } finally {
      button.disabled = false
      clearTimeout(timer)
    }
  }
}

customElements.define('auth-activate', AuthActivate)
