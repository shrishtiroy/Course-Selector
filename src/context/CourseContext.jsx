import {createContext, useState, useContext, useEffect} from "react"
import MyPopup from "../components/Popup.jsx"
const CourseContext = createContext()

export const useCourseContext = () => useContext(CourseContext)

export const CourseProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [savedSchedule, setSavedSchedule] = useState([])
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    useEffect(() => {
        const storedCart = localStorage.getItem("cart")
        if(storedCart) setCart(JSON.parse(storedCart))
    }, [])
        
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])


    const addToCart = (course) => {
        if(cart.length < 7){
            setCart(prev => [...prev, course])
        }
        else{
            handleOpenPopup();
        }
    }

    const removeFromCart = (courseNum) => {
        setCart(prev => prev.filter(course => course.number !== courseNum))
    }

    const inCart = (courseNum) => {
        return cart.some(course => course.number === courseNum)
    }

    const value = {
        cart,
        removeFromCart, 
        addToCart,
        inCart,
        setCart,
        savedSchedule,
        setSavedSchedule
    }

    return <CourseContext.Provider value = {value}>
        {children}
        <div className="popup">
            <button onClick={handleOpenPopup}>Open Popup</button>
            <MyPopup isOpen={isPopupOpen} onClose={handleClosePopup}>
                <h2>cart is full (max 7 courses)</h2>
                <p>checkout or clear your cart to proceed</p>
            <button onClick={handleClosePopup} style={{backgroundColor:"white", color: "rgb(18, 2, 22)", border: "solid"}}>close</button>
            </MyPopup>
        </div>
    </CourseContext.Provider>
}