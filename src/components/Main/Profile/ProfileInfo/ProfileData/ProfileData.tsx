import {FC, memo} from "react";
import {UserProfile} from "../../../../../redux"

type ProfileDataProps = {
    profile:UserProfile;
    isOwner:boolean;
    goToEditMode:() => void;
}
export const ProfileData:FC<ProfileDataProps> = memo(({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>}
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>:
            <ul>
                {Object.entries(profile.contacts).map(([key, value]) => {
                    return <Contact key={key} contactTitle={key} contactValue={value}/>
                })}
            </ul>
        </div>
    </div>
})


type ContactProps = {
    contactTitle:string;
    contactValue:string | null;
}
const Contact:FC<ContactProps> = ({contactTitle, contactValue}) => {
    return <li key={contactTitle}><b>{contactTitle}</b>: {contactValue}</li>
}