export interface AccessToken {
  access_token: string
  expires_in: number
  token_type: string
}

export interface MusicResponse {
  tracks: {
    items: {
      external_urls: {
        spotify: string
      }
      id: string
    }[]
  }
}
