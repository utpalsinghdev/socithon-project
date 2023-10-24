import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export default function classNames(...inputs: string[]) {
    return twMerge(clsx(inputs))
}