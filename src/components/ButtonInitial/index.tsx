import React from 'react'
import api, { apiAccount } from '../../services/api'
import { env } from '../../config/env'
import { AccessToken } from '../../services/types'
import { ButtonInit } from './styles'
import { toast } from 'react-toastify'

interface Props {
  onSuccess: () => void
}

const ButtonInitial: React.FC<Props> = ({ onSuccess }) => {
  const handleInit = async () => {
    try {
      const postData = new URLSearchParams()
      postData.append('grant_type', 'client_credentials')
      postData.append('client_id', env.SPOTIFY_CLIENT_ID)
      postData.append('client_secret', env.SPOTIFY_CLIENT_SECRET)

      const response = await apiAccount.post<AccessToken>('/token', postData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })

      api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`

      onSuccess()
    } catch (err) {
      toast.error('Algo deu errado, tente novamente!')
    }
  }

  return (
    <ButtonInit type="button" onClick={handleInit}>
      Iniciar Alexa
    </ButtonInit>
  )
}

export default ButtonInitial
