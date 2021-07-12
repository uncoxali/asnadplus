import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Button } from "react-bootstrap";
import InputGroupFile from "../../../../../components/InputGroupFile";
import InputGroupDropdown from "../../../../../components/InputGroupDropdown";
import attachmentTypes from "../../../../../global/attachmentTypes";
import axios from "../../../../../boot/axios";
import "./index.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

export default function Dashboard() {
  const userId = useSelector((state) => state.city_class_member.member.id);
  const [data, setData] = useState({
    type: "",
    customer_id: userId,
    "attachments[picture]": "",
  });

  const formControls = [
    {
      tag: InputGroupDropdown,
      label: "نوع سند",
      value: "type",
      props: {
        items: attachmentTypes,
      },
    },
    {
      tag: InputGroupFile,
      label: "فایل",
      value: `name`,
      props: {
        multiple: true,
        onChange: (e) => {
          let fileList = [];
          for (let i = 0; i < e.target.files.length; i++) {
            fileList.push(e.target.files[i]);
          }
          const newData = { ...data };
          newData["attachments[picture]"] = fileList;
          setData(newData);
        },
      },
    },
  ];

  const success = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const error = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    const conditions = data.type.length > 0 && data["attachments[]"] !== "";
    if (conditions) {
      const url = "client/pooldoc";
      const body = new FormData();
      Object.keys(data).forEach((item) => {
        if (item === "attachments[picture]") {
          data[item].map((i) => {
            return body.append(`attachments[picture][]`, i);
          });
        }
        body.append(item, data[item]);
      });
      axios
        .post(url, body)
        .then((res) => {
          if (res.status === 200) {
            success("اسناد شما با موفقیت ارسال گردیده است");
          } else {
            error(res.status);
          }
        })
        .then((err) => console.log(err));
    }
  };

  return (
    <div className="Dashboard">
      <header>
        <label>ارسال سند به صورت آزمایشی</label>
      </header>

      <main>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <Row>
          {formControls.map((item, index) => (
            <Col xs="12" md="6" className="my-1" key={index}>
              {React.createElement(item.tag, {
                label: item.label,
                value: item.value,
                setValue: (value) => {
                  const newData = { ...data };
                  newData[item.value] = value;
                  setData(newData);
                },
                ...item.props,
              })}
            </Col>
          ))}

          <Button onClick={(e) => submit(e)} type="submit" variant="success">
            ثبت
          </Button>
        </Row>
      </main>
    </div>
  );
}

// import React from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// export default function App() {
//   const [file, setFile] = React.useState(null);
//   const { register, handleSubmit } = useForm();
//   // "https://galvanic-tea-272814-default-rtdb.firebaseio.com/file.json",

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("inputFile", data);
//     const res = await axios("https://hamda.ir/api/client/pooldoc", {
//       method: "POST",
//       body: formData,
//     }).then((res) => res.json());
//     alert(JSON.stringify(res));
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input name="inputFile" type="file" {...register("file")} />
//       <select {...register("gender")}>
//         <option value="female">female</option>
//         <option value="male">male</option>
//         <option value="other">other</option>
//       </select>
//       <input type="submit" />
//     </form>
//   );
// }
