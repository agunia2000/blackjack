let link = Array.from(document.querySelectorAll('#changeSkinLink'));
let form = document.querySelectorAll('#changeSkinForm');

link.forEach(function(element){
    element.addEventListener("click", function(){
        form[link.indexOf(element)].submit();
    })
})

