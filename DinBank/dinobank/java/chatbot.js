/* ==========================================
   BANCO DINO
   CHATBOT
========================================== */


document.addEventListener("DOMContentLoaded", iniciarChatbot);



/* ===========================
   INICIAR CHATBOT
=========================== */


function iniciarChatbot(){


    const botonEnviar = document.getElementById("enviarMensaje");

    const input = document.getElementById("mensajeUsuario");



    if(botonEnviar && input){


        botonEnviar.addEventListener(
            "click",
            enviarMensaje
        );


        input.addEventListener(
            "keypress",
            function(event){


                if(event.key === "Enter"){


                    enviarMensaje();


                }


            }
        );


    }


}




/* ===========================
   ENVIAR MENSAJE
=========================== */


function enviarMensaje(){


    const input = document.getElementById("mensajeUsuario");


    const mensaje = input.value.trim();



    if(mensaje === ""){


        return;


    }



    agregarMensaje(
        mensaje,
        "usuario"
    );



    responderDino(mensaje);



    input.value = "";


}




/* ===========================
   AGREGAR MENSAJES
=========================== */


function agregarMensaje(
    texto,
    tipo
){



    const contenedor =
    document.getElementById("chatMensajes");



    if(!contenedor) return;



    const mensaje =
    document.createElement("p");



    mensaje.textContent = texto;



    if(tipo === "dino"){


        mensaje.classList.add("mensaje-dino");


    }

    else{


        mensaje.classList.add("mensaje-usuario");


    }



    contenedor.appendChild(mensaje);



    contenedor.scrollTop =
    contenedor.scrollHeight;


}





/* ===========================
   RESPUESTAS DEL DINO
=========================== */


function responderDino(texto){


    let mensaje =
    texto.toLowerCase();



    let respuesta =
    "";



    if(mensaje.includes("saldo")){


        respuesta =
        "🦖 Tu saldo actual está disponible en la pantalla principal.";


    }



    else if(mensaje.includes("ahorro")){


        respuesta =
        "🌱 Ahorrar hace crecer tu árbol Dino. Podés simular tu dinero desde la sección Ahorro.";


    }



    else if(mensaje.includes("transferir")){


        respuesta =
        "💸 Para transferir ingresá a la sección Transferir y completá los datos.";


    }



    else if(mensaje.includes("hola")){


        respuesta =
        "🦖 ¡Hola! Soy Dino, tu asistente de BancoDino.";


    }



    else{


        respuesta =
        "🦖 Todavía estoy aprendiendo, pero puedo ayudarte con saldo, ahorro y transferencias.";


    }



    setTimeout(()=>{


        agregarMensaje(
            respuesta,
            "dino"
        );


    },700);


}