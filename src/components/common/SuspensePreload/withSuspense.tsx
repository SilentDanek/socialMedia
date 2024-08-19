import React, {Suspense} from "react";
import {Preloader} from "../Preloader/Preloader";

export function SuspensePreload({children}:any) {
    return (<Suspense fallback={<Preloader/>}>
        {children}
    </Suspense>);
}