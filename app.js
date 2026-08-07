document.addEventListener("DOMContentLoaded", () => {

    let nome = localStorage.getItem("nomeAluno");

    if (!nome) {

        nome = prompt("Qual é o seu nome?");

        if (nome && nome.trim() !== "") {
            localStorage.setItem("nomeAluno", nome);
        } else {
            nome = "Estudante";
        }

    }

    const titulo = document.querySelector(".perfil h2");

    if (titulo) {
        titulo.innerHTML = `Olá, ${nome}! 👋`;
    }

});
