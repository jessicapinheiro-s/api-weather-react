import { useState, useEffect } from "react";
import React from "react";
import { credentials } from "../weather-api-credentials";

interface propsCity {
    coord: Coord;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}
interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}
interface Clouds {
    all: number;
}
interface Wind {
    speed: number;
    deg: number;
}
interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}
interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface Coord {
    lon: number;
    lat: number;
}

export default function BodyWeather() {
    const [inforWeather, setInfoWeather] = useState<propsCity | null>(null);
    const linkRequestuInfo = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={SuaChaveAPI}';
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const dataAtual: Date = new Date();
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            console.log("Geolocalização não é suportada por este navegador.");
        }
    }, []);

    useEffect(() => {
        fetch(linkRequestuInfo.replace('{SuaChaveAPI}', credentials.weather.key).replace('{lat}', latitude.toString()).replace('{lon}', longitude.toString()))
            .then(response => response.json())
            .then(data => setInfoWeather(data))
            .catch(error => console.error('Erro ao buscar informações do clima:', error));
    }, [latitude, longitude]);


    console.log(inforWeather);
    return (
        <div>
            <h1>{inforWeather?.name}</h1>
            <p>{dataAtual.toLocaleDateString()} {dataAtual.getHours()}:{ dataAtual.getMinutes()}</p>
            <p>Temperatura maxima: {inforWeather?.main.temp_max}</p>
            <p>Temperatura minima: {inforWeather?.main.temp_min}</p>
            <p>Temperatura Atual: {inforWeather?.main.temp}</p>
            <p>Humidade: {inforWeather?.main.humidity}</p>
            <p>Sensação Térmica: {inforWeather?.main.feels_like}</p>
        </div>
    );
}
