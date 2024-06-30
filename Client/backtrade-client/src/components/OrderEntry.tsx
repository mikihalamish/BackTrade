import {
  Button,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import "./OrderEntry.css";

class OrderEntry extends React.Component {
  render(): React.ReactNode {
    return (
      <Paper className="box-background even-margin extra-padding order-entry">
        <div style={{ color: "white" }}>Order Entry</div>
        <div>
          <NumberInput></NumberInput>
          <div style={{ color: "white" }}>quantity</div>
        </div>
        <div>
          <NumberInput></NumberInput>
          <div style={{ color: "white" }}>limit price</div>
        </div>
        <div>
          <InputLabel id="select-label" style={{ color: "white" }}>
            Order Type
          </InputLabel>
          <Select
            labelId="select-label"
            label="Order Type"
            className="type-select"
          >
            <MenuItem>Long</MenuItem>
            <MenuItem>Short</MenuItem>
          </Select>
        </div>
        <Button className="confirm-button" variant="contained">
          Buy
        </Button>
        <Button className="confirm-button" variant="contained">
          Sell
        </Button>
      </Paper>
    );
  }
}

class NumberInput extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        {/* <IconButton>
          <Remove />
        </IconButton> */}
        <TextField type="number" />
        {/* <IconButton>
          <Add />
        </IconButton> */}
      </div>
    );
  }
}

export default OrderEntry;
