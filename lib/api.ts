import axios from 'axios';
import { Meeting } from '@/types/meeting';
import { MeetingView } from '@/types/meeting';

const BASE_URL = 'http://localhost:8080'; // Ganti sesuai backend kamu

export const getMeetings = async (): Promise<Meeting[]> => {
  const res = await axios.get(`${BASE_URL}/meetings`);
  return res.data;
};

export const getMeetingByID = async (id: string): Promise<Meeting> => {
  const res = await axios.get(`${BASE_URL}/meetings/${id}`);
  return res.data;
};

export const getMeetingViewByID = async (id: string): Promise<MeetingView> => {
  const res = await axios.get(`${BASE_URL}/meetings/${id}`);
  return res.data;
};

export const createMeeting = async (data: Omit<Meeting, 'id' | 'zoom_id'>) => {
  const res = await axios.post(`${BASE_URL}/meetings`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};


export const updateMeeting = async (id: string, data: Partial<Meeting>) => {
  const res = await axios.put(`${BASE_URL}/meetings/${id}`, data);
  return res.data;
};

export const deleteMeeting = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/meetings/${id}`);
  return res.data;
};
