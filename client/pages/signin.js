import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { PageView } from '@things-factory/shell'
import { css, html } from 'lit-element'

export class AuthSignin extends localize(i18next)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--auth-background);
        }

        :host *:focus {
          outline: none;
        }

        ::placeholder {
          color: var(--opacity-dark-color);
          font: var(--auth-input-font);
        }

        .wrap {
          background: url('/assets/images/bg-auth-ui.png') center bottom no-repeat;
        }

        .wrap * {
          box-sizing: border-box;
        }

        .auth-brand {
          color: #fff;
        }
        .auth-brand .name {
          display: block;
          font: var(--auth-brand-name);
        }
        .auth-brand .welcome-msg {
          font: var(--auth-brand-welcome-msg);
        }

        form {
          grid-column: span 4;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 15px;
          align-items: center;
        }

        h3 {
          grid-column: span 4;
          margin: 40px 0 0 0;
          font: var(--auth-title-font);
          color: var(--auth-title-color);
        }

        .field {
          grid-column: span 2;
        }

        .field input {
          outline: none;
          -webkit-appearance: none;
          width: 100%;
          background-color: transparent;
          border: none;
          border-bottom: var(--auth-input-border);
          color: var(--auth-input-color);
          font: var(--auth-input-font);
        }

        button {
          grid-column: 2;
          background-color: var(--auth-button-background-color);
          border-radius: 10px;
          border: none;
          margin: 5px 0;
          padding: var(--auth-button-padding);
          font: var(--auth-button-font);
          color: #fff;
          box-shadow: var(--box-shadow);
        }
        .wrap a {
          justify-self: flex-start;
          color: var(--auth-title-color);
        }

        #locale-area {
          display: flex;
          grid-column: span 4;
          margin-top: 40px;
        }

        #locale-area > label {
          display: flex;
          align-items: center;
          color: var(--secondary-text-color);
          --mdc-icon-size: 16px;
        }

        #locale-selector {
          font-size: 16px;
          width: 100%;
        }

        #locale-selector {
          --i18n-selector-field-border: none;
          --i18n-selector-field-background-color: none;
          --i18n-selector-field-font-size: 14px;
          --i18n-selector-field-color: var(--secondary-color);
        }

        @media (max-width: 450px) {
          ::placeholder {
            color: var(--opacity-light-color);
          }
          .wrap {
            width: 100%;
            background-size: cover;
            padding: 70px 50px 0 50px;
          }
          h3 {
            color: #fff;
          }
          .field input {
            border-bottom: var(--auth-input-border-light);
            color: #fff;
          }
          .wrap a {
            color: #fff;
          }
        }

        @media (min-width: 451px) {
          .wrap {
            display: grid;
            grid-template-columns: 250px 1fr;
            border-radius: 20px;
            box-shadow: var(--box-shadow);
            width: 50vw;
            min-width: 600px;
            max-width: 800px;
            margin: auto;
            background-size: 250px 100%;
            background-position: 0 0;
            background-color: #fff;
          }
          .auth-brand {
            height: 100%;
            padding: 50px 30px;
          }
          .auth-form {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            padding: 30px;
            grid-gap: 15px;
          }
        }
      `
    ]
  }

  render() {
    var { icon, title, description } = this.applicationMeta

    return html`
      <div class="wrap">
        <div class="auth-brand">
          <span class="name">${title}</span>
          <span class="welcome-msg">${description}</span>
        </div>

        <div class="auth-form">
          <h3><i18n-msg msgid="field.sign in"></i18n-msg></h3>

          <form id="signin" @submit="${e => this.handleSubmit(e)}">
            <div class="field"><input type="email" name="email" placeholder=${i18next.t('field.email')} /></div>
            <div class="field">
              <input type="password" name="password" placeholder=${i18next.t('field.password')} />
            </div>
            <input id="locale-input" type="hidden" name="locale">
            <a href=${auth.fullpage(auth.signupPage)}><i18n-msg msgid="field.sign up"></i18n-msg></a>
            <button class="ui button" type="submit"><i18n-msg msgid="field.sign in"></i18n-msg></button>
          </form>
          <div id="locale-area">
            <label for="locale-selector"><mwc-icon>language</mwc-icon></label>
            <i18n-selector id="locale-selector" value=${i18next.language || 'en-US'} @change=${e => {
              var locale = e.detail
              if(!locale) return

              var localeInput = this.renderRoot.querySelector('#locale-input')
              localeInput.value = locale

              i18next.changeLanguage(locale)
            }}></i18n-selector>
          </div>


        </div>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = e.target

    const formData = new FormData(form)
    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    var profileHandler = ({ credential, domains }) => {
      var domain = credential.domain
      var routePath

      if (!domain) {
        if (domains.length == 1) routePath = `/domain/${domains[0].subdomain}/`
        else routePath = '/domain-select'
      } else {
        routePath = `/domain/${credential.domain.subdomain}`
      }

      auth.route(routePath)
      auth.off('profile', profileHandler)
    }

    auth.on('profile', profileHandler)

    await auth.signin(json)

    form.reset()
  }

  get applicationMeta() {
    if (!this._applicationMeta) {
      var iconLink = document.querySelector('link[rel="application-icon"]')
      var titleMeta = document.querySelector('meta[name="application-name"]')
      var descriptionMeta = document.querySelector('meta[name="application-description"]')

      this._applicationMeta = {
        icon: iconLink ? iconLink.href : logo,
        title: titleMeta ? titleMeta.content : 'Things Factory',
        description: descriptionMeta ? descriptionMeta.content : 'Reimagining Software'
      }
    }

    return this._applicationMeta
  }
}

customElements.define('auth-signin', AuthSignin)
