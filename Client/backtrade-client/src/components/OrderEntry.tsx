import React from "react";
import {
  Button,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "./OrderEntry.css";

const OrderEntry: React.FC = () => {
  const [strikePrice, setStrikePrice] = React.useState<number>(0);
  const [type, setType] = React.useState<string>("");
  const [symbol, setSymbol] = React.useState<string>("BTC/JPY");
  const [expirationDate, setExpirationDate] = React.useState<string>("");

  const handleIncrement = () => {
    setStrikePrice((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setStrikePrice((prev) => prev - 1);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleSymbolChange = (event: SelectChangeEvent) => {
    setSymbol(event.target.value);
  };

  const handleExpirationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpirationDate(event.target.value);
  };

  return (
    <Paper className="box-background order-entry">
      <Typography variant="h6" className="header-text">
        Order Entry
      </Typography>
      <FormControl fullWidth margin="normal">
        <InputLabel className="input-label">Symbol</InputLabel>
        <Select
          value={symbol}
          onChange={handleSymbolChange}
          className="select-input"
        >
          <MenuItem value="BTC/JPY">BTC/JPY</MenuItem>
          {/* Add other options here */}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel className="input-label">Expiration Date</InputLabel>
        <TextField
          type="date"
          value={expirationDate}
          onChange={handleExpirationChange}
          className="date-input"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel className="input-label">Strike Price</InputLabel>
        <Box className="number-input">
          <IconButton className="icon-button" onClick={handleDecrement}>
            <Remove />
          </IconButton>
          <TextField
            type="number"
            value={strikePrice}
            onChange={(e) => setStrikePrice(Number(e.target.value))}
            className="number-textfield"
            inputProps={{ style: { textAlign: "center" } }}
          />
          <IconButton className="icon-button" onClick={handleIncrement}>
            <Add />
          </IconButton>
        </Box>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel className="input-label">Type</InputLabel>
        <Select
          value={type}
          onChange={handleTypeChange}
          className="select-input"
        >
          <MenuItem value="Call">Call</MenuItem>
          <MenuItem value="Put">Put</MenuItem>
        </Select>
      </FormControl>
      <Box className="order-buttons">
        <Button className="confirm-button buy-button" variant="contained">
          Buy
        </Button>
        <Button className="confirm-button sell-button" variant="contained">
          Sell
        </Button>
      </Box>
    </Paper>
  );
};

export default OrderEntry;
