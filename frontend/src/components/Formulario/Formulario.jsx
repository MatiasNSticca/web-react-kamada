import React, { useState } from "react"
import style from "./Formulario.module.css"
import Button from "../ui/Button/Button"


function Formulario() {

    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [consulta, setConsulta] = useState("")
    const [mensaje, setMensaje] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Mensaje enviado ✅", {nombre, correo, telefono, consulta, mensaje})
        resetForm()
    }

    const resetForm = () => {
        setNombre("")
        setCorreo("")
        setTelefono("")
        setConsulta("")
        setMensaje("")
    }

  return (
    <>
        <form 
            className={style.formulario__content} 
            onSubmit={handleSubmit}>
            <div className={style.formulario__field}>
              <label htmlFor="nombre">Nombre</label>
              <input 
                type="text" 
                id="nombre" 
                name="nombre" 
                placeholder="Tu nombre" 
                required 
                value={nombre} 
                onChange={(e) => {setNombre(e.target.value)
                }}
              />
            </div>

            <div className={style.formulario__field}>
              <label htmlFor="correo">Correo</label>
              <input 
                type="email" 
                id="correo" 
                name="correo" 
                placeholder="Tu correo" 
                required 
                value={correo} 
                onChange={(e) => {setCorreo(e.target.value)
                }}
              />
            </div>

            <div className={style.formulario__field}>
              <label htmlFor="telefono">Teléfono</label>
              <input 
                type="tel" 
                id="telefono" 
                name="telefono" 
                placeholder="Tu teléfono" 
                required 
                value={telefono} 
                onChange={(e) => {setTelefono(e.target.value)
                }}
              />
            </div>

            <div className={style.formulario__field}>
              <label htmlFor="consulta">Motivo de consulta</label>
              <select 
                id="consulta" 
                name="consulta" 
                required 
                value={consulta} 
                onChange={(e) => {setConsulta(e.target.value)
                }}
              >
                <option value="" disabled>Selecciona una opción</option>
                <option value="soporte">Soporte</option>
                <option value="presupuesto">Presupuesto</option>
                <option value="colaboracion">Colaboración</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className={style.formulario__field}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                rows="5" 
                placeholder="Tu mensaje" 
                required 
                value={mensaje} 
                onChange={(e) => {setMensaje(e.target.value)
                }}
              />
            </div>

            <Button type="submit" variant="primary">
              Enviar
            </Button>
        </form>
    </>
  )
}

export default Formulario