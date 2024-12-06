"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
    "text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    {
        variants: {
            variant: {
                default: "text-foreground text-base",
                small: "text-muted-foreground text-sm",
                bold: "text-foreground font-bold text-base",
                heading: "text-foreground font-bold text-2xl",
                headingLarge: "text-foreground font-bold text-5xl",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Label = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
        VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
    <LabelPrimitive.Root
        ref={ref}
        className={cn(labelVariants({ variant, className }))}
        {...props}
    />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
