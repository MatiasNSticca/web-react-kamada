import React, { useState } from "react"
import { Link } from "react-router-dom"
import style from "./CreateProductPage.module.css"
import Input from "../../components/ui/Inputs/Input"
import { statusData, statusTranslations  } from "../../utils/statusTranslations"
import Button from "../../components/ui/Button/Button"

function CreateProductPage() {

    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        placeholder: "",
        status: "AVAILABLE",
        price: 0,
        stock: 0
    })

    const handleInputChange = (e) => {
        const { name, value, type, } = e.target
        setForm({
            ...form,
            [name]: type === "number" ? parseInt(value) || 0 : value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(form)
        // const success = null
    }

  return (
    <div className={style.crearproducto__container}>
        <div className={style.crearproducto__header}>
            <h2 className={style.crearprocuto__title}>Crear producto</h2>
            <p className={style.crearprocuto__subtitle}>Añade un nuevo producto a tu tienda</p>
        </div>

        <form className={style.crearproducto__form} onSubmit={handleFormSubmit}>
            <div className={style.form__content}>
                <Input label="Nombre" LabelId="name" type="text" onChange={handleInputChange} value={form.name} isRequired={true} placeholder="Nombre del producto" />
    
                <Input label="Imagen" LabelId="image" type="text" onChange={handleInputChange} value={form.image} isRequired={true} placeholder="URL" />

                <div className={style.input__textarea}>
                    <label htmlFor="description">Descripcion</label>
                    <textarea name="description" id="description" onChange={handleInputChange} value={form.description} placeholder="Añade una descripcion"></textarea>
                </div>

                <div className={style.input__select}>
                    <label htmlFor="status">Estado</label>
                    <select name="status" value={form.status} id="status" onChange={handleInputChange}>
                        {statusData.map((status) => (
                            <option key={status} value={status}>
                                {statusTranslations[status] || status}
                            </option>
                        ))}
                    </select>
                </div>

                <Input label="Precio" LabelId="price" type="number" onChange={handleInputChange} value={form.price} isRequired={true} />

                <Input label="Stock" LabelId="stock" type="number" onChange={handleInputChange} value={form.stock} isRequired={true} />
            </div>

            <Button type="submit" variant="primary" onChange={handleFormSubmit}>
                Crear producto
            </Button>
        </form>

        <Button as={Link} to="/" variant="secondary">
            Volver a productos
        </Button>
    </div>
  )
}

export default CreateProductPage