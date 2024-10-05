import svgPreloader from "../../../assets/images/bouncing-circles.svg";
import { FC } from "react";
import { Stack } from "@mui/material";

export const Preloader: FC = () => {
    return <Stack height={"100%"} justifyContent={"center"} alignItems={"center"}>
        <img src={svgPreloader} alt={"preloader"} style={{height:"50%"}}/>;
    </Stack>
};
