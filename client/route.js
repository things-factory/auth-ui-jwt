export default function route(page) {
  switch (page) {
    case 'signup':
      import('./pages/signup.js')
      return page

    case 'signin':
      import('./pages/signin.js')
      return page

    case 'profile':
      import('./pages/profile.js')
      return page

    case 'domain-select':
      import('./pages/domain-select.js')
      return page

    case 'activate':
      import('./pages/activate.js')
      return page
  }
}
