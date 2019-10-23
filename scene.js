function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null
    }

    Object.assign(this, exemplo, params);
}

Scene.prototype = new Scene();
Scene.prototype.constructor = Scene;

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);
    sprite.scene = this; 
}

Scene.prototype.desenhar = function(){
    for(var i = 0; i < this.sprites.length; i++){
        this.sprites[i].desenhar(this.ctx);
    }
}

Scene.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
        this.sprites[i].mover(dt);
    }
}

Scene.prototype.comportamento = function () {
    for (var i = 0; i < this.sprites.length; i++) {
        if (this.sprites[i].comportamento) {
            this.sprites[i].comportamento();
        }
    }
}

Scene.prototype.cenario = function(){
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.fillStyle = "tan";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    this.ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

Scene.prototype.limpar = function(){
    this.ctx.clearRect(0, 0, this.w, this.h);
}

Scene.prototype.removeSprites = function () {
    for (var i = 0; i < this.toRemove.length; i++) {
        var idx = this.sprites.indexOf(this.toRemove[i]);
        if (idx >= 0) {
            this.sprites.splice(idx, 1);
        }
    }
    this.toRemove = [];
};

Scene.prototype.passo = function(){
    this.limpar();
    this.cenario();
    this.comportamento();
    this.mover(dt);
    this.desenhar();
    this.removeSprites();
}