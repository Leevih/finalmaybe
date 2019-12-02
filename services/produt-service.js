import axios from 'axios';
const url = 'https://node-rest-receipts.herokuapp.com/products';


const getAll = () => {
    return axios.get(url);
};

const postItem = (item) => {
    return axios.post(url, item);
};

const deleteItem = (item) => {
    return axios.delete(`${url}/${item._id}`);
}

export default {
    getAll,
    postItem,
    deleteItem,
}