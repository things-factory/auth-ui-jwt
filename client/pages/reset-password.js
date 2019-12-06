import '@material/mwc-button'
import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { PageView, store } from '@things-factory/shell'
import { css, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '../components/profile-component'
import { generatePasswordPatternRegexp } from '../utils/generate-password-pattern-regexp'

export class ResetPassword extends localize(i18next)(connect(store)(PageView)) {
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
          background: url(/assets/images/icon-profile.png) center top no-repeat;
          margin: var(--profile-icon-margin);
          padding: 180px 20px 20px 20px;
          color: var(--secondary-color);
          font: var(--header-bar-title);
          text-align: center;
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

  static get properties() {
    return {
      token: String
    }
  }

  render() {
    return html`
      <div class="wrap">
        <form
          action="/reset-password"
          method="POST"
          @submit=${e => {
            this._handleSubmit(e)
          }}
        >
          <label for="password"><i18n-msg msgid="label.password"></i18n-msg></label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="${i18next.t('text.password')}"
            .pattern="${generatePasswordPatternRegexp({
              useTightPattern: true
            }).source}"
            @input=${e => {
              var val = e.target.value
              var confirmPass = this.renderRoot.querySelector('#confirm-password')
              confirmPass.setAttribute('pattern', val)
            }}
            required
          />
          <span class="hint"><i18n-msg msgid="text.password rule"></i18n-msg></span>
          <label for="confirm-password"><i18n-msg msgid="label.confirm password"></i18n-msg></label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="${i18next.t('text.confirm password')}"
            required
          />
          <input name="token" type="hidden" .value=${this.token} required />
          <button id="submit-button" type="submit"><i18n-msg msgid="label.change password"></i18n-msg></button>
        </form>
      </div>
    `
  }

  firstUpdated() {
    var searchParams = new URLSearchParams(window.location.search)
    this.token = searchParams.get('token')
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async _handleSubmit(e) {
    e.preventDefault()

    var timer
    var form = e.target
    var formData = new FormData(form)
    var button = this.renderRoot.querySelector('#submit-button')

    try {
      var controller = new AbortController()
      var signal = controller.signal

      button.disabled = true
      timer = setTimeout(() => {
        controller.abort()
        throw new Error('timeout')
      }, 30 * 1000)

      var response = await fetch('/reset-password', {
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
              message: i18next.t('text.password reset succeed')
            }
          })
        )

        auth.onAuthRequired()
      }
    } catch (e) {
    } finally {
      button.disabled = false
      clearTimeout(timer)
    }
  }
}

customElements.define('reset-password', ResetPassword)
