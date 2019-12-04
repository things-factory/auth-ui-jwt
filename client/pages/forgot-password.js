import '@material/mwc-button'
import { i18next, localize } from '@things-factory/i18n-base'
import { PageView, store } from '@things-factory/shell'
import { css, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '../components/profile-component'

export class ForgotPassword extends localize(i18next)(connect(store)(PageView)) {
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

  render() {
    return html`
      <div class="wrap">
        <form action="/forgot-password" method="POST">
          <label for="email"><i18n-msg msgid="label.email"></i18n-msg></label>
          <input id="email" name="email" type="email" placeholder="${i18next.t('text.your email address')}" required />
          <button type="submit"><i18n-msg msgid="label.submit"></i18n-msg></button>
        </form>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  stateChanged(state) {
    this.domains = state.app.domains
  }
}

customElements.define('forgot-password', ForgotPassword)
