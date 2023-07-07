$(document).foundation();
$(function(){


  /*=== home size ===*/

  function scaling_home(){
  	$('#home').width($(window).width());
  	$('#home').height($(window).height());
  }

  scaling_home();

  //fixing android issue
  var initial_mobile_width=$(window).width();

  $(window).resize(function(){
  	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
   if(initial_mobile_width==$(window).width()){
   	return false;
   }else{
   	initial_mobile_width=$(window).width();
   	scaling_home();
   }
  }else{
  	scaling_home();
  }

  })
});
