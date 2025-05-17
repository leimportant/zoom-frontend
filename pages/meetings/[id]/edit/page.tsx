'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import MeetingForm from '@/components/MeetingForm';
import { getMeetingByID, updateMeeting } from '@/lib/api'; // pastikan fungsi ini ada
import { Meeting } from '@/types/meeting';

export default function EditMeetingPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // pastikan id ada dan string

  const [meeting, setMeeting] = useState<Omit<Meeting, 'id' | 'zoom_id'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchMeeting() {
      try {
        const data = await getMeetingByID(id);
        setMeeting({
          topic: data.topic,
          agenda: data.agenda,
          start_time: data.start_time,
          duration: data.duration,
        });
      } catch (error) {
        alert('Failed to load meeting');
        router.push('/'); // redirect kalau gagal load
      } finally {
        setLoading(false);
      }
    }
    fetchMeeting();
  }, [id, router]);

  const handleUpdate = async (data: Omit<Meeting, 'id' | 'zoom_id'>) => {
    try {
      await updateMeeting(id, data);
      router.push('/');
    } catch (error) {
      alert('Failed to update meeting');
      console.error(error);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (!meeting) return <div>Meeting not found</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <MeetingForm initialData={meeting} onSubmit={handleUpdate} />
    </div>
  );
}
