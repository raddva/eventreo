interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  category?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string;
    coordinate: {
      x: number;
      y: number;
    };
  };
  banner?: string | FileList;
}

interface IRegency {
  name: string;
  id: string;
}

export type { IEvent, IRegency };
