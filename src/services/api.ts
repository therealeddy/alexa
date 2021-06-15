import axios from 'axios';

const token = 'BQBJxkeJImn8vqGn4rrHMqYOr-HygmiAI_gvWg3aN5qXGAhFBzhTNKRxprc9GIT8Od9_ey3n8MI9_HYiLEHnl3JebyO1TQDsBCkCQsk884jcRJgp7XzyI98-3ONCYE9z9ZyBOYr93oSsE7GqXrD9qPvQaScpY8KhUTviT7mq9yS3zTMVGaBBjuw'

const api = axios.create({
  baseURL: 'https://api.spotify.com',
  headers: {
    Authorization: 'Bearer ' + token
  }
});

export default api;
