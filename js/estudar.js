const video = document.getElementById("video");
const nome = document.getElementById("nomeVideo");

video.addEventListener("change",()=>{

if(video.files.length){

nome.textContent=video.files[0].name;

}

});

let promptProfessor = "";

fetch("../prompts/professor.txt")
  .then(resposta => resposta.text())
  .then(texto => {
      promptProfessor = texto;
  })
  .catch(() => {
      alert("Não foi possível carregar o prompt.");
  });

document
.getElementById("copiar")
.onclick=()=>{

navigator.clipboard.writeText(promptProfessor);

alert("Prompt copiado!");

};

document
.getElementById("abrir")
.onclick=()=>{

window.open("https://chatgpt.com","_blank");

};
