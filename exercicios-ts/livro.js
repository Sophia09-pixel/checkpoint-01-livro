"use strict";
var formlivro = document.getElementById('formlivro');
var tblivro = document.getElementById('tblivro');
var livros = JSON.parse(localStorage.getItem("livros") || "[]");
function salvarLocalStorage() {
    var livrosSalvar = JSON.stringify(livros);
    localStorage.setItem("livros", livrosSalvar);
}
function atualizarTabela() {
    renderizarTabela(livros);
}
function salvar(event) {
    event.preventDefault();
    const novoLivro = {
        id: Date.now(),
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        paginas: Number(document.getElementById('paginas').value),
        genero: document.getElementById('genero').value,
    };
    livros.push(novoLivro);
    atualizarTabela();
    salvarLocalStorage();
    formlivro.reset();
}
function editarLivro(id) {
    const livro = livros.find((l) => l.id == id);
    if (!livro)
        return;
    document.getElementById("titulo").value = livro.titulo;
    document.getElementById("autor").value = livro.autor;
    document.getElementById("paginas").value = livro.paginas;
    document.getElementById("genero").value = livro.genero;
    const campIndex = livros.findIndex((l) => l.id == id);
    if (campIndex != -1) {
        livros.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function removerLivro(id) {
    const livro = livros.find((l) => l.id == id);
    if (!livro)
        return;
    const campIndex = livros.findIndex((l) => l.id == id);
    if (campIndex != -1) {
        livros.splice(campIndex, 1);
    }
    salvarLocalStorage();
    atualizarTabela();
}
function buscarPorAutor() {
    const termoBusca = document.getElementById('buscaAutor').value.toLowerCase();
    if (!termoBusca) {
        atualizarTabela();
        return;
    }
    const livrosFiltrados = livros.filter((l) => l.autor.toLowerCase().includes(termoBusca));
    renderizarTabela(livrosFiltrados);
}
function limparBusca() {
    document.getElementById('buscaAutor').value = '';
    atualizarTabela();
}
function renderizarTabela(listaLivros) {
    tblivro.innerHTML = "";
    listaLivros.forEach((l) => {
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
