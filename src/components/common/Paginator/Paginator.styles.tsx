import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

type PaginatorButtonProps = { active?: boolean; }


export const PaginatorButton = styled(Button)<PaginatorButtonProps>(({ active }) => ({
    margin: '0 3px',
    padding: '6px 8px',
    minWidth: '45px',
    fontWeight: 'bold',
    opacity: active ? 1 : 0.75,
    '&:hover': {
        opacity: 1,
    },
}));