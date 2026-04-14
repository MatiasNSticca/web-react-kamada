import React, { useState } from "react";
import Card from "../../components/ui/Cards/card-evento/EventoCard";
import useGetEvents from "../../hooks/events/useGetEvents";
import { useCart } from "../../contex/CartContext";
import Toast from "../../components/ui/Toast/Toast";
import style from "./Eventos.module.css";

function Eventos() {
  const { events, loading, error } = useGetEvents();
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState("");
  const [cartError, setCartError] = useState("");

  const handleBuy = (event) => {
    if (event.ticketsAvailable <= 0) {
      setCartError("No hay tickets disponibles");
      setTimeout(() => setCartError(""), 3000);
      return;
    }

    try {
      const ticketData = {
        _id: `event-${event._id}`,
        id: `event-${event._id}`,
        name: event.title,
        description: `Fecha: ${new Date(event.date).toLocaleDateString('es-AR')} - ${event.location}`,
        price: event.price,
        image: event.image,
        quantity: 1,
        stock: event.ticketsAvailable,
        type: 'evento'
      };
      
      addToCart(ticketData, 1);
      setSuccessMessage(`Entrada para ${event.title} agregada al carrito`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setCartError(err.message);
      setTimeout(() => setCartError(""), 3000);
    }
  };

  if (loading) {
    return (
      <section className={style.eventos}>
        <div className={style.eventos__container}>
          <div className={style.eventos__header}>
            <h2 className={style.eventos__title}>Próximos eventos</h2>
            <p className={style.eventos__subtitle}>Cargando eventos...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={style.eventos}>
        <div className={style.eventos__container}>
          <div className={style.eventos__header}>
            <h2 className={style.eventos__title}>Próximos eventos</h2>
            <p className={style.eventos__subtitle}>Error al cargar eventos</p>
          </div>
        </div>
      </section>
    );
  }

  const activeEvents = events.filter(event => event.active);

  return (
    <>
      <section className={style.eventos}>
        <div className={style.eventos__container}>
          <div className={style.eventos__header}>
            <h2 className={style.eventos__title}>Próximos eventos</h2>
            <p className={style.eventos__subtitle}>Compra tus entradas</p>
          </div>

          {successMessage && (
            <Toast message={successMessage} type="success" onClose={() => setSuccessMessage("")} />
          )}
          
          {cartError && (
            <Toast message={cartError} type="error" onClose={() => setCartError("")} />
          )}

          {activeEvents.length === 0 ? (
            <div className={style.eventos__cards}>
              <p style={{ textAlign: 'center', color: '#666' }}>
                No hay eventos disponibles actualmente
              </p>
            </div>
          ) : (
            <div className={style.eventos__cards}>
              {activeEvents.map((event) => (
                <Card
                  key={event._id}
                  imgSrc={event.image}
                  title={event.title}
                  subtitle={event.location}
                  date={event.date}
                  price={event.price}
                  buttonLabel={event.ticketsAvailable > 0 ? "Comprar" : "Agotado"}
                  onClick={() => handleBuy(event)}
                  disabled={event.ticketsAvailable <= 0}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Eventos;