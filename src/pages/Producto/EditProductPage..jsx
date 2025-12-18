import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./CreateProductPage.module.css";
import Input from "../../components/ui/Inputs/Input";
import { statusData, statusTranslations } from "../../utils/statusTranslations";
import Button from "../../components/ui/Button/Button";
import usePutProduct from "../../hooks/products/usePutProduct";
import useGetProductById from "../../hooks/products/useGetProductById";

function EditProductPage() {
  // Path param -> permite a traves de un valor usar un id y buscar un registro especifico
  const { id } = useParams();

  const initialForm = {
    name: "",
    description: "",
    image: "",
    status: "AVAILABLE",
    price: 0,
    stock: 0,
  };

  const [form, setForm] = useState(initialForm);

  const {
    error: errorProductById,
    getProductById,
    _loading,
  } = useGetProductById();

  useEffect(() => {
    const loadProduct = async () => {
      const response = await getProductById(id);
      if (response) {
        setForm({
          name: response.name,
          description: response.description,
          status: response.status,
          price: response.price,
          stock: response.stock,
          image: response.image,
        });
      }
    };
    if (id) {
      loadProduct();
    } else {
      console.log("id:", id);
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
    const success = await putProduct(id, form);
    if (success) {
      console.log("Creado exitosamente");
    }

    try {
      alert("Producto editado exitosamente");

      setForm(initialForm);
    } catch (error) {
      console.error(error);
      alert("Error al editar el producto");
    }
  };

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
            type="text"
            onChange={handleInputChange}
            value={form.name}
            isRequired={true}
            placeholder="Nombre del producto"
          />

          <Input
            label="Imagen"
            LabelId="image"
            type="text"
            onChange={handleInputChange}
            value={form.image}
            isRequired={true}
            placeholder="URL"
          />

          <img className={style.img__preview} src={form.image} alt={form.name} />

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
            <label htmlFor="status">Estado</label>
            <select
              name="status"
              value={form.status}
              id="status"
              onChange={handleInputChange}
            >
              {statusData.map((status) => (
                <option key={status} value={status}>
                  {statusTranslations[status] || status}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Precio"
            LabelId="price"
            type="number"
            onChange={handleInputChange}
            value={form.price}
            isRequired={true}
          />

          <Input
            label="Stock"
            LabelId="stock"
            type="number"
            onChange={handleInputChange}
            value={form.stock}
            isRequired={true}
          />
        </div>

        {/* error puede ser null (falsy). si hay error lo muestra en el formulario */}
        {errorProductById && (
          <p> {errorProductById.message || errorProductById} </p>
        )}

        {putError && <p> {putError.message || putError} </p>}

        <Button type="submit" variant="primary" onChange={handleFormSubmit}>
          Editar producto
        </Button>
      </form>
    </div>
  );
}

export default EditProductPage;
