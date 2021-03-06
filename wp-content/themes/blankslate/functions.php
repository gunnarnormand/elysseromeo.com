<?php

function run_scripts() {

    wp_enqueue_style( 'style', get_stylesheet_uri() );

    wp_enqueue_style( 'Fonts', 'https://use.typekit.net/asl6hbs.css' );

    wp_enqueue_script( 'TweenMax', get_template_directory_uri() . '/dist/gsap-min/TweenMax.min.js', array (), 1.1, true);

    wp_enqueue_script( 'DrawSVGPlugin', get_template_directory_uri() . '/dist/gsap-min/plugins/DrawSVGPlugin.min.js', array (), 1.1, true);

    wp_enqueue_script( 'SplitTextPlugin', get_template_directory_uri() . '/dist/gsap-min/utils/SplitText.min.js', array (), 1.1, true);

		wp_enqueue_script( 'paper.js', 'https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.0/paper-core.min.js', array (), null, true);

		wp_enqueue_script( 'simplex-noise', 'https://cdnjs.cloudflare.com/ajax/libs/simplex-noise/2.4.0/simplex-noise.min.js', array (), null, true);

    if ( is_front_page() ) {

      wp_enqueue_script( 'onepagescroll', get_template_directory_uri() . '/dist/js/onepagescroll.js', array (), 1.1, true);

      wp_enqueue_script( 'app', get_template_directory_uri() . '/dist/js/app.js', array (), 1.1, true);

    }
}

add_action( 'wp_enqueue_scripts', 'run_scripts' );


/**
* add_js_siteurl
*
* @since 1.0.0
*/
function add_js_siteurl() {
	wp_localize_script('app', 'ELYSSEROMEO', array( 'siteurl' => get_option('siteurl') ));
}

add_action( 'wp_enqueue_scripts', 'add_js_siteurl' );

/**
 * ACF add options page
 */

if( function_exists('acf_add_options_page') ) {

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Header Settings',
		'menu_title'	=> 'Header',
		'parent_slug'	=> 'theme-general-settings',
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Footer Settings',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-settings',
	));

}

/**
 * Filter the upload size limit for non-administrators.
 *
 * @param string $size Upload size limit (in bytes).
 * @return int Filtered size limit.
 */

function filter_site_upload_size_limit( $size ) {
    $size = 60 * 1024 * 1024;
    return $size;
}

add_filter( 'upload_size_limit', 'filter_site_upload_size_limit', 20 );
