import '@material/mwc-button'
import { i18next, localize } from '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'
import '../components/profile-component'

export class AuthResult extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100vw;
          height: 100vh;
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
      message: String
    }
  }

  updated(changed) {
    if (changed.has('data')) {
      this.message = this.data.message
    }
  }

  render() {
    return html`
      <div class="wrap">
        <div id="message-area">
          <i18n-msg msgid="text.${this.message}"></i18n-msg>
        </div>
        <div id="button-area">
          <mwc-button
            label="${i18next.t('button.go to home')}"
            @click=${e => {
              window.location.replace('/signin')
            }}
          ></mwc-button>
        </div>
      </div>
    `
  }
}

customElements.define('auth-result', AuthResult)
