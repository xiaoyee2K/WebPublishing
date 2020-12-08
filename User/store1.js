let carts=document.querySelectorAll('.shop-item-button');
let products=[{
	name:'Americano',
	tag:'Americano',
	price:4.50,
	inCart:0
},

{
	name:'Espresso',
	tag:'Espresso',
	price:4.50,
	inCart:0
},

{
	name:'Cappuccino',
	tag:'cappuccino',
	price:5.50,
	inCart:0
},

{
	name:'Creamy Cashew Gingersnap Lattes',
	tag:'Creamy Cashew Gingersnap Lattes',
	price:5.50,
	inCart:0
}


];

for(let i=0; i<carts.length;i++){
	carts[i].addEventListener('click',() =>{
		cartNumbers(products[i]);
		totalCost(products[i]);
	})
}
function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');
	
	if(productNumbers){
		document.querySelector('.cart span').textContent=productNumbers;
	}
}

function cartNumbers(product){
	
	let productNumbers = localStorage.getItem('cartNumbers');
	
	productNumbers=parseInt(productNumbers);
	if(productNumbers){
		localStorage.setItem('cartNumbers',productNumbers + 1);
		document.querySelector('.cart span').textContent=productNumbers + 1;
	}else {
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent=1;
	}
	setItems(product);
}

function setItems(product){
	let cartItems= localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);
	
	if(cartItems!=null){
		if(cartItems[product.tag]== undefined){
			cartItems={
				...cartItems,
				[product.tag]:product
			}
		}
		cartItems[product.tag].inCart += 1;
		
	}else {
		product.inCart = 1;
	
	cartItems = {
		[product.tag]:product
	}
	}
	
	
	localStorage.setItem("productsInCart",JSON.stringify (cartItems));
}
function totalCost(product){
	//console.log("The product price is ",product.price);
	let cartCost = localStorage.getItem('totalCost');
	
	console.log("my cartCost is",cartCost);
	console.log(typeof cartCost);
	
	if(cartCost != null){
		cartCost=parseFloat(cartCost);
		localStorage.setItem("totalCost",cartCost +product.price );
		
	}else{
		localStorage.setItem("totalCost",product.price);
	}
	
}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector
	(".product");
	let cartCost = localStorage.getItem('totalCost');
	console.log(cartItems);
	if(cartItems && productContainer){
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item =>{
			productContainer.innerHTML += `
			<div class="product">
				<ion-icon name="close-circle"></ion-icon>
				<img src="./img/menu/${item.tag}.jpg">
				<span> ${item.name}</span>
				</div>
				<div class="price">${item.price}</div>
				<div class="quantity"><ion-icon name="arrow-dropleft-circle">
				</ion-icon>
				<span>${item.inCart}</span>
				<ion-icon name="arrow-dropright-circle"></ion-icon>
				
				</div>
				<div class="total">
				$${item.inCart * item.price}
				
				</div>
			`;
		});
		
		productContainer.innerHTML +=`
		<div class="basketTotalContainer">
			<h4 class ="basketTotalTitle">
				Basket Total
				<h4>
				
				<h4 class="basketTotal">
					$${cartCost}
				</h4>
		`;
	}
}
onLoadCartNumbers();
displayCart();