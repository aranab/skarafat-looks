var lib = require('./lib');

$('#me').click(function(){
    alert('i m not here!!');
});

$('#love').click(function() {
    lib.msg();
});

$('#anotherLove').click(function() {
    lib.msg();
});