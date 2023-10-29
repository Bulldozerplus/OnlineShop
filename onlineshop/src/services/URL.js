import axios from "axios";

// TODO rename + axios instance reading
export const APIservice = {
    getAllGoods: () => axios.get('http://localhost:4002/goods'),
    getGoodsById: (id) => axios.get(`http://localhost:4002/goods/${id}`)
}
