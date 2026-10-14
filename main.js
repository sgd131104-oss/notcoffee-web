/* ===================================================================
   main.js  —  EL "CEREBRO" DEL SITIO
   📘 APRENDE: JavaScript (JS) hace que la pagina reaccione: cuando das
   clic, cuando envias un formulario, etc. HTML = que hay, CSS = como se
   ve, JS = que hace. Este archivo lo usan todas las paginas.

   Palabras que vas a ver mucho:
   - var nombre = valor;       guarda un dato en una "caja" con nombre
   - document.querySelector()  busca un elemento de la pagina
   - addEventListener('click') "cuando le den clic, haz esto"
   - function () { ... }       un bloque de instrucciones
   =================================================================== */


/* ===================================================================
   ✏️ TU CAMBIO: CONFIGURACION
   Todo lo que tienes que personalizar de este archivo esta aqui arriba.
   =================================================================== */

// Tu link de Formspree (el que ya pegaste antes en index.html, pegalo aqui)
var FORM_ENDPOINT = "";            // ej: "https://formspree.io/f/abcd1234"

// Tu correo de contacto (sale en los mensajes de error)
var CORREO = "hola@notcoffee.mx";

// El codigo secreto de descuento y lo que ofrece
var CODIGO_DESCUENTO = "PRIMERALATA";
var TEXTO_DESCUENTO = "[XX]% en tu primer pedido de lanzamiento";


/* ===================================================================
   1) FORMULARIOS DE LISTA DE ESPERA
   Busca todos los formularios con class="js-lista" y les dice que hacer
   cuando alguien da "enviar".
   =================================================================== */
document.querySelectorAll('.js-lista').forEach(function (form) {
  // el mensajito de abajo del formulario ("¡Listo!", "error", etc.)
  var msg = form.parentElement.querySelector('.form-msg');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // evita que la pagina se recargue

    var email = form.querySelector('input[type=email]');

    // si el correo esta vacio o mal escrito, avisa y no envia
    if (!email.value || !email.checkValidity()) {
      msg.textContent = 'Escribe un correo válido.';
      email.focus();
      return;
    }

    // si todavia no pegas tu link de Formspree
    if (!FORM_ENDPOINT) {
      msg.textContent = 'Formulario en configuración. Escríbenos a ' + CORREO;
      return;
    }

    var btn = form.querySelector('button');
    btn.disabled = true;
    msg.textContent = 'Enviando…';

    // fetch = mandar los datos por internet a Formspree
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (respuesta) {
      if (respuesta.ok) {
        form.reset();
        msg.textContent = '¡Listo! Ya estás en la lista.';
      } else {
        msg.textContent = 'Algo falló, intenta otra vez.';
      }
    }).catch(function () {
      msg.textContent = 'Sin conexión, intenta otra vez.';
    }).finally(function () {
      btn.disabled = false;
    });
  });
});


/* ===================================================================
   2) SELECTOR DE PAQUETES (pagina Tienda)
   Cuando das clic en un paquete, se marca y cambia el texto del boton.
   =================================================================== */
var packs = document.querySelectorAll('.pack');
var apartar = document.querySelector('.js-apartar');

packs.forEach(function (pack) {
  pack.addEventListener('click', function () {
    // primero desmarca todos...
    packs.forEach(function (otro) { otro.setAttribute('aria-pressed', 'false'); });
    // ...y luego marca el que tocaste
    pack.setAttribute('aria-pressed', 'true');

    if (apartar) {
      apartar.textContent = 'Apartar ' + pack.dataset.nombre;
      // si el paquete tiene link de pago, el boton lleva ahi
      apartar.href = pack.dataset.link || 'index.html#lista';
    }
  });
});


/* ===================================================================
   3) 🤫 EL SECRETO DEL FOOTER
   El boton casi invisible de hasta abajo muestra el codigo de descuento.
   =================================================================== */
var botonSecreto = document.querySelector('.js-secreto');
var cupon = document.querySelector('.cupon');

if (botonSecreto && cupon) {
  // pone tu codigo y texto dentro del cupon
  cupon.querySelector('.codigo').textContent = CODIGO_DESCUENTO;
  cupon.querySelector('small').textContent = TEXTO_DESCUENTO;

  botonSecreto.addEventListener('click', function () {
    cupon.hidden = !cupon.hidden;  // si esta escondido lo muestra, y al reves
    botonSecreto.textContent = cupon.hidden ? '¿llegaste hasta aquí?' : 'nadie más tiene que saberlo 🤫';
  });

  // boton de "copiar codigo"
  cupon.querySelector('.js-copiar').addEventListener('click', function (e) {
    navigator.clipboard.writeText(CODIGO_DESCUENTO).then(function () {
      e.target.textContent = '¡Copiado!';
    });
  });
}


/* ===================================================================
   4) DETALLES
   =================================================================== */

// pone el año actual en el footer automaticamente
document.querySelectorAll('.js-anio').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

// 📘 APRENDE: esto sale en la "consola" del navegador.
// Para verlo: en tu pagina da clic derecho > Inspeccionar > pestaña Console.
console.log('%cNOT COFFEE', 'font-size:28px;font-weight:900');
console.log('¿Viendo el código? Te ganaste algo: usa ' + CODIGO_DESCUENTO);
