import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import { FaPlus, FaMinus } from "react-icons/fa";

function Student({ student }) {
  const [fullGradeShow, setFullGradeShow] = useState(false);

  const [addedTag, setAddedTag] = useState([]);
  const [inputTag, setInputTag] = useState("");

  function toggleStudent() {
    setFullGradeShow(!fullGradeShow);
  }

  const handleKeydown = (event) => {
    if (event.keyCode === 13){
      setAddedTag([...addedTag, inputTag])
      event.target.value = " "
    }
  }

  return (
    <div className="home">
      <img src={student.pic} alt="student pic" />
      <div className="home__student">
        <h1>
          {student.firstName} {student.lastName}
        </h1>
        <ul>
          <li>Email: {student.email}</li>
          <li>Company: {student.company}</li>
          <li>Skill: {student.skill}</li>
          <li>
            Average: {eval(student.grades.join("+")) / student.grades.length}%
          </li>
          {addedTag.map((tag ) => {
            return <li  className="tag--list" style={{color:"black"}}><p>{tag}</p></li>;
          })}

          <input
            type="text"
            placeholder="Add a tag"
            className="add--tag"
            onChange={(e) => setInputTag(e.target.value)}
            onKeyDown={handleKeydown}
          />
          
          {fullGradeShow && (
            <li style={{ marginTop: "10px" }}>
              {student.grades.map((grade, i) => {
                return (
                  <li key="grades"
                    style={{
                      display: "flex",
                      textAlign: "center",
                      alignItems: "center",
                      margin: "0px",
                    }}
                  >
                    <p
                      style={{
                        marginRight: "20px",
                        marginTop: "0px",
                        marginBottom: "0px",
                      }}
                    >
                      Test {i + 1}:
                    </p>{" "}
                    {grade}%
                  </li>
                );
              })}
            </li>
          )}
        </ul>
      </div>
      <button className={`home__btn`} onClick={toggleStudent}>
        {fullGradeShow ? (
          <FaMinus className="home__btn--minus collapsed" />
        ) : (
          <FaPlus className="home__btn--plus collapsed" />
        )}
      </button>
    </div>
  );
}
function Home() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.hatchways.io/assessment/students"
      );
      setStudents(result.data.students);
    };

    fetchData();
  }, []);

  const filteredStudents = students.filter((student) => {
    const found = JSON.stringify(student)
      .toLowerCase()
      .indexOf(filter.toLowerCase());
    return found !== -1;
  });

  return (
    <>
      <input
        className="search--name"
        placeholder="Search by name"
        type="text"
        onChange={(e) => setFilter(e.target.value)}
      />
      {filteredStudents.map((student, id) => (
        <Student student={student} />
      ))}
    </>
  );
}

export default Home;
