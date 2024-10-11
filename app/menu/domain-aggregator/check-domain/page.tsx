'use client';

import { useState } from 'react';
import { checkDomain } from '../requests';
import { MagnifyingGlass } from 'react-loader-spinner';
import LockedInfo from '@/components/domain-aggregator/LockedInfo';
import FreeInfo from '@/components/domain-aggregator/FreeInfo';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

export default function CheckDomain() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<boolean | 'free' | 'locked' | 'error'>(
    false,
  );
  const [domain, setDomain] = useState('');

  const checkHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (domain !== '') {
      setLoading(true);
      setStatus(false);

      try {
        const response = await checkDomain(domain);
        if (typeof response === 'boolean') {
          setStatus(response ? 'free' : 'locked');
        } else {
          console.error('Unexpected response from checkDomain:', response);
          setStatus('error');
        }
      } catch (error) {
        console.error('Error checking domain:', error);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col items-center">
      <form
        className="flex gap-4 items-center max-sm:flex-col"
        onSubmit={checkHandler}
      >
        <TextField
          onChange={(e) => {
            if (typeof status !== 'boolean') {
              setStatus(false);
            }
            setDomain(e.target.value);
          }}
          value={domain}
          placeholder="Enter your domain"
          className="w-[600px] max-sm:w-[90vw] text-center"
          color="secondary"
          variant="outlined"
          sx={{
            width: '100%',
            border: 'white',
            marginTop: '10px',
            '& .MuiInputBase-input': {
              color: 'white', // колір тексту
            },
            '& .MuiInputLabel-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              color: 'gray', // колір лейбла
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'purple',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'purple', // колір обводки при фокусі
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ height: '100%' }}
        >
          Check
        </Button>
      </form>
      {loading && (
        <div className="mt-10">
          <MagnifyingGlass glassColor="" color="yellow" />
        </div>
      )}
      {status == 'free' && <FreeInfo domain={domain} />}
      {status == 'locked' && <LockedInfo />}
    </div>
  );
}
