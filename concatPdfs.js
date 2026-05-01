async function concatPdfs( pdfDocIdArray, pdfName ) {
    // Retrieve PDF data.
    const ids = pdfDocIdArray;
    const data = ids.map((id) => new Uint8Array(
        DriveApp.getFileById(id).getBlob().getBytes()));

    // Load pdf-lib
    const cdnjs = "https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js";
    eval(
        UrlFetchApp.fetch(cdnjs)
            .getContentText()
            .replace(/setTimeout\(.*?,.*?(\d*?)\)/g, "Utilities.sleep($1);return t();")
    );

    // Merge PDFs.
    const pdfDoc = await PDFLib.PDFDocument.create();
    for (let i = 0; i < data.length; i++) {
        const pdfData = await PDFLib.PDFDocument.load(data[i]);
        const pages = await pdfDoc.copyPages(pdfData, pdfData.getPageIndices());
        pages.forEach(page => pdfDoc.addPage(page));
    }
    const bytes = await pdfDoc.save();

    // Create a PDF file.
    let newPdf = DriveApp.createFile(
        Utilities.newBlob([...new Int8Array(bytes)], MimeType.PDF, pdfName)
    );

    newPdf.moveTo(SETLISTS_FOLDER);

    let returnObject = {
        name: newPdf.getName(),
        url: newPdf.getUrl(),
        id: newPdf.getId()
    }

    return returnObject;

}