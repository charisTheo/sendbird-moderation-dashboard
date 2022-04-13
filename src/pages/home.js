import { Link, Alert } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import Filters, { REPORT_CATEGORIES } from '../components/filters';
import PageContainer from '../components/pageContainer';
import ReportsTable from '../components/reportsTable';
import { getAuthHeaders } from '../utils';
import { Link as RouterLink } from 'react-router-dom'

const HomePage = ({ title }) => {
  const [reports, setReports] = useState([]);
  const [category, setCategory] = useState(null);
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    setIsLoading(true)
    var url = `/api/reports`
    // filter by datetime range
    if (dateRange.from && dateRange.to) {
      url += `?start_ts=${dateRange.from.valueOf()}&end_ts=${dateRange.to.valueOf()}`
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    })
    if (response.status === 403) {
      setError(<span>Session Expired. Please <Link component={RouterLink} to="/login">login</Link> again.</span>)
    } else {
      const data = await response.json();
      setReports(data.reports)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Don't do anything if only one of the date ranges is set
    if ((dateRange.from && !dateRange.to)
      || (!dateRange.from && dateRange.to)) {
      return
    }
    fetchReports()
  }, [dateRange.from, dateRange.to])

  const { user, message, channel } = reports.reduce((acc, curr) => {
    // filter by selected category
    if (category === REPORT_CATEGORIES[0].value || curr.report_category === category) {
      acc[curr.report_type].push(curr)
    }
    return acc
  }, { user: [], message: [], channel: [] })

  return (
    <PageContainer title={title}>
      <Alert
        severity="error"
        color="error"
        sx={{ mx: 'auto', my: 2 }}
        style={{ width: 'fit-content', visibility: error ? 'visible' : 'hidden' }}
      >{error}</Alert>

      <Filters onDateRangeSelect={setDateRange} onCategorySelect={setCategory} />
      <ReportsTable isLoading={isLoading} type={'user'} data={user} />
      <ReportsTable isLoading={isLoading} type={'message'} data={message} />
      <ReportsTable isLoading={isLoading} type={'channel'} data={channel} />
    </PageContainer>
  );
};

export default HomePage;
