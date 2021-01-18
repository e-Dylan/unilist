// SERVERLESS CERTIFICATE AUTH FOR LETSENCRYPT VERCEL RESPONSE

const express = require('express');
const app = express();

app.get('/.well-known/acme-challenge/:challengeHash', (req, res) => {
    var hash = req.params.challengeHash;
    res.send(hash);
});

module.exports = app;