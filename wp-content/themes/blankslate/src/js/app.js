const app = (function () {

	const $siteurl = ELYSSEROMEO.siteurl;
	const $defaultImg = `/wp-content/themes/blankslate/dist/img/default.png`;
  const $loader = document.querySelector('#loader');
	const $loaderGIF = document.querySelector('#loaderGIF');
  const $loaderSVG = document.querySelector('#loaderSVG');
  const $main = document.querySelector('.main');
  const $header = document.querySelector('header');
  const $nav = document.querySelector('nav');
  const $logo = $header.firstElementChild;
  const $firstSection = $main.firstElementChild;
  const $firstContent = $firstSection.querySelector('.work-content');
  const $aboutLink = document.querySelector('.about');
  const $aboutClose = document.querySelector('.about__close');
  const $aboutPage = document.querySelector('.about__page');
  const $aboutBg = document.querySelector('#about-bg');
  const $aboutInner = document.querySelector('.about-inner');
  const $exitAbout = document.querySelector('#exitAbout');
  const $contact = document.querySelector('.contact');
  const $contactPage = document.querySelector('.contact-form');
  const $hideFormArrow = document.querySelector('.hide-form-arrow');
  const $hideFormArrowPath = document.querySelector('#hideFormArrow');
  const arrowPaths = document.querySelectorAll('.cls-arrow');
  const prevArrow = document.querySelector('.arrow-back');
  const nextArrow = document.querySelector('.arrow-next');
  const prevArrowSvg = document.querySelector('#prevArrow');
  const nextArrowSvg = document.querySelector('#nextArrow');
	const $allArrowSvgs = document.querySelectorAll('.arrow svg');
  const $workItems = document.querySelectorAll('.work-content');
  const $workText = document.querySelectorAll('.work-text');
  const $workTitles = document.querySelectorAll('.work-title');
  const $workBtns = document.querySelectorAll('.work-btn');
	const $workLinks = document.querySelectorAll('.work-link a');
  const $links = document.querySelectorAll('a');
  const $aboutPageLinks = document.querySelectorAll('a.link');
	const innerCursor = document.querySelector(".cursor--small");
	const canvas = document.querySelector(".cursor--canvas");
	const $submitBtn =  document.querySelector('button[type="submit"]');
	const $contactLinks = document.querySelectorAll('.contact-link');

  const loaderModule = () => {
    const $footerNav = document.querySelector('.onepage-pagination');
    const $footerLinks = $footerNav.children;
    const $firstFooterNavItem = $footerNav.firstElementChild.firstElementChild;
    const regex = /(\/wp-content)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    const $images = document.querySelectorAll('.work-content');
    let imgSrcs = [];
    $images.forEach(image => {
			if (image.style.cssText.match(regex) == null) {
				image.style.cssText = $defaultImg;
			} else {
				imgSrcs.push(image.style.cssText.match(regex));
			}
		});
		const loadingTl = new TimelineMax({
      delay: 0,
      smoothChildTiming: true,
      repeat: -1,
      yoyo: true,
    });
    loadingTl
      .fromTo($loaderSVG, 2, {drawSVG:'0% 100%'},{ drawSVG:'0% 0%', ease: Expo.easeInOut});
    const loaderTl = new TimelineMax({
      delay: 2
    });
    let loadedImages = 0;
    for (var i = 0; i < imgSrcs.length; i++) {
      let tmp = new Image();
      tmp.src = imgSrcs[i][0];
      tmp.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === imgSrcs.length) {
          loaderTl
						.to($loaderGIF, 0.25, {autoAlpha:0, ease: Expo.easeInOut})
						.set($loaderGIF, {display:'none'})
						.to($loaderSVG, 0.25, {autoAlpha:1, ease: Expo.easeInOut})
	          .to($loader, 3, {autoAlpha:0, force3D:true, ease: Expo.easeInOut}, 'start+=2')
	          .from($logo, 3, {xPercent: -100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start+=4')
	          .from($aboutLink, 3, {xPercent: -100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start+=5')
	          .from(prevArrow, 3, {xPercent: -100, autoAlpha:0, force3D:true, ease: Expo.easeIn}, 'start+=5.5')
	          .from(nextArrow, 3, {xPercent: 100, autoAlpha:0, force3D:true, ease: Expo.easeIn}, 'start+=5.5')
	          .from($firstContent, 3, {xPercent: -100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start+=6')
	          .staggerFrom($footerLinks, 1, {yPercent:200, autoAlpha:0, force3D:true, ease: Back.easeOut.config(1.5)}, .1, 'start+=6.5')
	          .to($firstFooterNavItem, 0.75, {width:'100%', ease: Expo.easeOut}, 'start+=6.75');
        }
      });
    }
  }

  const formModule = () => {
    if (window.innerWidth < 768) {
      return;
    } else {
      if (document.querySelector('.wpforms-submit-container')) {
        const submitContainer = document.querySelector('.wpforms-submit-container');
        const submitBtn = document.querySelector('.wpforms-submit');
        submitContainer.insertAdjacentHTML('beforeend',
        `<svg id="submit-btn" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96.54 32.49">
          <path class="cls-submit" d="M.28,2.17c10.84,15.2,23.58,27,42.73,29.7C61.6,34.5,79.8,28.52,95.83,19.44c1-.58,1-2.54-.36-2.74a52.13,52.13,0,0,0-14.06-.33,1.5,1.5,0,0,0,0,3,35.52,35.52,0,0,1,11.7,3.1l-.31-2.35a87.19,87.19,0,0,1-9.24,9.78c-1.44,1.3.69,3.42,2.12,2.12a87.19,87.19,0,0,0,9.24-9.78,1.52,1.52,0,0,0-.3-2.36,39.85,39.85,0,0,0-13.21-3.51v3a49.15,49.15,0,0,1,13.27.22l-.36-2.74C79.19,25.42,62,31.26,44.44,29.05,25.78,26.7,13.39,15.42,2.87.66,1.75-.9-.85.6.28,2.17Z"/>
        </svg>`);

        const submitPath = document.querySelector('.cls-submit');
        TweenMax.set(submitPath, {drawSVG:'0%'});
        submitBtn.addEventListener('mouseenter', () => {
          let submitTl = new TimelineMax();
            submitTl
              .to(submitPath, 2, {drawSVG:'100%', ease: Expo.easeOut}, 'enter')
              .to(submitPath, 2, {fill: '#081121', ease: Expo.easeOut}, 'enter+=0.5');
        });
        submitBtn.addEventListener('mouseleave', () => {
          let submitTl = new TimelineMax();
            submitTl
              .to(submitPath, 2, {drawSVG:'0%', fill: 'none', ease: Expo.easeOut}, 'leave');
        });
      }
    }
  }

	const cursorModule = () => {

		let clientX = -100;
		let clientY = -100;
		const initCursor = () => {
			document.addEventListener("mousemove", e => {
		    clientX = e.clientX;
		    clientY = e.clientY;
		  });
		  const render = () => {
		    TweenMax.set(innerCursor, {
		      x: clientX,
		      y: clientY
		    });
		    requestAnimationFrame(render);
		  };
		  requestAnimationFrame(render);
		};
		initCursor();

		let lastX = 0;
		let lastY = 0;
		let isStuck = false;
		let showCursor = false;
		let group;
		let stuckX;
		let stuckY;
		let fillOuterCursor;
		const initCanvas = () => {
			const shapeBounds = {
				width: 75,
				height: 75,
			};
			paper.setup(canvas);
			const strokeColor = 'rgba(60, 74, 83, 0.5)';
			const strokeWidth = 1;
			const segments = 8;
			const radius = 15;
			const noiseScale = 150;
			const noiseRange = 6;
			let isNoisy = false;
			const polygon = new paper.Path.RegularPolygon(
				new paper.Point(0,0),
				segments,
				radius,
			);
			polygon.strokeColor = strokeColor;
  		polygon.strokeWidth = strokeWidth;
  		polygon.smooth();
  		group = new paper.Group([polygon]);
  		group.applyMatrix = false;
			const noiseObjects = polygon.segments.map(() => new SimplexNoise());
  		let bigCoordinates = [];
			const lerp = (a, b, n) => {
				return (1 - n) * a + n * b;
			};
			const map = (value, in_min, in_max, out_min, out_max) => {
				return (
					((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
				);
			};
			paper.view.onFrame = event => {

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
					  polygon.segments.forEach((segment, i) => {
					    segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
					  });
					  isNoisy = false;
					  bigCoordinates = [];
					}
					// scale down the shape
					const scaleDown = 0.92;
					polygon.scale(scaleDown);
				}

				// while stuck and big, apply simplex noise
			  if (isStuck && polygon.bounds.width >= shapeBounds.width) {
			    isNoisy = true;
			    // first get coordinates of large circle
			    if (bigCoordinates.length === 0) {
			      polygon.segments.forEach((segment, i) => {
			        bigCoordinates[i] = [segment.point.x, segment.point.y];
			      });
			    }

			    // loop over all points of the polygon
			    polygon.segments.forEach((segment, i) => {

			      // get new noise value
			      // we divide event.count by noiseScale to get a very smooth value
			      const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
			      const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

			      // map the noise value to our defined range
			      const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
			      const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);

			      // apply distortion to coordinates
			      const newX = bigCoordinates[i][0] + distortionX;
			      const newY = bigCoordinates[i][1] + distortionY;

			      // set new (noisy) coordindate of point
			      segment.point.set(newX, newY);
			    });

			  }
			  polygon.smooth();

			}
		}
		initCanvas();

		const initCursorHovers = () => {
			const handleCanvasCursorMouseEnter = e => {
				const navItem = e.currentTarget;
				const navItemBox = navItem.getBoundingClientRect();
				stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
				stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
				isStuck = true;
				TweenMax.to(innerCursor, 1, {background:'rgba(60, 74, 83, 0.5)', scale:0.25, ease: Expo.easeOut});
			};
			const handleCanvasCursorMouseLeave = () => {
				isStuck = false;
				TweenMax.to(innerCursor, 1, {background:'#b7dde1', scale:1, ease: Expo.easeOut});
			};
			const handleBasicCursorMouseEnter = e => {
				TweenMax.to(innerCursor, 1, {background:'rgba(60, 74, 83, 0.5)', scale:2, ease: Expo.easeOut});
			};
			const handleBasicCursorMouseLeave = () => {
				TweenMax.to(innerCursor, 1, {background:'#b7dde1', scale:1, ease: Expo.easeOut});
			};
			$aboutLink.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
			$aboutLink.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			$workLinks.forEach(link => {
				link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
				link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			});
			$aboutPageLinks.forEach(link => {
				link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
				link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			});
			$aboutClose.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
			$aboutClose.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			$allArrowSvgs.forEach(link => {
				link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
				link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			});
			$workBtns.forEach(link => {
				link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
				link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
			});
			$workItems.forEach(link => {
				link.addEventListener("mouseenter", handleBasicCursorMouseEnter);
				link.addEventListener("mouseleave", handleBasicCursorMouseLeave);
			});
			const $paginationLinks = document.querySelectorAll('.onepage-pagination li a');
			$paginationLinks.forEach(link => {
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
				$contactLinks.forEach(link => {
					link.addEventListener("mouseenter", handleCanvasCursorMouseEnter);
					link.addEventListener("mouseleave", handleCanvasCursorMouseLeave);
				});
			}

		}
		initCursorHovers();

	}

  const init = () => {

    onePageScroll(".main", {
      sectionContainer: "section",
      easing: "cubic-bezier(0.50, 0, 0.50, 1)",
      animationTime: 750,
      pagination: true,
      updateURL: false,
      beforeMove: function(index, currentSection) {
        let c_bg_1 = currentSection.firstElementChild;
        // console.log(c_bg_1);
        let c_bg_2 = c_bg_1.firstElementChild;
        // console.log(c_bg_2);
        let c_article = c_bg_2.firstElementChild;
        // console.log(c_article);
        let c_work_img = c_article.firstElementChild;
        // console.log(c_work_img);
        let c_svg = c_article.lastElementChild;
        // console.log(c_svg);
        let c_index = c_work_img.firstElementChild;
        // console.log(c_index);
        let allProgressBars = $footerNav.querySelectorAll('.pagination-progress');
        allProgressBars.forEach(bar => {
          TweenMax.to(bar, 1, {width:'0%', ease: Expo.easeInOut});
        });

        let beforeMoveTl = new TimelineMax();
          beforeMoveTl
            .set(c_bg_1, {xPercent: -100})
            .set(c_bg_2, {xPercent: -100})
            .set(c_article, {xPercent: -100})
            .set(c_svg, {xPercent:-200})
            .set(c_work_img, {scale:.75, autoAlpha:0, xPercent:-100});

      },
      afterMove: function(index, currentSection) {
        let prevArrowInTl = new TimelineMax();
          prevArrowInTl
            .to(prevArrowSvg, 2, {drawSVG:'100%', ease: Expo.easeOut});
        let nextArrowInTl = new TimelineMax();
          nextArrowInTl
            .to(nextArrowSvg, 2, {drawSVG:'100%', ease: Expo.easeOut});
        let c_bg_1 = currentSection.firstElementChild;
        // console.log(c_bg_1);
        let c_bg_2 = c_bg_1.firstElementChild;
        // console.log(c_bg_2);
        let c_article = c_bg_2.firstElementChild;
        // console.log(c_article);
        let c_work_img = c_article.firstElementChild;
        // console.log(c_work_img);
        let c_svg = c_article.lastElementChild;
        // console.log(c_svg);
        let c_index = c_work_img.firstElementChild;
        // console.log(c_index);
        let currentLink = $footerNav.querySelector(`a[data-index="${index}"]`);
        let currentProgressBar = currentLink.previousSibling;

        let afterMoveTl = new TimelineMax();
        let afterMoveSplitText = new SplitText(c_index, {type:'words,chars'});
        let chars = afterMoveSplitText.chars;
          afterMoveTl
            .to(c_bg_1, 1, {xPercent:0, force3D:true, ease: Expo.easeOut}, 'before')
            .to(c_bg_2, 1, {xPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=.25')
            .to(c_article, 1, {xPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=.5')
            .to(c_svg, 1, {xPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=1')
            .to(c_work_img, 1.5, {scale:1, autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'before+=1')
            .staggerFrom(chars, 1, {autoAlpha:0, yPercent:-100, ease: Expo.easeOut}, 0.25, 'before+=1.75')
            .to(currentProgressBar, 0.75, {width:'100%', ease: Expo.easeOut}, 'before+=.25');
      },
      loop: true,
      keyboard: true,
      responsiveFallback: false,
    });

    const $footerNav = document.querySelector('.onepage-pagination');
    const $footerLinks = $footerNav.children;
    const $paginationLis = document.querySelectorAll('.onepage-pagination li');
    const $paginationLinks = document.querySelectorAll('.onepage-pagination li a');
    const $workIndices = document.querySelectorAll('.work-index');
    const $totalProgress = document.querySelector('.total-progress');

    function openWorkText(e) {
      e.stopPropagation();
      e.preventDefault();
      let workItem = this;
      let workText = this.lastElementChild;
			let workTitle = workText.firstElementChild;
      let openIcon = workTitle.lastElementChild;
      let openIconSvg = openIcon.firstElementChild;
      let openIconPath = openIconSvg.firstElementChild;
      let workMain = workText.lastElementChild;
      let expandWorkTextTl = new TimelineMax();
			let status = workText.getAttribute('data-display');
			if (status === 'closed') {
				workText.setAttribute('data-display', 'open');
				expandWorkTextTl
					.to(workText, 1, {autoAlpha:1, height:'100%', backgroundColor:'rgba(255, 255, 255, 0.85)', ease: Expo.easeOut}, 'start')
					.fromTo(workTitle, 1, {yPercent:100, autoAlpha:0, force3D:true},{yPercent:0, autoAlpha:1, force3D:true, ease: Expo.easeOut}, 'start')
					.fromTo(workMain, 1, {yPercent:100, autoAlpha:0, force3D:true},{yPercent:0, autoAlpha:1, force3D:true, ease: Expo.easeOut}, 'start+=0.25')
					.fromTo(openIcon, 1, {yPercent:100, force3D:true},{autoAlpha:1, yPercent:0, rotation:45, force3D:true, ease: Expo.easeOut}, 'start+=0.5')
					.fromTo(openIconPath, 1, {drawSVG:'0%'},{drawSVG:'100%', ease: Expo.easeIn}, 'start+=0.5')
					.fromTo(openIconPath, 1, {fill: 'none'},{fill:'#081121', ease: Expo.easeInOut}, 'start+=1');
			}

    }

		function closeWorkText(e) {
			e.stopPropagation();
			let workText = this.parentElement.parentElement;
			let workTitle = workText.firstElementChild;
      let openIcon = workTitle.lastElementChild;
      let openIconSvg = openIcon.firstElementChild;
      let openIconPath = openIconSvg.firstElementChild;
      let workMain = workText.lastElementChild;
			let closeWorkTextTl = new TimelineMax();
			let status = workText.getAttribute('data-display');
			if (status === 'open') {
				workText.setAttribute('data-display', 'closed');
				closeWorkTextTl
					.to(workText, 1, {autoAlpha:0, height:'auto', ease: Expo.easeOut}, 'start')
					.to(workTitle, 1, {yPercent:100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start')
					.to(workMain, 1, {yPercent:100, autoAlpha:0, force3D:true, ease: Expo.easeOut}, 'start+=0.25')
					.to(openIcon, 1, {autoAlpha:0, yPercent:100, rotation:0, force3D:true, ease: Expo.easeOut}, 'start+=0.5')
					.to(openIconPath, 1, {drawSVG:'0%', ease: Expo.easeIn}, 'start+=0.5')
					.to(openIconPath, 1, {fill:'none', ease: Expo.easeInOut}, 'start+=1');
			}

		}

    $workItems.forEach(item => item.addEventListener('click', openWorkText));
		$workBtns.forEach(button => button.addEventListener('click', closeWorkText));
		$workLinks.forEach(link => link.addEventListener('click', (e) => {
			e.stopPropagation();
		}));

    prevArrow.addEventListener('click', (e) => {
      e.preventDefault();
      moveUp('.main');
      const prevArrowOutTl = new TimelineMax();
        prevArrowOutTl.fromTo(prevArrow, .5, {x:-10},{x:0, ease: Back.easeOut.config(1.7)}, 'sp')
          if (window.innerWidth > 768) {
            prevArrowOutTl.to(prevArrowSvg, 1, {drawSVG:'0%', fill:'none', ease: Expo.easeOut}, 'sp+=.5');
          }
    });
    nextArrow.addEventListener('click', (e)=> {
      e.preventDefault();
      moveDown('.main');
      const nextArrowOutTl = new TimelineMax();
        nextArrowOutTl.fromTo(nextArrow, .5, {x:10},{x:0, ease: Back.easeOut.config(1.7)}, 'sn');
          if (window.innerWidth > 768) {
            nextArrowOutTl.to(nextArrowSvg, 1, {drawSVG:'0%', fill:'none', ease: Expo.easeOut}, 'sn+=.5');
          }
    });

    if (window.innerWidth > 768) {
      arrowPaths.forEach(path => {
          path.parentElement.addEventListener('mouseenter', () => {
            let arrowMouseEnterTl = new TimelineMax();
              arrowMouseEnterTl
                .to(path, 1, {scale:0.95, fill:'#081121', force3D:true, ease: Expo.easeOut}, 'en')
                .to(path, 1, {drawSVG:'73%', ease: Expo.easeOut}, 'en');
          });
          path.parentElement.addEventListener('mouseleave', () => {
            let arrowMouseLeaveTl = new TimelineMax();
              arrowMouseLeaveTl
                .to(path, 1, {scale:1, fill:'none', force3D:true, ease: Expo.easeOut}, 'en')
                .to(path, 1, {drawSVG:'100%', ease: Back.easeOut.config(1.7)}, 'en');
          });
      });
    }

    $footerNav.insertAdjacentHTML('afterend', `<div class="total-progress"></div>`);
    $footerNav.insertAdjacentHTML('afterend', `<div class="current-progress"></div>`);

    function resetProgress(e) {
      let cProgress = this.nextElementSibling;
      let tProgress = cProgress.nextElementSibling;
      TweenMax.to(cProgress, 1, {width:0, ease: Expo.easeInOut});
      TweenMax.to(tProgress, 2, {width:0, ease: Expo.easeInOut});
    }

    if (window.innerWidth > 768) {
      $footerNav.addEventListener('mouseleave', resetProgress);
    }

    $paginationLinks.forEach(link => {
      let links = $paginationLinks.length;
      let percentPerLink = 100 / links;
      if (links < 10) {
         link.innerHTML = link.getAttribute('data-index') + '/0' + links;
      } else {
         link.innerHTML = link.getAttribute('data-index') + '/' + links;
      }
      if (window.innerWidth > 768) {
        link.addEventListener('mouseenter', (e) => {
          let currentLink = e.target;
          let currentLi = currentLink.parentElement;
          let index = currentLink.getAttribute('data-index');
          let currentProgressBar = currentLi.firstElementChild;
          let pagination = currentLi.parentElement;
          let cProgress = pagination.nextElementSibling;
          let tProgress = cProgress.nextElementSibling;
          let targetLength = `${percentPerLink*index}%`;
          let activeIndex = pagination.querySelector('.active').getAttribute('data-index');
          let currentLength = `${percentPerLink*activeIndex}%`;

          if (index < activeIndex) {
            TweenMax.to(cProgress, 2, {width:`${targetLength}`, ease: Expo.easeOut});
            TweenMax.to(tProgress, 1, {width:`${targetLength}`, ease: Expo.easeOut});
          } else {
            TweenMax.to(cProgress, 2, {width:`${currentLength}`, ease: Expo.easeOut});
            TweenMax.to(tProgress, 1, {width:`${targetLength}`, ease: Expo.easeOut});
          }
        });
      }
    });

    $paginationLis.forEach(li => {
      let link = li.firstElementChild;
      let index = link.getAttribute('data-index');
      li.insertAdjacentHTML('afterbegin', `<div class="pagination-progress"></div>`);
      link.removeAttribute('href');
    });

    $workIndices.forEach(index => {
      let indices = $workIndices.length;
      let section = index.parentElement.parentElement.parentElement.parentElement.parentElement;
      if (indices < 10) {
        index.innerHTML = section.getAttribute('data-index') + '/0' + indices;
      } else {
        index.innerHTML = section.getAttribute('data-index') + '/' + indices;
      }
    });

    const toggleState = (elem, attr, a, b) => {
      let currentElement = document.querySelector(`${elem}`);
       currentElement.setAttribute(`${attr}`, currentElement.getAttribute(`${attr}`) === a ? b : a);
    }

    $contact.addEventListener('click', (e) => {
      e.preventDefault();
      let showFormTl = new TimelineMax();
      showFormTl
        .to($aboutLink, .25, {autoAlpha:0, ease: Expo.easeOut}, 'enterf')
        .to($aboutInner, 2, {autoAlpha:0, xPercent:100, force3D:true, ease: Expo.easeOut}, 'enterf')
        .fromTo($contactPage, 2, {autoAlpha:0, xPercent:-100, force3D:true}, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'enterf+=.25')
        .fromTo($hideFormArrow, 2, {autoAlpha:0, xPercent:65, force3D:true}, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'enterf+=.45')
        .fromTo($hideFormArrowPath, 2, {drawSVG:'0%'},{drawSVG:'100%', ease: Expo.easeOut}, 'enterf+=.5');
    });

    $hideFormArrow.addEventListener('click', (e) => {
      e.preventDefault();
      let hideFormTl = new TimelineMax();
      hideFormTl
        .to($aboutLink, .25, {autoAlpha:1, ease: Expo.easeOut}, 'leavef')
        .to($hideFormArrowPath, .25, {fill:'none', ease: Expo.easeOut}, 'leavef')
        .to($hideFormArrowPath, .25, {drawSVG:'0%', ease: Expo.easeOut}, 'leavef')
        .to($contactPage, 1, {autoAlpha:0, xPercent:-100, force3D:true, ease: Expo.easeInOut}, 'leavef+=.25')
        .to($aboutInner, 1, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeInOut}, 'leavef+=.25');
    });

    $aboutLink.addEventListener('click', (e) => {
      toggleState('.about__page', 'menu-status', 'closed', 'open');
      e.preventDefault();
      if ($aboutPage.getAttribute('menu-status') === 'open') {
        let aboutTl = new TimelineMax();
        aboutTl
          .staggerTo($footerLinks, 2, {yPercent:200, force3D:true, ease: Expo.easeOut}, .08, 'enter')
          .to($footerNav, 2, {backgroundColor:'#fff', ease: Expo.easeOut}, 'enter')
          .fromTo($aboutPage, 2, {autoAlpha:0, xPercent:-100, force3D:true}, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'enter')
          .fromTo($aboutBg, 2, {autoAlpha:0, xPercent:-50, force3D:true}, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'enter+=.15')
          .fromTo($aboutInner, 2, {autoAlpha:0, xPercent:-50, force3D:true}, {autoAlpha:1, xPercent:0, force3D:true, ease: Expo.easeOut}, 'enter+=.25')
          .fromTo($exitAbout, 2, {drawSVG:'0%'},{drawSVG:'100%', ease: Expo.easeOut}, 'enter+=1.25');
      } else if ($aboutPage.getAttribute('menu-status') === 'closed') {
        let backTl1 = new TimelineMax();
        backTl1
          .staggerTo($footerLinks, 1, {yPercent:0, force3D:true, ease: Back.easeOut.config(1.5)}, .1, 'leave+=.25')
          .to($exitAbout, .25, {drawSVG:'0%', ease: Expo.easeOut}, 'leave')
          .to($aboutBg, 1, {autoAlpha:0, xPercent:-100, force3D:true, ease: Expo.easeInOut}, 'leave+=.25')
          .to($aboutPage, 1, {autoAlpha:0, xPercent:-100, force3D:true, ease: Expo.easeInOut}, 'leave+=.25')
          .to($footerNav, 1, {backgroundColor:'transparent', ease: Expo.easeOut}, 'leave+=.5');
      }
    });

    $aboutClose.addEventListener('click', (e) => {
      toggleState('.about__page', 'menu-status', 'closed', 'open');
      e.preventDefault();
      let backTl = new TimelineMax();
      backTl
        .staggerTo($footerLinks, 1, {yPercent:0, force3D:true, ease: Back.easeOut.config(1.5)}, .1, 'leave+=.25')
        .to($exitAbout, .25, {drawSVG:'0%', fill:'none', ease: Expo.easeOut}, 'leave')
        .to($aboutBg, 1, {autoAlpha:0, xPercent:100, force3D:true, ease: Expo.easeInOut}, 'leave+=.25')
        .to($aboutPage, 1, {autoAlpha:0, xPercent:100, force3D:true, ease: Expo.easeInOut}, 'leave+=.25')
        .to($footerNav, 1, {backgroundColor:'transparent', ease: Expo.easeOut}, 'leave+=.5');
    });

    $aboutClose.addEventListener('mouseenter', () => {
      if (window.innerWidth < 768) {
        return;
      } else {
        let aboutCloseHoverTl = new TimelineMax();
          aboutCloseHoverTl
            .to($exitAbout, 1, {fill:'#081121', scale:0.95, force3D:true, ease: Back.easeOut.config(1.7)});
      }
    });

    $aboutClose.addEventListener('mouseleave', () => {
      if (window.innerWidth < 768) {
        return;
      } else {
        let aboutCloseHoverTl = new TimelineMax();
          aboutCloseHoverTl
            .to($exitAbout, 1, {fill:'none', scale:1, force3D:true, ease: Back.easeOut.config(1.7)});
      }
    });

    function highlightLink(e) {
      let $highlight = document.createElement('span');
      $highlight.classList.add('link-highlight');
      this.append($highlight);
      let highlighLinkTl = new TimelineMax();
        highlighLinkTl
          .to($highlight, 1, {width:'100%', ease: Expo.easeOut});
    }

    function unhighlightLink(e) {
      let highlight = this.querySelector('.link-highlight');
      highlight.remove();
    }

    if (window.innerWidth > 768) {
      $links.forEach(link => link.addEventListener('mouseenter', highlightLink));
      $links.forEach(link => link.addEventListener('mouseleave', unhighlightLink));
    }

    loaderModule();
    formModule();
		if (window.innerWidth > 768) {
			cursorModule();
		}
  }

  return {
    init: init
  }
})();

window.onload = () => {
  app.init();
}
