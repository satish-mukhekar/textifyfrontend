
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center w-full py-4">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-medium tracking-tight">Chat Interface</h1>
        <p className="text-sm text-muted-foreground">Powered by OpenAI API</p>
      </div>
    </header>
  );
};

export default Header;
