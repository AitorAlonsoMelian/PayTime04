  $(document).ready(function(){
    $('.modal').modal();
  });
    
  document.addEventListener("DOMContentLoaded", (event) => {

    const list = document.querySelector("#contactlist");
    list.innerHTML = "";
    
    db.collection("Contactos").get().then((snapshot) => {
        snapshot.forEach( (doc) => {
            list.innerHTML += `<a href="#!" class="collection-item text-grey center-align"> Nombre: ` + doc.data().Nombre + " <br> Email: "+ doc.data().Correo + ` </a>`; 
        });
    })
});

const boton = document.querySelector("#botonEnviar");
boton.addEventListener("click", () => {

    const name = document.querySelector("#UserName").value;
    const email = document.querySelector("#UserEmail").value;

    db.collection("Contactos").add({
        Correo: email,
        Nombre: name
        
    })
    .then((docRef) => {
        console.log("Contacto añadido a la BD con ID: ", docRef.id);
        document.querySelector('#UserName').value = '';
        document.querySelector('#UserEmail').value = '';
        const contactModal = document.querySelector("#modalContacto");
        const instance = M.Modal.getInstance(contactModal);
        instance.close()
    })
    .catch( (docRef) => {
        console.log("Error añadiendo contacto: ",error);
        document.querySelector('#UserName').value = '';
        document.querySelector('#UserEmail').value = '';
        const contactModal = document.querySelector("#modalContacto");
        const instance = M.Modal.getInstance(contactModal);
        instance.close()
  
    })
 
});


document.addEventListener("DOMContentLoaded", event => {
    db.collection("Contactos").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
    
});
