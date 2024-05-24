import React from 'react';
import { Link } from 'react-router-dom';
const TermsOfService = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-[#222D7A] w-full font-bold p-4 text-center"></div>
      <iframe
        src="https://henko-ai.com/politica-de-cookies/"
        title="Henko-AI Terms of Service"
        className="w-full h-[80vh] border-none"
      />
      <div className="bg-[#222D7A] text-white flex items-center justify-center h-52 w-full">
        <Link to="/" className="text-white text-lg font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default TermsOfService;
