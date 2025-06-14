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
            title: "Dica!",
            text: "Clique nas fotos interativas e se surpreenda!",
            toast: true,          
            position: "top-end",   
            showConfirmButton: false, // Remove o botão "Entendi"
            timer: 3000,           // Fecha automaticamente após 5 segundos
            timerProgressBar: true, // Barra de progresso do timer
            background: "#0c62e2", 
        });
    }, 3000); // 3 segundos = 3000 milissegundos
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


// ================= TELA 2 =================
function iniciarTela2() {
  const letras = document.querySelectorAll('.letter');
  const listaPalavras = document.querySelector('.words-to-find');

  if (!letras.length || !listaPalavras) return;

  const palavras = ['BANANA', 'UVA', 'MAÇÃ', 'KIWI'];
  const encontradas = [];
  let selecionadas = [];
  let interagindo = false;

  function adicionarLetra(letra) {
    if (letra && letra.classList.contains('letter') && !letra.classList.contains('selecionada')) {
      letra.classList.add('selecionada');
      selecionadas.push(letra);
    }
  }

  function limparSelecao() {
    selecionadas.forEach(l => l.classList.remove('selecionada'));
    selecionadas = [];
  }

  function verificarPalavra() {
    const texto = selecionadas.map(l => l.textContent).join('');

    palavras.forEach(palavra => {
      if (texto === palavra && !encontradas.includes(palavra)) {
        encontradas.push(palavra);
        selecionadas.forEach(l => l.classList.add('encontrada'));
        atualizarLista(palavra);
        verificarFimDoJogo(); // 👈 chama aqui
      }
    });

    limparSelecao();
  }

  function verificarFimDoJogo() {
    if (encontradas.length === palavras.length) {
      Swal.fire({
        title: "Parabéns, amor! 🎉",
        text: "Você encontrou todas as palavras!",
        icon: "success",
        confirmButtonText: "Avançar"
      }).then(() => {
        window.location.href = "final.html"; // ajuste conforme quiser
      });
    }
  }

  function atualizarLista(palavra) {
    const itens = document.querySelectorAll('.words-to-find li');
    itens.forEach(item => {
      if (item.textContent === palavra) {
        item.style.textDecoration = 'line-through';
        item.style.color = 'green';
      }
    });
  }

  // Eventos de mouse
  document.addEventListener('mousedown', (e) => {
    interagindo = true;
    limparSelecao();
    const el = e.target;
    adicionarLetra(el);
  });

  document.addEventListener('mousemove', (e) => {
    if (!interagindo) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    adicionarLetra(el);
  });

  document.addEventListener('mouseup', () => {
    interagindo = false;
    verificarPalavra();
  });

  // Eventos de touch
  document.addEventListener('touchstart', (e) => {
    interagindo = true;
    limparSelecao();
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    adicionarLetra(el);
  });

  document.addEventListener('touchmove', (e) => {
    if (!interagindo) return;
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    adicionarLetra(el);
  });

  document.addEventListener('touchend', () => {
    interagindo = false;
    verificarPalavra();
  });

  function embaralharLetras() {
    const container = document.querySelector('.letras');
    const letras = Array.from(container.children);

    for (let i = letras.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letras[i], letras[j]] = [letras[j], letras[i]];
    }

    letras.forEach(letra => container.appendChild(letra));
  }

  embaralharLetras(); // 👈 chama ao iniciar
}



// ================= INICIALIZAÇÃO =================
document.addEventListener('DOMContentLoaded', () => {
  iniciarTela1();
  iniciarTela2();
});
