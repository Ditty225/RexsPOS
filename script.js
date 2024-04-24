document.addEventListener('DOMContentLoaded', function() {
  // Bind the event listeners to the buttons
  document.getElementById('calculate-total').addEventListener('click', calculateTotal);
  document.getElementById('submit-order').addEventListener('click', submitOrder);
  document.getElementById('reset-calculator').addEventListener('click', resetCalculator);
});

function calculateTotal() {
  var total = 0;
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function(checkbox) {
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value, 10);
    var price = parseFloat(checkbox.value);
    total += price * quantity;
  });

  // Check if discount is applied
  var discountApplied = document.getElementById('discount-checkbox').checked;
  if (discountApplied) {
    total *= 0.85; // Apply 15% discount
  }

  // Update the total display
  document.getElementById('total').textContent = '$' + total.toFixed(2);
}

function submitOrder() {
  var nameInput = document.getElementById('name');
  if (!nameInput || nameInput.value.trim() === '') {
    alert('Please enter a name.');
    return;
  }
  var name = nameInput.value.trim();

  var selectedItems = [];
  var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(function(checkbox) {
    var itemName = checkbox.nextElementSibling.textContent;
    var quantityInput = checkbox.closest('.menu-item').querySelector('input[type="number"]');
    var quantity = parseInt(quantityInput.value, 10);
    var price = parseFloat(checkbox.value);
    selectedItems.push({
      name: itemName.trim(),
      quantity: quantity,
      price: price
    });
  });

  var total = parseFloat(document.getElementById('total').textContent.substring(1));

  // Check if discount is applied
  var discountApplied = document.getElementById('discount-checkbox').checked;
  if (discountApplied) {
    total *= 0.85; // Apply 15% discount
  }

  // Prepare the data to send to Google Sheets
  var formData = {
    name: name,
    total: total,
    discountApplied: discountApplied,
    items: selectedItems
  };
https://script.google.com/macros/s/AKfycbyxMaMuMF3nKgmQH2f6X_98ZejBiAMmHBLWIdR-8ZM/deva to Google Sheets using the webhook provided by Google Apps Script
  fetch('https://script.google.com/macros/s/AKfycbwCpP0Q22eG7P_O2TOGk53r49K29SINDc4XtmKOwhng1Ac_6CXdnNLKLeJsPFu9DX4k/exec', {
    method: 'POST',
    mode: 'no-cors', // to prevent CORS errors
    redirect: 'follow',
    body: JSON.stringify(formData),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
  })
  .then(response => {
    alert('Order submitted successfully!');
    resetCalculator(); // Reset the form on successful submission
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to submit the order. Please try again.');
  });
}

// Function to reset the calculator
function resetCalculator() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var quantityInputs = document.querySelectorAll('input[type="number"]');
  
  checkboxes.forEach(function(checkbox) {
    checkbox.checked = false;
  });
  
  quantityInputs.forEach(function(quantityInput) {
    quantityInput.value = 1;
  });
  
  document.getElementById('total').textContent = '$0.00';

}
