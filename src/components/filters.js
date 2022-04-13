import { DateTimePicker } from '@mui/lab';
import {
  FormControl,
  Grid,
  MenuItem,
  TextField
} from '@mui/material';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// Docs: https://sendbird.com/docs/chat/v3/platform-api/guides/report-content-and-subject#:~:text=report_category
export const REPORT_CATEGORIES = [
  {label: 'All', value: 'all'},
  {label: 'Suspicious', value: 'suspicious'},
  {label: 'Harassing', value: 'harassing'},
  {label: 'Inappropriate', value: 'inappropriate'},
  {label: 'Spam', value: 'spam'},
]

const Filters = ({onDateRangeSelect, onCategorySelect}) => {
  const [dateRange, setDateRange] = useState({from: null, to: null});
  const [category, setCategory] = useState(REPORT_CATEGORIES[0].value);

  useEffect(() => {
    if ((dateRange.from && dateRange.to)
      || (!dateRange.from && !dateRange.to)) {
      onDateRangeSelect(dateRange);
    }
  }, [dateRange.from, dateRange.to])

  useEffect(() => {
    onCategorySelect(category);
  }, [category])

  const now = moment()

  return (
    <Grid container spacing={2} justifyContent="flex-end">
      <Grid item xs={2.5}>
        <DateTimePicker
          clearable
          maxDate={dateRange.to || now}
          label="From"
          value={dateRange.from}
          onChange={_ => setDateRange({...dateRange, from: _})}
          renderInput={props =>
            <TextField {...props} focused={dateRange.from && dateRange.to ? true : undefined} />
          }
        />
      </Grid>
      <Grid item xs={2.5} sx={{mr: 5}}>
        <DateTimePicker
          clearable
          showTodayButton
          minDate={dateRange.from || undefined}
          maxDate={now}
          label="To"
          value={dateRange.to}
          onChange={_ => setDateRange({...dateRange, to: _})}
          renderInput={props =>
            <TextField {...props} focused={dateRange.from && dateRange.to ? true : undefined} />
          }
        />
      </Grid>
      <Grid item xs={2}>
        <FormControl fullWidth>
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            focused={category !== REPORT_CATEGORIES[0].value ? true : undefined}
          >
            {REPORT_CATEGORIES.map(c => (
              <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>
    </Grid>
  )
};

export default Filters;
