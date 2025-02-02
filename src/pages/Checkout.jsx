import { useCourseContext } from "../context/CourseContext";
import "../css/Checkout.css"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import { useNavigate } from "react-router-dom";

function Checkout (){
    const {cart, setCart} = useCourseContext();
    const {savedSchedule, setSavedSchedule} = useCourseContext();
    const navigate = useNavigate();

    const handleDragDrop = (results) => {
        const {source, destination, type} = results;

        if(!destination) return;

        if(source.droppableId === destination.droppableId 
            && source.index === destination.index) return;

        if(type === 'group'){
            const reorderedCart = [...cart];
            
            const sourceIndex = source.index;
            const destinationIndex = destination.index
            const [removedItem] = reorderedCart.splice(sourceIndex, 1)
            reorderedCart.splice(destinationIndex, 0, removedItem)

            return setCart(reorderedCart)
        }

    }

    const onSaveClick = () => {
        setSavedSchedule([...savedSchedule, cart])
    }

    return <div className = "checkout-courses">
        <div className="checkout-header">
            <h2 className="checkout-title">Rank your courses</h2>
            <button className="saved-schedule" onClick={() => navigate('/savedRanking')}>See Saved Rankings</button>
        </div>
        <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} key="ROOT">
                    {cart.map ((course, index) => (
                        <Draggable draggableId={course.number.toString()} key={course.number} index={index}>
                            {(provided) =>(
                                <div className="course-container" 
                                {...provided.dragHandleProps} 
                                {...provided.draggableProps} 
                                ref={provided.innerRef}> 
                                    <h3>{index+1}. {course.dept} {course.number}: {course.title}</h3>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
        </DragDropContext>
        <div className="save">
            <button className="save-btn" onClick={onSaveClick}>save</button>
        </div>
    </div>
}

export default Checkout

