import systeminfo from 'systeminformation';


setInterval(() => {
    systeminfo.mem((data) => {
        console.log(data.free / (1024 * 1024) + ' MB');
    });
    systeminfo.cpuCurrentSpeed((data) => {
        console.log(data);
    });
}, 3000);
