from fastapi import APIRouter, WebSocket
from  models.simulation import  SimulationInset,SimulationConfig

router = APIRouter(prefix="/simulation", tags=["Simulation"])


@router.post("/")
async def createSimulation(simulationInset: SimulationInset) -> SimulationConfig:
    """Create a simulation"""
    simulationConfig =  SimulationConfig(user_id= simulationInset.user_id, simulation_type= simulationInset.simulation_type,start_date_time = simulationInset.start_date_time,initial_capital = simulationInset.initial_capital,universe_selection = simulationInset.universe_selection,indicator_type_selection = [""] )
    await simulationConfig.insert()
    
    return simulationConfig

@router.websocket('/{simulation_id}/ws')
async def simulation_ws(websocket: WebSocket, simulation_id:str):
    """Get WS for simulation"""
    await websocket.accept()
    while True: 
        data = await websocket.receive_text()
        print(data)
        await websocket.send_text(data)