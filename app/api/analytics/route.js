import { NextResponse } from 'next/server';
import { getUserRole } from '@/lib/auth';

export async function GET(request) {
  const role = await getUserRole();
  if (role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const analyticsEndpoints = {
    "description": "Available analytics endpoints",
    "endpoints": [
      {
        "path": "/api/analytics/dau",
        "description": "Daily Active Users (DAU)"
      },
      {
        "path": "/api/analytics/peak-activity",
        "description": "Peak Time of User Activity"
      },
      {
        "path": "/api/analytics/avg-entries-per-user",
        "description": "Average Entries Per User"
      },
      {
        "path": "/api/analytics/retention",
        "description": "Weekly Retention Cohort Analysis"
      },
      {
        "path": "/api/analytics/churn",
        "description": "User Churn Rate (Proxy)"
      },
      {
        "path": "/api/analytics/stickiness",
        "description": "Stickiness Ratio (DAU / MAU)"
      },
      {
        "path": "/api/analytics/avg-session-duration",
        "description": "Average Session Duration (Proxy)"
      },
      {
        "path": "/api/analytics/new-user-growth",
        "description": "New User Growth Rate"
      },
      {
        "path": "/api/analytics/feature-adoption",
        "description": "Feature Adoption Rate"
      },
      {
        "path": "/api/analytics/power-users",
        "description": "Identifying Power Users"
      }
    ]
  };
  return NextResponse.json(analyticsEndpoints, { status: 200 });
}
