document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('clearList');
    button.addEventListener('click', function() {
      chrome.storage.local.clear() ;
    });
});

chrome.storage.local.get(null, function(items) {
  var allKeys = Object.keys(items);
  // console.log(allKeys);
  // var cart = items["cart"][0]
  // console.log(cart) ;
  var listsElement = document.getElementsByClassName("lists")[0] ;
  var num = 0 ;
  var calcSubtotal = 0 ;
  for (var key of allKeys) {
    // console.log(num) ;
    console.log(key) ;
    if (key == "cart" || key == "substitutions") {
      continue ;
    }
    var listButton = document.createElement('button');
    listButton.className = "listButton" ;
    // listButton.setAttribute("id", key+"Button");
    listButton.innerHTML = key ;
    listButton.id = num ;
    listsElement.appendChild(listButton) ;
    // console.log(listButton.className) ;
    var divElement = document.createElement('div');
    divElement.className = "listContainer" ;
    divElement.id = num ;
    listsElement.appendChild(divElement) ;
    // item names
    var newItemList = document.createElement('ul');
    newItemList.className = "list" ;
    newItemList.style.width = "80%"
    divElement.appendChild(newItemList) ;
    // newItemList.setAttribute("id", key+"Items");
    // item calculated prices
    var newPriceList = document.createElement('ul');
    newPriceList.className = "list" ;
    newPriceList.style.width = "10%"
    divElement.appendChild(newPriceList) ;
    var list = items[key][0] ;
    // console.log(list) ;
    var subtotal = 0 ;

    for (var [itemName,count] of Object.entries(list)) {
      // create list elements
      var newItemElement = document.createElement('li');
      newItemElement.className = "item" ;
      // console.log(allKeys) ;
      var name = itemName ;
      console.log(name) ;
      if (allKeys.includes("cart")) {
        var newPriceElement = document.createElement('li') ;
        var cartItem = items["cart"][0][itemName] ;
        console.log(cartItem)
        var price = 0
        if (cartItem != undefined) {
          price = ((Number(count) < Number(cartItem[0]) ? Number(count) : Number(cartItem[0])) / Number(cartItem[0])) * Number(cartItem[1]) ;
          console.log(price) ;
          if (isNaN(price)) {
            price = Number(cartItem[1]) ;
          }
          subtotal += price ;
          // console.log(count ) ;
          // console.log(cartItem[0]) ;
          // console.log(count < cartItem[0]) ;
          // console.log(Number(count) < Number(cartItem[0])) ;
          // console.log(price + " " + count + " " + cartItem[0] + " " + cartItem[1]) ;
        }
        else if (items["substitutions"] != undefined && items["substitutions"][0][itemName] != undefined) {
          // console.log(items["substitutions"][0][itemName])
          // substitutions[oldItemName] = [oldItemPrice,oldItemCount,newItemName,newItemPrice,newItemCount]
          substitutions = items["substitutions"][0][itemName] ;
          oldItemCount = substitutions[1] ;
          newItemPrice = substitutions[3] ;
          newItemCount = substitutions[4] ;
          newCount = (newItemCount / oldItemCount) * count ;
          // count is per cart, cartitem[0] is total
          price = ((Number(newCount) < Number(newItemCount) ? Number(newCount) : Number(newItemCount)) / Number(newItemCount)) * Number(newItemPrice) ;
          subtotal += price ;
          name = substitutions[2] ;
        }
        // console.log(price) ;
        newItemElement.innerHTML = name ;
        newItemList.appendChild(newItemElement) ;
        newPriceElement.className = "item" ;
        var priceString = price.toFixed(2) ;
        newPriceElement.innerHTML = priceString ;
        newPriceElement.style.paddingBottom = Math.floor(name.length / 60)*14+5 + "px" ;
        newPriceList.appendChild(newPriceElement) ;
      }
      // console.log(count) ;
    }
    calcSubtotal += subtotal ;
    listButton.innerHTML += (" - " + subtotal.toFixed(2)) ;
    num += 1 ;
  }

  document.getElementById("calcSubtotal").innerHTML += (calcSubtotal.toFixed(2)) ;
  var cartSubtotal = 0 ;
  if (allKeys.includes("cart")) {
    cartSubtotal = items["cart"][1] ;
  }
  document.getElementById("actSubtotal").innerHTML += (cartSubtotal.toLocaleString("en", { minimumFractionDigits: 2 })) ;

  listsElement.addEventListener('click', event => {
    if (!event.target.matches('button')) return;
    const id = event.target.id;
    var containerElement = listsElement.getElementsByClassName("listContainer")[id] ;
    console.log(containerElement.style.display) ;
    containerElement.style.display = (containerElement.style.display == "" ? "none" : "");
  });

});
