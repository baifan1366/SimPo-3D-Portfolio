import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();
        this.theme = this.getInitialTheme();
        
        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");
       
        this.setEventListeners();
        this.applyTheme(this.theme);
    }

    getInitialTheme(){
        const currentHour = new Date().getHours();
        return currentHour >= 18 || currentHour < 6 ? "dark" : "light";
    }

    applyTheme(theme){
        document.body.classList.remove("light-theme", "dark-theme");
        document.body.classList.add(`${theme}-theme`);

        if (this.toggleCircle) {
            this.toggleCircle.classList.toggle("slide", theme === "dark");
        }

        this.theme = theme;
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "light" ? "dark" : "light";
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");

            this.emit("switch", this.theme);
        });
    }        

    destroy() {
        this.toggleButton.removeEventListener("click", this.toggleTheme);
    }
}
