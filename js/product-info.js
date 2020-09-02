var product = {};

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

function showRelatedProducts(array){
    let related = document.getElementById("relatedProducts");
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let relatepr = array[i];

        htmlContentToAppend += `
        <div class="col">
        <div class="d-flex w-100 justify-content-between">
            <p class="mb-1">`+ relatepr + `</p>
        </div>
        </div>            
        `

        related.innerHTML = htmlContentToAppend;
    }

};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

        getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                product = resultObj.data;
                console.log(product.images);
                console.log(product.relatedProducts);
    
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
                

    
                //Muestro las imagenes en forma de galería
                showImages(product.images);
                showRelatedProducts(product.relatedProducts);

            }
        });

});