const video = document.getElementById("video");
const nome = document.getElementById("nomeVideo");

video.addEventListener("change",()=>{

if(video.files.length){

nome.textContent=video.files[0].name;

}

});

const promptProfessor=`COLE AQUI O PROMPT COMPLETO`;

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
