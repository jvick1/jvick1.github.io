// Get references to DOM elements
const form = document.getElementById("pnlForm");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const templateSelector = document.getElementById('templateSelector');

let template = new Image(); // Declare template outside to allow updates

// Function to load and draw the selected template
function loadTemplate(templateName) {
  template.src = `src/${templateName}`;
  template.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);
  };
  template.onerror = () => {
    console.error('Failed to load template:', templateName);
  };
}

// Initial template load
loadTemplate(templateSelector.value); // Load the first template by default

// Handle template selection change
templateSelector.addEventListener('change', function() {
  loadTemplate(this.value);
});

// Handle form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get user input
  const ticker = document.getElementById("ticker").value;
  const pnl = document.getElementById("pnl").value;
  const leverage = document.getElementById("leverage").value;
  
  const selectedLeverage = document.querySelector('input[name="leverageRadio"]:checked').value;
  
  const entry = document.getElementById("entry").value;
  const exit = document.getElementById("exit").value;
  
  const username = document.getElementById("username").value;

  // Clear canvas and redraw template
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

  // Add text to the canvas
  ctx.font = "bold 70px Forma DJR Display";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`${ticker.toUpperCase()}`, 65, 230);
  var tickerWidth = ctx.measureText(`${ticker.toUpperCase()}`).width;
  
  ctx.font = "bold 120px Forma DJR Display";
  ctx.fillStyle = "#20b26c";
  ctx.textAlign = "left";
  ctx.fillText(`+${parseFloat(pnl).toFixed(2)}%`, 65, 440);

  ctx.font = "400 52px Forma DJR Display";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`${parseFloat(entry)}`, 65, 580);
  ctx.fillText(`${parseFloat(exit)}`, 280, 580);
  
  var padding = 10; 
  if (selectedLeverage == 'Short') {
        ctx.fillStyle = "#da4044";
		ctx.strokeStyle = "#da4044"; 
		ctx.fillText(`${selectedLeverage} ${leverage}x`, tickerWidth + 65 + (3*padding), 222);
		var textWidth = ctx.measureText(`${selectedLeverage} ${leverage}x`).width;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.roundRect(tickerWidth + 65 + (2*padding),175,textWidth + 2 * padding ,62, 10);
		ctx.stroke();
		ctx.font = "52px Forma DJR Display";
		ctx.textAlign = "left";
		
    } else {
        ctx.fillStyle = "#20b26c";
		ctx.strokeStyle = "#20b26c";
		ctx.fillText(`${selectedLeverage} ${leverage}x`, tickerWidth + 67 + (3*padding), 222);
		var textWidth = ctx.measureText(`${selectedLeverage} ${leverage}x`).width;
		ctx.lineWidth = 1;
		ctx.beginPath();
		ctx.roundRect(tickerWidth + 65 + (2*padding),175,textWidth + 2 * padding ,62, 10);
		ctx.stroke();
		ctx.font = "52px Forma DJR Display";
		ctx.textAlign = "left";
    }

  ctx.font = "400 25px Forma DJR Display";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";
  ctx.fillText(`${username}`, 255, 654);
    
  // Show download link
  downloadLink.style.display = "block";
  downloadLink.href = canvas.toDataURL();
  downloadLink.download = `${ticker}_PnL.png`;
  downloadLink.textContent = "Right Click on the Image Above to Download";
});
