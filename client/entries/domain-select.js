import '@material/mwc-button'
import '@material/mwc-icon-button'
import { i18next, localize } from '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'
import '../components/profile-component'

export class AuthDomainSelect extends localize(i18next)(LitElement) {
  static get properties() {
    return {
      data: Object,
      domains: Array
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

        #popup {
          position: fixed;
          box-sizing: border-box;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          padding: 20vmin;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .popup-content {
          position: relative;
          width: 100%;
          height: 100%;
        }

        #close-button {
          position: absolute;
          right: 0;
        }
      `
    ]
  }

  render() {
    return html`
      <div class="wrap">
        <div id="domain-select-area">
          ${this.domains && this.domains.length
            ? html`
                <label for="domain-select"><i18n-msg msgid="text.select domain"></i18n-msg></label>
                <select
                  id="domain-select"
                  @change=${e => {
                    var domain = e.target.value
                    if (domain) location.pathname = `/checkin/${domain}/`
                  }}
                >
                  <option value=""></option>
                  ${(this.domains || []).map(
                    domain => html`
                      <option value="${domain.subdomain}">${domain.name}</option>
                    `
                  )}
                </select>
              `
            : html`
                <span><i18n-msg msgid="text.no domain available"></i18n-msg></span>
              `}
        </div>
        <div id="contact-area"></div>
        <div id="button-area">
          <mwc-button
            label="${i18next.t('button.logout')}"
            @click=${e => (window.location.pathname = '/signout')}
          ></mwc-button>
          <mwc-button label="${i18next.t('button.profile')}" @click=${e => this.showProfilePopup()}></mwc-button>
        </div>
      </div>
      <div id="popup" hidden>
        <div class="popup-content">
          <mwc-icon-button id="close-button" icon="close" @click=${e => this.closePopup()}></mwc-icon-button>
          <profile-component></profile-component>
        </div>
      </div>
    `
  }

  updated(changed) {
    if (changed.has('data')) {
      this.domains = this.data.domains
      this.requestUpdate()
    }
  }

  showProfilePopup() {
    this.renderRoot.querySelector('#popup').hidden = false
  }

  closePopup() {
    this.renderRoot.querySelector('#popup').hidden = true
  }
}

customElements.define('auth-domain-select', AuthDomainSelect)
