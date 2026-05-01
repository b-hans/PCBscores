class TitleDocument {
    constructor ( id ) {
        this.id = id;        
    }

    delete () {

        try {

            // find the row
            let data = CDF_PARTS_SHEET.getDataRange().getValues();

            for (let i=CDF_PARTS_SHEET_NUM_MENU_ROWS; i<data.length; i++) {
                let item = data[i];

                if (item[CDF_PARTS_DOC_ID_COL] == this.id) {
                    this.row_num = i+1;
                    this.url = item[CDF_PARTS_URL_COL];

                    let delFile = DriveApp.getFileById(
                        DocumentApp.openByUrl(this.url).getId());

                    delFile.setTrashed(true);

                    CDF_PARTS_SHEET.deleteRow(this.row_num);

                    return false;
                }
            }

        }
        catch (error) {
            sendAlert ("Error in delete: " + error);
            return false;
        }
    }
}