import React, { useState } from 'react';
import ProductsList from './components/ProductsList.jsx';
import ProductsForm from './components/ProductsForm.jsx';
import Modal from 'react-modal';
import './App.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function App() {
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [refreshProducts, setRefreshProducts] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
    setProductToEdit(null);
  };

  const handleEditProduct = (product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  const handleRefreshProducts = () => {
    setRefreshProducts(!refreshProducts);
  };

  return (
    <div className="App">
      <h1>Productos</h1>
      <button className="create-product-btn button" onClick={toggleForm}>
        + Crear nuevo producto
      </button>
      <Modal isOpen={showForm} onRequestClose={toggleForm} className="ReactModal__Content">
        <ProductsForm
          onClose={toggleForm}
          productToEdit={productToEdit}
          onProductUpdated={handleRefreshProducts}
          onSubmit={handleRefreshProducts}
        />
      </Modal>
      <ProductsList onEditProduct={handleEditProduct} refreshProducts={refreshProducts} />
    </div>
  );
}

export default App;
