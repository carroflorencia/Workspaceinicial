var currentProductsArray = [];
var currentSortCriteria = undefined;
const ORDER_ASC_BY_COST = "Asc";
const ORDER_DESC_BY_COST = "Desc";
const ORDER_BY_SOLD_COUNT = "Cant";
var minCount = undefined;
var maxCount = undefined;
var texto = undefined;


function sortProdcuts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_SOLD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = a.soldCount;
            let bCount = b.soldCount;

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    return result;
};
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount )) && 
            ((texto == undefined) || (texto != undefined && product.name.toLowerCase().indexOf(texto.toLowerCase()) > -1))){

        
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <p class="mb-1">` + product.cost + " " + product.currency + `</p>
                    </div>
                </div>
            </a>
            `
        }    

        document.getElementById("productos").innerHTML = htmlContentToAppend;
    }
};


function sortAndShowProducts(sortCriteria, ProductsArray){
    currentSortCriteria = sortCriteria;

    if(ProductsArray != undefined){
        currentProductsArray = ProductsArray;
    }

    currentProductsArray = sortProdcuts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAscByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDescByCost").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySoldCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_SOLD_COUNT);
    });

    document.getElementById("limpiar").addEventListener("click", function(){
        document.getElementById("Min").value = "";
        document.getElementById("Max").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });
    
    document.getElementById("filtrar").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("Min").value;
        maxCount = document.getElementById("Max").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("searchproducts").addEventListener("keyup", function(){
        texto = document.getElementById("searchproducts").value;
        showProductsList();
    });
});