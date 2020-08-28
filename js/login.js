var mail = document.getElementById('email');
var contr = document.getElementById('pass');


document.getElementById("button").addEventListener("click", function () {
    if (mail.value.length != 0 && contr.value.length != 0) {
        localStorage.setItem ("user", mail.value);
        location.href = "homepage.html";
    } else {
        noFunciona();
    }
});

function noFunciona() {

    if (mail.value.length === 0) {
        mail.style.borderColor = "red";
    } 
    if (contr.value.length === 0) {
        contr.style.borderColor = "red";
    }

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});