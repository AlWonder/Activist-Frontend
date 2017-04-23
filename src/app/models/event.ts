export class Event {
  id: number;
  userId: number;
  title: string;
  description: any;
  createDate: Date;
  eventDate: Date;
  eventTime: Date;
  templateId: number;
  cover: string;
  participants: number;
}

export class EventsByTag {
  Tag: string;
  Events: Event[];
}
