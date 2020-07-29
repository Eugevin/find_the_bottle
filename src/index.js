window.onload = () => {
  const app = document.getElementById('app');
  const audio = document.querySelector('audio');

  // welcome section

  const appWelcome = document.createElement('a');
  appWelcome.classList.add('app__welcome');
  appWelcome.textContent = 'Start';

  app.append(appWelcome);

  appWelcome.addEventListener('click', function () {
    this.style.animation = 'appWelcomeOut .5s ease forwards';

    this.addEventListener('animationend', () => {
      this.remove();

      startTheGame();
    });
  });

  // main game section

  function startTheGame() {
    app.innerHTML = '<div class="app__box"></div><div class="app__box"></div><div class="app__box"></div>';

    audio.volume = 0.25;
    audio.play();

    const allBoxes = document.querySelectorAll('.app__box');
    const randomIndex = parseInt(Math.random() * 3);
    const randomBox = allBoxes[randomIndex];

    randomBox.classList.add('app__box_active');

    setTimeout(() => {
      setTimeout(() => {
        randomBox.classList.remove('app__box_active');
      }, 1000);

      allBoxes.forEach(box => {
        box.style.animation = 'appBoxOut .5s ease forwards';

        const gameInterval = setInterval(() => {
          const posX = parseInt(Math.random() * (window.innerWidth - 100));
          const posY = parseInt(Math.random() * (window.innerHeight - 100));

          box.style.left = `${posX}px`;
          box.style.top = `${posY}px`;
        }, 300);

        setTimeout(() => {
          clearInterval(gameInterval);

          document.addEventListener('click', () => {
            randomBox.style.background = 'green';

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          });
        }, 10000);
      });
    }, 1000);
  }
}