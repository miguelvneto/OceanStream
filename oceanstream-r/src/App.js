import React from 'react';
import Sidebar from './components/Sidebar';
// import Map from './components/Map';
import './styles.css';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <section className="home">
        <div className="text">Porto de Tubarão</div>
        <div className="form-container">
          {/* <Map /> */}
        </div>
      </section>
    </div>
  );
};

export default App;
