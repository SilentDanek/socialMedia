import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type FieldsetProps = {
    children?: ReactNode;
}

export const Fieldset: FC<FieldsetProps> = ({ children }) => {
    return <Box component={"fieldset"} sx={{ listStyle: "none", padding: "0 3%", margin: 0 }}>
        {children}
    </Box>;
};