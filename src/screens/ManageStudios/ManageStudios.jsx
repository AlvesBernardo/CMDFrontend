import CustomList from "../../components/CustomList/CustomList.jsx";
import React, {useEffect, useState} from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import Modal from "../../components/CustomModal/CustomModal.jsx";
import axios from "axios";

function ManageStudios () {

    const [list, setList] = useState([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newStudioName, setNewStudioName] = useState("");
    const [newStudioCapacity, setNewStudioCapacity] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchStudios();
    }, []);

    const fetchStudios = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/${process.env.REACT_APP_API_URL}/studios");
            setList(response.data);
            setError("");
        } catch (err) {
            console.error("Error fetching studios:", err);
            setError("Failed to fetch studios. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        console.log(id)
            try {
                await axios.delete(`/${process.env.REACT_APP_API_URL}/studios/${studio_id}`);
                setList(prevList => prevList.filter(item => item.id !== id));
                setError("");
            }  catch (err) {
             console.error("Error removing studio:", err);
            setError("Failed to remove the studio. Please try again.");
            }
    };

    const handleEdit = async (id, updatedData) => {
        console.log(id)
        console.log(updatedData)
            try {
             const response = await axios.put(`/${process.env.REACT_APP_API_URL}/studios/${studio_id}`, updatedData);
             setList(prevList => prevList.map(item => item.id === id ? response.data : item));
             setError("");
        } catch (err) {
             console.error("Error editing studio:", err);
             setError("Failed to edit the studio. Please try again.");
        }
    };

    const handleOpenAddModal = () => setIsAddModalOpen(true);

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setNewStudioName("");
        setNewStudioCapacity("");
    };

    const handleConfirmAdd = async () => {
        console.log(newStudioName)

         if (newStudioName.trim() === "" || newStudioCapacity.trim() === "") {
             alert("Please fill in all fields.");
             return;
         }
         try {
             const newStudio = {
                 name: newStudioName,
                 capacity: newStudioCapacity
             };
             const response = await axios.post("/${process.env.REACT_APP_API_URL}/studios/", newStudio);
             setList(prevList => [...prevList, response.data]);
             setError("");
             handleCloseAddModal();
         } catch (err) {
             console.error("Error adding studio:", err);
             setError("Failed to add the studio. Please try again.");
            }
    };

    return (
        <div className="manageStudiosContainer p-6">
            <CustomHeader
                profilePicture="nhlLogo.png"
                name="Mehdi Sadeghi"
                email="mehdi.sadeghi@student.nhlstenden.com"
            />
            <div className="manageStudiosButtonContainer my-4">
                <CustomButton
                    color="primary"
                    text="Add new studio"
                    width="200px"
                    onClick={handleOpenAddModal}
                />
            </div>
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

export default ManageStudios
