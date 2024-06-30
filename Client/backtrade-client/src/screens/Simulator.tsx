import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "./Simulator.css";
import SimulationControls from "../components/SimulationControls";
import SimulatorTable from "../components/SimulatorTable";
import UnderlyingIndex from "../components/UnderlyingIndex";
import OrderEntry from "../components/OrderEntry";
import SimulationBuilder from "../components/SimulationBuilder";

type TitleRow = {
  title: string;
  property: keyof OptionChain;
  styles?: string[];
};

type TitlePortfolio = {
  title: string;
  property: keyof Portfolio;
  styles?: string[];
};

type OptionChain = {
  callDelta: number;
  callOptionOpenInterest: number;
  callVolume: number;
  callBidSize: string;
  callBid: number;
  callAsk: number;
  callAskSize: string;
  strike: number;
  putDelta: number;
  putOptionOpenInterest: number;
  putVolume: number;
  putBidSize: string;
  putBid: number;
  putAsk: number;
  putAskSize: string;
};

type Portfolio = {
  drillDownPnL: number;
  finInstr: string;
  position: number;
  marketVal: number;
  avgPrice: number;
  last: number;
  change: number;
  netLiqPercent: number;
  pnLPercent: number;
  delta: number;
  gamma: number;
};

const optionChainTitles: TitleRow[] = [
  { title: "Delta", property: "callDelta" },
  {
    title: "Option Open Interest",
    property: "callOptionOpenInterest",
    styles: ["numberEnding"],
  },
  { title: "Volume", property: "callVolume" },
  { title: "BID Size", property: "callBidSize" },
  { title: "BID", property: "callBid" },
  { title: "Ask", property: "callAsk" },
  { title: "Ask Size", property: "callAskSize" },
  { title: "Strike", property: "strike" },
  { title: "Delta", property: "putDelta" },
  {
    title: "Option Open Interest",
    property: "putOptionOpenInterest",
    styles: ["numberEnding"],
  },
  { title: "Volume", property: "putVolume" },
  { title: "BID Size", property: "putBidSize" },
  { title: "BID", property: "putBid" },
  { title: "Ask", property: "putAsk" },
  { title: "Ask Size", property: "putAskSize" },
];

const optionChainMock: OptionChain[] = [
  {
    callDelta: 0.981,
    callOptionOpenInterest: 11400,
    callVolume: 26,
    callBidSize: "XX",
    callBid: 6.7,
    callAsk: 7.7,
    callAskSize: "XX",
    strike: 165,
    putDelta: -0.019,
    putOptionOpenInterest: 30400,
    putVolume: 27,
    putBidSize: "XX",
    putBid: 5.7,
    putAsk: 8.7,
    putAskSize: "XX",
  },
  {
    callDelta: 0.981,
    callOptionOpenInterest: 11400,
    callVolume: 26,
    callBidSize: "XX",
    callBid: 6.7,
    callAsk: 7.7,
    callAskSize: "XX",
    strike: 165,
    putDelta: -0.019,
    putOptionOpenInterest: 30400,
    putVolume: 27,
    putBidSize: "XX",
    putBid: 5.7,
    putAsk: 8.7,
    putAskSize: "XX",
  },
  {
    callDelta: 0.981,
    callOptionOpenInterest: 11400,
    callVolume: 26,
    callBidSize: "XX",
    callBid: 6.7,
    callAsk: 7.7,
    callAskSize: "XX",
    strike: 165,
    putDelta: -0.019,
    putOptionOpenInterest: 30400,
    putVolume: 27,
    putBidSize: "XX",
    putBid: 5.7,
    putAsk: 8.7,
    putAskSize: "XX",
  },
];

const portfolioTitles: TitlePortfolio[] = [
  {
    title: "DrillDown Daily P&L",
    property: "drillDownPnL",
    styles: ["posativeNegativeColor"],
  },
  { title: "Fin Instr", property: "finInstr" },
  { title: "Position", property: "position" },
  { title: "Market Val.", property: "marketVal" },
  { title: "Avg. Price", property: "avgPrice" },
  { title: "Last", property: "last" },
  {
    title: "Change",
    property: "change",
    styles: ["addPlus", "posativeNegativeColor"],
  },
  {
    title: "% Of Net Liq",
    property: "netLiqPercent",
    styles: ["posativeNegativeColor"],
  },
  { title: "% Daily P&L", property: "pnLPercent" },
  { title: "Delta", property: "delta" },
  { title: "Gamma", property: "gamma" },
];

const portfolioMock: Portfolio[] = [
  {
    drillDownPnL: 4,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.3,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36,
  },
  {
    drillDownPnL: 0,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.3,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36,
  },
  {
    drillDownPnL: -6,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.3,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36,
  },
];

const Simulator: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleClickOpen();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSimulationStart = () => {
    setOpen(false); // Close the dialog when simulation starts
  };

  return (
    <div>
      <SimulationControls></SimulationControls>
      <SimulatorTable
        title="Option Chain"
        titles={optionChainTitles}
        values={optionChainMock}
      ></SimulatorTable>
      <div className="horizontal-container">
        <div>
          <SimulatorTable
            title="Portfolio"
            titles={portfolioTitles}
            values={portfolioMock}
          ></SimulatorTable>
          <UnderlyingIndex></UnderlyingIndex>
        </div>

        <OrderEntry></OrderEntry>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            background: "linear-gradient(135deg, #00022c 0%, #000003 100%)",
            color: "#ffffff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px white solid",
          },
        }}
      >
        <DialogTitle>Simulation Builder</DialogTitle>
        <DialogContent>
          <SimulationBuilder onSimulationStart={handleSimulationStart} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Simulator;
