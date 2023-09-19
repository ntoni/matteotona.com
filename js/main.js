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
    var eval = anchor[i].href.split('/')[3];
    if (eval == current) {
      anchor[i].className = "active";
    }
  }

  for (var i = 0; i < anchor2.length; i++) {
    anchor2[i].className = "";
  }
  for (var i = 0; i < anchor2.length; i++) {
    var eval2 = anchor2[i].href.split('/')[3];
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

// ------------------ MENU CHECK ------------------//

var $elem = $('body');

$(document).ready(function() {
  if (!$elem.attr('class') || $elem.hasClass('nightmode')) {
    $('.sub-menu').addClass('visibleopacity');
  } else {
    $('.sub-menu').removeClass('visibleopacity');
  }
});

// Event listener for body class changes
$elem.on('DOMAttrModified', function() {
	console.log('Inside DOMattr');
  if (!$elem.attr('class') || $elem.hasClass('nightmode')) {
    $('.sub-menu').addClass('visibleopacity');
  } else {
    $('.sub-menu').removeClass('visibleopacity');
  }
});


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


//---------------- CACHE ----------------//
const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
};

self.addEventListener("activate", (event) => {
  // Delete all caches that aren't named in CURRENT_CACHES.
  // While there is only one cache in this example, the same logic
  // will handle the case where there are multiple versioned caches.
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            // If this cache name isn't present in the set of
            // "expected" cache names, then delete it.
            console.log("Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
        }),
      ),
    ),
  );
});

self.addEventListener("fetch", (event) => {
  console.log("Handling fetch event for", event.request.url);

  event.respondWith(
    caches.open(CURRENT_CACHES.font).then((cache) => {
      return cache
        .match(event.request)
        .then((response) => {
          if (response) {
            // If there is an entry in the cache for event.request,
            // then response will be defined and we can just return it.
            // Note that in this example, only font resources are cached.
            console.log(" Found response in cache:", response);

            return response;
          }

          // Otherwise, if there is no entry in the cache for event.request,
          // response will be undefined, and we need to fetch() the resource.
          console.log(
            " No response for %s found in cache. About to fetch " +
              "from network…",
            event.request.url,
          );

          // We call .clone() on the request since we might use it
          // in a call to cache.put() later on.
          // Both fetch() and cache.put() "consume" the request,
          // so we need to make a copy.
          // (see https://developer.mozilla.org/en-US/docs/Web/API/Request/clone)
          return fetch(event.request.clone()).then((response) => {
            console.log(
              "  Response for %s from network is: %O",
              event.request.url,
              response,
            );

            if (
              response.status < 400 &&
              response.headers.has("content-type") &&
              response.headers.get("content-type").match(/^font\//i)
            ) {
              // This avoids caching responses that we know are errors
              // (i.e. HTTP status code of 4xx or 5xx).
              // We also only want to cache responses that correspond
              // to fonts, i.e. have a Content-Type response header that
              // starts with "font/".
              // Note that for opaque filtered responses
              // https://fetch.spec.whatwg.org/#concept-filtered-response-opaque
              // we can't access to the response headers, so this check will
              // always fail and the font won't be cached.
              // All of the Google Web Fonts are served from a domain that
              // supports CORS, so that isn't an issue here.
              // It is something to keep in mind if you're attempting
              // to cache other resources from a cross-origin
              // domain that doesn't support CORS, though!
              console.log("  Caching the response to", event.request.url);
              // We call .clone() on the response to save a copy of it
              // to the cache. By doing so, we get to keep the original
              // response object which we will return back to the controlled
              // page.
              // https://developer.mozilla.org/en-US/docs/Web/API/Request/clone
              cache.put(event.request, response.clone());
            } else {
              console.log("  Not caching the response to", event.request.url);
            }

            // Return the original response object, which will be used to
            // fulfill the resource request.
            return response;
          });
        })
        .catch((error) => {
          // This catch() will handle exceptions that arise from the match()
          // or fetch() operations.
          // Note that a HTTP error response (e.g. 404) will NOT trigger
          // an exception.
          // It will return a normal response object that has the appropriate
          // error code set.
          console.error("  Error in fetch handler:", error);

          throw error;
        });
    }),
  );
});

