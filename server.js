const express = require('express');

const server = express();

server.use(express.json());

const exercicios = [
    {musculo: 'Biceps'},
    {series: '3x15'},
    {carga: '20 quilos'},
    {descanso: '1 minuto'}
]

server.get('/exercicios', function(request, response) {
    response.json(exercicios);
})

server.post('/exercicios', function(request, response) {
    
    const {musculo, series, carga, descanso} = request.body;

    exercicios.push({musculo, series, carga, descanso});
    response.status(204).send();
})

server.put('/exercicios/:id', function(request, response){

        const id = request.params.id;
        const {musculo, series, carga, descanso} = request.body;

        for(let i = 0; i < exercicios.length; i++){
            if(exercicios[i].musculo == id){
                exercicios[i].musculo = musculo;
                exercicios[i].series = series;
                exercicios[i].carga = carga;
                exercicios[i].descanso = descanso;
                break;                
            }
        }

        return response.status(204).send();
})

server.delete('/exercicios/:id', function(request, response){

        const id = request.params.id;
        for(let i = 0; i < exercicios.length; i++){
            if(exercicios[i].musculo == id){
                exercicios.splice(i, 1);
                break;                
            }
        }

        return response.status(204).send();

})

server.listen(process.env.PORT || 3000);