import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://weather-cast-server-swart.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;