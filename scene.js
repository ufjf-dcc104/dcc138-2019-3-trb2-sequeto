function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        fase: 1
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

Scene.prototype.desenharMapa = function () {
    this.map.desenhar(this.ctx);
}

Scene.prototype.checaColisao = function(){
    for(var i = 0; i<this.sprites.length; i++){
        for(var j = i+1; j<this.sprites.length; j++){
            if(this.sprites[i].atingiu(this.sprites[j])){
                if(this.sprites[i].props.tipo === "pc" && this.sprite[j].props.tipo === "npc"){
                    this.toRemove.push(this.sprites[j]);
                }
            }
        }
    }  
};
/*Scene.prototype.inicio = function(){
    function iniciar(){
        this.fase = 1;
    }
}

Scene.prototype.fim = function(){
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    ctx.font = "35px bold monospaced";
    ctx.fillText("Game Over", 300, 150);
    ctx.strokeText("Game Over", 300, 150);
}*/

Scene.prototype.passo = function () {
    switch (this.fase) {
        case 1:
            this.passo1();
            break;
    
        /*case 2:
            this.inicio();
            break;*/

        /*case 3:
            this.fim();
            break;*/
    }
}

Scene.prototype.passo1 = function(){
    this.limpar();
    this.cenario();
    this.desenharMapa();
    this.comportamento();
    this.mover(dt);
    this.desenhar();
    this.checaColisao();
    this.removeSprites();
}

/*Scene.prototype.inicio = function () {
    this.limpar();
    this.desenharMapa();
    this.desenhar();
    this.inicio();
}*/

/*Scene.prototype.fim = function () {
    this.limpar();
    this.desenhaCenario();
    this.desenhar();
    this.gameOver();
    this.pontuacao();
    
}*/