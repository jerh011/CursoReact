import Header from "./components/Header";
import Footer from "./components/Footer";
import Guitarra from "./components/Guitarra";
import { db } from "./lib/db";
import { useState, useEffect } from "react";

function App() {
  //simulacion de la base de datos de guitarras
  const [data, setData] = useState([]);
  //agregar aun carrito de compras
  const [cart,setCart]=useState([]);
  useEffect(()=>{
    setData(db)
  },[])
  // console.log(cart)
  function addToCart(items){
    const itemExiste =cart.findIndex((guitar)=>guitar.id===items.id)
    console.log(itemExiste)
     if(itemExiste>=0){//ya existe en el carrito
      const updateCart=[...cart]
      updateCart[itemExiste].quantity++
      setCart(updateCart)
     }else{
      items.quantity=items.quantity+1;
       setCart([...cart, items]); 
     }
    

  }
  return (
    <>
      <Header />
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
