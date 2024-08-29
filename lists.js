const cart = {} ;
const bar = document.getElementsByClassName("flex items-center justify-between")[0] ;
console.log(bar) ;
var btn = document.createElement("button") ;
bar.appendChild(btn) ;
btn.innerText = "Add List" ;
btn.className =  "w_hhLG w_XK4d w_jDfj ml3 mt1" ;
btn.style.margin = "15px" ;
var result = {} ;


btn.addEventListener('click',(e)=>{
  const elements = document.getElementsByClassName("w_kV33 w_LD4J w_mvVb") ;
  // console.log(elements) ;
  const listName = document.getElementsByClassName("w_kV33 w_LD4J w_mvVb")[(elements.length == 2) ? 1 : 2].innerText ;
  // console.log(listName) ;
  const matches = document.getElementsByClassName("pt2 pt4-l bt b--near-white list list-tile") ;
  for (var match of matches) {
    // console.log(match) ;
    var itemName = match.getElementsByClassName("w_V_DM")[0].innerHTML ;
    // console.log(itemName) ;
    // var itemCount = match.getElementsByClassName("bw0 bg-white pointer underline f6")[0].innerText ;
    var itemCount = match.getElementsByClassName("f6 dark-gray ma0")[0].innerHTML.substring(6) ;
    // console.log(itemCount) ;
    cart[itemName] = itemCount ;
  }
  // console.log(matches) ;
  console.log(listName) ;
  console.log(cart) ;
  chrome.storage.local.set({ [listName] : [cart] }).then(() => {
    console.log("List is set");
  });
  // chrome.storage.local.get([listName]).then((result) => {
  //   console.log("Value is " + JSON.stringify(result[listName]));
  // });
})
