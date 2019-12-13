import '@material/mwc-button'
import '@material/mwc-textfield'
import { i18next } from '@things-factory/i18n-base'
import { css, html } from 'lit-element'
import '../components/profile-component'
import { generatePasswordPatternRegexp } from '../utils/generate-password-pattern-regexp'
import { AbstractAuthPage } from './abstract-auth-page'

export class AbstractPasswordReset extends AbstractAuthPage {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          width: 100vw;
          height: 100vh;
          background-color: var(--main-section-background-color);
        }
        .wrap {
          max-width: 550px;
          margin: 15px auto;
          text-align: center;
        }
        :host *:focus {
          outline: none;
        }

        mwc-textfield {
          width: 100%;
          --mdc-theme-primary: var(--auth-input-color);
          --mdc-theme-error: var(--status-danger-color);
          --mdc-text-field-fill-color: transparent;
          font: var(--auth-input-font);
        }
        mwc-button {
          --mdc-theme-primary: var(--auth-button-background-color);
        }
      `
    ]
  }

  static get properties() {
    return {
      data: Object,
      token: String
    }
  }

  get actionUrl() {
    return ''
  }

  get submitButtonLabel() {
    return ''
  }

  render() {
    return html`
      <div class="wrap">
        <h1 id="title"></h1>
        <form
          id="form"
          action="${this.actionUrl}"
          method="POST"
          @keypress=${e => {
            if (e.key == 'Enter') this._onSubmit(e)
          }}
        >
          <input name="token" type="hidden" .value=${this.token} required />
          <input id="password" name="password" type="hidden" required />
          <mwc-textfield
            name="password"
            type="password"
            label="${i18next.t('label.password')}"
            placeholder="${i18next.t('text.password')}"
            .pattern="${generatePasswordPatternRegexp({
              useTightPattern: true
            }).source}"
            helper=${i18next.t('text.password rule')}
            helperPersistent
            @input=${e => {
              var val = e.target.value
              var confirmPass = this.renderRoot.querySelector('#confirm-password')
              var passwordInput = this.renderRoot.querySelector('#password')
              passwordInput.value = val
              confirmPass.setAttribute('pattern', val)
            }}
            required
          ></mwc-textfield>
          <mwc-textfield
            id="confirm-password"
            name="confirm-password"
            type="password"
            label="${i18next.t('label.confirm password')}"
            placeholder="${i18next.t('text.confirm password')}"
            required
          ></mwc-textfield>
          <mwc-button id="submit-button" type="submit" raised @click=${e => this._onSubmit(e)}>
            <i18n-msg msgid="${this.submitButtonLabel}"></i18n-msg>
          </mwc-button>
        </form>
        <div id="locale-area">
          <label for="locale-selector"><mwc-icon>language</mwc-icon></label>
          <i18n-selector
            id="locale-selector"
            value=${i18next.language || 'en-US'}
            @change=${e => {
              var locale = e.detail
              if (!locale) return

              var localeInput = this.renderRoot.querySelector('#locale-input')
              localeInput.value = locale

              i18next.changeLanguage(locale)
            }}
          ></i18n-selector>
        </div>
      </div>
      <snack-bar
        id="snackbar"
        level="error"
        .message="${i18next.t(`text.${this.message}`, {
          ...this.detail
        })}"
      ></snack-bar>
    `
  }

  updated(changed) {
    super.updated(changed)
    if (changed.has('data')) {
      this.token = this.data.token
    }

    if (changed.has('message')) {
      if (!this.message) {
        this.hideSnackbar()
      } else {
        this.showSnackbar({
          timer: -1
        })
      }
    }
  }

  async submit() {
    this.formEl.submit()
  }

  async handleSubmit(e) {}
}
