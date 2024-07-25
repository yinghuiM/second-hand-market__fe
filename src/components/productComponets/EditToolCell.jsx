import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import { updateProduct } from "../../api";
const EditToolCell = ({ row, table, originalData, refreshList, setAlert }) => {
  const meta = table.options.meta;
  const handleSetEditedRows = (e, name) => {
    const elName = e.currentTarget?.name || name;
    meta?.setEditedRows((old) => ({
      ...old,
      [row.id]: !old[row.id],
    }));
    if (elName !== "edit") {
      meta?.revertData(row.index, elName === "cancel");
    }
  };

  const handleUpdateRow = async (e, name) => {
    const id = row.original.id;
    const originalRow = originalData[row.index];
    const currentRow = row.original;

    const updatedFields = Object.keys(currentRow).reduce((changes, key) => {
      if (currentRow[key] !== originalRow[key]) {
        changes[key] = currentRow[key];
      }
      return changes;
    }, {});

    if (Object.keys(updatedFields).length !== 0) {
      const res = await updateProduct(id, {
        ...updatedFields,
      });
      if (res.status === 200) {
        refreshList(true);
        setAlert((prev) => ({
          ...prev,
          open: true,
          message: "商品情報を更新しました",
          type: "success",
        }));
      }
    }

    handleSetEditedRows(e, name);
  };

  return meta.editedRows[row.id] ? (
    <>
      <Button name="cancel" onClick={handleSetEditedRows}>
        <ClearIcon />
      </Button>
      <Button name="done" onClick={(e) => handleUpdateRow(e, "done")}>
        <CheckIcon />
      </Button>
    </>
  ) : (
    <Button name="edit" onClick={handleSetEditedRows}>
      <EditIcon />
    </Button>
  );
};

EditToolCell.propTypes = {
  row: PropTypes.object,
  table: PropTypes.object,
  originalData: PropTypes.array,
  refreshList: PropTypes.func,
  setAlert: PropTypes.func,
};
export default EditToolCell;
