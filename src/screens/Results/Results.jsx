import React, { useEffect, useState } from "react";
import CustomList from "../../components/CustomList/CustomList.jsx";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import Modal from "../../components/CustomModal/CustomModal.jsx";
import axios from "axios";
import "../../css/screens/_results.scss";


function ManageStudios() {
    const [list, setList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState("2023-2024 Semester one");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStudioName, setNewStudioName] = useState("");
    const [newStudioCapacity, setNewStudioCapacity] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudiosFromJSON = async () => {
            setLoading(true);
            try {
                const response = await fetch("/admin_student_results.json");
                if (!response.ok) {
                    throw new Error("Failed to load JSON file");
                }
                const data = await response.json();
                setList(data);

                const initialFilteredList = data.filter(
                    (item) => item.semester === selectedSemester
                );
                setFilteredList(initialFilteredList);

                setError("");
            } catch (err) {
                console.error("Error fetching studios:", err);
                setError("Failed to load student results. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudiosFromJSON();
    }, []);

    const handleSemesterChange = (event) => {
        const semester = event.target.value;
        setSelectedSemester(semester);

        const updatedList = list.filter(item => item.semester === semester);
        setFilteredList(updatedList);
    };

    const handleRemove = async (id) => {
        console.log(id);
    };

    const handleEdit = async (id, updatedData) => {
        console.log(id, updatedData);
    };

    const handleOpenAddModal = () => setIsAddModalOpen(true);

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setNewStudioName("");
        setNewStudioCapacity("");
    };

    const handleConfirmAdd = async () => {
        console.log(newStudioName);
    };

    return (
        <div className="manageStudiosContainer p-6">
            <CustomHeader
                profilePicture="nhlLogo.png"
                name="Mehdi Sadeghi"
                email="mehdi.sadeghi@student.nhlstenden.com"
            />

            <div className="dropdown-container">
                <select
                    id="semester-select"
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                    className="dropdown-select"
                >
                    <option value="2023-2024 Semester one">2023-2024 Semester one</option>
                    <option value="2023-2024 Semester two">2023-2024 Semester two</option>
                    <option value="2024-2025 Semester one">2024-2025 Semester one</option>
                </select>
            </div>

            {loading ? (
                <p>Loading studios...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <CustomList
                    list={filteredList}
                    hasRemoveButton={true}
                    hasEditButton={true}
                    onRemove={handleRemove}
                    onEdit={handleEdit}
                />
            )}
            <Modal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onConfirm={handleConfirmAdd}
                title="Add New Studio"
            >
                <form className="space-y-4">
                    <div>
                        <label htmlFor="new-studio-name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="new-studio-name"
                            value={newStudioName}
                            onChange={(e) => setNewStudioName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="new-studio-capacity" className="block text-sm font-medium text-gray-700">
                            Capacity
                        </label>
                        <input
                            type="text"
                            id="new-studio-capacity"
                            value={newStudioCapacity}
                            onChange={(e) => setNewStudioCapacity(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default ManageStudios;
