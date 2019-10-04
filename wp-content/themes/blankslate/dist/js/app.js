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
  };

  return {
    init: init
  };
}();

window.onload = function () {
  app.init();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJHSUYiLCIkbG9hZGVyU1ZHIiwiJG1haW4iLCIkaGVhZGVyIiwiJG5hdiIsIiRsb2dvIiwiZmlyc3RFbGVtZW50Q2hpbGQiLCIkZmlyc3RTZWN0aW9uIiwiJGZpcnN0Q29udGVudCIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImxvYWRlck1vZHVsZSIsIiRmb290ZXJOYXYiLCIkZm9vdGVyTGlua3MiLCJjaGlsZHJlbiIsIiRmaXJzdEZvb3Rlck5hdkl0ZW0iLCJyZWdleCIsIiRpbWFnZXMiLCJpbWdTcmNzIiwiZm9yRWFjaCIsImltYWdlIiwic3R5bGUiLCJjc3NUZXh0IiwibWF0Y2giLCJwdXNoIiwibG9hZGluZ1RsIiwiVGltZWxpbmVNYXgiLCJkZWxheSIsInNtb290aENoaWxkVGltaW5nIiwicmVwZWF0IiwieW95byIsImZyb21UbyIsImRyYXdTVkciLCJlYXNlIiwiRXhwbyIsImVhc2VJbk91dCIsImxvYWRlclRsIiwibG9hZGVkSW1hZ2VzIiwiaSIsImxlbmd0aCIsInRtcCIsIkltYWdlIiwic3JjIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvIiwiYXV0b0FscGhhIiwic2V0IiwiZGlzcGxheSIsImZvcmNlM0QiLCJmcm9tIiwieFBlcmNlbnQiLCJlYXNlT3V0IiwiZWFzZUluIiwic3RhZ2dlckZyb20iLCJ5UGVyY2VudCIsIkJhY2siLCJjb25maWciLCJ3aWR0aCIsImZvcm1Nb2R1bGUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwic3VibWl0Q29udGFpbmVyIiwic3VibWl0QnRuIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic3VibWl0UGF0aCIsIlR3ZWVuTWF4Iiwic3VibWl0VGwiLCJmaWxsIiwiaW5pdCIsIm9uZVBhZ2VTY3JvbGwiLCJzZWN0aW9uQ29udGFpbmVyIiwiZWFzaW5nIiwiYW5pbWF0aW9uVGltZSIsInBhZ2luYXRpb24iLCJ1cGRhdGVVUkwiLCJiZWZvcmVNb3ZlIiwiaW5kZXgiLCJjdXJyZW50U2VjdGlvbiIsImNfYmdfMSIsImNfYmdfMiIsImNfYXJ0aWNsZSIsImNfd29ya19pbWciLCJjX3N2ZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJjX3dvcmsiLCJjX3dvcmtfdGV4dCIsImNfaW5kZXgiLCJhbGxQcm9ncmVzc0JhcnMiLCJiYXIiLCJiZWZvcmVNb3ZlVGwiLCJzY2FsZSIsImFmdGVyTW92ZSIsInByZXZBcnJvd0luVGwiLCJuZXh0QXJyb3dJblRsIiwiY3VycmVudExpbmsiLCJjdXJyZW50UHJvZ3Jlc3NCYXIiLCJwcmV2aW91c1NpYmxpbmciLCJhZnRlck1vdmVUbCIsImFmdGVyTW92ZVNwbGl0VGV4dCIsIlNwbGl0VGV4dCIsInR5cGUiLCJjaGFycyIsImxvb3AiLCJrZXlib2FyZCIsInJlc3BvbnNpdmVGYWxsYmFjayIsIiRwYWdpbmF0aW9uTGlzIiwiJHBhZ2luYXRpb25MaW5rcyIsIiR3b3JrSW5kaWNlcyIsIiR0b3RhbFByb2dyZXNzIiwib3BlbldvcmtUZXh0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJoZWlnaHQiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIngiLCJtb3ZlRG93biIsIm5leHRBcnJvd091dFRsIiwicGF0aCIsImFycm93TW91c2VFbnRlclRsIiwiYXJyb3dNb3VzZUxlYXZlVGwiLCJyZXNldFByb2dyZXNzIiwiY1Byb2dyZXNzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwidFByb2dyZXNzIiwibGluayIsImxpbmtzIiwicGVyY2VudFBlckxpbmsiLCJpbm5lckhUTUwiLCJjdXJyZW50TGkiLCJ0YXJnZXRMZW5ndGgiLCJhY3RpdmVJbmRleCIsImN1cnJlbnRMZW5ndGgiLCJsaSIsInJlbW92ZUF0dHJpYnV0ZSIsImluZGljZXMiLCJzZWN0aW9uIiwidG9nZ2xlU3RhdGUiLCJlbGVtIiwiYXR0ciIsImEiLCJiIiwiY3VycmVudEVsZW1lbnQiLCJzaG93Rm9ybVRsIiwiaGlkZUZvcm1UbCIsImxpbmtTcGxpdFRleHQiLCJhYm91dFRsIiwic3RhZ2dlclRvIiwiYmFja1RsMSIsImJhY2tUbCIsImFib3V0Q2xvc2VIb3ZlclRsIiwiaGlnaGxpZ2h0TGluayIsIiRoaWdobGlnaHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwiaGlnaGxpZ2hMaW5rVGwiLCJ1bmhpZ2hsaWdodExpbmsiLCJoaWdobGlnaHQiLCJyZW1vdmUiLCJv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cCA9IChmdW5jdGlvbiAoKSB7XG5cblx0Y29uc3QgJHNpdGV1cmwgPSBFTFlTU0VST01FTy5zaXRldXJsO1xuXHRjb25zdCAkZGVmYXVsdEltZyA9IGAvd3AtY29udGVudC90aGVtZXMvYmxhbmtzbGF0ZS9kaXN0L2ltZy9kZWZhdWx0LnBuZ2A7XG4gIGNvbnN0ICRsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJyk7XG5cdGNvbnN0ICRsb2FkZXJHSUYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyR0lGJyk7XG4gIGNvbnN0ICRsb2FkZXJTVkcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyU1ZHJyk7XG4gIGNvbnN0ICRtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICBjb25zdCAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gIGNvbnN0ICRsb2dvID0gJGhlYWRlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0U2VjdGlvbiA9ICRtYWluLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RDb250ZW50ID0gJGZpcnN0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICRhYm91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgY29uc3QgJGFib3V0Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2Nsb3NlJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX3BhZ2UnKTtcbiAgY29uc3QgJGFib3V0QmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtYmcnKTtcbiAgY29uc3QgJGFib3V0SW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtaW5uZXInKTtcbiAgY29uc3QgJGV4aXRBYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleGl0QWJvdXQnKTtcbiAgY29uc3QgJGNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuICBjb25zdCAkY29udGFjdFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtZm9ybS1hcnJvdycpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvd1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZUZvcm1BcnJvdycpO1xuICBjb25zdCBhcnJvd1BhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNscy1hcnJvdycpO1xuICBjb25zdCBwcmV2QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctYmFjaycpO1xuICBjb25zdCBuZXh0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbmV4dCcpO1xuICBjb25zdCBwcmV2QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldkFycm93Jyk7XG4gIGNvbnN0IG5leHRBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0QXJyb3cnKTtcbiAgY29uc3QgJHdvcmtJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJHdvcmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGV4dCcpO1xuICBjb25zdCAkd29ya1RpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRpdGxlJyk7XG4gIGNvbnN0ICR3b3JrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWJ0bicpO1xuICBjb25zdCAkbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2VMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EubGluaycpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiB7XG5cdFx0XHRpZiAoaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkgPT0gbnVsbCkge1xuXHRcdFx0XHRpbWFnZS5zdHlsZS5jc3NUZXh0ID0gJGRlZmF1bHRJbWc7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAxMDAlJ30seyBkcmF3U1ZHOicwJSAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlckdJRiwgMC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdFx0XHRcdFx0XHQuc2V0KCRsb2FkZXJHSUYsIHtkaXNwbGF5Oidub25lJ30pXG5cdFx0XHRcdFx0XHQudG8oJGxvYWRlclNWRywgMC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pXG5cdCAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0yJylcblx0ICAgICAgICAgIC5mcm9tKCRsb2dvLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG5cdCAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NScpXG5cdCAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTUuNScpXG5cdCAgICAgICAgICAuZnJvbShuZXh0QXJyb3csIDMsIHt4UGVyY2VudDogMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdzdGFydCs9NS41Jylcblx0ICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Jylcblx0ICAgICAgICAgIC5zdGFnZ2VyRnJvbSgkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDoyMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnc3RhcnQrPTYuNScpXG5cdCAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz02Ljc1Jylcblx0ICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjUwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX3RleHQsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTI1fSlcbiAgICAgICAgICAgIDtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgbmV4dEFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIG5leHRBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhuZXh0QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29yaywgLjUsIHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjI1JylcbiAgICAgICAgICAgIC50byhjX3dvcmtfdGV4dCwgMSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuNScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXM7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byhvcGVuSWNvbiwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsZXQgd29ya0J0biA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUZXh0ID0gd29ya1RpdGxlLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSAnb3BlbicpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG4gICAgICAgIGxldCBoaWRlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGhpZGVXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjAsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrTWFpbiwgMC41LCB7ZGlzcGxheTonbm9uZScsIGF1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UrPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJHdvcmtUaXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuICAgICR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cbiAgICBjb25zdCBob3ZlcldvcmtJdGVtID0gKGUpID0+IHtcbiAgICAgIGxldCB3b3JrSXRlbSA9IGUudGFyZ2V0O1xuICAgICAgbGV0IHRleHQgPSBlLnRhcmdldC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHRpdGxlID0gdGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHRpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBob3ZlclN0YXR1cyA9IHdvcmtJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycpO1xuICAgICAgaWYgKGhvdmVyU3RhdHVzID09PSAnbm8nKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICd5ZXMnKTtcbiAgICAgICAgbGV0IGVudGVyV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGVudGVyV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonNTBweCAwJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTAuNScpO1xuICAgICAgfSBlbHNlIGlmIChob3ZlclN0YXR1cyA9PT0gJ3llcycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ25vJyk7XG4gICAgICAgIGxldCBsZWF2ZVdvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBsZWF2ZVdvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzEwcHggMCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgfVxuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGxpbmtTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGxpbmssIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IGxpbmtTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbShjaGFycywgMC4yLCB7c2NhbGU6MCwgeDonLTUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAwLjAzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
