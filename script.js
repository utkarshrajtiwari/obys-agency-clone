function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
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
    delay: 0.4,
    y: 400,
    duration: 0.5,
    opacity: 0,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0,
  });
  tl.from(".hero h1, #hero3 h2", {
    y: 200,
    stagger: 0.2,
  });
  tl.from("#main", {
    onStart: function () {
      locomotiveAnimation();
    },
  });
}

function crsrMagnetAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#crsr", {
      left: dets.x,
      top: dets.y,
    });
  });

  Shery.makeMagnet("#nav-part2 li", {});
}
// locomotiveAnimation();

loadingAnimation();

crsrMagnetAnimation();

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 6,
    debug: false,
    gooey: true,
  });
}

sheryAnimation();
