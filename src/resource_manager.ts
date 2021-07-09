import systeminfo from 'systeminformation';
import { simpleUtils } from './simple_utils';

class resource_manager {
    public async getMemoryInfo() {
        let result = {
            per: {
                total: 0,
            },
            size: {
                used: 0,
                free: 0,
            },
        };
        let memInfo = await systeminfo.mem();
        result.per.total = (memInfo.used / memInfo.total) * 100;
        result.size.free = memInfo.free / (1024 * 1024);
        result.size.used = memInfo.used / (1024 * 1024);
        return result;
    }

    public async getMemoryPerUsed(): Promise<number> {
        let memInfo = await systeminfo.mem();
        let usage = (memInfo.used / memInfo.total) * 100;
        return usage;
    }

    public async getMemorySwapInfo() {
        let memInfo = await systeminfo.mem();
        let result = {
            per: {
                total: (memInfo.swapused / memInfo.swaptotal) * 100,
            },
            size: {
                used: memInfo.swapused / (1024 * 1024),
            },
        };
        return result;
    }

    public async getFsInfo() {
        let fsInfoArr = await systeminfo.fsSize();
        let result = [];
        for (let fsInfo of fsInfoArr) {
            //INFO: 네이버 클라우드 같은 유효하지 않
            if (fsInfo.used < 0) continue;
            result.push({
                name: fsInfo.fs,
                size: {
                    used: fsInfo.used / (1024 * 1024),
                    available: fsInfo.available / (1024 * 1024),
                },
                per: {
                    total: (fsInfo.used / fsInfo.size) * 100,
                },
            });
        }
        return result;
    }

    /** INFO: 1초 동안의 bps 값을 계산 */
    public async getNetworkInfo() {
        let nicInfoArr = await systeminfo.networkInterfaces();
        let nicStatBefore = {};
        for (let nicInfo of nicInfoArr) {
            nicStatBefore[nicInfo.ifaceName] = (await systeminfo.networkStats(nicInfo.ifaceName))[0];
        }

        await simpleUtils.sleepMs(1000);

        let nicStatAfter = {};
        for (let nicInfo of nicInfoArr) {
            nicStatAfter[nicInfo.ifaceName] = (await systeminfo.networkStats(nicInfo.ifaceName))[0];
        }

        let result = [];
        for (let key in nicStatAfter) {
            nicStatAfter[key];
            nicStatBefore[key];

            result.push({
                name: key,
                bps: {
                    in: (nicStatAfter[key].rx_bytes - nicStatBefore[key].rx_bytes) * 8,
                    out: (nicStatAfter[key].tx_bytes - nicStatBefore[key].tx_bytes) * 8,
                },
            });
        }

        return result;
    }

    public async getDiskIoInfo() {
        let diskInfo = await systeminfo.disksIO();
        return diskInfo;
    }
}

// setInterval(() => {
//     systeminfo.mem((data) => {
//         console.log(data.free / (1024 * 1024) + ' MB');
//     });
//     systeminfo.cpuCurrentSpeed((data) => {
//         console.log(data);
//     });
// }, 3000);

const resourceManager = new resource_manager();
export { resourceManager };
