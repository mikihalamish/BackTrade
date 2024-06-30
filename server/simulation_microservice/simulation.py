import asyncio
import csv
from asyncio import create_task
from collections import defaultdict
from datetime import timedelta, datetime

import pandas as pd

from server.simulation_microservice.models import SimulationConfig, OptionChainSnapshot, OptionChainRow, DteFile


class Simulation:
    def __init__(self, simulation_config: SimulationConfig):
        self.simulation_config = simulation_config
        self.timeframes = defaultdict(OptionChainSnapshot)
        self.tasks = []

    async def set_playback_speed(self, speed: float):
        self.simulation_config.playback_speed = speed

    async def init(self):
        await self.create_datetime_dict()
        await self.populate_timeframes()

    async def create_datetime_dict(self):
        start = self.simulation_config.start_date_time
        end = self.simulation_config.end_date_time
        return {start + timedelta(minutes=x): None for x in range(0, int((end - start).total_seconds() // 60))}

    async def populate_timeframes(self):
        # in reality this function should call the data_microservice to get the data
        # but for the POC it will use the sample data from the local csv.
        dummy_dte_file = DteFile(file_url='ivol/all_dte_raw_data/0dte/2016-01-12.csv',
                                 today_date=datetime(2016, 1, 12),
                                 stock_symbol='SPX',
                                 expiration_date=datetime(2016, 1, 22),
                                 dte=15)

        csv_file = '2016-01-12.csv'
        with open(csv_file, 'r') as file:
            csv_reader = csv.reader(file)
            headers = next(csv_reader)  # Read the header row
            # ...
            for row in csv_reader:
                row_dict = dict(zip(headers, row))
                option_chain_row = OptionChainRow.from_csv_row(row_dict)
                if option_chain_row.t_date not in self.timeframes:
                    self.timeframes[option_chain_row.t_date] = OptionChainSnapshot(
                        t_date=option_chain_row.t_date,
                        dte_file=dummy_dte_file,
                        option_chain=[]
                    )
                self.timeframes[option_chain_row.t_date].option_chain.append(option_chain_row)
            # ...

        print(f"Loaded {sum(len(snapshot.option_chain) for snapshot in self.timeframes.values())} option chain rows.")

    async def update_client(self, snapshot: OptionChainSnapshot):
        print(snapshot.option_chain)

    async def run(self):
        for target_datetime in self.timeframes:
            snapshot = self.timeframes[target_datetime]
            self.tasks.append(create_task(self.update_client(snapshot)))
            await asyncio.sleep(60 / self.simulation_config.playback_speed)


