document.addEventListener("DOMContentLoaded", () => {

  const isHomePage =
    window.location.pathname.endsWith("/") ||
    window.location.pathname.endsWith("/index.html");

  if (!isHomePage) {
    return;
  }

  document.body.classList.add("home-page");


  const firstSwiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: false,
    allowTouchMove: false,
    speed: 0,
  });


  const secondSwiper = new Swiper(".secondSwiper", {
    slidesPerView: "auto",
    spaceBetween: 24,
    loop: false,
    allowTouchMove: false,
    speed: 0,
  });

  const FIRST_SPEED = 0.035;
  const SECOND_SPEED = 0.035;

  const WHEEL_FORCE = 0.025;

  const MAX_WHEEL_SPEED = 0.18;

  const ACCELERATION = 0.08;

  const DECELERATION = 0.035;

  let firstVelocity = FIRST_SPEED;
  let secondVelocity = SECOND_SPEED;

  let firstTargetVelocity = FIRST_SPEED;
  let secondTargetVelocity = SECOND_SPEED;

  let firstDirection = -1;
  let secondDirection = 1;


  function moveFirstSlider(distance) {
    const min = firstSwiper.maxTranslate();
    const max = firstSwiper.minTranslate();

    let current = firstSwiper.getTranslate();

    current += firstDirection * distance;

    // انتهای چپ
    if (current <= min) {
      current = min;
      firstDirection = 1;
    }

    // انتهای راست
    if (current >= max) {
      current = max;
      firstDirection = -1;
    }

    firstSwiper.setTranslate(current);
  }


  function moveSecondSlider(distance) {
    const min = secondSwiper.maxTranslate();
    const max = secondSwiper.minTranslate();

    let current = secondSwiper.getTranslate();

    current += secondDirection * distance;

    if (current <= min) {
      current = min;
      secondDirection = 1;
    }

    if (current >= max) {
      current = max;
      secondDirection = -1;
    }

    secondSwiper.setTranslate(current);
  }

  let lastTime = performance.now();

  function animate(time) {
    const delta = time - lastTime;

    lastTime = time;

    firstVelocity += (firstTargetVelocity - firstVelocity) * ACCELERATION;

    secondVelocity += (secondTargetVelocity - secondVelocity) * ACCELERATION;

    moveFirstSlider(firstVelocity * delta);

    moveSecondSlider(secondVelocity * delta);

    requestAnimationFrame(animate);
  }


  let wheelTimeout;

  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      const delta = event.deltaY;


      if (delta > 0) {
        firstDirection = -1;
        secondDirection = 1;
      } else if (delta < 0) {
        firstDirection = 1;
        secondDirection = -1;
      }


      const wheelSpeed = Math.min(
        Math.abs(delta) * WHEEL_FORCE,
        MAX_WHEEL_SPEED,
      );

      firstTargetVelocity = FIRST_SPEED + wheelSpeed;

      secondTargetVelocity = SECOND_SPEED + wheelSpeed;


      clearTimeout(wheelTimeout);

      wheelTimeout = setTimeout(() => {
        firstTargetVelocity = FIRST_SPEED;
        secondTargetVelocity = SECOND_SPEED;
      }, 180);
    },
    {
      passive: false,
    },
  );

  requestAnimationFrame(animate);
});
