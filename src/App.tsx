import Nav from "./components/Nav"
import Courses from "./pages/Courses"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Rankings from "./pages/Rankings"
import {Routes, Route} from "react-router-dom"
import { CourseProvider } from "./context/CourseContext"
import "./css/App.css"

function App() {
	return (
		<div className="app-container">
		<CourseProvider>
			<Nav/>
			<main className="main-content">
				<Routes>
					<Route path="/" element={<Courses/>}/>
					<Route path="/cart" element={<Cart/>}/>
					<Route path="/checkout" element={<Checkout/>}/>
					<Route path="/savedRanking" element={<Rankings/>}/>
				</Routes>
			</main>
		</CourseProvider>
		</div>
	)
}

export default App
