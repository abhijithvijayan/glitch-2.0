/*!
 *
 * @author   abhijithvijayan <https://abhijithvijayan.in>
 * @license  MIT
 *
 */

import 'bootstrap';
import '../sass/main.scss';
// general images
import '../images/icons/favicon.ico';
import '../images/photos/logo-6kb.png';
import '../images/photos/bg-shade.png';
import '../images/photos/bg-login.jpg';
import '../images/photos/logo-compressed.png';
// question assets
import '../images/photos/level1.png';
import '../images/photos/level2.jpg';
import '../images/photos/level3.jpeg';
import '../images/photos/level3.jpg';
import '../images/photos/level4.jpg';
import '../audio/level5.m4a';


import ajaxCall from './modules/ajaxCall';
import glitch from './modules/texteffect';
import timer from './modules/roundTimer';


glitch();

// answer submission -> ajax call
$("#ans__submit--form").on("submit", ajaxCall);


// Rules Page
$('#rules__open--btn').on('click', () => {
    $('#information').fadeToggle('slow');
    $('#auth').fadeToggle('slow');
});

$('#rules__close--btn').on('click', () => {
    $('#auth').fadeIn();
    $('#information').fadeOut();
});


// Countdown timer
timer();















console.log('%cCrafted and Coded by abhijithvijayan', 'color: white; background: black; padding: 5px 20px');