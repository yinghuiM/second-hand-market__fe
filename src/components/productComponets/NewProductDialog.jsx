import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { createProduct } from "../../api";
const NewProductDialog = ({ open, handleClose, refreshList, setAlert }) => {
  const [product, setProduct] = useState({
    name: "",
    uniqueCode: "",
    info: "",
    price: 0,
  });

  const [validateErrors, setValidateErrors] = useState({
    name: "",
    uniqueCode: "",
    info: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setValidateErrors({
      ...validateErrors,
      [name]: "",
    });
  };

  const validateInput = () => {
    let errors = {};
    errors.name = product.name ? "" : "商品名を入力してください";
    errors.uniqueCode = product.uniqueCode
      ? ""
      : "商品コードを入力してください";
    errors.info = product.info ? "" : "商品情報を入力してください";
    errors.price = product.price ? "" : "価格を入力してください";
    setValidateErrors(errors);
    return Object.values(errors).every((x) => x === "");
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setValidateErrors({
      ...validateErrors,
      [name]: "",
    });
  };
  const handleSubmit = async () => {
    const data = {
      product_name: product.name,
      price: product.price,
      product_info: product.info,
      unique_code: product.uniqueCode,
    };
    if (!validateInput()) return;
    try {
      const res = await createProduct(data);
      if (res.status === 200) {
        refreshList(true);
        handleClose();
        setAlert((prev) => ({
          ...prev,
          open: true,
          type: "success",
          message: "商品を追加しました",
        }));
      } else {
        setAlert((prev) => ({
          ...prev,
          open: true,
          type: "error",
          message: res.data.detail,
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setProduct({
        name: "",
        uniqueCode: "",
        info: "",
        price: 0,
      });
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>新しいアイテムを追加する</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="商品名"
            type="text"
            fullWidth
            variant="outlined"
            value={product.name}
            onChange={handleChange}
            onFocus={handleFocus}
            error={!!validateErrors.name}
            helperText={validateErrors.name}
          />
          <TextField
            margin="dense"
            name="uniqueCode"
            label="商品ユニークコード"
            type="text"
            fullWidth
            variant="outlined"
            value={product.uniqueCode}
            onChange={handleChange}
            onFocus={handleFocus}
            error={!!validateErrors.uniqueCode}
            helperText={validateErrors.uniqueCode}
          />
          <TextField
            margin="dense"
            name="info"
            label="商品情報"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={product.info}
            onChange={handleChange}
            onFocus={handleFocus}
            error={!!validateErrors.info}
            helperText={validateErrors.info}
          />
          <TextField
            margin="dense"
            name="price"
            label="商品の価格"
            fullWidth
            variant="outlined"
            value={product.price}
            onChange={handleChange}
            onFocus={handleFocus}
            error={!!validateErrors.price}
            helperText={validateErrors.price}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit}>追加</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

NewProductDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  refreshList: PropTypes.func,
  setAlert: PropTypes.func,
};
export default NewProductDialog;
