function Map(modelo) {
    exemplo = {
        cells: [],
        LINES: 10,
        COLUMNS: 10,
        SIZE: 32,
        scene: undefined,
        assets: undefined
    }
    Object.assign(this, exemplo, modelo);
    for (var c = 0; c < this.COLUMNS; c++) {
        this.cells[c] = [];
        for (var l = 0; l < this.LINES; l++) {
            exemplo.cells[c][l] = { tipo: 0 };
        }
    }
    if (modelo.m) {
        for (var c = 0; c < this.COLUMNS; c++) {
            for (var l = 0; l < this.LINES; l++) {
                this.cells[c][l] = { tipo: modelo.m[l][c] };
            }
        }
    }
}

Map.prototype.desenhar = function (ctx) {
    var cor = "black";
    for (var c = 0; c < this.COLUMNS; c++) {
        for (var l = 0; l < this.LINES; l++) {
                switch (this.cells[c][l].tipo) {
                case 1:
                    ctx.drawImage(this.scene.assets.img("cenario"),
                        24 * 32,
                        15 * 32,
                        96,
                        96,
                        c * this.SIZE,
                        l * this.SIZE,
                        this.SIZE,
                        this.SIZE
                    );
                    break;
                default:
                        cor = "black";
            }
        }
    }
}