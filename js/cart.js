

document.addEventListener("DOMContentLoaded", function(e){
  getJSONData(CART_INFO_URL).then(function(resultObj){
      if (resultObj.status === "ok")
      {       
      cart = resultObj.data;
      console.log(cart);

      let articulo = cart.articles
      console.log(articulo);

      let htmlContentToAppend = "";
        for(let i = 0; i < articulo.length; i++){
        let product = articulo[i];
        htmlContentToAppend += `
            <tr>
              <td><img src="` + product.src + `" class="img-thumbnail"></td>
              <td>` + product.name + `</td>
              <td>`+ product.unitCost + `  ` + product.currency +`</td>
              <td> <input class="form-control" type="number" placeholder="cant." id="cantidad"></td>
              <td id= Subtotal></td>
            </tr>

      `      
    }    

    document.getElementById("Table").innerHTML = htmlContentToAppend;
    
    document.getElementById("cantidad").addEventListener("keyup", function(){
      for(let i = 0; i < articulo.length; i++){
      let product = articulo[i];
      let cantidad =  document.getElementById("cantidad").value;
      let subtotal = product.unitCost * cantidad;

      document.getElementById("Subtotal").innerHTML = `<strong>`+ subtotal + " "+ product.currency +`</strong>`;
    }

    });



  };   
  });
});
