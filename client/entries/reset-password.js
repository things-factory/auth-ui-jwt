import '@material/mwc-button'
import { i18next, localize } from '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'
import '../components/profile-component'
import { generatePasswordPatternRegexp } from '../utils/generate-password-pattern-regexp'

export class ResetPassword extends localize(i18next)(LitElement) {
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
      data: Object,
      token: String
    }
  }

  render() {
    return html`
      <div class="wrap">
        <form action="/reset-password" method="POST">
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

  updated(changed) {
    if (changed.has('data')) {
      this.token = this.data.token
    }
  }
}

customElements.define('reset-password', ResetPassword)
