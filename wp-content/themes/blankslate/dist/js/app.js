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
        if (!isStuck) {
          // move circle around normally
          lastX = lerp(lastX, clientX, 0.2);
          lastY = lerp(lastY, clientY, 0.2);
          group.position = new paper.Point(lastX, lastY);
        } else if (isStuck) {
          // fixed position on a nav item
          lastX = lerp(lastX, stuckX, 0.2);
          lastY = lerp(lastY, stuckY, 0.2);
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
            var newY = bigCoordinates[i][1] + distortionY; // set new (noisy) coodrindate of point

            segment.point.set(newX, newY);
          });
        }

        polygon.smooth();
      };
    };

    initCanvas();

    var initCursorHovers = function initCursorHovers() {
      var handleBasicCursorMouseEnter = function handleBasicCursorMouseEnter(e) {
        var navItem = e.currentTarget;
        var navItemBox = navItem.getBoundingClientRect();
        stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
        stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
        isStuck = true;
      };

      var handleBasicCursorMouseLeave = function handleBasicCursorMouseLeave() {
        isStuck = false;
      };

      $aboutLink.addEventListener("mouseenter", handleBasicCursorMouseEnter);
      $aboutLink.addEventListener("mouseleave", handleBasicCursorMouseLeave);
      var $paginationLinks = document.querySelectorAll('.onepage-pagination li a');
      $paginationLinks.forEach(function (link) {
        link.addEventListener("mouseenter", handleBasicCursorMouseEnter);
        link.addEventListener("mouseleave", handleBasicCursorMouseLeave);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImlubmVyQ3Vyc29yIiwiY2FudmFzIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlciIsIm5hdkl0ZW0iLCJjdXJyZW50VGFyZ2V0IiwibmF2SXRlbUJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJyb3VuZCIsImxlZnQiLCJ0b3AiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCIkcGFnaW5hdGlvbkxpbmtzIiwibGluayIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwibGlua1NwbGl0VGV4dCIsImFib3V0VGwiLCJzdGFnZ2VyVG8iLCJiYWNrVGwxIiwiYmFja1RsIiwiYWJvdXRDbG9zZUhvdmVyVGwiLCJoaWdobGlnaHRMaW5rIiwiJGhpZ2hsaWdodCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmQiLCJoaWdobGlnaExpbmtUbCIsInVuaGlnaGxpZ2h0TGluayIsImhpZ2hsaWdodCIsInJlbW92ZSIsIm9ubG9hZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxHQUFHLEdBQUksWUFBWTtBQUV4QixNQUFNQyxRQUFRLEdBQUdDLFdBQVcs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LFlBQU07QUFDcEJqUyxFQUFBQSxHQUFHLENBQUNpTCxJQUFKO0FBQ0QsQ0FGRCIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBhcHAgPSAoZnVuY3Rpb24gKCkge1xuXG5cdGNvbnN0ICRzaXRldXJsID0gRUxZU1NFUk9NRU8uc2l0ZXVybDtcblx0Y29uc3QgJGRlZmF1bHRJbWcgPSBgL3dwLWNvbnRlbnQvdGhlbWVzL2JsYW5rc2xhdGUvZGlzdC9pbWcvZGVmYXVsdC5wbmdgO1xuICBjb25zdCAkbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpO1xuXHRjb25zdCAkbG9hZGVyR0lGID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlckdJRicpO1xuICBjb25zdCAkbG9hZGVyU1ZHID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlclNWRycpO1xuICBjb25zdCAkbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgY29uc3QgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICBjb25zdCAkbG9nbyA9ICRoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdFNlY3Rpb24gPSAkbWFpbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0Q29udGVudCA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLndvcmstY29udGVudCcpO1xuICBjb25zdCAkYWJvdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0Jyk7XG4gIGNvbnN0ICRhYm91dENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19jbG9zZScpO1xuICBjb25zdCAkYWJvdXRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19wYWdlJyk7XG4gIGNvbnN0ICRhYm91dEJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LWJnJyk7XG4gIGNvbnN0ICRhYm91dElubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWlubmVyJyk7XG4gIGNvbnN0ICRleGl0QWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpdEFib3V0Jyk7XG4gIGNvbnN0ICRjb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcbiAgY29uc3QgJGNvbnRhY3RQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWZvcm0tYXJyb3cnKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3dQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGVGb3JtQXJyb3cnKTtcbiAgY29uc3QgYXJyb3dQYXRocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbHMtYXJyb3cnKTtcbiAgY29uc3QgcHJldkFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LWJhY2snKTtcbiAgY29uc3QgbmV4dEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LW5leHQnKTtcbiAgY29uc3QgcHJldkFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZBcnJvdycpO1xuICBjb25zdCBuZXh0QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dEFycm93Jyk7XG4gIGNvbnN0ICR3b3JrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICR3b3JrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRleHQnKTtcbiAgY29uc3QgJHdvcmtUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10aXRsZScpO1xuICBjb25zdCAkd29ya0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1idG4nKTtcbiAgY29uc3QgJGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICBjb25zdCAkYWJvdXRQYWdlTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLmxpbmsnKTtcblx0Y29uc3QgaW5uZXJDdXJzb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tc21hbGxcIik7XG5cdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yLS1jYW52YXNcIik7XG5cbiAgY29uc3QgbG9hZGVyTW9kdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkZmlyc3RGb290ZXJOYXZJdGVtID0gJGZvb3Rlck5hdi5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICBjb25zdCByZWdleCA9IC8oXFwvd3AtY29udGVudCkoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvZztcbiAgICBjb25zdCAkaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICAgIGxldCBpbWdTcmNzID0gW107XG4gICAgJGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdGlmIChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSA9PSBudWxsKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmNzc1RleHQgPSAkZGVmYXVsdEltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGltZ1NyY3MucHVzaChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Y29uc3QgbG9hZGluZ1RsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWUsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgICAgeW95bzogdHJ1ZSxcbiAgICB9KTtcbiAgICBsb2FkaW5nVGxcbiAgICAgIC5mcm9tVG8oJGxvYWRlclNWRywgMiwge2RyYXdTVkc6JzAlIDEwMCUnfSx7IGRyYXdTVkc6JzAlIDAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyR0lGLCAwLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0XHRcdFx0XHRcdC5zZXQoJGxvYWRlckdJRiwge2Rpc3BsYXk6J25vbmUnfSlcblx0XHRcdFx0XHRcdC50bygkbG9hZGVyU1ZHLCAwLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSlcblx0ICAgICAgICAgIC50bygkbG9hZGVyLCAzLCB7YXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTInKVxuXHQgICAgICAgICAgLmZyb20oJGxvZ28sIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00Jylcblx0ICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz01Jylcblx0ICAgICAgICAgIC5mcm9tKHByZXZBcnJvdywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKG5leHRBcnJvdywgMywge3hQZXJjZW50OiAxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz01LjUnKVxuXHQgICAgICAgICAgLmZyb20oJGZpcnN0Q29udGVudCwgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYnKVxuXHQgICAgICAgICAgLnN0YWdnZXJGcm9tKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjIwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdzdGFydCs9Ni41Jylcblx0ICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTYuNzUnKVxuXHQgICAgICAgICAgO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBmb3JtTW9kdWxlID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0LWNvbnRhaW5lcicpKSB7XG4gICAgICAgIGNvbnN0IHN1Ym1pdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0Jyk7XG4gICAgICAgIHN1Ym1pdENvbnRhaW5lci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsXG4gICAgICAgIGA8c3ZnIGlkPVwic3VibWl0LWJ0blwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDk2LjU0IDMyLjQ5XCI+XG4gICAgICAgICAgPHBhdGggY2xhc3M9XCJjbHMtc3VibWl0XCIgZD1cIk0uMjgsMi4xN2MxMC44NCwxNS4yLDIzLjU4LDI3LDQyLjczLDI5LjdDNjEuNiwzNC41LDc5LjgsMjguNTIsOTUuODMsMTkuNDRjMS0uNTgsMS0yLjU0LS4zNi0yLjc0YTUyLjEzLDUyLjEzLDAsMCwwLTE0LjA2LS4zMywxLjUsMS41LDAsMCwwLDAsMywzNS41MiwzNS41MiwwLDAsMSwxMS43LDMuMWwtLjMxLTIuMzVhODcuMTksODcuMTksMCwwLDEtOS4yNCw5Ljc4Yy0xLjQ0LDEuMy42OSwzLjQyLDIuMTIsMi4xMmE4Ny4xOSw4Ny4xOSwwLDAsMCw5LjI0LTkuNzgsMS41MiwxLjUyLDAsMCwwLS4zLTIuMzYsMzkuODUsMzkuODUsMCwwLDAtMTMuMjEtMy41MXYzYTQ5LjE1LDQ5LjE1LDAsMCwxLDEzLjI3LjIybC0uMzYtMi43NEM3OS4xOSwyNS40Miw2MiwzMS4yNiw0NC40NCwyOS4wNSwyNS43OCwyNi43LDEzLjM5LDE1LjQyLDIuODcuNjYsMS43NS0uOS0uODUuNi4yOCwyLjE3WlwiLz5cbiAgICAgICAgPC9zdmc+YCk7XG5cbiAgICAgICAgY29uc3Qgc3VibWl0UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbHMtc3VibWl0Jyk7XG4gICAgICAgIFR3ZWVuTWF4LnNldChzdWJtaXRQYXRoLCB7ZHJhd1NWRzonMCUnfSk7XG4gICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBzdWJtaXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgc3VibWl0VGxcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtmaWxsOiAnIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9MC41Jyk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMCUnLCBmaWxsOiAnbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXHRjb25zdCBjdXJzb3JNb2R1bGUgPSAoKSA9PiB7XG5cblx0XHRsZXQgY2xpZW50WCA9IC0xMDA7XG5cdFx0bGV0IGNsaWVudFkgPSAtMTAwO1xuXHRcdGNvbnN0IGluaXRDdXJzb3IgPSAoKSA9PiB7XG5cdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGUgPT4ge1xuXHRcdCAgICBjbGllbnRYID0gZS5jbGllbnRYO1xuXHRcdCAgICBjbGllbnRZID0gZS5jbGllbnRZO1xuXHRcdCAgfSk7XG5cdFx0ICBjb25zdCByZW5kZXIgPSAoKSA9PiB7XG5cdFx0ICAgIFR3ZWVuTWF4LnNldChpbm5lckN1cnNvciwge1xuXHRcdCAgICAgIHg6IGNsaWVudFgsXG5cdFx0ICAgICAgeTogY2xpZW50WVxuXHRcdCAgICB9KTtcblx0XHQgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cdFx0ICB9O1xuXHRcdCAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cdFx0fTtcblx0XHRpbml0Q3Vyc29yKCk7XG5cblx0XHRsZXQgbGFzdFggPSAwO1xuXHRcdGxldCBsYXN0WSA9IDA7XG5cdFx0bGV0IGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRsZXQgc2hvd0N1cnNvciA9IGZhbHNlO1xuXHRcdGxldCBncm91cDtcblx0XHRsZXQgc3R1Y2tYO1xuXHRcdGxldCBzdHVja1k7XG5cdFx0bGV0IGZpbGxPdXRlckN1cnNvcjtcblx0XHRjb25zdCBpbml0Q2FudmFzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcGVCb3VuZHMgPSB7XG5cdFx0XHRcdHdpZHRoOiA3NSxcblx0XHRcdFx0aGVpZ2h0OiA3NSxcblx0XHRcdH07XG5cdFx0XHRwYXBlci5zZXR1cChjYW52YXMpO1xuXHRcdFx0Y29uc3Qgc3Ryb2tlQ29sb3IgPSAncmdiYSg2MCwgNzQsIDgzLCAwLjUpJztcblx0XHRcdGNvbnN0IHN0cm9rZVdpZHRoID0gMTtcblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gODtcblx0XHRcdGNvbnN0IHJhZGl1cyA9IDE1O1xuXHRcdFx0Y29uc3Qgbm9pc2VTY2FsZSA9IDE1MDtcblx0XHRcdGNvbnN0IG5vaXNlUmFuZ2UgPSA0O1xuXHRcdFx0bGV0IGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHBvbHlnb24gPSBuZXcgcGFwZXIuUGF0aC5SZWd1bGFyUG9seWdvbihcblx0XHRcdFx0bmV3IHBhcGVyLlBvaW50KDAsMCksXG5cdFx0XHRcdHNlZ21lbnRzLFxuXHRcdFx0XHRyYWRpdXMsXG5cdFx0XHQpO1xuXHRcdFx0cG9seWdvbi5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xuICBcdFx0cG9seWdvbi5zdHJva2VXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICBcdFx0cG9seWdvbi5zbW9vdGgoKTtcbiAgXHRcdGdyb3VwID0gbmV3IHBhcGVyLkdyb3VwKFtwb2x5Z29uXSk7XG4gIFx0XHRncm91cC5hcHBseU1hdHJpeCA9IGZhbHNlO1xuXHRcdFx0Y29uc3Qgbm9pc2VPYmplY3RzID0gcG9seWdvbi5zZWdtZW50cy5tYXAoKCkgPT4gbmV3IFNpbXBsZXhOb2lzZSgpKTtcbiAgXHRcdGxldCBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0Y29uc3QgbGVycCA9IChhLCBiLCBuKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoMSAtIG4pICogYSArIG4gKiBiO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IG1hcCA9ICh2YWx1ZSwgaW5fbWluLCBpbl9tYXgsIG91dF9taW4sIG91dF9tYXgpID0+IHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoKHZhbHVlIC0gaW5fbWluKSAqIChvdXRfbWF4IC0gb3V0X21pbikpIC8gKGluX21heCAtIGluX21pbikgKyBvdXRfbWluXG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIudmlldy5vbkZyYW1lID0gZXZlbnQgPT4ge1xuXG5cblx0XHRcdFx0aWYgKCFpc1N0dWNrKSB7XG5cdFx0XHQgICAgLy8gbW92ZSBjaXJjbGUgYXJvdW5kIG5vcm1hbGx5XG5cdFx0XHQgICAgbGFzdFggPSBsZXJwKGxhc3RYLCBjbGllbnRYLCAwLjIpO1xuXHRcdFx0ICAgIGxhc3RZID0gbGVycChsYXN0WSwgY2xpZW50WSwgMC4yKTtcblx0XHRcdCAgICBncm91cC5wb3NpdGlvbiA9IG5ldyBwYXBlci5Qb2ludChsYXN0WCwgbGFzdFkpO1xuXHRcdFx0ICB9IGVsc2UgaWYgKGlzU3R1Y2spIHtcblx0XHRcdCAgICAvLyBmaXhlZCBwb3NpdGlvbiBvbiBhIG5hdiBpdGVtXG5cdFx0XHQgICAgbGFzdFggPSBsZXJwKGxhc3RYLCBzdHVja1gsIDAuMik7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBzdHVja1ksIDAuMik7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfVxuXG5cdFx0XHRcdGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoIDwgc2hhcGVCb3VuZHMud2lkdGgpIHtcblx0XHRcdFx0XHQvLyBzY2FsZSB1cCB0aGUgc2hhcGVcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKDEuMTUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID4gMzApIHtcblx0XHRcdFx0XHQvLyByZW1vdmUgbm9pc2Vcblx0XHRcdFx0XHRpZiAoaXNOb2lzeSkge1xuXHRcdFx0XHRcdCAgcG9seWdvbi5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBpKSA9PiB7XG5cdFx0XHRcdFx0ICAgIHNlZ21lbnQucG9pbnQuc2V0KGJpZ0Nvb3JkaW5hdGVzW2ldWzBdLCBiaWdDb29yZGluYXRlc1tpXVsxXSk7XG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHQgIGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdFx0XHQgIGJpZ0Nvb3JkaW5hdGVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHNjYWxlIGRvd24gdGhlIHNoYXBlXG5cdFx0XHRcdFx0Y29uc3Qgc2NhbGVEb3duID0gMC45Mjtcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKHNjYWxlRG93bik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB3aGlsZSBzdHVjayBhbmQgYmlnLCBhcHBseSBzaW1wbGV4IG5vaXNlXG5cdFx0XHQgIGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID49IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHQgICAgaXNOb2lzeSA9IHRydWU7XG5cdFx0XHQgICAgLy8gZmlyc3QgZ2V0IGNvb3JkaW5hdGVzIG9mIGxhcmdlIGNpcmNsZVxuXHRcdFx0ICAgIGlmIChiaWdDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdCAgICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0ICAgICAgICBiaWdDb29yZGluYXRlc1tpXSA9IFtzZWdtZW50LnBvaW50LngsIHNlZ21lbnQucG9pbnQueV07XG5cdFx0XHQgICAgICB9KTtcblx0XHRcdCAgICB9XG5cblx0XHRcdCAgICAvLyBsb29wIG92ZXIgYWxsIHBvaW50cyBvZiB0aGUgcG9seWdvblxuXHRcdFx0ICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXG5cdFx0XHQgICAgICAvLyBnZXQgbmV3IG5vaXNlIHZhbHVlXG5cdFx0XHQgICAgICAvLyB3ZSBkaXZpZGUgZXZlbnQuY291bnQgYnkgbm9pc2VTY2FsZSB0byBnZXQgYSB2ZXJ5IHNtb290aCB2YWx1ZVxuXHRcdFx0ICAgICAgY29uc3Qgbm9pc2VYID0gbm9pc2VPYmplY3RzW2ldLm5vaXNlMkQoZXZlbnQuY291bnQgLyBub2lzZVNjYWxlLCAwKTtcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWSA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMSk7XG5cblx0XHRcdCAgICAgIC8vIG1hcCB0aGUgbm9pc2UgdmFsdWUgdG8gb3VyIGRlZmluZWQgcmFuZ2Vcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25YID0gbWFwKG5vaXNlWCwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25ZID0gbWFwKG5vaXNlWSwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblxuXHRcdFx0ICAgICAgLy8gYXBwbHkgZGlzdG9ydGlvbiB0byBjb29yZGluYXRlc1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WCA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzBdICsgZGlzdG9ydGlvblg7XG5cdFx0XHQgICAgICBjb25zdCBuZXdZID0gYmlnQ29vcmRpbmF0ZXNbaV1bMV0gKyBkaXN0b3J0aW9uWTtcblxuXHRcdFx0ICAgICAgLy8gc2V0IG5ldyAobm9pc3kpIGNvb2RyaW5kYXRlIG9mIHBvaW50XG5cdFx0XHQgICAgICBzZWdtZW50LnBvaW50LnNldChuZXdYLCBuZXdZKTtcblx0XHRcdCAgICB9KTtcblxuXHRcdFx0ICB9XG5cdFx0XHQgIHBvbHlnb24uc21vb3RoKCk7XG5cblxuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIgPSBlID0+IHtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbSA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbUJveCA9IG5hdkl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdHN0dWNrWCA9IE1hdGgucm91bmQobmF2SXRlbUJveC5sZWZ0ICsgbmF2SXRlbUJveC53aWR0aCAvIDIpO1xuXHRcdFx0XHRzdHVja1kgPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gudG9wICsgbmF2SXRlbUJveC5oZWlnaHQgLyAyKTtcblx0XHRcdFx0aXNTdHVjayA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRpc1N0dWNrID0gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0Y29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuXHRcdFx0JHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpbml0Q3Vyc29ySG92ZXJzKCk7XG5cblxuXG5cblxuXG5cdH1cblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuXG4gICAgb25lUGFnZVNjcm9sbChcIi5tYWluXCIsIHtcbiAgICAgIHNlY3Rpb25Db250YWluZXI6IFwic2VjdGlvblwiLFxuICAgICAgZWFzaW5nOiBcImN1YmljLWJlemllcigwLjUwLCAwLCAwLjUwLCAxKVwiLFxuICAgICAgYW5pbWF0aW9uVGltZTogNzUwLFxuICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgICAgIHVwZGF0ZVVSTDogZmFsc2UsXG4gICAgICBiZWZvcmVNb3ZlOiBmdW5jdGlvbihpbmRleCwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgYWxsUHJvZ3Jlc3NCYXJzID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbi1wcm9ncmVzcycpO1xuICAgICAgICBhbGxQcm9ncmVzc0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGJhciwgMSwge3dpZHRoOicwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBiZWZvcmVNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBiZWZvcmVNb3ZlVGxcbiAgICAgICAgICAgIC5zZXQoY19iZ18xLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2JnXzIsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYXJ0aWNsZSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19zdmcsIHt4UGVyY2VudDotMjAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX2ltZywge3NjYWxlOi43NSwgYXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmssIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6NTB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfdGV4dCwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMjV9KVxuICAgICAgICAgICAgO1xuXG4gICAgICB9LFxuICAgICAgYWZ0ZXJNb3ZlOiBmdW5jdGlvbihpbmRleCwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgbGV0IHByZXZBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBwcmV2QXJyb3dJblRsXG4gICAgICAgICAgICAudG8ocHJldkFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBuZXh0QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbmV4dEFycm93SW5UbFxuICAgICAgICAgICAgLnRvKG5leHRBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBjdXJyZW50TGluayA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvcihgYVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaW5rLnByZXZpb3VzU2libGluZztcblxuICAgICAgICBsZXQgYWZ0ZXJNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbGV0IGFmdGVyTW92ZVNwbGl0VGV4dCA9IG5ldyBTcGxpdFRleHQoY19pbmRleCwge3R5cGU6J3dvcmRzLGNoYXJzJ30pO1xuICAgICAgICBsZXQgY2hhcnMgPSBhZnRlck1vdmVTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgYWZ0ZXJNb3ZlVGxcbiAgICAgICAgICAgIC50byhjX2JnXzEsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUnKVxuICAgICAgICAgICAgLnRvKGNfYmdfMiwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1JylcbiAgICAgICAgICAgIC50byhjX2FydGljbGUsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS41JylcbiAgICAgICAgICAgIC50byhjX3N2ZywgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAudG8oY193b3JrX2ltZywgMS41LCB7c2NhbGU6MSwgYXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAudG8oY193b3JrLCAuNSwge2F1dG9BbHBoYToxLCB5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuMjUnKVxuICAgICAgICAgICAgLnRvKGNfd29ya190ZXh0LCAxLCB7c2NhbGU6MSwgYXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS41JylcbiAgICAgICAgICAgIC5zdGFnZ2VyRnJvbShjaGFycywgMSwge2F1dG9BbHBoYTowLCB5UGVyY2VudDotMTAwLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAwLjI1LCAnYmVmb3JlKz0xLjc1JylcbiAgICAgICAgICAgIC50byhjdXJyZW50UHJvZ3Jlc3NCYXIsIDAuNzUsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpO1xuICAgICAgfSxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmVGYWxsYmFjazogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpJyk7XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuICAgIGNvbnN0ICR3b3JrSW5kaWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWluZGV4Jyk7XG4gICAgY29uc3QgJHRvdGFsUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG90YWwtcHJvZ3Jlc3MnKTtcblxuICAgIGZ1bmN0aW9uIG9wZW5Xb3JrVGV4dChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgd29ya1RleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcztcbiAgICAgIGxldCBvcGVuSWNvbiA9IHdvcmtUaXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBkaXNwbGF5ID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnY2xvc2VkJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG4gICAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZXhwYW5kV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLnRvKG9wZW5JY29uLCAxLCB7cm90YXRpb246NDUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC5mcm9tVG8od29ya01haW4sIDAuNSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se2Rpc3BsYXk6J2Jsb2NrJywgeVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4rPTAuNScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGxldCB3b3JrQnRuID0gdGhpcztcbiAgICAgIGxldCB3b3JrVGl0bGUgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya1RleHQgPSB3b3JrVGl0bGUucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byh3b3JrQnRuLCAxLCB7cm90YXRpb246NDUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC5mcm9tVG8od29ya01haW4sIDAuNSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se2Rpc3BsYXk6J2Jsb2NrJywgeVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4rPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKGRpc3BsYXkgPT09ICdvcGVuJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdjbG9zZWQnKTtcbiAgICAgICAgbGV0IGhpZGVXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgaGlkZVdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrQnRuLCAxLCB7cm90YXRpb246MCwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtNYWluLCAwLjUsIHtkaXNwbGF5Oidub25lJywgYXV0b0FscGhhOjAsIHlQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZScpXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6J2F1dG8nLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZSs9MC41JylcbiAgICAgICAgICAgIDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkd29ya1RpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbldvcmtUZXh0KSk7XG4gICAgJHdvcmtCdG5zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV29ya1RleHQpKTtcblxuICAgIGNvbnN0IGhvdmVyV29ya0l0ZW0gPSAoZSkgPT4ge1xuICAgICAgbGV0IHdvcmtJdGVtID0gZS50YXJnZXQ7XG4gICAgICBsZXQgdGV4dCA9IGUudGFyZ2V0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgdGl0bGUgPSB0ZXh0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uID0gdGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblN2ZyA9IG9wZW5JY29uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uUGF0aCA9IG9wZW5JY29uU3ZnLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGhvdmVyU3RhdHVzID0gd29ya0l0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJyk7XG4gICAgICBpZiAoaG92ZXJTdGF0dXMgPT09ICdubycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ3llcycpO1xuICAgICAgICBsZXQgZW50ZXJXb3JrSXRlbVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZW50ZXJXb3JrSXRlbVRsXG4gICAgICAgICAgICAudG8odGV4dCwgMSwge2JhY2tncm91bmRDb2xvcjoncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8odGl0bGUsIDEsIHtwYWRkaW5nOic1MHB4IDAnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uLCAwLjUsIHt5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZX0se2F1dG9BbHBoYToxLCB5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2ZpbGw6ICdub25lJ30se2ZpbGw6JyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MC41Jyk7XG4gICAgICB9IGVsc2UgaWYgKGhvdmVyU3RhdHVzID09PSAneWVzJykge1xuICAgICAgICB3b3JrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnLCAnbm8nKTtcbiAgICAgICAgbGV0IGxlYXZlV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGxlYXZlV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonMTBweCAwJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICR3b3JrSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhvdmVyV29ya0l0ZW0pKTtcbiAgICAgICR3b3JrSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhvdmVyV29ya0l0ZW0pKTtcbiAgICB9XG5cbiAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZVVwKCcubWFpbicpO1xuICAgICAgY29uc3QgcHJldkFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgcHJldkFycm93T3V0VGwuZnJvbVRvKHByZXZBcnJvdywgLjUsIHt4Oi0xMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NwJylcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIHByZXZBcnJvd091dFRsLnRvKHByZXZBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzcCs9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG4gICAgbmV4dEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZURvd24oJy5tYWluJyk7XG4gICAgICBjb25zdCBuZXh0QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBuZXh0QXJyb3dPdXRUbC5mcm9tVG8obmV4dEFycm93LCAuNSwge3g6MTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzbicpO1xuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgbmV4dEFycm93T3V0VGwudG8obmV4dEFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NuKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgYXJyb3dQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VFbnRlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VFbnRlclRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZTowLjk1LCBmaWxsOicjMDgxMTIxJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonNzMlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUxlYXZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUxlYXZlVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjEsIGZpbGw6J25vbmUnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cInRvdGFsLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJjdXJyZW50LXByb2dyZXNzXCI+PC9kaXY+YCk7XG5cbiAgICBmdW5jdGlvbiByZXNldFByb2dyZXNzKGUpIHtcbiAgICAgIGxldCBjUHJvZ3Jlc3MgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAxLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMiwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkZm9vdGVyTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCByZXNldFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsZXQgbGlua3MgPSAkcGFnaW5hdGlvbkxpbmtzLmxlbmd0aDtcbiAgICAgIGxldCBwZXJjZW50UGVyTGluayA9IDEwMCAvIGxpbmtzO1xuICAgICAgaWYgKGxpbmtzIDwgMTApIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBsaW5rcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBsaW5rcztcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50TGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgIGxldCBjdXJyZW50TGkgPSBjdXJyZW50TGluay5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBpbmRleCA9IGN1cnJlbnRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBjdXJyZW50TGkucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgY1Byb2dyZXNzID0gcGFnaW5hdGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRhcmdldExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmluZGV4fSVgO1xuICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqYWN0aXZlSW5kZXh9JWA7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPCBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHtjdXJyZW50TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkcGFnaW5hdGlvbkxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgIGxldCBsaW5rID0gbGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaW5kZXggPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH0pO1xuXG4gICAgJHdvcmtJbmRpY2VzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgbGV0IGluZGljZXMgPSAkd29ya0luZGljZXMubGVuZ3RoO1xuICAgICAgbGV0IHNlY3Rpb24gPSBpbmRleC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAoaW5kaWNlcyA8IDEwKSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgaW5kaWNlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBpbmRpY2VzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9nZ2xlU3RhdGUgPSAoZWxlbSwgYXR0ciwgYSwgYikgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtlbGVtfWApO1xuICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShgJHthdHRyfWAsIGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShgJHthdHRyfWApID09PSBhID8gYiA6IGEpO1xuICAgIH1cblxuICAgICRjb250YWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBzaG93Rm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBzaG93Rm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MCwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC50bygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC5mcm9tVG8oJGNvbnRhY3RQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uMjUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93LCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjY1LCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjQ1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvd1BhdGgsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkaGlkZUZvcm1BcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgaGlkZUZvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgaGlkZUZvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkY29udGFjdFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRJbm5lciwgMSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkYWJvdXRQYWdlTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgbGlua1NwbGl0VGV4dCA9IG5ldyBTcGxpdFRleHQobGluaywge3R5cGU6J3dvcmRzLGNoYXJzJ30pO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gbGlua1NwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tKGNoYXJzLCAwLjIsIHtzY2FsZTowLCB4OictNScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sIDAuMDMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnb3BlbicpIHtcbiAgICAgICAgbGV0IGFib3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYWJvdXRUbFxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAyLCB7eVBlcmNlbnQ6MjAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sIC4wOCwgJ2VudGVyJylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMiwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0QmcsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMTUnKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMjUnKVxuICAgICAgICAgIC5mcm9tVG8oJGV4aXRBYm91dCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTEuMjUnKVxuICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGxldCBiYWNrVGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGJhY2tUbDFcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBiYWNrVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGJhY2tUbFxuICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonIzA4MTEyMScsIHNjYWxlOjAuOTUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6J25vbmUnLCBzY2FsZToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgJGhpZ2hsaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICRoaWdobGlnaHQuY2xhc3NMaXN0LmFkZCgnbGluay1oaWdobGlnaHQnKTtcbiAgICAgIHRoaXMuYXBwZW5kKCRoaWdobGlnaHQpO1xuICAgICAgbGV0IGhpZ2hsaWdoTGlua1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGhpZ2hsaWdoTGlua1RsXG4gICAgICAgICAgLnRvKCRoaWdobGlnaHQsIDEsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pXG4gICAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubGluay1oaWdobGlnaHQnKTtcbiAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGlnaGxpZ2h0TGluaykpO1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmhpZ2hsaWdodExpbmspKTtcbiAgICB9XG5cbiAgICBsb2FkZXJNb2R1bGUoKTtcbiAgICBmb3JtTW9kdWxlKCk7XG5cdFx0aWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG5cdFx0XHRjdXJzb3JNb2R1bGUoKTtcblx0XHR9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRcbiAgfVxufSkoKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgYXBwLmluaXQoKTtcbn1cbiJdfQ==
