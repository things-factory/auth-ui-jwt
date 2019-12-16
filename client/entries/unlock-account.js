import { AbstractPasswordReset } from '../components/abstract-password-reset'

export class UnlockAccount extends AbstractPasswordReset {
  get actionUrl() {
    return '/unlock-account'
  }

  get submitButtonLabel() {
    return 'label.unlock account'
  }

  get title() {
    return 'unlock account'
  }
}

customElements.define('unlock-account', UnlockAccount)
