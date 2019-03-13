/*!
 *
 * @author   abhijithvijayan <https://abhijithvijayan.in>
 * @license  MIT
 *
 */

import 'bootstrap';
import '../sass/main.scss';

import glitch from './modules/glitchEffect';
import ajaxCall from './modules/ajaxCall';


// call the glitch effect for home
glitch();


// answer submission -> ajax call
$("#ans__submit--form").on("submit", ajaxCall);    


























console.log('%cCrafted and Coded by abhijithvijayan', 'color: white; background: black; padding: 5px 20px');