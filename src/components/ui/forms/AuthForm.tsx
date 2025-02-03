"use client";

import { useAuth } from "@/providers/AuthContextProvider";
import { loginSchema } from "@/schema/login.schema";
import { signupSchema } from "@/schema/signup.schema";
import { auth, db } from "@/utils/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../Button";
import TextField from "../TextField";

const initialValues = {
  email: "",
  password: "",
};

interface FormInterface {
  title: string;
  isLogin: boolean;
  subtitle: string;
  subtitleLink: string;
  buttonLabel: string;
}

const FormContainer = ({ buttonLabel, isLogin, subtitle, title, subtitleLink }: FormInterface) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth() ?? {};
  const [disabled, setDisabled] = useState(true);

  const handleSignUp = async (email: string, password: string) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
      });

      return response;
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.message.includes("email-already-in-use")) setError("User already exists");
      } else {
        setError("Something went wrong please");
      }
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setError("");
      return response;
    } catch (error) {
      setError("Inavild Credentials");
    }
  };

  const { touched, handleBlur, errors, handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      Cookies.set("auth", `${process.env.NEXT_PUBLIC_CUSTOM_COOKIE}`);
      try {
        const response = isLogin ? await handleSignIn(values.email, values.password) : await handleSignUp(values.email, values.password);
        if (response) {
          isLogin ? router.push("/") : router.push("/profile");
        }
      } catch (error: any) {
        return error.message;
      }
    },
    validationSchema: isLogin ? loginSchema : signupSchema,
  });

  const handleClick = async () => {
    try {
      if (signIn) {
        await signIn();
        Cookies.set("auth", `${process.env.NEXT_PUBLIC_CUSTOM_COOKIE}`);
        isLogin ? router.push("/") : router.push("/profile");
      }
    } catch (error: any) {
      return error.message;
    }
  };

  useEffect(() => {
    const allFieldsFilled = isLogin ? values.email.length > 0 && values.password.length > 0 : values.email.length > 0 && values.password.length > 0;
    const noErrors = isLogin ? !errors.email && !errors.password : !errors.email && !errors.password;
    setDisabled(!(allFieldsFilled && noErrors));
  }, [values, errors]);

  const renderUnderlinedText = (label: string) => <span className="text-text-dark underline">{label}</span>;

  const renderFormHeader = () => {
    return (
      <div className="flex flex-col justify-center lg:items-center">
        <h1 className="text-default-text-color text-2xl md:text-3xl font-medium ">{title}</h1>
        <p className="text-default-text-color font-albert">
          {subtitle}{" "}
          <span className="underline text-text-dark hover:text-blue-700 cursor-pointer" onClick={() => router.push(isLogin ? "signup" : "login")}>
            {subtitleLink}
          </span>
        </p>
      </div>
    );
  };

  const renderFormFields = () => {
    return (
      <div className="flex flex-col gap-6">
        <TextField handleBlur={handleBlur} isPassword={false} touched={touched.email ?? false} handleChange={handleChange} error={errors.email ?? ""} id="email" label="Email" name="email" type="text" value={values.email} login={false} />
        <TextField
          handleBlur={handleBlur}
          isPassword={true}
          touched={touched.password ?? false}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleChange={handleChange}
          error={errors.password ?? ""}
          id="password"
          label="Password"
          name="password"
          type={`${showPassword ? "text" : "password"}`}
          value={values.password}
          login={false}
        />
      </div>
    );
  };

  const renderTermsField = () => {
    return (
      <div className="flex w-full max-w-[340px] p-2 pl-0 mt-7">
        <p className="text-field-label md:text-base text-sm">
          By creating an account, you agree to our {renderUnderlinedText("Terms of use")} and {renderUnderlinedText("Privacy Policy")}
        </p>
      </div>
    );
  };

  return (
    <div className="flex w-full py-10 px-8 justify-center h-screen flex-col lg:items-center">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex lg:items-center lg:justify-center">
          <img src="/svg/logo.svg" alt="" className="lg:w-[109px] lg:h-9 w-[89px] h-7 md:h-8 md:w-[102px]" />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {renderFormHeader()}
          {renderFormFields()}
          {error.length > 0 && <p className="text-red-500 mt-3 text-">{error}</p>}
          {renderTermsField()}
          <Button type="submit" disabled={disabled} className="bg-black text-white" label={buttonLabel} />
          <Button type="button" handleClick={handleClick} label="Sign in with Google" disabled className="bg-white text-black border border-[#bbb]" image="/svg/google.svg" />
        </form>
      </div>
    </div>
  );
};

export default FormContainer;
