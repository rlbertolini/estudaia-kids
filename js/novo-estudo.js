const video = document.getElementById("video");
const nomeVideo = document.getElementById("nomeVideo");

video.onchange = () => {
    if (video.files.length) {
        nomeVideo.textContent = video.files[0].name;
    }
};

document.getElementById("criar").onclick = () => {

    const nome = document.getElementById("nomeEstudo").value.trim();

    if (!nome) {
        alert("Digite um nome para o estudo.");
        return;
    }

    const estudo = {
        id: Date.now(),
        nome: nome,
        video: video.files.length ? video.files[0].name : "",
        criadoEm: new Date().toISOString(),
        status: "Novo"
    };

    localStorage.setItem("estudoAtual", JSON.stringify(estudo));

    window.location = "estudar.html";
};
