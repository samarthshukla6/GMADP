import React from "react";
import Navbar from "@/components/navbar";
import SearchDonation from "@/components/searchdonation";
import { auth } from "@/auth/auth"
import DataTable from "@/components/datatable";

 
  

export default async function Donationslist(): Promise<JSX.Element> {
  return (
    <>
      <div
        className="bg-cover bg-center bg-[#e7e8fc] w-screen h-screen  "
      >
        <Navbar>{}</Navbar>
<div className="translate-y-24 ">
        <SearchDonation></SearchDonation>

        <DataTable></DataTable>
        </div>

      </div>
    </>
  );
}

