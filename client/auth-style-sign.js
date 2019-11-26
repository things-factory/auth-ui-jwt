import { css } from 'lit-element'

export const AUTH_STYLE_SIGN = css`
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
.auth-form {
  display: grid;
  grid-gap: 15px;
}

form {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  align-items: center;
}

h3 {
  grid-column: 1 / -1;
  margin: 40px 0 0 0;
  font: var(--auth-title-font);
  color: var(--auth-title-color);
}

.field {
  grid-column: 1 / -1;
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
  grid-column: 1 / -1;
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
  .auth-form {
    grid-template-columns: 1fr;
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
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding: 30px;
  }
  button {
    max-width: 150px;
    justify-self: flex-end;
    width: 100%;
  }
}
`
