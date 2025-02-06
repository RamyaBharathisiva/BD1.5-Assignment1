const express = require('express');
const { resolve } = require('path');
const cors=require('cors');

const app = express();
const port = 3000;

let taxRate=5;
let DiscountPercentage=10;
let loyaltyRate=2;
//Endpoint 1:Calculate the total price of items in the cart
app.get('/cart-total',(req,res)=>{
  let newItemPrice=parseFloat(req.query.newItemPrice);
  let cartTotal=parseFloat(req.query.cartTotal);
  let totalcartprice=newItemPrice+cartTotal;
  res.send(totalcartprice.toString());
})

//Endpoint 2:Apply a discount based on membership status
app.get('/membership-discount',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let isMember=req.query.isMember;
  if (isMember){
    cartTotal=cartTotal-((DiscountPercentage/100)*cartTotal);
  }
  res.send(cartTotal.toString());
})

//Endpoint 3:Calculate tax on the cart total
app.get('/calculate-tax',(req,res)=>{
  let cartTotal=parseFloat(req.query.cartTotal);
  let tax=(taxRate/100)*cartTotal
  res.send(tax.toString());
})

//Endpoint 4:Estimate delivery time based on shipping method
app.get('/estimate-delivery',(req,res)=>{
  let shippingMethod=req.query.shippingMethod;
  let distance=parseFloat(req.query.distance);
  let days;
  if (shippingMethod.toLowerCase()=='standard'){
    days=distance/50;
  }
  else{
    days=distance/100;
  }
  res.send(days.toString());
})

//Endpoint 5:Calculate the shipping cost based on weight and distance
app.get('/shipping-cost',(req,res)=>{
  let weight=parseFloat(req.query.weight);
  let distance=parseFloat(req.query.distance);
  let shippingCost=weight * distance * 0.1;
  res.send(shippingCost.toString());
})


//Endpoint 6:Calculate loyalty points earned from a purchase
app.get('/loyalty-points',(req,res)=>{
  let purchaseAmount=parseFloat(req.query.purchaseAmount);
  let rate=purchaseAmount*loyaltyRate
  res.send(rate.toString());
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
