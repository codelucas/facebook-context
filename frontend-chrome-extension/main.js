// set up an observer for the title element
var target = document.querySelector('head > title');
var observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
	console.log("CAUGHT THE PAGE CHANGE");
	$statusEl = $('.innerWrap textarea[name="xhpc_message"]');

	//Rerun the event listener	
	$statusEl.one('click', function() {
  	setTimeout(run, 500);
	});
    });
});
observer.observe(target, { subtree: true, characterData: true, childList: true });

//Globals
$imageFormData = $("<div></div>");
var url = "";
var imageChoices = [];
var choiceIndex = 0;
var pickerShow = true;

//Loading
console.log('------------loaded------------------------');
$statusEl = $('.innerWrap textarea[name="xhpc_message"]');

// Listen for focus on status input field
$statusEl.one('click', function() {
  setTimeout(run, 500);
});
function run() {
    console.log("WE GOT A CLICK");
    $imageFormData = $("<div></div>");
    url = "";
    var imageChoices = [];
    var choiceIndex = 0;
    var pickerShow = true;
    $formInput = $('.innerWrap textarea[name="xhpc_message_text"]');

    $form = $('form[action="/ajax/updatestatus.php"]');
    $form.append($imageFormData);
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
                          '<input id="pickerNoPicture" class="UIThumbPagerControl_NoPicture uiInputLabelInput uiInputLabelCheckbox" type="checkbox" value="true" name="no_picture" id="u_9_0">'+
                          '<label for="pickerNoPicture" class="uiInputLabelLabel">No Thumbnail</label>'+
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
      url = imageChoices[choiceIndex]; 
      //resetURL(url);
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
      url = imageChoices[choiceIndex];
      //resetURL(url);
    });

    var timeoutId;
    var counter = 0;
    function autocomplete(text) {
        if (text) {
            // Increment counter to maintain separate versions
            counter++;
            var thisCounter = counter;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                $.post('http://text2img.lucasou.com', { text: text }, function(res) {
                  imageChoices = res.images;
                  choiceIndex = 0;
            		  url = imageChoices[choiceIndex];
            		  //resetURL(url);
                  $imgEl.attr('src', res.images[choiceIndex]);
                  $pickerCurrentPage.text(choiceIndex + 1);
                  $pickerTotalPage.text(imageChoices.length);
                  pickerShow && $picker.show(); // pickerShow == False means $picker.show() never runs
                }); 
            }, 1000);
        }
    }

    // Request context image from server
    $formInput.on('input', function() {
      urlRegex = /(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/;
      console.log('change');
      
      var text = $formInput.val();
      if (text.match(urlRegex) != null) {
        console.log('found url!!!!!!!!!!!!!!!!!!!!!!');
        $picker.hide();
        pickerShow = false;
        /*
        $('form').on('click', 'input[type="button"][title="Remove"]', function() {
          console.log('REMOVEDDDD');
          pickerShow = true;
          $picker.show();
        });
        */
        return;
      }

      autocomplete(text);
     /*
      imageChoices = [
        'http://www.against-the-grain.com/wp-content/uploads/2013/05/people-crowds-webpages.scu_.edu_.jpg',
        'http://27.media.tumblr.com/tumblr_lojtswfhv41qzio3qo1_500.jpg'
      ];
      choiceIndex = 0;
      $imgEl.attr('src', imageChoices[choiceIndex]);
      $pickerCurrentPage.text(choiceIndex + 1);
      $pickerTotalPage.text(imageChoices.length);
      pickerShow && $picker.show(); // pickerShow == False means $picker.show() never runs
     */

      /*
      $.post('http://text2img.lucasou.com', { text: text }, function(res) {
        imageChoices = res.images;
        choiceIndex = 0;
        $imgEl.attr('src', res.images[choiceIndex]);
        $pickerCurrentPage.text(choiceIndex + 1);
        $pickerTotalPage.text(imageChoices.length);
        pickerShow && $picker.show(); // pickerShow == False means $picker.show() never runs
      url = imageChoices[0];
      });
      */
    });
}

function resetURL(newUrl) {
 $imageFormData.html(
        '<input type="hidden" name="attachment[params][urlInfo][canonical]" value="'  + newUrl + '">' +
          '<input type="hidden" name="attachment[params][urlInfo][final]" value="' + newUrl + '">' +
          '<input type="hidden" name="attachment[params][urlInfo][user]" value="' + newUrl + '">' +
          '<input type="hidden" name="attachment[params][title]" value="' + newUrl + '">' +
          '<input type="hidden" name="attachment[params][images][0]" value="' + newUrl + '">' +
          '<input type="hidden" name="attachment[params][medium]" value="101">' +
          '<input type="hidden" name="attachment[params][url]" value="' + newUrl + '">' +
          '<input type="hidden" name="attachment[type]" value="100">'
      );
}

$form = $('form[action="/ajax/updatestatus.php"]');
$form.submit(function(e) {
  e.preventDefault();
  console.log('SUBMITT');
  console.log($('#pickerNoPicture').prop('checked'));
  if (!$('#pickerNoPicture').prop('checked')) { 
    resetURL(url);
    setTimeout(function() {
      run();
      $imageFormData.html('<div></div>');
    }, 100);
  }
  $picker.remove();
});
