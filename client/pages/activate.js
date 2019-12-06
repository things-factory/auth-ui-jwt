import '@material/mwc-button'
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

  static get properties() {
    return {
      email: String
    }
  }

  render() {
    return html`
      <div class="wrap">
        <h1><i18n-msg msgid="text.your account is not activated"></i18n-msg></h1>
        <form
          id="form"
          action="/resend-verification-email"
          method="POST"
          @submit=${e => {
            this._handleSubmit(e)
          }}
          hidden
        >
          <input name="email" type="hidden" .value=${this.email} required />
          <button id="submit-button" type="submit"><i18n-msg msgid="label.change password"></i18n-msg></button>
        </form>
        <div id="button-area">
          <mwc-button label="${i18next.t('label.resend')}" @click=${e => this.requestResend(e)}></mwc-button>
        </div>
        <contact-us></contact-us>
      </div>
    `
  }

  firstUpdated() {
    var searchParams = new URLSearchParams(window.location.search)
    this.email = searchParams.get('email')
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async requestResend(e) {
    var timer
    var form = this.renderRoot.querySelector('#form')
    var formData = new FormData(form)
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
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
