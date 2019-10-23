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
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.drawImage(
        this.scene.assets.img("personagem"),
        -this.w,
        -this.h,
        this.w*3,
        this.h*3 
    );
    ctx.restore();
}

Sprite.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
}