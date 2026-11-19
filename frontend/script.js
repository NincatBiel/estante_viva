// Fazer o download das seguintes ferramentas do node:
// npm init -y
// npm install -y mysql2 express cors fetch

const apiUrl = 'http://localhost:3000/livro';

// ================================== FUNCTIONALITIES ==========================================

//ADD ta funcionando agora
const formCadastro = document.getElementById('cadastro');

formCadastro.addEventListener('submit', async(e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const preco = document.getElementById('preco').value;
    const estoque = document.getElementById('estoque').value;

    try {
        const res = await fetch(apiUrl, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({titulo, autor, preco, estoque})
        });

        if (!res.ok) throw new Error('Erro ao cadastrar livro');

        const livro = await res.json();
        addBookToTable(livro);
        
        formCadastro.reset();

    } catch (err) {
        alert('Erro ao completar operação: ' + err.message);
    }

});

//ADD BOOK TO TABLE // ta funcionando corretamente
const tabela = document.getElementById('tabelaCatalogo');

function addBookToTable(livro){
    const row = document.createElement('tr');

    row.innerHTML= `
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.preco}</td>
        <td>${livro.estoque}</td>
        <td class="tdButtons"><button onclick="editBook(${livro.id})">Editar</button><button onclick="deleteBook(${livro.id})">Excluir</button></td>
    `;

    tabela.appendChild(row);

};

//UPDATE
async function editBook(id) {
    try{
        const res = await fetch(`${apiUrl}/${id}`);
        const livro = await res.json();

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                titulo: livro.titulo,
                autor: livro.autor,
                preco: livro.preco,
                estoque: livro.estoque
            })
        });
        loadBooks();

    }catch (err){
        alert('Erro ao atualizar tarefa: ' + err.message);
    }
};

//DELETE
async function deleteBook(id) {
    try{
        await fetch(`${apiUrl}/${id}`, {method: 'DELETE'});

        loadBooks();
        
    }catch (err){
        alert('Erro ao apagar livro: ' + err.message);
    }
};

//SEARCH
const formCatalogo = document.getElementById('catalogo');

formCatalogo.addEventListener('submit', async(e) => {
    e.preventDefault();
    
    const titulo = document.getElementById('tituloBusca').value;
    
    try {
    const res = await fetch(apiUrl, {
        method:'GET',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({titulo})
    });

    if (!res.ok) throw new Error('Livro não encontrado');

    const livro = await res.json();
    
    formCatalogo.reset();


    } catch (err) {
        alert('Erro ao completar operação: ' + err.message);
    }

});


// ============== WORKING PROGRAM ================================

//LOAD ta funcionando
async function loadBooks(){
    try {
        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error("Erro ao carregar livros");
        
        const livro = await res.json();

        tabela.innerHTML = "";
        livro.forEach(addBookToTable);

    } catch (error) {
        alert("Erro ao carregar livros" + err.message);
    }

};

loadBooks();