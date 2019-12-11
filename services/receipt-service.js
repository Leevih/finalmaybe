import axios from 'axios';
const url = 'https://node-rest-receipts.herokuapp.com/receipts';

const getAll = () => {
    return axios.get(url);
};

const postItem = (item) => {
    return axios.post(url, item);
};

const deleteItem = (id) => {
    return axios.delete(`${url}/${id}`);
};

export default {
    getAll,
    postItem,
    deleteItem,
};