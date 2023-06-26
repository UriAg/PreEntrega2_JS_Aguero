const botonAbrir = document.querySelector('.b-a');
const botonCerrar = document.querySelector('.cancelar-formulario');
const botonAgregar = document.querySelector('.completar-formulario');
const inputNombre = document.querySelector('.input-nombre');
const inputApellido = document.querySelector('.input-apellido');
const inputRol = document.querySelector('.input-rol');
const overlay = document.querySelector('.overlay');

//Abrir formulario
botonAbrir.addEventListener('click', function(){
    inputNombre.style.border = 'none';
    inputApellido.style.border = 'none';
    inputRol.style.border = 'none';
});

//Cerrar formulario
botonCerrar.addEventListener('click', function(){
    inputNombre.value = "";
    inputNombre.style.border = 'none';
    inputApellido.value = "";
    inputApellido.style.border = 'none';
    inputRol.value = "";
    inputRol.style.border = 'none';
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        botonAgregar.click();
    }  
});

//Accion agregar registro
botonAgregar.addEventListener('click', (e)=>{
    //Validación de campo
    let Vnom;
    let Vap;
    let Vrol;
    if(!inputNombre.value){
        inputNombre.style.border = '1px solid red';
        setInterval(() => {
            inputNombre.style.border = 'none';
        }, 1500);
    }else{
        Vnom = inputNombre.value;
    }

    if(!inputApellido.value){
        inputApellido.style.border = '1px solid red';
        setInterval(() => {
            inputApellido.style.border = 'none';
        }, 1500);
    }else{
        Vap = inputApellido.value;
    }

    if(!inputRol.value){
        inputRol.style.border = '1px solid red';
        setInterval(() => {
            inputRol.style.border = 'none';
        }, 1500);
    }else{
        Vrol = inputRol.value
        
    }

    let today = new Date();
    if(Vnom && Vap && Vrol){
        if(localStorage.getItem(localStorage.key(imprimir.value))){
            //Agregar el registro
            let lista = JSON.parse(localStorage.getItem(localStorage.key(imprimir.value)));
            let cantidadIDs = lista.length;
    
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear()
    
            let registro = {
                id: cantidadIDs+1,
                nombre: Vnom,
                apellido: Vap,
                rol: Vrol,
                fecha_reg: `${day}/${month}/${year}`
            }
            lista = [...lista, registro];
            localStorage.setItem((localStorage.key(imprimir.value)), JSON.stringify(lista));
    
            botonCerrar.click();
    
            swal({
                title: "Listo!",
                text: "Registro agregado exitosamente!",
                icon: "success",
                buttons: {
                    add: {
                        text: "Agregar otro",
                        value: "add"
                    },
                    close: "Cerrar"
                }
            }).then((agregarOtro)=>{
                if(agregarOtro === "add"){
                    botonAbrir.click();
                }
            })
    
            //Actualizar lista visible
            container.innerHTML = '';
            JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).forEach(persona =>{
                let InfoPersona = document.createElement('div');
                InfoPersona.classList.add('item');
                InfoPersona.textContent = `${persona.nombre} ${persona.apellido}`;
                container.appendChild(InfoPersona);
            });

            //Actualizar lista visible
            containerRoles.innerHTML = '';
            let rolesArray = [];
            JSON.parse(localStorage.getItem(localStorage.key(imprimir.value))).forEach(item =>{
                rolesArray.push(item.rol);
            });
            const arrayRoles = [...new Set(rolesArray)];

            containerRoles.innerHTML = '';
            arrayRoles.forEach(persona =>{
                let InfoPersona = document.createElement('div');
                InfoPersona.classList.add('item');
                InfoPersona.textContent = `${persona}`;
                containerRoles.appendChild(InfoPersona);
            });
        }
    }
});