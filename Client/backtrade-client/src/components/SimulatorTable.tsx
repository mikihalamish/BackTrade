import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import "./SimulatorTable.css";
import "../index.css";

class SimulatorTable extends React.Component<
  {
    title: string;
    values: any[];
    titles: { title: string; property: keyof any; styles?: string[] }[];
  },
  {}
> {
  sytleProperty(property: any, styles: string[] | undefined): string {
    let finalProperty = property;
    if (typeof property == "number") {
      styles?.forEach((style) => {
        if (style === "numberEnding") {
          finalProperty = this.formatNumber(property);
        } else if (style === "addPlus") {
          finalProperty = this.addPlus(property);
        }
      });
    }

    return finalProperty;
  }

  formatNumber(number: number) {
    // Use the toLocaleString method to add suffixes to the number
    return number.toLocaleString("en-US", {
      // add suffixes for thousands, millions, and billions
      // the maximum number of decimal places to use
      maximumFractionDigits: 2,
      // specify the abbreviations to use for the suffixes
      notation: "compact",
      compactDisplay: "short",
    });
  }

  addPlus(number: number) {
    if (number > 0) return "+" + number.toString();
    else return number.toString();
  }

  positiveNegativeColor(number: any) {
    if (typeof number == "number") {
      if (number > 0) {
        return "green";
      } else if (number === 0) {
        return "white";
      } else {
        return "red";
      }
    }

    return "white";
  }

  render(): React.ReactNode {
    return (
      <Paper className="box-background even-margin">
        <div style={{ color: "white" }}>{this.props.title}</div>
        <TableContainer
          sx={{ background: "transparent !important" }}
          component={Paper}
        >
          <Table
            sx={{ minWidth: 650, background: "transparent !important" }}
            aria-label="simple table"
          >
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {this.props.titles.map((value) => (
                    <TableCell
                      style={{
                        color: value.styles?.includes("posativeNegativeColor")
                          ? this.positiveNegativeColor(row[value.property])
                          : "",
                      }}
                    >
                      {this.sytleProperty(row[value.property], value.styles)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }
}

export default SimulatorTable;
