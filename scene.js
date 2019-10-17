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

Scene.prototype.adicionar = function(sprite){
    this.sprites.push(sprite);    
}

Scene.prototype.desenhar = function(){
    for(var i = 0; i < this.sprites.length; i++){
        this.sprites[i].desenhar(this.ctx);
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

Scene.prototype.passo = function(){
    this.limpar();
    this.cenario();
    this.desenhar();
}