import axios from 'axios';
import sweetAlert from './sweetalert';

function ajaxCall(e) {
    e.preventDefault();
    // start a preloader
    $('.screen__overlay').fadeIn();
    $('.spinner').fadeIn();

    const answer = $('#answer').val();
    const success = 'Hurray';
    const error = 'Oh C\'mon!';
    const successMsg = 'Right Answer!';
    const errorMsg = 'Wrong Answer!';
    const timeout = 'Something not right!!';
    let randNum, fileName;
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
            randNum = Math.floor(Math.random() * 12 + 1);
            // console.log(res);
            if (res.data.status === true) {
                fileName = 's' + randNum;
                sweetAlert(success, successMsg, false, fileName);
                // $('.spinner').fadeIn();
                // render new qn
                location.reload(true);
            } else {
                fileName = 'f' + randNum;
                // clear input field
                $('#answer').val('');
                $('.screen__overlay').fadeOut('slow');
                // show a popup
                sweetAlert(error, errorMsg, true, fileName);
            }
        })
        .catch(err => {
            randNum = Math.floor(Math.random() * 12 + 1);
            console.log(err);
            $('.spinner').fadeOut('slow');
                    // time out
            if (err.code === 'ECONNABORTED') {
                fileName = 'f' + randNum;
                sweetAlert(error, timeout, true, fileName);
            }
            $('.screen__overlay').fadeOut(2000);
        });
}




export default ajaxCall;