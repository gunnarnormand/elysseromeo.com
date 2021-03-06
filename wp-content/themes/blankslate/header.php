<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
	<meta name="google-site-verification" content="vxiVbT0mi4jR-Xrr9z4syOv8a5HdU4oByTQJSm-yZVY" />
	<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<div id="loader">
			<img id="loaderGIF" src="<?php echo esc_url( home_url( '/' ) ); ?>/wp-content/themes/blankslate/dist/img/signature.gif" alt="signature loading gif">
			<svg xmlns="http://www.w3.org/2000/svg" style="width:300px; height:300px;" viewBox="0 0 286.04 285.41">
				<path id="loaderSVG" class="cls-loader" d="M92,5.63C72.12-4.81,45.53,1.31,30.87,18.34s-17.12,43-7.52,63.3S53.5,116.22,75.65,120c-37.1,12.42-66.3,46-73.49,84.42-3.62,19.4-1.65,40.53,9.19,57s31.66,27,50.83,22.39c22.76-5.51,36.08-28.76,44.9-50.45A428,428,0,0,0,135.22,20.74c-3.48,26.3-2,53-.47,79.46Q139.9,190.52,145,280.81a692.06,692.06,0,0,1,6.35-189.13c2.8-16.21,6.24-32.49,13.2-47.4,5.34-11.45,15.46-23.25,28-21.55,11.71,1.6,18.43,14.09,21.67,25.45C219,65,220.38,83,215.87,99.83s-15.3,32.36-30.7,40.54-35.42,8.09-49.65-2a366,366,0,0,0,41.79,88.78c8.14,12.59,17.24,24.85,29.2,33.89s27.2,14.59,42,12.29c22-3.42,39.21-25.89,36.79-48"/>
			</svg>
	</div>
  <div class="cursor cursor--small"></div>
  <canvas class="cursor cursor--canvas" resize></canvas>
	<header>
		<a class="logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<h1 id="logo"><?php _e('Elysse Romeo', 'elysseromeo') ?></h1>
		</a>
		<a href="#" class="about"><?php _e('about', 'elysseromeo') ?></a>
	</header>
	<div class="contact-page">
		<div class="contact-heading">
			<h2 class="miller-banner-light"><?php echo get_field('form_title', 'option') ?></h2>
			<div class="arrow hide-form-arrow">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.92 78.87">
					<path id="hideFormArrow" class="cls-arrow" d="M117.51,35.89c-36-1.71-72.11-3.24-107.91,1.34l30.06-33C41.82,1.9,38.44-1.52,36.12.74L13.86,22.41c-3.24,3.15-6.61,6.22-9.74,9.48C2,34.12-.26,36.64,0,40S2.83,45.31,5,47.4c3.19,3.13,6.41,6.24,9.62,9.36l22,21.39c2.31,2.25,5.85-1.28,3.54-3.53L22.92,57.91,14,49.22C12.16,47.43,8.56,45,6.82,42.63c36.67-5.18,73.82-3.49,110.69-1.74C120.72,41,120.72,36,117.51,35.89Z"/>
				</svg>
			</div>
		</div>
		<div class="form">
			<?php echo get_field('contact_form', 'option') ?>
		</div>
	</div>
	<div class="about__page" menu-status="closed">
		<div class="about-inner">
			<svg class="about__close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 78.12 78.55">
			  <path id="exitAbout" class="cls-exit" d="M54.25,27.62C55.1,26.81,56,26,56.8,25.19Q67.41,15,77.38,4.14c2.24-2.43-1.06-5.45-3.54-3.53C65.12,7.35,58.15,15.82,50.83,24c-.8.76-1.58,1.54-2.38,2.29-1.38,1.3-2.78,2.59-4.18,3.87S41,34,39.34,34.57a4,4,0,0,1-.53.12c-5-4.39-10.32-8.46-15.28-12.92C17.09,16,11.13,9.69,5.17,3.41,2.94,1.07-.53,4.58,1.63,7c6.2,6.76,12.61,13.32,19.28,19.61q5.34,5,10.87,9.85a40.37,40.37,0,0,0,3.4,2.93c-5,4.38-9.85,8.68-14.45,13.59L.7,74.24C-1.51,76.58,2,80.13,4.23,77.78l20-21.32c4.86-5.17,10.05-9.69,15.29-14.32l.4.37C51,53.25,59.48,66.36,72.43,75.08c2.67,1.81,5.18-2.52,2.52-4.31-12.6-8.49-20.89-21.49-31.66-32A150.25,150.25,0,0,0,54.25,27.62Z"/>
			</svg>
			<div class="about-info">
				<h2 class="miller-banner-light"><?php echo get_field('title', 'option'); ?></h2>
				<?php echo get_field('body', 'option'); ?>
				<p><?php echo get_field('resume', 'option'); ?> <a class="link" href="<?php echo get_field('resume_link', 'option'); ?>" download>résumé</a></p>
				<p><?php echo get_field('contact', 'option'); ?> <a class="contact link" href="#"><?php echo get_field('contact_cta', 'option'); ?></a></p>
			</div>
		</div>
		<svg id="about-bg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 475 440">
			<defs>
				<style>
					.cls-2{fill:#b7dde1;}.cls-2,.cls-3,.cls-4,.cls-5,.cls-6,.cls-7,.cls-8,.cls-9{opacity:0.25;}.cls-3{fill:#406780;}.cls-4{fill:#b7dde1;}.cls-5{fill:#ccc;}.cls-6{fill:##f9f9f9;}.cls-7{fill:#405780;}.cls-8{fill:#3c4a53;}.cls-9{fill:#804040;}.cls-10{fill:url(#New_Pattern_2);}
				</style>
			</defs>
			<pattern id="New_Pattern_2" data-name="New Pattern 2" width="475" height="440" patternTransform="translate(-237.5 -220)" patternUnits="userSpaceOnUse" viewBox="0 0 475 440">
				<polygon class="cls-2" points="138.22 485.3 140.09 428.82 206.23 427.9 190.75 456.35 138.22 485.3"/>
				<polygon class="cls-3" points="306.3 430.3 322.32 445.08 343.76 429.53 370.15 448.94 351.89 472.28 319.2 469.93 306.3 430.3"/>
				<polygon class="cls-4" points="231.79 441.87 240.51 455.66 247.17 444.7 257.05 446.41 257.1 438.71 231.79 441.87"/>
				<polygon class="cls-5" points="408.3 458.68 417.63 430.31 480.62 422.93 483.38 469.48 462.86 450.44 408.3 458.68"/>
				<polygon class="cls-5" points="-66.7 458.68 -57.37 430.31 5.62 422.93 8.38 469.48 -12.14 450.44 -66.7 458.68"/>
				<polygon class="cls-5" points="473.21 410.73 492.02 409.26 490.36 390.63 473.21 410.73"/>
				<polygon class="cls-5" points="17.82 2.19 23.64 38.7 37.75 23.57 17.82 2.19"/>
				<polygon class="cls-2" points="10.37 72.44 16.65 91.33 27.93 87.75 49.88 77.53 41.47 57.41 33.04 42.76 10.37 72.44"/>
				<polygon class="cls-6" points="14.83 117 11.31 144.46 21.87 151.35 51.18 119.65 50.41 97.36 14.83 117"/>
				<polygon class="cls-3" points="37.39 14.26 51.15 38.64 56.98 59.09 84.26 32.97 71.25 14.64 60.67 36.83 46.47 14.36 37.39 14.26"/>
				<polygon class="cls-6" points="84.26 7.78 121.48 7.19 125.98 33.88 121.07 54.32 85.01 54.89 101.5 31.07 84.26 7.78"/>
				<polygon class="cls-4" points="73.82 76.19 99.44 67.26 128.63 71.21 100.41 104.41 75.98 100.02 73.82 76.19"/>
				<polygon class="cls-5" points="49.61 150.91 71.61 112.38 97.47 118.34 93.7 145.95 49.61 150.91"/>
				<polygon class="cls-6" points="24.81 160.34 78.44 158.69 97.74 165.25 62.25 194.38 51.58 177.11 24.81 160.34"/>
				<polygon class="cls-4" points="9.24 168.79 30.88 177.95 26.81 191.54 9.24 168.79"/>
				<polygon class="cls-3" points="8.99 212 57.8 194.81 58.51 236.31 45.1 212.06 31.74 246.18 8.99 212"/>
				<polygon class="cls-4" points="41.91 260.54 46.31 235.48 64.32 253.42 64.66 271.69 41.91 260.54"/>
				<polygon class="cls-5" points="89.87 347.84 109.19 328.29 114.75 383.23 97.19 379.4 89.87 347.84"/>
				<polygon class="cls-3" points="31.25 316.27 39.22 306.13 52.56 314.09 49.05 322.92 31.25 316.27"/>
				<polygon class="cls-5" points="114.54 110.06 146.94 72.45 197.56 67.47 177.38 115.19 147.78 102.88 114.54 110.06"/>
				<polygon class="cls-6" points="123.16 160.21 160.92 129.48 188.94 151.09 180.88 201.13 156.17 168.42 123.16 160.21"/>
				<polygon class="cls-2" points="98.44 196.37 118.21 174.01 143.08 179.27 158.83 209.37 128.43 225.71 105.97 216.02 98.44 196.37"/>
				<polygon class="cls-5" points="67.14 241.54 82.68 220.49 125.27 246.84 108.15 277.39 91.65 252.87 67.14 241.54"/>
				<polygon class="cls-3" points="85.86 291.9 86.36 275.98 71.1 273.13 85.86 291.9"/>
				<polygon class="cls-5" points="19.32 283.74 18.75 265.07 41.5 289.7 19.32 283.74"/>
				<polygon class="cls-4" points="13.31 362.14 19.06 332.32 79.6 353.44 74.51 381.48 50.02 359.1 29.73 393.27 32.36 366.94 13.31 362.14"/>
				<polygon class="cls-5" points="-1.79 410.73 17.02 409.26 15.36 390.63 -1.79 410.73"/>
				<polygon class="cls-2" points="33.75 413.05 51.96 377.03 81.59 413.9 53.27 405.52 44.61 415.67 33.75 413.05"/>
				<polygon class="cls-5" points="46.46 435.78 57.48 424.47 71.07 433.09 46.46 435.78"/>
				<polygon class="cls-6" points="130.65 249.04 147.64 241.65 150.46 256.23 130.65 249.04"/>
				<polygon class="cls-2" points="138.22 45.3 140.09 -11.18 206.23 -12.1 190.75 16.34 138.22 45.3"/>
				<polygon class="cls-4" points="158.62 58.86 185.81 41.81 192.13 58.51 177.57 55.31 158.62 58.86"/>
				<polygon class="cls-5" points="201.85 28.76 216.01 34.68 227.01 14.37 223.26 6.21 201.85 28.76"/>
				<polygon class="cls-3" points="306.3 -9.7 322.32 5.08 343.76 -10.47 370.15 8.94 351.89 32.28 319.2 29.93 306.3 -9.7"/>
				<polygon class="cls-5" points="289.16 8.24 288.47 56.32 306.84 50.05 289.16 8.24"/>
				<polygon class="cls-4" points="231.79 1.87 240.51 15.66 247.17 4.7 257.05 6.41 257.1 -1.29 231.79 1.87"/>
				<polygon class="cls-6" points="221.31 71.81 250.8 62.74 292.88 75.1 310.24 66.54 303.55 127.7 246.44 170.09 252.7 134.91 259.2 109.55 224.04 99.54 221.31 71.81"/>
				<polygon class="cls-7" points="187.24 129.95 209.2 111.02 242.52 119.96 229.15 165.31 218.39 143.78 187.24 129.95"/>
				<polygon class="cls-3" points="191.37 224.23 196.46 188.45 229.79 233.47 223.84 251.55 191.37 224.23"/>
				<polygon class="cls-4" points="214.88 182.98 221.08 176.53 234.08 198.64 227.84 198.55 214.88 182.98"/>
				<polygon class="cls-5" points="202.38 263.89 252.31 255.81 265.78 309.23 242.23 303.62 219.8 303.93 219.49 280.83 216.93 266.65 202.38 263.89"/>
				<polygon class="cls-3" points="96.21 405.14 137.64 380.53 163.47 377.27 163.1 347.88 184.61 352.31 184.91 375.82 173.15 399.49 96.21 405.14"/>
				<polygon class="cls-8" points="84.26 418.51 95.96 422.7 115.26 425.66 140.39 421.95 154.42 421.91 152.06 414.66 84.26 418.51"/>
				<polygon class="cls-2" points="178.35 404.45 202.06 377.86 196.9 350.63 189.37 307.06 234.1 320.51 227.19 376.57 178.35 404.45"/>
				<polygon class="cls-6" points="209.19 414.98 239.67 387.37 250.2 314.52 274.86 320.34 276.31 363.18 268.44 398.48 209.19 414.98"/>
				<polygon class="cls-5" points="234.4 205.19 231.88 212.23 247.45 233.06 275.44 232.19 234.4 205.19"/>
				<polygon class="cls-5" points="249.63 188.7 260.05 199.86 278.56 170.54 288.47 176.85 283.93 157.44 256.4 172.7 249.67 183.44 249.63 188.7"/>
				<polygon class="cls-3" points="341.39 183.27 351.52 226.45 362.07 195.22 379.38 185.64 368.99 171.55 341.39 183.27"/>
				<polygon class="cls-8" points="301.65 173.74 320.87 167.04 336.13 166.87 340.04 155.44 325.48 141.78 301.35 147.68 301.65 173.74"/>
				<polygon class="cls-5" points="323.62 303.97 320.69 292.99 411.55 270.84 403.11 321.84 368.57 338.51 378.89 311.25 355.81 307.96 341.61 327.88 323.62 303.97"/>
				<polygon class="cls-4" points="281.43 328 288.02 303.05 295.43 325.49 315.92 317.25 321.27 325.18 312.23 342.96 281.43 328"/>
				<polygon class="cls-5" points="276.31 391.93 290.48 364.75 310.06 368.05 309.41 393.89 287.77 405.14 276.31 391.93"/>
				<polygon class="cls-4" points="230.84 426.15 258.04 427.1 254.31 420.16 230.84 426.15"/>
				<polygon class="cls-6" points="288.47 430.86 343.12 389.47 365.26 420.77 354.62 429.52 338.25 415.89 288.47 430.86"/>
				<polygon class="cls-5" points="211.61 396.65 184.78 423.68 171.14 416.67 211.61 396.65"/>
				<polygon class="cls-3" points="324.52 375.25 330.18 390.08 365.26 340.2 357.8 335.5 337.84 346.26 324.52 375.25"/>
				<polygon class="cls-2" points="320.69 109.08 327.39 51.01 424.13 32.28 442.63 99.71 396.36 73.77 320.69 109.08"/>
				<polygon class="cls-5" points="408.3 18.68 417.63 -9.69 480.62 -17.07 483.38 29.48 462.86 10.44 408.3 18.68"/>
				<polygon class="cls-6" points="422.82 263.93 418.61 241.53 453.55 272.15 454.06 230.67 477.71 221.99 474.42 307.73 440.04 323.01 414.25 322.69 422.82 263.93"/>
				<path class="cls-5" d="M420.74,349.36l-10.88-4.68,51.65-18.46,2.26,39.95L459.55,401s-29.37-12.87-30.19-12.89,15.94-30.94,15.94-30.94Z"/>
				<polygon class="cls-2" points="367.54 365.52 381.26 350.53 403.71 357.32 392.99 374.88 393.44 393.64 378.52 382.86 367.54 365.52"/>
				<polygon class="cls-5" points="370.06 410.08 405.49 413 387.97 400.68 370.06 410.08"/>
				<polygon class="cls-3" points="412.15 415.34 421.41 421.86 424.5 411.57 412.15 415.34"/>
				<polygon class="cls-6" points="329.53 126.8 361.65 148.81 395.38 99.9 329.53 126.8"/>
				<polygon class="cls-8" points="447.25 29.93 471.13 37.04 457.78 88.25 447.25 29.93"/>
				<polygon class="cls-3" points="450.13 98.3 477.4 135.49 472.82 157.61 450.13 98.3"/>
				<polygon class="cls-4" points="465.45 157.76 468.34 210.11 459.19 210.11 465.45 157.76"/>
				<polygon class="cls-4" points="379.69 165.47 387.16 158.16 403.71 199.97 379.69 165.47"/>
				<path class="cls-9" d="M474.22,0"/>
				<polygon class="cls-5" points="73.54 310.96 127.58 268.57 159.4 271.26 164.21 253.59 187.76 260.19 183.71 319.44 154.46 345.91 125.09 355.76 120.16 320.6 73.54 310.96"/>
				<polygon class="cls-2" points="276.69 255.07 322.12 195.88 340 232.05 381.31 234.55 382.36 262.59 295.21 287.43 276.69 255.07"/>
				<polygon class="cls-6" points="411.18 98.28 429.13 101.18 454.68 136.21 444.93 198.74 417.22 199.01 394.32 148.84 411.18 98.28"/>
				<polygon class="cls-4" points="148.18 222.83 175.89 219.13 182.62 247.44 165.41 251.17 148.18 222.83"/>
				<polygon class="cls-3" points="394.56 211.5 412.88 211.51 412.86 235.04 394.54 227.02 394.56 211.5"/>
				<polygon class="cls-6" points="268.85 203.54 292.65 216.84 308.1 189 268.85 203.54"/>
				<polygon class="cls-3" points="217.5 44.03 267.3 55.37 267.54 17.97 242.56 25.06 217.5 44.03"/>
				<polygon class="cls-5" points="-66.7 18.68 -57.37 -9.69 5.62 -17.07 8.38 29.48 -12.14 10.44 -66.7 18.68"/>
				<polygon class="cls-6" points="-52.18 263.93 -56.4 241.53 -21.45 272.15 -20.94 230.67 2.71 221.99 -0.58 307.73 -34.96 323.01 -60.75 322.69 -52.18 263.93"/>
				<polygon class="cls-3" points="-24.86 98.3 2.4 135.49 -2.18 157.61 -24.86 98.3"/>
			</pattern>
			<g id="Layer_2" data-name="Layer 2">
				<rect class="cls-10" width="475" height="440"/>
			</g>
		</svg>
	</div>
