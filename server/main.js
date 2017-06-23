var express = require('express');  
var app = express();  
var server = require('http').Server(app);  
var io = require('socket.io')(server); 

var messages = [{  
    author: "Carlos",
    text: "Hola! que tal?"
},{
    author: "Pepe",
    text: "Muy bien! y tu??"
},{
    author: "Paco",
    text: "Genial!"
}];

app.use(express.static('public'));  

//Funcion que esta atenta a las conexiones de los clientes
io.on('connection', function(socket) {  
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages);
});

//Cliente
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

socket.on('messages', function(data) {  
    console.log(data);
});

//Muestra la información del array de mensajes
function render(data) {  
    var html = data.map(function(elem, index){
        return(`<div>
                 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");

    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) {  
    render(data);
});

server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});