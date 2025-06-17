// ================= TELA 1 =================
function iniciarTela1() {
  // Elementos DOM
  const heartsContainer = document.getElementById('hearts-container');
  const h2 = document.querySelector('h2');
  const btnPlay = document.getElementById('btnPlay');
  const btnPause = document.getElementById('btnPause');
  const gameBoard = document.getElementById("gameBoard");

  // Verifica se todos elementos existem
  if (!heartsContainer || !h2 || !btnPlay || !btnPause || !gameBoard) {
    console.error("Elementos necessários não encontrados");
    return;
  }

  // ========== FUNÇÕES AUXILIARES ==========

 // Função para exibir o alerta após 10 segundos
  function exibirAlertaInicial() {
    setTimeout(() => {
        Swal.fire({
            toast: true,
            position: "top-end",
            text: "Clique nas fotos!",
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            background: "#E0D609",
            color:"#000000",
            width: 190,
            customClass: {
              popup: 'meu-alerta'
  }
        });
    }, 2000); // 3 segundos = 3000 milissegundos
}

// Chamar a função quando a página carregar
window.onload = exibirAlertaInicial;
  // Criação de corações
  function createHearts() {
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.style.left = `${Math.random() * 100}vw`;
      heart.style.animationDuration = `${Math.random() * 10 + 2}s`;
      heart.style.opacity = Math.random();
      heartsContainer.appendChild(heart);
    }
  }

  // Efeito de máquina de escrever
 function typeWriterLoop(element, messages, speed = 100, pause = 1500) {
    let msgIndex = 0;
    let charIndex = 0;
    let typing = true;
    let lastTime = 0;
    let isRunning = true;

    function type(timestamp) {
        if (!isRunning) return;

        if (!lastTime) lastTime = timestamp;
        const delta = timestamp - lastTime;

        const currentText = messages[msgIndex];
        const delay = typing ? speed : speed / 2;

        if (delta >= delay) {
            lastTime = timestamp;

            if (typing) {
                if (charIndex <= currentText.length) {
                    element.textContent = currentText.substring(0, charIndex);
                    charIndex++;
                } else {
                    typing = false;
                    lastTime = timestamp + pause;
                }
            } else {
                if (charIndex >= 0) {
                    element.textContent = currentText.substring(0, charIndex);
                    charIndex--;
                } else {
                    typing = true;
                    msgIndex = (msgIndex + 1) % messages.length;
                }
            }
        }

        if (isRunning) {
            requestAnimationFrame(type);
        }
    }

    requestAnimationFrame(type);

    return () => {
        isRunning = false;
    };
}

  // ========== CONFIGURAÇÃO DO JOGO ==========

  // Dados das cartas
  const images = ["clo1.jpg", "clo2.jpg", "clo3.jpg", "clo4.jpg"]; // Corrigido "cio3.jpg" para "clo3.jpg"
  const frases = [
    "Te amo pai",
    "Obrigada por tudo!",
    "Você é o melhor!",
    "Feliz Dia Dos Pais"
  ];

  // Variáveis de estado
  let previousCard = null;
  let revertTimeout = null;

  // ========== INICIALIZAÇÃO ==========

  // Cria corações
  createHearts();

  // Configura efeito de digitação
  const mensagens = [
    'Feliz Dia dos Pais!',
    'Você é o melhor pai do mundo!',
    'Uma homenagem especial!',
    'Eu te amo muito!'
  ];
  typeWriterLoop(h2, mensagens, 80, 1500);

  // Configura o jogo de cartas
  function iniciarJogoCartas() {
    // Limpa o tabuleiro
    gameBoard.innerHTML = '';
  
  // Detecta dispositivo móvel
  const isMobile = window.innerWidth <= 768;
  
  // Configurações dinâmicas
  gameBoard.style.gridTemplateColumns = isMobile ? 
    'repeat(2, 1fr)' : 'repeat(4, 1fr)';
  
  gameBoard.style.gap = isMobile ? '10px' : '20px';
    
    // Embaralha as imagens
    images.sort(() => 0.5 - Math.random());

    // Cria as cartas
    images.forEach((image, index) => {
      const card = document.createElement("div");
      card.classList.add("card");

      // Verso da carta (texto)
      const back = document.createElement("div");
      back.classList.add("back");
      back.textContent = frases[index];

      // Frente da carta (imagem)
      const front = document.createElement("div");
      front.classList.add("front");
      const img = document.createElement("img");
      img.src = image;
      img.alt = `Imagem ${index + 1}`;
      front.appendChild(img);

      // Monta a carta
      card.appendChild(front);
      card.appendChild(back);

      // Evento de clique
      card.addEventListener("click", () => {
        if (card.classList.contains("flipped")) return;

        if (previousCard) {
          previousCard.classList.remove("flipped");
          clearTimeout(revertTimeout);
        }

        card.classList.add("flipped");
        previousCard = card;

        revertTimeout = setTimeout(() => {
          if (card.classList.contains("flipped")) {
            card.classList.remove("flipped");
            previousCard = null;
          }
        }, 3000);
      });

      gameBoard.appendChild(card);
    });
  }

  // Inicia o jogo de cartas
  iniciarJogoCartas();

  const som = new Howl({ 
      src: ['musica.mp3'],
      html5: true, // Usa o Audio HTML5 para melhor performance
      preload: true // Carrega o áudio antecipadamente
  });

  btnPlay.addEventListener('click', () => {
      if (!som.playing()) { // Só toca se não estiver tocando
          som.play();
      }
  });

  btnPause.addEventListener('click', () => {
      if (som.playing()) { // Só pausa se estiver tocando
          som.pause();
      }
  });
  }

// Inicia a tela quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', iniciarTela1);


// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
  iniciarTela1();
});
