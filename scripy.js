// Function to submit the order
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

  // Send the data to Google Sheets using Google Apps Script
  google.script.run.submitOrder(formData, function(response) {
    if (response === 'success') {
      alert('Order submitted successfully!');
    } else {
      alert('Failed to submit the order. Please try again.');
    }
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

  // Reset the discount checkbox
  document.getElementById('discount-checkbox').checked = false;
}
