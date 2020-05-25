import { i18next, localize } from '@things-factory/i18n-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { css, html, LitElement } from 'lit-element'
import '../components/profile-component'

export class AuthProfile extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      css`
        :host {
          display: block;
          background-color: var(--main-section-background-color);
        }
      `
    ]
  }

  get context() {
    return {
      title: i18next.t('text.auth profile')
    }
  }

  render() {
    return html` <profile-component></profile-component> `
  }
}

customElements.define('auth-profile', AuthProfile)
