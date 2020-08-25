import React, { useState } from "react";
import { useRequest } from "../../hooks/use-request";
import { useRouter } from "next/router";

const NewTicket = ({ client }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    method: "post",
    url: "/api/tickets",
    body: { title, price },
    onSuccess: () => {
      router.push("/");
    },
  });

  const onBlur = () => {
    const prc = parseFloat(price); // 12.0001
    if (isNaN(prc)) {
      return setPrice("");
    }

    setPrice(prc.toFixed(2));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div>
      <h1>Create a ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            value={price}
            onBlur={onBlur}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Submits</button>
      </form>
    </div>
  );
};

export default NewTicket;
