import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductsList = ({ onEditProduct, refreshProducts }) => {
  const [products, setProducts] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [refreshProducts]);

  const fetchProducts = () => {
    axios
      .get('https://products-crud.academlo.tech/products/')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const handleDeleteProduct = (productId) => {
    if (!productToDelete) {
      return;
    }

    axios
      .delete(`https://products-crud.academlo.tech/products/${productId}`)
      .then(() => {
        setDeleteModalOpen(false);
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className="products">
      {products.map((product) => (
        <div key={product.id} className="product">
          <h3>{product.name}</h3>
          <p>Categoría: {product.category}</p>
          <p>Precio: ${product.price}</p>
          <p>Disponible: {product.isAvailable ? 'Sí' : 'No'}</p>
          <div className="actions">
            <button className="button" onClick={() => onEditProduct(product)}>✏️</button>
            <button
              className="button"
              onClick={() => {
                setProductToDelete(product);
                setDeleteModalOpen(true);
              }}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      <Modal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        className="delete-modal"
        overlayClassName="ReactModal__Overlay"
      >
        <h2>ELIMINAR PRODUCTO</h2>
        <p>
          Deseas eliminar el producto{' '}
          {productToDelete ? productToDelete.name : ''}
        </p>
        <div className="delete-modal__buttons">
          <button className="button" onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
          <button
            className="button"
            onClick={() => handleDeleteProduct(productToDelete.id)}
          >
            Aceptar
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductsList;
