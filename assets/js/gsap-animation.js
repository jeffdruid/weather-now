// FLIP for GSAP
let layouts = ["final", "plain", "columns", "grid", "final"],
  intro = document.querySelector(".intro"),
  curLayout = 0; // index of the current layout
function nextState() {
  const state = Flip.getState(".block", {
    props: "color,backgroundColor",
    simple: true,
  }); // capture current state
  if (curLayout < layouts.length - 1) {
    intro.classList.remove(layouts[curLayout]); // remove old class
    curLayout++; // increment
    intro.classList.add(layouts[curLayout]); // add the new class
  } else {
    gsap.fromTo(
      intro,
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1.25,
        delay: 1.25,
        onComplete: () => {
          intro.style.display = "none"; // hide the intro element when the animation ends
          document.body.style.overflow = "visible";
          document.getElementById("side-bar").style.display = "flex";
          document.getElementById("side-bar-close-btn").style.display = "flex";
          document.querySelector(".container").style.display = "flex";
          document.querySelector(".search").style.display = "flex";
          document.getElementById("scrolling-container").style.display =
            "flex";
          document.body.style.background =
            "radial-gradient(circle, var(--gradient-start-color) 0%, var(--gradient-end-color) 100%)";
        },
      }
    );
    return;
  }
  Flip.from(state, {
    // animate from the previous state
    absolute: true,
    stagger: 0.07,
    duration: 0.7,
    ease: "power2.inOut",
    spin: curLayout === 0, // only spin when going to the "final" layout
    simple: true,
    onEnter: (elements, animation) =>
      gsap.fromTo(
        elements,
        { opacity: 0 },
        { opacity: 1, delay: animation.duration() - 0.2 }
      ),
    onLeave: (elements) => {
      gsap.to(elements, { opacity: 0 });
    },
  });
  gsap.delayedCall(curLayout === 0 ? 0.25 : 0.9, nextState);
}
gsap.delayedCall(1, nextState);
