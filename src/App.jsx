import { useState } from 'react'
import './App.css'
import { data } from 'autoprefixer'
import WeatherCard from './components/WeatherCard'
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { AiOutlineLoading } from "react-icons/ai";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL=import.meta.env.VITE_WEATHER_API_URL
function App() {
  const [city, setcity] = useState("")
  const [weather, setweather] = useState(null)
  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)
  const fetchWeather = async () => {
    setloading(true)
    try {
      const res = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`)
      const data = await res.json()
      if (data.cod === "404") {
        setloading(false)
        setweather(null);
        seterror("❌No results found!");
        return;
      }
      seterror("")
      setweather(data)

    }
    catch (err) {
      seterror("Something went wrong")
      setweather(null);
    }
    setTimeout(() => {
      setloading(false);
    }, 700);
  }
  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-2 mt-10">
          <div className='relative'>
            <input className="px-4 py-2 w-full rounded-2xl 
             bg-white/5 backdrop-blur-md 
             border border-white/20 
             text-white placeholder-gray-400 
             shadow-[inset_0_0_10px_rgba(255,255,255,0.05),0_0_15px_rgba(255,255,255,0.05)] 
             focus:outline-none focus:ring-2 focus:ring-[#0096B8]/60 sm:w-[60vw]  md:w-[40vw] lg:w-[25vw]
             "type="text" value={city} placeholder="Enter city name" onChange={(e) => { setcity(e.target.value) }} onKeyDown={(e) => { if (e.key === 'Enter') { fetchWeather() } }} />
            <button className={`absolute right-3 top-1/2 -translate-y-1/2 transition 
  ${city ? "text-white/60 hover:text-white" : "opacity-0 pointer-events-none"}
`} onClick={() => { setcity("") }}><IoClose /></button>
          </div>

          <button disabled={city.length === 0} className="disabled:bg-slate-600 px-3 py-2 rounded-2xl 
            bg-slate-700 
             text-white
             shadow-[0_0_15px_rgba(0,150,184,0.2)] 
             hover:bg-slate-800
             transition-all duration-150" onClick={fetchWeather}><CiSearch /></button>
        </div>
        <div className='w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto px-4'>
          {loading ? (
            <div className="flex justify-center mt-8 gap-3">
               <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
               <div className='text-white text-xl mt-2'>Fetching Weather...</div>
            </div>
          ) : weather ? (
            <div className="flex justify-center">
              <WeatherCard weather={weather} />
            </div>
          ) : (
            error && (
              <p className="flex justify-center text-red-400 text-sm mt-10">
                {error}
              </p>
            )
          )}


        </div>

      </div>
    </>
  )
}

export default App
