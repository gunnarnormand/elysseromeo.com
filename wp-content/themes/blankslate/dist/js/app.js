"use strict";

var app = function () {
  var $siteurl = ELYSSEROMEO.siteurl;
  var $defaultImg = "/wp-content/themes/blankslate/dist/img/default.png";
  var $loader = document.querySelector('#loader');
  var $loaderGIF = document.querySelector('#loaderGIF');
  var $loaderSVG = document.querySelector('#loaderSVG');
  var $main = document.querySelector('.main');
  var $header = document.querySelector('header');
  var $nav = document.querySelector('nav');
  var $logo = $header.firstElementChild;
  var $firstSection = $main.firstElementChild;
  var $firstContent = $firstSection.querySelector('.work-content');
  var $aboutLink = document.querySelector('.about');
  var $aboutClose = document.querySelector('.about__close');
  var $aboutPage = document.querySelector('.about__page');
  var $aboutBg = document.querySelector('#about-bg');
  var $aboutInner = document.querySelector('.about-inner');
  var $exitAbout = document.querySelector('#exitAbout');
  var $contact = document.querySelector('.contact');
  var $contactPage = document.querySelector('.contact-form');
  var $hideFormArrow = document.querySelector('.hide-form-arrow');
  var $hideFormArrowPath = document.querySelector('#hideFormArrow');
  var arrowPaths = document.querySelectorAll('.cls-arrow');
  var prevArrow = document.querySelector('.arrow-back');
  var nextArrow = document.querySelector('.arrow-next');
  var prevArrowSvg = document.querySelector('#prevArrow');
  var nextArrowSvg = document.querySelector('#nextArrow');
  var $workItems = document.querySelectorAll('.work-content');
  var $workText = document.querySelectorAll('.work-text');
  var $workTitles = document.querySelectorAll('.work-title');
  var $workBtns = document.querySelectorAll('.work-btn');
  var $links = document.querySelectorAll('a');
  var $aboutPageLinks = document.querySelectorAll('a.link');
  var innerCursor = document.querySelector(".cursor--small");
  var canvas = document.querySelector(".cursor--canvas");

  var loaderModule = function loaderModule() {
    var $footerNav = document.querySelector('.onepage-pagination');
    var $footerLinks = $footerNav.children;
    var $firstFooterNavItem = $footerNav.firstElementChild.firstElementChild;
    var regex = /(\/wp-content)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    var $images = document.querySelectorAll('.work-content');
    var imgSrcs = [];
    $images.forEach(function (image) {
      if (image.style.cssText.match(regex) == null) {
        image.style.cssText = $defaultImg;
      } else {
        imgSrcs.push(image.style.cssText.match(regex));
      }
    });
    var loadingTl = new TimelineMax({
      delay: 0,
      smoothChildTiming: true,
      repeat: -1,
      yoyo: true
    });
    loadingTl.fromTo($loaderSVG, 2, {
      drawSVG: '0% 100%'
    }, {
      drawSVG: '0% 0%',
      ease: Expo.easeInOut
    });
    var loaderTl = new TimelineMax({
      delay: 2
    });
    var loadedImages = 0;

    for (var i = 0; i < imgSrcs.length; i++) {
      var tmp = new Image();
      tmp.src = imgSrcs[i][0];
      tmp.addEventListener('load', function () {
        loadedImages++;

        if (loadedImages === imgSrcs.length) {
          loaderTl.to($loaderGIF, 0.25, {
            autoAlpha: 0,
            ease: Expo.easeInOut
          }).set($loaderGIF, {
            display: 'none'
          }).to($loaderSVG, 0.25, {
            autoAlpha: 1,
            ease: Expo.easeInOut
          }).to($loader, 3, {
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeInOut
          }, 'start+=2').from($logo, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=4').from($aboutLink, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=5').from(prevArrow, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeIn
          }, 'start+=5.5').from(nextArrow, 3, {
            xPercent: 100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeIn
          }, 'start+=5.5').from($firstContent, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=6').staggerFrom($footerLinks, 1, {
            yPercent: 200,
            autoAlpha: 0,
            force3D: true,
            ease: Back.easeOut.config(1.5)
          }, .1, 'start+=6.5').to($firstFooterNavItem, 0.75, {
            width: '100%',
            ease: Expo.easeOut
          }, 'start+=6.75');
        }
      });
    }
  };

  var formModule = function formModule() {
    if (window.innerWidth < 768) {
      return;
    } else {
      if (document.querySelector('.wpforms-submit-container')) {
        var submitContainer = document.querySelector('.wpforms-submit-container');
        var submitBtn = document.querySelector('.wpforms-submit');
        submitContainer.insertAdjacentHTML('beforeend', "<svg id=\"submit-btn\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 96.54 32.49\">\n          <path class=\"cls-submit\" d=\"M.28,2.17c10.84,15.2,23.58,27,42.73,29.7C61.6,34.5,79.8,28.52,95.83,19.44c1-.58,1-2.54-.36-2.74a52.13,52.13,0,0,0-14.06-.33,1.5,1.5,0,0,0,0,3,35.52,35.52,0,0,1,11.7,3.1l-.31-2.35a87.19,87.19,0,0,1-9.24,9.78c-1.44,1.3.69,3.42,2.12,2.12a87.19,87.19,0,0,0,9.24-9.78,1.52,1.52,0,0,0-.3-2.36,39.85,39.85,0,0,0-13.21-3.51v3a49.15,49.15,0,0,1,13.27.22l-.36-2.74C79.19,25.42,62,31.26,44.44,29.05,25.78,26.7,13.39,15.42,2.87.66,1.75-.9-.85.6.28,2.17Z\"/>\n        </svg>");
        var submitPath = document.querySelector('.cls-submit');
        TweenMax.set(submitPath, {
          drawSVG: '0%'
        });
        submitBtn.addEventListener('mouseenter', function () {
          var submitTl = new TimelineMax();
          submitTl.to(submitPath, 2, {
            drawSVG: '100%',
            ease: Expo.easeOut
          }, 'enter').to(submitPath, 2, {
            fill: '#081121',
            ease: Expo.easeOut
          }, 'enter+=0.5');
        });
        submitBtn.addEventListener('mouseleave', function () {
          var submitTl = new TimelineMax();
          submitTl.to(submitPath, 2, {
            drawSVG: '0%',
            fill: 'none',
            ease: Expo.easeOut
          }, 'leave');
        });
      }
    }
  };

  var cursorModule = function cursorModule() {
    var clientX = -100;
    var clientY = -100;

    var initCursor = function initCursor() {
      document.addEventListener("mousemove", function (e) {
        clientX = e.clientX;
        clientY = e.clientY;
      });

      var render = function render() {
        TweenMax.set(innerCursor, {
          x: clientX,
          y: clientY
        });
        window.requestAnimationFrame(render);
      };

      window.requestAnimationFrame(render);
    };

    initCursor();
    var lastX = 0;
    var lastY = 0;
    var isStuck = false;
    var showCursor = false;
    var group;
    var stuckX;
    var stuckY;
    var fillOuterCursor;

    var initCanvas = function initCanvas() {
      var shapeBounds = {
        width: 75,
        height: 75
      };
      paper.setup(canvas);
      var strokeColor = 'rgba(60, 74, 83, 0.5)';
      var strokeWidth = 1;
      var segments = 8;
      var radius = 15;
      var noiseScale = 150;
      var noiseRange = 4;
      var isNoisy = false;
      var polygon = new paper.Path.RegularPolygon(new paper.Point(0, 0), segments, radius);
      polygon.strokeColor = strokeColor;
      polygon.strokeWidth = strokeWidth;
      polygon.smooth();
      group = new paper.Group([polygon]);
      group.applyMatrix = false;
      var noiseObjects = polygon.segments.map(function () {
        return new SimplexNoise();
      });
      var bigCoordinates = [];

      var lerp = function lerp(a, b, n) {
        return (1 - n) * a + n * b;
      };

      var map = function map(value, in_min, in_max, out_min, out_max) {
        return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
      };

      paper.view.onFrame = function (event) {
        lastX = lerp(lastX, clientX, 0.2);
        lastY = lerp(lastY, clientY, 0.2);
        group.position = new paper.Point(lastX, lastY);
      };
    };

    initCanvas();

    var initCursorHovers = function initCursorHovers() {
      var handleCursorMouseEnter = function handleCursorMouseEnter(e) {
        var navItem = e.currentTarget;
        var navItemBox = navItem.getBoundingClientRect();
        stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        isStuck = true;
      };

      var handleCursorMouseLeave = function handleCursorMouseLeave() {
        isStuck = false;
      };

      $links.forEach(function (link) {
        link.addEventListener("mouseenter", handleCursorMouseEnter);
        link.addEventListener("mouseleave", handleCursorMouseLeave);
      });
    };

    initCursorHovers();
  };

  var init = function init() {
    onePageScroll(".main", {
      sectionContainer: "section",
      easing: "cubic-bezier(0.50, 0, 0.50, 1)",
      animationTime: 750,
      pagination: true,
      updateURL: false,
      beforeMove: function beforeMove(index, currentSection) {
        var c_bg_1 = currentSection.firstElementChild; // console.log(c_bg_1);

        var c_bg_2 = c_bg_1.firstElementChild; // console.log(c_bg_2);

        var c_article = c_bg_2.firstElementChild; // console.log(c_article);

        var c_work_img = c_article.firstElementChild; // console.log(c_work_img);

        var c_svg = c_article.lastElementChild; // console.log(c_svg);

        var c_work = c_work_img.lastElementChild; // console.log(c_work);

        var c_work_text = c_work.firstElementChild; // console.log(c_work_text);

        var c_index = c_work_img.firstElementChild; // console.log(c_index);

        var allProgressBars = $footerNav.querySelectorAll('.pagination-progress');
        allProgressBars.forEach(function (bar) {
          TweenMax.to(bar, 1, {
            width: '0%',
            ease: Expo.easeInOut
          });
        });
        var beforeMoveTl = new TimelineMax();
        beforeMoveTl.set(c_bg_1, {
          xPercent: -100
        }).set(c_bg_2, {
          xPercent: -100
        }).set(c_article, {
          xPercent: -100
        }).set(c_svg, {
          xPercent: -200
        }).set(c_work_img, {
          scale: .75,
          autoAlpha: 0,
          xPercent: -100
        }).set(c_work, {
          autoAlpha: 0,
          yPercent: 50
        }).set(c_work_text, {
          autoAlpha: 0,
          xPercent: -25
        });
      },
      afterMove: function afterMove(index, currentSection) {
        var prevArrowInTl = new TimelineMax();
        prevArrowInTl.to(prevArrowSvg, 2, {
          drawSVG: '100%',
          ease: Expo.easeOut
        });
        var nextArrowInTl = new TimelineMax();
        nextArrowInTl.to(nextArrowSvg, 2, {
          drawSVG: '100%',
          ease: Expo.easeOut
        });
        var c_bg_1 = currentSection.firstElementChild; // console.log(c_bg_1);

        var c_bg_2 = c_bg_1.firstElementChild; // console.log(c_bg_2);

        var c_article = c_bg_2.firstElementChild; // console.log(c_article);

        var c_work_img = c_article.firstElementChild; // console.log(c_work_img);

        var c_svg = c_article.lastElementChild; // console.log(c_svg);

        var c_work = c_work_img.lastElementChild; // console.log(c_work);

        var c_work_text = c_work.firstElementChild; // console.log(c_work_text);

        var c_index = c_work_img.firstElementChild; // console.log(c_index);

        var currentLink = $footerNav.querySelector("a[data-index=\"".concat(index, "\"]"));
        var currentProgressBar = currentLink.previousSibling;
        var afterMoveTl = new TimelineMax();
        var afterMoveSplitText = new SplitText(c_index, {
          type: 'words,chars'
        });
        var chars = afterMoveSplitText.chars;
        afterMoveTl.to(c_bg_1, 1, {
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before').to(c_bg_2, 1, {
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=.25').to(c_article, 1, {
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=.5').to(c_svg, 1, {
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=1').to(c_work_img, 1.5, {
          scale: 1,
          autoAlpha: 1,
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=1').to(c_work, .5, {
          autoAlpha: 1,
          yPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=1.25').to(c_work_text, 1, {
          scale: 1,
          autoAlpha: 1,
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'before+=1.5').staggerFrom(chars, 1, {
          autoAlpha: 0,
          yPercent: -100,
          ease: Expo.easeOut
        }, 0.25, 'before+=1.75').to(currentProgressBar, 0.75, {
          width: '100%',
          ease: Expo.easeOut
        }, 'before+=.25');
      },
      loop: true,
      keyboard: true,
      responsiveFallback: false
    });
    var $footerNav = document.querySelector('.onepage-pagination');
    var $footerLinks = $footerNav.children;
    var $paginationLis = document.querySelectorAll('.onepage-pagination li');
    var $paginationLinks = document.querySelectorAll('.onepage-pagination li a');
    var $workIndices = document.querySelectorAll('.work-index');
    var $totalProgress = document.querySelector('.total-progress');

    function openWorkText(e) {
      e.preventDefault();
      var workText = this.parentElement;
      var workTitle = this;
      var openIcon = workTitle.lastElementChild;
      var workMain = workText.lastElementChild;
      var display = workText.getAttribute('data-display');

      if (display === 'closed') {
        workText.setAttribute('data-display', 'open');
        var expandWorkTextTl = new TimelineMax();
        expandWorkTextTl.to(workText, 1, {
          height: '100%',
          ease: Expo.easeOut
        }, 'open').to(openIcon, 1, {
          rotation: 45,
          ease: Expo.easeOut
        }, 'open').fromTo(workMain, 0.5, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true
        }, {
          display: 'block',
          yPercent: 0,
          autoAlpha: 1,
          force3D: true,
          ease: Expo.easeOut
        }, 'open+=0.5');
      }
    }

    function closeWorkText(e) {
      e.preventDefault();
      e.stopPropagation();
      var workBtn = this;
      var workTitle = this.parentElement;
      var workText = workTitle.parentElement;
      var workMain = workText.lastElementChild;
      var display = workText.getAttribute('data-display');

      if (display === 'closed') {
        workText.setAttribute('data-display', 'open');
        var expandWorkTextTl = new TimelineMax();
        expandWorkTextTl.to(workText, 1, {
          height: '100%',
          ease: Expo.easeOut
        }, 'open').to(workBtn, 1, {
          rotation: 45,
          ease: Expo.easeOut
        }, 'open').fromTo(workMain, 0.5, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true
        }, {
          display: 'block',
          yPercent: 0,
          autoAlpha: 1,
          force3D: true,
          ease: Expo.easeOut
        }, 'open+=0.5');
      } else if (display === 'open') {
        workText.setAttribute('data-display', 'closed');
        var hideWorkTextTl = new TimelineMax();
        hideWorkTextTl.to(workBtn, 1, {
          rotation: 0,
          ease: Expo.easeIn
        }, 'close').to(workMain, 0.5, {
          display: 'none',
          autoAlpha: 0,
          yPercent: 100,
          force3D: true,
          ease: Expo.easeIn
        }, 'close').to(workText, 1, {
          height: 'auto',
          ease: Expo.easeIn
        }, 'close+=0.5');
      }
    }

    $workTitles.forEach(function (title) {
      return title.addEventListener('click', openWorkText);
    });
    $workBtns.forEach(function (button) {
      return button.addEventListener('click', closeWorkText);
    });

    var hoverWorkItem = function hoverWorkItem(e) {
      var workItem = e.target;
      var text = e.target.lastElementChild;
      var title = text.firstElementChild;
      var openIcon = title.lastElementChild;
      var openIconSvg = openIcon.firstElementChild;
      var openIconPath = openIconSvg.firstElementChild;
      var hoverStatus = workItem.getAttribute('data-hovering');

      if (hoverStatus === 'no') {
        workItem.setAttribute('data-hovering', 'yes');
        var enterWorkItemTl = new TimelineMax();
        enterWorkItemTl.to(text, 1, {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          ease: Expo.easeOut
        }, 'start').to(title, 1, {
          padding: '50px 0',
          ease: Expo.easeInOut
        }, 'start').fromTo(openIcon, 0.5, {
          yPercent: 100,
          force3D: true
        }, {
          autoAlpha: 1,
          yPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'start').fromTo(openIconPath, 1, {
          drawSVG: '0%'
        }, {
          drawSVG: '100%',
          ease: Expo.easeIn
        }, 'start').fromTo(openIconPath, 1, {
          fill: 'none'
        }, {
          fill: '#081121',
          ease: Expo.easeInOut
        }, 'start+=0.5');
      } else if (hoverStatus === 'yes') {
        workItem.setAttribute('data-hovering', 'no');
        var leaveWorkItemTl = new TimelineMax();
        leaveWorkItemTl.to(text, 1, {
          backgroundColor: '#fff',
          ease: Expo.easeOut
        }, 'start').to(title, 1, {
          padding: '10px 0',
          ease: Expo.easeOut
        }, 'start').to(openIconPath, 1, {
          drawSVG: '0%',
          fill: 'none',
          ease: Expo.easeOut
        }, 'start');
      }
    };

    if (window.innerWidth > 768) {
      $workItems.forEach(function (item) {
        return item.addEventListener('mouseenter', hoverWorkItem);
      });
      $workItems.forEach(function (item) {
        return item.addEventListener('mouseleave', hoverWorkItem);
      });
    }

    prevArrow.addEventListener('click', function (e) {
      e.preventDefault();
      moveUp('.main');
      var prevArrowOutTl = new TimelineMax();
      prevArrowOutTl.fromTo(prevArrow, .5, {
        x: -10
      }, {
        x: 0,
        ease: Back.easeOut.config(1.7)
      }, 'sp');

      if (window.innerWidth > 768) {
        prevArrowOutTl.to(prevArrowSvg, 1, {
          drawSVG: '0%',
          fill: 'none',
          ease: Expo.easeOut
        }, 'sp+=.5');
      }
    });
    nextArrow.addEventListener('click', function (e) {
      e.preventDefault();
      moveDown('.main');
      var nextArrowOutTl = new TimelineMax();
      nextArrowOutTl.fromTo(nextArrow, .5, {
        x: 10
      }, {
        x: 0,
        ease: Back.easeOut.config(1.7)
      }, 'sn');

      if (window.innerWidth > 768) {
        nextArrowOutTl.to(nextArrowSvg, 1, {
          drawSVG: '0%',
          fill: 'none',
          ease: Expo.easeOut
        }, 'sn+=.5');
      }
    });

    if (window.innerWidth > 768) {
      arrowPaths.forEach(function (path) {
        path.parentElement.addEventListener('mouseenter', function () {
          var arrowMouseEnterTl = new TimelineMax();
          arrowMouseEnterTl.to(path, 1, {
            scale: 0.95,
            fill: '#081121',
            force3D: true,
            ease: Expo.easeOut
          }, 'en').to(path, 1, {
            drawSVG: '73%',
            ease: Expo.easeOut
          }, 'en');
        });
        path.parentElement.addEventListener('mouseleave', function () {
          var arrowMouseLeaveTl = new TimelineMax();
          arrowMouseLeaveTl.to(path, 1, {
            scale: 1,
            fill: 'none',
            force3D: true,
            ease: Expo.easeOut
          }, 'en').to(path, 1, {
            drawSVG: '100%',
            ease: Back.easeOut.config(1.7)
          }, 'en');
        });
      });
    }

    $footerNav.insertAdjacentHTML('afterend', "<div class=\"total-progress\"></div>");
    $footerNav.insertAdjacentHTML('afterend', "<div class=\"current-progress\"></div>");

    function resetProgress(e) {
      var cProgress = this.nextElementSibling;
      var tProgress = cProgress.nextElementSibling;
      TweenMax.to(cProgress, 1, {
        width: 0,
        ease: Expo.easeInOut
      });
      TweenMax.to(tProgress, 2, {
        width: 0,
        ease: Expo.easeInOut
      });
    }

    if (window.innerWidth > 768) {
      $footerNav.addEventListener('mouseleave', resetProgress);
    }

    $paginationLinks.forEach(function (link) {
      var links = $paginationLinks.length;
      var percentPerLink = 100 / links;

      if (links < 10) {
        link.innerHTML = link.getAttribute('data-index') + '/0' + links;
      } else {
        link.innerHTML = link.getAttribute('data-index') + '/' + links;
      }

      if (window.innerWidth > 768) {
        link.addEventListener('mouseenter', function (e) {
          var currentLink = e.target;
          var currentLi = currentLink.parentElement;
          var index = currentLink.getAttribute('data-index');
          var currentProgressBar = currentLi.firstElementChild;
          var pagination = currentLi.parentElement;
          var cProgress = pagination.nextElementSibling;
          var tProgress = cProgress.nextElementSibling;
          var targetLength = "".concat(percentPerLink * index, "%");
          var activeIndex = pagination.querySelector('.active').getAttribute('data-index');
          var currentLength = "".concat(percentPerLink * activeIndex, "%");

          if (index < activeIndex) {
            TweenMax.to(cProgress, 2, {
              width: "".concat(targetLength),
              ease: Expo.easeOut
            });
            TweenMax.to(tProgress, 1, {
              width: "".concat(targetLength),
              ease: Expo.easeOut
            });
          } else {
            TweenMax.to(cProgress, 2, {
              width: "".concat(currentLength),
              ease: Expo.easeOut
            });
            TweenMax.to(tProgress, 1, {
              width: "".concat(targetLength),
              ease: Expo.easeOut
            });
          }
        });
      }
    });
    $paginationLis.forEach(function (li) {
      var link = li.firstElementChild;
      var index = link.getAttribute('data-index');
      li.insertAdjacentHTML('afterbegin', "<div class=\"pagination-progress\"></div>");
      link.removeAttribute('href');
    });
    $workIndices.forEach(function (index) {
      var indices = $workIndices.length;
      var section = index.parentElement.parentElement.parentElement.parentElement.parentElement;

      if (indices < 10) {
        index.innerHTML = section.getAttribute('data-index') + '/0' + indices;
      } else {
        index.innerHTML = section.getAttribute('data-index') + '/' + indices;
      }
    });

    var toggleState = function toggleState(elem, attr, a, b) {
      var currentElement = document.querySelector("".concat(elem));
      currentElement.setAttribute("".concat(attr), currentElement.getAttribute("".concat(attr)) === a ? b : a);
    };

    $contact.addEventListener('click', function (e) {
      e.preventDefault();
      var showFormTl = new TimelineMax();
      showFormTl.to($aboutLink, .25, {
        autoAlpha: 0,
        ease: Expo.easeOut
      }, 'enterf').to($aboutInner, 2, {
        autoAlpha: 0,
        xPercent: 100,
        force3D: true,
        ease: Expo.easeOut
      }, 'enterf').fromTo($contactPage, 2, {
        autoAlpha: 0,
        xPercent: -100,
        force3D: true
      }, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: true,
        ease: Expo.easeOut
      }, 'enterf+=.25').fromTo($hideFormArrow, 2, {
        autoAlpha: 0,
        xPercent: 65,
        force3D: true
      }, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: true,
        ease: Expo.easeOut
      }, 'enterf+=.45').fromTo($hideFormArrowPath, 2, {
        drawSVG: '0%'
      }, {
        drawSVG: '100%',
        ease: Expo.easeOut
      }, 'enterf+=.5');
    });
    $hideFormArrow.addEventListener('click', function (e) {
      e.preventDefault();
      var hideFormTl = new TimelineMax();
      hideFormTl.to($aboutLink, .25, {
        autoAlpha: 1,
        ease: Expo.easeOut
      }, 'leavef').to($hideFormArrowPath, .25, {
        fill: 'none',
        ease: Expo.easeOut
      }, 'leavef').to($hideFormArrowPath, .25, {
        drawSVG: '0%',
        ease: Expo.easeOut
      }, 'leavef').to($contactPage, 1, {
        autoAlpha: 0,
        xPercent: -100,
        force3D: true,
        ease: Expo.easeInOut
      }, 'leavef+=.25').to($aboutInner, 1, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: true,
        ease: Expo.easeInOut
      }, 'leavef+=.25');
    });

    if (window.innerWidth > 768) {
      $aboutPageLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function (e) {
          var link = e.target;
          var linkSplitText = new SplitText(link, {
            type: 'words,chars'
          });
          var chars = linkSplitText.chars;
          TweenMax.staggerFrom(chars, 0.2, {
            scale: 0,
            x: '-5',
            ease: Back.easeOut.config(1.7)
          }, 0.03);
        });
      });
    }

    $aboutLink.addEventListener('click', function (e) {
      toggleState('.about__page', 'menu-status', 'closed', 'open');
      e.preventDefault();

      if ($aboutPage.getAttribute('menu-status') === 'open') {
        var aboutTl = new TimelineMax();
        aboutTl.staggerTo($footerLinks, 2, {
          yPercent: 200,
          force3D: true,
          ease: Expo.easeOut
        }, .08, 'enter').to($footerNav, 2, {
          backgroundColor: '#fff',
          ease: Expo.easeOut
        }, 'enter').fromTo($aboutPage, 2, {
          autoAlpha: 0,
          xPercent: -100,
          force3D: true
        }, {
          autoAlpha: 1,
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'enter').fromTo($aboutBg, 2, {
          autoAlpha: 0,
          xPercent: -50,
          force3D: true
        }, {
          autoAlpha: 1,
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'enter+=.15').fromTo($aboutInner, 2, {
          autoAlpha: 0,
          xPercent: -50,
          force3D: true
        }, {
          autoAlpha: 1,
          xPercent: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'enter+=.25').fromTo($exitAbout, 2, {
          drawSVG: '0%'
        }, {
          drawSVG: '100%',
          ease: Expo.easeOut
        }, 'enter+=1.25');
      } else if ($aboutPage.getAttribute('menu-status') === 'closed') {
        var backTl1 = new TimelineMax();
        backTl1.staggerTo($footerLinks, 1, {
          yPercent: 0,
          force3D: true,
          ease: Back.easeOut.config(1.5)
        }, .1, 'leave+=.25').to($exitAbout, .25, {
          drawSVG: '0%',
          ease: Expo.easeOut
        }, 'leave').to($aboutBg, 1, {
          autoAlpha: 0,
          xPercent: -100,
          force3D: true,
          ease: Expo.easeInOut
        }, 'leave+=.25').to($aboutPage, 1, {
          autoAlpha: 0,
          xPercent: -100,
          force3D: true,
          ease: Expo.easeInOut
        }, 'leave+=.25').to($footerNav, 1, {
          backgroundColor: 'transparent',
          ease: Expo.easeOut
        }, 'leave+=.5');
      }
    });
    $aboutClose.addEventListener('click', function (e) {
      toggleState('.about__page', 'menu-status', 'closed', 'open');
      e.preventDefault();
      var backTl = new TimelineMax();
      backTl.staggerTo($footerLinks, 1, {
        yPercent: 0,
        force3D: true,
        ease: Back.easeOut.config(1.5)
      }, .1, 'leave+=.25').to($exitAbout, .25, {
        drawSVG: '0%',
        fill: 'none',
        ease: Expo.easeOut
      }, 'leave').to($aboutBg, 1, {
        autoAlpha: 0,
        xPercent: 100,
        force3D: true,
        ease: Expo.easeInOut
      }, 'leave+=.25').to($aboutPage, 1, {
        autoAlpha: 0,
        xPercent: 100,
        force3D: true,
        ease: Expo.easeInOut
      }, 'leave+=.25').to($footerNav, 1, {
        backgroundColor: 'transparent',
        ease: Expo.easeOut
      }, 'leave+=.5');
    });
    $aboutClose.addEventListener('mouseenter', function () {
      if (window.innerWidth < 768) {
        return;
      } else {
        var aboutCloseHoverTl = new TimelineMax();
        aboutCloseHoverTl.to($exitAbout, 1, {
          fill: '#081121',
          scale: 0.95,
          force3D: true,
          ease: Back.easeOut.config(1.7)
        });
      }
    });
    $aboutClose.addEventListener('mouseleave', function () {
      if (window.innerWidth < 768) {
        return;
      } else {
        var aboutCloseHoverTl = new TimelineMax();
        aboutCloseHoverTl.to($exitAbout, 1, {
          fill: 'none',
          scale: 1,
          force3D: true,
          ease: Back.easeOut.config(1.7)
        });
      }
    });

    function highlightLink(e) {
      var $highlight = document.createElement('span');
      $highlight.classList.add('link-highlight');
      this.append($highlight);
      var highlighLinkTl = new TimelineMax();
      highlighLinkTl.to($highlight, 1, {
        width: '100%',
        ease: Expo.easeOut
      });
    }

    function unhighlightLink(e) {
      var highlight = this.querySelector('.link-highlight');
      highlight.remove();
    }

    if (window.innerWidth > 768) {
      $links.forEach(function (link) {
        return link.addEventListener('mouseenter', highlightLink);
      });
      $links.forEach(function (link) {
        return link.addEventListener('mouseleave', unhighlightLink);
      });
    }

    loaderModule();
    formModule();
    cursorModule();
  };

  return {
    init: init
  };
}();

window.onload = function () {
  app.init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImlubmVyQ3Vyc29yIiwiY2FudmFzIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImluaXRDdXJzb3JIb3ZlcnMiLCJoYW5kbGVDdXJzb3JNb3VzZUVudGVyIiwibmF2SXRlbSIsImN1cnJlbnRUYXJnZXQiLCJuYXZJdGVtQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiTWF0aCIsInJvdW5kIiwibGVmdCIsInRvcCIsImhhbmRsZUN1cnNvck1vdXNlTGVhdmUiLCJsaW5rIiwiaW5pdCIsIm9uZVBhZ2VTY3JvbGwiLCJzZWN0aW9uQ29udGFpbmVyIiwiZWFzaW5nIiwiYW5pbWF0aW9uVGltZSIsInBhZ2luYXRpb24iLCJ1cGRhdGVVUkwiLCJiZWZvcmVNb3ZlIiwiaW5kZXgiLCJjdXJyZW50U2VjdGlvbiIsImNfYmdfMSIsImNfYmdfMiIsImNfYXJ0aWNsZSIsImNfd29ya19pbWciLCJjX3N2ZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJjX3dvcmsiLCJjX3dvcmtfdGV4dCIsImNfaW5kZXgiLCJhbGxQcm9ncmVzc0JhcnMiLCJiYXIiLCJiZWZvcmVNb3ZlVGwiLCJzY2FsZSIsImFmdGVyTW92ZSIsInByZXZBcnJvd0luVGwiLCJuZXh0QXJyb3dJblRsIiwiY3VycmVudExpbmsiLCJjdXJyZW50UHJvZ3Jlc3NCYXIiLCJwcmV2aW91c1NpYmxpbmciLCJhZnRlck1vdmVUbCIsImFmdGVyTW92ZVNwbGl0VGV4dCIsIlNwbGl0VGV4dCIsInR5cGUiLCJjaGFycyIsImxvb3AiLCJrZXlib2FyZCIsInJlc3BvbnNpdmVGYWxsYmFjayIsIiRwYWdpbmF0aW9uTGlzIiwiJHBhZ2luYXRpb25MaW5rcyIsIiR3b3JrSW5kaWNlcyIsIiR0b3RhbFByb2dyZXNzIiwib3BlbldvcmtUZXh0IiwicHJldmVudERlZmF1bHQiLCJ3b3JrVGV4dCIsInBhcmVudEVsZW1lbnQiLCJ3b3JrVGl0bGUiLCJvcGVuSWNvbiIsIndvcmtNYWluIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZXhwYW5kV29ya1RleHRUbCIsInJvdGF0aW9uIiwiY2xvc2VXb3JrVGV4dCIsInN0b3BQcm9wYWdhdGlvbiIsIndvcmtCdG4iLCJoaWRlV29ya1RleHRUbCIsInRpdGxlIiwiYnV0dG9uIiwiaG92ZXJXb3JrSXRlbSIsIndvcmtJdGVtIiwidGFyZ2V0IiwidGV4dCIsIm9wZW5JY29uU3ZnIiwib3Blbkljb25QYXRoIiwiaG92ZXJTdGF0dXMiLCJlbnRlcldvcmtJdGVtVGwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwibGVhdmVXb3JrSXRlbVRsIiwiaXRlbSIsIm1vdmVVcCIsInByZXZBcnJvd091dFRsIiwibW92ZURvd24iLCJuZXh0QXJyb3dPdXRUbCIsInBhdGgiLCJhcnJvd01vdXNlRW50ZXJUbCIsImFycm93TW91c2VMZWF2ZVRsIiwicmVzZXRQcm9ncmVzcyIsImNQcm9ncmVzcyIsIm5leHRFbGVtZW50U2libGluZyIsInRQcm9ncmVzcyIsImxpbmtzIiwicGVyY2VudFBlckxpbmsiLCJpbm5lckhUTUwiLCJjdXJyZW50TGkiLCJ0YXJnZXRMZW5ndGgiLCJhY3RpdmVJbmRleCIsImN1cnJlbnRMZW5ndGgiLCJsaSIsInJlbW92ZUF0dHJpYnV0ZSIsImluZGljZXMiLCJzZWN0aW9uIiwidG9nZ2xlU3RhdGUiLCJlbGVtIiwiYXR0ciIsImN1cnJlbnRFbGVtZW50Iiwic2hvd0Zvcm1UbCIsImhpZGVGb3JtVGwiLCJsaW5rU3BsaXRUZXh0IiwiYWJvdXRUbCIsInN0YWdnZXJUbyIsImJhY2tUbDEiLCJiYWNrVGwiLCJhYm91dENsb3NlSG92ZXJUbCIsImhpZ2hsaWdodExpbmsiLCIkaGlnaGxpZ2h0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZCIsImhpZ2hsaWdoTGlua1RsIiwidW5oaWdobGlnaHRMaW5rIiwiaGlnaGxpZ2h0IiwicmVtb3ZlIiwib25sb2FkIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLEdBQUcsR0FBSSxZQUFZO0FBRXhCLE1BQU1DLFFBQVEsR0FBR0MsV0FBVyxDQUFDQyxPQUE3QjtBQUNBLE1BQU1DLFdBQVcsdURBQWpCO0FBQ0MsTUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaEI7QUFDRCxNQUFNQyxVQUFVLEdBQUdGLFFBQVEsQ0FBQ0MsYUFB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SjtBQUFBLE9BQW5CO0FBQ0Q7O0FBRUR6TyxJQUFBQSxZQUFZO0FBQ1orQyxJQUFBQSxVQUFVO0FBQ1pVLElBQUFBLFlBQVk7QUFDWCxHQTNZRDs7QUE2WUEsU0FBTztBQUNMaUUsSUFBQUEsSUFBSSxFQUFFQTtBQURELEdBQVA7QUFHRCxDQWxtQlcsRUFBWjs7QUFvbUJBMUUsTUFBTSxDQUFDNEwsTUFBUCxHQUFnQixZQUFNO0FBQ3BCclIsRUFBQUEsR0FBRyxDQUFDbUssSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCAkc2l0ZXVybCA9IEVMWVNTRVJPTUVPLnNpdGV1cmw7XG5cdGNvbnN0ICRkZWZhdWx0SW1nID0gYC93cC1jb250ZW50L3RoZW1lcy9ibGFua3NsYXRlL2Rpc3QvaW1nL2RlZmF1bHQucG5nYDtcbiAgY29uc3QgJGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKTtcblx0Y29uc3QgJGxvYWRlckdJRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJHSUYnKTtcbiAgY29uc3QgJGxvYWRlclNWRyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJTVkcnKTtcbiAgY29uc3QgJG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gIGNvbnN0ICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgY29uc3QgJGxvZ28gPSAkaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RTZWN0aW9uID0gJG1haW4uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdENvbnRlbnQgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJGFib3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICBjb25zdCAkYWJvdXRDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fY2xvc2UnKTtcbiAgY29uc3QgJGFib3V0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fcGFnZScpO1xuICBjb25zdCAkYWJvdXRCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1iZycpO1xuICBjb25zdCAkYWJvdXRJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1pbm5lcicpO1xuICBjb25zdCAkZXhpdEFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXRBYm91dCcpO1xuICBjb25zdCAkY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG4gIGNvbnN0ICRjb250YWN0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1mb3JtLWFycm93Jyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlRm9ybUFycm93Jyk7XG4gIGNvbnN0IGFycm93UGF0aHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xzLWFycm93Jyk7XG4gIGNvbnN0IHByZXZBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1iYWNrJyk7XG4gIGNvbnN0IG5leHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1uZXh0Jyk7XG4gIGNvbnN0IHByZXZBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2QXJyb3cnKTtcbiAgY29uc3QgbmV4dEFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRBcnJvdycpO1xuICBjb25zdCAkd29ya0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICBjb25zdCAkd29ya1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10ZXh0Jyk7XG4gIGNvbnN0ICR3b3JrVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGl0bGUnKTtcbiAgY29uc3QgJHdvcmtCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstYnRuJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cdGNvbnN0IGlubmVyQ3Vyc29yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLXNtYWxsXCIpO1xuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tY2FudmFzXCIpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHQgIH07XG5cdFx0ICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cdFx0fTtcblx0XHRpbml0Q3Vyc29yKCk7XG5cblx0XHRsZXQgbGFzdFggPSAwO1xuXHRcdGxldCBsYXN0WSA9IDA7XG5cdFx0bGV0IGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRsZXQgc2hvd0N1cnNvciA9IGZhbHNlO1xuXHRcdGxldCBncm91cDtcblx0XHRsZXQgc3R1Y2tYO1xuXHRcdGxldCBzdHVja1k7XG5cdFx0bGV0IGZpbGxPdXRlckN1cnNvcjtcblx0XHRjb25zdCBpbml0Q2FudmFzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcGVCb3VuZHMgPSB7XG5cdFx0XHRcdHdpZHRoOiA3NSxcblx0XHRcdFx0aGVpZ2h0OiA3NSxcblx0XHRcdH07XG5cdFx0XHRwYXBlci5zZXR1cChjYW52YXMpO1xuXHRcdFx0Y29uc3Qgc3Ryb2tlQ29sb3IgPSAncmdiYSg2MCwgNzQsIDgzLCAwLjUpJztcblx0XHRcdGNvbnN0IHN0cm9rZVdpZHRoID0gMTtcblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gODtcblx0XHRcdGNvbnN0IHJhZGl1cyA9IDE1O1xuXHRcdFx0Y29uc3Qgbm9pc2VTY2FsZSA9IDE1MDtcblx0XHRcdGNvbnN0IG5vaXNlUmFuZ2UgPSA0O1xuXHRcdFx0bGV0IGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHBvbHlnb24gPSBuZXcgcGFwZXIuUGF0aC5SZWd1bGFyUG9seWdvbihcblx0XHRcdFx0bmV3IHBhcGVyLlBvaW50KDAsMCksXG5cdFx0XHRcdHNlZ21lbnRzLFxuXHRcdFx0XHRyYWRpdXMsXG5cdFx0XHQpO1xuXHRcdFx0cG9seWdvbi5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xuICBcdFx0cG9seWdvbi5zdHJva2VXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICBcdFx0cG9seWdvbi5zbW9vdGgoKTtcbiAgXHRcdGdyb3VwID0gbmV3IHBhcGVyLkdyb3VwKFtwb2x5Z29uXSk7XG4gIFx0XHRncm91cC5hcHBseU1hdHJpeCA9IGZhbHNlO1xuXHRcdFx0Y29uc3Qgbm9pc2VPYmplY3RzID0gcG9seWdvbi5zZWdtZW50cy5tYXAoKCkgPT4gbmV3IFNpbXBsZXhOb2lzZSgpKTtcbiAgXHRcdGxldCBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0Y29uc3QgbGVycCA9IChhLCBiLCBuKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoMSAtIG4pICogYSArIG4gKiBiO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IG1hcCA9ICh2YWx1ZSwgaW5fbWluLCBpbl9tYXgsIG91dF9taW4sIG91dF9tYXgpID0+IHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoKHZhbHVlIC0gaW5fbWluKSAqIChvdXRfbWF4IC0gb3V0X21pbikpIC8gKGluX21heCAtIGluX21pbikgKyBvdXRfbWluXG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIudmlldy5vbkZyYW1lID0gZXZlbnQgPT4ge1xuXHRcdFx0XHRsYXN0WCA9IGxlcnAobGFzdFgsIGNsaWVudFgsIDAuMik7XG5cdFx0XHRcdGxhc3RZID0gbGVycChsYXN0WSwgY2xpZW50WSwgMC4yKTtcblx0XHRcdFx0Z3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aW5pdENhbnZhcygpO1xuXG5cdFx0Y29uc3QgaW5pdEN1cnNvckhvdmVycyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGhhbmRsZUN1cnNvck1vdXNlRW50ZXIgPSBlID0+IHtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbSA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbUJveCA9IG5hdkl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdHN0dWNrWCA9IE1hdGgucm91bmQobmF2SXRlbUJveC5sZWZ0ICsgbmF2SXRlbUJveC53aWR0aCAvIDIpO1xuXHRcdFx0XHRzdHVja1kgPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gudG9wICsgbmF2SXRlbUJveC5oZWlnaHQgLyAyKTtcblx0XHRcdFx0aXNTdHVjayA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQ3Vyc29yTW91c2VMZWF2ZSA9ICgpID0+IHtcblx0XHRcdFx0aXNTdHVjayA9IGZhbHNlO1xuXHRcdFx0fTtcblx0XHRcdCRsaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUN1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUN1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdGluaXRDdXJzb3JIb3ZlcnMoKTtcblxuXG5cblxuXG5cblx0fVxuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICBvbmVQYWdlU2Nyb2xsKFwiLm1haW5cIiwge1xuICAgICAgc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuNTAsIDAsIDAuNTAsIDEpXCIsXG4gICAgICBhbmltYXRpb25UaW1lOiA3NTAsXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBhbGxQcm9ncmVzc0JhcnMgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uLXByb2dyZXNzJyk7XG4gICAgICAgIGFsbFByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgVHdlZW5NYXgudG8oYmFyLCAxLCB7d2lkdGg6JzAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZm9yZU1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGJlZm9yZU1vdmVUbFxuICAgICAgICAgICAgLnNldChjX2JnXzEsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYmdfMiwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19hcnRpY2xlLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3N2Zywge3hQZXJjZW50Oi0yMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfaW1nLCB7c2NhbGU6Ljc1LCBhdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29yaywge2F1dG9BbHBoYTowLCB5UGVyY2VudDo1MH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya190ZXh0LCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0yNX0pXG4gICAgICAgICAgICA7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yKGBhW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpbmsucHJldmlvdXNTaWJsaW5nO1xuXG4gICAgICAgIGxldCBhZnRlck1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBsZXQgYWZ0ZXJNb3ZlU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChjX2luZGV4LCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgIGxldCBjaGFycyA9IGFmdGVyTW92ZVNwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICBhZnRlck1vdmVUbFxuICAgICAgICAgICAgLnRvKGNfYmdfMSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZScpXG4gICAgICAgICAgICAudG8oY19iZ18yLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKVxuICAgICAgICAgICAgLnRvKGNfYXJ0aWNsZSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjUnKVxuICAgICAgICAgICAgLnRvKGNfc3ZnLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmtfaW1nLCAxLjUsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmssIC41LCB7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS4yNScpXG4gICAgICAgICAgICAudG8oY193b3JrX3RleHQsIDEsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjUnKVxuICAgICAgICAgICAgLnN0YWdnZXJGcm9tKGNoYXJzLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50Oi0xMDAsIGVhc2U6IEV4cG8uZWFzZU91dH0sIDAuMjUsICdiZWZvcmUrPTEuNzUnKVxuICAgICAgICAgICAgLnRvKGN1cnJlbnRQcm9ncmVzc0JhciwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1Jyk7XG4gICAgICB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGknKTtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG4gICAgY29uc3QgJHdvcmtJbmRpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstaW5kZXgnKTtcbiAgICBjb25zdCAkdG90YWxQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3RhbC1wcm9ncmVzcycpO1xuXG4gICAgZnVuY3Rpb24gb3BlbldvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGl0bGUgPSB0aGlzO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8ob3Blbkljb24sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VXb3JrVGV4dChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgbGV0IHdvcmtCdG4gPSB0aGlzO1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHdvcmtUaXRsZS5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBkaXNwbGF5ID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnY2xvc2VkJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG4gICAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZXhwYW5kV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41JylcbiAgICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoZGlzcGxheSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ2Nsb3NlZCcpO1xuICAgICAgICBsZXQgaGlkZVdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBoaWRlV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjowLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZScpXG4gICAgICAgICAgICAudG8od29ya01haW4sIDAuNSwge2Rpc3BsYXk6J25vbmUnLCBhdXRvQWxwaGE6MCwgeVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonYXV0bycsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfVxuICAgIH1cblxuICAgICR3b3JrVGl0bGVzLmZvckVhY2godGl0bGUgPT4gdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuV29ya1RleHQpKTtcbiAgICAkd29ya0J0bnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXb3JrVGV4dCkpO1xuXG4gICAgY29uc3QgaG92ZXJXb3JrSXRlbSA9IChlKSA9PiB7XG4gICAgICBsZXQgd29ya0l0ZW0gPSBlLnRhcmdldDtcbiAgICAgIGxldCB0ZXh0ID0gZS50YXJnZXQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB0aXRsZSA9IHRleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB0aXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uU3ZnID0gb3Blbkljb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25QYXRoID0gb3Blbkljb25TdmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaG92ZXJTdGF0dXMgPSB3b3JrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnKTtcbiAgICAgIGlmIChob3ZlclN0YXR1cyA9PT0gJ25vJykge1xuICAgICAgICB3b3JrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnLCAneWVzJyk7XG4gICAgICAgIGxldCBlbnRlcldvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBlbnRlcldvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOidyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzUwcHggMCcsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb24sIDAuNSwge3lQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlfSx7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDogJ25vbmUnfSx7ZmlsbDonIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0wLjUnKTtcbiAgICAgIH0gZWxzZSBpZiAoaG92ZXJTdGF0dXMgPT09ICd5ZXMnKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICdubycpO1xuICAgICAgICBsZXQgbGVhdmVXb3JrSXRlbVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbGVhdmVXb3JrSXRlbVRsXG4gICAgICAgICAgICAudG8odGV4dCwgMSwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8odGl0bGUsIDEsIHtwYWRkaW5nOicxMHB4IDAnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgIH1cblxuICAgIHByZXZBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlVXAoJy5tYWluJyk7XG4gICAgICBjb25zdCBwcmV2QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBwcmV2QXJyb3dPdXRUbC5mcm9tVG8ocHJldkFycm93LCAuNSwge3g6LTEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc3AnKVxuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgcHJldkFycm93T3V0VGwudG8ocHJldkFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NwKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlRG93bignLm1haW4nKTtcbiAgICAgIGNvbnN0IG5leHRBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIG5leHRBcnJvd091dFRsLmZyb21UbyhuZXh0QXJyb3csIC41LCB7eDoxMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NuJyk7XG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBuZXh0QXJyb3dPdXRUbC50byhuZXh0QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc24rPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICBhcnJvd1BhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUVudGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUVudGVyVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjAuOTUsIGZpbGw6JyMwODExMjEnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOic3MyUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlTGVhdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlTGVhdmVUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MSwgZmlsbDonbm9uZScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwidG90YWwtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cImN1cnJlbnQtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0UHJvZ3Jlc3MoZSkge1xuICAgICAgbGV0IGNQcm9ncmVzcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDEsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAyLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRmb290ZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHJlc2V0UHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgICRwYWdpbmF0aW9uTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxldCBsaW5rcyA9ICRwYWdpbmF0aW9uTGlua3MubGVuZ3RoO1xuICAgICAgbGV0IHBlcmNlbnRQZXJMaW5rID0gMTAwIC8gbGlua3M7XG4gICAgICBpZiAobGlua3MgPCAxMCkge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGxpbmtzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGxpbmtzO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaSA9IGN1cnJlbnRMaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGluZGV4ID0gY3VycmVudExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGN1cnJlbnRMaS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBjUHJvZ3Jlc3MgPSBwYWdpbmF0aW9uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdGFyZ2V0TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqaW5kZXh9JWA7XG4gICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayphY3RpdmVJbmRleH0lYDtcblxuICAgICAgICAgIGlmIChpbmRleCA8IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke2N1cnJlbnRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRwYWdpbmF0aW9uTGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgbGV0IGxpbmsgPSBsaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBpbmRleCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgfSk7XG5cbiAgICAkd29ya0luZGljZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBsZXQgaW5kaWNlcyA9ICR3b3JrSW5kaWNlcy5sZW5ndGg7XG4gICAgICBsZXQgc2VjdGlvbiA9IGluZGV4LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmIChpbmRpY2VzIDwgMTApIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBpbmRpY2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGluZGljZXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9IChlbGVtLCBhdHRyLCBhLCBiKSA9PiB7XG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2VsZW19YCk7XG4gICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKGAke2F0dHJ9YCwgY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKGAke2F0dHJ9YCkgPT09IGEgPyBiIDogYSk7XG4gICAgfVxuXG4gICAgJGNvbnRhY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHNob3dGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHNob3dGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLmZyb21UbygkY29udGFjdFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS4yNScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3csIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6NjUsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNDUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93UGF0aCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRoaWRlRm9ybUFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBoaWRlRm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBoaWRlRm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2ZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRjb250YWN0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAxLCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRhYm91dFBhZ2VMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGxldCBsaW5rU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChsaW5rLCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBsaW5rU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oY2hhcnMsIDAuMiwge3NjYWxlOjAsIHg6Jy01JywgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgMC4wMyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdvcGVuJykge1xuICAgICAgICBsZXQgYWJvdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBhYm91dFRsXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDIsIHt5UGVyY2VudDoyMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgLjA4LCAnZW50ZXInKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAyLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRCZywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4xNScpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4yNScpXG4gICAgICAgICAgLmZyb21UbygkZXhpdEFib3V0LCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9MS4yNScpXG4gICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgbGV0IGJhY2tUbDEgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYmFja1RsMVxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41JylcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGJhY2tUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgYmFja1RsXG4gICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOicjMDgxMTIxJywgc2NhbGU6MC45NSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonbm9uZScsIHNjYWxlOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoaWdobGlnaHRMaW5rKGUpIHtcbiAgICAgIGxldCAkaGlnaGxpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgJGhpZ2hsaWdodC5jbGFzc0xpc3QuYWRkKCdsaW5rLWhpZ2hsaWdodCcpO1xuICAgICAgdGhpcy5hcHBlbmQoJGhpZ2hsaWdodCk7XG4gICAgICBsZXQgaGlnaGxpZ2hMaW5rVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgaGlnaGxpZ2hMaW5rVGxcbiAgICAgICAgICAudG8oJGhpZ2hsaWdodCwgMSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSlcbiAgICAgICAgICA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5oaWdobGlnaHRMaW5rKGUpIHtcbiAgICAgIGxldCBoaWdobGlnaHQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWhpZ2hsaWdodCcpO1xuICAgICAgaGlnaGxpZ2h0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBoaWdobGlnaHRMaW5rKSk7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVuaGlnaGxpZ2h0TGluaykpO1xuICAgIH1cblxuICAgIGxvYWRlck1vZHVsZSgpO1xuICAgIGZvcm1Nb2R1bGUoKTtcblx0XHRjdXJzb3JNb2R1bGUoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFxuICB9XG59KSgpO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBhcHAuaW5pdCgpO1xufVxuIl19
