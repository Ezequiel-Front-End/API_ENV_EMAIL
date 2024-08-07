const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/receive-object', (req, res) => {
    const receivedObject = req.body;
    console.log('Objeto recebido:', receivedObject);

    res.status(200).json({
        message: 'Objeto recebido com sucesso',
        receivedObject: receivedObject
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
