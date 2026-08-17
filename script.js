const estado = {
    raza: '',
    fotos: []
};

const inputRaza = document.getElementById('input-raza');
const btnBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-resultados');
const mensajeCarga = document.getElementById('mensaje-carga');

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

const buscarPerros = async (raza) => {
    const url = `https://dog.ceo/api/breed/${raza}/images/random/10`;

    mensajeCarga.style.display = 'block';
    contenedorResultados.innerHTML = ''; 

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la petición: Estado ${response.status}`);
        }

        const data = await response.json();

        estado.fotos = data.message;
        render();

    } catch (error) {

        console.error("Hubo un problema al buscar los perros:", error);
        
        estado.fotos = [];
        contenedorResultados.innerHTML = `<p style="color: red;">No pudimos encontrar la raza "${raza}". Revisá que esté bien escrita.</p>`;
    } finally {
        mensajeCarga.style.display = 'none';
    }
};

btnBuscar.addEventListener('click', () => {
    estado.raza = inputRaza.value.trim().toLowerCase();

    if (estado.raza === '') {
        alert('Por favor ingresá una raza.');
        return;
    }

    buscarPerros(estado.raza);
});