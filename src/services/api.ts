import axios from 'axios';

const token = 'BQANR_G4BFOZVLVMNcAVfhMzAIbpuGHemdpFNLf3MtVsLl-56U2zlzTlkpeANNkBBmF9oHTQicVnTRFChBFvAsfhUyVpLZh-1JJXVX3eE_4wF_hZ35Tprp0uL0jpkUEdbH8MpSIS75dtvpfbq1mh4tChNdOt3GSi8vL8olkuhZ4Bgi9jHdu75Ss'

const api = axios.create({
  baseURL: 'https://api.spotify.com',
  headers: {
    Authorization: 'Bearer ' + token
  }
});

export default api;
