import React, { FC } from "react";
import { UserProfile } from "../../../../../redux";
import { Box, List, ListItem, Typography } from "@mui/material";
import { FieldsetLike, FlexLink, LegendLike } from "./ProfileData.style";
import {
    Facebook,
    GitHub,
    Instagram,
    Language,
    Link as LinkIcon,
    SvgIconComponent,
    Twitter,
    YouTube
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";


export const ProfileData: FC<ProfileDataProps> = ({ profile }) => {
    const MediaIcons = [ Facebook, Language, Twitter, Twitter, Instagram, YouTube, GitHub, LinkIcon];
    const {t} = useTranslation("profile");

    return (
        <Box sx={{ padding: 2  }}>

            <ProfileDetailItem label={t("about me")} content={profile.aboutMe}/>
            <ProfileDetailItem label={t("looking for a job")} content={profile.lookingForAJob? t("tes"): t("no")}/>

            {profile.lookingForAJob
                && <ProfileDetailItem label={t("my professional skills")} content={profile.lookingForAJobDescription}/>
            }

            <FieldsetLike>
                <LegendLike>{t("contacts")}</LegendLike>
                <List disablePadding={true}>
                    {Object.entries(profile.contacts).map(([contactTitle, url], index) => (
                        <Contact key={contactTitle} contactTitle={contactTitle} contactValue={url} MediaIcon={MediaIcons[index]}/>
                    ))}
                </List>
            </FieldsetLike>
        </Box>
    );
};

const ProfileDetailItem: FC<ProfileDetailItemProps> = ({ label, content }) => (
    <Typography
        variant="body1"
        component="div"
        sx={{ wordBreak: "break-word", whiteSpace: "normal" }}
    >
        <b>{label}</b>: {content}
    </Typography>
);

const Contact: FC<ContactProps> = ({ contactTitle, contactValue, MediaIcon}) => {
    return <ListItem disablePadding>
        <b>{contactTitle}</b>:&nbsp;
        {contactValue
            ? <FlexLink href={contactValue} target="_blank" rel="noopener">
                {contactValue.replace("https://", "")}
                <MediaIcon/>
            </FlexLink>
            : "-"
        }
    </ListItem>;
};

type ProfileDataProps = {
    profile: UserProfile;
}

type ProfileDetailItemProps = {
    label: string;
    content: string;
}

type ContactProps = {
    contactTitle: string;
    contactValue: string | null;
    MediaIcon: SvgIconComponent;
}