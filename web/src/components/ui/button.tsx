import type { ComponentProps } from "react";
import { tv, type VariantProps } from 'tailwind-variants'
import { Slot } from '@radix-ui/react-slot';

const buttonVariants = tv({
  base: 'cursor-pointer text-zinc-400 rounded-lg hover:text-zinc-100 hover:bg-zinc-800 disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none',

  variants: {
    size: {
      default: 'px-3 py-2',
      icon: 'p-2',
      'icon-sm': 'p-1'
    }
  },

  defaultVariants: {
    size: 'default'
  }
})

type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & {
  asChild?: boolean
}

export function Button({ size, className, ...props }: ButtonProps) {
  const Component = props.asChild ? Slot : 'button'

  return (
    <Component className={buttonVariants({ size, className })} {...props} />
  )
}