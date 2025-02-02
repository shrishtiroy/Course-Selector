import courses from "../data/courses.json"
import CourseCard from "../components/CourseCard"
import React, { useState, useEffect } from "react"
import { useCourseContext } from "../context/CourseContext";
import "../css/Courses.css"
import makeSticky from "../components/MakeSticky";


const Courses = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null)
	const [searchQuery, setSearchQuery] = useState("");
	const [displayContext, setDisplayContext] = useState("All Courses");
	const {cart} = useCourseContext();
	
	const isSticky = makeSticky();

	const checkProxy = async () => {
		try {
		  const response = await fetch('/api/base/2022A/courses/CIS-160/');
		  const text = await response.text(); 
		  console.log('Raw response:', text);
		  
		  if (text.startsWith('{') || text.startsWith('[')) {
			const json = JSON.parse(text);
			console.log('Parsed JSON:', json);
		  }
		} catch (error) {
		  console.error('Proxy check error:', error);
		}
	  };

	checkProxy();

	const fetchCourseData = async () => {
		try{
			var response = await fetch('/api/base/2022A/courses/CIS-160/')
				.then(response => response.json())
				.then(data => console.log(data))

		}catch(error){
			console.error("error catching course data", error)
			return null;
		}
	}

	useEffect(() => {
		const fetchData = async () => {
		  setLoading(true);
		  setError(null);
		  try {
			const data = await fetchCourseData();
			if (data) {
			  console.log("Successfully fetched data:", data);
			} else {
			  setError("Course data not found");
			}
		  } catch (error) {
			setError(`Failed to fetch course data: ${error.message}`);
		  } finally {
			setLoading(false);
		  }
		};
	  
		fetchData();
	  }, []);

	const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return

        setLoading(true)
        try{
            setDisplayContext("Searching for: " + searchQuery + "course");
            setError(null)
        }catch(err){
            console.log(err)
            setError("Failed to search course...")
        }finally{
            setLoading(false)
        }

        setSearchQuery("")
    };

	
	return (
		
		<div className="course-homepage">
			<div className="course-titlepage">
				<h2>Welcome to Penn Course Cart, your home for course selection!</h2>
				<h3 className="course-limit"> Add up to 7 courses to your cart</h3>
			</div>
			<form onSubmit={handleSearch} className = "search-form">
            <input 
                type = "text" 
                placeholder="search for courses..." 
                className="search-input"
                value = {searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}/>
                <button type ="submit" className="search-button">Search</button>
        	</form>

			
			<h3 className={`course-count ${isSticky ? 'sticky' : ''}`}>Courses in Cart: {cart.length}</h3>
			
			<div className="courses-grid">
			{courses.map(
				(course) => (
					((course.number.toString().startsWith(searchQuery)) || (searchQuery.includes(course.number.toString())) || (course.title.toLowerCase().includes(searchQuery))
					|| (course.dept.toLowerCase().includes(searchQuery))|| 
					(course.description.toLowerCase().startsWith(searchQuery))) &&
					<CourseCard course={course} key = {course.number}></CourseCard>
				)
			)}
			</div>
		</div>
	)
}

export default Courses
