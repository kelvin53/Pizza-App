// Business Logic
var totalPriceArray = []; 
function Order (customSize, cheese) {
  this.customSize = customSize;
  this.flavour = flavour;
  this.crust = crust;
  this.pizzaPrice = 0;
  this.sidePrice = 80;
}
Order.prototype.pizzaCost = function () {
  if (this.customSize === "regular") {
    this.pizzaPrice += 500;
  } else if (this.customSize === "Medium") {
    this.pizzaPrice += 800;
  } else if (this.customSize === "Large") {
    this.pizzaPrice += 1000;
  }
  if (this.crust === "crispy") {
    this.pizzaPrice += 100;
  } else if (this.crust === "stuffed") {
    this.pizzaPrice += 150;
  } else if (this.crust === "glutenfree") {
    this.pizzaPrice += 200;
  }
  
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.sidePrice;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; 
  }
  return cartTotalPrice;
}
function Address (streetAddress, city, state, zipcode) {
  this.streetAddress = streetAddress;
  this.city = city;
  this.state = state;
  this.zipcode = zipcode;
  this.deliveryAddress = (streetAddress + "  " + city + ", " + state + "  " + zipcode);
}


//User Interface Logic
$(document).ready(function(event) {
  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var state = $("select#state-select").val();
    var zipcode = $("input#zip-add").val();
    var newAddress = new Address(streetAddress, city, state, zipcode)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var flavour = $("select#flavour").val();
    var crust = $("select#crust").val();
    var pizzaDetails = (customSize + " - " + flavour + ", " + crust);
    var newPizzaOrder = new Order(customSize, crust);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #flavour, #crust").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });
//toppings
  var newSideOrder = new Order();
  $("#onions").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "onion-topping" + "</li></ul>");
  });
  $("#greens").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "greens-topping" + "</li></ul>");
  });
  $("#mushrooms").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "mushroom-topping" + "</li></ul>");
  });
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });

  $("#checkout-btn").click(function() {
    location.reload();
  });
});
