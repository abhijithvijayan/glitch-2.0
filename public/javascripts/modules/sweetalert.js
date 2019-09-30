import Swal from 'sweetalert2';

function sweetAlert(type, title, status, name) {
    Swal.fire({
        title,
        imageUrl: `/client/dist/img/${name}.jpg`,
        imageWidth: 360,
        imageHeight: 220,
        imageAlt: 'Image',
        animation: false,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: type,
    });
}

export default sweetAlert;
