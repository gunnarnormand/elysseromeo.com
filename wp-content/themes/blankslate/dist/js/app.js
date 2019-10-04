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
  var $firstContent = $firstSection.querySelector('.work-content'); // const $firstBgSvg = $firstSection.querySelector('.article-bg');

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
          }, 'start+=3.5') // .from($firstBgSvg, 3, {xPercent: -100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start+=3.5')
          .from($firstContent, 3, {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkc2l0ZXVybCIsIkVMWVNTRVJPTUVPIiwic2l0ZXVybCIsIiRkZWZhdWx0SW1nIiwiJGxvYWRlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIiRsb2FkZXJTVkciLCIkbWFpbiIsIiRoZWFkZXIiLCIkbmF2IiwiJGxvZ28iLCJmaXJzdEVsZW1lbnRDaGlsZCIsIiRmaXJzdFNlY3Rpb24iLCIkZmlyc3RDb250ZW50IiwiJGFib3V0TGluayIsIiRhYm91dENsb3NlIiwiJGFib3V0UGFnZSIsIiRhYm91dEJnIiwiJGFib3V0SW5uZXIiLCIkZXhpdEFib3V0IiwiJGNvbnRhY3QiLCIkY29udGFjdFBhZ2UiLCIkaGlkZUZvcm1BcnJvdyIsIiRoaWRlRm9ybUFycm93UGF0aCIsImFycm93UGF0aHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwicHJldkFycm93IiwibmV4dEFycm93IiwicHJldkFycm93U3ZnIiwibmV4dEFycm93U3ZnIiwiJHdvcmtJdGVtcyIsIiR3b3JrVGV4dCIsIiR3b3JrVGl0bGVzIiwiJHdvcmtCdG5zIiwiJGxpbmtzIiwiJGFib3V0UGFnZUxpbmtzIiwibG9hZGVyTW9kdWxlIiwiJGZvb3Rlck5hdiIsIiRmb290ZXJMaW5rcyIsImNoaWxkcmVuIiwiJGZpcnN0Rm9vdGVyTmF2SXRlbSIsImxvYWRpbmdUbCIsIlRpbWVsaW5lTWF4IiwiZGVsYXkiLCJzbW9vdGhDaGlsZFRpbWluZyIsInJlcGVhdCIsInlveW8iLCJzZXQiLCJhdXRvQWxwaGEiLCJmcm9tVG8iLCJkcmF3U1ZHIiwiZWFzZSIsIkV4cG8iLCJlYXNlSW5PdXQiLCJyZWdleCIsIiRpbWFnZXMiLCJpbWdTcmNzIiwiZm9yRWFjaCIsImltYWdlIiwic3R5bGUiLCJjc3NUZXh0IiwibWF0Y2giLCJwdXNoIiwibG9hZGVyVGwiLCJsb2FkZWRJbWFnZXMiLCJpIiwibGVuZ3RoIiwidG1wIiwiSW1hZ2UiLCJzcmMiLCJhZGRFdmVudExpc3RlbmVyIiwidG8iLCJmb3JjZTNEIiwiZnJvbSIsInhQZXJjZW50IiwiZWFzZU91dCIsImVhc2VJbiIsInN0YWdnZXJGcm9tIiwieVBlcmNlbnQiLCJCYWNrIiwiY29uZmlnIiwid2lkdGgiLCJmb3JtTW9kdWxlIiwid2luZG93IiwiaW5uZXJXaWR0aCIsInN1Ym1pdENvbnRhaW5lciIsInN1Ym1pdEJ0biIsImluc2VydEFkamFjZW50SFRNTCIsInN1Ym1pdFBhdGgiLCJUd2Vlbk1heCIsInN1Ym1pdFRsIiwiZmlsbCIsImluaXQiLCJvbmVQYWdlU2Nyb2xsIiwic2VjdGlvbkNvbnRhaW5lciIsImVhc2luZyIsImFuaW1hdGlvblRpbWUiLCJwYWdpbmF0aW9uIiwidXBkYXRlVVJMIiwiYmVmb3JlTW92ZSIsImluZGV4IiwiY3VycmVudFNlY3Rpb24iLCJjX2JnXzEiLCJjX2JnXzIiLCJjX2FydGljbGUiLCJjX3dvcmtfaW1nIiwiY19zdmciLCJsYXN0RWxlbWVudENoaWxkIiwiY193b3JrIiwiY193b3JrX3RleHQiLCJjX2luZGV4IiwiYWxsUHJvZ3Jlc3NCYXJzIiwiYmFyIiwiYmVmb3JlTW92ZVRsIiwic2NhbGUiLCJhZnRlck1vdmUiLCJwcmV2QXJyb3dJblRsIiwibmV4dEFycm93SW5UbCIsImN1cnJlbnRMaW5rIiwiY3VycmVudFByb2dyZXNzQmFyIiwicHJldmlvdXNTaWJsaW5nIiwiYWZ0ZXJNb3ZlVGwiLCJhZnRlck1vdmVTcGxpdFRleHQiLCJTcGxpdFRleHQiLCJ0eXBlIiwiY2hhcnMiLCJsb29wIiwia2V5Ym9hcmQiLCJyZXNwb25zaXZlRmFsbGJhY2siLCIkcGFnaW5hdGlvbkxpcyIsIiRwYWdpbmF0aW9uTGlua3MiLCIkd29ya0luZGljZXMiLCIkdG90YWxQcm9ncmVzcyIsIm9wZW5Xb3JrVGV4dCIsImUiLCJwcmV2ZW50RGVmYXVsdCIsIndvcmtUZXh0IiwicGFyZW50RWxlbWVudCIsIndvcmtUaXRsZSIsIm9wZW5JY29uIiwid29ya01haW4iLCJkaXNwbGF5IiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiZXhwYW5kV29ya1RleHRUbCIsImhlaWdodCIsInJvdGF0aW9uIiwiY2xvc2VXb3JrVGV4dCIsInN0b3BQcm9wYWdhdGlvbiIsIndvcmtCdG4iLCJoaWRlV29ya1RleHRUbCIsInRpdGxlIiwiYnV0dG9uIiwiaG92ZXJXb3JrSXRlbSIsIndvcmtJdGVtIiwidGFyZ2V0IiwidGV4dCIsIm9wZW5JY29uU3ZnIiwib3Blbkljb25QYXRoIiwiaG92ZXJTdGF0dXMiLCJlbnRlcldvcmtJdGVtVGwiLCJiYWNrZ3JvdW5kQ29sb3IiLCJwYWRkaW5nIiwibGVhdmVXb3JrSXRlbVRsIiwiaXRlbSIsIm1vdmVVcCIsInByZXZBcnJvd091dFRsIiwieCIsIm1vdmVEb3duIiwibmV4dEFycm93T3V0VGwiLCJwYXRoIiwiYXJyb3dNb3VzZUVudGVyVGwiLCJhcnJvd01vdXNlTGVhdmVUbCIsInJlc2V0UHJvZ3Jlc3MiLCJjUHJvZ3Jlc3MiLCJuZXh0RWxlbWVudFNpYmxpbmciLCJ0UHJvZ3Jlc3MiLCJsaW5rIiwibGlua3MiLCJwZXJjZW50UGVyTGluayIsImlubmVySFRNTCIsImN1cnJlbnRMaSIsInRhcmdldExlbmd0aCIsImFjdGl2ZUluZGV4IiwiY3VycmVudExlbmd0aCIsImxpIiwicmVtb3ZlQXR0cmlidXRlIiwiaW5kaWNlcyIsInNlY3Rpb24iLCJ0b2dnbGVTdGF0ZSIsImVsZW0iLCJhdHRyIiwiYSIsImIiLCJjdXJyZW50RWxlbWVudCIsInNob3dGb3JtVGwiLCJoaWRlRm9ybVRsIiwibGlua1NwbGl0VGV4dCIsImFib3V0VGwiLCJzdGFnZ2VyVG8iLCJiYWNrVGwxIiwiYmFja1RsIiwiYWJvdXRDbG9zZUhvdmVyVGwiLCJoaWdobGlnaHRMaW5rIiwiJGhpZ2hsaWdodCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmQiLCJoaWdobGlnaExpbmtUbCIsInVuaGlnaGxpZ2h0TGluayIsImhpZ2hsaWdodCIsInJlbW92ZSIsIm9ubG9hZCJdLCJtYXBw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QUFBQzNILFFBQUFBLEtBQUssRUFBQyxNQUFQO0FBQWU5QixRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQTFCLE9BRHJCO0FBR0g7O0FBRUQsYUFBU3VJLGVBQVQsQ0FBeUI1RSxDQUF6QixFQUE0QjtBQUMxQixVQUFJNkUsU0FBUyxHQUFHLEtBQUs5TSxhQUFMLENBQW1CLGlCQUFuQixDQUFoQjtBQUNBOE0sTUFBQUEsU0FBUyxDQUFDQyxNQUFWO0FBQ0Q7O0FBRUQsUUFBSWpJLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUMzQmxELE1BQUFBLE1BQU0sQ0FBQ3VCLE9BQVAsQ0FBZSxVQUFBd0gsSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQzNHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DcUksYUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0F6SyxNQUFBQSxNQUFNLENBQUN1QixPQUFQLENBQWUsVUFBQXdILElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUMzRyxnQkFBTCxDQUFzQixZQUF0QixFQUFvQzRJLGVBQXBDLENBQUo7QUFBQSxPQUFuQjtBQUNEOztBQUVEOUssSUFBQUEsWUFBWTtBQUNaOEMsSUFBQUEsVUFBVTtBQUNYLEdBMVlEOztBQTRZQSxTQUFPO0FBQ0xVLElBQUFBLElBQUksRUFBRUE7QUFERCxHQUFQO0FBR0QsQ0FqZ0JXLEVBQVo7O0FBbWdCQVQsTUFBTSxDQUFDa0ksTUFBUCxHQUFnQixZQUFNO0FBQ3BCdk4sRUFBQUEsR0FBRyxDQUFDOEYsSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuXHRjb25zdCAkc2l0ZXVybCA9IEVMWVNTRVJPTUVPLnNpdGV1cmw7XG5cdGNvbnN0ICRkZWZhdWx0SW1nID0gYC93cC1jb250ZW50L3RoZW1lcy9ibGFua3NsYXRlL2Rpc3QvaW1nL2RlZmF1bHQucG5nYDtcbiAgY29uc3QgJGxvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXInKTtcbiAgY29uc3QgJGxvYWRlclNWRyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2FkZXJTVkcnKTtcbiAgY29uc3QgJG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbicpO1xuICBjb25zdCAkaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZGVyJyk7XG4gIGNvbnN0ICRuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCduYXYnKTtcbiAgY29uc3QgJGxvZ28gPSAkaGVhZGVyLmZpcnN0RWxlbWVudENoaWxkO1xuICBjb25zdCAkZmlyc3RTZWN0aW9uID0gJG1haW4uZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdENvbnRlbnQgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy53b3JrLWNvbnRlbnQnKTtcbiAgLy8gY29uc3QgJGZpcnN0QmdTdmcgPSAkZmlyc3RTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hcnRpY2xlLWJnJyk7XG4gIGNvbnN0ICRhYm91dExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQnKTtcbiAgY29uc3QgJGFib3V0Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX2Nsb3NlJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXRfX3BhZ2UnKTtcbiAgY29uc3QgJGFib3V0QmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYWJvdXQtYmcnKTtcbiAgY29uc3QgJGFib3V0SW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJvdXQtaW5uZXInKTtcbiAgY29uc3QgJGV4aXRBYm91dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleGl0QWJvdXQnKTtcbiAgY29uc3QgJGNvbnRhY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdCcpO1xuICBjb25zdCAkY29udGFjdFBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFjdC1mb3JtJyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtZm9ybS1hcnJvdycpO1xuICBjb25zdCAkaGlkZUZvcm1BcnJvd1BhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZUZvcm1BcnJvdycpO1xuICBjb25zdCBhcnJvd1BhdGhzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNscy1hcnJvdycpO1xuICBjb25zdCBwcmV2QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctYmFjaycpO1xuICBjb25zdCBuZXh0QXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJyb3ctbmV4dCcpO1xuICBjb25zdCBwcmV2QXJyb3dTdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJldkFycm93Jyk7XG4gIGNvbnN0IG5leHRBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXh0QXJyb3cnKTtcbiAgY29uc3QgJHdvcmtJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgY29uc3QgJHdvcmtUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGV4dCcpO1xuICBjb25zdCAkd29ya1RpdGxlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLXRpdGxlJyk7XG4gIGNvbnN0ICR3b3JrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWJ0bicpO1xuICBjb25zdCAkbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gIGNvbnN0ICRhYm91dFBhZ2VMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EubGluaycpO1xuXG4gIGNvbnN0IGxvYWRlck1vZHVsZSA9ICgpID0+IHtcbiAgICBjb25zdCAkZm9vdGVyTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm9uZXBhZ2UtcGFnaW5hdGlvbicpO1xuICAgIGNvbnN0ICRmb290ZXJMaW5rcyA9ICRmb290ZXJOYXYuY2hpbGRyZW47XG4gICAgY29uc3QgJGZpcnN0Rm9vdGVyTmF2SXRlbSA9ICRmb290ZXJOYXYuZmlyc3RFbGVtZW50Q2hpbGQuZmlyc3RFbGVtZW50Q2hpbGQ7XG5cbiAgICBjb25zdCBsb2FkaW5nVGwgPSBuZXcgVGltZWxpbmVNYXgoe1xuICAgICAgZGVsYXk6IDAsXG4gICAgICBzbW9vdGhDaGlsZFRpbWluZzogdHJ1ZSxcbiAgICAgIHJlcGVhdDogLTEsXG4gICAgICB5b3lvOiB0cnVlLFxuICAgIH0pO1xuICAgIGxvYWRpbmdUbFxuICAgICAgLnNldCgkbG9hZGVyU1ZHLCB7YXV0b0FscGhhOjF9KVxuICAgICAgLmZyb21UbygkbG9hZGVyU1ZHLCAyLCB7ZHJhd1NWRzonMCUgMCUnfSx7IGRyYXdTVkc6JzAlIDEwMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIGNvbnN0IHJlZ2V4ID0gLyhcXC93cC1jb250ZW50KShbL3wufFxcd3xcXHN8LV0pKlxcLig/OmpwZ3xnaWZ8cG5nKS9nO1xuICAgIGNvbnN0ICRpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1jb250ZW50Jyk7XG4gICAgbGV0IGltZ1NyY3MgPSBbXTtcbiAgICAkaW1hZ2VzLmZvckVhY2goaW1hZ2UgPT4ge1xuXHRcdFx0aWYgKGltYWdlLnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXgpID09IG51bGwpIHtcblx0XHRcdFx0aW1hZ2Uuc3R5bGUuY3NzVGV4dCA9ICRkZWZhdWx0SW1nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW1nU3Jjcy5wdXNoKGltYWdlLnN0eWxlLmNzc1RleHQubWF0Y2gocmVnZXgpKTtcblx0XHRcdH1cblx0XHR9KTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcbiAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAuZnJvbSgkbG9nbywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTInKVxuICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0zJylcbiAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTMuNScpXG4gICAgICAgICAgLmZyb20obmV4dEFycm93LCAzLCB7eFBlcmNlbnQ6IDEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTMuNScpXG4gICAgICAgICAgLy8gLmZyb20oJGZpcnN0QmdTdmcsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0zLjUnKVxuICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00JylcbiAgICAgICAgICAuc3RhZ2dlckZyb20oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MjAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ3N0YXJ0Kz00LjUnKVxuICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTQuNzUnKVxuICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjUwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX3RleHQsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTI1fSlcbiAgICAgICAgICAgIDtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgbmV4dEFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIG5leHRBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhuZXh0QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29yaywgLjUsIHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjI1JylcbiAgICAgICAgICAgIC50byhjX3dvcmtfdGV4dCwgMSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuNScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXM7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byhvcGVuSWNvbiwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsZXQgd29ya0J0biA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUZXh0ID0gd29ya1RpdGxlLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSAnb3BlbicpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG4gICAgICAgIGxldCBoaWRlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGhpZGVXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjAsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrTWFpbiwgMC41LCB7ZGlzcGxheTonbm9uZScsIGF1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UrPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJHdvcmtUaXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuICAgICR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cbiAgICBjb25zdCBob3ZlcldvcmtJdGVtID0gKGUpID0+IHtcbiAgICAgIGxldCB3b3JrSXRlbSA9IGUudGFyZ2V0O1xuICAgICAgbGV0IHRleHQgPSBlLnRhcmdldC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHRpdGxlID0gdGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHRpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBob3ZlclN0YXR1cyA9IHdvcmtJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycpO1xuICAgICAgaWYgKGhvdmVyU3RhdHVzID09PSAnbm8nKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICd5ZXMnKTtcbiAgICAgICAgbGV0IGVudGVyV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGVudGVyV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonNTBweCAwJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTAuNScpO1xuICAgICAgfSBlbHNlIGlmIChob3ZlclN0YXR1cyA9PT0gJ3llcycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ25vJyk7XG4gICAgICAgIGxldCBsZWF2ZVdvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBsZWF2ZVdvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzEwcHggMCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgfVxuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGxpbmtTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGxpbmssIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IGxpbmtTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbShjaGFycywgMC4yLCB7c2NhbGU6MCwgeDonLTUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAwLjAzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
