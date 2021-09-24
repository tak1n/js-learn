import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = ['OPEN', 'IN_PROGRESS', 'DONE'];

  transform(value: any) {
    value = value.toUpperCase();

    if (this.allowedStatuses.includes(value)) {
      return value;
    } else {
      throw new BadRequestException(`Invalid status "${value}"`);
    }
  }
}
