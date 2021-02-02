import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burguer-571ec-default-rtdb.firebaseio.com/'
})

export default instance;