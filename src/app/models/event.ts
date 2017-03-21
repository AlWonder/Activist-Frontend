export class Event {
  id: number;
  userId: number;
  title: string;
  description: any;
  createDate: Date;
  eventDate: Date;
  eventTime: Date;
  volunteers: boolean;
  cover: string;
}

export class EventsByTag {
  Tag: string;
  Events: Event[];
}
