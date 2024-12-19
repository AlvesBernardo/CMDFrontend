import CustomList from "../../components/CustomList/CustomList.jsx";
import React, {useEffect, useState} from "react";
import CustomHeader from "../../components/CustomHeader/CustomHeader.jsx";
import CustomButton from "../../components/CustomButton/CustomButton.jsx";
import Modal from "../../components/CustomModal/CustomModal.jsx";
import axios from "axios";
//aight, i copied the code from managestudios. Try to change this so it looks like the figma design.
//firgure out how custom list and list item work
//need to maybe create a new scss for this one specifically or change it completely, to make it 
//so that the email is not capitalized (right now thats in the customlisitem scss) and that email and studio
//are centered in their own flex boxes.
function ManageStudios () {

    const [list, setList] = useState([]);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [newStudioName, setNewStudioName] = useState("");
    const [newStudioCapacity, setNewStudioCapacity] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setList(
            [
                { id: 1, name: "John Smith", email: "john.smith@student.nhlstenden.com", studio: "IT" },
                { id: 2, name: "Walter White", email: "walter.white@student.nhlstenden.com", studio: "Business" },
                { id: 3, name: "Hank Green", email: "hank.green@student.nhlstenden.com", studio: "Economics" },
                { id: 4, name: "Bobbie Black", email: "bobbie.black@student.nhlstenden.com", studio: "Law" },
                { id: 5, name: "Dave von Hamburg", email: "dave.von.hamburg@student.nhlstenden.com", studio: "Computer Science" },
                { id: 6, name: "John Smith", email: "john.smith@student.nhlstenden.com", studio: "IT" } ,
                { id: 7, name: "Walter White", email: "walter.white@student.nhlstenden.com", studio: "Business" },
                { id: 8, name: "Hank Green", email: "hank.green@student.nhlstenden.com", studio: "Economics" },
                { id: 9, name: "Bobbie Black", email: "bobbie.black@student.nhlstenden.com", studio: "Law" },
                { id: 10, name: "Dave von Hamburg", email: "dave.von.hamburg@student.nhlstenden.com", studio: "Computer Science" },
                { id: 11, name: "John Smith", email: "john.smith@student.nhlstenden.com", studio: "IT" } ,
                { id: 12, name: "Walter White", email: "walter.white@student.nhlstenden.com", studio: "Business" },
                { id: 13, name: "Hank Green", email: "hank.green@student.nhlstenden.com", studio: "Economics" },
                { id: 14, name: "Bobbie Black", email: "bobbie.black@student.nhlstenden.com", studio: "Law" },
                { id: 15, name: "Dave von Hamburg", email: "dave.von.hamburg@student.nhlstenden.com", studio: "Computer Science" }
            ]
        )
        // fetchStudios();
    }, []);

    const fetchStudios = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/studios");
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
        // try {
        //     await axios.delete(`/api/studios/${id}`);
        //     setList(prevList => prevList.filter(item => item.id !== id));
        //     setError("");
        // } catch (err) {
        //     console.error("Error removing studio:", err);
        //     setError("Failed to remove the studio. Please try again.");
        // }
    };

    const handleEdit = async (id, updatedData) => {
        console.log(id)
        console.log(updatedData)
        // try {
        //     const response = await axios.put(`/api/studios/${id}`, updatedData);
        //     setList(prevList => prevList.map(item => item.id === id ? response.data : item));
        //     setError("");
        // } catch (err) {
        //     console.error("Error editing studio:", err);
        //     setError("Failed to edit the studio. Please try again.");
        // }
    };

    const handleOpenAddModal = () => setIsAddModalOpen(true);

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setNewStudioName("");
        setNewStudioCapacity("");
    };

    const handleConfirmAdd = async () => {
        console.log(newStudioName)

        // if (newStudioName.trim() === "" || newStudioCapacity.trim() === "") {
        //     alert("Please fill in all fields.");
        //     return;
        // }
        // try {
        //     const newStudio = {
        //         name: newStudioName,
        //         capacity: newStudioCapacity
        //     };
        //     const response = await axios.post("/api/studios", newStudio);
        //     setList(prevList => [...prevList, response.data]);
        //     setError("");
        //     handleCloseAddModal();
        // } catch (err) {
        //     console.error("Error adding studio:", err);
        //     setError("Failed to add the studio. Please try again.");
        // }
    };

    return (
        <div className="manageStudiosContainer p-6">
            <CustomHeader
                profilePicture="nhlLogo.png"
                name="Mehdi Sadeghi"
                email="mehdi.sadeghi@student.nhlstenden.com"
            />
            {/* <div className="manageStudiosButtonContainer my-4">
                <CustomButton
                    color="primary"
                    text="Add new studio"
                    width="200px"
                    onClick={handleOpenAddModal}
                />
            </div> */} 
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
