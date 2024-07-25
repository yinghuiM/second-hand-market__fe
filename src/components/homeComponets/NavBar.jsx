import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";
import { Fragment } from "react";
import { logo } from "../../assets/icons";

const navList = [
  {
    name: "アバウト",
    href: "/about",
  },
  {
    name: "サービス",
    href: "/services",
  },
  {
    name: "お問い合わせ",
    href: "/contact",
  },
];

const NavBar = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box component={"nav"} position={"sticky"} top={0} left={0} width={"100%"}>
      <Stack
        sx={{
          bgcolor: "side.main",
          height: isSmallScreen ? 30 : 50,
        }}
        paddingX={2}
        direction={"row"}
        alignItems={"center"}
      >
        <Typography
          fontSize={isSmallScreen ? "12px" : "14px"}
          sx={{ fontFamily: theme.typography.fonts.subtitle }}
        >
          xxx【公式】 | 中古ブランド品の通販、買取、質屋
        </Typography>
      </Stack>

      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={isSmallScreen ? "5vh" : "8vh"}
        p={isSmallScreen ? 1 : 2}
        sx={{
          bgcolor: "home.main",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} gap={2} height={"100%"}>
          <img
            src={logo}
            alt="logo"
            style={{
              height: isSmallScreen ? "60%" : "80%",
              width: "auto",
            }}
          />
          {!isSmallScreen && (
            <Typography
              sx={{
                color: "home.title",
                fontSize: "20px",
                fontFamily: theme.typography.fonts.title,
              }}
            >
              中古取引市場
            </Typography>
          )}
        </Stack>

        <Stack direction={"row"} alignItems={"center"}>
          {navList.map((nav, index) => (
            <Fragment key={nav.name}>
              <Typography
                sx={{
                  color: "home.title",
                  fontSize: isSmallScreen ? "14px" : "16px",
                  fontFamily: theme.typography.fonts.subtitle,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "home.link",
                  },
                }}
                component={"a"}
                href={nav.href}
                key={nav.name}
              >
                {nav.name}
              </Typography>
              {index !== navList.length - 1 && (
                <Typography
                  sx={{
                    color: "home.title",
                    marginX: 1,
                  }}
                >
                  |
                </Typography>
              )}
            </Fragment>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default NavBar;
