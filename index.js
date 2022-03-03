import App from './config/App.js'

const port = process.env.port

App.app.listen(port, ()=> {
    console.log("Api is running in port "+port)
})