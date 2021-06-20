
// setTimeout does not guarantee a callback is called exactly after a certain time
// It heavily depends on the performance of the system (consuming the callback from the timers queue takes CPU time)
// Also other CPU intensive operations in other queues (intermediate like nextTick or microtasks could block/delay it)
const start = process.hrtime();

setTimeout(() => {
    const end = process.hrtime(start);
    console.log(`timeout callback executed after ${end[0]}s and ${end[1]/Math.pow(10,9)}ms`);
}, 1000);

// Using setTimeout with 0 and setImmediate in below case is problematic as the order in which the callbacks are called cannot be guaranteed
// Explanation:
/** 
 * This is because of the interesting fact that NodeJS caps the minimum timeout to 1ms in order to align with Chrome’s timers cap.
 * Due to this cap, even if you set a timer to 0ms delay, the delay is actually overridden and set to 1ms.
 * 
 * At the start of a new iteration of the event loop, NodeJS invokes a system call to get the current clock time.
 * Depending on how busy the CPU is, getting the current clock time may or may not complete within 1ms.
 * If the clock time is retrieved in less than 1ms, NodeJS will detect that the timer is not expired, because the timer takes 1ms to expire.
 * But, if getting the clock time takes more than 1ms, the timer will be expired by the time the clock time is retrieved.
 * In the case of Node detecting that the timer is not yet expired, Then the event loop will move on to the I/O phase and then to the immediates queue.
 * Then it will see that there is an event in the immediates queue and it will process it. Hence, setImmediate preceding the setTimeout callback.
 * 
 */
setTimeout(function() {
    console.log('setTimeout')
}, 0);

// Immediates are executed immedately after I/O phase of the event loop
setImmediate(() => {
   console.log('Hi, this is an immediate');
});

// Following usage of setTimeout and setImmediate would guarantee the order
// After the I/O phase callback it will always process the immediate queue and after this check the timers queue
/** 
 *
 * const fs = require('fs');
 * fs.readFile(__filename, () => {
 *  setTimeout(() => {
 *      console.log('timeout')
 *  }, 0);
 *  setImmediate(() => {
 *      console.log('immediate')
 *  })
 * });
 */