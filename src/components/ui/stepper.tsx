
import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps, currentStep, onStepClick }, ref) => {
    return (
      <div ref={ref} className="w-full mb-8">
        <div className="flex items-center justify-center">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <div 
                    className={cn(
                      "h-[2px] w-12 sm:w-24 flex-shrink-0", 
                      index <= currentStep ? "bg-app-primary" : "bg-muted-foreground/30"
                    )}
                  />
                )}
                <button
                  type="button"
                  className={cn(
                    "relative flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    isCompleted && "bg-app-primary border-app-primary text-primary-foreground",
                    isCurrent && "border-app-primary text-app-primary",
                    !isCompleted && !isCurrent && "border-muted-foreground/30 text-muted-foreground",
                    onStepClick && "cursor-pointer",
                    !onStepClick && "cursor-default"
                  )}
                  onClick={() => onStepClick && onStepClick(index)}
                  disabled={!onStepClick}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>
                <div className="absolute mt-16 text-center w-24 hidden sm:block">
                  <p 
                    className={cn(
                      "text-xs font-medium",
                      isCurrent && "text-app-primary",
                      isCompleted && "text-app-primary",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export default Stepper;
