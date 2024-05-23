export class Personagem {
    constructor(data) {
        this.id = data.id;
        this.nome = data.name;
        this.status = data.status;
        this.especie = data.species;
        this.genero = data.gender;
        this.origem = data.origin.name;
        this.localizacao = data.location.name;
        this.imagem = data.image;
    }
}
