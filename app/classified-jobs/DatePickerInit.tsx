'use client';

import { useEffect } from 'react';
import 'litepicker/dist/css/litepicker.css';

export default function DatePickerInit() {
  useEffect(() => {
    const Litepicker = require('litepicker').default;

    const picker = new Litepicker({
      element: document.getElementById('date-range'),
      singleMode: false,
      numberOfMonths: 2,
      numberOfColumns: 2,
      dropdowns: {
        minYear: 2022,
        maxYear: new Date().getFullYear(),
        months: true,
        years: true,
      },
      setup: (picker: any) => {
        picker.on('selected', (start: any, end: any) => {
          (document.getElementById('start-date') as HTMLInputElement).value = start.format('YYYY-MM-DD');
          (document.getElementById('end-date') as HTMLInputElement).value = end.format('YYYY-MM-DD');
        });
      },
    });
  }, []);

  return null;
}
