import React, { useState, useEffect, useCallback } from "react";
import Button from "../../components/ui/Button/Button";
import usePostProduct from "../../hooks/products/usePostProduct";
import usePutProduct from "../../hooks/products/usePutProduct";
import useGetCategories from "../../hooks/products/useGetCategories";
import useGetProductById from "../../hooks/products/useGetProductById";
import Toast from "../../components/ui/Toast/Toast";
import "./ProductModal.css";

const INITIAL_PRODUCT_FORM = {
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  stock: 0,
  available: true,
};

function ProductModal({ isOpen, onClose, product, onSuccess }) {
  const { categories } = useGetCategories();
  const { error: postError, postProduct } = usePostProduct();
  const { error: putError, putProduct } = usePutProduct();
  const { getProductById } = useGetProductById();

  const isEditing = !!product;

  const [form, setForm] = useState(INITIAL_PRODUCT_FORM);
  const [successMessage, setSuccessMessage] = useState("");

  const loadProductData = useCallback(async (productId) => {
    const data = await getProductById(productId);
    if (data) {
      setForm({
        name: data.name || "",
        description: data.description || "",
        image: data.image || "",
        category: data.category?._id || data.category || "",
        price: data.price || 0,
        stock: data.stock || 0,
        available: data.available ?? true,
      });
    }
  }, [getProductById]);

  useEffect(() => {
    if (!isOpen) return;
    
    if (product) {
      loadProductData(product._id);
    } else {
      setForm(INITIAL_PRODUCT_FORM);
      setSuccessMessage("");
    }
  }, [isOpen, product]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    setSuccessMessage("");

    if (!form.category) {
      alert("Por favor selecciona una categoría");
      return;
    }

    const productData = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    let success;
    if (isEditing) {
      success = await putProduct(product._id, productData);
    } else {
      success = await postProduct(productData);
    }

    if (success) {
      setSuccessMessage(isEditing ? "Producto editado exitosamente!" : "Producto creado exitosamente!");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? "Editar Producto" : "Crear Producto"}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {/* Nombre */}
          <div className="form-group">
            <label htmlFor="name">Nombre *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleInputChange}
              required
              placeholder="Nombre del producto"
            />
          </div>

          {/* Imagen URL */}
          <div className="form-group">
            <label htmlFor="image">Imagen URL *</label>
            <input
              type="text"
              name="image"
              id="image"
              value={form.image}
              onChange={handleInputChange}
              required
              placeholder="URL de la imagen"
            />
          </div>

          {form.image && (
            <div className="image-preview">
              <img src={form.image} alt="Preview" />
            </div>
          )}

          {/* Descripción */}
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              name="description"
              id="description"
              value={form.description}
              onChange={handleInputChange}
              placeholder="Descripción del producto"
              rows="3"
            />
          </div>

          {/* Categoría */}
          <div className="form-group">
            <label htmlFor="category">Categoría *</label>
            <select
              name="category"
              id="category"
              value={form.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Precio y Stock */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Precio *</label>
              <input
                type="number"
                name="price"
                id="price"
                value={form.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stock">Stock *</label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={form.stock}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Disponibilidad */}
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="available"
                checked={form.available}
                onChange={handleInputChange}
              />
              Disponible para la venta
            </label>
          </div>

          {successMessage && (
            <Toast message={successMessage} type="success" onClose={() => setSuccessMessage("")} />
          )}

          {(postError || putError) && (
            <Toast 
              message={postError?.message || putError?.message} 
              type="error" 
              onClose={() => {}} 
            />
          )}
        </div>

        <div className="modal-footer">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmit}>
            {isEditing ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;