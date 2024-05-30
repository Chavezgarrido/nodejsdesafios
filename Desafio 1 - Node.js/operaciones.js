const fs = require('fs');

function registrar(cita){
    try{
        const citas = JSON.parse(fs.readFileSync('citas.json', 'utf8'));
        citas.push(cita);
        fs.writeFileSync('citas.json', JSON.stringify(citas, null,2));
        console.log('Cita registrada con éxito');
    } catch (error) {
        console.error('Error al registrar la cita', error);
  }
}

function leer(){
    try{
        const citas = JSON.parse(fs.readFileSync("citas.json", 'utf8'));
        console.log('Citas registradas:');
        console.log(citas);
    }catch (error) {
        console.error('Error al leer las citas', error);
    }
}

module.exports = { registrar, leer };