import React, { useEffect } from 'react';

function PaymentRedirect() {
    useEffect(() => {
        // Intenta la redirección automática
        window.location.href = "myapp://paymentConfirmation";
    }, []);

    return (
        <div style={styles.container}>
            <p style={styles.text}>Redirigiendo, por favor espera...</p>
            {/* Enlace de respaldo para redirección manual */}
            <a href="myapp://paymentConfirmation" style={styles.link}>
                Si no ocurre nada, toca aquí para continuar.
            </a>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f7f7f7',
    },
    text: {
        fontSize: '1.2em',
        color: '#555',
    },
    link: {
        marginTop: '1em',
        fontSize: '1em',
        color: '#0066cc',
        textDecoration: 'underline',
    }
};

export default PaymentRedirect;
