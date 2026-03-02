import { useDispatch, useSelector } from 'react-redux';
import { verifyLinkedIn } from '@/store/authSlice';
import { Button } from '@/components/ui/button';

import SettingsPage from '@/components/settings/SettingsPage';

const Settings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLinkedInConnection = () => {
    dispatch(verifyLinkedIn());
  };
  return (
    <section className='grow flex justify-center items-center flex-col gap-2.5'>
      <h2 className='font-medium text-2xl'><SettingsPage /></h2>
      <div>
        LinkedIn Status:{' '}
        <span className={user.isVerified ? 'text-green-600' : 'text-red-600'}>
          {user.isVerified ? 'Verified' : 'Not Verified'}
        </span>
      </div>

      {!user.isVerified && (
        <Button onClick={handleLinkedInConnection}>Connect LinkedIn</Button>
      )}
    </section>
  );
};

export default Settings;
