import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../api";
import { user } from "../assets/icons";
import NewProductDialog from "../components/productComponets/NewProductDialog";
import ProductTable from "../components/productComponets/ProductTable";
import SearchIcon from "@mui/icons-material/Search";

const Products = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    open: false,
    type: "warning",
    loading: false,
    message: "",
    name: "",
  });

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      const res = await verifyToken(token);
      if (res.status !== 200 && !res.data.valid) {
        setAlert((prev) => ({
          ...prev,
          open: true,
          loading: true,
          message:
            "現在のログイン情報の有効期限が切れていますので、再度ログインしてください",
          name: "login",
        }));
      }
    };
    verify();
  }, []);

  const handleAlertClose = () => {
    setAlert({
      open: false,
      loading: false,
      message: "",
      name: "",
      type: "",
    });
    if (alert.name === "login") navigate("/login");
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const [refresh, setRefresh] = useState(false);

  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(false);

  return (
    <Box
      component={"main"}
      sx={{
        height: "100dvh",
        width: "100%",
        bgcolor: "home.main",
      }}
    >
      <Backdrop open={alert.open && alert.loading} style={{ zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        padding={2}
        sx={{
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          borderBottom: `1px solid #ccc`,
          height: "5vh",
          bgcolor: "white",
        }}
      >
        <Typography sx={{ fontFamily: theme.typography.fonts.title }}>
          商品一覧 | 中古品の通販、買取、質屋
        </Typography>

        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={2}
          sx={{ fontFamily: theme.typography.fonts.body }}
        >
          <Avatar alt="user" src={user} sx={{ width: 32, height: 32 }} />
          <Typography>{localStorage.getItem("user")}</Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{
          gap: 1,
          paddingX: 10,
          paddingTop: 10,
          flex: 1,
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            sx={{ fontFamily: theme.typography.fonts.body, width: "180px" }}
            variant="contained"
            onClick={handleDialogOpen}
          >
            <AddIcon />
            商品を追加する
          </Button>

          <Stack direction={"row"} gap={2}>
            <TextField
              placeholder="商品名/ユニークコード"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{
                bgcolor: "white",
                borderRadius: "5px",
                fontFamily: theme.typography.fonts.body,
                fontSize: "16px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setSearch(true)}
                      edge="end"
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                sx: {
                  fontSize: "14px",
                },
              }}
            />
            <Button variant="outlined" onClick={() => setQuery("")}>
              リセット
            </Button>
          </Stack>
        </Stack>
        <ProductTable
          refresh={refresh}
          refreshList={setRefresh}
          setAlert={setAlert}
          query={query}
          search={search}
          setSearch={setSearch}
          setQuery={setQuery}
        />
      </Stack>

      <NewProductDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        refreshList={setRefresh}
        setAlert={setAlert}
      />
      <Snackbar
        open={alert.open}
        onClose={handleAlertClose}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          open={alert.open}
          severity={alert.type}
          variant="filled"
          sx={{ width: "100%" }}
          onClose={handleAlertClose}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products;
