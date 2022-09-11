import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import {
  CLogin,
  LoginName,
  LogoName,
  Name,
  LoginPassword,
  LogoPassword,
  Password,
  ButtonLogin,
  SingIn,
  LoginEmail,
  LoginPhoneNumber,
  Email,
  PhoneNumber,
  LogoEmail,
  LogoPhoneNumber,
} from "./RegisterElement";
import { Form, Title, ErrorSpan, Footer } from "~/components/Sign/SignElement";

import { useDispatch } from "react-redux";
import { registerUser } from "~/reducers/login";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const schema = object().shape({
    email: string()
      .required("Email không được để trống")
      .email("Email không đúng định dạng"),
    passWord: string()
      .required("* Mật khẩu không được để trống")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "* Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự"
      ),
    name: string()
      .required("* Tên không được bỏ trống.")
      .matches(
        /^[a-zA-Z0-9_]{2,}$/,
        "Tên chỉ gồm chữ hoa, thường, số, ít nhất 2 kí tự"
      ),
    phoneNumber: string()
      .required("* SDT không được để trống")
      .matches(/^[0-9]+$/, "* Chỉ dùng số")
      .min(10, "* ít nhất 10 số")
      .max(11, "* Tối đa 11 số"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const onSubmit = (values) => {
    dispatch(registerUser(values)).then((value) => {
      setLoading(true);
      if (typeof value.payload === "object") {
        navigate("/login");
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };
  // useEffect(()=>{

  // },[isLoading])
  return (
    <CLogin>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <LoginEmail>
          <LogoEmail />
          <Email type="email" placeholder="Email" {...register("email")} />
        </LoginEmail>
        {errors.email && <ErrorSpan>{errors.email?.message}</ErrorSpan>}
        <LoginPassword>
          <LogoPassword />
          <Password
            type="password"
            placeholder="Passord"
            {...register("passWord")}
          />
        </LoginPassword>
        {errors.passWord && <ErrorSpan>{errors.passWord?.message}</ErrorSpan>}
        <LoginName>
          <LogoName />
          <Name type="text" placeholder="UserName" {...register("name")} />
        </LoginName>
        {errors.name && <ErrorSpan>{errors.name?.message}</ErrorSpan>}
        <LoginPhoneNumber>
          <LogoPhoneNumber />
          <PhoneNumber
            type="text"
            placeholder="Phone number"
            {...register("phoneNumber")}
          />
        </LoginPhoneNumber>
        {errors.phoneNumber && (
          <ErrorSpan>{errors.phoneNumber?.message}</ErrorSpan>
        )}
        <ButtonLogin disabled={isLoading}>
          {isLoading ? "Sign Up..." : "Sign Up"}
        </ButtonLogin>
      </Form>
      <Footer>
        Don't have taiKhoan yet?
        <SingIn to="/login"> Signin now</SingIn>
      </Footer>
    </CLogin>
  );
};

export default Register;
