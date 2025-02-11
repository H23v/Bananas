let progress = 0;

function increaseProgress() {
  if (progress < 100) {
    progress += 10;
    if (progress > 100) progress = 100;
    document.getElementById('progressBar').style.width = progress + '%';
  }
  
  if (progress >= 100) {
    const videoContainer = document.getElementById('videoContainer');
    const sacrificioText = document.getElementById('sacrificioText');
    const sacrificioImage = document.getElementById('sacrificioImage');
    const videoSource = document.getElementById('videoSource');
    const sacrificioVideo = document.getElementById('sacrificioVideo');
    
    document.body.classList.add('disabled');
    
    const videoList = [
      "File/textBurn.mp4",
      "File/imgBurn.mp4",
      "File/musicBurn.mp4",
      "File/PDFBurn.mp4"
    ];
    const randomVideo = videoList[Math.floor(Math.random() * videoList.length)];
    
    videoSource.src = randomVideo;
    sacrificioVideo.load();
    
    sacrificioImage.style.display = 'block';
    setTimeout(() => {
      sacrificioImage.style.opacity = '1';
    }, 100);
    
    setTimeout(() => {
      videoContainer.style.display = 'block';
      sacrificioText.style.display = 'flex';
      sacrificioText.style.opacity = '1';
      sacrificioText.innerHTML = "sacrificio inviato"
        .split('')
        .map((letter, i) => `<span style="animation-delay: ${i * 100}ms">${letter}</span>`)
        .join('');
      
      setTimeout(() => {
        videoContainer.style.opacity = '1';
        videoContainer.style.transform = 'translateX(-50%) translateY(0)';
      }, 100);
      
      document.getElementById('sacrificioVideo').play();
      hideElements();
    }, 500); // Il video inizia 500ms dopo l'apparizione dell'immagine
  }
}

function hideElements() {
  document.querySelectorAll('.emoji, .symbol, .popup-container, .button-container, .progress-container, .button-sacrificio')
    .forEach(el => {
      el.style.opacity = '0';
    });
}

function showElements() {
  document.querySelectorAll('.emoji, .symbol, .popup-container, .button-container, .progress-container, .button-sacrificio')
    .forEach(el => {
      el.style.opacity = '1';
    });
}

document.getElementById('sacrificioVideo').addEventListener('ended', function () {
  progress = 0;
  document.getElementById('progressBar').style.width = '0%';
  
  const videoContainer = document.getElementById('videoContainer');
  const sacrificioText = document.getElementById('sacrificioText');
  const sacrificioImage = document.getElementById('sacrificioImage');
  
  document.body.classList.remove('disabled');
  videoContainer.style.opacity = '0';
  videoContainer.style.transform = 'translateX(-50%) translateY(50px)';
  
  sacrificioText.style.opacity = '0';
  
  // Nasconde l'immagine DOPO la dissolvenza del video (ritardo di 1s)
  setTimeout(() => {
    sacrificioImage.style.opacity = '0';
  }, 1000);
  
  setTimeout(() => {
    videoContainer.style.display = 'none';
    sacrificioImage.style.display = 'none';
    sacrificioText.classList.add('hidden');
    showElements();
  }, 2000); // Ritarda la scomparsa dell'immagine rispetto al video
});

const symbols = ['. ݁₊', '⊹', '. ݁˖', '. ݁'];
let lastPopup = null;

function sendEmoji(symbol) {
  for (let i = 0; i < 10; i++) {
    createFloatingElement(symbol, 'emoji', true);
  }
  for (let i = 0; i < 5; i++) {
    createFloatingElement(symbols[Math.floor(Math.random() * symbols.length)], 'symbol', false);
  }
  updatePopup(symbol);
}

function createFloatingElement(content, className, isEmoji) {
  const element = document.createElement('div');
  element.classList.add(className);
  element.textContent = content;
  document.body.appendChild(element);

  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight - 300);
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
  element.style.fontSize = `${Math.random() * 2 + 1}rem`;

  setTimeout(() => {
    element.remove();
  }, 10000);
}

function updatePopup(symbol) {
  if (lastPopup && lastPopup.dataset.symbol === symbol) {
    let count = parseInt(lastPopup.dataset.count) + 1;
    lastPopup.dataset.count = count;
    lastPopup.textContent = `${symbol} +${count}`;
  } else {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.dataset.symbol = symbol;
    popup.dataset.count = 1;
    popup.textContent = `${symbol} +1`;
    document.getElementById('popupContainer').appendChild(popup);
    lastPopup = popup;
  }
}

function createBackgroundSymbols() {
  for (let i = 0; i < 3; i++) {
    createFloatingElement(symbols[Math.floor(Math.random() * symbols.length)], 'symbol', false);
  }
}
setInterval(createBackgroundSymbols, 3000);
