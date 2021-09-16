<?php
defined( 'ABSPATH' ) or die();

/*

Plugin Name:Uros Slider Plugin

Description: Manage posts for slider.

Version: 1.0

Author: Uros

*/

define( 'UROSSLIDER', '1.0.0' );
define( 'US_PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'US_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
class Uros_Controller {
    public function __construct() {
		$this->processing();
	}
	public function processing() {
		add_action('init', array( &$this,'add_post_type_slider'));
		add_filter( 'manage_uslider_posts_columns', array( &$this,'slider_columns'));
        add_action( 'manage_uslider_posts_custom_column', array( &$this,'slider_column'), 10, 2);
        add_shortcode( 'show-slider', array( &$this,'show_slider'));
    }
    /*Custom Post type start*/
    function add_post_type_slider() {
        register_post_type( 'uslider',
        // CPT Options
        array(
            'labels' => array(
            'name' => __( 'Uros Slider' ),
            'singular_name' => __( 'Uros Location' )
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'uslider'),
            )
        );


        $supports = array(
            'title', // post title
            'editor', // post content
            'thumbnail', // featured images
            'excerpt', // post excerpt
            'custom-fields', // custom fields
            );
        $labels = array(
        'name' => _x('Uros Slider Post', 'plural'),
        'singular_name' => _x('Uros Slider Post', 'singular'),
        'menu_name' => _x('Uros Post', 'admin menu'),
        'name_admin_bar' => _x('uslider', 'admin bar'),
        'add_new' => _x('Add New Uros Post', 'add new'),
        'add_new_item' => __('Add New Uros Post'),
        'new_item' => __('New Uros Post'),
        'edit_item' => __('Edit Uros Post'),
        'view_item' => __('View Uros Post'),
        'all_items' => __('All Uros Post'),
        'search_items' => __('Search Uros Post'),
        'not_found' => __('No Slider found.'),
        );
        $args = array(
        'supports' => $supports,
        'labels' => $labels,
        'public' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'uslider'),
        'has_archive' => true,
        'hierarchical' => false,
        );
        register_post_type('uslider', $args);
        
        
        register_taxonomy("slider-category", array("uslider"), array("hierarchical" => true, "label" => "Categories", "singular_label" => "Category", "rewrite" => array( 'slug' => 'slider-category', 'with_front'=> false )));
    }
    function slider_columns( $columns ) {

        $columns = array(

        'cb' => $columns['cb'],
        'img' => __( 'Image', 'us' ),
        'title' => __( 'Title', 'us' ),
        'category' => __( 'Category', 'us' ),
        'date' => __( 'Date', 'uls' )
        );

        return $columns;

    }
    function slider_column( $column, $post_id ) {
        if ( 'img' === $column ) {
			echo get_the_post_thumbnail( $post_id, array(60, 60) );
		}
        if ('category' === $column){
            $categories = get_the_terms($post_id, "slider-category");
            foreach ($categories as $cat){
                echo $cat->name . ", ";
            }
        }
		
	}
    function show_slider($atts){
        wp_enqueue_style( 'urosslider', US_PLUGIN_URL . 'css/urosslider.css', array(),  UROSSLIDER);
        wp_register_script('urosslider', US_PLUGIN_URL . 'js/urosslider.js', array("jquery"), UROSSLIDER);
        
        $data = [];
        if (isset($atts['name'])){
            $posts_array = get_posts(
                array(
                    'posts_per_page' => -1,
                    'post_type' => 'uslider',
                    'post_status' => 'publish', 
                    'tax_query' => array(
                        array(
                            'taxonomy' => 'slider-category',
                            'field' => 'name',
                            'terms' => $atts['category-name']
                        )
                    )
                )
            );
        }else{
            $posts_array = get_posts(
                array(
                    'posts_per_page' => -1,
                    'post_type' => 'uslider',
                    'post_status' => 'publish', 
                )
            );
        }
        foreach ($posts_array as $p){
            $data[] = ["image"=>wp_get_attachment_url(get_post_thumbnail_id($p->ID), 'full'), "title"=>$p->post_title, "description"=>$p->post_content];
        }

        
        wp_localize_script('urosslider', 'init_slider', $data);
        wp_enqueue_script( 'urosslider' );
        ob_start();
        if( file_exists( US_PLUGIN_DIR_PATH . 'template/uslider.php' ) ){
            include US_PLUGIN_DIR_PATH . 'template/uslider.php';
        }
        $content = ob_get_clean();
        return $content;
    }
}
new Uros_Controller();


