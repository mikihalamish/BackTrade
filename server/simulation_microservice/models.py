import datetime

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


class DteFile(BaseModel):
    file_url: str  # the url to the file in the s3 ivol-options bucket
    today_date: datetime.datetime  # the historical date of the data (time 00:00:00)
    stock_symbol: str
    expiration_date: datetime.datetime  # the expiration date of the options in the file
    dte: int  # (expiration_date - today_date)


class OptionChainSnapshot(BaseModel):
    t_date: datetime.datetime  # exact time of the snapshot
    dte_file: DteFile  # includes the stock symbol, expiration date, and dte
    option_chain: List[OptionChainRow]


class SimulationConfig(BaseModel):
    simulation_id: str
    user_id: str
    simulation_type: Literal['Test', 'Practice']
    start_date_time: datetime.datetime
    end_date_time: datetime.datetime
    initial_capital: float
    universe_selection: List[DteFile]
    indicator_type_selection: List[str]
    playback_speed: float

# validate the simulation config:
# 1. start_date_time < end_date_time
# 2. initial_capital > 0
# 3. universe_selection is not empty
# 4. all today_date in universe_selection are between start_date_time and end_date_time
