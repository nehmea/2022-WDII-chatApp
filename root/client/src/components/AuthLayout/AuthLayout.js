import './AuthLayout.css'

import Navigation from '../../helpers/Navigation';

function AuthLayout(props) {


  return (
    <div className="d-flex flex-column landing background-img">
      <Navigation />
      {props.children}
    </div>
  )
}

export default AuthLayout
