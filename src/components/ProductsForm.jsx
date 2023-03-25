import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductsForm = ({ onClose, productToEdit, onProductUpdated = () => {}, onSubmit = () => {} }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setIsAvailable(productToEdit.isAvailable);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      category,
      price,
      isAvailable,
    };

    if (productToEdit) {
      axios
        .put(`https://products-crud.academlo.tech/products/${productToEdit.id}/`, productData)
        .then(() => {
          onProductUpdated();
          onClose();
        })
        .catch((error) => console.error('Error updating product:', error));
    } else {
      axios
        .post('https://products-crud.academlo.tech/products/', productData)
        .then(() => {
          onSubmit();
          onClose();
        })
        .catch((error) => console.error('Error creating product:', error));
    }
  };

  return (
    <div className="product-form">
      <form onSubmit={handleSubmit}>
        <h2>{productToEdit ? 'Editar producto' : 'Crear producto'}</h2>
        <label htmlFor="name">Nombre:</label><br />
        <input
          id="name"
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label htmlFor="category">Categoría:</label><br />
        <input
          id="category"
          type="text"
          placeholder="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        /><br />
        <label htmlFor="price">Precio:</label><br />
        <input
          id="price"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        /><br />
        <label htmlFor="isAvailable">Disponible:</label>
        <input
          id="isAvailable"
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        /><br />
        <div className="actions">
          <button className="button" type="submit">{productToEdit ? 'Guardar cambios' : 'Crear producto'}</button>
          <button className="button" type="button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
