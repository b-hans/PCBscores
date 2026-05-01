function updateList ( params ) {

    try {
        // let document = params.list;
        let pagesArray = params.pagesArray;
        let setlistDoc = params.setlistDoc;


        /**
         * try 
         * table 0 - cell 01
         * 
         * table 1 - cell 00
         * 
         * table 2 - cell 01
         */

        let setlistTables = setlistDoc.getBody().getTables();

        let indexCellsArray = [];
        for (let i=0; i<params.indexNumPages; i++) {

            let mTable = setlistTables[i];
            let mCell;
            if (i % 2 == 0) {
                indexCellsArray.push (mTable.getCell (0, 1));
            }
            else {
                indexCellsArray.push (mTable.getCell (0, 0));
            }

        }

        let curImageIndex = 0;
        for (let i=0; i<indexCellsArray.length; i++) {
            // get the child 

            // let indexCell = indexTable.getCell (0, 1);
            let indexCell = indexCellsArray[i];

            let indexImage = indexCell.getChild(1);
            indexCell.removeChild(indexImage);

            let indexPar = indexCell.getChild(0);
            indexPar.setText(params.indexTitle);
            indexPar.setAttributes(SETLIST_TITLE);
            indexPar.setAlignment(DocumentApp.HorizontalAlignment.LEFT);

            let indexTable1 = indexCell.appendTable();
            indexTable1.setAttributes(SETLIST_TABLE)
            indexTable1.setBorderWidth(0);

            let color1 = '#cccccc';
            let color2 = '#ffffff';

            let start = curImageIndex;
            let test = curImageIndex + 20;

            for (let j=start; j<test; j++) {

                let cellColor;
                if (j % 2 == 0) {
                    cellColor = color1;
                }
                else {
                    cellColor = color2;
                }

                // no more titles
                if (!params.sortedArray[j]) {
                    break;
                }

                let item = params.sortedArray[j];

                let row1 = indexTable1.appendTableRow();
                let cell1 = row1.appendTableCell(item.title);
                cell1.setBackgroundColor(cellColor);

                // find the page number
                let pageNumber;
                for (let k=0; k<pagesArray.length; k++) {
                    if (pagesArray[k].title == item.title) {
                        pageNumber = pagesArray[k].page_number;
                        break;
                    }
                }

                let cell2;
                if (pageNumber) {
                    cell2 = row1.appendTableCell("Page " + pageNumber);
                }
                else {
                    cell2 = row1.appendTableCell("N/A");
                }

                let cell2par = cell2.getChild(0).asParagraph();
                cell2par.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
                cell2.setBackgroundColor(cellColor);

                curImageIndex++;
                
            }

        }

    }
    catch (error) {
        sendAlert ("Error updating index: " + error);
    }

}