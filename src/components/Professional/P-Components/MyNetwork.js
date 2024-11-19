import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Use Grid from '@mui/material/Grid'
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ManageNetwork from "./MyNetwork/ManageNetwork";
import BottomNav from "./MyNetwork/BottomNav";
import Grow from "./MyNetwork/Grow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function MyNetwork() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ height: "100vh" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ManageNetwork />
            </Grid>
            <Grid item xs={12} md={8}>
              <BottomNav value={value} handleChange={handleChange} />
              {value === 0 && (
                <Item>
                  <Grow />
                </Item>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
