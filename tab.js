function messageReceived(message, sender, respond){

    var div = document.getElementById(message.title)
    if(div == null){
        div = document.createElement("div");
        div.id = message.title;
        div.classList.add('container');
        div.style.paddingTop = '10px';
        div.innerHTML = '<a href="'+message.url+'">'+message.title+'</a>'
    }
    var ul = document.createElement("ul");
    var li = document.createElement("li");
    li.innerHTML = message.text;
    ul.appendChild(li);
    div.appendChild(ul);

    document.getElementById("notes").appendChild(div);
}

chrome.runtime.onMessage.addListener(messageReceived);
window.onload = function(){
    document.getElementById('save').onclick = function(){
        print();
    }
    document.getElementById('edit').onclick = function(){
        if(document.designMode == "on"){
            document.designMode = "off";
            document.getElementById('edit').innerHTML = "Edit";
        }else{
            document.designMode = "on";
            document.getElementById('edit').innerHTML = "Done";
        }
    }
}