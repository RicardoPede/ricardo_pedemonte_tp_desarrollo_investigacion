const localGallery = document.querySelector('#localImagenes');

const obtenerGallery = async () => {
    // Pedir las imagenes al servidor
    const data = await fetch('http://localhost:8000/api', {
        method: 'GET'
    });
    const imagenes = await data.json();
    return imagenes;
}
const obtenerGalleryLocal = (imagenes, tablaElement) => {
    let registros = '';
    imagenes.forEach(imagenes => {
        registros += `
        <tr id="${imagenes.id}">           
            <td>${imagenes.name}</td>
            <td>${imagenes.mimetype}</td>
            <td>${dayjs(imagenes.creation).format('DD-MM-YYYY HH:mm:ss')}</td>
            <td class=" h-25 w-25 text-center text-light"><img src="/api/${imagenes.id}" class="rounded img-fluid bg-dark" alt="No hay imagen cargada"></td>
            <td>
            <button class="container btn btn-danger btn-sm fa-solid fa-trash" data-id="${imagenes.id}" onClick=eliminarImagen(event)></button>
            </td>
        </tr>
    `
    })
    tablaElement.innerHTML = registros;
}
const eliminarImagen = async (event) => {
    console.log(event)
    const id = event.target.dataset.id;

    Swal.fire({
        title: "Estás seguro?",
        text: `Estás por eliminar a una imagen del almacenamiento local!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Estoy seguro!",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/api/${id}`, {
                    method: 'DELETE',
                });

                const data = await response.json();

                Swal.fire({
                    icon: "success",
                    title: "Imagen eliminada",
                    text: data.message,
                });
                setTimeout(() => {
                    window.location.reload();
                }, 2200);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', async () => {
    // Mostrar las imagenes en la tabla
    const tbody = document.querySelector('#localImagenes');
    const imagenes = await obtenerGallery() // undefined si obtenerDatos no retorna nada
    obtenerGalleryLocal(imagenes, tbody)
});


