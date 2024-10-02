import NavItem from './Nav-Item';

export default function Navigation() {
  return (
    <header className="w-full flex items-center h-[60px] justify-center border-b-2 border-gray-400/40">
      <nav className="flex gap-4">
        <NavItem to={'/domain-aggregator'}>Domain aggregator</NavItem>
        <NavItem to={'/test'}>Test Function</NavItem>
      </nav>
    </header>
  );
}
