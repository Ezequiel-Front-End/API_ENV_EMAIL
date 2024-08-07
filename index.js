const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

app.use(express.json());

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configurar o Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "ezequielfernandes912@gmail.com",
        pass: "cnswjsgojezdzcvy",
    },
});

app.get('/', (req, res) => {
    res.send('API de envio de Email AbcTechnology');
});

app.post('/api/send-email', (req, res) => {
    // const { to, subject, text } = req.body;

    const mailOptions = {
        from: "ezequielfernandes912@gmail.com",
        to: "ezequielfernandes912@gmail.com",
        subject: "Testando o sistema de envio de email",
        text: "testando..."
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }

        res.status(200).send('Email enviado: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
