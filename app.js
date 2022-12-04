const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))

const path = require('path')
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.get('/profile', (req, res) => {
    res.redirect('/')
})

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.sendFile('views/about.html', {root: __dirname})
})

app.get('/user/:username', (req, res) => {
    res.render('user', {
        username: req.params.username
    })
})

app.use((req, res, next) => {
    res.sendFile('views/404.html', {root: __dirname})
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})