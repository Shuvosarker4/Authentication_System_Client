import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import ProfileForm from "./ProfileForm";
import PasswordChangeForm from "./PasswordChangeForm";
import ProfileButtons from "./ProfileButtons";
import SuccessMessageAlert from "../SuccessMessage/SuccessMessageAlert";
import ErrorMessageAlert from "../ErrorMessage/ErrorMessageAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { user, updateUserProfile, changePassword, errorMsg } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (user && typeof user === "object") {
      Object.keys(user).forEach((key) => setValue(key, user[key]));
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      // Profile update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      const response = await updateUserProfile(profilePayload);
      if (response.success) {
        setSuccessMsg(response.message);
      }
      // Password Change
      if (data.current_password && data.new_password) {
        const response = await changePassword({
          current_password: data.current_password,
          new_password: data.new_password,
        });
        if (response.success) {
          setSuccessMsg(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErrorMessageAlert error={errorMsg} />}
        {successMsg && (
          <SuccessMessageAlert message={successMsg}></SuccessMessageAlert>
        )}
        <h2 className="card-title text-2xl mb-4">Profile Information</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <PasswordChangeForm
            errors={errors}
            register={register}
            isEditing={isEditing}
            watch={watch}
          />

          <ProfileButtons
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
