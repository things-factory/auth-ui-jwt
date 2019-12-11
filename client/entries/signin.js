import '@material/mwc-button'
import '@material/mwc-icon'
import '@material/mwc-textfield'
import { auth } from '@things-factory/auth-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { AbstractSign } from '../components/abstract-sign'

export class AuthSignin extends AbstractSign {
  get pageName() {
    return 'sign in'
  }

  get actionUrl() {
    return '/signin'
  }

  async handleSubmit(e) {
    e.preventDefault()
    const form = this.formEl
    const formData = new FormData()

    this.formElements.forEach(el => {
      var name = el.getAttribute('name')
      formData.append(name, el.value)
    })

    let json = {}

    for (const [key, value] of formData.entries()) {
      json[key] = value
    }

    await auth.signin(json)

    form.reset()
  }
}

customElements.define('auth-signin', AuthSignin)
