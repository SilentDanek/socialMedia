import { FC } from "react";
import { Skeleton } from "@mui/lab";
import { StyledUserCard, UserCardActions, UserCardContent } from "./UserCard.styles";

export const UserCardSkeleton: FC = () => {
    return (
        <StyledUserCard>
            <Skeleton variant="circular" width={100} height={100} />

            <UserCardContent sx={{ flexGrow: 1, flexBasis: "200px" }}>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
            </UserCardContent>

            <UserCardActions>
                <Skeleton variant="rectangular" width={100} height={30} />
                <Skeleton variant="rectangular" width={100} height={30} />
            </UserCardActions>
        </StyledUserCard>
    );
};

