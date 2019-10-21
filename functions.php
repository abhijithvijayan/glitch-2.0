function so174837_registration_email_alert( $user_id ) {
    $user    = get_userdata( $user_id );
    $email   = $user->user_email;
    $message = $email . ' has registered to your website.';
    wp_mail( 'youremail@example.com', 'New User registration', $message );
}
add_action('user_register', 'so174837_registration_email_alert');