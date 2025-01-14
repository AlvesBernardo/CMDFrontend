import CustomListItem from "../CustomListItem/CustomListItem.jsx";

const CustomList = ({ list = [], hasEditButton, hasRemoveButton, onRemove, onEdit, onToggleOpenClose }) => {
    return (
        <div className="customListContainer space-y-4">
            {list.map((item) => (
                <CustomListItem
                    key={item.idStudio}
                    item={item}
                    hasEditButton={hasEditButton}
                    hasRemoveButton={hasRemoveButton}
                    onRemove={onRemove}
                    onEdit={onEdit}
                    onToggleOpenClose={onToggleOpenClose}
                />
            ))}
        </div>
    );
};

export default CustomList;
