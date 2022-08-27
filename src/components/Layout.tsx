import React, { FC, ReactNode } from "react";
import { Box, CssBaseline } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flexGrow: 1,
          width: '100%', 
          height: '100%', 
          position: 'absolute'
        }}
      >
        <Navbar />
        {children}
        {/* <Footer /> */}
      </Box>
    </>
  );
};

export default Layout;