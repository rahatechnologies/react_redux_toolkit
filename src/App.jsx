import CartContainer from "./component/CartContainer";
import Navbar from "./component/Navbar";
import { useDispatch, useSelector } from "react-redux";
// import { store } from "./store";
import { calculateTotal, getCartItems } from "./features/cartSlice";
import { useEffect } from "react";
import Modal from "./component/Modal";

function App() {
  const {cartItems, isLoading} = useSelector((store)=> store.cart);
  const dispatch = useDispatch();


  const {isOpen} = useSelector((store)=>store.modal);
//  whenever cartItems load , calCulateTotal action should be dispatched

useEffect(()=> {
   dispatch(calculateTotal());
}, [cartItems])



useEffect(() => {
  // call dispatch to getCartItems
  dispatch(getCartItems()); 
}, []) // on loading 


if(isLoading){
  return (
    <div className="loading">
      <h1>Loading...</h1>
    </div>
  )
}

  return <main>
    <Navbar/>

    {isOpen && <Modal/>}    
    <CartContainer />
  </main>;
}
export default App;
