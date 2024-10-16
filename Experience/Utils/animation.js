import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 注册ScrollTrigger插件
gsap.registerPlugin(ScrollTrigger);

// 页面加载动画
window.addEventListener("load", () => {
  gsap.from(".hero-main-title, .hero-main-description", {
    duration: 1,
    opacity: 0,
    y: -50,
    stagger: 0.2
  });
});

// SVG 动画
gsap.from(".back-to-top-icon", {
  duration: 1,
  rotation: 360,
  transformOrigin: "center",
  repeat: -1,
  ease: "linear",
  paused: true
});

document.querySelector(".back-to-top").addEventListener("mouseenter", function() {
  gsap.to(".back-to-top-icon", { rotation: 0 }).play();
});

document.querySelector(".back-to-top").addEventListener("mouseleave", function() {
  gsap.to(".back-to-top-icon", { rotation: 360 }).reverse();
});