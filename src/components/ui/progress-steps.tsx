'use client';

import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface Step {
    id: string;
    label: string;
    status: 'pending' | 'loading' | 'completed' | 'error';
}

interface ProgressStepsProps {
    steps: Step[];
    currentStep?: string;
    className?: string;
}

export function ProgressSteps({ steps, currentStep, className = '' }: ProgressStepsProps) {
    const getStepIcon = (step: Step) => {
        switch (step.status) {
            case 'completed':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'loading':
                return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
            case 'error':
                return <Circle className="w-5 h-5 text-red-600" />;
            default:
                return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    const getStepTextColor = (step: Step) => {
        switch (step.status) {
            case 'completed':
                return 'text-green-600';
            case 'loading':
                return 'text-blue-600';
            case 'error':
                return 'text-red-600';
            default:
                return 'text-gray-500';
        }
    };

    return (
        <div className={`space-y-3 ${className}`}>
            {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                        {getStepIcon(step)}
                    </div>
                    <div className="flex-1">
                        <p className={`text-sm font-medium ${getStepTextColor(step)}`}>
                            {step.label}
                        </p>
                        {step.status === 'loading' && (
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                <div className="bg-blue-600 h-1.5 rounded-full animate-pulse" style={{ width: '60%' }} />
                            </div>
                        )}
                    </div>
                    {index < steps.length - 1 && (
                        <div className="w-px h-8 bg-gray-200 ml-2" />
                    )}
                </div>
            ))}
        </div>
    );
}
