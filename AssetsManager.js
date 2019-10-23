function AssetsManager() {
    this.Carregar = 0;
    this.carregadas = 0;
    this.images = {};
}

AssetsManager.prototype.loadImage = function (key, url) {
    console.log(`Carregando imagem ${url}`);

    this.Carregar++;
    var imagem = new Image();
    imagem.src = url;
    this.images[key] = imagem;
    var that = this;
    imagem.addEventListener("load", function () {
        that.carregadas++;
        console.log(`Imagem ${that.carregadas}/${that.Carregar} ${key}: ${url} carregada.`);
    });
}

AssetsManager.prototype.img = function (key) {
    return this.images[key];
}

AssetsManager.prototype.progresso = function () {
    if (this.Carregar != 0) {
        return this.carregadas / this.Carregar * 100.0;
    } else return 0.0;

}