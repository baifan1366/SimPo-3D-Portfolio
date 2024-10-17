import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initializeAnimations() {

    // SVG 动画
    const backToTopIcon = gsap.to(".back-to-top-icon", {
        duration: 1,
        rotation: 360,
        transformOrigin: "center",
        ease: "linear",
        paused: true
    });

    const backToTopButton = document.querySelector(".back-to-top");
    backToTopButton.addEventListener("mouseenter", () => backToTopIcon.play());
    backToTopButton.addEventListener("mouseleave", () => backToTopIcon.reverse());

    // 清理函数
    return () => {
        backToTopIcon.kill();
        backToTopButton.removeEventListener("mouseenter", backToTopIcon.play);
        backToTopButton.removeEventListener("mouseleave", backToTopIcon.reverse);
    };
}
