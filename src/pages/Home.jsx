import { Box } from "@mui/material";
import NavBar from "../components/homeComponets/NavBar";
import MainContent from "../components/homeComponets/MainContent";
import Footer from "../components/homeComponets/Footer";

const Home = () => {
  return (
    <Box
      component={"main"}
      sx={{
        minHeight: "100dvh",
      }}
    >
      <NavBar />
      <MainContent />
      <Footer />
    </Box>
  );
};

export default Home;
