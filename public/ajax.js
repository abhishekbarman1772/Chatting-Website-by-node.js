var socket = io.connect();
   

       $(() => {
        $("#send").click(()=>{
           sendMessage({
              name:$("#name").val(), 
              message:$("#message").val(),
              Date: moment().format('ddd MMM DD YYYY hh:mm')
            });
            })
          getMessages()
        })

        socket.on('message', addMessages)
     
        function addMessages(message)
      {  let string1 = document.getElementById("name").value;
         let string2 = message.name;
      var result = string1.localeCompare(string2);
          if(result==0){ 
          $("#messages").append(`
          <h4 align="right"> ${message.name} </h4>
          <p align="right">  ${message.message} </p>
          <h6 align="right" style="font-size:10px;"> ${message.Date}</h6>
          `)}
        else{
          $("#messages").append(`
          <h4> ${message.name} </h4>
           <p>  ${message.message} </p>
           <h6 style="font-size:10px;"> ${message.Date}</h6>
          `)}
        }
   
      
     
     function getMessages(){
      $.get("http://localhost:3000/messages", (data) => {
       data.forEach(addMessages);
       })
     }
     
     function sendMessage(message){
       $.post("http://localhost:3000/messages", message)
     }
  