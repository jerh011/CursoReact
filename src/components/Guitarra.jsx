export default function Guitarra({ guitar, addToCart }) {
  const {
    id,
    name: nombre,
    image: src,
    description: descripcion,
    price: precio,
  } = guitar;

  // const handleClick = () => {
  //   setCart((prevCart) => [...prevCart, guitar]);
  // };

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${src}.jpg`}
          alt="imagen guitarra"
        />
      </div>

      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{nombre}</h3>

        <p>{descripcion}</p>

        <p className="fw-black text-primary fs-3">{precio}</p>

        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(guitar)}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
