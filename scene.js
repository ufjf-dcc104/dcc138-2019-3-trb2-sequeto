function Scene(params) {
    var exemplo = {
        sprites: [],
        ctx: null,
        w: 300,
        h: 300
    }

    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;