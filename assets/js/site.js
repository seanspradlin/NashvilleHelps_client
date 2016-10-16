$(document).ready(function(){
    $('#clientForm').submit(function(e){
        e.preventDefault();
        console.log(e);
    });

    $('#consent').change(function(e){
        $('#submit').toggleClass('disabled');
    });
});