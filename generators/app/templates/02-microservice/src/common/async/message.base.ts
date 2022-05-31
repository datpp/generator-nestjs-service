import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageBase<T> {
  @ApiProperty({ format: 'uuid', description: 'Identify a flow' })
  correlationId: string;

  @ApiProperty({ format: 'uuid', description: 'Identify a request' })
  messageId?: string;

  @ApiProperty({ description: 'Type of message' })
  messageType: string;

  @ApiProperty({ format: 'date-time' })
  timestamp: string;

  @ApiProperty({ format: 'X.Y.Z', description: 'Message Version' })
  version: string;

  @ApiProperty({ description: 'Message payload' })
  payload: T;
}

export class CreateCommand<T> extends MessageBase<T> {}

export class CreateReplyCommand extends MessageBase<any> {}

export class CreateReplySuccessCommandPayload {
  @ApiProperty({ format: 'uuid' })
  identifier: string;
}

export class CreateReplySuccessCommand extends MessageBase<CreateReplySuccessCommandPayload> {}

export class CreateReplyErrorCommandPayload {
  @ApiProperty()
  errorCode: string;
  @ApiProperty()
  errorMessage: string;
  @ApiPropertyOptional()
  errorDetails: any;
}

export class CreateReplyErrorCommand<T extends CreateReplyErrorCommandPayload> extends MessageBase<T> {}

export class UpdateCommand<T> extends MessageBase<Partial<T>> {}

export class UpdateReplyCommand extends MessageBase<any> {}

export class UpdateReplySuccessCommandPayload {
  @ApiProperty({ format: 'uuid' })
  identifier: string;
}

export class UpdateReplySuccessCommand extends MessageBase<UpdateReplySuccessCommandPayload> {}

export class UpdateReplyErrorCommandPayload {
  @ApiProperty()
  errorCode: string;
  @ApiProperty()
  errorMessage: string;
  @ApiPropertyOptional()
  errorDetails: any;
}

export class UpdateReplyErrorCommand<T extends UpdateReplyErrorCommandPayload> extends MessageBase<T> {}
