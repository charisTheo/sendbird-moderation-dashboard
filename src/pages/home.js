import React, { useCallback, useEffect, useState } from 'react';
import PageContainer from '../components/pageContainer';
import ReportsTable from '../components/reportsTable';
import { getLoginDetails } from '../utils';

const PAGINATION = 10

const HomePage = () => {
  const auth = getLoginDetails()
  const [reports, setReports] = useState([]);
  // console.log("🚀 ~ file: home.js ~ line 9 ~ HomePage ~ reports", reports)

  const fetchReports = useCallback(async () => {
    if (!auth) {
      return;
    }
    const reportLogs = []

    return new Promise((resolve) => {
      async function getReports(_next = '') {
        const response = await fetch(`https://api-${auth.appId}.sendbird.com/v3/report?limit=${PAGINATION}&token=${_next}`, {
          method: 'GET',
          headers: { 'Api-Token': auth.apiToken }
        })
        const {report_logs, next} = await response.json();
        reportLogs.push(...(report_logs || []));

        if (next) {
          getReports(next)
        } else {
          resolve(reportLogs)
        }
      }
      getReports()
    })
  }, [auth]);

  useEffect(() => {
    async function fetchReportsAndSetState() {
      setReports(await fetchReports())
    }
    fetchReportsAndSetState()
  }, [])

  const {user, message, channel} = reports.reduce((acc, curr) => {
    acc[curr.report_type].push(curr)
    return acc
  }, {user: [], message: [], channel: []})

  return (
    <PageContainer title='Home page'>
      <ReportsTable type={'user'} data={user} />
      <ReportsTable type={'message'} data={message} />
      <ReportsTable type={'channel'} data={channel} />
    </PageContainer>
  );
};

export default HomePage;
