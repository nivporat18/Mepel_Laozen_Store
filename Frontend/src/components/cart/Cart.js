import React, { useEffect } from 'react'
import './Cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../store/CartSlice'
import PayButton from '../auth/payButton/PayButton'



function Cart() {

  const navigate = useNavigate()

  const cart = useSelector((state)=>state.cart)

  const auth = useSelector((state)=>state.auth)


  
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getTotals())
  },[cart,dispatch])

  const handleRemoveFromCart =(cartItem)=>{
      dispatch(removeFromCart(cartItem))
  }


  const handleDecreaseCart = (cartItem)=>{
    dispatch(decreaseCart(cartItem))
  }


  const handleIncreaseQuantity = (cartItem)=>{
    dispatch(addToCart(cartItem))
  }

  const handleClearCart = ()=>{
    dispatch(clearCart())
  }

  return (
    <div className='cart-container'>
      <h2>סל קניות</h2>
        {cart.cartItems.length === 0 ? (
          <div className='cart-empty'>
            <p className='text-black'>Your Cart is currently empty</p>  
            <div className='start-shopping'>
              <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
                <span>Start Shopping</span>  
               </Link>
            </div>
           </div>
        ):(<>
        <div >

          <div className='titles'>
              <h3 className='product-title'>מוצר</h3>
              <h3 className='price'>מחיר</h3>
              <h3 className='quantity'>כמות</h3>
              <h3 className='total'>סה״כ</h3>
          </div>
              <div className='cart-items'>
                {cart.cartItems?.map(cartItem =>
                  <div className='cart-item' key={cartItem._id}>
                      <div className='cart-product'>
                        <img src={cartItem.image.url} alt={cartItem.name}/>
                        <div>
                          <h3>{cartItem.name}</h3> 
                          <p>{cartItem.desc}</p>
                          <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                        </div>
                      </div>
                      <div className='cart-product-price'>
                      ₪{cartItem.price}
                      </div>

                      <div className='cart-product-quantity'>
                        <button onClick={()=>handleDecreaseCart(cartItem)}>-</button>
                        <div className='count'>{cartItem.cartQuantity}</div>
                        <button onClick={()=>handleIncreaseQuantity(cartItem)}>+</button>
                      </div>
                          <div className='cart-product-total-price'>
                          ₪{cartItem.price * cartItem.cartQuantity}
                          </div>
                  </div>
                  
                )}
              </div>
                <div className='cart-summary'>
                  <button className='clear-cart' onClick={()=>handleClearCart()}>ניקוי סל</button>
                  <div className='cart-checkout'>
                    <div className='subtotal'>
                    <span>סה״כ הזמנה</span>
                    <span className='amount'>₪{cart.cartTotalAmount}</span>
                    </div>
                    <p>מיסים ומשלוח מחושבים בקופה</p>

                      {auth._id ? <PayButton cartItems = {cart.cartItems}/> : <button className='cart-login' onClick={()=>{navigate("/login")}}>התחבר</button>}

                  <div className='continue-shopping'>
                <Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
  </svg>
                  <span>להמשך הקניה</span>  
                </Link>
              </div>
                </div>
                </div>
            </div>
        </>)}
    </div>


  )
}

export default Cart