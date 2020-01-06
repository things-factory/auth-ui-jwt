export default function route(page) {
  switch (page) {
    case 'profile':
      import(
        /* webpackPrefetch: true */
        /* webpackChunkName: "profile" */
        './pages/profile.js'
      )
      return page
  }
}
