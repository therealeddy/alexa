import React, { useState } from 'react';

import { ButtonVoice } from '../../components';

import { Container } from './styles';

const SignIn: React.FC = () => {

  const [active, setActive] = useState(false);

  return (
    <Container>
      <ButtonVoice active={active} onClick={() => setActive(!active)}/>
    </Container>
  );
};

export default SignIn;
