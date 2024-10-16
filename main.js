import "./style.css";
import Experience from "./Experience/Experience.js";
import { initializeAnimations } from "./Experience/Utils/animation.js";

let experience;
let cleanupAnimations;

function initializeApp() {
  const canvas = document.querySelector(".experience-canvas");
  experience = new Experience(canvas);
  cleanupAnimations = initializeAnimations();
}

function cleanupApp() {
  if (experience) {
    experience.destroy();
    experience = null;
  }
  
  if (cleanupAnimations) {
    cleanupAnimations();
    cleanupAnimations = null;
  }
}

// 初始化应用
initializeApp();

// 在页面卸载时清理资源
window.addEventListener('beforeunload', cleanupApp);

// 可选：如果您的应用支持热重载或动态重新初始化
// 您可以导出这些函数以在需要时调用
export { initializeApp, cleanupApp };