import { useState, useEffect } from 'react'

import { ButtonInitial, ButtonVoice } from './components'

import { Container, ContentCenter, LastTrans, Status } from './styles/app'

import {
  affirmativeAudio,
  dispositionAudio,
  errorAudio,
  musicAudio,
} from './audios'

import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'

import { ToastContainer, toast } from 'react-toastify'

import api from './services/api'

import GlobalStyle from './styles/global'
import { tinyStrToArray } from './utils/tinyStrToArray'
import { MusicResponse } from './services/types'

function App() {
  const [logged, setLogged] = useState(false)

  const [active, setActive] = useState(false)
  const [loading, setLoading] = useState(false)

  const [idMusic, setIdMusic] = useState('')
  const [lastTranscript, setLastTranscript] = useState('')

  const onSuccessLoggin = () => {
    setLogged(true)
  }

  const playAudio = (value: string) => {
    try {
      new Audio(value).play()
    } catch (err) {}
  }

  const commands = [
    {
      command: tinyStrToArray(['Alexa', 'Alexia']),
      callback: () => {
        setActive(true)
        playAudio(dispositionAudio)
      },
    },
    {
      command: tinyStrToArray(['Pare']),
      callback: () => {
        setActive(false)
        setIdMusic('')
        playAudio(affirmativeAudio)
      },
    },
    {
      command: tinyStrToArray(['Tocar música *', 'Tocar *', 'Música *']),
      callback: (music: string) => {
        if (active && music && !loading) {
          const getData = async () => {
            try {
              setLoading(true)

              const response = await api.get<MusicResponse>('/v1/search', {
                params: {
                  q: music,
                  type: 'track',
                },
              })

              setLoading(false)

              setIdMusic(response.data.tracks.items[0].id)

              playAudio(musicAudio)
            } catch (ex) {
              playAudio(errorAudio)
            }
          }

          getData()
        }

        setActive(false)
      },
    },
  ]

  const handleClickVoice = () => {
    if (!listening) {
      toast.warning('Permita o microfone em seu navegador!')
      return
    }

    setActive(!active)
  }

  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition({ commands })

  useEffect(() => {
    if (!listening && logged) {
      SpeechRecognition.startListening({
        language: 'pt-br',
      })
    }
  }, [listening, logged])

  useEffect(() => {
    if (transcript) {
      setLastTranscript(transcript)
    }
  }, [transcript])

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>
  }

  console.log(`Transcript: ${transcript}`)

  return (
    <Container>
      <ContentCenter>
        {!logged ? (
          <ButtonInitial onSuccess={onSuccessLoggin} />
        ) : (
          <>
            <ButtonVoice $active={active} onClick={handleClickVoice} />
            <Status $listening={listening}>Microphone:</Status>
            {lastTranscript && (
              <LastTrans>
                <b>Último comando:</b> {lastTranscript}
              </LastTrans>
            )}
          </>
        )}
      </ContentCenter>

      {idMusic && (
        <iframe
          src={`https://open.spotify.com/embed/track/${idMusic}?theme=0&autoplay=1?play=true`}
          title="music-spotify"
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        ></iframe>
      )}

      <ToastContainer />
      <GlobalStyle />
    </Container>
  )
}

export default App
