import axios from "axios";

export const getGoodsDataFromServer = {
    getAllGoods: () => axios.get('http://localhost:4002/goods'),
    getGoodsById: (id) => axios.get(`http://localhost:4002/goods/${id}`)
}