// ===== SELEÇÃO DE ELEMENTOS DO HTML =====
// Estes elementos são selecionados do DOM para serem manipulados pelo JavaScript
const mario = document.querySelector('.mario');
// Seleciona a imagem do Mario que será o personagem jogável
const pipe = document.querySelector('.pipe');
// Seleciona a imagem do cano que será o obstáculo do jogo
const startButton = document.querySelector('.start');
// Seleciona o botão de iniciar o jogo
const restartButton = document.querySelector('.restart');
// Seleciona o botão de reiniciar o jogo após Game Over
const gameOver = document.querySelector('.game-over');
// Seleciona o container da tela de Game Over

// ===== DEFINIÇÃO DE ÁUDIOS =====
// Cria novos objetos de áudio que serão tocados em diferentes momentos do jogo
const audioStart = new Audio('./sound/audio_theme.mp3');
// Áudio da música tema que toca durante o jogo
const audioGameOver = new Audio('./sound/audio_gameover.mp3');
// Áudio que toca quando o jogador bate no cano

// ===== VARIÁVEIS DE CONTROLE DO JOGO =====
// ID do intervalo (setInterval) que executa a lógica principal do jogo
let gameInterval = null;

// ===== FUNÇÃO PARA INICIAR O JOGO =====
// Esta função inicia uma nova partida do jogo
const startGame = () => {
  // Adiciona a animação do cano que faz ele se mover da direita para a esquerda
  pipe.classList.add('pipe-animation');
  
  // Oculta o botão de iniciar para evitar cliques acidentais
  startButton.style.display = 'none';
  
  // Oculta a tela de Game Over se ela estava visível (do jogo anterior)
  gameOver.style.display = 'none';

  // Reinicia o áudio do tema para começar do início
  audioStart.currentTime = 0;
  
  // Inicia a reprodução da música tema
  audioStart.play();

  // Verifica se o intervalo do jogo já não está rodando
  if (!gameInterval) {
    // Cria um intervalo que executa a função gameLoop a cada 10 milissegundos
    // Isso atualiza a detecção de colisão continuamente
    gameInterval = setInterval(gameLoop, 10);
  }
};

// ===== FUNÇÃO PARA REINICIAR O JOGO =====
// Esta função reinicia o jogo após uma colisão com o cano
const restartGame = () => {
  // Adiciona a animação do cano novamente
  pipe.classList.add('pipe-animation');
  
  // Remove a posição esquerda do cano (se havia sido definida durante a colisão)
  pipe.style.left = '';
  
  // Define o cano para iniciar da direita novamente
  pipe.style.right = '0';

  // Muda a imagem do Mario de volta para a animação normal (não a de morte)
  mario.src = './img/mario.gif';
  
  // Redefine o tamanho do Mario para o tamanho normal
  mario.style.width = '150px';
  
  // Posiciona o Mario de volta ao chão
  mario.style.bottom = '0';
  
  // Remove a margem esquerda do Mario (se havia sido definida durante a colisão)
  mario.style.marginLeft = '';

  // Oculta a tela de Game Over
  gameOver.style.display = 'none';
  
  // Oculta o botão de iniciar
  startButton.style.display = 'none';

  // Para o áudio de Game Over se ele estava tocando
  audioGameOver.pause();
  
  // Reinicia o áudio de Game Over
  audioGameOver.currentTime = 0;
  
  // Reinicia a música tema
  audioStart.currentTime = 0;
  
  // Inicia a reprodução da música tema
  audioStart.play();

  // Verifica se o intervalo do jogo já não está rodando
  if (!gameInterval) {
    // Cria um novo intervalo para continuar detectando colisões
    gameInterval = setInterval(gameLoop, 10);
  }
};
