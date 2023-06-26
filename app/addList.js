const title = document.querySelector('.login-title');
const inputNombreLista = document.querySelector('.nombre-lista');
const loginBtn = document.querySelector('.b-i');
const registroBtn = document.querySelector('.completar-registro');
const cerrarBtn = document.querySelector('.cancelar-registro');
const guardadoRapido = document.querySelector('.guardado-rapido');

loginBtn.addEventListener('click', (e)=>{
    inputNombreLista.value = '';
    inputNombreLista.style.border = 'none';
});

//Accion guardar como
registroBtn.addEventListener('click', ()=>{
    if(inputNombreLista.value){
        let nombreLista = inputNombreLista.value;
        if(localStorage.getItem(`${nombreLista.replace(/\s/g,'').toLowerCase()}`)){
            swal({
                title: "¿Sobreescibir?",
                text: "Actualmente hay una lista con este nombre, desea sobreescribir los datos guardados?",
                icon: "warning",
                buttons: {
                    cancel: "Cancelar",
                    aceptar: {
                        text: "Sobreescribir"
                    }
                }
                })
                .then((res) => {
                if (res) {
                    localStorage.setItem(`${nombreLista.replace(/\s/g,'').toLowerCase()}`, localStorage.getItem(localStorage.key(imprimir.value)));
                    swal("¡Se ha sobreescrito el listado con exito!", {
                        icon: "success",
                    });
                    cerrarBtn.click();
                } else {
                    swal("No se sobreescribieron los datos");
                }
            });
        }else{
            localStorage.setItem(`${nombreLista.replace(/\s/g,'').toLowerCase()}`, localStorage.getItem(localStorage.key(imprimir.value)));
            cerrarBtn.click();
            Toastify({
                text: `La lista: ${localStorage.key(imprimir.value)} se ha guardado con exito`,
                className: "info",
                gravity: "bottom",
                style: {
                    background: "#00b09b",
                }
            }).showToast();
        }
    }else{
        inputNombreLista.style.border = '1px solid red';
        setInterval(() => {
            inputNombreLista.style.border = 'none';
        }, 1500);
    }
});

//Accion guardar
guardadoRapido.addEventListener('click', ()=>{
    localStorage.setItem(localStorage.key(imprimir.value), localStorage.getItem(localStorage.key(imprimir.value)));
    Toastify({
        text: `La lista: ${localStorage.key(imprimir.value)} se ha guardado con exito`,
        className: "info",
        gravity: "bottom",
        style: {
            background: "#00b09b",
        }
    }).showToast();
});

