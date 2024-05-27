import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// eslint-disable-next-line react/prop-types
const DownloadPDF = ({ pdfRef, fileName }) => {
  const downloadPDF = () => {
    // eslint-disable-next-line react/prop-types
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save(fileName || "document.pdf");
    });
  };

  return <button onClick={downloadPDF}>Download PDF</button>;
};

export default DownloadPDF;
