import { useTheme } from "@emotion/react";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { logo } from "../assets/icons";
import { loginBg } from "../assets/img";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login, verifyToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPwd = () => setShowPassword(!showPassword);
  const [error, setError] = useState({
    msg: "",
    hasError: false,
    type: "",
  });

  const navigate = useNavigate();
  const handleLogin = async () => {
    const res = await login(username, password);
    switch (res.status) {
      case 404:
        setError({
          msg: res.data.detail,
          hasError: true,
          type: "username",
        });
        break;
      case 401:
        setError({
          msg: res.data.detail,
          hasError: true,
          type: "password",
        });
        break;
      case 200:
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", username);
        navigate("/products");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const verify = async () => {
        const res = await verifyToken(token);
        if (res.status === 200 && res.data.valid) {
          navigate("/products");
        }
      };
      verify();
    }
  }, [navigate]);

  return (
    <Stack
      component={"main"}
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        minHeight: "100dvh",
        width: "100%",
        background: "linear-gradient(45deg, #4571A5, #89CFF0)",
      }}
    >
      <Stack
        sx={{ flex: 1.3, paddingX: 5, paddingY: 10 }}
        alignItems={"center"}
        gap={2}
      >
        <img
          src={loginBg}
          alt="login"
          style={{
            width: "80%",
            height: "auto",
            objectFit: "contain",
          }}
        />
        <Stack component={"div"} width={"50%"} alignItems={"center"} gap={2}>
          <Typography
            sx={{
              fontFamily: theme.typography.fonts.title,
              color: "white",
              fontSize: "24px",
            }}
          >
            中古取引市場
          </Typography>
          <Typography
            sx={{
              fontFamily: theme.typography.fonts.body,
              color: "white",
              fontSize: "12px",
            }}
          >
            安心して中古品を売買できる便利なオンラインマーケットです。多様な商品を手軽に見つけて取引ができます。
          </Typography>
        </Stack>
      </Stack>

      <Stack
        sx={{
          flex: 1,
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack gap={2}>
          <Stack
            direction={"row"}
            gap={2}
            alignItems={"center"}
            marginBottom={2}
          >
            <img src={logo} alt="logo" width={50} />
            <Typography
              sx={{
                fontFamily: theme.typography.fonts.title,
                fontSize: "24px",
                color: "#4773A7",
              }}
            >
              SECOND HAND MARKET
            </Typography>
          </Stack>
          <Typography
            sx={{ fontFamily: theme.typography.fonts.body, color: "#959393" }}
          >
            ユーザー名
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setError({ ...error, hasError: false })}
            error={error.hasError && error.type === "username"}
          />
          <Typography sx={{ color: "red", fontSize: "14px" }}>
            {error.hasError && error.type === "username" && error.msg}
          </Typography>
          <Typography
            sx={{ fontFamily: theme.typography.fonts.body, color: "#959393" }}
          >
            パスワード
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setError({ ...error, hasError: false })}
            error={error.hasError && error.type === "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPwd}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Typography sx={{ color: "red", fontSize: "14px" }}>
            {error.hasError && error.type === "password" && error.msg}
          </Typography>
          <Button
            variant="contained"
            sx={{ color: "white", marginTop: 5 }}
            onClick={handleLogin}
          >
            ログイン
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Login;
