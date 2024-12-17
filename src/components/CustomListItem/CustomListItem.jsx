import React, { useState } from "react";
import CustomButton from "../CustomButton/CustomButton.jsx";
import Modal from "../CustomModal/CustomModal.jsx";

const CustomListItem = ({ item, hasEditButton, hasRemoveButton, onRemove, onEdit }) => {

    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editedData, setEditedData] = useState({ ...item });

    const handleOpenRemoveModal = () => setIsRemoveModalOpen(true);
    const handleCloseRemoveModal = () => setIsRemoveModalOpen(false);
    const handleConfirmRemove = () => {
        onRemove(item.id);
        handleCloseRemoveModal();
    };

    const handleOpenEditModal = () => setIsEditModalOpen(true);
    const handleCloseEditModal = () => {
        setEditedData({ ...item });
        setIsEditModalOpen(false);
    };
    const handleConfirmEdit = () => {
        for (let key in editedData) {
            if (editedData[key].toString().trim() === "") {
                alert("Please fill in all fields.");
                return;
            }
        }
        onEdit(item.id, editedData);
        handleCloseEditModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="customListItemContainer flex items-center justify-between p-4 bg-white rounded-lg shadow">
            <div className="dataContainer flex-1">
                {Object.entries(item).map(([key, value]) => {
                    if (key === "id") return null;
                    return (
                        <p key={key} className="dataItem">
                            <span className="font-semibold capitalize">{value}</span>
                        </p>
                    );
                })}
            </div>
            <div className="customListItemButtonContainer flex space-x-2">
                {hasEditButton && (
                    <CustomButton
                        color="warning"
                        text="Edit"
                        onClick={handleOpenEditModal}
                    />
                )}
                {hasRemoveButton && (
                    <CustomButton
                        color="error"
                        text="Remove"
                        onClick={handleOpenRemoveModal}
                    />
                )}
            </div>

            <Modal
                isOpen={isRemoveModalOpen}
                onClose={handleCloseRemoveModal}
                onConfirm={handleConfirmRemove}
                title="Confirm Deletion"
                message="Are you sure you want to delete this studio?"
            />

            <Modal
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onConfirm={handleConfirmEdit}
                title="Edit Studio"
            >
                <form className="space-y-4">
                    {Object.entries(editedData).map(([key, value]) => {
                        if (key === "id") return null;
                        return (
                            <div key={key}>
                                <label htmlFor={`${key}-${item.id}`} className="block text-sm font-medium text-gray-700 capitalize">
                                    {key}
                                </label>
                                <input
                                    type="text"
                                    id={`${key}-${item.id}`}
                                    name={key}
                                    value={editedData[key]}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                                    required
                                />
                            </div>
                        );
                    })}
                </form>
            </Modal>
        </div>
    );
};

export default CustomListItem;
