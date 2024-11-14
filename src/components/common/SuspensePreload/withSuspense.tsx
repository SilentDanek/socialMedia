import { FC, Suspense } from 'react';
import { Preloader } from '@components/common';
import { ReactNode } from 'react';
type SuspensePreloadProps = {
    children: ReactNode;
};
export const SuspensePreload: FC<SuspensePreloadProps> = ({ children }) => {
    return <Suspense fallback={<Preloader />}>{children}</Suspense>;
};
