window.onload = function() {

    var input = document.getElementById('inp');
    var btn = document.getElementById('btn');
    var elementTodo = document.getElementById("activetodos");
    elementTodo.innerText = "";
    btn.onclick = function () {
        var value = input.value;
        input.value='';
        addItem(value, "active");
        displayItem();
    };

    //displayItem();


}

/*var cmpltbtn = document.getElementById('cmp');
cmpltbtn.onclick = function(){
    displayItem();
};*/
