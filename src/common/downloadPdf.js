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
  // Retrieve the DOM element by its ID
  const input = document.getElementById(elementId);

  // Check if the element exists
  if (!input) {
    console.error(`Element with id ${elementId} not found`);
    return; // Exit the function if the element does not exist
  }

  // Use html2canvas to create a canvas from the HTML element
  const canvas = await html2canvas(input);

  // Convert the canvas to a PNG image data URL
  const imgData = canvas.toDataURL("image/png");

  // Create a new jsPDF instance for generating the PDF
  const pdf = new jsPDF();

  // Get the width and height of the PDF page
  const imgWidth = pdf.internal.pageSize.getWidth(); // Width of the PDF page
  const imgHeight = (canvas.height * imgWidth) / canvas.width; // Height based on aspect ratio

  // Add the image to the PDF at the specified coordinates (0, 0)
  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

  // Trigger the download of the PDF with the specified filename
  pdf.save("download.pdf");
};
