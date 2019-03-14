import axios from 'axios';

function ajaxCall(e) {
    e.preventDefault();
    // start a preloader
    $('.screen__overlay').fadeIn();
    $('.spinner').fadeIn();

    const answer = $('#answer').val();
    axios({
            method: 'post',
            url: '/play',
            data: {
                answer
            }
        })
        .then(res => {
            // stop preloader
            $('.spinner').fadeOut('slow');
            $('.screen__overlay').fadeOut('slow');

            // console.log(res);
            if (res.data.status === true) {
                // render new qn
                location.reload(true);
            } else {
                // clear input field
                $('#answer').val('');
                // show a popup
                // alert('Wrong answer, try again.');
            }
        })
        .catch(err => {
            console.log(err);
        });
}




export default ajaxCall;