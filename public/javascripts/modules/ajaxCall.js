import axios from 'axios';
import sweetAlert from './sweetalert';

function ajaxCall(e) {
    e.preventDefault();
    // start a preloader
    $('.screen__overlay').fadeIn();
    $('.spinner').fadeIn();

    const answer = $('#answer').val();
    const success = 'success';
    const error = 'error';
    const successMsg = 'Right Answer!';
    const errorMsg = 'Wrong Answer!';
    const timeout = 'Something not right!!';
    // ajax call
    axios({
            method: 'post',
            url: '/play',
            timeout: 10000,
            data: {
                answer
            }
        })
        .then(res => {
            // stop preloader
            $('.spinner').fadeOut('slow');

            // console.log(res);
            if (res.data.status === true) {
                sweetAlert(success, successMsg, 1);
                // $('.spinner').fadeIn();
                // render new qn
                location.reload(true);
            } else {
                // clear input field
                $('#answer').val('');
                $('.screen__overlay').fadeOut('slow');
                // show a popup
                sweetAlert(error, errorMsg, 0);
            }
        })
        .catch(err => {
            console.log(err);
                    // time out
            if (err.code === 'ECONNABORTED') {
                sweetAlert(error, timeout, 0);
                $('.spinner').fadeOut('slow');
            }
        });
}




export default ajaxCall;