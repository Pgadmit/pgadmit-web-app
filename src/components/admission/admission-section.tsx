'use client';

import { useAdmissionForm } from '@/hooks/use-admission-form';
import { AdmissionSectionContent } from '@/components/admission/admission-section-content';

export const AdmissionSection = () => {
  const {
    form,
    onSubmit,
    isPending,
    errorMessage,
    loading,
    universities,
    isOpenAILimited,
  } = useAdmissionForm();

  return (
    <section className='bg-gradient-to-b from-muted/20 to-background'>
      <div className='container mx-auto px-4 sm:px-6 max-w-7xl'>
        <div className='text-center mb-12 md:mb-16'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-foreground leading-tight'>
            Get Your Personalized University Matches 🎯
          </h2>
          <p className='text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Fill out our smart form and get AI-powered university suggestions
            tailored to your profile, budget, and preferences.
          </p>
        </div>

        <AdmissionSectionContent
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          errorMessage={errorMessage}
          loading={loading}
          universities={universities}
          isOpenAILimited={isOpenAILimited}
        />
      </div>
    </section>
  );
};
