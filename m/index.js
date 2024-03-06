//importar las funciones de la database
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"




const appSettings = {
    databaseURL: "https://bhyakhalo-ihes-default-rtdb.europe-west1.firebasedatabase.app/"
}


//crear variables de la database
const app = initializeApp(appSettings)
const database = getDatabase(app)
const posiciones = ref(database, "Posicionesfurbo")


//crear referencias a los elementos del HTML
const inputfield = document.getElementById("input")
const addButton = document.getElementById("Boton")
const posicionesfurbo = document.getElementById("posicionesdefutbol")


//Pintar las cosas
onValue(posiciones, function (snapshot) {
    if (snapshot.exists()) {
        clearposicionesfurbo();

        let futbolitos = Object.entries(snapshot.val());

 


        for (let i = 0; i < futbolitos.length; i++) {
           
                    appendItemtoposicionesfurbo(futbolitos[i])
                
            }
              
                     
                
            
        };
    

})

//click para añadir los elementos del input a las database
addButton.addEventListener("click", function () {
    let inputValue = inputfield.value;

    push(posiciones, inputValue);


    clearInputField()


    console.log(`${inputValue}añadido database`)
})


//borrar valor de input
function clearInputField() {
    inputfield.value = "";
}


function clearposicionesfurbo() {
    posicionesfurbo.innerHTML = "";
}


//añadir elementos a la lista html//
function appendItemtoposicionesfurbo(item) {

    let itemID = item[0];
    let itemvalue = item[1];


    let newE1 = document.createElement("li")
    newE1.className += "drag"
    newE1.textContent = itemvalue
    newE1.id = itemID;


    newE1.addEventListener('dblclick', function () {
        let location = ref(database, `Posicionesfurbo/${itemID}`)
        let quieres = confirm("ELIMINAR A JUGADOR? :(")
        if (quieres) {
            remove(location)
        }
    })
    posicionesfurbo.append(newE1)




}



