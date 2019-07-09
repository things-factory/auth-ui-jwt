import { html, css } from 'lit-element'

import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { localize, i18next } from '@things-factory/i18n-base'

export class AuthSignin extends localize(i18next)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
          text-transform: capitalize;
        }

        ::placeholder {
          font-size: 0.8rem;
          text-transform: capitalize;
        }

        button {
          text-transform: uppercase;
        }
      `
    ]
  }

  render() {
    return html`
      <h3><i18n-msg msgid="field.sign in"></i18n-msg></h3>

      <form id="signin" @submit="${e => this.handleSubmit(e)}">
        <div class="field"><input type="email" name="email" placeholder=${i18next.t('field.email')} /></div>
        <div class="field"><input type="password" name="password" placeholder=${i18next.t('field.password')} /></div>
        <button class="ui button" type="submit"><i18n-msg msgid="field.sign in"></i18n-msg></button>
      </form>

      <a href=${auth.fullpage(auth.signupPage)}><i18n-msg msgid="field.sign up"></i18n-msg></a>
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

    await auth.signin(json)

    form.reset()
  }
}

customElements.define('auth-signin', AuthSignin)
