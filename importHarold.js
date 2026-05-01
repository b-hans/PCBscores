function importHarold ( ) {

    try {

        // get first row
        const sheet = SpreadsheetApp.getActive().getSheetByName("Harold master");
        const haroldData = sheet.getDataRange().getValues();
        
        let headers = haroldData.splice(0, 1);

        headers = headers.filter(item => {
            if (item) {
                return true;
            }
            return false;
        }).flat();

        let outsies = "";
        for (let i=0; i<haroldData.length; i++) {

            let item = new HaroldTitle ({
                data_row: haroldData[i],
                headers: headers
            });

            item.updateMaster();

        }

        return true;

    }
    catch (error) {
        sendAlert ("error importing: " + error);
        return false;
    }

}