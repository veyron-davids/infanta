import React from 'react'
import Footer from "../components/footer";
import PasswordEditForm from '../components/passwordEditForm';
import ProfileTitle from "../components/profileTitle";
import pass from "../css/profile.module.css";


const PasswordEdit = () => {
    return (
      <div className={pass.address__container}>
        <div>
          <ProfileTitle
            locations="/profile"
            title="Change Your Password"
          />
          <PasswordEditForm/>
        </div>
        <Footer />
      </div>
    );
}

export default PasswordEdit
