import React from 'react';
import './BarraLateral.css'; // Inclua o CSS específico da barra lateral aqui

import { AiOutlineHome, AiOutlineTool } from "react-icons/ai";
import { FaRegChartBar  } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
// import { GiValve } from "react-icons/gi";
import { RxDownload } from "react-icons/rx";
import { VscSettingsGear } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { LuMoon } from "react-icons/lu";
import { MdSunny } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { RiArrowRightSLine } from "react-icons/ri";


class BarraLateral extends React.Component {
  componentDidMount() {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('nav');
    const toggle = document.querySelector(".toggle");
    // const searchBtn = document.querySelector(".search-box");
    const modeSwitch = document.querySelector(".toggle-switch");
    const modeText = document.querySelector(".mode-text");

    var sidebarAberta = false;
    var modoEscuro = false;

    toggle.addEventListener("click", () => {
      if (sidebarAberta){
        sidebar.classList.add("close")
      } else {
        sidebar.classList.remove("close");
      }
      sidebarAberta = !sidebarAberta
    });

    // searchBtn.addEventListener("click", () => {
    //   if (!sidebarAberta) {
    //     sidebarAberta = !sidebarAberta
    //   }
    //   sidebar.classList.remove("close");
    // });

    modeSwitch.addEventListener("click", () => {
      if (modoEscuro){
        body.classList.remove("dark");
      } else {
        body.classList.add("dark");
      }

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
      modoEscuro = !modoEscuro;
    });
  }

  render() {
    return (
      <nav className="sidebar close">
        <header>
          <div className="image-text">
            <span className="image">
              <img src="logo.png" alt="Logo" />
            </span>
            <div className="text logo-text">
              <span className="name">OceanStream</span>
            </div>
          </div>
          <i className='toggle'>
            <RiArrowRightSLine />
          </i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            {/* <li className="search-box">
              <i className='icone'>
                <IoSearch />
              </i>
              <input type="text" placeholder="Pesquisar..." />
            </li> */}

            <ul className="menu-links">
              <li className="nav-link">
                <a href={"/overview"}>
                  <i className='icone'>
                    <AiOutlineHome />
                  </i>
                  <span className="text nav-text">Página inicial</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='icone'>
                    <FaRegChartBar />
                  </i>
                  <span className="text nav-text">Gráficos</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className='icone'>
                    <FiBell />
                  </i>
                  <span className="text nav-text">Alertas</span>
                </a>
              </li>
              <li className="nav-link submenu">
                <a href="#">
                  <i className='icone'>
                    <AiOutlineTool />
                    {/* <GiValve /> */}
                  </i>
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
                    <a href="/Equipamento">
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
                <a href="/download">
                  <i className='icone'>
                    <RxDownload />
                  </i>
                  <span className="text nav-text">Download</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="/hometest">
                  <i className='icone'>
                    <VscSettingsGear />
                  </i>
                  <span className="text nav-text">Configuração</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="/login">
                <i className='icone'>
                  <ImExit />
                </i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className='icone moon'>
                  <LuMoon />
                </i>
                <i className='icone sun'>
                  <MdSunny />
                </i>
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
  }
}

export default BarraLateral;