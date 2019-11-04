function Scene(params) {
    var exemplo = {
        sprites: [],
        toRemove: [],
        ctx: null,
        w: 300,
        h: 300,
        assets: null,
        map: null,
        fase: 2
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
                    //this.toRemove.push(this.sprites[j]);
                    this.fase = 3;
                }
            }
        }
    }  
};
Scene.prototype.iniciar = function(){
    this.ctx.fillStyle = "red";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.fillRect((canvas.width/2)-150, (canvas.height/2)-60, 300,60);
    this.ctx.strokeRect((canvas.width/2)-150, (canvas.height/2)-60, 300,60);
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "white";
    this.ctx.font = "35px bold monospaced";
    this.ctx.fillText("Espaço para Iniciar", (canvas.width/2)-135, (canvas.height/2)-25);
    this.ctx.strokeText("Espaço para Iniciar", (canvas.width/2)-135, (canvas.height/2)-25);
    if(controle.espaco){
        this.fase = 1;
    }
}

Scene.prototype.fim = function(){
    this.ctx.fillStyle = "red";
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.fillRect((canvas.width/2)-150, (canvas.height/2)-50, 300,60);
    this.ctx.strokeRect((canvas.width/2)-150, (canvas.height/2)-50, 300,60);
    this.ctx.fillRect((canvas.width/2)-150, (canvas.height/2)+45, 300,60);
    this.ctx.strokeRect((canvas.width/2)-150, (canvas.height/2)+45, 300,60);
    this.ctx.fillStyle = "white";
    this.ctx.strokeStyle = "white";
    this.ctx.font = "30px bold monospaced";
    this.ctx.fillText("Game Over", (canvas.width/2)-80, (canvas.height/2)-12);
    this.ctx.strokeText("Game Over", (canvas.width/2)-80, (canvas.height/2)-12);
    this.ctx.fillText("Espaço para Reiniciar", (canvas.width/2)-135, (canvas.height/2)+82);
    this.ctx.strokeText("Espaço para Reiniciar", (canvas.width/2)-135, (canvas.height/2)+82);
    if(controle.espaco){
        this.fase = 1;
    }
}

Scene.prototype.passo = function () {
    switch (this.fase) {
        case 1:
            this.passo1();
            break;
    
        case 2:
            this.inicio();
            break;

        case 3:
            this.fim();
            break;
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

Scene.prototype.inicio = function () {
    this.limpar();
    this.desenharMapa();
    this.desenhar();
    this.iniciar();
}

Scene.prototype.fim = function () {
    this.limpar();
    this.desenhaCenario();
    this.desenhar();
    this.gameOver();
    this.pontuacao();
    
}