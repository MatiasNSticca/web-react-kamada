import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import style from "./CreateProductPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import usePutProduct from "../../hooks/products/usePutProduct";
import useGetProductById from "../../hooks/products/useGetProductById";
import useGetCategories from "../../hooks/products/useGetCategories";

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const {
    error: errorProductById,
    getProductById,
    loading,
  } = useGetProductById();

  useEffect(() => {
    const loadProduct = async () => {
      const response = await getProductById(id);
      if (response) {
        setForm({
          name: response.name || "",
          description: response.description || "",
          image: response.image || "",
          category: response.category?._id || response.category || "",
          price: response.price || 0,
          stock: response.stock || 0,
          available: response.available ?? true,
        });
      }
    };
    if (id) {
      loadProduct();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const { error: putError, putProduct } = usePutProduct();

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

    const success = await putProduct(id, productData);
    if (success) {
      setSuccessMessage("Producto editado exitosamente!");
      setTimeout(() => {
        navigate("/tienda");
      }, 1500);
    }
  };

  if (loading) {
    return <div className={style.crearproducto__loading}>Cargando producto...</div>;
  }

  return (
    <div className={style.crearproducto__container}>
      <div className={style.crearproducto__header}>
        <h2 className={style.crearprocuto__title}>Editar producto</h2>
        <p className={style.crearprocuto__subtitle}>
          Edita el producto de tu tienda
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
            placeholder="URL"
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
          <p className={style.crearproducto__success}>
            {successMessage}
          </p>
        )}

        {errorProductById && (
          <p className={style.crearproducto__error}>{errorProductById.message || errorProductById}</p>
        )}

        {putError && <p className={style.crearproducto__error}>{putError.message || putError}</p>}

        <div className={style.crearproducto__actions}>
          <Button type="submit" variant="primary">
            Editar producto
          </Button>
          
          <Button as={Link} to="/tienda" variant="secondary">
            Volver a la tienda
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditProductPage;
