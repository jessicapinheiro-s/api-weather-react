import { useState, useEffect } from "react";
import React from "react";
import { credentials } from "../weather-api-credentials";
import { Card, ContainerCardHours, CardHoursContainer, ContainerLocalInfo } from './body-weather-style'
import { WiThermometer, WiRaindrop, WiStrongWind } from "react-icons/wi";
import { NewLineKind } from "typescript";

interface propsCity {
    cod: string;
    message: number;
    cnt: number;
    list: List[];
    city: City;
}
interface City {
    id: number;
    name: string;
    coord: Coord;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
}
interface Coord {
    lat: number;
    lon: number;
}
interface List {
    dt: number;
    main: Main;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
    rain?: Rain;
}
interface Rain {
    '3h': number;
}
interface Sys {
    pod: string;
}
interface Wind {
    speed: number;
    deg: number;
    gust: number;
}
interface Clouds {
    all: number;
}
interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}
interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}
function formatarData(data: Date) {
    const horas: string = data.getHours() <= 9 ? `   0${data.getHours()}` : ` ${data.getHours()}`;
    const minutos: string = data.getMinutes() <= 9 ? `0${data.getMinutes()}` : data.getMinutes().toString();
    return horas.concat(':' + minutos);
}

export default function CardHours() {
    const [inforWeatherHours, setinforWeatherHours] = useState<propsCity | null>(null);
    const linkRequestInfoDays = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={SuaChaveAPI}&units=metric&cnt={cnt}';
    const numeroHours: number = 10;
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

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
        fetch(linkRequestInfoDays.replace('{SuaChaveAPI}', credentials.weather.key).replace('{lat}', latitude.toString()).replace('{lon}', longitude.toString()).replace('{cnt}', numeroHours.toString()))
            .then(response => response.json())
            .then(data => setinforWeatherHours(data))
            .catch(error => console.error('Erro ao buscar informações do clima:', error));
    }, [latitude, longitude]);

    console.log(inforWeatherHours);
    if (inforWeatherHours != null) {
        return (
            <ContainerCardHours>
                {
                    (inforWeatherHours.list).map((f) => (
                        <CardHoursContainer key={f.dt}>
                            <p>{formatarData(new Date(f?.dt_txt))}</p>
                            <p>{Math.ceil(f?.main.temp).toString().concat('°C')}</p>
                        </CardHoursContainer>
                    )
                    )
                }
            </ContainerCardHours>
        )
    } else {
        return (
            <Card>
                <h1>Error</h1>
                <p>Não foi possivel obter informações da sua localização atual</p>
            </Card>
        )
    }


}
