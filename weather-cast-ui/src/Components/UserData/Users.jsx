import { useContext, useEffect, useState } from "react";
import useUserInfo from "../../Hooks/useUserInfo";
import { AuthContext } from "../../Authentication/Authprovider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Users = () => {
    const axiosPublic = useAxiosPublic()
    const {user, logOut} = useContext(AuthContext)
    const [users,, refetch] = useUserInfo()
    const [statusUpdate, setStatusUpdate] = useState('')
    const email = user?.email

    const notUser = users.filter(userr=> userr.email !== user?.email)
    const isUser = users.find(userr=> userr.email == user?.email)
      

    const handleDelete=(mail)=>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosPublic.delete(`/users/${mail}`)
        .then(res=>{
            if(res.data.deletedCount>0){
                Swal.fire({position: "top-end", icon: "success", title: "User Deleted", showConfirmButton: false, timer: 1500});
                refetch()
            }
        })
        }
      });
      
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        refetch();
      }, 500); // 500 milliseconds = half second
  
      // Clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, []);

    const handleStatus=()=>{
      axiosPublic.patch(`/users/${email}` ,  {status: statusUpdate} )
      .then(()=>{})
    }

    return (
        <div>
          <div>

          <div className="text-xl border-2 border-black">
          <h1 >Your Status</h1>

          <div  className="grid py-5 grid-cols-2  items-center ">
                <h1 className="text-xl">{isUser?.name}</h1>
                <h1 className={`${isUser?.status === 'Online' ? 'text-green-500' : isUser?.status === 'Offline' ? 'text-red-500' : 'text-cyan-500'}`}>{isUser?.status}</h1>
                <h1>Update status:</h1>
                <div className="flex gap-2">
                <input onChange={e=>setStatusUpdate(e.target.value)} type="text" name="status" placeholder="status" className="border-2 border-gray-500 p-1 w-[100px] overflow-scroll" />
                <button onClick={handleStatus} className="border-2 border-black">Update</button>
                </div>
              </div>
          </div>

          </div>
            <div className="bg-gray-50 rounded-lg">
              <h1 className="text-2xl bottom-2 border-black">Other Users</h1>
              <table className="table w-full">
                    <thead className="text-sm">
                        <tr>
                            <th>Name</th>
                            <th>Join Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    notUser.map(user =>
                    <tr key={user._id} className="border-2 border-black  rounded-lg ">
                      <th>{user?.name}</th>
                      <th>{user?.joinDate}</th>
                      <th className={`${user?.status === 'Online' ? 'text-green-500' : user?.status === 'Offline' ? 'text-red-500' : 'text-cyan-500'}`}>{user?.status}</th>
                      <th onClick={()=>handleDelete(user?.email)} className="btn bg-[#F84E45] text-white hover:shadow-lg hover:shadow-[#F84E4540] hover:bg-[#F84E45]">Delete</th>
                  </tr>)
                    }
                    </tbody>

                </table>
                {/* {notUser.map(user=>
                    <div key={user._id} className="grid grid-cols-3">
                        <h1>{user?.name}</h1>
                        <h1>{user?.joinDate}</h1>
                        <h1 className={`${user?.status == 'Online' ? 'text-green-500' : 'text-red-500'}`}>{user?.status}</h1>
                    </div>
                    )} */}
            </div>
        </div>
    );
};

export default Users;
