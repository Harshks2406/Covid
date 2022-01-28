const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
var port = process.env.PORT || 2406;
const static_path = path.join(__dirname,'./public');
const view_path = path.join(__dirname,'/views')

app.set('view engine','hbs')
app.set('views',view_path);
app.use(express.static(static_path))
console.log(static_path)

app.get("",(req,res)=>{
    res.render('index.hbs');
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})