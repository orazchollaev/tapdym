import { cva, type VariantProps } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[transform,box-shadow,background-color] duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        // Juicy: reňk ýüz + goýurak aşaky dodak; basylanda aşak gysylýar.
        default:
          "bg-primary text-primary-foreground shadow-[0_4px_0_var(--primary-shadow)] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_1px_0_var(--primary-shadow)]",
        secondary:
          "bg-card text-card-foreground shadow-[0_4px_0_var(--key-shadow)] hover:brightness-[1.03] active:translate-y-[3px] active:shadow-[0_1px_0_var(--key-shadow)]",
        // Oýnuň öz plitka reňkleri — ikinji derejeli hereketler üçin.
        accent:
          "bg-accent text-accent-foreground shadow-[0_4px_0_var(--accent-shadow)] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_1px_0_var(--accent-shadow)]",
        neutral:
          "bg-absent text-absent-foreground shadow-[0_4px_0_var(--absent-shadow)] hover:brightness-105 active:translate-y-[3px] active:shadow-[0_1px_0_var(--absent-shadow)]",
        outline: "border-2 border-border bg-transparent hover:bg-muted text-foreground",
        ghost: "bg-transparent hover:bg-muted text-foreground",
      },
      size: {
        default: "h-11 px-5 py-2",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
