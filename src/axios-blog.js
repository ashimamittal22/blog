import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
});



export default instance;