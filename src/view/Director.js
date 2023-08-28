import { Application } from "pixi.js";
import { View } from "./View";

const defaultSettings = {
    designResolution: { width: 1560, height: 720},
    orientation: "landscape"
}
export class Director {
    constructor(settings = defaultSettings) {
        settings = Object.assign(defaultSettings, settings);
        this.app = new Application({
            view: document.getElementById("pixi-canvas"),
            resolution: 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.view = new View(settings, this.app);
    }
}