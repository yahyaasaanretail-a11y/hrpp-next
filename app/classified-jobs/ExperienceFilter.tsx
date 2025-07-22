'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

interface Experience {
  id: number;
  text: string;
}

export default function ExperienceFilter() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const searchParams = useSearchParams();
  const selectedExperience = searchParams.get('experience') ?? '';

  useEffect(() => {
    fetch('https://admin.hrpostingpartner.com/api/experience')
      .then(res => res.json())
      .then(data => setExperiences(data));
  }, []);

  return (
    <div>
      <p className="font-medium mb-2">Experience Required:</p>
      <select
        name="experience"
        className="w-full border px-2 py-1 rounded text-sm"
        defaultValue={selectedExperience}
      >
        <option value="">-- Select Experience --</option>
        {experiences.map(exp => (
          <option key={exp.id} value={exp.text}>
            {exp.text}
          </option>
        ))}
      </select>
    </div>
  );
}
