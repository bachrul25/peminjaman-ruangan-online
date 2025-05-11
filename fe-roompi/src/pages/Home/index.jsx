import React from 'react';
import './index.css';
import '../../assets/css/global.css'
import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';

function Home() {
  return (
    <div className="home">
        <NavBar />

        <Hero />
        <h1 className='hind-madurai-light'>Hallo</h1>
    </div>
  );
}

export default Home;