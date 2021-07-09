import { cpuManager } from './cpu_manager';
import { resourceManager } from './resource_manager';
import { simpleUtils } from './simple_utils';
import systeminfo from 'systeminformation';

import os from 'os';

//console.log(os.cpus());
//cpuManager.startPrintCpuUsage(5000);

async function main() {
    // setInterval(async () => {
    //     console.log(await resourceManager.getMemoryInfo());
    //     console.log(await resourceManager.getMemoryPerUsed());
    // }, 4000);
    // console.log('a1');
    // console.log(await resourceManager.getDiskIoInfo());
    // systeminfo.diskLayout(data => {
    //     console.log('a1');
    //     console.log(data);
    // });

    //console.log(await resourceManager.getFsInfo());
    setInterval(async () => {
        console.log(await resourceManager.getNetworkInfo());
    }, 5000);
}
main();

// setInterval(async () => {
//     console.log(await cpuManager.getCpuPerTotal(5000));
// }, 5000);
