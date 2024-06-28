import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton, InputLabel, MenuItem, Select, Slider, TextField } from '@mui/material';
import { KeyboardDoubleArrowLeft, KeyboardArrowLeft, KeyboardDoubleArrowRight, KeyboardArrowRight, PlayCircleFilled, Add, Remove } from '@mui/icons-material';
import "./Simulator.css";
import { LineChart } from '@mui/x-charts';

type TitleRow = {
  title: string;
  property: keyof OptionChain;
  styles?: string[];
};

type TitlePortfolio = {
  title: string;
  property: keyof Portfolio;
  styles?: string[];
}

type OptionChain = {
  callDelta: number,
  callOptionOpenInterest: number,
  callVolume: number,
  callBidSize: string,
  callBid: number,
  callAsk: number,
  callAskSize: string,
  strike: number,
  putDelta: number,
  putOptionOpenInterest: number,
  putVolume: number,
  putBidSize: string,
  putBid: number,
  putAsk: number,
  putAskSize: string
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
}

const optionChainTitles: TitleRow[] = [
  {title: "Delta", property: "callDelta"},
  {title: "Option Open Interest", property: "callOptionOpenInterest", styles: ["numberEnding"]},
  {title: "Volume", property: "callVolume"},
  {title: "BID Size", property: "callBidSize"},
  {title: "BID", property: "callBid"},
  {title: "Ask", property: "callAsk"},
  {title: "Ask Size", property: "callAskSize"},
  {title: "Strike", property: "strike"},
  {title: "Delta", property: "putDelta"},
  {title: "Option Open Interest", property: "putOptionOpenInterest", styles: ["numberEnding"]},
  {title: "Volume", property: "putVolume"},
  {title: "BID Size", property: "putBidSize"},
  {title: "BID", property: "putBid"},
  {title: "Ask", property: "putAsk"},
  {title: "Ask Size", property: "putAskSize"},
];

const optionChainMock: OptionChain[] = [
  {
  callDelta: 0.981,
  callOptionOpenInterest: 11400,
  callVolume: 26,
  callBidSize: 'XX',
  callBid: 6.70,
  callAsk: 7.70,
  callAskSize: 'XX',
  strike: 165,
  putDelta: -0.019,
  putOptionOpenInterest: 30400,
  putVolume: 27,
  putBidSize: 'XX',
  putBid: 5.70,
  putAsk: 8.70,
  putAskSize: 'XX'
  },
  {
    callDelta: 0.981,
    callOptionOpenInterest: 11400,
    callVolume: 26,
    callBidSize: 'XX',
    callBid: 6.70,
    callAsk: 7.70,
    callAskSize: 'XX',
    strike: 165,
    putDelta: -0.019,
    putOptionOpenInterest: 30400,
    putVolume: 27,
    putBidSize: 'XX',
    putBid: 5.70,
    putAsk: 8.70,
    putAskSize: 'XX'
    },
    {
      callDelta: 0.981,
      callOptionOpenInterest: 11400,
      callVolume: 26,
      callBidSize: 'XX',
      callBid: 6.70,
      callAsk: 7.70,
      callAskSize: 'XX',
      strike: 165,
      putDelta: -0.019,
      putOptionOpenInterest: 30400,
      putVolume: 27,
      putBidSize: 'XX',
      putBid: 5.70,
      putAsk: 8.70,
      putAskSize: 'XX'
      }
]

const portfolioTitles: TitlePortfolio[] = [
  {title: "DrillDown Daily P&L", property: "drillDownPnL", styles: ['posativeNegativeColor']},
  {title: "Fin Instr", property: "finInstr"},
  {title: "Position", property: "position"},
  {title: "Market Val.", property: "marketVal"},
  {title: "Avg. Price", property: "avgPrice"},
  {title: "Last", property: "last"},
  {title: "Change", property: "change", styles: ['addPlus', 'posativeNegativeColor']},
  {title: "% Of Net Liq", property: "netLiqPercent", styles: ['posativeNegativeColor']},
  {title: "% Daily P&L", property: "pnLPercent"},
  {title: "Delta", property: "delta"},
  {title: "Gamma", property: "gamma"},
];

const portfolioMock: Portfolio[] = [
  {
    drillDownPnL: 4,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.30,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36
  },
  {
    drillDownPnL: 0,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.30,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36
  },
  {
    drillDownPnL: -6,
    finInstr: "ICL",
    position: 10,
    marketVal: 400,
    avgPrice: 9.30,
    last: 4.75,
    change: 0.05,
    netLiqPercent: 0.35,
    pnLPercent: 0.05,
    delta: 0.34,
    gamma: 1.36
  }
]

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

const Simulator: React.FC = () => {
  return (
    <div>
      <SimulationControls></SimulationControls>
      <MainTable title="Option Chain" titles={optionChainTitles} values={optionChainMock}></MainTable>
      <div className="horizontal-container">
        <MainTable title="Portfolio" titles={portfolioTitles} values={portfolioMock}></MainTable>
        <OrderEntry></OrderEntry>
      </div>
      <UnderlyingIndex></UnderlyingIndex>
    </div>
  );
}

class SimulationControls extends React.Component {
  render(): React.ReactNode {
    return(
      <Paper className="controls-card">
        <div style={ { color: "white" } }>Simulation Controls</div>
        <div>  
          <div className="panel">
            <div>
              <IconButton className='speed-control-button'>
                <KeyboardDoubleArrowLeft className='speed-control-icon' />
              </IconButton>
              <IconButton className='speed-control-button'>
                <KeyboardArrowLeft className='speed-control-icon' />
              </IconButton>
              <IconButton className='speed-control-button'>
                <PlayCircleFilled className='speed-control-icon' />
              </IconButton>
              <IconButton className='speed-control-button'>
                <KeyboardArrowRight className='speed-control-icon' />
              </IconButton>
              <IconButton className='speed-control-button'>
                <KeyboardDoubleArrowRight className='speed-control-icon' />
              </IconButton>
            </div>
            <div className="slider-container">
              <Slider defaultValue={50} track={false} aria-label="Default" valueLabelDisplay="auto" />
            </div>
            <div>
              <Button className='finish-button' variant="contained">Finish</Button>
              <Button className='restart-button' variant="contained">Restart</Button>
            </div>
          </div>
          <div className='time-slider'>
            <Slider defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
          </div>
        </div>
      </Paper>
  )
  }
}

class MainTable extends React.Component<{ title: string, values: any[], titles: { title: string, property: keyof any, styles?: string[] }[] }, {}> {
  sytleProperty(property: any, styles: string[] | undefined): string {
    let finalProperty = property;
    if (typeof property == 'number') {
      styles?.forEach(style => {
        if (style === 'numberEnding') {
          finalProperty = this.formatNumber(property)
        } else if (style === 'addPlus') {
          finalProperty = this.addPlus(property);
        }
      });
    }

    return finalProperty;
  }

  formatNumber(number: number) {
    // Use the toLocaleString method to add suffixes to the number
    return number.toLocaleString('en-US', {
      // add suffixes for thousands, millions, and billions
      // the maximum number of decimal places to use
      maximumFractionDigits: 2,
      // specify the abbreviations to use for the suffixes
      notation: 'compact',
      compactDisplay: 'short'
    });
  }

  addPlus(number: number) {
    if (number > 0) return '+' + number.toString();
    else return number.toString();
  }

  positiveNegativeColor(number: any) {
    if (typeof number == 'number') {
      if (number > 0) {
        return 'green';
      } else if (number === 0) {
        return 'white';
      } else {
        return 'red';
      }
    }

    return 'white';
  }

  render(): React.ReactNode {
    return (
      <Paper className="table-card">
        <div style={ { color: "white" } }>{this.props.title}</div>
        <TableContainer sx={{background: 'transparent !important'}} component={Paper}>
          <Table sx={{ minWidth: 650, background: 'transparent !important' }} aria-label="simple table">
            <TableHead className="table-head">
              <TableRow>
                {this.props.titles.map((row) => (
                  <TableCell>{row.title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {this.props.values.map((row) => (
                <TableRow
                  // key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {this.props.titles.map((value => (
                    <TableCell style={{color: value.styles?.includes("posativeNegativeColor") ? this.positiveNegativeColor(row[value.property]) : ''}}>{this.sytleProperty(row[value.property], value.styles)}</TableCell>
                  )))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  }
}

class OrderEntry extends React.Component {
  render(): React.ReactNode {
    return(
      <Paper className="table-card">
        <div style={ { color: "white" } }>Order Entry</div>
        <div>
          <NumberInput></NumberInput>
          <div style={ { color: "white" } }>quantity</div>
        </div>
        <div>
          <NumberInput></NumberInput>
          <div style={ { color: "white" } }>limit price</div>
        </div>
        <div>
          <InputLabel id="select-label" style={ { color: "white" } }>Order Type</InputLabel>
          <Select
            labelId="select-label"
            label="Order Type"
            className='type-select'
          >
            <MenuItem>Long</MenuItem>
            <MenuItem>Short</MenuItem>
          </Select>
        </div>
        <Button className='restart-button' variant="contained">Buy</Button>
        <Button className='restart-button' variant="contained">Sell</Button>
      </Paper>
    )
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
    )
  }
}

class UnderlyingIndex extends React.Component {
  render(): React.ReactNode {
    return(
      <Paper className='table-card'>
        <LineChart
          width={500}
          height={300}
          series={[
            { data: pData, label: 'pv' },
            { data: uData, label: 'uv' },
          ]}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
        />

      </Paper>
    )
  }
}

export default Simulator;
