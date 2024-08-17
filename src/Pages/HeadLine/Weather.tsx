import { useEffect, useState, Fragment } from "react"
import axios from 'axios'
import sunny from '../../../public/weather/01d.svg'
import moon from '../../../public/weather/01n.svg'
import sunClouds from '../../../public/weather/02d.svg'
import moonClouds from '../../../public/weather/02n.svg'
import cluods1 from '../../../public/weather/03d.svg'
import clouds2 from '../../../public/weather/04d.svg'
import rain from '../../../public/weather/09d.svg'
import sunRain from '../../../public/weather/10d.svg'
import moonRain from '../../../public/weather/10n.svg'
import thunderStorm from '../../../public/weather/11d.svg'

function Weather() {

    const [weather, setWeather] = useState<Array<any>>([])
    const [temp, setTemp] = useState<Array<any>>([])

    const weaherIcons:any={
        '01d':sunny,
        '01n':moon,
        '02d':sunClouds,
        '02n':moonClouds,
        '03d':cluods1,
        '03n':cluods1,
        '04d':clouds2,
        '04n':clouds2,
        '09d':rain,
        '09n':rain,
        '10d':sunRain,
        '10n':moonRain,
        '11d':thunderStorm,
        '11n':thunderStorm,
    }

    useEffect(()=>{

        const getWeather=(lat:number,lon:number)=>{
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=7986c02714e4efe92ca1c09ef5031f3f`)
            .then(data=>{
                setWeather([{...data.data.city},...data.data.list]);

                const aa:any={}
                data.data.list.map((w:any)=>{
                    aa[new Date(w.dt*1000).getDate()]?
                    aa[new Date(w.dt*1000).getDate()].push(w.main.temp_min,w.main.temp_max):
                    aa[new Date(w.dt*1000).getDate()]=[w.main.temp_min,w.main.temp_max]
                })
                setTemp({...aa})
            })
        }

        const success=(pos:any)=>{
            getWeather(pos.coords.latitude, pos.coords.longitude)
        }
        const fail=(error:any)=>{
            console.log('error in weather.tsx',error.code);
            getWeather(49.2503, -123.0569)
        }
        
        navigator.geolocation.getCurrentPosition(success, fail);

    },[])
    
    return (
        <section className="weatherSection">
            <h2>Weather in {weather.map((w:any,key:number)=>{return key==0 && (<Fragment key={key}>{w.name}</Fragment>)})}</h2>
            <ul>

                {weather.map((w:any,key:number)=>{
                    return ((key==1 && new Date(w.dt*1000).getHours()>15) || (new Date(w.dt*1000).getHours()>=12 && new Date(w.dt*1000).getHours()<=15)) && (
                    <li style={{background:new Date(w.dt*1000).getHours()>=20?'linear-gradient(#000077,#00002d)':'linear-gradient(#29b3dd,#c8f2ff)'}} key={key}>
                        <h3>
                            {new Date().getDate()==new Date(w.dt*1000).getDate()?
                                <span>{new Date(w.dt*1000).getHours()>=20?'Tonight':'Today'}</span>
                                :
                                <>
                                    <span>{new Date(w.dt*1000).toLocaleString('default', { month: 'short' })}&nbsp;</span>
                                    <span>{new Date(w.dt*1000).getDate()}</span>
                                </>
                            }
                        </h3>
                        <img src={weaherIcons[w.weather[0].icon]}/>

                        <div className='desc' style={{color:new Date(w.dt*1000).getHours()>=20?'#ffffff':'#000000'}}>{w.weather[0].description}</div>
                        <div className="temp">

                            <div className='maxTemp'>
                                {Math.max(...temp[new Date(w.dt*1000).getDate()])}&#8451;
                            </div>
                            <div className='minTemp'>
                                {Math.min(...temp[new Date(w.dt*1000).getDate()])}&#8451;
                            </div>

                        </div>
                        
                    </li>
                )})}

            </ul>
        </section>
    )
}

export default Weather