import { AbstractPasswordReset } from '../components/abstract-password-reset'

export class ResetPassword extends AbstractPasswordReset {
  get actionUrl() {
    return '/reset-password'
  }

  get submitButtonLabel() {
    return 'label.change password'
  }

  get title() {
    return 'reset password'
  }
}

customElements.define('reset-password', ResetPassword)
