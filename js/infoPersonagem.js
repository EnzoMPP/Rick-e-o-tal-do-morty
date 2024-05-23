import { Personagem } from './personagem.js';

class InfoPersonagem {
    constructor() {
        this.apiUrl = 'https://rickandmortyapi.com/api/character';
        this.currentCharacterId = 1;

        this.characterImage = document.getElementById('character-image');
        this.characterName = document.getElementById('character-name');
        this.characterStatus = document.getElementById('character-status');
        this.characterSpecies = document.getElementById('character-species');
        this.characterGender = document.getElementById('character-gender');
        this.characterOrigin = document.getElementById('character-origin');
        this.characterLocation = document.getElementById('character-location');
        this.prevButton = document.getElementById('prev-btn');
        this.nextButton = document.getElementById('next-btn');
        this.loading = document.querySelector('.carregando');

        this.setupEventListeners();
        this.showCharacter();
    }

    async fetchCharacter(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            if (!response.ok) {
                throw new Error('Personagem não encontrado');
            }
            const data = await response.json();
            return new Personagem(data); // Cria um objeto Personagem
        } catch (error) {
            console.error('Erro ao buscar personagem:', error);
            alert(error.message);
            return null;
        }
    }

    displayCharacter(personagem) {
        if (!personagem) return;

        this.characterImage.src = personagem.imagem;
        this.characterName.textContent = personagem.nome;
        this.characterStatus.textContent = `Status: ${personagem.status}`;
        this.characterSpecies.textContent = `Espécie: ${personagem.especie}`;
        this.characterGender.textContent = `Gênero: ${personagem.genero}`;
        this.characterOrigin.textContent = `Origem: ${personagem.origem}`;
        this.characterLocation.textContent = `Localização: ${personagem.localizacao}`;
    }

    async showCharacter() {
        this.loading.style.display = 'flex';
        const personagem = await this.fetchCharacter(this.currentCharacterId);
        setTimeout(() => {
            this.displayCharacter(personagem);
            this.loading.style.display = 'none';
        }, 300);
    }

    setupEventListeners() {
        this.prevButton.addEventListener('click', () => {
            if (this.currentCharacterId > 1) {
                this.currentCharacterId--;
                this.showCharacter();
            }
        });

        this.nextButton.addEventListener('click', () => {
            this.currentCharacterId++;
            this.showCharacter();
        });
    }
}

// Inicializa o InfoPersonagem
const infoPersonagem = new InfoPersonagem();
