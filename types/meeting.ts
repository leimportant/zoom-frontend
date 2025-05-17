export interface Meeting {
  id: string;
  topic: string;
  agenda: string;
  start_time: string;
  duration: number;
  zoom_id: number;
}

export interface MeetingView {
  id: string;
  topic: string;
  agenda: string;
  start_time: string;
  duration: number;
  zoom_id: number;
  join_url: string;    
  start_url: string;   
}

