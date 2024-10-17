import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.preloader.on("enablecontrols", this.enableControls.bind(this));
        this.sizes.on("resize", this.resize.bind(this));
        this.time.on("update", this.update.bind(this));
    }

    enableControls() {
        this.controls = new Controls();
    }

    resize() {
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

    update() {
        if (this.preloader.active) {
            this.preloader.update();
        }
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }

    destroy() {
        // 停止更新循环
        this.time.stop();

        // 销毁各个组件
        if (this.controls) {
            this.controls.destroy();
        }
        this.preloader.destroy();
        this.preloader.off("enablecontrols");
        //this.world.destroy(); // 假设 World 类也有一个 destroy 方法
        this.camera.destroy();
        //this.renderer.destroy(); // 假设 Renderer 类有一个 destroy 方法
        this.theme.destroy();

        // 清理 Three.js 场景
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                child.material.dispose();
            }
        });
        this.scene.clear();

        this.sizes.off("resize");
        this.time.off("update");
        Experience.instance = null;
    }
}
