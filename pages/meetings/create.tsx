'use client';
import { useRouter } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/api';
import { Meeting } from '@/types/meeting';

export default function CreateMeetingPage() {
  const router = useRouter();

  const handleCreate = async (data: Omit<Meeting, 'id' | 'zoom_id'>) => {
    try {
      await createMeeting(data);
      router.push('/');
    } catch (err) {
      alert('Failed to create meeting');
      console.error(err);
    }
  };

  return (
    <div>
      <MeetingForm onSubmit={handleCreate} />
    </div>
  );
}
