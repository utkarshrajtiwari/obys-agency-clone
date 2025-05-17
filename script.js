function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 200,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.4,
  });
  tl.from("#line1-part1, .line h2", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      let grow = 0;
      let int = setInterval(() => {
        if (grow <= 100) {
          h5timer.textContent = grow;
          grow++;
        } else {
          clearInterval(int);
        }
      }, 30);

      var now = document.querySelector(".line h2");
      let nu = 1;
      let interval = setInterval(() => {
        if (grow <= 100) {
          grow++;
          if (grow % 2 === 0) {
            now.style.fontFamily = "silkserif-light";
            now.style.WebkitTextStroke = "1px white";
            now.style.color = "transparent";
            now.style.fontWeight = "500";
          } else {
            now.style.fontFamily = "plain-light";
            now.style.WebkitTextStroke = "none";
            now.style.color = "white";
            now.style.fontWeight = "500";
          }
        } else {
          clearInterval(int);
        }
      }, 300);
    },
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 3.6,
  });
  tl.from("#page1", {
    delay: 0.3,
    y: 400,
    duration: 0.5,
    opacity: 0,
    scrub: 4,
  });
  tl.to("#loader", {
    display: "none",
  });
}

loadingAnimation();
