import os from 'os';

type CpuTarget = 'user' | 'idle' | 'nice' | 'irq' | 'sys' | 'total';

class cpu_manager {
    constructor() {}

    private getCpuTotalTimeMs(targetName: CpuTarget) {
        let total = 0;
        let target = 0;

        let cpuInfoArr = os.cpus();
        cpuInfoArr.map(cpuInfo => {
            target += cpuInfo.times[targetName];
        });

        cpuInfoArr.map(cpuInfo => {
            Object.values(cpuInfo.times).map(value => {
                total += value;
            });
        });

        return {
            total: total,
            target: target,
        };
    }

    public async getCpuPerCommon(targetName: CpuTarget, intervalMs: number): Promise<number> {
        if (targetName === 'total') {
            let idleUsage = await this.getCpuPerCommon('idle', intervalMs);
            return 100 - idleUsage;
        }

        return new Promise(async resolve => {
            let targetBefore = 0,
                totalBefore = 0;
            let cpuInfo = this.getCpuTotalTimeMs(targetName);
            targetBefore = cpuInfo.target;
            totalBefore = cpuInfo.total;
            setTimeout(async () => {
                let target = 0,
                    total = 0;
                cpuInfo = this.getCpuTotalTimeMs(targetName);
                target = cpuInfo.target - targetBefore;
                total = cpuInfo.total - totalBefore;
                let usage = (target * 100) / total;
                resolve(usage);
            }, intervalMs);
        });
    }

    public async startPrintCpuUsage(collectIntervalMs: number) {
        console.log(`cpu per total : ${(await this.getCpuPerCommon('total', collectIntervalMs)).toFixed(3)} %`);
        console.log(`cpu per free : ${(await this.getCpuPerCommon('idle', collectIntervalMs)).toFixed(3)} %`);
        console.log(`cpu per user : ${(await this.getCpuPerCommon('user', collectIntervalMs)).toFixed(3)} %`);
        console.log(`cpu per irq : ${(await this.getCpuPerCommon('irq', collectIntervalMs)).toFixed(3)} %`);
        console.log(`cpu per sys : ${(await this.getCpuPerCommon('sys', collectIntervalMs)).toFixed(3)} %`);
        this.startPrintCpuUsage(collectIntervalMs);
    }
}

const cpuManager = new cpu_manager();
export { cpuManager };
