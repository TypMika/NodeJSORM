import App from './config/App.js'

const port = process.env.port

App.server.listen(port,()=>{
console.log("Server running on port "+port)
})