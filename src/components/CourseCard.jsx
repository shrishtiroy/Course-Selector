import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
import { useCourseContext } from "../context/CourseContext";
import "../css/CourseCard.css"

function CourseCard({course}) {
    const {inCart, addToCart, removeFromCart} = useCourseContext()
    const itemInCart = inCart(course.number)
    const [addToCartText, setAddToCartText] = useState(itemInCart ? "Remove from cart" : "Add to Cart");
    const [isExpanded, setIsExpanded] = useState(false)  
    const fullDescription = course.description;
    var shortDescription = fullDescription.substring(0, 250)
    shortDescription = shortDescription.substring(0, 
        Math.max(Math.min(shortDescription.length, shortDescription.lastIndexOf(".")+1), shortDescription.lastIndexOf("?")+1))

	const handleReadMoreClick = () => {
		setIsExpanded(!isExpanded)
	}

    function onAddToCartClick(e) {
        e.preventDefault()
        if (itemInCart) {
            removeFromCart(course.number) 
        }
        else {
            addToCart(course) 
        }
    }

    useEffect(() => {
        setAddToCartText(itemInCart ? "Remove from cart" : "Add to Cart");
    }, [itemInCart]);

    return <div className = "course-card">
        <div className="course-info">
            <h2>{course.dept} {course.number}</h2>
            <h3>{course.title}</h3>
            <div className="course-description">
                <p>{isExpanded ? fullDescription : shortDescription}
                    {fullDescription.length > 100 && (
                        <div>
                        <button className="read-more-btn" onClick={handleReadMoreClick}>
                        {isExpanded ? "Read Less" : "Read More"}
                        </button>
                    </div>)}
                </p>
            </div>
            <p>
            {course.prereqs && course.prereqs.length > 0 && (
                <>
                    <br />
                    <i>
                        {" "}
                        Prerequisites:{" "}
                        {Array.isArray(course.prereqs) ? course.prereqs.join(", ") : course.prereqs}{" "}
                    </i>
                </>
			)}
            </p>
            <p>
            {course.crosslistings && course.crossListed.length > 0 && (
                <>
                    Cross-listed: {course.crossListed.join(", ")}
                </>
            )}
            </p>

        </div>
        <div className="cart-button">
            <button className={`add-to-cart-btn ${itemInCart ? "in-cart" : "not-in-cart"}`} 
            onClick={onAddToCartClick}>{addToCartText}</button>
        </div>
    </div>
}

export default CourseCard