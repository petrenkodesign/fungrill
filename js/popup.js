function initIpop(pop_name, content) {
// create popup append body
    var popCore = document.createElement("div");
        popCore.setAttribute("class", "ipo-overlay");
        popCore.setAttribute("id", "ipopup_"+pop_name);
    var popBody = document.createElement("div");
        popBody.setAttribute("class", "ipo-popup");

    var closeButton = document.createElement("div");
        closeButton.setAttribute("class", "closepop");
        closeButton.innerHTML ="&times;";
        closeButton.addEventListener("click", function() {
          closePop("ipopup_"+pop_name);
        });

    var popContent = '<div class="content">';
        popContent += '<div class="block">'+content;
        popContent += '</div></div>';
        popBody.innerHTML = popContent;
        popBody.prepend(closeButton);
        popCore.appendChild(popBody);
        document.getElementsByTagName("body")[0].appendChild(popCore);

    var closeButton = document.createElement("div");
        closeButton.setAttribute("class", "closepop");
        closeButton.innerHTML ="&times;";
        closeButton.addEventListener("click", function() {
           closePop("ipopup_"+pop_name);
        });
}

function openPop(pop_name) {
  document.getElementById(pop_name).className += ' showpop';
}

function closePop(e) {
  var ipo = document.getElementsByClassName("showpop");
  for(var i = 0; i < ipo.length; i++) {
     ipo[i].className = ipo[i].className.replace(/\bshowpop\b/g, "");
  }
}
