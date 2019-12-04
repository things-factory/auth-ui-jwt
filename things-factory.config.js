import bootstrap from './client/bootstrap'
import route from './client/route'

export default {
  route,
  routes: [
    {
      tagname: 'auth-signup',
      page: 'signup'
    },
    {
      tagname: 'auth-signin',
      page: 'signin'
    },
    {
      tagname: 'auth-profile',
      page: 'profile'
    },
    {
      tagname: 'auth-domain-select',
      page: 'domain-select'
    },
    {
      tagname: 'auth-activate',
      page: 'activate'
    },
    {
      tagname: 'forgot-password',
      page: 'forgot-password'
    },
    {
      tagname: 'reset-password',
      page: 'reset-password'
    }
  ],
  bootstrap
}
