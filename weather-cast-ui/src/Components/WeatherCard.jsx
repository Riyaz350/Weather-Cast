import { useEffect, useState } from "react";
import { IoWaterOutline } from "react-icons/io5";
import { MdOutlineAir } from "react-icons/md";

const WeatherCard = (weather)=>{
    const [date, setDate] = useState('')
    const [cloudy, setCloudy] = useState('')
    const [dayOfWeek, setDayOfWeek] = useState('')
    const [hourlyData, setHourlyData] = useState('')
    const lat = weather.lat
    const lon = weather.lon
    const hourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ab2cfeb324b2ee6f0e127aa3c3d1168d`

    console.log(weather.weather)
    useEffect(()=>{
        if(weather.weather && weather.lat && weather.lon){

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
            .then(res=> setHourlyData(res))

        }
    },[weather.weather, hourly, weather.lon, weather.lat])
    
        
            return(
                <div className="max-w-5xl mx-auto shadow-lg rounded-lg ">
                    {weather.weather ? 
                        <div className="lg:grid grid-cols-4 ">
                            <div className="col-span-3 bg-white rounded-lg p-5">
                                <div className="lg:grid  grid-cols-4">
                                    <div className="col-span-1 text-center text-2xl">
                                        <h1>{weather.weather.name}</h1>
                                    </div>
                                    <div className="col-span-3  flex flow-row md:block">
                                        <div className="space-y-10">
                                            <div className="text-lg font-medium text-center">{dayOfWeek}   {date}</div>
                                            <div className={`${window.innerWidth == 1024 ? 'lg:text-[150px]': 'lg:text-[200px]'} flex text-2xl md:text-5xl   font-light text-gray-500  items-center justify-center gap-10`}>
                                                <h1>{Math.floor(weather.weather.main.temp - 273.15)}<span>°</span>C</h1>
                                                <div>
                                                <h1 className="text-2xl flex items-center gap-3"><IoWaterOutline />{weather.weather.main.humidity}</h1>
                                                <h1 className="text-2xl flex items-center gap-3"><MdOutlineAir />{weather.weather.wind.speed}mps</h1>
                                                </div>
                                            </div>
                                            <div className="text-xl text-gray-500 text-center">{cloudy}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-1">
                                <h1>hello</h1>
                            </div>
                        </div>  :
                    <div className="">
                        <h1 className="text-5xl text-center">Please search your city</h1>
                    </div>  
                }
                </div>
            )
        
        
        
        
    
}

export default WeatherCard