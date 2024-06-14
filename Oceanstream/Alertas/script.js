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

// preenche tabela alertas
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://127.0.0.1:5000/api/alertas', {method: 'get'})
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('alertasTable').querySelector('tbody');
            data.forEach(alerta => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${alerta.quando}</td>
                    <td>${alerta.onde}</td>
                    <td>${alerta.resumo}</td>
                    <td>${alerta.detalhes}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao carregar os alertas:', error));
});