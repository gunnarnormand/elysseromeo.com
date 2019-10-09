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
    cursorModule();
  };

  return {
    init: init
  };
}();

window.onload = function () {
  app.init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImlubmVyQ3Vyc29yIiwiY2FudmFzIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJsYXN0WCIsImxhc3RZIiwiaXNTdHVjayIsInNob3dDdXJzb3IiLCJncm91cCIsInN0dWNrWCIsInN0dWNrWSIsImZpbGxPdXRlckN1cnNvciIsImluaXRDYW52YXMiLCJzaGFwZUJvdW5kcyIsImhlaWdodCIsInBhcGVyIiwic2V0dXAiLCJzdHJva2VDb2xvciIsInN0cm9rZVdpZHRoIiwic2VnbWVudHMiLCJyYWRpdXMiLCJub2lzZVNjYWxlIiwibm9pc2VSYW5nZSIsImlzTm9pc3kiLCJwb2x5Z29uIiwiUGF0aCIsIlJlZ3VsYXJQb2x5Z29uIiwiUG9pbnQiLCJzbW9vdGgiLCJHcm91cCIsImFwcGx5TWF0cml4Iiwibm9pc2VPYmplY3RzIiwibWFwIiwiU2ltcGxleE5vaXNlIiwiYmlnQ29vcmRpbmF0ZXMiLCJsZXJwIiwiYSIsImIiLCJuIiwidmFsdWUiLCJpbl9taW4iLCJpbl9tYXgiLCJvdXRfbWluIiwib3V0X21heCIsInZpZXciLCJvbkZyYW1lIiwiZXZlbnQiLCJwb3NpdGlvbiIsImJvdW5kcyIsInNjYWxlIiwic2VnbWVudCIsInBvaW50Iiwic2NhbGVEb3duIiwibm9pc2VYIiwibm9pc2UyRCIsImNvdW50Iiwibm9pc2VZIiwiZGlzdG9ydGlvblgiLCJkaXN0b3J0aW9uWSIsIm5ld1giLCJuZXdZIiwiaW5pdEN1cnNvckhvdmVycyIsImhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlciIsIm5hdkl0ZW0iLCJjdXJyZW50VGFyZ2V0IiwibmF2SXRlbUJveCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIk1hdGgiLCJyb3VuZCIsImxlZnQiLCJ0b3AiLCJoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUiLCIkcGFnaW5hdGlvbkxpbmtzIiwibGluayIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwibGlua1NwbGl0VGV4dCIsImFib3V0VGwiLCJzdGFnZ2VyVG8iLCJiYWNrVGwxIiwiYmFja1RsIiwiYWJvdXRDbG9zZUhvdmVyVGwiLCJoaWdobGlnaHRMaW5rIiwiJGhpZ2hsaWdodCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmQiLCJoaWdobGlnaExpbmtUbCIsInVuaGlnaGxpZ2h0TGluayIsImhpZ2hsaWdodCIsInJlbW92ZSIsIm9ubG9hZCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNQSxHQUFHLEdBQUksWUFBWTtBQUV4QixNQUFNQyxRQUFRLEdBQUdDLFdBQVcs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QUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCAkc2l0ZXVybCA9IEVMWVNTRVJPTUVPLnNpdGV1cmw7XG5cdGNvbnN0ICRkZWZhdWx0SW1nID0gYC93cC1jb250ZW50L3RoZW1lcy9ibGFua3NsYXRlL2Rpc3QvaW1nL2RlZmF1bHQucG5nYDtcbiAgY29uc3QgJGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKTtcblx0Y29uc3QgJGxvYWRlckdJRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJHSUYnKTtcbiAgY29uc3QgJGxvYWRlclNWRyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJTVkcnKTtcbiAgY29uc3QgJG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gIGNvbnN0ICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgY29uc3QgJGxvZ28gPSAkaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RTZWN0aW9uID0gJG1haW4uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdENvbnRlbnQgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJGFib3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICBjb25zdCAkYWJvdXRDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fY2xvc2UnKTtcbiAgY29uc3QgJGFib3V0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fcGFnZScpO1xuICBjb25zdCAkYWJvdXRCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1iZycpO1xuICBjb25zdCAkYWJvdXRJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1pbm5lcicpO1xuICBjb25zdCAkZXhpdEFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXRBYm91dCcpO1xuICBjb25zdCAkY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG4gIGNvbnN0ICRjb250YWN0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1mb3JtLWFycm93Jyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlRm9ybUFycm93Jyk7XG4gIGNvbnN0IGFycm93UGF0aHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xzLWFycm93Jyk7XG4gIGNvbnN0IHByZXZBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1iYWNrJyk7XG4gIGNvbnN0IG5leHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1uZXh0Jyk7XG4gIGNvbnN0IHByZXZBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2QXJyb3cnKTtcbiAgY29uc3QgbmV4dEFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRBcnJvdycpO1xuICBjb25zdCAkd29ya0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICBjb25zdCAkd29ya1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10ZXh0Jyk7XG4gIGNvbnN0ICR3b3JrVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGl0bGUnKTtcbiAgY29uc3QgJHdvcmtCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstYnRuJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cdGNvbnN0IGlubmVyQ3Vyc29yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLXNtYWxsXCIpO1xuXHRjb25zdCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnNvci0tY2FudmFzXCIpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblx0XHRjb25zdCBpbml0Q3Vyc29yID0gKCkgPT4ge1xuXHRcdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBlID0+IHtcblx0XHQgICAgY2xpZW50WCA9IGUuY2xpZW50WDtcblx0XHQgICAgY2xpZW50WSA9IGUuY2xpZW50WTtcblx0XHQgIH0pO1xuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXHRcdCAgICBUd2Vlbk1heC5zZXQoaW5uZXJDdXJzb3IsIHtcblx0XHQgICAgICB4OiBjbGllbnRYLFxuXHRcdCAgICAgIHk6IGNsaWVudFlcblx0XHQgICAgfSk7XG5cdFx0ICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHQgIH07XG5cdFx0ICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcik7XG5cdFx0fTtcblx0XHRpbml0Q3Vyc29yKCk7XG5cblx0XHRsZXQgbGFzdFggPSAwO1xuXHRcdGxldCBsYXN0WSA9IDA7XG5cdFx0bGV0IGlzU3R1Y2sgPSBmYWxzZTtcblx0XHRsZXQgc2hvd0N1cnNvciA9IGZhbHNlO1xuXHRcdGxldCBncm91cDtcblx0XHRsZXQgc3R1Y2tYO1xuXHRcdGxldCBzdHVja1k7XG5cdFx0bGV0IGZpbGxPdXRlckN1cnNvcjtcblx0XHRjb25zdCBpbml0Q2FudmFzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc2hhcGVCb3VuZHMgPSB7XG5cdFx0XHRcdHdpZHRoOiA3NSxcblx0XHRcdFx0aGVpZ2h0OiA3NSxcblx0XHRcdH07XG5cdFx0XHRwYXBlci5zZXR1cChjYW52YXMpO1xuXHRcdFx0Y29uc3Qgc3Ryb2tlQ29sb3IgPSAncmdiYSg2MCwgNzQsIDgzLCAwLjUpJztcblx0XHRcdGNvbnN0IHN0cm9rZVdpZHRoID0gMTtcblx0XHRcdGNvbnN0IHNlZ21lbnRzID0gODtcblx0XHRcdGNvbnN0IHJhZGl1cyA9IDE1O1xuXHRcdFx0Y29uc3Qgbm9pc2VTY2FsZSA9IDE1MDtcblx0XHRcdGNvbnN0IG5vaXNlUmFuZ2UgPSA0O1xuXHRcdFx0bGV0IGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdGNvbnN0IHBvbHlnb24gPSBuZXcgcGFwZXIuUGF0aC5SZWd1bGFyUG9seWdvbihcblx0XHRcdFx0bmV3IHBhcGVyLlBvaW50KDAsMCksXG5cdFx0XHRcdHNlZ21lbnRzLFxuXHRcdFx0XHRyYWRpdXMsXG5cdFx0XHQpO1xuXHRcdFx0cG9seWdvbi5zdHJva2VDb2xvciA9IHN0cm9rZUNvbG9yO1xuICBcdFx0cG9seWdvbi5zdHJva2VXaWR0aCA9IHN0cm9rZVdpZHRoO1xuICBcdFx0cG9seWdvbi5zbW9vdGgoKTtcbiAgXHRcdGdyb3VwID0gbmV3IHBhcGVyLkdyb3VwKFtwb2x5Z29uXSk7XG4gIFx0XHRncm91cC5hcHBseU1hdHJpeCA9IGZhbHNlO1xuXHRcdFx0Y29uc3Qgbm9pc2VPYmplY3RzID0gcG9seWdvbi5zZWdtZW50cy5tYXAoKCkgPT4gbmV3IFNpbXBsZXhOb2lzZSgpKTtcbiAgXHRcdGxldCBiaWdDb29yZGluYXRlcyA9IFtdO1xuXHRcdFx0Y29uc3QgbGVycCA9IChhLCBiLCBuKSA9PiB7XG5cdFx0XHRcdHJldHVybiAoMSAtIG4pICogYSArIG4gKiBiO1xuXHRcdFx0fTtcblx0XHRcdGNvbnN0IG1hcCA9ICh2YWx1ZSwgaW5fbWluLCBpbl9tYXgsIG91dF9taW4sIG91dF9tYXgpID0+IHtcblx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHQoKHZhbHVlIC0gaW5fbWluKSAqIChvdXRfbWF4IC0gb3V0X21pbikpIC8gKGluX21heCAtIGluX21pbikgKyBvdXRfbWluXG5cdFx0XHRcdCk7XG5cdFx0XHR9O1xuXHRcdFx0cGFwZXIudmlldy5vbkZyYW1lID0gZXZlbnQgPT4ge1xuXG5cblx0XHRcdFx0aWYgKCFpc1N0dWNrKSB7XG5cdFx0XHQgICAgLy8gbW92ZSBjaXJjbGUgYXJvdW5kIG5vcm1hbGx5XG5cdFx0XHQgICAgbGFzdFggPSBsZXJwKGxhc3RYLCBjbGllbnRYLCAwLjIpO1xuXHRcdFx0ICAgIGxhc3RZID0gbGVycChsYXN0WSwgY2xpZW50WSwgMC4yKTtcblx0XHRcdCAgICBncm91cC5wb3NpdGlvbiA9IG5ldyBwYXBlci5Qb2ludChsYXN0WCwgbGFzdFkpO1xuXHRcdFx0ICB9IGVsc2UgaWYgKGlzU3R1Y2spIHtcblx0XHRcdCAgICAvLyBmaXhlZCBwb3NpdGlvbiBvbiBhIG5hdiBpdGVtXG5cdFx0XHQgICAgbGFzdFggPSBsZXJwKGxhc3RYLCBzdHVja1gsIDAuMik7XG5cdFx0XHQgICAgbGFzdFkgPSBsZXJwKGxhc3RZLCBzdHVja1ksIDAuMik7XG5cdFx0XHQgICAgZ3JvdXAucG9zaXRpb24gPSBuZXcgcGFwZXIuUG9pbnQobGFzdFgsIGxhc3RZKTtcblx0XHRcdCAgfVxuXG5cdFx0XHRcdGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoIDwgc2hhcGVCb3VuZHMud2lkdGgpIHtcblx0XHRcdFx0XHQvLyBzY2FsZSB1cCB0aGUgc2hhcGVcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKDEuMTUpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCFpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID4gMzApIHtcblx0XHRcdFx0XHQvLyByZW1vdmUgbm9pc2Vcblx0XHRcdFx0XHRpZiAoaXNOb2lzeSkge1xuXHRcdFx0XHRcdCAgcG9seWdvbi5zZWdtZW50cy5mb3JFYWNoKChzZWdtZW50LCBpKSA9PiB7XG5cdFx0XHRcdFx0ICAgIHNlZ21lbnQucG9pbnQuc2V0KGJpZ0Nvb3JkaW5hdGVzW2ldWzBdLCBiaWdDb29yZGluYXRlc1tpXVsxXSk7XG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0XHQgIGlzTm9pc3kgPSBmYWxzZTtcblx0XHRcdFx0XHQgIGJpZ0Nvb3JkaW5hdGVzID0gW107XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHNjYWxlIGRvd24gdGhlIHNoYXBlXG5cdFx0XHRcdFx0Y29uc3Qgc2NhbGVEb3duID0gMC45Mjtcblx0XHRcdFx0XHRwb2x5Z29uLnNjYWxlKHNjYWxlRG93bik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyB3aGlsZSBzdHVjayBhbmQgYmlnLCBhcHBseSBzaW1wbGV4IG5vaXNlXG5cdFx0XHQgIGlmIChpc1N0dWNrICYmIHBvbHlnb24uYm91bmRzLndpZHRoID49IHNoYXBlQm91bmRzLndpZHRoKSB7XG5cdFx0XHQgICAgaXNOb2lzeSA9IHRydWU7XG5cdFx0XHQgICAgLy8gZmlyc3QgZ2V0IGNvb3JkaW5hdGVzIG9mIGxhcmdlIGNpcmNsZVxuXHRcdFx0ICAgIGlmIChiaWdDb29yZGluYXRlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdCAgICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXHRcdFx0ICAgICAgICBiaWdDb29yZGluYXRlc1tpXSA9IFtzZWdtZW50LnBvaW50LngsIHNlZ21lbnQucG9pbnQueV07XG5cdFx0XHQgICAgICB9KTtcblx0XHRcdCAgICB9XG5cblx0XHRcdCAgICAvLyBsb29wIG92ZXIgYWxsIHBvaW50cyBvZiB0aGUgcG9seWdvblxuXHRcdFx0ICAgIHBvbHlnb24uc2VnbWVudHMuZm9yRWFjaCgoc2VnbWVudCwgaSkgPT4ge1xuXG5cdFx0XHQgICAgICAvLyBnZXQgbmV3IG5vaXNlIHZhbHVlXG5cdFx0XHQgICAgICAvLyB3ZSBkaXZpZGUgZXZlbnQuY291bnQgYnkgbm9pc2VTY2FsZSB0byBnZXQgYSB2ZXJ5IHNtb290aCB2YWx1ZVxuXHRcdFx0ICAgICAgY29uc3Qgbm9pc2VYID0gbm9pc2VPYmplY3RzW2ldLm5vaXNlMkQoZXZlbnQuY291bnQgLyBub2lzZVNjYWxlLCAwKTtcblx0XHRcdCAgICAgIGNvbnN0IG5vaXNlWSA9IG5vaXNlT2JqZWN0c1tpXS5ub2lzZTJEKGV2ZW50LmNvdW50IC8gbm9pc2VTY2FsZSwgMSk7XG5cblx0XHRcdCAgICAgIC8vIG1hcCB0aGUgbm9pc2UgdmFsdWUgdG8gb3VyIGRlZmluZWQgcmFuZ2Vcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25YID0gbWFwKG5vaXNlWCwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblx0XHRcdCAgICAgIGNvbnN0IGRpc3RvcnRpb25ZID0gbWFwKG5vaXNlWSwgLTEsIDEsIC1ub2lzZVJhbmdlLCBub2lzZVJhbmdlKTtcblxuXHRcdFx0ICAgICAgLy8gYXBwbHkgZGlzdG9ydGlvbiB0byBjb29yZGluYXRlc1xuXHRcdFx0ICAgICAgY29uc3QgbmV3WCA9IGJpZ0Nvb3JkaW5hdGVzW2ldWzBdICsgZGlzdG9ydGlvblg7XG5cdFx0XHQgICAgICBjb25zdCBuZXdZID0gYmlnQ29vcmRpbmF0ZXNbaV1bMV0gKyBkaXN0b3J0aW9uWTtcblxuXHRcdFx0ICAgICAgLy8gc2V0IG5ldyAobm9pc3kpIGNvb2RyaW5kYXRlIG9mIHBvaW50XG5cdFx0XHQgICAgICBzZWdtZW50LnBvaW50LnNldChuZXdYLCBuZXdZKTtcblx0XHRcdCAgICB9KTtcblxuXHRcdFx0ICB9XG5cdFx0XHQgIHBvbHlnb24uc21vb3RoKCk7XG5cblxuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGluaXRDYW52YXMoKTtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3JIb3ZlcnMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIgPSBlID0+IHtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbSA9IGUuY3VycmVudFRhcmdldDtcblx0XHRcdFx0Y29uc3QgbmF2SXRlbUJveCA9IG5hdkl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdHN0dWNrWCA9IE1hdGgucm91bmQobmF2SXRlbUJveC5sZWZ0ICsgbmF2SXRlbUJveC53aWR0aCAvIDIpO1xuXHRcdFx0XHRzdHVja1kgPSBNYXRoLnJvdW5kKG5hdkl0ZW1Cb3gudG9wICsgbmF2SXRlbUJveC5oZWlnaHQgLyAyKTtcblx0XHRcdFx0aXNTdHVjayA9IHRydWU7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlID0gKCkgPT4ge1xuXHRcdFx0XHRpc1N0dWNrID0gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlRW50ZXIpO1xuXHRcdFx0JGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBoYW5kbGVCYXNpY0N1cnNvck1vdXNlTGVhdmUpO1xuXHRcdFx0Y29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuXHRcdFx0JHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuXHRcdFx0XHRsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGhhbmRsZUJhc2ljQ3Vyc29yTW91c2VFbnRlcik7XG5cdFx0XHRcdGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgaGFuZGxlQmFzaWNDdXJzb3JNb3VzZUxlYXZlKTtcblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpbml0Q3Vyc29ySG92ZXJzKCk7XG5cblxuXG5cblxuXG5cdH1cblxuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuXG4gICAgb25lUGFnZVNjcm9sbChcIi5tYWluXCIsIHtcbiAgICAgIHNlY3Rpb25Db250YWluZXI6IFwic2VjdGlvblwiLFxuICAgICAgZWFzaW5nOiBcImN1YmljLWJlemllcigwLjUwLCAwLCAwLjUwLCAxKVwiLFxuICAgICAgYW5pbWF0aW9uVGltZTogNzUwLFxuICAgICAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgICAgIHVwZGF0ZVVSTDogZmFsc2UsXG4gICAgICBiZWZvcmVNb3ZlOiBmdW5jdGlvbihpbmRleCwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgYWxsUHJvZ3Jlc3NCYXJzID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yQWxsKCcucGFnaW5hdGlvbi1wcm9ncmVzcycpO1xuICAgICAgICBhbGxQcm9ncmVzc0JhcnMuZm9yRWFjaChiYXIgPT4ge1xuICAgICAgICAgIFR3ZWVuTWF4LnRvKGJhciwgMSwge3dpZHRoOicwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBiZWZvcmVNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBiZWZvcmVNb3ZlVGxcbiAgICAgICAgICAgIC5zZXQoY19iZ18xLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2JnXzIsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYXJ0aWNsZSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19zdmcsIHt4UGVyY2VudDotMjAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX2ltZywge3NjYWxlOi43NSwgYXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmssIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6NTB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfdGV4dCwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMjV9KVxuICAgICAgICAgICAgO1xuXG4gICAgICB9LFxuICAgICAgYWZ0ZXJNb3ZlOiBmdW5jdGlvbihpbmRleCwgY3VycmVudFNlY3Rpb24pIHtcbiAgICAgICAgbGV0IHByZXZBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBwcmV2QXJyb3dJblRsXG4gICAgICAgICAgICAudG8ocHJldkFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBuZXh0QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbmV4dEFycm93SW5UbFxuICAgICAgICAgICAgLnRvKG5leHRBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBjdXJyZW50TGluayA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvcihgYVtkYXRhLWluZGV4PVwiJHtpbmRleH1cIl1gKTtcbiAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaW5rLnByZXZpb3VzU2libGluZztcblxuICAgICAgICBsZXQgYWZ0ZXJNb3ZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbGV0IGFmdGVyTW92ZVNwbGl0VGV4dCA9IG5ldyBTcGxpdFRleHQoY19pbmRleCwge3R5cGU6J3dvcmRzLGNoYXJzJ30pO1xuICAgICAgICBsZXQgY2hhcnMgPSBhZnRlck1vdmVTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgYWZ0ZXJNb3ZlVGxcbiAgICAgICAgICAgIC50byhjX2JnXzEsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUnKVxuICAgICAgICAgICAgLnRvKGNfYmdfMiwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1JylcbiAgICAgICAgICAgIC50byhjX2FydGljbGUsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS41JylcbiAgICAgICAgICAgIC50byhjX3N2ZywgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAudG8oY193b3JrX2ltZywgMS41LCB7c2NhbGU6MSwgYXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MScpXG4gICAgICAgICAgICAudG8oY193b3JrLCAuNSwge2F1dG9BbHBoYToxLCB5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuMjUnKVxuICAgICAgICAgICAgLnRvKGNfd29ya190ZXh0LCAxLCB7c2NhbGU6MSwgYXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS41JylcbiAgICAgICAgICAgIC5zdGFnZ2VyRnJvbShjaGFycywgMSwge2F1dG9BbHBoYTowLCB5UGVyY2VudDotMTAwLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAwLjI1LCAnYmVmb3JlKz0xLjc1JylcbiAgICAgICAgICAgIC50byhjdXJyZW50UHJvZ3Jlc3NCYXIsIDAuNzUsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpO1xuICAgICAgfSxcbiAgICAgIGxvb3A6IHRydWUsXG4gICAgICBrZXlib2FyZDogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmVGYWxsYmFjazogZmFsc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpJyk7XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGkgYScpO1xuICAgIGNvbnN0ICR3b3JrSW5kaWNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWluZGV4Jyk7XG4gICAgY29uc3QgJHRvdGFsUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG90YWwtcHJvZ3Jlc3MnKTtcblxuICAgIGZ1bmN0aW9uIG9wZW5Xb3JrVGV4dChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgd29ya1RleHQgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcztcbiAgICAgIGxldCBvcGVuSWNvbiA9IHdvcmtUaXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBkaXNwbGF5ID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnY2xvc2VkJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG4gICAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZXhwYW5kV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLnRvKG9wZW5JY29uLCAxLCB7cm90YXRpb246NDUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC5mcm9tVG8od29ya01haW4sIDAuNSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se2Rpc3BsYXk6J2Jsb2NrJywgeVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4rPTAuNScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGxldCB3b3JrQnRuID0gdGhpcztcbiAgICAgIGxldCB3b3JrVGl0bGUgPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya1RleHQgPSB3b3JrVGl0bGUucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byh3b3JrQnRuLCAxLCB7cm90YXRpb246NDUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC5mcm9tVG8od29ya01haW4sIDAuNSwge3lQZXJjZW50OjEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZX0se2Rpc3BsYXk6J2Jsb2NrJywgeVBlcmNlbnQ6MCwgYXV0b0FscGhhOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4rPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKGRpc3BsYXkgPT09ICdvcGVuJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdjbG9zZWQnKTtcbiAgICAgICAgbGV0IGhpZGVXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgaGlkZVdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrQnRuLCAxLCB7cm90YXRpb246MCwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtNYWluLCAwLjUsIHtkaXNwbGF5Oidub25lJywgYXV0b0FscGhhOjAsIHlQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZScpXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6J2F1dG8nLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZSs9MC41JylcbiAgICAgICAgICAgIDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAkd29ya1RpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlbldvcmtUZXh0KSk7XG4gICAgJHdvcmtCdG5zLmZvckVhY2goYnV0dG9uID0+IGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlV29ya1RleHQpKTtcblxuICAgIGNvbnN0IGhvdmVyV29ya0l0ZW0gPSAoZSkgPT4ge1xuICAgICAgbGV0IHdvcmtJdGVtID0gZS50YXJnZXQ7XG4gICAgICBsZXQgdGV4dCA9IGUudGFyZ2V0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgdGl0bGUgPSB0ZXh0LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uID0gdGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblN2ZyA9IG9wZW5JY29uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uUGF0aCA9IG9wZW5JY29uU3ZnLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGhvdmVyU3RhdHVzID0gd29ya0l0ZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJyk7XG4gICAgICBpZiAoaG92ZXJTdGF0dXMgPT09ICdubycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ3llcycpO1xuICAgICAgICBsZXQgZW50ZXJXb3JrSXRlbVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZW50ZXJXb3JrSXRlbVRsXG4gICAgICAgICAgICAudG8odGV4dCwgMSwge2JhY2tncm91bmRDb2xvcjoncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8odGl0bGUsIDEsIHtwYWRkaW5nOic1MHB4IDAnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uLCAwLjUsIHt5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZX0se2F1dG9BbHBoYToxLCB5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCcpXG4gICAgICAgICAgICAuZnJvbVRvKG9wZW5JY29uUGF0aCwgMSwge2ZpbGw6ICdub25lJ30se2ZpbGw6JyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCs9MC41Jyk7XG4gICAgICB9IGVsc2UgaWYgKGhvdmVyU3RhdHVzID09PSAneWVzJykge1xuICAgICAgICB3b3JrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnLCAnbm8nKTtcbiAgICAgICAgbGV0IGxlYXZlV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGxlYXZlV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonMTBweCAwJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICR3b3JrSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhvdmVyV29ya0l0ZW0pKTtcbiAgICAgICR3b3JrSXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIGhvdmVyV29ya0l0ZW0pKTtcbiAgICB9XG5cbiAgICBwcmV2QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZVVwKCcubWFpbicpO1xuICAgICAgY29uc3QgcHJldkFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgcHJldkFycm93T3V0VGwuZnJvbVRvKHByZXZBcnJvdywgLjUsIHt4Oi0xMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NwJylcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIHByZXZBcnJvd091dFRsLnRvKHByZXZBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzcCs9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG4gICAgbmV4dEFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbW92ZURvd24oJy5tYWluJyk7XG4gICAgICBjb25zdCBuZXh0QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBuZXh0QXJyb3dPdXRUbC5mcm9tVG8obmV4dEFycm93LCAuNSwge3g6MTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzbicpO1xuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgbmV4dEFycm93T3V0VGwudG8obmV4dEFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NuKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgYXJyb3dQYXRocy5mb3JFYWNoKHBhdGggPT4ge1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VFbnRlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VFbnRlclRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZTowLjk1LCBmaWxsOicjMDgxMTIxJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonNzMlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUxlYXZlVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUxlYXZlVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjEsIGZpbGw6J25vbmUnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ2VuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cInRvdGFsLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJjdXJyZW50LXByb2dyZXNzXCI+PC9kaXY+YCk7XG5cbiAgICBmdW5jdGlvbiByZXNldFByb2dyZXNzKGUpIHtcbiAgICAgIGxldCBjUHJvZ3Jlc3MgPSB0aGlzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAxLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMiwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkZm9vdGVyTmF2LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCByZXNldFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAkcGFnaW5hdGlvbkxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsZXQgbGlua3MgPSAkcGFnaW5hdGlvbkxpbmtzLmxlbmd0aDtcbiAgICAgIGxldCBwZXJjZW50UGVyTGluayA9IDEwMCAvIGxpbmtzO1xuICAgICAgaWYgKGxpbmtzIDwgMTApIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBsaW5rcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBsaW5rcztcbiAgICAgIH1cbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgIGxldCBjdXJyZW50TGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgIGxldCBjdXJyZW50TGkgPSBjdXJyZW50TGluay5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBpbmRleCA9IGN1cnJlbnRMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgICAgbGV0IHBhZ2luYXRpb24gPSBjdXJyZW50TGkucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgY1Byb2dyZXNzID0gcGFnaW5hdGlvbi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgbGV0IHRhcmdldExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmluZGV4fSVgO1xuICAgICAgICAgIGxldCBhY3RpdmVJbmRleCA9IHBhZ2luYXRpb24ucXVlcnlTZWxlY3RvcignLmFjdGl2ZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgICAgIGxldCBjdXJyZW50TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqYWN0aXZlSW5kZXh9JWA7XG5cbiAgICAgICAgICBpZiAoaW5kZXggPCBhY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHtjdXJyZW50TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAxLCB7d2lkdGg6YCR7dGFyZ2V0TGVuZ3RofWAsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkcGFnaW5hdGlvbkxpcy5mb3JFYWNoKGxpID0+IHtcbiAgICAgIGxldCBsaW5rID0gbGkuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaW5kZXggPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpO1xuICAgICAgbGkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgYDxkaXYgY2xhc3M9XCJwYWdpbmF0aW9uLXByb2dyZXNzXCI+PC9kaXY+YCk7XG4gICAgICBsaW5rLnJlbW92ZUF0dHJpYnV0ZSgnaHJlZicpO1xuICAgIH0pO1xuXG4gICAgJHdvcmtJbmRpY2VzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgbGV0IGluZGljZXMgPSAkd29ya0luZGljZXMubGVuZ3RoO1xuICAgICAgbGV0IHNlY3Rpb24gPSBpbmRleC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gICAgICBpZiAoaW5kaWNlcyA8IDEwKSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgaW5kaWNlcztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4LmlubmVySFRNTCA9IHNlY3Rpb24uZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLycgKyBpbmRpY2VzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3QgdG9nZ2xlU3RhdGUgPSAoZWxlbSwgYXR0ciwgYSwgYikgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtlbGVtfWApO1xuICAgICAgIGN1cnJlbnRFbGVtZW50LnNldEF0dHJpYnV0ZShgJHthdHRyfWAsIGN1cnJlbnRFbGVtZW50LmdldEF0dHJpYnV0ZShgJHthdHRyfWApID09PSBhID8gYiA6IGEpO1xuICAgIH1cblxuICAgICRjb250YWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBzaG93Rm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBzaG93Rm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MCwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC50bygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZicpXG4gICAgICAgIC5mcm9tVG8oJGNvbnRhY3RQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uMjUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93LCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjY1LCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjQ1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvd1BhdGgsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkaGlkZUZvcm1BcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgaGlkZUZvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgaGlkZUZvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjEsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkY29udGFjdFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRJbm5lciwgMSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkYWJvdXRQYWdlTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBsaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgbGlua1NwbGl0VGV4dCA9IG5ldyBTcGxpdFRleHQobGluaywge3R5cGU6J3dvcmRzLGNoYXJzJ30pO1xuICAgICAgICAgICAgbGV0IGNoYXJzID0gbGlua1NwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tKGNoYXJzLCAwLjIsIHtzY2FsZTowLCB4OictNScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sIDAuMDMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRhYm91dExpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnb3BlbicpIHtcbiAgICAgICAgbGV0IGFib3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYWJvdXRUbFxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAyLCB7eVBlcmNlbnQ6MjAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sIC4wOCwgJ2VudGVyJylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMiwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRQYWdlLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0QmcsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMTUnKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTUwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0uMjUnKVxuICAgICAgICAgIC5mcm9tVG8oJGV4aXRBYm91dCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTEuMjUnKVxuICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIGxldCBiYWNrVGwxID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGJhY2tUbDFcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBiYWNrVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGJhY2tUbFxuICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgIC50bygkYWJvdXRCZywgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkYWJvdXRQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRmb290ZXJOYXYsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3RyYW5zcGFyZW50JywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonIzA4MTEyMScsIHNjYWxlOjAuOTUsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6J25vbmUnLCBzY2FsZToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgJGhpZ2hsaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICRoaWdobGlnaHQuY2xhc3NMaXN0LmFkZCgnbGluay1oaWdobGlnaHQnKTtcbiAgICAgIHRoaXMuYXBwZW5kKCRoaWdobGlnaHQpO1xuICAgICAgbGV0IGhpZ2hsaWdoTGlua1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGhpZ2hsaWdoTGlua1RsXG4gICAgICAgICAgLnRvKCRoaWdobGlnaHQsIDEsIHt3aWR0aDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pXG4gICAgICAgICAgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVuaGlnaGxpZ2h0TGluayhlKSB7XG4gICAgICBsZXQgaGlnaGxpZ2h0ID0gdGhpcy5xdWVyeVNlbGVjdG9yKCcubGluay1oaWdobGlnaHQnKTtcbiAgICAgIGhpZ2hsaWdodC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaGlnaGxpZ2h0TGluaykpO1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB1bmhpZ2hsaWdodExpbmspKTtcbiAgICB9XG5cbiAgICBsb2FkZXJNb2R1bGUoKTtcbiAgICBmb3JtTW9kdWxlKCk7XG5cdFx0Y3Vyc29yTW9kdWxlKCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQ6IGluaXRcbiAgfVxufSkoKTtcblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgYXBwLmluaXQoKTtcbn1cbiJdfQ==
