const express = require('express');
const controllers=require('./controllers');

const router = express.Router();

router.get('/user/:user', controllers.getUser)

router.get('/repo/:user/:reponame', controllers.getRepo)

router.get('/forks/:user/:reponame', controllers.getForks)

router.get('/commit/:user/:reponame', controllers.getCommit)

module.exports = router;