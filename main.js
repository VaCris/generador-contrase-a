document.getElementById('generar').addEventListener('click', () => {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const campoContrasena = document.getElementById('contrasena');

    if (cantidad <= 7) {
        alert("ingresa un numero mayor a 7.");
        campoContrasena.value = '';
        return;
    }

    const contrasena = generarContrasena(cantidad);
    campoContrasena.value = contrasena;

    
});

function generarContrasena(longitud) {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let contrasena = '';
    contrasena += caracteres.charAt(Math.floor(Math.random() * 26)); // M
    contrasena += caracteres.charAt(Math.floor(Math.random() * 26) + 26); // m
    contrasena += caracteres.charAt(Math.floor(Math.random() * 10) + 52); // N
    contrasena += caracteres.charAt(Math.floor(Math.random() * 10) + 62); // S

    for (let i = 4; i < longitud; i++) {
        contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    return contrasena.split('').sort(() => 0.5 - Math.random()).join('');
}

function esContrasenaFuerte(contrasena) {
    return /[A-Z]/.test(contrasena) && /[a-z]/.test(contrasena) && /\d/.test(contrasena) && /[!@#$%^&*()]/.test(contrasena);
}

document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('cantidad').value = '';
    document.getElementById('contrasena').value = '';
});
