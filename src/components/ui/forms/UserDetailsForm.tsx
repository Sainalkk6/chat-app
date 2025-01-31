"use client";

import { personalDetailsSchema } from "@/schema/personalDetailsSchema";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Button from "../Button";
import TextField from "../TextField";
import { useAuth } from "@/providers/AuthContextProvider";

interface PersonalForm {
  uid: string;
  email: string;
  photoUrl: string | null;
}

const PersonalForm = ({ uid, email, photoUrl }: PersonalForm) => {
  const router = useRouter();

  const { handleBlur, handleChange, handleSubmit, isSubmitting, values, errors, touched, setFieldValue } = useFormik({
    initialValues: {
      username: "",
      email,
      phone: "",
      imageUrl: "",
    },
    onSubmit: async (values) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-user/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: values.username,
          phoneNumber: values.phone,
          photoURL: values.imageUrl ?? photoUrl,
          email: values.email,
          uid,
        }),
      });

      if (response.ok) {
        router.push("/");
        Cookies.set("user", JSON.stringify({ username: values.username, email: values.email, avatar: values.imageUrl }), { expires: 1, path: "/", sameSite: "Lax" });
      }
    },
    validationSchema: personalDetailsSchema,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue("imageUrl", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderFormFields = () => {
    return (
      <div className="flex flex-col gap-9 w-full">
        <div className="flex items-center gap-12 w-full justify-center">
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="username" label="Username" isPassword={false} login={false} name="username" touched={touched.username ?? false} type="text" error={errors.username} value={values.username} />
        </div>
        <div className="flex items-center gap-12 w-full justify-center">
          <TextField isReadOnly handleBlur={handleBlur} handleChange={handleChange} id="email" label="Email" isPassword={false} login={false} name="email" touched={touched.email ?? false} type="text" value={values.email} />
          <TextField handleBlur={handleBlur} handleChange={handleChange} id="phone" label="Phone Number" isPassword={false} login={false} name="phone" touched={touched.phone ?? false} type="text" value={values.phone} error={errors.phone} />
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-11 w-full items-start">
      <div className="relative ">
        <input type="file" className="cursor-pointer absolute top-1 w-full h-36 opacity-0 rounded-full" onChange={handleFileChange} id="imageUrl" name="imageUrl" />
        {values.imageUrl === "" ? <img src="/svg/avatar.svg" alt="" /> : <img src={`${values.imageUrl}`} className="w-[150px] h-36 rounded-full object-cover object-center" />}
      </div>
      {renderFormFields()}
      <Button disabled={isSubmitting ? true : false} label={`${isSubmitting ? "Hold on" : "Create an account"}`} type="submit" className="bg-black text-white" />
    </form>
  );
};

export default PersonalForm;
