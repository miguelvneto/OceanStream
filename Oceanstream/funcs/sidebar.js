const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
    //   searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

document.addEventListener('DOMContentLoaded', function() {
    // Verifica o estado do "dark mode" na localStorage quando a página carrega
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add("dark");
        modeText.innerText = "Light mode";
    } else {
        body.classList.remove("dark");
        modeText.innerText = "Dark mode";
    }

    // Adiciona o evento de click ao switch de modo
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
            localStorage.setItem('darkMode', 'enabled'); // Salva o estado "enabled" na localStorage
        } else {
            modeText.innerText = "Dark mode";
            localStorage.setItem('darkMode', 'disabled'); // Salva o estado "disabled" na localStorage
        }
    });
});