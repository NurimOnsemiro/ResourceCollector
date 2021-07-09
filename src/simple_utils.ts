class simple_utils {
    /**
     * INFO: 일정시간 동안 대기한다.
     * @param mSec 대기할 시간 (밀리초)
     */
    public async sleepMs(mSec: number): Promise<void> {
        return new Promise(async (resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, mSec);
        });
    }
}

const simpleUtils = new simple_utils();
export { simpleUtils };
