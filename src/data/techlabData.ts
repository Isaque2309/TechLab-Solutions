/**
 * TECHLAB - BASE DE DADOS INTEGRADA
 * Todo o conteúdo educacional, questões, tutoriais, conceitos e parâmetros da plataforma.
 */

export const TECHLAB_DATA = {
  info: {
    nome: "TechLab",
    slogan: "Plataforma Interativa de Estudo & Análise Tech",
    versao: "2.5.0",
    descricao: "Domine Ciência de Dados, Programação, Redes, Cibersegurança, Cloud, Banco de Dados, IA e DevOps com teoria didática, simuladores interativos e laboratórios práticos."
  },

  // 1. APOSTILA DE LÓGICA DE PROGRAMAÇÃO COM PYTHON (13 AULAS, 4 UNIDADES)
  apostila: {
    unidades: [
      {
        id: "unidade-1",
        numero: 1,
        titulo: "Fundamentos & Pensamento Computacional",
        descricao: "Compreenda algoritmos, fluxo de instrução, entrada e saída de dados e variáveis em Python.",
        aulasIds: ["aula-01", "aula-02", "aula-03", "aula-04"]
      },
      {
        id: "unidade-2",
        numero: 2,
        titulo: "Estruturas Condicionais & Decisões",
        descricao: "Aprenda a criar bifurcações no código com if, elif, else e operadores relacionais e lógicos.",
        aulasIds: ["aula-05", "aula-06", "aula-07"]
      },
      {
        id: "unidade-3",
        numero: 3,
        titulo: "Estruturas de Repetição & Loops",
        descricao: "Automatize tarefas repetitivas usando os laços for e while, contadores, acumuladores e a função range().",
        aulasIds: ["aula-08", "aula-09", "aula-10"]
      },
      {
        id: "unidade-4",
        numero: 4,
        titulo: "Listas, Matrizes & Ordenação",
        descricao: "Organize dados em vetores e matrizes, domine índices, diagonais e o algoritmo clássico Bubble Sort.",
        aulasIds: ["aula-11", "aula-12", "aula-13"]
      }
    ],
    aulas: [
      {
        id: "aula-01",
        unidadeId: "unidade-1",
        numero: 1,
        titulo: "O que é um Algoritmo e Pensamento Computacional",
        tempo: "12 min",
        teoria: `
          <p>Um <strong>algoritmo</strong> nada mais é do que uma sequência finita, ordenada e não ambígua de instruções para solucionar um problema ou realizar uma tarefa. Pense em uma receita de bolo ou nas instruções do GPS: cada etapa precisa ser clara para que o resultado seja alcançado com sucesso.</p>
          <p>O <strong>pensamento computacional</strong> divide-se em 4 pilares essenciais:</p>
          <ul class="lesson-list">
            <li><strong>Decomposição:</strong> quebrar um problema complexo em partes menores e gerenciáveis.</li>
            <li><strong>Reconhecimento de Padrões:</strong> identificar similaridades e tendências para não reinventar a roda.</li>
            <li><strong>Abstração:</strong> focar apenas no que é relevante, ignorando detalhes desnecessários.</li>
            <li><strong>Algoritmos:</strong> construir o passo a passo lógico para a resolução.</li>
          </ul>
        `,
        exemploPython: `# Exemplo de algoritmo simples: Cálculo de Média Escolar
nota1 = 8.5
nota2 = 7.0

# Processamento
media = (nota1 + nota2) / 2

# Saída
print("A média do aluno é:", media)`,
        explicacaoCodigo: "O programa armazena dois valores em variáveis, calcula a média aritmética somando-os e dividindo por 2, e exibe o resultado final na tela.",
        miniExercicio: {
          pergunta: "Qual pilar do pensamento computacional foca em dividir um problema grande em problemas menores?",
          opcoes: [
            "Decomposição",
            "Abstração",
            "Reconhecimento de padrões",
            "Compilação"
          ],
          respostaCorreta: 0,
          explicacao: "A Decomposição consiste em quebrar um problema grande e complexo em partes menores e muito mais fáceis de resolver."
        }
      },
      {
        id: "aula-02",
        unidadeId: "unidade-1",
        numero: 2,
        titulo: "Fluxogramas e Pseudocódigo",
        tempo: "15 min",
        teoria: `
          <p>Antes de escrever código em qualquer linguagem de programação, engenheiros de software estruturam o raciocínio através de <strong>fluxogramas</strong> e <strong>pseudocódigo</strong>.</p>
          <p>No fluxograma, utilizamos símbolos geométricos universais:</p>
          <ul class="lesson-list">
            <li><strong>Oval / Elipse:</strong> Início ou Fim do processo.</li>
            <li><strong>Retângulo:</strong> Ação ou Processamento (ex: cálculo matemático, atribuição).</li>
            <li><strong>Losango:</strong> Tomada de Decisão (bifurcação Sim/Não ou Verdadeiro/Falso).</li>
            <li><strong>Paralelogramo:</strong> Entrada ou Saída de dados (leitura do usuário ou exibição).</li>
          </ul>
        `,
        exemploPython: `# Representação em código de uma decisão de fluxograma:
idade = 17

if idade >= 18:
    print("Acesso permitido: Maior de idade")
else:
    print("Acesso bloqueado: Menor de idade")`,
        explicacaoCodigo: "O losango do fluxograma é traduzido pelo comando 'if'. Se a condição (idade >= 18) for verdadeira, segue o ramo 'Sim'; caso contrário, segue o ramo 'Não' (else).",
        miniExercicio: {
          pergunta: "Em um fluxograma padronizado, qual figura geométrica representa uma Tomada de Decisão (condição)?",
          opcoes: [
            "Retângulo",
            "Losango",
            "Círculo",
            "Paralelogramo"
          ],
          respostaCorreta: 1,
          explicacao: "O Losango é o símbolo universal para representar decisões lógicas com dois ou mais caminhos possíveis."
        }
      },
      {
        id: "aula-03",
        unidadeId: "unidade-1",
        numero: 3,
        titulo: "Entrada e Saída de Dados em Python (print & input)",
        tempo: "14 min",
        teoria: `
          <p>Para interagir com o mundo externo, os programas precisam receber informações (<strong>Entrada</strong>) e exibir resultados (<strong>Saída</strong>).</p>
          <p>Em Python:</p>
          <ul class="lesson-list">
            <li><code>print()</code>: escreve textos e valores no terminal. Aceita formatação com f-strings (ex: <code>f"Olá, {nome}"</code>).</li>
            <li><code>input()</code>: pausa a execução e aguarda o usuário digitar algo. <strong>Importante:</strong> o <code>input()</code> sempre devolve o dado como texto (string). Se quiser números, você deve converter usando <code>int()</code> ou <code>float()</code>!</li>
          </ul>
        `,
        exemploPython: `# Entrada de dados interativa
nome = input("Digite seu nome: ")
ano_nasc = int(input("Digite o ano de seu nascimento: "))

ano_atual = 2026
idade = ano_atual - ano_nasc

# Saída elegante com f-string
print(f"Olá {nome}, em {ano_atual} você tem ou fará {idade} anos!")`,
        explicacaoCodigo: "Utilizamos int(input(...)) para converter o texto digitado pelo usuário em número inteiro antes de subtrair de 2026.",
        miniExercicio: {
          pergunta: "Se um usuário digitar '10' no comando x = input(), qual será o tipo da variável x caso nenhuma conversão seja feita?",
          opcoes: [
            "int (inteiro)",
            "str (string/texto)",
            "float (número decimal)",
            "bool (booleano)"
          ],
          respostaCorreta: 1,
          explicacao: "Por padrão em Python, todo retorno da função input() é uma string (str)."
        }
      },
      {
        id: "aula-04",
        unidadeId: "unidade-1",
        numero: 4,
        titulo: "Variáveis, Tipos de Dados e Operadores Aritméticos",
        tempo: "18 min",
        teoria: `
          <p>Uma <strong>variável</strong> é um espaço reservado na memória RAM do computador com um nome atribuído para guardar valores temporários durante a execução do programa.</p>
          <p>Tipos primitivos essenciais em Python:</p>
          <ul class="lesson-list">
            <li><code>int</code>: Números inteiros positivos ou negativos (ex: 42, -7).</li>
            <li><code>float</code>: Números reais com casas decimais (ex: 3.1415, 99.90).</li>
            <li><code>str</code>: Cadeias de caracteres delimitadas por aspas (ex: "TechLab").</li>
            <li><code>bool</code>: Valores lógicos binários (<code>True</code> ou <code>False</code>).</li>
          </ul>
          <p>Operadores matemáticos: <code>+</code> (soma), <code>-</code> (subtração), <code>*</code> (multiplicação), <code>/</code> (divisão real), <code>//</code> (divisão inteira), <code>%</code> (módulo/resto) e <code>**</code> (potência).</p>
        `,
        exemploPython: `# Operadores especiais
total_minutos = 135

horas = total_minutos // 60   # Divisão inteira: 2
minutos_restantes = total_minutos % 60  # Resto da divisão: 15

print(f"{total_minutos} min equivalem a {horas}h e {minutos_restantes}min")`,
        explicacaoCodigo: "O operador // pega apenas a parte inteira do quociente, enquanto % (módulo) descobre o que sobra da divisão.",
        miniExercicio: {
          pergunta: "Qual é o resultado da expressão 17 % 5 em Python?",
          opcoes: [
            "3",
            "2",
            "3.4",
            "1"
          ],
          respostaCorreta: 1,
          explicacao: "17 dividido por 5 dá 3 inteiros (3 x 5 = 15), restando 2. O operador % retorna exatamente esse resto (2)."
        }
      },
      {
        id: "aula-05",
        unidadeId: "unidade-2",
        numero: 5,
        titulo: "Estruturas Condicionais Simples e Compostas (if e else)",
        tempo: "16 min",
        teoria: `
          <p>Na vida real tomamos decisões o tempo todo: <em>"Se estiver chovendo, levo guarda-chuva; senão, vou sem."</em> Na programação isso se chama <strong>estrutura condicional</strong>.</p>
          <p>Em Python, a sintaxe utiliza <code>if</code> seguido de uma expressão lógica e dois pontos (<code>:</code>). O bloco de código que deve rodar se a condição for verdadeira deve estar obrigatoriamente <strong>indentado</strong> (com 4 espaços de recuo à direita).</p>
          <p>O bloco <code>else</code> é opcional e só é executado se a condição do <code>if</code> for avaliada como falsa.</p>
        `,
        exemploPython: `temperatura = 32.5

if temperatura > 30.0:
    print("Aviso: Clima muito quente! Ligue a refrigeração do servidor.")
else:
    print("Temperatura operacional nos limites normais.")`,
        explicacaoCodigo: "A condição 'temperatura > 30.0' resulta em True quando o valor for 32.5, disparando o primeiro bloco. Se fosse 25.0, dispararia o bloco do else.",
        miniExercicio: {
          pergunta: "Em Python, o que delimita os blocos de código que pertencem ao if ou ao else?",
          opcoes: [
            "Chaves { } como no C e Java",
            "Palavras reservadas begin e end",
            "A indentação (espaçamento à esquerda)",
            "Ponto e vírgula no final da linha"
          ],
          respostaCorreta: 2,
          explicacao: "Python dispensa chaves e usa rigorosamente a indentação para definir escopos e blocos de código."
        }
      },
      {
        id: "aula-06",
        unidadeId: "unidade-2",
        numero: 6,
        titulo: "Condições Encadeadas com elif",
        tempo: "16 min",
        teoria: `
          <p>Quando temos mais de dois cenários possíveis (não apenas Sim ou Não, mas categorias múltiplas), aninhar vários <code>if/else</code> deixa o código confuso. Para isso, o Python oferece a cláusula <code>elif</code> (abreviação elegante de <em>else if</em>).</p>
          <p>O computador testa a primeira condição do <code>if</code>. Se for falsa, passa para o primeiro <code>elif</code>. Assim que encontrar uma verdadeira, executa seu bloco e <strong>ignora</strong> todas as restantes!</p>
        `,
        exemploPython: `velocidade = 85  # km/h

if velocidade <= 60:
    classificacao = "Dentro do limite da via"
elif velocidade <= 80:
    classificacao = "Atenção: próximo ao limite"
elif velocidade <= 100:
    classificacao = "Infração Média: Multa leve"
else:
    classificacao = "Infração Gravíssima: Suspensão da CNH"

print(f"Status do veículo: {classificacao}")`,
        explicacaoCodigo: "Com velocidade 85, a condição 85 <= 60 é False; 85 <= 80 é False; 85 <= 100 é True. O código atribui a infração média e não avalia o else final.",
        miniExercicio: {
          pergunta: "Se x = 15, qual bloco será impresso: if x > 20: 'A' elif x > 10: 'B' else: 'C'?",
          opcoes: [
            "'A'",
            "'B'",
            "'C'",
            "'A' e 'B'"
          ],
          respostaCorreta: 1,
          explicacao: "x (15) não é maior que 20, mas é maior que 10. Portanto o bloco 'B' do elif é acionado com sucesso."
        }
      },
      {
        id: "aula-07",
        unidadeId: "unidade-2",
        numero: 7,
        titulo: "Operadores Relacionais e Lógicos (and, or, not)",
        tempo: "18 min",
        teoria: `
          <p>Para criar regras complexas, combinamos comparações através de <strong>operadores relacionais</strong> e <strong>operadores lógicos</strong>.</p>
          <ul class="lesson-list">
            <li><strong>Relacionais:</strong> <code>==</code> (igual), <code>!=</code> (diferente), <code>&gt;</code> (maior), <code>&lt;</code> (menor), <code>&gt;=</code> (maior ou igual), <code>&lt;=</code> (menor ou igual).</li>
            <li><code>and</code>: Devolve <code>True</code> se <strong>todas</strong> as condições forem verdadeiras simultaneamente.</li>
            <li><code>or</code>: Devolve <code>True</code> se <strong>pelo menos uma</strong> condição for verdadeira.</li>
            <li><code>not</code>: Inverte o valor lógico (transforma True em False e vice-versa).</li>
          </ul>
        `,
        exemploPython: `# Sistema de autenticação de dois fatores (2FA)
usuario_valido = True
senha_correta = True
token_2fa_ok = False

if (usuario_valido and senha_correta) and token_2fa_ok:
    print("Login com privilégios de Admin autorizado!")
elif (usuario_valido and senha_correta) and not token_2fa_ok:
    print("Credenciais corretas, porém informe o código 2FA!")
else:
    print("Acesso negado: Credenciais inválidas.")`,
        explicacaoCodigo: "O operador and exige que ambas as partes sejam verdadeiras. Com not token_2fa_ok, o valor False passa a ser avaliado como True, guiando o fluxo corretamente.",
        miniExercicio: {
          pergunta: "Qual o resultado de (True or False) and not False em Python?",
          opcoes: [
            "True",
            "False",
            "None",
            "Erro de sintaxe"
          ],
          respostaCorreta: 0,
          explicacao: "(True or False) resulta em True. not False resulta em True. True and True resulta em True."
        }
      },
      {
        id: "aula-08",
        unidadeId: "unidade-3",
        numero: 8,
        titulo: "O Laço while e Loops com Sentinela",
        tempo: "18 min",
        teoria: `
          <p>O comando <code>while</code> (enquanto) repete um bloco de código <strong>enquanto</strong> uma dada condição continuar sendo verdadeira.</p>
          <p>É ideal quando <em>não sabemos de antemão</em> quantas vezes o loop precisará rodar — por exemplo, ler arquivos até acabar ou pedir uma senha até o usuário digitar a correta.</p>
          <p><strong>Cuidado crucial:</strong> Se a condição nunca se tornar falsa, teremos um <em>loop infinito</em>, travando a CPU!</p>
        `,
        exemploPython: `# Validação de entrada com loop while
tentativas = 0
limite = 3

while tentativas < limite:
    tentativas += 1
    print(f"Tentativa de conexão #{tentativas} ao servidor...")

print("Conexões esgotadas ou estabelecidas com sucesso.")`,
        explicacaoCodigo: "A cada volta do laço, a variável tentativas é incrementada em 1 (tentativas += 1). Ao atingir 3, na próxima checagem '3 < 3' é False e o loop encerra.",
        miniExercicio: {
          pergunta: "O que acontece se esquecermos de atualizar a variável de controle dentro de um laço while?",
          opcoes: [
            "O programa compila normalmente e roda só uma vez",
            "Ocorre um loop infinito, pois a condição nunca se tornará falsa",
            "O Python apaga a variável automaticamente",
            "O laço se transforma automaticamente em um for"
          ],
          respostaCorreta: 1,
          explicacao: "Se a variável não mudar, a condição continuará sempre True, gerando um loop infinito."
        }
      },
      {
        id: "aula-09",
        unidadeId: "unidade-3",
        numero: 9,
        titulo: "O Laço for e Iteração de Coleções",
        tempo: "15 min",
        teoria: `
          <p>Enquanto o <code>while</code> é baseado em condição, o <code>for</code> em Python é um <strong>iterador de sequências</strong>. Ele percorre elementos de listas, tuplas, dicionários ou textos um a um de maneira limpa e elegante.</p>
          <p>Não precisamos gerenciar índices manualmente: a variável do laço assume o valor de cada item sucessivamente a cada volta.</p>
        `,
        exemploPython: `linguagens = ["Python", "Rust", "Go", "TypeScript", "SQL"]

print("Linguagens em alta no mercado:")
for lang in linguagens:
    print(f"-> Tecnologias recomendadas: {lang}")`,
        explicacaoCodigo: "A cada ciclo, a variável 'lang' recebe o próximo elemento da lista 'linguagens' até que todos tenham sido visitados.",
        miniExercicio: {
          pergunta: "Se executarmos: for letra in 'TECH': print(letra), quantas linhas de saída serão exibidas?",
          opcoes: [
            "1 linha",
            "4 linhas",
            "0 linhas",
            "16 linhas"
          ],
          respostaCorreta: 1,
          explicacao: "A string 'TECH' possui 4 caracteres. O laço for iterará 4 vezes, imprimindo uma letra por linha ('T', 'E', 'C', 'H')."
        }
      },
      {
        id: "aula-10",
        unidadeId: "unidade-3",
        numero: 10,
        titulo: "A Função range(), Contadores e Acumuladores",
        tempo: "20 min",
        teoria: `
          <p>A função <code>range()</code> gera uma sequência aritmética de números sob demanda. Ela é o parceiro mais comum do laço <code>for</code> quando queremos repetir algo um número pré-definido de vezes.</p>
          <p>Formatos da função <code>range</code>:</p>
          <ul class="lesson-list">
            <li><code>range(fim)</code>: vai de 0 até <em>fim - 1</em> (ex: <code>range(5)</code> gera 0, 1, 2, 3, 4).</li>
            <li><code>range(inicio, fim)</code>: vai de <em>inicio</em> até <em>fim - 1</em>.</li>
            <li><code>range(inicio, fim, passo)</code>: incrementa ou decrementa pelo valor de <em>passo</em> (ex: <code>range(0, 10, 2)</code> gera 0, 2, 4, 6, 8).</li>
          </ul>
          <p>Conceitos de variáveis em repetição:</p>
          <ul class="lesson-list">
            <li><strong>Contador:</strong> incrementa uma quantidade fixa (ex: <code>qtd += 1</code>).</li>
            <li><strong>Acumulador (somador):</strong> soma valores variáveis a cada volta (ex: <code>total += valor</code>).</li>
          </ul>
        `,
        exemploPython: `# Calculando a soma dos números pares de 2 até 10
soma_acumulada = 0  # Acumulador
contador_pares = 0  # Contador

for n in range(2, 11, 2):
    soma_acumulada += n
    contador_pares += 1
    print(f"Adicionando {n}... Subtotal: {soma_acumulada}")

print(f"Total somado: {soma_acumulada} em {contador_pares} números.")`,
        explicacaoCodigo: "O range(2, 11, 2) gera os números 2, 4, 6, 8, 10. O acumulador soma cada um deles resultando em 30.",
        miniExercicio: {
          pergunta: "Quais números são gerados pela instrução list(range(1, 9, 3))?",
          opcoes: [
            "[1, 4, 7]",
            "[1, 3, 6, 9]",
            "[3, 6, 9]",
            "[1, 2, 3]"
          ],
          respostaCorreta: 0,
          explicacao: "Começa em 1; soma 3 -> 4; soma 3 -> 7; o próximo seria 10, que ultrapassa o limite 9. Portanto gera [1, 4, 7]."
        }
      },
      {
        id: "aula-11",
        unidadeId: "unidade-4",
        numero: 11,
        titulo: "Listas e Manipulação de Índices em Python",
        tempo: "20 min",
        teoria: `
          <p>Uma <strong>lista</strong> é uma estrutura de dados dinâmica, ordenada e mutável capaz de armazenar múltiplos elementos em uma única variável.</p>
          <p>No Python, a indexação começa rigorosamente em <strong>zero [0]</strong>:</p>
          <ul class="lesson-list">
            <li>Primeiro elemento: <code>lista[0]</code></li>
            <li>Último elemento: <code>lista[-1]</code> (índices negativos contam de trás para frente!)</li>
            <li>Comprimento da lista: <code>len(lista)</code></li>
            <li>Adicionar item ao final: <code>lista.append(item)</code></li>
            <li>Remover item: <code>lista.pop()</code> ou <code>lista.remove(valor)</code></li>
          </ul>
        `,
        exemploPython: `servidores = ["web-prod-01", "db-primary", "cache-redis"]

# Adicionando novo nó
servidores.append("auth-service")

print(f"Total de nós ativos: {len(servidores)}")
print(f"Nó primário: {servidores[0]}")
print(f"Último nó provisionado: {servidores[-1]}")`,
        explicacaoCodigo: "O método append insere 'auth-service' na 4ª posição (índice 3). O índice -1 acessa diretamente o último elemento da lista.",
        miniExercicio: {
          pergunta: "Se temos valores = [10, 20, 30, 40], qual será o resultado de valores[2]?",
          opcoes: [
            "20",
            "30",
            "40",
            "10"
          ],
          respostaCorreta: 1,
          explicacao: "Os índices são: [0]=10, [1]=20, [2]=30, [3]=40. Portanto valores[2] é 30."
        }
      },
      {
        id: "aula-12",
        unidadeId: "unidade-4",
        numero: 12,
        titulo: "Matrizes, Diagonal Principal e Secundária",
        tempo: "25 min",
        teoria: `
          <p>Uma <strong>matriz</strong> é uma estrutura bidimensional composta por linhas e colunas (uma lista de listas). O acesso a um elemento específico é feito por dois índices: <code>matriz[linha][coluna]</code>, comumente chamados de <code>i</code> e <code>j</code>.</p>
          <p>Em uma <strong>matriz quadrada de ordem N</strong> (onde número de linhas é igual ao de colunas):</p>
          <ul class="lesson-list">
            <li><strong>Diagonal Principal:</strong> São os elementos onde a linha é estritamente igual à coluna: <code>i == j</code>.</li>
            <li><strong>Diagonal Secundária:</strong> São os elementos onde a soma dos índices é igual ao tamanho menos um: <code>i + j == N - 1</code>.</li>
          </ul>
          <p>Esse é o clássico fundamento de problemas de maratona como o <em>BeeCrowd 1534 (Matriz 123)</em>!</p>
        `,
        exemploPython: `# Construindo uma matriz 4x4 destacando as diagonais (Estilo BeeCrowd 1534)
N = 4
matriz = []

for i in range(N):
    linha = []
    for j in range(N):
        if i + j == N - 1:
            linha.append(2)  # Diagonal Secundária tem prioridade no problema 1534
        elif i == j:
            linha.append(1)  # Diagonal Principal
        else:
            linha.append(3)  # Demais posições
    matriz.append(linha)

# Exibição formatada
for lin in matriz:
    print(" ".join(str(x) for x in lin))`,
        explicacaoCodigo: "O laço aninhado percorre cada coordenada (i, j). Se i + j == N - 1 recebe 2; se i == j recebe 1; caso contrário recebe 3.",
        miniExercicio: {
          pergunta: "Em uma matriz quadrada de ordem N = 5, qual coordenada pertence à diagonal principal e secundária ao mesmo tempo (o centro)?",
          opcoes: [
            "Linha 2, Coluna 2 (índices i=2, j=2)",
            "Linha 3, Coluna 3 (índices i=3, j=3)",
            "Linha 0, Coluna 4 (índices i=0, j=4)",
            "Linha 1, Coluna 1 (índices i=1, j=1)"
          ],
          respostaCorreta: 0,
          explicacao: "Em N=5 (índices 0, 1, 2, 3, 4), para i=2 e j=2: i == j (2==2) e i+j == 5-1 (2+2 == 4). É o elemento central!"
        }
      },
      {
        id: "aula-13",
        unidadeId: "unidade-4",
        numero: 13,
        titulo: "Algoritmo Bubble Sort: Comparações e Trocas",
        tempo: "25 min",
        teoria: `
          <p>O <strong>Bubble Sort</strong> (Ordenação por Bolha) é um dos algoritmos de ordenação mais intuitivos e fundamentais da ciência da computação.</p>
          <p>Como ele funciona passo a passo:</p>
          <ul class="lesson-list">
            <li>Ele percorre a lista comparando elementos adjacentes (vizinhos): <code>lista[j]</code> com <code>lista[j+1]</code>.</li>
            <li>Se o elemento da esquerda for maior que o da direita, eles <strong>trocam de lugar</strong> (swap).</li>
            <li>Ao final da primeira passagem, o maior elemento terá "flutuado" como uma bolha até o final da lista.</li>
            <li>O processo se repete para os elementos restantes até que nenhuma troca seja necessária.</li>
            <li>Complexidade de tempo: <code>O(n²)</code> no pior e médio caso.</li>
          </ul>
        `,
        exemploPython: `def bubble_sort(lista):
    n = len(lista)
    # Passagens pela lista
    for i in range(n):
        trocou = False
        # Comparações entre vizinhos
        for j in range(0, n - i - 1):
            if lista[j] > lista[j + 1]:
                # Troca simultânea em Python
                lista[j], lista[j + 1] = lista[j + 1], lista[j]
                trocou = True
        # Se não houve nenhuma troca, já está ordenado!
        if not trocou:
            break
    return lista

dados = [64, 34, 25, 12, 22, 11, 90]
print("Antes: ", dados)
ordenado = bubble_sort(dados)
print("Depois:", ordenado)`,
        explicacaoCodigo: "O truque 'lista[j], lista[j+1] = lista[j+1], lista[j]' realiza a troca sem precisar de variável temporária em Python. A flag 'trocou' otimiza o algoritmo caso a lista já esteja ordenada.",
        miniExercicio: {
          pergunta: "Em uma lista com 5 elementos [5, 1, 4, 2, 8], quantos elementos mudam de lugar na PRIMEIRA passagem do Bubble Sort ao comparar 5 e 1?",
          opcoes: [
            "O 5 e o 1 trocam de posição, virando [1, 5, 4, 2, 8]",
            "Nenhum, pois 5 é maior",
            "A lista inteira inverte de uma vez",
            "O elemento 8 é movido para o início"
          ],
          respostaCorreta: 0,
          explicacao: "Como 5 > 1, a regra do Bubble Sort determina a troca imediata entre os dois vizinhos."
        }
      }
    ],
    // Simulado relâmpago da apostila
    simuladoRelampago: [
      {
        pergunta: "Qual é a estrutura básica que divide um problema em passos lógicos finitos?",
        opcoes: ["Compilador", "Algoritmo", "Hard Disk", "Firewall"],
        correta: 1,
        comentario: "Um algoritmo é uma sequência finita de passos lógicos para resolver um problema."
      },
      {
        pergunta: "Em Python, qual é o tipo de dado resultante da função input() sem conversão?",
        opcoes: ["int", "float", "str", "boolean"],
        correta: 2,
        comentario: "A função input() sempre captura o que o usuário digita como texto (string)."
      },
      {
        pergunta: "Se nota = 7 e frequencia = 80, o que resulta: nota >= 7 and frequencia >= 75?",
        opcoes: ["True", "False", "None", "Erro"],
        correta: 0,
        comentario: "Ambas as condições são verdadeiras (7>=7 é True e 80>=75 é True). True and True = True."
      },
      {
        pergunta: "Qual função gera uma sequência de números para ser iterada no for?",
        opcoes: ["sequence()", "range()", "generate()", "loop()"],
        correta: 1,
        comentario: "A função range() gera sequências aritméticas personalizadas de números inteiros."
      },
      {
        pergunta: "Em uma lista com 10 elementos, qual é o índice do primeiro e do último elemento?",
        opcoes: ["1 e 10", "0 e 9", "0 e 10", "-1 e 0"],
        correta: 1,
        comentario: "No Python a indexação inicia em 0, logo o primeiro é 0 e o décimo é 9."
      },
      {
        pergunta: "O que caracteriza a diagonal principal de uma matriz quadrada?",
        opcoes: ["i != j", "i == j", "i + j == N - 1", "i > j"],
        correta: 1,
        comentario: "Na diagonal principal, o índice da linha (i) é sempre igual ao da coluna (j)."
      },
      {
        pergunta: "Qual é a complexidade de tempo média do algoritmo Bubble Sort?",
        opcoes: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        correta: 2,
        comentario: "O Bubble Sort possui complexidade quadrática O(n²) no caso médio e pior caso devido aos dois laços aninhados."
      },
      {
        pergunta: "Qual operador devolve o resto de uma divisão inteira em Python?",
        opcoes: ["//", "%", "**", "/"],
        correta: 1,
        comentario: "O símbolo de porcentagem (%) é o operador de módulo que calcula o resto da divisão."
      }
    ]
  },

  // 2. LINGUAGENS DE PROGRAMAÇÃO DO MUNDO (25 LINGUAGENS COMPLETAS)
  linguagens: [
    {
      "id": "html",
      "nome": "HTML",
      "utilizacaoPrincipal": "Estrutura de páginas web",
      "criador": "Tim Berners-Lee",
      "ano": 1993,
      "badge": "Base da Web",
      "categorias": [
        "web"
      ],
      "nivel": "Iniciante",
      "icone": "🌐",
      "cor": "#E34F26",
      "descricao": "A espinha dorsal de toda a internet. Linguagem de marcação fundamental que define a arquitetura, blocos semânticos, formulários e acessibilidade de todas as páginas web do mundo.",
      "ondeUsa": "100% dos websites e sistemas web do planeta (Google, Meta, Wikipedia, Amazon)",
      "pros": [
        "Extremamente simples de aprender e dominar",
        "Semântica moderna com HTML5 (nav, article, section)",
        "Suportado nativamente por todos os navegadores"
      ],
      "contras": [
        "Não possui lógica algorítmica pura",
        "Depende de CSS para estilo e JavaScript para dinamismo"
      ],
      "helloWorld": "<!DOCTYPE html>\n<html lang=\"pt-BR\">\n  <head><title>TechLab</title></head>\n  <body>\n    <h1>Hello, World! A web começa aqui.</h1>\n  </body>\n</html>",
      "specs": {
        "execucao": "Parseado pelo motor do navegador (HTML Parser & DOM)",
        "tipagem": "Marcação Semântica Declarativa",
        "memoria": "Árvore DOM gerenciada pelo Browser",
        "paradigma": "Marcação Hipertexto Declarativa",
        "ext": "html",
        "funcionamento": "O navegador faz o download do arquivo .html, tokeniza cada elemento e constrói na memória a árvore de nós do Document Object Model (DOM), preparando a estrutura para receber estilo e comportamento."
      }
    },
    {
      "id": "css",
      "nome": "CSS",
      "utilizacaoPrincipal": "Estilização de sites",
      "criador": "Håkon Wium Lie",
      "ano": 1996,
      "badge": "Design & Estilo",
      "categorias": [
        "web"
      ],
      "nivel": "Iniciante",
      "icone": "🎨",
      "cor": "#1572B6",
      "descricao": "Linguagem de folhas de estilo responsável pela camada visual, design responsivo, animações aceleradas por GPU, layouts modernos com Flexbox e CSS Grid em websites e apps.",
      "ondeUsa": "Todos os sites e aplicações visuais da internet, design systems modernos como Tailwind e Bootstrap",
      "pros": [
        "Motores de layout revolucionários (Flexbox e Grid)",
        "Animações fluidas a 60fps sem sobrecarregar a CPU",
        "Variáveis CSS nativas para temas dinâmicos"
      ],
      "contras": [
        "Especificidade de seletores pode criar conflitos em bases legadas",
        "Diferenças sutis entre motores de renderização"
      ],
      "helloWorld": "/* Estilização moderna no TechLab */\n.card-tech {\n  display: flex;\n  background: #0ea5e9;\n  color: #ffffff;\n  border-radius: 12px;\n  padding: 1.5rem;\n}",
      "specs": {
        "execucao": "Render Engine do Browser (CSSOM)",
        "tipagem": "Folhas de Estilo Declarativas",
        "memoria": "Árvore CSSOM unida ao Render Tree",
        "paradigma": "Regras Declarativas em Cascata",
        "ext": "css",
        "funcionamento": "O motor do navegador compila o CSS em uma árvore CSSOM (CSS Object Model), cruza com o DOM gerando a Render Tree, computa as geometrias físicas (Layout) e pinta os pixels na tela (Paint)."
      }
    },
    {
      "id": "javascript",
      "nome": "JavaScript",
      "utilizacaoPrincipal": "Sites e aplicações interativas",
      "criador": "Brendan Eich",
      "ano": 1995,
      "badge": "Linguagem da Web",
      "categorias": [
        "web",
        "backend"
      ],
      "nivel": "Iniciante",
      "icone": "⚡",
      "cor": "#F7DF1E",
      "descricao": "A linguagem de programação mais popular do planeta. Roda nativamente em qualquer navegador e no backend via Node.js/Bun, criando desde micro-interações até aplicações completas.",
      "ondeUsa": "Meta, Google, Uber, Netflix, Airbnb, Amazon e praticamente qualquer produto digital moderno",
      "pros": [
        "Onipresente: roda no cliente e no servidor",
        "Maior ecossistema de pacotes do mundo (npm)",
        "Ideal para interfaces dinâmicas em tempo real"
      ],
      "contras": [
        "Tipagem dinâmica e coerções implícitas",
        "Single-threaded por padrão no Event Loop"
      ],
      "helloWorld": "// JavaScript moderno\nconst app = \"TechLab\";\nconsole.log(`Hello, World! Criando sistemas interativos com ${app}.`);",
      "specs": {
        "execucao": "JIT Compiler (Google V8, SpiderMonkey, JSC)",
        "tipagem": "Dinâmica e Fraca",
        "memoria": "Garbage Collection automático (Mark & Sweep)",
        "paradigma": "Multiparadigma (Event-Driven, Funcional, Objetos)",
        "ext": "js",
        "funcionamento": "O código é tokenizado e transformado em AST. O interpretador Ignition gera bytecode rapidamente, e trechos críticos (hot code) são compilados diretamente para código de máquina puro pelo compilador TurboFan."
      }
    },
    {
      "id": "typescript",
      "nome": "TypeScript",
      "utilizacaoPrincipal": "Desenvolvimento web e sistemas",
      "criador": "Anders Hejlsberg (Microsoft)",
      "ano": 2012,
      "badge": "JavaScript Tipado",
      "categorias": [
        "web"
      ],
      "nivel": "Intermediário",
      "icone": "📘",
      "cor": "#3178C6",
      "descricao": "Superset tipado do JavaScript criado pela Microsoft. Adiciona verificação estática de tipos, interfaces e contratos em tempo de compilação, eliminando bugs antes do código ir para produção.",
      "ondeUsa": "Microsoft, Slack, Vercel, Shopify, Airbnb, Google (Angular)",
      "pros": [
        "Autocompletion e refatoração perfeitas nas IDEs",
        "Prevenção de 80%+ dos erros comuns de tipagem",
        "Converte para JavaScript puro e limpo"
      ],
      "contras": [
        "Requer etapa de compilação (tsc / bundler)",
        "Curva inicial de generics e interfaces avançadas"
      ],
      "helloWorld": "// TypeScript no TechLab\ninterface Usuario {\n  nome: string;\n  ativo: boolean;\n}\nconst dev: Usuario = { nome: \"Estudante\", ativo: true };\nconsole.log(`Dev ${dev.nome} validado com tipagem estática!`);",
      "specs": {
        "execucao": "Transpilado para JavaScript (Type Erasure)",
        "tipagem": "Estática, Gradual e Estrutural",
        "memoria": "Gerenciada pelo runtime alvo (V8 / Node.js)",
        "paradigma": "Orientado a Objetos, Funcional e Genéricos",
        "ext": "ts",
        "funcionamento": "O compilador 'tsc' analisa o código e confere os tipos em tempo de edição/build. Concluída a validação sem erros, todos os tipos são removidos (type erasure), gerando JavaScript padrão ultrarrápido."
      }
    },
    {
      "id": "python",
      "nome": "Python e Pygames",
      "utilizacaoPrincipal": "IA, automação, dados e sistemas",
      "criador": "Guido van Rossum",
      "ano": 1991,
      "badge": "IA & Automação",
      "categorias": [
        "ia",
        "backend",
        "dados",
        "seguranca"
      ],
      "nivel": "Iniciante",
      "icone": "🐍",
      "cor": "#3776AB",
      "descricao": "A linguagem número um para Inteligência Artificial, Ciência de Dados, automação, scripts de segurança e desenvolvimento de jogos com Pygame. Famosa por sua sintaxe limpa e leitura quase em inglês.",
      "ondeUsa": "OpenAI, Google DeepMind, Netflix, NASA, Spotify, Instagram, Meta",
      "pros": [
        "Sintaxe cristalina e aprendizado muito rápido",
        "Maior ecossistema de IA e Dados (PyTorch, Pandas, Pygame, Scikit)",
        "Comunidade colossal e documentação impecável"
      ],
      "contras": [
        "Execução mais lenta que C ou Rust (interpretada)",
        "Uso maior de memória e GIL (Global Interpreter Lock)"
      ],
      "helloWorld": "# Python e Pygame no TechLab\nimport sys\n\ndef iniciar():\n    mensagem = \"Python & Pygames: IA, automação e desenvolvimento de jogos!\"\n    print(mensagem)\n\nif __name__ == \"__main__\":\n    iniciar()",
      "specs": {
        "execucao": "Compilada para Bytecode (.pyc) e interpretada pela PVM",
        "tipagem": "Dinâmica e Forte",
        "memoria": "Garbage Collector com Contagem de Referências",
        "paradigma": "Multiparadigma (Imperativo, OO, Funcional)",
        "ext": "py",
        "funcionamento": "O código .py é traduzido pelo CPython em uma representação intermediária compacta de Bytecode (.pyc). A Máquina Virtual Python (PVM) executa cada instrução de forma segura e multiplataforma."
      }
    },
    {
      "id": "java",
      "nome": "Java",
      "utilizacaoPrincipal": "Aplicativos e sistemas empresariais",
      "criador": "James Gosling (Sun Microsystems)",
      "ano": 1995,
      "badge": "Padrão Corporativo",
      "categorias": [
        "backend"
      ],
      "nivel": "Intermediário",
      "icone": "☕",
      "cor": "#ED8B00",
      "descricao": "Linguagem fortemente tipada e orientada a objetos que roda sobre a JVM. É a espinha dorsal de sistemas bancários, transações de altíssima escala e grandes corporações globais.",
      "ondeUsa": "Bancos (Nubank, Itaú), Amazon, LinkedIn, Uber, ecossistema Android corporativo",
      "pros": [
        "Write once, run anywhere (JVM)",
        "Spring Boot: o padrão de ouro para microsserviços seguros",
        "Gerenciamento de memória e multithreading extremamente maduros"
      ],
      "contras": [
        "Sintaxe mais verbosa que Python ou Go",
        "Tempo de inicialização e footprint de memória da JVM"
      ],
      "helloWorld": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World! Sistemas empresariais seguros em Java.\");\n    }\n}",
      "specs": {
        "execucao": "Bytecode na JVM (HotSpot JIT Compiler)",
        "tipagem": "Estática e Orientada a Objetos",
        "memoria": "Garbage Collection moderno (G1, ZGC)",
        "paradigma": "Orientado a Objetos, Funcional (Lambdas)",
        "ext": "java",
        "funcionamento": "O código fonte Java é compilado em bytecode (.class). A JVM carrega as classes e o motor HotSpot JIT detecta as áreas mais executadas (hot spots), convertendo-as em código de máquina nativo."
      }
    },
    {
      "id": "c",
      "nome": "C",
      "utilizacaoPrincipal": "Sistemas operacionais e baixo nível",
      "criador": "Dennis Ritchie (Bell Labs)",
      "ano": 1972,
      "badge": "Pai da Computação",
      "categorias": [
        "so",
        "seguranca"
      ],
      "nivel": "Avançado",
      "icone": "⚙️",
      "cor": "#A8B9CC",
      "descricao": "A linguagem mãe da computação moderna. Usada para escrever o Kernel do Linux, Windows, macOS, drivers de hardware, sistemas embarcados e motores de bancos de dados.",
      "ondeUsa": "Kernel Linux, Git, NGINX, SQLite, sistemas automotivos e aeroespaciais",
      "pros": [
        "Velocidade de execução máxima e controle total de hardware",
        "Acesso direto a ponteiros e registradores",
        "Compilador disponível para qualquer microprocessador"
      ],
      "contras": [
        "Sem garbage collector (gerenciamento manual com malloc/free)",
        "Risco de bugs críticos de memória (Buffer Overflow)"
      ],
      "helloWorld": "#include <stdio.h>\n\nint main(void) {\n    printf(\"Hello, World! Controle absoluto de memória em C.\\n\");\n    return 0;\n}",
      "specs": {
        "execucao": "Compilação nativa para código de máquina (GCC, Clang)",
        "tipagem": "Estática e Fraca (aritmética de ponteiros)",
        "memoria": "Manual (Stack & Heap via malloc/free)",
        "paradigma": "Procedural e Imperativo Estruturado",
        "ext": "c",
        "funcionamento": "O código é pré-processado (#include, macros), compilado para Assembly da arquitetura alvo (x86_64, ARM) e linkado em um binário executável ELF ou PE que conversa diretamente com a CPU."
      }
    },
    {
      "id": "cpp",
      "nome": "C++",
      "utilizacaoPrincipal": "Jogos, softwares e sistemas",
      "criador": "Bjarne Stroustrup",
      "ano": 1985,
      "badge": "Alta Performance",
      "categorias": [
        "jogos",
        "so",
        "seguranca"
      ],
      "nivel": "Avançado",
      "icone": "🚀",
      "cor": "#00599C",
      "descricao": "Extensão de alta performance de C com suporte a orientação a objetos, templates genéricos e abstrações de custo zero. A escolha primária para motores de jogos AAA (Unreal Engine) e sistemas gráficos.",
      "ondeUsa": "Unreal Engine, Adobe Photoshop, navegadores (Chrome, Firefox), mercados financeiros de alta frequência",
      "pros": [
        "Zero-cost abstractions: recursos avançados sem perda de velocidade",
        "Padrão indiscutível da indústria de games pesados",
        "Controle de baixo nível com RAII moderno"
      ],
      "contras": [
        "Linguagem imensa com alta complexidade sintática",
        "Tempos de compilação longos em projetos corporativos"
      ],
      "helloWorld": "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World! Jogos AAA e alta performance com C++!\" << std::endl;\n    return 0;\n}",
      "specs": {
        "execucao": "Compilação Nativa (Clang, MSVC, GCC)",
        "tipagem": "Estática, Forte e Genérica",
        "memoria": "RAII e Smart Pointers (sem GC)",
        "paradigma": "Multiparadigma (OO, Genérico, Funcional)",
        "ext": "cpp",
        "funcionamento": "O código C++ passa por análise e expansão de templates. O compilador gera código de máquina otimizado com vetorização SIMD e otimizações pesadas de registradores."
      }
    },
    {
      "id": "csharp",
      "nome": "C#",
      "utilizacaoPrincipal": "Jogos, aplicações e sistemas",
      "criador": "Anders Hejlsberg (Microsoft)",
      "ano": 2000,
      "badge": "Games & .NET",
      "categorias": [
        "jogos"
      ],
      "nivel": "Intermediário",
      "icone": "🎯",
      "cor": "#239120",
      "descricao": "Linguagem moderna e elegante da Microsoft, amplamente utilizada no desenvolvimento de jogos através da Unity Engine e no desenvolvimento de APIs de alto desempenho com .NET Core.",
      "ondeUsa": "Unity Engine (jogos mobile e PC), Microsoft, Stack Overflow, bancos digitais",
      "pros": [
        "Linguagem oficial da Unity Engine para jogos",
        "Plataforma .NET Core multiplataforma e ultrarrápida",
        "Sintaxe moderna com LINQ, async/await e records"
      ],
      "contras": [
        "Dependência de ecossistema .NET",
        "Garbage collection pode requerer atenção em games competitivos"
      ],
      "helloWorld": "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, World! Criando jogos e sistemas com C#!\");\n    }\n}",
      "specs": {
        "execucao": "Bytecode CIL no .NET CLR (JIT / AOT)",
        "tipagem": "Estática, Forte e Segura",
        "memoria": "Garbage Collection gerenciado por gerações",
        "paradigma": "Orientado a Objetos, Funcional e Declarativo",
        "ext": "cs",
        "funcionamento": "O compilador Roslyn transforma o código C# em Common Intermediate Language (CIL). O runtime do .NET Core compila o CIL para código nativo no primeiro disparo via JIT RyuJIT."
      }
    },
    {
      "id": "php",
      "nome": "PHP",
      "utilizacaoPrincipal": "Desenvolvimento web e back-end",
      "criador": "Rasmus Lerdorf",
      "ano": 1995,
      "badge": "Motor da Web",
      "categorias": [
        "web",
        "backend"
      ],
      "nivel": "Iniciante",
      "icone": "🐘",
      "cor": "#777BB4",
      "descricao": "A linguagem que move mais de 75% dos sites da internet. Muito rápida de hospedar, move o WordPress, Wikipédia e grandes portais com o moderno ecossistema Laravel.",
      "ondeUsa": "WordPress, Wikipédia, Facebook (origens), Slack (backend legado), Laravel apps",
      "pros": [
        "Extremamente fácil e barato de hospedar em qualquer servidor",
        "Laravel é um dos frameworks web mais adorados do mundo",
        "PHP 8+ possui JIT compiler com ótimo desempenho"
      ],
      "contras": [
        "Histórico de funções legadas inconsistentes no core",
        "Gargalos em aplicações com concorrência stateful massiva"
      ],
      "helloWorld": "<?php\n$mensagem = \"Hello, World! Back-end dinâmico e veloz com PHP 8.\";\necho $mensagem . \"\\n\";\n?>",
      "specs": {
        "execucao": "Zend Engine com JIT (PHP 8+)",
        "tipagem": "Gradual, Dinâmica com Tipos Estritos",
        "memoria": "Contagem de referências + Ciclo de vida por requisição",
        "paradigma": "Imperativo, Orientado a Objetos",
        "ext": "php",
        "funcionamento": "O interpretador Zend compila os scripts PHP em opcodes na inicialização da requisição. Com o OPcache ativo, os opcodes ficam em memória compartilhada acelerando respostas web."
      }
    },
    {
      "id": "ruby",
      "nome": "Ruby",
      "utilizacaoPrincipal": "Desenvolvimento web",
      "criador": "Yukihiro Matsumoto (Matz)",
      "ano": 1995,
      "badge": "Foco no Dev",
      "categorias": [
        "web"
      ],
      "nivel": "Intermediário",
      "icone": "💎",
      "cor": "#CC342D",
      "descricao": "Criada sob a filosofia de maximizar a felicidade do desenvolvedor. Conhecida mundialmente pelo framework Ruby on Rails, permitindo criar startups completas em semanas.",
      "ondeUsa": "GitHub, Shopify, Airbnb, Basecamp, Twitch, Kickstarter",
      "pros": [
        "Produtividade extrema de desenvolvimento",
        "Ruby on Rails é uma máquina de validar produtos e MVPs",
        "Sintaxe fluida e legível"
      ],
      "contras": [
        "Velocidade bruta de processamento menor que Go ou Java",
        "Consumo considerável de memória"
      ],
      "helloWorld": "# Ruby no TechLab\nmensagem = \"Hello, World! Felicidade e produtividade no desenvolvimento web.\"\nputs mensagem",
      "specs": {
        "execucao": "YARV (Yet Another Ruby VM)",
        "tipagem": "Dinâmica, Forte e Pura de Objetos",
        "memoria": "Garbage Collection automático",
        "paradigma": "Orientado a Objetos Puro, Funcional",
        "ext": "rb",
        "funcionamento": "No Ruby, absolutamente tudo é um objeto (inclusive números e nil). O interpretador converte o código em instruções da máquina virtual YARV com foco na expressividade humana."
      }
    },
    {
      "id": "go",
      "nome": "Go (Golang)",
      "utilizacaoPrincipal": "Back-end, servidores e infraestrutura",
      "criador": "Robert Griesemer, Rob Pike, Ken Thompson (Google)",
      "ano": 2009,
      "badge": "Cloud & Microsserviços",
      "categorias": [
        "backend"
      ],
      "nivel": "Intermediário",
      "icone": "🐹",
      "cor": "#00ADD8",
      "descricao": "Criada pelo Google para simplificar sistemas distribuídos massivos. É a linguagem que deu vida a ferramentas como Docker, Kubernetes e microsserviços modernos de cloud.",
      "ondeUsa": "Google, Uber, Netflix, Mercado Livre, Docker, Kubernetes, Cloudflare",
      "pros": [
        "Concorrência ultra leve com Goroutines (milhares por processo)",
        "Compilação instantânea em binário único sem dependências",
        "Sintaxe limpa com apenas 25 palavras-chave"
      ],
      "contras": [
        "Tratamento de erros repetitivo (if err != nil)",
        "Falta de herança tradicional (usa composição de interfaces)"
      ],
      "helloWorld": "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, World! Back-end e infraestrutura em Go.\")\n}",
      "specs": {
        "execucao": "Compilação Nativa Direta para Binário Único",
        "tipagem": "Estática, Forte e Estrutural",
        "memoria": "Garbage Collection concorrente de baixa latência (<1ms)",
        "paradigma": "Procedural, Concorrente (CSP Channels)",
        "ext": "go",
        "funcionamento": "O compilador Go gera um binário estático auto-contido com o runtime embutido. As Goroutines são multiplexadas sobre threads do sistema operacional por um scheduler em modo usuário."
      }
    },
    {
      "id": "rust",
      "nome": "Rust",
      "utilizacaoPrincipal": "Sistemas e aplicações de alto desempenho",
      "criador": "Graydon Hoare (Mozilla)",
      "ano": 2010,
      "badge": "Segurança de Memória",
      "categorias": [
        "so"
      ],
      "nivel": "Avançado",
      "icone": "🦀",
      "cor": "#DEA584",
      "descricao": "Eleita a linguagem mais amada por programadores por múltiplos anos consecutivos. Entrega o desempenho de C/C++ com garantia matemática de segurança de memória sem garbage collector através do modelo de Ownership.",
      "ondeUsa": "Mozilla, Microsoft (Kernel Windows), Meta, AWS, Cloudflare, Discord",
      "pros": [
        "Desempenho equivalente ou superior a C/C++",
        "Sem Garbage Collector e sem risco de vazamentos de memória",
        "Concorrência sem medo (fearless concurrency)"
      ],
      "contras": [
        "Curva de aprendizado íngreme (Borrow Checker)",
        "Tempos de compilação mais lentos"
      ],
      "helloWorld": "// Rust no TechLab\nfn main() {\n    println!(\"Hello, World! Alto desempenho e segurança de memória absoluta.\");\n}",
      "specs": {
        "execucao": "Compilação Nativa via LLVM",
        "tipagem": "Estática, Forte, com Inferência e Tipos Algébricos",
        "memoria": "Ownership e Borrowing (zero GC)",
        "paradigma": "Multiparadigma (Funcional, Imperativo, Trait-Based)",
        "ext": "rs",
        "funcionamento": "O compilador rustc verifica a posse de memória e empréstimos (ownership/borrowing) em tempo de compilação. Se o código compilar, garante que não haverá null pointers ou data races em runtime."
      }
    },
    {
      "id": "swift",
      "nome": "Swift",
      "utilizacaoPrincipal": "Aplicativos para iOS",
      "criador": "Chris Lattner (Apple)",
      "ano": 2014,
      "badge": "Ecossistema Apple",
      "categorias": [
        "mobile"
      ],
      "nivel": "Intermediário",
      "icone": "🍎",
      "cor": "#F05138",
      "descricao": "A linguagem moderna e oficial da Apple para construir aplicativos para iPhone, iPad, Mac, Apple Watch e Apple Vision Pro com o framework SwiftUI.",
      "ondeUsa": "Apple, Uber iOS, Instagram iOS, Nubank iOS, Duolingo, Airbnb",
      "pros": [
        "SwiftUI: interface declarativa impressionante e fluida",
        "Sintaxe limpa, expressiva e segura contra ponteiros nulos",
        "Altíssimo desempenho nativo com LLVM"
      ],
      "contras": [
        "Ecossistema fortemente atrelado ao mundo Apple",
        "Suporte no Linux e Windows ainda em amadurecimento"
      ],
      "helloWorld": "import Foundation\n\nlet saudacao = \"Hello, World! Criando apps inovadores para iPhone com Swift.\"\nprint(saudacao)",
      "specs": {
        "execucao": "Compilação Nativa via LLVM",
        "tipagem": "Estática, Forte e Segura (Optionais)",
        "memoria": "ARC (Automatic Reference Counting) determinístico",
        "paradigma": "Protocol-Oriented, Declarativo, Funcional",
        "ext": "swift",
        "funcionamento": "O código Swift é compilado para código de máquina nativo pelo LLVM. A memória é gerenciada deterministicamente através de ARC (Automatic Reference Counting), sem pausas de Garbage Collector."
      }
    },
    {
      "id": "kotlin",
      "nome": "Kotlin",
      "utilizacaoPrincipal": "Aplicativos Android",
      "criador": "JetBrains",
      "ano": 2011,
      "badge": "Oficial Android",
      "categorias": [
        "mobile"
      ],
      "nivel": "Intermediário",
      "icone": "📱",
      "cor": "#7F52FF",
      "descricao": "A linguagem oficial recomendada pelo Google para desenvolvimento de aplicativos Android modernos com Jetpack Compose. Combina elegância, segurança contra null e 100% de interoperabilidade com Java.",
      "ondeUsa": "Google, Pinterest, Uber Android, Nubank, Netflix Android, Twitter",
      "pros": [
        "Linguagem oficial do Google para Android",
        "Jetpack Compose: desenvolvimento declarativo de UI",
        "Prevenção nativa de NullPointerException no compilador"
      ],
      "contras": [
        "Tempo de compilação ligeiramente maior que Java puro",
        "Comunidade backend menor que Java puro"
      ],
      "helloWorld": "fun main() {\n    val app = \"Android Moderno\"\n    println(\"Hello, World! Desenvolvendo aplicativos para $app com Kotlin.\")\n}",
      "specs": {
        "execucao": "Bytecode JVM e Nativo (Kotlin Multiplatform)",
        "tipagem": "Estática, com Null-Safety nativa no sistema de tipos",
        "memoria": "Gerenciada pelo runtime da JVM / Android ART",
        "paradigma": "Orientado a Objetos e Funcional",
        "ext": "kt",
        "funcionamento": "O compilador kotlinc compila o código para bytecode compatível com a JVM e Android Runtime (ART), além de suportar compilação nativa para iOS e WebAssembly com Kotlin Multiplatform."
      }
    },
    {
      "id": "dart",
      "nome": "Dart",
      "utilizacaoPrincipal": "Aplicativos com Flutter",
      "criador": "Lars Bak e Kasper Lund (Google)",
      "ano": 2011,
      "badge": "Ecossistema Flutter",
      "categorias": [
        "mobile"
      ],
      "nivel": "Iniciante",
      "icone": "🎯",
      "cor": "#0175C2",
      "descricao": "Linguagem desenvolvida pelo Google que serve de base para o Flutter, permitindo compilar código único nativo para iOS, Android, Web e Desktop com Hot Reload instantâneo.",
      "ondeUsa": "Google Pay, Nubank, BMW, eBay, Alibaba (apps com Flutter)",
      "pros": [
        "Hot Reload revolucionário: mudanças na tela em menos de 1 segundo",
        "Compila nativamente com performance a 60fps/120fps",
        "Base de código única para Android e iOS"
      ],
      "contras": [
        "Ecossistema muito dependente do framework Flutter",
        "Uso raro fora do contexto de UI cross-platform"
      ],
      "helloWorld": "void main() {\n  print('Hello, World! Criando apps multiplataforma com Dart & Flutter.');\n}",
      "specs": {
        "execucao": "JIT no desenvolvimento (Hot Reload) e AOT em produção",
        "tipagem": "Estática, Forte e Sound Null Safety",
        "memoria": "Garbage Collector geracional de baixa pausa",
        "paradigma": "Orientado a Objetos, Funcional e UI Declarativa",
        "ext": "dart",
        "funcionamento": "Durante o desenvolvimento, roda em JIT para viabilizar Hot Reload em milissegundos. Ao gerar o app de produção, o compilador AOT (Ahead-of-Time) converte o código em binário nativo ARM da CPU."
      }
    },
    {
      "id": "r",
      "nome": "R",
      "utilizacaoPrincipal": "Estatística e análise de dados",
      "criador": "Ross Ihaka e Robert Gentleman",
      "ano": 1993,
      "badge": "Estatística Pura",
      "categorias": [
        "ia",
        "dados"
      ],
      "nivel": "Intermediário",
      "icone": "📈",
      "cor": "#276DC3",
      "descricao": "O padrão acadêmico mundial para computação estatística, bioinformática, gráficos científicos e modelagem preditiva avançada. Casa do pacote gráfico ggplot2 e Tidyverse.",
      "ondeUsa": "Universidades de ponta (Harvard, MIT), Pfizer, Anvisa, bancos centrais, institutos de pesquisa",
      "pros": [
        "Padrão definitivo para estatística descritiva e inferencial",
        "Biblioteca gráfica ggplot2 produz gráficos dignos de publicações científicas",
        "Comunidade científica global vibrante"
      ],
      "contras": [
        "Sintaxe idiossincrática comparada a linguagens genéricas",
        "Manipulação de dados em memória limitada para datasets massivos"
      ],
      "helloWorld": "# R no TechLab\ndados <- c(10, 25, 40, 55, 90)\ncat(\"Hello, World! Média calculada:\", mean(dados), \"\\n\")",
      "specs": {
        "execucao": "Interpretada (R Core Engine)",
        "tipagem": "Dinâmica e Vetorizada por Padrão",
        "memoria": "Totalmente em RAM (In-Memory)",
        "paradigma": "Funcional, Orientado a Objetos (S3, S4, R6)",
        "ext": "r",
        "funcionamento": "Em R, a unidade fundamental de dado não é um escalar, mas um vetor. As operações são naturalmente vetorizadas e implementadas em rotinas otimizadas de C e Fortran (BLAS/LAPACK)."
      }
    },
    {
      "id": "sql",
      "nome": "SQL",
      "utilizacaoPrincipal": "Bancos de dados",
      "criador": "Donald D. Chamberlin e Raymond F. Boyce (IBM)",
      "ano": 1974,
      "badge": "Dados Relacionais",
      "categorias": [
        "banco",
        "dados"
      ],
      "nivel": "Iniciante",
      "icone": "🗄️",
      "cor": "#CC292B",
      "descricao": "Linguagem declarativa padrão mundial para gerenciar e consultar bancos de dados relacionais. Você declara o QUE deseja obter, e o motor de banco de dados escolhe o plano de execução mais eficiente.",
      "ondeUsa": "PostgreSQL, MySQL, Oracle, SQL Server, BigQuery, Snowflake, SQLite",
      "pros": [
        "Linguagem universal de dados suportada por qualquer sistema corporativo",
        "Poderosas junções (JOIN), agregações e janelas (Window Functions)",
        "Garantia ACID para integridade de transações"
      ],
      "contras": [
        "Variações e dialetos proprietários entre diferentes SGBDs",
        "Mais complexo para modelagem de grafos ou documentos não estruturados"
      ],
      "helloWorld": "-- SQL no TechLab\nSELECT \n  cargo, \n  COUNT(*) AS total_devs, \n  ROUND(AVG(salario), 2) AS media_salario\nFROM desenvolvedores\nGROUP BY cargo\nORDER BY media_salario DESC;",
      "specs": {
        "execucao": "Query Planner & Engine do Banco de Dados",
        "tipagem": "Declarativa e Relacional com Esquema Fixo",
        "memoria": "Buffer Pool e Disco gerenciados pelo SGBD",
        "paradigma": "Declarativo e Relacional Puro",
        "ext": "sql",
        "funcionamento": "O SGBD faz o parse sintático da consulta SQL, gera a árvore de álgebra relacional e o Otimizador de Consultas (Query Planner) avalia estatísticas de índices e custo em disco para executar o plano mais veloz."
      }
    },
    {
      "id": "lua",
      "nome": "Lua",
      "utilizacaoPrincipal": "Jogos e scripts",
      "criador": "Roberto Ierusalimschy, Waldemar Celes, Luiz Henrique de Figueiredo (PUC-Rio, Brasil)",
      "ano": 1993,
      "badge": "Orgulho Brasileiro",
      "categorias": [
        "jogos"
      ],
      "nivel": "Iniciante",
      "icone": "🌙",
      "cor": "#000080",
      "descricao": "Criada no Brasil na PUC-Rio, é a linguagem embutida (embedded) mais rápida e leve do mundo. Famosa por alimentar scripts no Roblox, World of Warcraft, jogos de videogame e servidores NGINX/Redis.",
      "ondeUsa": "Roblox, World of Warcraft, Angry Birds, Redis, NGINX, Corona SDK",
      "pros": [
        "Orgulho da ciência da computação brasileira",
        "Interpretador minúsculo (<300KB) e facílimo de embutir em C/C++",
        "LuaJIT é um dos compiladores JIT mais velozes já concebidos"
      ],
      "contras": [
        "Estrutura de dados unificada apenas em tabelas (tables)",
        "Índices de arrays começam em 1 (não em 0)"
      ],
      "helloWorld": "-- Lua no TechLab\nlocal tech = \"Roblox & Games\"\nprint(\"Hello, World! Scripts e jogos rápidos com Lua no \" .. tech)",
      "specs": {
        "execucao": "Máquina Virtual baseada em Registradores (Lua VM / LuaJIT)",
        "tipagem": "Dinâmica e Forte",
        "memoria": "Garbage Collection incremental (Mark & Sweep)",
        "paradigma": "Multiparadigma (Procedural, Funcional, Orientado a Dados)",
        "ext": "lua",
        "funcionamento": "A máquina virtual de Lua utiliza uma arquitetura baseada em registradores (ao contrário da maioria das VMs baseadas em pilha), o que reduz drasticamente o número de instruções de bytecode e garante altíssima velocidade."
      }
    },
    {
      "id": "perl",
      "nome": "Perl",
      "utilizacaoPrincipal": "Automação e processamento de textos",
      "criador": "Larry Wall",
      "ano": 1987,
      "badge": "Texto & Sysadmin",
      "categorias": [],
      "nivel": "Intermediário",
      "icone": "🐪",
      "cor": "#39457E",
      "descricao": "Conhecida como o 'canivete suíço' dos administradores de sistemas Unix. Revolucionou o processamento de expressões regulares (PCRE) e automação de servidores nas primeiras décadas da web.",
      "ondeUsa": "Infraestruturas legadas de telecom, scripts de migração de dados e ferramentas Linux",
      "pros": [
        "Poder incomparável para expressões regulares (criou o padrão PCRE)",
        "Lema 'There is more than one way to do it' (TMTOWTDI)",
        "Excelente para automação de tarefas em massa"
      ],
      "contras": [
        "Código pode se tornar de difícil leitura ('write-only language')",
        "Perdeu espaço moderno para Python e Go"
      ],
      "helloWorld": "#!/usr/bin/perl\nuse strict;\nuse warnings;\n\nmy $saudacao = \"Hello, World! Processando textos e automação com Perl.\";\nprint \"$saudacao\\n\";",
      "specs": {
        "execucao": "Compilada para Bytecode em memória e executada pelo interpretador",
        "tipagem": "Dinâmica com Sigils ($, @, %)",
        "memoria": "Contagem de referências",
        "paradigma": "Multiparadigma (Procedural, Funcional, Orientado a Objetos)",
        "ext": "pl",
        "funcionamento": "O código Perl é compilado internamente em uma árvore de operações (op-tree) na primeira passada e imediatamente executado pelo motor de avaliação com otimização massiva de regex."
      }
    },
    {
      "id": "assembly",
      "nome": "Assembly",
      "utilizacaoPrincipal": "Programação de baixo nível",
      "criador": "Kathleen Booth (pioneira)",
      "ano": 1949,
      "badge": "Hardware Puro",
      "categorias": [
        "so"
      ],
      "nivel": "Avançado",
      "icone": "💾",
      "cor": "#6E4C13",
      "descricao": "A representação textual direta dos mnemônicos e instruções binárias que a CPU física realmente executa. Dá acesso imediato aos registradores, flags da CPU e barramentos da placa-mãe.",
      "ondeUsa": "Firmwares de BIOS/UEFI, bootloaders, engenharia reversa de malwares, drivers críticos",
      "pros": [
        "Entendimento definitivo e profundo de como um computador realmente opera",
        "Zero camadas de abstração entre seu código e o silício da CPU",
        "Velocidade absoluta sem nenhum overhead"
      ],
      "contras": [
        "Não é portável (código x86 não roda em ARM ou RISC-V)",
        "Extremamente trabalhoso para escrever lógicas de negócio"
      ],
      "helloWorld": "section .data\n    msg db \"Hello, World! Executando na CPU!\", 10\n    len equ $ - msg\n\nsection .text\n    global _start\n_start:\n    mov eax, 4          ; sys_write\n    mov ebx, 1          ; stdout\n    mov ecx, msg        ; ponteiro\n    mov edx, len        ; tamanho\n    int 0x80            ; interrupção do kernel",
      "specs": {
        "execucao": "Montagem Direta via Assembler (NASM, GAS)",
        "tipagem": "Sem tipos (apenas bits, bytes, words e registradores)",
        "memoria": "Registradores (RAX, RBX, RCX) e endereçamento de barramento",
        "paradigma": "Imperativo e de Baixo Nível",
        "ext": "asm",
        "funcionamento": "O montador (Assembler) substitui cada mnemônico (ex: MOV, ADD, JMP) pelo código de operação hexadecimal (Opcode) exato aceito pelos transistores da unidade de decodificação da CPU."
      }
    },
    {
      "id": "matlab",
      "nome": "MATLAB",
      "utilizacaoPrincipal": "Cálculos e engenharia",
      "criador": "Cleve Moler (MathWorks)",
      "ano": 1984,
      "badge": "Cálculo Matricial",
      "categorias": [],
      "nivel": "Intermediário",
      "icone": "📐",
      "cor": "#E16737",
      "descricao": "Ambiente e linguagem de programação desenvolvidos para computação numérica, simulação de circuitos elétricos, sistemas aeroespaciais e modelagem matricial avançada.",
      "ondeUsa": "NASA, Boeing, Tesla, Embraer, laboratórios de engenharia mecânica e telecomunicações",
      "pros": [
        "Simulink: simulação gráfica de sistemas dinâmicos e controle",
        "Toolboxes prontas para processamento de sinais e imagens",
        "Padrão das faculdades de engenharia globais"
      ],
      "contras": [
        "Licença comercial de alto custo financeiro",
        "Desempenho inferior a C++ para deploy em produção web"
      ],
      "helloWorld": "% MATLAB no TechLab\nA = [1, 2; 3, 4];\nB = inv(A);\ndisp('Hello, World! Matriz Inversa calculada:');\ndisp(B);",
      "specs": {
        "execucao": "Interpretada / JIT Engine com bibliotecas nativas BLAS",
        "tipagem": "Dinâmica e Matricial por Excelência",
        "memoria": "Matrizes bidimensionais e multidimensionais em RAM",
        "paradigma": "Matricial e Numérico",
        "ext": "m",
        "funcionamento": "O MATLAB foi arquitetado para tratar cada variável como uma matriz numérica. Chamadas de álgebra linear delegam cálculos diretamente para bibliotecas C e Fortran otimizadas para a CPU."
      }
    },
    {
      "id": "scala",
      "nome": "Scala",
      "utilizacaoPrincipal": "Sistemas e processamento de dados",
      "criador": "Martin Odersky (EPFL)",
      "ano": 2004,
      "badge": "Big Data & JVM",
      "categorias": [],
      "nivel": "Avançado",
      "icone": "🌀",
      "cor": "#DC322F",
      "descricao": "Une com maestria a programação orientada a objetos e a programação funcional pura sobre a JVM. É a linguagem nativa na qual o Apache Spark (gigante do Big Data) foi construído.",
      "ondeUsa": "Apache Spark, Twitter, Netflix, LinkedIn, sistemas de Big Data de alta vazão",
      "pros": [
        "Linguagem nativa do Apache Spark para processamento de petabytes",
        "Sistema de tipos estáticos extremamente expressivo",
        "Interoperabilidade total com qualquer biblioteca Java"
      ],
      "contras": [
        "Curva de aprendizado funcional íngreme",
        "Compilação mais lenta devido ao poderoso motor de inferência"
      ],
      "helloWorld": "object Main extends App {\n  val tech = \"Apache Spark & Big Data\"\n  println(s\"Hello, World! Processando petabytes com Scala no $tech\")\n}",
      "specs": {
        "execucao": "Bytecode na Java Virtual Machine (JVM)",
        "tipagem": "Estática, Avançada com Inferência Total e Implicits",
        "memoria": "Garbage Collector da JVM",
        "paradigma": "Orientado a Objetos e Funcional Puro (Fusão)",
        "ext": "scala",
        "funcionamento": "O compilador scalac compila o código fonte em classes de bytecode padrão da JVM. Recursos avançados como pattern matching e coleções imutáveis são otimizados sem penalizar o runtime."
      }
    },
    {
      "id": "objectivec",
      "nome": "Objective-C",
      "utilizacaoPrincipal": "Aplicativos para Apple",
      "criador": "Brad Cox e Tom Love",
      "ano": 1984,
      "badge": "Legado Apple",
      "categorias": [],
      "nivel": "Avançado",
      "icone": "🍏",
      "cor": "#438EFF",
      "descricao": "A linguagem que deu suporte à era de ouro da NeXTSTEP, macOS e à revolução dos primeiros 10 anos do iPhone e da App Store. Baseada na troca de mensagens no estilo Smalltalk sobre a linguagem C.",
      "ondeUsa": "Bases de código históricas da Apple, bibliotecas de baixo nível de iOS e macOS",
      "pros": [
        "Envio dinâmico de mensagens (message-passing dinâmico)",
        "Compatibilidade absoluta e direta com código em C puro",
        "Fundamento de todos os frameworks clássicos do macOS"
      ],
      "contras": [
        "Sintaxe com muitos colchetes considerada antiquada por novos desenvolvedores",
        "Substituída gradualmente pela Apple em favor do Swift"
      ],
      "helloWorld": "#import <Foundation/Foundation.h>\n\nint main(int argc, const char * argv[]) {\n    @autoreleasepool {\n        NSLog(@\"Hello, World! A linguagem que construiu a base do iPhone e Mac.\");\n    }\n    return 0;\n}",
      "specs": {
        "execucao": "Compilação Nativa via LLVM / Clang",
        "tipagem": "Estática e Dinâmica com Tipagem 'id'",
        "memoria": "ARC (Automatic Reference Counting)",
        "paradigma": "Orientado a Objetos com Troca de Mensagens (Smalltalk-style)",
        "ext": "m",
        "funcionamento": "Em vez de chamadas de métodos convencionais, o Objective-C utiliza envio dinâmico de mensagens (objc_msgSend). O despachador encontra em tempo de execução a implementação do seletor."
      }
    },
    {
      "id": "julia",
      "nome": "Julia",
      "utilizacaoPrincipal": "Computação científica",
      "criador": "Jeff Bezanson, Stefan Karpinski, Viral B. Shah, Alan Edelman (MIT)",
      "ano": 2012,
      "badge": "Ciência de Alta Velocidade",
      "categorias": [
        "ia"
      ],
      "nivel": "Avançado",
      "icone": "🔮",
      "cor": "#9558B2",
      "descricao": "Projetada especificamente para resolver o 'problema das duas linguagens' (usar Python para prototipar e C para ter velocidade). Entrega a elegância de Python com o desempenho bruto de C.",
      "ondeUsa": "MIT, NASA, Laboratórios Nacionais de Energia, climatologia global, IA científica",
      "pros": [
        "Desempenho tão veloz quanto C em código numérico",
        "Múltiplo despacho (multiple dispatch) como paradigma central",
        "Sintaxe matemática cristalina com suporte a símbolos Unicode (α, β, ∑)"
      ],
      "contras": [
        "Tempo de compilação da primeira chamada (Time to First Plot)",
        "Ecossistema menor para desenvolvimento web tradicional"
      ],
      "helloWorld": "# Julia no TechLab\nfunction simular()\n    println(\"Hello, World! Computação científica na velocidade de C com a elegância de Python!\")\nend\nsimular()",
      "specs": {
        "execucao": "Compilação JIT Dinâmica via LLVM",
        "tipagem": "Dinâmica com Tipos Paramétricos Ricos",
        "memoria": "Garbage Collection automático",
        "paradigma": "Múltiplo Despacho e Computação Científica",
        "ext": "jl",
        "funcionamento": "O compilador JIT especializa o código de máquina para os tipos exatos passados a cada função. Na primeira execução de cada combinação de tipos, o LLVM gera binário nativo altamente vetorizado."
      }
    },
    {
      "id": "bash",
      "nome": "Bash / Shell",
      "utilizacaoPrincipal": "Scripts e automação de sistemas e segurança",
      "criador": "Brian Fox (Free Software Foundation)",
      "ano": 1989,
      "badge": "Segurança & Terminal",
      "categorias": [
        "seguranca"
      ],
      "nivel": "Iniciante",
      "icone": "💻",
      "cor": "#4EAA25",
      "descricao": "A linguagem de comandos padrão de servidores Linux e sistemas operacionais Unix-like. Essencial para profissionais de segurança da informação, DevOps, pentest e automação de pipelines.",
      "ondeUsa": "Servidores Linux em nuvem (AWS, GCP, Azure), terminais de pentest (Kali Linux), pipelines de CI/CD",
      "pros": [
        "Nativo e disponível imediatamente em 100% dos servidores Linux",
        "Encadeamento genial de comandos com Pipes (|) e Redirecionamentos",
        "Indispensável para pentest, auditorias e forense digital"
      ],
      "contras": [
        "Sintaxe com armadilhas sutis de espaçamento e aspas",
        "Não recomendado para lógicas matemáticas ou estruturas de dados pesadas"
      ],
      "helloWorld": "#!/usr/bin/env bash\n# Script de automação e segurança no TechLab\necho \"Hello, World! Automação, segurança e terminal Linux com Bash.\"\nuname -a",
      "specs": {
        "execucao": "Interpretado pelo Shell do Kernel Unix",
        "tipagem": "Texto e Strings não-tipadas",
        "memoria": "Gerenciada pelo processo do Shell e descritores de arquivo",
        "paradigma": "Scripting, Imperativo e Composição por Pipeline",
        "ext": "sh",
        "funcionamento": "O shell lê o comando, divide em tokens, expande variáveis, cria descritores de arquivos e invoca chamadas de sistema do kernel (fork/execve) conectando streams através de pipes nativos."
      }
    }
  ],

  // Assistente: Qual linguagem devo aprender?
  assistenteLinguagens: {
    perguntas: [
      {
        id: "objetivo",
        titulo: "Qual é o seu objetivo principal no momento?",
        opcoes: [
          { texto: "Entrar rápido no mercado criando sites e páginas", tag: "web" },
          { texto: "Trabalhar com Inteligência Artificial, dados ou automação", tag: "dados" },
          { texto: "Criar aplicativos para celular (iOS e Android)", tag: "mobile" },
          { texto: "Criar jogos de computador ou mobile", tag: "jogos" },
          { texto: "Trabalhar com servidores de alta performance, nuvem e segurança", tag: "sistemas" }
        ]
      },
      {
        id: "estilo",
        titulo: "Qual o seu nível de experiência com programação?",
        opcoes: [
          { texto: "Zero! Quero a sintaxe mais amigável e legível possível", tag: "facil" },
          { texto: "Já entendo um pouco de lógica, quero algo muito demandado", tag: "medio" },
          { texto: "Gosto de desafios técnicos profundos e controle de hardware", tag: "avancado" }
        ]
      },
      {
        id: "ambiente",
        titulo: "Onde você gostaria de ver seu código rodando?",
        opcoes: [
          { texto: "No navegador, acessível por qualquer pessoa com um link", tag: "browser" },
          { texto: "Em telas de smartphones nas lojas App Store e Play Store", tag: "app" },
          { texto: "Nos bastidores de servidores de nuvem e bancos de dados", tag: "backend" },
          { texto: "Direto no hardware ou em engines de videogame", tag: "native" }
        ]
      }
    ]
  },

  // 3. GUIAS INTERATIVOS "COMO MONTAR / COMO FAZER" (8 TUTORIAIS COMPLETOS)
  guias: [
    {
      id: "guia-pc",
      titulo: "Como Montar um PC Gamer & Workstation do Zero",
      subtitulo: "Guia prático com os componentes físicos, precauções antiestáticas e ordem exata de instalação.",
      icone: "🖥️",
      duracao: "25 min de leitura",
      categoria: "Hardware & TI",
      passos: [
        {
          numero: 1,
          titulo: "Planejamento e Preparação do Ambiente",
          conteudo: "Antes de encostar nas peças, escolha uma bancada de madeira limpa. Toque em uma superfície metálica sem tinta para descarregar a eletricidade estática do corpo. Separe uma chave Philips #2 magnética e mantenha as caixas dos componentes por perto para guardar os manuais e parafusos sobressalentes.",
          dica: "Dica de Ouro: Nunca monte o computador em cima de carpetes ou usando meias de lã, pois eles acumulam cargas estáticas que podem queimar circuitos delicados da placa-mãe.",
          checklist: ["Bancada desobstruída e iluminada", "Chave Philips magnética", "Descarga de estática realizada", "Peças conferidas nas caixas"]
        },
        {
          numero: 2,
          titulo: "Instalação do Processador (CPU) no Socket",
          conteudo: "Tire a placa-mãe da embalagem e coloque-a sobre a própria caixa de papelão (nunca sobre o plástico antiestático externo!). Abra a alavanca do socket. Localize o triângulo dourado marcado em um dos cantos da CPU e alinhe-o com o triângulo indicado na placa-mãe. Solte o processador sem forçar: ele deve se encaixar com gravidade pura ('Zero Insertion Force'). Abaixe a alavanca com firmeza.",
          dica: "Atenção máxima: Nos sockets Intel (LGA) e AMD modernos (AM5), os pinos frágeis ficam na placa-mãe. Nunca encoste o dedo neles para não entortar!",
          checklist: ["Alavanca do socket aberta", "Triângulo dourado alinhado", "Encaixe suave sem pressão", "Alavanca travada"]
        },
        {
          numero: 3,
          titulo: "Instalação do SSD M.2 NVMe",
          conteudo: "Localize o slot M.2 mais próximo da CPU (que geralmente possui conexão PCIe direta com o processador). Remova o dissipador metálico da placa-mãe, se houver. Insira o SSD M.2 em um ângulo de aproximadamente 30 graus até encaixar totalmente nos contatos, empurre-o suavemente para baixo e parafuse o pequeno parafuso ou presilha de fixação.",
          dica: "Lembre-se de retirar a película plástica azul transparente de baixo do dissipador térmico térmico da placa-mãe antes de parafusar de volta!",
          checklist: ["Slot M.2 primário localizado", "SSD inserido a 30 graus", "Película térmica removida", "Parafuso M.2 fixado"]
        },
        {
          numero: 4,
          titulo: "Instalação das Memórias RAM em Dual Channel",
          conteudo: "Se você possui 2 pentes de memória em uma placa-mãe de 4 slots, a regra de ouro é instalá-los nos slots 2 e 4 (contando a partir do processador) para ativar o Dual Channel e dobrar a largura de banda. Abra as travas plásticas superiores do slot, alinhe o chanfro central da memória com o dente do slot e pressione as duas extremidades até ouvir um 'clique' nítido das travas se fechando sozinhas.",
          dica: "Se não ouvir o clique de travamento de ambos os lados, o pente de memória não fará contato e a máquina não dará vídeo (bip de erro de memória).",
          checklist: ["Slots 2 e 4 identificados", "Chanfro central alinhado", "Pressionado até o clique", "Travas fechadas"]
        },
        {
          numero: 5,
          titulo: "Pasta Térmica e Cooler da CPU",
          conteudo: "Se o cooler não vier com pasta térmica pré-aplicada, aplique uma pequena gota do tamanho de uma ervilha bem no centro da tampa metálica (IHS) do processador. Posicione o cooler com cuidado e aperte os parafusos em padrão de 'X' (cruzado), dando algumas voltas em cada um aos poucos para que a pressão se espalhe uniformemente sobre a CPU. Conecte o cabo da ventoinha no conector rotulado 'CPU_FAN'.",
          dica: "Nunca aperte um parafuso até o final antes de começar os outros; o aperto cruzado gradual evita trincas e bolhas de ar na pasta térmica.",
          checklist: ["Pasta térmica do tamanho de ervilha", "Aperto cruzado em X", "Cabo conectado no CPU_FAN"]
        },
        {
          numero: 6,
          titulo: "Montagem no Gabinete e Fonte de Alimentação (PSU)",
          conteudo: "Instale o espelho traseiro da placa-mãe (I/O Shield) no gabinete se ele não for integrado. Aparafuse a fonte de alimentação na base do gabinete com a ventoinha virada para baixo (para puxar ar fresco de fora). Encaixe a placa-mãe sobre os suportes de latão (standoffs) do gabinete e parafuse com calma. Passe os cabos de energia essenciais por trás da bandeja: o conector largo de 24 pinos da placa-mãe e o conector EPS de 8 pinos da CPU.",
          dica: "Confira se a quantidade de suportes dourados (standoffs) no gabinete corresponde exatamente aos furos da placa-mãe para evitar curtos-circuitos por trás da placa.",
          checklist: ["Fonte parafusada com fan para baixo", "Placa-mãe sobre os standoffs", "Cabo 24 pinos conectado", "Cabo EPS 8 pinos da CPU conectado"]
        },
        {
          numero: 7,
          titulo: "Placa de Vídeo (GPU) e Primeiro Boot",
          conteudo: "Remova as tampas metálicas traseiras do gabinete alinhadas com o slot PCIe x16 superior. Abra a trava do slot PCIe, alinhe os contatos dourados da GPU e pressione até travar. Fixe a GPU com parafusos no gabinete para que o peso não empene o slot. Conecte os cabos de energia PCIe (6+2 pinos) da fonte. Conecte o monitor NA PLACA DE VÍDEO (e não na placa-mãe!). Ligue na tomada e aperte o Power!",
          dica: "Erro clássico de iniciante: plugar o cabo HDMI/DisplayPort na saída da placa-mãe em vez da saída da placa de vídeo dedicada. Se fizer isso, a tela ficará preta!",
          checklist: ["Trava do PCIe x16 aberta", "GPU encaixada e parafusada", "Cabos de energia PCIe plugados", "Cabo de vídeo ligado na GPU"]
        }
      ]
    },
    {
      id: "guia-site",
      titulo: "Como Criar um Site do Zero e Publicar na Web",
      subtitulo: "Do arquivo em branco no seu editor até uma URL pública mundial rodando na Vercel ou GitHub Pages.",
      icone: "🌐",
      duracao: "18 min de leitura",
      categoria: "Desenvolvimento Web",
      passos: [
        {
          numero: 1,
          titulo: "A Estrutura dos 3 Mosqueteiros da Web",
          conteudo: "Todo site moderno é construído sobre 3 pilares independentes: HTML (o esqueleto e os dados semânticos), CSS (a maquiagem, layout visual, cores e responsividade) e JavaScript (o cérebro, interatividade, chamadas de API e reações a cliques do usuário).",
          dica: "Mantenha sempre a separação de responsabilidades: nunca misture estilos pesados inline no HTML quando puder mantê-los no CSS.",
          checklist: ["Compreender papel do HTML", "Compreender papel do CSS", "Compreender papel do JS"]
        },
        {
          numero: 2,
          titulo: "Criando o arquivo index.html",
          conteudo: "Crie uma pasta no seu computador chamada 'meu-site'. Dentro dela, crie um arquivo chamado 'index.html'. O nome 'index' é especial: quando alguém digita seu domínio, os servidores web procuram automaticamente por ele.",
          dica: "No VS Code, digite apenas '!' e aperte a tecla Tab ou Enter: ele criará todo o esqueleto HTML5 padrão em um segundo!",
          checklist: ["Pasta criada", "index.html criado", "Boilerplate HTML5 configurado"]
        },
        {
          numero: 3,
          titulo: "Estilizando com CSS Responsivo",
          conteudo: "Crie um arquivo 'style.css' e vincule no seu HTML através da tag <link rel='stylesheet' href='style.css'> dentro da tag <head>. Adicione regras de CSS com fontes modernas, flexbox para alinhar itens e media queries (@media) para que o layout se adapte automaticamente a celulares e telas grandes.",
          dica: "Sempre adicione no início do CSS: * { box-sizing: border-box; margin: 0; padding: 0; } para zerar inconsistências entre navegadores.",
          checklist: ["style.css criado e linkado", "Reset CSS aplicado", "Flexbox ou Grid implementado"]
        },
        {
          numero: 4,
          titulo: "Adicionando Interatividade com JavaScript",
          conteudo: "Crie o arquivo 'app.js' e faça o link antes de fechar a tag </body> com <script src='app.js'></script>. Use seletores como document.querySelector() e eventos como .addEventListener('click', ...) para alternar temas claro/escuro, abrir menus ou fazer cálculos.",
          dica: "Use o console do navegador (F12 -> Console) para debugar erros e testar comandos do JavaScript ao vivo.",
          checklist: ["app.js criado e referenciado", "Manipulação de DOM implementada", "Event Listener testado no console"]
        },
        {
          numero: 5,
          titulo: "Publicação Gratuita Mundial com a Vercel",
          conteudo: "Com seu projeto pronto, basta entrar em vercel.com, fazer login com sua conta do GitHub ou e-mail, arrastar a pasta do seu site (ou conectar seu repositório Git) e clicar em Deploy. Em menos de 20 segundos seu site ganha um link https com certificado SSL automático gratuito!",
          dica: "Se usar Git, toda vez que fizer um git push para o branch main, a Vercel atualiza seu site no ar automaticamente em tempo real!",
          checklist: ["Conta na Vercel criada", "Deploy efetuado", "URL https testada no celular"]
        }
      ]
    },
    {
      id: "guia-python",
      titulo: "Como Instalar o Python e Configurar o Ambiente Profissional",
      subtitulo: "Download oficial, configuração do PATH no sistema, VS Code, extensões essenciais e ambientes virtuais (venv).",
      icone: "🐍",
      duracao: "15 min de leitura",
      categoria: "Programação",
      passos: [
        {
          numero: 1,
          titulo: "Download Oficial e o Detalhe Crucial do PATH",
          conteudo: "Acesse python.org e baixe o instalador mais recente para seu sistema operacional. No Windows, logo na primeira tela do instalador, existe uma caixa de seleção que muda tudo: **'Add python.exe to PATH'**. Você DEVE marcar essa caixinha!",
          dica: "Se você esquecer de marcar o PATH, o terminal dirá 'python não é reconhecido como um comando interno'.",
          checklist: ["Download efetuado em python.org", "Caixa 'Add to PATH' marcada", "Instalação concluída com sucesso"]
        },
        {
          numero: 2,
          titulo: "Verificação no Terminal",
          conteudo: "Abra o Prompt de Comando, PowerShell ou Terminal do Linux/Mac e digite: python --version (ou python3 --version). Se aparecer algo como 'Python 3.12.x', seu ambiente está perfeitamente integrado ao sistema.",
          dica: "Digite também pip --version para garantir que o instalador de pacotes do Python está funcionando.",
          checklist: ["Comando python --version testado", "Comando pip --version verificado"]
        },
        {
          numero: 3,
          titulo: "Configurando o Visual Studio Code (VS Code)",
          conteudo: "Baixe o VS Code em code.visualstudio.com. Abra a aba de Extensões (Ctrl+Shift+X) e instale a extensão oficial 'Python' da Microsoft. Ela fornece preenchimento automático inteligente (IntelliSense), destaque de sintaxe, formatação e depuração passo a passo.",
          dica: "Instale também a extensão 'Black Formatter' ou 'Ruff' para formatar seu código automaticamente toda vez que você salvar com Ctrl+S.",
          checklist: ["VS Code instalado", "Extensão oficial do Python instalada", "Formatação no salvamento ativada"]
        },
        {
          numero: 4,
          titulo: "Criando Ambientes Virtuais (venv)",
          conteudo: "Em projetos profissionais nunca instale pacotes no Python global da sua máquina. Crie um ambiente virtual na pasta do seu projeto digitando: python -m venv .venv. Para ativá-lo no Windows: .venv\\Scripts\\activate. No Linux/Mac: source .venv/bin/activate.",
          dica: "O ambiente virtual cria uma caixinha de areia isolada: se você instalar uma biblioteca específica, ela não vai quebrar os outros projetos do seu computador.",
          checklist: ["Comando python -m venv .venv executado", "Ambiente virtual ativado no terminal", "Pasta .venv adicionada ao .gitignore"]
        }
      ]
    },
    {
      id: "guia-internet",
      titulo: "Como Funciona a Internet: A Jornada de um Pacote",
      subtitulo: "O que acontece nos bastidores quando você digita uma URL no navegador e aperta Enter.",
      icone: "🛰️",
      duracao: "20 min de leitura",
      categoria: "Redes & Infra",
      passos: [
        {
          numero: 1,
          titulo: "1. O Navegador e a Resolução de Nomes (DNS)",
          conteudo: "Computadores se comunicam através de números chamados Endereços IP (como 142.250.190.46), mas humanos lembram de nomes como 'google.com'. O navegador consulta primeiro seu cache local, depois o sistema operacional e finalmente os servidores DNS (a 'agenda telefônica da internet') para traduzir o domínio no IP real do servidor.",
          dica: "Servidores DNS públicos ultra-rápidos como 1.1.1.1 (Cloudflare) e 8.8.8.8 (Google) aceleram muito essa primeira etapa de navegação.",
          checklist: ["Checagem de cache local", "Requisição DNS enviada", "Endereço IP resolvido"]
        },
        {
          numero: 2,
          titulo: "2. O Aperto de Mãos TCP e o Túnel Seguro TLS (Handshake)",
          conteudo: "Com o IP em mãos, o navegador estabelece uma conexão confiável com o servidor através do TCP Three-Way Handshake: SYN (olá, quero conversar), SYN-ACK (olá, estou pronto) e ACK (confirmado!). Em seguida, negociam certificados criptográficos (HTTPS/TLS) para que ninguém no caminho consiga espionar seus dados.",
          dica: "O cadeado na barra de endereços só aparece após a validação completa e bem-sucedida do certificado SSL/TLS.",
          checklist: ["Handshake TCP SYN / SYN-ACK / ACK", "Negociação de chaves criptográficas TLS", "Canal seguro HTTPS estabelecido"]
        },
        {
          numero: 3,
          titulo: "3. Roteamento por Cabos Submarinos e Roteadores BGP",
          conteudo: "Sua requisição é dividida em pequenos pacotes de dados. Eles saem do seu Wi-Fi para o roteador de casa, trafegam pela fibra do provedor (ISP) e cruzam oceanos por cabos de fibra ótica submarinos. Os roteadores de borda usam o protocolo BGP para encontrar o caminho mais curto até o data center de destino.",
          dica: "Se um cabo submarino for rompido por uma âncora, os roteadores BGP recalculam a rota automaticamente em milissegundos por outros cabos ao redor do globo.",
          checklist: ["Fragmentação em pacotes IP", "Encaminhamento BGP entre provedores", "Chegada ao Data Center de destino"]
        },
        {
          numero: 4,
          titulo: "4. Processamento no Servidor e Resposta HTTP 200 OK",
          conteudo: "O servidor web (como NGINX ou servidor em nuvem) recebe os pacotes, remonta a requisição HTTP GET, processa a lógica, consulta o banco de dados se necessário e devolve uma resposta HTTP acompanhada do código de status (ex: 200 OK) contendo o arquivo HTML, CSS e JavaScript.",
          dica: "Se a página não existir no servidor, o status retornado será o famoso 404 Not Found.",
          checklist: ["Requisição processada pelo backend", "Consulta ao banco de dados", "Pacotes de resposta enviados de volta com status 200"]
        },
        {
          numero: 5,
          titulo: "5. A Renderização na Tela (DOM, CSSOM e Paint)",
          conteudo: "O motor do navegador recebe o HTML e monta a árvore estrutural (DOM). Ele combina com o CSS (CSSOM) gerando a Render Tree, calcula as posições exatas dos elementos na tela (Layout/Reflow) e desenha os pixels na tela (Paint). Tudo isso em uma fração de segundo!",
          dica: "Reduzir o tamanho de imagens e usar código limpo faz a etapa de Paint ocorrer em poucos milissegundos.",
          checklist: ["Construção do DOM", "Construção do CSSOM", "Layout e Pintura dos pixels na tela"]
        }
      ]
    },
    {
      id: "guia-database",
      titulo: "Como Funciona um Banco de Dados Relacional e NoSQL",
      subtitulo: "Entenda tabelas, chaves primárias e estrangeiras, índices B-Tree, transações ACID e quando usar NoSQL.",
      icone: "🗄️",
      duracao: "22 min de leitura",
      categoria: "Banco de Dados",
      passos: [
        {
          numero: 1,
          titulo: "O que é um SGBD e por que não usar um arquivo Excel?",
          conteudo: "Um Sistema Gerenciador de Banco de Dados (como PostgreSQL ou MySQL) foi projetado para atender simultaneamente milhares de usuários lendo e gravando informações ao mesmo tempo, com segurança, integridade e velocidade astronômica que planilhas comuns não suportam.",
          dica: "Em um banco de dados, múltiplos clientes podem comprar o último ingresso de um show ao mesmo tempo sem corromper os dados.",
          checklist: ["Conceito de concorrência", "Diferença entre planilha e banco de dados"]
        },
        {
          numero: 2,
          titulo: "Chaves Primárias (PK) e Chaves Estrangeiras (FK)",
          conteudo: "Em bancos relacionais, cada linha de uma tabela possui um identificador exclusivo chamado **Chave Primária (Primary Key)**, como um ID ou CPF. Para relacionar tabelas (ex: um Pedido pertence a um Cliente), incluímos o ID do cliente dentro da tabela de pedidos como uma **Chave Estrangeira (Foreign Key)**.",
          dica: "As chaves estrangeiras garantem integridade referencial: o banco simplesmente recusa a criação de um pedido para um cliente que não existe no sistema.",
          checklist: ["Definição de Primary Key", "Criação de relacionamentos com Foreign Key"]
        },
        {
          numero: 3,
          titulo: "A Mágica dos Índices B-Tree (Como o banco busca tão rápido)",
          conteudo: "Se você tem 10 milhões de clientes e busca por um e-mail sem índice, o banco precisa ler todas as 10 milhões de linhas uma a uma (Full Table Scan). Ao criar um índice, o banco organiza os dados em uma árvore balanceada (B-Tree): em apenas 3 ou 4 comparações ele encontra o registro exato!",
          dica: "Crie índices nas colunas que você mais usa nas cláusulas WHERE e JOIN. Mas atenção: índices demais deixam os comandos INSERT e UPDATE mais lentos.",
          checklist: ["Compreender Full Table Scan", "Criar índice com CREATE INDEX", "Saber o custo de escrita dos índices"]
        },
        {
          numero: 4,
          titulo: "O que são Transações e as Propriedades ACID",
          conteudo: "Uma transação é um bloco de operações que deve ser executado no esquema 'tudo ou nada'. As regras ACID garantem: Atomicidade (se uma etapa falhar, desfaz tudo com ROLLBACK), Consistência (respeita regras), Isolamento (uma transação não interfere na outra) e Durabilidade (gravou no disco, não perde mesmo se acabar a luz).",
          dica: "Transferência bancária é o exemplo clássico: tira R$ 100 da conta A e soma R$ 100 na conta B. Se o sistema cair no meio, o dinheiro não pode sumir no limbo!",
          checklist: ["Atomicidade", "Consistência", "Isolamento", "Durabilidade"]
        },
        {
          numero: 5,
          titulo: "Quando escolher Relacional (SQL) ou Não-Relacional (NoSQL)?",
          conteudo: "Use **SQL** (PostgreSQL, MySQL) quando seus dados forem altamente estruturados, com relacionamentos claros e necessidade de transações estritas (bancos, e-commerces, faturamento). Use **NoSQL** (MongoDB, Redis, Cassandra) quando tiver documentos flexíveis sem esquema fixo, cache ultra veloz ou volumes descomunais de dados distribuídos.",
          dica: "Sistemas modernos usam ambos ao mesmo tempo: PostgreSQL para dados transacionais e Redis para guardar sessões de usuário na memória RAM ultrarrápida.",
          checklist: ["Avaliar estrutura dos dados", "Definir necessidade de ACID", "Escolher a tecnologia correta"]
        }
      ]
    },
    {
      id: "guia-git",
      titulo: "Como Dominar Git e GitHub no Dia a Dia",
      subtitulo: "Controle de versão, commits atômicos, branches, resolução de conflitos e fluxo profissional de pull requests.",
      icone: "🐙",
      duracao: "20 min de leitura",
      categoria: "DevOps & Ferramentas",
      passos: [
        {
          numero: 1,
          titulo: "Git vs GitHub: A Diferença Fundamental",
          conteudo: "Git é o software de controle de versão que roda localmente no seu computador, registrando cada foto (snapshot) do histórico do seu projeto. GitHub é uma plataforma na nuvem que hospeda seus repositórios Git remotos, permitindo colaboração com outros desenvolvedores.",
          dica: "Você pode usar o Git perfeitamente mesmo sem internet no meio de uma floresta!",
          checklist: ["Instalar Git", "Configurar git config --global user.name e user.email", "Criar conta no GitHub"]
        },
        {
          numero: 2,
          titulo: "Os Três Estados do Git (Working, Staging, Repository)",
          conteudo: "Seus arquivos passam por 3 áreas: 1) Working Directory (onde você edita o código); 2) Staging Area / Index (onde você prepara os arquivos que entrarão na foto com git add); 3) Repository (onde a foto é gravada para sempre no histórico com git commit).",
          dica: "Use sempre mensagens de commit no imperativo em inglês ou português claro (ex: 'Adiciona autenticação por token' em vez de 'fiz umas coisas').",
          checklist: ["Executar git init", "Adicionar arquivos com git add .", "Registrar com git commit -m 'mensagem'"]
        },
        {
          numero: 3,
          titulo: "Trabalhando com Branches (Ramificações)",
          conteudo: "Nunca programe funcionalidades novas diretamente no branch principal (main). Crie um branch separado digitando: git checkout -b feature/login-google. Você pode testar e quebrar coisas à vontade sem afetar o código que está funcionando em produção.",
          dica: "Para voltar ao branch principal a qualquer momento: git checkout main ou git switch main.",
          checklist: ["Criar branch com git checkout -b", "Fazer alterações e commits no novo branch", "Verificar branches ativos com git branch"]
        },
        {
          numero: 4,
          titulo: "Conectando ao GitHub e Enviando o Código (Push)",
          conteudo: "Crie um repositório vazio no GitHub. Conecte seu repositório local ao remoto com: git remote add origin https://github.com/seu-usuario/seu-repo.git. Para enviar seus commits para a nuvem: git push -u origin main.",
          dica: "Crie sempre um arquivo .gitignore para não enviar pastas pesadas como node_modules/ ou arquivos com senhas e chaves .env para o GitHub!",
          checklist: ["Repositório remoto vinculado com git remote add", "Arquivo .gitignore configurado", "Primeiro git push realizado com sucesso"]
        },
        {
          numero: 5,
          titulo: "Pull Requests e Resolução de Conflitos",
          conteudo: "No GitHub, abra um **Pull Request (PR)** para mesclar seu branch de funcionalidade de volta ao branch main. Colegas de equipe podem revisar suas linhas de código, sugerir melhorias e aprovar. Se duas pessoas alterarem a mesma linha do mesmo arquivo, o Git avisa sobre um 'conflito' e pede para você escolher qual versão deve permanecer.",
          dica: "Mantenha seus branches curtos e faça PRs pequenos e focados para que a revisão seja rápida e tranquila.",
          checklist: ["Criar Pull Request no GitHub", "Revisar o diff de alterações", "Realizar o Merge no branch main"]
        }
      ]
    },
    {
      id: "guia-bot",
      titulo: "Como Criar um Bot Automatizado em Python",
      subtitulo: "Automatize mensagens, alertas de preço ou moderação em canais de comunicação com poucos comandos.",
      icone: "🤖",
      duracao: "18 min de leitura",
      categoria: "Automação & IA",
      passos: [
        {
          numero: 1,
          titulo: "O Conceito de Bot e APIs de Comunicação",
          conteudo: "Um bot nada mais é do que um script que roda continuamente em um servidor ou computador, escutando eventos (como a chegada de uma nova mensagem) através de uma API e respondendo de acordo com regras lógicas pré-estabelecidas.",
          dica: "O Telegram é a plataforma mais amigável para quem está criando seu primeiro bot, pois não exige aprovações burocráticas.",
          checklist: ["Entender arquitetura de webhooks e polling", "Definir finalidade do bot"]
        },
        {
          numero: 2,
          titulo: "Obtendo o Token Secreto",
          conteudo: "No Telegram, procure pelo perfil oficial @BotFather. Envie o comando /newbot, defina o nome e o username do seu bot. O BotFather fornecerá um **Token de Acesso HTTP** exclusivo (uma longa sequência de letras e números).",
          dica: "Guarde esse token a sete chaves! Qualquer pessoa que tiver seu token poderá controlar o bot e ler mensagens enviadas a ele.",
          checklist: ["Conversar com @BotFather", "Criar novo bot", "Guardar o token em variável de ambiente"]
        },
        {
          numero: 3,
          titulo: "Instalando a Biblioteca e Código Inicial",
          conteudo: "Instale a biblioteca python-telegram-bot digitando no terminal: pip install python-telegram-bot. Crie seu script 'bot.py' e configure um manipulador de comando (CommandHandler) que responda ao comando /start com uma saudação simpática.",
          dica: "As versões modernas da biblioteca utilizam async/await nativo do Python para atender milhares de usuários simultâneos sem travamentos.",
          checklist: ["pip install executado", "Script bot.py criado com handlers assíncronos"]
        },
        {
          numero: 4,
          titulo: "Colocando o Bot em Execução 24/7",
          conteudo: "Para que o bot responda mesmo quando você desligar o seu computador, suba o script para uma máquina virtual gratuita (VPS) ou em serviços de contêineres na nuvem como Render, Railway ou Oracle Cloud Always Free.",
          dica: "Use um gerenciador de processos como o PM2 ou o Systemd do Linux para reiniciar o bot sozinho caso ocorra qualquer erro imprevisto.",
          checklist: ["Testar localmente", "Subir para VPS ou plataforma em nuvem", "Configurar reinicialização automática"]
        }
      ]
    },
    {
      id: "guia-network",
      titulo: "Como Configurar uma Rede Doméstica e Segura",
      subtitulo: "Roteadores, faixas de IP privado, DHCP, DNS seguro, firewall e proteção contra intrusões.",
      icone: "🛡️",
      duracao: "20 min de leitura",
      categoria: "Redes & Segurança",
      passos: [
        {
          numero: 1,
          titulo: "Entendendo o Roteador e os IPs Privados",
          conteudo: "O roteador da sua casa possui duas faces: o lado externo (WAN) conectado à internet pública pelo provedor, e o lado interno (LAN) onde seus aparelhos se conectam. Ele utiliza faixas de IP privadas reservadas pela RFC 1918, sendo a mais comum a 192.168.1.0/24.",
          dica: "O NAT (Network Address Translation) permite que dezenas de celulares e TVs na sua casa compartilhem um único endereço IP público oficial.",
          checklist: ["Descobrir IP do gateway padrão (ex: 192.168.1.1)", "Acessar painel web do roteador"]
        },
        {
          numero: 2,
          titulo: "Trocar Senha de Admin e Desativar WPS",
          conteudo: "A primeira ação de segurança em qualquer roteador é mudar a senha de fábrica do painel de administração (que quase sempre é admin/admin). Em seguida, **desative a função WPS (Wi-Fi Protected Setup)**: essa funcionalidade possui falhas de segurança conhecidas que permitem a invasores quebrar o PIN por força bruta em poucas horas.",
          dica: "Mantenha o firmware do roteador sempre atualizado para corrigir vulnerabilidades conhecidas.",
          checklist: ["Senha de admin alterada para padrão forte", "Função WPS desativada no menu wireless"]
        },
        {
          numero: 3,
          titulo: "Criptografia Wi-Fi: Escolhendo WPA3 ou WPA2-AES",
          conteudo: "No menu de segurança sem fio, certifique-se de que o protocolo de criptografia selecionado seja **WPA3-Personal** (ou WPA2-PSK com criptografia AES pura). Nunca use WEP ou WPA de primeira geração, que foram quebrados há anos e podem ser interceptados em minutos com ferramentas simples.",
          dica: "Separe as redes de 2.4 GHz (ótimo alcance para dispositivos IoT) e 5 GHz (altíssima velocidade para notebooks e consoles).",
          checklist: ["WPA3 ou WPA2-AES ativado", "Senha do Wi-Fi com letras, números e símbolos", "Redes 2.4GHz e 5GHz configuradas"]
        },
        {
          numero: 4,
          titulo: "Criando uma Rede de Visitantes (Guest Network)",
          conteudo: "Ative a função de **Rede para Convidados** no seu roteador. Ela cria um Wi-Fi separado que permite que visitas ou dispositivos inteligentes de marcas duvidosas (lâmpadas Wi-Fi, câmeras baratas) acessem a internet, mas fiquem completamente isolados dos seus computadores, pastas compartilhadas e servidores pessoais.",
          dica: "Se um dispositivo IoT barato for comprometido por hackers, eles não conseguirão invadir seu computador de trabalho na rede principal.",
          checklist: ["Rede Guest ativada", "Isolamento de clientes (AP Isolation) habilitado"]
        },
        {
          numero: 5,
          titulo: "Configurando DNS com Proteção contra Malware",
          conteudo: "Mude os servidores DNS automáticos do provedor nas configurações de DHCP do roteador para serviços que bloqueiam malware e rastreadores nativamente, como o **Cloudflare Security (1.1.1.2 e 1.0.0.2)** ou o **AdGuard DNS**. Toda a casa ficará protegida automaticamente sem precisar instalar nada em cada aparelho!",
          dica: "Testes mostram que o DNS seguro reduz em mais de 70% o risco de familiares caírem em links falsos de phishing bancário.",
          checklist: ["IPs do DNS seguro inseridos no DHCP", "Reiniciar o roteador para aplicar em todos os aparelhos"]
        }
      ]
    }
  ],

  // 4. TRILHAS DE ESTUDO (8 TRILHAS COMPLETAS)
  trilhas: [
    {
      id: "trilha-dados",
      titulo: "Ciência de Dados (Data Science)",
      icone: "📊",
      cor: "#3B82F6",
      descricao: "Aprenda a coletar, limpar, analisar e extrair inteligência preditiva a partir de grandes volumes de dados.",
      modulos: [
        {
          id: "mod-ds-1",
          titulo: "Fundamentos de Python para Dados",
          aulas: ["Sintaxe e Coleções em Python", "NumPy: Computação Vetorial", "Pandas: DataFrames e Séries", "Tratamento de Nulos e Duplicatas"]
        },
        {
          id: "mod-ds-2",
          titulo: "Estatística & Análise Exploratória",
          aulas: ["Medidas de Tendência Central (Média, Mediana)", "Dispersão e Desvio Padrão", "Correlação de Pearson vs Spearman", "Visualização com Matplotlib e Seaborn"]
        },
        {
          id: "mod-ds-3",
          titulo: "Machine Learning Aplicado",
          aulas: ["Regressão Linear e Múltipla", "Classificação com Random Forest", "Métricas: ROC-AUC, Precisão e Recall", "Pipelines com Scikit-Learn"]
        }
      ]
    },
    {
      id: "trilha-programacao",
      titulo: "Programação & Engenharia de Software",
      icone: "💻",
      cor: "#10B981",
      descricao: "Fundamentos sólidos de algoritmos, estruturas de dados, orientação a objetos e arquitetura limpa.",
      modulos: [
        {
          id: "mod-prog-1",
          titulo: "Lógica e Estruturas Fundamentais",
          aulas: ["Algoritmos e Complexidade Big O", "Vetores, Listas Encadeadas e Pilhas", "Filas e Tabelas Hash (Dicionários)", "Recursão e Árvores Binárias"]
        },
        {
          id: "mod-prog-2",
          titulo: "Paradigmas e POO",
          aulas: ["Classes, Objetos e Métodos", "Encapsulamento e Herança", "Polimorfismo e Interfaces", "Princípios SOLID na Prática"]
        },
        {
          id: "mod-prog-3",
          titulo: "Engenharia de Software Moderna",
          aulas: ["Testes Unitários e TDD", "Padrões de Projeto (Design Patterns)", "Clean Architecture & Microsserviços", "Documentação de Código e Clean Code"]
        }
      ]
    },
    {
      id: "trilha-redes",
      titulo: "Redes de Computadores",
      icone: "🌐",
      cor: "#6366F1",
      descricao: "Entenda o modelo OSI, endereçamento IPv4/IPv6, protocolos de transporte, roteamento e segurança de tráfego.",
      modulos: [
        {
          id: "mod-net-1",
          titulo: "Arquitetura e Camadas de Rede",
          aulas: ["As 7 Camadas do Modelo OSI", "A Pilha TCP/IP na Prática", "Ethernet, Switches e VLANs", "Roteadores e Tabelas de Roteamento"]
        },
        {
          id: "mod-net-2",
          titulo: "Endereçamento e Protocolos de Apoio",
          aulas: ["IPv4 e Máscaras de Sub-rede (CIDR)", "IPv6: A Nova Fronteira", "DHCP e Alocação Dinâmica", "DNS: Resolução Hierárquica de Nomes"]
        },
        {
          id: "mod-net-3",
          titulo: "Transporte e Aplicação",
          aulas: ["TCP vs UDP: Confiabilidade vs Velocidade", "HTTP/1.1, HTTP/2 e HTTP/3 (QUIC)", "TLS/SSL e Criptografia em Trânsito", "Análise de Pacotes com Wireshark"]
        }
      ]
    },
    {
      id: "trilha-seguranca",
      titulo: "Cibersegurança & SecOps",
      icone: "🔒",
      cor: "#EF4444",
      descricao: "Defesa de perímetro, análise de vulnerabilidades, criptografia, autenticação segura e resposta a incidentes.",
      modulos: [
        {
          id: "mod-sec-1",
          titulo: "Fundamentos da Segurança da Informação",
          aulas: ["A Tríade CIA (Confidencialidade, Integridade, Disponibilidade)", "Criptografia Simétrica vs Assimétrica", "Funções Hash Criptográficas (SHA-256)", "Engenharia Social e Phishing"]
        },
        {
          id: "mod-sec-2",
          titulo: "Segurança Ofensiva e Defensiva",
          aulas: ["OWASP Top 10 Vulnerabilidades Web", "Injeção de SQL (SQLi) e Prevenção", "Cross-Site Scripting (XSS) e CSRF", "Firewalls, IDS e IPS de Rede"]
        },
        {
          id: "mod-sec-3",
          titulo: "Gestão de Identidade e Acesso",
          aulas: ["Autenticação Multi-Fator (MFA/2FA)", "Tokens JWT e Sessões Seguras", "OAuth 2.0 e OpenID Connect", "Princípio do Privilégio Mínimo (Zero Trust)"]
        }
      ]
    },
    {
      id: "trilha-cloud",
      titulo: "Cloud Computing & Infraestrutura",
      icone: "☁️",
      cor: "#0EA5E9",
      descricao: "Projete soluções escaláveis, resilientes e distribuídas na AWS, Google Cloud e Microsoft Azure.",
      modulos: [
        {
          id: "mod-cld-1",
          titulo: "Conceitos de Nuvem",
          aulas: ["Modelos: IaaS, PaaS, SaaS e Serverless", "Regiões, Zonas de Disponibilidade (AZs)", "Elasticidade vs Escalabilidade Vertical/Horizontal", "Armazenamento em Objeto (S3 / Cloud Storage)"]
        },
        {
          id: "mod-cld-2",
          titulo: "Computação e Redes em Nuvem",
          aulas: ["Máquinas Virtuais e Instâncias", "VPC (Virtual Private Cloud) e Subnets", "Load Balancers e Distribuição de Carga", "Auto Scaling Groups"]
        },
        {
          id: "mod-cld-3",
          titulo: "Arquiteturas Escaláveis",
          aulas: ["Filas e Mensageria (SQS, Kafka, PubSub)", "Funções Serverless (AWS Lambda / Cloud Functions)", "Content Delivery Networks (CDNs)", "FinOps: Gestão e Redução de Custos em Nuvem"]
        }
      ]
    },
    {
      id: "trilha-banco",
      titulo: "Banco de Dados & Engenharia de Dados",
      icone: "🗄️",
      cor: "#F59E0B",
      descricao: "Do SQL avançado até modelagem dimensional, bancos NoSQL de altíssimo rendimento e pipelines ETL/ELT.",
      modulos: [
        {
          id: "mod-db-1",
          titulo: "Modelagem Relacional e SQL Puro",
          aulas: ["Normalização de Dados (1FN, 2FN, 3FN)", "JOINs Complexos (Inner, Left, Right, Full)", "Funções de Janela (Window Functions)", "Otimização de Índices e Planos de Execução"]
        },
        {
          id: "mod-db-2",
          titulo: "Bancos NoSQL e Alta Performance",
          aulas: ["Bancos de Documentos (MongoDB)", "Bancos de Chave-Valor em Memória (Redis)", "Bancos de Grafos (Neo4j)", "Replicação Master-Slave e Sharding"]
        },
        {
          id: "mod-db-3",
          titulo: "Engenharia de Dados em Larga Escala",
          aulas: ["Pipelines ETL vs ELT", "Data Warehouses (Snowflake, BigQuery)", "Data Lakes e Formatos Parquet/Delta", "Orquestração de Dados com Apache Airflow"]
        }
      ]
    },
    {
      id: "trilha-ia",
      titulo: "Inteligência Artificial & Machine Learning",
      icone: "🧠",
      cor: "#EC4899",
      descricao: "De redes neurais profundas até Modelos de Linguagem de Grande Porte (LLMs), RAG e Agentes Inteligentes.",
      modulos: [
        {
          id: "mod-ai-1",
          titulo: "Redes Neurais e Deep Learning",
          aulas: ["O Neurônio Artificial (Perceptron)", "Funções de Ativação (ReLU, Sigmoid, Softmax)", "Backpropagation e Gradiente Descendente", "Redes Neurais Convolucionais (CNNs)"]
        },
        {
          id: "mod-ai-2",
          titulo: "Processamento de Linguagem Natural (NLP)",
          aulas: ["Embeddings Vetoriais e Semântica", "A Arquitetura Transformer", "Mecanismo de Atenção (Self-Attention)", "Fine-Tuning e Transfer Learning"]
        },
        {
          id: "mod-ai-3",
          titulo: "IA Generativa Moderna & Agentes",
          aulas: ["LLMs e Engenharia de Prompt Avançada", "RAG (Retrieval-Augmented Generation)", "Bancos Vetoriais (Pinecone, ChromaDB)", "Agentes Autônomos e Chamada de Ferramentas (Tool Calling)"]
        }
      ]
    },
    {
      id: "trilha-devops",
      titulo: "DevOps, SRE e CI/CD",
      icone: "🚀",
      cor: "#8B5CF6",
      descricao: "Automatize deploys, domine contêineres com Docker e Kubernetes, e garanta observabilidade total do sistema.",
      modulos: [
        {
          id: "mod-dvo-1",
          titulo: "Contêineres com Docker",
          aulas: ["Diferença entre VM e Contêiner", "Criando Dockerfiles Eficientes e Multi-Stage", "Redes e Volumes Persistentes", "Orquestração Local com Docker Compose"]
        },
        {
          id: "mod-dvo-2",
          titulo: "Integração e Entrega Contínua (CI/CD)",
          aulas: ["Pipelines com GitHub Actions e GitLab CI", "Testes Automatizados e Linters na Esteira", "Estratégias de Deploy: Blue-Green e Canary", "Infraestrutura como Código (Terraform)"]
        },
        {
          id: "mod-dvo-3",
          titulo: "Kubernetes e Confiabilidade (SRE)",
          aulas: ["Arquitetura de Cluster do Kubernetes (K8s)", "Pods, Deployments e Services", "Monitoramento com Prometheus e Grafana", "SLIs, SLOs e Gestão de Incidentes"]
        }
      ]
    }
  ],

  // 5. BIBLIOTECA DE CONCEITOS / GLOSSÁRIO (MÍNIMO 8 CONCEITOS POR TRILHA = 64 CONCEITOS COMPLETOS)
  conceitos: [
    // Ciência de Dados (8)
    {
      termo: "Overfitting",
      trilha: "trilha-dados",
      nivel: "Intermediário",
      definicao: "Quando um modelo de Machine Learning decora excessivamente os dados de treino a ponto de perder a capacidade de generalizar para dados novos.",
      exemploReal: "Um modelo acerta 99% das notas de provas antigas do colégio, mas tira nota baixa em uma prova com questões inéditas.",
      codigo: "# Prevenindo overfitting com regularização\nfrom sklearn.linear_model import Ridge\nmodelo = Ridge(alpha=1.0)"
    },
    {
      termo: "Pandas DataFrame",
      trilha: "trilha-dados",
      nivel: "Iniciante",
      definicao: "Estrutura de dados tabular bidimensional em Python com linhas e colunas rotuladas, similar a uma planilha do Excel ultra veloz.",
      exemploReal: "Manipulação de milhões de transações de vendas com filtros e agrupamentos instantâneos.",
      codigo: "import pandas as pd\ndf = pd.DataFrame({'Aluno': ['Ana', 'Leo'], 'Nota': [9.5, 8.0]})\nprint(df.describe())"
    },
    {
      termo: "Desvio Padrão",
      trilha: "trilha-dados",
      nivel: "Iniciante",
      definicao: "Medida estatística que indica o quanto os dados de um conjunto se afastam ou variam em relação à média aritmética.",
      exemploReal: "Dois restaurantes com média de atendimento de 20 minutos: um oscila entre 19 e 21 min (baixo desvio), o outro entre 5 e 35 min (alto desvio).",
      codigo: "import numpy as np\ndados = [10, 12, 14, 12, 11]\nsigma = np.std(dados)"
    },
    {
      termo: "Matriz de Confusão",
      trilha: "trilha-dados",
      nivel: "Intermediário",
      definicao: "Tabela que compara as previsões feitas por um modelo de classificação com os valores reais, mostrando Verdadeiros Positivos, Falsos Positivos, etc.",
      exemploReal: "Identificar quantos e-mails normais foram erroneamente classificados como spam pelo filtro.",
      codigo: "from sklearn.metrics import confusion_matrix\ncm = confusion_matrix(y_real, y_previsto)"
    },
    {
      termo: "Outlier",
      trilha: "trilha-dados",
      nivel: "Iniciante",
      definicao: "Um valor atípico que se distancia drasticamente da maioria dos outros pontos do conjunto de dados.",
      exemploReal: "Em uma pesquisa salarial de bairro onde a maioria ganha R$ 4.000, um bilionário mora na rua e distorce a média para R$ 50.000.",
      codigo: "# Removendo outliers com z-score\nz = (df['salario'] - media) / desvio_padrao\ndf_limpo = df[z.abs() < 3]"
    },
    {
      termo: "Random Forest",
      trilha: "trilha-dados",
      nivel: "Intermediário",
      definicao: "Algoritmo de aprendizado por comitê (ensemble) que cria dezenas de árvores de decisão independentes e combina suas respostas por voto majoritário.",
      exemploReal: "Aprovação de crédito bancário baseada na votação de 100 árvores que analisam renda, score e histórico.",
      codigo: "from sklearn.ensemble import RandomForestClassifier\nclf = RandomForestClassifier(n_estimators=100)\nclf.fit(X_treino, y_treino)"
    },
    {
      termo: "Imputação de Dados",
      trilha: "trilha-dados",
      nivel: "Iniciante",
      definicao: "Processo de preencher campos vazios ou nulos (NaN) em um conjunto de dados utilizando estratégias como média, mediana ou moda.",
      exemploReal: "Substituir idades não informadas no cadastro pela média de idade de todos os clientes.",
      codigo: "df['idade'].fillna(df['idade'].median(), inplace=True)"
    },
    {
      termo: "Validação Cruzada (Cross-Validation)",
      trilha: "trilha-dados",
      nivel: "Avançado",
      definicao: "Técnica que divide a base em múltiplos blocos (K-Folds) rotacionando o treino e teste para garantir que o modelo não dependa da sorte de uma única divisão.",
      exemploReal: "Garantir que um diagnóstico médico de IA seja robusto e confiável em diferentes grupos de pacientes.",
      codigo: "from sklearn.model_selection import cross_val_score\nscores = cross_val_score(modelo, X, y, cv=5)"
    },

    // Programação (8)
    {
      termo: "Recursão",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "Conceito em que uma função chama a si mesma para resolver instâncias menores do mesmo problema, exigindo uma condição de parada (caso base).",
      exemploReal: "Percorrer pastas e subpastas de um disco rígido até não existirem mais subpastas.",
      codigo: "def fatorial(n):\n    if n <= 1: return 1  # Caso base\n    return n * fatorial(n - 1)"
    },
    {
      termo: "Complexidade Big O",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "Notação matemática que descreve como o tempo de execução ou o consumo de memória de um algoritmo cresce à medida que o volume de dados de entrada aumenta.",
      exemploReal: "Saber se um sistema continuará rápido quando o número de usuários passar de 1.000 para 10.000.000.",
      codigo: "# O(1) constante vs O(n) linear\ndef busca_rapida(dicionario, chave): return dicionario[chave] # O(1)"
    },
    {
      termo: "Polimorfismo",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "Princípio da orientação a objetos onde classes filhas diferentes podem responder à mesma chamada de método de maneiras customizadas.",
      exemploReal: "Uma classe Cachorro e uma classe Gato respondem ao método 'emitir_som()' com 'Au Au' e 'Miau'.",
      codigo: "class Animal:\n    def emitir_som(self): pass\nclass Gato(Animal):\n    def emitir_som(self): return 'Miau!'"
    },
    {
      termo: "Tabela Hash (Hash Table)",
      trilha: "trilha-programacao",
      nivel: "Iniciante",
      definicao: "Estrutura que armazena pares chave-valor e utiliza uma função de hashing matemática para encontrar qualquer elemento em tempo constante O(1).",
      exemploReal: "Os dicionários do Python {} e os Maps do JavaScript.",
      codigo: "tabela = {'usuario_123': 'Ana Clara'}\nprint(tabela['usuario_123'])"
    },
    {
      termo: "Princípio da Responsabilidade Única (SRP)",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "A letra 'S' do SOLID: uma classe ou módulo deve ter um, e apenas um, motivo para ser modificada.",
      exemploReal: "Uma classe de Usuário não deve conter a lógica de enviar e-mails nem a lógica de emitir boleto.",
      codigo: "# Correto: Classes separadas com propósitos específicos\nclass UsuarioService: ...\nclass EmailNotificationService: ..."
    },
    {
      termo: "Ponteiros e Referências",
      trilha: "trilha-programacao",
      nivel: "Avançado",
      definicao: "Uma variável que armazena diretamente o endereço físico de memória RAM onde outro dado reside.",
      exemploReal: "Em C e C++, ponteiros permitem modificar grandes estruturas de dados sem precisar duplicá-las na memória.",
      codigo: "int x = 42;\nint *ptr = &x; // Armazena o endereço de x"
    },
    {
      termo: "Garbage Collector (Coletor de Lixo)",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "Mecanismo automático em linguagens como Java, Python e JavaScript que rastreia e libera da memória objetos que não estão mais sendo referenciados.",
      exemploReal: "O programador não precisa se preocupar em chamar free() ou deletar variáveis descartadas manualmente.",
      codigo: "# Ao final da função, a lista é automaticamente liberada\ndef tarefa():\n    temp = [i for i in range(1000)]"
    },
    {
      termo: "Design Pattern Singleton",
      trilha: "trilha-programacao",
      nivel: "Intermediário",
      definicao: "Padrão de projeto que garante que uma classe tenha apenas uma única instância em todo o ciclo de vida da aplicação, fornecendo um ponto de acesso global.",
      exemploReal: "Pool de conexão com o banco de dados principal da aplicação.",
      codigo: "class DatabaseConnection:\n    _instancia = None\n    def __new__(cls):\n        if not cls._instancia:\n            cls._instancia = super().__new__(cls)\n        return cls._instancia"
    },

    // Redes (8)
    {
      termo: "Modelo OSI",
      trilha: "trilha-redes",
      nivel: "Iniciante",
      definicao: "Modelo conceitual de 7 camadas (Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação) que padroniza a comunicação entre sistemas de computação.",
      exemploReal: "Diagnosticar problemas de rede: cabo quebrado é Camada 1, IP errado é Camada 3, porta fechada é Camada 4.",
      codigo: "# Camadas: 1-Física, 2-Enlace, 3-Rede, 4-Transporte, 5-Sessão, 6-Apresentação, 7-Aplicação"
    },
    {
      termo: "TCP Three-Way Handshake",
      trilha: "trilha-redes",
      nivel: "Intermediário",
      definicao: "Processo de três etapas (SYN, SYN-ACK, ACK) pelo qual dois computadores estabelecem uma conexão de transporte segura e sincronizada antes de transmitir dados.",
      exemploReal: "O início de qualquer chamada de página web ou envio de e-mail confiável.",
      codigo: "# Fluxo:\n# Cliente -> [SYN] -> Servidor\n# Cliente <- [SYN-ACK] <- Servidor\n# Cliente -> [ACK] -> Servidor (Conexão Estabelecida)"
    },
    {
      termo: "DNS (Domain Name System)",
      trilha: "trilha-redes",
      nivel: "Iniciante",
      definicao: "O sistema distribuído que traduz nomes legíveis por humanos (como www.techlab.com) nos endereços numéricos IP que as máquinas entendem.",
      exemploReal: "A agenda de contatos do seu celular: você clica no nome do amigo, mas o aparelho disca o número do telefone.",
      codigo: "$ nslookup google.com\n# Server: 8.8.8.8\n# Address: 142.250.190.46"
    },
    {
      termo: "Máscara de Sub-rede & CIDR",
      trilha: "trilha-redes",
      nivel: "Intermediário",
      definicao: "Notação que divide um endereço IP em duas partes: a identificação da rede e a identificação do host (computador) dentro daquela rede.",
      exemploReal: "O sufixo /24 indica que os primeiros 24 bits pertencem à rede, restando 8 bits para hosts (até 254 aparelhos na mesma rede).",
      codigo: "# IP: 192.168.1.100 / 24\n# Máscara: 255.255.255.0"
    },
    {
      termo: "NAT (Network Address Translation)",
      trilha: "trilha-redes",
      nivel: "Intermediário",
      definicao: "Tecnologia que remapeia um espaço de endereços IP privados em um único IP público na saída do roteador, contornando a escassez de endereços IPv4.",
      exemploReal: "Seus 10 aparelhos domésticos navegam na internet compartilhando o único IP público fornecido pela sua operadora de fibra.",
      codigo: "# Tabela NAT do Roteador:\n# 192.168.1.15:52341 <---> 200.180.50.2:40123"
    },
    {
      termo: "BGP (Border Gateway Protocol)",
      trilha: "trilha-redes",
      nivel: "Avançado",
      definicao: "O protocolo de roteamento que governa o tráfego entre sistemas autônomos (grandes provedores e operadoras) em toda a escala da internet global.",
      exemploReal: "Quando o BGP do Facebook falhou em 2021, a empresa sumiu do mapa da internet mundial por várias horas.",
      codigo: "# Rota anunciada via AS-PATH entre operadoras globais"
    },
    {
      termo: "VLAN (Virtual LAN)",
      trilha: "trilha-redes",
      nivel: "Intermediário",
      definicao: "Segmentação lógica de uma rede física local em múltiplas redes isoladas em switches gerenciáveis, sem necessidade de cabos separados.",
      exemploReal: "Separar os computadores da diretoria dos computadores dos alunos na mesma infraestrutura de uma escola.",
      codigo: "# Switch config:\nswitchport mode access\nswitchport access vlan 20"
    },
    {
      termo: "QUIC e HTTP/3",
      trilha: "trilha-redes",
      nivel: "Avançado",
      definicao: "Nova geração de protocolo de transporte web que roda sobre UDP com criptografia TLS embutida, eliminando atrasos de handshake e bloqueios de linha (Head-of-Line Blocking).",
      exemploReal: "Streaming de vídeo do YouTube e pesquisas no Google carregando instantaneamente em conexões móveis 5G.",
      codigo: "# Protocolo: UDP porta 443 com ALPN h3"
    },

    // Cibersegurança (8)
    {
      termo: "Tríade CIA",
      trilha: "trilha-seguranca",
      nivel: "Iniciante",
      definicao: "Os três pilares fundamentais da segurança da informação: Confidencialidade (somente pessoas autorizadas leem), Integridade (os dados não foram corrompidos ou alterados) e Disponibilidade (o sistema está no ar quando necessário).",
      exemploReal: "Um prontuário médico deve ser sigiloso (C), não pode ter dosagens alteradas por engano (I) e deve estar disponível na emergência (A).",
      codigo: "# Confidencialidade: Criptografia\n# Integridade: Hashes (SHA-256)\n# Disponibilidade: Redundância e backups"
    },
    {
      termo: "SQL Injection (SQLi)",
      trilha: "trilha-seguranca",
      nivel: "Intermediário",
      definicao: "Vulnerabilidade em que um invasor insere comandos maliciosos de SQL em campos de formulário para burlar autenticações ou despejar o banco de dados.",
      exemploReal: "Digitar ' OR '1'='1 no campo de senha para fazer login como administrador sem saber a senha.",
      codigo: "# VULNERÁVEL:\nsql = f'SELECT * FROM user WHERE pass = \"{input}\"'\n# SEGURO (Prepared Statements):\ncursor.execute('SELECT * FROM user WHERE pass = %s', (input,))"
    },
    {
      termo: "Cross-Site Scripting (XSS)",
      trilha: "trilha-seguranca",
      nivel: "Intermediário",
      definicao: "Falha de segurança web onde scripts maliciosos em JavaScript são injetados em páginas vistas por outros usuários, permitindo o roubo de cookies e sessões.",
      exemploReal: "Um usuário posta um comentário em um blog contendo <script>roubar_tokens()</script> e quem abre a página tem sua sessão clonada.",
      codigo: "// Prevenção: Sanitizar e escapar HTML\nelement.textContent = comentarioUsuario; // Seguro!"
    },
    {
      termo: "Criptografia Assimétrica (Chave Pública/Privada)",
      trilha: "trilha-seguranca",
      nivel: "Intermediário",
      definicao: "Sistema criptográfico que utiliza um par de chaves matemáticas: a Chave Pública (que qualquer um pode ter para trancar mensagens) e a Chave Privada (que só você tem para destrancar).",
      exemploReal: "O protocolo SSH e as conexões seguras HTTPS de todos os bancos do mundo.",
      codigo: "# Gerando chaves SSH seguras\n$ ssh-keygen -t ed25519 -C 'seu_email@techlab.com'"
    },
    {
      termo: "Zero Trust (Confiança Zero)",
      trilha: "trilha-seguranca",
      nivel: "Avançado",
      definicao: "Filosofia de segurança arquitetural baseada no lema: 'Nunca confie, sempre verifique'. Nenhum usuário ou aparelho dentro ou fora da rede corporativa é confiável por padrão.",
      exemploReal: "Exigir MFA e validação de dispositivo saudável para cada microacesso a um arquivo, mesmo se o funcionário estiver conectado no Wi-Fi interno da empresa.",
      codigo: "# Políticas baseadas em identidade, contexto e postura do dispositivo"
    },
    {
      termo: "Hash Criptográfico (SHA-256)",
      trilha: "trilha-seguranca",
      nivel: "Iniciante",
      definicao: "Algoritmo unidirecional que transforma qualquer entrada de texto ou arquivo em uma impressão digital de comprimento fixo (ex: 64 caracteres hexadecimais), sem permitir o caminho inverso.",
      exemploReal: "Bancos e sistemas nunca salvam senhas puras: salvam apenas o hash criptográfico com sal (salt).",
      codigo: "import hashlib\nhash = hashlib.sha256('senha_secreta'.encode()).hexdigest()\nprint(hash)"
    },
    {
      termo: "Autenticação em Dois Fatores (2FA/MFA)",
      trilha: "trilha-seguranca",
      nivel: "Iniciante",
      definicao: "Exigência de pelo menos duas categorias de credenciais para autenticar o usuário: algo que ele sabe (senha), algo que ele tem (celular/token) ou algo que ele é (biometria).",
      exemploReal: "Digitar a senha da conta e em seguida aprovar a notificação push no aplicativo do banco no smartphone.",
      codigo: "# Fatores: Conhecimento (Senha) + Posse (App TOTP Authenticator)"
    },
    {
      termo: "Ransomware",
      trilha: "trilha-seguranca",
      nivel: "Iniciante",
      definicao: "Tipo devastador de malware que criptografa os arquivos do servidor ou computador da vítima e exige o pagamento de um resgate (geralmente em criptomoedas) para fornecer a chave de descriptografia.",
      exemploReal: "Hospitais ou prefeituras paralisadas por semanas devido a arquivos de pacientes bloqueados por cibercriminosos.",
      codigo: "# Melhor defesa: Backups imutáveis offline (regra 3-2-1) e conscientização contra anexos suspeitos"
    },

    // Cloud Computing (8)
    {
      termo: "Serverless (Computação Sem Servidor)",
      trilha: "trilha-cloud",
      nivel: "Intermediário",
      definicao: "Modelo de execução em nuvem onde o provedor provisiona, escala e gerencia a infraestrutura de servidores sob demanda. Você só paga pelos milissegundos exatos em que seu código está rodando.",
      exemploReal: "AWS Lambda, Google Cloud Functions ou Vercel Serverless Functions.",
      codigo: "// Função serverless que roda sob demanda\nexport default function handler(req, res) {\n  res.status(200).json({ status: 'Online!' });\n}"
    },
    {
      termo: "Armazenamento em Objeto (Object Storage / S3)",
      trilha: "trilha-cloud",
      nivel: "Iniciante",
      definicao: "Serviço de armazenamento escalável e de altíssima durabilidade projetado para guardar arquivos não estruturados (fotos, vídeos, backups, PDFs) identificados por uma chave única (URL).",
      exemploReal: "O Amazon S3 ou Google Cloud Storage guardando as fotos de perfil de milhões de usuários de um app.",
      codigo: "# Upload para bucket S3 com AWS CLI\n$ aws s3 cp foto.jpg s3://meu-bucket-techlab/fotos/"
    },
    {
      termo: "Elasticidade vs Escalabilidade",
      trilha: "trilha-cloud",
      nivel: "Intermediário",
      definicao: "Escalabilidade é a capacidade do sistema suportar mais carga adicionando recursos. Elasticidade é a capacidade de fazer isso dinamicamente, aumentando na Black Friday e encolhendo na madrugada para economizar dinheiro.",
      exemploReal: "Uma loja online que sobe de 2 para 50 servidores durante a promoção e volta para 2 na segunda-feira automaticamente.",
      codigo: "# Auto Scaling Policy: Target Tracking CPU em 70%"
    },
    {
      termo: "Zona de Disponibilidade (Availability Zone / AZ)",
      trilha: "trilha-cloud",
      nivel: "Iniciante",
      definicao: "Um ou mais data centers físicos isolados dentro de uma mesma região geográfica, equipados com energia elétrica, geradores e conexões de rede redundantes e independentes.",
      exemploReal: "Se faltar energia em um bairro de São Paulo derrubando a AZ-1a, seu banco de dados na AZ-1b continua atendendo os clientes sem interrupção.",
      codigo: "# Alta disponibilidade: Multi-AZ Deployment ativado"
    },
    {
      termo: "VPC (Virtual Private Cloud)",
      trilha: "trilha-cloud",
      nivel: "Intermediário",
      definicao: "Uma rede virtual logicamente isolada na nuvem onde você executa seus servidores, definindo suas próprias faixas de IP, sub-redes públicas e privadas, tabelas de rotas e gateways de internet.",
      exemploReal: "Colocar os bancos de dados em uma sub-rede privada sem acesso direto da internet e os servidores web na sub-rede pública.",
      codigo: "# Bloco CIDR padrão da VPC: 10.0.0.0/16"
    },
    {
      termo: "Content Delivery Network (CDN)",
      trilha: "trilha-cloud",
      nivel: "Iniciante",
      definicao: "Rede distribuída de servidores de borda espalhados pelo mundo que armazena cópias de arquivos estáticos (imagens, CSS, vídeos) perto do usuário final, reduzindo drasticamente o tempo de carregamento.",
      exemploReal: "Cloudflare, AWS CloudFront ou Fastly entregando o logo do site a partir de um servidor em São Paulo para quem mora no Brasil.",
      codigo: "# Cache-Control: public, max-age=31536000, immutable"
    },
    {
      termo: "Infraestrutura como Código (IaC)",
      trilha: "trilha-cloud",
      nivel: "Intermediário",
      definicao: "Prática de provisionar e gerenciar recursos de nuvem (servidores, redes, bancos) através de arquivos declarativos de configuração legíveis por máquina, como Terraform ou CloudFormation.",
      exemploReal: "Criar toda a infraestrutura de servidores da empresa em 3 cliques executando um comando no terminal.",
      codigo: "# Terraform HCL:\nresource \"aws_s3_bucket\" \"dados\" {\n  bucket = \"techlab-data-bucket\"\n}"
    },
    {
      termo: "FinOps",
      trilha: "trilha-cloud",
      nivel: "Avançado",
      definicao: "Cultura e prática de gestão financeira em nuvem que une equipes de engenharia, finanças e negócios para otimizar os gastos com infraestrutura e maximizar o retorno sobre investimento.",
      exemploReal: "Desligar ambientes de teste durante a noite e usar instâncias reservadas ou spot para economizar 40% na fatura da AWS.",
      codigo: "# Identificar instâncias zumbis sem uso através de métricas do CloudWatch"
    },

    // Banco de Dados (8)
    {
      termo: "ACID",
      trilha: "trilha-banco",
      nivel: "Intermediário",
      definicao: "Acrônimo para as quatro propriedades essenciais de um SGBD relacional: Atomicidade, Consistência, Isolamento e Durabilidade, garantindo que transações sejam à prova de falhas.",
      exemploReal: "Transferências bancárias entre contas correntes.",
      codigo: "BEGIN TRANSACTION;\nUPDATE contas SET saldo = saldo - 100 WHERE id = 1;\nUPDATE contas SET saldo = saldo + 100 WHERE id = 2;\nCOMMIT;"
    },
    {
      termo: "Índice B-Tree",
      trilha: "trilha-banco",
      nivel: "Intermediário",
      definicao: "Estrutura de dados em árvore auto-balanceada utilizada pela maioria dos bancos de dados relacionais para localizar registros em tempo logarítmico O(log n).",
      exemploReal: "O sumário de um livro técnico com 1.000 páginas: você vai direto na página certa sem folhear o livro inteiro.",
      codigo: "CREATE INDEX idx_usuarios_email ON usuarios(email);"
    },
    {
      termo: "INNER JOIN vs LEFT JOIN",
      trilha: "trilha-banco",
      nivel: "Iniciante",
      definicao: "INNER JOIN retorna apenas as linhas que possuem correspondência em ambas as tabelas. LEFT JOIN retorna todas as linhas da tabela da esquerda, completando com NULL onde não houver par na direita.",
      exemploReal: "LEFT JOIN entre Clientes e Pedidos: mostra até mesmo clientes novos que ainda nunca compraram nada.",
      codigo: "SELECT c.nome, p.valor\nFROM clientes c\nLEFT JOIN pedidos p ON c.id = p.cliente_id;"
    },
    {
      termo: "Normalização de Dados",
      trilha: "trilha-banco",
      nivel: "Intermediário",
      definicao: "Processo sistemático de organização de tabelas em formas normais (1FN, 2FN, 3FN) para eliminar redundâncias e anomalias de inserção, atualização e exclusão.",
      exemploReal: "Não repetir o endereço completo da filial em cada linha de venda de funcionário: criar uma tabela 'filiais' separada.",
      codigo: "# 3FN: Eliminar dependências transitivas entre colunas"
    },
    {
      termo: "Redis (Cache em Memória)",
      trilha: "trilha-banco",
      nivel: "Iniciante",
      definicao: "Banco de dados NoSQL de chave-valor que armazena os dados inteiramente na memória RAM, entregando respostas em sub-milissegundos.",
      exemploReal: "Salvar o carrinho de compras ativo e o token de login do usuário logado.",
      codigo: "import redis\nr = redis.Redis(host='localhost', port=6379)\nr.set('sessao_user_42', 'token_xyz123', ex=3600)"
    },
    {
      termo: "Sharding (Fragmentação Horizontal)",
      trilha: "trilha-banco",
      nivel: "Avançado",
      definicao: "Técnica de particionamento de um banco de dados gigantesco em vários servidores menores e independentes (shards), distribuindo a carga de leitura e gravação.",
      exemploReal: "Um banco com 500 milhões de usuários: clientes da América do Sul no servidor 1, da Europa no servidor 2, da Ásia no servidor 3.",
      codigo: "# Roteamento por chave de partição (Shard Key): user_id % 3"
    },
    {
      termo: "Deadlock",
      trilha: "trilha-banco",
      nivel: "Avançado",
      definicao: "Situação de impasse onde duas transações concorrentes bloqueiam um recurso e ficam aguardando o recurso bloqueado pela outra, paralisando indefinidamente.",
      exemploReal: "A transação 1 bloqueia a linha A e precisa da B. A transação 2 bloqueia a linha B e precisa da A. O banco precisa abortar uma delas.",
      codigo: "# O SGBD detecta o ciclo de bloqueio e lança um erro de Deadlock"
    },
    {
      termo: "Data Warehouse vs Data Lake",
      trilha: "trilha-banco",
      nivel: "Intermediário",
      definicao: "Data Warehouse armazena dados altamente estruturados e tratados para relatórios de BI (ex: Snowflake). Data Lake armazena qualquer tipo de dado em seu formato bruto original (JSON, logs, imagens).",
      exemploReal: "O Data Lake guarda terabytes de cliques brutos do aplicativo; o Data Warehouse guarda o faturamento diário consolidado.",
      codigo: "# Arquitetura Lakehouse unindo o melhor dos dois mundos"
    },

    // IA & Machine Learning (8)
    {
      termo: "Embeddings Vetoriais",
      trilha: "trilha-ia",
      nivel: "Intermediário",
      definicao: "Representação de palavras, frases, imagens ou códigos como listas densas de números (vetores matemáticos em centenas de dimensões) onde conceitos com significados parecidos ficam próximos no espaço.",
      exemploReal: "O vetor de 'rei' - 'homem' + 'mulher' resulta matematicamente em um vetor extremamente próximo de 'rainha'.",
      codigo: "# Texto convertido em array de 1536 dimensões:\n[0.012, -0.045, 0.891, ...]"
    },
    {
      termo: "RAG (Retrieval-Augmented Generation)",
      trilha: "trilha-ia",
      nivel: "Intermediário",
      definicao: "Arquitetura que combina recuperação de documentos próprios com modelos de linguagem: antes do modelo responder, o sistema busca trechos relevantes nos seus arquivos privados e injeta no prompt.",
      exemploReal: "Um assistente que tira dúvidas jurídicas citando com precisão os PDFs internos da sua empresa, sem alucinar.",
      codigo: "# 1. Busca semântica no banco vetorial -> 2. Injeta contexto no prompt -> 3. LLM responde"
    },
    {
      termo: "Transformer",
      trilha: "trilha-ia",
      nivel: "Avançado",
      definicao: "A arquitetura de rede neural profunda introduzida pelo Google no paper 'Attention Is All You Need' (2017) que viabilizou o ChatGPT, Gemini e todos os LLMs modernos através do mecanismo de atenção.",
      exemploReal: "Permite que o modelo analise todas as palavras de um parágrafo simultaneamente, entendendo o contexto global.",
      codigo: "# Mecanismo de Atenção:\nAttention(Q, K, V) = softmax(Q * K^T / sqrt(d_k)) * V"
    },
    {
      termo: "Alucinação em IA",
      trilha: "trilha-ia",
      nivel: "Iniciante",
      definicao: "Fenômeno em que um modelo de linguagem gera respostas convincentes, gramaticalmente perfeitas e eloquentes, porém com fatos completamente inventados ou falsos.",
      exemploReal: "Inventar um artigo de lei que nunca existiu para embasar uma petição ou citar um livro inexistente.",
      codigo: "# Mitigação: Baixar a 'temperature' do modelo para 0.0 e usar RAG com fontes verificadas"
    },
    {
      termo: "Função de Perda (Loss Function)",
      trilha: "trilha-ia",
      nivel: "Intermediário",
      definicao: "Fórmula matemática que calcula a diferença (o erro) entre a previsão feita pela rede neural e a resposta real correta durante o treinamento.",
      exemploReal: "O erro quadrático médio (MSE) para prever preços de imóveis ou Cross-Entropy para classificação.",
      codigo: "import torch.nn as nn\ncriterio = nn.CrossEntropyLoss()"
    },
    {
      termo: "Fine-Tuning",
      trilha: "trilha-ia",
      nivel: "Avançado",
      definicao: "Processo de pegar um modelo pré-treinado em um volume colossal de dados gerais e treiná-lo adicionalmente com um conjunto menor e especializado de dados de um domínio específico.",
      exemploReal: "Ajustar um modelo de linguagem para se comunicar perfeitamente na linguagem e termos médicos de radiologia.",
      codigo: "# Ajuste de pesos específicos com LoRA (Low-Rank Adaptation)"
    },
    {
      termo: "Backpropagation",
      trilha: "trilha-ia",
      nivel: "Avançado",
      definicao: "O algoritmo central de aprendizado das redes neurais que calcula os gradientes do erro da saída em direção às camadas de entrada usando a Regra da Cadeia do cálculo diferencial, ajustando os pesos sinápticos.",
      exemploReal: "O cérebro do robô aprendendo com o erro de mira e ajustando os músculos virtuais a cada disparo.",
      codigo: "loss.backward() # No PyTorch: computa os gradientes\noptimizer.step() # Atualiza os pesos"
    },
    {
      termo: "Bancos de Dados Vetoriais",
      trilha: "trilha-ia",
      nivel: "Intermediário",
      definicao: "Bancos de dados especializados em armazenar embeddings e calcular distâncias geométricas (como Similaridade por Cosseno) em milissegundos para busca semântica.",
      exemploReal: "Pinecone, ChromaDB, Milvus, Qdrant e a extensão pgvector do PostgreSQL.",
      codigo: "-- Busca por proximidade vetorial no pgvector:\nSELECT * FROM documentos ORDER BY embedding <=> '[0.1, 0.2, ...]' LIMIT 5;"
    },

    // DevOps (8)
    {
      termo: "Docker Contêiner",
      trilha: "trilha-devops",
      nivel: "Iniciante",
      definicao: "Pacote padronizado, leve e isolado que empacota o código da aplicação com todas as suas dependências, bibliotecas e configurações do sistema operacional, garantindo que rode identicamente em qualquer lugar.",
      exemploReal: "O fim do clássico pesadelo: 'Na minha máquina funciona, por que não funciona no servidor?'.",
      codigo: "# Dockerfile básico\nFROM node:20-alpine\nWORKDIR /app\nCOPY . .\nCMD [\"node\", \"server.js\"]"
    },
    {
      termo: "Pipeline de CI/CD",
      trilha: "trilha-devops",
      nivel: "Iniciante",
      definicao: "Integração Contínua (CI) testa e valida o código a cada commit automaticamente. Entrega/Deploy Contínuo (CD) publica a versão testada em produção sem intervenção humana manual.",
      exemploReal: "Você envia um git push e em 3 minutos seus testes rodam, a imagem Docker é gerada e o site novo entra no ar sozinho.",
      codigo: "# GitHub Actions Workflow:\non: [push]\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test"
    },
    {
      termo: "Kubernetes (K8s)",
      trilha: "trilha-devops",
      nivel: "Avançado",
      definicao: "Plataforma de código aberto criada pelo Google para orquestrar, automatizar o deploy, escalar e gerenciar clusters inteiros com centenas de contêineres Docker.",
      exemploReal: "Se um contêiner cair por erro de memória, o Kubernetes percebe em 2 segundos, mata o contêiner quebrado e sobe um novo em seu lugar.",
      codigo: "$ kubectl get pods\n$ kubectl scale deployment api-usuarios --replicas=10"
    },
    {
      termo: "Estratégia Blue-Green Deployment",
      trilha: "trilha-devops",
      nivel: "Intermediário",
      definicao: "Técnica de lançamento onde você mantém dois ambientes idênticos de produção (Azul e Verde). Você sobe a versão nova no Verde e, quando tudo estiver testado, vira o roteador de tráfego instantaneamente com zero tempo de inatividade.",
      exemploReal: "Atualizar um sistema bancário de madrugada sem que nenhum cliente caia ou veja tela de manutenção.",
      codigo: "# Roteamento no Load Balancer migrando tráfego de 100% Blue para 100% Green"
    },
    {
      termo: "Observabilidade (Métricas, Logs e Traces)",
      trilha: "trilha-devops",
      nivel: "Intermediário",
      definicao: "A capacidade de inferir o estado interno de um sistema complexo apenas analisando suas saídas externas: Métricas (números), Logs (eventos textuais com data/hora) e Traces (rastreamento de uma requisição por múltiplos microsserviços).",
      exemploReal: "Descobrir exatamente qual dos 20 microsserviços demorou 3 segundos para responder uma busca do cliente.",
      codigo: "# OpenTelemetry (OTel) para instrumentação padronizada"
    },
    {
      termo: "Site Reliability Engineering (SRE)",
      trilha: "trilha-devops",
      nivel: "Avançado",
      definicao: "Disciplina criada pelo Google que aplica práticas e mentalidade de engenharia de software para resolver problemas de infraestrutura e operações de sistemas de grande escala.",
      exemploReal: "Definir 'orçamentos de erro' (Error Budgets) para equilibrar a velocidade de lançar coisas novas com a estabilidade do sistema.",
      codigo: "# SLI: 99.9% das requisições com latência < 200ms"
    },
    {
      termo: "Terraform (HCL)",
      trilha: "trilha-devops",
      nivel: "Intermediário",
      definicao: "A ferramenta de Infraestrutura como Código mais popular do mundo, permitindo declarar servidores, redes e bancos em qualquer provedor de nuvem através de código declarativo.",
      exemploReal: "Criar o mesmo ambiente de produção na AWS e no Azure reutilizando modelos de código.",
      codigo: "$ terraform init\n$ terraform plan\n$ terraform apply -auto-approve"
    },
    {
      termo: "Canary Deployment",
      trilha: "trilha-devops",
      nivel: "Intermediário",
      definicao: "Prática de lançar uma nova versão do software para uma porcentagem minúscula de usuários reais (ex: 2%) para observar erros antes de liberar para os outros 98%.",
      exemploReal: "Inspirado no canário que mineiros levavam para as minas de carvão para alertar sobre gases tóxicos antes que humanos fossem afetados.",
      codigo: "# Ingress Controller dividindo 95% do tráfego para v1 e 5% para v2"
    }
  ],

  // 6. LABORATÓRIO DE ANÁLISE DE DADOS (DATASETS PRONTOS PARA ANÁLISE)
  laboratorio: {
    datasetsExemplo: [
      {
        id: "salarios_ti",
        nome: "Salários e Carreiras em TI (Brasil)",
        descricao: "Amostra representativa de salários em reais (R$), nível de experiência, regime de trabalho e tecnologias de profissionais tech no Brasil.",
        csv: `Cargo,Nivel,Experiencia_Anos,Salario_R$,Remoto,Tecnologia_Principal
Analista de Dados,Junior,1,4500,Sim,Python
Analista de Dados,Pleno,3,7800,Sim,SQL
Cientista de Dados,Junior,1,6200,Sim,Python
Cientista de Dados,Pleno,4,11500,Sim,Python
Cientista de Dados,Senior,7,18000,Sim,R
Dev Front-end,Junior,1,4000,Hibrido,JavaScript
Dev Front-end,Pleno,3,7500,Sim,TypeScript
Dev Front-end,Senior,6,13500,Sim,TypeScript
Dev Back-end,Junior,1,4800,Hibrido,Java
Dev Back-end,Pleno,4,8900,Sim,Python
Dev Back-end,Senior,8,16000,Sim,Go
Engenheiro DevOps,Junior,2,6500,Sim,Docker
Engenheiro DevOps,Pleno,5,12000,Sim,Kubernetes
Engenheiro DevOps,Senior,8,19500,Sim,Terraform
Especialista Seguranca,Pleno,4,11000,Presencial,Linux
Especialista Seguranca,Senior,8,18500,Sim,Python
Engenheiro de Dados,Junior,2,6000,Sim,SQL
Engenheiro de Dados,Pleno,4,10500,Sim,Python
Engenheiro de Dados,Senior,7,17500,Sim,SQL
Arquiteto Cloud,Senior,9,22000,Sim,AWS`
      },
      {
        id: "servidores_cloud",
        nome: "Métricas de Servidores Cloud",
        descricao: "Dados de monitoramento operacional de instâncias de nuvem: uso de CPU, memória, latência de rede e custo mensal em dólares ($).",
        csv: `Servidor,Regiao,Tipo_Instancia,Uso_CPU_Perc,Memoria_GB,Latencia_ms,Custo_Mensal_USD
srv-app-prod-01,us-east-1,c5.xlarge,78.5,16,42,125.0
srv-app-prod-02,us-east-1,c5.xlarge,82.1,16,39,125.0
srv-app-prod-03,sa-east-1,c5.xlarge,64.0,16,18,165.0
srv-db-primary,sa-east-1,r5.2xlarge,91.4,64,12,480.0
srv-db-replica-01,sa-east-1,r5.xlarge,45.2,32,15,240.0
srv-cache-redis-01,sa-east-1,cache.m5.large,55.0,8,4,95.0
srv-auth-service,us-east-1,t3.medium,35.8,4,48,32.0
srv-queue-worker-01,us-west-2,c5.large,88.7,8,68,62.5
srv-queue-worker-02,us-west-2,c5.large,84.3,8,65,62.5
srv-search-elastic,sa-east-1,m5.xlarge,72.6,32,22,210.0
srv-cdn-origin,us-east-1,t3.large,28.4,8,38,64.0
srv-analytics-spark,us-east-1,m5.2xlarge,94.2,64,55,380.0`
      },
      {
        id: "alunos_programacao",
        nome: "Desempenho de Estudantes em Programação",
        descricao: "Relação entre horas semanais de estudo, quantidade de exercícios feitos e notas finais em Lógica e Python.",
        csv: `Aluno,Horas_Estudo_Semanal,Exercicios_Resolvidos,Nota_Logica,Nota_Python,Projeto_Entregue
Ana Silva,14,85,9.5,9.8,Sim
Bruno Costa,8,42,7.2,6.5,Sim
Carla Souza,18,120,10.0,9.5,Sim
Diego Rocha,4,15,4.5,3.8,Nao
Eduarda Lima,12,70,8.8,8.2,Sim
Felipe Ramos,6,30,6.0,5.5,Nao
Gabriela Dias,15,95,9.2,9.0,Sim
Hugo Santos,10,55,7.8,7.5,Sim
Isabela Meireles,5,22,5.0,4.8,Nao
Joao Pedro,16,110,9.7,9.6,Sim
Larissa Martins,9,48,7.5,7.0,Sim
Marcos Vinicius,11,62,8.0,7.9,Sim`
      },
      {
        id: "trafego_rede",
        nome: "Tráfego de Rede e Ameaças por Hora",
        descricao: "Registro das 24 horas de um datacenter com volume de conexões simultâneas, largura de banda e incidentes de segurança detectados.",
        csv: `Hora_Dia,Conexoes_Simultaneas,Banda_Mbps,Pacotes_Perdidos,Ameacas_Bloqueadas
00h,1200,450,2,14
02h,850,320,1,8
04h,600,210,0,5
06h,1100,390,1,12
08h,3800,1400,12,45
10h,7200,2800,28,88
12h,8100,3200,35,110
14h,9500,3900,42,145
16h,9200,3750,38,130
18h,6800,2600,24,75
20h,5400,2100,15,62
22h,3100,1200,8,30`
      }
    ]
  },

  // 7. QUIZ E FLASHCARDS (5 QUESTÕES POR ÁREA = 40 QUESTÕES REAIS)
  quiz: {
    areas: [
      { id: "dados", nome: "Ciência de Dados" },
      { id: "programacao", nome: "Programação" },
      { id: "redes", nome: "Redes de Computadores" },
      { id: "seguranca", nome: "Cibersegurança" },
      { id: "cloud", nome: "Cloud Computing" },
      { id: "banco", nome: "Banco de Dados" },
      { id: "ia", nome: "Inteligência Artificial" },
      { id: "devops", nome: "DevOps & SRE" }
    ],
    perguntas: [
      // Ciência de Dados (5)
      {
        id: "q-ds-1",
        area: "dados",
        pergunta: "Qual é a principal diferença entre a Média e a Mediana em um conjunto de dados com outliers extremos?",
        opcoes: [
          "A Média não se altera com valores extremos, enquanto a Mediana varia muito",
          "A Mediana é imune a valores extremos porque representa o elemento central ordenado, enquanto a Média é fortemente distorcida",
          "Ambas são igualmente afetadas por valores extremos",
          "A Mediana só pode ser calculada para números inteiros"
        ],
        correta: 1,
        explicacao: "A Mediana é o valor que divide a lista ordenada ao meio (percentil 50), portanto a presença de um número gigantesco em uma das pontas não afeta sua posição central."
      },
      {
        id: "q-ds-2",
        area: "dados",
        pergunta: "Em uma matriz de confusão de diagnóstico médico, o que é um Falso Negativo?",
        opcoes: [
          "O paciente não tem a doença e o teste diz que ele tem",
          "O paciente tem a doença, mas o teste diz erroneamente que ele é saudável",
          "O paciente é saudável e o teste diz que ele é saudável",
          "O teste deu inconclusivo por falta de amostra"
        ],
        correta: 1,
        explicacao: "Falso Negativo (Erro Tipo II) é quando a condição real é positiva (o paciente tem a doença), porém o modelo previu falsamente que era negativo."
      },
      {
        id: "q-ds-3",
        area: "dados",
        pergunta: "No Pandas, qual método é utilizado para obter uma visão estatística rápida (contagem, média, desvio padrão, quartis) de colunas numéricas?",
        opcoes: [
          "df.summary()",
          "df.describe()",
          "df.info_stats()",
          "df.metrics()"
        ],
        correta: 1,
        explicacao: "O método df.describe() gera automaticamente a contagem, média, desvio padrão, valores mínimo, percentis (25%, 50%, 75%) e máximo de todas as variáveis numéricas."
      },
      {
        id: "q-ds-4",
        area: "dados",
        pergunta: "O que indica um coeficiente de correlação de Pearson com valor igual a -0.92 entre duas variáveis?",
        opcoes: [
          "Ausência total de relação entre as variáveis",
          "Forte correlação linear positiva (quando uma cresce, a outra cresce)",
          "Forte correlação linear negativa (quando uma cresce, a outra diminui proporcionalmente)",
          "Erro grave de cálculo, pois a correlação não pode ser negativa"
        ],
        correta: 2,
        explicacao: "O coeficiente de Pearson varia de -1.0 a +1.0. O valor -0.92 indica uma correlação linear negativa quase perfeita: o aumento de uma variável implica na queda da outra."
      },
      {
        id: "q-ds-5",
        area: "dados",
        pergunta: "Qual é a principal função da técnica de One-Hot Encoding no pré-processamento de dados para Machine Learning?",
        opcoes: [
          "Eliminar todas as linhas com valores nulos",
          "Transformar variáveis categóricas (texto) em colunas binárias numéricas com 0 e 1",
          "Reduzir o número de colunas numéricas usando PCA",
          "Aumentar a velocidade do processador da máquina"
        ],
        correta: 1,
        explicacao: "Modelos matemáticos só entendem números. O One-Hot Encoding transforma categorias como ['Carro', 'Moto'] em colunas separadas 'é_Carro' (1 ou 0) e 'é_Moto' (1 ou 0)."
      },

      // Programação (5)
      {
        id: "q-prg-1",
        area: "programacao",
        pergunta: "Qual é o tempo de execução no pior caso para buscar um elemento em uma Tabela Hash (Hash Table) bem distribuída?",
        opcoes: [
          "O(n²)",
          "O(log n)",
          "O(1) tempo constante",
          "O(n!)"
        ],
        correta: 2,
        explicacao: "Com uma função de dispersão de qualidade que evita colisões, acessar uma chave em uma Hash Table ocorre em tempo constante O(1)."
      },
      {
        id: "q-prg-2",
        area: "programacao",
        pergunta: "O que é uma condição de corrida (Race Condition) em programação concorrente?",
        opcoes: [
          "Quando um programa termina sua execução mais rápido do que o esperado",
          "Quando dois ou mais threads tentam ler e gravar a mesma variável compartilhada simultaneamente sem sincronização",
          "Quando a internet está lenta durante uma requisição HTTP",
          "Um erro de sintaxe detectado pelo compilador antes da execução"
        ],
        correta: 1,
        explicacao: "Acontece quando a ordem de execução imprevisível de dois threads altera o resultado final da memória, gerando dados inconsistentes ou corrompidos."
      },
      {
        id: "q-prg-3",
        area: "programacao",
        pergunta: "No princípio SOLID, o que dita o 'L' (Liskov Substitution Principle)?",
        opcoes: [
          "Classes filhas devem poder substituir suas classes mães em qualquer parte do sistema sem quebrar o comportamento do programa",
          "Toda linha de código deve conter no máximo 80 caracteres",
          "Deve-se usar apenas uma classe por arquivo",
          "Variáveis devem ter nomes curtos e sem acentos"
        ],
        correta: 0,
        explicacao: "Barbara Liskov formulou que se S é um subtipo de T, objetos do tipo T podem ser substituídos por objetos do tipo S sem alterar a corretude do programa."
      },
      {
        id: "q-prg-4",
        area: "programacao",
        pergunta: "Qual das seguintes estruturas de dados funciona estritamente sob a regra FIFO (First In, First Out)?",
        opcoes: [
          "Pilha (Stack)",
          "Fila (Queue)",
          "Árvore Binária (Binary Tree)",
          "Grafo (Graph)"
        ],
        correta: 1,
        explicacao: "Em uma Fila (Queue), o primeiro elemento a entrar é exatamente o primeiro elemento a ser atendido e removido (como a fila do banco ou fila de impressão)."
      },
      {
        id: "q-prg-5",
        area: "programacao",
        pergunta: "Em linguagens compiladas como C e Rust, o que é o 'Stack' em comparação com a 'Heap' da memória?",
        opcoes: [
          "A Stack é lenta e guarda arquivos do disco; a Heap é rápida e fica na nuvem",
          "A Stack é gerenciada automaticamente pela CPU para variáveis locais rápidas; a Heap armazena alocações dinâmicas de tamanho variável",
          "Stack e Heap são exatamente a mesma coisa com nomes diferentes",
          "A Stack guarda apenas strings e a Heap guarda apenas inteiros"
        ],
        correta: 1,
        explicacao: "A memória Stack (pilha de chamadas) é ultrarrápida e alocada/desalocada em ordem estrita de funções. A Heap é a memória de alocação dinâmica flexível."
      },

      // Redes (5)
      {
        id: "q-net-1",
        area: "redes",
        pergunta: "Em qual camada do modelo OSI operam os Roteadores para encaminhar pacotes baseado em endereços IP?",
        opcoes: [
          "Camada 2 - Enlace",
          "Camada 3 - Rede",
          "Camada 4 - Transporte",
          "Camada 7 - Aplicação"
        ],
        correta: 1,
        explicacao: "A Camada 3 (Rede) é a responsável pelo endereçamento lógico (IPv4 e IPv6) e pelo roteamento de pacotes através de redes distintas."
      },
      {
        id: "q-net-2",
        area: "redes",
        pergunta: "Qual é a principal diferença entre o protocolo TCP e o protocolo UDP?",
        opcoes: [
          "O TCP é orientado a conexão e garante entrega ordenada e sem perdas; o UDP envia sem garantia de entrega, priorizando velocidade",
          "O UDP é criptografado por padrão e o TCP nunca é criptografado",
          "O TCP só funciona em redes Wi-Fi e o UDP só em cabos",
          "O UDP é mais lento que o TCP em todas as situações"
        ],
        correta: 0,
        explicacao: "O TCP possui controle de fluxo, retransmissão e confirmação (ACK). O UDP dispara os pacotes sem esperar confirmação, sendo ideal para chamadas de voz e jogos online."
      },
      {
        id: "q-net-3",
        area: "redes",
        pergunta: "Quantos hosts utilizáveis existem em uma rede IPv4 com máscara /24 (255.255.255.0)?",
        opcoes: [
          "256",
          "254",
          "128",
          "512"
        ],
        correta: 1,
        explicacao: "Um bloco /24 tem 2⁸ = 256 endereços totais. Porém, subtraem-se sempre 2: o primeiro (endereço da Rede, .0) e o último (endereço de Broadcast, .255). Restam 254 utilizáveis."
      },
      {
        id: "q-net-4",
        area: "redes",
        pergunta: "Qual porta padrão é utilizada para conexões web criptografadas via HTTPS?",
        opcoes: [
          "Porta 80",
          "Porta 443",
          "Porta 22",
          "Porta 8080"
        ],
        correta: 1,
        explicacao: "A porta padrão internacional reservada para tráfego seguro HTTPS é a 443 (a porta 80 é para HTTP sem criptografia)."
      },
      {
        id: "q-net-5",
        area: "redes",
        pergunta: "Para que serve o protocolo DHCP em uma rede local?",
        opcoes: [
          "Para bloquear ataques de hackers automaticamente",
          "Para distribuir automaticamente endereços IP, máscara e gateway para os dispositivos que se conectam",
          "Para converter nomes de sites em números IP",
          "Para amplificar o sinal da antena Wi-Fi"
        ],
        correta: 1,
        explicacao: "O DHCP (Dynamic Host Configuration Protocol) aluga dinamicamente as configurações de rede para computadores e celulares assim que eles entram no Wi-Fi."
      },

      // Segurança (5)
      {
        id: "q-sec-1",
        area: "seguranca",
        pergunta: "O que é um ataque do tipo 'Man-in-the-Middle' (MitM)?",
        opcoes: [
          "Um vírus que apaga todos os arquivos do computador de uma vez",
          "Quando um invasor se posiciona secretamente entre dois computadores e intercepta ou altera a comunicação entre eles",
          "Um ataque que quebra senhas testando todas as combinações do dicionário",
          "Quando um robô clica repetidamente em anúncios de um site"
        ],
        correta: 1,
        explicacao: "No ataque MitM, o agressor consegue espionar o tráfego que passa entre o cliente e o servidor (por exemplo, em um Wi-Fi público sem criptografia)."
      },
      {
        id: "q-sec-2",
        area: "seguranca",
        pergunta: "Qual é a melhor maneira de defender uma aplicação web contra ataques de Injeção de SQL (SQLi)?",
        opcoes: [
          "Esconder o código fonte usando JavaScript minificado",
          "Utilizar Consultas Parametrizadas (Prepared Statements) ou ORMs em vez de concatenar textos na query",
          "Trocar o banco de dados toda semana",
          "Instalar um antivírus comum no computador do usuário"
        ],
        correta: 1,
        explicacao: "Prepared Statements separam o comando SQL dos dados enviados pelo usuário, impedindo que entradas maliciosas sejam interpretadas como código executável."
      },
      {
        id: "q-sec-3",
        area: "seguranca",
        pergunta: "Por que funções de hash criptográfico como SHA-256 e bcrypt são chamadas de 'unidirecionais'?",
        opcoes: [
          "Porque os dados só podem ser transmitidos de cima para baixo no código",
          "Porque é matematicamente fácil gerar o hash a partir do texto, mas impossível reconstruir o texto original a partir do hash",
          "Porque só funcionam em sistemas operacionais de 64 bits",
          "Porque só aceitam letras maiúsculas como entrada"
        ],
        correta: 1,
        explicacao: "Funções de hash de mão única foram projetadas para que você não consiga 'desfazer' o cálculo matemático, garantindo que mesmo se o banco vazar, a senha real não seja exposta."
      },
      {
        id: "q-sec-4",
        area: "seguranca",
        pergunta: "O que caracteriza um ataque de negação de serviço distribuído (DDoS)?",
        opcoes: [
          "O roubo de chaves criptográficas em computadores quânticos",
          "A inundação de um servidor com milhões de requisições simultâneas originadas de milhares de máquinas infectadas (botnet) até derrubar o serviço",
          "O envio de um único e-mail com anexo malicioso",
          "A alteração manual do cabo de fibra ótica na rua"
        ],
        correta: 1,
        explicacao: "O DDoS utiliza uma rede de computadores zumbis (botnet) para sobrecarregar a memória, CPU ou link de rede do alvo, tornando o site inacessível para clientes reais."
      },
      {
        id: "q-sec-5",
        area: "seguranca",
        pergunta: "Qual é a finalidade de adicionar um 'Salt' aleatório antes de gerar o hash de uma senha?",
        opcoes: [
          "Deixar a senha mais curta para economizar espaço em disco",
          "Impossibilitar o uso de Tabelas Rainbow (tabelas pré-computadas de hashes) por criminosos",
          "Fazer o login ser 10 vezes mais rápido",
          "Permitir que o usuário recupere sua senha sem e-mail"
        ],
        correta: 1,
        explicacao: "O salt é uma sequência aleatória única adicionada à senha antes do hash. Isso faz com que duas senhas idênticas gerem hashes totalmente diferentes, inutilizando Rainbow Tables."
      },

      // Cloud (5)
      {
        id: "q-cld-1",
        area: "cloud",
        pergunta: "Qual modelo de serviço de computação em nuvem fornece a infraestrutura física e virtual bruta (VMs, discos e redes), dando controle total do SO ao cliente?",
        opcoes: [
          "SaaS (Software as a Service)",
          "PaaS (Platform as a Service)",
          "IaaS (Infrastructure as a Service)",
          "FaaS (Function as a Service)"
        ],
        correta: 2,
        explicacao: "IaaS (como Amazon EC2 ou Google Compute Engine) fornece máquinas virtuais e armazenamento bruto, onde o cliente é responsável por configurar o sistema operacional e tudo acima dele."
      },
      {
        id: "q-cld-2",
        area: "cloud",
        pergunta: "Qual é o principal benefício do uso de um Load Balancer (Balanceador de Carga) em uma arquitetura de nuvem?",
        opcoes: [
          "Reduzir o consumo de eletricidade dos data centers",
          "Distribuir o tráfego de requisições de forma equilibrada entre múltiplos servidores para evitar sobrecargas e garantir alta disponibilidade",
          "Impedir que usuários façam download de arquivos pesados",
          "Substituir a necessidade de um banco de dados relacional"
        ],
        correta: 1,
        explicacao: "O Load Balancer recebe todo o tráfego de entrada e direciona cada requisição para os servidores mais saudáveis e menos ocupados do cluster."
      },
      {
        id: "q-cld-3",
        area: "cloud",
        pergunta: "Em computação Serverless (como AWS Lambda ou Cloud Functions), qual é o significado de 'Cold Start' (Inicialização a Frio)?",
        opcoes: [
          "O resfriamento térmico dos processadores com nitrogênio líquido",
          "O tempo adicional que a nuvem leva para subir um contêiner do zero quando uma função que estava inativa recebe uma nova chamada",
          "Um erro que acontece quando a temperatura da sala de servidores atinge 0°C",
          "O processo de reiniciar a máquina virtual durante a madrugada"
        ],
        correta: 1,
        explicacao: "Quando nenhuma instância está aquecida na memória, o provedor precisa alocar recursos, puxar o código e inicializar o runtime, causando uma leve latência na primeira chamada."
      },
      {
        id: "q-cld-4",
        area: "cloud",
        pergunta: "O que é um 'Bucket' no contexto de armazenamento em objeto (como Amazon S3 ou Google Cloud Storage)?",
        opcoes: [
          "Um contêiner lógico de armazenamento onde arquivos e seus metadados são depositados",
          "Um comando do terminal Linux para apagar partições de disco",
          "Um tipo especial de memória RAM ultrarrápida",
          "Um cabo de conexão de fibra ótica de 100 Gbps"
        ],
        correta: 0,
        explicacao: "Buckets são pastas raiz globais na nuvem onde objetos (arquivos) são organizados com controle de permissões e políticas de ciclo de vida."
      },
      {
        id: "q-cld-5",
        area: "cloud",
        pergunta: "O que representa o Modelo de Responsabilidade Compartilhada na nuvem?",
        opcoes: [
          "Que o provedor de nuvem assume 100% da culpa por qualquer vazamento de dados",
          "A divisão de tarefas: o provedor cuida da segurança DA nuvem (física, hardware), e o cliente cuida da segurança NA nuvem (dados, senhas, firewall)",
          "Que múltiplos clientes dividem a mesma senha de acesso à conta",
          "Que a fatura do cartão de crédito é dividida automaticamente entre as filiais"
        ],
        correta: 1,
        explicacao: "O provedor protege a infraestrutura física e os data centers. O cliente é o responsável exclusivo por configurar senhas fortes, criptografar dados e aplicar patches no seu software."
      },

      // Banco de Dados (5)
      {
        id: "q-db-1",
        area: "banco",
        pergunta: "Em SQL, qual cláusula é utilizada para filtrar grupos de registros após uma agregação com GROUP BY?",
        opcoes: [
          "WHERE",
          "HAVING",
          "FILTER BY",
          "LIMIT"
        ],
        correta: 1,
        explicacao: "O comando WHERE filtra linhas individuais ANTES do agrupamento. Para filtrar os grupos calculados (ex: HAVING COUNT(*) > 5), usa-se a cláusula HAVING."
      },
      {
        id: "q-db-2",
        area: "banco",
        pergunta: "O que acontece quando você executa um comando DELETE sem a cláusula WHERE em uma tabela SQL?",
        opcoes: [
          "O banco recusa o comando e exibe um erro de sintaxe",
          "Todas as linhas da tabela são apagadas imediatamente",
          "Apenas a primeira linha da tabela é excluída",
          "O banco cria um backup automático antes de perguntar se você tem certeza"
        ],
        correta: 1,
        explicacao: "Sem a restrição do WHERE, o comando DELETE remove todos os registros da tabela indiscriminadamente. Sempre tenha muita atenção ao executar updates e deletes!"
      },
      {
        id: "q-db-3",
        area: "banco",
        pergunta: "Qual das seguintes alternativas descreve com precisão a Primeira Forma Normal (1FN)?",
        opcoes: [
          "Todas as colunas devem conter apenas valores atômicos (indivisíveis) e não devem existir grupos repetitivos",
          "A tabela não pode ter mais de 10 colunas",
          "O banco precisa estar rodando em um servidor com disco SSD",
          "Todas as tabelas precisam ter relacionamentos com chaves estrangeiras"
        ],
        correta: 0,
        explicacao: "A 1FN exige atomicidade dos dados: cada célula deve guardar apenas um único valor (nada de guardar múltiplos telefones separados por vírgula no mesmo campo!)."
      },
      {
        id: "q-db-4",
        area: "banco",
        pergunta: "Para que tipo de caso de uso o banco NoSQL Redis é mais recomendado?",
        opcoes: [
          "Armazenamento de relatórios contábeis de longo prazo em fita magnética",
          "Cache em memória ultrarrápido para sessões, placares de jogos e filas de mensageria",
          "Substituição de planilhas de cálculo financeiro tradicional",
          "Processamento de arquivos de vídeo pesados em 4K"
        ],
        correta: 1,
        explicacao: "Por manter todas as estruturas de dados nativamente na memória RAM, o Redis processa centenas de milhares de leituras e escritas por segundo em sub-milissegundos."
      },
      {
        id: "q-db-5",
        area: "banco",
        pergunta: "O que o comando EXPLAIN faz quando colocado antes de uma consulta SQL?",
        opcoes: [
          "Traduz os nomes das colunas de inglês para português",
          "Mostra o Plano de Execução do banco, detalhando como o otimizador buscará os dados e se usará índices ou table scan",
          "Executa a consulta duas vezes para garantir que o resultado está certo",
          "Gera um arquivo de texto explicativo para enviar ao cliente"
        ],
        correta: 1,
        explicacao: "O EXPLAIN revela o custo estimado, os algoritmos de join e se os índices criados estão sendo aproveitados pelo motor do banco para acelerar a busca."
      },

      // IA & ML (5)
      {
        id: "q-ia-1",
        area: "ia",
        pergunta: "Qual é o papel da função de ativação ReLU (Rectified Linear Unit) nas redes neurais modernas?",
        opcoes: [
          "Introduzir não-linearidade no modelo através da fórmula f(x) = max(0, x), permitindo aprender padrões complexos",
          "Reduzir o tamanho dos arquivos de imagem",
          "Converter os números da rede em texto em português",
          "Desligar o computador quando o treinamento acabar"
        ],
        correta: 0,
        explicacao: "Sem funções de ativação não-lineares como a ReLU, empilhar centenas de camadas em uma rede neural seria matematicamente equivalente a uma simples regressão linear."
      },
      {
        id: "q-ia-2",
        area: "ia",
        pergunta: "Em modelos de linguagem (LLMs), o que o parâmetro 'Temperature' controla?",
        opcoes: [
          "A temperatura dos chips de GPU no data center",
          "O nível de aleatoriedade e criatividade nas respostas geradas pelo modelo",
          "O tempo máximo que o modelo pode demorar para responder",
          "A quantidade de memória RAM utilizada pela máquina"
        ],
        correta: 1,
        explicacao: "Valores baixos de temperatura (ex: 0.1) tornam o modelo determinístico e conservador (escolhe palavras mais prováveis). Valores altos (ex: 0.8) incentivam criatividade e variedade."
      },
      {
        id: "q-ia-3",
        area: "ia",
        pergunta: "O que significa 'Similaridade por Cosseno' no contexto de buscas em bancos de dados vetoriais?",
        opcoes: [
          "O cálculo da velocidade de rotação do cooler do processador",
          "A medição do cosseno do ângulo entre dois vetores para determinar o grau de proximidade semântica entre eles",
          "Um método para desenhar triângulos perfeitos em CSS",
          "A contagem do número de letras iguais entre duas palavras"
        ],
        correta: 1,
        explicacao: "Se o ângulo entre dois vetores de embeddings for 0 graus, seu cosseno é 1.0, o que significa que os conceitos possuem significado idêntico independentemente do tamanho do texto."
      },
      {
        id: "q-ia-4",
        area: "ia",
        pergunta: "O que caracteriza o aprendizado por reforço (Reinforcement Learning)?",
        opcoes: [
          "O modelo aprende analisando apenas planilhas com respostas corretas rotuladas por humanos",
          "Um agente aprende a tomar decisões em um ambiente dinâmico através de tentativa e erro, buscando maximizar recompensas cumulativas",
          "A repetição manual do mesmo algoritmo dez vezes seguidas",
          "O treinamento exclusivo de modelos em servidores com dois processadores"
        ],
        correta: 1,
        explicacao: "O aprendizado por reforço baseia-se em recompensas e punições. É a técnica que ensinou IAs a derrotarem campeões mundiais de Xadrez, Go e videogames."
      },
      {
        id: "q-ia-5",
        area: "ia",
        pergunta: "O que é 'Tokenização' no processamento de linguagem natural?",
        opcoes: [
          "A geração de senhas descartáveis por SMS",
          "O processo de quebrar um texto em pedaços menores (palavras, subpalavras ou caracteres) que o modelo converte em IDs numéricos",
          "A gravação de mensagens em fitas magnéticas",
          "A tradução simultânea entre espanhol e francês"
        ],
        correta: 1,
        explicacao: "Modelos não leem letras diretamente: eles quebram sentenças em 'tokens' (geralmente pedaços de 4 caracteres) e atribuem um número de vocabulário para cada um deles."
      },

      // DevOps (5)
      {
        id: "q-dvo-1",
        area: "devops",
        pergunta: "Qual é a principal diferença estrutural entre uma Máquina Virtual (VM) e um Contêiner Docker?",
        opcoes: [
          "A VM virtualiza o hardware e roda um Sistema Operacional completo com seu próprio kernel; o contêiner compartilha o kernel do SO host, sendo muito mais leve e rápido",
          "O contêiner é muito mais pesado que a VM e precisa de 10 minutos para iniciar",
          "Máquinas virtuais só rodam Linux e contêineres só rodam Windows",
          "Não há diferença, são exatamente a mesma tecnologia"
        ],
        correta: 0,
        explicacao: "Contêineres isolam apenas processos no espaço de usuário do kernel compartilhado, consumindo megabytes em vez de gigabytes e iniciando em frações de segundo."
      },
      {
        id: "q-dvo-2",
        area: "devops",
        pergunta: "Em um cluster de Kubernetes, o que é um 'Pod'?",
        opcoes: [
          "O cabo de rede que liga os servidores físicos",
          "A menor unidade computacional básica do Kubernetes, que encapsula um ou mais contêineres que compartilham rede e armazenamento",
          "O monitor onde o engenheiro DevOps visualiza o dashboard",
          "O arquivo de backup de um banco de dados MySQL"
        ],
        correta: 1,
        explicacao: "No Kubernetes, você não escala contêineres avulsos diretamente: você gerencia Pods, que são as menores unidades de implantação do cluster."
      },
      {
        id: "q-dvo-3",
        area: "devops",
        pergunta: "O que o comando 'git pull' faz nos bastidores?",
        opcoes: [
          "Ele apaga o repositório do seu computador e clona novamente",
          "Ele executa automaticamente um 'git fetch' (baixa as novidades) seguido de um 'git merge' (mescla no seu branch atual)",
          "Ele envia seus commits locais para o servidor do GitHub",
          "Ele cria um novo branch com o nome da data de hoje"
        ],
        correta: 1,
        explicacao: "O comando git pull combina o download dos novos commits remotos (fetch) com a integração automática deles ao seu código de trabalho (merge)."
      },
      {
        id: "q-dvo-4",
        area: "devops",
        pergunta: "Em SRE (Site Reliability Engineering), o que é um 'SLO' (Service Level Objective)?",
        opcoes: [
          "A meta interna de qualidade e disponibilidade acordada pela equipe de engenharia (ex: 99.9% de sucesso nas requisições)",
          "O contrato com multas financeiras assinado com o cliente final",
          "A métrica bruta medida no sensor da CPU",
          "O manual de instruções fornecido aos novos estagiários"
        ],
        correta: 0,
        explicacao: "O SLO é a meta interna que a engenharia se compromete a manter. Se o SLO for violado, o time foca em confiabilidade e adia deploys arriscados."
      },
      {
        id: "q-dvo-5",
        area: "devops",
        pergunta: "Qual das seguintes ferramentas é o padrão de mercado para monitoramento e coleta de métricas em séries temporais em clusters de microsserviços?",
        opcoes: [
          "Microsoft Word",
          "Prometheus",
          "Notepad++",
          "VLC Media Player"
        ],
        correta: 1,
        explicacao: "O Prometheus coleta métricas raspando endpoints HTTP em intervalos regulares, sendo frequentemente exibido em painéis visuais do Grafana."
      }
    ]
  },

  // FLASHCARDS COM REVISÃO ESPAÇADA (16 FLASHCARDS ESSENCIAIS)
  flashcards: [
    {
      id: "fc-1",
      categoria: "Lógica & Python",
      pergunta: "Qual é a diferença entre '=' e '==' em Python?",
      resposta: "'=' é o operador de ATRIBUIÇÃO (guarda um valor na variável: x = 10). '==' é o operador de COMPARAÇÃO (testa se dois valores são iguais: if x == 10:).",
      analogia: "Pense no '=' como colocar uma carta dentro de uma caixa, e no '==' como comparar se duas caixas têm o mesmo peso."
    },
    {
      id: "fc-2",
      categoria: "Estruturas de Dados",
      pergunta: "O que é a Diagonal Principal de uma Matriz?",
      resposta: "São todos os elementos onde o índice da Linha é estritamente igual ao índice da Coluna (i == j). Ex: matriz[0][0], matriz[1][1], matriz[2][2].",
      analogia: "A diagonal que desce do canto superior esquerdo até o canto inferior direito da grade."
    },
    {
      id: "fc-3",
      categoria: "Algoritmos",
      pergunta: "Como o Bubble Sort sabe quando parar de ordenar?",
      resposta: "Quando uma passagem inteira pela lista for concluída sem que NENHUMA troca (swap) tenha sido necessária, indicando que a lista já está ordenada.",
      analogia: "Como verificar uma fila de alunos por altura: se você passar por todos e não precisar mandar ninguém trocar de lugar, a fila está pronta."
    },
    {
      id: "fc-4",
      categoria: "Redes",
      pergunta: "O que o protocolo DNS faz?",
      resposta: "Traduz nomes de domínio amigáveis (ex: google.com) em endereços numéricos IP (ex: 142.250.190.46) para que os computadores possam se conectar.",
      analogia: "A agenda de contatos do seu celular: você busca pelo nome do amigo para que o aparelho disque o número de telefone correspondente."
    },
    {
      id: "fc-5",
      categoria: "Banco de Dados",
      pergunta: "O que garante a 'Atomicidade' no padrão ACID?",
      resposta: "Garante que todas as etapas de uma transação sejam executadas com sucesso total; se qualquer etapa falhar no meio do caminho, todas as anteriores são desfeitas (tudo ou nada).",
      analogia: "Como um pacote de presente lacrado: ou ele é entregue inteiro, ou não é entregue de forma alguma."
    },
    {
      id: "fc-6",
      categoria: "Cibersegurança",
      pergunta: "O que é a Criptografia Assimétrica?",
      resposta: "Sistema que utiliza um par de chaves matemáticas: uma Chave Pública que qualquer pessoa pode usar para criptografar uma mensagem, e uma Chave Privada secreta que só o destinatário possui para descriptografar.",
      analogia: "Uma caixa de correio com fenda: qualquer pessoa pode depositar uma carta na fresta, mas só o carteiro que tem a chave física consegue abrir a porta para retirar."
    },
    {
      id: "fc-7",
      categoria: "Cloud Computing",
      pergunta: "O que é 'Serverless' na computação em nuvem?",
      resposta: "Modelo de execução onde você programa apenas a função de código e o provedor cuida de ligar, escalar e desligar o servidor automaticamente sob demanda, cobrando apenas pelos milissegundos rodados.",
      analogia: "Como usar táxi em vez de comprar um carro: você não cuida do motor nem do combustível, só paga pelos quilômetros rodados na viagem."
    },
    {
      id: "fc-8",
      categoria: "DevOps",
      pergunta: "Qual é a vantagem do Docker em relação a máquinas virtuais?",
      resposta: "Contêineres compartilham o kernel do sistema operacional host, consumindo uma fração minúscula de memória RAM e iniciando em milissegundos, enquanto VMs precisam carregar um SO inteiro.",
      analogia: "VM é como construir uma casa inteira com paredes e encanamento para cada hóspede; Docker é como alugar quartos separados com mobília própria dentro do mesmo prédio seguro."
    },
    {
      id: "fc-9",
      categoria: "Inteligência Artificial",
      pergunta: "O que é um 'Embedding Vetorial'?",
      resposta: "A conversão matemática de textos, imagens ou códigos em listas densas de números (vetores) onde palavras ou frases com significados parecidos ficam geometricamente próximas umas das outras.",
      analogia: "Coordenadas GPS no mapa das ideias: 'gato' e 'felino' ficam na mesma rua; 'automóvel' fica em outro bairro distante."
    },
    {
      id: "fc-10",
      categoria: "Ciência de Dados",
      pergunta: "O que significa 'Overfitting'?",
      resposta: "Quando um modelo estatístico aprende detalhes e ruídos do conjunto de treino tão perfeitamente que perde a capacidade de acertar em dados novos e inéditos.",
      analogia: "Um aluno que decora as respostas do simulado palavra por palavra, mas zera a prova oficial se o professor mudar os números da questão."
    },
    {
      id: "fc-11",
      categoria: "Git & Versões",
      pergunta: "Qual a diferença entre 'git fetch' e 'git pull'?",
      resposta: "'git fetch' apenas baixa os novos commits do servidor remoto para o seu computador sem alterar seus arquivos de trabalho. 'git pull' baixa e faz o merge automático no seu branch imediatamente.",
      analogia: "'fetch' é olhar o que chegou na caixa de correio; 'pull' é pegar a carta e abrir na mesa."
    },
    {
      id: "fc-12",
      categoria: "Lógica & Python",
      pergunta: "O que a instrução 'range(2, 10, 3)' gera em Python?",
      resposta: "Gera a sequência numérica: 2, 5, 8. Começa em 2, avança de 3 em 3, e para antes de atingir o limite final 10.",
      analogia: "Subir uma escada pulando de 3 em 3 degraus a partir do segundo degrau."
    },
    {
      id: "fc-13",
      categoria: "Cibersegurança",
      pergunta: "Por que não se deve salvar senhas em texto puro no banco de dados?",
      resposta: "Porque se o banco de dados for comprometido ou invadido, as senhas de todos os usuários serão expostas imediatamente. Deve-se armazenar apenas o hash criptográfico com salt.",
      analogia: "Guardar o segredo do cofre em uma folha na recepção em vez de guardar apenas o peso exato da chave."
    },
    {
      id: "fc-14",
      categoria: "Redes",
      pergunta: "Qual a função do protocolo ARP (Address Resolution Protocol)?",
      resposta: "Traduz um endereço lógico IP (Camada 3) no endereço físico MAC da placa de rede (Camada 2) dentro da mesma rede local.",
      analogia: "Gritar na sala de aula: 'Quem aqui tem o crachá com o nome João?' para descobrir em qual cadeira física ele está sentado."
    },
    {
      id: "fc-15",
      categoria: "Banco de Dados",
      pergunta: "O que é uma Chave Estrangeira (Foreign Key)?",
      resposta: "Uma coluna em uma tabela que faz referência direta à Chave Primária de outra tabela, garantindo a integridade dos relacionamentos entre os dados.",
      analogia: "O número da comanda do cliente anotado no pedido da cozinha: se o cliente não existe na entrada, o pedido não pode ser feito."
    },
    {
      id: "fc-16",
      categoria: "DevOps",
      pergunta: "O que é 'Infraestrutura como Código' (IaC)?",
      resposta: "Gerenciar e provisionar servidores, bancos e redes através de arquivos de configuração legíveis e versionáveis no Git (como Terraform), em vez de clicar manualmente em painéis.",
      analogia: "A receita de bolo perfeita guardada em código: qualquer cozinheiro segue a receita e o bolo sai exatamente igual em qualquer cozinha."
    }
  ],

  // 8. ROADMAPS DE CARREIRA EM TECNOLOGIA (5 CARREIRAS COMPLETAS)
  roadmaps: [
    {
      id: "carreira-analista-dados",
      titulo: "Analista de Dados (Data Analyst)",
      icone: "📈",
      salarioMedio: "R$ 4.500 (Jr) a R$ 14.000+ (Sr)",
      descricao: "Transforma dados brutos em relatórios acionáveis, dashboards executivos e insights estratégicos para apoiar a tomada de decisões corporativas.",
      fases: [
        {
          nivel: "Fase 1: Fundamentos (Júnior)",
          tempo: "0 a 6 meses",
          competencias: ["Excel Avançado (Tabelas Dinâmicas, PROCV/XLOOKUP)", "SQL Essencial (SELECT, WHERE, JOINs, GROUP BY)", "Pensamento Crítico & Métricas de Negócio (CAC, LTV, Churn)", "Power BI ou Tableau básico para relatórios"],
          projetos: "Criar um dashboard de vendas interativo no Power BI conectado a um banco SQLite.",
          certificacoes: "Microsoft Power BI Data Analyst (PL-300)"
        },
        {
          nivel: "Fase 2: Automação & Estatística (Pleno)",
          tempo: "6 a 24 meses",
          competencias: ["Python para Análise (Pandas, NumPy, Matplotlib)", "Estatística Descritiva & Testes de Hipótese (A/B Testing)", "Data Cleaning & Tratamento de Valores Faltantes", "Modelagem Dimensional (Star Schema / Snowflake Schema)"],
          projetos: "Análise exploratória em Python identificando padrões de cancelamento de clientes em uma empresa de telecom.",
          certificacoes: "Google Data Analytics Professional Certificate"
        },
        {
          nivel: "Fase 3: Inteligência Estratégica (Sênior)",
          tempo: "2 a 5+ anos",
          competencias: ["Storytelling com Dados e Comunicação para C-Level", "Data Warehousing em Nuvem (Snowflake, BigQuery)", "Modelagem Semântica com dbt", "Governança de Dados e Catálogos"],
          projetos: "Construção de uma infraestrutura analítica completa com dbt e BigQuery abastecendo dezenas de áreas da empresa.",
          certificacoes: "dbt Certified Developer"
        }
      ]
    },
    {
      id: "carreira-cientista-dados",
      titulo: "Cientista de Dados (Data Scientist)",
      icone: "🧪",
      salarioMedio: "R$ 6.000 (Jr) a R$ 19.000+ (Sr)",
      descricao: "Cria modelos matemáticos, algoritmos de Machine Learning e soluções preditivas para resolver problemas complexos com grandes volumes de dados.",
      fases: [
        {
          nivel: "Fase 1: Matemática & Programação (Júnior)",
          tempo: "0 a 1 ano",
          competencias: ["Álgebra Linear, Cálculo Diferencial e Probabilidade", "Python Avançado & Ecossistema Científico (SciPy, Scikit-Learn)", "SQL Analítico Avançado e Window Functions", "Análise Exploratória Rigorosa de Dados"],
          projetos: "Modelo de Regressão para previsão de preços imobiliários com validação cruzada.",
          certificacoes: "IBM Data Science Professional"
        },
        {
          nivel: "Fase 2: Modelagem & Machine Learning (Pleno)",
          tempo: "1 a 3 anos",
          competencias: ["Algoritmos Supervisionados e Não-Supervisionados (XGBoost, K-Means)", "Engenharia de Features (Feature Engineering)", "Otimização de Hiperparâmetros (Optuna, GridSearch)", "Deep Learning com PyTorch ou TensorFlow"],
          projetos: "Sistema de recomendação de produtos com filtragem colaborativa e embeddings.",
          certificacoes: "AWS Certified Machine Learning - Specialty"
        },
        {
          nivel: "Fase 3: IA Avançada & MLOps (Sênior)",
          tempo: "3 a 6+ anos",
          competencias: ["Modelos de Linguagem (LLMs), RAG e Fine-Tuning", "Esteiras de MLOps (MLflow, Kubeflow, BentoML)", "Monitoramento de Data Drift e Model Drift em produção", "Arquitetura de Sistemas de IA em Larga Escala"],
          projetos: "Implantação de um modelo preditivo em tempo real atendendo 1.000 requisições por segundo com monitoramento automático de degradação.",
          certificacoes: "Google Cloud Professional Data Scientist"
        }
      ]
    },
    {
      id: "carreira-dev-fullstack",
      titulo: "Desenvolvedor Full Stack Moderno",
      icone: "💻",
      salarioMedio: "R$ 4.500 (Jr) a R$ 17.000+ (Sr)",
      descricao: "Domina a criação de ponta a ponta: da interface visual reativa e acessível no navegador até as APIs, regras de negócio e bancos de dados seguros.",
      fases: [
        {
          nivel: "Fase 1: Fundamentos Web (Júnior)",
          tempo: "0 a 1 ano",
          competencias: ["HTML5 Semântico, CSS3 Moderno (Flexbox, Grid)", "JavaScript Moderno (ES6+, Promises, Async/Await)", "TypeScript Essencial e Tipagem Estática", "Git, GitHub e consumo de APIs REST"],
          projetos: "Aplicação web completa de gerenciamento de tarefas integrada ao localStorage e com layout responsivo.",
          certificacoes: "Meta Front-End Developer Certificate"
        },
        {
          nivel: "Fase 2: Back-end & Frameworks (Pleno)",
          tempo: "1 a 3 anos",
          competencias: ["React / Next.js com gerenciamento de estado", "Node.js / Express / NestJS ou Python / FastAPI", "Bancos Relacionais (PostgreSQL) e NoSQL (MongoDB/Redis)", "Autenticação Segura (JWT, Cookies HTTP-Only, OAuth2)"],
          projetos: "Plataforma de e-commerce com carrinho em tempo real, autenticação e gateway de pagamento integrado.",
          certificacoes: "AWS Certified Cloud Practitioner"
        },
        {
          nivel: "Fase 3: Arquitetura & Escalabilidade (Sênior)",
          tempo: "3 a 6+ anos",
          competencias: ["Microsserviços e Arquiteturas Orientadas a Eventos (Kafka/RabbitMQ)", "Clean Architecture, DDD e Padrões de Projeto", "Otimização de Performance Web (Core Web Vitals, SSR, ISR)", "CI/CD, Contêineres com Docker e Observabilidade"],
          projetos: "Plataforma SaaS escalável com milhares de usuários simultâneos, testes automatizados e deploy contínuo em nuvem.",
          certificacoes: "AWS Certified Developer - Associate"
        }
      ]
    },
    {
      id: "carreira-seguranca",
      titulo: "Especialista em Cibersegurança",
      icone: "🛡️",
      salarioMedio: "R$ 5.500 (Jr) a R$ 20.000+ (Sr)",
      descricao: "Protege redes, servidores e softwares contra ataques cibernéticos, realizando testes de intrusão e aplicando políticas de conformidade e defesa.",
      fases: [
        {
          nivel: "Fase 1: Redes & Sistemas Operacionais (Júnior)",
          tempo: "0 a 1 ano",
          competencias: ["Administração Linux (Terminal, Permissões, SSH)", "Redes de Computadores a fundo (Modelo OSI, TCP/IP, Wireshark)", "Fundamentos de Criptografia e Hashes", "Segurança de Estações de Trabalho e Endpoints"],
          projetos: "Configuração de um laboratório de testes com máquina virtual Kali Linux e análise de tráfego com Wireshark.",
          certificacoes: "CompTIA Security+ ou Cisco CCNA"
        },
        {
          nivel: "Fase 2: Segurança Ofensiva ou Defensiva (Pleno)",
          tempo: "1 a 3 anos",
          competencias: ["Análise de Vulnerabilidades Web (OWASP Top 10)", "Testes de Intrusão (PenTest) com Burp Suite e Metasploit", "Monitoramento em SOC (SIEM, Splunk, Elastic Security)", "Análise de Logs e Resposta a Incidentes"],
          projetos: "Relatório profissional de auditoria de vulnerabilidades em uma aplicação web vulnerável intencionalmente (OWASP Juice Shop).",
          certificacoes: "Certified Ethical Hacker (CEH) ou CompTIA CySA+"
        },
        {
          nivel: "Fase 3: Arquitetura & Red Team / Blue Team (Sênior)",
          tempo: "3 a 7+ anos",
          competencias: ["Arquitetura Zero Trust em Ambientes Híbridos", "Engenharia Reversa e Análise de Malware", "Cloud Security (AWS Security Hub, IAM avançado)", "Conformidade Regulatória (LGPD, ISO 27001, PCI-DSS)"],
          projetos: "Estruturação completa do programa de resposta a incidentes e exercícios de simulação de invasão corporativa.",
          certificacoes: "OSCP (Offensive Security Certified Professional) ou CISSP"
        }
      ]
    },
    {
      id: "carreira-devops",
      titulo: "Engenheiro DevOps & Cloud",
      icone: "🚀",
      salarioMedio: "R$ 6.000 (Jr) a R$ 21.000+ (Sr)",
      descricao: "Une desenvolvimento de software com infraestrutura moderna, automatizando esteiras de deploy, contêineres e orquestração de nuvem resiliente.",
      fases: [
        {
          nivel: "Fase 1: Linux, Git & Scripting (Júnior)",
          tempo: "0 a 1 ano",
          competencias: ["Linux SysAdmin Avançado e Shell Scripting (Bash)", "Git Fluente e Estratégias de Branching (GitFlow, Trunk-Based)", "Fundamentos de Redes, DNS, Firewalls e SSH", "Linguagem de Automação (Python ou Go básico)"],
          projetos: "Script em Bash para backup automático de banco de dados com upload seguro para nuvem.",
          certificacoes: "Linux Professional Institute (LPIC-1)"
        },
        {
          nivel: "Fase 2: Contêineres, CI/CD & Nuvem (Pleno)",
          tempo: "1 a 3 anos",
          competencias: ["Docker Completo e Criação de Imagens Otimizadas", "Pipelines de CI/CD com GitHub Actions ou GitLab CI", "Serviços Centrais da AWS (EC2, S3, RDS, VPC, IAM)", "Infraestrutura como Código com Terraform"],
          projetos: "Pipeline de CI/CD completa que executa testes, gera imagem Docker e faz deploy automático em servidor em nuvem.",
          certificacoes: "AWS Certified Solutions Architect - Associate"
        },
        {
          nivel: "Fase 3: Kubernetes, SRE & Escala Global (Sênior)",
          tempo: "3 a 6+ anos",
          competencias: ["Orquestração com Kubernetes (K8s) e Helm Charts", "Observabilidade Avançada (Prometheus, Grafana, OpenTelemetry)", "Práticas de SRE (SLIs, SLOs, Error Budgets)", "Segurança em Nuvem e DevSecOps (Trivy, SonarQube)"],
          projetos: "Cluster Kubernetes multi-região autogerenciado com auto-scaling automático e monitoramento de alertas no Slack/Discord.",
          certificacoes: "CKA (Certified Kubernetes Administrator)"
        }
      ]
    }
  ],

  // 9. CHEAT SHEETS (FOLHAS DE CONSULTA RÁPIDA PRONTAS PARA COPIAR)
  cheatsheets: [
    {
      id: "cs-python",
      titulo: "Python",
      categoria: "Linguagem",
      icone: "🐍",
      snippets: [
        {
          titulo: "List Comprehension (Criação concisa de listas)",
          codigo: "# Quadrados dos números pares de 0 a 9\npares_quadrados = [x**2 for x in range(10) if x % 2 == 0]\nprint(pares_quadrados)  # [0, 4, 16, 36, 64]",
          explicacao: "Cria listas filtradas e transformadas em uma única linha legível."
        },
        {
          titulo: "Manipulação de Dicionários (Chave e Valor)",
          codigo: "usuario = {'nome': 'Carlos', 'idade': 28}\n\n# Obter com valor padrão caso não exista\ncidade = usuario.get('cidade', 'São Paulo')\n\n# Iterando chaves e valores\nfor k, v in usuario.items():\n    print(f'{k}: {v}')",
          explicacao: "O método .get() evita o erro KeyError se a chave não existir."
        },
        {
          titulo: "Tratamento de Exceções com try / except",
          codigo: "try:\n    numero = int(input('Digite um valor: '))\n    resultado = 100 / numero\nexcept ValueError:\n    print('Erro: Por favor digite apenas números válidos!')\nexcept ZeroDivisionError:\n    print('Erro: Divisão por zero não é permitida!')\nelse:\n    print(f'Sucesso: {resultado}')\nfinally:\n    print('Fim da rotina.')",
          explicacao: "Captura erros de execução sem travar a aplicação."
        },
        {
          titulo: "Leitura e Escrita de Arquivos Segura (with)",
          codigo: "# Escrevendo em arquivo\nwith open('dados.txt', 'w', encoding='utf-8') as f:\n    f.write('TechLab: Aprendizado contínuo\\n')\n\n# Lendo linha por linha\nwith open('dados.txt', 'r', encoding='utf-8') as f:\n    conteudo = f.read()\n    print(conteudo)",
          explicacao: "A cláusula 'with' fecha o arquivo automaticamente, mesmo se ocorrer um erro."
        }
      ]
    },
    {
      id: "cs-sql",
      titulo: "SQL",
      categoria: "Banco de Dados",
      icone: "🗄️",
      snippets: [
        {
          titulo: "Consultas com Agrupamento e Filtro de Grupo (GROUP BY & HAVING)",
          codigo: "SELECT departamento,\n       COUNT(*) AS total_funcionarios,\n       ROUND(AVG(salario), 2) AS media_salarial\nFROM colaboradores\nWHERE ativo = TRUE\nGROUP BY departamento\nHAVING COUNT(*) >= 5\nORDER BY media_salarial DESC;",
          explicacao: "Calcula a média salarial por departamento apenas para equipes com 5 ou mais pessoas ativas."
        },
        {
          titulo: "LEFT JOIN com Tratamento de Nulos (COALESCE)",
          codigo: "SELECT c.id AS cliente_id,\n       c.nome,\n       COALESCE(SUM(p.valor), 0.00) AS total_gasto\nFROM clientes c\nLEFT JOIN pedidos p ON c.id = p.cliente_id\nGROUP BY c.id, c.nome\nORDER BY total_gasto DESC;",
          explicacao: "COALESCE troca o NULL de clientes sem pedidos pelo número 0.00."
        },
        {
          titulo: "Funções de Janela (Window Functions - RANK)",
          codigo: "SELECT nome,\n       departamento,\n       salario,\n       DENSE_RANK() OVER (\n           PARTITION BY departamento \n           ORDER BY salario DESC\n       ) AS ranking_salario_dept\nFROM colaboradores;",
          explicacao: "Cria um ranking de salários isolado dentro de cada departamento sem agrupar as linhas."
        },
        {
          titulo: "Criação de Tabela com Chave Primária e Estrangeira",
          codigo: "CREATE TABLE pedidos (\n    id SERIAL PRIMARY KEY,\n    cliente_id INT NOT NULL,\n    valor DECIMAL(10, 2) NOT NULL CHECK (valor > 0),\n    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    CONSTRAINT fk_pedidos_cliente \n        FOREIGN KEY (cliente_id) REFERENCES clientes(id)\n        ON DELETE CASCADE\n);",
          explicacao: "Garante integridade referencial com exclusão em cascata."
        }
      ]
    },
    {
      id: "cs-git",
      titulo: "Git",
      categoria: "Ferramentas",
      icone: "🐙",
      snippets: [
        {
          titulo: "Comandos Diários Essenciais",
          codigo: "# Ver o estado das alterações\ngit status\n\n# Adicionar tudo para a área de preparação\ngit add .\n\n# Gravar commit com mensagem clara\ngit commit -m 'feat: implementa autenticação JWT'\n\n# Enviar commits para o servidor remoto\ngit push origin main",
          explicacao: "O ciclo clássico de trabalho para registrar modificações."
        },
        {
          titulo: "Criando e Alternando Branches com Segurança",
          codigo: "# Criar e entrar no novo branch imediatamente\ngit checkout -b feature/nova-interface\n# (ou no git moderno: git switch -c feature/nova-interface)\n\n# Voltar para o branch principal\ngit checkout main\n\n# Ver todos os branches locais e remotos\ngit branch -a",
          explicacao: "Isola desenvolvimentos em ramos paralelos sem mexer no código principal."
        },
        {
          titulo: "Guardando Trabalho Temporário sem Commitar (Stash)",
          codigo: "# Salvar as alterações pendentes no bolso\ngit stash push -m 'meus ajustes rápidos'\n\n# Listar o que foi guardado\ngit stash list\n\n# Recuperar as alterações guardadas de volta\ngit stash pop",
          explicacao: "Permite trocar de branch rapidamente sem precisar fazer commits incompletos."
        },
        {
          titulo: "Desfazendo Coisas com Segurança",
          codigo: "# Descartar modificações de um arquivo específico\ngit checkout -- nome_arquivo.txt\n\n# Desfazer o último commit mantendo os arquivos intactos\ngit reset --soft HEAD~1\n\n# Reverter um commit já enviado ao GitHub (cria commit inverso)\ngit revert <hash_do_commit>",
          explicacao: "'git revert' é o método mais seguro para repositórios compartilhados."
        }
      ]
    },
    {
      id: "cs-linux",
      titulo: "Linux",
      categoria: "Sistemas & DevOps",
      icone: "🐧",
      snippets: [
        {
          titulo: "Navegação e Manipulação de Arquivos e Pastas",
          codigo: "# Criar pasta e subpastas de uma vez\nmkdir -p projeto/src/controllers\n\n# Listar com detalhes, permissões e tamanhos humanos\nls -lah\n\n# Copiar pasta recursivamente\ncp -r pasta_origem/ pasta_destino/\n\n# Visualizar uso de espaço em disco\ndf -h",
          explicacao: "Comandos básicos de terminal do dia a dia no Linux."
        },
        {
          titulo: "Busca de Texto com grep e find",
          codigo: "# Buscar uma palavra em todos os arquivos da pasta recursivamente\ngrep -rnw 'minha_funcao' src/\n\n# Encontrar arquivos por nome em todo o disco\nfind /var/log -type f -name '*.log' -size +10M\n\n# Acompanhar logs em tempo real na tela\ntail -f /var/log/nginx/access.log",
          explicacao: "Localiza arquivos grandes e monitora logs ao vivo com 'tail -f'."
        },
        {
          titulo: "Gerenciamento de Processos e Serviços",
          codigo: "# Ver processos que mais consomem CPU/Memória\ntop\n# (ou use o htop caso instalado)\n\n# Encontrar o PID de um processo travado\nps aux | grep node\n\n# Finalizar um processo pelo PID\nkill -9 <PID>\n\n# Reiniciar um serviço do sistema\nsudo systemctl restart nginx",
          explicacao: "Controla o ciclo de vida dos processos e serviços do sistema operacional."
        },
        {
          titulo: "Permissões de Arquivos (chmod & chown)",
          codigo: "# Dar permissão de execução apenas ao proprietário\nchmod 755 meu_script.sh\n\n# Tornar o arquivo somente leitura para todos\nchmod 644 config.json\n\n# Trocar o usuário e grupo dono do arquivo\nsudo chown www-data:www-data -R /var/www/meu-site",
          explicacao: "755 (rwxr-xr-x) e 644 (rw-r--r--) são os padrões mais comuns em servidores."
        }
      ]
    },
    {
      id: "cs-pandas",
      titulo: "Pandas",
      categoria: "Dados",
      icone: "🐼",
      snippets: [
        {
          titulo: "Carregando e Inspecionando Dados",
          codigo: "import pandas as pd\n\n# Carregar arquivo CSV com separador personalizado\ndf = pd.read_csv('vendas.csv', sep=',')\n\n# Primeiras 5 linhas e últimas 5 linhas\nprint(df.head())\n\n# Informações de tipos, nulos e consumo de RAM\nprint(df.info())\n\n# Estatísticas descritivas imediatas\nprint(df.describe())",
          explicacao: "O trio head(), info() e describe() revela a saúde geral do dataset."
        },
        {
          titulo: "Filtros e Seleção com .loc e .iloc",
          codigo: "# Filtrar linhas com múltiplas condições\nfiltro = (df['idade'] >= 18) & (df['salario'] > 5000)\ndf_selecionado = df.loc[filtro, ['nome', 'cidade', 'salario']]\n\n# Seleção por posição numérica (linhas 0 a 9, primeiras 3 colunas)\ndf_trecho = df.iloc[0:10, 0:3]",
          explicacao: ".loc usa nomes de colunas e condições lógicas; .iloc usa índices numéricos inteiros."
        },
        {
          titulo: "Agrupamento e Agregação com .groupby()",
          codigo: "# Média salarial e contagem por departamento\nresumo = df.groupby('departamento').agg({\n    'salario': ['mean', 'median', 'std'],\n    'funcionario_id': 'count'\n}).reset_index()\n\nprint(resumo)",
          explicacao: "Gera relatórios agregados com múltiplas métricas simultâneas."
        },
        {
          titulo: "Tratamento de Dados Nulos e Duplicados",
          codigo: "# Contagem de nulos por coluna\nprint(df.isnull().sum())\n\n# Preencher nulos com a mediana\ndf['idade'] = df['idade'].fillna(df['idade'].median())\n\n# Remover linhas duplicadas baseando-se no e-mail\ndf.drop_duplicates(subset=['email'], keep='first', inplace=True)",
          explicacao: "Limpeza de dados essencial antes de treinar qualquer modelo de machine learning."
        }
      ]
    },
    {
      id: "cs-regex",
      titulo: "Regex (Expressões Regulares)",
      categoria: "Programação & Automação",
      icone: "🔍",
      snippets: [
        {
          titulo: "Validando E-mails com Expressão Regular",
          codigo: "# Expressão padrão para validação de e-mails\nimport re\n\npadrao_email = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'\n\nemail = 'usuario@techlab.com.br'\nif re.match(padrao_email, email):\n    print('E-mail válido!')\nelse:\n    print('Formato de e-mail incorreto.')",
          explicacao: "^ indica início da linha, $ indica fim da linha, e + exige pelo menos 1 caractere."
        },
        {
          titulo: "Extraindo Telefones e CPFs de um Texto Grande",
          codigo: "texto = 'Contatos: Ana (11) 98765-4321 e Pedro (21) 91234-5678. CPF: 123.456.789-00'\n\n# Encontrar todos os telefones no formato (XX) XXXXX-XXXX\ntelefones = re.findall(r'\\(\\d{2}\\)\\s\\d{5}-\\d{4}', texto)\nprint('Telefones encontrados:', telefones)\n\n# Extrair apenas os dígitos de um CPF\ndigitos_cpf = re.sub(r'\\D', '', '123.456.789-00')\nprint('Apenas dígitos:', digitos_cpf)  # '12345678900'",
          explicacao: "\\d representa dígitos [0-9]; \\D representa qualquer coisa que NÃO seja dígito."
        },
        {
          titulo: "Tabela de Metacaracteres Essenciais",
          codigo: "# .     Qualquer caractere (exceto quebra de linha)\n# ^     Início da linha ou string\n# $     Fim da linha ou string\n# *     0 ou mais repetições\n# +     1 ou mais repetições\n# ?     0 ou 1 repetição (opcional)\n# \\d    Dígito numérico [0-9]\n# \\w    Caractere alfanumérico [a-zA-Z0-9_]\n# \\s    Espaço em branco, tabulação ou quebra de linha\n# [abc] Qualquer caractere dentro dos colchetes",
          explicacao: "Os blocos de construção universais para construir qualquer padrão de busca."
        }
      ]
    }
  ]
};


