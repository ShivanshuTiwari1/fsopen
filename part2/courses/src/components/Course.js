import react from "react";

const Header = ({ course }) => {
    return <h2>{course.name}</h2>;
};

const Total = ({ course }) => {
    const sum = course.parts.reduce((accumulator, element) => accumulator+element.exercises, 0);
    return <p><strong>total of {sum} exercises</strong></p>;
};

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(el => <Part key={el.id} part={el}/>)}
        </div>
    );
};

const Course = ({ course }) => {
    return (<div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
    </div>)
}

export default Course;