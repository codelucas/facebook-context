console.log('loaddddddddddddddddddeeeeeeeeeeeeeeddddddddddd-----------');
$msg = $('.innerWrap textarea[name="xhpc_message"]');
$msg.on('click', function() {
  console.log('clicked');
  setTimeout(function() {
    $formInput = $('.innerWrap textarea[name="xhpc_message_text"]');
    $formInput.on('input', function(){
      console.log('change');
      /*
      var text = $formInput.val();

      $.post('', text, function(res) {
        console.log(res);
      });*/
    });
  }, 500);

});
