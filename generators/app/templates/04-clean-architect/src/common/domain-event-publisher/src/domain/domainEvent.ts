import { Record, Static, String, Unknown } from 'runtypes';

export const DomainEvent = Record({
  eventKey: String,
  payload: Unknown,
});

export type DomainEvent = Static<typeof DomainEvent>;
