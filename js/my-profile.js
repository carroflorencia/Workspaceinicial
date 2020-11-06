//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let savedate = {};

    if(localStorage.getItem("myprofile")!= undefined){

    savedate = JSON.parse(localStorage.getItem("myprofile"));
    
    
    document.getElementById("Name1").value = savedate.name;
    document.getElementById("Name2").value = savedate.secondname;
    document.getElementById("Lastname1").value = savedate.lastname;
    document.getElementById("Lastname2").value = savedate.secondlast;
    document.getElementById("email").value = savedate.email;
    document.getElementById("dom").value = savedate.domi;
    document.getElementById("tel").value = savedate.tel
    document.getElementById("edad").value = savedate.age;

    
    let htmlContenttoAppend = `
    <div class="card text-center bg-light">
        <div class="card-header">
            Tus datos personales
        </div>
        <div class="card-body">
        <h6> <b>Tu nombre</b>: `+ savedate.name + ` ` + savedate.secondname + ` ` + savedate.lastname + ` ` + savedate.secondlast +` </h6>
        <br>
        <p class="mb-0"><b>Mail:</b> `+ savedate.email +`</p>
        <p class="mb-0"><b>Domicilio:</b> `+ savedate.domi +`</p>
        <p class="mb-0"><b>Teléfono:</b> `+ savedate.tel +`</p>
        <p class="mb-0"><b>Edad:</b> `+ savedate.age + `</p>
        </div>

    </div>
    `
    document.getElementById("div").innerHTML = htmlContenttoAppend;


    };
        
});

document.getElementById("guardarcambios").addEventListener("click", function(){

    let myProfile = new Object();

    myProfile.name = document.getElementById("Name1").value;
    myProfile.secondname = document.getElementById("Name2").value;
    myProfile.lastname = document.getElementById("Lastname1").value;
    myProfile.secondlast = document.getElementById("Lastname2").value;
    myProfile.email = document.getElementById("email").value;
    myProfile.domi = document.getElementById("dom").value;
    myProfile.tel = document.getElementById("tel").value;
    myProfile.age = document.getElementById("edad").value;
    
    localStorage.setItem("myprofile", JSON.stringify(myProfile));



});