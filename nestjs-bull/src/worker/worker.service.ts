import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('test')
export class WorkerService {
  @Process()
  async transcode(job: Job<unknown>) {
    console.log(`Processing job ${job.id}`);
    console.log(`Job data: ${job.data}`);
  }
}
