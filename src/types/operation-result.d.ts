import type { Sim, Stats, Status } from 'src-wasm/pkg'

export interface OperationResult {
    sim: Sim
    stats: Stats
    status: Status
}