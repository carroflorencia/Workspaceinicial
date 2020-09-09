var product = {};
var estrellas = "";

function showImages(array){

    let imagenes = document.getElementById("Images");
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let image = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + image + `" alt="">
            </div>
        </div>
        `

        imagenes.innerHTML = htmlContentToAppend;
    }
};

function showRelatedProducts(var1, var2){
    let related = document.getElementById("relatedProducts");
    let htmlContentToAppend = "";

    for(let i = 0; i < var2.length; i++){
        let j = var2[i];
        // console.log(var1);
        // console.log(j);
        let relatepr = var1[j];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` + relatepr.imgSrc + `" alt="` + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">`+ relatepr.name + `</h4>
                </div>
                <p class="mb-1">` + relatepr.cost + " " + relatepr.currency + `</p>
                <p class="mb-1">` + relatepr.description + `</p>
            </div>
        </div>
        </a>            
        `

        related.innerHTML = htmlContentToAppend;
    }
    //console.log (var2.length);
};

function showComments(array){
    let comment = document.getElementById("comentarios");
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let comentarios = array[i];
        showStars(comentarios.score);

        htmlContentToAppend += `
            <p class="mb-1"> Puntuación: `+ estrellas + `</p>
            <p class="mb-1"> Opinión: `+ comentarios.description + `</p>
            <p class="mb-1"> Usuario: `+ comentarios.user + `</p>
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
    document.getElementById("usuariolog").innerHTML = "Usuario: "+ usuario;
    document.getElementById("fecha").innerHTML = "Fecha: "+ FechayHora;
    document.getElementById("puntuación").innerHTML = "Puntuación: " + estrellas;


});
