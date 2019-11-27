import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { PageView } from '@things-factory/shell'
import { html } from 'lit-element'
import { AUTH_STYLE_SIGN } from '../auth-style-sign'

export class AbstractSign extends localize(i18next)(PageView) {
  static get styles() {
    return [AUTH_STYLE_SIGN]
  }

  render() {
    var { icon, title, description } = this.applicationMeta

    return html`
      <div class="wrap">
        <div class="auth-brand">
          <span class="name">${title}</span>
          <span class="welcome-msg">${description}</span>
        </div>

        <div class="auth-form">
          <h3><i18n-msg msgid="field.${this.pageName}"></i18n-msg></h3>

          <form id="form" @submit="${e => this._onSubmit(e)}">
            ${this.formfields}
          </form>
          <div id="locale-area">
            <label for="locale-selector"><mwc-icon>language</mwc-icon></label>
            <i18n-selector
              id="locale-selector"
              value=${i18next.language || 'en-US'}
              @change=${e => {
                var locale = e.detail
                if (!locale) return

                var localeInput = this.renderRoot.querySelector('#locale-input')
                localeInput.value = locale

                i18next.changeLanguage(locale)
              }}
            ></i18n-selector>
          </div>
        </div>
      </div>
    `
  }

  get pageName() {}

  get formfields() {
    return html`
      <div class="field">
        <input type="email" name="email" placeholder=${i18next.t('field.email')} required />
      </div>
      <div class="field">
        <input type="password" name="password" placeholder=${i18next.t('field.password')} required />
      </div>
      <input id="locale-input" type="hidden" name="locale" .value="${i18next.language}" />
      <a href=${auth.fullpage(auth.signupPage)}><i18n-msg msgid="field.sign up"></i18n-msg></a>
      <button class="ui button" type="submit"><i18n-msg msgid="field.${this.pageName}"></i18n-msg></button>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async _onSubmit(e) {
    this.checkValidity()
    this.handleSubmit(e)
  }

  async checkValidity() {}

  async handleSubmit(e) {}

  get applicationMeta() {
    if (!this._applicationMeta) {
      var iconLink = document.querySelector('link[rel="application-icon"]')
      var titleMeta = document.querySelector('meta[name="application-name"]')
      var descriptionMeta = document.querySelector('meta[name="application-description"]')

      this._applicationMeta = {
        icon: iconLink ? iconLink.href : logo,
        title: titleMeta ? titleMeta.content : 'Things Factory',
        description: descriptionMeta ? descriptionMeta.content : 'Reimagining Software'
      }
    }

    return this._applicationMeta
  }
}
