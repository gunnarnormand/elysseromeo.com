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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiRhbGxBcnJvd1N2Z3MiLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkd29ya0xpbmtzIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwiaW5uZXJDdXJzb3IiLCJjYW52YXMiLCIkc3VibWl0QnRuIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIiLCJuYXZJdGVtIiwiY3VycmVudFRhcmdldCIsIm5hdkl0ZW1Cb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJNYXRoIiwicm91bmQiLCJsZWZ0IiwidG9wIiwiYmFja2dyb3VuZCIsImhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCJsaW5rIiwiJHBhZ2luYXRpb25MaW5rcyIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY19pbmRleCIsImFsbFByb2dyZXNzQmFycyIsImJhciIsImJlZm9yZU1vdmVUbCIsImFmdGVyTW92ZSIsInByZXZBcnJvd0luVGwiLCJuZXh0QXJyb3dJblRsIiwiY3VycmVudExpbmsiLCJjdXJyZW50UHJvZ3Jlc3NCYXIiLCJwcmV2aW91c1NpYmxpbmciLCJhZnRlck1vdmVUbCIsImFmdGVyTW92ZVNwbGl0VGV4dCIsIlNwbGl0VGV4dCIsInR5cGUiLCJjaGFycyIsImxvb3AiLCJrZXlib2FyZCIsInJlc3BvbnNpdmVGYWxsYmFjayIsIiRwYWdpbmF0aW9uTGlzIiwiJHdvcmtJbmRpY2VzIiwiJHRvdGFsUHJvZ3Jlc3MiLCJvcGVuV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJwcmV2ZW50RGVmYXVsdCIsIndvcmtJdGVtIiwid29ya1RleHQiLCJ3b3JrVGl0bGUiLCJvcGVuSWNvbiIsIm9wZW5JY29uU3ZnIiwib3Blbkljb25QYXRoIiwid29ya01haW4iLCJleHBhbmRXb3JrVGV4dFRsIiwic3RhdHVzIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiYmFja2dyb3VuZENvbG9yIiwicm90YXRpb24iLCJjbG9zZVdvcmtUZXh0IiwicGFyZW50RWxlbWVudCIsImNsb3NlV29ya1RleHRUbCIsIml0ZW0iLCJidXR0b24iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwidGFyZ2V0IiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwiYWJvdXRUbCIsInN0YWdnZXJUbyIsImJhY2tUbDEiLCJiYWNrVGwiLCJhYm91dENsb3NlSG92ZXJUbCIsImhpZ2hsaWdodExpbmsiLCIkaGlnaGxpZ2h0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZCIsImhpZ2hsaWdoTGlua1RsIiwidW5oaWdobGlnaHRMaW5rIiwiaGlnaGxpZ2h0IiwicmVtb3ZlIiwib25sb2FkIl0sIm1hcHBpbmdzIjoiOztBQUFBLElBQU1BLEdBQUcsR0FBSSxZQUFZO0FBRXhCLE1BQU1DLFFBQVEsR0FBR0MsV0FBVyxDQUFDQyxPQUE3QjtB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R0FBb0IsR0FBeEIsRUFBNkI7QUFDM0J0RCxNQUFBQSxNQUFNLENBQUNhLE9BQVAsQ0FBZSxVQUFBaUksSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ3pHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DdU0sYUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0E1TyxNQUFBQSxNQUFNLENBQUNhLE9BQVAsQ0FBZSxVQUFBaUksSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ3pHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DOE0sZUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0Q7O0FBRUQ5TyxJQUFBQSxZQUFZO0FBQ1orQyxJQUFBQSxVQUFVOztBQUNaLFFBQUlDLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUM1QlEsTUFBQUEsWUFBWTtBQUNaO0FBQ0EsR0FwVkQ7O0FBc1ZBLFNBQU87QUFDTGtGLElBQUFBLElBQUksRUFBRUE7QUFERCxHQUFQO0FBR0QsQ0Exb0JXLEVBQVo7O0FBNG9CQTNGLE1BQU0sQ0FBQ2lNLE1BQVAsR0FBZ0IsWUFBTTtBQUNwQjdSLEVBQUFBLEdBQUcsQ0FBQ3VMLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XG5cblx0Y29uc3QgJHNpdGV1cmwgPSBFTFlTU0VST01FTy5zaXRldXJsO1xuXHRjb25zdCAkZGVmYXVsdEltZyA9IGAvd3AtY29udGVudC90aGVtZXMvYmxhbmtzbGF0ZS9kaXN0L2ltZy9kZWZhdWx0LnBuZ2A7XG4gIGNvbnN0ICRsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJyk7XG5cdGNvbnN0ICRsb2FkZXJHSUYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyR0lGJyk7XG4gIGNvbnN0ICRsb2FkZXJTVkcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyU1ZHJyk7XG4gIGNvbnN0ICRtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICBjb25zdCAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gIGNvbnN0ICRsb2dvID0gJGhlYWRlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0U2VjdGlvbiA9ICRtYWluLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RDb250ZW50ID0gJGZpcnN0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICRhYm91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgY29uc3QgJGFib3V0Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2Nsb3NlJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX3BhZ2UnKTtcbiAgY29uc3QgJGFib3V0QmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtYmcnKTtcbiAgY29uc3QgJGFib3V0SW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtaW5uZXInKTtcbiAgY29uc3QgJGV4aXRBYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleGl0QWJvdXQnKTtcbiAgY29uc3QgJGNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuICBjb25zdCAkY29udGFjdFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtZm9ybS1hcnJvdycpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvd1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZUZvcm1BcnJvdycpO1xuICBjb25zdCBhcnJvd1BhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNscy1hcnJvdycpO1xuICBjb25zdCBwcmV2QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctYmFjaycpO1xuICBjb25zdCBuZXh0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbmV4dCcpO1xuICBjb25zdCBwcmV2QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldkFycm93Jyk7XG4gIGNvbnN0IG5leHRBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0QXJyb3cnKTtcblx0Y29uc3QgJGFsbEFycm93U3ZncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnJvdyBzdmcnKTtcbiAgY29uc3QgJHdvcmtJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJHdvcmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGV4dCcpO1xuICBjb25zdCAkd29ya1RpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRpdGxlJyk7XG4gIGNvbnN0ICR3b3JrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWJ0bicpO1xuXHRjb25zdCAkd29ya0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstbGluayBhJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cdGNvbnN0IGlubmVyQ3Vyc29yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLXNtYWxsXCIpO1xuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tY2FudmFzXCIpO1xuXHRjb25zdCAkc3VibWl0QnRuID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG5cbiAgY29uc3QgbG9hZGVyTW9kdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkZmlyc3RGb290ZXJOYXZJdGVtID0gJGZvb3Rlck5hdi5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCByZWdleCA9IC8oXFwvd3AtY29udGVudCkoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvZztcbiAgICBjb25zdCAkaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICAgIGxldCBpbWdTcmNzID0gW107XG4gICAgJGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdGlmIChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSA9PSBudWxsKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmNzc1RleHQgPSAkZGVmYXVsdEltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGltZ1NyY3MucHVzaChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgbG9hZGluZ1RsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWUsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgICAgeW95bzogdHJ1ZSxcbiAgICB9KTtcbiAgICBsb2FkaW5nVGxcbiAgICAgIC5mcm9tVG8oJGxvYWRlclNWRywgMiwge2RyYXdTVkc6JzAlIDEwMCUnfSx7IGRyYXdTVkc6JzAlIDAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyR0lGLCAwLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0XHRcdFx0XHRcdC5zZXQoJGxvYWRlckdJRiwge2Rpc3BsYXk6J25vbmUnfSlcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyU1ZHLCAwLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0ICAgICAgICAgIC50bygkbG9hZGVyLCAzLCB7YXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTInKVxuXHQgICAgICAgICAgLmZyb20oJGxvZ28sIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00Jylcblx0ICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz01Jylcblx0ICAgICAgICAgIC5mcm9tKHByZXZBcnJvdywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKG5leHRBcnJvdywgMywge3hQZXJjZW50OiAxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz01LjUnKVxuXHQgICAgICAgICAgLmZyb20oJGZpcnN0Q29udGVudCwgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYnKVxuXHQgICAgICAgICAgLnN0YWdnZXJGcm9tKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjIwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdzdGFydCs9Ni41Jylcblx0ICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYuNzUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdCAgfTtcblx0XHQgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdH07XG5cdFx0aW5pdEN1cnNvcigpO1xuXG5cdFx0bGV0IGxhc3RYID0gMDtcblx0XHRsZXQgbGFzdFkgPSAwO1xuXHRcdGxldCBpc1N0dWNrID0gZmFsc2U7XG5cdFx0bGV0IHNob3dDdXJzb3IgPSBmYWxzZTtcblx0XHRsZXQgZ3JvdXA7XG5cdFx0bGV0IHN0dWNrWDtcblx0XHRsZXQgc3R1Y2tZO1xuXHRcdGxldCBmaWxsT3V0ZXJDdXJzb3I7XG5cdFx0Y29uc3QgaW5pdENhbnZhcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHNoYXBlQm91bmRzID0ge1xuXHRcdFx0XHR3aWR0aDogNzUsXG5cdFx0XHRcdGhlaWdodDogNzUsXG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIuc2V0dXAoY2FudmFzKTtcblx0XHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gJ3JnYmEoNjAsIDc0LCA4MywgMC41KSc7XG5cdFx0XHRjb25zdCBzdHJva2VXaWR0aCA9IDE7XG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IDg7XG5cdFx0XHRjb25zdCByYWRpdXMgPSAxNTtcblx0XHRcdGNvbnN0IG5vaXNlU2NhbGUgPSAxNTA7XG5cdFx0XHRjb25zdCBub2lzZVJhbmdlID0gNjtcblx0XHRcdGxldCBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwb2x5Z29uID0gbmV3IHBhcGVyLlBhdGguUmVndWxhclBvbHlnb24oXG5cdFx0XHRcdG5ldyBwYXBlci5Qb2ludCgwLDApLFxuXHRcdFx0XHRzZWdtZW50cyxcblx0XHRcdFx0cmFkaXVzLFxuXHRcdFx0KTtcblx0XHRcdHBvbHlnb24uc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcbiAgXHRcdHBvbHlnb24uc3Ryb2tlV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgXHRcdHBvbHlnb24uc21vb3RoKCk7XG4gIFx0XHRncm91cCA9IG5ldyBwYXBlci5Hcm91cChbcG9seWdvbl0pO1xuICBcdFx0Z3JvdXAuYXBwbHlNYXRyaXggPSBmYWxzZTtcblx0XHRcdGNvbnN0IG5vaXNlT2JqZWN0cyA9IHBvbHlnb24uc2VnbWVudHMubWFwKCgpID0+IG5ldyBTaW1wbGV4Tm9pc2UoKSk7XG4gIFx0XHRsZXQgYmlnQ29vcmRpbmF0ZXMgPSBbXTtcblx0XHRcdGNvbnN0IGxlcnAgPSAoYSwgYiwgbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYjtcblx0XHRcdH07XG5cdFx0XHRjb25zdCBtYXAgPSAodmFsdWUsIGluX21pbiwgaW5fbWF4LCBvdXRfbWluLCBvdXRfbWF4KSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0KCh2YWx1ZSAtIGluX21pbikgKiAob3V0X21heCAtIG91dF9taW4pKSAvIChpbl9tYXggLSBpbl9taW4pICsgb3V0X21pblxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IGV2ZW50ID0+IHtcblxuXHRcdFx0XHRpZiAoIWlzU3R1Y2spIHtcblx0XHRcdCAgICAvLyBtb3ZlIGNpcmNsZSBhcm91bmQgbm9ybWFsbHlcblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIGNsaWVudFgsIDAuMik7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBjbGllbnRZLCAwLjIpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH0gZWxzZSBpZiAoaXNTdHVjaykge1xuXHRcdFx0ICAgIC8vIGZpeGVkIHBvc2l0aW9uIG9uIGEgbmF2IGl0ZW1cblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIHN0dWNrWCwgMC4wOCk7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBzdHVja1ksIDAuMDgpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH1cblxuXHRcdFx0XHRpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA8IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHRcdFx0Ly8gc2NhbGUgdXAgdGhlIHNoYXBlXG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZSgxLjE1KTtcblx0XHRcdFx0fSBlbHNlIGlmICghaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+IDMwKSB7XG5cdFx0XHRcdFx0Ly8gcmVtb3ZlIG5vaXNlXG5cdFx0XHRcdFx0aWYgKGlzTm9pc3kpIHtcblx0XHRcdFx0XHQgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRcdCAgICBzZWdtZW50LnBvaW50LnNldChiaWdDb29yZGluYXRlc1tpXVswXSwgYmlnQ29vcmRpbmF0ZXNbaV1bMV0pO1xuXHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0ICBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRcdFx0ICBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBzY2FsZSBkb3duIHRoZSBzaGFwZVxuXHRcdFx0XHRcdGNvbnN0IHNjYWxlRG93biA9IDAuOTI7XG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZShzY2FsZURvd24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gd2hpbGUgc3R1Y2sgYW5kIGJpZywgYXBwbHkgc2ltcGxleCBub2lzZVxuXHRcdFx0ICBpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+PSBzaGFwZUJvdW5kcy53aWR0aCkge1xuXHRcdFx0ICAgIGlzTm9pc3kgPSB0cnVlO1xuXHRcdFx0ICAgIC8vIGZpcnN0IGdldCBjb29yZGluYXRlcyBvZiBsYXJnZSBjaXJjbGVcblx0XHRcdCAgICBpZiAoYmlnQ29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQgICAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblx0XHRcdCAgICAgICAgYmlnQ29vcmRpbmF0ZXNbaV0gPSBbc2VnbWVudC5wb2ludC54LCBzZWdtZW50LnBvaW50LnldO1xuXHRcdFx0ICAgICAgfSk7XG5cdFx0XHQgICAgfVxuXG5cdFx0XHQgICAgLy8gbG9vcCBvdmVyIGFsbCBwb2ludHMgb2YgdGhlIHBvbHlnb25cblx0XHRcdCAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblxuXHRcdFx0ICAgICAgLy8gZ2V0IG5ldyBub2lzZSB2YWx1ZVxuXHRcdFx0ICAgICAgLy8gd2UgZGl2aWRlIGV2ZW50LmNvdW50IGJ5IG5vaXNlU2NhbGUgdG8gZ2V0IGEgdmVyeSBzbW9vdGggdmFsdWVcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWCA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMCk7XG5cdFx0XHQgICAgICBjb25zdCBub2lzZVkgPSBub2lzZU9iamVjdHNbaV0ubm9pc2UyRChldmVudC5jb3VudCAvIG5vaXNlU2NhbGUsIDEpO1xuXG5cdFx0XHQgICAgICAvLyBtYXAgdGhlIG5vaXNlIHZhbHVlIHRvIG91ciBkZWZpbmVkIHJhbmdlXG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWCA9IG1hcChub2lzZVgsIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWSA9IG1hcChub2lzZVksIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cblx0XHRcdCAgICAgIC8vIGFwcGx5IGRpc3RvcnRpb24gdG8gY29vcmRpbmF0ZXNcblx0XHRcdCAgICAgIGNvbnN0IG5ld1ggPSBiaWdDb29yZGluYXRlc1tpXVswXSArIGRpc3RvcnRpb25YO1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WSA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzFdICsgZGlzdG9ydGlvblk7XG5cblx0XHRcdCAgICAgIC8vIHNldCBuZXcgKG5vaXN5KSBjb29yZGluZGF0ZSBvZiBwb2ludFxuXHRcdFx0ICAgICAgc2VnbWVudC5wb2ludC5zZXQobmV3WCwgbmV3WSk7XG5cdFx0XHQgICAgfSk7XG5cblx0XHRcdCAgfVxuXHRcdFx0ICBwb2x5Z29uLnNtb290aCgpO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW1Cb3ggPSBuYXZJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRzdHVja1ggPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gubGVmdCArIG5hdkl0ZW1Cb3gud2lkdGggLyAyKTtcblx0XHRcdFx0c3R1Y2tZID0gTWF0aC5yb3VuZChuYXZJdGVtQm94LnRvcCArIG5hdkl0ZW1Cb3guaGVpZ2h0IC8gMik7XG5cdFx0XHRcdGlzU3R1Y2sgPSB0cnVlO1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6J3JnYmEoNjAsIDc0LCA4MywgMC41KScsIHNjYWxlOjAuMjUsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUgPSAoKSA9PiB7XG5cdFx0XHRcdGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOicjYjdkZGUxJywgc2NhbGU6MSwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdFR3ZWVuTWF4LnRvKGlubmVyQ3Vyc29yLCAxLCB7YmFja2dyb3VuZDoncmdiYSg2MCwgNzQsIDgzLCAwLjUpJywgc2NhbGU6MiwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6JyNiN2RkZTEnLCBzY2FsZToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblx0XHRcdH07XG5cdFx0XHQkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCR3b3JrTGlua3MuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkYWxsQXJyb3dTdmdzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCR3b3JrQnRucy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkd29ya0l0ZW1zLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG5cdFx0XHQkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkbG9nby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCRzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHQkc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXG5cdFx0fVxuXHRcdGluaXRDdXJzb3JIb3ZlcnMoKTtcblxuXHR9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgYWxsUHJvZ3Jlc3NCYXJzID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbi1wcm9ncmVzcycpO1xuICAgICAgICBhbGxQcm9ncmVzc0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGJhciwgMSwge3dpZHRoOicwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBiZWZvcmVNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBiZWZvcmVNb3ZlVGxcbiAgICAgICAgICAgIC5zZXQoY19iZ18xLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2JnXzIsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYXJ0aWNsZSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19zdmcsIHt4UGVyY2VudDotMjAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX2ltZywge3NjYWxlOi43NSwgYXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDB9KTtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yKGBhW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpbmsucHJldmlvdXNTaWJsaW5nO1xuXG4gICAgICAgIGxldCBhZnRlck1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBsZXQgYWZ0ZXJNb3ZlU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChjX2luZGV4LCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgIGxldCBjaGFycyA9IGFmdGVyTW92ZVNwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICBhZnRlck1vdmVUbFxuICAgICAgICAgICAgLnRvKGNfYmdfMSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZScpXG4gICAgICAgICAgICAudG8oY19iZ18yLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKVxuICAgICAgICAgICAgLnRvKGNfYXJ0aWNsZSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjUnKVxuICAgICAgICAgICAgLnRvKGNfc3ZnLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmtfaW1nLCAxLjUsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC5zdGFnZ2VyRnJvbShjaGFycywgMSwge2F1dG9BbHBoYTowLCB5UGVyY2VudDotMTAwLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAwLjI1LCAnYmVmb3JlKz0xLjc1JylcbiAgICAgICAgICAgIC50byhjdXJyZW50UHJvZ3Jlc3NCYXIsIDAuNzUsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpO1xuICAgICAgfSxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmVGYWxsYmFjazogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpJyk7XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuICAgIGNvbnN0ICR3b3JrSW5kaWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWluZGV4Jyk7XG4gICAgY29uc3QgJHRvdGFsUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG90YWwtcHJvZ3Jlc3MnKTtcblxuICAgIGZ1bmN0aW9uIG9wZW5Xb3JrVGV4dChlKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtJdGVtID0gdGhpcztcbiAgICAgIGxldCB3b3JrVGV4dCA9IHRoaXMubGFzdEVsZW1lbnRDaGlsZDtcblx0XHRcdGxldCB3b3JrVGl0bGUgPSB3b3JrVGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHdvcmtUaXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uU3ZnID0gb3Blbkljb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25QYXRoID0gb3Blbkljb25TdmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcblx0XHRcdGxldCBzdGF0dXMgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuXHRcdFx0aWYgKHN0YXR1cyA9PT0gJ2Nsb3NlZCcpIHtcblx0XHRcdFx0d29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuXHRcdFx0XHRleHBhbmRXb3JrVGV4dFRsXG5cdFx0XHRcdFx0LnRvKHdvcmtUZXh0LCAxLCB7YXV0b0FscGhhOjEsIGhlaWdodDonMTAwJScsIGJhY2tncm91bmRDb2xvcjoncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG5cdFx0XHRcdFx0LmZyb21Ubyh3b3JrVGl0bGUsIDEsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHt5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuXHRcdFx0XHRcdC5mcm9tVG8od29ya01haW4sIDEsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHt5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTAuMjUnKVxuXHRcdFx0XHRcdC5mcm9tVG8ob3Blbkljb24sIDEsIHt5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZX0se2F1dG9BbHBoYToxLCB5UGVyY2VudDowLCByb3RhdGlvbjo0NSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTAuNScpXG5cdFx0XHRcdFx0LmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTAuNScpXG5cdFx0XHRcdFx0LmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTEnKTtcblx0XHRcdH1cblxuICAgIH1cblxuXHRcdGZ1bmN0aW9uIGNsb3NlV29ya1RleHQoZSkge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGxldCB3b3JrVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0bGV0IHdvcmtUaXRsZSA9IHdvcmtUZXh0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRsZXQgY2xvc2VXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cdFx0XHRsZXQgc3RhdHVzID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcblx0XHRcdGlmIChzdGF0dXMgPT09ICdvcGVuJykge1xuXHRcdFx0XHR3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdjbG9zZWQnKTtcblx0XHRcdFx0Y2xvc2VXb3JrVGV4dFRsXG5cdFx0XHRcdFx0LnRvKHdvcmtUZXh0LCAxLCB7YXV0b0FscGhhOjAsIGhlaWdodDonYXV0bycsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG5cdFx0XHRcdFx0LnRvKHdvcmtUaXRsZSwgMSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQudG8od29ya01haW4sIDEsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MC4yNScpXG5cdFx0XHRcdFx0LnRvKG9wZW5JY29uLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjEwMCwgcm90YXRpb246MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTAuNScpXG5cdFx0XHRcdFx0LnRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTAuNScpXG5cdFx0XHRcdFx0LnRvKG9wZW5JY29uUGF0aCwgMSwge2ZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MScpO1xuXHRcdFx0fVxuXG5cdFx0fVxuXG4gICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuXHRcdCR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cdFx0JHdvcmtMaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdH0pKTtcblxuICAgIHByZXZBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlVXAoJy5tYWluJyk7XG4gICAgICBjb25zdCBwcmV2QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBwcmV2QXJyb3dPdXRUbC5mcm9tVG8ocHJldkFycm93LCAuNSwge3g6LTEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc3AnKVxuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgcHJldkFycm93T3V0VGwudG8ocHJldkFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NwKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlRG93bignLm1haW4nKTtcbiAgICAgIGNvbnN0IG5leHRBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIG5leHRBcnJvd091dFRsLmZyb21UbyhuZXh0QXJyb3csIC41LCB7eDoxMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NuJyk7XG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBuZXh0QXJyb3dPdXRUbC50byhuZXh0QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc24rPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICBhcnJvd1BhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUVudGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUVudGVyVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjAuOTUsIGZpbGw6JyMwODExMjEnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOic3MyUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlTGVhdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlTGVhdmVUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MSwgZmlsbDonbm9uZScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwidG90YWwtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cImN1cnJlbnQtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0UHJvZ3Jlc3MoZSkge1xuICAgICAgbGV0IGNQcm9ncmVzcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDEsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAyLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRmb290ZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHJlc2V0UHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgICRwYWdpbmF0aW9uTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxldCBsaW5rcyA9ICRwYWdpbmF0aW9uTGlua3MubGVuZ3RoO1xuICAgICAgbGV0IHBlcmNlbnRQZXJMaW5rID0gMTAwIC8gbGlua3M7XG4gICAgICBpZiAobGlua3MgPCAxMCkge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGxpbmtzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGxpbmtzO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaSA9IGN1cnJlbnRMaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGluZGV4ID0gY3VycmVudExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGN1cnJlbnRMaS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBjUHJvZ3Jlc3MgPSBwYWdpbmF0aW9uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdGFyZ2V0TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqaW5kZXh9JWA7XG4gICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayphY3RpdmVJbmRleH0lYDtcblxuICAgICAgICAgIGlmIChpbmRleCA8IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke2N1cnJlbnRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRwYWdpbmF0aW9uTGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgbGV0IGxpbmsgPSBsaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBpbmRleCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgfSk7XG5cbiAgICAkd29ya0luZGljZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBsZXQgaW5kaWNlcyA9ICR3b3JrSW5kaWNlcy5sZW5ndGg7XG4gICAgICBsZXQgc2VjdGlvbiA9IGluZGV4LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmIChpbmRpY2VzIDwgMTApIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBpbmRpY2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGluZGljZXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9IChlbGVtLCBhdHRyLCBhLCBiKSA9PiB7XG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2VsZW19YCk7XG4gICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKGAke2F0dHJ9YCwgY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKGAke2F0dHJ9YCkgPT09IGEgPyBiIDogYSk7XG4gICAgfVxuXG4gICAgJGNvbnRhY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHNob3dGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHNob3dGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLmZyb21UbygkY29udGFjdFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS4yNScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3csIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6NjUsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNDUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93UGF0aCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNScpO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpO1xuICAgIH0pO1xuXG4gICAgJGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdvcGVuJykge1xuICAgICAgICBsZXQgYWJvdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBhYm91dFRsXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDIsIHt5UGVyY2VudDoyMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgLjA4LCAnZW50ZXInKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAyLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRCZywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4xNScpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4yNScpXG4gICAgICAgICAgLmZyb21UbygkZXhpdEFib3V0LCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9MS4yNScpO1xuICAgICAgfSBlbHNlIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgbGV0IGJhY2tUbDEgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYmFja1RsMVxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41Jyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKTtcbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonIzA4MTEyMScsIHNjYWxlOjAuOTUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6J25vbmUnLCBzY2FsZToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgJGhpZ2hsaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICRoaWdobGlnaHQuY2xhc3NMaXN0LmFkZCgnbGluay1oaWdobGlnaHQnKTtcbiAgICAgIHRoaXMuYXBwZW5kKCRoaWdobGlnaHQpO1xuICAgICAgbGV0IGhpZ2hsaWdoTGlua1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGhpZ2hsaWdoTGlua1RsXG4gICAgICAgICAgLnRvKCRoaWdobGlnaHQsIDEsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubGluay1oaWdobGlnaHQnKTtcbiAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGlnaGxpZ2h0TGluaykpO1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmhpZ2hsaWdodExpbmspKTtcbiAgICB9XG5cbiAgICBsb2FkZXJNb2R1bGUoKTtcbiAgICBmb3JtTW9kdWxlKCk7XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG5cdFx0XHRjdXJzb3JNb2R1bGUoKTtcblx0XHR9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRcbiAgfVxufSkoKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgYXBwLmluaXQoKTtcbn1cbiJdfQ==
