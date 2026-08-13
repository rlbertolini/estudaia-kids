/*
==========================================================
ESTUDAIA KIDS
Validador e Gerenciador do Banco de Questões
==========================================================

Responsabilidades:

- aceitar no máximo 50 questões;
- validar estrutura;
- eliminar duplicidades;
- validar dificuldade;
- validar tipos;
- validar respostas;
- separar por dificuldade;
- separar por capítulo;
- fornecer estatísticas;
- preparar o banco para o motor adaptativo.
==========================================================
*/

const EstudaIABanco = {

    LIMITE_MAXIMO: 50,

    DIFICULDADES_VALIDAS: [
        "facil",
        "intermediaria",
        "dificil"
    ],

    TIPOS_VALIDOS: [
        "multipla_escolha",
        "verdadeiro_falso",
        "complete",
        "resposta_curta",
        "discursiva",
        "interpretacao",
        "situacao_problema",
        "associacao",
        "correlacao",
        "ordenacao",
        "alternativa_incorreta",
        "correcao_frase",
        "comparacao",
        "identificacao",
        "classificacao",
        "sequenciamento",
        "relacionamento",
        "tabela",
        "grafico",
        "esquema",
        "imagem"
    ],


    /*
    ======================================================
    CRIAR BANCO
    ======================================================
    */

    criarBanco: function(questoes) {

        if (!Array.isArray(questoes)) {

            throw new Error(
                "O banco precisa ser uma lista de questões."
            );

        }


        /*
        Limita a 50
        */

        const limitadas =
            questoes.slice(
                0,
                this.LIMITE_MAXIMO
            );


        /*
        Remove duplicidades
        */

        const semDuplicadas =
            this.removerDuplicadas(
                limitadas
            );


        /*
        Validação
        */

        const resultado =
            this.validarBanco(
                semDuplicadas
            );


        /*
        Retorna somente questões válidas
        */

        return {

            questoes:
                resultado.questoesValidas,

            erros:
                resultado.erros,

            avisos:
                resultado.avisos,

            estatisticas:
                this.gerarEstatisticas(
                    resultado.questoesValidas
                )

        };

    },


    /*
    ======================================================
    VALIDAR BANCO
    ======================================================
    */

    validarBanco: function(questoes) {

        const questoesValidas = [];

        const erros = [];

        const avisos = [];


        questoes.forEach(
            (questao, indice) => {

                const resultado =
                    this.validarQuestao(
                        questao,
                        indice
                    );


                if (resultado.valida) {

                    questoesValidas.push(
                        resultado.questao
                    );

                }


                if (resultado.erros.length > 0) {

                    erros.push(
                        ...resultado.erros
                    );

                }


                if (resultado.avisos.length > 0) {

                    avisos.push(
                        ...resultado.avisos
                    );

                }

            }
        );


        return {

            questoesValidas,

            erros,

            avisos

        };

    },


    /*
    ======================================================
    VALIDAR QUESTÃO
    ======================================================
    */

    validarQuestao: function(
        questao,
        indice
    ) {

        const erros = [];

        const avisos = [];


        if (
            !questao ||
            typeof questao !== "object"
        ) {

            erros.push(
                `Questão ${indice + 1}: formato inválido.`
            );


            return {

                valida: false,

                questao: null,

                erros,

                avisos

            };

        }


        /*
        ID
        */

        if (!questao.id) {

            erros.push(
                `Questão ${indice + 1}: falta o ID.`
            );

        }


        /*
        Enunciado
        */

        if (
            !questao.enunciado ||
            questao.enunciado.trim() === ""
        ) {

            erros.push(
                `Questão ${indice + 1}: falta o enunciado.`
            );

        }


        /*
        Dificuldade
        */

        if (
            !this.DIFICULDADES_VALIDAS.includes(
                questao.dificuldade
            )
        ) {

            erros.push(
                `Questão ${indice + 1}: dificuldade inválida.`
            );

        }


        /*
        Tipo
        */

        if (
            !this.TIPOS_VALIDOS.includes(
                questao.tipo
            )
        ) {

            erros.push(
                `Questão ${indice + 1}: tipo de questão inválido.`
            );

        }


        /*
        Conteúdo
        */

        if (!questao.conteudo) {

            avisos.push(
                `Questão ${indice + 1}: conteúdo não informado.`
            );

        }


        /*
        Capítulo
        */

        if (!questao.capitulo) {

            avisos.push(
                `Questão ${indice + 1}: capítulo não informado.`
            );

        }


        /*
        Resposta
        */

        if (
            questao.resposta === undefined ||
            questao.resposta === null
        ) {

            erros.push(
                `Questão ${indice + 1}: resposta não informada.`
            );

        }


        /*
        Questões de múltipla escolha
        */

        if (
            questao.tipo ===
            "multipla_escolha"
        ) {

            if (
                !Array.isArray(
                    questao.alternativas
                ) ||
                questao.alternativas.length < 2
            ) {

                erros.push(
                    `Questão ${indice + 1}: múltipla escolha precisa de pelo menos 2 alternativas.`
                );

            }

        }


        /*
        Verdadeiro ou falso
        */

        if (
            questao.tipo ===
            "verdadeiro_falso"
        ) {

            if (
                typeof questao.resposta !==
                "boolean"
            ) {

                erros.push(
                    `Questão ${indice + 1}: verdadeiro/falso deve possuir resposta true ou false.`
                );

            }

        }


        /*
        Questão válida?
        */

        const valida =
            erros.length === 0;


        return {

            valida,

            questao,

            erros,

            avisos

        };

    },


    /*
    ======================================================
    REMOVER DUPLICIDADES
    ======================================================
    */

    removerDuplicadas: function(
        questoes
    ) {

        const ids = new Set();

        const enunciados =
            new Set();

        const resultado = [];


        questoes.forEach(
            questao => {

                if (!questao) {
                    return;
                }


                /*
                Verifica ID
                */

                if (
                    questao.id &&
                    ids.has(questao.id)
                ) {

                    return;

                }


                /*
                Verifica enunciado
                */

                const texto =
                    (questao.enunciado || "")
                        .trim()
                        .toLowerCase();


                if (
                    texto &&
                    enunciados.has(texto)
                ) {

                    return;

                }


                if (questao.id) {

                    ids.add(
                        questao.id
                    );

                }


                if (texto) {

                    enunciados.add(
                        texto
                    );

                }


                resultado.push(
                    questao
                );

            }
        );


        return resultado;

    },


    /*
    ======================================================
    SEPARAR POR DIFICULDADE
    ======================================================
    */

    separarPorDificuldade: function(
        questoes
    ) {

        return {

            facil:
                questoes.filter(
                    q =>
                        q.dificuldade ===
                        "facil"
                ),

            intermediaria:
                questoes.filter(
                    q =>
                        q.dificuldade ===
                        "intermediaria"
                ),

            dificil:
                questoes.filter(
                    q =>
                        q.dificuldade ===
                        "dificil"
                )

        };

    },


    /*
    ======================================================
    SEPARAR POR CAPÍTULO
    ======================================================
    */

    separarPorCapitulo: function(
        questoes
    ) {

        const capitulos = {};


        questoes.forEach(
            questao => {

                const capitulo =
                    questao.capitulo ||
                    "sem_capitulo";


                if (
                    !capitulos[capitulo]
                ) {

                    capitulos[capitulo] = [];

                }


                capitulos[capitulo].push(
                    questao
                );

            }
        );


        return capitulos;

    },


    /*
    ======================================================
    SEPARAR POR TIPO
    ======================================================
    */

    separarPorTipo: function(
        questoes
    ) {

        const tipos = {};


        questoes.forEach(
            questao => {

                const tipo =
                    questao.tipo ||
                    "sem_tipo";


                if (!tipos[tipo]) {

                    tipos[tipo] = [];

                }


                tipos[tipo].push(
                    questao
                );

            }
        );


        return tipos;

    },


    /*
    ======================================================
    ESTATÍSTICAS
    ======================================================
    */

    gerarEstatisticas: function(
        questoes
    ) {

        const dificuldades =
            this.separarPorDificuldade(
                questoes
            );


        const capitulos =
            this.separarPorCapitulo(
                questoes
            );


        const tipos =
            this.separarPorTipo(
                questoes
            );


        return {

            total:
                questoes.length,

            limite:
                this.LIMITE_MAXIMO,

            facil:
                dificuldades.facil.length,

            intermediaria:
                dificuldades.intermediaria.length,

            dificil:
                dificuldades.dificil.length,

            capitulos:
                Object.keys(
                    capitulos
                ).length,

            tipos:
                Object.keys(
                    tipos
                ).length

        };

    },


    /*
    ======================================================
    DISTRIBUIÇÃO IDEAL
    ======================================================
    */

    calcularDistribuicao: function(
        quantidade
    ) {

        /*
        40% fácil
        40% intermediária
        20% difícil
        */

        let facil =
            Math.round(
                quantidade * 0.40
            );


        let intermediaria =
            Math.round(
                quantidade * 0.40
            );


        let dificil =
            quantidade -
            facil -
            intermediaria;


        return {

            facil,

            intermediaria,

            dificil

        };

    },


    /*
    ======================================================
    VERIFICAR COBERTURA
    ======================================================
    */

    verificarCobertura: function(
        questoes
    ) {

        const estatisticas =
            this.gerarEstatisticas(
                questoes
            );


        const alertas = [];


        if (
            estatisticas.total < 20
        ) {

            alertas.push(
                "O banco possui menos de 20 questões."
            );

        }


        if (
            estatisticas.facil === 0
        ) {

            alertas.push(
                "Não existem questões fáceis."
            );

        }


        if (
            estatisticas.intermediaria === 0
        ) {

            alertas.push(
                "Não existem questões intermediárias."
            );

        }


        if (
            estatisticas.dificil === 0
        ) {

            alertas.push(
                "Não existem questões difíceis."
            );

        }


        return {

            adequada:
                alertas.length === 0,

            alertas

        };

    },


    /*
    ======================================================
    EXPORTAR BANCO
    ======================================================
    */

    exportar: function(
        questoes
    ) {

        return JSON.stringify(

            questoes,

            null,

            2

        );

    },


    /*
    ======================================================
    IMPORTAR BANCO
    ======================================================
    */

    importar: function(
        texto
    ) {

        try {

            const questoes =
                JSON.parse(texto);


            return this.criarBanco(
                questoes
            );

        } catch (erro) {

            return {

                questoes: [],

                erros: [
                    "Não foi possível ler o banco JSON."
                ],

                avisos: [],

                estatisticas: null

            };

        }

    }

};


/*
==========================================================
FIM DO GERENCIADOR DO BANCO
==========================================================
*/
