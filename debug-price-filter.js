// Debug script untuk test filter harga
// Jalankan di console browser saat berada di halaman produk

console.log("🔧 Starting price filter debug...");

// Function untuk test filter harga
function testPriceFilter() {
  console.log("=== TESTING PRICE FILTER ===");
  
  // Ambil semua produk dari state
  const allProducts = window.allProducts || [];
  console.log(`📦 Total products: ${allProducts.length}`);
  
  if (allProducts.length === 0) {
    console.log("❌ No products found. Make sure products are loaded first.");
    return;
  }
  
  // Analisis harga produk
  const prices = allProducts
    .map(p => p.price)
    .filter(price => price !== null && price !== undefined && !isNaN(price))
    .sort((a, b) => a - b);
    
  console.log(`💰 Price analysis:`);
  console.log(`   - Products with valid prices: ${prices.length}`);
  console.log(`   - Min price: Rp ${prices[0]?.toLocaleString('id-ID') || 'N/A'}`);
  console.log(`   - Max price: Rp ${prices[prices.length - 1]?.toLocaleString('id-ID') || 'N/A'}`);
  console.log(`   - Average price: Rp ${Math.round(prices.reduce((a, b) => a + b, 0) / prices.length).toLocaleString('id-ID')}`);
  
  // Test berbagai range harga
  const testRanges = [
    { name: "< Rp 50K", max: 50000 },
    { name: "< Rp 100K", max: 100000 },
    { name: "< Rp 200K", max: 200000 },
    { name: "< Rp 300K", max: 300000 },
  ];
  
  console.log(`\n🧪 Testing price ranges:`);
  testRanges.forEach(range => {
    const filtered = allProducts.filter(product => (product.price || 0) <= range.max);
    console.log(`   - ${range.name}: ${filtered.length} products`);
  });
  
  // Test filter function
  console.log(`\n🔍 Testing filter function:`);
  const testMaxPrice = 100000;
  const filteredProducts = allProducts.filter(product => (product.price || 0) <= testMaxPrice);
  console.log(`   - Filter maxPrice=${testMaxPrice}: ${filteredProducts.length} products`);
  
  // Show sample products in each range
  console.log(`\n📋 Sample products by price range:`);
  testRanges.forEach(range => {
    const filtered = allProducts.filter(product => (product.price || 0) <= range.max);
    if (filtered.length > 0) {
      console.log(`   ${range.name}:`);
      filtered.slice(0, 3).forEach(product => {
        console.log(`     - ${product.product_name}: Rp ${(product.price || 0).toLocaleString('id-ID')}`);
      });
    }
  });
}

// Function untuk simulate filter change
function simulateFilterChange(maxPrice) {
  console.log(`\n🎯 Simulating filter change: maxPrice = ${maxPrice}`);
  
  // Trigger filter change event
  const priceSelect = document.querySelector('select[value="' + maxPrice + '"]') || 
                     document.querySelector('select option[value="' + maxPrice + '"]')?.parentElement;
  
  if (priceSelect) {
    priceSelect.value = maxPrice;
    priceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    console.log(`✅ Filter change triggered`);
  } else {
    console.log(`❌ Price select element not found`);
  }
}

// Function untuk check current filter state
function checkFilterState() {
  console.log(`\n📊 Current filter state:`);
  
  // Try to get filter state from React component
  const filterElements = document.querySelectorAll('select');
  filterElements.forEach((select, index) => {
    console.log(`   Select ${index}: value = "${select.value}"`);
  });
  
  // Check displayed products
  const productCards = document.querySelectorAll('[class*="product-card"], [class*="ProductCard"]');
  console.log(`   Displayed products: ${productCards.length}`);
}

// Auto-run functions
setTimeout(() => {
  testPriceFilter();
  checkFilterState();
}, 2000);

// Export functions to global scope
window.testPriceFilter = testPriceFilter;
window.simulateFilterChange = simulateFilterChange;
window.checkFilterState = checkFilterState;

console.log("🔧 Debug functions available:");
console.log("   - testPriceFilter()");
console.log("   - simulateFilterChange(maxPrice)");
console.log("   - checkFilterState()");
