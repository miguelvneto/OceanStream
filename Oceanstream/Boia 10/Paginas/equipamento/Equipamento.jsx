// lógico
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importa o useHistory do React Router

// imports internos
import JWTexpirado from '../../Funcoes/JWTexpirado';
import GraficoLinha from '../../Funcoes/Graficos';
import useWindowDimensions from '../../Funcoes/UseWindowDimensions';
import './equipamento.css';
import Bussula from '../../Funcoes/Bussula';
import BarraLateral from '../../assets/BarraLateral/BarraLateral';

// valores de teste
const tss = [
  new Date("2023-12-04T20:00:00"),
  new Date("2023-12-05T00:00:00"),
  new Date("2023-12-06T00:00:00"),
  new Date("2023-12-07T00:00:00"),
  new Date("2023-12-08T00:00:00"),
  new Date("2023-12-09T00:00:00"),
  new Date("2023-12-10T00:00:00"),
];
const seriesData = [
  [4.3, 3.8, 3.6, 3.0, 3.7, 4.3, 4.4],
  [3.1, 2.8, 2.7, 2.7, 3.3, 4.0, 3.5],
];

function Equipamento() {
  const navigate = useNavigate();

  // Estado para acompanhar se a checkbox está marcada
  const [isChecked_velonda, setIsChecked_velonda] = useState(false);
  const [isChecked_velvento, setIsChecked_velvento] = useState(false);
  const [isChecked3, setIsChecked3] = useState(false);
  const [isChecked4, setIsChecked4] = useState(false);

  // Função para manipular a mudança da checkbox
  const handleCheckboxChange_1 = (event) => {
    setIsChecked_velonda(event.target.checked);
  };
  // Função para manipular a mudança da checkbox
  const handleCheckboxChange_2 = (event) => {
    setIsChecked_velvento(event.target.checked);
  };
  // Função para manipular a mudança da checkbox
  const handleCheckboxChange_3 = (event) => {
    setIsChecked3(event.target.checked);
  };
  // Função para manipular a mudança da checkbox
  const handleCheckboxChange_4 = (event) => {
    setIsChecked4(event.target.checked);
  };

  useEffect(() => {
    document.title = "OceanStream - Equipamento";

    const jwtExpirado = JWTexpirado();
    // Se o token estiver expirado, redireciona para a página de login
    if (jwtExpirado) {
      navigate("/login");
    }
  }, []); // O segundo parâmetro do useEffect é um array vazio para garantir que o efeito seja executado apenas uma vez

  const titulos = [];
  const cAlturaGrafico= 0.3;
  const cLarguraGrafico= 0.5;
  const cLarguraBussula= 0.1;

  const { altura, largura } = useWindowDimensions();
  var grafico_altura = altura * cAlturaGrafico;
  var grafico_largura = largura * cLarguraGrafico;

  const alturaMinima = 190;
  grafico_altura = grafico_altura < alturaMinima ? alturaMinima : grafico_altura;

  const larguraMinima = 450;
  grafico_largura = grafico_largura < larguraMinima ? larguraMinima : grafico_largura;


  const bussula_largula = largura * cLarguraBussula;

  const [rotation, setRotation] = useState(0); // Estado para armazenar o ângulo de rotação

  const handleRotationChange = (event) => {
    setRotation(event.target.value); // Atualiza o estado com o valor do input
  };

  return (
    <div className='maincontainer'>
     <div className='barralateral'>
      <BarraLateral/>
     </div>
     <div className='site'>
      <div className='div_esquerda'>
        <div className='titulo'>
          <h1>ADCP Boia-10</h1>
          <h2>AWAC 600kHz / Porto de Tubarão-ES</h2>
        </div>
        <br/>
        <div className='chkgr'>
          {/* chkgr = check graph : selecionar quais ckeckboxes/graficos quer marcados/visiveis */}
          <h2>Gráficos</h2>
          <br/>
          {/* Checkbox velocidade de onda */}
          <p>
            <label>
              <input
                type="checkbox"
                checked={isChecked_velonda}
                onChange={handleCheckboxChange_1}
              />
              Grafico de Velocidade de Onda
            </label>
          </p>
          {/* Checkbox velocidade de vento */}
          <p>
            <label>
              <input
                type="checkbox"
                checked={isChecked_velvento}
                onChange={handleCheckboxChange_2}
              />
              Grafico de Velocidade do Vento
            </label>
          </p>
          {/* Checkbox 3 */}
          <p>
            <label>
              <input
                type="checkbox"
                checked={isChecked3}
                onChange={handleCheckboxChange_3}
              />
              Grafico 3
            </label>
          </p>
          {/* Checkbox 4 */}
          <p>
            <label>
              <input
                type="checkbox"
                checked={isChecked4}
                onChange={handleCheckboxChange_4}
              />
              Grafico 4
            </label>
          </p>
        </div>

        {/* metadados - tamanho tela + tamanho grafico */}
        <div>
          <p>Altura: {altura} | Largura: {largura}</p>
          <p>{cLarguraGrafico*100}% da largura total da tela é: {grafico_largura}px</p>
          <p>Largura total:{grafico_largura}</p>
          <p>{cAlturaGrafico*100}% da altura total da tela é: {grafico_altura}px</p>
          <p>Altura total:{grafico_altura}</p>
        </div>
      </div>

      <div className='div_direita'>
        <div className='graphs'>
          {/* GRÁFICO DE VELOCIDADE DE ONDA */}
          {isChecked_velonda && (
            <div className='parametro'>
              <Bussula
                rotacao={27}
                largura={bussula_largula}
                velocidade='5 kn'
              />
              <GraficoLinha 
                datetime={tss}
                valores={seriesData[0]}
                unidade="Metros por segundo (m/s)"
                titulo="Velocidade de onda"
                minY={0}
                altura={grafico_altura}
                largura={grafico_largura}
              />
            </div>
          )}
          {/* GRÁFICO DE VELOCIDADE DE VENTO */}
          {isChecked_velvento && (
            <div className='parametro'>
              <Bussula
                rotacao={27}
                largura={bussula_largula}
                velocidade='5 kn'
              />
              <GraficoLinha 
                datetime={tss}
                valores={seriesData[1]}
                unidade="Nós (kn)"
                titulo="Velocidade de vento"
                minY={0}
                altura={grafico_altura}
                largura={grafico_largura}
              />
            </div>
          )}
          {/* GRÁFICO 3 */}
          {isChecked3 && (
            <div className='parametro'>
              <Bussula
                rotacao={27}
                largura={bussula_largula}
                velocidade='5 kn'
              />
              <GraficoLinha 
                datetime={tss}
                valores={seriesData[1]}
                unidade="Terceira unidade"
                titulo="Grafico 3"
                minY={0}
                altura={grafico_altura}
                largura={grafico_largura}
              />
            </div>
          )}
          {/* GRÁFICO 4 */}
          {isChecked4 && (
            <div className='parametro'>
              <Bussula
                rotacao={27}
                largura={bussula_largula}
                velocidade='5 kn'
              />
              <GraficoLinha 
                datetime={tss}
                valores={seriesData[1]}
                unidade="Quarta unidade"
                titulo="Grafico 4"
                minY={0}
                altura={grafico_altura}
                largura={grafico_largura}
              />
            </div>
          )}
        </div>
      </div>
     </div>
    </div>
  );
}

export default Equipamento;
