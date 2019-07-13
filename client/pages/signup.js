import { html, css } from 'lit-element'

import { PageView } from '@things-factory/shell'
import { auth } from '@things-factory/auth-base'
import { localize, i18next } from '@things-factory/i18n-base'

export class AuthSignup extends localize(i18next)(PageView) {
  static get styles() {
    return [
      css`
        :host {
          display: flex;
          background-color: var(--auth-background);
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
          margin-top: 70px;
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
            position: absolute;
            bottom: 50px;
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
    return html`
      <div class="wrap">
        <div class="auth-brand">
          <span class="name">hatio</span>
          <span class="welcome-msg">welcom to the hatio..</span>
        </div>

        <div class="auth-form">
          <h3><i18n-msg msgid="field.sign up"></i18n-msg></h3>

          <form id="signin" @submit="${e => this.handleSubmit(e)}">
            <div class="field"><input type="text" name="name" placeholder=${i18next.t('field.name')} /></div>
            <div class="field"><input type="email" name="email" placeholder=${i18next.t('field.email')} /></div>
            <div class="field">
              <input type="password" name="password" placeholder=${i18next.t('field.password')} />
            </div>
            <button class="ui button" type="submit"><i18n-msg msgid="field.sign up"></i18n-msg></button>
          </form>

          <a href=${auth.fullpage(auth.signinPage)}><i18n-msg msgid="field.sign in"></i18n-msg></a>
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

    await auth.signup(json)

    form.reset()
  }
}

customElements.define('auth-signup', AuthSignup)
