console.log('------------loaded------------------------');
$statusEl = $('.innerWrap textarea[name="xhpc_message"]');
var imageChoices = [];
var choiceIndex = 0;

// Listen for focus on status input field
$statusEl.one('click', function() {
  setTimeout(function() {
    $formInput = $('.innerWrap textarea[name="xhpc_message_text"]');

    // Entire picker element
    var pickerHTML = '<div class="picker">'+
                      '<div class="UIShareStage_ThumbPagerControl UIThumbPagerControl UIThumbPagerControl_First">'+
                        '<div class="UIThumbPagerControl_Buttons">'+
                          '<a id="pickerLeft" class="UIThumbPagerControl_Button UIThumbPagerControl_Button_Left pickerControlButton pickerControlButton_Left"></a>'+
                          '<a id="pickerRight" class="UIThumbPagerControl_Button UIThumbPagerControl_Button_Right pickerControlButton pickerControlButton_Right"></a>'+
                        '</div>'+
                        '<div class="UIThumbPagerControl_Text pickerControl_text">'+
                          '<span class="UIThumbPagerControl_PageNumber pickerControl_PageNumber">'+
                          '<span id="pickerControl_PageNumber_Current" class="PickerControl_PageNumber_Current">1</span> of <span id="pickerControl_PageNumber_Total" class="UIThumbPagerControl_PageNumber_Total">3</span></span>'+
                          'Choose a Thumbnail'+
                        '</div>'+
                        '<div class="uiInputLabel clearfix uiInputLabelLegacy mts">'+
                          '<input class="UIThumbPagerControl_NoPicture uiInputLabelInput uiInputLabelCheckbox" type="checkbox" value="true" name="no_picture" id="u_9_0">'+
                          '<label for="u_9_0" class="uiInputLabelLabel">No Thumbnail</label>'+
                        '</div>'+
                      '</div>'+
                    '</div>';
    $picker = $(pickerHTML);
    $formInput.parent().append($picker);
    $picker.hide();

    // Image element inside picker
    $imgEl = $('<img src="" />');
    $picker.prepend($imgEl);
    $imgEl.css('maxWidth', $formInput.width());
    $imgEl.css('maxHeight', '200px')

    // Picker buttons/text
    $pickerLeftEl = $('#pickerLeft');
    $pickerRightEl = $('#pickerRight');
    $pickerCurrentPage = $('#pickerControl_PageNumber_Current');
    $pickerTotalPage = $('#pickerControl_PageNumber_Total');


    $pickerLeftEl.on('click', function() {
      if (choiceIndex <= 0) return;
      choiceIndex--;
      $imgEl.attr('src', imageChoices[choiceIndex]);
      if (choiceIndex == 0) {
        $pickerLeftEl.addClass('pickerControlButton_First');
      }
      $pickerRightEl.removeClass('pickerControlButton_Last');

      $pickerCurrentPage.text(choiceIndex + 1);
    });

    $pickerRightEl.on('click', function() {
      if (choiceIndex >= imageChoices.length - 1) return;
      choiceIndex++;
      $imgEl.attr('src', imageChoices[choiceIndex]);
      if (choiceIndex == imageChoices.length - 1) {
        $pickerRightEl.addClass('pickerControlButton_Last');
      }
      $pickerLeftEl.removeClass('pickerControlButton_First');

      $pickerCurrentPage.text(choiceIndex + 1);
    });

    // Request context image from server
    $formInput.on('input', function(){
      console.log('change');
      
      var text = $formInput.val();
      console.log('texxt: ' + text);

      //
      imageChoices = ['http://www.against-the-grain.com/wp-content/uploads/2013/05/people-crowds-webpages.scu_.edu_.jpg', 'http://27.media.tumblr.com/tumblr_lojtswfhv41qzio3qo1_500.jpg'];
      choiceIndex = 0;
      $imgEl.attr('src', imageChoices[choiceIndex]);
      $pickerCurrentPage.text(choiceIndex + 1);
      $pickerTotalPage.text(imageChoices.length);
      $picker.show();

      /*
      $.post('http://text2img.lucasou.com', { text: text }, function(res) {
        imageChoices = res.images;
        choiceIndex = 0;
        $imgEl.attr('src', res.images[choiceIndex]);
        $picker.show();
      });
      */
    });
  }, 500);
});