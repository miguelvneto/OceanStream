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

// ---------------------------------------------------------------- 
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('author')) {
        document.getElementById('author').value = getLoggedInUser();
    }
    loadIncidents();
});

function getLoggedInUser() {
    // Simulação do usuário logado
    return 'Usuário Logado';
}

function addIncident() {
    const form = document.getElementById('incident-form');
    const formData = new FormData(form);
    const incidentData = {};

    formData.forEach((value, key) => {
        incidentData[key] = value;
    });

    const incidents = JSON.parse(localStorage.getItem('incidents')) || [];
    incidents.push(incidentData);
    localStorage.setItem('incidents', JSON.stringify(incidents));

    form.reset();
    document.getElementById('author').value = getLoggedInUser();
}

function loadIncidents() {
    const incidents = JSON.parse(localStorage.getItem('incidents')) || [];
    const table = document.getElementById('incident-table').getElementsByTagName('tbody')[0];
    table.innerHTML = '';

    incidents.forEach(incidentData => {
        const newRow = table.insertRow();

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);

        cell1.innerHTML = incidentData['location'];
        cell2.innerHTML = incidentData['ship'];
        cell3.innerHTML = incidentData['incident'];
        cell4.innerHTML = `${incidentData['date']} ${incidentData['time']}`;
        cell5.innerHTML = incidentData['author'];
    });
}