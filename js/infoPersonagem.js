import { Personagem } from './personagem.js'; // Importa a classe `Personagem` de um arquivo externo para representar os dados de um personagem.

class InfoPersonagem {
    constructor() {
        this.apiUrl = 'https://rickandmortyapi.com/api/character'; // URL base da API Rick and Morty.
        this.IDpersonagem = 1; // ID do personagem atual (começa com o primeiro).

        // Referências aos elementos do DOM onde as informações serão exibidas:
        this.imagemPersonagem = document.getElementById('imagemPersonagem');
        this.nomePersonagem = document.getElementById('nomePersonagem');
        this.statusPersonagem = document.getElementById('statusPersonagem');
        this.especiePersonagem = document.getElementById('especiePersonagem');
        this.generoPersonagem = document.getElementById('generoPersonagem');
        this.origemPersonagem = document.getElementById('origemPersonagem');
        this.localPersonagem = document.getElementById('localPersonagem');
        this.botaoAnterior = document.getElementById('anterior');
        this.botaoProximo = document.getElementById('proximo');
        this.carregamento = document.querySelector('.carregando'); // Elemento para mostrar o carregamento.

        this.iniciar(); // Inicia os event listeners e a exibição do primeiro personagem.
        this.mostrarPersonagem();
    }

    async fetchPersonagem(id) { // Método para buscar os dados de um personagem na API.
        try {
            const response = await fetch(`${this.apiUrl}/${id}`); // Faz a requisição à API.
            if (!response.ok) { // Se a resposta não for bem-sucedida (status diferente de 200-299).
                throw new Error('Personagem não encontrado'); // Lança um erro.
            }
            const data = await response.json(); // Converte a resposta em JSON.
            return new Personagem(data); // Cria um objeto Personagem com os dados e o retorna.
        } catch (error) {
            console.error('Erro ao buscar personagem:', error); // Exibe o erro no console.
            alert(error.message); // Mostra um alerta com a mensagem de erro.
            return null; // Retorna null em caso de erro.
        }
    }

    exibicaoPersonagem(personagem) { // Método para exibir os dados de um personagem na página.
        if (!personagem) return; // Se não houver personagem, não faz nada.

        // Atualiza os elementos do DOM com os dados do personagem:
        this.imagemPersonagem.src = personagem.imagem;
        this.nomePersonagem.textContent = personagem.nome;
        this.statusPersonagem.innerHTML = `<span class=infos> Status: </span>${personagem.status}`;
        this.especiePersonagem.innerHTML = `<span class=infos> Espécie: </span>${personagem.especie}`;
        this.generoPersonagem.innerHTML = `<span class=infos>Gênero: </span>${personagem.genero}`;
        this.origemPersonagem.innerHTML = `<span class=infos>Origem: </span>${personagem.origem}`;
        this.localPersonagem.innerHTML = `<span class=infos>Localização: </span>${personagem.localizacao}`;
    }

    async mostrarPersonagem() { // Método para buscar e exibir um personagem.
        this.carregamento.style.display = 'flex'; // Mostra o indicador de carregamento.
        const personagem = await this.fetchPersonagem(this.IDpersonagem); // Busca o personagem.
        setTimeout(() => { // Após um pequeno atraso (para simular carregamento)...
            this.exibicaoPersonagem(personagem); // Exibe o personagem.
            this.carregamento.style.display = 'none'; // Esconde o indicador de carregamento.
        }, 300); // Atraso de 300 milissegundos.
    }

    iniciar() { // Método para configurar os event listeners.
        this.botaoAnterior.addEventListener('click', () => { // Ao clicar em "Anterior":
            if (this.IDpersonagem > 1) { // Verifica se não é o primeiro personagem.
                this.IDpersonagem--; // Decrementa o ID do personagem.
                this.mostrarPersonagem(); // Busca e exibe o personagem anterior.
            }
        });

        this.botaoProximo.addEventListener('click', () => { // Ao clicar em "Próximo":
            this.IDpersonagem++; // Incrementa o ID do personagem.
            this.mostrarPersonagem(); // Busca e exibe o próximo personagem.
        });

        const pesquisaPersonagemInput = document.getElementById('pesquisaPersonagem');
        pesquisaPersonagemInput.addEventListener('input', this.pesquisarPersonagem.bind(this)); // Ao digitar no campo de pesquisa, chama o método pesquisarPersonagem.

        pesquisaPersonagemInput.addEventListener('keydown', (event) => { // Ao pressionar uma tecla no campo de pesquisa:
            if (event.key === 'Enter') { // Se a tecla for "Enter":
                event.preventDefault(); // Impede o comportamento padrão do "Enter" (recarregar a página).
                this.pesquisarPersonagem(); // Chama o método pesquisarPersonagem.
            }
        });
    }

    async pesquisarPersonagem() { // Método para pesquisar um personagem por nome.
        const termoPesquisa = document.getElementById('pesquisaPersonagem').value.toLowerCase(); // Obtém o termo de pesquisa e o converte para minúsculas.
        const apiUrl = `https://rickandmortyapi.com/api/character/?name=${termoPesquisa}`; // URL da API para pesquisa por nome.

        const response = await fetch(apiUrl); // Faz a requisição à API.
        const data = await response.json(); // Converte a resposta em JSON.

        if (data.results && data.results.length > 0) { // Se houver resultados:
            const personagemEncontrado = data.results[0]; // Pega o primeiro resultado.
            this.IDpersonagem = personagemEncontrado.id; // Atualiza o ID do personagem.
            this.mostrarPersonagem(); // Exibe o personagem encontrado.
        } else {
            console.log("Nenhum personagem encontrado com esse nome."); // Exibe mensagem no console se não encontrar.
            this.exibicaoPersonagem(null); // Limpa a exibição do personagem.
        }
    }
}

const infoPersonagem = new InfoPersonagem(); // Cria uma instância da classe InfoPersonagem, iniciando a execução.
