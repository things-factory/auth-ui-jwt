import '@material/mwc-button'
import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { openPopup } from '@things-factory/layout-base'
import { PageView, store } from '@things-factory/shell'
import { css, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '../components/profile-component'

export class AuthDomainSelect extends localize(i18next)(connect(store)(PageView)) {
  static get properties() {
    return {
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
                    if (domain) location.pathname = `/domain/${domain}/`
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
          <mwc-button label="${i18next.t('button.logout')}" @click=${e => auth.signout()}></mwc-button>
          <mwc-button label="${i18next.t('button.profile')}" @click=${e => this.showProfilePopup()}></mwc-button>
        </div>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  // TODO should be changed to 'pageUpdated'
  // pageUpdated(changed) {
  //   if(this.active) {
  //     auth.profile()
  //   }
  // }
  updated(changed) {
    if (changed.has('active')) {
      this.onActiveChanged()
    }
  }

  stateChanged(state) {
    this.domains = state.app.domains
  }

  showProfilePopup() {
    openPopup(html`
      <profile-component></profile-component>
    `)
  }

  // TODO can be removed after updated is changed(..) to pageUpdated(..)
  onActiveChanged() {
    if (this.active) auth.profile()
  }
}

customElements.define('auth-domain-select', AuthDomainSelect)
