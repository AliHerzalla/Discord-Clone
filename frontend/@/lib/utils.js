import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// cn is going to help us create dynamic classes inside tailwind ,
// we can use cn and clsx to create conflicting classes instead of writing our own complicated util

/* 
//* TODELETE just a reminder , how we can use cn in our component 
const state = true;
<Button className={cn("bg-amber-200" , state && "bg-red-900")}>Click Me</Button>
*/
