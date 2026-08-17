
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
        contenedorResultados.innerHTML = '<p>No se encontraron fotos. ¡Probá con otro código de raza (ej: siam, beng)!</p>';
        return;
    }


    estado.fotos.forEach(foto => {
        const imgElement = document.createElement('img');
        imgElement.src = foto.url; 
        imgElement.alt = `Foto de gato raza ${estado.raza}`;
        contenedorResultados.appendChild(imgElement);
    });
};


const buscarGatos = async (raza) => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${raza}`;

    mensajeCarga.style.display = 'block';
    contenedorResultados.innerHTML = ''; 

    try {
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error en la petición: Estado ${response.status}`);
        }

        const data = await response.json();

        if (data.length === 0) {
            throw new Error("Raza no encontrada");
        }

        estado.fotos = data;
        render();

    } catch (error) {
        console.error("Hubo un problema al buscar los gatos:", error);
        
        estado.fotos = [];
        contenedorResultados.innerHTML = `<p style="color: red;">No pudimos encontrar la raza "${raza}". Acordate de usar códigos cortos (ej: siam, pers, beng).</p>`;
    } finally {
        mensajeCarga.style.display = 'none';
    }
};

btnBuscar.addEventListener('click', () => {
    estado.raza = inputRaza.value.trim().toLowerCase();

    if (estado.raza === '') {
        alert('Por favor ingresá una raza de gato.');
        return;
    }

    buscarGatos(estado.raza);
});