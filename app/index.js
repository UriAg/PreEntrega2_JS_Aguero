//Simulación de base de datos
const persona1 = {
    id: 1,
    nombre: 'Aitor Tilla',
    rol: 'Cliente'
}
const persona2 = {
    id: 8,
    nombre: 'Alba Sura',
    rol: 'Cliente'
}
const persona3 = {
    id: 5,
    nombre: 'Alex Cremento',
    rol: 'Empleado'
}
const persona4 = {
    id: 4,
    nombre: 'Ana Busado de Hesa',
    rol: 'Empleado'
}
const persona5 = {
    id: 3,
    nombre: 'Andrés Trozado',
    rol: 'Cliente'
}
const persona6 = {
    id: 6,
    nombre: 'Armando Bronca Segura',
    rol: 'Empleado'
}
const persona7 = {
    id: 7,
    nombre: 'Dolores Delano',
    rol: 'Cliente'
}
const persona8 = {
    id: 2,
    nombre: 'Elba Surero',
    rol: 'Jefe'
}
const personas = [persona1, persona2, persona3, persona4, persona5, persona6, persona7, persona8];

//Mostrando personas
const container = document.querySelector('.lista-personas');

personas.forEach(persona =>{

    let InfoPersona = document.createElement('div');
    InfoPersona.classList.add('item');
    InfoPersona.textContent = persona.nombre;
    container.appendChild(InfoPersona);
    
});

//Accion de botones
const btnNombre = document.querySelector('.b-n');
const btnCategoria = document.querySelector('.b-c');
const resultado = document.querySelector('.resultado')

//Busqueda por nombre
btnNombre.addEventListener('click', (e)=>{

    let EntradaNombre = prompt('Ingresar nombre');

    if(EntradaNombre != null || EntradaNombre != undefined){
        let InfoRequerida = personas.find((e)=> e.nombre.toLowerCase() === EntradaNombre.toLocaleLowerCase());
        resultado.innerHTML = `
        Nombre: <b>${InfoRequerida.nombre}</b><br>
        ID: ${InfoRequerida.id}<br>
        Rol: ${InfoRequerida.rol}
        `
    }else{
        alert('Operación cancelada')
    }

});

//Filtrado por Rol
btnCategoria.addEventListener('click', (e)=>{

    let EntradaRol = prompt('Ingresar rol');

    if(EntradaRol != null || EntradaRol != undefined){

        let InfoRequerida = personas.filter((e)=> e.rol.toLowerCase() === EntradaRol.toLocaleLowerCase());
        InfoRequerida.map(persona =>{
            let InfoPersona = document.createElement('div');
            InfoPersona.classList.add('item-respuesta');
            InfoPersona.innerHTML = `
            Nombre: ${persona.nombre}<br>
            ID: ${persona.id}<br>
            Rol: <b>${persona.rol}</b>
            `;
            resultado.appendChild(InfoPersona);
        });

    }else{
        alert('Operación cancelada')
    }
});