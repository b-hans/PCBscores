function processPart ( partObject ) {
    
    // get next id
    let document_id;

    try {
        if (SETLIST_DOCUMENTS.getLastRow() > SETLIST_DOCUMENTS_MENU_ROWS) {
            const docIds = SETLIST_DOCUMENTS.getRange(
                SETLIST_DOCS_MENU_ROWS + 1,
                DOC_SHEET_ID_COL, 
                SETLIST_DOCUMENTS.getLastRow() - SETLIST_DOCUMENTS_MENU_ROWS,
                1
            ).getValues().flat();

            document_id = Math.max(...docIds) + 1;

        }
        else {
            document_id = 1;
        }

        let rowData = [];
        rowData[DOC_DATA_ID_COL] = document_id;
        rowData[DOC_DATA_SETLIST_ID_COL] = partObject.setlist_id;
        rowData[DOC_DATA_SETLIST_PDF_NAME_COL] = partObject.pdf_name;
        rowData[DOC_DATA_SETLIST_PART_COL] = partObject.part;
        rowData[DOC_DATA_SETLIST_URL_COL] = partObject.url;
        rowData[DOC_DATA_SETLIST_GOOGLE_ID_COL] = partObject.google_id;

        SETLIST_DOCUMENTS.appendRow(rowData);

        let mySetlist = new Setlist(partObject.setlist_id);

        mySetlist.update ();

        let partsCell = SETLISTS_FORM.getRange(SETLIST_PARTS_CELL);
        partsCell.clearDataValidations();
        partsCell.clearContent();
        if (mySetlist.partsRich) {
            partsCell.setRichTextValue(mySetlist.partsRich.build());
        }
       

        return true;

    } catch (error) {
        return error;
    }

}