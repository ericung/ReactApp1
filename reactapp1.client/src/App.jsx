import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';
import PropTypes from 'prop-types';
import './App.css';

function EditProfile() {
    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [edit, setEdit] = useState(false);

    // Fragment
    // The reason why the Edit button can be placed in a component is because
    // it doesn't have any values that need to be changed.
    function Edit() {
        if (edit)
            return (
                <button type="submit" >
                    Save Profile
                </button>
            )
        else    
            return (
                <button type="submit">
                    Edit Profile
                </button>
            )
    }
    
    // The values in the label for first and last name changes which needs to be
    // rerendered within the main form branch.
    return (
        <form onSubmit={e => { e.preventDefault(); setEdit(!edit); }}>
            <label>
                First name:{' '}
                {
                    (edit) ?
                        (
                            <input value={firstName} onChange={e => setFirstName(e.target.value)} />
                        ) :
                        (
                            <i>{firstName}</i>
                        )
                }
            </label>
            <label>
                Last name:{' '}
                {
                    (edit) ?
                        (
                            <input value={lastName} onChange={e => setLastName(e.target.value)} />
                        ) :
                        (
                            <i>{lastName}</i>
                        )
                }
            </label>
            <Edit />
            <p><i>Hello, {firstName} {lastName} !</i></p>
        </form>
    );
}


function Profile({ name }) {
    return (
        <>
            <h3> {name} <img
                src="https://th.bing.com/th/id/R.b8b237b649495e4f40809e688f3d42d8?rik=tI0%2bbvO1PUVHpg&riu=http%3a%2f%2fpixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com%2fimage%2fba79ccaf05eaf17.png&ehk=Am57ejsedPsZBAjirb1YceWmxJjnatK%2bIQNJQGRmd6I%3d&risl=&pid=ImgRaw&r=0"
                width="60"
                height="60"
                alt="cat"
            /> </h3>
        </>
    );
}
Profile.propTypes = {
    name: PropTypes.string.isRequired
}


// template 
function ProfileLine() {
    return (
        <section>
            <h1>Proptypes</h1>
            <section>
                <Profile name="1"/>
            </section>
            <section>
                <Profile name="2"/>
            </section>
            <section>
                <Profile name="3"/>
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
            <EditProfile />
            <ProfileLine />
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
