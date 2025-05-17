import React, { useState, useEffect } from 'react';
import { Meeting } from '@/types/meeting';
import styles from '../styles/custome.module.css';

type Props = {
  initialData?: Omit<Meeting, 'id' | 'zoom_id'>;
  onSubmit: (data: Omit<Meeting, 'id' | 'zoom_id'>) => void;
};

// Fungsi convert ISO string ke format datetime-local (local time tanpa detik)
function toDateTimeLocalString(isoString: string) {
  const dt = new Date(isoString);
  const off = dt.getTimezoneOffset();
  const localDate = new Date(dt.getTime() - off * 60 * 1000);
  return localDate.toISOString().slice(0,16); // YYYY-MM-DDTHH:mm
}

export default function MeetingForm({ initialData, onSubmit }: Props) {
  const [topic, setTopic] = useState(initialData?.topic ?? '');
  const [agenda, setAgenda] = useState(initialData?.agenda ?? '');
  const [startTime, setStartTime] = useState(
    initialData?.start_time ? toDateTimeLocalString(initialData.start_time) : ''
  );
  const [duration, setDuration] = useState(initialData?.duration ?? 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Convert kembali ke ISO string UTC sebelum submit
    const isoStartTime = new Date(startTime).toISOString();

    onSubmit({
      topic,
      agenda,
      start_time: isoStartTime,
      duration,
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h1 className={styles.createMeetingTitle}>
        {initialData ? 'Edit Meeting' : 'Create New Meeting'}
      </h1>

      <div className={styles.createMeetingFormGroup}>
        <label className={styles.createMeetingLabel} htmlFor="topic">
          Topic
        </label>
        <input
          id="topic"
          className={styles.createMeetingInput}
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
        />
      </div>

      <div className={styles.createMeetingFormGroup}>
        <label className={styles.createMeetingLabel} htmlFor="agenda">
          Agenda
        </label>
        <textarea
          id="agenda"
          className={styles.createMeetingTextarea}
          value={agenda}
          onChange={e => setAgenda(e.target.value)}
          required
        />
      </div>

      <div className={styles.createMeetingFormGroup}>
        <label className={styles.createMeetingLabel} htmlFor="start_time">
          Start Time
        </label>
        <input
          id="start_time"
          className={styles.createMeetingInput}
          type="datetime-local"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
          required
        />
      </div>

      <div className={styles.createMeetingFormGroup}>
        <label className={styles.createMeetingLabel} htmlFor="duration">
          Duration (minutes)
        </label>
        <input
          id="duration"
          className={styles.createMeetingInput}
          type="number"
          min={15}
          max={180}
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit" className={styles.createMeetingButton}>
        {initialData ? 'Update Meeting' : 'Create Meeting'}
      </button>
    </form>
  );
}
