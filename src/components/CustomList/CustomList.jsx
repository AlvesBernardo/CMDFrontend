import React from "react";
import CustomListItem from "../CustomListItem/CustomListItem.jsx";

const CustomList = ({ list = [], hasEditButton, hasRemoveButton, onRemove, onEdit }) => {
    if (!list.length) {
        return <p>No items to display</p>;
    }

    const hiddenKeys = ["id", "dtPassword", "dtCreatedAt", "fiType", "idUser", "idStudio"];

    const columns = Object.keys(list[0]).filter(
        (key) => !hiddenKeys.includes(key)
    );

    return (
        <div className="customListContainer">
            <div className="customListHeaderContainer">
                <div className="headerDataContainer">
                    {columns.map((column) => (
                        <p key={column} className="headerItem">
                            {column.charAt(0).toUpperCase() + column.slice(1)}
                        </p>
                    ))}
                </div>
                <div className="headerButtonContainer">
                    {hasEditButton && <p className="headerButtonPlaceholder">Edit</p>}
                    {hasRemoveButton && <p className="headerButtonPlaceholder">Remove</p>}
                </div>
            </div>

            {list.map((item) => (
                <CustomListItem
                    key={item.idStudio}
                    item={item}
                    hasEditButton={hasEditButton}
                    hasRemoveButton={hasRemoveButton}
                    onRemove={onRemove}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default CustomList;
