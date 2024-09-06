document
  .getElementById("converter-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const number = parseFloat(document.getElementById("number").value);
    const significantFigures = document.getElementById(
      "significant-figures"
    ).value;

    if (isNaN(number)) {
      alert("Please enter a valid number.");
      return;
    }

    let formattedMantissa;
    let exponent;

    if (significantFigures === "") {
      // No significant figures specified, use the default precision
      const scientificNotation = number.toExponential();
      [formattedMantissa, exponent] = scientificNotation.split("e");
      formattedMantissa = parseFloat(formattedMantissa).toString(); // Clean up the mantissa
      exponent = parseInt(exponent);
    } else {
      const sf = parseInt(significantFigures);
      if (isNaN(sf) || sf < 1) {
        alert("Please enter a valid number of significant figures.");
        return;
      }

      // Calculate the precision and format number accordingly
      const precision = sf - Math.floor(Math.log10(Math.abs(number))) - 1;
      const roundedNumber = number.toFixed(precision);
      const scientificNotation = parseFloat(roundedNumber).toExponential();
      [formattedMantissa, exponent] = scientificNotation.split("e");

      // Adjust mantissa to the required significant figures
      formattedMantissa = parseFloat(formattedMantissa).toPrecision(sf);
      exponent = parseInt(exponent);
    }

    // Format result
    const result = `${formattedMantissa} × 10^${exponent}`;
    document.getElementById(
      "result"
    ).textContent = `Scientific Notation: ${result}`;
  });
