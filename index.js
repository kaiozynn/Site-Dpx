const express = require("express");
const appExpress = express();
const port = 8080;

appExpress.use(express.json());

//Configuração do firebase
const  { app }  = require("firebase-admin");
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app")

const { getFirestore, Timestamp, FieldValue, Filter } = require("firebase-admin/firestore");

const serviceAccount = require('./git/site-dpx-37676-8dbecc329d08.json');

const appFirebase = initializeApp({
  credential: applicationDefault(),
  credential: cert(serviceAccount)
});

const dataBase = getFirestore(appFirebase);

//Uso das pastas de estilo e da coleta de dados

appExpress.use(express.static("public"));
appExpress.use(express.urlencoded({extended: true}))

//Configuração das rotas e das páginas do site

appExpress.get('/', (req, res) => {
  res.send('oi');
})

appExpress.get('/cadidatar', (req, res) => {
  res.sendFile(__dirname + '/public/candidatar/index.html');;
})

appExpress.get('/seletiva', (req, res) => {
  res.sendFile(__dirname + '/public/candidatar/seletiva.html');
})

//Dados vindos do formulário são tratados e enviado pra o firebase aqui do cadastro

appExpress.post('/cad', async function(req, res) {
  const name = req.body.nick;
  const id_players = req.body.id;
  const elo = req.body.elo;
  const contact = req.body.email_de_contato;
  const mainLine = req.body.lanePrincipal;
  const secondaryLine = req.body.laneSecundaria;
  const documentReference = dataBase.collection('players').doc(id_players);
  const doc = await documentReference.get();

  if (doc.exists) {
    res.json({failed: 404})
  } else {
    documentReference.set({
      nome: name,
      id: id_players,
      elo: elo,
      contato: contact,
      lanePrincipal: mainLine,
      laneSecundaria: secondaryLine
    }).then(() => {
      res.json({success: 200})
    }).catch((error) => {
      console.log("Ouve o error" + error)
  })
}
})

// Dados que vou receber do 2 sistema de informação para relatar ao usuário sua condição no processo seletivo

appExpress.post('/seletiva', async function(req, res) {
  const nickname_search = req.body.nick_search;
  const id_search = req.body.id_search;

  const playersRef = dataBase.collection('players').doc(id_search);
  const doc = await playersRef.get();
  
  if (!doc.exists) {
    res.json({not_exist: 404})
  } else {
    res.json(doc.data());
  }
})

appExpress.listen(port, () => console.log('Servidor ON!'));