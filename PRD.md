# Documento de Projeto Técnico — DANA

## 1. Visão geral

DANA é um jogo casual de adivinhação de palavras em português do Brasil, desenvolvido para navegação web e compatível com desktop e mobile responsivo. O objetivo do projeto é criar uma experiência rápida, simples e altamente replayável, inspirada em jogos do tipo Wordle, mas com identidade própria, regras configuráveis e foco em retenção por recorrência e variedade.

O produto foi pensado como uma experiência de sessão curta, com partidas fáceis de entender e rápidas de concluir. O jogador precisa adivinhar uma palavra secreta em um número limitado de tentativas, recebendo feedback visual diretamente após cada tentativa.

## 2. Objetivo do projeto

Implementar um jogo de palavras com:
- regras simples e claras;
- visual elegante e minimalista;
- feedback imediato da tentativa;
- modos de jogo e dificuldade configuráveis;
- suporte a português do Brasil;
- foco em valor casual e recorrência;
- arquitetura leve e fácil de evoluir.

## 3. Problema a ser resolvido

O mercado de jogos de palavras tem muitos produtos baseados em mecânicas similares, porém nem todos oferecem uma experiência agradável para jogadores casuais que querem algo rápido, bonito e com alta recorrência. Muitos jogos também apresentam:
- dificuldade pouco balanceada;
- dicionários inadequados;
- UI confusa;
- ausência de progressão ou hábito;
- pouca diferenciação entre modos.

DANA pretende resolver isso através de:
- regra simples e eficiente;
- interface elegante e clara;
- modos de jogo que aumentam variedade;
- múltiplos níveis de dificuldade;
- temas e categorias para diferenciar a experiência;
- sensação de progressão leve e motivação de retorno.

## 4. Público-alvo

### 4.1 Perfil principal
- jogadores casuais;
- pessoas que gostam de desafios mentais rápidos;
- usuários que querem jogar em pequenos intervalos do dia;
- público geral, com foco em português do Brasil;
- pessoas que gostam de jogos de palavras e lógica sem necessidade de tutorial longo.

### 4.2 Personas

Persona 1: jogador casual
- quer algo rápido e sem curva de aprendizado;
- joga em pequenas pausas durante o dia;
- valoriza clareza visual e feedback imediato.

Persona 2: jogador curioso
- gosta de desafios de raciocínio;
- busca variedade e modos diferentes;
- quer experimentar dificuldade e temas.

Persona 3: jogador recorrente
- gosta de rotina e streak;
- valoriza hábito e sensação de progresso;
- volta ao jogo para melhorar resultados e manter sequência.

## 5. Objetivos do produto

### 5.1 Objetivos de negócio
- criar um jogo casual com alto potencial de retenção;
- validar uma ideia simples, elegante e replayável;
- gerar recorrência por modo diário e progressão leve;
- manter o produto gratuito e acessível;
- construir uma base escalável para evoluir com novos modos e temas.

### 5.2 Objetivos de experiência
- o jogador deve entender o jogo em poucos segundos;
- a partida deve ser curta e recompensadora;
- o feedback deve ser claro e imediato;
- a sensação de progresso precisa existir mesmo sem complexidade profunda;
- o jogo deve incentivar retorno em dias consecutivos.

## 6. Proposta de valor

DANA oferece uma experiência de adivinhação por palavras que combina:
- rapidez;
- simplicidade;
- raciocínio lógico;
- variedade de modos;
- feedback visual satisfatório;
- progressão leve e recorrência.

O grande diferencial é fazer com que o usuário se sinta motivado a tentar outra rodada sem esforço, mesmo em uma mecânica simples.

## 7. Escopo do produto

### 7.1 In scope
- jogo single-player;
- browser/web;
- modo diário;
- modo infinito;
- seleção de nível de dificuldade;
- palavras em português do Brasil;
- modo difícil;
- modo arcade;
- temas e categorias temáticas;
- desbloqueio de temas;
- design minimalista premium;
- suporte básico de acessibilidade;
- persistência local no navegador.

### 7.2 Out of scope no MVP
- multiplayer em tempo real;
- sistema de login;
- backend para ranking online;
- monetização premium;
- integração com redes sociais;
- múltiplos idiomas no início;
- analytics avançados em nuvem.

## 8. Regras de negócio

- O jogo deve aceitar apenas palavras válidas dentro do conjunto do produto.
- A língua principal será o português do Brasil.
- O número de letras da palavra pode variar conforme o nível.
- O sistema deve informar ao jogador se a letra está:
  - correta e na posição correta;
  - correta, mas em outra posição;
  - ausente na palavra.
- O jogo termina em vitória ou derrota.
- O modo diário deve gerar a mesma palavra para todos os jogadores no mesmo dia.
- O modo infinito deve gerar palavras aleatórias contínuas.
- O modo difícil exige o uso obrigatório das letras reveladas.
- O jogo deve ser totalmente gratuito.

## 9. Mecânica do jogo

### 9.1 Mecânica principal
O jogador tenta descobrir uma palavra secreta usando um número limitado de tentativas. A cada tentativa, o sistema responde com pistas visuais, permitindo ajustar a próxima tentativa.

### 9.2 Feedback por letra
- verde: letra correta e na posição correta;
- amarelo: letra correta, mas em outra posição;
- cinza: letra não existe na palavra.

### 9.3 Condução da partida
- o usuário digita uma palavra válida;
- a tentativa é validada;
- o jogo compara a tentativa com a resposta;
- o sistema atualiza a grade e o teclado;
- o jogador continua até acertar ou esgotar as tentativas.

## 10. Modos de jogo

### 10.1 Modo diário
- uma palavra secreta por dia;
- reforça rotina e hábito;
- aumenta recorrência;
- permite sequência de dias consecutivos.

### 10.2 Modo infinito
- partidas sem limite de tempo;
- gera novas palavras aleatórias;
- ideal para quem quer mais rounds rápidos.

### 10.3 Modo difícil
- exige o uso obrigatório das letras já reveladas;
- aumenta a complexidade sem mudar a proposta básica;
- pensado para jogadores que querem um desafio maior.

### 10.4 Modo arcade
- foco em ritmo, pontuação e velocidade;
- pode incluir timer e bônus;
- oferece sensação de intensa resposta imediata e energia.

## 11. Níveis de dificuldade e personalização

### 11.1 Níveis sugeridos
- iniciante;
- intermediário;
- avançado;
- especialista.

### 11.2 Personalização por nível
- tamanho da palavra pode variar;
- número de tentativas pode variar;
- nível de dificuldade pode ser ajustado;
- palavras podem ser filtradas por tema ou categoria.

### 11.3 Exemplos
- nível iniciante: palavras curtas, mais tentativas;
- nível intermediário: modelo padrão do jogo;
- nível avançado: palavras maiores e menos previsíveis;
- nível especialista: menos tentativas e maior exigência.

## 12. Temas e categorias temáticas

Para aumentar variedade e estimular retorno, o jogo deve oferecer temas e categorias temáticas, como:
- animais;
- frutas;
- tecnologia;
- esportes;
- natureza;
- cidades;
- profissões;
- objetos domésticos.

Esses temas podem ser usados para:
- filtrar a seleção de palavras;
- criar desafios específicos;
- desbloquear novas categorias conforme o progresso.

## 13. Progresso e retenção

### 13.1 Progressão sugerida
- streak diário;
- pontuação por partida;
- conquistas;
- desbloqueio de temas;
- histórico de partidas;
- nível de domínio do jogador.

### 13.2 Estratégia de retenção
- diário: reforça hábito e retorno;
- infinito: reduz fricção em partidas rápidas;
- temas: aumentam variedade;
- progresso leve: oferece recompensa sem fragmentar a experiência.

## 14. Design de interface e experiência do usuário

### 14.1 Direção visual escolhida
Minimalista Premium.

### 14.2 Características da interface
- fundo escuro e sofisticado;
- foco em legibilidade;
- linhas limpas e espaçamento equilibrado;
- feedback visual claro em letras e células;
- forte contraste para facilitar leitura;
- visual elegante sem excesso de elementos.

### 14.3 Objetivo da interface
A interface deve parecer direta, bonita e fácil de usar. O jogador deve sentir que o jogo é sério, limpo e bem acabado, mesmo sendo casual.

## 15. Acessibilidade web

Mesmo que não seja foco principal no MVP, o produto deve seguir práticas básicas de acessibilidade:
- contraste suficiente entre texto e fundo;
- foco visível em elementos interativos;
- navegação por teclado;
- feedback visual além da cor;
- textos legíveis em tamanhos de tela variados;
- uso de labels claros em botões e elementos de interação.

## 16. Requisitos funcionais

1. O sistema deve gerar uma palavra secreta para cada partida.
2. O sistema deve validar se a entrada do usuário é uma palavra válida.
3. O sistema deve comparar a tentativa com a palavra secreta.
4. O jogo deve marcar cada letra conforme seu estado.
5. O usuário deve ter um número limitado de tentativas.
6. O jogo deve permitir vitória e derrota.
7. O sistema deve permitir reiniciar a partida.
8. O sistema deve gerar um novo jogo no modo diário ou infinito.
9. O sistema deve permitir escolher o nível de dificuldade.
10. O sistema deve permitir escolher tema ou categoria.
11. O jogo deve mostrar o progresso atual da partida.
12. O sistema deve persistir dados locais do usuário.
13. O sistema deve funcionar em português do Brasil.
14. O sistema deve ser responsivo em navegador.

## 17. Requisitos não funcionais

- velocidade de carregamento e resposta imediata;
- responsividade em desktop e mobile;
- usabilidade intuitiva e sem tutorial longo;
- acessibilidade com contraste, foco e leitura adequada;
- arquitetura simples, organizada e escalável;
- manutenção eficiente;
- baixa dependência de infraestrutura no MVP.

## 18. Fluxo principal do usuário

1. O usuário abre a página inicial.
2. Escolhe o modo desejado.
3. Seleciona o nível e/ou tema.
4. Inicia a partida.
5. Digita uma palavra válida.
6. Recebe feedback visual.
7. Ajusta a próxima tentativa.
8. Acerta ou esgota as tentativas.
9. Visualiza o resultado final.
10. Pode iniciar outra partida.

## 19. Regras de validação

### 19.1 Validação de entrada
- a palavra deve estar no conjunto do jogo;
- deve ter o tamanho correto;
- não pode ser vazia;
- deve ser reconhecida no idioma alvo.

### 19.2 Validação de lógica
- letras repetidas devem ser tratadas corretamente;
- feedback deve respeitar a lógica de ordem e quantidade;
- o sistema deve evitar falso positivo quando há letras repetidas;
- o sistema deve garantir que o número de letras marcadas como corretas não exceda a quantidade disponível na palavra secreta.

## 20. Dados e persistência

O projeto deve usar persistência local no navegador para guardar:
- última configuração do jogo;
- última partida;
- streak diário;
- pontuação acumulada;
- histórico simples;
- temas desbloqueados.

A persistência será feita com LocalStorage, por ser simples, eficiente e suficiente para o MVP.

## 21. Estrutura técnica recomendada

### 21.1 Stack principal
- HTML5
- CSS3
- JavaScript vanilla
- LocalStorage
- arquitetura de arquivos estática

### 21.2 Estrutura sugerida
- index.html
- styles.css
- app.js
- data/
  - words.json
  - themes.json
  - levels.json
- utils/
  - storage.js
  - game-logic.js
  - ui.js
  - accessibility.js

## 22. Implementação detalhada

### 22.1 HTML
A página deve conter:
- header com logo e status da partida;
- painel de seleção de modo;
- seção de opções de nível e tema;
- grade de desenvolvimento da tentativa;
- teclado virtual;
- modal eventual de resultado final.

### 22.2 CSS
O CSS deve seguir a direção visual minimalista premium:
- acabamento cuidadoso nas bordas;
- espaçamento consistente;
- contraste forte e legibilidade máxima;
- feedback visual por classes específicas;
- responsividade por media queries.

### 22.3 JavaScript
A lógica principal será centrada em:
- inicialização da tela;
- escolha de palavra secreta;
- atualização da interface;
- validação da tentativa;
- cálculo do resultado da tentativa;
- controle do estado do jogo;
- persistência local;
- reinício da partida.

### 22.4 Fluxo de execução
1. abrir a página;
2. carregar configurações e estado salvo;
3. selecionar modo e nível;
4. iniciar partida;
5. permitir entrada por teclado/teclado virtual;
6. validar tentativa;
7. calcular feedback;
8. atualizar grade e teclado;
9. verificar vitória/derrota;
10. mostrar modal final;
11. salvar progresso;
12. reiniciar ou voltar ao menu.

## 23. Design da grade e do teclado

### 23.1 Grade
A grade deve ser centralizada e fácil de ler.
Recomendação:
- 5 colunas por linha;
- até 6 linhas;
- cada célula com borda suave;
- preenchimento e estado visual por classe.

### 23.2 Teclado virtual
O teclado deve refletir as letras usadas e seu estado.
- letras corretas em verde;
- letras parcialmente corretas em amarelo;
- letras ausentes em cinza;
- botão de Enter e Delete em destaque.

### 23.3 Cores e estados
- correto: verde forte e legível;
- presente: amarelo contrastante;
- ausente: cinza neutro;
- estado base: fundo suave, borda clara.

## 24. Acessibilidade e UX

A interface deve seguir heurísticas fortes de usabilidade:
- tempo de aprendizado curto;
- feedback instantâneo;
- confirmação de ação;
- layout claro mesmo em telas pequenas;
- foco em leitura e decisão rápida.

Além disso, o sistema deve evitar:
- dependência excessiva de cor;
- elementos mínimos invisíveis;
- sobrecarga visual;
- botões com áreas de clique pequenas.

## 25. Testes e validação

### 25.1 Testes de lógica
- comparação correta de letras repetidas;
- validação de palavras inválidas;
- cálculo de vitória/derrota;
- transição entre tentativas;
- progresso e persistence local.

### 25.2 Testes de interface
- layout funcionando em mobile e desktop;
- teclado virtual funcionando corretamente;
- grade se atualiza em cada tentativa;
- modal final aparece corretamente;
- reinício do jogo funciona.

### 25.3 Testes de acessibilidade
- contraste adequado;
- foco navegável pelo teclado;
- feedback não depende só da cor;
- interface legível em tela pequena.

## 26. Roadmap de implementação

### Fase 1 — MVP
- tela inicial;
- seleção de modo e nível;
- grade funcional;
- lógica de validação;
- feedback visual por letras;
- modal final;
- persistência local básica.

### Fase 2 — expansão
- modo difícil;
- modo arcade;
- temas e categorias;
- progresso e conquistas;
- histórico de partidas.

### Fase 3 — refinamento
- melhorias visuais;
- melhorias de acessibilidade;
- refinamento da experiência para mobile;
- expansões futuras de versões.

## 27. Riscos e mitigação

### Risco: palavras muito difíceis
Mitigação: curadoria de dicionário, nível configurável, tema e filtro por dificuldade.

### Risco: baixa retenção
Mitigação: modo diário, streak, progressão leve, variedade por tema e modo.

### Risco: baixa legibilidade
Mitigação: seguir design minimalista premium e manter contraste forte.

### Risco: bugs em lógica de letras repetidas
Mitigação: testar a lógica de comparação intensamente e validar casos de borda.

## 28. Critérios de aceitação

O projeto será aceito quando:
- o jogador entende as regras em poucos segundos;
- o jogo funciona em navegador sem inconsistências;
- o feedback da tentativa é correto e claro;
- o layout segue o design minimalista premium;
- o jogo funciona em desktop e mobile;
- o jogador sente motivação para repetir a partida;
- a aplicação mantém registro local simples de progresso.

## 29. Conclusão

DANA é uma proposta de jogo casual de adivinhação de palavras com alto potencial de retenção, combinação simples de lógica e velocidade, visual forte e progressão leve. O projeto é tecnicamente viável em uma arquitetura leve, com baixa complexidade inicial e alta flexibilidade para crescimento.

Esse documento serve como base para a implementação do MVP e para a evolução do produto em versões futuras.
