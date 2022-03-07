import { DateTimePicker } from '@mui/lab';
import {
  FormControl,
  Grid,
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
      onDateSelect({value: date, timeline})
    }
  }, [date, timeline])

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={4}>
        <FormControl>
          <RadioGroup
            row
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
    </Grid>
  )
};

export default ProfanityFilters;
