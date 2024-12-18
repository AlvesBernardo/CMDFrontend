import CustomListItem from "../CustomListItem/CustomListItem.jsx";

const CustomList = ({ list = [], hasEditButton, hasRemoveButton, onRemove, onEdit }) => {
    return (
        <div className="customListContainer space-y-4">
            {list.map((item) => (
                <CustomListItem
                    key={item.id}
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
