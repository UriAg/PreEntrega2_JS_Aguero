const container = document.querySelector('.lista-personas');
const containerRoles = document.querySelector('.lista-roles');
const addBtn = document.querySelector('.b-a');
const btnNombre = document.querySelector('.b-n');
const btnCategoria = document.querySelector('.b-c');
//Registro JSON local
//La almaceno en el localStorage
fetch('./app/lista.json')
.then((res)=> res.json())
.then((data)=>{
    localStorage.setItem('lista', JSON.stringify(data));
})
.catch((err)=>{
    container.innerHTML = `
        <h3 class="err-msg">Hubo un problema al cargar los registros</h3>
    `;
    containerRoles.innerHTML = `
        <h3 class="err-msg">Hubo un problema al cargar los registros</h3>
    `;
    function changeStyle(b){
        b.disabled = true;
        b.classList.remove('able');
        b.classList.add('disabled-btn');
    }
    changeStyle(addBtn);
    changeStyle(btnNombre);
    changeStyle(btnCategoria);
})

const roles = ["Jefe", "Empleado", "Cliente"];
localStorage.setItem('roles', JSON.stringify(roles));

//Mostrando personas
if(localStorage.getItem('lista')){
    JSON.parse(localStorage.getItem('lista')).forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = persona.nombre;
        container.appendChild(InfoPersona);
    });
}

//Mostrando roles
if(localStorage.getItem('roles')){
    JSON.parse(localStorage.getItem('roles')).forEach(rol =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = rol;
        containerRoles.appendChild(InfoPersona);
    });
}

//Accion de botones
const resultado = document.querySelector('.resultado')
const tituloBuscador = document.querySelector('.titulo-buscador');
const inputBuscador = document.querySelector('.input-buscador');
const botonBuscador = document.querySelector('.boton-buscador');
const cerrarBuscador = document.querySelector('.boton-cerrar-buscador');

//Busqueda por nombre
btnNombre.addEventListener('click', (e)=>{
    inputBuscador.value = '';
    tituloBuscador.innerText = 'Buscar por nombre';
    inputBuscador.style.border = 'none';

    botonBuscador.addEventListener('click', ()=>{
        if(inputBuscador.value){
            let InfoRequerida = JSON.parse(localStorage.getItem('lista')).find((e)=> e.nombre.toLowerCase() === inputBuscador.value.toLocaleLowerCase());
            if(InfoRequerida){
                resultado.innerHTML = `
                Nombre: <b>${InfoRequerida.nombre}</b><br>
                ID: ${InfoRequerida.id}<br>
                Rol: ${InfoRequerida.rol}<br>
                Fecha de registro: ${InfoRequerida.fecha_reg}
                `
                inputBuscador.style.border = 'none';
                cerrarBuscador.click();
            }else{
                inputBuscador.style.border = '1px solid red';
                setInterval(() => {
                    inputBuscador.style.border = 'none';
                }, 1500);
            }
        }else{
            inputBuscador.style.border = '1px solid blue';
            setInterval(() => {
                inputBuscador.style.border = 'none';
            }, 1500);
        }
        
    });

});

//Filtrado por Rol

btnCategoria.addEventListener('click', (e)=>{
    inputBuscador.value = '';
    tituloBuscador.innerText = 'Buscar por categoría';
    inputBuscador.style.border = 'none';

    botonBuscador.addEventListener('click', ()=>{
        if(inputBuscador.value){
            let InfoRequerida2 = JSON.parse(localStorage.getItem('lista')).filter((e)=> e.rol.toLowerCase() === inputBuscador.value.toLocaleLowerCase());
            if(InfoRequerida2.length){
                resultado.innerHTML = "";
                InfoRequerida2.map(persona =>{
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
                inputBuscador.style.border = 'none';
                cerrarBuscador.click();
            }else{
                inputBuscador.style.border = '1px solid red';
                setInterval(() => {
                    inputBuscador.style.border = 'none';
                }, 1500);
            }
        }else{
            inputBuscador.style.border = '1px solid blue';
            setInterval(() => {
                inputBuscador.style.border = 'none';
            }, 1500);
        }
        
    });

});

//Cerrar busqueda
cerrarBuscador.addEventListener('click', ()=>{

    inputBuscador.style.border = 'none';
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        botonBuscador.click();
    }  
});