const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

searchBtn.addEventListener("click" , () =>{
    sidebar.classList.remove("close");
})

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});

// ----------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const alertas = [
        { quando: '2024-06-20', onde: 'Porto A', resumo: 'Tempestade forte', detalhes: 'Detalhes da tempestade...' },
        { quando: '2024-06-21', onde: 'Porto B', resumo: 'Maré alta', detalhes: 'Detalhes da maré alta...' },
    ];

    const tabela = document.getElementById('alertasTable').getElementsByTagName('tbody')[0];

    alertas.forEach(alerta => {
        const novaLinha = tabela.insertRow();

        const celula1 = novaLinha.insertCell(0);
        const celula2 = novaLinha.insertCell(1);
        const celula3 = novaLinha.insertCell(2);
        const celula4 = novaLinha.insertCell(3);

        celula1.innerHTML = alerta.quando;
        celula2.innerHTML = alerta.onde;
        celula3.innerHTML = alerta.resumo;
        celula4.innerHTML = alerta.detalhes;
    });
});
