// ==========================================
// ESTUDAIA KIDS
// Professor Particular Virtual
// Controle do estudo atual
// ==========================================


// 1. Carregar o estudo criado anteriormente

const estudo = JSON.parse(
    localStorage.getItem("estudoAtual")
);


// 2. Mostrar as informações do estudo

if (estudo) {

    const tituloEstudo = document.getElementById("tituloEstudo");
    const videoAtual = document.getElementById("videoAtual");

    if (tituloEstudo) {
        tituloEstudo.textContent = estudo.nome;
    }

    if (videoAtual) {

        if (estudo.video) {
            videoAtual.textContent =
                "🎥 Vídeo: " + estudo.video;
        } else {
            videoAtual.textContent =
                "🎥 Nenhum vídeo selecionado";
        }

    }

}


// 3. Carregar o prompt do Professor Virtual

let promptProfessor = "";

fetch("../prompts/professor.txt")
    .then(resposta => resposta.text())
    .then(texto => {

        promptProfessor = texto;

    })
    .catch(() => {

        console.log(
            "Não foi possível carregar o prompt."
        );

    });


// 4. Botão Copiar Prompt

const botaoCopiar =
    document.getElementById("copiar");

if (botaoCopiar) {

    botaoCopiar.onclick = async () => {

        if (!promptProfessor) {

            alert(
                "O prompt ainda está carregando. Aguarde alguns segundos e tente novamente."
            );

            return;
        }

        try {

            await navigator.clipboard.writeText(
                promptProfessor
            );

            alert(
                "✅ Prompt copiado com sucesso!"
            );

        } catch (erro) {

            alert(
                "Não foi possível copiar o prompt."
            );

        }

    };

}


// 5. Botão Abrir ChatGPT

const botaoAbrir =
    document.getElementById("abrir");

if (botaoAbrir) {

    botaoAbrir.onclick = () => {

        // Registrar que o estudo começou

        localStorage.setItem(
            "statusEstudo",
            "Em andamento"
        );

        // Abrir o ChatGPT

        window.open(
            "https://chatgpt.com",
            "_blank"
        );

    };

}
