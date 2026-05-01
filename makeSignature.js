function makeSignature ( params ) {


    const PAGE_NUM_STYLE = {};
    PAGE_NUM_STYLE[DocumentApp.Attribute.FONT_FAMILY] = 'Comic Sans MS';
    PAGE_NUM_STYLE[DocumentApp.Attribute.FONT_SIZE] = 11;

    PAGE_NUM_STYLE[DocumentApp.Attribute.SPACING_AFTER] = 0;
    PAGE_NUM_STYLE[DocumentApp.Attribute.MARGIN_BOTTOM] = 0;

    try {

        // width 6.95  670
        // height 9.3  894

        let body = params.setlist.getBody();
        let currentPar = body.getParagraphs()[0];

        let allSigs = [];

        if (params.pages > 64) {
            for (let i=0; i<params.images.length; i += 64) {
                allSigs.push(params.images.slice(i, i+64));
            }
        }
        else {
            allSigs.push(params.images);
        }

        let runningEnd;
        for (let i=0; i<allSigs.length; i++) {

            let curPos = 0;
            
            let workingArray = allSigs[i];
            let numPages = workingArray.length;
            let curStart;
            let curEnd;

            if (!runningEnd) {
                runningEnd = numPages;
                curStart = 1;
                curEnd = numPages;
            }
            else {
                curStart = runningEnd + 1;
                curEnd = runningEnd + numPages;
                runningEnd = curEnd;
            }

            let sigArray = new Array(numPages);

            for (let j=0; j<(numPages / 2); j++) {
                if ( j % 2 == 0) {
                    sigArray[curPos++] = workingArray[numPages - j - 1];
                    sigArray[curPos++] = workingArray[j];
                }
                else {
                    sigArray[curPos++] = workingArray[j];
                    sigArray[curPos++] = workingArray[numPages - j - 1];
                }
            }

            curEnd = workingArray.length + curStart - 1;

            let myCells;
            let myTable;
            let myRow;

            let oddEven = 0;

            for (let j=0; j<workingArray.length; j++) {
                let image = sigArray[j].copy();

                let blob = image.getBlob()

                let blobWidth = image.getWidth() / 670;
                let blobHeight = image.getHeight() / 894;

                let newDiv;

                if (blobWidth > blobHeight) {
                    newDiv = blobWidth;
                }
                else {
                    newDiv = blobHeight;
                }

                let newWidth = image.getWidth() / newDiv;
                let newHeight = image.getHeight() / newDiv;
                    
                if (j % 2 == 0) {

                    // make the table
                    myCells = [['page 1', 'page 2']];

                    myTable = body.appendTable(myCells);
                    myTable.setBorderWidth(0);

                    myRow = myTable.getRow(0);
                    let myFirst = myRow.getCell(0);
                    let cellPar = myFirst.getChild(0).asParagraph();
                    if (oddEven % 2 == 0) {
                        cellPar.setText("Page " + curEnd--);
                        cellPar.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
                    }
                    else {
                        if (curStart == 1) {
                            cellPar.setText('');

                            curStart++;
                        }
                        else {
                            cellPar.setText("Page " + curStart++);
                            cellPar.setAlignment(DocumentApp.HorizontalAlignment.LEFT);
                        }
                    }
                    cellPar.setAttributes(PAGE_NUM_STYLE);
                    myFirst.setPaddingRight(inchesToPoints(0.5));

                    let myImage = myFirst.insertImage(1, blob);
                    myImage.setWidth(newWidth);
                    myImage.setHeight(newHeight);

                }
                else {

                    myRow = myTable.getRow(0);
                    let mySecond = myRow.getCell(1);
                    let cellPar = mySecond.getChild(0).asParagraph();
                    if (oddEven % 2 == 0) {
                        if (curStart == 1) {
                            cellPar.setText("Index");
                            cellPar.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
                            curStart++;
                        }
                        else {
                            cellPar.setText("Page " + curStart++);
                            cellPar.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
                        }
                    }
                    else {
                        cellPar.setText("Page " + curEnd--);
                        cellPar.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
                    }
                    oddEven++;

                    cellPar.setAttributes(PAGE_NUM_STYLE);

                    mySecond.setPaddingRight(inchesToPoints(0.5));
                    mySecond.setPaddingLeft(inchesToPoints(0.5));

                    let my2Image = mySecond.insertImage(1, blob);
                    my2Image.setWidth(newWidth);
                    my2Image.setHeight(newHeight);

                }
            }


        }


        return true;

    } catch (error) {
        sendAlert ("error writing signature: " + error);
        return false;
    }


}