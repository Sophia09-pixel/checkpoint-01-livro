var formlivro = document.getElementById('formlivro') as HTMLFormElement;
var tblivro = document.getElementById('tblivro') as HTMLElement;
var livros = JSON.parse(localStorage.getItem("livros") || "[]");

interface Livro {
    id: number;
    titulo: string;
    autor: string;
    paginas: number;
    genero: string;
}

function salvarLocalStorage() {
    var livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
}

function atualizarTabela() {
    renderizarTabela(livros)
}

function salvar(event: Event) {
    event.preventDefault();

    const novoLivro: Livro = {
        id: Date.now(),
        titulo: (document.getElementById('titulo') as HTMLInputElement).value,
        autor: (document.getElementById('autor') as HTMLInputElement).value,
        paginas: Number((document.getElementById('paginas') as HTMLInputElement).value),
        genero: (document.getElementById('genero') as HTMLInputElement).value,
    };

    livros.push(novoLivro);
    atualizarTabela();
    salvarLocalStorage();
    formlivro.reset();
}

function editarLivro(id: number){
    const livro = livros.find((l : Livro) => l.id  == id);

    if(!livro) return;

    (document.getElementById("titulo") as HTMLInputElement).value = livro.titulo;
    (document.getElementById("autor") as HTMLSelectElement).value = livro.autor;
    (document.getElementById("paginas") as HTMLSelectElement).value = livro.paginas;
    (document.getElementById("genero") as HTMLInputElement).value = livro.genero;

    const campIndex = livros.findIndex((l: Livro)=> l.id == id);

    if(campIndex != -1){
        livros.splice(campIndex, 1);
    }

    salvarLocalStorage();
    atualizarTabela();
}

function removerLivro(id:number){
    const livro = livros.find((l : Livro) => l.id  == id);

    if(!livro) return;
    const campIndex = livros.findIndex((l: Livro)=> l.id == id);

    if(campIndex != -1){
        livros.splice(campIndex, 1);
    }

    salvarLocalStorage();
    atualizarTabela();
}

function buscarPorAutor() {
    const termoBusca = (document.getElementById('buscaAutor') as HTMLInputElement).value.toLowerCase();
    
    if (!termoBusca) {
        atualizarTabela();
        return;
    }

    const livrosFiltrados = livros.filter((l: Livro) => 
        l.autor.toLowerCase().includes(termoBusca)
    );

    renderizarTabela(livrosFiltrados);
}

function limparBusca() {
    (document.getElementById('buscaAutor') as HTMLInputElement).value = '';
    atualizarTabela();
}

function renderizarTabela(listaLivros: Livro[]) {
    tblivro.innerHTML = "";
    listaLivros.forEach((l: Livro) => {
        tblivro.innerHTML += `
            <tr>
                <td>${l.titulo}</td>
                <td>${l.autor}</td>
                <td>${l.paginas}</td>
                <td>${l.genero}</td>
                <td>
                    <button onclick="editarLivro(${l.id})">Editar</button>
                    <button onclick="removerLivro(${l.id})">Remover</button>
                </td>
            </tr>
        `;
    });
}

formlivro.addEventListener("submit", salvar);
atualizarTabela();