import React from 'react';
import BodyWeather from './components/body-wather';
import './App.css';
import bgImg from './imgs/pexels-pixabay-76969.jpg';
function App() {
  return (
    <div className="App" style={{backgroundImage: `url(${bgImg})`}}>
      <BodyWeather/>
    </div>
  );
}

export default App;
