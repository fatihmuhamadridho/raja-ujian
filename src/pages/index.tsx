import Default from "@/components/templates/Default/Default";
import { GetServerSideProps } from "next";
import React from "react";

const HomePage = () => {
  return (
    <Default title="Raja Ujian">
      <div></div>
      {/* {listBase?.map((item, index) => {
        return <div key={index}>{item.title}</div>;
      })} */}
    </Default>
  );
};

export default HomePage;
