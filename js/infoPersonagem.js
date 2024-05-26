import { Personagem } from './personagem.js';

class InfoPersonagem {
    constructor() {
        this.apiUrl = 'https://rickandmortyapi.com/api/character';
        this.currentCharacterId = 1;

        this.imagemPersonagem = document.getElementById('imagemPersonagem');
        this.nomePersonagem = document.getElementById('nomePersonagem');
        this.statusPersonagem = document.getElementById('statusPersonagem');
        this.especiePersonagem = document.getElementById('especiePersonagem');
        this.generoPersonagem = document.getElementById('generoPersonagem');
        this.origemPersonagem = document.getElementById('origemPersonagem');
        this.localPersonagem = document.getElementById('localPersonagem');
        this.botaoAnterior = document.getElementById('anterior');
        this.botaoProximo = document.getElementById('proximo');
        this.carregamento = document.querySelector('.carregando');

        this.iniciar();
        this.mostrarPersonagem();
    }

    async fetchPersonagem(id) {
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

    exibicaoPersonagem(personagem) {
        if (!personagem) return;

        this.imagemPersonagem.src = personagem.imagem;
        this.nomePersonagem.textContent = personagem.nome;
        this.statusPersonagem.innerHTML = `<span class=infos> Status: </span>${personagem.status}`;
        this.especiePersonagem.innerHTML = `<span class=infos> Espécie: </span>${personagem.especie}`;
        this.generoPersonagem.innerHTML = `<span class=infos>Gênero: </span>${personagem.genero}`;
        this.origemPersonagem.innerHTML = `<span class=infos>Origem: </span>${personagem.origem}`;
        this.localPersonagem.innerHTML = `<span class=infos>Localização: </span>${personagem.localizacao}`;
    }

    async mostrarPersonagem() {
        this.carregamento.style.display = 'flex';
        const personagem = await this.fetchPersonagem(this.currentCharacterId);
        setTimeout(() => {
            this.exibicaoPersonagem(personagem);
            this.carregamento.style.display = 'none';
        }, 300);
    }

    iniciar() {
        this.botaoAnterior.addEventListener('click', () => {
            if (this.currentCharacterId > 1) {
                this.currentCharacterId--;
                this.mostrarPersonagem();
            }
        });

        this.botaoProximo.addEventListener('click', () => {
            this.currentCharacterId++;
            this.mostrarPersonagem();
        });
    }
}

// Inicializa o InfoPersonagem
const infoPersonagem = new InfoPersonagem();
