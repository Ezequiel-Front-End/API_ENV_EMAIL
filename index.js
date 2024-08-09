const express = require('express');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.json());

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true, // Use `true` for port 465, `false` for all other ports 
    auth: {
        user: process.env.EMAIL_USER_ABC,
        pass: process.env.EMAIL_PASS_ABC,
    },
});

// Rota inicial
app.get('/', (req, res) => {
    res.send('API de envio de Email AbcTechnology');
});

// Rota de envio de Email..
app.post('/api/send-email', async (req, res) => {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
        return res.status(400).send({ error: 'Por favor, forneça todos os campos necessários: to, subject, text ou html' });
    }

    try {

        // Configurando o Email
        const mailOptions = {
            from: "abctechnology895@gmail.com",
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        // Enviar o e-mail
        let info = await transporter.sendMail(mailOptions);

        res.send({ message: 'E-mail enviado com sucesso', info });

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Erro ao enviar o e-mail' });
    }

});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
