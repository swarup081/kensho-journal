'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Spinner from '@/components/ui/Spinner';
import StatCard from '@/components/admin/StatCard';
import NewUserChart from '@/components/admin/NewUserChart';
import PeakActivityChart from '@/components/admin/PeakActivityChart';
import RetentionHeatmap from '@/components/admin/RetentionHeatmap';

const AdminDashboardPage = () => {
  // All state and hooks must be at the top level
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isFetchingAnalytics, setIsFetchingAnalytics] = useState(true);
  const router = useRouter();

  // Effect for checking the user's role
  useEffect(() => {
    const checkUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/sign-in');
        return;
      }

      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        console.error('Error fetching profile or profile not found:', error);
        setUserRole('user'); // Set to non-admin
      } else {
        setUserRole(profile.role);
      }
      
      setLoading(false);
    };

    checkUserRole();
  }, [router]);

  // Effect for fetching analytics data, dependent on the user role
  useEffect(() => {
    if (userRole === 'admin') {
      const fetchAnalytics = async () => {
        setIsFetchingAnalytics(true);
        const endpoints = [
          'dau', 'peak-activity', 'avg-entries-per-user', 'retention', 
          'churn', 'stickiness', 'avg-session-duration', 'new-user-growth', 
          'feature-adoption', 'power-users'
        ];

        const fetchData = async (endpoint) => {
          const res = await fetch(`/api/analytics/${endpoint}`);
          if (!res.ok) {
            console.error(`Failed to fetch ${endpoint}: ${res.statusText}`);
            return null;
          }
          return res.json();
        };

        try {
          const results = await Promise.all(endpoints.map(fetchData));
          const data = endpoints.reduce((acc, endpoint, index) => {
            acc[endpoint.replace(/-/g, '_')] = results[index];
            return acc;
          }, {});
          setAnalyticsData(data);
        } catch (error) {
          console.error("Error fetching analytics data:", error);
        } finally {
          setIsFetchingAnalytics(false);
        }
      };

      fetchAnalytics();
    } else if (userRole) { // If role is determined and not admin
        setIsFetchingAnalytics(false);
    }
  }, [userRole]);

  // Redirect logic, now safe to run after all hooks have been declared
  useEffect(() => {
    if (!loading && userRole !== 'admin') {
      router.push('/');
    }
  }, [loading, userRole, router]);

  // Conditional rendering at the return statement
  if (loading || userRole !== 'admin') {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full p-4 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="pb-6">
          <h1 className="text-3xl font-bold text-gray-100" style={{ fontFamily: "'Lora', serif" }}>
            Admin Analytics Dashboard
          </h1>
          <p className="text-gray-400 mt-1">
            An overview of user activity and application health.
          </p>
        </header>
        <div className="mt-8">
          {isFetchingAnalytics ? (
            <div className="flex items-center justify-center h-64">
              <Spinner />
            </div>
          ) : analyticsData ? (
            <div className="space-y-6">
              {/* Stat Cards Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Daily Active Users (DAU)" value={analyticsData.dau?.dau ?? 0} />
                <StatCard title="Stickiness (DAU/MAU)" value={`${(analyticsData.stickiness?.stickiness ?? 0).toFixed(1)}%`} />
                <StatCard title="Avg Session Duration" value={`${(analyticsData.avg_session_duration?.avgSessionDuration / 60 ?? 0).toFixed(1)} min`} />
                <StatCard title="Avg Entries Per User" value={(analyticsData.avg_entries_per_user?.avgEntriesPerUser ?? 0).toFixed(2)} />
              </div>
              {/* Stat Cards Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <StatCard title="Churn Rate (30d)" value={`${(analyticsData.churn?.churnRate ?? 0).toFixed(1)}%`} />
                 <StatCard title="Feature Adoption" value={`${(analyticsData.feature_adoption?.adoptionRate ?? 0).toFixed(1)}%`} />
                 <StatCard title="Power Users (>10 entries/mo)" value={analyticsData.power_users?.count ?? 0} />
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <NewUserChart data={analyticsData.new_user_growth} />
                <PeakActivityChart data={analyticsData.peak_activity} />
              </div>

              {/* Full-width Components */}
              <RetentionHeatmap data={analyticsData.retention} />

            </div>
          ) : (
            <p className="text-center text-gray-400">Could not load analytics data.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;