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
import '../images/photos/error.jpg';
import '../images/photos/bg-shade.png';
import '../images/photos/bg-login.jpg';
import '../images/photos/logo-compressed.png';

// question assets
import '../images/photos/level-1.png';
import '../images/photos/level-2.jpg';
import '../images/photos/level-3.jpeg';
import '../images/photos/level-3.jpg';
import '../images/photos/level-4.jpg';
import '../audio/level-5.mp3';
import '../audio/level-5.ogg';
import '../images/photos/level-6.jpg';
import '../images/photos/level-7.jpg';
import '../images/photos/level-8.jpg';
import '../images/photos/level-9.jpg';
import '../images/photos/level-10-a.jpg';
import '../images/photos/level-10-b.jpg';

// Troll images
import '../images/photos/fail/f1.jpg';
import '../images/photos/fail/f2.jpg';
import '../images/photos/fail/f3.jpg';
import '../images/photos/fail/f4.jpg';
import '../images/photos/fail/f5.jpg';
import '../images/photos/fail/f6.jpg';
import '../images/photos/fail/f7.jpg';
import '../images/photos/fail/f8.jpg';
import '../images/photos/fail/f9.jpg';
import '../images/photos/fail/f10.jpg';
import '../images/photos/fail/f11.jpg';
import '../images/photos/fail/f12.jpg';
import '../images/photos/fail/f13.jpg';
import '../images/photos/fail/f14.jpg';
import '../images/photos/fail/f15.jpg';
import '../images/photos/fail/f16.jpg';
import '../images/photos/fail/f17.jpg';
import '../images/photos/fail/f18.jpg';
import '../images/photos/fail/f19.jpg';
import '../images/photos/fail/f20.jpg';
import '../images/photos/fail/f21.jpg';
import '../images/photos/fail/f22.jpg';
import '../images/photos/fail/f23.jpg';
import '../images/photos/fail/f24.jpg';

import '../images/photos/success/s1.jpg';
import '../images/photos/success/s2.jpg';
import '../images/photos/success/s3.jpg';
import '../images/photos/success/s4.jpg';
import '../images/photos/success/s5.jpg';
import '../images/photos/success/s6.jpg';
import '../images/photos/success/s7.jpg';
import '../images/photos/success/s8.jpg';
import '../images/photos/success/s9.jpg';
import '../images/photos/success/s10.jpg';
import '../images/photos/success/s11.jpg';
import '../images/photos/success/s12.jpg';





import ajaxCall from './modules/ajaxCall';
import glitch from './modules/texteffect';
import timer from './modules/roundTimer';


// glitch effect
// glitch();

// answer submission -> ajax call
$("#ans__submit--form").on("submit", ajaxCall);


// Rules Page
$('#rules__open--btn').on('click', () => {
    $('#main__game').fadeToggle('slow');
    $('#information').fadeToggle('slow');
    $('#auth').fadeToggle('slow');
});

$('#rules__close--btn').on('click', () => {
    $('#main__game').fadeIn();
    $('#auth').fadeIn();
    $('#information').fadeOut();
});


// Countdown timer
timer();















console.log('%cCrafted and Coded by abhijithvijayan', 'color: white; background: black; padding: 5px 20px');