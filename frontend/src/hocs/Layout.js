import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { connect } from 'react-redux'
import { checkAuth, load_user, googleAuthenticate } from '../actions/auth'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';

const Layout = (props) => {
  let location = useLocation();

  useEffect(() => { 
    const values = queryString.parse(location.search);
    const state = values.state ? values.state : null;
    const code = values.code ? values.code : null;

    if (state && code) {
      props.googleAuthenticate(state, code);
    } else {
      props.checkAuth();
      props.load_user();
    }
    
  }, [location, props])

  return (
    <div>
          <Navbar></Navbar>
          {props.children}
    </div>
  )
}

export default connect(null, {checkAuth, load_user, googleAuthenticate})(Layout);
