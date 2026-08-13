const bancoTeste = [

    {
        id: "q001",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 1",
        habilidade: "Identificação",
        dificuldade: "facil",
        tipo: "multipla_escolha",
        enunciado: "Qual alternativa apresenta a informação estudada corretamente?",
        alternativas: [
            "Alternativa A",
            "Alternativa B",
            "Alternativa C",
            "Alternativa D"
        ],
        resposta: 1,
        explicacao: "A alternativa correta corresponde ao conteúdo estudado."
    },

    {
        id: "q002",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 1",
        habilidade: "Identificação",
        dificuldade: "facil",
        tipo: "verdadeiro_falso",
        enunciado: "A afirmação apresentada corresponde ao conteúdo estudado.",
        resposta: true,
        explicacao: "A afirmação está de acordo com o conteúdo."
    },

    {
        id: "q003",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 2",
        habilidade: "Compreensão",
        dificuldade: "facil",
        tipo: "multipla_escolha",
        enunciado: "Qual opção representa corretamente o conceito estudado?",
        alternativas: [
            "Opção A",
            "Opção B",
            "Opção C",
            "Opção D"
        ],
        resposta: 0,
        explicacao: "Essa opção representa corretamente o conceito."
    },

    {
        id: "q004",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 2",
        habilidade: "Compreensão",
        dificuldade: "facil",
        tipo: "complete",
        enunciado: "Complete a frase com a informação correta.",
        alternativas: [
            "Resposta A",
            "Resposta B",
            "Resposta C"
        ],
        resposta: 0,
        explicacao: "Essa é a informação correta."
    },

    {
        id: "q005",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 3",
        habilidade: "Classificação",
        dificuldade: "facil",
        tipo: "classificacao",
        enunciado: "Qual opção pertence à classificação estudada?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "A opção correta pertence à classificação."
    },

    {
        id: "q006",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 3",
        habilidade: "Identificação",
        dificuldade: "facil",
        tipo: "multipla_escolha",
        enunciado: "Identifique a alternativa correta.",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 3,
        explicacao: "A alternativa indicada corresponde ao conteúdo."
    },

    {
        id: "q007",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 4",
        habilidade: "Sequenciamento",
        dificuldade: "facil",
        tipo: "sequenciamento",
        enunciado: "Qual elemento deve aparecer primeiro?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 0,
        explicacao: "Esse elemento inicia a sequência."
    },

    {
        id: "q008",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 4",
        habilidade: "Associação",
        dificuldade: "facil",
        tipo: "associacao",
        enunciado: "Qual associação está correta?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 1,
        explicacao: "Essa associação está correta."
    },

    {
        id: "q009",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 5",
        habilidade: "Interpretação",
        dificuldade: "facil",
        tipo: "interpretacao",
        enunciado: "Qual alternativa interpreta corretamente a informação apresentada?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "Essa alternativa apresenta a interpretação correta."
    },

    {
        id: "q010",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 5",
        habilidade: "Aplicação",
        dificuldade: "facil",
        tipo: "situacao_problema",
        enunciado: "Em uma situação semelhante à estudada, qual seria a melhor resposta?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 1,
        explicacao: "Essa resposta aplica corretamente o conteúdo."
    },


    {
        id: "q011",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 6",
        habilidade: "Compreensão",
        dificuldade: "intermediaria",
        tipo: "multipla_escolha",
        enunciado: "Qual alternativa explica corretamente a relação estudada?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "A alternativa correta apresenta a relação adequada."
    },

    {
        id: "q012",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 6",
        habilidade: "Interpretação",
        dificuldade: "intermediaria",
        tipo: "verdadeiro_falso",
        enunciado: "A afirmação apresenta corretamente a relação entre os conceitos.",
        resposta: true,
        explicacao: "A afirmação está correta de acordo com o conteúdo."
    },

    {
        id: "q013",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 7",
        habilidade: "Comparação",
        dificuldade: "intermediaria",
        tipo: "comparacao",
        enunciado: "Qual alternativa apresenta corretamente a comparação?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 0,
        explicacao: "Essa é a comparação correta."
    },

    {
        id: "q014",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 7",
        habilidade: "Aplicação",
        dificuldade: "intermediaria",
        tipo: "situacao_problema",
        enunciado: "Aplicando o conhecimento estudado, qual alternativa está correta?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 3,
        explicacao: "Essa alternativa aplica corretamente o conhecimento."
    },

    {
        id: "q015",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 8",
        habilidade: "Análise",
        dificuldade: "intermediaria",
        tipo: "multipla_escolha",
        enunciado: "Analise as alternativas e escolha a correta.",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 1,
        explicacao: "Essa alternativa apresenta a análise correta."
    },

    {
        id: "q016",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 8",
        habilidade: "Raciocínio",
        dificuldade: "intermediaria",
        tipo: "raciocinio",
        enunciado: "Qual conclusão pode ser obtida a partir do conteúdo estudado?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 0,
        explicacao: "Essa conclusão é compatível com o conteúdo."
    },

    {
        id: "q017",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 9",
        habilidade: "Identificação",
        dificuldade: "intermediaria",
        tipo: "identificacao",
        enunciado: "Identifique corretamente o elemento solicitado.",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "Esse é o elemento correto."
    },

    {
        id: "q018",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 9",
        habilidade: "Ordenação",
        dificuldade: "intermediaria",
        tipo: "ordenacao",
        enunciado: "Qual alternativa apresenta a sequência correta?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 3,
        explicacao: "Essa alternativa apresenta a sequência correta."
    },

    {
        id: "q019",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 10",
        habilidade: "Correlação",
        dificuldade: "intermediaria",
        tipo: "correlacao",
        enunciado: "Qual relação entre os elementos está correta?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 1,
        explicacao: "Essa relação está correta."
    },

    {
        id: "q020",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 10",
        habilidade: "Interpretação",
        dificuldade: "intermediaria",
        tipo: "interpretacao",
        enunciado: "Qual alternativa apresenta a melhor interpretação?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 0,
        explicacao: "Essa interpretação está de acordo com o conteúdo."
    },


    {
        id: "q021",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 11",
        habilidade: "Análise",
        dificuldade: "dificil",
        tipo: "situacao_problema",
        enunciado: "Considere a situação apresentada. Qual conclusão é possível obter?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "Essa conclusão utiliza corretamente os conhecimentos estudados."
    },

    {
        id: "q022",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 11",
        habilidade: "Análise",
        dificuldade: "dificil",
        tipo: "multipla_escolha",
        enunciado: "Analise as informações e escolha a alternativa correta.",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 3,
        explicacao: "A alternativa correta resulta da análise das informações."
    },

    {
        id: "q023",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 12",
        habilidade: "Comparação",
        dificuldade: "dificil",
        tipo: "comparacao",
        enunciado: "Qual comparação exige a aplicação correta dos conceitos?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 1,
        explicacao: "Essa comparação está correta."
    },

    {
        id: "q024",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 12",
        habilidade: "Raciocínio",
        dificuldade: "dificil",
        tipo: "raciocinio",
        enunciado: "Qual conclusão exige o melhor raciocínio a partir do conteúdo?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 0,
        explicacao: "Essa conclusão utiliza corretamente os conceitos."
    },

    {
        id: "q025",
        capitulo: "Capítulo 1",
        conteudo: "Conteúdo 13",
        habilidade: "Aplicação",
        dificuldade: "dificil",
        tipo: "situacao_problema",
        enunciado: "Como o conhecimento estudado pode ser aplicado nesta situação?",
        alternativas: [
            "A",
            "B",
            "C",
            "D"
        ],
        resposta: 2,
        explicacao: "Essa alternativa aplica corretamente o conhecimento."
    }

];
