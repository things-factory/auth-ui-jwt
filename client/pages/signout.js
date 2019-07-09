import { html, css } from 'lit-element'
import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'

import '@things-factory/i18n-base'

export class AuthSignOut extends PageView {
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
