import { useTheme } from "@emotion/react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  canon,
  fuji,
  gucci,
  iphone,
  lvBag,
  macbook,
  switchPlayer,
  watch,
} from "../../assets/img";
import { sale } from "../../assets/icons";
const ProductList = () => {
  const products = [
    {
      name: "スイッチ",
      price: "22,000",
      img: switchPlayer,
      description: "任天堂の人気ゲーム機、さまざまなゲームが楽しめます。",
    },
    {
      name: "FUJIFILM",
      price: "16,000",
      img: fuji,
      description: "高画質のカメラで、素晴らしい写真を撮影できます。",
    },
    {
      name: "iPhone",
      price: "150,000",
      img: iphone,
      description:
        "Appleの最新スマートフォン、優れたパフォーマンスとカメラ機能。",
    },
    {
      name: "Canon",
      price: "80,000",
      img: canon,
      description: "プロフェッショナルな写真撮影に最適な一眼レフカメラ。",
    },
    {
      name: "Macbook",
      price: "180,000",
      img: macbook,
      description: "Appleの高性能ノートパソコン、仕事や勉強に最適。",
    },
    {
      name: "LVバッグ",
      price: "220,000",
      img: lvBag,
      description:
        "ルイ・ヴィトンの高級バッグ、スタイリッシュで耐久性があります。",
    },
    {
      name: "Gucci",
      price: "300,000",
      img: gucci,
      description: "グッチのエレガントなデザインのアクセサリー。",
    },
    {
      name: "Rolex",
      price: "400,000",
      img: watch,
      description: "ロレックスの高級腕時計、精密な技術と美しいデザイン。",
    },
  ];
  const theme = useTheme();
  const Item = styled(Paper)(() => ({
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1",
    overflow: "hidden",
  }));

  const Image = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "contain",
  });

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box sx={{ flexGrow: 1 }} paddingX={isSmallScreen ? 8 : 20}>
      <Stack
        direction={"row"}
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
        marginY={2}
      >
        <Typography
          component={"h2"}
          fontSize={isSmallScreen ? "1rem" : "2rem"}
          sx={{ fontFamily: theme.typography.fonts.title }}
        >
          人気商品
        </Typography>
        <Box width={isSmallScreen ? 40 : 60}>
          <Image src={sale} alt="best sale" />
        </Box>
      </Stack>
      <Grid container spacing={5}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={3} key={product.name}>
            <Item>
              <Image src={product.img} alt={product.name} />
            </Item>
            <Typography
              component={"h5"}
              sx={{
                fontFamily: theme.typography.fonts.body,
                fontWeight: "bold",
                fontSize: isSmallScreen ? "0.6rem" : "1rem",
                marginTop: "8px",
              }}
            >
              {product.name}
            </Typography>
            <Typography
              component={"h5"}
              sx={{
                fontFamily: theme.typography.fonts.body,
                fontSize: isSmallScreen ? "0.4rem" : "0.8rem",
                marginY: "4px",
              }}
            >
              {product.description}
            </Typography>
            <Typography
              component={"h5"}
              sx={{
                fontFamily: theme.typography.fonts.body,
                fontSize: isSmallScreen ? "0.8rem" : "1.2rem",
              }}
            >
              ¥{product.price}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
