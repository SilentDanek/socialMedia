import { FC, memo } from 'react';
import { UserProfile } from '@/redux';
import { Helmet } from 'react-helmet-async';
import unknownUserSvg from '@/assets/images/unknown-user.svg';

type ProfileInfoProps = {
    profile: UserProfile;
};
export const ProfileInfoMeta: FC<ProfileInfoProps> = memo(
    ({ profile: { lookingForAJob, lookingForAJobDescription, aboutMe, photos, fullName } }) => {
        return (
            <Helmet>
                <title>Profile {fullName}</title>
                <meta
                    name="description"
                    content={`${aboutMe}. Looking for a job: ${lookingForAJob ? 'Yes' : 'No'}. ${
                        lookingForAJob ? lookingForAJobDescription : ''
                    }`}
                />
                <meta
                    name="keywords"
                    content={`profile, ${fullName}, social-network, user profile, contacts, job seeker`}
                />
                <meta property="og:title" content={`${fullName} - Profile on social-network`} />
                <meta
                    property="og:description"
                    content={`${aboutMe}. Looking for a job: ${lookingForAJob ? 'Yes' : 'No'}. ${lookingForAJob ? lookingForAJobDescription : ''}`}
                />
                <meta
                    property="og:image"
                    content={`${photos.large || photos.small || unknownUserSvg}`}
                />
                <meta property="og:url" content="https://example.com/profile/{{userId}}" />
                <meta property="og:type" content="profile" />
            </Helmet>
        );
    }
);
