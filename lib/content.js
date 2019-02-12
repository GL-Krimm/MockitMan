(function() {
    var hcNode = document.createElement('div');
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            hcNode.innerHTML=xmlhttp.responseText;
        }
    }
  
    xmlhttp.open("GET","xmlhttp_info.txt",true);
    xmlhttp.send();
  
})();