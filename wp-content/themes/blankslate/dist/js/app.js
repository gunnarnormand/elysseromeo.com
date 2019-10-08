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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImlubmVyQ3Vyc29yIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJhdXRvQWxwaGEiLCJzZXQiLCJkaXNwbGF5IiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJjdXJzb3JNb2R1bGUiLCJjbGllbnRYIiwiY2xpZW50WSIsImluaXRDdXJzb3IiLCJlIiwicmVuZGVyIiwieCIsInkiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJpbml0Iiwib25lUGFnZVNjcm9sbCIsInNlY3Rpb25Db250YWluZXIiLCJlYXNpbmciLCJhbmltYXRpb25UaW1lIiwicGFnaW5hdGlvbiIsInVwZGF0ZVVSTCIsImJlZm9yZU1vdmUiLCJpbmRleCIsImN1cnJlbnRTZWN0aW9uIiwiY19iZ18xIiwiY19iZ18yIiwiY19hcnRpY2xlIiwiY193b3JrX2ltZyIsImNfc3ZnIiwibGFzdEVsZW1lbnRDaGlsZCIsImNfd29yayIsImNfd29ya190ZXh0IiwiY19pbmRleCIsImFsbFByb2dyZXNzQmFycyIsImJhciIsImJlZm9yZU1vdmVUbCIsInNjYWxlIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkcGFnaW5hdGlvbkxpbmtzIiwiJHdvcmtJbmRpY2VzIiwiJHRvdGFsUHJvZ3Jlc3MiLCJvcGVuV29ya1RleHQiLCJwcmV2ZW50RGVmYXVsdCIsIndvcmtUZXh0IiwicGFyZW50RWxlbWVudCIsIndvcmtUaXRsZSIsIm9wZW5JY29uIiwid29ya01haW4iLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJleHBhbmRXb3JrVGV4dFRsIiwiaGVpZ2h0Iiwicm90YXRpb24iLCJjbG9zZVdvcmtUZXh0Iiwic3RvcFByb3BhZ2F0aW9uIiwid29ya0J0biIsImhpZGVXb3JrVGV4dFRsIiwidGl0bGUiLCJidXR0b24iLCJob3ZlcldvcmtJdGVtIiwid29ya0l0ZW0iLCJ0YXJnZXQiLCJ0ZXh0Iiwib3Blbkljb25TdmciLCJvcGVuSWNvblBhdGgiLCJob3ZlclN0YXR1cyIsImVudGVyV29ya0l0ZW1UbCIsImJhY2tncm91bmRDb2xvciIsInBhZGRpbmciLCJsZWF2ZVdvcmtJdGVtVGwiLCJpdGVtIiwibW92ZVVwIiwicHJldkFycm93T3V0VGwiLCJtb3ZlRG93biIsIm5leHRBcnJvd091dFRsIiwicGF0aCIsImFycm93TW91c2VFbnRlclRsIiwiYXJyb3dNb3VzZUxlYXZlVGwiLCJyZXNldFByb2dyZXNzIiwiY1Byb2dyZXNzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwidFByb2dyZXNzIiwibGluayIsImxpbmtzIiwicGVyY2VudFBlckxpbmsiLCJpbm5lckhUTUwiLCJjdXJyZW50TGkiLCJ0YXJnZXRMZW5ndGgiLCJhY3RpdmVJbmRleCIsImN1cnJlbnRMZW5ndGgiLCJsaSIsInJlbW92ZUF0dHJpYnV0ZSIsImluZGljZXMiLCJzZWN0aW9uIiwidG9nZ2xlU3RhdGUiLCJlbGVtIiwiYXR0ciIsImEiLCJiIiwiY3VycmVudEVsZW1lbnQiLCJzaG93Rm9ybVRsIiwiaGlkZUZvcm1UbCIsImxpbmtTcGxpdFRleHQiLCJhYm91dFRsIiwic3RhZ2dlclRvIiwiYmFja1RsMSIsImJhY2tUbCIsImFib3V0Q2xvc2VIb3ZlclRsIiwiaGlnaGxpZ2h0TGluayIsIiRoaWdobGlnaHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwiaGlnaGxpZ2hMaW5rVGwiLCJ1bmhpZ2hsaWdodExpbmsiLCJoaWdobGlnaHQiLCJyZW1vdmUiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsR0FBRyxHQUFJLFlBQVk7QUFFeEIsTUFBTUMsUUFBUSxHQUFHQyxXQUFXLENBQUNDLE9BQTdCO0FBQ0EsTUFBTUMsV0FBVyx1REFBakI7QUFDQyxNQUFNQyxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixTQUF2QixDQUFoQjtBQUNELE1BQU1DLFVBQVUsR0FBR0YsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQW5CO0FBQ0MsTUFBTUUsVUFBVSxHQUFHSCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBbkI7QUFDQSxNQUFNRyxLQUFLLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixPQUF2QixDQUFkO0FBQ0EsTUFBTUksT0FBTyxHQUFHTCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBaEI7QUFDQSxNQUFNSyxJQUFJLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFiO0FBQ0EsTUFBTU0sS0FBSyxHQUFHRixPQUFPLENBQUNHLGlCQUF0QjtBQUNBLE1BQU1DLGFBQWEsR0FBR0wsS0FBSyxDQUFDSSxpQkFBNUI7QUFDQSxNQUFNRSxhQUFhLEdBQUdELGFBQWEsQ0FBQ1IsYUFBZCxDQUE0QixlQUE1QixDQUF0QjtBQUNBLE1BQU1VLFVBQVUsR0FBR1gsUUFBUSxDQUFDQyxhQUFULENBQXVCLFFBQXZCLENBQW5CO0FBQ0EsTUFBTVcsV0FBVyxHQUFHWixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBcEI7QUFDQSxNQUFNWSxVQUFVLEdBQUdiLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixjQUF2QixDQUFuQjtBQUNBLE1BQU1hLFFBQVEsR0FBR2QsUUFBUSxDQUFDQyxhQUFULENBQXVCLFdBQXZCLENB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QUNrQixDQURsQixFQUNxQjtBQUFDakksUUFBQUEsS0FBSyxFQUFDLE1BQVA7QUFBZXhCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDaUI7QUFBMUIsT0FEckI7QUFHSDs7QUFFRCxhQUFTNkksZUFBVCxDQUF5QnhILENBQXpCLEVBQTRCO0FBQzFCLFVBQUl5SCxTQUFTLEdBQUcsS0FBS3ZOLGFBQUwsQ0FBbUIsaUJBQW5CLENBQWhCO0FBQ0F1TixNQUFBQSxTQUFTLENBQUNDLE1BQVY7QUFDRDs7QUFFRCxRQUFJdkksTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCcEQsTUFBQUEsTUFBTSxDQUFDVyxPQUFQLENBQWUsVUFBQTRJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUNwSCxnQkFBTCxDQUFzQixZQUF0QixFQUFvQzhJLGFBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNBakwsTUFBQUEsTUFBTSxDQUFDVyxPQUFQLENBQWUsVUFBQTRJLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUNwSCxnQkFBTCxDQUFzQixZQUF0QixFQUFvQ3FKLGVBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNEOztBQUVEckwsSUFBQUEsWUFBWTtBQUNaK0MsSUFBQUEsVUFBVTtBQUNaVSxJQUFBQSxZQUFZO0FBQ1gsR0EzWUQ7O0FBNllBLFNBQU87QUFDTFMsSUFBQUEsSUFBSSxFQUFFQTtBQURELEdBQVA7QUFHRCxDQXBpQlcsRUFBWjs7QUFzaUJBbEIsTUFBTSxDQUFDd0ksTUFBUCxHQUFnQixZQUFNO0FBQ3BCaE8sRUFBQUEsR0FBRyxDQUFDMEcsSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCAkc2l0ZXVybCA9IEVMWVNTRVJPTUVPLnNpdGV1cmw7XG5cdGNvbnN0ICRkZWZhdWx0SW1nID0gYC93cC1jb250ZW50L3RoZW1lcy9ibGFua3NsYXRlL2Rpc3QvaW1nL2RlZmF1bHQucG5nYDtcbiAgY29uc3QgJGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKTtcblx0Y29uc3QgJGxvYWRlckdJRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJHSUYnKTtcbiAgY29uc3QgJGxvYWRlclNWRyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJTVkcnKTtcbiAgY29uc3QgJG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gIGNvbnN0ICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgY29uc3QgJGxvZ28gPSAkaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RTZWN0aW9uID0gJG1haW4uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdENvbnRlbnQgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJGFib3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICBjb25zdCAkYWJvdXRDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fY2xvc2UnKTtcbiAgY29uc3QgJGFib3V0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fcGFnZScpO1xuICBjb25zdCAkYWJvdXRCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1iZycpO1xuICBjb25zdCAkYWJvdXRJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1pbm5lcicpO1xuICBjb25zdCAkZXhpdEFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXRBYm91dCcpO1xuICBjb25zdCAkY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG4gIGNvbnN0ICRjb250YWN0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1mb3JtLWFycm93Jyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlRm9ybUFycm93Jyk7XG4gIGNvbnN0IGFycm93UGF0aHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xzLWFycm93Jyk7XG4gIGNvbnN0IHByZXZBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1iYWNrJyk7XG4gIGNvbnN0IG5leHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1uZXh0Jyk7XG4gIGNvbnN0IHByZXZBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2QXJyb3cnKTtcbiAgY29uc3QgbmV4dEFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRBcnJvdycpO1xuICBjb25zdCAkd29ya0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICBjb25zdCAkd29ya1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10ZXh0Jyk7XG4gIGNvbnN0ICR3b3JrVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGl0bGUnKTtcbiAgY29uc3QgJHdvcmtCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstYnRuJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cdGNvbnN0IGlubmVyQ3Vyc29yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3ItLXNtYWxsXCIpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblx0Y29uc3QgY3Vyc29yTW9kdWxlID0gKCkgPT4ge1xuXG5cdFx0bGV0IGNsaWVudFggPSAtMTAwO1xuXHRcdGxldCBjbGllbnRZID0gLTEwMDtcblxuXHRcdGNvbnN0IGluaXRDdXJzb3IgPSAoKSA9PiB7XG5cblx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZSA9PiB7XG5cdFx0ICAgIGNsaWVudFggPSBlLmNsaWVudFg7XG5cdFx0ICAgIGNsaWVudFkgPSBlLmNsaWVudFk7XG5cdFx0ICB9KTtcblxuXHRcdCAgY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuXG5cdFx0ICAgIFR3ZWVuTWF4LnNldChpbm5lckN1cnNvciwge1xuXHRcdCAgICAgIHg6IGNsaWVudFgsXG5cdFx0ICAgICAgeTogY2xpZW50WVxuXHRcdCAgICB9KTtcblxuXHRcdCAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyKTtcblx0XHQgIH07XG5cblx0XHQgIHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXIpO1xuXG5cdFx0fTtcblxuXHRcdGluaXRDdXJzb3IoKTtcblxuXG5cblxuXHR9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjUwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX3RleHQsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTI1fSlcbiAgICAgICAgICAgIDtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgbmV4dEFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIG5leHRBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhuZXh0QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29yaywgLjUsIHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjI1JylcbiAgICAgICAgICAgIC50byhjX3dvcmtfdGV4dCwgMSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuNScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXM7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byhvcGVuSWNvbiwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsZXQgd29ya0J0biA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUZXh0ID0gd29ya1RpdGxlLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSAnb3BlbicpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG4gICAgICAgIGxldCBoaWRlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGhpZGVXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjAsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrTWFpbiwgMC41LCB7ZGlzcGxheTonbm9uZScsIGF1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UrPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJHdvcmtUaXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuICAgICR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cbiAgICBjb25zdCBob3ZlcldvcmtJdGVtID0gKGUpID0+IHtcbiAgICAgIGxldCB3b3JrSXRlbSA9IGUudGFyZ2V0O1xuICAgICAgbGV0IHRleHQgPSBlLnRhcmdldC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHRpdGxlID0gdGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHRpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBob3ZlclN0YXR1cyA9IHdvcmtJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycpO1xuICAgICAgaWYgKGhvdmVyU3RhdHVzID09PSAnbm8nKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICd5ZXMnKTtcbiAgICAgICAgbGV0IGVudGVyV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGVudGVyV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonNTBweCAwJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTAuNScpO1xuICAgICAgfSBlbHNlIGlmIChob3ZlclN0YXR1cyA9PT0gJ3llcycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ25vJyk7XG4gICAgICAgIGxldCBsZWF2ZVdvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBsZWF2ZVdvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzEwcHggMCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgfVxuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGxpbmtTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGxpbmssIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IGxpbmtTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbShjaGFycywgMC4yLCB7c2NhbGU6MCwgeDonLTUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAwLjAzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuXHRcdGN1cnNvck1vZHVsZSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
