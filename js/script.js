document.getElementById('consulta-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const codigo = document.getElementById('codigo').value.trim();

    if (!codigo) {
        alert('Por favor, ingresa un código de matrícula.');
        return;
    }

    try {
        const response = await fetch(`https://backend-verificacion.onrender.com/api/verificar/${codigo}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (data.valido === "true") {
                document.getElementById('facultad').value = data.facultad;
                document.getElementById('base').value = data.base;
                document.getElementById('nacionalidad').value = data.nacionalidad;
                alert('Código válido');
            } else {
                alert('Código no válido');
                document.getElementById('facultad').value = '';
                document.getElementById('base').value = '';
                document.getElementById('nacionalidad').value = '';
            }
        } else {
            alert('Error al consultar el código. Por favor, intenta nuevamente.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error inesperado. Revisa tu conexión a internet.');
    }
});
