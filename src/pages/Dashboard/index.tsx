import React, { useState, useEffect } from 'react';

import { ButtonVoice } from '../../components';

import { Container } from './styles';

import { afirmativoAudio, disposicaoAudio, musicaAudio } from '../../audios';

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
  const [music, setMusic] = useState('');
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
        setMusic('');
        new Audio(afirmativoAudio).play();
      },
    },
    {
      command: "tocar música *",
      callback: (music: string) => {
        if(active) {
          setMusic(music)

          new Audio(musicaAudio).play();
        }

        setActive(false)
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
    const getData = async () => {
      const response = await api.get<MusicResponse>('/v1/search',{
        params: {
          q: music,
          type: 'track'
        },
      });

      setIdMusic(response.data.tracks.items[0].id)
    }
    
    if (music) {
      getData()
      setMusic('')
    }
  }, [music])

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
