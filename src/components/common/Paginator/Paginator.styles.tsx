import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

type PaginatorButtonProps = { active?: boolean; }

// Отдельный компонент для стилизованных кнопок пагинатора
export const PaginatorButton = styled(Button)<PaginatorButtonProps>(({ active }) => ({
    margin: '0 3px',
    padding: '6px 8px',
    minWidth: '45px',
    fontWeight: 'bold',
    opacity: active ? 1 : 0.75, // Определяем прозрачность на основе свойства `active`
    '&:hover': {
        opacity: 1, // При наведении всегда полная непрозрачность
    },
}));