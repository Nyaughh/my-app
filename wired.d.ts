import { FC } from "react";

declare module 'wired-elements-react' {
    export const WiredCard: FC<{ children?: React.ReactNode, className?: string, fill?: string, elevation?: number, padding?: number, mode?: string, shape?: string, onClick?: (e: Event) => void }>
}