 // 2) private group chat -> isme hum ek group banayenge jisme sirf 2 log ya kuch specific log honge aur wo log ek dusre se chat karenge --> and we self create id and send to server and server create private chat group
 // and multiple people join group by that id

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
     socket.on('message',({roomId,msg})=>{  // key is 'message' and yaha msg frontend se ayega 
         socket.to(roomId).emit('new-message',msg); // particular group pe msg send karo
     });  

     
     // agar room ni hai so create bhi kar deta hai 
     socket.on('join-room',(roomId)=>{ // yaha roomId frontend se ayega
         socket.join(roomId); // and join room by that id
         console.log(`user joined room ${roomId}`);
     });


     socket.on('disconnect',()=>{ 
         console.log('user disconnected');
     });
 
 });
 
 
 server.listen(3000, () => {
     console.log('server is running on port 3000');
 });
 
 


 // ----------------------------------------


 // 2) **** also send private msg to specific user -> isme hum ek user ko private msg bhejenge by using socket id -> and we can get socket id from frontend after connection is established and then send that id to server and server will send msg to that particular id
 // same syntax -> because intenally room ke through hi implement karta hai -> single user private chat
 // but dont create room for that user -> just send msg to that particular id by using socket.to(id).emit() method

 // **** but socket id is dynamic and change every time when user connect to server -> so mai kaise connect karunga another user se bar bar socket id mangta thoda na phiruga
 // ******** -> so we need to create our own id and send to server and server will maintain a map of our id and socket id -> and then we can send msg to that particular id by using that map
 
 // img1 -> **** dekho kisi ek user ne 4 tab open kar toh sabme msg jana chaiye so map pe 4ro tab ki socketid hongi and sabko msg send hoga kyuki wo 1 user hai usme multiple tab open karke sakhe hai
 // as we connect so store id in map and then send msg to that id -> so that all tabs of that user will receive the msg and if user disconnects then remove that id from map -> so that we dont send msg to that id in future
 // server generate id and send to client and client store that id in local storage and send that id to server when connect and then server will maintain a map of that id and socket id -> and then we can send msg to that particular id by using that map
 // and we can store that array of socket id in redis or database and then when user connect again then we can get that array of socket id from redis or database and send msg to all those socket id -> so that all tabs of that user will receive the msg