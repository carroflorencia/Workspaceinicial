let subTotalfinal = 0;
let costoenvio = 0;

document.addEventListener("DOMContentLoaded", function(e){
  
 
  getJSONData(CART_INFO_URL2).then(function(resultObj){
      if (resultObj.status === "ok")
      {       
      cart = resultObj.data;
      console.log(cart);

      let articulo = cart.articles
      console.log(articulo);

      let htmlContentToAppend = `
      <table class="table">
      <thead class="thead-light">
       <tr>
        <th scope="col"></th>
        <th scope="col">Nombre</th>
        <th scope="col">Costo</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Subtotal</th>
        </tr>
      </thead>
      <tbody>
      `

        for(let i = 0; i < articulo.length; i++){
        let product = articulo[i];
        htmlContentToAppend += `
            <tr>
              <td><img src="` + product.src + `" class="img-thumbnail"></td>
              <td>` + product.name + `</td>
              <td>`+ product.unitCost + `  ` + product.currency +`</td>
              <td> <input class="form-control" type="number" placeholder="cant." value="` + product.count + `" 
              onchange="calcularSubtotal(this,`+product.unitCost+`,'Subtotal`+i+`','`+product.currency+`')" id="cantidad`+i+`"></td>
              <td class="subtotales" id="Subtotal`+i+`"> UYU <strong class="subt">${calculate(product)}</strong>' </td>
            </tr>

      `      
    }  

    htmlContentToAppend += `        
    </tbody>
    </table>
    <hr>  
    `  
    document.getElementById("Table").innerHTML = htmlContentToAppend;
    subt();
    showTotal();
  };   
  });
});

function calculate(product){ 

  let subt = product.unitCost * product.count
  if (product.currency === "USD"){
    subt *= 40;
  }
  return subt;
};

function subt(){
  
  let subtotales = document.getElementsByClassName("subt");
  let subTotalTotal = 0;
      for(i=0; i<subtotales.length; i++){
        let subt = subtotales[i].innerHTML;
        subTotalTotal += parseInt(subt);
        subTotalfinal = subTotalTotal;
      }
  document.getElementById("SubtotalTotal").innerHTML = "UYU " + subTotalTotal;
};
 

function calcularSubtotal(input, cost,subtotalId, currency){

      let cantidad = input.value;
      let subtotal = cantidad * cost;
      if (currency == "USD")
        subtotal *= 40;
      document.getElementById(subtotalId).innerHTML = 'UYU <strong class="subt">' + subtotal + '</strong>';

      subt();
      showTotal();
      
}; 

function costoEnvio(input){
  let costofinal = 0
   if (input.value === "premium"){
     costofinal = subTotalfinal * 0.15
   }
   if(input.value === "express"){
    costofinal = subTotalfinal * 0.07
  }
  if(input.value === "standard"){
    costofinal = subTotalfinal * 0.05
  }

  costoenvio = costofinal;

  showTotal();

};


function showTotal(){

document.getElementById("costoenvio").innerHTML = "UYU "+ costoenvio;

let total = subTotalfinal + costoenvio;
document.getElementById("TotalTotal").innerHTML = 'UYU <strong>' + total + '</strong>';  
};

