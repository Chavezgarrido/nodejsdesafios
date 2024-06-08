import express from 'express';
import { logger } from 'logger-express';
import path from 'path';
import fs from "fs";


const PORT = 5000;
const app = express( );
const __dirname = path.resolve();
const REPERTORIO_PATH = './repertorio.json';

//MIDDLEWARE

app.use(logger());
app.use(express.json());


//HOME//
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//RUTA CANCIONES//
app.get("/canciones", (req, res) => {
    
    try{
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        res.status(200).json(repertorio);
    } catch(error){
        res.status(500).json({ message:"El recurso no está disponible" });
    }
});

//CREAR//
app.post("/canciones", (req, res) => {
    try{
        const cancion = req.body
        const repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        repertorio.push(cancion);
        fs.writeFileSync("repertorio.json", JSON.stringify(repertorio));
        res.status(201).send("Cancion agregada con éxito!");
    } catch(error){
        res.status(500).json({message: "Algo falló" + error});
    }
});

//EDITAR//
app.put('/canciones/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cancionActualizada = req.body;

    fs.readFile(REPERTORIO_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error al leer el repertorio' });
        }

        let canciones = JSON.parse(data);
        const indice = canciones.findIndex(c => c.id === id);

        if (indice === -1) {
            return res.status(404).json({ error: 'Canción no encontrada' });
        }

        canciones[indice] = { ...canciones[indice], ...cancionActualizada };

        fs.writeFile(REPERTORIO_PATH, JSON.stringify(canciones, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error al actualizar la canción' });
            }
            res.json(canciones[indice]);
        });
    });
});


//BORRAR//
app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params;

    try {
        let repertorio = JSON.parse(fs.readFileSync("repertorio.json", "utf8"));
        const actualizarRepertorio = repertorio.filter(cancion => cancion.id === id );

        if(actualizarRepertorio.length === repertorio.length) {
            return res.status(404).json({ message: "Canción no encontrada" });
        }

        fs.writeFileSync("repertorio.json", JSON.stringify(actualizarRepertorio, null, 2));
            res.status(200).json({ message: "Canción eliminada con éxito" });

    } catch(error) {
        console.error("Error al eliminar canción:", error);
        res.status(500).json({ message: "Se produjo un error al eliminar la canción" });
    }

});


//404//
app.all('*', (req, res) => {
    res.status(404).send("Ruta no encontrada");
})

app.listen(PORT, console.log(`¡Servidor encendido! http://localhost:${PORT}`));
