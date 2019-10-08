<?php get_header(); ?>
<div class="main">
  <?php
    $bg = get_field( 'background_image' );
    if ( have_rows('work_items') ) :
      while ( have_rows('work_items') ) : the_row();
        ?>
          <section>
        		<div class="bg bg--1">
        			<div class="bg bg--2">
      					<article>
                  <?php
                  if ( get_row_layout() == 'standard_layout' ) :
                    $title = get_sub_field('title');
                    $content = get_sub_field('content');
                    $file = get_sub_field('file');
                    $image = get_sub_field('image');
                  ?>
                  <div class="work-content" data-hovering="no" style="background-image: url( <?php echo $image ? $image : '' ?> );">
                    <div class="work-index"></div>
                    <div class="work-text" data-display="closed">
                      <div class="work-title">
                        <h2 class="miller-banner-light"><?php echo $title ? $title : '' ?></h2>
                        <div class="work-btn">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.83 19.65">
                          	<path class="cls-work" d="M10.72,18.21l1-16.77c.12-1.93-2.86-1.91-3,0-.19,2.46,0,5.49-.72,7.84l1-1c-2.25.82-5.3.53-7.65.51v3l16.93-.24c1.93,0,1.94-3,0-3L1.45,8.74a1.5,1.5,0,0,0,0,3c2.23,0,7.37.76,9.11-1a3.76,3.76,0,0,0,.66-2.27c.31-2.31.37-4.7.55-7h-3l-1,16.77c-.12,1.93,2.88,1.92,3,0Z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="work-main">
                        <?php echo $content ? $content : '' ?>
                        <div class="work-link">
                          <?php if ( $file ) { ?>
                          	<a href="<?php echo $file ?>" download><?php _e('Download', 'elysseromeo') ?></a>
                          <?php } else { echo ''; } ?>
                        </div>
                      </div>
                    </div>
                  </div>
                  <?php
                    endif;
                  ?>
      					</article>
        			</div>
        	</section>
        <?php
      endwhile;
    endif;
  ?>
</div>
<?php get_footer(); ?>
