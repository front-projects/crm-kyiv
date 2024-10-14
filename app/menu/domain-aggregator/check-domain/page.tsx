'use client';

import { useState } from 'react';
import { checkDomain } from '../requests';
import { MagnifyingGlass } from 'react-loader-spinner';
import LockedInfo from '@/components/domain-aggregator/LockedInfo';
import FreeInfo from '@/components/domain-aggregator/FreeInfo';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

export default function CheckDomain() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<boolean | 'free' | 'locked' | 'error'>(
    false,
  );
  const [domain, setDomain] = useState('');
  const [saleDomain,setSaleDomain] = useState<string>('.xyz');

  const checkHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (domain !== '') {
      setLoading(true);
      setStatus(false);

      try {
        const response = await checkDomain(domain + saleDomain);
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
    <div className="flex flex-col w-full items-center">
      <h1 className='text-xl py-4 text-center'>Search for any domain ending with <span className='text-gray-400'>{saleDomain}</span> TLD</h1>
      <form
        className="flex w-full gap-4 items-center max-sm:flex-col"
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
          color="secondary"
          variant="outlined"
          onKeyDown={(e) => {
            if (e.key === '.') {
              e.preventDefault();
            }
          }}
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <div className='bg-gray-900/90 text-white rounded-md p-2'>{saleDomain}</div>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{ height: 'max-content' }}
        >
          Check
        </Button>
      </form>
      {loading && (
        <div className="mt-10">
          <MagnifyingGlass glassColor="" color="yellow" />
        </div>
      )}
      {status == 'free' && <FreeInfo domain={domain + saleDomain} />}
      {status == 'locked' && <LockedInfo />}
    </div>
  );
}
