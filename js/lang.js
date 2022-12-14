// Control site language
$( document ).ready(function() {
  create_lang_pop();
  sw_lang();

  $('.lang_pop span').click(function() {
    if($('.lang_pop:hover .content').is(':visible')) {$('.lang_pop:hover .content').hide();}
    else {$('.lang_pop:hover .content').show();}
  });
});
// Site code and language name array
var lang_code = {"en":"english", "ua":"українська"};

// Change content on user language
function ch_site_lang(lng='en') {
  $.getJSON( "lng/"+lng+".json", function( data ) {

    var $lang_tags = $('[data=lng-txt]');

    $('[data=lng-txt]').each(function() {
      var lang_content = $.trim($(this).text().toLowerCase());
      if(data[lng][lang_content]==undefined) lang_content=$(this).attr("data-lang");
      $(this).html(data[lng][lang_content]);
    });

    $('[data=lng-place]').each(function() {
      var lang_content = $.trim($(this).attr("placeholder").toLowerCase());
      if(data[lng][lang_content]==undefined) lang_content=$(this).attr("data-lang");
      $(this).attr("placeholder", data[lng][lang_content]);
    });

    $('[data=lng-field]').each(function() {
      var lang_content = $.trim($(this).attr("data-field-buttontitle-value").toLowerCase());
      if(data[lng][lang_content]==undefined) lang_content=$(this).attr("data-lang");
      $(this).attr("data-field-buttontitle-value", data[lng][lang_content]);
    });

  }).fail(function() { console.log("Error: can`t find lang json, or wrong format!"); });
}

// Create popup for language choise button
function create_lang_pop() {
  $.each( lang_code, function( key, value ) {
    $('.lang_pop .selector ul').append('<li data-lang="'+key+'">'+value+'</li>');
    $('[data-lang='+key+']').click(function(){
      set_lang(key.toUpperCase());
    });
  });
}
// Set language manual
function set_lang(code="EN") {
  $.cookie("country", code);
  window.location.reload();
}

// Get language Code
function sw_lang() {
  var ccode = $.cookie("country");
  if(ccode == undefined) {
    // Get country region by IP
    $.getJSON("https://ip-api.com/json",
     function (data) {
       ccode = data.countryCode;
       $.cookie("country", ccode);
       window.location.reload()
     }
   );
  }
  else if(ccode && lang_code[ccode.toLowerCase()] == undefined) {
    ccode = "EN";
  }
  $.cookie("country", ccode);
  if(ccode != "EN" && ccode != undefined) {
    $('.lang_pop span').text(ccode);
    ch_site_lang(ccode.toLowerCase());
  }
}

function getTranslate(word) {
    var lng = $.cookie("country").toLowerCase();
    if(lng == undefined) lng = 'en';
    $.getJSON( "lng/"+lng+".json", function( data ) {
      result = data[lng][word.toLowerCase()];
      if(result==undefined) result = word;
      return result;
    });
}


function setTranslate(word, tag, attr=null) {
    lng = $.cookie("country").toLowerCase();
    if(lng == undefined) lng = 'en';
    $.getJSON( "lng/"+lng+".json", function( data ) {
      res = data[lng][word.toLowerCase()];
      if(attr) $(tag).attr(attr, (res!=undefined) ? res : word);
      else $(tag).text((res!=undefined) ? res : word);
    });
}
