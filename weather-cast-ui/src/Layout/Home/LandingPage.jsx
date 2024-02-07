import { useState } from "react";
import WeatherCard from "../../Components/WeatherCard";

const LandingPage = () => {
    
    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)
    const [lat, setLat] = useState('')
    const [lon, setLon] = useState('')

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ab2cfeb324b2ee6f0e127aa3c3d1168d`
    const geo = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=ab2cfeb324b2ee6f0e127aa3c3d1168d`

    const handleSearch = () =>{
        fetch(`${api}`)
        .then(res=>res.json())
        .then(res=> {
        setWeather(res)
        })
        fetch(`${geo}`)
        .then(res=>res.json())
        .then(res=> {
            setLat(res[0].lat)
            setLon(res[0].lon)})
        }
    return (
        <div className="">
            <div className="max-w-7xl mx-auto flex justify-center items-center my-10">
                <input onChange={e=>setCity(e.target.value)} className="w-1/2 border-2 border-black h-[50px] rounded-lg p-2" type="text" placeholder="Search your city" />
                <button onClick={handleSearch} className="btn bg-[#F84E45] text-white hover:shadow-lg hover:shadow-[#F84E4540] hover:bg-[#F84E45]" >Search</button>
            </div>
            <div className="bg-gray-200 p-20 ">
                <WeatherCard lat={lat} lon={lon} weather={weather}></WeatherCard>
            </div>
        </div>
    );
};

export default LandingPage;