import React, { useState } from 'react';
import './NewsForm.css'; // Asegúrate de tener el CSS para el modal

const NewsForm = ({ onAddNews, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNews({ title, description, imageUrl });
    onClose(); // Cierra el modal después de agregar la noticia
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Agregar Nueva Noticia</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Descripción:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </label>
          <label>
            URL de Imagen:
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
          </label>
          <button type="submit">Agregar</button>
          <button type="button" onClick={onClose}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
