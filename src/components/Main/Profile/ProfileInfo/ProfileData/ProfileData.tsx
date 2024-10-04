import { FC, memo } from "react";
import { UserProfile } from "../../../../../redux";
import { Box, List, ListItem, Typography } from "@mui/material";

type ProfileDataProps = {
    profile:UserProfile;
    isOwner:boolean;
    goToEditMode:() => void;
}
export const ProfileData:FC<ProfileDataProps> = memo(({profile}) => {
    return (
        <Box sx={{ mt:2, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h6">
                About me: <Typography variant="body1" component="span" style={{wordBreak: "break-word"}}>{profile.aboutMe}</Typography>
            </Typography>

            <Typography variant="h6">
                Looking for a job: <Typography variant="body1" component="span">{profile.lookingForAJob ? 'Yes' : 'No'}</Typography>
            </Typography>

            {profile.lookingForAJob && (
                <Typography variant="h6">
                    My professional skills: <Typography variant="body1" component="span">{profile.lookingForAJobDescription}</Typography>
                </Typography>
            )}

            <Typography variant="h6">Contacts:</Typography>
            <List>
                {Object.entries(profile.contacts).map(([contactTitle, url]) => (
                    <Contact key={contactTitle} contactTitle={contactTitle} contactValue={url} />
                ))}
            </List>
        </Box>
    );
})


type ContactProps = {
    contactTitle:string;
    contactValue:string | null;
}
const Contact:FC<ContactProps> = ({contactTitle, contactValue}) => {
    return <ListItem disablePadding>
        <b>{contactTitle}</b>:{" "}
        {contactValue
         ? <a href={contactValue} target="_blank" rel="noopener">
                {contactValue}
           </a>
         : contactValue || "..."
        }
    </ListItem>
}