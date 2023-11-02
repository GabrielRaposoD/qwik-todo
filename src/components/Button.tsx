import { type ButtonHTMLAttributes, component$, Slot } from "@builder.io/qwik";
import { cn } from "~/utils/cn";

const Button = component$<ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ class: classNames, ...props }) => {
    return (
      <button class={cn("btn", classNames)} {...props}>
        <Slot />
      </button>
    );
  },
);

export default Button;
