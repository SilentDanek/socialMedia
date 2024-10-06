import { NavLink } from "react-router-dom";
import unknownUserSVG from "../../../../assets/images/unknown-user.svg";
import { TUser } from "../../../../redux";
import { FC } from "react";
import { Button, CardMedia, Typography } from "@mui/material";
import { Skeleton } from "@mui/lab";
import { StyledUserCard, UserCardActions, UserCardContent } from "./UserCard.styles";


type UserCardProps = {
    user: TUser;
    follow: (id: number) => void;
    unfollow: (id: number) => void;
    followingInProgress: number[];
    isLoading: boolean
};
export const UserCard: FC<UserCardProps> = ({
                                                user,
                                                follow,
                                                unfollow,
                                                followingInProgress,
                                                isLoading
                                            }) => {

    const handleFollowBlock = () => followingInProgress.some((id: number) => id === user.id);
    const handleFollow = () => {
        if (user.followed) {
            unfollow(user.id);
        } else {
            follow(user.id);
        }
    };

    return (
        <StyledUserCard>
            <NavLink to={`/profile/${user.id}`}>
                {isLoading ? (
                    <Skeleton variant="circular" width={100} height={100} />
                ) : (
                <CardMedia
                    component="img"
                    image={user.photos.large || unknownUserSVG}
                    alt="user photo"
                    sx={{ width: 100, height: 100, borderRadius: "50%" }}
                />)}
            </NavLink>

            <UserCardContent sx={{ flexGrow: 1, flexBasis: "200px" }}>
                {isLoading ? (
                    <>
                        <Skeleton width="60%" />
                        <Skeleton width="80%" />
                    </>
                ) : (
                    <>
                        <Typography variant="h6" component="div">
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.status || "No status available"}
                        </Typography>
                    </>
                )}
            </UserCardContent>

            <UserCardActions>
                {isLoading ? (
                    <>
                        <Skeleton variant="rectangular" width={100} height={30} />
                        <Skeleton variant="rectangular" width={100} height={30} />
                    </>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color={user.followed ? "error" : "primary"}
                            size="small"
                            sx={{width:"100px"}}
                            onClick={handleFollow}
                            disabled={handleFollowBlock()}
                        >
                            {user.followed ? "Unfollow" : "Follow"}
                        </Button>
                        <Button variant="contained" color="secondary" size="small" sx={{width:"100px"}}>
                            Message
                        </Button>
                    </>
                )}
            </UserCardActions>
        </StyledUserCard>
    );
};

