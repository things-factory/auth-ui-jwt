import { i18next, localize } from '@things-factory/i18n-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { PageView } from '@things-factory/shell'
import { css, html } from 'lit-element'
import '../components/profile-component'

export class AuthProfile extends localize(i18next)(PageView) {
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
    return html`
      <profile-component></profile-component>
    `
  }
}

customElements.define('auth-profile', AuthProfile)
