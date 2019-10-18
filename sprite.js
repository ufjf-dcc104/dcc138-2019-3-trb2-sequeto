function Sprite(params = {}) {
    var exemplo = {
        x: 0, // Posição em x
        y: 0, // Posição em y
        vx: 0, // Velocidade no eixo x
        vy: 0, // Velocidade no eixo y
        w: 0, // Largura do Sprite
        h: 0, // Altura do Sprite
        props: {}, // Propriedades do Sprite
        comportamento: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;

Sprite.prototype.desenhar = function(ctx){
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.strokeRect(this.x, this.y, this.w, this.h);
}

Sprite.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
}