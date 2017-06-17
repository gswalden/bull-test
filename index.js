const Queue = require('bull');
const assert = require('assert');

describe('bull test', () => {
  it('returnvalue is never null', done => {
    const promiseQueue = new Queue('testing-' + Date.now());
    promiseQueue.on('completed', job => {
      assert(job);
      assert(job.returnvalue != null);
      setTimeout(() => {
        promiseQueue.getJob(job.jobId).then(job => {
          assert(job);
          assert(job.returnvalue != null);
          done();
        }).catch(done);
      }, 100)
    })
    promiseQueue.process(job => Promise.resolve('a very dignified string'));
    promiseQueue.add({ testing: true });
  })
})
