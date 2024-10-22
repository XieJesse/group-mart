const cart = {} ;
const bar = document.getElementsByClassName("flex flex-column flex-row-m justify-between items-center-m print-bill-subheader")[0]
var btn = document.createElement("button") ;
bar.appendChild(btn) ;
btn.innerText = "Add Order" ;
btn.className = "w_hhLG w_XK4d w_jDfj" ;
btn.style.marginLeft = "20px" ;
btn.style.width = "185px" ;
btn.addEventListener('click',(e)=>{
  const cartTotal = document.getElementsByClassName("db tr b f5 pb3")[0].innerHTML.substring(1) ;
  // console.log("cart total " + cartTotal) ;
  const cartTax = document.getElementsByClassName("w_U9_0 w_U0S3 w_QcqU")[1].innerHTML.substring(1) ;
  // console.log(cartTax) ;
  const cartTip = document.getElementsByClassName("w_U9_0 w_U0S3 w_QcqU")[3].innerHTML.substring(1) ;
  // console.log(cartTip) ;
  const matches = document.getElementsByClassName("pa3 pb0 ph4-m") ;
  for (var match of matches) {
    // console.log(match) ;
    var name = match.getElementsByClassName("w_V_DM")[0].innerHTML ;
    // console.log(name) ;
    var count = match.getElementsByClassName("pt1 f7 f6-m bill-item-quantity gray")[0].innerHTML.substring(4) ;
    // console.log(count) ;
    if (match.getElementsByClassName("w_iUH7")[0] != undefined) {
      match.getElementsByClassName("w_iUH7")[0].remove() ;
    }
    var cost = match.getElementsByClassName("f5 b black tr")[0].innerText.substring(1) ;
    // console.log(cost) ;
    cart[name] = [count,cost] ;
  }
  // chrome.storage.local.get(null, function(items) {
  //   var allKeys = Object.keys(items);
  //   console.log(allKeys);
  // });
  // console.log(matches) ;
  console.log(cart) ;
  chrome.storage.local.set({ "cart" : [cart,cartTotal,cartTax,cartTip] }).then(() => {
    console.log("Cart is set");
  });
})

document.addEventListener('click', function(e){
  if (e.target.tagName == "H2" && e.target.innerHTML == "Substituted Items"){
    const substitutions = {} ;
    const subs = document.getElementsByClassName("w_al6g mt3") ;
    // console.log(subs) ;
    for (var sub of subs) {
      const subItemNames = sub.getElementsByClassName("w_V_DM") ;
      const oldItemName = subItemNames[0].innerHTML ;
      const newItemName = subItemNames[1].innerHTML ;
      const oldItemPrice = sub.getElementsByClassName("f5 gray b black tr")[0].innerText.substring(1) ;
      const newItemPrice = sub.getElementsByClassName("f5 b black tr")[1].innerText.substring(1) ;
      const subItemCounts = sub.getElementsByClassName("pt1 f7 f6-m bill-item-quantity gray") ;
      const oldItemCount = subItemCounts[0].innerHTML.substring(4) ;
      const newItemCount = subItemCounts[1].innerHTML.substring(4) ;
      // console.log(oldItemCount) ;
      // console.log(newItemCount) ;
      substitutions[oldItemName] = [oldItemPrice,oldItemCount,newItemName,newItemPrice,newItemCount]
    }
    chrome.storage.local.set({ "substitutions" : [substitutions] }).then(() => {
      console.log("Substitutions are set");
    });
    
  }
})
