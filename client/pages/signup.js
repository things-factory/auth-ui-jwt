import { auth } from '@things-factory/auth-base'
import { i18next } from '@things-factory/i18n-base'
import { css, html } from 'lit-element'
import { AbstractSign } from '../components/abstract-sign'

export class AuthSignup extends AbstractSign {
  static get styles() {
    return [
      super.styles,
      css`
        .hint {
          font-size: 11px;
          color: var(--primary-color);
        }

        @media (max-width: 450px) {
          .hint {
            color: white;
          }
        }
      `
    ]
  }

  get pageName() {
    return 'sign up'
  }

  get formfields() {
    return html`
      <div class="field"><input type="text" name="name" placeholder=${i18next.t('field.name')} required /></div>
      <div class="field"><input type="email" name="email" placeholder=${i18next.t('field.email')} required /></div>
      <div class="field">
        <input type="password" name="password" placeholder=${i18next.t('field.password')} required />
        <span class="hint"><i18n-msg msgid="text.password rule"></i18n-msg></span>
      </div>
      <div class="field">
        <input type="password" placeholder=${i18next.t('field.confirm password')} required />
      </div>
      <input id="locale-input" type="hidden" name="locale" .value="${i18next.language}" />
      <a href=${auth.fullpage(auth.signinPage)}><i18n-msg msgid="field.sign in"></i18n-msg></a>
      <button class="ui button" type="submit"><i18n-msg msgid="field.sign up"></i18n-msg></button>
    `
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
}

customElements.define('auth-signup', AuthSignup)
