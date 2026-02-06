// index.html file ko backend hi serve karega -> so install -> npm i path
// matlab backend route se index.html file ko serve karna hai toh path module ka use karenge -> path module ka use karke hum index.html file ko serve karenge backend se 

 const express = require('express');
 const app = express();
 const {Server} = require('socket.io');
 const http = require('http');
 const path = require('path');

 const server = http.createServer(app);
 const io = new Server(server);
 

 app.get('/',(req,res)=>{ // localhost:3000 pe jab bhi koi request aayegi toh usko index.html file serve kar dega
     res.sendFile(path.join(__dirname,'index.html')); // __dirname means current directory -> index.html file ko serve karne ke liye path module ka use karenge
 });
 


 io.on('connection',(socket)=>{ 
    
    // **** yaha kisi ka naam kuch bhi ho shakta hai na 'message' ki place pe kuch bhi likh shakte hai 
     socket.on('message',(msg)=>{  // key is 'message' and yaha msg frontend se ayega 
         socket.broadcast.emit('new-message',msg); // and send msg to all 
     });  
     // io.emit -> use karray hai so msg baki sabke pass jayega and hamare pass bhi ayega
     // socket.broadcast.emit -> se msg baki sabke pass jayega hamare pass ni ayega                                   
 
     socket.on('disconnect',()=>{ 
         console.log('user disconnected');
     });
 
 });
 
 
 server.listen(3000, () => {
     console.log('server is running on port 3000');
 });
 
 



 // ----------------------------

 // 2) private group chat -> isme hum ek group banayenge jisme sirf 2 log ya kuch specific log honge aur wo log ek dusre se chat karenge --> and we self create id and send to server and server create private chat group
 // and multiple people join group by that id