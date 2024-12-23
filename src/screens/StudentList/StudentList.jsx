import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../helpers/AxiosInstance.js";
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
            const response = await api.get(`/api/v1/students`);
            setStudents(response.data);
            setError("");
        } catch (err) {
            console.error("Error fetching students:", err);
            setError("Failed to fetch students. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (user_id) => {
        try {
            await api.delete(`/api/v1/students/${user_id}`);
            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== user_id));
            setError("");
        } catch (err) {
            console.error("Error removing student:", err);
            setError("Failed to remove the student. Please try again.");
        }
    };

    const handleEdit = async (user_id, updatedData) => {
        try {
            await api.put(`/api/v1/students/${user_id}`, updatedData);
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student.id === user_id ? { ...student, ...updatedData } : student
                )
            );
            setError("");
        } catch (err) {
            console.error("Error editing student:", err);
            setError("Failed to edit the student. Please try again.");
        }
    };


    return (
        <div className="manageStudentsContainer p-6">
            <CustomHeader
                profilePicture="nhlLogo.png"
                name="Mehdi Sadeghi"
                email="mehdi.sadeghi@student.nhlstenden.com"
            />
            {loading ? (
                <p>Loading students...</p>
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
