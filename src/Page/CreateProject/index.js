import React, { useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import {
  ContainerCreateProject,
  Title,
  Form,
  Label,
  InputName,
  Select,
  Option,
  ButtonCreate,
  CButton,
} from "./CreateProjectElement";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectAuthorize,
  getAllProjectCategory,
} from "~/reducers/projectCategory";
import { useForm } from "react-hook-form";
import { ErrorSpan } from "~/components/Sign/SignElement";
import { theme } from "~/GlobalStyles";
import { useNavigate } from "react-router-dom";
const CreateProject = () => {
  const { allProjectCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllProjectCategory());
  }, []);

  const schema = object().shape({
    projectName: string()
      .required("* Tên không được bỏ trống.")
      .matches(
        /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ0-9 ]{2,}$/,
        "Tên chỉ gồm chữ hoa, thường, số không có ký tự đặc biệt, ít nhất 2 kí tự"
      ),
    categoryId: string(),
    description: string(),
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      projectName: "",
      categoryId: 1,
      description: "",
    },
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const handleEditorChange = (content, editor) => {
    setValue("description", content);
  };
  const onSubmit = async (values) => {
    try {
      await dispatch(createProjectAuthorize(values)).unwrap();
      navigate("/management");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ContainerCreateProject>
      <Title>Create Project</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name:</Label>
        <InputName
          {...register("projectName")}
          type="text"
          placeholder="Name project"
          name="projectName"
        />
        {errors.projectName && (
          <ErrorSpan>{errors.projectName?.message}</ErrorSpan>
        )}
        <Label>Description:</Label>
        <Editor
          initialValue=""
          init={{
            height: 200,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={handleEditorChange}
        />
        <Label>Project category:</Label>
        <Select {...register("categoryId")} name="categoryId">
          {allProjectCategory.map((category, index) => {
            return (
              <Option value={category.id} key={index}>
                {category.projectCategoryName}
              </Option>
            );
          })}
        </Select>
        <CButton>
          <ButtonCreate bg={theme.bg.third}>Create</ButtonCreate>
        </CButton>
      </Form>
    </ContainerCreateProject>
  );
};

export default CreateProject;
