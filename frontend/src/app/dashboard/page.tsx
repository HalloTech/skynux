import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
// import DashboardContent from './DashboardContent';
import UserProfile from '../user-profile/page';

export default function DashboardPage() {
  const token = cookies().get('token')?.value;

  if (!token) {
    redirect('/login-signup');
  }

  return <UserProfile />;
}