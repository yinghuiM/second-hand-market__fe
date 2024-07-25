import { useTheme } from "@emotion/react";
import { Box, Divider, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  sell,
  handshake,
  parcel,
  topArrow,
  transport,
} from "../../assets/icons";
import { map } from "../../assets/img";

const Footer = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sloganList = [
    {
      name: "「簡単な販売、安心の取引」",
      icon: sell,
    },
    {
      name: "「世界中に配送、迅速なお届け」",
      icon: transport,
    },
    {
      name: "「誠実な取引、共に勝つ協力」",
      icon: handshake,
    },
    {
      name: "「専門的な梱包、安全な到着」",
      icon: parcel,
    },
  ];
  return (
    <Box component={"footer"} sx={{ bgcolor: "side.main", width: "100%" }}>
      <Stack
        sx={{
          height: "auto",
          paddingX: isSmallScreen ? 5 : 10,
          paddingY: 5,
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} flex={3}>
          {!isSmallScreen && (
            <Stack gap={2}>
              {sloganList.map((slogan) => (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  gap={3}
                  key={slogan.name}
                >
                  <img
                    src={slogan.icon}
                    alt="slogan"
                    style={{
                      width: 40,
                      objectFit: "contain",
                    }}
                  />

                  <Typography
                    sx={{
                      fontFamily: theme.typography.fonts.body,
                    }}
                  >
                    {slogan.name}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
          <Stack direction={"row"} gap={3}>
            <Stack gap={1}>
              <Typography sx={{ fontFamily: theme.typography.fonts.title }}>
                連絡先
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.typography.fonts.body,
                  fontSize: isSmallScreen ? "12px" : "14px",
                }}
              >
                0120-123-4567
              </Typography>
              <Typography
                sx={{
                  fontFamily: theme.typography.fonts.body,
                  fontSize: isSmallScreen ? "12px" : "14px",
                }}
              >
                〒123-4567 東京都渋谷区渋谷1-1-1
              </Typography>
            </Stack>
            <a href="https://maps.app.goo.gl/deJ4ozzKMFtx2hDo8" target="_blank">
              <img
                src={map}
                alt="address"
                style={{
                  width: isSmallScreen ? 150 : 500,
                  objectFit: "contain",
                  borderRadius: 10,
                }}
              />
            </a>
          </Stack>
        </Stack>
        <Divider sx={{ borderBottomWidth: 1, borderColor: "#54525266" }} />
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          flex={1}
        >
          <Stack>
            <Typography
              sx={{
                fontFamily: theme.typography.fonts.title,
                fontSize: isSmallScreen ? "0.8rem" : "1rem",
              }}
            >
              中古取引市場
            </Typography>
            {!isSmallScreen && (
              <Typography
                sx={{
                  fontFamily: theme.typography.fonts.subtitle,
                  fontSize: "0.8rem",
                }}
              >
                中古品の売買を簡単かつ安全に行えるプラットフォームです。使わなくなった品物を新しい持ち主に届けることで、環境にも優しく、経済的な取引を提供します。
              </Typography>
            )}
          </Stack>
          <Stack alignItems={"flex-end"} gap={2} mt={1}>
            <Box
              component={"div"}
              sx={{
                cursor: "pointer",
                border: "1px solid #000",
                padding: "2px",
                width: 30,
                height: 30,
              }}
              onClick={handleScrollToTop}
            >
              <img src={topArrow} alt="logo" width={"100%"} height={"100%"} />
            </Box>
            <Typography
              sx={{
                fontFamily: theme.typography.fonts.subtitle,
                fontSize: "12px",
              }}
            >
              © 2024 XXXX. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Footer;
