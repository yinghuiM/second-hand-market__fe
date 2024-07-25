import PropTypes from "prop-types";
import { useEffect, useState } from "react";
const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const tableMeta = table.options.meta;
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  if (tableMeta?.editedRows[row.id]) {
    return (
      <input
        style={{ padding: "5px" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    );
  }
  return <span>{value}</span>;
};

EditableCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};
export default EditableCell;
