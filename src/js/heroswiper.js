const swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 24,

  loop: false,

  speed: 9000,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  allowTouchMove: false,
});

swiper.on("reachEnd", function () {
  swiper.autoplay.stop();

  swiper.params.autoplay.reverseDirection = true;

  setTimeout(() => {
    swiper.autoplay.start();
  }, 500);
});

swiper.on("reachBeginning", function () {
  swiper.autoplay.stop();

  swiper.params.autoplay.reverseDirection = false;

  setTimeout(() => {
    swiper.autoplay.start();
  }, 500);
});

// second slider

const secondSwiper = new Swiper(".secondSwiper", {
  slidesPerView: "auto",
  spaceBetween: 24,

  loop: false,

  speed: 7000,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  allowTouchMove: false,
});

secondSwiper.on("reachEnd", function () {
  secondSwiper.autoplay.stop();

  secondSwiper.params.autoplay.reverseDirection = true;

  setTimeout(() => {
    secondSwiper.autoplay.start();
  }, 500);
});

secondSwiper.on("reachBeginning", function () {
  secondSwiper.autoplay.stop();

  secondSwiper.params.autoplay.reverseDirection = false;

  setTimeout(() => {
    secondSwiper.autoplay.start();
  }, 500);
});