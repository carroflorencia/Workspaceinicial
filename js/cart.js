

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
            <tr>

              <td>
              <img src="` + product.src + `class="img">
              </td>
              <td>` + product.name + `</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table> 
        `
    }    

    document.getElementById("Table").innerHTML = htmlContentToAppend;
    }
  });
});