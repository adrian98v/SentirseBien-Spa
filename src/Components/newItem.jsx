import React from 'react';
import './newItem.css';

const NewsItem = ({ title, description, imageUrl }) => {
  return (
    <div className="news-item">
      <img src={imageUrl} alt={title} className="news-image" />
      <div className="news-content">
        <h1>{title}</h1>
        <h3>{description}</h3>
      </div>
    </div>
  );
};

export default NewsItem;
