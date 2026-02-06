"use client";

import ProviderRegistrationForm from "@/components/forms/ProviderRegistrationForm";
import NavbarForm from "@/components/navigation/NavbarForm";
import { useState } from "react";

export default function RegisterPage() {
  const [formState, setFormState] = useState<{
    isSuccess: boolean;
    currentStep: number;
    totalSteps: number;
    canGoBack: boolean;
    isSubmitting: boolean;
  }>({
    isSuccess: false,
    currentStep: 0,
    totalSteps: 7,
    canGoBack: false,
    isSubmitting: false,
  });

  const [navigationHandlers, setNavigationHandlers] = useState<{
    onNext: () => void;
    onBack: () => void;
  }>({
    onNext: () => {},
    onBack: () => {},
  });

  return (
    <>
      {!formState.isSuccess && (
        <NavbarForm
          onNext={navigationHandlers.onNext}
          onBack={navigationHandlers.onBack}
          canGoBack={formState.canGoBack}
          canGoNext={formState.currentStep < formState.totalSteps - 1}
          isLastStep={formState.currentStep === formState.totalSteps - 1}
          isSubmitting={formState.isSubmitting}
        />
      )}
      <ProviderRegistrationForm
        onStateChange={setFormState}
        onNavigationHandlersChange={setNavigationHandlers}
      />
    </>
  );
}
