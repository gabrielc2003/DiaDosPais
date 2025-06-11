// Função para criar corações
function createHearts() {
  const heartsContainer = document.getElementById('hearts-container');
  if (!heartsContainer) return; // <- só cria se o container existir

  for (let i = 0; i < 20; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`;
    heart.style.opacity = Math.random();
    heartsContainer.appendChild(heart);
  }
}

createHearts();


function typeWriterLoop(element, messages, speed = 100, pause = 1500) {
    let msgIndex = 0;
    let charIndex = 0;
    let typing = true;

    function type() {
        const currentText = messages[msgIndex];

        if (typing) {
            if (charIndex <= currentText.length) {
                element.innerHTML = currentText.substring(0, charIndex);
                charIndex++;
                setTimeout(type, speed);
            } else {
                typing = false;
                setTimeout(type, pause);
            }
        } else {
            if (charIndex >= 0) {
                element.innerHTML = currentText.substring(0, charIndex);
                charIndex--;
                setTimeout(type, speed / 2);
            } else {
                typing = true;
                msgIndex = (msgIndex + 1) % messages.length;
                setTimeout(type, speed);
            }
        }
    }

    type();
}

// Inicia quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const h2 = document.querySelector('h2');

    const mensagens = [
        'Feliz Dia dos Pais!',
        'Você é o melhor pai do mundo!',
        'Uma homenagem especial!',
        'Eu te amo muito!'
    ];

    typeWriterLoop(h2, mensagens, 80, 1500);
});

// Chama a função para criar os corações
createHearts();

 // Cria o som com Howler
    const som = new Howl({
      src: ['musica.mp3'] // coloque o caminho do seu áudio aqui
    });

    // Eventos dos botões
    document.getElementById('btnPlay').addEventListener('click', () => {
      som.play();
    });

    document.getElementById('btnPause').addEventListener('click', () => {
      som.pause();
    });

  const letras = document.querySelectorAll('.letter');
  const palavras = ['BANANA', 'UVA', 'MAÇÃ', 'KIWI'];
  const encontradas = [];

  let selecionadas = [];

  letras.forEach((letra) => {
    letra.addEventListener('click', () => {
      letra.classList.toggle('selecionada');

      if (!selecionadas.includes(letra)) {
        selecionadas.push(letra);
      } else {
        selecionadas = selecionadas.filter(l => l !== letra);
      }

      verificarPalavra();
    });
  });

  function verificarPalavra() {
    const textoSelecionado = selecionadas.map(l => l.textContent).join('');

    // Verifica se é alguma das palavras
    palavras.forEach(palavra => {
      if (textoSelecionado === palavra && !encontradas.includes(palavra)) {
        encontradas.push(palavra);
        selecionadas.forEach(l => l.classList.add('encontrada'));
        atualizarLista(palavra);
        selecionadas = [];
      }
    });
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

