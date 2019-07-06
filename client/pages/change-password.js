import { html, LitElement, css } from 'lit-element'
import { auth } from '@things-factory/auth-base'

import { i18next, localize } from '@things-factory/i18n-base'

export class ChangePassword extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      css`
        div#pwdSetting {
          padding: 30px;

          text-transform: capitalize;
        }

        input {
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom-color: #32526a;
          border-bottom-width: 1px;
          width: 100%;
          height: 30px;
        }

        div.field {
          padding-bottom: 10px;
        }

        ::placeholder {
          font-size: 0.8rem;
          text-transform: capitalize;
        }

        span {
          color: #c0504d;
          text-align: left;
          font-size: 1em;
        }

        button {
          text-transform: uppercase;
        }
      `
    ]
  }

  render() {
    return html`
      <div id="pwdSetting">
        <span><i18n-msg msgid="text.change password"></i18n-msg></span><br />

        <form id="changePass" @submit=${e => this._handleSubmit(e)}>
          <div class="field">
            <input type="password" name="current_pass" placeholder=${i18next.t('text.current password')} required />
          </div>
          <div class="field">
            <input type="password" name="new_pass" placeholder=${i18next.t('text.new password')} required />
          </div>
          <div class="field">
            <input type="password" name="confirm_pass" placeholder=${i18next.t('text.confirm password')} required />
          </div>
          <button class="ui button" type="submit"><i18n-msg msgid="text.change password"></i18n-msg></button>
        </form>
      </div>
    `
  }

  async _encodeSha256(password) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(password)

    const buffer = await crypto.subtle.digest('SHA-256', encoded)
    return hexString(buffer)
  }

  async _handleSubmit(e) {
    e.preventDefault()

    const form = e.target

    const formData = new FormData(form)
    let json = {}

    //convert form into json
    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    auth.changePassword(json)

    form.reset()
  }
}

customElements.define('change-password', ChangePassword)
