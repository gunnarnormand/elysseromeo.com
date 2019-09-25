"use strict";

var app = function () {
  var $siteurl = ELYSSEROMEO.siteurl;
  var $defaultImg = "/wp-content/themes/blankslate/dist/img/default.png";
  var $loader = document.querySelector('#loader');
  var $loaderSVG = document.querySelector('#loaderSVG');
  var $main = document.querySelector('.main');
  var $header = document.querySelector('header');
  var $nav = document.querySelector('nav');
  var $logo = $header.firstElementChild;
  var $firstSection = $main.firstElementChild;
  var $firstContent = $firstSection.querySelector('.work-content');
  var $firstBgSvg = $firstSection.querySelector('.article-bg');
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
    var loadingTl = new TimelineMax({
      delay: 0,
      smoothChildTiming: true,
      repeat: -1,
      yoyo: true
    });
    loadingTl.set($loaderSVG, {
      autoAlpha: 1
    }).fromTo($loaderSVG, 2, {
      drawSVG: '0% 0%'
    }, {
      drawSVG: '0% 100%',
      ease: Expo.easeInOut
    });
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
          loaderTl.to($loader, 3, {
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeInOut
          }, 'start').from($logo, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=2').from($aboutLink, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=3').from(prevArrow, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeIn
          }, 'start+=3.5').from(nextArrow, 3, {
            xPercent: 100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeIn
          }, 'start+=3.5').from($firstBgSvg, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=3.5').from($firstContent, 3, {
            xPercent: -100,
            autoAlpha: 0,
            force3D: true,
            ease: Expo.easeOut
          }, 'start+=4').staggerFrom($footerLinks, 1, {
            yPercent: 200,
            autoAlpha: 0,
            force3D: true,
            ease: Back.easeOut.config(1.5)
          }, .1, 'start+=4.5').to($firstFooterNavItem, 0.75, {
            width: '100%',
            ease: Expo.easeOut
          }, 'start+=4.75');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJTVkciLCIkbWFpbiIsIiRoZWFkZXIiLCIkbmF2IiwiJGxvZ28iLCJmaXJzdEVsZW1lbnRDaGlsZCIsIiRmaXJzdFNlY3Rpb24iLCIkZmlyc3RDb250ZW50IiwiJGZpcnN0QmdTdmciLCIkYWJvdXRMaW5rIiwiJGFib3V0Q2xvc2UiLCIkYWJvdXRQYWdlIiwiJGFib3V0QmciLCIkYWJvdXRJbm5lciIsIiRleGl0QWJvdXQiLCIkY29udGFjdCIsIiRjb250YWN0UGFnZSIsIiRoaWRlRm9ybUFycm93IiwiJGhpZGVGb3JtQXJyb3dQYXRoIiwiYXJyb3dQYXRocyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3dTdmciLCJuZXh0QXJyb3dTdmciLCIkd29ya0l0ZW1zIiwiJHdvcmtUZXh0IiwiJHdvcmtUaXRsZXMiLCIkd29ya0J0bnMiLCIkbGlua3MiLCIkYWJvdXRQYWdlTGlua3MiLCJsb2FkZXJNb2R1bGUiLCIkZm9vdGVyTmF2IiwiJGZvb3RlckxpbmtzIiwiY2hpbGRyZW4iLCIkZmlyc3RGb290ZXJOYXZJdGVtIiwibG9hZGluZ1RsIiwiVGltZWxpbmVNYXgiLCJkZWxheSIsInNtb290aENoaWxkVGltaW5nIiwicmVwZWF0IiwieW95byIsInNldCIsImF1dG9BbHBoYSIsImZyb21UbyIsImRyYXdTVkciLCJlYXNlIiwiRXhwbyIsImVhc2VJbk91dCIsInJlZ2V4IiwiJGltYWdlcyIsImltZ1NyY3MiLCJmb3JFYWNoIiwiaW1hZ2UiLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsInB1c2giLCJsb2FkZXJUbCIsImxvYWRlZEltYWdlcyIsImkiLCJsZW5ndGgiLCJ0bXAiLCJJbWFnZSIsInNyYyIsImFkZEV2ZW50TGlzdGVuZXIiLCJ0byIsImZvcmNlM0QiLCJmcm9tIiwieFBlcmNlbnQiLCJlYXNlT3V0IiwiZWFzZUluIiwic3RhZ2dlckZyb20iLCJ5UGVyY2VudCIsIkJhY2siLCJjb25maWciLCJ3aWR0aCIsImZvcm1Nb2R1bGUiLCJ3aW5kb3ciLCJpbm5lcldpZHRoIiwic3VibWl0Q29udGFpbmVyIiwic3VibWl0QnRuIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwic3VibWl0UGF0aCIsIlR3ZWVuTWF4Iiwic3VibWl0VGwiLCJmaWxsIiwiaW5pdCIsIm9uZVBhZ2VTY3JvbGwiLCJzZWN0aW9uQ29udGFpbmVyIiwiZWFzaW5nIiwiYW5pbWF0aW9uVGltZSIsInBhZ2luYXRpb24iLCJ1cGRhdGVVUkwiLCJiZWZvcmVNb3ZlIiwiaW5kZXgiLCJjdXJyZW50U2VjdGlvbiIsImNfYmdfMSIsImNfYmdfMiIsImNfYXJ0aWNsZSIsImNfd29ya19pbWciLCJjX3N2ZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJjX3dvcmsiLCJjX3dvcmtfdGV4dCIsImNfaW5kZXgiLCJhbGxQcm9ncmVzc0JhcnMiLCJiYXIiLCJiZWZvcmVNb3ZlVGwiLCJzY2FsZSIsImFmdGVyTW92ZSIsInByZXZBcnJvd0luVGwiLCJuZXh0QXJyb3dJblRsIiwiY3VycmVudExpbmsiLCJjdXJyZW50UHJvZ3Jlc3NCYXIiLCJwcmV2aW91c1NpYmxpbmciLCJhZnRlck1vdmVUbCIsImFmdGVyTW92ZVNwbGl0VGV4dCIsIlNwbGl0VGV4dCIsInR5cGUiLCJjaGFycyIsImxvb3AiLCJrZXlib2FyZCIsInJlc3BvbnNpdmVGYWxsYmFjayIsIiRwYWdpbmF0aW9uTGlzIiwiJHBhZ2luYXRpb25MaW5rcyIsIiR3b3JrSW5kaWNlcyIsIiR0b3RhbFByb2dyZXNzIiwib3BlbldvcmtUZXh0IiwiZSIsInByZXZlbnREZWZhdWx0Iiwid29ya1RleHQiLCJwYXJlbnRFbGVtZW50Iiwid29ya1RpdGxlIiwib3Blbkljb24iLCJ3b3JrTWFpbiIsImRpc3BsYXkiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJleHBhbmRXb3JrVGV4dFRsIiwiaGVpZ2h0Iiwicm90YXRpb24iLCJjbG9zZVdvcmtUZXh0Iiwic3RvcFByb3BhZ2F0aW9uIiwid29ya0J0biIsImhpZGVXb3JrVGV4dFRsIiwidGl0bGUiLCJidXR0b24iLCJob3ZlcldvcmtJdGVtIiwid29ya0l0ZW0iLCJ0YXJnZXQiLCJ0ZXh0Iiwib3Blbkljb25TdmciLCJvcGVuSWNvblBhdGgiLCJob3ZlclN0YXR1cyIsImVudGVyV29ya0l0ZW1UbCIsImJhY2tncm91bmRDb2xvciIsInBhZGRpbmciLCJsZWF2ZVdvcmtJdGVtVGwiLCJpdGVtIiwibW92ZVVwIiwicHJldkFycm93T3V0VGwiLCJ4IiwibW92ZURvd24iLCJuZXh0QXJyb3dPdXRUbCIsInBhdGgiLCJhcnJvd01vdXNlRW50ZXJUbCIsImFycm93TW91c2VMZWF2ZVRsIiwicmVzZXRQcm9ncmVzcyIsImNQcm9ncmVzcyIsIm5leHRFbGVtZW50U2libGluZyIsInRQcm9ncmVzcyIsImxpbmsiLCJsaW5rcyIsInBlcmNlbnRQZXJMaW5rIiwiaW5uZXJIVE1MIiwiY3VycmVudExpIiwidGFyZ2V0TGVuZ3RoIiwiYWN0aXZlSW5kZXgiLCJjdXJyZW50TGVuZ3RoIiwibGkiLCJyZW1vdmVBdHRyaWJ1dGUiLCJpbmRpY2VzIiwic2VjdGlvbiIsInRvZ2dsZVN0YXRlIiwiZWxlbSIsImF0dHIiLCJhIiwiYiIsImN1cnJlbnRFbGVtZW50Iiwic2hvd0Zvcm1UbCIsImhpZGVGb3JtVGwiLCJsaW5rU3BsaXRUZXh0IiwiYWJvdXRUbCIsInN0YWdnZXJUbyIsImJhY2tUbDEiLCJiYWNrVGwiLCJhYm91dENsb3NlSG92ZXJUbCIsImhpZ2hsaWdodExpbmsiLCIkaGlnaGxpZ2h0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsImFwcGVuZCIsImhpZ2hsaWdoTGlua1RsIiwidW5oaWdobGlnaHRMaW5rIiwiaGlnaGxpZ2h0IiwicmVtb3ZlIiwi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LEdBQUcsQ0FBQytGLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwcCA9IChmdW5jdGlvbiAoKSB7XG5cblx0Y29uc3QgJHNpdGV1cmwgPSBFTFlTU0VST01FTy5zaXRldXJsO1xuXHRjb25zdCAkZGVmYXVsdEltZyA9IGAvd3AtY29udGVudC90aGVtZXMvYmxhbmtzbGF0ZS9kaXN0L2ltZy9kZWZhdWx0LnBuZ2A7XG4gIGNvbnN0ICRsb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyJyk7XG4gIGNvbnN0ICRsb2FkZXJTVkcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbG9hZGVyU1ZHJyk7XG4gIGNvbnN0ICRtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4nKTtcbiAgY29uc3QgJGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2hlYWRlcicpO1xuICBjb25zdCAkbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2Jyk7XG4gIGNvbnN0ICRsb2dvID0gJGhlYWRlci5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0U2VjdGlvbiA9ICRtYWluLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RDb250ZW50ID0gJGZpcnN0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICRmaXJzdEJnU3ZnID0gJGZpcnN0U2VjdGlvbi5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZS1iZycpO1xuICBjb25zdCAkYWJvdXRMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0Jyk7XG4gIGNvbnN0ICRhYm91dENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19jbG9zZScpO1xuICBjb25zdCAkYWJvdXRQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0X19wYWdlJyk7XG4gIGNvbnN0ICRhYm91dEJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Fib3V0LWJnJyk7XG4gIGNvbnN0ICRhYm91dElubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFib3V0LWlubmVyJyk7XG4gIGNvbnN0ICRleGl0QWJvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZXhpdEFib3V0Jyk7XG4gIGNvbnN0ICRjb250YWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QnKTtcbiAgY29uc3QgJGNvbnRhY3RQYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRhY3QtZm9ybScpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oaWRlLWZvcm0tYXJyb3cnKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3dQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGVGb3JtQXJyb3cnKTtcbiAgY29uc3QgYXJyb3dQYXRocyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbHMtYXJyb3cnKTtcbiAgY29uc3QgcHJldkFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LWJhY2snKTtcbiAgY29uc3QgbmV4dEFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFycm93LW5leHQnKTtcbiAgY29uc3QgcHJldkFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByZXZBcnJvdycpO1xuICBjb25zdCBuZXh0QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV4dEFycm93Jyk7XG4gIGNvbnN0ICR3b3JrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gIGNvbnN0ICR3b3JrVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRleHQnKTtcbiAgY29uc3QgJHdvcmtUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10aXRsZScpO1xuICBjb25zdCAkd29ya0J0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1idG4nKTtcbiAgY29uc3QgJGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYScpO1xuICBjb25zdCAkYWJvdXRQYWdlTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhLmxpbmsnKTtcblxuICBjb25zdCBsb2FkZXJNb2R1bGUgPSAoKSA9PiB7XG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRmaXJzdEZvb3Rlck5hdkl0ZW0gPSAkZm9vdGVyTmF2LmZpcnN0RWxlbWVudENoaWxkLmZpcnN0RWxlbWVudENoaWxkO1xuXG4gICAgY29uc3QgbG9hZGluZ1RsID0gbmV3IFRpbWVsaW5lTWF4KHtcbiAgICAgIGRlbGF5OiAwLFxuICAgICAgc21vb3RoQ2hpbGRUaW1pbmc6IHRydWUsXG4gICAgICByZXBlYXQ6IC0xLFxuICAgICAgeW95bzogdHJ1ZSxcbiAgICB9KTtcbiAgICBsb2FkaW5nVGxcbiAgICAgIC5zZXQoJGxvYWRlclNWRywge2F1dG9BbHBoYToxfSlcbiAgICAgIC5mcm9tVG8oJGxvYWRlclNWRywgMiwge2RyYXdTVkc6JzAlIDAlJ30seyBkcmF3U1ZHOicwJSAxMDAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICBjb25zdCByZWdleCA9IC8oXFwvd3AtY29udGVudCkoWy98LnxcXHd8XFxzfC1dKSpcXC4oPzpqcGd8Z2lmfHBuZykvZztcbiAgICBjb25zdCAkaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICAgIGxldCBpbWdTcmNzID0gW107XG4gICAgJGltYWdlcy5mb3JFYWNoKGltYWdlID0+IHtcblx0XHRcdGlmIChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSA9PSBudWxsKSB7XG5cdFx0XHRcdGltYWdlLnN0eWxlLmNzc1RleHQgPSAkZGVmYXVsdEltZztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGltZ1NyY3MucHVzaChpbWFnZS5zdHlsZS5jc3NUZXh0Lm1hdGNoKHJlZ2V4KSk7XG5cdFx0XHR9XG5cdFx0fSk7XG4gICAgY29uc3QgbG9hZGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDJcbiAgICB9KTtcbiAgICBsZXQgbG9hZGVkSW1hZ2VzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGltZ1NyY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCB0bXAgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIHRtcC5zcmMgPSBpbWdTcmNzW2ldWzBdO1xuICAgICAgdG1wLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIGxvYWRlZEltYWdlcysrO1xuICAgICAgICBpZiAobG9hZGVkSW1hZ2VzID09PSBpbWdTcmNzLmxlbmd0aCkge1xuICAgICAgICAgIGxvYWRlclRsXG4gICAgICAgICAgLnRvKCRsb2FkZXIsIDMsIHthdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdzdGFydCcpXG4gICAgICAgICAgLmZyb20oJGxvZ28sIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0yJylcbiAgICAgICAgICAuZnJvbSgkYWJvdXRMaW5rLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9MycpXG4gICAgICAgICAgLmZyb20ocHJldkFycm93LCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz0zLjUnKVxuICAgICAgICAgIC5mcm9tKG5leHRBcnJvdywgMywge3hQZXJjZW50OiAxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0Kz0zLjUnKVxuICAgICAgICAgIC5mcm9tKCRmaXJzdEJnU3ZnLCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9My41JylcbiAgICAgICAgICAuZnJvbSgkZmlyc3RDb250ZW50LCAzLCB7eFBlcmNlbnQ6IC0xMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCs9NCcpXG4gICAgICAgICAgLnN0YWdnZXJGcm9tKCRmb290ZXJMaW5rcywgMSwge3lQZXJjZW50OjIwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjUpfSwgLjEsICdzdGFydCs9NC41JylcbiAgICAgICAgICAudG8oJGZpcnN0Rm9vdGVyTmF2SXRlbSwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00Ljc1JylcbiAgICAgICAgICA7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGZvcm1Nb2R1bGUgPSAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJykpIHtcbiAgICAgICAgY29uc3Qgc3VibWl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwZm9ybXMtc3VibWl0LWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQnKTtcbiAgICAgICAgc3VibWl0Q29udGFpbmVyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxcbiAgICAgICAgYDxzdmcgaWQ9XCJzdWJtaXQtYnRuXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgOTYuNTQgMzIuNDlcIj5cbiAgICAgICAgICA8cGF0aCBjbGFzcz1cImNscy1zdWJtaXRcIiBkPVwiTS4yOCwyLjE3YzEwLjg0LDE1LjIsMjMuNTgsMjcsNDIuNzMsMjkuN0M2MS42LDM0LjUsNzkuOCwyOC41Miw5NS44MywxOS40NGMxLS41OCwxLTIuNTQtLjM2LTIuNzRhNTIuMTMsNTIuMTMsMCwwLDAtMTQuMDYtLjMzLDEuNSwxLjUsMCwwLDAsMCwzLDM1LjUyLDM1LjUyLDAsMCwxLDExLjcsMy4xbC0uMzEtMi4zNWE4Ny4xOSw4Ny4xOSwwLDAsMS05LjI0LDkuNzhjLTEuNDQsMS4zLjY5LDMuNDIsMi4xMiwyLjEyYTg3LjE5LDg3LjE5LDAsMCwwLDkuMjQtOS43OCwxLjUyLDEuNTIsMCwwLDAtLjMtMi4zNiwzOS44NSwzOS44NSwwLDAsMC0xMy4yMS0zLjUxdjNhNDkuMTUsNDkuMTUsMCwwLDEsMTMuMjcuMjJsLS4zNi0yLjc0Qzc5LjE5LDI1LjQyLDYyLDMxLjI2LDQ0LjQ0LDI5LjA1LDI1Ljc4LDI2LjcsMTMuMzksMTUuNDIsMi44Ny42NiwxLjc1LS45LS44NS42LjI4LDIuMTdaXCIvPlxuICAgICAgICA8L3N2Zz5gKTtcblxuICAgICAgICBjb25zdCBzdWJtaXRQYXRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNscy1zdWJtaXQnKTtcbiAgICAgICAgVHdlZW5NYXguc2V0KHN1Ym1pdFBhdGgsIHtkcmF3U1ZHOicwJSd9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2ZpbGw6ICcjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0wLjUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgIGxldCBzdWJtaXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgc3VibWl0VGxcbiAgICAgICAgICAgICAgLnRvKHN1Ym1pdFBhdGgsIDIsIHtkcmF3U1ZHOicwJScsIGZpbGw6ICdub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG5cbiAgICBvbmVQYWdlU2Nyb2xsKFwiLm1haW5cIiwge1xuICAgICAgc2VjdGlvbkNvbnRhaW5lcjogXCJzZWN0aW9uXCIsXG4gICAgICBlYXNpbmc6IFwiY3ViaWMtYmV6aWVyKDAuNTAsIDAsIDAuNTAsIDEpXCIsXG4gICAgICBhbmltYXRpb25UaW1lOiA3NTAsXG4gICAgICBwYWdpbmF0aW9uOiB0cnVlLFxuICAgICAgdXBkYXRlVVJMOiBmYWxzZSxcbiAgICAgIGJlZm9yZU1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgY19iZ18xID0gY3VycmVudFNlY3Rpb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMSk7XG4gICAgICAgIGxldCBjX2JnXzIgPSBjX2JnXzEuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYmdfMik7XG4gICAgICAgIGxldCBjX2FydGljbGUgPSBjX2JnXzIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfYXJ0aWNsZSk7XG4gICAgICAgIGxldCBjX3dvcmtfaW1nID0gY19hcnRpY2xlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfaW1nKTtcbiAgICAgICAgbGV0IGNfc3ZnID0gY19hcnRpY2xlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfc3ZnKTtcbiAgICAgICAgbGV0IGNfd29yayA9IGNfd29ya19pbWcubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrKTtcbiAgICAgICAgbGV0IGNfd29ya190ZXh0ID0gY193b3JrLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmtfdGV4dCk7XG4gICAgICAgIGxldCBjX2luZGV4ID0gY193b3JrX2ltZy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19pbmRleCk7XG4gICAgICAgIGxldCBhbGxQcm9ncmVzc0JhcnMgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wYWdpbmF0aW9uLXByb2dyZXNzJyk7XG4gICAgICAgIGFsbFByb2dyZXNzQmFycy5mb3JFYWNoKGJhciA9PiB7XG4gICAgICAgICAgVHdlZW5NYXgudG8oYmFyLCAxLCB7d2lkdGg6JzAlJywgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJlZm9yZU1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGJlZm9yZU1vdmVUbFxuICAgICAgICAgICAgLnNldChjX2JnXzEsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfYmdfMiwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19hcnRpY2xlLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX3N2Zywge3hQZXJjZW50Oi0yMDB9KVxuICAgICAgICAgICAgLnNldChjX3dvcmtfaW1nLCB7c2NhbGU6Ljc1LCBhdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29yaywge2F1dG9BbHBoYTowLCB5UGVyY2VudDo1MH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya190ZXh0LCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0yNX0pXG4gICAgICAgICAgICA7XG5cbiAgICAgIH0sXG4gICAgICBhZnRlck1vdmU6IGZ1bmN0aW9uKGluZGV4LCBjdXJyZW50U2VjdGlvbikge1xuICAgICAgICBsZXQgcHJldkFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIHByZXZBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhwcmV2QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IG5leHRBcnJvd0luVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBuZXh0QXJyb3dJblRsXG4gICAgICAgICAgICAudG8obmV4dEFycm93U3ZnLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0pO1xuXG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gJGZvb3Rlck5hdi5xdWVyeVNlbGVjdG9yKGBhW2RhdGEtaW5kZXg9XCIke2luZGV4fVwiXWApO1xuICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpbmsucHJldmlvdXNTaWJsaW5nO1xuXG4gICAgICAgIGxldCBhZnRlck1vdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBsZXQgYWZ0ZXJNb3ZlU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChjX2luZGV4LCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgIGxldCBjaGFycyA9IGFmdGVyTW92ZVNwbGl0VGV4dC5jaGFycztcbiAgICAgICAgICBhZnRlck1vdmVUbFxuICAgICAgICAgICAgLnRvKGNfYmdfMSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZScpXG4gICAgICAgICAgICAudG8oY19iZ18yLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKVxuICAgICAgICAgICAgLnRvKGNfYXJ0aWNsZSwgMSwge3hQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjUnKVxuICAgICAgICAgICAgLnRvKGNfc3ZnLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmtfaW1nLCAxLjUsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xJylcbiAgICAgICAgICAgIC50byhjX3dvcmssIC41LCB7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9MS4yNScpXG4gICAgICAgICAgICAudG8oY193b3JrX3RleHQsIDEsIHtzY2FsZToxLCBhdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjUnKVxuICAgICAgICAgICAgLnN0YWdnZXJGcm9tKGNoYXJzLCAxLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50Oi0xMDAsIGVhc2U6IEV4cG8uZWFzZU91dH0sIDAuMjUsICdiZWZvcmUrPTEuNzUnKVxuICAgICAgICAgICAgLnRvKGN1cnJlbnRQcm9ncmVzc0JhciwgMC43NSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2JlZm9yZSs9LjI1Jyk7XG4gICAgICB9LFxuICAgICAgbG9vcDogdHJ1ZSxcbiAgICAgIGtleWJvYXJkOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZUZhbGxiYWNrOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5vbmVwYWdlLXBhZ2luYXRpb24gbGknKTtcbiAgICBjb25zdCAkcGFnaW5hdGlvbkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaSBhJyk7XG4gICAgY29uc3QgJHdvcmtJbmRpY2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstaW5kZXgnKTtcbiAgICBjb25zdCAkdG90YWxQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3RhbC1wcm9ncmVzcycpO1xuXG4gICAgZnVuY3Rpb24gb3BlbldvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGl0bGUgPSB0aGlzO1xuICAgICAgbGV0IG9wZW5JY29uID0gd29ya1RpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8ob3Blbkljb24sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VXb3JrVGV4dChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgbGV0IHdvcmtCdG4gPSB0aGlzO1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXMucGFyZW50RWxlbWVudDtcbiAgICAgIGxldCB3b3JrVGV4dCA9IHdvcmtUaXRsZS5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtNYWluID0gd29ya1RleHQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBkaXNwbGF5ID0gd29ya1RleHQuZ2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknKTtcbiAgICAgIGlmIChkaXNwbGF5ID09PSAnY2xvc2VkJykge1xuICAgICAgICB3b3JrVGV4dC5zZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScsICdvcGVuJyk7XG4gICAgICAgIGxldCBleHBhbmRXb3JrVGV4dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgZXhwYW5kV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjo0NSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ29wZW4nKVxuICAgICAgICAgICAgLmZyb21Ubyh3b3JrTWFpbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlfSx7ZGlzcGxheTonYmxvY2snLCB5UGVyY2VudDowLCBhdXRvQWxwaGE6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3Blbis9MC41JylcbiAgICAgICAgICAgIDtcbiAgICAgIH0gZWxzZSBpZiAoZGlzcGxheSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ2Nsb3NlZCcpO1xuICAgICAgICBsZXQgaGlkZVdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBoaWRlV29ya1RleHRUbFxuICAgICAgICAgICAgLnRvKHdvcmtCdG4sIDEsIHtyb3RhdGlvbjowLCBlYXNlOiBFeHBvLmVhc2VJbn0sICdjbG9zZScpXG4gICAgICAgICAgICAudG8od29ya01haW4sIDAuNSwge2Rpc3BsYXk6J25vbmUnLCBhdXRvQWxwaGE6MCwgeVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonYXV0bycsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfVxuICAgIH1cblxuICAgICR3b3JrVGl0bGVzLmZvckVhY2godGl0bGUgPT4gdGl0bGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuV29ya1RleHQpKTtcbiAgICAkd29ya0J0bnMuZm9yRWFjaChidXR0b24gPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VXb3JrVGV4dCkpO1xuXG4gICAgY29uc3QgaG92ZXJXb3JrSXRlbSA9IChlKSA9PiB7XG4gICAgICBsZXQgd29ya0l0ZW0gPSBlLnRhcmdldDtcbiAgICAgIGxldCB0ZXh0ID0gZS50YXJnZXQubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB0aXRsZSA9IHRleHQuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb24gPSB0aXRsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IG9wZW5JY29uU3ZnID0gb3Blbkljb24uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25QYXRoID0gb3Blbkljb25TdmcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgaG92ZXJTdGF0dXMgPSB3b3JrSXRlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnKTtcbiAgICAgIGlmIChob3ZlclN0YXR1cyA9PT0gJ25vJykge1xuICAgICAgICB3b3JrSXRlbS5zZXRBdHRyaWJ1dGUoJ2RhdGEtaG92ZXJpbmcnLCAneWVzJyk7XG4gICAgICAgIGxldCBlbnRlcldvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBlbnRlcldvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOidyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzUwcHggMCcsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb24sIDAuNSwge3lQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlfSx7YXV0b0FscGhhOjEsIHlQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5mcm9tVG8ob3Blbkljb25QYXRoLCAxLCB7ZmlsbDogJ25vbmUnfSx7ZmlsbDonIzA4MTEyMScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0Kz0wLjUnKTtcbiAgICAgIH0gZWxzZSBpZiAoaG92ZXJTdGF0dXMgPT09ICd5ZXMnKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICdubycpO1xuICAgICAgICBsZXQgbGVhdmVXb3JrSXRlbVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgbGVhdmVXb3JrSXRlbVRsXG4gICAgICAgICAgICAudG8odGV4dCwgMSwge2JhY2tncm91bmRDb2xvcjonI2ZmZicsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8odGl0bGUsIDEsIHtwYWRkaW5nOicxMHB4IDAnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKG9wZW5JY29uUGF0aCwgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgICAgJHdvcmtJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgaG92ZXJXb3JrSXRlbSkpO1xuICAgIH1cblxuICAgIHByZXZBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlVXAoJy5tYWluJyk7XG4gICAgICBjb25zdCBwcmV2QXJyb3dPdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBwcmV2QXJyb3dPdXRUbC5mcm9tVG8ocHJldkFycm93LCAuNSwge3g6LTEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc3AnKVxuICAgICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgICAgICAgcHJldkFycm93T3V0VGwudG8ocHJldkFycm93U3ZnLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3NwKz0uNScpO1xuICAgICAgICAgIH1cbiAgICB9KTtcbiAgICBuZXh0QXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtb3ZlRG93bignLm1haW4nKTtcbiAgICAgIGNvbnN0IG5leHRBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIG5leHRBcnJvd091dFRsLmZyb21UbyhuZXh0QXJyb3csIC41LCB7eDoxMH0se3g6MCwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgJ3NuJyk7XG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBuZXh0QXJyb3dPdXRUbC50byhuZXh0QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc24rPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICBhcnJvd1BhdGhzLmZvckVhY2gocGF0aCA9PiB7XG4gICAgICAgICAgcGF0aC5wYXJlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICBsZXQgYXJyb3dNb3VzZUVudGVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgICAgYXJyb3dNb3VzZUVudGVyVGxcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge3NjYWxlOjAuOTUsIGZpbGw6JyMwODExMjEnLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtkcmF3U1ZHOic3MyUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlTGVhdmVUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlTGVhdmVUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MSwgZmlsbDonbm9uZScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnZW4nKTtcbiAgICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwidG90YWwtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAkZm9vdGVyTmF2Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJlbmQnLCBgPGRpdiBjbGFzcz1cImN1cnJlbnQtcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcblxuICAgIGZ1bmN0aW9uIHJlc2V0UHJvZ3Jlc3MoZSkge1xuICAgICAgbGV0IGNQcm9ncmVzcyA9IHRoaXMubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgbGV0IHRQcm9ncmVzcyA9IGNQcm9ncmVzcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDEsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgVHdlZW5NYXgudG8odFByb2dyZXNzLCAyLCB7d2lkdGg6MCwgZWFzZTogRXhwby5lYXNlSW5PdXR9KTtcbiAgICB9XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRmb290ZXJOYXYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHJlc2V0UHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgICRwYWdpbmF0aW9uTGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxldCBsaW5rcyA9ICRwYWdpbmF0aW9uTGlua3MubGVuZ3RoO1xuICAgICAgbGV0IHBlcmNlbnRQZXJMaW5rID0gMTAwIC8gbGlua3M7XG4gICAgICBpZiAobGlua3MgPCAxMCkge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGxpbmtzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGxpbmsuaW5uZXJIVE1MID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGxpbmtzO1xuICAgICAgfVxuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaW5rID0gZS50YXJnZXQ7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMaSA9IGN1cnJlbnRMaW5rLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGluZGV4ID0gY3VycmVudExpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQcm9ncmVzc0JhciA9IGN1cnJlbnRMaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBsZXQgcGFnaW5hdGlvbiA9IGN1cnJlbnRMaS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgIGxldCBjUHJvZ3Jlc3MgPSBwYWdpbmF0aW9uLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICBsZXQgdGFyZ2V0TGVuZ3RoID0gYCR7cGVyY2VudFBlckxpbmsqaW5kZXh9JWA7XG4gICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gcGFnaW5hdGlvbi5xdWVyeVNlbGVjdG9yKCcuYWN0aXZlJykuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICAgICAgbGV0IGN1cnJlbnRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayphY3RpdmVJbmRleH0lYDtcblxuICAgICAgICAgIGlmIChpbmRleCA8IGFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICBUd2Vlbk1heC50byhjUHJvZ3Jlc3MsIDIsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke2N1cnJlbnRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDEsIHt3aWR0aDpgJHt0YXJnZXRMZW5ndGh9YCwgZWFzZTogRXhwby5lYXNlT3V0fSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRwYWdpbmF0aW9uTGlzLmZvckVhY2gobGkgPT4ge1xuICAgICAgbGV0IGxpbmsgPSBsaS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBpbmRleCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4Jyk7XG4gICAgICBsaS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBgPGRpdiBjbGFzcz1cInBhZ2luYXRpb24tcHJvZ3Jlc3NcIj48L2Rpdj5gKTtcbiAgICAgIGxpbmsucmVtb3ZlQXR0cmlidXRlKCdocmVmJyk7XG4gICAgfSk7XG5cbiAgICAkd29ya0luZGljZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBsZXQgaW5kaWNlcyA9ICR3b3JrSW5kaWNlcy5sZW5ndGg7XG4gICAgICBsZXQgc2VjdGlvbiA9IGluZGV4LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcbiAgICAgIGlmIChpbmRpY2VzIDwgMTApIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvMCcgKyBpbmRpY2VzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXguaW5uZXJIVE1MID0gc2VjdGlvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKSArICcvJyArIGluZGljZXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB0b2dnbGVTdGF0ZSA9IChlbGVtLCBhdHRyLCBhLCBiKSA9PiB7XG4gICAgICBsZXQgY3VycmVudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2VsZW19YCk7XG4gICAgICAgY3VycmVudEVsZW1lbnQuc2V0QXR0cmlidXRlKGAke2F0dHJ9YCwgY3VycmVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKGAke2F0dHJ9YCkgPT09IGEgPyBiIDogYSk7XG4gICAgfVxuXG4gICAgJGNvbnRhY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHNob3dGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIHNob3dGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYTowLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmJylcbiAgICAgICAgLmZyb21UbygkY29udGFjdFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS4yNScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3csIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6NjUsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNDUnKVxuICAgICAgICAuZnJvbVRvKCRoaWRlRm9ybUFycm93UGF0aCwgMiwge2RyYXdTVkc6JzAlJ30se2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXJmKz0uNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgICRoaWRlRm9ybUFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBoaWRlRm9ybVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBoaWRlRm9ybVRsXG4gICAgICAgIC50bygkYWJvdXRMaW5rLCAuMjUsIHthdXRvQWxwaGE6MSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlZicpXG4gICAgICAgIC50bygkaGlkZUZvcm1BcnJvd1BhdGgsIC4yNSwge2ZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRjb250YWN0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlZis9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dElubmVyLCAxLCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICRhYm91dFBhZ2VMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGxpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICAgIGxldCBsaW5rU3BsaXRUZXh0ID0gbmV3IFNwbGl0VGV4dChsaW5rLCB7dHlwZTond29yZHMsY2hhcnMnfSk7XG4gICAgICAgICAgICBsZXQgY2hhcnMgPSBsaW5rU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgICAgVHdlZW5NYXguc3RhZ2dlckZyb20oY2hhcnMsIDAuMiwge3NjYWxlOjAsIHg6Jy01JywgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSwgMC4wMyk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGFib3V0TGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoJGFib3V0UGFnZS5nZXRBdHRyaWJ1dGUoJ21lbnUtc3RhdHVzJykgPT09ICdvcGVuJykge1xuICAgICAgICBsZXQgYWJvdXRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBhYm91dFRsXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDIsIHt5UGVyY2VudDoyMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgLjA4LCAnZW50ZXInKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAyLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dFBhZ2UsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRCZywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4xNScpXG4gICAgICAgICAgLmZyb21UbygkYWJvdXRJbm5lciwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotNTAsIGZvcmNlM0Q6dHJ1ZX0sIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPS4yNScpXG4gICAgICAgICAgLmZyb21UbygkZXhpdEFib3V0LCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9MS4yNScpXG4gICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgbGV0IGJhY2tUbDEgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgYmFja1RsMVxuICAgICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZScpXG4gICAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41JylcbiAgICAgICAgO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgdG9nZ2xlU3RhdGUoJy5hYm91dF9fcGFnZScsICdtZW51LXN0YXR1cycsICdjbG9zZWQnLCAnb3BlbicpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGJhY2tUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgYmFja1RsXG4gICAgICAgIC5zdGFnZ2VyVG8oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGV4aXRBYm91dCwgLjI1LCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgLnRvKCRhYm91dEJnLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50OjEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgLnRvKCRhYm91dFBhZ2UsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGZvb3Rlck5hdiwgMSwge2JhY2tncm91bmRDb2xvcjondHJhbnNwYXJlbnQnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOicjMDgxMTIxJywgc2NhbGU6MC45NSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgICRhYm91dENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFib3V0Q2xvc2VIb3ZlclRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYWJvdXRDbG9zZUhvdmVyVGxcbiAgICAgICAgICAgIC50bygkZXhpdEFib3V0LCAxLCB7ZmlsbDonbm9uZScsIHNjYWxlOjEsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogQmFjay5lYXNlT3V0LmNvbmZpZygxLjcpfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoaWdobGlnaHRMaW5rKGUpIHtcbiAgICAgIGxldCAkaGlnaGxpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgJGhpZ2hsaWdodC5jbGFzc0xpc3QuYWRkKCdsaW5rLWhpZ2hsaWdodCcpO1xuICAgICAgdGhpcy5hcHBlbmQoJGhpZ2hsaWdodCk7XG4gICAgICBsZXQgaGlnaGxpZ2hMaW5rVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgaGlnaGxpZ2hMaW5rVGxcbiAgICAgICAgICAudG8oJGhpZ2hsaWdodCwgMSwge3dpZHRoOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSlcbiAgICAgICAgICA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5oaWdobGlnaHRMaW5rKGUpIHtcbiAgICAgIGxldCBoaWdobGlnaHQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5saW5rLWhpZ2hsaWdodCcpO1xuICAgICAgaGlnaGxpZ2h0LnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGxpbmtzLmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBoaWdobGlnaHRMaW5rKSk7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHVuaGlnaGxpZ2h0TGluaykpO1xuICAgIH1cblxuICAgIGxvYWRlck1vZHVsZSgpO1xuICAgIGZvcm1Nb2R1bGUoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdDogaW5pdFxuICB9XG59KSgpO1xuXG53aW5kb3cub25sb2FkID0gKCkgPT4ge1xuICBhcHAuaW5pdCgpO1xufVxuIl19
