const express = require('express');
const app = express();
const port = 3000;

// Middleware pour servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static('public'));

// Route pour récupérer l'historique de facturation
app.get('/billing-history', (req, res) => {
    res.json([
        { date: '2024-09-01', service: 'Service A', invoice: '12345', recipient: 'John Doe', amount: '$50', status: 'Paid' },
        // Ajouter d'autres entrées
    ]);
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let certicode = null;

// Configuration de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre.email@gmail.com',
        pass: 'votre_mot_de_passe'
    }
});

// Route pour générer et envoyer le Certicode
app.post('/send-certicode', (req, res) => {
    certicode = Math.floor(100000 + Math.random() * 900000).toString(); // Code à 6 chiffres aléatoire

    const mailOptions = {
        from: 'votre.email@gmail.com',
        to: req.body.email,
        subject: 'Votre Certicode',
        text: `Votre code de validation est : ${certicode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Erreur lors de l\'envoi du Certicode.');
        } else {
            console.log('E-mail envoyé : ' + info.response);
            res.status(200).send('Certicode envoyé.');
        }
    });
});

// Route pour valider le Certicode
app.post('/validate-certicode', (req, res) => {
    const userCode = req.body.certicode;
    if (userCode === certicode) {
        certicode = null; // Réinitialiser après validation
        res.status(200).send('Certicode validé');
    } else {
        res.status(401).send('Certicode incorrect');
    }
});

app.listen(3000, () => console.log('Serveur démarré sur le port 3000'));
