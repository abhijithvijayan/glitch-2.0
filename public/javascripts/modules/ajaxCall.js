/* eslint-disable no-restricted-globals */

import axios from 'axios';
import sweetAlert from './sweetalert';

function ajaxCall(e) {
    e.preventDefault();
    // start a preloader
    $('.screen__overlay').fadeIn();
    $('.spinner').fadeIn();

    const answer = $('#answer').val();
    const success = 'Hurray';
    const error = "Oh C'mon!";
    const tryAgain = 'Try Again';
    const successMsg = 'Right Answer!';
    const errorMsg = 'Wrong Answer!';
    const timeout = 'Timeout! Please try again';
    const catchErr = 'Something not right!!';
    let randNum;
    let file;
    // ajax call
    axios({
        method: 'post',
        url: '/play',
        timeout: 10000,
        data: {
            answer,
        },
    })
        .then(res => {
            // stop preloader
            $('.spinner').fadeOut('slow');

            if (res.data.status === true) {
                randNum = Math.floor(Math.random() * 12 + 1);
                file = `s${randNum}`;
                sweetAlert(success, successMsg, false, file);
                $('.spinner').fadeIn();
                // render new qn
                location.reload(true);
            } else {
                randNum = Math.floor(Math.random() * 24 + 1);
                file = `f${randNum}`;
                // clear input field
                $('#answer').val('');
                $('.screen__overlay').fadeOut('slow');
                // show a popup
                sweetAlert(error, errorMsg, true, file);
            }
        })
        .catch(err => {
            // clear input field
            $('#answer').val('');
            console.log(err);
            $('.spinner').fadeOut('slow');
            file = 'error';
            // time out
            if (err.code === 'ECONNABORTED') {
                sweetAlert(tryAgain, timeout, true, file);
            } else {
                sweetAlert(tryAgain, catchErr, true, file);
            }
            $('.spinner').fadeIn();
            location.reload(true);
        });
}

export default ajaxCall;
