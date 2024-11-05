import React, { useEffect } from 'react';

function PaymentRedirect() {

    
    useEffect(() => {
        // Redirige al esquema personalizado
        window.location.href = "myapp://paymentConfirmation";
    }, []);

    return (
        <div style={styles.container}>
            <p style={styles.text}>Redirigiendo, por favor espera...</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
    },
    text: {
        fontSize: '1.2em',
        color: '#555',
    },
};

export default PaymentRedirect;
