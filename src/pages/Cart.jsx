import { useCourseContext } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";
import "../css/Cart.css"
import { useNavigate } from "react-router-dom";


function Cart(){
    const {cart, setCart} = useCourseContext();

    const navigate = useNavigate();
    const clearCart = () => {
        setCart(prev => [])
    }

    if(cart.length > 0){
        return <div className = "cart">
            <div className="your-cart">
                <h2 className = "cart-title">Your Cart</h2>
                <div className = "cart-btns">
                    <button className="clear-cart" onClick={clearCart}>clear cart</button>
                    <br></br>
                    <button className="checkout-btn" style={{ fontSize: '1.2rem' }} onClick={() => navigate('/checkout')}>checkout 🛒</button>
                </div>
            </div>
            
			
            <div className="courses-grid">
                {cart.map ((course) => (
                    <CourseCard course = {course} key = {course.number} />
                )
            )}
            </div>
        </div>
    }

    return <div className = "cart-empty">
        <h2>No Courses Yet</h2>
        <p>Add Courses to Your Cart</p>
    </div>
}

export default Cart