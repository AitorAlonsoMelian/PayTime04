  $(document).ready(function(){
    $('.modal').modal();
  });

document.addEventListener("DOMContentLoaded", (event) => {

    const list = document.querySelector("#tareaslist");
    list.innerHTML = "";

    db.collection("Tareas").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            list.innerHTML += `<a href="#!" class="collection-item text-grey center-align"> 
              Tarea: ` + doc.data().Nombre_tarea + " <br> Destinatario: " + doc.data().Destinatario + " <br> Descripcion: " + doc.data().Descripcion + " <br> Horas empleadas: " + doc.data().Horas +` 
            </a>`;

        });
    })
});

const boton = document.querySelector("#botonEnviarTarea");
boton.addEventListener("click", () => {

    const name = document.querySelector("#nombreTarea").value;
    const destinadario = document.querySelector("#destinoTarea").value;
    const descripcion = document.querySelector("#descripcionTarea").value;
    const horas = document.querySelector("#horasTarea").value;

    db.collection("Tareas").add({
            Nombre_tarea: name,
            Destinatario: destinadario,
            Descripcion: descripcion,
            Horas: horas

        })
        .then((docRef) => {
            console.log("Contacto añadido a la BD con ID: ", docRef.id);
            document.querySelector('#nombreTarea').value = '';
            document.querySelector('#destinoTarea').value = '';
            document.querySelector('#descripcionTarea').value = '';
            document.querySelector('#horasTarea').value = '';            
            const contactModal = document.querySelector("#modalTarea");
            const instance = M.Modal.getInstance(contactModal);
            instance.close()
            M.toast({
                html: `Contacto añadido con éxito`,
                classes: "rounded blue-grey darken-2",
                displayLength: 4000
            })
        })
        .catch((docRef) => {
            console.log("Error añadiendo contacto: ", error);
            document.querySelector('#nombreTarea').value = '';
            document.querySelector('#destinoTarea').value = '';
            document.querySelector('#descripcionTarea').value = '';
            document.querySelector('#horasTarea').value = '';
            const contactModal = document.querySelector("#modalTarea");
            const instance = M.Modal.getInstance(contactModal);
            instance.close()
            M.toast({
                html: `Error añadiendo contacto`,
                classes: "rounded blue-grey darken-2",
                displayLength: 4000
            })
        })

});

// Escritura de los elementos del documento
document.addEventListener("DOMContentLoaded", event => {
    db.collection("Tareas").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });

});