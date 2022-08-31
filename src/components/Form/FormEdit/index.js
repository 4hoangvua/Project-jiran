import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorSpan } from "~/components/Sign/SignElement";
import { Editor } from "@tinymce/tinymce-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import {
  Form,
  Label,
  InputName,
  Select,
  Option,
} from "~/Page/CreateProject/CreateProjectElement";
import { useDispatch, useSelector } from "react-redux";
import { submitModal } from "~/reducers/modal";
import {
  editProject,
  getAllProject,
  getAllProjectCategory,
} from "~/reducers/projectCategory";
const FormEdit = ({ project }) => {
  const { allProjectCategory } = useSelector((state) => state.category);
  const dispatch = useDispatch();
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
      id: Number(project.id),
      projectName: project.projectName,
      categoryId: project.categoryId,
      description: project.description,
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const handleEditorChange = (content, editor) => {
    setValue("description", content);
  };
  // const onSubmit = (values) => {
  //   console.log(values);
  // };
  useEffect(() => {
    dispatch(submitModal({ submitFunction: handleSubmit(onSubmit) }));
    dispatch(getAllProjectCategory());
  }, []);
  const onSubmit = async (values) => {
    try {
      await dispatch(editProject(values));
      await dispatch(getAllProject());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>Id:{project.id}</Label>
      <Label>Name:</Label>
      <InputName
        {...register("projectName")}
        type="text"
        placeholder="Name project"
        name="projectName"
        style={{ padding: "5px" }}
      />
      {errors.projectName && (
        <ErrorSpan>{errors.projectName?.message}</ErrorSpan>
      )}
      <Label>Description:</Label>
      <Editor
        initialValue={project.description}
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
      <Select
        {...register("categoryId")}
        name="categoryId"
        defaultValue={project.categoryId}
        className="text-dark"
      >
        {allProjectCategory.map((category, index) => {
          return (
            <Option value={category.id} key={index} className="text-dark">
              {category.projectCategoryName}
            </Option>
          );
        })}
      </Select>
    </Form>
  );
};

export default FormEdit;
