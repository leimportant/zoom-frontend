'use client';
import { useEffect, useState } from 'react';
import { getMeetings, deleteMeeting } from '@/lib/api';
import { Meeting } from '@/types/meeting';
import Link from 'next/link';

export default function HomePage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    getMeetings().then(setMeetings);
  }, []);

 const handleDelete = async (id: string) => {
  const confirmDelete = confirm('Are you sure you want to delete this meeting?');

  if (!confirmDelete) return;

  try {
    await deleteMeeting(id);
    setMeetings(meetings.filter((m) => m.id !== id));
  } catch (err: any) {
    console.error('Delete error:', err);

    // Jika respons dari API adalah JSON, dan punya message/error
    let errorMessage = 'Failed to delete meeting';
    if (err?.response?.data?.error) {
      errorMessage = err.response.data.error;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    alert(errorMessage);
  }
};


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Zoom Meetings</h1>
      <Link
        href="/meetings/create"
        className="inline-block mb-6 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        + New Meeting
      </Link>
      {meetings.length === 0 ? (
        <p className="text-gray-600">No meetings found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="bg-white p-5 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
               <Link
                  href={`/meetings/${meeting.id}/view`}
                  className="text-green-600 hover:text-green-800 font-medium"
                > <h2 className="text-xl font-semibold mb-2 text-gray-800">{meeting.topic}</h2></Link>
                <p className="text-sm text-gray-500 mb-1">
                  {new Date(meeting.start_time).toLocaleString()} &bull; {meeting.duration} min
                </p>
               
                  
                 {meeting.agenda && (
                  <p className="text-gray-600 mb-4 line-clamp-3">{meeting.agenda}</p>
                )}
               </div>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  href={`/meetings/${meeting.id}/edit`}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Edit
                </Link>
                
                <button
                  onClick={() => handleDelete(meeting.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                  aria-label={`Delete meeting ${meeting.topic}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
