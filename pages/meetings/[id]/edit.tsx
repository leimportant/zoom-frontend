'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingByID, updateMeeting } from '@/lib/api';
import { Meeting } from '@/types/meeting';

export default function EditMeetingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [meeting, setMeeting] = useState<Omit<Meeting, 'id' | 'zoom_id'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchMeeting() {
      try {
        const data = await getMeetingByID(id); // pakai getMeeting, bukan getMeetingByID
        setMeeting({
          topic: data.topic,
          agenda: data.agenda,
          start_time: data.start_time,
          duration: data.duration,
        });
      } catch (err) {
        console.error('Failed to load meeting:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMeeting();
  }, [id]);

  const handleUpdate = async (data: Omit<Meeting, 'id' | 'zoom_id'>) => {
    try {
      await updateMeeting(id, data);
      router.push('/');
    } catch (err) {
      alert('Failed to update meeting');
    }
  };

  if (loading) return <div>Loading...</div>;

  return meeting ? (
    <div className="p-6 max-w-3xl mx-auto">
      <MeetingForm initialData={meeting} onSubmit={handleUpdate} />
    </div>
  ) : (
    <div>Meeting not found</div>
  );
}
