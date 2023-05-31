const express = require('express');
const path = require('path');
const APIroutes = require('./routes/index.js')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));           // Serve static files from the 'public' directory
app.use(express.json());                     // Parse JSON body
app.use(express.urlencoded({extended:true}));// Parse URL-encoded bodies
// Use API routes from './routes/index.js'
app.use('/', APIroutes);          
// Route for the homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
// Route for the '/notes' page
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// Start the server
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);