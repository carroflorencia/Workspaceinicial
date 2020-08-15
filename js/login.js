


document.getElementById("button").addEventListener("click", function () {
    if (document.getElementById("email").value.length != 0 && document.getElementById("pass").value.length != 0) {
        return location.href = "index.html";
    } else {
        noFunciona();

    }
});

function noFunciona() {
    var mail = document.getElementById('email');
    var contr = document.getElementById('pass');

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