import React from 'react';
import googleLogo from 'assets/glogo.png';
import { SocialLogin } from 'styles/form';

function GoogleLoginHooks() {
  return (
    <SocialLogin>
      <img src={googleLogo} alt="googleLogo" />
      <span>Google</span>
    </SocialLogin>
  );
}

export default GoogleLoginHooks;
