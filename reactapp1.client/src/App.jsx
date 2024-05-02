import { useEffect, useState } from 'react';
import './App.css';

function Profile() {
    return (
        <img
            src="https://th.bing.com/th/id/R.b8b237b649495e4f40809e688f3d42d8?rik=tI0%2bbvO1PUVHpg&riu=http%3a%2f%2fpixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com%2fimage%2fba79ccaf05eaf17.png&ehk=Am57ejsedPsZBAjirb1YceWmxJjnatK%2bIQNJQGRmd6I%3d&risl=&pid=ImgRaw&r=0"
            width="100"
            height="100"
            alt="cat"
        />
    );
}

function ProfileLine() {
    return (
        <section>
            <h1>Hello Kitty</h1>
            <section>
                <Profile />
            </section>
            <section>
                <Profile />
            </section>
            <section>
                <Profile />
            </section>
        </section>
    );
}

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
            <ProfileLine/>
            <h1 id="tabelLabel">Student student</h1>
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