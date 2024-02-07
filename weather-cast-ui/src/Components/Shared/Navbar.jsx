
import { motion } from "framer-motion"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../Authentication/Authprovider"

function Navbar() {

  const {user, logOut} = useContext(AuthContext)
  
  const popUp = {
    initial:{borderColor: "#F84E4500"},
    animate:{borderColor:'#F84E45'},
  }

  const rotate = {
    initial:{ rotateX: 90 },
    animate:{ rotateX: 0 },
  }

  const dropDown = {
    initial:{y:-1000},
    animate:{y:0}
  }
  const navClass = "text-xl  border-b-2 font-medium pr-2 p-2 transition-all duration-300  hover:bg-[#F84E45] hover:text-white rounded-t-lg "
  
  const navlinks = (
  <motion.div initial={{borderColor: "transparent"}} animate={{}} transition={{ delay:1.6}} className="flex flex-col lg:flex-row gap-5 border-2  px-2 border-[#F84E45]">
    <motion.div variants={popUp} initial='initial' whileInView='animate' transition={{ delay:1.8}}  className={navClass}><motion.div variants={dropDown} initial='initial' animate='animate'  transition={{duration:.5, delay:1}}><Link  href='/'>Home</Link></motion.div></motion.div>
  </motion.div>)

    const handleLogOut = () =>{
      logOut()
    }

  return (
    <motion.div variants={rotate} initial='initial' animate='animate' transition={{duration:1}} className="navbar shadow-lg">
  <div className="navbar-start ">
    <div className="dropdown ">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul tabIndex={0}  className="overflow-hidden menu menu-sm dropdown-content mt-3 z-50 p-2  bg-base-100 rounded-box w-40">
       {navlinks}
      </ul>
    </div>
    <img className="w-1/2 lg:w-1/4" alt="info-rover-logo" src="https://i.ibb.co/dDVPj7D/weather-cast-high-resolution-logo-transparent-2.png"/>
  </div>
  <div className="navbar-center hidden lg:flex ">
    <ul className="menu p-0 menu-horizontal px-1 ">
      {navlinks}
    </ul>
  </div>
  <div className="navbar-end">
    {!user?
    <Link  to='/logIn' ><motion.span initial={{backgroundColor: '#F84E4500'}} animate={{backgroundColor:'#F84E45'}} transition={{delay:2.8}} className="btn bg-[#F84E45] text-white hover:shadow-2xl hover:shadow-[#F84E45] hover:bg-[#F84E45]">Log In</motion.span></Link>:
      <div className="flex items-center">
        <div>Hi {user.displayName}</div>
      <button onClick={handleLogOut} className="btn bg-[#F84E45] text-white hover:shadow-2xl hover:shadow-[#F84E45] hover:bg-[#F84E45]">LogOut</button>
      </div>
}
  </div>
</motion.div>
  );
}
export default Navbar;