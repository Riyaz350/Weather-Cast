import { useContext, useEffect, useState } from "react";
import useUserInfo from "../Hooks/useUserInfo";
import { AuthContext } from "../Authentication/Authprovider";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const Users = () => {
    const axiosPublic = useAxiosPublic()
    const {user, logOut} = useContext(AuthContext)
    const [users,, refetch] = useUserInfo()
    const [statusUpdate, setStatusUpdate] = useState('')
    const email = user?.email

    const notUser = users.filter(userr=> userr.email !== user?.email)
    const isUser = users.find(userr=> userr.email == user?.email)
      

    if(user){
        axiosPublic.patch(`/users/${email}` ,  {status: 'Online'} )
        .then(()=>{})
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        refetch();
      }, 500); // 500 milliseconds = half second
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, []);

    const handleStatus=()=>{
        
    }

    return (
        <div>
          <div>
          <div  className="grid py-5 grid-cols-2 border-2 items-center border-black">
                <h1>{isUser.name}</h1>
                <h1>{isUser.status}</h1>
                <h1>Update status:</h1>
                <div className="flex gap-2">
                <input onChange={e=>setStatusUpdate(e.target.value)} type="text" name="status" placeholder="status" className="border-2 border-gray-500 p-1 w-[100px] overflow-scroll" />
                <button onClick={handleStatus} className="border-2 border-black">Update</button>
                </div>
              </div>
            {/* {isUser.map(user=>
              
              )} */}
          </div>
            <div className="bg-gray-50 rounded-lg">
              <h1 className="text-2xl">Other Users</h1>
                {notUser.map(user=>
                    <div key={user._id} className="grid grid-cols-2">
                        <h1>{user.name}</h1>
                        <h1>{user.status}</h1>
                    </div>
                    )}
            </div>
        </div>
    );
};

export default Users;