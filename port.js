let cvDownload = document.querySelector("#cv");

function downloadCV() {
    const link = document.createElement("a");
    
    link.href = "asets/Zeeshan_Ashfaq_CV (1) (1).pdf";
    link.download = "Zeeshan_Ashfaq_CV(1)(1).pdf";

    link.click();
     cvDownload.onclick = downloadCV();

}
downloadCV();

