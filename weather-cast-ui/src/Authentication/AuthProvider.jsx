import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth, { db } from "../../firebase.config"
import { addDoc, collection, onSnapshot, snapshotEqual } from "firebase/firestore";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] =useState(true)
    const [user, setUser] =useState(null)
    const [usersCol, setUsersCol] = useState([])

    

    const createUser = ( email, password) =>{
        setLoading(true)
        
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInPop = (provider) =>{
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            const userEmail = currentUser?.email || user?.email 
            const loggedUser = {email: userEmail}
            
            setUser(currentUser)
            setLoading(false)
            // if(currentUser){

            //     const userEmail = {email: currentUser.email}
            //     // create token
            //     axiosPublic.post('/jwt', userEmail )
            //     .then(res =>{
            //         if(res.data.token){
            //             localStorage.setItem('access-token', res.data.token)
            //             setLoading(false);

            //         }
            //     })
            // }
            // else{

            //     localStorage.removeItem('access-token')
            //     setLoading(false);
            // }
        })
        return()=>{
          unSubscribe()  
        }
    },[user?.email, axiosPublic])

    const authInfo = { user,loading, createUser, signInUser,signInPop, logOut }

return(
<AuthContext.Provider value={authInfo}>
    {children}
</AuthContext.Provider>
)
}

export default AuthProvider;