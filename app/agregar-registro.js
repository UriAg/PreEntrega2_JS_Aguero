const botonAbrir = document.querySelector('.b-a');
const botonCerrar = document.querySelector('.cancelar-formulario');
const botonAgregar = document.querySelector('.completar-formulario');
const inputNombre = document.querySelector('.input-nombre');
const inputRol = document.querySelector('.input-rol');
const overlay = document.querySelector('.overlay');

//Abrir formulario
botonAbrir.addEventListener('click', function(){
    inputNombre.style.border = 'none';
    inputRol.style.border = 'none';
});

//Cerrar formulario
botonCerrar.addEventListener('click', function(){
    inputNombre.value = "";
    inputNombre.style.border = 'none';
    inputRol.value = "";
    inputRol.style.border = 'none';
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        botonAgregar.click();
    }  
});
    
botonAgregar.addEventListener('click', (e)=>{
    //Validación de campo
    let Vnom;
    let Vrol;
    if(!inputNombre.value){
        inputNombre.style.border = '1px solid red';
        setInterval(() => {
            inputNombre.style.border = 'none';
        }, 1500);
    }else{
        Vnom = inputNombre.value
    }

    if(!inputRol.value){
        inputRol.style.border = '1px solid red';
        setInterval(() => {
            inputRol.style.border = 'none';
        }, 1500);
    }else{
        Vrol = inputRol.value
        if(localStorage.getItem('roles')){
            if(!JSON.parse(localStorage.getItem('roles')).find((e)=> e.toLowerCase() === Vrol.toLocaleLowerCase())){
                
                let roles = JSON.parse(localStorage.getItem('roles'));
                roles = [...roles, Vrol];
                localStorage.setItem('roles', JSON.stringify(roles));
    
                //Actualizar lista visible
                containerRoles.innerHTML = '';
                JSON.parse(localStorage.getItem('roles')).forEach(rol =>{
                    let InfoPersona = document.createElement('div');
                    InfoPersona.classList.add('item');
                    InfoPersona.textContent = rol;
                    containerRoles.appendChild(InfoPersona);
                });
            }
        }
    }

    let today = new Date();
    if(Vnom && Vrol){
        if(localStorage.getItem('lista')){
            //Agregar el registro
            let lista = JSON.parse(localStorage.getItem('lista'));
            let cantidadIDs = lista.length;
    
            let day = today.getDate();
            let month = today.getMonth() + 1;
            let year = today.getFullYear()
    
            let registro = {
                id: cantidadIDs+1,
                nombre: Vnom,
                rol: Vrol,
                fecha_reg: `${day}/${month}/${year}`
            }
            lista = [...lista, registro];
            localStorage.setItem('lista', JSON.stringify(lista));
    
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
            JSON.parse(localStorage.getItem('lista')).forEach(persona =>{
                let InfoPersona = document.createElement('div');
                InfoPersona.classList.add('item');
                InfoPersona.textContent = persona.nombre;
                container.appendChild(InfoPersona);
            });
        }
    }
});