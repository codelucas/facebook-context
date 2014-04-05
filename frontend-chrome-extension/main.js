$formInput = $('.innerWrap [name="xhpc_message_text"]');

$formInput.on('change', function(){
  console.log('change');
  /*
  var text = $formInput.val();

  $.post('', text, function(res) {
    console.log(res);
  });*/
});