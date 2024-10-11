'use client';

import { Button } from '@mui/material';
import NavItem from './Nav-Item';
import { deleteSesssion } from '@/app/login/requests';

export default function Navigation() {
  const handleExit = async () => {
    await deleteSesssion();
  };

  return (
    <header className="w-full flex items-center h-[60px] justify-between px-10 border-b-2 border-gray-400/40">
      <nav className="flex gap-4">
        <NavItem to={'/menu/domain-aggregator'}>Domain aggregator</NavItem>
        <NavItem to="/menu/url-builder">Url builder</NavItem>
        {/* <NavItem to={'/test'}>Test Function</NavItem> */}
      </nav>
      <Button
        variant="contained"
        onClick={() => handleExit()}
        color="secondary"
      >
        Exit
      </Button>
    </header>
  );
}
