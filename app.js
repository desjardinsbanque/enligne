// Importez les modules nécessaires
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// Créez une instance de l'application Express
const app = express();
const port = 3000; // Vous pouvez utiliser n'importe quel port

// Middleware pour parser les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route pour envoyer le Certicode
app.post('/send-certicode', (req, res) => {
    const email = req.body.email;

    // Générer un Certicode aléatoire
    const certicode = Math.floor(100000 + Math.random() * 900000); // Génère un nombre à 6 chiffres

    // Configuration de nodemailer pour Outlook
    const transporter = nodemailer.createTransport({
        service: 'Outlook',
        auth: {
            user: 'certicodebnp@outlook.com', // Votre adresse e-mail Outlook
            pass: 'votre_mot_de_passe' // Remplacez par votre mot de passe Outlook
        }
    });

    // Options de l'e-mail
    const mailOptions = {
        from: 'certicodebnp@outlook.com',
        to: email,
        subject: 'Votre Certicode',
        text: `Votre Certicode est : ${certicode}`
    };

    // Envoyer l'e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi du Certicode:', error);
            return res.status(500).send('Erreur lors de l\'envoi du Certicode');
        }
        console.log('E-mail envoyé : ' + info.response);
        res.status(200).send('Certicode envoyé par e-mail');
    });
});

// Démarrez le serveur
app.listen(port, () => {
    console.log(`Le serveur écoute sur http://localhost:${port}`);
});
