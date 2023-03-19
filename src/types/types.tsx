export interface ICourse {
  id: number;
  title: string;
  tags: string[];
  launchDate: number;
  status: string;
  description: string;
  duration: number;
  lessonsCount?: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills?: string[];
    courseVideoPreview: {
      link?: string;
      duration: number;
      previewImageLink: string;
    };
  };
  lessons?: Lesson[];
}

type Lesson = {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string;
  previewImageLink: string;
  meta: null | any;
};