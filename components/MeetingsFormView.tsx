import React from 'react';
import { MeetingView } from '@/types/meeting';
import styles from '../styles/custome.module.css';

type MeetingFormViewProps = {
  meeting: MeetingView;
};

export default function MeetingFormView({ meeting }: MeetingFormViewProps) {
  return (
    <div className={`${styles.container} max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg`}>
      <h1 className={`${styles.title} text-2xl font-bold mb-6`}>{meeting.topic}</h1>

      <div className={styles.section}>
        <p className="text-sm text-gray-500">Agenda:</p>
        <p>{meeting.agenda || '-'}</p>
      </div>

      <div className={styles.section}>
        <p className="text-sm text-gray-500">Start Time:</p>
        <p>{new Date(meeting.start_time).toLocaleString()}</p>
      </div>

      <div className={styles.section}>
        <p className="text-sm text-gray-500">Duration:</p>
        <p>{meeting.duration} minutes</p>
      </div>

      <div className={styles.section}>
        <p className="text-sm text-gray-500">Join URL:</p>
        <a
          href={meeting.join_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {meeting.join_url}
        </a>
      </div>

      <div className={styles.section}>
        <p className="text-sm text-gray-500">Start URL (for host):</p>
        <a
          href={meeting.start_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {meeting.start_url}
        </a>
      </div>
    </div>
  );
}
