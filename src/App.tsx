import React from 'react';
import BodyWeather from './components/body-wather';
import './App.css';
import bgImg from './imgs/pexels-malcoln-oliveira-18690808.jpg';
import CardHours from './components/card-hours';
function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${bgImg})`}}>
      <BodyWeather/>
      <CardHours/>
    </div>
  );
}

export default App;
