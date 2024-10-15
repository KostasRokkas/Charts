import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Downloads the specified element as a PDF.
 * This function captures the HTML element identified by the given ID,
 * converts it to a canvas, and then generates a PDF file with that canvas as an image.
 *
 * @param elementId - The ID of the element to download as PDF.
 */
export const downloadPdf = async (elementId) => {
  const input = document.getElementById(elementId);

  if (!input) {
    console.error(`Element with id ${elementId} not found`);
    return;
  }

  // Capture the input element as canvas
  const canvas = await html2canvas(input, {
    scale: 2, // Increase scale for better resolution
    useCORS: true, // Enable cross-origin images
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: "a4",
  });

  const imgWidth = pdf.internal.pageSize.getWidth();
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // Add the first page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

  // Handle multiple pages if content is too long
  while (heightLeft > 0) {
    position = heightLeft - pdf.internal.pageSize.getHeight(); // Update position based on remaining height
    heightLeft -= pdf.internal.pageSize.getHeight();

    if (heightLeft > 0) {
      // Only add a new page if there is still height left
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    }
  }

  // Save the generated PDF
  pdf.save("charts.pdf");
};
