import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { html } from 'lit-element'
import { AbstractSign } from '../components/abstract-sign'
import { generatePasswordPatternRegexp } from '../utils/generate-password-pattern-regexp'

export class AuthSignup extends AbstractSign {
  get pageName() {
    return 'sign up'
  }

  get actionUrl() {
    return '/signup'
  }

  get formfields() {
    return html`
      <input id="name" type="hidden" name="name" />
      <input id="email" type="hidden" name="email" />
      <input id="password" type="hidden" name="password" />

      <div class="field">
        <mwc-textfield
          name="name"
          type="text"
          label=${i18next.t('field.name')}
          required
          @input=${e => {
            var nameInput = this.renderRoot.querySelector('#name')
            nameInput.value = e.target.value
          }}
        ></mwc-textfield>
      </div>
      <div class="field">
        <mwc-textfield
          name="email"
          type="email"
          label=${i18next.t('field.email')}
          required
          @input=${e => {
            var emailInput = this.renderRoot.querySelector('#email')
            emailInput.value = e.target.value
          }}
        ></mwc-textfield>
      </div>
      <div class="field">
        <mwc-textfield
          name="password"
          type="password"
          label=${i18next.t('field.password')}
          .pattern="${generatePasswordPatternRegexp({
            useTightPattern: true
          }).source}"
          helper=${i18next.t('text.password rule')}
          helperPersistent
          required
          @input=${e => {
            var confirmPasswordEl = this.renderRoot.querySelector('#confirm-password')
            var password = this.renderRoot.querySelector('#password')
            var val = e.target.value
            password.value = val
            confirmPasswordEl.pattern = val
            confirmPasswordEl.requestUpdate()
          }}
        ></mwc-textfield>
      </div>
      <div class="field">
        <mwc-textfield
          id="confirm-password"
          name="confirm-password"
          type="password"
          label=${i18next.t('field.confirm password')}
          required
          .validationMessage=${i18next.t('text.passwords do not match')}
        ></mwc-textfield>
      </div>
      <mwc-button class="ui button" raised @click=${e => this._onSubmit(e)}>
        <i18n-msg msgid="field.${this.pageName}"></i18n-msg>
      </mwc-button>
    `
  }

  get links() {
    return html`
      <a class="link" href=${auth.fullpage(auth.signinPage)}>
        <mwc-button><i18n-msg msgid="field.sign in"></i18n-msg></mwc-button>
      </a>
    `
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = this.formEl
    const formData = new FormData()

    this.formElements.forEach(el => {
      var name = el.getAttribute('name')
      formData.append(name, el.value)
    })

    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    await auth.signup(json)

    form.reset()
  }
}

customElements.define('auth-signup', AuthSignup)
