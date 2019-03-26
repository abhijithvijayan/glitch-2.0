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
import '../images/photos/l1.jpg';


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