const apiUrl = 'http://localhost:3000/[oq vem aqui?]';

const formCadastro = document.getElementById('cadastro');
const formCatalogo = document.getElementById('catalogo');
const tabela = document.getElementById('tabelaCatalogo');

formCadastro.addEventListener('submit', async(e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const preco = document.getElementById('preco').value;
    const quantidade = document.getElementById('quantidade').value;

    try {
        const res = await fetch(apiUrl, {
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({titulo, autor, preco, quantidade})
        });

        if (!res.ok) throw new Error('Erro ao cadastrar livro');

        const livro = await res.json();
        formCadastro.reset();

        addBookToTable(livro);


    } catch (err) {
        alert('Erro ao completar operação: ' + err.message);
    }

});

function addBookToTable(livro){
    const row = document.getElementById('row');


    row.innerHTML= `
    <tr>
        <td>${livro.titulo}</td>
        <td>${livro.autor}</td>
        <td>${livro.preco}</td>
        <td>${livro.quantidade}</td>
        <td><button onclick="editarLivro()" id="n-sei-oq-vai-aqui">Editar</button><button onclick="excluirItem()">Excluir</button></td>
    </tr>
    `;

    tabela.appendChild(row);
}

async function loadBooks(){
    try {
        const res = await fetch(apiUrl);

        if (!res.ok) throw new Error("Erro ao carregar tarefas");
        
        const livro = await res.json();

        taskList.innerHTML = "";
        tasks.forEach(addTaskToUl);

    } catch (error) {
        
    }

}