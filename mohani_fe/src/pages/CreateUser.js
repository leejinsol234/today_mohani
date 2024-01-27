import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phoneNumber: "",
    agree: false,
  });

  const { email, password, confirmPassword, username, phoneNumber, agree } =
    formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/mohani/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("서버 요청 실패:", response.statusText);
      }
    } catch (error) {
      console.error("서버 요청 중 에러 발생:", error);
    }
  };

  return (
    <div className="CreatePage">
      <div className="titleWrap">회원가입</div>
      <div className="contentWrap">
        {[
          { label: "이메일", name: "email" },
          { label: "비밀번호", name: "password" },
          { label: "비밀번호 확인", name: "confirmPassword" },
          { label: "이름", name: "username" },
          { label: "전화번호", name: "phoneNumber" },
        ].map((field) => (
          <div key={field.name}>
            <div className="CreateInputTitle">{field.label}</div>
            <div className="CreateInputWrap">
              <input
                type="text"
                className="CreateInput"
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                name={field.name}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="AgreeBoxWrap">
        <input
          type="checkbox"
          className="CreateAgreeBox"
          checked={agree}
          onChange={handleChange}
          name="agree"
        />
        이용약관 및 개인정보 처리방침에 동의합니다.
      </div>
      <div>
        <button onClick={handleSubmit} className="CreateAddButton">
          회원가입
        </button>
      </div>
      <div className="CreateFooter">
        <div className="CreateFooter1">이미 계정이 있으신가요?</div>
        <Link to={"/"} className="CreateFooter2">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default CreateUser;
