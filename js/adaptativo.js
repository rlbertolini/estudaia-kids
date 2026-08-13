/*
==========================================================
ESTUDAIA KIDS
Motor Adaptativo de Questões
Versão inicial - gratuita
==========================================================

Responsabilidades deste arquivo:

- controlar o nível atual do aluno;
- escolher a próxima questão;
- acompanhar acertos e erros;
- subir de dificuldade;
- descer de dificuldade;
- evitar repetição;
- respeitar 20 ou 30 questões;
- trabalhar com banco de até 50 questões;
- registrar histórico;
- acompanhar desempenho por conteúdo;
- acompanhar desempenho por tipo de questão.

Níveis:

0 = Fácil
1 = Intermediário
2 = Difícil
==========================================================
*/


const EstudaIAAdaptativo = {

    /*
    ======================================================
    CONFIGURAÇÃO PADRÃO
    ======================================================
    */

    configuracaoPadrao: {

        bancoMaximo: 50,

        quantidadeSessao: 20,

        dificuldadeInicial: "facil",

        acertosParaSubir: 2,

        errosParaDescer: 2,

        manterUmaQuestaoDeRetencao: true

    },


    /*
    ======================================================
    MAPA DOS NÍVEIS
    ======================================================
    */

    niveis: {

        facil: 0,

        intermediaria: 1,

        dificil: 2

    },


    nomesNiveis: {

        facil: "Fácil",

        intermediaria: "Intermediária",

        dificil: "Difícil"

    },


    /*
    ======================================================
    CRIA UMA NOVA SESSÃO
    ======================================================
    */

    criarSessao: function(bancoQuestoes, configuracao = {}) {

        const config = {

            ...this.configuracaoPadrao,

            ...configuracao

        };


        if (!Array.isArray(bancoQuestoes)) {

            throw new Error(
                "O banco de questões precisa ser um array."
            );

        }


        if (bancoQuestoes.length === 0) {

            throw new Error(
                "O banco de questões está vazio."
            );

        }


        /*
        --------------------------------------------------
        Limita o banco a 50 questões
        --------------------------------------------------
        */

        const banco = bancoQuestoes
            .slice(0, config.bancoMaximo);


        /*
        --------------------------------------------------
        Define a dificuldade inicial
        --------------------------------------------------
        */

        let nivelInicial =
            config.dificuldadeInicial || "facil";


        if (!this.niveis.hasOwnProperty(nivelInicial)) {

            nivelInicial = "facil";

        }


        /*
        --------------------------------------------------
        Estado da sessão
        --------------------------------------------------
        */

        const sessao = {

            banco: banco,

            quantidadeTotal:
                config.quantidadeSessao === 30
                    ? 30
                    : 20,

            numeroQuestaoAtual: 0,

            nivelAtual: nivelInicial,

            acertosConsecutivos: 0,

            errosConsecutivos: 0,

            questoesUtilizadas: [],

            historico: [],

            desempenhoConteudos: {},

            desempenhoTipos: {},

            desempenhoNiveis: {

                facil: {

                    tentativas: 0,

                    acertos: 0,

                    erros: 0

                },

                intermediaria: {

                    tentativas: 0,

                    acertos: 0,

                    erros: 0

                },

                dificil: {

                    tentativas: 0,

                    acertos: 0,

                    erros: 0

                }

            },

            finalizada: false

        };


        return sessao;

    },


    /*
    ======================================================
    OBTÉM QUESTÕES POR NÍVEL
    ======================================================
    */

    obterQuestoesPorNivel: function(sessao, nivel) {

        return sessao.banco.filter(

            questao =>
                questao.dificuldade === nivel &&
                !sessao.questoesUtilizadas.includes(
                    questao.id
                )

        );

    },


    /*
    ======================================================
    OBTÉM TODAS AS QUESTÕES NÃO UTILIZADAS
    ======================================================
    */

    obterQuestoesDisponiveis: function(sessao) {

        return sessao.banco.filter(

            questao =>
                !sessao.questoesUtilizadas.includes(
                    questao.id
                )

        );

    },


    /*
    ======================================================
    ESCOLHE A PRÓXIMA QUESTÃO
    ======================================================
    */

    escolherProximaQuestao: function(sessao) {

        /*
        --------------------------------------------------
        Verifica se a sessão terminou
        --------------------------------------------------
        */

        if (
            sessao.numeroQuestaoAtual >=
            sessao.quantidadeTotal
        ) {

            sessao.finalizada = true;

            return null;

        }


        /*
        --------------------------------------------------
        Primeiro tenta encontrar uma questão
        do nível atual.
        --------------------------------------------------
        */

        let disponiveis = this.obterQuestoesPorNivel(

            sessao,

            sessao.nivelAtual

        );


        /*
        --------------------------------------------------
        Se não houver questão daquele nível,
        procura em outros níveis.
        --------------------------------------------------
        */

        if (disponiveis.length === 0) {

            disponiveis =
                this.obterQuestoesDisponiveis(sessao);

        }


        /*
        --------------------------------------------------
        Se não houver mais questões
        --------------------------------------------------
        */

        if (disponiveis.length === 0) {

            sessao.finalizada = true;

            return null;

        }


        /*
        --------------------------------------------------
        Escolhe a questão de forma inteligente
        --------------------------------------------------
        */

        const questao = this.selecionarMelhorQuestao(

            sessao,

            disponiveis

        );


        /*
        --------------------------------------------------
        Registra como utilizada
        --------------------------------------------------
        */

        sessao.questoesUtilizadas.push(

            questao.id

        );


        sessao.numeroQuestaoAtual++;


        return questao;

    },


    /*
    ======================================================
    SELECIONA A MELHOR QUESTÃO
    ======================================================
    */

    selecionarMelhorQuestao: function(

        sessao,

        questoes

    ) {

        /*
        --------------------------------------------------
        Dá preferência a conteúdos com dificuldade.
        --------------------------------------------------
        */

        const pontuadas = questoes.map(

            questao => {

                let pontuacao = 0;


                /*
                Questão do nível atual
                */

                if (
                    questao.dificuldade ===
                    sessao.nivelAtual
                ) {

                    pontuacao += 50;

                }


                /*
                Conteúdo com histórico de dificuldade
                */

                if (
                    questao.conteudo &&
                    sessao.desempenhoConteudos[
                        questao.conteudo
                    ]
                ) {

                    const desempenho =
                        sessao.desempenhoConteudos[
                            questao.conteudo
                        ];


                    if (
                        desempenho.tentativas > 0 &&
                        desempenho.acertos /
                        desempenho.tentativas < 0.6
                    ) {

                        pontuacao += 30;

                    }

                }


                /*
                Evita sempre o mesmo tipo
                */

                if (
                    questao.tipo &&
                    sessao.historico.length > 0
                ) {

                    const ultimaQuestao =
                        sessao.historico[
                            sessao.historico.length - 1
                        ];


                    if (
                        ultimaQuestao.tipo ===
                        questao.tipo
                    ) {

                        pontuacao -= 15;

                    }

                }


                /*
                Pequeno componente aleatório
                para evitar sempre a mesma sequência
                */

                pontuacao +=
                    Math.random() * 20;


                return {

                    questao,

                    pontuacao

                };

            }

        );


        pontuadas.sort(

            (a, b) =>
                b.pontuacao -
                a.pontuacao

        );


        return pontuadas[0].questao;

    },


    /*
    ======================================================
    REGISTRA A RESPOSTA
    ======================================================
    */

    registrarResposta: function(

        sessao,

        questao,

        correta,

        tempoResposta = null

    ) {

        if (!sessao || !questao) {

            return;

        }


        /*
        --------------------------------------------------
        Atualiza acertos/erros consecutivos
        --------------------------------------------------
        */

        if (correta) {

            sessao.acertosConsecutivos++;

            sessao.errosConsecutivos = 0;

        } else {

            sessao.errosConsecutivos++;

            sessao.acertosConsecutivos = 0;

        }


        /*
        --------------------------------------------------
        Registra nível
        --------------------------------------------------
        */

        const nivel =
            questao.dificuldade || "facil";


        if (
            sessao.desempenhoNiveis[nivel]
        ) {

            sessao.desempenhoNiveis[
                nivel
            ].tentativas++;


            if (correta) {

                sessao.desempenhoNiveis[
                    nivel
                ].acertos++;

            } else {

                sessao.desempenhoNiveis[
                    nivel
                ].erros++;

            }

        }


        /*
        --------------------------------------------------
        Registra conteúdo
        --------------------------------------------------
        */

        if (questao.conteudo) {

            if (
                !sessao.desempenhoConteudos[
                    questao.conteudo
                ]
            ) {

                sessao.desempenhoConteudos[
                    questao.conteudo
                ] = {

                    tentativas: 0,

                    acertos: 0,

                    erros: 0

                };

            }


            const desempenho =
                sessao.desempenhoConteudos[
                    questao.conteudo
                ];


            desempenho.tentativas++;


            if (correta) {

                desempenho.acertos++;

            } else {

                desempenho.erros++;

            }

        }


        /*
        --------------------------------------------------
        Registra tipo
        --------------------------------------------------
        */

        if (questao.tipo) {

            if (
                !sessao.desempenhoTipos[
                    questao.tipo
                ]
            ) {

                sessao.desempenhoTipos[
                    questao.tipo
                ] = {

                    tentativas: 0,

                    acertos: 0,

                    erros: 0

                };

            }


            const desempenho =
                sessao.desempenhoTipos[
                    questao.tipo
                ];


            desempenho.tentativas++;


            if (correta) {

                desempenho.acertos++;

            } else {

                desempenho.erros++;

            }

        }


        /*
        --------------------------------------------------
        Histórico completo
        --------------------------------------------------
        */

        sessao.historico.push({

            questaoId: questao.id,

            tipo: questao.tipo || null,

            conteudo:
                questao.conteudo || null,

            capitulo:
                questao.capitulo || null,

            dificuldade: nivel,

            correta: correta,

            tempoResposta: tempoResposta,

            data: new Date().toISOString()

        });


        /*
        --------------------------------------------------
        Atualiza dificuldade
        --------------------------------------------------
        */

        this.atualizarNivel(sessao);

    },


    /*
    ======================================================
    ATUALIZA O NÍVEL
    ======================================================
    */

    atualizarNivel: function(sessao) {

        /*
        --------------------------------------------------
        DOMÍNIO:
        2 acertos consecutivos
        --------------------------------------------------
        */

        if (
            sessao.acertosConsecutivos >=
            2
        ) {

            this.subirNivel(sessao);

            /*
            Evita subir novamente imediatamente
            */

            sessao.acertosConsecutivos = 0;

            return;

        }


        /*
        --------------------------------------------------
        DIFICULDADE:
        2 erros consecutivos
        --------------------------------------------------
        */

        if (
            sessao.errosConsecutivos >=
            2
        ) {

            this.descerNivel(sessao);

            /*
            Evita descer novamente imediatamente
            */

            sessao.errosConsecutivos = 0;

        }

    },


    /*
    ======================================================
    SOBE DE NÍVEL
    ======================================================
    */

    subirNivel: function(sessao) {

        const atual =
            this.niveis[sessao.nivelAtual];


        if (atual >= 2) {

            return;

        }


        const novoNivel = atual + 1;


        sessao.nivelAtual =
            this.nivelPorNumero(novoNivel);

    },


    /*
    ======================================================
    DESCE DE NÍVEL
    ======================================================
    */

    descerNivel: function(sessao) {

        const atual =
            this.niveis[sessao.nivelAtual];


        if (atual <= 0) {

            return;

        }


        const novoNivel = atual - 1;


        sessao.nivelAtual =
            this.nivelPorNumero(novoNivel);

    },


    /*
    ======================================================
    CONVERTE NÚMERO → NÍVEL
    ======================================================
    */

    nivelPorNumero: function(numero) {

        if (numero === 0) {

            return "facil";

        }

        if (numero === 1) {

            return "intermediaria";

        }

        return "dificil";

    },


    /*
    ======================================================
    PERCENTUAL DE DESEMPENHO
    ======================================================
    */

    percentual: function(

        acertos,

        tentativas

    ) {

        if (!tentativas) {

            return 0;

        }


        return Math.round(

            (acertos / tentativas) * 100

        );

    },


    /*
    ======================================================
    RELATÓRIO DA SESSÃO
    ======================================================
    */

    gerarRelatorio: function(sessao) {

        const total =
            sessao.historico.length;


        const acertos =
            sessao.historico.filter(

                item => item.correta

            ).length;


        const erros =
            total - acertos;


        return {

            totalQuestoes: total,

            acertos: acertos,

            erros: erros,

            percentual:

                this.percentual(
                    acertos,
                    total
                ),

            nivelFinal:
                sessao.nivelAtual,

            nivelFinalNome:
                this.nomesNiveis[
                    sessao.nivelAtual
                ],

            desempenhoNiveis:
                sessao.desempenhoNiveis,

            desempenhoConteudos:
                sessao.desempenhoConteudos,

            desempenhoTipos:
                sessao.desempenhoTipos

        };

    },


    /*
    ======================================================
    SALVAR SESSÃO NO NAVEGADOR
    ======================================================
    */

    salvarSessao: function(sessao) {

        try {

            localStorage.setItem(

                "estudaia_sessao_atual",

                JSON.stringify(sessao)

            );

            return true;

        } catch (erro) {

            console.error(

                "Erro ao salvar sessão:",

                erro

            );

            return false;

        }

    },


    /*
    ======================================================
    RECUPERAR SESSÃO
    ======================================================
    */

    recuperarSessao: function() {

        try {

            const dados =
                localStorage.getItem(
                    "estudaia_sessao_atual"
                );


            if (!dados) {

                return null;

            }


            return JSON.parse(dados);

        } catch (erro) {

            console.error(

                "Erro ao recuperar sessão:",

                erro

            );

            return null;

        }

    },


    /*
    ======================================================
    APAGAR SESSÃO
    ======================================================
    */

    apagarSessao: function() {

        localStorage.removeItem(

            "estudaia_sessao_atual"

        );

    },


    /*
    ======================================================
    INFORMAÇÃO DO NÍVEL
    ======================================================
    */

    obterInformacaoNivel: function(sessao) {

        return {

            nivel:
                sessao.nivelAtual,

            nome:
                this.nomesNiveis[
                    sessao.nivelAtual
                ],

            numero:
                this.niveis[
                    sessao.nivelAtual
                ]

        };

    }

};


/*
==========================================================
FIM DO MOTOR ADAPTATIVO
==========================================================
*/
