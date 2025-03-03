
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-full py-6 px-4 md:px-8">
      <div className="flex-1"></div>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Donatuz x 0G.ai</h1>
        <p className="text-sm text-muted-foreground mt-1">Powered by OpenAI API</p>
      </div>
      <div className="flex-1 flex justify-end">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Header;
