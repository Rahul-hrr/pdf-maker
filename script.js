document.addEventListener("DOMContentLoaded", () => {
  const { jsPDF } = window.jspdf;
  const fileInput = document.getElementById("fileInput");
  const convertBtn = document.getElementById("convertBtn");

  convertBtn.addEventListener("click", async () => {
    if (fileInput.files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    const pdf = new jsPDF({
      orientation: document.getElementById("orientation").value,
      unit: "pt",
      format: document.getElementById("pageSize").value
    });

    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files[i];
      const imgData = await toBase64(file);
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 40, 40, 500, 700);
    }

    pdf.save("LuxPDF.pdf");
  });

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
});
