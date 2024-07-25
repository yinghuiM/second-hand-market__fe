import ProductList from "./ProductList";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { background } from "../../assets/img";

const MainContent = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box component={"main"} bgcolor={"home.main"} pt={2} pb={5}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        gap={2}
        height={isSmallScreen ? "12vh" : "60vh"}
      >
        <img
          src={background}
          alt="background"
          style={{
            objectFit: "contain",
          }}
        />
        <Stack
          gap={isSmallScreen ? 1 : 3}
          paddingX={isSmallScreen ? 1 : 3}
          marginTop={2}
          alignItems={"center"}
        >
          <Typography
            component={"h3"}
            sx={{
              fontFamily: theme.typography.fonts.title,
              fontSize: isSmallScreen ? "1rem" : "4rem",
            }}
          >
            最高の取引を実現しましょう
          </Typography>

          <Typography
            component={"h5"}
            sx={{
              fontFamily: theme.typography.fonts.body,
              fontSize: isSmallScreen ? "0.4rem" : "1rem",
              marginTop: "1rem",
            }}
          >
            中古品の売買を簡単に、安全に。あなたの使わなくなった品物を、新しい持ち主に届けましょう。環境に優しく、財布にも優しい、二手取引プラットフォーム。
          </Typography>
        </Stack>
      </Stack>
      <ProductList />
    </Box>
  );
};

export default MainContent;
