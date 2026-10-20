# Documento de Projeto Técnico — DANA

## 1. Visão geral

DANA é um jogo casual de adivinhação de palavras em português do Brasil, executado no navegador e adaptável a desktop e mobile. Em cada partida, a pessoa tenta descobrir uma palavra secreta em até seis tentativas, recebendo pistas visuais após cada palpite.

## 2. Objetivo

Oferecer partidas rápidas, simples de entender e variadas. O jogador escolhe somente o tamanho das palavras: 5 ou 6 letras. Todas as palavras ficam em um repertório geral, sem divisão por tema ou dificuldade.

## 3. Público e experiência

- Pessoas que gostam de desafios mentais rápidos.
- Jogadores casuais que querem iniciar uma partida sem configurar vários filtros.
- A interface deve deixar claro o tamanho selecionado, as tentativas restantes e o feedback de cada letra.
- Uma nova partida deve oferecer outra palavra do repertório escolhido.

## 4. Escopo do produto

### Incluído
- Jogo single-player para navegador.
- Modos de 5 letras e 6 letras.
- Repertório amplo com todas as entradas normalizadas disponíveis na fonte lexical para cada tamanho.
- Sorteio aleatório de palavra a cada nova partida.
- Até seis tentativas por partida.
- Teclado físico e virtual.
- Feedback por letra e persistência local da partida e pontuação.
- Layout responsivo e recursos básicos de acessibilidade.

### Não incluído
- Categorias ou filtros temáticos.
- Níveis ou seleção de dificuldade.
- Modo diário, arcade, cronômetro ou regra especial de dificuldade.
- Multiplayer, login, ranking online ou backend.

## 5. Regras de negócio

1. O jogador escolhe palavras de 5 ou 6 letras.
2. O jogo seleciona aleatoriamente uma palavra do repertório correspondente ao tamanho escolhido.
3. A palavra da nova partida deve ser diferente da partida imediatamente anterior sempre que houver outras opções.
4. Palpites precisam ter o tamanho selecionado e estar no repertório correspondente.
5. Cada partida termina quando a palavra é descoberta ou as seis tentativas são usadas.
6. O jogo não tem limite de tempo.

## 6. Mecânica e feedback

- Verde: letra correta na posição correta.
- Amarelo: letra presente na palavra, mas em outra posição.
- Cinza: letra ausente da palavra.
- Letras repetidas devem ser avaliadas respeitando a quantidade de ocorrências na palavra secreta.
- O estado da partida deve ser atualizado imediatamente depois de cada tentativa válida.

## 7. Repertório

- Manter todas as entradas únicas disponíveis na fonte lexical para cada tamanho. O banco atual tem 7.321 palavras de 5 letras e 15.500 de 6 letras.
- Normalizar acentos para compatibilidade com o teclado atual.
- As listas de 5 e 6 letras são o único agrupamento usado pelo jogo.
- As palavras devem ser normalizadas para comparação consistente; a interface pode exibi-las em maiúsculas nas tentativas.
- O repertório também determina quais palpites são aceitos.

## 8. Pontuação e persistência

- Guardar localmente a partida em andamento, o tamanho selecionado, a pontuação e a sequência de vitórias.
- A pontuação é concedida ao vencer e considera as tentativas restantes.
- Iniciar uma nova partida limpa as tentativas e o teclado da partida anterior.

## 9. Interface

- Apresentar um seletor simples com as opções “5 letras” e “6 letras”.
- Mostrar a grade de seis tentativas com o número de colunas correspondente ao tamanho selecionado.
- Manter o teclado virtual, o status da partida, a pontuação e a sequência de vitórias.
- Oferecer uma ação “Nova partida” que sorteia uma nova palavra sem exigir seleção de tema ou dificuldade.
- Garantir funcionamento em desktop e mobile, foco visível e contraste legível.

## 10. Fluxo principal

1. Abrir o jogo e carregar a partida salva, se existir.
2. Escolher 5 ou 6 letras.
3. Digitar um palpite pelo teclado físico ou virtual.
4. Receber feedback visual e continuar até acertar ou esgotar as tentativas.
5. Iniciar outra partida, que recebe uma palavra sorteada novamente.

## 11. Requisitos técnicos

- HTML5, CSS3 e JavaScript sem framework obrigatório.
- Armazenamento local via LocalStorage.
- O estado salvo deve incluir a versão do formato ou usar uma chave versionada para evitar incompatibilidade com dados antigos.
- O projeto deve permanecer leve e funcionar sem serviços externos.

## 12. Critérios de aceitação

- Existem somente os modos de 5 letras e 6 letras.
- Não existem seletores de categoria, nível de dificuldade, modo diário, arcade ou cronômetro.
- Cada tamanho usa todas as palavras únicas do seu repertório, sem filtro por tema.
- “Nova partida” sorteia uma palavra válida do tamanho selecionado e evita repetir a anterior quando há alternativas.
- O tamanho da grade, a validação dos palpites e o repertório correspondem ao modo selecionado.
- A lógica de feedback, a pontuação, o salvamento e o layout responsivo continuam funcionando.