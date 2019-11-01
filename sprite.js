function Sprite(params = {}) {
    var exemplo = {
        x: 0, // Posição em x
        y: 0, // Posição em y
        size: 64, // tamanho
        posicaox: 0,
        posicaoy: 704,
        direcao:0,
        animacao: 0,
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
        this.posicaox,
        this.posicaoy,
        this.size,
        this.size,
        -this.size / 2,
        1 - this.size,
        this.size/1.2,
        this.size/1.2
    );
    ctx.restore();
}

Sprite.prototype.mover = function (dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;

    this.mc = Math.floor(this.x / this.scene.map.SIZE);
    this.ml = Math.floor(this.y / this.scene.map.SIZE);
    
    this.aplicaRestricoes(dt);
}

Sprite.prototype.aplicaRestricoes = function (dt) {
    var dnx;
    var dx;
    dx = this.vx * dt;
    dnx = dx;
    dy = this.vy * dt;
    dny = dy;
    if (dx > 0 && this.scene.map.cells[this.mc + 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc + 1) - (this.x + this.w);
        dx = Math.min(dnx, dx);
    }
    if (dx < 0 && this.scene.map.cells[this.mc - 1][this.ml].tipo != 0) {
        dnx = this.scene.map.SIZE * (this.mc - 1 + 1) - (this.x - this.w);
        dx = Math.max(dnx, dx);
    }
    if (dy > 0 && this.scene.map.cells[this.mc][this.ml + 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml + 1) - (this.y + this.h);
        dy = Math.min(dny, dy);
    }
    if (dy < 0 && this.scene.map.cells[this.mc][this.ml - 1].tipo != 0) {
        dny = this.scene.map.SIZE * (this.ml - 1 + 1) - (this.y - this.h);
        dy = Math.max(dny, dy);
    }

    this.x = this.x + dx;
    this.y = this.y + dy;

    var MAXX = this.scene.map.SIZE * this.scene.map.COLUMNS;
    var MAXY = this.scene.map.SIZE * this.scene.map.LINES;

    if (this.x > MAXX) 
        this.x = MAXX + this.w;
    if (this.y > MAXY)
        this.y = MAXY + this.h;
    if (this.x - this.w < 0) this.x = 0;
    if (this.y - this.h < 0) this.y = 0;
}