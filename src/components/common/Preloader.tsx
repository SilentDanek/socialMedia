import svgPreloader from "../../assets/images/bouncing-circles.svg";
import { FC } from "react";

export const Preloader: FC = () => {
    return <img src={svgPreloader} alt={"preloader"} style={{height:"100%"}}/>;
};
