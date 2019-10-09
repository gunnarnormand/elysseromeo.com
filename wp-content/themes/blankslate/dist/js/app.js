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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImlubmVyQ3Vyc29yIiwiY2FudmFzIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwic2NhbGUiLCJhZnRlck1vdmUiLCJwcmV2QXJyb3dJblRsIiwibmV4dEFycm93SW5UbCIsImN1cnJlbnRMaW5rIiwiY3VycmVudFByb2dyZXNzQmFyIiwicHJldmlvdXNTaWJsaW5nIiwiYWZ0ZXJNb3ZlVGwiLCJhZnRlck1vdmVTcGxpdFRleHQiLCJTcGxpdFRleHQiLCJ0eXBlIiwiY2hhcnMiLCJsb29wIiwia2V5Ym9hcmQiLCJyZXNwb25zaXZlRmFsbGJhY2siLCIkcGFnaW5hdGlvbkxpcyIsIiRwYWdpbmF0aW9uTGlua3MiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rIiwibGlua3MiLCJwZXJjZW50UGVyTGluayIsImlubmVySFRNTCIsImN1cnJlbnRMaSIsInRhcmdldExlbmd0aCIsImFjdGl2ZUluZGV4IiwiY3VycmVudExlbmd0aCIsImxpIiwicmVtb3ZlQXR0cmlidXRlIiwiaW5kaWNlcyIsInNlY3Rpb24iLCJ0b2dnbGVTdGF0ZSIsImVsZW0iLCJhdHRyIiwiY3VycmVudEVsZW1lbnQiLCJzaG93Rm9ybVRsIiwiaGlkZUZvcm1UbCIsImxpbmtTcGxpdFRleHQiLCJhYm91dFRsIiwic3RhZ2dlclRvIiwiYmFja1RsMSIsImJhY2tUbCIsImFib3V0Q2xvc2VIb3ZlclRsIiwiaGlnaGxpZ2h0TGluayIsIiRoaWdobGlnaHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwiaGlnaGxpZ2hMaW5rVGwiLCJ1bmhpZ2hsaWdodExpbmsiLCJoaWdobGlnaHQiLCJyZW1vdmUiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsR0FBRyxHQUFJLFlBQVk7QUFFeEIsTUFBTUMsUUFBUSxHQUFHQyxXQUFXLENBQUNDLE9BQTdCO0FBQ0EsTUFBTUMsV0FBVyx1REFBakI7QUFDQyxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixDQUFoQjtBQUNELE1BQU1DLFVBQVUsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQW5CO0FBQ0MsTUFBTUUsVUFBVSxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbkI7QUFDQSxNQUFNRyxLQUFLLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFkO0FBQ0EsTUFBTUksT0FBTyxHQUFHTCxRQUFRLENB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QUFwQyxDQUFKO0FBQUEsT0FBbkI7QUFDRDs7QUFFRDlOLElBQUFBLFlBQVk7QUFDWitDLElBQUFBLFVBQVU7QUFDWlUsSUFBQUEsWUFBWTtBQUNYLEdBM1lEOztBQTZZQSxTQUFPO0FBQ0xxRCxJQUFBQSxJQUFJLEVBQUVBO0FBREQsR0FBUDtBQUdELENBeGxCVyxFQUFaOztBQTBsQkE5RCxNQUFNLENBQUNpTCxNQUFQLEdBQWdCLFlBQU07QUFDcEIxUSxFQUFBQSxHQUFHLENBQUN1SixJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xuXG5cdGNvbnN0ICRzaXRldXJsID0gRUxZU1NFUk9NRU8uc2l0ZXVybDtcblx0Y29uc3QgJGRlZmF1bHRJbWcgPSBgL3dwLWNvbnRlbnQvdGhlbWVzL2JsYW5rc2xhdGUvZGlzdC9pbWcvZGVmYXVsdC5wbmdgO1xuICBjb25zdCAkbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpO1xuXHRjb25zdCAkbG9hZGVyR0lGID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckdJRicpO1xuICBjb25zdCAkbG9hZGVyU1ZHID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlclNWRycpO1xuICBjb25zdCAkbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgY29uc3QgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICBjb25zdCAkbG9nbyA9ICRoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdFNlY3Rpb24gPSAkbWFpbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0Q29udGVudCA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLndvcmstY29udGVudCcpO1xuICBjb25zdCAkYWJvdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0Jyk7XG4gIGNvbnN0ICRhYm91dENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19jbG9zZScpO1xuICBjb25zdCAkYWJvdXRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19wYWdlJyk7XG4gIGNvbnN0ICRhYm91dEJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LWJnJyk7XG4gIGNvbnN0ICRhYm91dElubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWlubmVyJyk7XG4gIGNvbnN0ICRleGl0QWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpdEFib3V0Jyk7XG4gIGNvbnN0ICRjb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcbiAgY29uc3QgJGNvbnRhY3RQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWZvcm0tYXJyb3cnKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3dQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGVGb3JtQXJyb3cnKTtcbiAgY29uc3QgYXJyb3dQYXRocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbHMtYXJyb3cnKTtcbiAgY29uc3QgcHJldkFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LWJhY2snKTtcbiAgY29uc3QgbmV4dEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LW5leHQnKTtcbiAgY29uc3QgcHJldkFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZBcnJvdycpO1xuICBjb25zdCBuZXh0QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dEFycm93Jyk7XG4gIGNvbnN0ICR3b3JrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICR3b3JrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRleHQnKTtcbiAgY29uc3QgJHdvcmtUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10aXRsZScpO1xuICBjb25zdCAkd29ya0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1idG4nKTtcbiAgY29uc3QgJGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICBjb25zdCAkYWJvdXRQYWdlTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLmxpbmsnKTtcblx0Y29uc3QgaW5uZXJDdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tc21hbGxcIik7XG5cdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yLS1jYW52YXNcIik7XG5cbiAgY29uc3QgbG9hZGVyTW9kdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkZmlyc3RGb290ZXJOYXZJdGVtID0gJGZvb3Rlck5hdi5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCByZWdleCA9IC8oXFwvd3AtY29udGVudCkoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvZztcbiAgICBjb25zdCAkaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICAgIGxldCBpbWdTcmNzID0gW107XG4gICAgJGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdGlmIChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSA9PSBudWxsKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmNzc1RleHQgPSAkZGVmYXVsdEltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGltZ1NyY3MucHVzaChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgbG9hZGluZ1RsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWUsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgICAgeW95bzogdHJ1ZSxcbiAgICB9KTtcbiAgICBsb2FkaW5nVGxcbiAgICAgIC5mcm9tVG8oJGxvYWRlclNWRywgMiwge2RyYXdTVkc6JzAlIDEwMCUnfSx7IGRyYXdTVkc6JzAlIDAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyR0lGLCAwLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0XHRcdFx0XHRcdC5zZXQoJGxvYWRlckdJRiwge2Rpc3BsYXk6J25vbmUnfSlcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyU1ZHLCAwLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0ICAgICAgICAgIC50bygkbG9hZGVyLCAzLCB7YXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTInKVxuXHQgICAgICAgICAgLmZyb20oJGxvZ28sIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00Jylcblx0ICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz01Jylcblx0ICAgICAgICAgIC5mcm9tKHByZXZBcnJvdywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKG5leHRBcnJvdywgMywge3hQZXJjZW50OiAxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz01LjUnKVxuXHQgICAgICAgICAgLmZyb20oJGZpcnN0Q29udGVudCwgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYnKVxuXHQgICAgICAgICAgLnN0YWdnZXJGcm9tKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjIwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdzdGFydCs9Ni41Jylcblx0ICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYuNzUnKVxuXHQgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmb3JtTW9kdWxlID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0LWNvbnRhaW5lcicpKSB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0Jyk7XG4gICAgICAgIHN1Ym1pdENvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsXG4gICAgICAgIGA8c3ZnIGlkPVwic3VibWl0LWJ0blwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDk2LjU0IDMyLjQ5XCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtc3VibWl0XCIgZD1cIk0uMjgsMi4xN2MxMC44NCwxNS4yLDIzLjU4LDI3LDQyLjczLDI5LjdDNjEuNiwzNC41LDc5LjgsMjguNTIsOTUuODMsMTkuNDRjMS0uNTgsMS0yLjU0LS4zNi0yLjc0YTUyLjEzLDUyLjEzLDAsMCwwLTE0LjA2LS4zMywxLjUsMS41LDAsMCwwLDAsMywzNS41MiwzNS41MiwwLDAsMSwxMS43LDMuMWwtLjMxLTIuMzVhODcuMTksODcuMTksMCwwLDEtOS4yNCw5Ljc4Yy0xLjQ0LDEuMy42OSwzLjQyLDIuMTIsMi4xMmE4Ny4xOSw4Ny4xOSwwLDAsMCw5LjI0LTkuNzgsMS41MiwxLjUyLDAsMCwwLS4zLTIuMzYsMzkuODUsMzkuODUsMCwwLDAtMTMuMjEtMy41MXYzYTQ5LjE1LDQ5LjE1LDAsMCwxLDEzLjI3LjIybC0uMzYtMi43NEM3OS4xOSwyNS40Miw2MiwzMS4yNiw0NC40NCwyOS4wNSwyNS43OCwyNi43LDEzLjM5LDE1LjQyLDIuODcuNjYsMS43NS0uOS0uODUuNi4yOCwyLjE3WlwiLz5cbiAgICAgICAgPC9zdmc+YCk7XG5cbiAgICAgICAgY29uc3Qgc3VibWl0UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbHMtc3VibWl0Jyk7XG4gICAgICAgIFR3ZWVuTWF4LnNldChzdWJtaXRQYXRoLCB7ZHJhd1NWRzonMCUnfSk7XG4gICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBzdWJtaXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgc3VibWl0VGxcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtmaWxsOiAnIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9MC41Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMCUnLCBmaWxsOiAnbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXHRjb25zdCBjdXJzb3JNb2R1bGUgPSAoKSA9PiB7XG5cblx0XHRsZXQgY2xpZW50WCA9IC0xMDA7XG5cdFx0bGV0IGNsaWVudFkgPSAtMTAwO1xuXHRcdGNvbnN0IGluaXRDdXJzb3IgPSAoKSA9PiB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGUgPT4ge1xuXHRcdCAgICBjbGllbnRYID0gZS5jbGllbnRYO1xuXHRcdCAgICBjbGllbnRZID0gZS5jbGllbnRZO1xuXHRcdCAgfSk7XG5cdFx0ICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cdFx0ICAgIFR3ZWVuTWF4LnNldChpbm5lckN1cnNvciwge1xuXHRcdCAgICAgIHg6IGNsaWVudFgsXG5cdFx0ICAgICAgeTogY2xpZW50WVxuXHRcdCAgICB9KTtcblx0XHQgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdCAgfTtcblx0XHQgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHR9O1xuXG5cdFx0aW5pdEN1cnNvcigpO1xuXG5cdFx0bGV0IGxhc3RYID0gMDtcblx0XHRsZXQgbGFzdFkgPSAwO1xuXHRcdGxldCBpc1N0dWNrID0gZmFsc2U7XG5cdFx0bGV0IHNob3dDdXJzb3IgPSBmYWxzZTtcblx0XHRsZXQgZ3JvdXA7XG5cdFx0bGV0IHN0dWNrWDtcblx0XHRsZXQgc3R1Y2tZO1xuXHRcdGxldCBmaWxsT3V0ZXJDdXJzb3I7XG5cdFx0Y29uc3QgaW5pdENhbnZhcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHNoYXBlQm91bmRzID0ge1xuXHRcdFx0XHR3aWR0aDogNzUsXG5cdFx0XHRcdGhlaWdodDogNzUsXG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIuc2V0dXAoY2FudmFzKTtcblx0XHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gJ3JnYmEoNjAsIDc0LCA4MywgMC41KSc7XG5cdFx0XHRjb25zdCBzdHJva2VXaWR0aCA9IDE7XG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IDg7XG5cdFx0XHRjb25zdCByYWRpdXMgPSAxNTtcblxuXHRcdFx0Y29uc3Qgbm9pc2VTY2FsZSA9IDE1MDtcblx0XHRcdGNvbnN0IG5vaXNlUmFuZ2UgPSA0O1xuXHRcdFx0bGV0IGlzTm9pc3kgPSBmYWxzZTtcblxuXHRcdFx0Y29uc3QgcG9seWdvbiA9IG5ldyBwYXBlci5QYXRoLlJlZ3VsYXJQb2x5Z29uKFxuXHRcdFx0XHRuZXcgcGFwZXIuUG9pbnQoMCwwKSxcblx0XHRcdFx0c2VnbWVudHMsXG5cdFx0XHRcdHJhZGl1cyxcblx0XHRcdCk7XG5cdFx0XHRwb2x5Z29uLnN0cm9rZUNvbG9yID0gc3Ryb2tlQ29sb3I7XG4gIFx0XHRwb2x5Z29uLnN0cm9rZVdpZHRoID0gc3Ryb2tlV2lkdGg7XG4gIFx0XHRwb2x5Z29uLnNtb290aCgpO1xuICBcdFx0Z3JvdXAgPSBuZXcgcGFwZXIuR3JvdXAoW3BvbHlnb25dKTtcbiAgXHRcdGdyb3VwLmFwcGx5TWF0cml4ID0gZmFsc2U7XG5cblx0XHRcdGNvbnN0IG5vaXNlT2JqZWN0cyA9IHBvbHlnb24uc2VnbWVudHMubWFwKCgpID0+IG5ldyBTaW1wbGV4Tm9pc2UoKSk7XG4gIFx0XHRsZXQgYmlnQ29vcmRpbmF0ZXMgPSBbXTtcblxuXHRcdFx0Y29uc3QgbGVycCA9IChhLCBiLCBuKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoMSAtIG4pICogYSArIG4gKiBiO1xuXHRcdFx0fTtcblxuXHRcdFx0Y29uc3QgbWFwID0gKHZhbHVlLCBpbl9taW4sIGluX21heCwgb3V0X21pbiwgb3V0X21heCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdCgodmFsdWUgLSBpbl9taW4pICogKG91dF9tYXggLSBvdXRfbWluKSkgLyAoaW5fbWF4IC0gaW5fbWluKSArIG91dF9taW5cblx0XHRcdFx0KTtcblx0XHRcdH07XG5cblx0XHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IGV2ZW50ID0+IHtcblx0XHRcdFx0bGFzdFggPSBsZXJwKGxhc3RYLCBjbGllbnRYLCAwLjIpO1xuXHRcdFx0XHRsYXN0WSA9IGxlcnAobGFzdFksIGNsaWVudFksIDAuMik7XG5cdFx0XHRcdGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aW5pdENhbnZhcygpO1xuXG5cblxuXG5cblxuXHR9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjUwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX3RleHQsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTI1fSlcbiAgICAgICAgICAgIDtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgbmV4dEFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIG5leHRBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhuZXh0QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29yaywgLjUsIHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjI1JylcbiAgICAgICAgICAgIC50byhjX3dvcmtfdGV4dCwgMSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuNScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXM7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byhvcGVuSWNvbiwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsZXQgd29ya0J0biA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUZXh0ID0gd29ya1RpdGxlLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSAnb3BlbicpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG4gICAgICAgIGxldCBoaWRlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGhpZGVXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjAsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrTWFpbiwgMC41LCB7ZGlzcGxheTonbm9uZScsIGF1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UrPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJHdvcmtUaXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuICAgICR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cbiAgICBjb25zdCBob3ZlcldvcmtJdGVtID0gKGUpID0+IHtcbiAgICAgIGxldCB3b3JrSXRlbSA9IGUudGFyZ2V0O1xuICAgICAgbGV0IHRleHQgPSBlLnRhcmdldC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHRpdGxlID0gdGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHRpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBob3ZlclN0YXR1cyA9IHdvcmtJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycpO1xuICAgICAgaWYgKGhvdmVyU3RhdHVzID09PSAnbm8nKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICd5ZXMnKTtcbiAgICAgICAgbGV0IGVudGVyV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGVudGVyV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonNTBweCAwJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTAuNScpO1xuICAgICAgfSBlbHNlIGlmIChob3ZlclN0YXR1cyA9PT0gJ3llcycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ25vJyk7XG4gICAgICAgIGxldCBsZWF2ZVdvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBsZWF2ZVdvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzEwcHggMCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgfVxuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGxpbmtTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGxpbmssIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IGxpbmtTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbShjaGFycywgMC4yLCB7c2NhbGU6MCwgeDonLTUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAwLjAzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuXHRcdGN1cnNvck1vZHVsZSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
