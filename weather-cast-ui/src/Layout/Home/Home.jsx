import { useState } from "react";
import Navbar from "../../Components/Shared/Navbar";

const Home = () => {

    const [city, setCity] = useState('')

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab2cfeb324b2ee6f0e127aa3c3d1168d`

    const handleSearch = () =>{
        fetch(`${api}`)
        .then(res=>res.json())
        .then(res=> console.log(res))
    }

    return (
        <div>
            <Navbar></Navbar>
            <div>
                <div className="max-w-7xl mx-auto flex justify-center items-center my-10">
                    <input onChange={e=>setCity(e.target.value)} className="w-1/2 border-2 border-black h-[50px] rounded-lg p-2" type="text" placeholder="Search your city" />
                    <button onClick={handleSearch} className="btn bg-[#F84E45] text-white hover:shadow-2xl hover:shadow-[#F84E45] hover:bg-[#F84E45]" >Search</button>
                </div>
                 
            </div>
        </div>
    );
};

export default Home;