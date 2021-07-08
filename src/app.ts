import systeminfo from 'systeminformation';

import {cpuManager} from './cpu_manager';

setInterval(async ()=>{
    console.log(await cpuManager.getCpuPerTotal(4000));
}, 5000);



// setInterval(() => {
//     systeminfo.mem((data) => {
//         console.log(data.free / (1024 * 1024) + ' MB');
//     });
//     systeminfo.cpuCurrentSpeed((data) => {
//         console.log(data);
//     });
// }, 3000);
