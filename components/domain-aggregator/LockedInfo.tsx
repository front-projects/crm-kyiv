import { IoMdLock } from 'react-icons/io';

export default function LockedInfo() {
  return (
    <div className="flex items-center gap-2 mt-10 text-red-600 text-[24px] px-10 text-center">
      <p>
        This domain is already occupied by someone, or unavailable for purchase
      </p>
      <div>
        <IoMdLock />
      </div>
    </div>
  );
}
