import { number, object, ref, setLocale } from "yup";

setLocale({
  number: {
    min: ({ min }) => `should be greater than ${min}`,
    max: ({ max }) => `should be lesser than ${max}`,
    moreThan: ({ more }) => `should be greater than ${more}`,
  },
});

const customNumber = number("Field must be a number").typeError(
  "Enter a valid number"
);

export const schema = object({
  minLong: customNumber.required().min(-180).max(180),
  minLat: customNumber.required().min(-90).max(90),
  maxLong: customNumber
    .required()
    .min(-180)
    .max(180)
    .when("minLong", {
      is: (value) => !Number.isNaN(value),
      then: customNumber.moreThan(ref("minLong")),
    })
    .moreThan(ref("minLong")),
  maxLat: customNumber
    .required()
    .min(-90)
    .max(90)
    .when("minLat", {
      is: (value) => !Number.isNaN(value),
      then: customNumber.moreThan(ref("minLat")),
    }),
});
