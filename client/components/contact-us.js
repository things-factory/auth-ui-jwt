import '@material/mwc-textarea'
import '@material/mwc-textfield'
import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { css, html, LitElement } from 'lit-element'

export class ContactUs extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      css`
        * {
          box-sizing: border-box;
        }
        *:focus {
          outline: none;
        }
        input {
          border: var(--change-password-field-border);
          border-radius: var(--change-password-field-border-radius);
          padding: var(--change-password-field-padding);

          font: var(--change-password-field-font);
          width: var(--change-password-field-width);
        }
        input:focus {
          border: 1px solid var(--focus-background-color);
        }

        div.field {
          padding-bottom: 10px;
        }

        ::placeholder {
          font-size: 0.8rem;
          text-transform: capitalize;
        }

        button {
          background-color: var(--secondary-color, #394e64);
          margin: 2px 2px 10px 2px;
          height: var(--button-height, 28px);
          color: var(--button-color, #fff);
          font: var(--button-font);
          border-radius: var(--button-radius, 5px);
          border: var(--button-border, 1px solid transparent);
          line-height: 1.5;
        }
        button:hover,
        button:active {
          background-color: var(--button-active-background-color, #22a6a7);
          border: var(--button-active-border);
        }
      `
    ]
  }

  render() {
    return html`
      <form @submit=${e => this._handleSubmit(e)}>
        <div class="field">
          <mwc-textfield type="text" name="subject" label=${i18next.t('label.subject')} required></mwc-textfield>
        </div>
        <div class="field">
          <mwc-textfield type="text" name="sender" label=${i18next.t('label.email')} required></mwc-textfield>
        </div>
        <div class="field">
          <mwc-textarea name="content" label=${i18next.t('label.content')} required></mwc-textarea>
        </div>

        <button class="ui button" type="submit"><i18n-msg msgid="label.submit"></i18n-msg></button>
      </form>
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

customElements.define('contact-us', ContactUs)
