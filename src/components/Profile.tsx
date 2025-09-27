import profileSkeleton from '../assets/profileSkeleton.jpg';
import { useCallback, useEffect, useState } from 'react';
import { getUser, UserProps } from '@/services/user';
import { signOut } from '@/services/auth';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const [userDados, setUserDados] = useState<UserProps>({
    name: '',
    email: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getUser();
      setUserDados(response);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    signOut();
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white z-10">
        <div className="flex justify-end">
          <Button
            onClick={logout}
            className="bg-[#02274F] hover:bg-[#02274F]/90  text-gray-100 rounded-lg m-4 w-40 transition-all"
          >
            Logout
          </Button>
        </div>
      </header>

      <main className="border-4 border-none py-8 px-5 w-[438px] shadow-3xl rounded-3xl">
        <div className="flex flex-col justify-center items-center text-center">
          <h1>Profile picture</h1>

          {loading ? (
            <Loader2 data-testid="loader" className="animate-spin" />
          ) : (
            <img
              className="rounded-lg"
              src={userDados?.avatar ? userDados.avatar.high : profileSkeleton}
              width={100}
              alt="profile image"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex w-full flex-col">
            <Label>
              Your <strong>Name</strong>
            </Label>
            <Input readOnly value={userDados?.name} />
          </div>

          <div className="flex w-full flex-col">
            <Label>
              Your <strong>E-mail</strong>
            </Label>
            <Input readOnly value={userDados?.email} />
          </div>
        </div>
      </main>
    </>
  );
}
