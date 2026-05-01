function getStatus( status = null ) {
    const myProps = PropertiesService.getUserProperties();

    let status_check = 'CURRENT_STATUS';

    if (status) {
        status_check = status;
    }

    if (myProps.getProperty(status_check) ) {
        return myProps.getProperty('CURRENT_STATUS');
    }
    else {
        return ('NONE');
    }
}