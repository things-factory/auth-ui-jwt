import { html, css } from 'lit-element'
import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'

export class AuthProfile extends PageView {
  static get properties() {
    return {
      email: String,
      accessToken: String
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          text-align: center;
        }

        div {
          text-align: center;
        }

        #token {
          display: inline-block;
          width: 50%;
          overflow-wrap: break-word;
          text-align: left;
          border: 1px solid tomato;
          padding: 2px;
        }
      `
    ]
  }

  firstUpdated() {
    auth.on('signin', accessToken => {
      this.setCredential(null)
      this.accessToken = accessToken
    })
    auth.on('signout', () => {
      this.setCredential(null)
      this.accessToken = ''
    })
    auth.on('profile', credential => {
      this.setCredential(credential)
    })

    this.setCredential(auth.credential)
    this.accessToken = auth.accessToken
  }

  setCredential(credential) {
    if (credential) {
      this.email = credential.email
    } else {
      this.email = ''
    }
  }

  get tools() {
    return html`
      <label>Auth Profile</label>
    `
  }

  render() {
    return html`
      <div>
        <p>Email: <b>${this.email}</b></p>
      </div>
      <div>
        <p>Token:</p>
        <div id="token">${this.accessToken}</div>
      </div>

      <button @click="${() => auth.signout()}">Sign Out</button>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
