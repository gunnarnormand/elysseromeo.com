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
  var $contactPage = document.querySelector('.contact-page');
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
  var $contactLinks = document.querySelectorAll('.contact-link');

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
          background: 'rgba(183, 221, 225, 0.5)',
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

      if ($submitBtn) {
        $submitBtn.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
        $submitBtn.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
      }

      if ($contactLinks) {
        $contactLinks.forEach(function (link) {
          link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
          link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
        });
      }
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiRhbGxBcnJvd1N2Z3MiLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkd29ya0xpbmtzIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwiaW5uZXJDdXJzb3IiLCJjYW52YXMiLCIkc3VibWl0QnRuIiwiJGNvbnRhY3RMaW5rcyIsImxvYWRlck1vZHVsZSIsIiRmb290ZXJOYXYiLCIkZm9vdGVyTGlua3MiLCJjaGlsZHJlbiIsIiRmaXJzdEZvb3Rlck5hdkl0ZW0iLCJyZWdleCIsIiRpbWFnZXMiLCJpbWdTcmNzIiwiZm9yRWFjaCIsImltYWdlIiwic3R5bGUiLCJjc3NUZXh0IiwibWF0Y2giLCJwdXNoIiwibG9hZGluZ1RsIiwiVGltZWxpbmVNYXgiLCJkZWxheSIsInNtb290aENoaWxkVGltaW5nIiwicmVwZWF0IiwieW95byIsImZyb21UbyIsImRyYXdTVkciLCJlYXNlIiwiRXhwbyIsImVhc2VJbk91dCIsImxvYWRlclRsIiwibG9hZGVkSW1hZ2VzIiwiaSIsImxlbmd0aCIsInRtcCIsIkltYWdlIiwic3JjIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvIiwiYXV0b0FscGhhIiwic2V0IiwiZGlzcGxheSIsImZvcmNlM0QiLCJmcm9tIiwieFBlcmNlbnQiLCJlYXNlT3V0IiwiZWFzZUluIiwic3RhZ2dlckZyb20iLCJ5UGVyY2VudCIsIkJhY2siLCJjb25maWciLCJ3aWR0aCIsImZvcm1Nb2R1bGUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwic3VibWl0Q29udGFpbmVyIiwic3VibWl0QnRuIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic3VibWl0UGF0aCIsIlR3ZWVuTWF4Iiwic3VibWl0VGwiLCJmaWxsIiwiY3Vyc29yTW9kdWxlIiwiY2xpZW50WCIsImNsaWVudFkiLCJpbml0Q3Vyc29yIiwiZSIsInJlbmRlciIsIngiLCJ5IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibGFzdFgiLCJsYXN0WSIsImlzU3R1Y2siLCJzaG93Q3Vyc29yIiwiZ3JvdXAiLCJzdHVja1giLCJzdHVja1kiLCJmaWxsT3V0ZXJDdXJzb3IiLCJpbml0Q2FudmFzIiwic2hhcGVCb3VuZHMiLCJoZWlnaHQiLCJwYXBlciIsInNldHVwIiwic3Ryb2tlQ29sb3IiLCJzdHJva2VXaWR0aCIsInNlZ21lbnRzIiwicmFkaXVzIiwibm9pc2VTY2FsZSIsIm5vaXNlUmFuZ2UiLCJpc05vaXN5IiwicG9seWdvbiIsIlBhdGgiLCJSZWd1bGFyUG9seWdvbiIsIlBvaW50Iiwic21vb3RoIiwiR3JvdXAiLCJhcHBseU1hdHJpeCIsIm5vaXNlT2JqZWN0cyIsIm1hcCIsIlNpbXBsZXhOb2lzZSIsImJpZ0Nvb3JkaW5hdGVzIiwibGVycCIsImEiLCJiIiwibiIsInZhbHVlIiwiaW5fbWluIiwiaW5fbWF4Iiwib3V0X21pbiIsIm91dF9tYXgiLCJ2aWV3Iiwib25GcmFtZSIsImV2ZW50IiwicG9zaXRpb24iLCJib3VuZHMiLCJzY2FsZSIsInNlZ21lbnQiLCJwb2ludCIsInNjYWxlRG93biIsIm5vaXNlWCIsIm5vaXNlMkQiLCJjb3VudCIsIm5vaXNlWSIsImRpc3RvcnRpb25YIiwiZGlzdG9ydGlvblkiLCJuZXdYIiwibmV3WSIsImluaXRDdXJzb3JIb3ZlcnMiLCJoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyIiwibmF2SXRlbSIsImN1cnJlbnRUYXJnZXQiLCJuYXZJdGVtQm94IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiTWF0aCIsInJvdW5kIiwibGVmdCIsInRvcCIsImJhY2tncm91bmQiLCJoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlIiwiaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyIiwiaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlIiwibGluayIsIiRwYWdpbmF0aW9uTGlua3MiLCJpbml0Iiwib25lUGFnZVNjcm9sbCIsInNlY3Rpb25Db250YWluZXIiLCJlYXNpbmciLCJhbmltYXRpb25UaW1lIiwicGFnaW5hdGlvbiIsInVwZGF0ZVVSTCIsImJlZm9yZU1vdmUiLCJpbmRleCIsImN1cnJlbnRTZWN0aW9uIiwiY19iZ18xIiwiY19iZ18yIiwiY19hcnRpY2xlIiwiY193b3JrX2ltZyIsImNfc3ZnIiwibGFzdEVsZW1lbnRDaGlsZCIsImNfaW5kZXgiLCJhbGxQcm9ncmVzc0JhcnMiLCJiYXIiLCJiZWZvcmVNb3ZlVGwiLCJhZnRlck1vdmUiLCJwcmV2QXJyb3dJblRsIiwibmV4dEFycm93SW5UbCIsImN1cnJlbnRMaW5rIiwiY3VycmVudFByb2dyZXNzQmFyIiwicHJldmlvdXNTaWJsaW5nIiwiYWZ0ZXJNb3ZlVGwiLCJhZnRlck1vdmVTcGxpdFRleHQiLCJTcGxpdFRleHQiLCJ0eXBlIiwiY2hhcnMiLCJsb29wIiwia2V5Ym9hcmQiLCJyZXNwb25zaXZlRmFsbGJhY2siLCIkcGFnaW5hdGlvbkxpcyIsIiR3b3JrSW5kaWNlcyIsIiR0b3RhbFByb2dyZXNzIiwib3BlbldvcmtUZXh0Iiwic3RvcFByb3BhZ2F0aW9uIiwicHJldmVudERlZmF1bHQiLCJ3b3JrSXRlbSIsIndvcmtUZXh0Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsIndvcmtNYWluIiwiZXhwYW5kV29ya1RleHRUbCIsInN0YXR1cyIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImJhY2tncm91bmRDb2xvciIsInJvdGF0aW9uIiwiY2xvc2VXb3JrVGV4dCIsInBhcmVudEVsZW1lbnQiLCJjbG9zZVdvcmtUZXh0VGwiLCJpdGVtIiwiYnV0dG9uIiwibW92ZVVwIiwicHJldkFycm93T3V0VGwiLCJtb3ZlRG93biIsIm5leHRBcnJvd091dFRsIiwicGF0aCIsImFycm93TW91c2VFbnRlclRsIiwiYXJyb3dNb3VzZUxlYXZlVGwiLCJyZXNldFByb2dyZXNzIiwiY1Byb2dyZXNzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwidFByb2dyZXNzIiwibGlua3MiLCJwZXJjZW50UGVyTGluayIsImlubmVySFRNTCIsInRhcmdldCIsImN1cnJlbnRMaSIsInRhcmdldExlbmd0aCIsImFjdGl2ZUluZGV4IiwiY3VycmVudExlbmd0aCIsImxpIiwicmVtb3ZlQXR0cmlidXRlIiwiaW5kaWNlcyIsInNlY3Rpb24iLCJ0b2dnbGVTdGF0ZSIsImVsZW0iLCJhdHRyIiwiY3VycmVudEVsZW1lbnQiLCJzaG93Rm9ybVRsIiwiaGlkZUZvcm1UbCIsImFib3V0VGwiLCJzdGFnZ2VyVG8iLCJiYWNrVGwxIiwiYmFja1RsIiwiYWJvdXRDbG9zZUhvdmVyVGwiLCJoaWdobGlnaHRMaW5rIiwiJGhpZ2hsaWdodCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmQiLCJoaWdobGlnaExpbmtUbCIsInVuaGlnaGxpZ2h0TGluayIsImhpZ2hsaWdodCIsInJlbW92ZSIsIm9ubG9hZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxHQUFHLEdBQUksWUFBWTtBQUV4QixNQUFNQyxRQUFRLEdBQUdDLFdB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QUk5TixXQUFKLEVBQXJCO0FBQ0U4TixNQUFBQSxjQUFjLENBQ1g1TSxFQURILENBQ011TSxVQUROLEVBQ2tCLENBRGxCLEVBQ3FCO0FBQUMxTCxRQUFBQSxLQUFLLEVBQUMsTUFBUDtBQUFleEIsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNpQjtBQUExQixPQURyQjtBQUVIOztBQUVELGFBQVNzTSxlQUFULENBQXlCakwsQ0FBekIsRUFBNEI7QUFDMUIsVUFBSWtMLFNBQVMsR0FBRyxLQUFLclIsYUFBTCxDQUFtQixpQkFBbkIsQ0FBaEI7QUFDQXFSLE1BQUFBLFNBQVMsQ0FBQ0MsTUFBVjtBQUNEOztBQUVELFFBQUloTSxNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDM0J2RCxNQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZSxVQUFBaUksSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ3pHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DdU0sYUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0E3TyxNQUFBQSxNQUFNLENBQUNjLE9BQVAsQ0FBZSxVQUFBaUksSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ3pHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DOE0sZUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0Q7O0FBRUQ5TyxJQUFBQSxZQUFZO0FBQ1orQyxJQUFBQSxVQUFVOztBQUNaLFFBQUlDLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUM1QlEsTUFBQUEsWUFBWTtBQUNaO0FBQ0EsR0FwVkQ7O0FBc1ZBLFNBQU87QUFDTGtGLElBQUFBLElBQUksRUFBRUE7QUFERCxHQUFQO0FBR0QsQ0FucEJXLEVBQVo7O0FBcXBCQTNGLE1BQU0sQ0FBQ2lNLE1BQVAsR0FBZ0IsWUFBTTtBQUNwQjlSLEVBQUFBLEdBQUcsQ0FBQ3dMLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XG5cblx0Y29uc3QgJHNpdGV1cmwgPSBFTFlTU0VST01FTy5zaXRldXJsO1xuXHRjb25zdCAkZGVmYXVsdEltZyA9IGAvd3AtY29udGVudC90aGVtZXMvYmxhbmtzbGF0ZS9kaXN0L2ltZy9kZWZhdWx0LnBuZ2A7XG4gIGNvbnN0ICRsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJyk7XG5cdGNvbnN0ICRsb2FkZXJHSUYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyR0lGJyk7XG4gIGNvbnN0ICRsb2FkZXJTVkcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyU1ZHJyk7XG4gIGNvbnN0ICRtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICBjb25zdCAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gIGNvbnN0ICRsb2dvID0gJGhlYWRlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0U2VjdGlvbiA9ICRtYWluLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RDb250ZW50ID0gJGZpcnN0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICRhYm91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgY29uc3QgJGFib3V0Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2Nsb3NlJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX3BhZ2UnKTtcbiAgY29uc3QgJGFib3V0QmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtYmcnKTtcbiAgY29uc3QgJGFib3V0SW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtaW5uZXInKTtcbiAgY29uc3QgJGV4aXRBYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleGl0QWJvdXQnKTtcbiAgY29uc3QgJGNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuICBjb25zdCAkY29udGFjdFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1wYWdlJyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtZm9ybS1hcnJvdycpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvd1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZUZvcm1BcnJvdycpO1xuICBjb25zdCBhcnJvd1BhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNscy1hcnJvdycpO1xuICBjb25zdCBwcmV2QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctYmFjaycpO1xuICBjb25zdCBuZXh0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbmV4dCcpO1xuICBjb25zdCBwcmV2QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldkFycm93Jyk7XG4gIGNvbnN0IG5leHRBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0QXJyb3cnKTtcblx0Y29uc3QgJGFsbEFycm93U3ZncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnJvdyBzdmcnKTtcbiAgY29uc3QgJHdvcmtJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJHdvcmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGV4dCcpO1xuICBjb25zdCAkd29ya1RpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRpdGxlJyk7XG4gIGNvbnN0ICR3b3JrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWJ0bicpO1xuXHRjb25zdCAkd29ya0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstbGluayBhJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cdGNvbnN0IGlubmVyQ3Vyc29yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLXNtYWxsXCIpO1xuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tY2FudmFzXCIpO1xuXHRjb25zdCAkc3VibWl0QnRuID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvblt0eXBlPVwic3VibWl0XCJdJyk7XG5cdGNvbnN0ICRjb250YWN0TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udGFjdC1saW5rJyk7XG5cbiAgY29uc3QgbG9hZGVyTW9kdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkZmlyc3RGb290ZXJOYXZJdGVtID0gJGZvb3Rlck5hdi5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCByZWdleCA9IC8oXFwvd3AtY29udGVudCkoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvZztcbiAgICBjb25zdCAkaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICAgIGxldCBpbWdTcmNzID0gW107XG4gICAgJGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdGlmIChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSA9PSBudWxsKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmNzc1RleHQgPSAkZGVmYXVsdEltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGltZ1NyY3MucHVzaChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgbG9hZGluZ1RsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWUsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgICAgeW95bzogdHJ1ZSxcbiAgICB9KTtcbiAgICBsb2FkaW5nVGxcbiAgICAgIC5mcm9tVG8oJGxvYWRlclNWRywgMiwge2RyYXdTVkc6JzAlIDEwMCUnfSx7IGRyYXdTVkc6JzAlIDAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyR0lGLCAwLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0XHRcdFx0XHRcdC5zZXQoJGxvYWRlckdJRiwge2Rpc3BsYXk6J25vbmUnfSlcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyU1ZHLCAwLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0ICAgICAgICAgIC50bygkbG9hZGVyLCAzLCB7YXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTInKVxuXHQgICAgICAgICAgLmZyb20oJGxvZ28sIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00Jylcblx0ICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz01Jylcblx0ICAgICAgICAgIC5mcm9tKHByZXZBcnJvdywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKG5leHRBcnJvdywgMywge3hQZXJjZW50OiAxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz01LjUnKVxuXHQgICAgICAgICAgLmZyb20oJGZpcnN0Q29udGVudCwgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYnKVxuXHQgICAgICAgICAgLnN0YWdnZXJGcm9tKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjIwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdzdGFydCs9Ni41Jylcblx0ICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYuNzUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdCAgfTtcblx0XHQgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXHRcdH07XG5cdFx0aW5pdEN1cnNvcigpO1xuXG5cdFx0bGV0IGxhc3RYID0gMDtcblx0XHRsZXQgbGFzdFkgPSAwO1xuXHRcdGxldCBpc1N0dWNrID0gZmFsc2U7XG5cdFx0bGV0IHNob3dDdXJzb3IgPSBmYWxzZTtcblx0XHRsZXQgZ3JvdXA7XG5cdFx0bGV0IHN0dWNrWDtcblx0XHRsZXQgc3R1Y2tZO1xuXHRcdGxldCBmaWxsT3V0ZXJDdXJzb3I7XG5cdFx0Y29uc3QgaW5pdENhbnZhcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHNoYXBlQm91bmRzID0ge1xuXHRcdFx0XHR3aWR0aDogNzUsXG5cdFx0XHRcdGhlaWdodDogNzUsXG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIuc2V0dXAoY2FudmFzKTtcblx0XHRcdGNvbnN0IHN0cm9rZUNvbG9yID0gJ3JnYmEoNjAsIDc0LCA4MywgMC41KSc7XG5cdFx0XHRjb25zdCBzdHJva2VXaWR0aCA9IDE7XG5cdFx0XHRjb25zdCBzZWdtZW50cyA9IDg7XG5cdFx0XHRjb25zdCByYWRpdXMgPSAxNTtcblx0XHRcdGNvbnN0IG5vaXNlU2NhbGUgPSAxNTA7XG5cdFx0XHRjb25zdCBub2lzZVJhbmdlID0gNjtcblx0XHRcdGxldCBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRjb25zdCBwb2x5Z29uID0gbmV3IHBhcGVyLlBhdGguUmVndWxhclBvbHlnb24oXG5cdFx0XHRcdG5ldyBwYXBlci5Qb2ludCgwLDApLFxuXHRcdFx0XHRzZWdtZW50cyxcblx0XHRcdFx0cmFkaXVzLFxuXHRcdFx0KTtcblx0XHRcdHBvbHlnb24uc3Ryb2tlQ29sb3IgPSBzdHJva2VDb2xvcjtcbiAgXHRcdHBvbHlnb24uc3Ryb2tlV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgXHRcdHBvbHlnb24uc21vb3RoKCk7XG4gIFx0XHRncm91cCA9IG5ldyBwYXBlci5Hcm91cChbcG9seWdvbl0pO1xuICBcdFx0Z3JvdXAuYXBwbHlNYXRyaXggPSBmYWxzZTtcblx0XHRcdGNvbnN0IG5vaXNlT2JqZWN0cyA9IHBvbHlnb24uc2VnbWVudHMubWFwKCgpID0+IG5ldyBTaW1wbGV4Tm9pc2UoKSk7XG4gIFx0XHRsZXQgYmlnQ29vcmRpbmF0ZXMgPSBbXTtcblx0XHRcdGNvbnN0IGxlcnAgPSAoYSwgYiwgbikgPT4ge1xuXHRcdFx0XHRyZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYjtcblx0XHRcdH07XG5cdFx0XHRjb25zdCBtYXAgPSAodmFsdWUsIGluX21pbiwgaW5fbWF4LCBvdXRfbWluLCBvdXRfbWF4KSA9PiB7XG5cdFx0XHRcdHJldHVybiAoXG5cdFx0XHRcdFx0KCh2YWx1ZSAtIGluX21pbikgKiAob3V0X21heCAtIG91dF9taW4pKSAvIChpbl9tYXggLSBpbl9taW4pICsgb3V0X21pblxuXHRcdFx0XHQpO1xuXHRcdFx0fTtcblx0XHRcdHBhcGVyLnZpZXcub25GcmFtZSA9IGV2ZW50ID0+IHtcblxuXHRcdFx0XHRpZiAoIWlzU3R1Y2spIHtcblx0XHRcdCAgICAvLyBtb3ZlIGNpcmNsZSBhcm91bmQgbm9ybWFsbHlcblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIGNsaWVudFgsIDAuMik7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBjbGllbnRZLCAwLjIpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH0gZWxzZSBpZiAoaXNTdHVjaykge1xuXHRcdFx0ICAgIC8vIGZpeGVkIHBvc2l0aW9uIG9uIGEgbmF2IGl0ZW1cblx0XHRcdCAgICBsYXN0WCA9IGxlcnAobGFzdFgsIHN0dWNrWCwgMC4wOCk7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBzdHVja1ksIDAuMDgpO1xuXHRcdFx0ICAgIGdyb3VwLnBvc2l0aW9uID0gbmV3IHBhcGVyLlBvaW50KGxhc3RYLCBsYXN0WSk7XG5cdFx0XHQgIH1cblxuXHRcdFx0XHRpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA8IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHRcdFx0Ly8gc2NhbGUgdXAgdGhlIHNoYXBlXG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZSgxLjE1KTtcblx0XHRcdFx0fSBlbHNlIGlmICghaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+IDMwKSB7XG5cdFx0XHRcdFx0Ly8gcmVtb3ZlIG5vaXNlXG5cdFx0XHRcdFx0aWYgKGlzTm9pc3kpIHtcblx0XHRcdFx0XHQgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0XHRcdCAgICBzZWdtZW50LnBvaW50LnNldChiaWdDb29yZGluYXRlc1tpXVswXSwgYmlnQ29vcmRpbmF0ZXNbaV1bMV0pO1xuXHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdFx0ICBpc05vaXN5ID0gZmFsc2U7XG5cdFx0XHRcdFx0ICBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBzY2FsZSBkb3duIHRoZSBzaGFwZVxuXHRcdFx0XHRcdGNvbnN0IHNjYWxlRG93biA9IDAuOTI7XG5cdFx0XHRcdFx0cG9seWdvbi5zY2FsZShzY2FsZURvd24pO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gd2hpbGUgc3R1Y2sgYW5kIGJpZywgYXBwbHkgc2ltcGxleCBub2lzZVxuXHRcdFx0ICBpZiAoaXNTdHVjayAmJiBwb2x5Z29uLmJvdW5kcy53aWR0aCA+PSBzaGFwZUJvdW5kcy53aWR0aCkge1xuXHRcdFx0ICAgIGlzTm9pc3kgPSB0cnVlO1xuXHRcdFx0ICAgIC8vIGZpcnN0IGdldCBjb29yZGluYXRlcyBvZiBsYXJnZSBjaXJjbGVcblx0XHRcdCAgICBpZiAoYmlnQ29vcmRpbmF0ZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQgICAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblx0XHRcdCAgICAgICAgYmlnQ29vcmRpbmF0ZXNbaV0gPSBbc2VnbWVudC5wb2ludC54LCBzZWdtZW50LnBvaW50LnldO1xuXHRcdFx0ICAgICAgfSk7XG5cdFx0XHQgICAgfVxuXG5cdFx0XHQgICAgLy8gbG9vcCBvdmVyIGFsbCBwb2ludHMgb2YgdGhlIHBvbHlnb25cblx0XHRcdCAgICBwb2x5Z29uLnNlZ21lbnRzLmZvckVhY2goKHNlZ21lbnQsIGkpID0+IHtcblxuXHRcdFx0ICAgICAgLy8gZ2V0IG5ldyBub2lzZSB2YWx1ZVxuXHRcdFx0ICAgICAgLy8gd2UgZGl2aWRlIGV2ZW50LmNvdW50IGJ5IG5vaXNlU2NhbGUgdG8gZ2V0IGEgdmVyeSBzbW9vdGggdmFsdWVcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWCA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMCk7XG5cdFx0XHQgICAgICBjb25zdCBub2lzZVkgPSBub2lzZU9iamVjdHNbaV0ubm9pc2UyRChldmVudC5jb3VudCAvIG5vaXNlU2NhbGUsIDEpO1xuXG5cdFx0XHQgICAgICAvLyBtYXAgdGhlIG5vaXNlIHZhbHVlIHRvIG91ciBkZWZpbmVkIHJhbmdlXG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWCA9IG1hcChub2lzZVgsIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cdFx0XHQgICAgICBjb25zdCBkaXN0b3J0aW9uWSA9IG1hcChub2lzZVksIC0xLCAxLCAtbm9pc2VSYW5nZSwgbm9pc2VSYW5nZSk7XG5cblx0XHRcdCAgICAgIC8vIGFwcGx5IGRpc3RvcnRpb24gdG8gY29vcmRpbmF0ZXNcblx0XHRcdCAgICAgIGNvbnN0IG5ld1ggPSBiaWdDb29yZGluYXRlc1tpXVswXSArIGRpc3RvcnRpb25YO1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WSA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzFdICsgZGlzdG9ydGlvblk7XG5cblx0XHRcdCAgICAgIC8vIHNldCBuZXcgKG5vaXN5KSBjb29yZGluZGF0ZSBvZiBwb2ludFxuXHRcdFx0ICAgICAgc2VnbWVudC5wb2ludC5zZXQobmV3WCwgbmV3WSk7XG5cdFx0XHQgICAgfSk7XG5cblx0XHRcdCAgfVxuXHRcdFx0ICBwb2x5Z29uLnNtb290aCgpO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW0gPSBlLmN1cnJlbnRUYXJnZXQ7XG5cdFx0XHRcdGNvbnN0IG5hdkl0ZW1Cb3ggPSBuYXZJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRzdHVja1ggPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gubGVmdCArIG5hdkl0ZW1Cb3gud2lkdGggLyAyKTtcblx0XHRcdFx0c3R1Y2tZID0gTWF0aC5yb3VuZChuYXZJdGVtQm94LnRvcCArIG5hdkl0ZW1Cb3guaGVpZ2h0IC8gMik7XG5cdFx0XHRcdGlzU3R1Y2sgPSB0cnVlO1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6J3JnYmEoNjAsIDc0LCA4MywgMC41KScsIHNjYWxlOjAuMjUsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUgPSAoKSA9PiB7XG5cdFx0XHRcdGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRcdFx0VHdlZW5NYXgudG8oaW5uZXJDdXJzb3IsIDEsIHtiYWNrZ3JvdW5kOicjYjdkZGUxJywgc2NhbGU6MSwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyID0gZSA9PiB7XG5cdFx0XHRcdFR3ZWVuTWF4LnRvKGlubmVyQ3Vyc29yLCAxLCB7YmFja2dyb3VuZDoncmdiYSgxODMsIDIyMSwgMjI1LCAwLjUpJywgc2NhbGU6MiwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRUd2Vlbk1heC50byhpbm5lckN1cnNvciwgMSwge2JhY2tncm91bmQ6JyNiN2RkZTEnLCBzY2FsZToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblx0XHRcdH07XG5cdFx0XHQkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdCR3b3JrTGlua3MuZm9yRWFjaChsaW5rID0+IHtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdFx0JGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHQkYWxsQXJyb3dTdmdzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9KTtcblx0XHRcdCR3b3JrQnRucy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkd29ya0l0ZW1zLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHRjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG5cdFx0XHQkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0fSk7XG5cdFx0XHQkbG9nby5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGxvZ28uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdGlmICgkc3VibWl0QnRuKSB7XG5cdFx0XHRcdCRzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdCRzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQ2FudmFzQ3Vyc29yTW91c2VMZWF2ZSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGNvbnRhY3RMaW5rcykge1xuXHRcdFx0XHQkY29udGFjdExpbmtzLmZvckVhY2gobGluayA9PiB7XG5cdFx0XHRcdFx0bGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVDYW52YXNDdXJzb3JNb3VzZUVudGVyKTtcblx0XHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGhhbmRsZUNhbnZhc0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdH1cblx0XHRpbml0Q3Vyc29ySG92ZXJzKCk7XG5cblx0fVxuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICBvbmVQYWdlU2Nyb2xsKFwiLm1haW5cIiwge1xuICAgICAgc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuNTAsIDAsIDAuNTAsIDEpXCIsXG4gICAgICBhbmltYXRpb25UaW1lOiA3NTAsXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSk7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgIGxldCBuZXh0QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbmV4dEFycm93SW5UbFxuICAgICAgICAgICAgLnRvKG5leHRBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBjdXJyZW50TGluayA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvcihgYVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaW5rLnByZXZpb3VzU2libGluZztcblxuICAgICAgICBsZXQgYWZ0ZXJNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbGV0IGFmdGVyTW92ZVNwbGl0VGV4dCA9IG5ldyBTcGxpdFRleHQoY19pbmRleCwge3R5cGU6J3dvcmRzLGNoYXJzJ30pO1xuICAgICAgICBsZXQgY2hhcnMgPSBhZnRlck1vdmVTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgYWZ0ZXJNb3ZlVGxcbiAgICAgICAgICAgIC50byhjX2JnXzEsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUnKVxuICAgICAgICAgICAgLnRvKGNfYmdfMiwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1JylcbiAgICAgICAgICAgIC50byhjX2FydGljbGUsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS41JylcbiAgICAgICAgICAgIC50byhjX3N2ZywgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAudG8oY193b3JrX2ltZywgMS41LCB7c2NhbGU6MSwgYXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB3b3JrSXRlbSA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RleHQgPSB0aGlzLmxhc3RFbGVtZW50Q2hpbGQ7XG5cdFx0XHRsZXQgd29ya1RpdGxlID0gd29ya1RleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblN2ZyA9IG9wZW5JY29uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uUGF0aCA9IG9wZW5JY29uU3ZnLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG5cdFx0XHRsZXQgc3RhdHVzID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcblx0XHRcdGlmIChzdGF0dXMgPT09ICdjbG9zZWQnKSB7XG5cdFx0XHRcdHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcblx0XHRcdFx0ZXhwYW5kV29ya1RleHRUbFxuXHRcdFx0XHRcdC50byh3b3JrVGV4dCwgMSwge2F1dG9BbHBoYToxLCBoZWlnaHQ6JzEwMCUnLCBiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuXHRcdFx0XHRcdC5mcm9tVG8od29ya1RpdGxlLCAxLCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7eVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jylcblx0XHRcdFx0XHQuZnJvbVRvKHdvcmtNYWluLCAxLCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7eVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0wLjI1Jylcblx0XHRcdFx0XHQuZnJvbVRvKG9wZW5JY29uLCAxLCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgcm90YXRpb246NDUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0wLjUnKVxuXHRcdFx0XHRcdC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz0wLjUnKVxuXHRcdFx0XHRcdC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDogJ25vbmUnfSx7ZmlsbDonIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0xJyk7XG5cdFx0XHR9XG5cbiAgICB9XG5cblx0XHRmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRsZXQgd29ya1RleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdGxldCB3b3JrVGl0bGUgPSB3b3JrVGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHdvcmtUaXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uU3ZnID0gb3Blbkljb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25QYXRoID0gb3Blbkljb25TdmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuXHRcdFx0bGV0IGNsb3NlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuXHRcdFx0bGV0IHN0YXR1cyA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG5cdFx0XHRpZiAoc3RhdHVzID09PSAnb3BlbicpIHtcblx0XHRcdFx0d29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG5cdFx0XHRcdGNsb3NlV29ya1RleHRUbFxuXHRcdFx0XHRcdC50byh3b3JrVGV4dCwgMSwge2F1dG9BbHBoYTowLCBoZWlnaHQ6J2F1dG8nLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuXHRcdFx0XHRcdC50byh3b3JrVGl0bGUsIDEsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG5cdFx0XHRcdFx0LnRvKHdvcmtNYWluLCAxLCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTAuMjUnKVxuXHRcdFx0XHRcdC50byhvcGVuSWNvbiwgMSwge2F1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIHJvdGF0aW9uOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0wLjUnKVxuXHRcdFx0XHRcdC50byhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz0wLjUnKVxuXHRcdFx0XHRcdC50byhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTEnKTtcblx0XHRcdH1cblxuXHRcdH1cblxuICAgICR3b3JrSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuV29ya1RleHQpKTtcblx0XHQkd29ya0J0bnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXb3JrVGV4dCkpO1xuXHRcdCR3b3JrTGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHR9KSk7XG5cbiAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZVVwKCcubWFpbicpO1xuICAgICAgY29uc3QgcHJldkFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgcHJldkFycm93T3V0VGwuZnJvbVRvKHByZXZBcnJvdywgLjUsIHt4Oi0xMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NwJylcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIHByZXZBcnJvd091dFRsLnRvKHByZXZBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzcCs9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG4gICAgbmV4dEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZURvd24oJy5tYWluJyk7XG4gICAgICBjb25zdCBuZXh0QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBuZXh0QXJyb3dPdXRUbC5mcm9tVG8obmV4dEFycm93LCAuNSwge3g6MTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzbicpO1xuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgbmV4dEFycm93T3V0VGwudG8obmV4dEFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NuKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgYXJyb3dQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VFbnRlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VFbnRlclRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZTowLjk1LCBmaWxsOicjMDgxMTIxJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonNzMlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUxlYXZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUxlYXZlVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjEsIGZpbGw6J25vbmUnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cInRvdGFsLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJjdXJyZW50LXByb2dyZXNzXCI+PC9kaXY+YCk7XG5cbiAgICBmdW5jdGlvbiByZXNldFByb2dyZXNzKGUpIHtcbiAgICAgIGxldCBjUHJvZ3Jlc3MgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAxLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMiwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkZm9vdGVyTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCByZXNldFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsZXQgbGlua3MgPSAkcGFnaW5hdGlvbkxpbmtzLmxlbmd0aDtcbiAgICAgIGxldCBwZXJjZW50UGVyTGluayA9IDEwMCAvIGxpbmtzO1xuICAgICAgaWYgKGxpbmtzIDwgMTApIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBsaW5rcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBsaW5rcztcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50TGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgIGxldCBjdXJyZW50TGkgPSBjdXJyZW50TGluay5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBpbmRleCA9IGN1cnJlbnRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBjdXJyZW50TGkucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgY1Byb2dyZXNzID0gcGFnaW5hdGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRhcmdldExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmluZGV4fSVgO1xuICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqYWN0aXZlSW5kZXh9JWA7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPCBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHtjdXJyZW50TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkcGFnaW5hdGlvbkxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgIGxldCBsaW5rID0gbGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaW5kZXggPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH0pO1xuXG4gICAgJHdvcmtJbmRpY2VzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgbGV0IGluZGljZXMgPSAkd29ya0luZGljZXMubGVuZ3RoO1xuICAgICAgbGV0IHNlY3Rpb24gPSBpbmRleC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAoaW5kaWNlcyA8IDEwKSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgaW5kaWNlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBpbmRpY2VzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9nZ2xlU3RhdGUgPSAoZWxlbSwgYXR0ciwgYSwgYikgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtlbGVtfWApO1xuICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShgJHthdHRyfWAsIGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShgJHthdHRyfWApID09PSBhID8gYiA6IGEpO1xuICAgIH1cblxuICAgICRjb250YWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBzaG93Rm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBzaG93Rm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MCwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC50bygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC5mcm9tVG8oJGNvbnRhY3RQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uMjUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93LCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjY1LCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjQ1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvd1BhdGgsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjUnKTtcbiAgICB9KTtcblxuICAgICRoaWRlRm9ybUFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBoaWRlRm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBoaWRlRm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2ZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRjb250YWN0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAxLCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKTtcbiAgICB9KTtcblxuICAgICRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnb3BlbicpIHtcbiAgICAgICAgbGV0IGFib3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYWJvdXRUbFxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAyLCB7eVBlcmNlbnQ6MjAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sIC4wOCwgJ2VudGVyJylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMiwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0QmcsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMTUnKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMjUnKVxuICAgICAgICAgIC5mcm9tVG8oJGV4aXRBYm91dCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTEuMjUnKTtcbiAgICAgIH0gZWxzZSBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGxldCBiYWNrVGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGJhY2tUbDFcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGJhY2tUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgYmFja1RsXG4gICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41Jyk7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuXHRcdGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuXHRcdFx0Y3Vyc29yTW9kdWxlKCk7XG5cdFx0fVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
