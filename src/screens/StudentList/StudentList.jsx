import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import CustomList from "../../components/CustomList/CustomList.jsx";

function StudentList() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/students`);
            setStudents(response.data);
            setError("");
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Failed to fetch students. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (student_id) => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/students/${student_id}`);
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== student_id));
            setError("");
        } catch (err) {
            console.error("Error removing student:", err);
            setError("Failed to remove the student. Please try again.");
        }
    };

    const handleEdit = async (student_id, updatedData) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/students/${student_id}`, updatedData);
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === student_id ? { ...student, ...updatedData } : student
                )
            );
            setError("");
        } catch (err) {
            console.error("Error editing student:", err);
            setError("Failed to edit the student. Please try again.");
        }
    };

    return (
        <div className="manageStudiosContainer p-6">
            <CustomHeader
                profilePicture="nhlLogo.png"
                name="Mehdi Sadeghi"
                email="mehdi.sadeghi@student.nhlstenden.com"
            />
            {loading ? (
                <p>Loading studios...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <CustomList
                    list={students}
                    hasRemoveButton={true}
                    hasEditButton={false}
                    onRemove={handleRemove}
                    onEdit={handleEdit}
                />
            )}
        </div>
    );


}

export default StudentList;
