import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [students, setStudents] = useState();

    useEffect(() => {
        populateStudentData();
    }, []);

    const contents = students === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>DBN</th>
                    <th>Date</th>
                    <th>Enrolled</th>
                    <th>Absent</th>
                    <th>Present</th>
                    <th>Released</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student =>
                    <tr key={student.id}>
                        <td>{student.dbn}</td>
                        <td>{student.date}</td>
                        <td>{student.enrolled}</td>
                        <td>{student.absent}</td>
                        <td>{student.present}</td>
                        <td>{student.released}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tabelLabel">Students</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateStudentData() {
        const response = await fetch('student');
        const data = await response.json();
        setStudents(data);
    }
}

export default App;