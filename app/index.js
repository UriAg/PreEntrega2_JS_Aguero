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
    localStorage.setItem('lista1', JSON.stringify(data));

    //Mostrando personas
    JSON.parse(localStorage.getItem('lista1')).forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona.nombre} ${persona.apellido}`;
        container.appendChild(InfoPersona);
    });

    //Mostrando roles
    let roles = [];
    JSON.parse(localStorage.getItem('lista1')).forEach(item =>{
        roles.push(item.rol);
    });
    const arrayRoles = [...new Set(roles)];

    containerRoles.innerHTML = '';
    arrayRoles.forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona}`;
        containerRoles.appendChild(InfoPersona);
    });
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
            let InfoRequerida = JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).find((e)=> e.nombre.toLowerCase() === inputBuscador.value.toLocaleLowerCase()) ? 
            JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).find((e)=> e.nombre.toLowerCase() === inputBuscador.value.toLocaleLowerCase()) :
            JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).find((e)=> e.apellido.toLowerCase().includes(inputBuscador.value.toLocaleLowerCase()));

            if(InfoRequerida){
                resultado.innerHTML = `
                Nombre: <b>${InfoRequerida.nombre} ${InfoRequerida.apellido}</b><br>
                ID: ${InfoRequerida.id}<br>
                Rol: ${InfoRequerida.rol}<br>
                Fecha de registro: ${InfoRequerida.fecha_reg}
                `
                inputBuscador.style.border = 'none';
                cerrarBuscador.click();
                setTimeout(() => {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }, 500);
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
            let InfoRequerida2 = JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).filter((e)=> e.rol.toLowerCase() === inputBuscador.value.toLocaleLowerCase());
            if(InfoRequerida2.length){
                resultado.innerHTML = "";
                InfoRequerida2.map(persona =>{
                    let InfoPersona = document.createElement('div');
                    InfoPersona.classList.add('item-respuesta');
                    InfoPersona.innerHTML = `
                    Nombre: ${persona.nombre} ${persona.apellido}<br>
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

//Borrar datos bot
const eliminarTodos = document.querySelector('.eliminarTodos');
const eliminarBots = document.querySelector('.eliminarBots');

eliminarBots.addEventListener('click', ()=>{

    let lista = localStorage.getItem('lista1');
    let listaObjeto = JSON.parse(lista);
    listaObjeto.splice(0, 8);
    localStorage.setItem('lista1', JSON.stringify(listaObjeto));

    //Borrar nombres
    container.innerHTML = '';
    JSON.parse(localStorage.getItem('lista1')).forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona.nombre} ${persona.apellido}`;
        container.appendChild(InfoPersona);
    });

    ///Borrar roles
    let roles = [];
    JSON.parse(localStorage.getItem('lista1')).forEach(item =>{
        roles.push(item.rol);
    });
    const arrayRoles = [...new Set(roles)];

    containerRoles.innerHTML = '';
    arrayRoles.forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona}`;
        containerRoles.appendChild(InfoPersona);
    });
});

//Borrar todos los datos
eliminarTodos.addEventListener('click', ()=>{

    let lista = localStorage.getItem(localStorage.key(imprimir.value));
    let listaObjeto = JSON.parse(lista);
    listaObjeto.splice(0, lista.length+1);
    localStorage.setItem((localStorage.key(imprimir.value)), JSON.stringify(listaObjeto));

    //Borrar nombres
    container.innerHTML = '';
    JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona.nombre} ${persona.apellido}`;
        container.appendChild(InfoPersona);
    });

    ///Borrar roles
    let roles = [];
    JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).forEach(item =>{
        roles.push(item.rol);
    });
    const arrayRoles = [...new Set(roles)];

    containerRoles.innerHTML = '';
    arrayRoles.forEach(persona =>{
        let InfoPersona = document.createElement('div');
        InfoPersona.classList.add('item');
        InfoPersona.textContent = `${persona}`;
        containerRoles.appendChild(InfoPersona);
    });
});