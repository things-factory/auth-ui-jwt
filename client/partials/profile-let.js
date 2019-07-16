import { LitElement, html, css } from 'lit-element'
import { connect } from 'pwa-helpers'
import { store } from '@things-factory/shell'

export class ProfileLet extends connect(store)(LitElement) {
  static get properties() {
    return {
      profile: Object
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;

        background-color: #e5e5e5;
        height: 30px;
        padding: 20px 0px 20px 0px;
        text-align: center;
      }

      p {
        margin: 0;
      }
    `
  }

  render() {
    return html`
      <p></p>${this.profile && this.profile.email}</p>
    `
  }

  stateChanged(state) {
    this.profile = state.auth.user
  }
}

customElements.define('profile-let', ProfileLet)
