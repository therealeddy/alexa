import React, { useState, useEffect } from 'react';

import { ButtonVoice } from '../../components';

import { Container } from './styles';

import { afirmativoAudio, disposicaoAudio, musicaAudio, erradoAudio } from '../../audios';

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import api from '../../services/api';

interface MusicResponse {
  tracks: {
    items: {
      external_urls: {
        spotify: string
      }
      id: string
    }[]
  }
}

const SignIn: React.FC = () => {

  const [active, setActive] = useState(false);
  const [idMusic, setIdMusic] = useState('');

  const commands = [
    {
      command: "alexa",
      callback: () => {
        setActive(true);
        new Audio(disposicaoAudio).play();
      },
    },
    {
      command: "pare",
      callback: () => {
        setActive(false);
        setIdMusic('');
        new Audio(afirmativoAudio).play();
      },
    },
    {
      command: "tocar música *",
      callback: (music: string) => {
        if(active && music) {
          const getData = async () => {
            try {
              const response = await api.get<MusicResponse>('/v1/search',{
                params: {
                  q: music,
                  type: 'track'
                },
              });
              
              setIdMusic(response.data.tracks.items[0].id)
              
              new Audio(musicaAudio).play();
            } catch (ex) {
              new Audio(erradoAudio).play();
            }
          }
          
          getData();
        }

        setActive(false);
      },
    },
  ];

  const handleClickVoice = () => {
    SpeechRecognition.startListening({
      language: "pt-br",
    });

    setActive(!active);
  }

  const { listening } = useSpeechRecognition({ commands });

  useEffect(() => {
    SpeechRecognition.startListening({
      language: "pt-br",
    });
  }, [listening]);

  return (
    <Container>
      <div className="button-center">
        <ButtonVoice active={active} onClick={handleClickVoice}/>
      </div>

      {idMusic && (
        <iframe src={`https://open.spotify.com/embed/track/${idMusic}?theme=0&autoplay=1`} title="musica" width="100%" height="80" frameBorder="0" allow="encrypted-media"></iframe>
      )}
    </Container>
  );
};

export default SignIn;
