function Sprite(params = {}) {
    var exemplo = {
        x: 0, // Posição em x
        y: 0, // Posição em y
        vx: 0, // Velocidade no eixo x
        vy: 0, // Velocidade no eixo y
        w: 0, // Largura do Sprite
        h: 0, // Altura do Sprite
        props: {}, // Propriedades do Sprite
        comportar: undefined,
        scene: undefined
    }
    Object.assign(this, exemplo, params);
}
Sprite.prototype = new Sprite();
Sprite.prototype.constructor = Sprite;