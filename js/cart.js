

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
              <td> <input class="form-control" type="number" placeholder="cant." id="cantidad`+i+`"></td>
              <td id= "Subtotal`+i+`"></td>
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
    
    document.getElementById("cantidad0").addEventListener("change", function(){
      let product = articulo[0];
      let cantidad =  document.getElementById("cantidad0").value;
      let subtotal = product.unitCost * cantidad;

      document.getElementById("Subtotal0").innerHTML = `<strong>`+ subtotal + " "+ product.currency +`</strong>`;

    });

    document.getElementById("cantidad1").addEventListener("change", function(){
      let product = articulo[1];
      let cantidad =  document.getElementById("cantidad1").value;
      let subtotal = product.unitCost * cantidad;

      document.getElementById("Subtotal1").innerHTML = `<strong>`+ subtotal + " "+ product.currency +`</strong>`;

    });

  };   
  });
});
