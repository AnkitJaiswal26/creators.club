import {
    AnonAadhaarProof,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
  } from "@anon-aadhaar/react";
import React from "react";
import { useEffect } from "react";
  
  type HomeProps = {
    setUseTestAadhaar: (state: boolean) => void;
    useTestAadhaar: boolean;
  };
  
  
  export default function Home({ setUseTestAadhaar, useTestAadhaar }: HomeProps) {
    // Use the Country Identity hook to get the status of the user.
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();
  
    useEffect(() => {
      if (anonAadhaar.status === "logged-in") {
        console.log(anonAadhaar.status);
      }
    }, [anonAadhaar]);
  
    const switchAadhaar = () => {
      setUseTestAadhaar(!useTestAadhaar);
    };
  
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">

        {/* ADD THE SIGNUP FORM HERE THEN ANON VERIFICATION */}
        <main className="flex flex-col items-center gap-8 bg-white rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
          
          <LogInWithAnonAadhaar fieldsToReveal={["revealAgeAbove18", "revealGender"]} nullifierSeed={1234} />

        </main>
        <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
          {/* Render the proof if generated and valid */}
          {anonAadhaar.status === "logged-in" && (
            <>
              <p>✅ Proof is valid</p>
              <p>Got your Aadhaar Identity Proof</p>
              <>Welcome anon!</>
              {latestProof && (
                <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
              )}
            </>
          )}
        
        </div>
      </div>
    );
  }
  