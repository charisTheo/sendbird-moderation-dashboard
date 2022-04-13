import { DateTimePicker } from '@mui/lab';
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const ProfanityFilters = ({ onDateSelect }) => {
  const [date, setDate] = useState(null);
  const [timeline, setTimeline] = useState('before')

  const now = moment()

  useEffect(() => {
    if (date) {
      onDateSelect({ value: date, timeline })
    }
  }, [date, timeline])

  return (
    <>
      <DateTimePicker
        clearable
        maxDateTime={now}
        maxDate={now}
        label="From"
        value={date}
        onChange={d => setDate(d)}
        renderInput={props =>
          <TextField {...props} focused={date ? true : undefined} />
        }
      />
      <FormControl sx={{ pl: 2 }}>
        <RadioGroup
          title='Messages sent'
          defaultValue="before"
          value={timeline}
          onChange={e => setTimeline(e.target.value)}
        >
          <FormControlLabel
            value="before"
            control={<Radio />}
            label="Before"
          />
          <FormControlLabel
            value="after"
            control={<Radio />}
            label="After"
            disabled={date?.valueOf() >= now.valueOf() - (60 * 1000)}
          />
        </RadioGroup>
      </FormControl>
    </>
  )
};

export default ProfanityFilters;
