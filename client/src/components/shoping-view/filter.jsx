import { filterOption } from "@/config";
import React, { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

export default function ProductFilter({ filters, setFilters, handleFilter }) {
  return (
    <div className="bg-background rounded-lg shadow-sm ">
      <div className="p-4 border-b ">
        <h2 className="text-lg font-extrabold">filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOption).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold ">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOption[keyItem].map((option) => (
                  <Label
                    key={option.label}
                    className="flex items-center gap-2 font-medium "
                  >
                    <Checkbox
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      //its cehcking if filters exist , and if keys are of obejct exist, will check if the particular keyItem Section exist and if we are checking if the clicked items index if its greater than -1 meants we are clicking.
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
