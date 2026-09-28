import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js"

const firebaseConfig = {
  apiKey: "AIzaSyBptAmD9KcEgDYpUFl1mKMy4rdtAw6gJ3g",
  authDomain: "tpfb-jesusimm.firebaseapp.com",
  databaseURL: "https://tpfb-jesusimm-default-rtdb.firebaseio.com",
  projectId: "tpfb-jesusimm",
  storageBucket: "tpfb-jesusimm.firebasestorage.app",
  messagingSenderId: "88306962302",
  appId: "1:88306962302:web:456044d776ea12a3e9ed2f"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

const botonagregar = document.getElementById('agregar')

botonagregar.addEventListener('click', () => {
    const id = document.getElementById('ID').value
    const titulo = document.getElementById('titulo').value
    const plataforma = document.getElementById('plataforma').value
    const genero = document.getElementById('genero').value
    const precio = document.getElementById('precio').value
    const portada = document.getElementById('portada').value
    
    if (id === "" || titulo === "" || plataforma === "" || genero === "" || precio === "" || portada === "") {
        alert("Por favor completa todos los campos antes de guardar.")
        return
    }

    const referenciaJuego = ref(db, 'videojuegos/' + id)

    get(referenciaJuego).then((snapshot) => {
        if (snapshot.exists()) {
            alert("El ID ingresado ya está en uso. Por favor ingresa un ID diferente.")
            return
        }

        set(referenciaJuego, {
            id: id,
            titulo: titulo,
            plataforma: plataforma,
            genero: genero,
            precio: precio,
            portada: portada
        })
        .then(() => {
            alert("¡Videojuego registrado correctamente!")
            document.getElementById('ID').value = ''
            document.getElementById('titulo').value = ''
            document.getElementById('plataforma').value = ''
            document.getElementById('genero').value = ''
            document.getElementById('precio').value = ''
            document.getElementById('portada').value = ''
        })
    })
})

const contenedorcatalogo = document.getElementById('catalogo')

onValue(ref(db, 'videojuegos/'), (datosjuegos) => {
    const datos = datosjuegos.val()
    if (contenedorcatalogo) {
        contenedorcatalogo.innerHTML = ""
        if (datos) {
            Object.keys(datos).forEach((key) => {
                const juego = datos[key]
                const tarjeta = document.createElement('div')
                tarjeta.classList.add('tarjetajuego') 
                tarjeta.innerHTML = `
                    <img src="${juego.portada}" alt="${juego.titulo}" class="portada-img">
                    <h3>${juego.titulo}</h3>
                    <p class="precio">$${juego.precio}</p>

                    <div class="detalles">
                        <p><strong>Nombre:</strong> ${juego.titulo}</p>
                        <p><strong>ID:</strong> ${juego.id}</p>
                        <p><strong>Plataforma:</strong> ${juego.plataforma}</p>
                        <p><strong>Género:</strong> ${juego.genero}</p>
                        <p><strong>Precio:</strong> $${juego.precio}</p>
                    </div>
                ` 
                tarjeta.addEventListener('click', () => {
                    tarjeta.classList.toggle('expandida')
                })
                contenedorcatalogo.appendChild(tarjeta)
            })
        }
    }
})