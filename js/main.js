// ------------------ BARBAJS ------------------- //

const FadePageTransition = Barba.BaseTransition.extend({
  start: function() {
    Promise.all([this.newContainerLoading, this.fadeOut()]).then(this.fadeIn.bind(this))
  },
  fadeOut: function() {
    const oldContainer = this.oldContainer
    return new Promise(function(resolve) {
      anime({
        targets: oldContainer,
        opacity: 0,
        translateY: 100,
        easing: 'easeInCubic',
        duration: 300,
        complete: function() {
          resolve()
        }
      })
    })
  },
  fadeIn: function() {
    const _this = this
    const oldContainer = this.oldContainer
    const newContainer = this.newContainer
    window.scrollTo(0, 0)
    oldContainer.style.display = 'none'
    newContainer.style.visibility = 'visible'
    newContainer.style.opacity = 0
    newContainer.style.transform = 'translateY(100px)'
    anime({
      targets: newContainer,
      opacity: 1,
      translateY: 0,
      easing: 'easeOutCubic',
      duration: 600,
      complete: function() {
        _this.done()
      }
    })
  }
})
Barba.Pjax.getTransition = function() {
  return FadePageTransition
}
document.addEventListener('DOMContentLoaded', function(e) {
  Barba.Pjax.start();
})

Barba.Dispatcher.on('newPageReady', function(e) {
  var nav = document.getElementById('nav')
  var nav2 = document.getElementById('nav-sub'),
      anchor = nav.getElementsByTagName('a'),
      anchor2 = nav2.getElementsByTagName('a'),
      current = window.location.pathname.split('/')[1];
      current2 = window.location.pathname.split('/')[1];
      current3 = window.location.pathname;
  for (var i = 0; i < anchor.length; i++) {
    anchor[i].className = "";
  }
  for (var i = 0; i < anchor.length; i++) {
    var eval = anchor[i].href.split('/')[2];
    if (eval == current) {
      anchor[i].className = "active";
    }
  }

  for (var i = 0; i < anchor2.length; i++) {
    anchor2[i].className = "";
  }
  for (var i = 0; i < anchor2.length; i++) {
    var eval2 = anchor2[i].href.split('/')[2];
    if (eval2 == current2) {
      anchor2[i].className = "active";
    }
  }
  var body = document.body;
  // var head = document.getElementsByTagName('head')[0];
  // var script = document.createElement('script');
  // script.type = 'text/javascript';
  // script.src = "ciaociao";
  if(body.classList.contains("nightmode")){
    body.className = "nightmode";
    body.classList.toggle(current2);
  } else{
    body.classList = current2;
  }
  if(current3.length = 0)
    alert ("on the index page!")
  lazysizes: (function() {
    window.lazySizesConfig = window.lazySizesConfig || {};
    return function() {
      window.lazySizesConfig.expand = 400;
      window.lazySizes.init();
    };
  })
})

// ------------------ NIGHTMODE ------------------- //

$(document).on('click', '#nightmode', function() {
  if ($('body').hasClass("nightmode")) {
    $('body').removeClass("nightmode");
    $('#nightmode i').removeClass("fas");
    $('#nightmode i').addClass("fab");
  } else {
    $('body').addClass("nightmode");
    $('#nightmode i').removeClass("fab");
    $('#nightmode i').addClass("fas");
  }
});

// ------------------ GALLERY  ------------------- //
// Label
$(document).ready(function() {
  $("img.gallery__block").each(function(){
    var img = $(this);
    var p = $("<p/>").addClass("info");
    p.text(img.attr("alt"));
    img.after(p);
  });

// Calc first slide padding
  if($(window).width() > 1500){
    setInterval(function(){
        var $margin = $(".container").css('margin-left');
        $(".gallery__block.intro").css({"padding-left": "calc("+$margin+" + 70px)"});
    },10);
  }
});

// ------------------ DISABLE CLICK IMG ------------------- //

function nocontext(e) {
  var clickedTag = (e==null) ? event.srcElement.tagName : e.target.tagName;
  if (clickedTag == "IMG")
  return false;
}
document.oncontextmenu = nocontext;

// ------------------ SCROLL TOP ------------------- //

$(document).on("click", "a[href='#top']", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ------------------ TIME NIGHTMODE ------------------- //
$(window).on('load', function() {
  var now = new Date();
  var hour = now.getHours();
	if (hour >= 7 && hour < 20){
		$('body').removeClass("nightmode");
    $('#nightmode i').removeClass("fas");
    $('#nightmode i').addClass("fab");
    $('.nightip').hide();
    // console.log("giorno");
  }else {
    // console.log("notte")
  	$('body').addClass("nightmode");
    $('#nightmode i').removeClass("fab");
    $('#nightmode i').addClass("fas");
    $('.nightip').show();
    $('.nightip,#nightmode').mouseover(function() {
      $('.nightip').fadeOut(500, "linear");
    });
  }
});
