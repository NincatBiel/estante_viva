//Código importado do projeto "Gerenciador de Tarefas", segue em adaptação

const express = require('express');
const cors = require('cors');

const app = express();
const db = require('./db');

const PORT = 3000;

app.use(cors());
app.use(express.json());

//GET geral
app.get('/livro', (req, res) => {
    db.query('SELECT * FROM livro', (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.json(results);
    });
});

// GET com id
app.get('/livro/:id', (req, res) => {
    db.query('SELECT * FROM livro WHERE id = ?', [req.params.id], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        if(results.length === 0) return res.status(404).json ({error: 'Livro não encontrado'});
        res.json(results[0]);
    });
});

//POST
app.post('/livro', (req,res) => {
    const {title, description} = req.body
    db.query('INSERT INTO livro (titulo, autor, preco, estoque) VALUES (?, ?)', [titulo, autor, preco, estoque], (err, results) => {
        if(err) return res.status(500).json({error: err.message});
        res.status(201).json({id: results.insertId, titulo, autor, preco, estoque});
    });
});

//PUT
app.put('/livro/:id', (req, res) => {
    const {title, description, completed} = req.body;
    db.query('UPDATE livro SET titulo = ?, autor = ?, preco = ?, estoque = ? WHERE id = ?', [titulo, autor, preco, estoque, req.params.id], (err,results) =>{
        if(err) return res.status(500).json({error: err.message});
        if(results.affectedRows === 0) return res.status(404).json ({error: 'Livro não encontrado'});
        res.json({id: req.params.id, titulo, autor, preco, estoque});
    });
});

//DELETE
app.delete('/livro/:id', (req, res) => {
    db.query('DELETE FROM livro WHERE id = ?', [req.params.id], (err,results) => {
        if(err) return res.status(500).json({error: err.message});
        if(results.affectedRows === 0) return res.status(404).json ({error: 'Livro não encontrado'});
        res.status(204).send();
    });
});

//LISTEN
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});