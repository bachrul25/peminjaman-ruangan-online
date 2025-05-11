import React from 'react';
import './index.css';
import '../../assets/css/global.css'
import NavBar from '../../components/NavBar';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import About from '../../components/About';
import Top from '../../components/Top';

function Home() {
  return (
    <div className="home">
        <NavBar />

        <Hero />

        <Features />

        <About />

        <Top />
        <h1 className='hind-madurai-light'>Hallo</h1>
    </div>
  );
}

export default Home;