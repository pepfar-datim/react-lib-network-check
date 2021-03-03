import * as React from "react";

const styles = {
    newWindowLink: {
        color: '#fff',
        textDecoration: 'underline'
    }
}

export const expiredMessage = <span>
    Your DATIM session has expired.<br/>
    Try logging back in using a <a href='/dhis-web-commons/security/login.action' target='_blank'><span style={styles.newWindowLink}>new window</span></a>.
</span>