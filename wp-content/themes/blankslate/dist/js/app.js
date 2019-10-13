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
        }, 'before+=1').staggerFrom(chars, 1, {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiRhbGxBcnJvd1N2Z3MiLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkd29ya0xpbmtzIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwiaW5uZXJDdXJzb3IiLCJjYW52YXMiLCIkc3VibWl0QnRuIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIiLCJuYXZJdGVtIiwiY3VycmVudFRhcmdldCIsIm5hdkl0ZW1Cb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwicm91bmQiLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZCIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCJsaW5rIiwiJHBhZ2luYXRpb25MaW5rcyIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY19pbmRleCIsImFsbFByb2dyZXNzQmFycyIsImJhciIsImJlZm9yZU1vdmVUbCIsImFmdGVyTW92ZSIsInByZXZBcnJvd0luVGwiLCJuZXh0QXJyb3dJblRsIiwiY3VycmVudExpbmsiLCJjdXJyZW50UHJvZ3Jlc3NCYXIiLCJwcmV2aW91c1NpYmxpbmciLCJhZnRlck1vdmVUbCIsImFmdGVyTW92ZVNwbGl0VGV4dCIsIlNwbGl0VGV4dCIsInR5cGUiLCJjaGFycyIsImxvb3AiLCJrZXlib2FyZCIsInJlc3BvbnNpdmVGYWxsYmFjayIsIiRwYWdpbmF0aW9uTGlzIiwiJHdvcmtJbmRpY2VzIiwiJHRvdGFsUHJvZ3Jlc3MiLCJvcGVuV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIndvcmtJdGVtIiwid29ya1RleHQiLCJ3b3JrVGl0bGUiLCJvcGVuSWNvbiIsIm9wZW5JY29uU3ZnIiwib3Blbkljb25QYXRoIiwid29ya01haW4iLCJleHBhbmRXb3JrVGV4dFRsIiwic3RhdHVzIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYmFja2dyb3VuZENvbG9yIiwicm90YXRpb24iLCJjbG9zZVdvcmtUZXh0IiwicGFyZW50RWxlbWVudCIsImNsb3NlV29ya1RleHRUbCIsIml0ZW0iLCJidXR0b24iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwidGFyZ2V0IiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwiYWJvdXRUbCIsInN0YWdnZXJUbyIsImJhY2tUbDEiLCJiYWNrVGwiLCJhYm91dENsb3NlSG92ZXJUbCIsImhpZ2hsaWdodExpbmsiLCIkaGlnaGxpZ2h0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZCIsImhpZ2hsaWdoTGlua1RsIiwidW5oaWdobGlnaHRMaW5rIiwiaGlnaGxpZ2h0IiwicmVtb3ZlIiwib25sb2FkIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLEdBQUcsR0FBSSxZQUFZO0FBRXhCLE1BQU1DLFFBQVEsR0FBR0MsV0FBVyxDQUFDQyxPQUE3QjtB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UCxHQUFvQixHQUF4QixFQUE2QjtBQUMzQnRELE1BQUFBLE1BQU0sQ0FBQ2EsT0FBUCxDQUFlLFVBQUFpSSxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDekcsZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0N1TSxhQUFwQyxDQUFKO0FBQUEsT0FBbkI7QUFDQTVPLE1BQUFBLE1BQU0sQ0FBQ2EsT0FBUCxDQUFlLFVBQUFpSSxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDekcsZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0M4TSxlQUFwQyxDQUFKO0FBQUEsT0FBbkI7QUFDRDs7QUFFRDlPLElBQUFBLFlBQVk7QUFDWitDLElBQUFBLFVBQVU7O0FBQ1osUUFBSUMsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzVCUSxNQUFBQSxZQUFZO0FBQ1o7QUFDQSxHQS9WRDs7QUFpV0EsU0FBTztBQUNMa0YsSUFBQUEsSUFBSSxFQUFFQTtBQURELEdBQVA7QUFHRCxDQTlwQlcsRUFBWjs7QUFncUJBM0YsTUFBTSxDQUFDaU0sTUFBUCxHQUFnQixZQUFNO0FBQ3BCN1IsRUFBQUEsR0FBRyxDQUFDdUwsSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCAkc2l0ZXVybCA9IEVMWVNTRVJPTUVPLnNpdGV1cmw7XG5cdGNvbnN0ICRkZWZhdWx0SW1nID0gYC93cC1jb250ZW50L3RoZW1lcy9ibGFua3NsYXRlL2Rpc3QvaW1nL2RlZmF1bHQucG5nYDtcbiAgY29uc3QgJGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKTtcblx0Y29uc3QgJGxvYWRlckdJRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJHSUYnKTtcbiAgY29uc3QgJGxvYWRlclNWRyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJTVkcnKTtcbiAgY29uc3QgJG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gIGNvbnN0ICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgY29uc3QgJGxvZ28gPSAkaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RTZWN0aW9uID0gJG1haW4uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdENvbnRlbnQgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJGFib3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICBjb25zdCAkYWJvdXRDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fY2xvc2UnKTtcbiAgY29uc3QgJGFib3V0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fcGFnZScpO1xuICBjb25zdCAkYWJvdXRCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1iZycpO1xuICBjb25zdCAkYWJvdXRJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1pbm5lcicpO1xuICBjb25zdCAkZXhpdEFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXRBYm91dCcpO1xuICBjb25zdCAkY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG4gIGNvbnN0ICRjb250YWN0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1mb3JtLWFycm93Jyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlRm9ybUFycm93Jyk7XG4gIGNvbnN0IGFycm93UGF0aHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xzLWFycm93Jyk7XG4gIGNvbnN0IHByZXZBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1iYWNrJyk7XG4gIGNvbnN0IG5leHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1uZXh0Jyk7XG4gIGNvbnN0IHByZXZBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2QXJyb3cnKTtcbiAgY29uc3QgbmV4dEFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRBcnJvdycpO1xuXHRjb25zdCAkYWxsQXJyb3dTdmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFycm93IHN2ZycpO1xuICBjb25zdCAkd29ya0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICBjb25zdCAkd29ya1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10ZXh0Jyk7XG4gIGNvbnN0ICR3b3JrVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGl0bGUnKTtcbiAgY29uc3QgJHdvcmtCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstYnRuJyk7XG5cdGNvbnN0ICR3b3JrTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1saW5rIGEnKTtcbiAgY29uc3QgJGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICBjb25zdCAkYWJvdXRQYWdlTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLmxpbmsnKTtcblx0Y29uc3QgaW5uZXJDdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tc21hbGxcIik7XG5cdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yLS1jYW52YXNcIik7XG5cdGNvbnN0ICRzdWJtaXRCdG4gPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW3R5cGU9XCJzdWJtaXRcIl0nKTtcblxuICBjb25zdCBsb2FkZXJNb2R1bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRmaXJzdEZvb3Rlck5hdkl0ZW0gPSAkZm9vdGVyTmF2LmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIGNvbnN0IHJlZ2V4ID0gLyhcXC93cC1jb250ZW50KShbL3wufFxcd3xcXHN8LV0pKlxcLig/OmpwZ3xnaWZ8cG5nKS9nO1xuICAgIGNvbnN0ICRpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gICAgbGV0IGltZ1NyY3MgPSBbXTtcbiAgICAkaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuXHRcdFx0aWYgKGltYWdlLnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXgpID09IG51bGwpIHtcblx0XHRcdFx0aW1hZ2Uuc3R5bGUuY3NzVGV4dCA9ICRkZWZhdWx0SW1nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW1nU3Jjcy5wdXNoKGltYWdlLnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXgpKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRjb25zdCBsb2FkaW5nVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDAsXG4gICAgICBzbW9vdGhDaGlsZFRpbWluZzogdHJ1ZSxcbiAgICAgIHJlcGVhdDogLTEsXG4gICAgICB5b3lvOiB0cnVlLFxuICAgIH0pO1xuICAgIGxvYWRpbmdUbFxuICAgICAgLmZyb21UbygkbG9hZGVyU1ZHLCAyLCB7ZHJhd1NWRzonMCUgMTAwJSd9LHsgZHJhd1NWRzonMCUgMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIGNvbnN0IGxvYWRlclRsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAyXG4gICAgfSk7XG4gICAgbGV0IGxvYWRlZEltYWdlcyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbWdTcmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgdG1wID0gbmV3IEltYWdlKCk7XG4gICAgICB0bXAuc3JjID0gaW1nU3Jjc1tpXVswXTtcbiAgICAgIHRtcC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBsb2FkZWRJbWFnZXMrKztcbiAgICAgICAgaWYgKGxvYWRlZEltYWdlcyA9PT0gaW1nU3Jjcy5sZW5ndGgpIHtcbiAgICAgICAgICBsb2FkZXJUbFxuXHRcdFx0XHRcdFx0LnRvKCRsb2FkZXJHSUYsIDAuMjUsIHthdXRvQWxwaGE6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KVxuXHRcdFx0XHRcdFx0LnNldCgkbG9hZGVyR0lGLCB7ZGlzcGxheTonbm9uZSd9KVxuXHRcdFx0XHRcdFx0LnRvKCRsb2FkZXJTVkcsIDAuMjUsIHthdXRvQWxwaGE6MSwgZWFzZTogRXhwby5lYXNlSW5PdXR9KVxuXHQgICAgICAgICAgLnRvKCRsb2FkZXIsIDMsIHthdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MicpXG5cdCAgICAgICAgICAuZnJvbSgkbG9nbywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTQnKVxuXHQgICAgICAgICAgLmZyb20oJGFib3V0TGluaywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTUnKVxuXHQgICAgICAgICAgLmZyb20ocHJldkFycm93LCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz01LjUnKVxuXHQgICAgICAgICAgLmZyb20obmV4dEFycm93LCAzLCB7eFBlcmNlbnQ6IDEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbSgkZmlyc3RDb250ZW50LCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NicpXG5cdCAgICAgICAgICAuc3RhZ2dlckZyb20oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MjAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ3N0YXJ0Kz02LjUnKVxuXHQgICAgICAgICAgLnRvKCRmaXJzdEZvb3Rlck5hdkl0ZW0sIDAuNzUsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9Ni43NScpXG5cdCAgICAgICAgICA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvcm1Nb2R1bGUgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJykpIHtcbiAgICAgICAgY29uc3Qgc3VibWl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0LWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQnKTtcbiAgICAgICAgc3VibWl0Q29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxzdmcgaWQ9XCJzdWJtaXQtYnRuXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgOTYuNTQgMzIuNDlcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy1zdWJtaXRcIiBkPVwiTS4yOCwyLjE3YzEwLjg0LDE1LjIsMjMuNTgsMjcsNDIuNzMsMjkuN0M2MS42LDM0LjUsNzkuOCwyOC41Miw5NS44MywxOS40NGMxLS41OCwxLTIuNTQtLjM2LTIuNzRhNTIuMTMsNTIuMTMsMCwwLDAtMTQuMDYtLjMzLDEuNSwxLjUsMCwwLDAsMCwzLDM1LjUyLDM1LjUyLDAsMCwxLDExLjcsMy4xbC0uMzEtMi4zNWE4Ny4xOSw4Ny4xOSwwLDAsMS05LjI0LDkuNzhjLTEuNDQsMS4zLjY5LDMuNDIsMi4xMiwyLjEyYTg3LjE5LDg3LjE5LDAsMCwwLDkuMjQtOS43OCwxLjUyLDEuNTIsMCwwLDAtLjMtMi4zNiwzOS44NSwzOS44NSwwLDAsMC0xMy4yMS0zLjUxdjNhNDkuMTUsNDkuMTUsMCwwLDEsMTMuMjcuMjJsLS4zNi0yLjc0Qzc5LjE5LDI1LjQyLDYyLDMxLjI2LDQ0LjQ0LDI5LjA1LDI1Ljc4LDI2LjcsMTMuMzksMTUuNDIsMi44Ny42NiwxLjc1LS45LS44NS42LjI4LDIuMTdaXCIvPlxuICAgICAgICA8L3N2Zz5gKTtcblxuICAgICAgICBjb25zdCBzdWJtaXRQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNscy1zdWJtaXQnKTtcbiAgICAgICAgVHdlZW5NYXguc2V0KHN1Ym1pdFBhdGgsIHtkcmF3U1ZHOicwJSd9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2ZpbGw6ICcjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0wLjUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBzdWJtaXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgc3VibWl0VGxcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtkcmF3U1ZHOicwJScsIGZpbGw6ICdub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cdGNvbnN0IGN1cnNvck1vZHVsZSA9ICgpID0+IHtcblxuXHRcdGxldCBjbGllbnRYID0gLTEwMDtcblx0XHRsZXQgY2xpZW50WSA9IC0xMDA7XG5cdFx0Y29uc3QgaW5pdEN1cnNvciA9ICgpID0+IHtcblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZSA9PiB7XG5cdFx0ICAgIGNsaWVudFggPSBlLmNsaWVudFg7XG5cdFx0ICAgIGNsaWVudFkgPSBlLmNsaWVudFk7XG5cdFx0ICB9KTtcblx0XHQgIGNvbnN0IHJlbmRlciA9ICgpID0+IHtcblx0XHQgICAgVHdlZW5NYXguc2V0KGlubmVyQ3Vyc29yLCB7XG5cdFx0ICAgICAgeDogY2xpZW50WCxcblx0XHQgICAgICB5OiBjbGllbnRZXG5cdFx0ICAgIH0pO1xuXHRcdCAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHQgIH07XG5cdFx0ICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHR9O1xuXHRcdGluaXRDdXJzb3IoKTtcblxuXHRcdGxldCBsYXN0WCA9IDA7XG5cdFx0bGV0IGxhc3RZID0gMDtcblx0XHRsZXQgaXNTdHVjayA9IGZhbHNlO1xuXHRcdGxldCBzaG93Q3Vyc29yID0gZmFsc2U7XG5cdFx0bGV0IGdyb3VwO1xuXHRcdGxldCBzdHVja1g7XG5cdFx0bGV0IHN0dWNrWTtcblx0XHRsZXQgZmlsbE91dGVyQ3Vyc29yO1xuXHRcdGNvbnN0IGluaXRDYW52YXMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBzaGFwZUJvdW5kcyA9IHtcblx0XHRcdFx0d2lkdGg6IDc1LFxuXHRcdFx0XHRoZWlnaHQ6IDc1LFxuXHRcdFx0fTtcblx0XHRcdHBhcGVyLnNldHVwKGNhbnZhcyk7XG5cdFx0XHRjb25zdCBzdHJva2VDb2xvciA9ICdyZ2JhKDYwLCA3NCwgODMsIDAuNSknO1xuXHRcdFx0Y29uc3Qgc3Ryb2tlV2lkdGggPSAxO1xuXHRcdFx0Y29uc3Qgc2VnbWVudHMgPSA4O1xuXHRcdFx0Y29uc3QgcmFkaXVzID0gMTU7XG5cdFx0XHRjb25zdCBub2lzZVNjYWxlID0gMTUwO1xuXHRcdFx0Y29uc3Qgbm9pc2VSYW5nZSA9IDY7XG5cdFx0XHRsZXQgaXNOb2lzeSA9IGZhbHNlO1xuXHRcdFx0Y29uc3QgcG9seWdvbiA9IG5ldyBwYXBlci5QYXRoLlJlZ3VsYXJQb2x5Z29uKFxuXHRcdFx0XHRuZXcgcGFwZXIuUG9pbnQoMCwwKSxcblx0XHRcdFx0c2VnbWVudHMsXG5cdFx0XHRcdHJhZGl1cyxcblx0XHRcdCk7XG5cdFx0XHRwb2x5Z29uLnN0cm9rZUNvbG9yID0gc3Ryb2tlQ29sb3I7XG4gIFx0XHRwb2x5Z29uLnN0cm9rZVdpZHRoID0gc3Ryb2tlV2lkdGg7XG4gIFx0XHRwb2x5Z29uLnNtb290aCgpO1xuICBcdFx0Z3JvdXAgPSBuZXcgcGFwZXIuR3JvdXAoW3BvbHlnb25dKTtcbiAgXHRcdGdyb3VwLmFwcGx5TWF0cml4ID0gZmFsc2U7XG5cdFx0XHRjb25zdCBub2lzZU9iamVjdHMgPSBwb2x5Z29uLnNlZ21lbnRzLm1hcCgoKSA9PiBuZXcgU2ltcGxleE5vaXNlKCkpO1xuICBcdFx0bGV0IGJpZ0Nvb3JkaW5hdGVzID0gW107XG5cdFx0XHRjb25zdCBsZXJwID0gKGEsIGIsIG4pID0+IHtcblx0XHRcdFx0cmV0dXJuICgxIC0gbikgKiBhICsgbiAqIGI7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgbWFwID0gKHZhbHVlLCBpbl9taW4sIGluX21heCwgb3V0X21pbiwgb3V0X21heCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdCgodmFsdWUgLSBpbl9taW4pICogKG91dF9tYXggLSBvdXRfbWluKSkgLyAoaW5fbWF4IC0gaW5fbWluKSArIG91dF9taW5cblx0XHRcdFx0KTtcblx0XHRcdH07XG5cdFx0XHRwYXBlci52aWV3Lm9uRnJhbWUgPSBldmVudCA9PiB7XG5cblxuXHRcdFx0XHRpZiAoIWlzU3R1Y2spIHtcblx0XHRcdCAgICAvLyBtb3ZlIGNpcmNsZSBhcm91bmQgbm9ybWFsbHlcblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIGNsaWVudFgsIDAuMik7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBjbGllbnRZLCAwLjIpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH0gZWxzZSBpZiAoaXNTdHVjaykge1xuXHRcdFx0ICAgIC8vIGZpeGVkIHBvc2l0aW9uIG9uIGEgbmF2IGl0ZW1cblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIHN0dWNrWCwgMC4wOCk7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBzdHVja1ksIDAuMDgpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH1cblxuXHRcdFx0XHRpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA8IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHRcdFx0Ly8gc2NhbGUgdXAgdGhlIHNoYXBlXG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZSgxLjE1KTtcblx0XHRcdFx0fSBlbHNlIGlmICghaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+IDMwKSB7XG5cdFx0XHRcdFx0Ly8gcmVtb3ZlIG5vaXNlXG5cdFx0XHRcdFx0aWYgKGlzTm9pc3kpIHtcblx0XHRcdFx0XHQgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRcdCAgICBzZWdtZW50LnBvaW50LnNldChiaWdDb29yZGluYXRlc1tpXVswXSwgYmlnQ29vcmRpbmF0ZXNbaV1bMV0pO1xuXHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0ICBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRcdFx0ICBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBzY2FsZSBkb3duIHRoZSBzaGFwZVxuXHRcdFx0XHRcdGNvbnN0IHNjYWxlRG93biA9IDAuOTI7XG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZShzY2FsZURvd24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gd2hpbGUgc3R1Y2sgYW5kIGJpZywgYXBwbHkgc2ltcGxleCBub2lzZVxuXHRcdFx0ICBpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+PSBzaGFwZUJvdW5kcy53aWR0aCkge1xuXHRcdFx0ICAgIGlzTm9pc3kgPSB0cnVlO1xuXHRcdFx0ICAgIC8vIGZpcnN0IGdldCBjb29yZGluYXRlcyBvZiBsYXJnZSBjaXJjbGVcblx0XHRcdCAgICBpZiAoYmlnQ29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQgICAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblx0XHRcdCAgICAgICAgYmlnQ29vcmRpbmF0ZXNbaV0gPSBbc2VnbWVudC5wb2ludC54LCBzZWdtZW50LnBvaW50LnldO1xuXHRcdFx0ICAgICAgfSk7XG5cdFx0XHQgICAgfVxuXG5cdFx0XHQgICAgLy8gbG9vcCBvdmVyIGFsbCBwb2ludHMgb2YgdGhlIHBvbHlnb25cblx0XHRcdCAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblxuXHRcdFx0ICAgICAgLy8gZ2V0IG5ldyBub2lzZSB2YWx1ZVxuXHRcdFx0ICAgICAgLy8gd2UgZGl2aWRlIGV2ZW50LmNvdW50IGJ5IG5vaXNlU2NhbGUgdG8gZ2V0IGEgdmVyeSBzbW9vdGggdmFsdWVcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWCA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMCk7XG5cdFx0XHQgICAgICBjb25zdCBub2lzZVkgPSBub2lzZU9iamVjdHNbaV0ubm9pc2UyRChldmVudC5jb3VudCAvIG5vaXNlU2NhbGUsIDEpO1xuXG5cdFx0XHQgICAgICAvLyBtYXAgdGhlIG5vaXNlIHZhbHVlIHRvIG91ciBkZWZpbmVkIHJhbmdlXG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWCA9IG1hcChub2lzZVgsIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWSA9IG1hcChub2lzZVksIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cblx0XHRcdCAgICAgIC8vIGFwcGx5IGRpc3RvcnRpb24gdG8gY29vcmRpbmF0ZXNcblx0XHRcdCAgICAgIGNvbnN0IG5ld1ggPSBiaWdDb29yZGluYXRlc1tpXVswXSArIGRpc3RvcnRpb25YO1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WSA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzFdICsgZGlzdG9ydGlvblk7XG5cblx0XHRcdCAgICAgIC8vIHNldCBuZXcgKG5vaXN5KSBjb29yZGluZGF0ZSBvZiBwb2ludFxuXHRcdFx0ICAgICAgc2VnbWVudC5wb2ludC5zZXQobmV3WCwgbmV3WSk7XG5cdFx0XHQgICAgfSk7XG5cblx0XHRcdCAgfVxuXHRcdFx0ICBwb2x5Z29uLnNtb290aCgpO1xuXG5cblxuXHRcdFx0fVxuXHRcdH1cblx0XHRpbml0Q2FudmFzKCk7XG5cblx0XHRjb25zdCBpbml0Q3Vyc29ySG92ZXJzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlciA9IGUgPT4ge1xuXHRcdFx0XHRjb25zdCBuYXZJdGVtID0gZS5jdXJyZW50VGFyZ2V0O1xuXHRcdFx0XHRjb25zdCBuYXZJdGVtQm94ID0gbmF2SXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdFx0c3R1Y2tYID0gTWF0aC5yb3VuZChuYXZJdGVtQm94LmxlZnQgKyBuYXZJdGVtQm94LndpZHRoIC8gMik7XG5cdFx0XHRcdHN0dWNrWSA9IE1hdGgucm91bmQobmF2SXRlbUJveC50b3AgKyBuYXZJdGVtQm94LmhlaWdodCAvIDIpO1xuXHRcdFx0XHRpc1N0dWNrID0gdHJ1ZTtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOidyZ2JhKDYwLCA3NCwgODMsIDAuNSknLCBzY2FsZTowLjI1LCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblx0XHRcdH07XG5cdFx0XHRjb25zdCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRpc1N0dWNrID0gZmFsc2U7XG5cdFx0XHRcdFR3ZWVuTWF4LnRvKGlubmVyQ3Vyc29yLCAxLCB7YmFja2dyb3VuZDonI2I3ZGRlMScsIHNjYWxlOjEsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlciA9IGUgPT4ge1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6J3JnYmEoNjAsIDc0LCA4MywgMC41KScsIHNjYWxlOjIsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VMZWF2ZSA9ICgpID0+IHtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOicjYjdkZGUxJywgc2NhbGU6MSwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdCRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkd29ya0xpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRhYm91dFBhZ2VMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdCRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0JGFsbEFycm93U3Zncy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkd29ya0J0bnMuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JHdvcmtJdGVtcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0Y29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuXHRcdFx0JHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JGxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdCRsb2dvLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblxuXHRcdH1cblx0XHRpbml0Q3Vyc29ySG92ZXJzKCk7XG5cblxuXG5cblxuXG5cdH1cblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuXG4gICAgb25lUGFnZVNjcm9sbChcIi5tYWluXCIsIHtcbiAgICAgIHNlY3Rpb25Db250YWluZXI6IFwic2VjdGlvblwiLFxuICAgICAgZWFzaW5nOiBcImN1YmljLWJlemllcigwLjUwLCAwLCAwLjUwLCAxKVwiLFxuICAgICAgYW5pbWF0aW9uVGltZTogNzUwLFxuICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgICAgIHVwZGF0ZVVSTDogZmFsc2UsXG4gICAgICBiZWZvcmVNb3ZlOiBmdW5jdGlvbihpbmRleCwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBhbGxQcm9ncmVzc0JhcnMgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uLXByb2dyZXNzJyk7XG4gICAgICAgIGFsbFByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgVHdlZW5NYXgudG8oYmFyLCAxLCB7d2lkdGg6JzAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZm9yZU1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGJlZm9yZU1vdmVUbFxuICAgICAgICAgICAgLnNldChjX2JnXzEsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYmdfMiwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19hcnRpY2xlLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3N2Zywge3hQZXJjZW50Oi0yMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfaW1nLCB7c2NhbGU6Ljc1LCBhdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMH0pXG4gICAgICAgICAgICA7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnN0YWdnZXJGcm9tKGNoYXJzLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50Oi0xMDAsIGVhc2U6IEV4cG8uZWFzZU91dH0sIDAuMjUsICdiZWZvcmUrPTEuNzUnKVxuICAgICAgICAgICAgLnRvKGN1cnJlbnRQcm9ncmVzc0JhciwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1Jyk7XG4gICAgICB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGknKTtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG4gICAgY29uc3QgJHdvcmtJbmRpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstaW5kZXgnKTtcbiAgICBjb25zdCAkdG90YWxQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3RhbC1wcm9ncmVzcycpO1xuXG4gICAgZnVuY3Rpb24gb3BlbldvcmtUZXh0KGUpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgd29ya0l0ZW0gPSB0aGlzO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5sYXN0RWxlbWVudENoaWxkO1xuXHRcdFx0bGV0IHdvcmtUaXRsZSA9IHdvcmtUZXh0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXHRcdFx0bGV0IHN0YXR1cyA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG5cdFx0XHRpZiAoc3RhdHVzID09PSAnY2xvc2VkJykge1xuXHRcdFx0XHR3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG5cdFx0XHRcdGV4cGFuZFdvcmtUZXh0VGxcblx0XHRcdFx0XHQudG8od29ya1RleHQsIDEsIHthdXRvQWxwaGE6MSwgaGVpZ2h0OicxMDAlJywgYmFja2dyb3VuZENvbG9yOidyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQuZnJvbVRvKHdvcmtUaXRsZSwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se3lQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG5cdFx0XHRcdFx0LmZyb21Ubyh3b3JrTWFpbiwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se3lQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC4yNScpXG5cdFx0XHRcdFx0LmZyb21UbyhvcGVuSWNvbiwgMSwge3lQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlfSx7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIHJvdGF0aW9uOjQ1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2ZpbGw6ICdub25lJ30se2ZpbGw6JyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MScpXG5cdFx0XHRcdFx0O1xuXHRcdFx0fVxuXG4gICAgfVxuXG5cdFx0ZnVuY3Rpb24gY2xvc2VXb3JrVGV4dChlKSB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0bGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHRsZXQgd29ya1RpdGxlID0gd29ya1RleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblN2ZyA9IG9wZW5JY29uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uUGF0aCA9IG9wZW5JY29uU3ZnLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcblx0XHRcdGxldCBjbG9zZVdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRcdGxldCBzdGF0dXMgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuXHRcdFx0aWYgKHN0YXR1cyA9PT0gJ29wZW4nKSB7XG5cdFx0XHRcdHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ2Nsb3NlZCcpO1xuXHRcdFx0XHRjbG9zZVdvcmtUZXh0VGxcblx0XHRcdFx0XHQudG8od29ya1RleHQsIDEsIHthdXRvQWxwaGE6MCwgaGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQudG8od29ya1RpdGxlLCAxLCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuXHRcdFx0XHRcdC50byh3b3JrTWFpbiwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0wLjI1Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb24sIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6MTAwLCByb3RhdGlvbjowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9MC41Jylcblx0XHRcdFx0XHQudG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0xJylcblx0XHRcdFx0XHQ7XG5cdFx0XHR9XG5cblx0XHR9XG5cbiAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbldvcmtUZXh0KSk7XG5cdFx0JHdvcmtCdG5zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV29ya1RleHQpKTtcblx0XHQkd29ya0xpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0fSkpO1xuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnb3BlbicpIHtcbiAgICAgICAgbGV0IGFib3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYWJvdXRUbFxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAyLCB7eVBlcmNlbnQ6MjAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sIC4wOCwgJ2VudGVyJylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMiwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0QmcsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMTUnKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMjUnKVxuICAgICAgICAgIC5mcm9tVG8oJGV4aXRBYm91dCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTEuMjUnKVxuICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGxldCBiYWNrVGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGJhY2tUbDFcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBiYWNrVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGJhY2tUbFxuICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonIzA4MTEyMScsIHNjYWxlOjAuOTUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6J25vbmUnLCBzY2FsZToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgJGhpZ2hsaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICRoaWdobGlnaHQuY2xhc3NMaXN0LmFkZCgnbGluay1oaWdobGlnaHQnKTtcbiAgICAgIHRoaXMuYXBwZW5kKCRoaWdobGlnaHQpO1xuICAgICAgbGV0IGhpZ2hsaWdoTGlua1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGhpZ2hsaWdoTGlua1RsXG4gICAgICAgICAgLnRvKCRoaWdobGlnaHQsIDEsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pXG4gICAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubGluay1oaWdobGlnaHQnKTtcbiAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGlnaGxpZ2h0TGluaykpO1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmhpZ2hsaWdodExpbmspKTtcbiAgICB9XG5cbiAgICBsb2FkZXJNb2R1bGUoKTtcbiAgICBmb3JtTW9kdWxlKCk7XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG5cdFx0XHRjdXJzb3JNb2R1bGUoKTtcblx0XHR9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRcbiAgfVxufSkoKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgYXBwLmluaXQoKTtcbn1cbiJdfQ==
