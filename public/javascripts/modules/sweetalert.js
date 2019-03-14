import Swal from 'sweetalert2';


let timerInterval;

function sweetAlert(type, title, status) {
    Swal.fire({
        title: title,
        type: type,
        showConfirmButton: false,
        timer: 1500,
    });
    // .then((result) => {
        // if (result.dismiss === Swal.DismissReason.timer) {
        //     if (status) {

        //     } 
        //     // else {
        //     //     $('.screen__overlay').fadeOut('slow');
        //     // }
        // }
    // })
}





export default sweetAlert;