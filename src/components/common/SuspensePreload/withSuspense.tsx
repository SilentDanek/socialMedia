import { FC, Suspense } from 'react';
import { Preloader } from '../Preloader/Preloader';
import { ReactNode } from 'react';
type SuspensePreloadProps = {
    children: ReactNode;
};
export const SuspensePreload: FC<SuspensePreloadProps> = ({ children }) => {
    return <Suspense fallback={<Preloader />}>{children}</Suspense>;
};
