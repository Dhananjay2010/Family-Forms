import React, { useState } from "react";
import { FirstStep } from "./FirstStep";
import { SecondStep } from "./SecondStep";

export const FamilyInfo = () => {
  const [formData, setFormData] = useState(null);
  const [stepsComplete, setStepsComplete] = useState(false);
  const handleFirstStepSubmit = (data) => {
    setFormData({ ...data });
  };

  const handleSecondStepSubmit = (data) => {
    // Submit the final form data
    const prevData = { ...formData };
    setFormData({ prevData, ...data });
    setStepsComplete(true);
  };

  const DisplayData = (listingData = {}) => {
    return (
      <div>
        {[...Object.entries(listingData)].map((value, index) => {
          return (
            <>
              <div style={{ marginBottom: 20, marginTop : 20 }}>Family {index + 1}</div>
              {[...Object.entries(value[1])].map((mainValue) => {
                return (
                  <>
                    <div key={mainValue[0]}>
                      <strong>{mainValue[0]}:</strong> {mainValue[1]}
                    </div>
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {!stepsComplete && (
        <div>
          {!formData && <FirstStep onSubmit={handleFirstStepSubmit} />}
          {formData && <SecondStep onSubmit={handleSecondStepSubmit} />}
        </div>
      )}

      {formData && stepsComplete && DisplayData(formData)}
      {stepsComplete && <h1>Success</h1>}
    </>
  );
};
