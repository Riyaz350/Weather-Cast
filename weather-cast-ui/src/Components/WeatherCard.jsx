import { useContext, useEffect, useState } from "react";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineAir } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import CountUp from 'react-countup';
import { motion } from "framer-motion"
import Users from "./UserData/Users";
import { AuthContext } from "../Authentication/Authprovider";
import { Link } from "react-router-dom";

const WeatherCard = (weather)=>{
    
      
    const [date, setDate] = useState('')
    const [cloudy, setCloudy] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [hourlyData, setHourlyData] = useState('')
    const [hourlyTimes, setHourlyTimes] = useState('')
    const [hourlyTemp, setHourlyTemp] = useState([])
    const {user} = useContext(AuthContext)
    const lat = weather.lat
    const lon = weather.lon
    const hourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ab2cfeb324b2ee6f0e127aa3c3d1168d`

    useEffect(()=>{
        if(weather?.weather && weather?.lat && weather?.lon){

            const cloud = weather?.weather?.clouds.all
            if(cloud <= 10){
                setCloudy('Clear Sky')
            }else if(cloud <= 30 && weather.weather.clouds.all > 10){
                setCloudy('Mostly Clear Sky')
            }else if(cloud <= 50 && weather.weather.clouds.all > 30){
                setCloudy('Partly Cloudy Sky')
            }else if(cloud <= 70 && weather.weather.clouds.all > 50){
                setCloudy('Mostly Cloudy Sky')
            }else if(cloud <= 100 && weather.weather.clouds.all > 70){
                setCloudy('Cloudy Sky')
            }

            const timestamp = weather.weather.dt
            const date = new Date(timestamp * 1000);
            const dateObject = new Date(date);
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1; 
            const day = dateObject.getDate();
            const dayOfWeek = dateObject.getDay();
            const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
            setDate(formattedDate);
            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const dayName = dayNames[dayOfWeek];
            setDayOfWeek(dayName);

            

            fetch(`${hourly}`)
            .then(res=>res.json())
            .then(res=> {setHourlyData(res)
            
                const times = res?.list?.map(entry => {
                    const dateTime = new Date(entry.dt_txt);
                    const hours = dateTime.getHours().toString().padStart(2, '0');
                    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
                    return `${hours}:${minutes}`
                })
                setHourlyTimes(times)
                const temperatures = res?.list?.map(item => Math.floor(item.main.temp - 273.15))
                setHourlyTemp(temperatures)
                })
        }
    },[weather.weather, hourly, weather.lon, weather.lat, hourlyData?.list])
            
    if(user){

    
            return(
                <div className="max-w-7xl mx-auto shadow-lg rounded-lg ">
                        <div className={` `}>
                    {weather.weather ? 
                            <div className="col-span-3 bg-white rounded-lg p-5">
                                <div className="lg:grid  grid-cols-4">
                                    <div className="col-span-1 text-center text-2xl">
                                        <h1>{weather.weather.name}</h1>
                                    </div>
                                    <div className="col-span-3  flex flow-row md:block">
                                        <div className="space-y-10">
                                            <div className="text-lg font-medium text-center">{dayOfWeek}   {date}</div>
                                            <div className={`${window.innerWidth == 1024 ? 'lg:text-[150px]': 'lg:text-[200px]'} flex text-2xl md:text-5xl md:flex-row flex-col  font-light text-gray-500  items-center justify-center gap-10`}>
                                                <motion.h1 initial={{x:-50}} whileInView={{x:0}} transition={{duration:1.2}}><CountUp end={Math.floor(weather.weather.main.temp - 273.15)} duration={2.5} /><span>°</span>C</motion.h1>
                                                <div>
                                                <h1 className="text-2xl flex items-center gap-3"><IoWaterOutline />{weather.weather.main.humidity}</h1>
                                                <h1 className="text-2xl flex items-center gap-3"><MdOutlineAir />{weather.weather.wind.speed}mps</h1>
                                                <div className="text-xl text-gray-500 text-center">{cloudy}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-center text-3xl font-medium mt-10">Todays Forecast</h1>
                                <div className="grid grid-cols-2 lg:grid-cols-4 justify-between  gap-2 text-center">
                                    {hourlyTemp?.slice(0,8).map((temp,index)=>
                                            <motion.div initial={{y:40, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration:1}} key={index} className="rounded-lg  flex flex-col shadow-lg p-5">
                                                <h1 className="text-sm  md:text-3xl">{temp}<span>°</span>C</h1>
                                                <h1 className="flex items-center justify-center"><CiClock2 />{hourlyTimes[index]}</h1>
                                            </motion.div>
                                        )}
                                </div>
                            </div> :
                            <div className="col-span-3 text-3xl text-center bg-white rounded-lg p-5">
                                <h1>Please Search Your City/Country</h1>
                            </div>
                            } 
                            <div className="col-span-1 bg-gray-50">
                                <Users></Users>
                            </div>
                        </div>  
                    <div className="flex justify-between">
                    </div>  
                
                </div>
            )
            }else{
                return(
                    <div className="md:grid grid-cols-2 bg-white">
                        <div className="p-10 flex flex-col justify-center">
                        <h1 className="text-center text-xl md:text-3xl lg:text-5xl">Please Log In to see weather</h1>
                        <Link to='/logIn' className="w-fit mx-auto btn bg-[#F84E45] text-white hover:shadow-lg hover:shadow-[#F84E4540] hover:bg-[#F84E45]">Get Started</Link>
                        </div>

                        <div>
                            <img className="w-1/2 mx-auto" src="https://i.ibb.co/Lgj0Kww/3366845.jpg" alt="" />
                        </div>
                    </div>
                )
            }
        
        
        
        
    
}

export default WeatherCard