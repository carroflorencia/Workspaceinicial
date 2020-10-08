

document.addEventListener("DOMContentLoaded", function(e){
  
 
  getJSONData(CART_INFO_URL2).then(function(resultObj){
      if (resultObj.status === "ok")
      {       
      cart = resultObj.data;
      console.log(cart);

      let articulo = cart.articles
      console.log(articulo);

     // let htmlContentToAppend = "";
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
              <td> <input class="form-control" type="number" placeholder="cant." 
              onchange="calcularSubtotal(this,`+product.unitCost+`,'Subtotal`+i+`','`+product.currency+`')" id="cantidad`+i+`"></td>
              <td id="Subtotal`+i+`"></td>
            </tr>

      `      
    }  

    htmlContentToAppend += `        
    </tbody>
    </table>
    <hr>  
    `  
    document.getElementById("Table").innerHTML = htmlContentToAppend;
    //console.log(document.getElementById("Table"));
    
    // document.getElementById("cantidad0").addEventListener("change", function(){
    //   let product = articulo[0];
    //   let cantidad =  document.getElementById("cantidad0").value;
    //   let subtotal = product.unitCost * cantidad;

    //   document.getElementById("Subtotal0").innerHTML = `<strong>`+ subtotal + " "+ product.currency +`</strong>`;

    // });

    // document.getElementById("cantidad1").addEventListener("change", function(){
    //   let product = articulo[1];
    //   let cantidad =  document.getElementById("cantidad1").value;
    //   let subtotal = product.unitCost * 40 * cantidad;

    //   document.getElementById("Subtotal1").innerHTML = `<strong>`+ subtotal + ` UYU</strong>`;

    // });
  };   
  });
});

 function calcularSubtotal(input, cost,subtotalId, currency){
      let cantidad = input.value;
      let subtotal = cantidad * cost;
      if (currency == "USD")
        subtotal *= 40;
      document.getElementById(subtotalId).innerHTML = 'UYU <strong class="subt">' + subtotal + '</strong>';

      let subtotales = document.getElementsByClassName("subt");
      let subTotalTotal = 0;
      for(i=0; i<subtotales.length; i++){
        let subt = subtotales[i].innerHTML;
        subTotalTotal += parseInt(subt);
      }
      document.getElementById("SubtotalTotal").innerHTML = "UYU " + subTotalTotal;

    
      let costoenvio = 0;
      document.getElementById("costoenvio").innerHTML = "UYU "+ costoenvio;


      let total = subTotalTotal + costoenvio;
      document.getElementById("TotalTotal").innerHTML = 'UYU <strong>' + total + '</strong>';
      
      //console.log(subtotales);
 } 

