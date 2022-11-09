const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

let value = params.id;
console.log(value) 
let product;

//fetch data from the backend api
fetch("http://localhost:3000/api/products/" + value)
	.then((data) => {
		return data.json();
	})
	.then((product) => {
		insertProductInfo(product);
	});

    function insertProductInfo(product) {
	let productImage = document.querySelector('.item__img')
    let productTitle = document.getElementById('title')
    let productPrice = document.getElementById('price')
    let productDescription = document.getElementById('description')

    productPrice.textContent = product.price;
    productTitle.textContent = product.name;
    productTitle.value = product._id
    productDescription.textContent = product.description
    productImage.innerHTML = `<img src=${product.imageUrl} alt=${product.altTxt}>`;

    let dropdownEl = document.getElementById('colors');
    let productColors = product.colors 

    productColors.forEach((color) => {
        let optionEl = document.createElement('option')
        optionEl.setAttribute('value', color)
        optionEl.textContent = color

        dropdownEl.append(optionEl)
        });

    addButton.addEventListener("click", () => {
					formCheck();
                    cartCheck()
				});
    }

// next steps- add event listener to button
const addButton = document.getElementById('addToCart')
const productQuantity = document.getElementById('quantity')



// create function to check if options are available
function formCheck() {
    let colorsDropdown = document.getElementById('colors')
    if ( productQuantity.value < 1 ){
        alert('Please choose a quantity')
    }
    if (colorsDropdown.value == ''){
        alert('Please select a color')
    }
}

//checking if there are previous details in local storage if not add teh product to local storage
function cartCheck(product){
    
    let newProduct = [];
    colorsDropdown = document.getElementById("colors");
    let productQuantity = document.getElementById('quantity')
    productTitle = document.getElementById("title");
    if (localStorage.getItem("product") !== null) {
			console.log(localStorage);
		} else {
		newProduct.push(
            productTitle.value,
			colorsDropdown.value,
			productQuantity.value
			);
			window.localStorage.setItem('product', JSON.stringify(newProduct))
		}
}
// maybe I should create a cart and add the products to the cart? I need cart in next page
// next step how to check if the items in local storage already contain the product I am trying to add?





//  display the product- done
//// add an event listener - done
// check whether quantity is valid - done
// check whether color is valid - done
// check whether yhere are products in local storage- need to read up on tthis https://blog.logrocket.com/localstorage-javascript-complete-guide/ - done
// if yes
    //  does the selected product and color already exist? if yes add the color and quntity
    // https://attacomsian.com/blog/web-storage-api-local-storage-session-storage
// if no create an array - done