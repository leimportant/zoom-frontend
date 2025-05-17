'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getMeetingViewByID } from '@/lib/api';
import { MeetingView } from '@/types/meeting';
import MeetingFormView from '@/components/MeetingsFormView'; // import komponen

export default function MeetingDetailPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [meetingView, setMeeting] = useState<MeetingView | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getMeetingViewByID(id)
      .then((data) => {
        const mappedMeeting: MeetingView = {
          id: data.id,
          zoom_id: data.zoom_id,
          topic: data.topic,
          agenda: data.agenda ?? null,
          start_time: data.start_time,
          duration: data.duration,
          join_url: data.join_url ?? '',
          start_url: data.start_url ?? '',
        };
        setMeeting(mappedMeeting);
      })
      .catch((err) => console.error('Failed to fetch:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!meetingView) return <p>Meeting not found.</p>;

  return (
    <div>
      <MeetingFormView meeting={meetingView} />
    </div>
  );
}
