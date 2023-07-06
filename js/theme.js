function setAssetsWidth(e) {
  var t = e || 30;
  $(".gallery .assets").find(".asset").each(function() {
    t += $(this).outerWidth(!0)
  }), $(".gallery .assets #assets_wrap").width(2 * t), $(".gallery .assets").width(t - 30)
}

function resizeImage() {
  var e = $(this).width();
  $(this).parent().parent().find(".img").css("width", e), setTimeout(function() {
    lazySizes.autoSizer.checkElems()
  }, 5)
}

function resizeListing() {
  var e, t = $(".assets"),
    i = ["two-columns", "three-columns", "four-columns", "five-columns"],
    s = i.join(" "),
    n = ["Large", "Medium", "Small", "Auto"],
    a = [0, 500, 750, 900],
    o = n.indexOf(_4ORMAT_DATA.theme.listing_thumbnail_size) + 1,
    l = t.width(),
    r = e;
  if (l > a[o]) e = o;
  else
    for (var d = 0; d < 3; d++)
      if (l >= a[d] && l <= a[d + 1]) {
        e = d;
        break
      } r != e && (t.removeClass(s), t.addClass(i[e]), r = e)
}

function animationCascade() {
  "listing" == _4ORMAT_DATA.page.type && ($("._4ORMAT_content_wrapper").removeClass("content-loaded"), $(".asset, .title-element").each(function(e) {
    var t = $(this);
    setTimeout(function() {
      t.addClass("asset-loaded")
    }, 100 * e)
  }))
}

function getWindowSpace() {
  var e = 0,
    t = 0,
    i = $("#menu_conteiner:visible").height() || 0;
  return "Full Browser Height" == window._4ORMAT_DATA.theme.gallery_image_height && null != window._4ORMAT_DATA.theme.post_text && "" != window._4ORMAT_DATA.theme.post_text && (t = $(".footer_text").outerHeight(!0)), e = window.innerHeight - i - t, e = e > 1200 ? 1200 : e, respUtils.device() && (e *= .95), e
}

function setAssetsSize(e) {
  var t, i = 0,
    s = [];
  windowSpace = globalWindowSpace, e && $(".asset.image").not(".loading").find("img").each(function() {
    positionGalleryImage(this, windowSpace)
  }), $(".asset").each(function() {
    var e = $(this);
    if (e.hasClass("txt")) {
      var i = e.css({
        width: "",
        height: windowSpace
      }).find(".wrap");
      initOrReinitjScrollPane(i, {
        width: "",
        height: windowSpace
      })
    } else if (e.hasClass("title")) {
      if (e.find("img").length)
        if (respUtils.mobile()) {
          var i = e.css({
            width: "",
            height: windowSpace
          }).find(".wrap");
          initOrReinitjScrollPane(i, {
            width: "",
            height: windowSpace
          })
        } else e.css("height", windowSpace);
      else {
        var i = e.css({
          width: "",
          height: windowSpace
        }).find(".wrap");
        initOrReinitjScrollPane(i, {
          width: "",
          height: windowSpace
        })
      }
      respUtils.device() || (t = e.find(".asset_copy").outerHeight(!0), s.push(t))
    } else e.hasClass("video") && (t = e.find(".copy").outerHeight(!0), t = t || 0, s.push(t))
  });
  var n = windowSpace - Math.max.apply(Math, s);
  $(".asset.video").each(function() {
    var e = $(this).find(".preview");
    (e.hasClass("vimeo_cont") || e.hasClass("youtube_cont")) && positionGalleryVideo($(this), e, windowSpace, n)
  }), respUtils.mobile() || $(".asset.title").find("img").css({
    height: n
  }), $(".asset").each(function() {
    var e = $(this);
    i += e.outerWidth(!0)
  }), $(".gallery .assets #assets_wrap").width(2 * i).height(windowSpace), $(".gallery .assets").width(i)
}

function enable_scrolling() {
  var e = function() {
    return "scrollingElement" in document ? document.scrollingElement : -1 !== navigator.userAgent.indexOf("WebKit") ? document.body : document.documentElement
  };
  $(".conteiner").mousewheel(function(t, i, s, n) {
    var a = 0,
      o = 0;
    if (o = Math.abs(s) >= Math.abs(n) ? -s : n, a = 40 * o, !$(t.target).parents(".jspScrollable").length) return e().scrollLeft -= a, !1
  })
}

function moveSlider(e) {
  var t = 0,
    i = $(".asset");
  if ("Slow" == _4ORMAT_DATA.theme.gallery_change_image_speed ? t = 800 : "Normal" == _4ORMAT_DATA.theme.gallery_change_image_speed ? t = 550 : "Fast" == _4ORMAT_DATA.theme.gallery_change_image_speed && (t = 400), 0 == $(i[e]).length) return !1;
  try {
    var s = $(i[e]),
      n = parseInt(s.position().left, 10) + (s.outerWidth() / 2 - $(window).width() / 2) + 1;
    if (onScrollComplete = function() {
        setTimeout(function() {
          activeSlideIndex = parseInt(location.hash.slice(1)), activeSlideIndex <= 0 ? $(".ie8 .gallery .ie-prev").hide() : $(".ie8 .gallery .ie-prev").show(), activeSlideIndex >= slideAssetsLength ? $(".ie8 .gallery .ie-next").hide() : $(".ie8 .gallery .ie-next").show()
        }, 30)
      }, n < 0 && 0 == $window.scrollLeft()) return onScrollComplete();
    $("body, html").stop().animate({
      scrollLeft: n
    }, {
      queue: !1,
      duration: t,
      complete: onScrollComplete
    })
  } catch (i) {
    var a = e > 0 ? "+=350" : "-=350";
    $("body, html").stop().animate({
      scrollLeft: a
    }, {
      queue: !1,
      duration: t,
      complete: function() {
        activeSlideIndex = parseInt(location.hash.slice(1))
      }
    })
  }
}

function setLocationHash(e) {
  history.replaceState ? history.replaceState(null, null, "#" + e) : location.hash = "#" + e
}

function loadSlideAtIndex(e) {
  var t = 0,
    i = $("#content .asset"),
    s = i.eq(e);
  $scrollEl = $("html, body"), 0 === e ? $scrollEl.scrollLeft(0) : e === i.length - 1 ? $scrollEl.scrollLeft($(".assets")[0].scrollWidth) : (t = s.offset().left - Math.ceil((-s.width() + $(window).width()) / 2) + 1, $scrollEl.scrollLeft(t))
}

function setActiveSlide() {
  var e = activeSlideIndex,
    t = $("#content .asset"),
    i = $(window),
    s = $(window).scrollLeft(),
    n = 0,
    a = null;
  if (s <= t.eq(1).offset().left - Math.ceil((-t.eq(1).width() + $(window).width()) / 2) - 1) n = 0, a = t.first(), activeSlideIndex = n, setLocationHash(n);
  else if (s >= t.last().offset().left - t.last().width() - 1) n = t.length - 1, a = t.eq(n), activeSlideIndex = n, setLocationHash(n);
  else {
    var o = document.elementFromPoint(i.width() / 2, i.height() / 2);
    a = $(o).find(".asset").length ? t.eq(e) : $(o).parents(".asset").length ? $(o).parents(".asset") : $(o);
    var l = a.offset().left - Math.ceil((-a.width() + $(window).width()) / 2);
    s >= l && (n = -1 !== a.index() ? a.index() : activeSlideIndex, activeSlideIndex = n, setLocationHash(n))
  }
}

function customCursor(e) {
  var t = $("#content");
  e.pageX - $(window).scrollLeft() > $(window).width() / 2 ? t.addClass("cursor_right").removeClass("cursor_left") : t.addClass("cursor_left").removeClass("cursor_right");
  var i = parseInt(location.hash.slice(1));
  0 === i ? t.addClass("cursor_right").removeClass("cursor_left") : i === slideAssetsLength && t.addClass("cursor_left").removeClass("cursor_right")
}

function setMarginTop() {
  $(".ie-next, .ie-prev").css({
    top: $("#content").offset().top + $(window).height() / 2 - $(".ie-prev").outerHeight() / 2
  })
}

function disablePinchZoom() {
  0 === window.outerWidth && window.addEventListener("touchmove", function(e) {
    1 !== e.scale && e.preventDefault()
  }, {
    passive: !1
  })
}
var activeSlideIndex = 0,
  slideAssetsLength = 0,
  enough_assets = null,
  responsiveMode = null,
  FULLHEIGHTDESKTOP_MOBILE = "full height desktop or mobile",
  FIXEDHEIGHTDESKTOP = "fixed height desktop",
  ASPECT_RATIO_PORTRAIT = "portrait",
  ASPECT_RATIO_LANDSCAPE = "landscape",
  respUtils = window._4ORMAT_HORIZON.importResponsiveUtilities(),
  mobileMenu = window._4ORMAT_HORIZON.importMobileMenu(),
  initialHash = 0,
  globalWindowSpace, setUpFullHeightDesktopOrMobileLazyLoading = function() {
    respUtils.device() && $("body, html").css("overflow-y", "hidden"), setAssetsSize(!0), $(document).on("lazybeforeunveil", function(e) {
      setTimeout(function() {
        $(e.target).parents(".asset").removeClass("loading").addClass("image-loaded"), respUtils.device() || positionGalleryImage($(e.target), globalWindowSpace), setAssetsWidth()
      }, 10)
    }), setAssetsSize()
  },
  setUpFixedHeightDesktopLazyLoading = function() {
    $("body, html").css("overflow-y", ""), $(".asset img").css("height", ""), $(document).on("lazybeforeunveil", function(e) {
      setTimeout(function() {
        $(e.target).parents(".asset").removeClass("loading").addClass("image-loaded"), resizeImage($(e.target)), setAssetsWidth(), lazySizes.autoSizer.checkElems()
      }, 10)
    })
  },
  initOrReinitjScrollPane = function(e, t) {
    var i = $(e),
      s = i.parent(),
      n = i.data("jsp");
    n && (n.destroy(), i = s.find(".wrap")), i.css(t || {
      width: "",
      height: ""
    }), i.jScrollPane()
  },
  resetAssetSizes = function() {
    $(".asset.txt, .asset.title").css({
      width: "",
      height: ""
    }), $(".gallery .assets #assets_wrap").css("height", "")
  },
  nonGalleryResponsiveness = function() {
    if ($(window).width() > 1024) var e = 0;
    else var e = $("#menu_conteiner").height();
    var t = document.body.classList;
    (t.contains("listing") || t.contains("simple") || t.contains("content") || t.contains("store") || t.contains("blog") || t.contains("product")) && $("#content .conteiner").css({
      marginTop: e
    })
  },
  now = Date.now || function() {
    return (new Date).getTime()
  },
  handleWindowChanges = function() {
    var e = $("#content .conteiner").height() + 2 * $("#menu_conteiner").height();
    $("body").hasClass("gallery") ? respUtils.fullHeightModeOrDevice() ? (responsiveMode === FIXEDHEIGHTDESKTOP && (setUpFullHeightDesktopOrMobileLazyLoading(), responsiveMode = FULLHEIGHTDESKTOP_MOBILE), setAssetsSize(!0), $("#content .conteiner").css({
      top: $("#menu_conteiner:visible").height() || .025 * window.innerHeight,
      marginTop: "0"
    })) : (responsiveMode === FULLHEIGHTDESKTOP_MOBILE && (resetAssetSizes(), setUpFixedHeightDesktopLazyLoading(), $(".asset.txt .wrap, .asset.title .wrap").each(function(e, t) {
      initOrReinitjScrollPane(t)
    }), responsiveMode = FIXEDHEIGHTDESKTOP), $(window).height() < e ? ($("#content .conteiner").css({
      top: $("#menu_conteiner").height(),
      marginTop: "0"
    }), setMarginTop()) : $("#content .conteiner").css({
      top: "",
      marginTop: ""
    })) : nonGalleryResponsiveness()
  },
  setImageSizingStrategy = function(e) {
    var t = e.data("aspect-ratio"),
      i = t.split(":"),
      s = parseInt(i[0], 10) / parseInt(i[1], 10);
    setItemSizingStrategy(e, s)
  },
  setVideoSizingStrategy = function(e) {
    var t = e.data("video-ratio");
    setItemSizingStrategy(e, parseFloat(t))
  },
  setItemSizingStrategy = function(e, t) {
    e.data("sizing") || (t >= 1 ? e.attr("data-sizing", ASPECT_RATIO_LANDSCAPE) : e.attr("data-sizing", ASPECT_RATIO_PORTRAIT))
  },
  positionGalleryImage = function(e, t) {
    var i = $(e),
      s = "fit-width",
      n = "fit-height",
      a = n,
      o = _4ORMAT_DATA.theme.gallery_full_height_mobile;
    if ((window.matchMedia("(min-device-width: 768px)").matches || window.matchMedia("(orientation: landscape)").matches) && (o = !1), setImageSizingStrategy(i), !respUtils.device()) return void i.css("height", t);
    var l = window.matchMedia("(min-device-width: 767px) and (max-device-width: 1024px)").matches,
      r = window.matchMedia("(orientation: portrait)").matches,
      d = l && r;
    i.data("sizing") === ASPECT_RATIO_LANDSCAPE && r && (a = s), a !== s || o ? i.css({
      height: t,
      marginTop: ""
    }) : (d ? "Full Browser Height" == window._4ORMAT_DATA.theme.gallery_image_height && i.css("height", t) : i.css("height", "auto"), i.css({
      marginTop: .5 * (t - i.height()) + "px"
    }))
  },
  positionGalleryVideo = function(e, t, i) {
    if (respUtils.device()) {
      var s = parseFloat(e.data("video-ratio")),
        n = "fit-width",
        a = "fit-height",
        o = a,
        l = window.matchMedia("(orientation: portrait)").matches;
      if (setVideoSizingStrategy(e), e.data("sizing") === ASPECT_RATIO_LANDSCAPE && l && (o = n), o === n) {
        var r = .9 * window.innerWidth,
          d = r / s;
        t.css({
          width: r,
          height: d
        }), e.css({
          width: r,
          height: d,
          marginTop: .5 * (i - d) + "px"
        })
      } else {
        var r = i * s,
          d = i;
        t.css({
          width: r,
          height: d
        }), e.css({
          width: r,
          height: d,
          marginTop: ""
        })
      }
    } else {
      var s = parseFloat(e.data("video-ratio")),
        r = i * s;
      t.css({
        height: i,
        width: r
      }), e.width(i * s)
    }
  },
  debounce = function(e, t, i) {
    var s, n, a, o, l, r = function() {
      var d = now() - o;
      d < t && d >= 0 ? s = setTimeout(r, t - d) : (s = null, i || (l = e.apply(a, n), s || (a = n = null)))
    };
    return function() {
      a = this, n = arguments, o = now();
      var d = i && !s;
      return s || (s = setTimeout(r, t)), d && (l = e.apply(a, n), a = n = null), l
    }
  };
$(document).ready(function() {
  if (disablePinchZoom(), setAssetsWidth(), slideAssetsLength = $(".asset").length - 1, $("body").hasClass("gallery")) {
    if ($(window).scroll($.debounce(500, setActiveSlide)), initialHash = "" !== location.hash ? parseInt(location.hash.slice(1)) : 0, window.addEventListener("resize", function() {
        respUtils.device() && window.scrollTo(0, 0)
      }, !1), enable_scrolling(), $("html").hasClass("ie") && setMarginTop(), _4ORMAT_DATA.theme.nav_arrows_toggle) {
      enough_assets = $(".asset").length > 1, enough_assets ? $("#content").mousemove(customCursor) : $("html").hasClass("ie8") && $(".ie-prev, .ie-next").hide();
      var e = $("#content");
      "Thin" === _4ORMAT_DATA.theme.nav_arrow_thickness ? e.addClass("cursor_s") : "Medium" === _4ORMAT_DATA.theme.nav_arrow_thickness ? e.addClass("cursor_m") : "Thick" === _4ORMAT_DATA.theme.nav_arrow_thickness && e.addClass("cursor_l"), "Light" === _4ORMAT_DATA.theme.nav_arrow_style ? e.addClass("cursor_white") : "Dark" === _4ORMAT_DATA.theme.nav_arrow_style && e.addClass("cursor_black"), $("html").hasClass("ie8") ? ($(".ie-prev").click(function() {
        return activeSlideIndex >= 0 && (activeSlideIndex -= 1), activeSlideIndex < 0 && (activeSlideIndex = 0), $("a.image_text.opened").click(), setLocationHash(activeSlideIndex), moveSlider(activeSlideIndex), $(".embed_conteiner iframe").remove(), !1
      }), $(".ie-next").click(function() {
        return activeSlideIndex < slideAssetsLength && (activeSlideIndex += 1), activeSlideIndex > slideAssetsLength && (activeSlideIndex = slideAssetsLength), $("a.image_text.opened").click(), setLocationHash(activeSlideIndex), moveSlider(activeSlideIndex), $(".embed_conteiner iframe").remove(), !1
      })) : $("#content").bind("click", function(e) {
        if (enough_assets && !($(e.target).hasClass("image_text") || $(e.target).hasClass("image_text_conteiner") || 1 === $(e.target).parents(".image_text_conteiner").length || $(e.target).closest("a").length)) return $(this).hasClass("cursor_left") && (activeSlideIndex -= 1), $(this).hasClass("cursor_right") && (activeSlideIndex += 1), activeSlideIndex < 0 && (activeSlideIndex = 0), activeSlideIndex > slideAssetsLength && (activeSlideIndex = slideAssetsLength), $("a.image_text.opened").click(), setLocationHash(activeSlideIndex), $(".embed_conteiner iframe").remove(), moveSlider(activeSlideIndex), customCursor(e), !1
      }), $("body").keydown(function(e) {
        37 == e.keyCode && (activeSlideIndex -= 1), 39 == e.keyCode && (activeSlideIndex += 1), 37 != e.keyCode && 39 != e.keyCode || (activeSlideIndex < 0 && (activeSlideIndex = 0), activeSlideIndex > slideAssetsLength && (activeSlideIndex = slideAssetsLength), setLocationHash(activeSlideIndex), moveSlider(activeSlideIndex), $(".embed_conteiner iframe").remove(), e.preventDefault())
      })
    }
    respUtils.fullHeightModeOrDevice() || setUpFixedHeightDesktopLazyLoading(), $(".asset img").load(function() {
      setAssetsWidth()
    }), $(".asset.image img").load(function() {
      $(this).parents(".asset").removeClass("loading").addClass("image-loaded"), respUtils.device() && positionGalleryImage(this, globalWindowSpace), resizeImage(this)
    }), $(".asset.video .embed_conteiner").load(function() {
      var e = $(this).width();
      $(this).css("width", e)
    }), $("a.image_text").click(function() {
      if ($(this).hasClass("opened")) $(this).parent().find(".image_text_conteiner").hide(), $(this).parent().find("a.image_text").html("info"), $(this).removeClass("opened");
      else {
        $("a.image_text.opened").removeClass("opened"), $(this).addClass("opened");
        var e = $(this).parents(".asset").index();
        _4ORMAT_DATA.theme.nav_arrows_toggle && (moveSlider(e), setLocationHash(activeSlideIndex)), $(".image_text_conteiner").hide(), $("a.image_text").html("info"), $(this).parent().find(".image_text_conteiner").show(), $(this).parent().find("a.image_text").html("&times;")
      }
      return !1
    })
  }
  $("body").hasClass("listing") && (resizeListing(), $(".masonry").length && $(".masonry").masonry(), animationCascade()), $("li.category .dropdown").each(function(e) {
    var t = 0;
    $(this).addClass("dd-" + e), $(this).children("li").each(function() {
      t += $(this).height()
    }), $("head").append('<style type="text/css">#menu .category:hover .dd-' + e + ", #menu .category:focus .dd-0 { height: " + t + "px; }</style>")
  }), $("#using").length && $("#using").clone().appendTo(".nav_using")
}), $(window).load(function() {
  var e = $("#content .conteiner").height() + 2 * $("#menu_conteiner").height();
  $("body").hasClass("client_page") && $("#content").css({
    marginTop: $("#menu_conteiner:visible").height() || .025 * window.innerHeight,
    position: "relative"
  }), $("body").hasClass("gallery") ? (respUtils.fullHeightModeOrDevice() ? (responsiveMode = FULLHEIGHTDESKTOP_MOBILE, setAssetsSize(!0), $("#content .conteiner").css({
    top: $("#menu_conteiner:visible").height() || .025 * window.innerHeight,
    marginTop: "0"
  })) : (responsiveMode = FIXEDHEIGHTDESKTOP, $(".asset.txt .wrap, .asset.title .wrap").each(function(e, t) {
    initOrReinitjScrollPane(t)
  }), $(window).height() < e ? $("#content .conteiner").css({
    top: $("#menu_conteiner").height(),
    marginTop: "0"
  }) : $("#content .conteiner").css({
    top: "",
    marginTop: ""
  })), setTimeout(function() {
    loadSlideAtIndex(initialHash)
  }, 100)) : nonGalleryResponsiveness()
}), $(window).resize(debounce(function() {
  globalWindowSpace = getWindowSpace(), mobileMenu.isVisible() ? mobileMenu.hide() : handleWindowChanges()
}, 300)), $(window).on("resize", function() {
  $("body").hasClass("listing") && resizeListing()
});
var windowSpace;
$(function() {
  mobileMenu.setup({
    menuSelector: "#menu_conteiner",
    navSelector: ".nav",
    afterHide: handleWindowChanges
  }), $("body").hasClass("gallery") && respUtils.fullHeightModeOrDevice() && setUpFullHeightDesktopOrMobileLazyLoading()
});
var $window = $(window);
$(function() {
  if (globalWindowSpace = getWindowSpace(), $("body").hasClass("gallery")) {
    var e = 0,
      t = 0;
    $(document.body).bind("touchstart", function(i) {
      e = i.originalEvent.touches.item(0).clientY, t = i.originalEvent.touches.item(0).clientX
    }), $(document.body).bind("touchmove", function(i) {
      var s = e - i.originalEvent.touches.item(0).clientY,
        n = t - i.originalEvent.touches.item(0).clientX;
      if (e = i.originalEvent.touches.item(0).clientY, t = i.originalEvent.touches.item(0).clientX, $(i.target).closest(".menu_wrap").length) return !0;
      Math.abs(s) > Math.abs(.6 * n) && i.preventDefault()
    })
  }
});
