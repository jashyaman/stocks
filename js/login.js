$(document).ready(function(){
    $("#login").click(function(){
        let url = "http://localhost:8091/html/home.html"
        $(location).attr('href',url);
    });

});
setTimeout(function(){
    window.location.reload(1);
 }, 30000);