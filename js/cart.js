let subTotalfinal = 0;
let costoenvio = 0;
let costoenvioinput =  document.getElementById("standard").value;
let tarjeta = document.forms["tc"].elements;
let transferencia = document.forms["tb"].elements;
let efectivo = document.ef.efec;

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
              <td> <input class="form-control" min="1" type="number" placeholder="cant." value="` + product.count + `" 
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
    checkenvio();


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
      costoEnvio(costoenvioinput);
      
}; 

function costoEnvio(input){
  costoenvioinput = input; 

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
  checkenvio();
  

};


function showTotal(){
  document.getElementById("costoenvio").innerHTML = "UYU "+ costoenvio;
  let total = subTotalfinal + costoenvio;
  document.getElementById("TotalTotal").innerHTML = 'UYU <strong>' + total + '</strong>';  
};

function checkenvio(){

 document.getElementById("submitbutton").disabled = 'disabled';
  
  let tipoenvio = document.envio.ce;
  //console.log(tipoenvio);
  
  for (i=0; i<tipoenvio.length; i++) {
    //console.log(tipoenvio[i]);
    if(tipoenvio[i].checked){
      document.getElementById("submitbutton").disabled = false;
    }
  };
};



document.getElementById("guardafp").addEventListener("click", function(){

    if((tarjeta[i].value.length == 0)||(transferencia[i].value.length == 0)|| (efectivo.checked == false)){ 
    alert("Debe de seleccionar una forma de pago")
    };
});

/* document.getElementById("guardafp").addEventListener("click", function(){

  
    for (var i = 0; i < tarjeta.length; i++) {
      if (tarjeta[i].value.length == 0){ 
        alert("Falta completar un campo vacío");
        tarjeta[i].style.borderColor = "red";
      };
    }
  
    var transferencia = document.forms["tb"].elements;
    for (var i = 0; i < transferencia.length; i++) {
      if (transferencia[i].value.length == 0){ 
        alert("Falta completar un campo vacío");
        transferencia[i].style.borderColor = "red";
      };
    }
  
    var efectivo = document.ef.efec;
    if(efectivo.checked == false){ 
      alert("Debe de seleccionar una forma de pago")
    };
  
    if((tarjeta[i].value.length == 0)||(transferencia[i].value.length == 0)|| (efectivo.checked == false)){ 
      alert("Debe de seleccionar una forma de pago")
    };
  }); */