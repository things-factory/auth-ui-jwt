import { AbstractPasswordReset } from '../components/abstract-password-reset'

export class ResetPassword extends AbstractPasswordReset {
  get actionUrl() {
    return '/reset-password'
  }

  get submitButtonLabel() {
    return 'label.change password'
  }
}

customElements.define('reset-password', ResetPassword)
