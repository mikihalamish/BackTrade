import { Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React from "react";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

class UnderlyingIndex extends React.Component {
  render(): React.ReactNode {
    return (
      <Paper className="box-background even-margin">
        <LineChart
          sx={{
            //change left yAxis label styles
            "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.4",
              fill: "white",
            },
            // change bottom label styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              strokeWidth: "0.5",
              fill: "white",
            },
            // bottomAxis Line Styles
            "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
            // leftAxis Line Styles
            "& .MuiChartsAxis-left .MuiChartsAxis-line": {
              stroke: "white",
              strokeWidth: 0.4,
            },
            "& .MuiChartsAxis-left .MuiChartsAxis-tick, & .MuiChartsAxis-bottom .MuiChartsAxis-tick":
              {
                stroke: "white",
              },
            "& .MuiChartsLegend-series text tspan": {
              fill: "white",
            },
          }}
          width={1000}
          height={300}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      </Paper>
    );
  }
}

export default UnderlyingIndex;
