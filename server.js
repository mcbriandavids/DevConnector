 const express = require('express')
 const connectDB = require('./config/db')
 const path = require('path')
//  Initialize express
 const app = express()

// ConnectDB
connectDB()

// Init Middleware 
app.use(express.json(extended= false))

// Setup Route
app.use( '/api/users', require('./routes/api/users'))
app.use( '/api/auth', require('./routes/api/auth'))
app.use( '/api/profile', require('./routes/api/profile'))
app.use( '/api/posts', require('./routes/api/posts'))

// Server Static assets in Production

if(process.env.NODE_ENV === 'production'){
    // Set Static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}



const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Running on Port ${PORT}`)
})