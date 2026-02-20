import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import { db } from "./lib/db";
import { useState, useEffect } from "react";

function App() {
  //VERIFICA SI HAY ALGO EN LOCAL STORAGE
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem('cart')
    return localStorage? JSON.parse(localStorageCart):[]
  }
  //simulacion de la base de datos de guitarras
  const [data] = useState(db);
  //agregar aun carrito de compras
  const [cart, setCart] = useState(initialCart);
 
  useEffect(() => {
    localStorage.setItem('cart',JSON.stringify(cart))
  }, [cart]);
  const MAX_ITEMS=5;
  const MIN_ITEMS=1;
  function removeFromCart(id) {
    setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
  }
  function incrementarQuantity(id) {
    const updatedCart = cart.map((item) => {
      if (item.id === id && item.quantity<MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item
    });
    setCart(updatedCart)
  }
  //reto 1
   function decrementarQuantity(id) {
   
     const updatedCart = cart.map((item) => {
       if (item.id === id && item.quantity > MIN_ITEMS) {
         return {
           ...item,
           quantity: item.quantity - 1,
         };
       }
       return item;
     });
     setCart(updatedCart);
   }
   
  // console.log(cart)
  function addToCart(items) {
    const itemExiste = cart.findIndex((guitar) => guitar.id === items.id);
      // console.log(itemExiste)
    if (itemExiste >= 0  ) {
      if(cart[itemExiste].quantity>=MAX_ITEMS) return     //ya existe en el carrito
      const updateCart = [...cart];
      updateCart[itemExiste].quantity++;
      setCart(updateCart);
    } else {
      items.quantity = 1;
      setCart([...cart, items]);
    }
  }
  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        incrementarQuantity={incrementarQuantity}
        decrementarQuantity={decrementarQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((Guitar) => (
            <Guitarra
              key={Guitar.id}
              guitar={Guitar}
              // setCart={setCart}
              addToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
