const botonDesplegable = document.querySelector('.listados');
const contenedorPersonas = document.querySelector('.listados-personas');
const imprimir = document.querySelector('.imprimir-btn');
const cerrarOffcanvas = document.querySelector('.cerrar-off');

//Mostrar listas en offcanvas
if(localStorage.length){
    for(let i = 0; i < localStorage.length; i++){
        let posicion = localStorage.key(i);
        let nombreLista = document.createElement('li');
        nombreLista.classList.add('item-lista');
        nombreLista.value = i;
        nombreLista.innerHTML = `${posicion}`;
        botonDesplegable.appendChild(nombreLista);
    }
}else{
    botonDesplegable.innerHTML = `<li class="text-center"><span>No hay listas</span></li>`;
}

//Mostrar resumen de lista en offcanvas
const items = document.querySelectorAll('.item-lista');
items.forEach(item =>{
    item.addEventListener('click', ()=>{
        contenedorPersonas.innerHTML = ``;
        imprimir.value = item.value;
        JSON.parse(localStorage.getItem(localStorage.key(item.value))).forEach(infoItem =>{
            let InfoLista = document.createElement('div');
            InfoLista.classList.add('item');
            InfoLista.innerHTML = `
                <b>Nombre:</b> ${infoItem.nombre} ${infoItem.apellido}<br>
                <b>ID:</b> ${infoItem.id}<br>
                <b>Rol:</b> ${infoItem.rol}<br>
                <b>Fecha de registro:</b> ${infoItem.fecha_reg}
            `;
            contenedorPersonas.appendChild(InfoLista);
        });
    });
})

//Imprimir lista en pantalla principal
const listaActual = document.querySelector('.lista-actual');
imprimir.addEventListener('click', ()=>{
    if(imprimir.value){
        container.innerHTML = '';
        JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).forEach(persona =>{
            let InfoPersona = document.createElement('div');
            InfoPersona.classList.add('item');
            InfoPersona.textContent = `${persona.nombre} ${persona.apellido}`;
            container.appendChild(InfoPersona);
        });

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

        listaActual.textContent = `Lista actual: ${localStorage.key(imprimir.value)}`;
        cerrarOffcanvas.click();
    }else{
        Toastify({
            text: "Seleccione una lista por favor",
            className: "info",
            gravity: "bottom",
        }).showToast();
    }
});