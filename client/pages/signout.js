import { auth } from '@things-factory/auth-base'
import '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'

export class AuthSignOut extends LitElement {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
      `
    ]
  }

  render() {
    return html`
      <h3><i18n-msg msgid="field.sign out"></i18n-msg></h3>
      <a href=${auth.fullpage(auth.signinPage)}><i18n-msg msgid="field.sign in"></i18n-msg></a>
    `
  }
}

customElements.define('auth-signout', AuthSignOut)
