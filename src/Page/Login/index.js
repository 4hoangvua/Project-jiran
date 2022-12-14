import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import {
  CLogin,
  LoginEmail,
  LogoEmail,
  Email,
  LoginPassword,
  LogoPassword,
  Password,
  ButtonLogin,
  SingUp,
} from "./LoginElement";
import { Form, Title, ErrorSpan, Footer } from "~/components/Sign/SignElement";
import { useDispatch } from "react-redux";
import { loginUser } from "~/reducers/login";
import { useNavigate } from "react-router-dom";
import { theme } from "~/GlobalStyles";
const Login = () => {
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
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(loginUser(values)).then((m) => {
      setLoading(true);
      if (typeof m.payload === "object") {
        navigate("/");
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    });
  };
  return (
    <CLogin>
      <Title>Login</Title>
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
          {errors.passWord && <ErrorSpan>{errors.passWord?.message}</ErrorSpan>}
        </LoginPassword>
        <ButtonLogin disabled={isLoading} bg={theme.bg.third}>
          {isLoading ? "Sign In..." : "Sign In"}
        </ButtonLogin>
      </Form>
      <Footer>
        Don't have account yet?
        <SingUp to="/register"> Signup now</SingUp>
      </Footer>
    </CLogin>
  );
};

export default Login;
