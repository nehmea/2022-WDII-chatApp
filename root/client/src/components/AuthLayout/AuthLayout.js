import './AuthLayout.css'

import Navigation from './Navigation';

function AuthLayout({ children }) {
  return (
    <div className="d-flex flex-column landing background-img">
      <Navigation />
      {children}
    </div>
  )
}

export default AuthLayout
