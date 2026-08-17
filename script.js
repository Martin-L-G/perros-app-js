// 1. Objeto de estado
const estado = {
    raza: '',
    fotos: []
};

// Referencias al DOM
const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');

// 2. Función render para mostrar las imágenes
const render = () => {
    // Limpiar el contenido previo antes de mostrar nuevos resultados
    contenedorResultados.innerHTML = ''; 

    // Recorrer el array de fotos y crear elementos <img>
    estado.fotos.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = `Foto de perro raza ${estado.raza}`;
        contenedorResultados.appendChild(imgElement);
    });
};

// 3. Evento de clic en el botón de búsqueda
btnBuscar.addEventListener('click', () => {
    // A. Capturar el valor del input y actualizar el estado
    estado.raza = inputRaza.value.trim().toLowerCase();

    if (estado.raza === '') {
        alert('Por favor ingresá una raza.');
        return;
    }

    // C. Array hardcodeado de 3 URLs para probar el renderizado
    estado.fotos = [
        'https://images.dog.ceo/breeds/hound-afghan/n02088537_2024.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088537_3345.jpg',
        'https://images.dog.ceo/breeds/hound-afghan/n02088537_4889.jpg'
    ];

    // B y C: Llamar a render (que ya incluye el paso de limpiar el contenedor)
    render();
});