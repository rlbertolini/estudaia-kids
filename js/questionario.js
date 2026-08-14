/*
==========================================================
ESTUDAIA KIDS
QUESTIONÁRIO INTERATIVO
==========================================================

Integração com:
- banco de questões
- motor adaptativo
- 20 ou 30 questões
- feedback imediato
- avanço para a próxima questão
- resultado final
==========================================================
*/


let sessaoQuestionario = null;

let questaoAtual = null;

let bancoAtual = [];

let respostasSessao = [];

let motorAtivo = false;


/*
==========================================================
INICIAR QUESTIONÁRIO
==========================================================
*/

function iniciarQuestionario(questoes, quantidade = 20) {

    if (!Array.isArray(questoes) || questoes.length === 0) {

        alert("Nenhuma questão disponível.");

        return;

    }


    bancoAtual = questoes;

    respostasSessao = [];


    /*
    ------------------------------------------------------
    Tenta utilizar o motor adaptativo
    ------------------------------------------------------
    */

    motorAtivo =
        typeof EstudaIAAdaptativo !== "undefined";


    if (motorAtivo) {

        sessaoQuestionario =
            EstudaIAAdaptativo.criarSessao(

                bancoAtual,

                {
                    quantidadeSessao:
                        quantidade === 30
                            ? 30
                            : 20
                }

            );

    } else {

        /*
        --------------------------------------------------
        Modo simples de segurança
        --------------------------------------------------
        */

        sessaoQuestionario = {

            questoes:
                bancoAtual.slice(
                    0,
                    quantidade === 30 ? 30 : 20
                ),

            quantidadeTotal:
                quantidade === 30 ? 30 : 20,

            indiceAtual: 0,

            acertos: 0,

            erros: 0,

            finalizado: false

        };

    }


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
    ------------------------------------------------------
    Remove feedback anterior
    ------------------------------------------------------
    */

    const feedbackAnterior =
        document.getElementById(
            "feedback-questao"
        );


    if (feedbackAnterior) {

        feedbackAnterior.remove();

    }


    /*
    ------------------------------------------------------
    Obtém próxima questão
    ------------------------------------------------------
    */

    if (motorAtivo) {

        questaoAtual =
            EstudaIAAdaptativo
                .escolherProximaQuestao(
                    sessaoQuestionario
                );

    } else {

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

    }


    /*
    ------------------------------------------------------
    Verifica finalização
    ------------------------------------------------------
    */

    if (!questaoAtual) {

        finalizarQuestionario();

        return;

    }


    desenharQuestao(
        questaoAtual
    );

}


/*
==========================================================
DESENHAR QUESTÃO
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
    ------------------------------------------------------
    Número da questão
    ------------------------------------------------------
    */

    let numeroQuestao = 1;


    if (motorAtivo) {

        numeroQuestao =
            sessaoQuestionario.numeroQuestaoAtual;

    } else {

        numeroQuestao =
            sessaoQuestionario.indiceAtual + 1;

    }


    /*
    ------------------------------------------------------
    Dificuldade
    ------------------------------------------------------
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
    ------------------------------------------------------
    Alternativas
    ------------------------------------------------------
    */

    let alternativasHTML = "";


    if (
        Array.isArray(
            questao.alternativas
        )
    ) {

        questao.alternativas.forEach(

            function(
                alternativa,
                indice
            ) {

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

                            ${escaparHTML(
                                String(alternativa)
                            )}

                        </span>

                    </button>

                `;

            }

        );

    }


    /*
    ------------------------------------------------------
    Monta a tela
    ------------------------------------------------------
    */

    area.innerHTML = `

        <div class="cabecalho-questao">

            <div class="numero-questao">

                Questão
                ${numeroQuestao}
                de
                ${
                    sessaoQuestionario.quantidadeTotal ||
                    sessaoQuestionario.questoes.length
                }

            </div>


            <div class="dificuldade ${questao.dificuldade}">

                ${nomeDificuldade}

            </div>

        </div>


        <div class="conteudo-questao">

            <h2>

                ${escaparHTML(
                    String(questao.enunciado)
                )}

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
    ------------------------------------------------------
    Impede clicar novamente
    ------------------------------------------------------
    */

    const botoes =
        document.querySelectorAll(
            ".alternativa"
        );


    botoes.forEach(

        function(botao) {

            botao.disabled = true;

        }

    );


    /*
    ------------------------------------------------------
    Verifica resposta
    ------------------------------------------------------
    */

    const correta =
        indice ===
        questaoAtual.resposta;


    /*
    ------------------------------------------------------
    Guarda resposta
    ------------------------------------------------------
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
            questaoAtual.capitulo,

        tipo:
            questaoAtual.tipo

    });


    /*
    ------------------------------------------------------
    Atualiza estatísticas simples
    ------------------------------------------------------
    */

    if (!motorAtivo) {

        if (correta) {

            sessaoQuestionario.acertos++;

        } else {

            sessaoQuestionario.erros++;

        }

    }


    /*
    ------------------------------------------------------
    Envia resposta para o motor adaptativo
    ------------------------------------------------------
    */

    if (motorAtivo) {

        EstudaIAAdaptativo.registrarResposta(

            sessaoQuestionario,

            questaoAtual,

            correta

        );

    }


    /*
    ------------------------------------------------------
    Mostra feedback
    ------------------------------------------------------
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
    ------------------------------------------------------
    Destaca resposta correta
    ------------------------------------------------------
    */

    if (
        questaoAtual &&
        Array.isArray(
            questaoAtual.alternativas
        )
    ) {

        botoes.forEach(

            function(
                botao,
                indice
            ) {

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
    ------------------------------------------------------
    Destaca resposta errada
    ------------------------------------------------------
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
    ------------------------------------------------------
    Texto
    ------------------------------------------------------
    */

    let mensagem = "";


    if (correta) {

        mensagem = `

            <div class="feedback correto">

                <strong>
                    🎉 Muito bem!
                </strong>

                <p>
                    Você acertou!
                </p>

            </div>

        `;

    } else {

        mensagem = `

            <div class="feedback errado">

                <strong>
                    💡 Vamos aprender!
                </strong>

                <p>
                    A resposta correta está destacada.
                </p>

            </div>

        `;

    }


    /*
    ------------------------------------------------------
    Explicação
    ------------------------------------------------------
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

                    ${escaparHTML(
                        String(
                            questaoAtual.explicacao
                        )
                    )}

                </p>

            </div>

        `;

    }


    /*
    ------------------------------------------------------
    Botão próxima questão
    ------------------------------------------------------
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
    ------------------------------------------------------
    Insere feedback
    ------------------------------------------------------
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

    if (!sessaoQuestionario) {

        return;

    }


    /*
    ------------------------------------------------------
    Modo simples
    ------------------------------------------------------
    */

    if (!motorAtivo) {

        sessaoQuestionario.indiceAtual++;

    }


    /*
    ------------------------------------------------------
    Mostra próxima
    ------------------------------------------------------
    */

    mostrarProximaQuestao();

}


/*
==========================================================
FINALIZAR QUESTIONÁRIO
==========================================================
*/

function finalizarQuestionario() {

    if (!sessaoQuestionario) {

        return;

    }


    sessaoQuestionario.finalizado =
        true;


    let total = 0;

    let acertos = 0;

    let erros = 0;


    /*
    ------------------------------------------------------
    Obtém resultado do motor
    ------------------------------------------------------
    */

    if (motorAtivo) {

        const relatorio =
            EstudaIAAdaptativo.gerarRelatorio(
                sessaoQuestionario
            );


        total =
            relatorio.totalQuestoes;

        acertos =
            relatorio.acertos;

        erros =
            relatorio.erros;

    } else {

        total =
            sessaoQuestionario.questoes.length;

        acertos =
            sessaoQuestionario.acertos;

        erros =
            sessaoQuestionario.erros;

    }


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


    if (!area) {

        return;

    }


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

                    <span>
                        ✅
                    </span>

                    <strong>
                        ${acertos}
                    </strong>

                    <small>
                        Acertos
                    </small>

                </div>


                <div>

                    <span>
                        ❌
                    </span>

                    <strong>
                        ${erros}
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


    /*
    ------------------------------------------------------
    Salva sessão
    ------------------------------------------------------
    */

    if (motorAtivo) {

        EstudaIAAdaptativo.salvarSessao(
            sessaoQuestionario
        );

    }

}


/*
==========================================================
REINICIAR
==========================================================
*/

function reiniciarQuestionario() {

    if (!bancoAtual.length) {

        return;

    }


    const quantidade =
        sessaoQuestionario &&
        sessaoQuestionario.quantidadeTotal
            ? sessaoQuestionario.quantidadeTotal
            : 20;


    iniciarQuestionario(

        bancoAtual,

        quantidade

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


    if (motorAtivo) {

        const relatorio =
            EstudaIAAdaptativo.gerarRelatorio(
                sessaoQuestionario
            );


        return {

            total:
                relatorio.totalQuestoes,

            acertos:
                relatorio.acertos,

            erros:
                relatorio.erros,

            percentual:
                relatorio.percentual,

            respostas:
                respostasSessao,

            nivelFinal:
                relatorio.nivelFinal,

            nivelFinalNome:
                relatorio.nivelFinalNome,

            desempenhoNiveis:
                relatorio.desempenhoNiveis,

            desempenhoConteudos:
                relatorio.desempenhoConteudos,

            desempenhoTipos:
                relatorio.desempenhoTipos

        };

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


/*
==========================================================
SEGURANÇA
==========================================================
*/

function escaparHTML(texto) {

    return texto

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/*
==========================================================
FIM
==========================================================
*/
