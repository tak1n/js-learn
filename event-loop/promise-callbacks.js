/** 
 * Five handlers will be added to the resolved promises microtask queue.
 * Two handlers will be added to the setImmediate queue.
 * Three items will be added to the process.nextTick queue.
 * One timer is created with expiration time as zero, which will be immediately expired and the callback is added to the timers queue
 * Two items will be added again to the setImmediate queue.
 */
Promise.resolve().then(() => console.log('promise1 resolved'));
Promise.resolve().then(() => console.log('promise2 resolved'));
Promise.resolve().then(() => {
    console.log('promise3 resolved');
    process.nextTick(() => console.log('next tick inside promise resolve handler'));
});
Promise.resolve().then(() => console.log('promise4 resolved'));
Promise.resolve().then(() => console.log('promise5 resolved'));
setImmediate(() => console.log('set immediate1'));
setImmediate(() => console.log('set immediate2'));

process.nextTick(() => console.log('next tick1'));
process.nextTick(() => console.log('next tick2'));
process.nextTick(() => console.log('next tick3'));

setTimeout(() => console.log('set timeout'), 0);
setImmediate(() => console.log('set immediate3'));
setImmediate(() => console.log('set immediate4'));

// Pre native promises in node, certain libs were used which have different semantics for promises:
// - q (https://github.com/kriskowal/q) - uses nextTick queue
// - bluebird (http://bluebirdjs.com/docs/getting-started.html) uses setImmediate queue by default, can be changed BlueBird.setScheduler(process.nextTick);