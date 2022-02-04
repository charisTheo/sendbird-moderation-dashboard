import React, { useCallback, useEffect, useState } from 'react';
import Filters, { REPORT_CATEGORIES } from '../components/filters';
import PageContainer from '../components/pageContainer';
import ReportsTable from '../components/reportsTable';
import { getLoginDetails } from '../utils';

const PAGINATION = 10

const HomePage = ({ title }) => {
  const auth = getLoginDetails()
  const [reports, setReports] = useState([]);
  const [category, setCategory] = useState(null);
  const [dateRange, setDateRange] = useState({from: null, to: null});
  const [isLoading, setIsLoading] = useState(false);

  const fetchReports = useCallback(async () => {
    if (!auth) {
      return;
    }
    const reportLogs = []
    setIsLoading(true)

    return new Promise((resolve) => {
      async function getReports(_next = '') {
        // Docs: https://sendbird.com/docs/chat/v3/platform-api/guides/report-content-and-subject#2-list-reports
        var url = `https://api-${auth.appId}.sendbird.com/v3/report?limit=${PAGINATION}`
        // filter by datetime range
        if (dateRange.from && dateRange.to) {
          url += `&start_ts=${dateRange.from.valueOf()}&end_ts=${dateRange.to.valueOf()}`
        }
        if (_next) {
          url += `&token=${_next}`
        }
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Api-Token': auth.apiToken }
        })
        const {report_logs, next} = await response.json();
        reportLogs.push(...(report_logs || []));

        if (next) {
          getReports(next)
        } else {
          setIsLoading(false)
          resolve(reportLogs)
        }
      }
      getReports()
    })
  }, [auth]);

  useEffect(() => {
    // Don't do anything if only one of the date ranges is set
    if ((dateRange.from && !dateRange.to) || (!dateRange.from && dateRange.to)) {
      return
    }
    async function fetchReportsAndSetState() {
      setReports(await fetchReports())
    }
    fetchReportsAndSetState()
  }, [dateRange.from, dateRange.to])

  const {user, message, channel} = reports.reduce((acc, curr) => {
    // filter by selected category
    if (category === REPORT_CATEGORIES[0].value || curr.report_category === category) {
      acc[curr.report_type].push(curr)
    }
    return acc
  }, {user: [], message: [], channel: []})

  return (
    <PageContainer title={title}>
      <Filters onDateRangeSelect={setDateRange} onCategorySelect={setCategory} />
      <ReportsTable isLoading={isLoading} type={'user'} data={user} />
      <ReportsTable isLoading={isLoading} type={'message'} data={message} />
      <ReportsTable isLoading={isLoading} type={'channel'} data={channel} />
    </PageContainer>
  );
};

export default HomePage;
