import os from 'os';

class cpu_manager {
    constructor() {}

    private getCpuFreeTotalTimeMs() {
        let total = 0;
        let free = 0;

        let cpuInfoArr = os.cpus();
        cpuInfoArr.map(cpuInfo => {
            free += cpuInfo.times.idle;
        });

        cpuInfoArr.map(cpuInfo => {
            Object.values(cpuInfo.times).map(value => {
                total += value;
            });
        });

        return {
            total: total,
            free: free,
        };
    }

    public async getCpuPerTotal(intervalMs: number): Promise<number> {
        return new Promise(async resolve => {
            let freeBefore = 0,
                totalBefore = 0;
            let cpuInfo = this.getCpuFreeTotalTimeMs();
            freeBefore = cpuInfo.free;
            totalBefore = cpuInfo.total;
            setTimeout(async () => {
                let free = 0,
                    total = 0;
                cpuInfo = this.getCpuFreeTotalTimeMs();
                free = cpuInfo.free - freeBefore;
                total = cpuInfo.total - totalBefore;
                let usage = 100 - (free * 100) / total;
                resolve(usage);
            }, intervalMs);
        });
    }

    public async getCpuPerFree(intervalMs: number): Promise<number> {
        let cpuPerTotal = await this.getCpuPerTotal(intervalMs);
        return 100 - cpuPerTotal;
    }

    public async startPrintCpuUsage(collectIntervalMs: number) {
        console.log(`cpu per total : ${Math.round(await this.getCpuPerTotal(collectIntervalMs))} %`);
        console.log(`cpu per free : ${Math.round(await this.getCpuPerFree(collectIntervalMs))} %`);
        this.startPrintCpuUsage(collectIntervalMs);
    }
}

const cpuManager = new cpu_manager();
export { cpuManager };
