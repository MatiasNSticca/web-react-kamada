import React, { useState, useEffect } from "react";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import usePostProduct from "../../hooks/products/usePostProduct";
import usePutProduct from "../../hooks/products/usePutProduct";
import useGetCategories from "../../hooks/products/useGetCategories";
import useGetProductById from "../../hooks/products/useGetProductById";
import "./ProductModal.css";

function ProductModal({ isOpen, onClose, product, onSuccess }) {
  const { categories } = useGetCategories();
  const { error: postError, postProduct } = usePostProduct();
  const { error: putError, putProduct } = usePutProduct();
  const { getProductById, loading: loadingProduct } = useGetProductById();

  const isEditing = !!product;

  const initialForm = {
    name: "",
    description: "",
    image: "",
    category: "",
    price: 0,
    stock: 0,
    available: true,
  };

  const [form, setForm] = useState(initialForm);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (product) {
        loadProductData(product._id);
      } else {
        setForm(initialForm);
      }
      setSuccessMessage("");
    }
  }, [isOpen, product]);

  const loadProductData = async (productId) => {
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
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <Input
              label="Nombre"
              LabelId="name"
              name="name"
              type="text"
              onChange={handleInputChange}
              value={form.name}
              isRequired={true}
              placeholder="Nombre del producto"
            />

            <Input
              label="Imagen URL"
              LabelId="image"
              name="image"
              type="text"
              onChange={handleInputChange}
              value={form.image}
              isRequired={true}
              placeholder="URL de la imagen"
            />

            {form.image && (
              <div className="image-preview">
                <img src={form.image} alt="Preview" />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                onChange={handleInputChange}
                value={form.description}
                placeholder="Descripción del producto"
                rows="3"
              />
            </div>

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

            <div className="form-row">
              <Input
                label="Precio"
                LabelId="price"
                name="price"
                type="number"
                onChange={handleInputChange}
                value={form.price}
                isRequired={true}
              />

              <Input
                label="Stock"
                LabelId="stock"
                name="stock"
                type="number"
                onChange={handleInputChange}
                value={form.stock}
                isRequired={true}
              />
            </div>

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
              <div className="success-message">{successMessage}</div>
            )}

            {(postError || putError) && (
              <div className="error-message">
                {postError?.message || putError?.message}
              </div>
            )}
          </div>

          <div className="modal-footer">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductModal;
