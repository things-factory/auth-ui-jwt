import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
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
        h3 {
          margin: 40px 0 0 0;
          font: var(--auth-title-font);
          color: var(--auth-title-color);
        }
        .field input {
          width: 100%;
          background-color: transparent;
          margin-top: 15px;
          border: none;
          border-bottom: var(--auth-input-border);
          color: var(--auth-input-color);
          font: var(--auth-input-font);
        }
        button {
          float: right;
          background-color: var(--auth-button-background-color);
          border-radius: 10px;
          border: none;
          margin-top: 20px;
          padding: var(--auth-button-padding);
          font: var(--auth-button-font);
          color: #fff;
          box-shadow: var(--box-shadow);
        }
        a {
          float: left;
          margin-top: 120px;
          color: var(--auth-title-color);
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
          a {
            color: #fff;
          }
        }

        @media (min-width: 451px) {
          .wrap {
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
            float: left;
            width: 190px;
            height: 100%;
            padding: 50px 30px;
          }
          .auth-form {
            width: calc(100% - 310px);
            padding: 30px 30px 50px 30px;
            float: right;
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
            <button class="ui button" type="submit"><i18n-msg msgid="field.sign in"></i18n-msg></button>
          </form>

          <a href=${auth.fullpage(auth.signupPage)}><i18n-msg msgid="field.sign up"></i18n-msg></a>
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
