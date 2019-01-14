"use strict";

var app = function () {
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
      return imgSrcs.push(image.style.cssText.match(regex));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyJdLCJuYW1lcyI6WyJhcHAiLCIkbG9hZGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJGxvYWRlclNWRyIsIiRtYWluIiwiJGhlYWRlciIsIiRuYXYiLCIkbG9nbyIsImZpcnN0RWxlbWVudENoaWxkIiwiJGZpcnN0U2VjdGlvbiIsIiRmaXJzdENvbnRlbnQiLCIkZmlyc3RCZ1N2ZyIsIiRhYm91dExpbmsiLCIkYWJvdXRDbG9zZSIsIiRhYm91dFBhZ2UiLCIkYWJvdXRCZyIsIiRhYm91dElubmVyIiwiJGV4aXRBYm91dCIsIiRjb250YWN0IiwiJGNvbnRhY3RQYWdlIiwiJGhpZGVGb3JtQXJyb3ciLCIkaGlkZUZvcm1BcnJvd1BhdGgiLCJhcnJvd1BhdGhzIiwicXVlcnlTZWxlY3RvckFsbCIsInByZXZBcnJvdyIsIm5leHRBcnJvdyIsInByZXZBcnJvd1N2ZyIsIm5leHRBcnJvd1N2ZyIsIiR3b3JrSXRlbXMiLCIkd29ya1RleHQiLCIkd29ya1RpdGxlcyIsIiR3b3JrQnRucyIsIiRsaW5rcyIsIiRhYm91dFBhZ2VMaW5rcyIsImxvYWRlck1vZHVsZSIsIiRmb290ZXJOYXYiLCIkZm9vdGVyTGlua3MiLCJjaGlsZHJlbiIsIiRmaXJzdEZvb3Rlck5hdkl0ZW0iLCJsb2FkaW5nVGwiLCJUaW1lbGluZU1heCIsImRlbGF5Iiwic21vb3RoQ2hpbGRUaW1pbmciLCJyZXBlYXQiLCJ5b3lvIiwic2V0IiwiYXV0b0FscGhhIiwiZnJvbVRvIiwiZHJhd1NWRyIsImVhc2UiLCJFeHBvIiwiZWFzZUluT3V0IiwicmVnZXgiLCIkaW1hZ2VzIiwiaW1nU3JjcyIsImZvckVhY2giLCJpbWFnZSIsInB1c2giLCJzdHlsZSIsImNzc1RleHQiLCJtYXRjaCIsImxvYWRlclRsIiwibG9hZGVkSW1hZ2VzIiwiaSIsImxlbmd0aCIsInRtcCIsIkltYWdlIiwic3JjIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvIiwiZm9yY2UzRCIsImZyb20iLCJ4UGVyY2VudCIsImVhc2VPdXQiLCJlYXNlSW4iLCJzdGFnZ2VyRnJvbSIsInlQZXJjZW50IiwiQmFjayIsImNvbmZpZyIsIndpZHRoIiwiZm9ybU1vZHVsZSIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJzdWJtaXRDb250YWluZXIiLCJzdWJtaXRCdG4iLCJpbnNlcnRBZGphY2VudEhUTUwiLCJzdWJtaXRQYXRoIiwiVHdlZW5NYXgiLCJzdWJtaXRUbCIsImZpbGwiLCJpbml0Iiwib25lUGFnZVNjcm9sbCIsInNlY3Rpb25Db250YWluZXIiLCJlYXNpbmciLCJhbmltYXRpb25UaW1lIiwicGFnaW5hdGlvbiIsInVwZGF0ZVVSTCIsImJlZm9yZU1vdmUiLCJpbmRleCIsImN1cnJlbnRTZWN0aW9uIiwiY19iZ18xIiwiY19iZ18yIiwiY19hcnRpY2xlIiwiY193b3JrX2ltZyIsImNfc3ZnIiwibGFzdEVsZW1lbnRDaGlsZCIsImNfd29yayIsImNfd29ya190ZXh0IiwiY19pbmRleCIsImFsbFByb2dyZXNzQmFycyIsImJhciIsImJlZm9yZU1vdmVUbCIsInNjYWxlIiwiYWZ0ZXJNb3ZlIiwicHJldkFycm93SW5UbCIsIm5leHRBcnJvd0luVGwiLCJjdXJyZW50TGluayIsImN1cnJlbnRQcm9ncmVzc0JhciIsInByZXZpb3VzU2libGluZyIsImFmdGVyTW92ZVRsIiwiYWZ0ZXJNb3ZlU3BsaXRUZXh0IiwiU3BsaXRUZXh0IiwidHlwZSIsImNoYXJzIiwibG9vcCIsImtleWJvYXJkIiwicmVzcG9uc2l2ZUZhbGxiYWNrIiwiJHBhZ2luYXRpb25MaXMiLCIkcGFnaW5hdGlvbkxpbmtzIiwiJHdvcmtJbmRpY2VzIiwiJHRvdGFsUHJvZ3Jlc3MiLCJvcGVuV29ya1RleHQiLCJlIiwicHJldmVudERlZmF1bHQiLCJ3b3JrVGV4dCIsInBhcmVudEVsZW1lbnQiLCJ3b3JrVGl0bGUiLCJvcGVuSWNvbiIsIndvcmtNYWluIiwiZGlzcGxheSIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImV4cGFuZFdvcmtUZXh0VGwiLCJoZWlnaHQiLCJyb3RhdGlvbiIsImNsb3NlV29ya1RleHQiLCJzdG9wUHJvcGFnYXRpb24iLCJ3b3JrQnRuIiwiaGlkZVdvcmtUZXh0VGwiLCJ0aXRsZSIsImJ1dHRvbiIsImhvdmVyV29ya0l0ZW0iLCJ3b3JrSXRlbSIsInRhcmdldCIsInRleHQiLCJvcGVuSWNvblN2ZyIsIm9wZW5JY29uUGF0aCIsImhvdmVyU3RhdHVzIiwiZW50ZXJXb3JrSXRlbVRsIiwiYmFja2dyb3VuZENvbG9yIiwicGFkZGluZyIsImxlYXZlV29ya0l0ZW1UbCIsIml0ZW0iLCJtb3ZlVXAiLCJwcmV2QXJyb3dPdXRUbCIsIngiLCJtb3ZlRG93biIsIm5leHRBcnJvd091dFRsIiwicGF0aCIsImFycm93TW91c2VFbnRlclRsIiwiYXJyb3dNb3VzZUxlYXZlVGwiLCJyZXNldFByb2dyZXNzIiwiY1Byb2dyZXNzIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwidFByb2dyZXNzIiwibGluayIsImxpbmtzIiwicGVyY2VudFBlckxpbmsiLCJpbm5lckhUTUwiLCJjdXJyZW50TGkiLCJ0YXJnZXRMZW5ndGgiLCJhY3RpdmVJbmRleCIsImN1cnJlbnRMZW5ndGgiLCJsaSIsInJlbW92ZUF0dHJpYnV0ZSIsImluZGljZXMiLCJzZWN0aW9uIiwidG9nZ2xlU3RhdGUiLCJlbGVtIiwiYXR0ciIsImEiLCJiIiwiY3VycmVudEVsZW1lbnQiLCJzaG93Rm9ybVRsIiwiaGlkZUZvcm1UbCIsImxpbmtTcGxpdFRleHQiLCJhYm91dFRsIiwic3RhZ2dlclRvIiwiYmFja1RsMSIsImJhY2tUbCIsImFib3V0Q2xvc2VIb3ZlclRsIiwiaGlnaGxpZ2h0TGluayIsIiRoaWdobGlnaHQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiYXBwZW5kIiwiaGlnaGxpZ2hMaW5rVGwiLCJ1bmhpZ2hsaWdodExpbmsiLCJoaWdobGlnaHQiLCJyZW1vdmUiLCJvbmxvYWQiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsR0FBRyxHQUFJLFlBQVk7QUFFdkIsTUFBTUMsT0FBTyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBaEI7QUFDQSxNQUFNQyxVQUFVLEdBQUdGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFuQjtBQUNBLE1BQU1FLEtBQUssR0FBR0gsUUFBUSxDQUFDQyxhQUFULENBQXVCLE9BQXZCLENBQWQ7QUFDQSxNQUFNRyxPQUFPLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFoQjtBQUNBLE1BQU1JLElBQUksR0FBR0wsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxNQUFNSyxLQUFLLEdBQUdGLE9BQU8sQ0FBQ0csaUJBQXRCO0FBQ0EsTUFBTUMsYUFBYSxHQUFHTCxLQUFLLENBQUNJLGlCQUE1QjtBQUNBLE1BQU1FLGFBQWEsR0FBR0QsYUFBYSxDQUFDUCxhQUFkLENBQTRCLGVBQTVCLENBQXRCO0FBQ0EsTUFBTVMsV0FBVyxHQUFHRixhQUFhLENBQUNQLGFBQWQsQ0FBNEIsYUFBNUIsQ0FBcEI7QUFDQSxNQUFNVSxVQUFVLEdBQUdYLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtBQUNBLE1BQU1XLFdBQVcsR0FBR1osUUFBUSxDQUFDQyxhQUFULENBQXVCLGVBQXZCLENBQXBCO0FBQ0EsTUFBTVksVUFBVSxHQUFHYixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBbkI7QUFDQSxNQUFNYSxRQUFRLEdBQUdkLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixXQUF2QixDQUFqQjtBQUNBLE1BQU1jLFdBQVcsR0FBR2YsUUFBUSxDQUFDQyxhQUFULENBQXVCLGNBQXZCLENBQXBCO0FBQ0EsTUFBTWUsVUFBVSxHQUFHaEIsUUFBUSxDQUFDQyxhQUFULENBQXVCLFlBQXZCLENBQW5CO0FBQ0EsTUFBTWdCLFFBQVEsR0FBR2pCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixVQUF2QixDQUFqQjtBQUNBLE1BQU1pQixZQUFZLEdBQUdsQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBckI7QUFDQSxNQUFNa0IsY0FBYyxHQUFHbkIsUUFBUSxDQUFDQyxhQUFULENBQXVCLGtCQUF2QixDQUF2QjtBQUNBLE1BQU1tQixrQkFBa0IsR0FBR3BCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixnQkFBdkIsQ0FBM0I7QUFDQSxNQUFNb0IsVUFBVSxHQUFHckIsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBbkI7QUFDQSxNQUFNQyxTQUFTLEdBQUd2QixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsYUFBdkIsQ0FBbEI7QUFDQSxNQUFNdUIsU0FBUyxHQUFHeEIsUUFBUSxDQUFDQyxhQUFULENBQXVCLGFBQXZCLENBQWxCO0FBQ0EsTUFBTXdCLFlBQVksR0FBR3pCLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFyQjtBQUNBLE1BQU15QixZQUFZLEdBQUcxQixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsWUFBdkIsQ0FBckI7QUFDQSxNQUFNMEIsVUFBVSxHQUFHM0IsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBbkI7QUFDQSxNQUFNTSxTQUFTLEdBQUc1QixRQUFRLENBQUNzQixnQkFBVCxDQUEwQixZQUExQixDQUFsQjtBQUNBLE1BQU1PLFdBQVcsR0FBRzdCLFFBQVEsQ0FBQ3NCLGdCQUFULENBQTBCLGFBQTFCLENBQXBCO0FBQ0EsTUFBTVEsU0FBUyxHQUFHOUIsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBbEI7QUFDQSxNQUFNUyxNQUFNLEdBQUcvQixRQUFRLENBQUNzQixnQkFBVCxDQUEwQixHQUExQixDQUFmO0FBQ0EsTUFBTVUsZUFBZSxHQUFHaEMsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsUUFBMUIsQ0FBeEI7O0FBRUEsTUFBTVcsWUFBWSxHQUFHLFNBQWZBLFlBQWUsR0FBTTtBQUN6QixRQUFNQyxVQUFVLEdBQUdsQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQW5CO0FBQ0EsUUFBTWtDLFlBQVksR0FBR0QsVUFBVSxDQUFDRSxRQUFoQztBQUNBLFFBQU1DLG1CQUFtQixHQUFHSCxVQUFVLENBQUMzQixpQkFBWCxDQUE2QkEsaUJBQXpEO0FBRUEsUUFBTStCLFNBQVMsR0FBRyxJQUFJQyxXQUFKLENBQWdCO0FBQ2hDQyxNQUFBQSxLQUFLLEVBQUUsQ0FEeUI7QUFFaENDLE1BQUFBLGlCQUFpQixFQUFFLElBRmE7QUFHaENDLE1BQUFBLE1BQU0sRUFBRSxDQUFDLENBSHVCO0FBSWhDQyxNQUFBQSxJQUFJLEVBQUU7QUFKMEIsS0FBaEIsQ0FBbEI7QUFNQUwsSUFBQUEsU0FBUyxDQUNOTSxHQURILENBQ08xQyxVQURQLEVBQ21CO0FBQUMyQyxNQUFBQSxTQUFTLEVBQUM7QUFBWCxLQURuQixFQUVHQyxNQUZILENBRVU1QyxVQUZWLEVBRXNCLENBRnRCLEVBRXlCO0FBQUM2QyxNQUFBQSxPQUFPLEVBQUM7QUFBVCxLQUZ6QixFQUUyQztBQUFFQSxNQUFBQSxPQUFPLEVBQUMsU0FBVjtBQUFxQkMsTUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDO0FBQWhDLEtBRjNDO0FBR0EsUUFBTUMsS0FBSyxHQUFHLGtEQUFkO0FBQ0EsUUFBTUMsT0FBTyxHQUFHcEQsUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsZUFBMUIsQ0FBaEI7QUFDQSxRQUFJK0IsT0FBTyxHQUFHLEVBQWQ7QUFDQUQsSUFBQUEsT0FBTyxDQUFDRSxPQUFSLENBQWdCLFVBQUFDLEtBQUs7QUFBQSxhQUFJRixPQUFPLENBQUNHLElBQVIsQ0FBYUQsS0FBSyxDQUFDRSxLQUFOLENBQVlDLE9BQVosQ0FBb0JDLEtBQXBCLENBQTBCUixLQUExQixDQUFiLENBQUo7QUFBQSxLQUFyQjtBQUNBLFFBQU1TLFFBQVEsR0FBRyxJQUFJckIsV0FBSixDQUFnQjtBQUMvQkMsTUFBQUEsS0FBSyxFQUFFO0FBRHdCLEtBQWhCLENBQWpCO0FBR0EsUUFBSXFCLFlBQVksR0FBRyxDQUFuQjs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdULE9BQU8sQ0FBQ1UsTUFBNUIsRUFBb0NELENBQUMsRUFBckMsRUFBeUM7QUFDdkMsVUFBSUUsR0FBRyxHQUFHLElBQUlDLEtBQUosRUFBVjtBQUNBRCxNQUFBQSxHQUFHLENBQUNFLEdBQUosR0FBVWIsT0FBTyxDQUFDUyxDQUFELENBQVAsQ0FBVyxDQUFYLENBQVY7QUFDQUUsTUFBQUEsR0FBRyxDQUFDRyxnQkFBSixDQUFxQixNQUFyQixFQUE2QixZQUFNO0FBQ2pDTixRQUFBQSxZQUFZOztBQUNaLFlBQUlBLFlBQVksS0FBS1IsT0FBTyxDQUFDVSxNQUE3QixFQUFxQztBQUNuQ0gsVUFBQUEsUUFBUSxDQUNQUSxFQURELENBQ0lyRSxPQURKLEVBQ2EsQ0FEYixFQUNnQjtBQUFDOEMsWUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBY3dCLFlBQUFBLE9BQU8sRUFBQyxJQUF0QjtBQUE0QnJCLFlBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUF2QyxXQURoQixFQUNtRSxPQURuRSxFQUVDb0IsSUFGRCxDQUVNaEUsS0FGTixFQUVhLENBRmIsRUFFZ0I7QUFBQ2lFLFlBQUFBLFFBQVEsRUFBRSxDQUFDLEdBQVo7QUFBaUIxQixZQUFBQSxTQUFTLEVBQUMsQ0FBM0I7QUFBOEJ3QixZQUFBQSxPQUFPLEVBQUMsSUFBdEM7QUFBNENyQixZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXZELFdBRmhCLEVBRWlGLFVBRmpGLEVBR0NGLElBSEQsQ0FHTTNELFVBSE4sRUFHa0IsQ0FIbEIsRUFHcUI7QUFBQzRELFlBQUFBLFFBQVEsRUFBRSxDQUFDLEdBQVo7QUFBaUIxQixZQUFBQSxTQUFTLEVBQUMsQ0FBM0I7QUFBOEJ3QixZQUFBQSxPQUFPLEVBQUMsSUFBdEM7QUFBNENyQixZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXZELFdBSHJCLEVBR3NGLFVBSHRGLEVBSUNGLElBSkQsQ0FJTS9DLFNBSk4sRUFJaUIsQ0FKakIsRUFJb0I7QUFBQ2dELFlBQUFBLFFBQVEsRUFBRSxDQUFDLEdBQVo7QUFBaUIxQixZQUFBQSxTQUFTLEVBQUMsQ0FBM0I7QUFBOEJ3QixZQUFBQSxPQUFPLEVBQUMsSUFBdEM7QUFBNENyQixZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3dCO0FBQXZELFdBSnBCLEVBSW9GLFlBSnBGLEVBS0NILElBTEQsQ0FLTTlDLFNBTE4sRUFLaUIsQ0FMakIsRUFLb0I7QUFBQytDLFlBQUFBLFFBQVEsRUFBRSxHQUFYO0FBQWdCMUIsWUFBQUEsU0FBUyxFQUFDLENBQTFCO0FBQTZCd0IsWUFBQUEsT0FBTyxFQUFDLElBQXJDO0FBQTJDckIsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN3QjtBQUF0RCxXQUxwQixFQUttRixZQUxuRixFQU1DSCxJQU5ELENBTU01RCxXQU5OLEVBTW1CLENBTm5CLEVBTXNCO0FBQUM2RCxZQUFBQSxRQUFRLEVBQUUsQ0FBQyxHQUFaO0FBQWlCMUIsWUFBQUEsU0FBUyxFQUFDLENBQTNCO0FBQThCd0IsWUFBQUEsT0FBTyxFQUFDLElBQXRDO0FBQTRDckIsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF2RCxXQU50QixFQU11RixZQU52RixFQU9DRixJQVBELENBT003RCxhQVBOLEVBT3FCLENBUHJCLEVBT3dCO0FBQUM4RCxZQUFBQSxRQUFRLEVBQUUsQ0FBQyxHQUFaO0FBQWlCMUIsWUFBQUEsU0FBUyxFQUFDLENBQTNCO0FBQThCd0IsWUFBQUEsT0FBTyxFQUFDLElBQXRDO0FBQTRDckIsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF2RCxXQVB4QixFQU95RixVQVB6RixFQVFDRSxXQVJELENBUWF2QyxZQVJiLEVBUTJCLENBUjNCLEVBUThCO0FBQUN3QyxZQUFBQSxRQUFRLEVBQUMsR0FBVjtBQUFlOUIsWUFBQUEsU0FBUyxFQUFDLENBQXpCO0FBQTRCd0IsWUFBQUEsT0FBTyxFQUFDLElBQXBDO0FBQTBDckIsWUFBQUEsSUFBSSxFQUFFNEIsSUFBSSxDQUFDSixPQUFMLENBQWFLLE1BQWIsQ0FBb0IsR0FBcEI7QUFBaEQsV0FSOUIsRUFReUcsRUFSekcsRUFRNkcsWUFSN0csRUFTQ1QsRUFURCxDQVNJL0IsbUJBVEosRUFTeUIsSUFUekIsRUFTK0I7QUFBQ3lDLFlBQUFBLEtBQUssRUFBQyxNQUFQO0FBQWU5QixZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQTFCLFdBVC9CLEVBU21FLGFBVG5FO0FBV0Q7QUFDRixPQWZEO0FBZ0JEO0FBQ0YsR0ExQ0Q7O0FBNENBLE1BQU1PLFVBQVUsR0FBRyxTQUFiQSxVQUFhLEdBQU07QUFDdkIsUUFBSUMsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsVUFBSWpGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QiwyQkFBdkIsQ0FBSixFQUF5RDtBQUN2RCxZQUFNaUYsZUFBZSxHQUFHbEYsUUFBUSxDQUFDQyxhQUFULENBQXVCLDJCQUF2QixDQUF4QjtBQUNBLFlBQU1rRixTQUFTLEdBQUduRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsaUJBQXZCLENBQWxCO0FBQ0FpRixRQUFBQSxlQUFlLENBQUNFLGtCQUFoQixDQUFtQyxXQUFuQztBQUtBLFlBQU1DLFVBQVUsR0FBR3JGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixhQUF2QixDQUFuQjtBQUNBcUYsUUFBQUEsUUFBUSxDQUFDMUMsR0FBVCxDQUFheUMsVUFBYixFQUF5QjtBQUFDdEMsVUFBQUEsT0FBTyxFQUFDO0FBQVQsU0FBekI7QUFDQW9DLFFBQUFBLFNBQVMsQ0FBQ2hCLGdCQUFWLENBQTJCLFlBQTNCLEVBQXlDLFlBQU07QUFDN0MsY0FBSW9CLFFBQVEsR0FBRyxJQUFJaEQsV0FBSixFQUFmO0FBQ0VnRCxVQUFBQSxRQUFRLENBQ0xuQixFQURILENBQ01pQixVQUROLEVBQ2tCLENBRGxCLEVBQ3FCO0FBQUN0QyxZQUFBQSxPQUFPLEVBQUMsTUFBVDtBQUFpQkMsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUE1QixXQURyQixFQUMyRCxPQUQzRCxFQUVHSixFQUZILENBRU1pQixVQUZOLEVBRWtCLENBRmxCLEVBRXFCO0FBQUNHLFlBQUFBLElBQUksRUFBRSxTQUFQO0FBQWtCeEMsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUE3QixXQUZyQixFQUU0RCxZQUY1RDtBQUdILFNBTEQ7QUFNQVcsUUFBQUEsU0FBUyxDQUFDaEIsZ0JBQVYsQ0FBMkIsWUFBM0IsRUFBeUMsWUFBTTtBQUM3QyxjQUFJb0IsUUFBUSxHQUFHLElBQUloRCxXQUFKLEVBQWY7QUFDRWdELFVBQUFBLFFBQVEsQ0FDTG5CLEVBREgsQ0FDTWlCLFVBRE4sRUFDa0IsQ0FEbEIsRUFDcUI7QUFBQ3RDLFlBQUFBLE9BQU8sRUFBQyxJQUFUO0FBQWV5QyxZQUFBQSxJQUFJLEVBQUUsTUFBckI7QUFBNkJ4QyxZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXhDLFdBRHJCLEVBQ3VFLE9BRHZFO0FBRUgsU0FKRDtBQUtEO0FBQ0Y7QUFDRixHQTNCRDs7QUE2QkEsTUFBTWlCLElBQUksR0FBRyxTQUFQQSxJQUFPLEdBQU07QUFFakJDLElBQUFBLGFBQWEsQ0FBQyxPQUFELEVBQVU7QUFDckJDLE1BQUFBLGdCQUFnQixFQUFFLFNBREc7QUFFckJDLE1BQUFBLE1BQU0sRUFBRSxnQ0FGYTtBQUdyQkMsTUFBQUEsYUFBYSxFQUFFLEdBSE07QUFJckJDLE1BQUFBLFVBQVUsRUFBRSxJQUpTO0FBS3JCQyxNQUFBQSxTQUFTLEVBQUUsS0FMVTtBQU1yQkMsTUFBQUEsVUFBVSxFQUFFLG9CQUFTQyxLQUFULEVBQWdCQyxjQUFoQixFQUFnQztBQUMxQyxZQUFJQyxNQUFNLEdBQUdELGNBQWMsQ0FBQzNGLGlCQUE1QixDQUQwQyxDQUUxQzs7QUFDQSxZQUFJNkYsTUFBTSxHQUFHRCxNQUFNLENBQUM1RixpQkFBcEIsQ0FIMEMsQ0FJMUM7O0FBQ0EsWUFBSThGLFNBQVMsR0FBR0QsTUFBTSxDQUFDN0YsaUJBQXZCLENBTDBDLENBTTFDOztBQUNBLFlBQUkrRixVQUFVLEdBQUdELFNBQVMsQ0FBQzlGLGlCQUEzQixDQVAwQyxDQVExQzs7QUFDQSxZQUFJZ0csS0FBSyxHQUFHRixTQUFTLENBQUNHLGdCQUF0QixDQVQwQyxDQVUxQzs7QUFDQSxZQUFJQyxNQUFNLEdBQUdILFVBQVUsQ0FBQ0UsZ0JBQXhCLENBWDBDLENBWTFDOztBQUNBLFlBQUlFLFdBQVcsR0FBR0QsTUFBTSxDQUFDbEcsaUJBQXpCLENBYjBDLENBYzFDOztBQUNBLFlBQUlvRyxPQUFPLEdBQUdMLFVBQVUsQ0FBQy9GLGlCQUF6QixDQWYwQyxDQWdCMUM7O0FBQ0EsWUFBSXFHLGVBQWUsR0FBRzFFLFVBQVUsQ0FBQ1osZ0JBQVgsQ0FBNEIsc0JBQTVCLENBQXRCO0FBQ0FzRixRQUFBQSxlQUFlLENBQUN0RCxPQUFoQixDQUF3QixVQUFBdUQsR0FBRyxFQUFJO0FBQzdCdkIsVUFBQUEsUUFBUSxDQUFDbEIsRUFBVCxDQUFZeUMsR0FBWixFQUFpQixDQUFqQixFQUFvQjtBQUFDL0IsWUFBQUEsS0FBSyxFQUFDLElBQVA7QUFBYTlCLFlBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUF4QixXQUFwQjtBQUNELFNBRkQ7QUFJQSxZQUFJNEQsWUFBWSxHQUFHLElBQUl2RSxXQUFKLEVBQW5CO0FBQ0V1RSxRQUFBQSxZQUFZLENBQ1RsRSxHQURILENBQ091RCxNQURQLEVBQ2U7QUFBQzVCLFVBQUFBLFFBQVEsRUFBRSxDQUFDO0FBQVosU0FEZixFQUVHM0IsR0FGSCxDQUVPd0QsTUFGUCxFQUVlO0FBQUM3QixVQUFBQSxRQUFRLEVBQUUsQ0FBQztBQUFaLFNBRmYsRUFHRzNCLEdBSEgsQ0FHT3lELFNBSFAsRUFHa0I7QUFBQzlCLFVBQUFBLFFBQVEsRUFBRSxDQUFDO0FBQVosU0FIbEIsRUFJRzNCLEdBSkgsQ0FJTzJELEtBSlAsRUFJYztBQUFDaEMsVUFBQUEsUUFBUSxFQUFDLENBQUM7QUFBWCxTQUpkLEVBS0czQixHQUxILENBS08wRCxVQUxQLEVBS21CO0FBQUNTLFVBQUFBLEtBQUssRUFBQyxHQUFQO0FBQVlsRSxVQUFBQSxTQUFTLEVBQUMsQ0FBdEI7QUFBeUIwQixVQUFBQSxRQUFRLEVBQUMsQ0FBQztBQUFuQyxTQUxuQixFQU1HM0IsR0FOSCxDQU1PNkQsTUFOUCxFQU1lO0FBQUM1RCxVQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjOEIsVUFBQUEsUUFBUSxFQUFDO0FBQXZCLFNBTmYsRUFPRy9CLEdBUEgsQ0FPTzhELFdBUFAsRUFPb0I7QUFBQzdELFVBQUFBLFNBQVMsRUFBQyxDQUFYO0FBQWMwQixVQUFBQSxRQUFRLEVBQUMsQ0FBQztBQUF4QixTQVBwQjtBQVVILE9BdkNvQjtBQXdDckJ5QyxNQUFBQSxTQUFTLEVBQUUsbUJBQVNmLEtBQVQsRUFBZ0JDLGNBQWhCLEVBQWdDO0FBQ3pDLFlBQUllLGFBQWEsR0FBRyxJQUFJMUUsV0FBSixFQUFwQjtBQUNFMEUsUUFBQUEsYUFBYSxDQUNWN0MsRUFESCxDQUNNM0MsWUFETixFQUNvQixDQURwQixFQUN1QjtBQUFDc0IsVUFBQUEsT0FBTyxFQUFDLE1BQVQ7QUFBaUJDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBNUIsU0FEdkI7QUFHRixZQUFJMEMsYUFBYSxHQUFHLElBQUkzRSxXQUFKLEVBQXBCO0FBQ0UyRSxRQUFBQSxhQUFhLENBQ1Y5QyxFQURILENBQ00xQyxZQUROLEVBQ29CLENBRHBCLEVBQ3VCO0FBQUNxQixVQUFBQSxPQUFPLEVBQUMsTUFBVDtBQUFpQkMsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUE1QixTQUR2QjtBQUdGLFlBQUkyQixNQUFNLEdBQUdELGNBQWMsQ0FBQzNGLGlCQUE1QixDQVR5QyxDQVV6Qzs7QUFDQSxZQUFJNkYsTUFBTSxHQUFHRCxNQUFNLENBQUM1RixpQkFBcEIsQ0FYeUMsQ0FZekM7O0FBQ0EsWUFBSThGLFNBQVMsR0FBR0QsTUFBTSxDQUFDN0YsaUJBQXZCLENBYnlDLENBY3pDOztBQUNBLFlBQUkrRixVQUFVLEdBQUdELFNBQVMsQ0FBQzlGLGlCQUEzQixDQWZ5QyxDQWdCekM7O0FBQ0EsWUFBSWdHLEtBQUssR0FBR0YsU0FBUyxDQUFDRyxnQkFBdEIsQ0FqQnlDLENBa0J6Qzs7QUFDQSxZQUFJQyxNQUFNLEdBQUdILFVBQVUsQ0FBQ0UsZ0JBQXhCLENBbkJ5QyxDQW9CekM7O0FBQ0EsWUFBSUUsV0FBVyxHQUFHRCxNQUFNLENBQUNsRyxpQkFBekIsQ0FyQnlDLENBc0J6Qzs7QUFDQSxZQUFJb0csT0FBTyxHQUFHTCxVQUFVLENBQUMvRixpQkFBekIsQ0F2QnlDLENBd0J6Qzs7QUFDQSxZQUFJNEcsV0FBVyxHQUFHakYsVUFBVSxDQUFDakMsYUFBWCwwQkFBMENnRyxLQUExQyxTQUFsQjtBQUNBLFlBQUltQixrQkFBa0IsR0FBR0QsV0FBVyxDQUFDRSxlQUFyQztBQUVBLFlBQUlDLFdBQVcsR0FBRyxJQUFJL0UsV0FBSixFQUFsQjtBQUNBLFlBQUlnRixrQkFBa0IsR0FBRyxJQUFJQyxTQUFKLENBQWNiLE9BQWQsRUFBdUI7QUFBQ2MsVUFBQUEsSUFBSSxFQUFDO0FBQU4sU0FBdkIsQ0FBekI7QUFDQSxZQUFJQyxLQUFLLEdBQUdILGtCQUFrQixDQUFDRyxLQUEvQjtBQUNFSixRQUFBQSxXQUFXLENBQ1JsRCxFQURILENBQ00rQixNQUROLEVBQ2MsQ0FEZCxFQUNpQjtBQUFDNUIsVUFBQUEsUUFBUSxFQUFDLENBQVY7QUFBYUYsVUFBQUEsT0FBTyxFQUFDLElBQXJCO0FBQTJCckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF0QyxTQURqQixFQUNpRSxRQURqRSxFQUVHSixFQUZILENBRU1nQyxNQUZOLEVBRWMsQ0FGZCxFQUVpQjtBQUFDN0IsVUFBQUEsUUFBUSxFQUFDLENBQVY7QUFBYUYsVUFBQUEsT0FBTyxFQUFDLElBQXJCO0FBQTJCckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF0QyxTQUZqQixFQUVpRSxhQUZqRSxFQUdHSixFQUhILENBR01pQyxTQUhOLEVBR2lCLENBSGpCLEVBR29CO0FBQUM5QixVQUFBQSxRQUFRLEVBQUMsQ0FBVjtBQUFhRixVQUFBQSxPQUFPLEVBQUMsSUFBckI7QUFBMkJyQixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXRDLFNBSHBCLEVBR29FLFlBSHBFLEVBSUdKLEVBSkgsQ0FJTW1DLEtBSk4sRUFJYSxDQUpiLEVBSWdCO0FBQUNoQyxVQUFBQSxRQUFRLEVBQUMsQ0FBVjtBQUFhRixVQUFBQSxPQUFPLEVBQUMsSUFBckI7QUFBMkJyQixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXRDLFNBSmhCLEVBSWdFLFdBSmhFLEVBS0dKLEVBTEgsQ0FLTWtDLFVBTE4sRUFLa0IsR0FMbEIsRUFLdUI7QUFBQ1MsVUFBQUEsS0FBSyxFQUFDLENBQVA7QUFBVWxFLFVBQUFBLFNBQVMsRUFBQyxDQUFwQjtBQUF1QjBCLFVBQUFBLFFBQVEsRUFBQyxDQUFoQztBQUFtQ0YsVUFBQUEsT0FBTyxFQUFDLElBQTNDO0FBQWlEckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUE1RCxTQUx2QixFQUs2RixXQUw3RixFQU1HSixFQU5ILENBTU1xQyxNQU5OLEVBTWMsRUFOZCxFQU1rQjtBQUFDNUQsVUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzhCLFVBQUFBLFFBQVEsRUFBQyxDQUF2QjtBQUEwQk4sVUFBQUEsT0FBTyxFQUFDLElBQWxDO0FBQXdDckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUFuRCxTQU5sQixFQU0rRSxjQU4vRSxFQU9HSixFQVBILENBT01zQyxXQVBOLEVBT21CLENBUG5CLEVBT3NCO0FBQUNLLFVBQUFBLEtBQUssRUFBQyxDQUFQO0FBQVVsRSxVQUFBQSxTQUFTLEVBQUMsQ0FBcEI7QUFBdUIwQixVQUFBQSxRQUFRLEVBQUMsQ0FBaEM7QUFBbUNGLFVBQUFBLE9BQU8sRUFBQyxJQUEzQztBQUFpRHJCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBNUQsU0FQdEIsRUFPNEYsYUFQNUYsRUFRR0UsV0FSSCxDQVFlZ0QsS0FSZixFQVFzQixDQVJ0QixFQVF5QjtBQUFDN0UsVUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzhCLFVBQUFBLFFBQVEsRUFBQyxDQUFDLEdBQXhCO0FBQTZCM0IsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF4QyxTQVJ6QixFQVEyRSxJQVIzRSxFQVFpRixjQVJqRixFQVNHSixFQVRILENBU01nRCxrQkFUTixFQVMwQixJQVQxQixFQVNnQztBQUFDdEMsVUFBQUEsS0FBSyxFQUFDLE1BQVA7QUFBZTlCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBMUIsU0FUaEMsRUFTb0UsYUFUcEU7QUFVSCxPQWpGb0I7QUFrRnJCbUQsTUFBQUEsSUFBSSxFQUFFLElBbEZlO0FBbUZyQkMsTUFBQUEsUUFBUSxFQUFFLElBbkZXO0FBb0ZyQkMsTUFBQUEsa0JBQWtCLEVBQUU7QUFwRkMsS0FBVixDQUFiO0FBdUZBLFFBQU0zRixVQUFVLEdBQUdsQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQW5CO0FBQ0EsUUFBTWtDLFlBQVksR0FBR0QsVUFBVSxDQUFDRSxRQUFoQztBQUNBLFFBQU0wRixjQUFjLEdBQUc5SCxRQUFRLENBQUNzQixnQkFBVCxDQUEwQix3QkFBMUIsQ0FBdkI7QUFDQSxRQUFNeUcsZ0JBQWdCLEdBQUcvSCxRQUFRLENBQUNzQixnQkFBVCxDQUEwQiwwQkFBMUIsQ0FBekI7QUFDQSxRQUFNMEcsWUFBWSxHQUFHaEksUUFBUSxDQUFDc0IsZ0JBQVQsQ0FBMEIsYUFBMUIsQ0FBckI7QUFDQSxRQUFNMkcsY0FBYyxHQUFHakksUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUF2Qjs7QUFFQSxhQUFTaUksWUFBVCxDQUFzQkMsQ0FBdEIsRUFBeUI7QUFDdkJBLE1BQUFBLENBQUMsQ0FBQ0MsY0FBRjtBQUNBLFVBQUlDLFFBQVEsR0FBRyxLQUFLQyxhQUFwQjtBQUNBLFVBQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUNBLFVBQUlDLFFBQVEsR0FBR0QsU0FBUyxDQUFDL0IsZ0JBQXpCO0FBQ0EsVUFBSWlDLFFBQVEsR0FBR0osUUFBUSxDQUFDN0IsZ0JBQXhCO0FBQ0EsVUFBSWtDLE9BQU8sR0FBR0wsUUFBUSxDQUFDTSxZQUFULENBQXNCLGNBQXRCLENBQWQ7O0FBQ0EsVUFBSUQsT0FBTyxLQUFLLFFBQWhCLEVBQTBCO0FBQ3hCTCxRQUFBQSxRQUFRLENBQUNPLFlBQVQsQ0FBc0IsY0FBdEIsRUFBc0MsTUFBdEM7QUFDQSxZQUFJQyxnQkFBZ0IsR0FBRyxJQUFJdEcsV0FBSixFQUF2QjtBQUNFc0csUUFBQUEsZ0JBQWdCLENBQ2J6RSxFQURILENBQ01pRSxRQUROLEVBQ2dCLENBRGhCLEVBQ21CO0FBQUNTLFVBQUFBLE1BQU0sRUFBQyxNQUFSO0FBQWdCOUYsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUEzQixTQURuQixFQUN3RCxNQUR4RCxFQUVHSixFQUZILENBRU1vRSxRQUZOLEVBRWdCLENBRmhCLEVBRW1CO0FBQUNPLFVBQUFBLFFBQVEsRUFBQyxFQUFWO0FBQWMvRixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXpCLFNBRm5CLEVBRXNELE1BRnRELEVBR0cxQixNQUhILENBR1UyRixRQUhWLEVBR29CLEdBSHBCLEVBR3lCO0FBQUM5RCxVQUFBQSxRQUFRLEVBQUMsR0FBVjtBQUFlOUIsVUFBQUEsU0FBUyxFQUFDLENBQXpCO0FBQTRCd0IsVUFBQUEsT0FBTyxFQUFDO0FBQXBDLFNBSHpCLEVBR21FO0FBQUNxRSxVQUFBQSxPQUFPLEVBQUMsT0FBVDtBQUFrQi9ELFVBQUFBLFFBQVEsRUFBQyxDQUEzQjtBQUE4QjlCLFVBQUFBLFNBQVMsRUFBQyxDQUF4QztBQUEyQ3dCLFVBQUFBLE9BQU8sRUFBQyxJQUFuRDtBQUF5RHJCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBcEUsU0FIbkUsRUFHaUosV0FIako7QUFJSDtBQUNGOztBQUVELGFBQVN3RSxhQUFULENBQXVCYixDQUF2QixFQUEwQjtBQUN4QkEsTUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0FELE1BQUFBLENBQUMsQ0FBQ2MsZUFBRjtBQUNBLFVBQUlDLE9BQU8sR0FBRyxJQUFkO0FBQ0EsVUFBSVgsU0FBUyxHQUFHLEtBQUtELGFBQXJCO0FBQ0EsVUFBSUQsUUFBUSxHQUFHRSxTQUFTLENBQUNELGFBQXpCO0FBQ0EsVUFBSUcsUUFBUSxHQUFHSixRQUFRLENBQUM3QixnQkFBeEI7QUFDQSxVQUFJa0MsT0FBTyxHQUFHTCxRQUFRLENBQUNNLFlBQVQsQ0FBc0IsY0FBdEIsQ0FBZDs7QUFDQSxVQUFJRCxPQUFPLEtBQUssUUFBaEIsRUFBMEI7QUFDeEJMLFFBQUFBLFFBQVEsQ0FBQ08sWUFBVCxDQUFzQixjQUF0QixFQUFzQyxNQUF0QztBQUNBLFlBQUlDLGdCQUFnQixHQUFHLElBQUl0RyxXQUFKLEVBQXZCO0FBQ0VzRyxRQUFBQSxnQkFBZ0IsQ0FDYnpFLEVBREgsQ0FDTWlFLFFBRE4sRUFDZ0IsQ0FEaEIsRUFDbUI7QUFBQ1MsVUFBQUEsTUFBTSxFQUFDLE1BQVI7QUFBZ0I5RixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQTNCLFNBRG5CLEVBQ3dELE1BRHhELEVBRUdKLEVBRkgsQ0FFTThFLE9BRk4sRUFFZSxDQUZmLEVBRWtCO0FBQUNILFVBQUFBLFFBQVEsRUFBQyxFQUFWO0FBQWMvRixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXpCLFNBRmxCLEVBRXFELE1BRnJELEVBR0cxQixNQUhILENBR1UyRixRQUhWLEVBR29CLEdBSHBCLEVBR3lCO0FBQUM5RCxVQUFBQSxRQUFRLEVBQUMsR0FBVjtBQUFlOUIsVUFBQUEsU0FBUyxFQUFDLENBQXpCO0FBQTRCd0IsVUFBQUEsT0FBTyxFQUFDO0FBQXBDLFNBSHpCLEVBR21FO0FBQUNxRSxVQUFBQSxPQUFPLEVBQUMsT0FBVDtBQUFrQi9ELFVBQUFBLFFBQVEsRUFBQyxDQUEzQjtBQUE4QjlCLFVBQUFBLFNBQVMsRUFBQyxDQUF4QztBQUEyQ3dCLFVBQUFBLE9BQU8sRUFBQyxJQUFuRDtBQUF5RHJCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBcEUsU0FIbkUsRUFHaUosV0FIako7QUFLSCxPQVJELE1BUU8sSUFBSWtFLE9BQU8sS0FBSyxNQUFoQixFQUF3QjtBQUM3QkwsUUFBQUEsUUFBUSxDQUFDTyxZQUFULENBQXNCLGNBQXRCLEVBQXNDLFFBQXRDO0FBQ0EsWUFBSU8sY0FBYyxHQUFHLElBQUk1RyxXQUFKLEVBQXJCO0FBQ0U0RyxRQUFBQSxjQUFjLENBQ1gvRSxFQURILENBQ004RSxPQUROLEVBQ2UsQ0FEZixFQUNrQjtBQUFDSCxVQUFBQSxRQUFRLEVBQUMsQ0FBVjtBQUFhL0YsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN3QjtBQUF4QixTQURsQixFQUNtRCxPQURuRCxFQUVHTCxFQUZILENBRU1xRSxRQUZOLEVBRWdCLEdBRmhCLEVBRXFCO0FBQUNDLFVBQUFBLE9BQU8sRUFBQyxNQUFUO0FBQWlCN0YsVUFBQUEsU0FBUyxFQUFDLENBQTNCO0FBQThCOEIsVUFBQUEsUUFBUSxFQUFDLEdBQXZDO0FBQTRDTixVQUFBQSxPQUFPLEVBQUMsSUFBcEQ7QUFBMERyQixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3dCO0FBQXJFLFNBRnJCLEVBRW1HLE9BRm5HLEVBR0dMLEVBSEgsQ0FHTWlFLFFBSE4sRUFHZ0IsQ0FIaEIsRUFHbUI7QUFBQ1MsVUFBQUEsTUFBTSxFQUFDLE1BQVI7QUFBZ0I5RixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3dCO0FBQTNCLFNBSG5CLEVBR3VELFlBSHZEO0FBS0g7QUFDRjs7QUFFRDVDLElBQUFBLFdBQVcsQ0FBQ3lCLE9BQVosQ0FBb0IsVUFBQThGLEtBQUs7QUFBQSxhQUFJQSxLQUFLLENBQUNqRixnQkFBTixDQUF1QixPQUF2QixFQUFnQytELFlBQWhDLENBQUo7QUFBQSxLQUF6QjtBQUNBcEcsSUFBQUEsU0FBUyxDQUFDd0IsT0FBVixDQUFrQixVQUFBK0YsTUFBTTtBQUFBLGFBQUlBLE1BQU0sQ0FBQ2xGLGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDNkUsYUFBakMsQ0FBSjtBQUFBLEtBQXhCOztBQUVBLFFBQU1NLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ25CLENBQUQsRUFBTztBQUMzQixVQUFJb0IsUUFBUSxHQUFHcEIsQ0FBQyxDQUFDcUIsTUFBakI7QUFDQSxVQUFJQyxJQUFJLEdBQUd0QixDQUFDLENBQUNxQixNQUFGLENBQVNoRCxnQkFBcEI7QUFDQSxVQUFJNEMsS0FBSyxHQUFHSyxJQUFJLENBQUNsSixpQkFBakI7QUFDQSxVQUFJaUksUUFBUSxHQUFHWSxLQUFLLENBQUM1QyxnQkFBckI7QUFDQSxVQUFJa0QsV0FBVyxHQUFHbEIsUUFBUSxDQUFDakksaUJBQTNCO0FBQ0EsVUFBSW9KLFlBQVksR0FBR0QsV0FBVyxDQUFDbkosaUJBQS9CO0FBQ0EsVUFBSXFKLFdBQVcsR0FBR0wsUUFBUSxDQUFDWixZQUFULENBQXNCLGVBQXRCLENBQWxCOztBQUNBLFVBQUlpQixXQUFXLEtBQUssSUFBcEIsRUFBMEI7QUFDeEJMLFFBQUFBLFFBQVEsQ0FBQ1gsWUFBVCxDQUFzQixlQUF0QixFQUF1QyxLQUF2QztBQUNBLFlBQUlpQixlQUFlLEdBQUcsSUFBSXRILFdBQUosRUFBdEI7QUFDRXNILFFBQUFBLGVBQWUsQ0FDWnpGLEVBREgsQ0FDTXFGLElBRE4sRUFDWSxDQURaLEVBQ2U7QUFBQ0ssVUFBQUEsZUFBZSxFQUFDLDJCQUFqQjtBQUE4QzlHLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBekQsU0FEZixFQUNrRixPQURsRixFQUVHSixFQUZILENBRU1nRixLQUZOLEVBRWEsQ0FGYixFQUVnQjtBQUFDVyxVQUFBQSxPQUFPLEVBQUMsUUFBVDtBQUFtQi9HLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUE5QixTQUZoQixFQUUwRCxPQUYxRCxFQUdHSixNQUhILENBR1UwRixRQUhWLEVBR29CLEdBSHBCLEVBR3lCO0FBQUM3RCxVQUFBQSxRQUFRLEVBQUMsR0FBVjtBQUFlTixVQUFBQSxPQUFPLEVBQUM7QUFBdkIsU0FIekIsRUFHc0Q7QUFBQ3hCLFVBQUFBLFNBQVMsRUFBQyxDQUFYO0FBQWM4QixVQUFBQSxRQUFRLEVBQUMsQ0FBdkI7QUFBMEJOLFVBQUFBLE9BQU8sRUFBQyxJQUFsQztBQUF3Q3JCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBbkQsU0FIdEQsRUFHbUgsT0FIbkgsRUFJRzFCLE1BSkgsQ0FJVTZHLFlBSlYsRUFJd0IsQ0FKeEIsRUFJMkI7QUFBQzVHLFVBQUFBLE9BQU8sRUFBQztBQUFULFNBSjNCLEVBSTBDO0FBQUNBLFVBQUFBLE9BQU8sRUFBQyxNQUFUO0FBQWlCQyxVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3dCO0FBQTVCLFNBSjFDLEVBSStFLE9BSi9FLEVBS0czQixNQUxILENBS1U2RyxZQUxWLEVBS3dCLENBTHhCLEVBSzJCO0FBQUNuRSxVQUFBQSxJQUFJLEVBQUU7QUFBUCxTQUwzQixFQUswQztBQUFDQSxVQUFBQSxJQUFJLEVBQUMsU0FBTjtBQUFpQnhDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUE1QixTQUwxQyxFQUtrRixZQUxsRjtBQU1ILE9BVEQsTUFTTyxJQUFJMEcsV0FBVyxLQUFLLEtBQXBCLEVBQTJCO0FBQ2hDTCxRQUFBQSxRQUFRLENBQUNYLFlBQVQsQ0FBc0IsZUFBdEIsRUFBdUMsSUFBdkM7QUFDQSxZQUFJb0IsZUFBZSxHQUFHLElBQUl6SCxXQUFKLEVBQXRCO0FBQ0V5SCxRQUFBQSxlQUFlLENBQ1o1RixFQURILENBQ01xRixJQUROLEVBQ1ksQ0FEWixFQUNlO0FBQUNLLFVBQUFBLGVBQWUsRUFBQyxNQUFqQjtBQUF5QjlHLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBcEMsU0FEZixFQUM2RCxPQUQ3RCxFQUVHSixFQUZILENBRU1nRixLQUZOLEVBRWEsQ0FGYixFQUVnQjtBQUFDVyxVQUFBQSxPQUFPLEVBQUMsUUFBVDtBQUFtQi9HLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBOUIsU0FGaEIsRUFFd0QsT0FGeEQsRUFHR0osRUFISCxDQUdNdUYsWUFITixFQUdvQixDQUhwQixFQUd1QjtBQUFDNUcsVUFBQUEsT0FBTyxFQUFDLElBQVQ7QUFBZXlDLFVBQUFBLElBQUksRUFBQyxNQUFwQjtBQUE0QnhDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBdkMsU0FIdkIsRUFHd0UsT0FIeEU7QUFJSDtBQUNGLEtBekJEOztBQTJCQSxRQUFJUSxNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDM0J0RCxNQUFBQSxVQUFVLENBQUMyQixPQUFYLENBQW1CLFVBQUEyRyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDOUYsZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0NtRixhQUFwQyxDQUFKO0FBQUEsT0FBdkI7QUFDQTNILE1BQUFBLFVBQVUsQ0FBQzJCLE9BQVgsQ0FBbUIsVUFBQTJHLElBQUk7QUFBQSxlQUFJQSxJQUFJLENBQUM5RixnQkFBTCxDQUFzQixZQUF0QixFQUFvQ21GLGFBQXBDLENBQUo7QUFBQSxPQUF2QjtBQUNEOztBQUVEL0gsSUFBQUEsU0FBUyxDQUFDNEMsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQ2dFLENBQUQsRUFBTztBQUN6Q0EsTUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0E4QixNQUFBQSxNQUFNLENBQUMsT0FBRCxDQUFOO0FBQ0EsVUFBTUMsY0FBYyxHQUFHLElBQUk1SCxXQUFKLEVBQXZCO0FBQ0U0SCxNQUFBQSxjQUFjLENBQUNySCxNQUFmLENBQXNCdkIsU0FBdEIsRUFBaUMsRUFBakMsRUFBcUM7QUFBQzZJLFFBQUFBLENBQUMsRUFBQyxDQUFDO0FBQUosT0FBckMsRUFBNkM7QUFBQ0EsUUFBQUEsQ0FBQyxFQUFDLENBQUg7QUFBTXBILFFBQUFBLElBQUksRUFBRTRCLElBQUksQ0FBQ0osT0FBTCxDQUFhSyxNQUFiLENBQW9CLEdBQXBCO0FBQVosT0FBN0MsRUFBb0YsSUFBcEY7O0FBQ0UsVUFBSUcsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCa0YsUUFBQUEsY0FBYyxDQUFDL0YsRUFBZixDQUFrQjNDLFlBQWxCLEVBQWdDLENBQWhDLEVBQW1DO0FBQUNzQixVQUFBQSxPQUFPLEVBQUMsSUFBVDtBQUFleUMsVUFBQUEsSUFBSSxFQUFDLE1BQXBCO0FBQTRCeEMsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF2QyxTQUFuQyxFQUFvRixRQUFwRjtBQUNEO0FBQ04sS0FSRDtBQVNBaEQsSUFBQUEsU0FBUyxDQUFDMkMsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQ2dFLENBQUQsRUFBTTtBQUN4Q0EsTUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0FpQyxNQUFBQSxRQUFRLENBQUMsT0FBRCxDQUFSO0FBQ0EsVUFBTUMsY0FBYyxHQUFHLElBQUkvSCxXQUFKLEVBQXZCO0FBQ0UrSCxNQUFBQSxjQUFjLENBQUN4SCxNQUFmLENBQXNCdEIsU0FBdEIsRUFBaUMsRUFBakMsRUFBcUM7QUFBQzRJLFFBQUFBLENBQUMsRUFBQztBQUFILE9BQXJDLEVBQTRDO0FBQUNBLFFBQUFBLENBQUMsRUFBQyxDQUFIO0FBQU1wSCxRQUFBQSxJQUFJLEVBQUU0QixJQUFJLENBQUNKLE9BQUwsQ0FBYUssTUFBYixDQUFvQixHQUFwQjtBQUFaLE9BQTVDLEVBQW1GLElBQW5GOztBQUNFLFVBQUlHLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUMzQnFGLFFBQUFBLGNBQWMsQ0FBQ2xHLEVBQWYsQ0FBa0IxQyxZQUFsQixFQUFnQyxDQUFoQyxFQUFtQztBQUFDcUIsVUFBQUEsT0FBTyxFQUFDLElBQVQ7QUFBZXlDLFVBQUFBLElBQUksRUFBQyxNQUFwQjtBQUE0QnhDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBdkMsU0FBbkMsRUFBb0YsUUFBcEY7QUFDRDtBQUNOLEtBUkQ7O0FBVUEsUUFBSVEsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCNUQsTUFBQUEsVUFBVSxDQUFDaUMsT0FBWCxDQUFtQixVQUFBaUgsSUFBSSxFQUFJO0FBQ3ZCQSxRQUFBQSxJQUFJLENBQUNqQyxhQUFMLENBQW1CbkUsZ0JBQW5CLENBQW9DLFlBQXBDLEVBQWtELFlBQU07QUFDdEQsY0FBSXFHLGlCQUFpQixHQUFHLElBQUlqSSxXQUFKLEVBQXhCO0FBQ0VpSSxVQUFBQSxpQkFBaUIsQ0FDZHBHLEVBREgsQ0FDTW1HLElBRE4sRUFDWSxDQURaLEVBQ2U7QUFBQ3hELFlBQUFBLEtBQUssRUFBQyxJQUFQO0FBQWF2QixZQUFBQSxJQUFJLEVBQUMsU0FBbEI7QUFBNkJuQixZQUFBQSxPQUFPLEVBQUMsSUFBckM7QUFBMkNyQixZQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXRELFdBRGYsRUFDK0UsSUFEL0UsRUFFR0osRUFGSCxDQUVNbUcsSUFGTixFQUVZLENBRlosRUFFZTtBQUFDeEgsWUFBQUEsT0FBTyxFQUFDLEtBQVQ7QUFBZ0JDLFlBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBM0IsV0FGZixFQUVvRCxJQUZwRDtBQUdILFNBTEQ7QUFNQStGLFFBQUFBLElBQUksQ0FBQ2pDLGFBQUwsQ0FBbUJuRSxnQkFBbkIsQ0FBb0MsWUFBcEMsRUFBa0QsWUFBTTtBQUN0RCxjQUFJc0csaUJBQWlCLEdBQUcsSUFBSWxJLFdBQUosRUFBeEI7QUFDRWtJLFVBQUFBLGlCQUFpQixDQUNkckcsRUFESCxDQUNNbUcsSUFETixFQUNZLENBRFosRUFDZTtBQUFDeEQsWUFBQUEsS0FBSyxFQUFDLENBQVA7QUFBVXZCLFlBQUFBLElBQUksRUFBQyxNQUFmO0FBQXVCbkIsWUFBQUEsT0FBTyxFQUFDLElBQS9CO0FBQXFDckIsWUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUFoRCxXQURmLEVBQ3lFLElBRHpFLEVBRUdKLEVBRkgsQ0FFTW1HLElBRk4sRUFFWSxDQUZaLEVBRWU7QUFBQ3hILFlBQUFBLE9BQU8sRUFBQyxNQUFUO0FBQWlCQyxZQUFBQSxJQUFJLEVBQUU0QixJQUFJLENBQUNKLE9BQUwsQ0FBYUssTUFBYixDQUFvQixHQUFwQjtBQUF2QixXQUZmLEVBRWlFLElBRmpFO0FBR0gsU0FMRDtBQU1ILE9BYkQ7QUFjRDs7QUFFRDNDLElBQUFBLFVBQVUsQ0FBQ2tELGtCQUFYLENBQThCLFVBQTlCO0FBQ0FsRCxJQUFBQSxVQUFVLENBQUNrRCxrQkFBWCxDQUE4QixVQUE5Qjs7QUFFQSxhQUFTc0YsYUFBVCxDQUF1QnZDLENBQXZCLEVBQTBCO0FBQ3hCLFVBQUl3QyxTQUFTLEdBQUcsS0FBS0Msa0JBQXJCO0FBQ0EsVUFBSUMsU0FBUyxHQUFHRixTQUFTLENBQUNDLGtCQUExQjtBQUNBdEYsTUFBQUEsUUFBUSxDQUFDbEIsRUFBVCxDQUFZdUcsU0FBWixFQUF1QixDQUF2QixFQUEwQjtBQUFDN0YsUUFBQUEsS0FBSyxFQUFDLENBQVA7QUFBVTlCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUFyQixPQUExQjtBQUNBb0MsTUFBQUEsUUFBUSxDQUFDbEIsRUFBVCxDQUFZeUcsU0FBWixFQUF1QixDQUF2QixFQUEwQjtBQUFDL0YsUUFBQUEsS0FBSyxFQUFDLENBQVA7QUFBVTlCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUFyQixPQUExQjtBQUNEOztBQUVELFFBQUk4QixNQUFNLENBQUNDLFVBQVAsR0FBb0IsR0FBeEIsRUFBNkI7QUFDM0IvQyxNQUFBQSxVQUFVLENBQUNpQyxnQkFBWCxDQUE0QixZQUE1QixFQUEwQ3VHLGFBQTFDO0FBQ0Q7O0FBRUQzQyxJQUFBQSxnQkFBZ0IsQ0FBQ3pFLE9BQWpCLENBQXlCLFVBQUF3SCxJQUFJLEVBQUk7QUFDL0IsVUFBSUMsS0FBSyxHQUFHaEQsZ0JBQWdCLENBQUNoRSxNQUE3QjtBQUNBLFVBQUlpSCxjQUFjLEdBQUcsTUFBTUQsS0FBM0I7O0FBQ0EsVUFBSUEsS0FBSyxHQUFHLEVBQVosRUFBZ0I7QUFDYkQsUUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCSCxJQUFJLENBQUNuQyxZQUFMLENBQWtCLFlBQWxCLElBQWtDLElBQWxDLEdBQXlDb0MsS0FBMUQ7QUFDRixPQUZELE1BRU87QUFDSkQsUUFBQUEsSUFBSSxDQUFDRyxTQUFMLEdBQWlCSCxJQUFJLENBQUNuQyxZQUFMLENBQWtCLFlBQWxCLElBQWtDLEdBQWxDLEdBQXdDb0MsS0FBekQ7QUFDRjs7QUFDRCxVQUFJL0YsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCNkYsUUFBQUEsSUFBSSxDQUFDM0csZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0MsVUFBQ2dFLENBQUQsRUFBTztBQUN6QyxjQUFJaEIsV0FBVyxHQUFHZ0IsQ0FBQyxDQUFDcUIsTUFBcEI7QUFDQSxjQUFJMEIsU0FBUyxHQUFHL0QsV0FBVyxDQUFDbUIsYUFBNUI7QUFDQSxjQUFJckMsS0FBSyxHQUFHa0IsV0FBVyxDQUFDd0IsWUFBWixDQUF5QixZQUF6QixDQUFaO0FBQ0EsY0FBSXZCLGtCQUFrQixHQUFHOEQsU0FBUyxDQUFDM0ssaUJBQW5DO0FBQ0EsY0FBSXVGLFVBQVUsR0FBR29GLFNBQVMsQ0FBQzVDLGFBQTNCO0FBQ0EsY0FBSXFDLFNBQVMsR0FBRzdFLFVBQVUsQ0FBQzhFLGtCQUEzQjtBQUNBLGNBQUlDLFNBQVMsR0FBR0YsU0FBUyxDQUFDQyxrQkFBMUI7QUFDQSxjQUFJTyxZQUFZLGFBQU1ILGNBQWMsR0FBQy9FLEtBQXJCLE1BQWhCO0FBQ0EsY0FBSW1GLFdBQVcsR0FBR3RGLFVBQVUsQ0FBQzdGLGFBQVgsQ0FBeUIsU0FBekIsRUFBb0MwSSxZQUFwQyxDQUFpRCxZQUFqRCxDQUFsQjtBQUNBLGNBQUkwQyxhQUFhLGFBQU1MLGNBQWMsR0FBQ0ksV0FBckIsTUFBakI7O0FBRUEsY0FBSW5GLEtBQUssR0FBR21GLFdBQVosRUFBeUI7QUFDdkI5RixZQUFBQSxRQUFRLENBQUNsQixFQUFULENBQVl1RyxTQUFaLEVBQXVCLENBQXZCLEVBQTBCO0FBQUM3RixjQUFBQSxLQUFLLFlBQUlxRyxZQUFKLENBQU47QUFBMEJuSSxjQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXJDLGFBQTFCO0FBQ0FjLFlBQUFBLFFBQVEsQ0FBQ2xCLEVBQVQsQ0FBWXlHLFNBQVosRUFBdUIsQ0FBdkIsRUFBMEI7QUFBQy9GLGNBQUFBLEtBQUssWUFBSXFHLFlBQUosQ0FBTjtBQUEwQm5JLGNBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBckMsYUFBMUI7QUFDRCxXQUhELE1BR087QUFDTGMsWUFBQUEsUUFBUSxDQUFDbEIsRUFBVCxDQUFZdUcsU0FBWixFQUF1QixDQUF2QixFQUEwQjtBQUFDN0YsY0FBQUEsS0FBSyxZQUFJdUcsYUFBSixDQUFOO0FBQTJCckksY0FBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF0QyxhQUExQjtBQUNBYyxZQUFBQSxRQUFRLENBQUNsQixFQUFULENBQVl5RyxTQUFaLEVBQXVCLENBQXZCLEVBQTBCO0FBQUMvRixjQUFBQSxLQUFLLFlBQUlxRyxZQUFKLENBQU47QUFBMEJuSSxjQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXJDLGFBQTFCO0FBQ0Q7QUFDRixTQW5CRDtBQW9CRDtBQUNGLEtBOUJEO0FBZ0NBc0QsSUFBQUEsY0FBYyxDQUFDeEUsT0FBZixDQUF1QixVQUFBZ0ksRUFBRSxFQUFJO0FBQzNCLFVBQUlSLElBQUksR0FBR1EsRUFBRSxDQUFDL0ssaUJBQWQ7QUFDQSxVQUFJMEYsS0FBSyxHQUFHNkUsSUFBSSxDQUFDbkMsWUFBTCxDQUFrQixZQUFsQixDQUFaO0FBQ0EyQyxNQUFBQSxFQUFFLENBQUNsRyxrQkFBSCxDQUFzQixZQUF0QjtBQUNBMEYsTUFBQUEsSUFBSSxDQUFDUyxlQUFMLENBQXFCLE1BQXJCO0FBQ0QsS0FMRDtBQU9BdkQsSUFBQUEsWUFBWSxDQUFDMUUsT0FBYixDQUFxQixVQUFBMkMsS0FBSyxFQUFJO0FBQzVCLFVBQUl1RixPQUFPLEdBQUd4RCxZQUFZLENBQUNqRSxNQUEzQjtBQUNBLFVBQUkwSCxPQUFPLEdBQUd4RixLQUFLLENBQUNxQyxhQUFOLENBQW9CQSxhQUFwQixDQUFrQ0EsYUFBbEMsQ0FBZ0RBLGFBQWhELENBQThEQSxhQUE1RTs7QUFDQSxVQUFJa0QsT0FBTyxHQUFHLEVBQWQsRUFBa0I7QUFDaEJ2RixRQUFBQSxLQUFLLENBQUNnRixTQUFOLEdBQWtCUSxPQUFPLENBQUM5QyxZQUFSLENBQXFCLFlBQXJCLElBQXFDLElBQXJDLEdBQTRDNkMsT0FBOUQ7QUFDRCxPQUZELE1BRU87QUFDTHZGLFFBQUFBLEtBQUssQ0FBQ2dGLFNBQU4sR0FBa0JRLE9BQU8sQ0FBQzlDLFlBQVIsQ0FBcUIsWUFBckIsSUFBcUMsR0FBckMsR0FBMkM2QyxPQUE3RDtBQUNEO0FBQ0YsS0FSRDs7QUFVQSxRQUFNRSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBYUMsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBc0I7QUFDeEMsVUFBSUMsY0FBYyxHQUFHL0wsUUFBUSxDQUFDQyxhQUFULFdBQTBCMEwsSUFBMUIsRUFBckI7QUFDQ0ksTUFBQUEsY0FBYyxDQUFDbkQsWUFBZixXQUErQmdELElBQS9CLEdBQXVDRyxjQUFjLENBQUNwRCxZQUFmLFdBQStCaUQsSUFBL0IsT0FBMkNDLENBQTNDLEdBQStDQyxDQUEvQyxHQUFtREQsQ0FBMUY7QUFDRixLQUhEOztBQUtBNUssSUFBQUEsUUFBUSxDQUFDa0QsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsVUFBQ2dFLENBQUQsRUFBTztBQUN4Q0EsTUFBQUEsQ0FBQyxDQUFDQyxjQUFGO0FBQ0EsVUFBSTRELFVBQVUsR0FBRyxJQUFJekosV0FBSixFQUFqQjtBQUNBeUosTUFBQUEsVUFBVSxDQUNQNUgsRUFESCxDQUNNekQsVUFETixFQUNrQixHQURsQixFQUN1QjtBQUFDa0MsUUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBY0csUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF6QixPQUR2QixFQUMwRCxRQUQxRCxFQUVHSixFQUZILENBRU1yRCxXQUZOLEVBRW1CLENBRm5CLEVBRXNCO0FBQUM4QixRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsUUFBQUEsUUFBUSxFQUFDLEdBQXZCO0FBQTRCRixRQUFBQSxPQUFPLEVBQUMsSUFBcEM7QUFBMENyQixRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXJELE9BRnRCLEVBRXFGLFFBRnJGLEVBR0cxQixNQUhILENBR1U1QixZQUhWLEVBR3dCLENBSHhCLEVBRzJCO0FBQUMyQixRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsUUFBQUEsUUFBUSxFQUFDLENBQUMsR0FBeEI7QUFBNkJGLFFBQUFBLE9BQU8sRUFBQztBQUFyQyxPQUgzQixFQUd1RTtBQUFDeEIsUUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFFBQUFBLFFBQVEsRUFBQyxDQUF2QjtBQUEwQkYsUUFBQUEsT0FBTyxFQUFDLElBQWxDO0FBQXdDckIsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUFuRCxPQUh2RSxFQUdvSSxhQUhwSSxFQUlHMUIsTUFKSCxDQUlVM0IsY0FKVixFQUkwQixDQUoxQixFQUk2QjtBQUFDMEIsUUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFFBQUFBLFFBQVEsRUFBQyxFQUF2QjtBQUEyQkYsUUFBQUEsT0FBTyxFQUFDO0FBQW5DLE9BSjdCLEVBSXVFO0FBQUN4QixRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsUUFBQUEsUUFBUSxFQUFDLENBQXZCO0FBQTBCRixRQUFBQSxPQUFPLEVBQUMsSUFBbEM7QUFBd0NyQixRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQW5ELE9BSnZFLEVBSW9JLGFBSnBJLEVBS0cxQixNQUxILENBS1UxQixrQkFMVixFQUs4QixDQUw5QixFQUtpQztBQUFDMkIsUUFBQUEsT0FBTyxFQUFDO0FBQVQsT0FMakMsRUFLZ0Q7QUFBQ0EsUUFBQUEsT0FBTyxFQUFDLE1BQVQ7QUFBaUJDLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBNUIsT0FMaEQsRUFLc0YsWUFMdEY7QUFPRCxLQVZEO0FBWUFyRCxJQUFBQSxjQUFjLENBQUNnRCxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxVQUFDZ0UsQ0FBRCxFQUFPO0FBQzlDQSxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxVQUFJNkQsVUFBVSxHQUFHLElBQUkxSixXQUFKLEVBQWpCO0FBQ0EwSixNQUFBQSxVQUFVLENBQ1A3SCxFQURILENBQ016RCxVQUROLEVBQ2tCLEdBRGxCLEVBQ3VCO0FBQUNrQyxRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjRyxRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQXpCLE9BRHZCLEVBQzBELFFBRDFELEVBRUdKLEVBRkgsQ0FFTWhELGtCQUZOLEVBRTBCLEdBRjFCLEVBRStCO0FBQUNvRSxRQUFBQSxJQUFJLEVBQUMsTUFBTjtBQUFjeEMsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUF6QixPQUYvQixFQUVrRSxRQUZsRSxFQUdHSixFQUhILENBR01oRCxrQkFITixFQUcwQixHQUgxQixFQUcrQjtBQUFDMkIsUUFBQUEsT0FBTyxFQUFDLElBQVQ7QUFBZUMsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUExQixPQUgvQixFQUdtRSxRQUhuRSxFQUlHSixFQUpILENBSU1sRCxZQUpOLEVBSW9CLENBSnBCLEVBSXVCO0FBQUMyQixRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsUUFBQUEsUUFBUSxFQUFDLENBQUMsR0FBeEI7QUFBNkJGLFFBQUFBLE9BQU8sRUFBQyxJQUFyQztBQUEyQ3JCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDQztBQUF0RCxPQUp2QixFQUl5RixhQUp6RixFQUtHa0IsRUFMSCxDQUtNckQsV0FMTixFQUttQixDQUxuQixFQUtzQjtBQUFDOEIsUUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFFBQUFBLFFBQVEsRUFBQyxDQUF2QjtBQUEwQkYsUUFBQUEsT0FBTyxFQUFDLElBQWxDO0FBQXdDckIsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDO0FBQW5ELE9BTHRCLEVBS3FGLGFBTHJGO0FBT0QsS0FWRDs7QUFZQSxRQUFJOEIsTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCakQsTUFBQUEsZUFBZSxDQUFDc0IsT0FBaEIsQ0FBd0IsVUFBQXdILElBQUksRUFBSTtBQUM5QkEsUUFBQUEsSUFBSSxDQUFDM0csZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0MsVUFBQ2dFLENBQUQsRUFBTztBQUN2QyxjQUFJMkMsSUFBSSxHQUFHM0MsQ0FBQyxDQUFDcUIsTUFBYjtBQUNBLGNBQUkwQyxhQUFhLEdBQUcsSUFBSTFFLFNBQUosQ0FBY3NELElBQWQsRUFBb0I7QUFBQ3JELFlBQUFBLElBQUksRUFBQztBQUFOLFdBQXBCLENBQXBCO0FBQ0EsY0FBSUMsS0FBSyxHQUFHd0UsYUFBYSxDQUFDeEUsS0FBMUI7QUFDQXBDLFVBQUFBLFFBQVEsQ0FBQ1osV0FBVCxDQUFxQmdELEtBQXJCLEVBQTRCLEdBQTVCLEVBQWlDO0FBQUNYLFlBQUFBLEtBQUssRUFBQyxDQUFQO0FBQVVxRCxZQUFBQSxDQUFDLEVBQUMsSUFBWjtBQUFrQnBILFlBQUFBLElBQUksRUFBRTRCLElBQUksQ0FBQ0osT0FBTCxDQUFhSyxNQUFiLENBQW9CLEdBQXBCO0FBQXhCLFdBQWpDLEVBQW9GLElBQXBGO0FBQ0gsU0FMRDtBQU1ELE9BUEQ7QUFRRDs7QUFFRGxFLElBQUFBLFVBQVUsQ0FBQ3dELGdCQUFYLENBQTRCLE9BQTVCLEVBQXFDLFVBQUNnRSxDQUFELEVBQU87QUFDMUN1RCxNQUFBQSxXQUFXLENBQUMsY0FBRCxFQUFpQixhQUFqQixFQUFnQyxRQUFoQyxFQUEwQyxNQUExQyxDQUFYO0FBQ0F2RCxNQUFBQSxDQUFDLENBQUNDLGNBQUY7O0FBQ0EsVUFBSXZILFVBQVUsQ0FBQzhILFlBQVgsQ0FBd0IsYUFBeEIsTUFBMkMsTUFBL0MsRUFBdUQ7QUFDckQsWUFBSXdELE9BQU8sR0FBRyxJQUFJNUosV0FBSixFQUFkO0FBQ0E0SixRQUFBQSxPQUFPLENBQ0pDLFNBREgsQ0FDYWpLLFlBRGIsRUFDMkIsQ0FEM0IsRUFDOEI7QUFBQ3dDLFVBQUFBLFFBQVEsRUFBQyxHQUFWO0FBQWVOLFVBQUFBLE9BQU8sRUFBQyxJQUF2QjtBQUE2QnJCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBeEMsU0FEOUIsRUFDZ0YsR0FEaEYsRUFDcUYsT0FEckYsRUFFR0osRUFGSCxDQUVNbEMsVUFGTixFQUVrQixDQUZsQixFQUVxQjtBQUFDNEgsVUFBQUEsZUFBZSxFQUFDLE1BQWpCO0FBQXlCOUcsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUFwQyxTQUZyQixFQUVtRSxPQUZuRSxFQUdHMUIsTUFISCxDQUdVakMsVUFIVixFQUdzQixDQUh0QixFQUd5QjtBQUFDZ0MsVUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFVBQUFBLFFBQVEsRUFBQyxDQUFDLEdBQXhCO0FBQTZCRixVQUFBQSxPQUFPLEVBQUM7QUFBckMsU0FIekIsRUFHcUU7QUFBQ3hCLFVBQUFBLFNBQVMsRUFBQyxDQUFYO0FBQWMwQixVQUFBQSxRQUFRLEVBQUMsQ0FBdkI7QUFBMEJGLFVBQUFBLE9BQU8sRUFBQyxJQUFsQztBQUF3Q3JCLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBbkQsU0FIckUsRUFHa0ksT0FIbEksRUFJRzFCLE1BSkgsQ0FJVWhDLFFBSlYsRUFJb0IsQ0FKcEIsRUFJdUI7QUFBQytCLFVBQUFBLFNBQVMsRUFBQyxDQUFYO0FBQWMwQixVQUFBQSxRQUFRLEVBQUMsQ0FBQyxFQUF4QjtBQUE0QkYsVUFBQUEsT0FBTyxFQUFDO0FBQXBDLFNBSnZCLEVBSWtFO0FBQUN4QixVQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsVUFBQUEsUUFBUSxFQUFDLENBQXZCO0FBQTBCRixVQUFBQSxPQUFPLEVBQUMsSUFBbEM7QUFBd0NyQixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQW5ELFNBSmxFLEVBSStILFlBSi9ILEVBS0cxQixNQUxILENBS1UvQixXQUxWLEVBS3VCLENBTHZCLEVBSzBCO0FBQUM4QixVQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsVUFBQUEsUUFBUSxFQUFDLENBQUMsRUFBeEI7QUFBNEJGLFVBQUFBLE9BQU8sRUFBQztBQUFwQyxTQUwxQixFQUtxRTtBQUFDeEIsVUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFVBQUFBLFFBQVEsRUFBQyxDQUF2QjtBQUEwQkYsVUFBQUEsT0FBTyxFQUFDLElBQWxDO0FBQXdDckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUN1QjtBQUFuRCxTQUxyRSxFQUtrSSxZQUxsSSxFQU1HMUIsTUFOSCxDQU1VOUIsVUFOVixFQU1zQixDQU50QixFQU15QjtBQUFDK0IsVUFBQUEsT0FBTyxFQUFDO0FBQVQsU0FOekIsRUFNd0M7QUFBQ0EsVUFBQUEsT0FBTyxFQUFDLE1BQVQ7QUFBaUJDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBNUIsU0FOeEMsRUFNOEUsYUFOOUU7QUFRRCxPQVZELE1BVU8sSUFBSTNELFVBQVUsQ0FBQzhILFlBQVgsQ0FBd0IsYUFBeEIsTUFBMkMsUUFBL0MsRUFBeUQ7QUFDOUQsWUFBSTBELE9BQU8sR0FBRyxJQUFJOUosV0FBSixFQUFkO0FBQ0E4SixRQUFBQSxPQUFPLENBQ0pELFNBREgsQ0FDYWpLLFlBRGIsRUFDMkIsQ0FEM0IsRUFDOEI7QUFBQ3dDLFVBQUFBLFFBQVEsRUFBQyxDQUFWO0FBQWFOLFVBQUFBLE9BQU8sRUFBQyxJQUFyQjtBQUEyQnJCLFVBQUFBLElBQUksRUFBRTRCLElBQUksQ0FBQ0osT0FBTCxDQUFhSyxNQUFiLENBQW9CLEdBQXBCO0FBQWpDLFNBRDlCLEVBQzBGLEVBRDFGLEVBQzhGLFlBRDlGLEVBRUdULEVBRkgsQ0FFTXBELFVBRk4sRUFFa0IsR0FGbEIsRUFFdUI7QUFBQytCLFVBQUFBLE9BQU8sRUFBQyxJQUFUO0FBQWVDLFVBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBMUIsU0FGdkIsRUFFMkQsT0FGM0QsRUFHR0osRUFISCxDQUdNdEQsUUFITixFQUdnQixDQUhoQixFQUdtQjtBQUFDK0IsVUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFVBQUFBLFFBQVEsRUFBQyxDQUFDLEdBQXhCO0FBQTZCRixVQUFBQSxPQUFPLEVBQUMsSUFBckM7QUFBMkNyQixVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0M7QUFBdEQsU0FIbkIsRUFHcUYsWUFIckYsRUFJR2tCLEVBSkgsQ0FJTXZELFVBSk4sRUFJa0IsQ0FKbEIsRUFJcUI7QUFBQ2dDLFVBQUFBLFNBQVMsRUFBQyxDQUFYO0FBQWMwQixVQUFBQSxRQUFRLEVBQUMsQ0FBQyxHQUF4QjtBQUE2QkYsVUFBQUEsT0FBTyxFQUFDLElBQXJDO0FBQTJDckIsVUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDO0FBQXRELFNBSnJCLEVBSXVGLFlBSnZGLEVBS0drQixFQUxILENBS01sQyxVQUxOLEVBS2tCLENBTGxCLEVBS3FCO0FBQUM0SCxVQUFBQSxlQUFlLEVBQUMsYUFBakI7QUFBZ0M5RyxVQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ3VCO0FBQTNDLFNBTHJCLEVBSzBFLFdBTDFFO0FBT0Q7QUFDRixLQXZCRDtBQXlCQTVELElBQUFBLFdBQVcsQ0FBQ3VELGdCQUFaLENBQTZCLE9BQTdCLEVBQXNDLFVBQUNnRSxDQUFELEVBQU87QUFDM0N1RCxNQUFBQSxXQUFXLENBQUMsY0FBRCxFQUFpQixhQUFqQixFQUFnQyxRQUFoQyxFQUEwQyxNQUExQyxDQUFYO0FBQ0F2RCxNQUFBQSxDQUFDLENBQUNDLGNBQUY7QUFDQSxVQUFJa0UsTUFBTSxHQUFHLElBQUkvSixXQUFKLEVBQWI7QUFDQStKLE1BQUFBLE1BQU0sQ0FDSEYsU0FESCxDQUNhakssWUFEYixFQUMyQixDQUQzQixFQUM4QjtBQUFDd0MsUUFBQUEsUUFBUSxFQUFDLENBQVY7QUFBYU4sUUFBQUEsT0FBTyxFQUFDLElBQXJCO0FBQTJCckIsUUFBQUEsSUFBSSxFQUFFNEIsSUFBSSxDQUFDSixPQUFMLENBQWFLLE1BQWIsQ0FBb0IsR0FBcEI7QUFBakMsT0FEOUIsRUFDMEYsRUFEMUYsRUFDOEYsWUFEOUYsRUFFR1QsRUFGSCxDQUVNcEQsVUFGTixFQUVrQixHQUZsQixFQUV1QjtBQUFDK0IsUUFBQUEsT0FBTyxFQUFDLElBQVQ7QUFBZXlDLFFBQUFBLElBQUksRUFBQyxNQUFwQjtBQUE0QnhDLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBdkMsT0FGdkIsRUFFd0UsT0FGeEUsRUFHR0osRUFISCxDQUdNdEQsUUFITixFQUdnQixDQUhoQixFQUdtQjtBQUFDK0IsUUFBQUEsU0FBUyxFQUFDLENBQVg7QUFBYzBCLFFBQUFBLFFBQVEsRUFBQyxHQUF2QjtBQUE0QkYsUUFBQUEsT0FBTyxFQUFDLElBQXBDO0FBQTBDckIsUUFBQUEsSUFBSSxFQUFFQyxJQUFJLENBQUNDO0FBQXJELE9BSG5CLEVBR29GLFlBSHBGLEVBSUdrQixFQUpILENBSU12RCxVQUpOLEVBSWtCLENBSmxCLEVBSXFCO0FBQUNnQyxRQUFBQSxTQUFTLEVBQUMsQ0FBWDtBQUFjMEIsUUFBQUEsUUFBUSxFQUFDLEdBQXZCO0FBQTRCRixRQUFBQSxPQUFPLEVBQUMsSUFBcEM7QUFBMENyQixRQUFBQSxJQUFJLEVBQUVDLElBQUksQ0FBQ0M7QUFBckQsT0FKckIsRUFJc0YsWUFKdEYsRUFLR2tCLEVBTEgsQ0FLTWxDLFVBTE4sRUFLa0IsQ0FMbEIsRUFLcUI7QUFBQzRILFFBQUFBLGVBQWUsRUFBQyxhQUFqQjtBQUFnQzlHLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBM0MsT0FMckIsRUFLMEUsV0FMMUU7QUFPRCxLQVhEO0FBYUE1RCxJQUFBQSxXQUFXLENBQUN1RCxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxZQUFNO0FBQy9DLFVBQUlhLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUMzQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlzSCxpQkFBaUIsR0FBRyxJQUFJaEssV0FBSixFQUF4QjtBQUNFZ0ssUUFBQUEsaUJBQWlCLENBQ2RuSSxFQURILENBQ01wRCxVQUROLEVBQ2tCLENBRGxCLEVBQ3FCO0FBQUN3RSxVQUFBQSxJQUFJLEVBQUMsU0FBTjtBQUFpQnVCLFVBQUFBLEtBQUssRUFBQyxJQUF2QjtBQUE2QjFDLFVBQUFBLE9BQU8sRUFBQyxJQUFyQztBQUEyQ3JCLFVBQUFBLElBQUksRUFBRTRCLElBQUksQ0FBQ0osT0FBTCxDQUFhSyxNQUFiLENBQW9CLEdBQXBCO0FBQWpELFNBRHJCO0FBRUg7QUFDRixLQVJEO0FBVUFqRSxJQUFBQSxXQUFXLENBQUN1RCxnQkFBWixDQUE2QixZQUE3QixFQUEyQyxZQUFNO0FBQy9DLFVBQUlhLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixHQUF4QixFQUE2QjtBQUMzQjtBQUNELE9BRkQsTUFFTztBQUNMLFlBQUlzSCxpQkFBaUIsR0FBRyxJQUFJaEssV0FBSixFQUF4QjtBQUNFZ0ssUUFBQUEsaUJBQWlCLENBQ2RuSSxFQURILENBQ01wRCxVQUROLEVBQ2tCLENBRGxCLEVBQ3FCO0FBQUN3RSxVQUFBQSxJQUFJLEVBQUMsTUFBTjtBQUFjdUIsVUFBQUEsS0FBSyxFQUFDLENBQXBCO0FBQXVCMUMsVUFBQUEsT0FBTyxFQUFDLElBQS9CO0FBQXFDckIsVUFBQUEsSUFBSSxFQUFFNEIsSUFBSSxDQUFDSixPQUFMLENBQWFLLE1BQWIsQ0FBb0IsR0FBcEI7QUFBM0MsU0FEckI7QUFFSDtBQUNGLEtBUkQ7O0FBVUEsYUFBUzJILGFBQVQsQ0FBdUJyRSxDQUF2QixFQUEwQjtBQUN4QixVQUFJc0UsVUFBVSxHQUFHek0sUUFBUSxDQUFDME0sYUFBVCxDQUF1QixNQUF2QixDQUFqQjtBQUNBRCxNQUFBQSxVQUFVLENBQUNFLFNBQVgsQ0FBcUJDLEdBQXJCLENBQXlCLGdCQUF6QjtBQUNBLFdBQUtDLE1BQUwsQ0FBWUosVUFBWjtBQUNBLFVBQUlLLGNBQWMsR0FBRyxJQUFJdkssV0FBSixFQUFyQjtBQUNFdUssTUFBQUEsY0FBYyxDQUNYMUksRUFESCxDQUNNcUksVUFETixFQUNrQixDQURsQixFQUNxQjtBQUFDM0gsUUFBQUEsS0FBSyxFQUFDLE1BQVA7QUFBZTlCLFFBQUFBLElBQUksRUFBRUMsSUFBSSxDQUFDdUI7QUFBMUIsT0FEckI7QUFHSDs7QUFFRCxhQUFTdUksZUFBVCxDQUF5QjVFLENBQXpCLEVBQTRCO0FBQzFCLFVBQUk2RSxTQUFTLEdBQUcsS0FBSy9NLGFBQUwsQ0FBbUIsaUJBQW5CLENBQWhCO0FBQ0ErTSxNQUFBQSxTQUFTLENBQUNDLE1BQVY7QUFDRDs7QUFFRCxRQUFJakksTUFBTSxDQUFDQyxVQUFQLEdBQW9CLEdBQXhCLEVBQTZCO0FBQzNCbEQsTUFBQUEsTUFBTSxDQUFDdUIsT0FBUCxDQUFlLFVBQUF3SCxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDM0csZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0NxSSxhQUFwQyxDQUFKO0FBQUEsT0FBbkI7QUFDQXpLLE1BQUFBLE1BQU0sQ0FBQ3VCLE9BQVAsQ0FBZSxVQUFBd0gsSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQzNHLGdCQUFMLENBQXNCLFlBQXRCLEVBQW9DNEksZUFBcEMsQ0FBSjtBQUFBLE9BQW5CO0FBQ0Q7O0FBRUQ5SyxJQUFBQSxZQUFZO0FBQ1o4QyxJQUFBQSxVQUFVO0FBQ1gsR0ExWUQ7O0FBNFlBLFNBQU87QUFDTFUsSUFBQUEsSUFBSSxFQUFFQTtBQURELEdBQVA7QUFHRCxDQXpmVyxFQUFaOztBQTJmQVQsTUFBTSxDQUFDa0ksTUFBUCxHQUFnQixZQUFNO0FBQ3BCcE4sRUFBQUEsR0FBRyxDQUFDMkYsSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYXBwID0gKGZ1bmN0aW9uICgpIHtcblxuICBjb25zdCAkbG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlcicpO1xuICBjb25zdCAkbG9hZGVyU1ZHID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvYWRlclNWRycpO1xuICBjb25zdCAkbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluJyk7XG4gIGNvbnN0ICRoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkZXInKTtcbiAgY29uc3QgJG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpO1xuICBjb25zdCAkbG9nbyA9ICRoZWFkZXIuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gIGNvbnN0ICRmaXJzdFNlY3Rpb24gPSAkbWFpbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgY29uc3QgJGZpcnN0Q29udGVudCA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLndvcmstY29udGVudCcpO1xuICBjb25zdCAkZmlyc3RCZ1N2ZyA9ICRmaXJzdFNlY3Rpb24ucXVlcnlTZWxlY3RvcignLmFydGljbGUtYmcnKTtcbiAgY29uc3QgJGFib3V0TGluayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dCcpO1xuICBjb25zdCAkYWJvdXRDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fY2xvc2UnKTtcbiAgY29uc3QgJGFib3V0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dF9fcGFnZScpO1xuICBjb25zdCAkYWJvdXRCZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNhYm91dC1iZycpO1xuICBjb25zdCAkYWJvdXRJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYm91dC1pbm5lcicpO1xuICBjb25zdCAkZXhpdEFib3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4aXRBYm91dCcpO1xuICBjb25zdCAkY29udGFjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0Jyk7XG4gIGNvbnN0ICRjb250YWN0UGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250YWN0LWZvcm0nKTtcbiAgY29uc3QgJGhpZGVGb3JtQXJyb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1mb3JtLWFycm93Jyk7XG4gIGNvbnN0ICRoaWRlRm9ybUFycm93UGF0aCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRlRm9ybUFycm93Jyk7XG4gIGNvbnN0IGFycm93UGF0aHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xzLWFycm93Jyk7XG4gIGNvbnN0IHByZXZBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1iYWNrJyk7XG4gIGNvbnN0IG5leHRBcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hcnJvdy1uZXh0Jyk7XG4gIGNvbnN0IHByZXZBcnJvd1N2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmV2QXJyb3cnKTtcbiAgY29uc3QgbmV4dEFycm93U3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25leHRBcnJvdycpO1xuICBjb25zdCAkd29ya0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstY29udGVudCcpO1xuICBjb25zdCAkd29ya1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay10ZXh0Jyk7XG4gIGNvbnN0ICR3b3JrVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstdGl0bGUnKTtcbiAgY29uc3QgJHdvcmtCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndvcmstYnRuJyk7XG4gIGNvbnN0ICRsaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgY29uc3QgJGFib3V0UGFnZUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYS5saW5rJyk7XG5cbiAgY29uc3QgbG9hZGVyTW9kdWxlID0gKCkgPT4ge1xuICAgIGNvbnN0ICRmb290ZXJOYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcub25lcGFnZS1wYWdpbmF0aW9uJyk7XG4gICAgY29uc3QgJGZvb3RlckxpbmtzID0gJGZvb3Rlck5hdi5jaGlsZHJlbjtcbiAgICBjb25zdCAkZmlyc3RGb290ZXJOYXZJdGVtID0gJGZvb3Rlck5hdi5maXJzdEVsZW1lbnRDaGlsZC5maXJzdEVsZW1lbnRDaGlsZDtcblxuICAgIGNvbnN0IGxvYWRpbmdUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMCxcbiAgICAgIHNtb290aENoaWxkVGltaW5nOiB0cnVlLFxuICAgICAgcmVwZWF0OiAtMSxcbiAgICAgIHlveW86IHRydWUsXG4gICAgfSk7XG4gICAgbG9hZGluZ1RsXG4gICAgICAuc2V0KCRsb2FkZXJTVkcsIHthdXRvQWxwaGE6MX0pXG4gICAgICAuZnJvbVRvKCRsb2FkZXJTVkcsIDIsIHtkcmF3U1ZHOicwJSAwJSd9LHsgZHJhd1NWRzonMCUgMTAwJScsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgY29uc3QgcmVnZXggPSAvKFxcL3dwLWNvbnRlbnQpKFsvfC58XFx3fFxcc3wtXSkqXFwuKD86anBnfGdpZnxwbmcpL2c7XG4gICAgY29uc3QgJGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy53b3JrLWNvbnRlbnQnKTtcbiAgICBsZXQgaW1nU3JjcyA9IFtdO1xuICAgICRpbWFnZXMuZm9yRWFjaChpbWFnZSA9PiBpbWdTcmNzLnB1c2goaW1hZ2Uuc3R5bGUuY3NzVGV4dC5tYXRjaChyZWdleCkpKTtcbiAgICBjb25zdCBsb2FkZXJUbCA9IG5ldyBUaW1lbGluZU1heCh7XG4gICAgICBkZWxheTogMlxuICAgIH0pO1xuICAgIGxldCBsb2FkZWRJbWFnZXMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW1nU3Jjcy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IHRtcCA9IG5ldyBJbWFnZSgpO1xuICAgICAgdG1wLnNyYyA9IGltZ1NyY3NbaV1bMF07XG4gICAgICB0bXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbG9hZGVkSW1hZ2VzKys7XG4gICAgICAgIGlmIChsb2FkZWRJbWFnZXMgPT09IGltZ1NyY3MubGVuZ3RoKSB7XG4gICAgICAgICAgbG9hZGVyVGxcbiAgICAgICAgICAudG8oJGxvYWRlciwgMywge2F1dG9BbHBoYTowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAuZnJvbSgkbG9nbywgMywge3hQZXJjZW50OiAtMTAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTInKVxuICAgICAgICAgIC5mcm9tKCRhYm91dExpbmssIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0zJylcbiAgICAgICAgICAuZnJvbShwcmV2QXJyb3csIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTMuNScpXG4gICAgICAgICAgLmZyb20obmV4dEFycm93LCAzLCB7eFBlcmNlbnQ6IDEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQrPTMuNScpXG4gICAgICAgICAgLmZyb20oJGZpcnN0QmdTdmcsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz0zLjUnKVxuICAgICAgICAgIC5mcm9tKCRmaXJzdENvbnRlbnQsIDMsIHt4UGVyY2VudDogLTEwMCwgYXV0b0FscGhhOjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Kz00JylcbiAgICAgICAgICAuc3RhZ2dlckZyb20oJGZvb3RlckxpbmtzLCAxLCB7eVBlcmNlbnQ6MjAwLCBhdXRvQWxwaGE6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNSl9LCAuMSwgJ3N0YXJ0Kz00LjUnKVxuICAgICAgICAgIC50bygkZmlyc3RGb290ZXJOYXZJdGVtLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQrPTQuNzUnKVxuICAgICAgICAgIDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgZm9ybU1vZHVsZSA9ICgpID0+IHtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdC1jb250YWluZXInKSkge1xuICAgICAgICBjb25zdCBzdWJtaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3Bmb3Jtcy1zdWJtaXQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGZvcm1zLXN1Ym1pdCcpO1xuICAgICAgICBzdWJtaXRDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLFxuICAgICAgICBgPHN2ZyBpZD1cInN1Ym1pdC1idG5cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCA5Ni41NCAzMi40OVwiPlxuICAgICAgICAgIDxwYXRoIGNsYXNzPVwiY2xzLXN1Ym1pdFwiIGQ9XCJNLjI4LDIuMTdjMTAuODQsMTUuMiwyMy41OCwyNyw0Mi43MywyOS43QzYxLjYsMzQuNSw3OS44LDI4LjUyLDk1LjgzLDE5LjQ0YzEtLjU4LDEtMi41NC0uMzYtMi43NGE1Mi4xMyw1Mi4xMywwLDAsMC0xNC4wNi0uMzMsMS41LDEuNSwwLDAsMCwwLDMsMzUuNTIsMzUuNTIsMCwwLDEsMTEuNywzLjFsLS4zMS0yLjM1YTg3LjE5LDg3LjE5LDAsMCwxLTkuMjQsOS43OGMtMS40NCwxLjMuNjksMy40MiwyLjEyLDIuMTJhODcuMTksODcuMTksMCwwLDAsOS4yNC05Ljc4LDEuNTIsMS41MiwwLDAsMC0uMy0yLjM2LDM5Ljg1LDM5Ljg1LDAsMCwwLTEzLjIxLTMuNTF2M2E0OS4xNSw0OS4xNSwwLDAsMSwxMy4yNy4yMmwtLjM2LTIuNzRDNzkuMTksMjUuNDIsNjIsMzEuMjYsNDQuNDQsMjkuMDUsMjUuNzgsMjYuNywxMy4zOSwxNS40MiwyLjg3LjY2LDEuNzUtLjktLjg1LjYuMjgsMi4xN1pcIi8+XG4gICAgICAgIDwvc3ZnPmApO1xuXG4gICAgICAgIGNvbnN0IHN1Ym1pdFBhdGggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xzLXN1Ym1pdCcpO1xuICAgICAgICBUd2Vlbk1heC5zZXQoc3VibWl0UGF0aCwge2RyYXdTVkc6JzAlJ30pO1xuICAgICAgICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICBsZXQgc3VibWl0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICAgIHN1Ym1pdFRsXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcicpXG4gICAgICAgICAgICAgIC50byhzdWJtaXRQYXRoLCAyLCB7ZmlsbDogJyMwODExMjEnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXIrPTAuNScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgbGV0IHN1Ym1pdFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICBzdWJtaXRUbFxuICAgICAgICAgICAgICAudG8oc3VibWl0UGF0aCwgMiwge2RyYXdTVkc6JzAlJywgZmlsbDogJ25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcblxuICAgIG9uZVBhZ2VTY3JvbGwoXCIubWFpblwiLCB7XG4gICAgICBzZWN0aW9uQ29udGFpbmVyOiBcInNlY3Rpb25cIixcbiAgICAgIGVhc2luZzogXCJjdWJpYy1iZXppZXIoMC41MCwgMCwgMC41MCwgMSlcIixcbiAgICAgIGFuaW1hdGlvblRpbWU6IDc1MCxcbiAgICAgIHBhZ2luYXRpb246IHRydWUsXG4gICAgICB1cGRhdGVVUkw6IGZhbHNlLFxuICAgICAgYmVmb3JlTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBjX2JnXzEgPSBjdXJyZW50U2VjdGlvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18xKTtcbiAgICAgICAgbGV0IGNfYmdfMiA9IGNfYmdfMS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19iZ18yKTtcbiAgICAgICAgbGV0IGNfYXJ0aWNsZSA9IGNfYmdfMi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19hcnRpY2xlKTtcbiAgICAgICAgbGV0IGNfd29ya19pbWcgPSBjX2FydGljbGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya19pbWcpO1xuICAgICAgICBsZXQgY19zdmcgPSBjX2FydGljbGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY19zdmcpO1xuICAgICAgICBsZXQgY193b3JrID0gY193b3JrX2ltZy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3dvcmspO1xuICAgICAgICBsZXQgY193b3JrX3RleHQgPSBjX3dvcmsuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29ya190ZXh0KTtcbiAgICAgICAgbGV0IGNfaW5kZXggPSBjX3dvcmtfaW1nLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2luZGV4KTtcbiAgICAgICAgbGV0IGFsbFByb2dyZXNzQmFycyA9ICRmb290ZXJOYXYucXVlcnlTZWxlY3RvckFsbCgnLnBhZ2luYXRpb24tcHJvZ3Jlc3MnKTtcbiAgICAgICAgYWxsUHJvZ3Jlc3NCYXJzLmZvckVhY2goYmFyID0+IHtcbiAgICAgICAgICBUd2Vlbk1heC50byhiYXIsIDEsIHt3aWR0aDonMCUnLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgYmVmb3JlTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgYmVmb3JlTW92ZVRsXG4gICAgICAgICAgICAuc2V0KGNfYmdfMSwge3hQZXJjZW50OiAtMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY19iZ18yLCB7eFBlcmNlbnQ6IC0xMDB9KVxuICAgICAgICAgICAgLnNldChjX2FydGljbGUsIHt4UGVyY2VudDogLTEwMH0pXG4gICAgICAgICAgICAuc2V0KGNfc3ZnLCB7eFBlcmNlbnQ6LTIwMH0pXG4gICAgICAgICAgICAuc2V0KGNfd29ya19pbWcsIHtzY2FsZTouNzUsIGF1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrLCB7YXV0b0FscGhhOjAsIHlQZXJjZW50OjUwfSlcbiAgICAgICAgICAgIC5zZXQoY193b3JrX3RleHQsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTI1fSlcbiAgICAgICAgICAgIDtcblxuICAgICAgfSxcbiAgICAgIGFmdGVyTW92ZTogZnVuY3Rpb24oaW5kZXgsIGN1cnJlbnRTZWN0aW9uKSB7XG4gICAgICAgIGxldCBwcmV2QXJyb3dJblRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgcHJldkFycm93SW5UbFxuICAgICAgICAgICAgLnRvKHByZXZBcnJvd1N2ZywgMiwge2RyYXdTVkc6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcblxuICAgICAgICBsZXQgbmV4dEFycm93SW5UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIG5leHRBcnJvd0luVGxcbiAgICAgICAgICAgIC50byhuZXh0QXJyb3dTdmcsIDIsIHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSk7XG5cbiAgICAgICAgbGV0IGNfYmdfMSA9IGN1cnJlbnRTZWN0aW9uLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzEpO1xuICAgICAgICBsZXQgY19iZ18yID0gY19iZ18xLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2JnXzIpO1xuICAgICAgICBsZXQgY19hcnRpY2xlID0gY19iZ18yLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX2FydGljbGUpO1xuICAgICAgICBsZXQgY193b3JrX2ltZyA9IGNfYXJ0aWNsZS5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX2ltZyk7XG4gICAgICAgIGxldCBjX3N2ZyA9IGNfYXJ0aWNsZS5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhjX3N2Zyk7XG4gICAgICAgIGxldCBjX3dvcmsgPSBjX3dvcmtfaW1nLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfd29yayk7XG4gICAgICAgIGxldCBjX3dvcmtfdGV4dCA9IGNfd29yay5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgLy8gY29uc29sZS5sb2coY193b3JrX3RleHQpO1xuICAgICAgICBsZXQgY19pbmRleCA9IGNfd29ya19pbWcuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGNfaW5kZXgpO1xuICAgICAgICBsZXQgY3VycmVudExpbmsgPSAkZm9vdGVyTmF2LnF1ZXJ5U2VsZWN0b3IoYGFbZGF0YS1pbmRleD1cIiR7aW5kZXh9XCJdYCk7XG4gICAgICAgIGxldCBjdXJyZW50UHJvZ3Jlc3NCYXIgPSBjdXJyZW50TGluay5wcmV2aW91c1NpYmxpbmc7XG5cbiAgICAgICAgbGV0IGFmdGVyTW92ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGxldCBhZnRlck1vdmVTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGNfaW5kZXgsIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgbGV0IGNoYXJzID0gYWZ0ZXJNb3ZlU3BsaXRUZXh0LmNoYXJzO1xuICAgICAgICAgIGFmdGVyTW92ZVRsXG4gICAgICAgICAgICAudG8oY19iZ18xLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlJylcbiAgICAgICAgICAgIC50byhjX2JnXzIsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPS4yNScpXG4gICAgICAgICAgICAudG8oY19hcnRpY2xlLCAxLCB7eFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uNScpXG4gICAgICAgICAgICAudG8oY19zdmcsIDEsIHt4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29ya19pbWcsIDEuNSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEnKVxuICAgICAgICAgICAgLnRvKGNfd29yaywgLjUsIHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0xLjI1JylcbiAgICAgICAgICAgIC50byhjX3dvcmtfdGV4dCwgMSwge3NjYWxlOjEsIGF1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdiZWZvcmUrPTEuNScpXG4gICAgICAgICAgICAuc3RhZ2dlckZyb20oY2hhcnMsIDEsIHthdXRvQWxwaGE6MCwgeVBlcmNlbnQ6LTEwMCwgZWFzZTogRXhwby5lYXNlT3V0fSwgMC4yNSwgJ2JlZm9yZSs9MS43NScpXG4gICAgICAgICAgICAudG8oY3VycmVudFByb2dyZXNzQmFyLCAwLjc1LCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnYmVmb3JlKz0uMjUnKTtcbiAgICAgIH0sXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgICByZXNwb25zaXZlRmFsbGJhY2s6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgJGZvb3Rlck5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5vbmVwYWdlLXBhZ2luYXRpb24nKTtcbiAgICBjb25zdCAkZm9vdGVyTGlua3MgPSAkZm9vdGVyTmF2LmNoaWxkcmVuO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm9uZXBhZ2UtcGFnaW5hdGlvbiBsaScpO1xuICAgIGNvbnN0ICRwYWdpbmF0aW9uTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcub25lcGFnZS1wYWdpbmF0aW9uIGxpIGEnKTtcbiAgICBjb25zdCAkd29ya0luZGljZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud29yay1pbmRleCcpO1xuICAgIGNvbnN0ICR0b3RhbFByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvdGFsLXByb2dyZXNzJyk7XG5cbiAgICBmdW5jdGlvbiBvcGVuV29ya1RleHQoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IHdvcmtUZXh0ID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUaXRsZSA9IHRoaXM7XG4gICAgICBsZXQgb3Blbkljb24gPSB3b3JrVGl0bGUubGFzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCB3b3JrTWFpbiA9IHdvcmtUZXh0Lmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgZGlzcGxheSA9IHdvcmtUZXh0LmdldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5Jyk7XG4gICAgICBpZiAoZGlzcGxheSA9PT0gJ2Nsb3NlZCcpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnb3BlbicpO1xuICAgICAgICBsZXQgZXhwYW5kV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGV4cGFuZFdvcmtUZXh0VGxcbiAgICAgICAgICAgIC50byh3b3JrVGV4dCwgMSwge2hlaWdodDonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuJylcbiAgICAgICAgICAgIC50byhvcGVuSWNvbiwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZVdvcmtUZXh0KGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsZXQgd29ya0J0biA9IHRoaXM7XG4gICAgICBsZXQgd29ya1RpdGxlID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgbGV0IHdvcmtUZXh0ID0gd29ya1RpdGxlLnBhcmVudEVsZW1lbnQ7XG4gICAgICBsZXQgd29ya01haW4gPSB3b3JrVGV4dC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGRpc3BsYXkgPSB3b3JrVGV4dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZGlzcGxheScpO1xuICAgICAgaWYgKGRpc3BsYXkgPT09ICdjbG9zZWQnKSB7XG4gICAgICAgIHdvcmtUZXh0LnNldEF0dHJpYnV0ZSgnZGF0YS1kaXNwbGF5JywgJ29wZW4nKTtcbiAgICAgICAgbGV0IGV4cGFuZFdvcmtUZXh0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBleHBhbmRXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya1RleHQsIDEsIHtoZWlnaHQ6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjQ1LCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnb3BlbicpXG4gICAgICAgICAgICAuZnJvbVRvKHdvcmtNYWluLCAwLjUsIHt5UGVyY2VudDoxMDAsIGF1dG9BbHBoYTowLCBmb3JjZTNEOnRydWV9LHtkaXNwbGF5OidibG9jaycsIHlQZXJjZW50OjAsIGF1dG9BbHBoYToxLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdvcGVuKz0wLjUnKVxuICAgICAgICAgICAgO1xuICAgICAgfSBlbHNlIGlmIChkaXNwbGF5ID09PSAnb3BlbicpIHtcbiAgICAgICAgd29ya1RleHQuc2V0QXR0cmlidXRlKCdkYXRhLWRpc3BsYXknLCAnY2xvc2VkJyk7XG4gICAgICAgIGxldCBoaWRlV29ya1RleHRUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGhpZGVXb3JrVGV4dFRsXG4gICAgICAgICAgICAudG8od29ya0J0biwgMSwge3JvdGF0aW9uOjAsIGVhc2U6IEV4cG8uZWFzZUlufSwgJ2Nsb3NlJylcbiAgICAgICAgICAgIC50byh3b3JrTWFpbiwgMC41LCB7ZGlzcGxheTonbm9uZScsIGF1dG9BbHBoYTowLCB5UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UnKVxuICAgICAgICAgICAgLnRvKHdvcmtUZXh0LCAxLCB7aGVpZ2h0OidhdXRvJywgZWFzZTogRXhwby5lYXNlSW59LCAnY2xvc2UrPTAuNScpXG4gICAgICAgICAgICA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJHdvcmtUaXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Xb3JrVGV4dCkpO1xuICAgICR3b3JrQnRucy5mb3JFYWNoKGJ1dHRvbiA9PiBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVdvcmtUZXh0KSk7XG5cbiAgICBjb25zdCBob3ZlcldvcmtJdGVtID0gKGUpID0+IHtcbiAgICAgIGxldCB3b3JrSXRlbSA9IGUudGFyZ2V0O1xuICAgICAgbGV0IHRleHQgPSBlLnRhcmdldC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IHRpdGxlID0gdGV4dC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvbiA9IHRpdGxlLmxhc3RFbGVtZW50Q2hpbGQ7XG4gICAgICBsZXQgb3Blbkljb25TdmcgPSBvcGVuSWNvbi5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBvcGVuSWNvblBhdGggPSBvcGVuSWNvblN2Zy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgIGxldCBob3ZlclN0YXR1cyA9IHdvcmtJdGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycpO1xuICAgICAgaWYgKGhvdmVyU3RhdHVzID09PSAnbm8nKSB7XG4gICAgICAgIHdvcmtJdGVtLnNldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcmluZycsICd5ZXMnKTtcbiAgICAgICAgbGV0IGVudGVyV29ya0l0ZW1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGVudGVyV29ya0l0ZW1UbFxuICAgICAgICAgICAgLnRvKHRleHQsIDEsIHtiYWNrZ3JvdW5kQ29sb3I6J3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLnRvKHRpdGxlLCAxLCB7cGFkZGluZzonNTBweCAwJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvbiwgMC41LCB7eVBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWV9LHthdXRvQWxwaGE6MSwgeVBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlSW59LCAnc3RhcnQnKVxuICAgICAgICAgICAgLmZyb21UbyhvcGVuSWNvblBhdGgsIDEsIHtmaWxsOiAnbm9uZSd9LHtmaWxsOicjMDgxMTIxJywgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnc3RhcnQrPTAuNScpO1xuICAgICAgfSBlbHNlIGlmIChob3ZlclN0YXR1cyA9PT0gJ3llcycpIHtcbiAgICAgICAgd29ya0l0ZW0uc2V0QXR0cmlidXRlKCdkYXRhLWhvdmVyaW5nJywgJ25vJyk7XG4gICAgICAgIGxldCBsZWF2ZVdvcmtJdGVtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBsZWF2ZVdvcmtJdGVtVGxcbiAgICAgICAgICAgIC50byh0ZXh0LCAxLCB7YmFja2dyb3VuZENvbG9yOicjZmZmJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0JylcbiAgICAgICAgICAgIC50byh0aXRsZSwgMSwge3BhZGRpbmc6JzEwcHggMCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzdGFydCcpXG4gICAgICAgICAgICAudG8ob3Blbkljb25QYXRoLCAxLCB7ZHJhd1NWRzonMCUnLCBmaWxsOidub25lJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ3N0YXJ0Jyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgICAkd29ya0l0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBob3ZlcldvcmtJdGVtKSk7XG4gICAgfVxuXG4gICAgcHJldkFycm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVVcCgnLm1haW4nKTtcbiAgICAgIGNvbnN0IHByZXZBcnJvd091dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIHByZXZBcnJvd091dFRsLmZyb21UbyhwcmV2QXJyb3csIC41LCB7eDotMTB9LHt4OjAsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdzcCcpXG4gICAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAgICAgICBwcmV2QXJyb3dPdXRUbC50byhwcmV2QXJyb3dTdmcsIDEsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnc3ArPS41Jyk7XG4gICAgICAgICAgfVxuICAgIH0pO1xuICAgIG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG1vdmVEb3duKCcubWFpbicpO1xuICAgICAgY29uc3QgbmV4dEFycm93T3V0VGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgbmV4dEFycm93T3V0VGwuZnJvbVRvKG5leHRBcnJvdywgLjUsIHt4OjEwfSx7eDowLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAnc24nKTtcbiAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgIG5leHRBcnJvd091dFRsLnRvKG5leHRBcnJvd1N2ZywgMSwge2RyYXdTVkc6JzAlJywgZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdzbis9LjUnKTtcbiAgICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgIGFycm93UGF0aHMuZm9yRWFjaChwYXRoID0+IHtcbiAgICAgICAgICBwYXRoLnBhcmVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcbiAgICAgICAgICAgIGxldCBhcnJvd01vdXNlRW50ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgICAgICBhcnJvd01vdXNlRW50ZXJUbFxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7c2NhbGU6MC45NSwgZmlsbDonIzA4MTEyMScsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VuJylcbiAgICAgICAgICAgICAgICAudG8ocGF0aCwgMSwge2RyYXdTVkc6JzczJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBhdGgucGFyZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgbGV0IGFycm93TW91c2VMZWF2ZVRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgICAgICAgIGFycm93TW91c2VMZWF2ZVRsXG4gICAgICAgICAgICAgICAgLnRvKHBhdGgsIDEsIHtzY2FsZToxLCBmaWxsOidub25lJywgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW4nKVxuICAgICAgICAgICAgICAgIC50byhwYXRoLCAxLCB7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0sICdlbicpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGZvb3Rlck5hdi5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyZW5kJywgYDxkaXYgY2xhc3M9XCJ0b3RhbC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICRmb290ZXJOYXYuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmVuZCcsIGA8ZGl2IGNsYXNzPVwiY3VycmVudC1wcm9ncmVzc1wiPjwvZGl2PmApO1xuXG4gICAgZnVuY3Rpb24gcmVzZXRQcm9ncmVzcyhlKSB7XG4gICAgICBsZXQgY1Byb2dyZXNzID0gdGhpcy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICBsZXQgdFByb2dyZXNzID0gY1Byb2dyZXNzLm5leHRFbGVtZW50U2libGluZztcbiAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMSwge3dpZHRoOjAsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSk7XG4gICAgICBUd2Vlbk1heC50byh0UHJvZ3Jlc3MsIDIsIHt3aWR0aDowLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0pO1xuICAgIH1cblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGZvb3Rlck5hdi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgcmVzZXRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgJHBhZ2luYXRpb25MaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGV0IGxpbmtzID0gJHBhZ2luYXRpb25MaW5rcy5sZW5ndGg7XG4gICAgICBsZXQgcGVyY2VudFBlckxpbmsgPSAxMDAgLyBsaW5rcztcbiAgICAgIGlmIChsaW5rcyA8IDEwKSB7XG4gICAgICAgICBsaW5rLmlubmVySFRNTCA9IGxpbmsuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykgKyAnLzAnICsgbGlua3M7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgbGluay5pbm5lckhUTUwgPSBsaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgbGlua3M7XG4gICAgICB9XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKGUpID0+IHtcbiAgICAgICAgICBsZXQgY3VycmVudExpbmsgPSBlLnRhcmdldDtcbiAgICAgICAgICBsZXQgY3VycmVudExpID0gY3VycmVudExpbmsucGFyZW50RWxlbWVudDtcbiAgICAgICAgICBsZXQgaW5kZXggPSBjdXJyZW50TGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudFByb2dyZXNzQmFyID0gY3VycmVudExpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgIGxldCBwYWdpbmF0aW9uID0gY3VycmVudExpLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgbGV0IGNQcm9ncmVzcyA9IHBhZ2luYXRpb24ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0UHJvZ3Jlc3MgPSBjUHJvZ3Jlc3MubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgIGxldCB0YXJnZXRMZW5ndGggPSBgJHtwZXJjZW50UGVyTGluayppbmRleH0lYDtcbiAgICAgICAgICBsZXQgYWN0aXZlSW5kZXggPSBwYWdpbmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5hY3RpdmUnKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgICAgICBsZXQgY3VycmVudExlbmd0aCA9IGAke3BlcmNlbnRQZXJMaW5rKmFjdGl2ZUluZGV4fSVgO1xuXG4gICAgICAgICAgaWYgKGluZGV4IDwgYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKGNQcm9ncmVzcywgMiwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgVHdlZW5NYXgudG8oY1Byb2dyZXNzLCAyLCB7d2lkdGg6YCR7Y3VycmVudExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICAgIFR3ZWVuTWF4LnRvKHRQcm9ncmVzcywgMSwge3dpZHRoOmAke3RhcmdldExlbmd0aH1gLCBlYXNlOiBFeHBvLmVhc2VPdXR9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHBhZ2luYXRpb25MaXMuZm9yRWFjaChsaSA9PiB7XG4gICAgICBsZXQgbGluayA9IGxpLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgbGV0IGluZGV4ID0gbGluay5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnKTtcbiAgICAgIGxpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIGA8ZGl2IGNsYXNzPVwicGFnaW5hdGlvbi1wcm9ncmVzc1wiPjwvZGl2PmApO1xuICAgICAgbGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICB9KTtcblxuICAgICR3b3JrSW5kaWNlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIGxldCBpbmRpY2VzID0gJHdvcmtJbmRpY2VzLmxlbmd0aDtcbiAgICAgIGxldCBzZWN0aW9uID0gaW5kZXgucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICAgICAgaWYgKGluZGljZXMgPCAxMCkge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8wJyArIGluZGljZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleC5pbm5lckhUTUwgPSBzZWN0aW9uLmdldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcpICsgJy8nICsgaW5kaWNlcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHRvZ2dsZVN0YXRlID0gKGVsZW0sIGF0dHIsIGEsIGIpID0+IHtcbiAgICAgIGxldCBjdXJyZW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZWxlbX1gKTtcbiAgICAgICBjdXJyZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoYCR7YXR0cn1gLCBjdXJyZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoYCR7YXR0cn1gKSA9PT0gYSA/IGIgOiBhKTtcbiAgICB9XG5cbiAgICAkY29udGFjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgc2hvd0Zvcm1UbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgc2hvd0Zvcm1UbFxuICAgICAgICAudG8oJGFib3V0TGluaywgLjI1LCB7YXV0b0FscGhhOjAsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDIsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYnKVxuICAgICAgICAuZnJvbVRvKCRjb250YWN0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyZis9LjI1JylcbiAgICAgICAgLmZyb21UbygkaGlkZUZvcm1BcnJvdywgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDo2NSwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS40NScpXG4gICAgICAgIC5mcm9tVG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAyLCB7ZHJhd1NWRzonMCUnfSx7ZHJhd1NWRzonMTAwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcmYrPS41JylcbiAgICAgICAgO1xuICAgIH0pO1xuXG4gICAgJGhpZGVGb3JtQXJyb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgbGV0IGhpZGVGb3JtVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgIGhpZGVGb3JtVGxcbiAgICAgICAgLnRvKCRhYm91dExpbmssIC4yNSwge2F1dG9BbHBoYToxLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmVmJylcbiAgICAgICAgLnRvKCRoaWRlRm9ybUFycm93UGF0aCwgLjI1LCB7ZmlsbDonbm9uZScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGhpZGVGb3JtQXJyb3dQYXRoLCAuMjUsIHtkcmF3U1ZHOicwJScsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZWYnKVxuICAgICAgICAudG8oJGNvbnRhY3RQYWdlLCAxLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi0xMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmVmKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0SW5uZXIsIDEsIHthdXRvQWxwaGE6MSwgeFBlcmNlbnQ6MCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZWYrPS4yNScpXG4gICAgICAgIDtcbiAgICB9KTtcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc2OCkge1xuICAgICAgJGFib3V0UGFnZUxpbmtzLmZvckVhY2gobGluayA9PiB7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIChlKSA9PiB7XG4gICAgICAgICAgICBsZXQgbGluayA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGxpbmtTcGxpdFRleHQgPSBuZXcgU3BsaXRUZXh0KGxpbmssIHt0eXBlOid3b3JkcyxjaGFycyd9KTtcbiAgICAgICAgICAgIGxldCBjaGFycyA9IGxpbmtTcGxpdFRleHQuY2hhcnM7XG4gICAgICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbShjaGFycywgMC4yLCB7c2NhbGU6MCwgeDonLTUnLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9LCAwLjAzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAkYWJvdXRMaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgIHRvZ2dsZVN0YXRlKCcuYWJvdXRfX3BhZ2UnLCAnbWVudS1zdGF0dXMnLCAnY2xvc2VkJywgJ29wZW4nKTtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGlmICgkYWJvdXRQYWdlLmdldEF0dHJpYnV0ZSgnbWVudS1zdGF0dXMnKSA9PT0gJ29wZW4nKSB7XG4gICAgICAgIGxldCBhYm91dFRsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICAgIGFib3V0VGxcbiAgICAgICAgICAuc3RhZ2dlclRvKCRmb290ZXJMaW5rcywgMiwge3lQZXJjZW50OjIwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAuMDgsICdlbnRlcicpXG4gICAgICAgICAgLnRvKCRmb290ZXJOYXYsIDIsIHtiYWNrZ3JvdW5kQ29sb3I6JyNmZmYnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnZW50ZXInKVxuICAgICAgICAgIC5mcm9tVG8oJGFib3V0UGFnZSwgMiwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWV9LCB7YXV0b0FscGhhOjEsIHhQZXJjZW50OjAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyJylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dEJnLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjE1JylcbiAgICAgICAgICAuZnJvbVRvKCRhYm91dElubmVyLCAyLCB7YXV0b0FscGhhOjAsIHhQZXJjZW50Oi01MCwgZm9yY2UzRDp0cnVlfSwge2F1dG9BbHBoYToxLCB4UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdlbnRlcis9LjI1JylcbiAgICAgICAgICAuZnJvbVRvKCRleGl0QWJvdXQsIDIsIHtkcmF3U1ZHOicwJSd9LHtkcmF3U1ZHOicxMDAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2VudGVyKz0xLjI1JylcbiAgICAgICAgICA7XG4gICAgICB9IGVsc2UgaWYgKCRhYm91dFBhZ2UuZ2V0QXR0cmlidXRlKCdtZW51LXN0YXR1cycpID09PSAnY2xvc2VkJykge1xuICAgICAgICBsZXQgYmFja1RsMSA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBiYWNrVGwxXG4gICAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgICAgLnRvKCRleGl0QWJvdXQsIC4yNSwge2RyYXdTVkc6JzAlJywgZWFzZTogRXhwby5lYXNlT3V0fSwgJ2xlYXZlJylcbiAgICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6LTEwMCwgZm9yY2UzRDp0cnVlLCBlYXNlOiBFeHBvLmVhc2VJbk91dH0sICdsZWF2ZSs9LjI1JylcbiAgICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDotMTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICB0b2dnbGVTdGF0ZSgnLmFib3V0X19wYWdlJywgJ21lbnUtc3RhdHVzJywgJ2Nsb3NlZCcsICdvcGVuJyk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBsZXQgYmFja1RsID0gbmV3IFRpbWVsaW5lTWF4KCk7XG4gICAgICBiYWNrVGxcbiAgICAgICAgLnN0YWdnZXJUbygkZm9vdGVyTGlua3MsIDEsIHt5UGVyY2VudDowLCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS41KX0sIC4xLCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZXhpdEFib3V0LCAuMjUsIHtkcmF3U1ZHOicwJScsIGZpbGw6J25vbmUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9LCAnbGVhdmUnKVxuICAgICAgICAudG8oJGFib3V0QmcsIDEsIHthdXRvQWxwaGE6MCwgeFBlcmNlbnQ6MTAwLCBmb3JjZTNEOnRydWUsIGVhc2U6IEV4cG8uZWFzZUluT3V0fSwgJ2xlYXZlKz0uMjUnKVxuICAgICAgICAudG8oJGFib3V0UGFnZSwgMSwge2F1dG9BbHBoYTowLCB4UGVyY2VudDoxMDAsIGZvcmNlM0Q6dHJ1ZSwgZWFzZTogRXhwby5lYXNlSW5PdXR9LCAnbGVhdmUrPS4yNScpXG4gICAgICAgIC50bygkZm9vdGVyTmF2LCAxLCB7YmFja2dyb3VuZENvbG9yOid0cmFuc3BhcmVudCcsIGVhc2U6IEV4cG8uZWFzZU91dH0sICdsZWF2ZSs9LjUnKVxuICAgICAgICA7XG4gICAgfSk7XG5cbiAgICAkYWJvdXRDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoIDwgNzY4KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhYm91dENsb3NlSG92ZXJUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICAgIGFib3V0Q2xvc2VIb3ZlclRsXG4gICAgICAgICAgICAudG8oJGV4aXRBYm91dCwgMSwge2ZpbGw6JyMwODExMjEnLCBzY2FsZTowLjk1LCBmb3JjZTNEOnRydWUsIGVhc2U6IEJhY2suZWFzZU91dC5jb25maWcoMS43KX0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJGFib3V0Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYWJvdXRDbG9zZUhvdmVyVGwgPSBuZXcgVGltZWxpbmVNYXgoKTtcbiAgICAgICAgICBhYm91dENsb3NlSG92ZXJUbFxuICAgICAgICAgICAgLnRvKCRleGl0QWJvdXQsIDEsIHtmaWxsOidub25lJywgc2NhbGU6MSwgZm9yY2UzRDp0cnVlLCBlYXNlOiBCYWNrLmVhc2VPdXQuY29uZmlnKDEuNyl9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0ICRoaWdobGlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAkaGlnaGxpZ2h0LmNsYXNzTGlzdC5hZGQoJ2xpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICB0aGlzLmFwcGVuZCgkaGlnaGxpZ2h0KTtcbiAgICAgIGxldCBoaWdobGlnaExpbmtUbCA9IG5ldyBUaW1lbGluZU1heCgpO1xuICAgICAgICBoaWdobGlnaExpbmtUbFxuICAgICAgICAgIC50bygkaGlnaGxpZ2h0LCAxLCB7d2lkdGg6JzEwMCUnLCBlYXNlOiBFeHBvLmVhc2VPdXR9KVxuICAgICAgICAgIDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bmhpZ2hsaWdodExpbmsoZSkge1xuICAgICAgbGV0IGhpZ2hsaWdodCA9IHRoaXMucXVlcnlTZWxlY3RvcignLmxpbmstaGlnaGxpZ2h0Jyk7XG4gICAgICBoaWdobGlnaHQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gNzY4KSB7XG4gICAgICAkbGlua3MuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGhpZ2hsaWdodExpbmspKTtcbiAgICAgICRsaW5rcy5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdW5oaWdobGlnaHRMaW5rKSk7XG4gICAgfVxuXG4gICAgbG9hZGVyTW9kdWxlKCk7XG4gICAgZm9ybU1vZHVsZSgpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0OiBpbml0XG4gIH1cbn0pKCk7XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGFwcC5pbml0KCk7XG59XG4iXX0=
