console.log('------------loadded------------------------');
$statusEl = $('.innerWrap textarea[name="xhpc_message"]');
$statusEl.one('click', function() {
  setTimeout(function() {
    $formInput = $('.innerWrap textarea[name="xhpc_message_text"]');

    $imgEl = $('<img src="" />');
    $formInput.parent().append($imgEl);
    $imgEl.width($formInput.width());

    $formInput.on('input', function(){
      console.log('change');
      
      var text = $formInput.val();

      $.get('http://pugme.herokuapp.com/random', function(res) {
        $imgEl.attr('src', res.pug);
      });
    });
  }, 500);
});