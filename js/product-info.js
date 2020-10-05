var product = {};
var estrellas = "";
var slideIndex = 1;

function showImages(array){

    let imagenes = document.getElementById("slider");
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let image = array[i];

        htmlContentToAppend += `
        <div class="mySlides">
        <img src=` + image + ` style="width:100%">
        </div>
        `

        imagenes.innerHTML = htmlContentToAppend +  imagenes.innerHTML;
    }
};

function showRelatedProducts(var1, var2){
    let related = document.getElementById("relatedProducts");
    let htmlContentToAppend = "";

    htmlContentToAppend = `<div class="row">`

    for(let i = 0; i < var2.length; i++){
        let j = var2[i];
        // console.log(var1);
        // console.log(j);
        let relatepr = var1[j];

        htmlContentToAppend += `        
        <div class="col-sm-6">
            <div class="card-columns">
                <div class="card" style="width: 18rem;">
                    <img src="` + relatepr.imgSrc + `" alt="` + `" class="card-img-top" />
                    <div class="card-body">
                        <h5 class="card-title">`+ relatepr.name + `</h5>
                        <p class="card-text">` + relatepr.cost + " " + relatepr.currency + `</p>
                        <p class="card-text">` + relatepr.description + `</p>
                        <a href="product-info.html" class="btn btn-secondary">Ver más</a>
                    </div>
                </div>
            </div>
        </div>
        `


    }
    //console.log (var2.length);

    htmlContentToAppend += `</div>`

    related.innerHTML = htmlContentToAppend;
};

function showComments(array){
    let comment = document.getElementById("comentarios");
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];
        showStars(comentarios.score);

        htmlContentToAppend += `
           <img src="img/image_`+i+`.jpg" width="30" height="30" class="rounded-circle">
           <p class="mb-1"> <strong>  `+ comentarios.user + `</strong></p> 
           <p class="mb-1">`+ estrellas + `</p>
            <p class="mb-1"> Opinión: `+ comentarios.description + `</p>
            <p class="mb-1"> Fecha: `+ comentarios.dateTime + `</p>  
            <hr>        
        `
        estrellas = "";

        comment.innerHTML = htmlContentToAppend;
    }

};

function showStars(cantidad) {

    for (let i = 0; i < cantidad; i++) {
        estrellas += `<span class="fa fa-star checked"></span>`
    };
    for (let i = 0; i < 5 - cantidad; i++) {
        estrellas += `<span class="fa fa-star"></span>`
    };
};



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                product = resultObj.data;
                //console.log(product.images);
               // console.log(product.relatedProducts);
    
                let productNameHTML  = document.getElementById("productName");
                let productDescriptionHTML = document.getElementById("productDescription");
                let productCostHTML = document.getElementById("productCost");
                let productSoldHTML = document.getElementById("productSoldcount");
                let productoCategoryHTML = document.getElementById("productCategory");
                
            
                productNameHTML.innerHTML = product.name;
                productDescriptionHTML.innerHTML = product.description;
                productCostHTML.innerHTML = product.cost + " "+ product.currency;
                productSoldHTML.innerHTML = product.soldCount;
                productoCategoryHTML.innerHTML = product.category;

                getJSONData(PRODUCTS_URL).then(function(resultObj){
                    if (resultObj.status === "ok")
                    {
                        showRelatedProducts(resultObj.data, product.relatedProducts);  
                    };
                });    

    
                //Muestro las imagenes en forma de galería
                showImages(product.images);
                showSlides(slideIndex);
                

            }
        });

});

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            comments = resultObj.data;
            showComments(comments);
        }
    });

});

document.getElementById("send").addEventListener("click", function () {

    let newcomment = document.getElementById("inputcoment").value;
    let usuario = localStorage.getItem("user");
    let hoy = new Date();
    let fecha = hoy.getFullYear()+ '-' + (hoy.getMonth()+1)+ '-' + hoy.getDate();
    let hora = hoy.getHours()+ ':' + hoy.getMinutes()+ ':' + hoy.getSeconds();
    let FechayHora = fecha + ' '+ hora;
    let e = document.getElementById("select");
    let strUser = e.options[e.selectedIndex].value;

    showStars(strUser);
    

    document.getElementById("opinion").innerHTML = "Opinion: "+ newcomment; 
    document.getElementById("usuariolog").innerHTML +=`<strong>`+ usuario+`</strong>`;
    document.getElementById("fecha").innerHTML += "Fecha: "+ FechayHora;
    document.getElementById("puntuación").innerHTML += estrellas ;
    document.getElementById("imagenprof").innerHTML =` <img src="img/profile.jpg" width="30" height="30" class="rounded-circle"></img> `


});


function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
};
