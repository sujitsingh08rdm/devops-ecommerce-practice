import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  // console.log(selectedId, addressInfo, "address");

  return (
    <Card
      onClick={() => {
        setCurrentSelectedAddress
          ? setCurrentSelectedAddress(addressInfo)
          : null;
      }}
      className={`cursor-pointer  ${
        selectedId?._id === addressInfo?._id ? "border-red-700" : "border-black"
      }`}
    >
      <CardContent className={"grid p-4 gap-4"}>
        <Label>Address : {addressInfo?.address}</Label>
        <Label>City : {addressInfo?.city}</Label>
        <Label>Pincode : {addressInfo?.pincode}</Label>
        <Label>Phone : {addressInfo?.phone}</Label>
        <Label>Notes : {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
