import React, { useState } from 'react';
import "./form.css";

function ContactForm() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        consulta: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
        if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es obligatorio.';
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es obligatorio.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Ingresa un correo electrónico válido.';
        }
        if (!formData.consulta.trim()) newErrors.consulta = 'La consulta es obligatoria.';

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            console.log('Formulario enviado:', formData);
            alert('Consulta enviada con éxito');
            // Aquí puedes enviar los datos a un backend o API
            setFormData({
                nombre: '',
                apellido: '',
                email: '',
                consulta: ''
            });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className="contact-form">
            <h1>Consulta</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    {errors.nombre && <p className="error">{errors.nombre}</p>}
                </div>

                <div>
                    <label htmlFor="apellido">Apellido:</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                    {errors.apellido && <p className="error">{errors.apellido}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div>
                    <label htmlFor="consulta">Consulta:</label>
                    <textarea
                        id="consulta"
                        name="consulta"
                        value={formData.consulta}
                        onChange={handleChange}
                    />
                    {errors.consulta && <p className="error">{errors.consulta}</p>}
                </div>

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ContactForm;
