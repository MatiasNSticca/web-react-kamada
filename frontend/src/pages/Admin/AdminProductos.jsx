import React, { useState } from "react";
import Button from "../../components/ui/Button/Button";
import useGetProduct from "../../hooks/products/useGetProduct";
import useDeleteProduct from "../../hooks/products/useDeleteProduct";
import ProductModal from "../Producto/ProductModal";
import "./AdminProductos.css";

function AdminProductos() {
  const { products, loading, refetch } = useGetProduct();
  const { error: deleteError, deleteProduct } = useDeleteProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      const success = await deleteProduct(productId);
      if (success) {
        setSuccessMessage("Producto eliminado exitosamente!");
        refetch();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleModalSuccess = () => {
    setSuccessMessage(
      editingProduct 
        ? "Producto editado exitosamente!" 
        : "Producto creado exitosamente!"
    );
    refetch();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const getCategoryName = (category) => {
    if (!category) return "-";
    return typeof category === "object" ? category.name : category;
  };

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  return (
    <div className="admin-productos">
      <div className="admin-productos__header">
        <h1>Gestión de Productos</h1>
        <Button variant="primary" onClick={handleCreate}>
          + Crear Producto
        </Button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {deleteError && (
        <div className="error-message">{deleteError.message}</div>
      )}

      <div className="table-container">
        <table className="productos-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No hay productos disponibles
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id}>
                  <td className="product-name">{product.name}</td>
                  <td className="product-price">${product.price}</td>
                  <td className="product-stock">{product.stock}</td>
                  <td className="product-category">
                    {getCategoryName(product.category)}
                  </td>
                  <td>
                    <span className={`status-badge ${product.available ? "available" : "unavailable"}`}>
                      {product.available ? "Disponible" : "No disponible"}
                    </span>
                  </td>
                  <td className="actions">
                    <Button 
                      variant="secondary" 
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => handleDelete(product._id)}
                      className="btn-delete"
                    >
                      🗑️ Eliminar
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={editingProduct}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default AdminProductos;
