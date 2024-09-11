function fetchData() {
  fetch("/")
    .then((response) => response.text())
    .then((html) => {
      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract the table data from the parsed HTML
      const tableBody = doc.querySelector("tbody");
      const dataRows = tableBody.innerHTML;

      // Update the current page table
      document.querySelector("tbody").innerHTML = dataRows;
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Fetch data every 5 seconds
setInterval(fetchData, 5000);

// Fetch data immediately on page load
fetchData();
