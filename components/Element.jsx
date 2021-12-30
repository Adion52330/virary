import { Rating } from "@mui/material";
import { useState } from "react";
import Button from "@mui/material/Button";
import Head from "next/head";

const Element = ({ title, author, genre, rating, img, deleteDoc, id }) => {
  return (
    <div className="bg-main-blue text-white rounded-xl w-full lg:w-[30%] md:w-[45%]">
      <Head>
        <link
          rel="stylesheet"
          href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
          crossorigin="anonymous"
        />
      </Head>
      <img
        src={img}
        className="w-full rounded-xl rounded-br-none rounded-bl-none"
        alt=""
      />
      <div className="p-5 flex flex-col space-y-2">
        <h1 className="text-xl font-bold">{title}</h1>
        <p>
          <b>Author: </b> {author}
        </p>
        <p>
          <b>Genre: </b> {genre}
        </p>
        <div className="flex items-center justify-between">
          <Rating
            name="size-small"
            precision={0.5}
            readOnly
            value={rating}
            defaultValue={4.5}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default Element;
