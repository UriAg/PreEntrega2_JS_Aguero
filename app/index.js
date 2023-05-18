//Simulación de base de datos
const persona1 = {
    id: 2,
    nombre: 'Aitor Tilla',
    rol: 'Cliente',
    fecha_reg: '10/08/2000'
}
const persona2 = {
    id: 8,
    nombre: 'Alba Sura',
    rol: 'Cliente',
    fecha_reg: '10/08/2000'
}
const persona3 = {
    id: 5,
    nombre: 'Alex Cremento',
    rol: 'Empleado',
    fecha_reg: '02/05/1995'
}
const persona4 = {
    id: 4,
    nombre: 'Ana Busado de Hesa',
    rol: 'Empleado',
    fecha_reg: '02/05/1995'
}
const persona5 = {
    id: 3,
    nombre: 'Andrés Trozado',
    rol: 'Cliente',
    fecha_reg: '10/08/2000'
}
const persona6 = {
    id: 6,
    nombre: 'Armando Bronca Segura',
    rol: 'Empleado',
    fecha_reg: '02/05/1995'
}
const persona7 = {
    id: 7,
    nombre: 'Dolores Delano',
    rol: 'Cliente',
    fecha_reg: '10/08/2000'
}
const persona8 = {
    id: 1,
    nombre: 'Elba Surero',
    rol: 'Jefe',
    fecha_reg: '02/05/1995'
}
const personas = [persona1, persona2, persona3, persona4, persona5, persona6, persona7, persona8];
const roles = ["Jefe", "Empleado", "Cliente"];
//La almaceno en el localStorage
localStorage.setItem('lista', JSON.stringify(personas));
localStorage.setItem('roles', JSON.stringify(roles));

//Mostrando personas
const container = document.querySelector('.lista-personas');
JSON.parse(localStorage.getItem('lista')).forEach(persona =>{
    let InfoPersona = document.createElement('div');
    InfoPersona.classList.add('item');
    InfoPersona.textContent = persona.nombre;
    container.appendChild(InfoPersona);
});

//Mostrando roles
const containerRoles = document.querySelector('.lista-roles');
JSON.parse(localStorage.getItem('roles')).forEach(rol =>{
    let InfoPersona = document.createElement('div');
    InfoPersona.classList.add('item');
    InfoPersona.textContent = rol;
    containerRoles.appendChild(InfoPersona);
});

//Accion de botones
const btnNombre = document.querySelector('.b-n');
const btnCategoria = document.querySelector('.b-c');
const resultado = document.querySelector('.resultado')

//Busqueda por nombre
btnNombre.addEventListener('click', (e)=>{

    let EntradaNombre = prompt('Ingresar nombre');

    if(EntradaNombre != null || EntradaNombre != undefined){
        let InfoRequerida = JSON.parse(localStorage.getItem('lista')).find((e)=> e.nombre.toLowerCase() === EntradaNombre.toLocaleLowerCase());
        resultado.innerHTML = `
        Nombre: <b>${InfoRequerida.nombre}</b><br>
        ID: ${InfoRequerida.id}<br>
        Rol: ${InfoRequerida.rol}<br>
        Fecha de registro: ${InfoRequerida.fecha_reg}
        `
    }else{
        alert('Operación cancelada')
    }

});

//Filtrado por Rol
btnCategoria.addEventListener('click', (e)=>{

    let EntradaRol = prompt('Ingresar rol');

    if(EntradaRol != null || EntradaRol != undefined){

        let InfoRequerida = JSON.parse(localStorage.getItem('lista')).filter((e)=> e.rol.toLowerCase() === EntradaRol.toLocaleLowerCase());
        resultado.innerHTML = "";
        InfoRequerida.map(persona =>{
            let InfoPersona = document.createElement('div');
            InfoPersona.classList.add('item-respuesta');
            InfoPersona.innerHTML = `
            Nombre: ${persona.nombre}<br>
            ID: ${persona.id}<br>
            Rol: <b>${persona.rol}</b><br>
            Fecha de registro: ${persona.fecha_reg}
            `;
            resultado.appendChild(InfoPersona);
        });

    }else{
        alert('Operación cancelada')
    }
});