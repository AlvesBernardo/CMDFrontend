import React, { useEffect, useState } from "react";
import CustomList from "../../components/CustomList/CustomList.jsx";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import Modal from "../../components/CustomModal/CustomModal.jsx";
import axios from "axios";
//aight, i copied the code from managestudios. Try to change this so it looks like the figma design.
//firgure out how custom list and list item work
//need to maybe create a new scss for this one specifically or change it completely, to make it 
//so that the email is not capitalized (right now thats in the customlisitem scss) and that email and studio
//are centered in their own flex boxes.


function ManageStudios() {
    const [list, setList] = useState([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newStudioName, setNewStudioName] = useState("");
    const [newStudioCapacity, setNewStudioCapacity] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudiosFromJSON = async () => {
            setLoading(true);
            try {
                const response = await fetch("/student_results.json");
                if (!response.ok) {
                    throw new Error("Failed to load JSON file");
                }
                const data = await response.json();
                setList(data);
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

    const handleRemove = async (id) => {
        console.log(id);
    };

    const handleEdit = async (id, updatedData) => {
        console.log(id, updatedData);
    };

    // const handleOpenAddModal = () => setIsAddModalOpen(true);

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
            {loading ? (
                <p>Loading studios...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <CustomList
                    list={list}
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
