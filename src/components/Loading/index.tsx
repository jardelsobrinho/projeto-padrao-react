import React from 'react';

const Loading: React.FC = () => {
  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden 
    bg-black opacity-75 flex flex-col items-center justify-center"
    >
      <div className="flex items-center justify-center ">
        <div className="w-20 h-20 border-t-4 border-b-4 border-white rounded-full animate-spin" />
      </div>

      <h2 className="mb-4 mt-2 text-center text-white text-xl font-semibold">
        Aguarde...
      </h2>
      <p className="w-1/2 text-center text-white">
        Acessando informações no servidor
      </p>
    </div>
  );
};

export default Loading;
