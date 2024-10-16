import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initializeAnimations() {
    // 页面加载动画
    gsap.from(".hero-main-title, .hero-main-description", {
        duration: 1,
        opacity: 0,
        y: -50,
        stagger: 0.2
    });

    // SVG 动画
    const backToTopIcon = gsap.to(".back-to-top-icon", {
        duration: 1,
        rotation: 360,
        transformOrigin: "center",
        repeat: -1,
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

// 在主应用文件中使用
// const cleanupAnimations = initializeAnimations();
// 
// // 在组件卸载或页面关闭时调用
// cleanupAnimations();