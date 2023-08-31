import { Application } from "pixi.js";
import EventEmitter from "events";
import { ScreenAdapter } from "./ScreenAdapter";

const defaultSettings = {
    designResolution: { width: 1560, height: 1560 },
    orientation: "landscape"
}

export class Director extends EventEmitter {
    constructor(settings = defaultSettings) {
        super();
        settings = Object.assign(defaultSettings, settings);
        this.app = new Application({
            view: document.getElementById("pixi-canvas"),
            resolution: 1,
            autoDensity: true,
            backgroundColor: 0x000000,
            width: window.innerWidth,
            height: window.innerHeight,
        });
        this.screenAdapter = new ScreenAdapter(settings, this.app);
    }
}

export const director = new Director();