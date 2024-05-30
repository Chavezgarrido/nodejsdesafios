const { registrar, leer } = require('./operaciones');

const operacion = process.argv[2];

if (operacion === 'registrar'){
    const [nombre, edad, animal, color, enfermedad] = process.argv.slice(3);
    if (!nombre || !edad || !animal || !color || !enfermedad){
        console.error('Faltan datos para la cita, favor proporcionar nombre, edad, animal, color y enfermedad del paciente')
    } else{
        registrar({ nombre, edad, animal, color, enfermedad });

    }
} else if (operacion === 'leer'){
        leer();
 
} else{
        console.error('Operacion no válida. las operaciones válidas son "registrar" y "leer".');
    }


