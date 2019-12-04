import '@material/mwc-button'
import '@material/mwc-icon'
import '@material/mwc-textfield'
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

          <form
            id="form"
            action="#"
            @keypress=${e => {
              if (e.key == 'Enter') this._onSubmit(e)
            }}
          >
            ${this.formfields}
          </form>
          ${this.links}
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

  firstUpdated() {
    this.formEl.reset = () => {
      this.formElements.filter(el => !(el.hidden || el.type == 'hidden')).forEach(el => (el.value = ''))
    }
  }

  pageUpdated(changes) {
    if (this.active && 'active' in changes) {
      this.renderRoot.querySelectorAll('mwc-textfield')[0].focus()
    }
  }

  get pageName() {}

  get formEl() {
    return this.renderRoot.querySelector('#form')
  }

  get formElements() {
    return Array.from(this.formEl.querySelectorAll('[name]'))
  }

  get formfields() {
    return html`
      <input id="locale-input" type="hidden" name="locale" .value="${i18next.language}" />

      <div class="field">
        <mwc-textfield name="email" type="email" label=${i18next.t('field.email')} required></mwc-textfield>
      </div>
      <div class="field">
        <mwc-textfield name="password" type="password" label=${i18next.t('field.password')} required></mwc-textfield>
      </div>

      <mwc-button class="ui button" type="submit" raised @click=${e => this._onSubmit(e)}>
        <i18n-msg msgid="field.${this.pageName}"> </i18n-msg>
      </mwc-button>
    `
  }

  get links() {
    return html`
      <a class="link" href=${auth.fullpage(auth.signupPage)}>
        <mwc-button><i18n-msg msgid="field.sign up"></i18n-msg></mwc-button>
      </a>
      <a class="link" href=${auth.fullpage(auth.forgotPasswordPage)}>
        <mwc-button><i18n-msg msgid="field.forgot-password"></i18n-msg></mwc-button>
      </a>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async _onSubmit(e) {
    if (this.checkValidity()) this.handleSubmit(e)
  }

  checkValidity() {
    return this.formElements.every(el => el.checkValidity())
  }

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
