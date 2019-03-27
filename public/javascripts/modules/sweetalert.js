import Swal from 'sweetalert2';


let timerInterval;

function sweetAlert(type, title, status, name) {
    Swal.fire({
        title: title,
        imageUrl: `/client/dist/img/${name}.jpg`,
        imageWidth: 360,
        imageHeight: 220,
        imageAlt: 'Image',
        animation: false,
        showConfirmButton: false,
        // confirmButtonText: 'Hurray',
        showCancelButton: true,
        cancelButtonText: type,
        // timer: 3000,
        // type: type,
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