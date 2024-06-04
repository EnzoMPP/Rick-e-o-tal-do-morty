export class Personagem {
    constructor(data) {
      this.id = data.id;           // Extrai o ID do personagem dos dados da API.
      this.nome = data.name;       // Extrai o nome do personagem.
      this.status = data.status;   // Extrai o status do personagem (e.g., "Alive", "Dead", "unknown").
      this.especie = data.species; // Extrai a espécie do personagem (e.g., "Human", "Alien").
      this.genero = data.gender;   // Extrai o gênero do personagem (e.g., "Male", "Female", "unknown").
  
      // Extrai o nome do local de origem do personagem:
      this.origem = data.origin.name; 
  
      // Extrai o nome da localização atual do personagem:
      this.localizacao = data.location.name;
  
      this.imagem = data.image;    // Extrai a URL da imagem do personagem.
    }
  }
  