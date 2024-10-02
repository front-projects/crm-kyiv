interface CustomButton {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button' | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export default function Button({
  children,
  type,
  onClick,
  disabled,
}: CustomButton) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className="p-2 bg-yellow-700 rounded-[24px] px-10 shadow-xl"
    >
      {children}
    </button>
  );
}
