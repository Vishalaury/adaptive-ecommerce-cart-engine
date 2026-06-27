const calculateTieredDiscount = (subtotal) => {
  let discount = 0;
  
  if (subtotal >= 1000) {
    discount = subtotal * 0.20; 
  } else if (subtotal >= 500) {
    discount = subtotal * 0.10; 
  } else if (subtotal >= 200) {
    discount = subtotal * 0.05; 
  }
  
  return parseFloat(discount.toFixed(2));
};

module.exports = { calculateTieredDiscount };