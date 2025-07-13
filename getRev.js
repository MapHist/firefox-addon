var rows = document.querySelectorAll('.BHOKXe')


rows.forEach((row, index) => {
  const label = row.getAttribute('aria-label');
  if (label) {
    console.log(`Row ${index + 1}: ${label}`);
  }
});