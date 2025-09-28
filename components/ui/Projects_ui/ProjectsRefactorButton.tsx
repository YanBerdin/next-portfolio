import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  // Parent: pas d'effet de scale ici (touch-hitbox => shrink sur enfant)
  "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-xs lg:text-sm",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/50 ease-in-out duration-700 origin-center",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 ease-in-out duration-700 origin-center",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground ease-in-out duration-400 origin-center",
        secondary:
          "bg-slate-800 text-secondary-foreground duration-700 origin-center ease-in-out hover:brightness-150",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "max-sm:h-8 h-9 max-sm:px-2 px-4 max-sm:py-1 py-2",
        // sm: "h-9 rounded-md px-3",
        // lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const ProjectsRefactorButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? 'span' : "button"
    return (
      <Comp
        className={cn(
          "group touch-hitbox overflow-hidden", // hitbox stable + group pour focus-visible
          buttonVariants({ variant, size }),
          className
        )}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            // shrink appliqué sur l'enfant pour éviter le tremblement
            "block w-full h-full transition-transform duration-150",
            // animations
            "group-hover:scale-95 group-focus-visible:scale-95",
            // alignement du contenu
            "flex items-center justify-center"
          )}
        >
          {children}
        </span>
      </Comp>
    )
  }
)
ProjectsRefactorButton.displayName = "Button"

export { ProjectsRefactorButton, buttonVariants }