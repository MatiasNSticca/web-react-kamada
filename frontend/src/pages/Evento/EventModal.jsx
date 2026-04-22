import React, { useState, useEffect, useCallback } from "react";
import Input from "../../components/ui/Inputs/Input";
import Button from "../../components/ui/Button/Button";
import usePostEvent from "../../hooks/events/usePostEvent";
import usePutEvent from "../../hooks/events/usePutEvent";
import useGetEventById from "../../hooks/events/useGetEventById";
import Toast from "../../components/ui/Toast/Toast";
import "./EventModal.css";

// Definir initialForm FUERA del componente para evitar re-renders
const INITIAL_EVENT_FORM = {
  title: "",
  description: "",
  date: "",
  location: "",
  venue: "",
  image: "",
  price: 0,
  ticketsAvailable: 0,
  category: "recital",
  active: true,
};

function EventModal({ isOpen, onClose, event, onSuccess }) {
  const { error: postError, postEvent } = usePostEvent();
  const { error: putError, putEvent } = usePutEvent();
  const { getEventById } = useGetEventById();

  const isEditing = !!event;

  const [form, setForm] = useState(INITIAL_EVENT_FORM);
  const [successMessage, setSuccessMessage] = useState("");

  // Envolver en useCallback para evitar recreation en cada render
  const loadEventData = useCallback(async (eventId) => {
    const data = await getEventById(eventId);
    if (data) {
      setForm({
        title: data.title || "",
        description: data.description || "",
        date: data.date ? data.date.split('T')[0] : "",
        location: data.location || "",
        venue: data.venue || "",
        image: data.image || "",
        price: data.price || 0,
        ticketsAvailable: data.ticketsAvailable || 0,
        category: data.category || "recital",
        active: data.active ?? true,
      });
    }
  }, [getEventById]);

  // Solo dependencias necesarias - sin loadEventData ni initialForm
  useEffect(() => {
    if (!isOpen) return;
    
    if (event) {
      loadEventData(event._id);
    } else {
      setForm(INITIAL_EVENT_FORM);
      setSuccessMessage("");
    }
  }, [isOpen, event]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    const eventData = {
      ...form,
      price: Number(form.price),
      ticketsAvailable: Number(form.ticketsAvailable),
    };

    let success;
    if (isEditing) {
      success = await putEvent(event._id, eventData);
    } else {
      success = await postEvent(eventData);
    }

    if (success) {
      setSuccessMessage(isEditing ? "Evento editado exitosamente!" : "Evento creado exitosamente!");
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
          <h2>{isEditing ? "Editar Evento" : "Crear Evento"}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <Input
              label="Título"
              LabelId="title"
              name="title"
              type="text"
              onChange={handleInputChange}
              value={form.title}
              isRequired={true}
              placeholder="Nombre del evento"
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
                placeholder="Descripción del evento"
                rows="3"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Fecha *</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={form.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  name="category"
                  id="category"
                  value={form.category}
                  onChange={handleInputChange}
                >
                  <option value="recital">Recital</option>
                  <option value="festival">Festival</option>
                  <option value="meetup">Meetup</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Ubicación *</label>
              <input
                type="text"
                name="location"
                id="location"
                value={form.location}
                onChange={handleInputChange}
                placeholder="Ciudad, Provincia"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="venue">Lugar (Venue)</label>
              <input
                type="text"
                name="venue"
                id="venue"
                value={form.venue}
                onChange={handleInputChange}
                placeholder="Nombre del venue"
              />
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
                label="Tickets Disponibles"
                LabelId="ticketsAvailable"
                name="ticketsAvailable"
                type="number"
                onChange={handleInputChange}
                value={form.ticketsAvailable}
                isRequired={true}
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleInputChange}
                />
                Evento activo
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
            <Button type="submit" variant="primary">
              {isEditing ? "Guardar Cambios" : "Crear Evento"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;