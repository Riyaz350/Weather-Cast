import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUserInfo = () => {
    const axiosPublic = useAxiosPublic()

    const {data:users =[], isPending:userLoading, refetch} =useQuery({
        queryKey:['users'],
        queryFn: async()=>{
            
                const res = await axiosPublic.get('/users')
                return res.data
        }
    })
    return [users, userLoading, refetch]
};

export default useUserInfo;