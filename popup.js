document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('clearList');
    button.addEventListener('click', function() {
      chrome.storage.local.clear() ;
    });
});

chrome.storage.local.get(null, function(items) {
  var allKeys = Object.keys(items);
  console.log(allKeys);
  // var cart = items["cart"][0]
  // console.log(cart) ;
  var listsElement = document.getElementsByClassName("lists")[0] ;
  var num = 0 ;
  var calcSubtotal = 0 ;
  for (var key of allKeys) {
    console.log(num) ;
    console.log(key) ;
    if (key == "cart") {
      continue ;
    }
    var listButton = document.createElement('button');
    listButton.className = "listButton" ;
    // listButton.setAttribute("id", key+"Button");
    listButton.innerHTML = key ;
    listButton.id = num ;
    listsElement.appendChild(listButton) ;
    console.log(listButton.className) ;
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
    console.log(list) ;
    var subtotal = 0 ;
    for (var [itemName,count] of Object.entries(list)) {
      // create list elements
      var newItemElement = document.createElement('li');
      newItemElement.className = "item" ;
      newItemElement.innerHTML = itemName ;
      newItemList.appendChild(newItemElement) ;
      console.log(itemName) ;
      console.log(allKeys) ;
      if (allKeys.includes("cart")) {
        var newPriceElement = document.createElement('li') ;
        var cartItem = items["cart"][0][itemName] ;
        var price = 0
        if (cartItem != undefined) {
          price = ((count > cartItem[0] ? cartItem[0] : count) / cartItem[0]) * cartItem[1] ;
          subtotal += price ;
          console.log(price + " " + count + " " + cartItem[0] + " " + cartItem[1]) ;
        }
        // console.log(price) ;
        newPriceElement.className = "item" ;
        var priceString = price.toLocaleString("en", { minimumFractionDigits: 2 }) ;
        newPriceElement.innerHTML = priceString ;
        newPriceElement.style.paddingBottom = Math.floor(itemName.length / 60)*14+5 + "px" ;
        newPriceList.appendChild(newPriceElement) ;
      }
      // console.log(count) ;
    }
    calcSubtotal += subtotal ;
    listButton.innerHTML += (" - " + subtotal.toLocaleString("en", { minimumFractionDigits: 2 })) ;
    num += 1 ;
  }

  document.getElementById("calcSubtotal").innerHTML += (calcSubtotal.toLocaleString("en", { minimumFractionDigits: 2 })) ;
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
