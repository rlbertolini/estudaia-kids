/*
==========================================================
ESTUDAIA KIDS
QUESTIONÁRIO INTERATIVO
==========================================================

Este arquivo controla a apresentação das questões.

A criança:
- vê uma questão por vez;
- toca na resposta;
- recebe o resultado;
- avança para a próxima questão.

O sistema também conversa com o motor adaptativo.
==========================================================
*/

let sessaoQuestionario = null;

let questaoAtual = null;

let bancoAtual = [];

let respostasSessao = [];

let numeroQuestao = 0;


/*
==========================================================
INICIAR QUESTIONÁRIO
==========================================================
*/

function iniciarQuestionario(questoes) {

    bancoAtual = questoes || [];

    respostasSessao = [];

    numeroQuestao = 0;

    /*
    Cria uma sessão simples
    */

    sessaoQuestionario = {

        questoes: bancoAtual,

        indiceAtual: 0,

        acertos: 0,

        erros: 0,

        finalizado: false

    };


    mostrarProximaQuestao();

}


/*
==========================================================
MOSTRAR PRÓXIMA QUESTÃO
==========================================================
*/

function mostrarProximaQuestao() {

    if (!sessaoQuestionario) {
        return;
    }


    /*
    Verifica se terminou
    */

    if (
        sessaoQuestionario.indiceAtual >=
        sessaoQuestionario.questoes.length
    ) {

        finalizarQuestionario();

        return;

    }


    questaoAtual =
        sessaoQuestionario.questoes[
            sessaoQuestionario.indiceAtual
        ];


    numeroQuestao =
        sessaoQuestionario.indiceAtual + 1;


    desenharQuestao(
        questaoAtual
    );

}


/*
==========================================================
DESENHAR QUESTÃO NA TELA
==========================================================
*/

function desenharQuestao(questao) {

    const area =
        document.getElementById(
            "area-questionario"
        );


    if (!area) {

        console.error(
            "Área do questionário não encontrada."
        );

        return;

    }


    /*
    Nome amigável da dificuldade
    */

    let nomeDificuldade =
        "Fácil";


    if (
        questao.dificuldade ===
        "intermediaria"
    ) {

        nomeDificuldade =
            "Intermediária";

    }


    if (
        questao.dificuldade ===
        "dificil"
    ) {

        nomeDificuldade =
            "Difícil";

    }


    /*
    Monta alternativas
    */

    let alternativasHTML = "";


    if (
        Array.isArray(
            questao.alternativas
        )
    ) {

        questao.alternativas.forEach(
            (
                alternativa,
                indice
            ) => {

                alternativasHTML += `

                    <button
                        class="alternativa"
                        onclick="selecionarResposta(${indice})"
                    >

                        <span class="letra-alternativa">

                            ${String.fromCharCode(
                                65 + indice
                            )}

                        </span>

                        <span>

                            ${alternativa}

                        </span>

                    </button>

                `;

            }
        );

    }


    /*
    Monta a questão
    */

    area.innerHTML = `

        <div class="cabecalho-questao">

            <div class="numero-questao">

                Questão
                ${numeroQuestao}
                de
                ${sessaoQuestionario.questoes.length}

            </div>


            <div class="dificuldade ${questao.dificuldade}">

                ${nomeDificuldade}

            </div>

        </div>


        <div class="conteudo-questao">

            <h2>

                ${questao.enunciado}

            </h2>


            <div class="alternativas">

                ${alternativasHTML}

            </div>

        </div>

    `;

}


/*
==========================================================
SELECIONAR RESPOSTA
==========================================================
*/

function selecionarResposta(indice) {

    if (!questaoAtual) {
        return;
    }


    /*
    Impede múltiplos cliques
    */

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(
        botao => {

            botao.disabled = true;

        }
    );


    const correta =
        indice ===
        questaoAtual.resposta;


    /*
    Registra resposta
    */

    respostasSessao.push({

        questaoId:
            questaoAtual.id,

        resposta:
            indice,

        correta:
            correta,

        dificuldade:
            questaoAtual.dificuldade,

        conteudo:
            questaoAtual.conteudo,

        capitulo:
            questaoAtual.capitulo

    });


    if (correta) {

        sessaoQuestionario.acertos++;

    } else {

        sessaoQuestionario.erros++;

    }


    /*
    Mostra feedback
    */

    mostrarFeedback(
        correta,
        indice
    );

}


/*
==========================================================
FEEDBACK
==========================================================
*/

function mostrarFeedback(
    correta,
    respostaEscolhida
) {

    const area =
        document.getElementById(
            "area-questionario"
        );


    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    /*
    Marca a resposta correta
    */

    if (
        questaoAtual &&
        questaoAtual.alternativas
    ) {

        botoes.forEach(
            (
                botao,
                indice
            ) => {

                if (
                    indice ===
                    questaoAtual.resposta
                ) {

                    botao.classList.add(
                        "resposta-correta"
                    );

                }

            }
        );

    }


    /*
    Marca resposta errada
    */

    if (!correta) {

        if (
            botoes[respostaEscolhida]
        ) {

            botoes[
                respostaEscolhida
            ].classList.add(
                "resposta-errada"
            );

        }

    }


    /*
    Texto do feedback
    */

    let mensagem = "";

    if (correta) {

        mensagem = `
            <div class="feedback correto">

                <strong>🎉 Muito bem!</strong>

                <p>
                    Você acertou!
                </p>

            </div>
        `;

    } else {

        mensagem = `
            <div class="feedback errado">

                <strong>💡 Vamos aprender!</strong>

                <p>
                    A resposta correta está destacada.
                </p>

            </div>
        `;

    }


    /*
    Explicação
    */

    if (
        questaoAtual.explicacao
    ) {

        mensagem += `

            <div class="explicacao">

                <strong>
                    Explicação:
                </strong>

                <p>
                    ${questaoAtual.explicacao}
                </p>

            </div>

        `;

    }


    /*
    Botão próxima
    */

    mensagem += `

        <button
            class="botao-proxima"
            onclick="irParaProximaQuestao()"
        >

            Próxima questão →

        </button>

    `;


    /*
    Adiciona feedback
    */

    const feedbackExistente =
        document.getElementById(
            "feedback-questao"
        );


    if (feedbackExistente) {

        feedbackExistente.innerHTML =
            mensagem;

    } else {

        area.insertAdjacentHTML(
            "beforeend",

            `

            <div
                id="feedback-questao"
                class="area-feedback"
            >

                ${mensagem}

            </div>

            `

        );

    }

}


/*
==========================================================
PRÓXIMA QUESTÃO
==========================================================
*/

function irParaProximaQuestao() {

    sessaoQuestionario.indiceAtual++;

    mostrarProximaQuestao();

}


/*
==========================================================
FINALIZAR QUESTIONÁRIO
==========================================================
*/

function finalizarQuestionario() {

    sessaoQuestionario.finalizado =
        true;


    const total =
        sessaoQuestionario.questoes.length;


    const acertos =
        sessaoQuestionario.acertos;


    const percentual =
        total > 0
            ? Math.round(
                (acertos / total) * 100
            )
            : 0;


    const area =
        document.getElementById(
            "area-questionario"
        );


    area.innerHTML = `

        <div class="resultado-final">

            <div class="resultado-emoji">

                🏆

            </div>


            <h1>

                Questionário concluído!

            </h1>


            <div class="resultado-numero">

                ${percentual}%

            </div>


            <p>

                Você acertou
                <strong>
                    ${acertos}
                </strong>
                de
                <strong>
                    ${total}
                </strong>
                questões.

            </p>


            <div class="resultado-detalhes">

                <div>

                    <span>✅</span>

                    <strong>
                        ${acertos}
                    </strong>

                    <small>
                        Acertos
                    </small>

                </div>


                <div>

                    <span>❌</span>

                    <strong>
                        ${sessaoQuestionario.erros}
                    </strong>

                    <small>
                        Para revisar
                    </small>

                </div>

            </div>


            <button
                class="botao-reiniciar"
                onclick="reiniciarQuestionario()"
            >

                Fazer novamente

            </button>

        </div>

    `;


}


/*
==========================================================
REINICIAR
==========================================================
*/

function reiniciarQuestionario() {

    iniciarQuestionario(
        bancoAtual
    );

}


/*
==========================================================
OBTER RESULTADO
==========================================================
*/

function obterResultadoQuestionario() {

    if (!sessaoQuestionario) {

        return null;

    }


    return {

        total:
            sessaoQuestionario.questoes.length,

        acertos:
            sessaoQuestionario.acertos,

        erros:
            sessaoQuestionario.erros,

        respostas:
            respostasSessao

    };

}
