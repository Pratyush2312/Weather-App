import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
const WeatherCard = ({ weather }) => {
  const sunrise = new Date(weather.sys.sunrise * 1000)
  const sunriseTime = sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const sunset = new Date(weather.sys.sunset * 1000)
  const sunsetTime = sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mt-6 h-[50vh] text-center text-white shadow-[0_0_15px_rgba(0,150,184,0.2)] w-full max-w-md mx-auto px-4">
      <div className='flex flex-col gap-1'>
        <h2 className='text-white text-2xl mt-[55px] sm-text-4xl md:text-6xl font-semibold'>{weather.main.temp}°C</h2>
        <div className="flex gap-2 justify-center mt-1">
          <FaLocationDot className='mt-1 ' />
          <p className='text-white text-sm sm:text-base '>{weather.name}</p>
        </div>
        <div className='flex justify-center text-sm gap-4 sm:text-base'>
          <div className="flex gap-1">
            <FiSunrise className='mt-1 text-yellow-500' />
            <span>Sunrise: {sunriseTime} </span>
          </div>
          <div className="flex gap-1">
            <FiSunset className='mt-1 text-gray-500' />
            <span>Sunset: {sunsetTime} </span>
          </div>
        </div>
        <div className='flex justify-center mr-5 text-lg'>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            className="w-6 h-6"
          />
          <span className="capitalize text-gray-400 text-sm">
            {weather.weather[0].description}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 text-center py-4 text-sm sm:text-base gap-y-2 border-t border-white/10 rounded-2xl mt-[65px] sm:mt-12">
        <div className='flex flex-col'>
          <span>Max</span>
          <span>{weather.main.temp_max}</span>
        </div>
        <div className='flex flex-col'>
          <span>Min</span>
          <span>{weather.main.temp_min}</span>
        </div>
        <div className='flex flex-col'>
          <span className="flex items-center justify-center gap-1 text-gray-300">
            <WiHumidity className='mt-1' />Humidity
          </span>
          <span>{weather.main.humidity}</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
