import { auth } from '@things-factory/auth-base'
import '@things-factory/i18n-ui/client/components/i18n-selector'
import { AbstractSign } from '../components/abstract-sign'

export class AuthSignin extends AbstractSign {
  get pageName() {
    return 'sign in'
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
}

customElements.define('auth-signin', AuthSignin)
