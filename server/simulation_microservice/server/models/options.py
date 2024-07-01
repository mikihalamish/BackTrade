import datetime

from simulation import DteFile
from pandas import DataFrame
from pydantic import BaseModel
from typing import List, Literal


class OptionChainRow(BaseModel):
    t_date: datetime.datetime
    strike: float
    call_put: Literal['C', 'P']
    price_bid: float
    price_ask: float
    size_bid: int
    size_ask: int
    volume: int
    iv: float
    delta: float
    gamma: float
    theta: float
    vega: float
    rho: float

    @classmethod
    def from_csv_row(cls, row: dict):
        return cls(
            t_date=datetime.datetime.strptime(row['t_date'], "%Y-%m-%d %H:%M:%S"),
            strike=float(row['strike']),
            call_put=row['call_put'],
            price_bid=float(row['price_bid']) if row['price_bid'] else 0.0,
            price_ask=float(row['price_ask']) if row['price_ask'] else 0.0,
            size_bid=int(row['size_bid']) if row['size_bid'] else 0,
            size_ask=int(row['size_ask']) if row['size_ask'] else 0,
            volume=int(row['volume']) if row['volume'] else 0,
            iv=float(row['iv']) if row['iv'] else 0.0,
            delta=float(row['delta']) if row['delta'] else 0.0,
            gamma=float(row['gamma']) if row['gamma'] else 0.0,
            theta=float(row['theta']) if row['theta'] else 0.0,
            vega=float(row['vega']) if row['vega'] else 0.0,
            rho=float(row['rho']) if row['rho'] else 0.0
        )


class OptionChainSnapshot(BaseModel):
    t_date: datetime.datetime  # exact time of the snapshot
    dte_file: DteFile  # includes the stock symbol, expiration date, and dte
    option_chain: List[OptionChainRow]


