const functions = require('firebase-functions');
process.env.GOOGLE_APPLICATION_CREDENTIALS = './od-hackaton-4823b8a0d8a5.json';
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.ml = functions.https.onRequest((request, response) => {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = decodeURIComponent(request.query.text);

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };
  
  response.set('Access-Control-Allow-Origin', "*");
  response.set('Access-Control-Allow-Methods', 'GET');

  // Detects the sentiment of the text
  client
    .analyzeEntities({document: document})
    .then(results => {
      return results[0].entities;
      //  entities.forEach(entity => {
      //   return entity;
      // console.log(entity.name);
      // console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      // if (entity.metadata && entity.metadata.wikipedia_url) {
      //   console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      // }
    })
    .then((entities) => {
      response.status(200).json(entities);
    })
    .catch(err => {
      response.status(500).send(err);
    });
});
