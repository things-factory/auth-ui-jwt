export default function route(page) {
  switch (page) {
    case 'signup':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "signup" */
        './pages/signup.js'
      )
      return page

    case 'signin':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "signin" */
        './pages/signin.js'
      )
      return page

    case 'profile':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "profile" */
        './pages/profile.js'
      )
      return page

    case 'domain-select':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "domain-select" */
        './pages/domain-select.js'
      )
      return page

    case 'activate':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "activate" */
        './pages/activate.js'
      )
      return page

    case 'forgot-password':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "forgot-password" */
        './pages/forgot-password.js'
      )
      return page
    case 'reset-password':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "reset-password" */
        './pages/reset-password.js'
      )
      return page
    case 'congratulations':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "congratulations" */
        './pages/congratulations.js'
      )
      return page
  }
}
