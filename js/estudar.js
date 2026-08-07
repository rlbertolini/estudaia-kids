const promptProfessor = `COLE AQUI O PROMPT GIGANTE QUE CRIAMOS`;

document
.getElementById("copiar")
.addEventListener("click",()=>{

navigator.clipboard.writeText(promptProfessor);

alert("Prompt copiado!");

});

document
.getElementById("iniciar")
.addEventListener("click",()=>{

alert("Na próxima versão o estudo será iniciado automaticamente.");

});
