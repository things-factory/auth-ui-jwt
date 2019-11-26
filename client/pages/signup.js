import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { PageView } from '@things-factory/shell'
import { html } from 'lit-element'
import { AUTH_STYLE_SIGN } from '../auth-style-sign'

export class AuthSignup extends localize(i18next)(PageView) {
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
          <h3><i18n-msg msgid="field.sign up"></i18n-msg></h3>

          <form id="signin" @submit="${e => this.handleSubmit(e)}">
            <div class="field"><input type="text" name="name" placeholder=${i18next.t('field.name')} /></div>
            <div class="field"><input type="email" name="email" placeholder=${i18next.t('field.email')} /></div>
            <div class="field">
              <input type="password" name="password" placeholder=${i18next.t('field.password')} />
            </div>
            <a href=${auth.fullpage(auth.signinPage)}><i18n-msg msgid="field.sign in"></i18n-msg></a>
            <button class="ui button" type="submit"><i18n-msg msgid="field.sign up"></i18n-msg></button>
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

  get context() {
    return {
      fullbleed: true
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    await auth.signup(json)

    form.reset()
  }

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

customElements.define('auth-signup', AuthSignup)
