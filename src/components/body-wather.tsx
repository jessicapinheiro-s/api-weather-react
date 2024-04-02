import { useState, useEffect } from "react"
import React from "react";
import { credentials } from "../weather-api-credentials";

interface propsCity {
    address: {
        city: string;
    }
}
export default function BodyWeather() {
    const [inforWeather, setInfoWeather] = useState();
    const linkRequestuInfo = 'https://api.openweathermap.org/data/2.5/weather?q={SuaCidade}&appid={SuaChaveAPI}';
    const [latilude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [cidade, setCidade] = useState<propsCity | null>(null);


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });

        } else {
            console.log("Geolocalização não é suportada por este navegador.");
            //alert('Desculpe, não conseguimos fornecer as informações corretas de acordo com a sua localização')
        }

    }, []);
    fetch((credentials.getCidade.url).replace('{SuaLongitude}', longitude.toString()).replace('{SuaLatitude}', latilude.toString()))
        .then(response => response.json())
        .then(data => setCidade(data))
        .catch(error => console.error('Erro na requisição:', error));
    console.log(cidade);

    if (cidade) {
        fetch(linkRequestuInfo.replace('{SuaChaveAPI}', credentials.weather.key).replace('{SuaCidade}', cidade.address.city))
            .then(response => response.json())
            .then(data => setInfoWeather(data));

    }

    return (
        <div>
        </div>
    )
}