// -> 1) webRtc -> web real-time communication

// webRtc is a technology that allows real-time communication between browsers and devices without the need for plugins or third-party software.
// It enables audio, video, and data sharing directly between users, making it ideal for applications like video conferencing, online gaming, and file sharing.
// WebRTC uses a combination of APIs and protocols to establish peer-to-peer connections, ensuring low latency and high-quality communication.



// -> first thought priniple on webRtc :

//        ////rohan////         <-->           //////server//////       <-->            ////sohan////  
//        /////////////                        /////////////////                        /////////////



//  ----> problem -> rohan send msg(video) to sohan but it goes to server first and then server sends it to sohan which causes delay and also server can be a point of failure. --> and increase server cost


//  ----> solution : pear to pear communication -> direct communication between two devices without the need for an intermediary server.
//  -> rohan can send msg(video) directly to sohan without going through server which reduces delay and also eliminates the point of failure. 


//        ////rohan////               <-p2p->               ////sohan////  
//        /////////////                                     /////////////

// ->   ip__port__rohan                                     ip__port__sohan

// -> to establish a peer-to-peer connection, both parties need to know each other's IP address and port number. This is typically done through a signaling server that helps facilitate the initial connection setup.

// **** we need server only for signaling[ip_port] and establishing the connection, but once the connection is established, the communication happens directly between the peers without involving the server. This is what makes WebRTC efficient and low-latency for real-time communication.
// ki ip address aur port number ka pata chal jaye to direct communication ho sakta hai bina server ke involvement ke. -> server require for only signaling and connection setup, but not for the actual communication once the connection is established.


//        ////rohan////               <-p2p->               ////sohan////  
//        /////////////                                     /////////////

// ->   ip__port__rohan   \                              /  ip__port__sohan
//                         \                            /
//                          \       signaling          /
//                                ////server////
//                                //////////////



// -> question1 -> how rohan know khud ka ip and port number and how sohan know khud ka ip and port number?

// -> by wifi router[router have public ip but it assign private ip to users] -> router assigns private ip address and port number to each device connected to it. So, rohan can find his own private ip address and port number assigned by the router, and so can sohan.
// -> However, these private ip addresses are not accessible from outside the local network, which is why a signaling server is needed to facilitate the connection between rohan and sohan when they are on different networks. The signaling server helps them exchange their public IP addresses and port numbers, allowing them to establish a direct peer-to-peer connection for communication.




// **** STUN Server -> Session Traversal Utilities for NAT (STUN) is a protocol that helps devices behind a NAT (Network Address Translation) firewall or router discover their public IP address and the type of NAT they are behind. This information is crucial for establishing peer-to-peer connections in WebRTC, as it allows devices to communicate directly with each other even if they are on different networks. STUN servers are often used in conjunction with signaling servers to facilitate the connection setup process in WebRTC applications.

//    ///STUN///        <->           ////rohan////               <-p2p->               ////sohan////       <->          ///STUN///
//    //SERVER//      IP/PORT         /////////////                                     /////////////     IP/PORT       //SERVER//

// ->                                ip__port__rohan                                     ip__port__sohan


// -> STUN server helps rohan and sohan to discover their public IP addresses and port numbers, which are necessary for establishing a direct peer-to-peer connection. Once they have this information, they can communicate directly without the need for a server in the middle, resulting in lower latency and improved performance for real-time communication applications.




// question2 -> how rohan and sohan exchange their ip and port number?
// -> they exchange their ip and port number through signaling server. The signaling server acts as a mediator that helps rohan and sohan to discover each other's public IP addresses and port numbers, allowing them to establish a direct peer-to-peer connection for communication. The signaling server facilitates the initial connection setup process, but once the connection is established, the communication happens directly between the peers without involving the server.





// question3 -> after establishing the connection, can video/audio call start direct or they share another thing too ?
// -> basically audio low storage but video high storage and video se video frame audio extract karne ke liye bhi time lagta hai, so they also exchange some metadata about the media they want to share, such as the codecs they support, the resolution of the video, and the bitrate of the audio.
// -> **** codecs : but apan direct share na kare thoda sa compression wagera kare and all these parameters are important for ensuring that the media stream can be transmitted efficiently and without interruption. For example, if rohan wants to share a high-resolution video but sohan's device only supports lower resolutions, they may need to negotiate a lower resolution for the video stream to ensure smooth playback. Similarly, if rohan wants to share audio at a high bitrate but sohan's device can only handle lower bitrates, they may need to negotiate a lower bitrate for the audio stream to prevent buffering or dropouts during the call.
// -> **** so bohot sari extra info bhi share karte hai before starting the video/audio call, such as the codecs they support, the resolution of the video, and the bitrate of the audio. This information helps them to negotiate the parameters of the media stream and ensure that they can communicate effectively once the connection is established. So, in addition to exchanging their IP addresses and port numbers, rohan and sohan also exchange metadata about the media they want to share before starting the video/audio call.

// **** basically rohan and sohan exchange not only their IP addresses and port numbers but also metadata about the media they want to share, such as the codecs they support, the resolution of the video, and the bitrate of the audio. This information helps them to negotiate the parameters of the media stream and ensure that they can communicate effectively once the connection is established. So, in addition to exchanging their IP addresses and port numbers, rohan and sohan also exchange metadata about the media they want to share before starting the video/audio call.
// **** and ip port self ka find karne se pehle hi rohan and sohan exchange some metadata[Session Description Protocol uses] about the media they want to share, such as the codecs they support, the resolution of the video, and the bitrate of the audio. This information helps them to negotiate the parameters of the media stream and ensure that they can communicate effectively once the connection is established. So, in addition to exchanging their IP addresses and port numbers, rohan and sohan also exchange metadata about the media they want to share before starting the video/audio call.





// --> TURN SERVER -> A TURN (Traversal Using Relays around NAT) server is a type of server used in WebRTC to facilitate communication between peers when direct peer-to-peer connections are not possible due to network restrictions, such as firewalls or NAT (Network Address Translation) configurations. A TURN server acts as a relay, allowing media traffic to be sent through it when direct communication between peers is blocked. This ensures that even in challenging network conditions, users can still establish a connection and communicate effectively. TURN servers are typically used as a fallback option when STUN servers are unable to establish a direct connection between peers.

// -> let bohot sare log in vcall so sabko ek dushre ka port and ip pata nahi hoga, so in that case they can use TURN server to relay their media traffic and establish a connection for their video/audio call. TURN servers are especially useful in scenarios where both peers are behind firewalls or NAT configurations that prevent direct peer-to-peer communication. By using a TURN server, rohan and sohan can still communicate effectively even if they cannot establish a direct connection due to network restrictions.
// -> means isme sabko ek dushre ke sath ip port share karna hoga but direct communication possible nahi hoga, so they can use TURN server to relay their media traffic and establish a connection for their video/audio call. TURN servers are especially useful in scenarios where both peers are behind firewalls or NAT configurations that prevent direct peer-to-peer communication. By using a TURN server, rohan and sohan can still communicate effectively even if they cannot establish a direct connection due to network restrictions.
// -> sab ek dushre ko data send karengai cost increase hoga and server slow hoga and scale karne ka soche gai toh scale ni kar payengai


//            ////rohan////               <-p2p->               ////sohan////       
//            /////////////                                     /////////////     
 
//                 | <-p2p->                                            |

//             ////roman////             <-p2p->   ----------------------
//             ///////////// 


// -> basically TURN server is used when direct peer-to-peer connection is not possible due to network restrictions, such as firewalls or NAT configurations. In such cases, the TURN server acts as a relay, allowing media traffic to be sent through it when direct communication between peers is blocked. This ensures that even in challenging network conditions, users can still establish a connection and communicate effectively. TURN servers are typically used as a fallback option when STUN servers are unable to establish a direct connection between peers. So, if rohan and sohan are behind firewalls or NAT configurations that prevent direct peer-to-peer communication, they can use a TURN server to relay their media traffic and establish a connection for their video/audio call.
// **** but as people increase in a video call, the cost of using a TURN server can increase significantly, and the server may become slow due to the increased load. To scale the application effectively, it may be necessary to optimize the TURN server or consider alternative solutions such as peer-to-peer mesh networks or distributed architectures that can help distribute the load and improve performance.

// firewall lagi hai toh ip_port pata hone ke baad bhi direct communication possible ni hoga [ki amazon ka server hai bahar ko koi access na kar paye so firewall laga diya hai toh direct communication possible ni hoga, so in that case they can use a TURN server to relay their media traffic and establish a connection for their video/audio call. TURN servers are especially useful in scenarios where both peers are behind firewalls or NAT configurations that prevent direct peer-to-peer communication. By using a TURN server, rohan and sohan can still communicate effectively even if they cannot establish a direct connection due to network restrictions. However, as the number of users in the video call increases, the cost of using a TURN server can increase significantly, and the server may become slow due to the increased load. To scale the application effectively, it may be necessary to optimize the TURN server or consider alternative solutions such as peer-to-peer mesh networks or distributed architectures that can help distribute the load and improve performance.]
// firewall lagi hai toh ander wale bahar req kar shakte hai per bahar wale ander req nahi kar sakte hai toh direct communication possible ni hoga, so in that case they can use a TURN server to relay their media traffic and establish a connection for their video/audio call. TURN servers are especially useful in scenarios where both peers are behind firewalls or NAT configurations that prevent direct peer-to-peer communication. By using a TURN server, rohan and sohan can still communicate effectively even if they cannot establish a direct connection due to network restrictions. However, as the number of users in the video call increases, the cost of using a TURN server can increase significantly, and the server may become slow due to the increased load. To scale the application effectively, it may be necessary to optimize the TURN server or consider alternative solutions such as peer-to-peer mesh networks or distributed architectures that can help distribute the load and improve performance. This is because a single TURN server may not be able to handle the increased traffic from a large number of users, leading to performance issues and higher costs. By optimizing the TURN server or exploring alternative architectures, it is possible to improve scalability and ensure a better user experience in large-scale video conferencing applications.
// **** but as the number of users in a video call increases, the cost of using a TURN server can increase significantly, and the server may become slow due to the increased load. To scale the application effectively, it may be necessary to optimize the TURN server or consider alternative solutions such as peer-to-peer mesh networks or distributed architectures that can help distribute the load and improve performance. This is because a single TURN server may not be able to handle the increased traffic from a large number of users, leading to performance issues and higher costs. By optimizing the TURN server or exploring alternative architectures, it is possible to improve scalability and ensure a better user experience in large-scale video conferencing applications.
//**** so rohan send data to turn server and turn server send it to sohan, but as the number of users in a video call increases, the cost of using a TURN server can increase significantly, and the server may become slow due to the increased load. To scale the application effectively, it may be necessary to optimize the TURN server or consider alternative solutions such as peer-to-peer mesh networks or distributed architectures that can help distribute the load and improve performance. This is because a single TURN server may not be able to handle the increased traffic from a large number of users, leading to performance issues and higher costs. By optimizing the TURN server or exploring alternative architectures, it is possible to improve scalability and ensure a better user experience in large-scale video conferencing applications.

// **** so require 1 new server : ise connection establish hoga and problem solve 

//                                  //server// (turn server)
//                                  //////////
//                           /                      \       
//                         /                          \
//                       /                              \

//        ////rohan////       |fw     <-p2p->      fw|      ////sohan////  
//        /////////////       |                      |      /////////////

// ->   ip__port__rohan   \                              /  ip__port__sohan
//                         \                            /
//                          \        signaling         /
//                                ////server////
//                                //////////////


// **** kya hota hai ki users have private ip public ip turn ip port number thik and by singling swap ip of each other but direct communication possible ni hoga toh turn server use karna padega rohan user1 batayega isko bhejna hai ye data(video call) to turn server ko aur turn server usko bhej dega sohan user2 ko 
// **** each share public private turn ip and port number each other and find best possible way to communicate with each other but if direct communication is not possible then they can use turn server to relay their media traffic and establish a connection for their video/audio call.
// **** agar private ip se kaam hora hai toh use private ip and public ip ki requirement hai toh use public ip and agar firewall lagi hai toh use turn server

// **** so we use pura data with each other and find best possible way to communicate with each other but if direct communication is not possible then they can use turn server to relay their media traffic and establish a connection for their video/audio call. This is how WebRTC enables real-time communication between browsers and devices, allowing users to share audio, video, and data directly without the need for plugins or third-party software, while also providing mechanisms to handle various network conditions and restrictions effectively. 

// then path select hoga and format select hoga compression and all then final video call start

// --------------------------------------------------




// ----> Distributed System -> A distributed system is a collection of independent computers that work together to achieve a common goal. In the context of WebRTC, a distributed system can be used to distribute the load of media traffic across multiple servers, reducing the reliance on a single TURN server and improving scalability. By using a distributed architecture, media traffic can be routed through multiple servers, allowing for better performance and reliability even as the number of users increases. This approach can help mitigate the cost and performance issues associated with using a single TURN server in large-scale video calls.
// 


//             ////user1////                             ////user2////
//             /////////////                             /////////////
//                    |_________________________________________|
//                                        |
//                                    //server// (multiport conferencing unit)
//                                    //////////
//                    ____________________|_____________________
//                   |                                         |
//            ////user3////                             ////user4////
//            /////////////                             /////////////


// MCU -> multiport conferencing unit -> A multiport conferencing unit (MCU) is a type of server used in video conferencing systems to manage and distribute media streams among multiple participants. The MCU receives media streams from each participant, processes them (such as mixing audio or transcoding video), and then redistributes the processed streams back to the participants. This allows for efficient management of media traffic in large-scale video conferences, as the MCU can handle the processing and distribution of media streams, reducing the load on individual participants and improving overall performance. MCUs are commonly used in traditional video conferencing systems, but they can also be used in conjunction with WebRTC to facilitate communication among multiple users in a distributed architecture.
// -> sabse video lega -> compress karegi and all metadata bhi add karega and make it in single unit -> fir sabko send karega -> sabko video receive hoga -> fir unka device us video ko decompress karega and all metadata bhi read karega -> fir video play karega  

// -> **** but agar bohot sare users hai toh bohot sari video ayegi in server and compress wagera and all hoga and make it in 1 single unit so server load jyada hoga and cost bhi jyaada hoga, so to optimize the performance and reduce the cost, it may be necessary to implement load balancing techniques or consider alternative architectures such as peer-to-peer mesh networks or distributed systems that can help distribute the load and improve scalability in large-scale video conferencing applications.





// -> iska Solution -> **** SFU -> Selective Forwarding Unit -> A selective forwarding unit (SFU) is a type of server used in video conferencing systems to manage and distribute media streams among multiple participants. Unlike an MCU, which processes and mixes media streams, an SFU simply forwards media streams from one participant to others without processing them. This allows for more efficient handling of media traffic, as the SFU does not need to perform resource-intensive tasks such as mixing or transcoding. In a WebRTC context, an SFU can be used to facilitate communication among multiple users in a distributed architecture, allowing for better performance and scalability in large-scale video conferencing applications. By forwarding media streams directly between participants, an SFU can help reduce the load on individual participants and improve overall performance while still enabling effective communication among users.
// -> basically SFU is a more efficient way to manage and distribute media streams in large-scale video conferencing applications, as it simply forwards media streams without processing them, allowing for better performance and scalability compared to traditional MCUs. By using an SFU, video conferencing systems can handle a larger number of participants while still maintaining good performance and reducing the load on individual users.
// **** video ayegi direct another ko bhej do without processing it, so server load kam hoga and cost bhi kam hoga, but still effective communication among users possible hoga. So, in a WebRTC context, an SFU can be used to facilitate communication among multiple users in a distributed architecture, allowing for better performance and scalability in large-scale video conferencing applications. By forwarding media streams directly between participants, an SFU can help reduce the load on individual participants and improve overall performance while still enabling effective communication among users.
// but 1 user ke pass multiple video stream aayegi toh uska device handle kar payega ya nahi, so it may be necessary to implement additional features such as adaptive bitrate streaming or dynamic stream switching to optimize the performance and ensure a good user experience in large-scale video conferencing applications using an SFU. These features can help manage the bandwidth and processing requirements of multiple video streams, allowing users to receive the best possible quality based on their network conditions and device capabilities. 


//             ////user1////                             ////user2////
//             /////////////                             /////////////
//                    |_________________________________________|
//                                        |
//                                    //server// (selecition forwarding unit)
//                                    //////////
//                    ____________________|_____________________
//                   |                                         |
//            ////user3////                             ////user4////
//            /////////////                             /////////////



// -> let 500 users hai so 500 video stream ayegi but no issue server pe load kam hoga and cost bhi kam hoga and client side load inc hoga multiple video streams ayegi toh usko client side handle kar lengai
// ******* google meet, zoom, teams sabhi SFU use karte hai for better performance and scalability in large-scale video conferencing applications. By using an SFU, these platforms can handle a large number of participants while still maintaining good performance and reducing the load on individual users, allowing for effective communication among users even in challenging network conditions. Additionally, these platforms may also implement features such as adaptive bitrate streaming or dynamic stream switching to optimize the performance and ensure a good user experience when handling multiple video streams in large-scale video conferences.
// server cost reduce hua client pe load badhra hai google meet zoom ka paisa thoda na lagra hai client side pe load badhra hai and client manage 
// **** client side load inc hora hai so mobile garam hoga bohot



// --> Real world senerio:

//                /////////////////////////////////////////////////////////////////////
//                                    1000 users in a video call
//
//
//
//
//
//                ////////////////////////////////////////////////////////////////////

// **** but kuch log hi bolte hai na 2-4 log baki sab toh shant rehte hai na --> so kuch selective forwarding kar do unhi logon ke video stream ko jinko bolna hai ya jinka video dekhna hai, toh server pe load kam hoga aur client side pe bhi load kam hoga, aur jo log bol rahe hai unka video stream forward kar do baki sabka nahi karna, toh performance aur scalability dono improve ho jayega. This approach can help optimize the performance and reduce the load on both the server and clients in large-scale video conferencing applications, while still allowing for effective communication among users. By selectively forwarding video streams based on user activity or preferences, platforms can provide a better user experience while managing resources more efficiently in large-scale video calls. 
// active walo ko video stream forward kar do baki sabka nahi karna, toh performance aur scalability dono improve ho jayega. This approach can help optimize the performance and reduce the load on both the server and clients in large-scale video conferencing applications, while still allowing for effective communication among users. By selectively forwarding video streams based on user activity or preferences, platforms can provide a better user experience while managing resources more efficiently in large-scale video calls.

// but let sabke camera on hai so kya sabka video stream forward karna hoga ni --> apan ko ek baar mai 8-10 log dikhte hai itne log ka hi video stream forward karne hoga not all 1000 users


// **** since this approach is known as selection forwarding unit -> reduce server load and client load by selectively forwarding video streams based on user activity since it is used by google meet , zoom and all





//////////////////////// CONCLUSION ////////////////////////


// WebRTC = P2P first approach
// Signaling server sirf IP / SDP exchange ke liye
// STUN = public IP discover
// TURN = fallback relay (firewall / strict NAT)
// TURN costly + scale problem
// Multi-user calls me P2P mesh problem
// MCU heavy, SFU better
// Google Meet / Zoom = SFU
// Selective video forwarding logic (8–10 active speakers)



