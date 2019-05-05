

/* Converts a JSON string to a JavaScript object
 * @param str String the JSON string
 * @returns obj Object the JavaScript object
 */

// global constants
TAX_RATE = 0.05;

function toJSONObject(str) {
    var obj = JSON.parse(str);
    return obj;
}

/* Converts a JavaScript object to a JSON string
 * @param obj Object the JavaScript object
 * @returns str String the JSON string
 */

function toJSONString(obj) {
    var str = JSON.stringify(obj);
    return str;
}



/* Add an object to the cart as a JSON string
 * @param values Object the object to be added to the cart
 * @returns void
 */

function addToCart(item, cartname) {

    createCart();

    var cart = sessionStorage.getItem(cartname);

    var cartObject = toJSONObject(cart);
    var cartCopy = cartObject;
    var items = cartCopy.items;
    items.push(values);

    storage.setItem(this.cartName, this._toJSONString(cartCopy));
}

function addToCart(cartname, title, price, quantity) {

    createCart(cartname);

    var cart = sessionStorage.getItem(cartname);

    var cartObject = toJSONObject(cart);
    var cartCopy = cartObject;
    var items = cartCopy.items;
    var extension = price * quantity;
    items.push(makeItem(title, quantity, price, extension));

    sessionStorage.setItem(cartname, toJSONString(cartCopy));
}


function makeItem(title, quantity, price, extension) {
    return {
        title: title,
        quantity: quantity,
        price: price,
        extension: extension
    };
}

function updateCart(bookid, cartname) {
    // get new quantity
    var quantityid = "quantity" + bookid;
    var quantitytb = document.getElementById(quantityid);
    var newquantity = quantitytb.value;

    // get cart contents
    var cart = sessionStorage.getItem(cartname);



    var cart = toJSONObject(sessionStorage.getItem(cartname));
    var items = cart.items;
    sessionStorage.removeItem(cartname);

    var subtotal = 0;

    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var title = item.title;
        var price = parseFloat(item.price);
        var quantity = parseInt(item.quantity);

        if (i == bookid)
            quantity = newquantity;

        var extension = parseFloat(item.extension);

        addToCart(cartname, title, price, quantity);
        subtotal += extension;


    }

    var tax = subtotal * TAX_RATE;
    var total = tax + subtotal;

    // store values
    sessionStorage.setItem("subtotal", subtotal);
    sessionStorage.setItem("tax", tax);
    sessionStorage.setItem("total", total);

    displayCart(cartname);

}

function removeItem(bookid) {

    var cart = sessionStorage.getItem(cartname);

    if (cart == null) return;

    var cart = toJSONObject(sessionStorage.getItem(cartname));
    var items = cart.items;
    sessionStorage.removeItem(cartname);

    var subtotal = 0;

    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var title = item.title;
        var price = parseFloat(item.price);
        var quantity = parseInt(item.quantity);

        if (i != bookid) {

            var extension = parseFloat(item.extension);

            addToCart(cartname, title, price, quantity);
            subtotal += extension;


        }
    }


    var tax = subtotal * TAX_RATE;
    var total = tax + subtotal;

    // store values
    sessionStorage.setItem("subtotal", subtotal);
    sessionStorage.setItem("tax", tax);
    sessionStorage.setItem("total", total);

    displayCart(cartname);
}


// Creates the cart keys in session storage

function createCart(cartname) {
    if (sessionStorage.getItem(cartname) == null) {

        var cart = {};
        cart.items = [];

        sessionStorage.setItem(cartname, toJSONString(cart));
        sessionStorage.setItem("subtotal", "0");
        sessionStorage.setItem("tax", "0");
        sessionStorage.setItem("shipping", "0");
        sessionStorage.setItem("total", "0");
    }
}



// Displays the shopping cart

function displayCart(cartname) {


    // get cart
    var cart = toJSONObject(sessionStorage.getItem(cartname));

    if (cart == null) {



        document.getElementById("shoppingcart").innerHTML = "<h2>Your Shopping Cart is Empty</h2>";
        return;
    }

    var items = cart.items;


    var html = "<table class='wsbackground mlr' border='2' style='border-collapse:collapse;>";

    html += "<tr><th>Title</th><th>Quantity</th><th>Price</th><th>Extension</th><th colspan='2'>Action</th></tr>";

    var subtotal = 0;


    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var title = item.title;
        var price = parseFloat(item.price);
        var quantity = parseInt(item.quantity);
        var extension = parseFloat(item.extension);
        html += "<tr><td>" + title + "</td><td><input name='" + ("quantity" + i) + "' id='" + ("quantity" + i) + "' type='text' value='" + quantity + "' size='5' /></td>";
        html += "<td>" + price.toFixed(2) + "</td><td>" + extension.toFixed(2) + "</td>";
        html += "<td><input class='button' type='button' name='update' value='Update' onclick='updateCart(" + i + ",\"" + cartname + "\")' /></td>";
        html += "<td><input class='button' type='button' name='remove' value='Remove' onclick='removeItem(" + i + ",\"" + cartname + "\")' /></td>";
        html += "</tr>";

        subtotal += extension;

    }
    var tax = subtotal * TAX_RATE;
    var total = tax + subtotal;

    // store values
    sessionStorage.setItem("subtotal", subtotal);
    sessionStorage.setItem("tax", tax);
    sessionStorage.setItem("total", total);

    html += "<tr><th>Subtotal:</th><th>$" + subtotal.toFixed(2) + "</th></tr>";
    html += "<tr><th>Tax:</th><th>$" + tax.toFixed(2) + "</th></tr>";
    html += "<tr><th>Total:</th><th>$" + total.toFixed(2) + "</th></tr>";
    html += "</table>";

    // return html;
    document.getElementById("shoppingcart").innerHTML = html;
}

// Displays the shopping cart

function displayOrder(cartname) {


    // get cart
    var cart = toJSONObject(sessionStorage.getItem(cartname));

    if (cart == null) {

        document.getElementById("shoppingcart").innerHTML = "<h2>Your Shopping Cart is Empty</h2>";
        return;
    }

    var items = cart.items;


    var html = "<table border='2' align='center' class='wsbackground mlr' style='border-collapse:collapse'>";

    html += "<tr><th>Title</th><th>Quantity</th><th>Price</th><th>Extension</th></tr>";

    var subtotal = 0;

    for (var i = 0; i < items.length; ++i) {
        var item = items[i];
        var title = item.title;
        var price = parseFloat(item.price);
        var quantity = parseInt(item.quantity);
        var extension = parseFloat(item.extension);
        html += "<tr><td>" + title + "</td><td><input name='" + ("quantity" + i) + "' id='" + ("quantity" + i)
            + "' type='text' value='" + quantity + "' size='5' /></td>";
        html += "<td>" + price.toFixed(2) + "</td><td>" + extension.toFixed(2) + "</td>";
        html += "</tr>";

        subtotal += extension;
    }

    var tax = subtotal * TAX_RATE;
    var total = tax + subtotal;


    html += "<tr><th>Subtotal:</th><th>$" + subtotal.toFixed(2) + "</th></tr>";
    html += "<tr><th>Tax:</th><th>$" + tax.toFixed(2) + "</th></tr>";
    html += "<tr><th>Total:</th><th>$" + total.toFixed(2) + "</th></tr>";


    // free shipping over $50
    var shipping = 10.00;

    if (subtotal >= 50) {
        shipping = 0;
    }

    var orderTotal = total + shipping;
    html += "<tr><td colspan='2'>Free Shipping over $50</td></tr>";
    html += "<tr><th>Shipping:</th><th>$" + shipping.toFixed(2) + "</th></tr>";
    html += "<tr><th>Order Total:</th><th>$" + orderTotal.toFixed(2) + "</th></tr>";

    html += "</table>";

    //set html;
    document.getElementById("shoppingcart").innerHTML = html;
}

