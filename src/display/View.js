import { Graphics } from "pixi.js";

export class View {
    constructor(settings, app) {
        const { designResolution, orientation } = settings;
        this.designResolution = designResolution;
        this.orientation = orientation;
        this._renderer = app.renderer;
        this.app = app;

        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null;
        this._onResized = this.onResize.bind(this);
        window.addEventListener("resize", this._onResized);
        this._showTest = true;
        this._onResized();
    }

    onResize() {
        this._timeOutResize && clearTimeout(this._timeOutResize);
        this._timeOutResize = setTimeout(() => {
            this._timeOutResize = null;
            this.updateView();
        }, 50);
    }

    updateView(){
        this.isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i) != null;
        this._resizeCanvas();
        this._rotateView();
        this._scaleView();
    }

    _resizeCanvas() {
        this._renderer.resize(document.documentElement.clientWidth
            , document.documentElement.clientHeight);
    }

    _rotateView() {
        const screenOrientation = this._getScreenOrientation();
        const rootNode = this.app.stage;

        if (this.isMobile) {
            this.isRotate = (this.orientation !== screenOrientation);
            rootNode.angle = this.isRotate ? 90 : 0;
        } else {
            this.isRotate = false;
            rootNode.angle = 0;
        }
        console.log("rotate", this.isRotate);
    }

    _getScreenOrientation() {
        if (window.matchMedia("(orientation: landscape)").matches) {
            return "landscape";
        }
        if (window.matchMedia("(orientation: portrait)").matches) {
            return "portrait";
        }
    }

    _scaleView() {
        const { width, height } = this._renderer.screen;
        const screenWidth = this.isRotate ? height : width;
        const screenHeight = this.isRotate ? width : height;
        const scale = this._getScaleToFitScreen(screenWidth, screenHeight);
        this.app.stage.scale.set(scale, scale);
        this.app.stage.position.set(width / 2, height / 2);
    }

    _getScaleToFitScreen(screenWidth, screenHeight) {
        const { width, height } = this.designResolution;
        const scaleX = screenWidth / width;
        const scaleY = screenHeight / height;
        let scale = Math.min(scaleX, scaleY);
        this._drawTest(width, height);
        console.log({ screenWidth, screenHeight, scale });
        return scale;
    }

    _drawTest(width, height) {
        if (!this._showTest) return;
        if (!this._graphics) {
            this._initTest();
        }
        const graphics = this._graphics;
        graphics.clear();
        graphics.lineStyle(5, 0xff0000, 2);
        graphics.beginFill();
        graphics.drawRect(-5, -5, 20, 20);
        graphics.endFill();

        graphics.lineStyle(5, 0x00ff00, 2);
        graphics.beginFill();
        graphics.drawRect(-width/2 + 5, -height/2+5, width - 20, height - 20);
        graphics.endFill();
        console.log("graphics", width, height);
    }
    _initTest(){
        this._graphics = new Graphics();
        this.app.stage.addChild(this._graphics);
    }

}