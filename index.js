const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.json());

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configurar o Nodemailer Imperius
const transporterImperius = nodemailer.createTransport({
    host: "email-ssl.com.br",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports 

    auth: {
        user: 'maria.helena@abctechnology.com.br',
        pass: 'M@riaH#2024',
    }

});

// Configurar o Nodemailer Contato AbcTechnology
const transporterContatoAbctechnology = nodemailer.createTransport({
    host: "email-ssl.com.br",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports 

    auth: {
        user: 'contato@abctechnology.com.br',
        pass: '@Bc2417*',
    }

});

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de Envio de Email Imperius & Contato AbcTechnology');
});

// Rota de envio imperius
app.post('/api/send-email-imperius', async (req, res) => {

    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).send({ error: 'Por favor, forneça todos os campos necessários: to, subject, text ou html' });
    }

    try {

        // Configurando o Email
        const mailOptions = {
            from: "maria.helena@abctechnology.com.br",
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        // Enviar o e-mail
        let info = await transporterImperius.sendMail(mailOptions);

        res.send({ message: 'E-mail enviado com sucesso', info });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao enviar o e-mail' });
    }

});

// Rota de envio contato abctechnology
app.post('/api/send-email-contato-abctechnology', async (req, res) => {

    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).send({ error: 'Por favor, forneça todos os campos necessários: to, subject, text ou html' });
    }

    try {

        // Configurando o Email
        const mailOptions = {
            from: "contato@abctechnology.com.br",
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        // Enviar o e-mail
        let info = await transporterContatoAbctechnology.sendMail(mailOptions);

        res.send({ message: 'E-mail enviado com sucesso', info });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao enviar o e-mail' });
    }

});

// inicializando o servidor node 
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
