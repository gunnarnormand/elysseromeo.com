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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiRhbGxBcnJvd1N2Z3MiLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkd29ya0xpbmtzIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwiaW5uZXJDdXJzb3IiLCJjYW52YXMiLCIkc3VibWl0QnRuIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIiLCJuYXZJdGVtIiwiY3VycmVudFRhcmdldCIsIm5hdkl0ZW1Cb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwicm91bmQiLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZCIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCJsaW5rIiwiJHBhZ2luYXRpb25MaW5rcyIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwiYWJvdXRUbCIsInN0YWdnZXJUbyIsImJhY2tUbDEiLCJiYWNrVGwiLCJhYm91dENsb3NlSG92ZXJUbCIsImhpZ2hsaWdodExpbmsiLCIkaGlnaGxpZ2h0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZCIsImhpZ2hsaWdoTGlua1RsIiwidW5oaWdobGlnaHRMaW5r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SUFBSSxDQUFDaUI7QUFBMUIsT0FEckI7QUFHSDs7QUFFRCxhQUFTK00sZUFBVCxDQUF5QjFMLENBQXpCLEVBQTRCO0FBQzFCLFVBQUkyTCxTQUFTLEdBQUcsS0FBSzdSLGFBQUwsQ0FBbUIsaUJBQW5CLENBQWhCO0FBQ0E2UixNQUFBQSxTQUFTLENBQUNDLE1BQVY7QUFDRDs7QUFFRCxRQUFJek0sTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCdEQsTUFBQUEsTUFBTSxDQUFDYSxPQUFQLENBQWUsVUFBQWlJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUN6RyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ2dOLGFBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNBclAsTUFBQUEsTUFBTSxDQUFDYSxPQUFQLENBQWUsVUFBQWlJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUN6RyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ3VOLGVBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNEOztBQUVEdlAsSUFBQUEsWUFBWTtBQUNaK0MsSUFBQUEsVUFBVTs7QUFDWixRQUFJQyxNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDNUJRLE1BQUFBLFlBQVk7QUFDWjtBQUNBLEdBbFlEOztBQW9ZQSxTQUFPO0FBQ0xrRixJQUFBQSxJQUFJLEVBQUVBO0FBREQsR0FBUDtBQUdELENBN3JCVyxFQUFaOztBQStyQkEzRixNQUFNLENBQUMwTSxNQUFQLEdBQWdCLFlBQU07QUFDcEJ0UyxFQUFBQSxHQUFHLENBQUN1TCxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xuXG5cdGNvbnN0ICRzaXRldXJsID0gRUxZU1NFUk9NRU8uc2l0ZXVybDtcblx0Y29uc3QgJGRlZmF1bHRJbWcgPSBgL3dwLWNvbnRlbnQvdGhlbWVzL2JsYW5rc2xhdGUvZGlzdC9pbWcvZGVmYXVsdC5wbmdgO1xuICBjb25zdCAkbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpO1xuXHRjb25zdCAkbG9hZGVyR0lGID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckdJRicpO1xuICBjb25zdCAkbG9hZGVyU1ZHID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlclNWRycpO1xuICBjb25zdCAkbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgY29uc3QgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICBjb25zdCAkbG9nbyA9ICRoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdFNlY3Rpb24gPSAkbWFpbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0Q29udGVudCA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLndvcmstY29udGVudCcpO1xuICBjb25zdCAkYWJvdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0Jyk7XG4gIGNvbnN0ICRhYm91dENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19jbG9zZScpO1xuICBjb25zdCAkYWJvdXRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19wYWdlJyk7XG4gIGNvbnN0ICRhYm91dEJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LWJnJyk7XG4gIGNvbnN0ICRhYm91dElubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWlubmVyJyk7XG4gIGNvbnN0ICRleGl0QWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpdEFib3V0Jyk7XG4gIGNvbnN0ICRjb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcbiAgY29uc3QgJGNvbnRhY3RQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWZvcm0tYXJyb3cnKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3dQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGVGb3JtQXJyb3cnKTtcbiAgY29uc3QgYXJyb3dQYXRocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbHMtYXJyb3cnKTtcbiAgY29uc3QgcHJldkFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LWJhY2snKTtcbiAgY29uc3QgbmV4dEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LW5leHQnKTtcbiAgY29uc3QgcHJldkFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZBcnJvdycpO1xuICBjb25zdCBuZXh0QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dEFycm93Jyk7XG5cdGNvbnN0ICRhbGxBcnJvd1N2Z3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXJyb3cgc3ZnJyk7XG4gIGNvbnN0ICR3b3JrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICR3b3JrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRleHQnKTtcbiAgY29uc3QgJHdvcmtUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10aXRsZScpO1xuICBjb25zdCAkd29ya0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1idG4nKTtcblx0Y29uc3QgJHdvcmtMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWxpbmsgYScpO1xuICBjb25zdCAkbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2VMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EubGluaycpO1xuXHRjb25zdCBpbm5lckN1cnNvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yLS1zbWFsbFwiKTtcblx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLWNhbnZhc1wiKTtcblx0Y29uc3QgJHN1Ym1pdEJ0biA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bdHlwZT1cInN1Ym1pdFwiXScpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdCAgfTtcblx0XHQgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdH07XG5cdFx0aW5pdEN1cnNvcigpO1xuXG5cdFx0bGV0IGxhc3RYID0gMDtcblx0XHRsZXQgbGFzdFkgPSAwO1xuXHRcdGxldCBpc1N0dWNrID0gZmFsc2U7XG5cdFx0bGV0IHNob3dDdXJzb3IgPSBmYWxzZTtcblx0XHRsZXQgZ3JvdXA7XG5cdFx0bGV0IHN0dWNrWDtcblx0XHRsZXQgc3R1Y2tZO1xuXHRcdGxldCBmaWxsT3V0ZXJDdXJzb3I7XG5cdFx0Y29uc3QgaW5pdENhbnZhcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHNoYXBlQm91bmRzID0ge1xuXHRcdFx0XHR3aWR0aDogNzUsXG5cdFx0XHRcdGhlaWdodDogNzUsXG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIuc2V0dXAoY2FudmFzKTtcblx0XHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gJ3JnYmEoNjAsIDc0LCA4MywgMC41KSc7XG5cdFx0XHRjb25zdCBzdHJva2VXaWR0aCA9IDE7XG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IDg7XG5cdFx0XHRjb25zdCByYWRpdXMgPSAxNTtcblx0XHRcdGNvbnN0IG5vaXNlU2NhbGUgPSAxNTA7XG5cdFx0XHRjb25zdCBub2lzZVJhbmdlID0gNjtcblx0XHRcdGxldCBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwb2x5Z29uID0gbmV3IHBhcGVyLlBhdGguUmVndWxhclBvbHlnb24oXG5cdFx0XHRcdG5ldyBwYXBlci5Qb2ludCgwLDApLFxuXHRcdFx0XHRzZWdtZW50cyxcblx0XHRcdFx0cmFkaXVzLFxuXHRcdFx0KTtcblx0XHRcdHBvbHlnb24uc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcbiAgXHRcdHBvbHlnb24uc3Ryb2tlV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgXHRcdHBvbHlnb24uc21vb3RoKCk7XG4gIFx0XHRncm91cCA9IG5ldyBwYXBlci5Hcm91cChbcG9seWdvbl0pO1xuICBcdFx0Z3JvdXAuYXBwbHlNYXRyaXggPSBmYWxzZTtcblx0XHRcdGNvbnN0IG5vaXNlT2JqZWN0cyA9IHBvbHlnb24uc2VnbWVudHMubWFwKCgpID0+IG5ldyBTaW1wbGV4Tm9pc2UoKSk7XG4gIFx0XHRsZXQgYmlnQ29vcmRpbmF0ZXMgPSBbXTtcblx0XHRcdGNvbnN0IGxlcnAgPSAoYSwgYiwgbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYjtcblx0XHRcdH07XG5cdFx0XHRjb25zdCBtYXAgPSAodmFsdWUsIGluX21pbiwgaW5fbWF4LCBvdXRfbWluLCBvdXRfbWF4KSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0KCh2YWx1ZSAtIGluX21pbikgKiAob3V0X21heCAtIG91dF9taW4pKSAvIChpbl9tYXggLSBpbl9taW4pICsgb3V0X21pblxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IGV2ZW50ID0+IHtcblxuXG5cdFx0XHRcdGlmICghaXNTdHVjaykge1xuXHRcdFx0ICAgIC8vIG1vdmUgY2lyY2xlIGFyb3VuZCBub3JtYWxseVxuXHRcdFx0ICAgIGxhc3RYID0gbGVycChsYXN0WCwgY2xpZW50WCwgMC4yKTtcblx0XHRcdCAgICBsYXN0WSA9IGxlcnAobGFzdFksIGNsaWVudFksIDAuMik7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfSBlbHNlIGlmIChpc1N0dWNrKSB7XG5cdFx0XHQgICAgLy8gZml4ZWQgcG9zaXRpb24gb24gYSBuYXYgaXRlbVxuXHRcdFx0ICAgIGxhc3RYID0gbGVycChsYXN0WCwgc3R1Y2tYLCAwLjA4KTtcblx0XHRcdCAgICBsYXN0WSA9IGxlcnAobGFzdFksIHN0dWNrWSwgMC4wOCk7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfVxuXG5cdFx0XHRcdGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoIDwgc2hhcGVCb3VuZHMud2lkdGgpIHtcblx0XHRcdFx0XHQvLyBzY2FsZSB1cCB0aGUgc2hhcGVcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKDEuMTUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID4gMzApIHtcblx0XHRcdFx0XHQvLyByZW1vdmUgbm9pc2Vcblx0XHRcdFx0XHRpZiAoaXNOb2lzeSkge1xuXHRcdFx0XHRcdCAgcG9seWdvbi5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBpKSA9PiB7XG5cdFx0XHRcdFx0ICAgIHNlZ21lbnQucG9pbnQuc2V0KGJpZ0Nvb3JkaW5hdGVzW2ldWzBdLCBiaWdDb29yZGluYXRlc1tpXVsxXSk7XG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHQgIGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdFx0XHQgIGJpZ0Nvb3JkaW5hdGVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHNjYWxlIGRvd24gdGhlIHNoYXBlXG5cdFx0XHRcdFx0Y29uc3Qgc2NhbGVEb3duID0gMC45Mjtcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKHNjYWxlRG93bik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB3aGlsZSBzdHVjayBhbmQgYmlnLCBhcHBseSBzaW1wbGV4IG5vaXNlXG5cdFx0XHQgIGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID49IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHQgICAgaXNOb2lzeSA9IHRydWU7XG5cdFx0XHQgICAgLy8gZmlyc3QgZ2V0IGNvb3JkaW5hdGVzIG9mIGxhcmdlIGNpcmNsZVxuXHRcdFx0ICAgIGlmIChiaWdDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdCAgICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0ICAgICAgICBiaWdDb29yZGluYXRlc1tpXSA9IFtzZWdtZW50LnBvaW50LngsIHNlZ21lbnQucG9pbnQueV07XG5cdFx0XHQgICAgICB9KTtcblx0XHRcdCAgICB9XG5cblx0XHRcdCAgICAvLyBsb29wIG92ZXIgYWxsIHBvaW50cyBvZiB0aGUgcG9seWdvblxuXHRcdFx0ICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXG5cdFx0XHQgICAgICAvLyBnZXQgbmV3IG5vaXNlIHZhbHVlXG5cdFx0XHQgICAgICAvLyB3ZSBkaXZpZGUgZXZlbnQuY291bnQgYnkgbm9pc2VTY2FsZSB0byBnZXQgYSB2ZXJ5IHNtb290aCB2YWx1ZVxuXHRcdFx0ICAgICAgY29uc3Qgbm9pc2VYID0gbm9pc2VPYmplY3RzW2ldLm5vaXNlMkQoZXZlbnQuY291bnQgLyBub2lzZVNjYWxlLCAwKTtcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWSA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMSk7XG5cblx0XHRcdCAgICAgIC8vIG1hcCB0aGUgbm9pc2UgdmFsdWUgdG8gb3VyIGRlZmluZWQgcmFuZ2Vcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25YID0gbWFwKG5vaXNlWCwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25ZID0gbWFwKG5vaXNlWSwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblxuXHRcdFx0ICAgICAgLy8gYXBwbHkgZGlzdG9ydGlvbiB0byBjb29yZGluYXRlc1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WCA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzBdICsgZGlzdG9ydGlvblg7XG5cdFx0XHQgICAgICBjb25zdCBuZXdZID0gYmlnQ29vcmRpbmF0ZXNbaV1bMV0gKyBkaXN0b3J0aW9uWTtcblxuXHRcdFx0ICAgICAgLy8gc2V0IG5ldyAobm9pc3kpIGNvb3JkaW5kYXRlIG9mIHBvaW50XG5cdFx0XHQgICAgICBzZWdtZW50LnBvaW50LnNldChuZXdYLCBuZXdZKTtcblx0XHRcdCAgICB9KTtcblxuXHRcdFx0ICB9XG5cdFx0XHQgIHBvbHlnb24uc21vb3RoKCk7XG5cblxuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW1Cb3ggPSBuYXZJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRzdHVja1ggPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gubGVmdCArIG5hdkl0ZW1Cb3gud2lkdGggLyAyKTtcblx0XHRcdFx0c3R1Y2tZID0gTWF0aC5yb3VuZChuYXZJdGVtQm94LnRvcCArIG5hdkl0ZW1Cb3guaGVpZ2h0IC8gMik7XG5cdFx0XHRcdGlzU3R1Y2sgPSB0cnVlO1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6J3JnYmEoNjAsIDc0LCA4MywgMC41KScsIHNjYWxlOjAuMjUsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUgPSAoKSA9PiB7XG5cdFx0XHRcdGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOicjYjdkZGUxJywgc2NhbGU6MSwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdFR3ZWVuTWF4LnRvKGlubmVyQ3Vyc29yLCAxLCB7YmFja2dyb3VuZDoncmdiYSg2MCwgNzQsIDgzLCAwLjUpJywgc2NhbGU6MiwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6JyNiN2RkZTEnLCBzY2FsZToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblx0XHRcdH07XG5cdFx0XHQkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCR3b3JrTGlua3MuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkYWxsQXJyb3dTdmdzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCR3b3JrQnRucy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG5cdFx0XHQkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkbG9nby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCRzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHQkc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXG5cdFx0fVxuXHRcdGluaXRDdXJzb3JIb3ZlcnMoKTtcblxuXG5cblxuXG5cblx0fVxuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICBvbmVQYWdlU2Nyb2xsKFwiLm1haW5cIiwge1xuICAgICAgc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuNTAsIDAsIDAuNTAsIDEpXCIsXG4gICAgICBhbmltYXRpb25UaW1lOiA3NTAsXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBhbGxQcm9ncmVzc0JhcnMgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uLXByb2dyZXNzJyk7XG4gICAgICAgIGFsbFByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgVHdlZW5NYXgudG8oYmFyLCAxLCB7d2lkdGg6JzAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZm9yZU1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGJlZm9yZU1vdmVUbFxuICAgICAgICAgICAgLnNldChjX2JnXzEsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYmdfMiwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19hcnRpY2xlLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3N2Zywge3hQZXJjZW50Oi0yMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfaW1nLCB7c2NhbGU6Ljc1LCBhdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29yaywge2F1dG9BbHBoYTowLCB5UGVyY2VudDo1MH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya190ZXh0LCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0yNX0pXG4gICAgICAgICAgICA7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yKGBhW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpbmsucHJldmlvdXNTaWJsaW5nO1xuXG4gICAgICAgIGxldCBhZnRlck1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBsZXQgYWZ0ZXJNb3ZlU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChjX2luZGV4LCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgIGxldCBjaGFycyA9IGFmdGVyTW92ZVNwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICBhZnRlck1vdmVUbFxuICAgICAgICAgICAgLnRvKGNfYmdfMSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZScpXG4gICAgICAgICAgICAudG8oY19iZ18yLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKVxuICAgICAgICAgICAgLnRvKGNfYXJ0aWNsZSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjUnKVxuICAgICAgICAgICAgLnRvKGNfc3ZnLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmtfaW1nLCAxLjUsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmssIC41LCB7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS4yNScpXG4gICAgICAgICAgICAudG8oY193b3JrX3RleHQsIDEsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjUnKVxuICAgICAgICAgICAgLnN0YWdnZXJGcm9tKGNoYXJzLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50Oi0xMDAsIGVhc2U6IEV4cG8uZWFzZU91dH0sIDAuMjUsICdiZWZvcmUrPTEuNzUnKVxuICAgICAgICAgICAgLnRvKGN1cnJlbnRQcm9ncmVzc0JhciwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1Jyk7XG4gICAgICB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGknKTtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG4gICAgY29uc3QgJHdvcmtJbmRpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstaW5kZXgnKTtcbiAgICBjb25zdCAkdG90YWxQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3RhbC1wcm9ncmVzcycpO1xuXG4gICAgZnVuY3Rpb24gb3BlbldvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGl0bGUgPSB0aGlzO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8ob3Blbkljb24sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VXb3JrVGV4dChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgbGV0IHdvcmtCdG4gPSB0aGlzO1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHdvcmtUaXRsZS5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBkaXNwbGF5ID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnY2xvc2VkJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG4gICAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZXhwYW5kV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41JylcbiAgICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoZGlzcGxheSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ2Nsb3NlZCcpO1xuICAgICAgICBsZXQgaGlkZVdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBoaWRlV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjowLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZScpXG4gICAgICAgICAgICAudG8od29ya01haW4sIDAuNSwge2Rpc3BsYXk6J25vbmUnLCBhdXRvQWxwaGE6MCwgeVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonYXV0bycsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfVxuICAgIH1cblxuICAgICR3b3JrVGl0bGVzLmZvckVhY2godGl0bGUgPT4gdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuV29ya1RleHQpKTtcbiAgICAkd29ya0J0bnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXb3JrVGV4dCkpO1xuXG4gICAgY29uc3QgaG92ZXJXb3JrSXRlbSA9IChlKSA9PiB7XG4gICAgICBsZXQgd29ya0l0ZW0gPSBlLnRhcmdldDtcbiAgICAgIGxldCB0ZXh0ID0gZS50YXJnZXQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB0aXRsZSA9IHRleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB0aXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uU3ZnID0gb3Blbkljb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25QYXRoID0gb3Blbkljb25TdmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaG92ZXJTdGF0dXMgPSB3b3JrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnKTtcbiAgICAgIGlmIChob3ZlclN0YXR1cyA9PT0gJ25vJykge1xuICAgICAgICB3b3JrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnLCAneWVzJyk7XG4gICAgICAgIGxldCBlbnRlcldvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBlbnRlcldvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOidyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzUwcHggMCcsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb24sIDAuNSwge3lQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlfSx7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDogJ25vbmUnfSx7ZmlsbDonIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0wLjUnKTtcbiAgICAgIH0gZWxzZSBpZiAoaG92ZXJTdGF0dXMgPT09ICd5ZXMnKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICdubycpO1xuICAgICAgICBsZXQgbGVhdmVXb3JrSXRlbVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbGVhdmVXb3JrSXRlbVRsXG4gICAgICAgICAgICAudG8odGV4dCwgMSwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8odGl0bGUsIDEsIHtwYWRkaW5nOicxMHB4IDAnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgIH1cblxuICAgIHByZXZBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlVXAoJy5tYWluJyk7XG4gICAgICBjb25zdCBwcmV2QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBwcmV2QXJyb3dPdXRUbC5mcm9tVG8ocHJldkFycm93LCAuNSwge3g6LTEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc3AnKVxuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgcHJldkFycm93T3V0VGwudG8ocHJldkFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NwKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlRG93bignLm1haW4nKTtcbiAgICAgIGNvbnN0IG5leHRBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIG5leHRBcnJvd091dFRsLmZyb21UbyhuZXh0QXJyb3csIC41LCB7eDoxMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NuJyk7XG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBuZXh0QXJyb3dPdXRUbC50byhuZXh0QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc24rPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICBhcnJvd1BhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUVudGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUVudGVyVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjAuOTUsIGZpbGw6JyMwODExMjEnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOic3MyUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlTGVhdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlTGVhdmVUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MSwgZmlsbDonbm9uZScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwidG90YWwtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cImN1cnJlbnQtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0UHJvZ3Jlc3MoZSkge1xuICAgICAgbGV0IGNQcm9ncmVzcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDEsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAyLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRmb290ZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHJlc2V0UHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgICRwYWdpbmF0aW9uTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxldCBsaW5rcyA9ICRwYWdpbmF0aW9uTGlua3MubGVuZ3RoO1xuICAgICAgbGV0IHBlcmNlbnRQZXJMaW5rID0gMTAwIC8gbGlua3M7XG4gICAgICBpZiAobGlua3MgPCAxMCkge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGxpbmtzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGxpbmtzO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaSA9IGN1cnJlbnRMaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGluZGV4ID0gY3VycmVudExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGN1cnJlbnRMaS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBjUHJvZ3Jlc3MgPSBwYWdpbmF0aW9uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdGFyZ2V0TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqaW5kZXh9JWA7XG4gICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayphY3RpdmVJbmRleH0lYDtcblxuICAgICAgICAgIGlmIChpbmRleCA8IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke2N1cnJlbnRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRwYWdpbmF0aW9uTGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgbGV0IGxpbmsgPSBsaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBpbmRleCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgfSk7XG5cbiAgICAkd29ya0luZGljZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBsZXQgaW5kaWNlcyA9ICR3b3JrSW5kaWNlcy5sZW5ndGg7XG4gICAgICBsZXQgc2VjdGlvbiA9IGluZGV4LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmIChpbmRpY2VzIDwgMTApIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBpbmRpY2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGluZGljZXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9IChlbGVtLCBhdHRyLCBhLCBiKSA9PiB7XG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2VsZW19YCk7XG4gICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKGAke2F0dHJ9YCwgY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKGAke2F0dHJ9YCkgPT09IGEgPyBiIDogYSk7XG4gICAgfVxuXG4gICAgJGNvbnRhY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHNob3dGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHNob3dGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLmZyb21UbygkY29udGFjdFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS4yNScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3csIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6NjUsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNDUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93UGF0aCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRoaWRlRm9ybUFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBoaWRlRm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBoaWRlRm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2ZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRjb250YWN0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAxLCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuXHRcdFx0Y3Vyc29yTW9kdWxlKCk7XG5cdFx0fVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
