/* Gallery */

console.clear();

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

let flipCtx;

const createTween = () => {
  const galleryElement = document.querySelector("#gallery-8");

  if (!galleryElement) {
    return;
  }

  const galleryItems = galleryElement.querySelectorAll(".gallery__item");

  flipCtx && flipCtx.revert();
  galleryElement.classList.remove("gallery--final");

  flipCtx = gsap.context(() => {
    galleryElement.classList.add("gallery--final");

    const flipState = Flip.getState(galleryItems);

    galleryElement.classList.remove("gallery--final");

    const flip = Flip.to(flipState, {
      simple: true,
      ease: "expoScale(1, 5)",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryElement,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: galleryElement.parentNode,
      },
    });

    tl.add(flip);

    return () => gsap.set(galleryItems, { clearProps: "all" });
  });
};

createTween();

window.addEventListener("resize", createTween);

/* Hero Slider */

const initHeroSlider = () => {
  const track = document.querySelector(".slider-track");

  if (!track) {
    return;
  }

  const slides = Array.from(track.querySelectorAll(".slide"));

  if (!slides.length) {
    return;
  }

  const originalCount = slides.length;

  slides.forEach((slide) => {
    track.appendChild(slide.cloneNode(true));
  });

  let currentIndex = 0;

  const getGap = () => {
    return window.innerWidth <= 600 ? 16 : 24;
  };

  const getSlideWidth = () => {
    return slides[0].getBoundingClientRect().width;
  };

  const moveSlider = () => {
    const distance = getSlideWidth() + getGap();

    currentIndex++;

    track.style.transition = "transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)";

    track.style.transform = `translateX(-${currentIndex * distance}px)`;
  };

  track.addEventListener("transitionend", () => {
    if (currentIndex >= originalCount) {
      track.style.transition = "none";

      currentIndex = 0;

      track.style.transform = "translateX(0)";

      track.offsetHeight;

      track.style.transition =
        "transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
    }
  });

  setInterval(moveSlider, 3500);

  window.addEventListener("resize", () => {
    const distance = getSlideWidth() + getGap();

    track.style.transition = "none";

    track.style.transform = `translateX(-${currentIndex * distance}px)`;
  });
};

initHeroSlider();
