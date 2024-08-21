import {memo} from "react";

export const ProfileData = memo(({profile, isOwner, goToEditMode}: any) => {

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

const Contact = ({contactTitle, contactValue}: any) => {
    return <li /*className={s.contact}*/><b>{contactTitle}</b>: {contactValue}</li>
}