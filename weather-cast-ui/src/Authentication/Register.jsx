import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { Link,  useNavigate } from "react-router-dom";
import {  updateProfile } from "firebase/auth";
import { AuthContext } from "./Authprovider";
import auth from "../../firebase.config";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Register = () => {
    // const axiosPublic = useAxiosPublic()
    const [name, setName] =useState("")
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

const {createUser, logOut} =useContext(AuthContext)

const handleEmailRegister = e=>{
    e.preventDefault()
    if(password.length<6){
        Swal.fire({position: "top-end", icon: "error", title: "Password must be at lease 6 characters", showConfirmButton: false, timer: 1500});
        
    }else if(!/[A-Z]/.test(password)){
        Swal.fire({position: "top-end", icon: "error", title: "Password must have a capital letter", showConfirmButton: false, timer: 1500});

        
    }
    else if(!/[^a-zA-Z0-9]/.test(password)){
        Swal.fire({position: "top-end", icon: "error", title: "Password must have a special character", showConfirmButton: false, timer: 1500});

        
    }else{
        createUser( email, password)
    .then(()=>{
        e.target.reset()
        Swal.fire({position: "top-end", icon: "success", title: "Please Sign In again", showConfirmButton: false, timer: 1500});

        // const userInfo = {email:email, name:name, photo:photo,  role:'user', owned: '', acceptedAgreement:''}
        // axiosPublic.post('/users', userInfo )
        // .then()
        
        logOut()
        .then(result=>console.log(result))
        .catch(error => console.log(error.message))
        
        updateProfile(auth.currentUser, { displayName: name }).catch(
            (err) => console.log(err))
            navigate('/login')
        
    })
    .catch(e =>{
        if(e.message == 'Firebase: Error (auth/email-already-in-use).'){
            Swal.fire({position: "top-end", icon: "error", title: "This Email is already in use", showConfirmButton: false, timer: 1500});
        } 
    })
     
    }
}
    return (
        <div >

        <div  className="py-20 lg:p-20">
            <div className={"text-black light-home max-w-xl rounded-3xl mx-auto my-20 py-10 px-5 lg:p-20 border-2 border-black"}>
                <div className="text-center ">
                <h1 className="text-3xl mb-10 lg:text-5xl font-bold ">Sign Up </h1>
                </div>
                <div className="bg-white p-10 rounded-xl">
                <form onSubmit={handleEmailRegister} className="bg-white">

                    <div className="form-control">
                    <label className="label">
                        <span className="label-text text-[#0d3454]">Full Name</span>
                    </label>
                    <input onChange={e=>setName(e.target.value)} type="text"  placeholder="Full Name" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                    </div>


                    <div className="form-control">
                    <label className="label">
                        <span className=" label-text text-black">Email</span>
                    </label>
                    <input onChange={e=> setEmail(e.target.value)} type="email"  placeholder="email" className="input input-bordered border-[#0d3454] text-[#0d3454]" required />
                    </div>


                    <div className="form-control">
                    <label className="label">
                        <span className="text-black">Password</span>
                    </label>
                    <input onChange={e=> setPassword(e.target.value)} type="password" placeholder="password" className="input input-bordered border-[#0d3454]" required />
                    <div>
                    </div>

                    <label className="label">
                        <a href="#" className= "text-black label-text-alt text-base link link-hover">Forgot password?</a>
                    </label>
                    </div>


                    <div className="form-control mt-4">
                    <button className="btn  bg-white text-black font-bold border-black hover:shadow-white hover:bg-[#000000] hover:text-white   ">Register</button>
                    </div>

                        

                        <div className="space-y-5 mt-5">
                        <p className="text-center ">Already have an account?? <Link to="/logIn" className="text-blue-500 hover:underline">Log In</Link></p>
                        </div>
                </form>
               
                </div>
            </div>
            </div>
        </div>
    );
};

export default Register;