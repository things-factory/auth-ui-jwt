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
          display: block;
          width: 100vw;
          height: 100vh;
          background-color: var(--main-section-background-color);
          --mdc-theme-primary: #fff;
        }
        .wrap {
          position: relative;
          height: 100%;
          box-sizing: border-box;
          max-width: 500px;
          margin: auto;
          padding: var(--auth-special-page-padding);
          background: url(/assets/images/icon-activate.png) center 70px no-repeat;
          text-align: center;
        }
        h1 {
          margin: 0;
          padding: 0;
          font: var(--auth-title-font);
          color: var(--auth-title-color);
        }

        p {
          margin: 0;
          padding: var(--auth-description-padding);
          font: var(--auth-description-font);
          color: var(--auth-description-color);
        }

        #button-area {
          border-top: 1px dashed #ccc;
          padding-top: 10px;
        }

        #locale-area {
          position: absolute;
          bottom: 50px;
          display: flex;
          width: 100%;
        }

        #locale-area > label {
          display: flex;
          align-items: center;
          color: #017e7f;
          --mdc-icon-size: 16px;
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

        i18n-selector {
          width: 100%;
          --i18n-selector-field-border: none;
          --i18n-selector-field-background-color: none;
          --i18n-selector-field-font-size: 14px;
          --i18n-selector-field-color: #394e64;
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
        <h1 id="title"><i18n-msg msgid="title.${this.title}"></i18n-msg></h1>

        <p></p>
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
        </form>
        <div id="button-area">
          <mwc-button id="submit-button" type="submit" raised @click=${e => this._onSubmit(e)}>
            <i18n-msg msgid="${this.submitButtonLabel}"></i18n-msg>
          </mwc-button>
        </div>
        <div id="locale-area">
          <label for="locale-selector"><mwc-icon>language</mwc-icon></label>
          <i18n-selector
            id="locale-selector"
            value=${i18next.language || 'en-US'}
            @change=${e => {
              var locale = e.detail
              if (!locale) return

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
