
<!DOCTYPE html>
<html>
<head>
    <title>Thankyou</title>
    <meta charset="utf-8" />


    <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="books.css">

    <script type="text/javascript" src="catalog.js"></script>
    <script type="text/javascript" src="shoppingcart.js"></script>
    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/bootstrap/js/bootstrap.min.js"></script>

    <style>
        body {
            text-align: center;
        }
    </style>

    <script>
<!---->
<!--        // return string query value-->
<!--        function getParameterByName(name, url) {-->
<!--            if (!url) url = window.location.href;-->
<!--            name = name.replace(/[\[\]]/g, "\\$&");-->
<!--            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),-->
<!--                results = regex.exec(url);-->
<!--            if (!results) return null;-->
<!--            if (!results[2]) return '';-->
<!--            return decodeURIComponent(results[2].replace(/\+/g, " "));-->
<!--        }-->
<!---->


$(function(){
    $("#header").load("header.html");
    $("#footer").load("footer.html");
});
    </script>


</head>
<body>
<div id="header"></div>

    <script>

        // clear order
        var cartname = getParameterByName("cartname");

        if (cartname != null)
            sessionStorage.clear();
        else location.href = "books.html";

    </script>

    <h2>Thank You For Your Order</h2>


    <img src="bookimages/bookstore.jpg" alt="bookstore image" sizes="300" />

    <h2>We are Shipping out your Order Today</h2>

    <button class="button" onclick="location.href = 'books.html'">Order some more Books</button>



<div id="footer" style="text-align:center">

    <br />
    <br />
    <br />

    www.bookunlimited.com  copyright 2018 contact us at service@bookunlimited.com

</div>

<div id="footer"></div>

</body>

</html>




