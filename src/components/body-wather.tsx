import { useState, useEffect } from "react";
import React from "react";
import { credentials } from "../weather-api-credentials";
import { Card, ContainerMaxMin, ContainerTempAtual, ContainerLocalInfo, ContainerLocalName, ContainerInfoWeather, About } from './body-weather-style'
import { WiThermometer, WiRaindrop, WiStrongWind } from "react-icons/wi";



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
function formatarData(data: Date){
    const horas: string = data.getHours() <= 9 ? `   0${data.getHours()}` : ` ${data.getHours()}`;
    const minutos: string = data.getMinutes() <= 9 ? `0${data.getMinutes()}` : data.getMinutes().toString();
    return (data.toLocaleDateString()).concat(horas + ':' + minutos);
}


export default function BodyWeather() {
    const [inforWeather, setInfoWeather] = useState<propsCity | null>(null);
    const [inforWeatherHours, setInforWeatherHours] = useState<propsCity | null>(null);
    const linkRequestuInfo = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={SuaChaveAPI}&units=metric';
    const linkRequestInfoDays = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={SuaChaveAPI}&units=metric&cnt={cnt}';
    const numeroHours: number = 10;
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
    
    useEffect(() => {
        fetch(linkRequestInfoDays.replace('{SuaChaveAPI}', credentials.weather.key).replace('{lat}', latitude.toString()).replace('{lon}', longitude.toString()).replace('{cnt}', numeroHours.toString()))
            .then(response => response.json())
            .then(data => setInforWeatherHours(data))
            .catch(error => console.error('Erro ao buscar informações do clima:', error));
    }, [latitude, longitude]);

    let infoTemp = inforWeather?.main?.temp != null ? Math.ceil(inforWeather?.main?.temp) : null;

    console.log(inforWeather);
    console.log(inforWeatherHours);

    if(inforWeather  != null){
        return (
            <Card>
                <ContainerLocalName>
                    <h1>{inforWeather?.name}</h1>
                    <ContainerTempAtual>
                        <p>{infoTemp?.toString().concat('°C')}</p>
                    </ContainerTempAtual>
    
                </ContainerLocalName>
                <ContainerLocalInfo>
                    <p>{(inforWeather?.weather)?.map(local => local.main)}</p>
                    <p>{formatarData(dataAtual)}</p>
                </ContainerLocalInfo>
    
    
                <ContainerMaxMin>
                    <ContainerInfoWeather>
                        <p>Maxima</p>
                        <p> {Math.ceil(inforWeather?.main?.temp_max).toString().concat('°C')}</p>
                    </ContainerInfoWeather>
                    <ContainerInfoWeather>
                        <p>Minima</p>
                        <p>{Math.ceil(inforWeather?.main?.temp_min).toString().concat('°C')}</p>
                    </ContainerInfoWeather>
                </ContainerMaxMin>
    
                <ContainerLocalInfo>
                    <ContainerInfoWeather>
                        <p> Humidade do ar</p>
                        <About>
                            <WiRaindrop className="icon" />
                            <p> {inforWeather?.main.humidity}</p>
                        </About>
    
                    </ContainerInfoWeather>
                    <ContainerInfoWeather>
                        <p> Sensação Térmica</p>
                        <About>
                            <p>
                                <WiThermometer className="icon" />
                            </p>
                            <p> {Math.ceil(inforWeather?.main?.feels_like).toString().concat('°C')}</p>
                        </About>
                    </ContainerInfoWeather>
                    <ContainerInfoWeather>
                        <p> Vento</p>
                        <About>
                            <p>
                                <WiStrongWind className="icon" />
                            </p>
                            <p>  {(inforWeather?.wind?.speed * 3, 6).toString().concat('km/h')}</p>
                        </About>
                    </ContainerInfoWeather>
                </ContainerLocalInfo>
            </Card>
        );
    }else{
        return(
            <Card>
            <h1>Error</h1>
            <p>Não foi possivel obter informações da sua localização atual</p>
        </Card>
        )
    }
    
}
