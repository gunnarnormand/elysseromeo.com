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
  var $allArrowSvgs = document.querySelectorAll('.arrow svg');
  var $workItems = document.querySelectorAll('.work-content');
  var $workText = document.querySelectorAll('.work-text');
  var $workTitles = document.querySelectorAll('.work-title');
  var $workBtns = document.querySelectorAll('.work-btn');
  var $workLinks = document.querySelectorAll('.work-link a');
  var $links = document.querySelectorAll('a');
  var $aboutPageLinks = document.querySelectorAll('a.link');
  var innerCursor = document.querySelector(".cursor--small");
  var canvas = document.querySelector(".cursor--canvas");
  var $submitBtn = document.querySelector('button[type="submit"]');

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
        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);
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
      var noiseRange = 6;
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
        if (!isStuck) {
          // move circle around normally
          lastX = lerp(lastX, clientX, 0.2);
          lastY = lerp(lastY, clientY, 0.2);
          group.position = new paper.Point(lastX, lastY);
        } else if (isStuck) {
          // fixed position on a nav item
          lastX = lerp(lastX, stuckX, 0.08);
          lastY = lerp(lastY, stuckY, 0.08);
          group.position = new paper.Point(lastX, lastY);
        }

        if (isStuck && polygon.bounds.width < shapeBounds.width) {
          // scale up the shape
          polygon.scale(1.15);
        } else if (!isStuck && polygon.bounds.width > 30) {
          // remove noise
          if (isNoisy) {
            polygon.segments.forEach(function (segment, i) {
              segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
            });
            isNoisy = false;
            bigCoordinates = [];
          } // scale down the shape


          var scaleDown = 0.92;
          polygon.scale(scaleDown);
        } // while stuck and big, apply simplex noise


        if (isStuck && polygon.bounds.width >= shapeBounds.width) {
          isNoisy = true; // first get coordinates of large circle

          if (bigCoordinates.length === 0) {
            polygon.segments.forEach(function (segment, i) {
              bigCoordinates[i] = [segment.point.x, segment.point.y];
            });
          } // loop over all points of the polygon


          polygon.segments.forEach(function (segment, i) {
            // get new noise value
            // we divide event.count by noiseScale to get a very smooth value
            var noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
            var noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1); // map the noise value to our defined range

            var distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
            var distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange); // apply distortion to coordinates

            var newX = bigCoordinates[i][0] + distortionX;
            var newY = bigCoordinates[i][1] + distortionY; // set new (noisy) coordindate of point

            segment.point.set(newX, newY);
          });
        }

        polygon.smooth();
      };
    };

    initCanvas();

    var initCursorHovers = function initCursorHovers() {
      var handleCanvasCursorMouseEnter = function handleCanvasCursorMouseEnter(e) {
        var navItem = e.currentTarget;
        var navItemBox = navItem.getBoundingClientRect();
        stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        isStuck = true;
        TweenMax.to(innerCursor, 1, {
          background: 'rgba(60, 74, 83, 0.5)',
          scale: 0.25,
          ease: Expo.easeOut
        });
      };

      var handleCanvasCursorMouseLeave = function handleCanvasCursorMouseLeave() {
        isStuck = false;
        TweenMax.to(innerCursor, 1, {
          background: '#b7dde1',
          scale: 1,
          ease: Expo.easeOut
        });
      };

      var handleBasicCursorMouseEnter = function handleBasicCursorMouseEnter(e) {
        TweenMax.to(innerCursor, 1, {
          background: 'rgba(60, 74, 83, 0.5)',
          scale: 2,
          ease: Expo.easeOut
        });
      };

      var handleBasicCursorMouseLeave = function handleBasicCursorMouseLeave() {
        TweenMax.to(innerCursor, 1, {
          background: '#b7dde1',
          scale: 1,
          ease: Expo.easeOut
        });
      };

      $aboutLink.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
      $aboutLink.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      $workLinks.forEach(function (link) {
        link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
        link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      });
      $aboutPageLinks.forEach(function (link) {
        link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
        link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      });
      $aboutClose.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
      $aboutClose.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      $allArrowSvgs.forEach(function (link) {
        link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
        link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      });
      $workBtns.forEach(function (link) {
        link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
        link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      });
      $workItems.forEach(function (link) {
        link.addEventListener("mouseenter", handleBasicCursorMouseEnter);
        link.addEventListener("mouseleave", handleBasicCursorMouseLeave);
      });
      var $paginationLinks = document.querySelectorAll('.onepage-pagination li a');
      $paginationLinks.forEach(function (link) {
        link.addEventListener("mouseenter", handleBasicCursorMouseEnter);
        link.addEventListener("mouseleave", handleBasicCursorMouseLeave);
      });
      $logo.addEventListener("mouseenter", handleBasicCursorMouseEnter);
      $logo.addEventListener("mouseleave", handleBasicCursorMouseLeave);
      $submitBtn.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
      $submitBtn.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
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
        }) // .set(c_work, {autoAlpha:0, yPercent:50})
        // .set(c_work_text, {autoAlpha:0, xPercent:-25})
        ;
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
        }, 'before+=1') // .to(c_work, .5, {autoAlpha:1, yPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=1.25')
        // .to(c_work_text, 1, {scale:1, autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=1.5')
        .staggerFrom(chars, 1, {
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
      e.stopPropagation();
      e.preventDefault();
      var workItem = this;
      var workText = this.lastElementChild;
      var workTitle = workText.firstElementChild;
      var openIcon = workTitle.lastElementChild;
      var openIconSvg = openIcon.firstElementChild;
      var openIconPath = openIconSvg.firstElementChild;
      var workMain = workText.lastElementChild;
      var expandWorkTextTl = new TimelineMax();
      var status = workText.getAttribute('data-display');

      if (status === 'closed') {
        workText.setAttribute('data-display', 'open');
        expandWorkTextTl.to(workText, 1, {
          autoAlpha: 1,
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          ease: Expo.easeOut
        }, 'start').fromTo(workTitle, 1, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true
        }, {
          yPercent: 0,
          autoAlpha: 1,
          force3D: true,
          ease: Expo.easeOut
        }, 'start').fromTo(workMain, 1, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true
        }, {
          yPercent: 0,
          autoAlpha: 1,
          force3D: true,
          ease: Expo.easeOut
        }, 'start+=0.25').fromTo(openIcon, 1, {
          yPercent: 100,
          force3D: true
        }, {
          autoAlpha: 1,
          yPercent: 0,
          rotation: 45,
          force3D: true,
          ease: Expo.easeOut
        }, 'start+=0.5').fromTo(openIconPath, 1, {
          drawSVG: '0%'
        }, {
          drawSVG: '100%',
          ease: Expo.easeIn
        }, 'start+=0.5').fromTo(openIconPath, 1, {
          fill: 'none'
        }, {
          fill: '#081121',
          ease: Expo.easeInOut
        }, 'start+=1');
      }
    }

    function closeWorkText(e) {
      e.stopPropagation();
      var workText = this.parentElement.parentElement;
      var workTitle = workText.firstElementChild;
      var openIcon = workTitle.lastElementChild;
      var openIconSvg = openIcon.firstElementChild;
      var openIconPath = openIconSvg.firstElementChild;
      var workMain = workText.lastElementChild;
      var closeWorkTextTl = new TimelineMax();
      var status = workText.getAttribute('data-display');

      if (status === 'open') {
        workText.setAttribute('data-display', 'closed');
        closeWorkTextTl.to(workText, 1, {
          autoAlpha: 0,
          height: 'auto',
          ease: Expo.easeOut
        }, 'start').to(workTitle, 1, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'start').to(workMain, 1, {
          yPercent: 100,
          autoAlpha: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'start+=0.25').to(openIcon, 1, {
          autoAlpha: 0,
          yPercent: 100,
          rotation: 0,
          force3D: true,
          ease: Expo.easeOut
        }, 'start+=0.5').to(openIconPath, 1, {
          drawSVG: '0%',
          ease: Expo.easeIn
        }, 'start+=0.5').to(openIconPath, 1, {
          fill: 'none',
          ease: Expo.easeInOut
        }, 'start+=1');
      }
    }

    $workItems.forEach(function (item) {
      return item.addEventListener('click', openWorkText);
    });
    $workBtns.forEach(function (button) {
      return button.addEventListener('click', closeWorkText);
    });
    $workLinks.forEach(function (link) {
      return link.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    });
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

    if (window.innerWidth > 768) {
      cursorModule();
    }
  };

  return {
    init: init
  };
}();

window.onload = function () {
  app.init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiRhbGxBcnJvd1N2Z3MiLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkd29ya0xpbmtzIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwiaW5uZXJDdXJzb3IiLCJjYW52YXMiLCIkc3VibWl0QnRuIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIiLCJuYXZJdGVtIiwiY3VycmVudFRhcmdldCIsIm5hdkl0ZW1Cb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwicm91bmQiLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZCIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCJsaW5rIiwiJHBhZ2luYXRpb25MaW5rcyIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsInN0b3BQcm9wYWdhdGlvbiIsInByZXZlbnREZWZhdWx0Iiwid29ya0l0ZW0iLCJ3b3JrVGV4dCIsIndvcmtUaXRsZSIsIm9wZW5JY29uIiwib3Blbkljb25TdmciLCJvcGVuSWNvblBhdGgiLCJ3b3JrTWFpbiIsImV4cGFuZFdvcmtUZXh0VGwiLCJzdGF0dXMiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJwYXJlbnRFbGVtZW50IiwiY2xvc2VXb3JrVGV4dFRsIiwiaXRlbSIsImJ1dHRvbiIsIm1vdmVVcCIsInByZXZBcnJvd091dFRsIiwibW92ZURvd24iLCJuZXh0QXJyb3dPdXRUbCIsInBhdGgiLCJhcnJvd01vdXNlRW50ZXJUbCIsImFycm93TW91c2VMZWF2ZVRsIiwicmVzZXRQcm9ncmVzcyIsImNQcm9ncmVzcyIsIm5leHRFbGVtZW50U2libGluZyIsInRQcm9ncmVzcyIsImxpbmtzIiwicGVyY2VudFBlckxpbmsiLCJpbm5lckhUTUwiLCJ0YXJnZXQiLCJjdXJyZW50TGkiLCJ0YXJnZXRMZW5ndGgiLCJhY3RpdmVJbmRleCIsImN1cnJlbnRMZW5ndGgiLCJsaSIsInJlbW92ZUF0dHJpYnV0ZSIsImluZGljZXMiLCJzZWN0aW9uIiwidG9nZ2xlU3RhdGUiLCJlbGVtIiwiYXR0ciIsImN1cnJlbnRFbGVtZW50Iiwic2hvd0Zvcm1UbCIsImhpZGVGb3JtVGwiLCJhYm91dFRsIiwic3RhZ2dlclRvIiwiYmFja1RsMSIsImJhY2tUbCIsImFib3V0Q2xvc2VIb3ZlclRsIiwiaGlnaGxpZ2h0TGluayIsIiRoaWdobGlnaHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwiaGlnaGxpZ2hMaW5rVGwiLCJ1bmhpZ2hsaWdodExpbmsiLCJoaWdobGlnaHQiLCJyZW1vdmUiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsR0FBRyxHQUFJLFlBQVk7QUFFeEIsTUFBTUMsUUFBUSxH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QUNYOU0sRUFESCxDQUNNeU0sVUFETixFQUNrQixDQURsQixFQUNxQjtBQUFDNUwsUUFBQUEsS0FBSyxFQUFDLE1BQVA7QUFBZXhCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDaUI7QUFBMUIsT0FEckI7QUFHSDs7QUFFRCxhQUFTd00sZUFBVCxDQUF5Qm5MLENBQXpCLEVBQTRCO0FBQzFCLFVBQUlvTCxTQUFTLEdBQUcsS0FBS3RSLGFBQUwsQ0FBbUIsaUJBQW5CLENBQWhCO0FBQ0FzUixNQUFBQSxTQUFTLENBQUNDLE1BQVY7QUFDRDs7QUFFRCxRQUFJbE0sTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCdEQsTUFBQUEsTUFBTSxDQUFDYSxPQUFQLENBQWUsVUFBQWlJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUN6RyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ3lNLGFBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNBOU8sTUFBQUEsTUFBTSxDQUFDYSxPQUFQLENBQWUsVUFBQWlJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUN6RyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ2dOLGVBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNEOztBQUVEaFAsSUFBQUEsWUFBWTtBQUNaK0MsSUFBQUEsVUFBVTs7QUFDWixRQUFJQyxNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDNUJRLE1BQUFBLFlBQVk7QUFDWjtBQUNBLEdBM1dEOztBQTZXQSxTQUFPO0FBQ0xrRixJQUFBQSxJQUFJLEVBQUVBO0FBREQsR0FBUDtBQUdELENBMXFCVyxFQUFaOztBQTRxQkEzRixNQUFNLENBQUNtTSxNQUFQLEdBQWdCLFlBQU07QUFDcEIvUixFQUFBQSxHQUFHLENBQUN1TCxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xuXG5cdGNvbnN0ICRzaXRldXJsID0gRUxZU1NFUk9NRU8uc2l0ZXVybDtcblx0Y29uc3QgJGRlZmF1bHRJbWcgPSBgL3dwLWNvbnRlbnQvdGhlbWVzL2JsYW5rc2xhdGUvZGlzdC9pbWcvZGVmYXVsdC5wbmdgO1xuICBjb25zdCAkbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpO1xuXHRjb25zdCAkbG9hZGVyR0lGID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckdJRicpO1xuICBjb25zdCAkbG9hZGVyU1ZHID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlclNWRycpO1xuICBjb25zdCAkbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgY29uc3QgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICBjb25zdCAkbG9nbyA9ICRoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdFNlY3Rpb24gPSAkbWFpbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0Q29udGVudCA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLndvcmstY29udGVudCcpO1xuICBjb25zdCAkYWJvdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0Jyk7XG4gIGNvbnN0ICRhYm91dENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19jbG9zZScpO1xuICBjb25zdCAkYWJvdXRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19wYWdlJyk7XG4gIGNvbnN0ICRhYm91dEJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LWJnJyk7XG4gIGNvbnN0ICRhYm91dElubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWlubmVyJyk7XG4gIGNvbnN0ICRleGl0QWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpdEFib3V0Jyk7XG4gIGNvbnN0ICRjb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcbiAgY29uc3QgJGNvbnRhY3RQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWZvcm0tYXJyb3cnKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3dQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGVGb3JtQXJyb3cnKTtcbiAgY29uc3QgYXJyb3dQYXRocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbHMtYXJyb3cnKTtcbiAgY29uc3QgcHJldkFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LWJhY2snKTtcbiAgY29uc3QgbmV4dEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LW5leHQnKTtcbiAgY29uc3QgcHJldkFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZBcnJvdycpO1xuICBjb25zdCBuZXh0QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dEFycm93Jyk7XG5cdGNvbnN0ICRhbGxBcnJvd1N2Z3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJyb3cgc3ZnJyk7XG4gIGNvbnN0ICR3b3JrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICR3b3JrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRleHQnKTtcbiAgY29uc3QgJHdvcmtUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10aXRsZScpO1xuICBjb25zdCAkd29ya0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1idG4nKTtcblx0Y29uc3QgJHdvcmtMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWxpbmsgYScpO1xuICBjb25zdCAkbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2VMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EubGluaycpO1xuXHRjb25zdCBpbm5lckN1cnNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yLS1zbWFsbFwiKTtcblx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLWNhbnZhc1wiKTtcblx0Y29uc3QgJHN1Ym1pdEJ0biA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdCAgfTtcblx0XHQgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdH07XG5cdFx0aW5pdEN1cnNvcigpO1xuXG5cdFx0bGV0IGxhc3RYID0gMDtcblx0XHRsZXQgbGFzdFkgPSAwO1xuXHRcdGxldCBpc1N0dWNrID0gZmFsc2U7XG5cdFx0bGV0IHNob3dDdXJzb3IgPSBmYWxzZTtcblx0XHRsZXQgZ3JvdXA7XG5cdFx0bGV0IHN0dWNrWDtcblx0XHRsZXQgc3R1Y2tZO1xuXHRcdGxldCBmaWxsT3V0ZXJDdXJzb3I7XG5cdFx0Y29uc3QgaW5pdENhbnZhcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHNoYXBlQm91bmRzID0ge1xuXHRcdFx0XHR3aWR0aDogNzUsXG5cdFx0XHRcdGhlaWdodDogNzUsXG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIuc2V0dXAoY2FudmFzKTtcblx0XHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gJ3JnYmEoNjAsIDc0LCA4MywgMC41KSc7XG5cdFx0XHRjb25zdCBzdHJva2VXaWR0aCA9IDE7XG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IDg7XG5cdFx0XHRjb25zdCByYWRpdXMgPSAxNTtcblx0XHRcdGNvbnN0IG5vaXNlU2NhbGUgPSAxNTA7XG5cdFx0XHRjb25zdCBub2lzZVJhbmdlID0gNjtcblx0XHRcdGxldCBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwb2x5Z29uID0gbmV3IHBhcGVyLlBhdGguUmVndWxhclBvbHlnb24oXG5cdFx0XHRcdG5ldyBwYXBlci5Qb2ludCgwLDApLFxuXHRcdFx0XHRzZWdtZW50cyxcblx0XHRcdFx0cmFkaXVzLFxuXHRcdFx0KTtcblx0XHRcdHBvbHlnb24uc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcbiAgXHRcdHBvbHlnb24uc3Ryb2tlV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgXHRcdHBvbHlnb24uc21vb3RoKCk7XG4gIFx0XHRncm91cCA9IG5ldyBwYXBlci5Hcm91cChbcG9seWdvbl0pO1xuICBcdFx0Z3JvdXAuYXBwbHlNYXRyaXggPSBmYWxzZTtcblx0XHRcdGNvbnN0IG5vaXNlT2JqZWN0cyA9IHBvbHlnb24uc2VnbWVudHMubWFwKCgpID0+IG5ldyBTaW1wbGV4Tm9pc2UoKSk7XG4gIFx0XHRsZXQgYmlnQ29vcmRpbmF0ZXMgPSBbXTtcblx0XHRcdGNvbnN0IGxlcnAgPSAoYSwgYiwgbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYjtcblx0XHRcdH07XG5cdFx0XHRjb25zdCBtYXAgPSAodmFsdWUsIGluX21pbiwgaW5fbWF4LCBvdXRfbWluLCBvdXRfbWF4KSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0KCh2YWx1ZSAtIGluX21pbikgKiAob3V0X21heCAtIG91dF9taW4pKSAvIChpbl9tYXggLSBpbl9taW4pICsgb3V0X21pblxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IGV2ZW50ID0+IHtcblxuXG5cdFx0XHRcdGlmICghaXNTdHVjaykge1xuXHRcdFx0ICAgIC8vIG1vdmUgY2lyY2xlIGFyb3VuZCBub3JtYWxseVxuXHRcdFx0ICAgIGxhc3RYID0gbGVycChsYXN0WCwgY2xpZW50WCwgMC4yKTtcblx0XHRcdCAgICBsYXN0WSA9IGxlcnAobGFzdFksIGNsaWVudFksIDAuMik7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfSBlbHNlIGlmIChpc1N0dWNrKSB7XG5cdFx0XHQgICAgLy8gZml4ZWQgcG9zaXRpb24gb24gYSBuYXYgaXRlbVxuXHRcdFx0ICAgIGxhc3RYID0gbGVycChsYXN0WCwgc3R1Y2tYLCAwLjA4KTtcblx0XHRcdCAgICBsYXN0WSA9IGxlcnAobGFzdFksIHN0dWNrWSwgMC4wOCk7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfVxuXG5cdFx0XHRcdGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoIDwgc2hhcGVCb3VuZHMud2lkdGgpIHtcblx0XHRcdFx0XHQvLyBzY2FsZSB1cCB0aGUgc2hhcGVcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKDEuMTUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID4gMzApIHtcblx0XHRcdFx0XHQvLyByZW1vdmUgbm9pc2Vcblx0XHRcdFx0XHRpZiAoaXNOb2lzeSkge1xuXHRcdFx0XHRcdCAgcG9seWdvbi5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBpKSA9PiB7XG5cdFx0XHRcdFx0ICAgIHNlZ21lbnQucG9pbnQuc2V0KGJpZ0Nvb3JkaW5hdGVzW2ldWzBdLCBiaWdDb29yZGluYXRlc1tpXVsxXSk7XG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHQgIGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdFx0XHQgIGJpZ0Nvb3JkaW5hdGVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHNjYWxlIGRvd24gdGhlIHNoYXBlXG5cdFx0XHRcdFx0Y29uc3Qgc2NhbGVEb3duID0gMC45Mjtcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKHNjYWxlRG93bik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB3aGlsZSBzdHVjayBhbmQgYmlnLCBhcHBseSBzaW1wbGV4IG5vaXNlXG5cdFx0XHQgIGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID49IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHQgICAgaXNOb2lzeSA9IHRydWU7XG5cdFx0XHQgICAgLy8gZmlyc3QgZ2V0IGNvb3JkaW5hdGVzIG9mIGxhcmdlIGNpcmNsZVxuXHRcdFx0ICAgIGlmIChiaWdDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdCAgICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0ICAgICAgICBiaWdDb29yZGluYXRlc1tpXSA9IFtzZWdtZW50LnBvaW50LngsIHNlZ21lbnQucG9pbnQueV07XG5cdFx0XHQgICAgICB9KTtcblx0XHRcdCAgICB9XG5cblx0XHRcdCAgICAvLyBsb29wIG92ZXIgYWxsIHBvaW50cyBvZiB0aGUgcG9seWdvblxuXHRcdFx0ICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXG5cdFx0XHQgICAgICAvLyBnZXQgbmV3IG5vaXNlIHZhbHVlXG5cdFx0XHQgICAgICAvLyB3ZSBkaXZpZGUgZXZlbnQuY291bnQgYnkgbm9pc2VTY2FsZSB0byBnZXQgYSB2ZXJ5IHNtb290aCB2YWx1ZVxuXHRcdFx0ICAgICAgY29uc3Qgbm9pc2VYID0gbm9pc2VPYmplY3RzW2ldLm5vaXNlMkQoZXZlbnQuY291bnQgLyBub2lzZVNjYWxlLCAwKTtcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWSA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMSk7XG5cblx0XHRcdCAgICAgIC8vIG1hcCB0aGUgbm9pc2UgdmFsdWUgdG8gb3VyIGRlZmluZWQgcmFuZ2Vcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25YID0gbWFwKG5vaXNlWCwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25ZID0gbWFwKG5vaXNlWSwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblxuXHRcdFx0ICAgICAgLy8gYXBwbHkgZGlzdG9ydGlvbiB0byBjb29yZGluYXRlc1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WCA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzBdICsgZGlzdG9ydGlvblg7XG5cdFx0XHQgICAgICBjb25zdCBuZXdZID0gYmlnQ29vcmRpbmF0ZXNbaV1bMV0gKyBkaXN0b3J0aW9uWTtcblxuXHRcdFx0ICAgICAgLy8gc2V0IG5ldyAobm9pc3kpIGNvb3JkaW5kYXRlIG9mIHBvaW50XG5cdFx0XHQgICAgICBzZWdtZW50LnBvaW50LnNldChuZXdYLCBuZXdZKTtcblx0XHRcdCAgICB9KTtcblxuXHRcdFx0ICB9XG5cdFx0XHQgIHBvbHlnb24uc21vb3RoKCk7XG5cblxuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW1Cb3ggPSBuYXZJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRzdHVja1ggPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gubGVmdCArIG5hdkl0ZW1Cb3gud2lkdGggLyAyKTtcblx0XHRcdFx0c3R1Y2tZID0gTWF0aC5yb3VuZChuYXZJdGVtQm94LnRvcCArIG5hdkl0ZW1Cb3guaGVpZ2h0IC8gMik7XG5cdFx0XHRcdGlzU3R1Y2sgPSB0cnVlO1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6J3JnYmEoNjAsIDc0LCA4MywgMC41KScsIHNjYWxlOjAuMjUsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUgPSAoKSA9PiB7XG5cdFx0XHRcdGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOicjYjdkZGUxJywgc2NhbGU6MSwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdFR3ZWVuTWF4LnRvKGlubmVyQ3Vyc29yLCAxLCB7YmFja2dyb3VuZDoncmdiYSg2MCwgNzQsIDgzLCAwLjUpJywgc2NhbGU6MiwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6JyNiN2RkZTEnLCBzY2FsZToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblx0XHRcdH07XG5cdFx0XHQkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCR3b3JrTGlua3MuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkYWxsQXJyb3dTdmdzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCR3b3JrQnRucy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkd29ya0l0ZW1zLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG5cdFx0XHQkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkbG9nby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCRzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHQkc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXG5cdFx0fVxuXHRcdGluaXRDdXJzb3JIb3ZlcnMoKTtcblxuXG5cblxuXG5cblx0fVxuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICBvbmVQYWdlU2Nyb2xsKFwiLm1haW5cIiwge1xuICAgICAgc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuNTAsIDAsIDAuNTAsIDEpXCIsXG4gICAgICBhbmltYXRpb25UaW1lOiA3NTAsXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBhbGxQcm9ncmVzc0JhcnMgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uLXByb2dyZXNzJyk7XG4gICAgICAgIGFsbFByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgVHdlZW5NYXgudG8oYmFyLCAxLCB7d2lkdGg6JzAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZm9yZU1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGJlZm9yZU1vdmVUbFxuICAgICAgICAgICAgLnNldChjX2JnXzEsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYmdfMiwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19hcnRpY2xlLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3N2Zywge3hQZXJjZW50Oi0yMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfaW1nLCB7c2NhbGU6Ljc1LCBhdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMH0pXG4gICAgICAgICAgICAvLyAuc2V0KGNfd29yaywge2F1dG9BbHBoYTowLCB5UGVyY2VudDo1MH0pXG4gICAgICAgICAgICAvLyAuc2V0KGNfd29ya190ZXh0LCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0yNX0pXG4gICAgICAgICAgICA7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yKGBhW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpbmsucHJldmlvdXNTaWJsaW5nO1xuXG4gICAgICAgIGxldCBhZnRlck1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBsZXQgYWZ0ZXJNb3ZlU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChjX2luZGV4LCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgIGxldCBjaGFycyA9IGFmdGVyTW92ZVNwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICBhZnRlck1vdmVUbFxuICAgICAgICAgICAgLnRvKGNfYmdfMSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZScpXG4gICAgICAgICAgICAudG8oY19iZ18yLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKVxuICAgICAgICAgICAgLnRvKGNfYXJ0aWNsZSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjUnKVxuICAgICAgICAgICAgLnRvKGNfc3ZnLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmtfaW1nLCAxLjUsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC8vIC50byhjX3dvcmssIC41LCB7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS4yNScpXG4gICAgICAgICAgICAvLyAudG8oY193b3JrX3RleHQsIDEsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjUnKVxuICAgICAgICAgICAgLnN0YWdnZXJGcm9tKGNoYXJzLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50Oi0xMDAsIGVhc2U6IEV4cG8uZWFzZU91dH0sIDAuMjUsICdiZWZvcmUrPTEuNzUnKVxuICAgICAgICAgICAgLnRvKGN1cnJlbnRQcm9ncmVzc0JhciwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1Jyk7XG4gICAgICB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGknKTtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG4gICAgY29uc3QgJHdvcmtJbmRpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstaW5kZXgnKTtcbiAgICBjb25zdCAkdG90YWxQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3RhbC1wcm9ncmVzcycpO1xuXG4gICAgZnVuY3Rpb24gb3BlbldvcmtUZXh0KGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgd29ya0l0ZW0gPSB0aGlzO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5sYXN0RWxlbWVudENoaWxkO1xuXHRcdFx0bGV0IHdvcmtUaXRsZSA9IHdvcmtUZXh0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXHRcdFx0bGV0IHN0YXR1cyA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG5cdFx0XHRpZiAoc3RhdHVzID09PSAnY2xvc2VkJykge1xuXHRcdFx0XHR3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG5cdFx0XHRcdGV4cGFuZFdvcmtUZXh0VGxcblx0XHRcdFx0XHQudG8od29ya1RleHQsIDEsIHthdXRvQWxwaGE6MSwgaGVpZ2h0OicxMDAlJywgYmFja2dyb3VuZENvbG9yOidyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQuZnJvbVRvKHdvcmtUaXRsZSwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se3lQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG5cdFx0XHRcdFx0LmZyb21Ubyh3b3JrTWFpbiwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se3lQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC4yNScpXG5cdFx0XHRcdFx0LmZyb21UbyhvcGVuSWNvbiwgMSwge3lQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlfSx7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIHJvdGF0aW9uOjQ1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2ZpbGw6ICdub25lJ30se2ZpbGw6JyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MScpXG5cdFx0XHRcdFx0O1xuXHRcdFx0fVxuXG4gICAgfVxuXG5cdFx0ZnVuY3Rpb24gY2xvc2VXb3JrVGV4dChlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0bGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRsZXQgd29ya1RpdGxlID0gd29ya1RleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblN2ZyA9IG9wZW5JY29uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uUGF0aCA9IG9wZW5JY29uU3ZnLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcblx0XHRcdGxldCBjbG9zZVdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRcdGxldCBzdGF0dXMgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuXHRcdFx0aWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG5cdFx0XHRcdHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ2Nsb3NlZCcpO1xuXHRcdFx0XHRjbG9zZVdvcmtUZXh0VGxcblx0XHRcdFx0XHQudG8od29ya1RleHQsIDEsIHthdXRvQWxwaGE6MCwgaGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQudG8od29ya1RpdGxlLCAxLCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuXHRcdFx0XHRcdC50byh3b3JrTWFpbiwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0wLjI1Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb24sIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6MTAwLCByb3RhdGlvbjowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0xJylcblx0XHRcdFx0XHQ7XG5cdFx0XHR9XG5cblx0XHR9XG5cbiAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbldvcmtUZXh0KSk7XG5cdFx0JHdvcmtCdG5zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV29ya1RleHQpKTtcblx0XHQkd29ya0xpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSkpO1xuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnb3BlbicpIHtcbiAgICAgICAgbGV0IGFib3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYWJvdXRUbFxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAyLCB7eVBlcmNlbnQ6MjAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sIC4wOCwgJ2VudGVyJylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMiwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0QmcsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMTUnKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMjUnKVxuICAgICAgICAgIC5mcm9tVG8oJGV4aXRBYm91dCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTEuMjUnKVxuICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGxldCBiYWNrVGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGJhY2tUbDFcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBiYWNrVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGJhY2tUbFxuICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonIzA4MTEyMScsIHNjYWxlOjAuOTUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6J25vbmUnLCBzY2FsZToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgJGhpZ2hsaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICRoaWdobGlnaHQuY2xhc3NMaXN0LmFkZCgnbGluay1oaWdobGlnaHQnKTtcbiAgICAgIHRoaXMuYXBwZW5kKCRoaWdobGlnaHQpO1xuICAgICAgbGV0IGhpZ2hsaWdoTGlua1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGhpZ2hsaWdoTGlua1RsXG4gICAgICAgICAgLnRvKCRoaWdobGlnaHQsIDEsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pXG4gICAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubGluay1oaWdobGlnaHQnKTtcbiAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGlnaGxpZ2h0TGluaykpO1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmhpZ2hsaWdodExpbmspKTtcbiAgICB9XG5cbiAgICBsb2FkZXJNb2R1bGUoKTtcbiAgICBmb3JtTW9kdWxlKCk7XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG5cdFx0XHRjdXJzb3JNb2R1bGUoKTtcblx0XHR9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRcbiAgfVxufSkoKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgYXBwLmluaXQoKTtcbn1cbiJdfQ==
