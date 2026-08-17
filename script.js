const estado = {
    raza: '',
    fotos: []
};

const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');

const render = () => {
    contenedorResultados.innerHTML = ''; 

    if (estado.fotos.length === 0) {
        contenedorResultados.innerHTML = '<p>No se encontraron fotos para esa raza. ¡Intentá con otra!</p>';
        return;
    }

    estado.fotos.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = `Foto de perro raza ${estado.raza}`;
        contenedorResultados.appendChild(imgElement);
    });
};

const buscarPerros = (raza) => {
    const url = `https://dog.ceo/api/breed/${raza}/images/random/10`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la petición: Estado ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            estado.fotos = data.message;
            render();
        })
        .catch(error => {
            console.error("Hubo un problema al buscar los perros:", error);
        
            estado.fotos = [];
            render();
        });
};

btnBuscar.addEventListener('click', () => {
    estado.raza = inputRaza.value.trim().toLowerCase();

    if (estado.raza === '') {
        alert('Por favor ingresá una raza.');
        return;
    }

    buscarPerros(estado.raza);
});