import React from 'react';

import { Container } from './styles';

import alexaIcon from '../../images/alexa-icon.svg';

interface ButtonVoiceProps {
  active: boolean
  onClick: () => void
}

const ButtonVoice: React.FC<ButtonVoiceProps> = ({ active, onClick }) => {
  return (
    <Container active={active}>
      <button type="button" onClick={onClick}>
        <img src={alexaIcon} alt="Icone da Alexa" />
      </button>
    </Container>
  );
};

export default ButtonVoice;
