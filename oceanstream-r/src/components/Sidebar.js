import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import '../styles.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`sidebar ${isOpen ? '' : 'close'}`}>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="logo.png" alt="" />
          </span>
          <div className="text logo-text">
            <span className="name">OceanStream</span>
          </div>
        </div>
        <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <li className="search-box">
            <i className='bx bx-search icon'></i>
            <input type="text" placeholder="Search..." />
          </li>
          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-home-alt icon'></i>
                <span className="text nav-text">Página inicial</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-bar-chart-alt-2 icon'></i>
                <span className="text nav-text">Gráficos</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-bell icon'></i>
                <span className="text nav-text">Alertas</span>
              </a>
            </li>
            <li className="nav-link submenu">
              <a href="#">
                <i className='bx bx-wrench icon'></i>
                <span className="text nav-text">Equipamentos</span>
              </a>
              <ul className="submenu-links">
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Boia 04</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Boia 08</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Boia 10</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Ondógrado-PII</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Ondógrado-TGL</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Ondógrado-TPD</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Ondógrado-TPM</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Marégrafo</span>
                  </a>
                </li>
                <li className="nav-link">
                  <a href="#">
                    <span className="text2 nav-text">Estação</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-download icon'></i>
                <span className="text nav-text">Download</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="registro_ocorrencias.html">
                <i className='bx bx-clipboard icon'></i>
                <span className="text nav-text">Ocorrências</span>
              </a>
            </li>
            <li className="nav-link">
              <a href="#">
                <i className='bx bx-cog icon'></i>
                <span className="text nav-text">Configuração</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li>
            <a href="#">
              <i className='bx bx-log-out icon'></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
          <li className="mode">
            <div className="sun-moon">
              <i className='bx bx-moon icon moon'></i>
              <i className='bx bx-sun icon sun'></i>
            </div>
            <span className="mode-text text">Dark mode</span>
            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
