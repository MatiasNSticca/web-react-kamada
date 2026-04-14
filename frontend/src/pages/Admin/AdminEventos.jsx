import React, { useState } from "react";
import Button from "../../components/ui/Button/Button";
import useGetEvents from "../../hooks/events/useGetEvents";
import useDeleteEvent from "../../hooks/events/useDeleteEvent";
import EventModal from "../Evento/EventModal";
import Toast from "../../components/ui/Toast/Toast";
import "./AdminEventos.css";

function AdminEventos() {
  const { events, loading, refetch } = useGetEvents();
  const { error: deleteError, deleteEvent } = useDeleteEvent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreate = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      const success = await deleteEvent(eventId);
      if (success) {
        setSuccessMessage("Evento eliminado exitosamente!");
        refetch();
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleModalSuccess = () => {
    setSuccessMessage(
      editingEvent 
        ? "Evento editado exitosamente!" 
        : "Evento creado exitosamente!"
    );
    refetch();
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  };

  const getCategoryLabel = (category) => {
    const labels = {
      recital: "Recital",
      festival: "Festival",
      meetup: "Meetup",
      otro: "Otro"
    };
    return labels[category] || category;
  };

  if (loading) {
    return <div className="loading">Cargando eventos...</div>;
  }

  return (
    <div className="admin-eventos">
      <div className="admin-eventos__header">
        <h1>Gestión de Eventos</h1>
        <Button variant="primary" onClick={handleCreate}>
          + Crear Evento
        </Button>
      </div>

      {successMessage && (
        <Toast message={successMessage} type="success" onClose={() => setSuccessMessage("")} />
      )}

      {deleteError && (
        <Toast message={deleteError.message} type="error" onClose={() => {}} />
      )}

      <div className="table-container">
        <table className="eventos-table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Fecha</th>
              <th>Ubicación</th>
              <th>Precio</th>
              <th>Tickets</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No hay eventos disponibles
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="event-title">{event.title}</td>
                  <td className="event-date">{formatDate(event.date)}</td>
                  <td className="event-location">{event.location}</td>
                  <td className="event-price">${event.price}</td>
                  <td className="event-tickets">{event.ticketsAvailable}</td>
                  <td className="event-category">
                    {getCategoryLabel(event.category)}
                  </td>
                  <td>
                    <span className={`status-badge ${event.active ? "available" : "unavailable"}`}>
                      {event.active ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="actions">
                    <Button 
                      variant="secondary" 
                      onClick={() => handleEdit(event)}
                      className="btn-edit"
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      variant="primary" 
                      onClick={() => handleDelete(event._id)}
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

      <EventModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        event={editingEvent}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}

export default AdminEventos;