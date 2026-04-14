import React from "react";
import Card from "../../components/ui/Cards/card-evento/EventoCard";
import useGetEvents from "../../hooks/events/useGetEvents";
import style from "./Eventos.module.css";

function Eventos() {
  const { events, loading, error } = useGetEvents();

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
                  onClick={() => {
                    if (event.ticketsAvailable > 0) {
                      alert(`Comprar entrada para: ${event.title}`);
                    }
                  }}
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