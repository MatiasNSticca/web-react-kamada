import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./CreateProductPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import usePostProduct from "../../hooks//products/usePostProduct";
import useGetCategories from "../../hooks/products/useGetCategories";

function CreateProductPage() {
  const navigate = useNavigate();
  const { error, postProduct } = usePostProduct();
  const { categories } = useGetCategories();

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

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    });
  };

  const handleFormSubmit = async (e) => {
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

    const success = await postProduct(productData);
    if (success) {
      setSuccessMessage("Producto creado exitosamente!");
      setForm(initialForm);
      setTimeout(() => {
        navigate("/tienda");
      }, 1500);
    }
  };

  return (
    <div className={style.crearproducto__container}>
      <div className={style.crearproducto__header}>
        <h2 className={style.crearprocuto__title}>Crear producto</h2>
        <p className={style.crearprocuto__subtitle}>
          Añade un nuevo producto a tu tienda
        </p>
      </div>

      <form className={style.crearproducto__form} onSubmit={handleFormSubmit}>
        <div className={style.form__content}>
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
            label="Imagen"
            LabelId="image"
            name="image"
            type="text"
            onChange={handleInputChange}
            value={form.image}
            isRequired={true}
            placeholder="URL de la imagen"
          />

          { form.image && ( 
            <img className={style.img__preview} src={form.image} alt={form.name} />
          )}

          <div className={style.input__textarea}>
            <label htmlFor="description">Descripcion</label>
            <textarea
              name="description"
              id="description"
              onChange={handleInputChange}
              value={form.description}
              placeholder="Añade una descripcion"
            ></textarea>
          </div>

          <div className={style.input__select}>
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

        {successMessage && (
          <p style={{ color: 'green', fontWeight: 'bold', padding: '10px', backgroundColor: '#d4edda', borderRadius: '5px' }}>
            {successMessage}
          </p>
        )}

        {error && <p style={{ color: 'red' }}>{error.message}</p>}

        <div style={{ display: 'flex', gap: '10px' }}>
          <Button type="submit" variant="primary">
            Crear producto
          </Button>
          
          <Button as={Link} to="/tienda" variant="secondary">
            Volver a la tienda
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductPage;
