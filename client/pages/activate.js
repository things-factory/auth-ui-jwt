import { auth } from '@things-factory/auth-base'
import { i18next, localize } from '@things-factory/i18n-base'
import { PageView } from '@things-factory/shell'
import { css, html } from 'lit-element'

export class AuthActivate extends localize(i18next)(PageView) {
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
    return html`
       <div class="wrap">
        <label for="domain-select"><i18n-msg msgid="text.activate required"></i18n-msg></label>
        <select
          id="domain-select"
          @change=${e => {
            var domain = e.target.value
            if (domain) location.pathname = `/domain/${domain}/`
          }}
        >
          <option value=""></option>
          ${(this.domains || []).map(
            domain => html`
              <option value="${domain.subdomain}">${domain.name}</option>
            `
          )}
        </select>
      </div>
    `
  }

  get context() {
    return {
      fullbleed: true
    }
  }
}

customElements.define('auth-activate', AuthActivate)
