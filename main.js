document.getElementById('generar').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const campoContrasena = document.getElementById('contrasena');

    if (isNaN(cantidad) || cantidad < 1) {
        alert("ingresa un número mayor a 1.");
        campoContrasena.value = '';
        return;
    }

    const mayusculas = document.getElementById('mayusculas').checked;
    const minusculas = document.getElementById('minusculas').checked;
    const numeros = document.getElementById('numeros').checked;
    const caracteres = document.getElementById('caracteres').checked;

    const contrasena = generarContrasena(cantidad, { mayusculas, minusculas, numeros, caracteres });
    campoContrasena.value = contrasena;

    const fortaleza = evaluarFortaleza(contrasena, { mayusculas, minusculas, numeros, caracteres });
    document.getElementById('fortaleza').innerText = `Fortaleza: ${fortaleza}`;
});
function evaluarFortaleza(contrasena, requisitos) {
    if (contrasena.length < 8) {
        return "Débil";
    }

    let tiposCumplidos = 0;
    if (requisitos.mayusculas && /[A-Z]/.test(contrasena)) tiposCumplidos++;
    if (requisitos.minusculas && /[a-z]/.test(contrasena)) tiposCumplidos++;
    if (requisitos.numeros && /\d/.test(contrasena)) tiposCumplidos++;
    if (requisitos.caracteres && /[!@#$%^&*()]/.test(contrasena)) tiposCumplidos++;

    if (tiposCumplidos === 4) {
        return "Fuerte";
    } else if (tiposCumplidos > 0) {
        return "Media";
    } else {
        return "Débil";
    }
}
function generarContrasena(longitud, requisitos) {
    const caracteres = {
        mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        minusculas: 'abcdefghijklmnopqrstuvwxyz',
        numeros: '0123456789',
        caracteresEspeciales: '!@#$%^&*()'
    };

    let posiblesCaracteres = '';
    if (requisitos.mayusculas) posiblesCaracteres += caracteres.mayusculas;
    if (requisitos.minusculas) posiblesCaracteres += caracteres.minusculas;
    if (requisitos.numeros) posiblesCaracteres += caracteres.numeros;
    if (requisitos.caracteres) posiblesCaracteres += caracteres.caracteresEspeciales;

    if (posiblesCaracteres.length === 0) {
        alert("Debes seleccionar al menos una opción de caracteres.");
        return '';
    }

    let contrasena = '';

    if (requisitos.mayusculas) contrasena += caracteres.mayusculas.charAt(Math.floor(Math.random() * caracteres.mayusculas.length));
    if (requisitos.minusculas) contrasena += caracteres.minusculas.charAt(Math.floor(Math.random() * caracteres.minusculas.length));
    if (requisitos.numeros) contrasena += caracteres.numeros.charAt(Math.floor(Math.random() * caracteres.numeros.length));
    if (requisitos.caracteres) contrasena += caracteres.caracteresEspeciales.charAt(Math.floor(Math.random() * caracteres.caracteresEspeciales.length));

    for (let i = contrasena.length; i < longitud; i++) {
        contrasena += posiblesCaracteres.charAt(Math.floor(Math.random() * posiblesCaracteres.length));
    }

    return contrasena.split('').sort(() => 0.5 - Math.random()).join('');
}

function esContrasenaFuerte(contrasena) {
    return /[A-Z]/.test(contrasena) &&
        /[a-z]/.test(contrasena) &&
        /\d/.test(contrasena) &&
        /[!@#$%^&*()]/.test(contrasena);
}

document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('cantidad').value = '';
    document.getElementById('contrasena').value = '';
    document.getElementById('fortaleza').innerText = '';
});
