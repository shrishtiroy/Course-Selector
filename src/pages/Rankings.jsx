import { useCourseContext } from "../context/CourseContext";
import "../css/Rankings.css"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {useState} from "react"

function Rankings(){
    const {savedSchedule} = useCourseContext();
    const [copiedIndex, setCopiedIndex] = useState(null);

    const getSchedule = (courseArr) => {
        let str = "";
        if(courseArr)
        {
            let index = 1;
            courseArr.forEach((course) => {
                str += `${index}) ${course.dept} ${course.number}: ${course.title}\n`;
                index++;
            });
        }
        return str;
    }

    console.log(getSchedule(savedSchedule[0]))
    return (
    <div>
        <div className="rankings-header">
            <h2>Your Rankings</h2>
        </div>
        <div>
        <div className="courses-grid">
            {savedSchedule.map((schedule, scheduleIndex) => (
                <div key={scheduleIndex} className="schedule">
                    <div className="copy-to-clip">
                    <h3>Ranking {scheduleIndex+1}</h3>
                        <CopyToClipboard text={getSchedule(schedule)} onCopy={() => setCopiedIndex(scheduleIndex)}>
                            <button className={`copy ${copiedIndex===scheduleIndex ? "copied" : "not-copied"}`}>{(copiedIndex === scheduleIndex) ? <span>copied ✓</span> : <span>copy</span>}</button>
                        </CopyToClipboard>
                    </div> 
                    {schedule.map((course, courseIndex) => (
                        <div key={courseIndex}>
                            <div className="ranking">
                                <h4>{courseIndex+1}. {course.dept} {course.number}: {course.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Rankings