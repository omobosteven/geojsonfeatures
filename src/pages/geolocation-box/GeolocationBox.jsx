import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styled from "@emotion/styled";
import { InputField } from "pages/geolocation-box/common/InputField";
import { schema } from "utilities/inputValdation";

export const GeolocationBox = ({ getData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const bbox = `${data.minLong},${data.minLat},${data.maxLong},${data.maxLat}`;
    await getData(bbox);
  };

  return (
    <StyledFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <InputField
          name="minLong"
          label="min longitude"
          register={register}
          error={errors.minLong?.message}
        />
        <InputField
          name="minLat"
          label="min latitude"
          register={register}
          error={errors.minLat?.message}
        />
        <InputField
          name="maxLong"
          label="max longitude"
          register={register}
          error={errors.maxLong?.message}
        />
        <InputField
          name="maxLat"
          label="max latitude"
          register={register}
          error={errors.maxLat?.message}
        />
        <div className="form-btn-group">
          <button type="submit" className="btn btn-submit">
            Search
          </button>
          <button
            type="button"
            className="btn btn-clear"
            onClick={() => reset()}
          >
            Clear
          </button>
        </div>
      </form>
    </StyledFormContainer>
  );
};

const StyledFormContainer = styled.div({
  borderRadius: "8px",
  boxShadow: "0 0 0 1px rgb(114 140 149 / 10%), 0 2px 8px rgb(7 39 49 / 8%)",
  border: "1px solid #EBECF0",
  padding: "16px 8px 20px",
  width: "100%",
  maxWidth: "990px",
  margin: "40px auto 20px",

  "& .form": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    width: "100%",
    columnGap: "12px",
    rowGap: "20px",

    "&-btn-group": {
      flexGrow: 1,
      width: "100%",
      display: "flex",
      justifyContent: "center",
      columnGap: "24px",
      rowGap: "24px",
      flexWrap: "wrap",
      marginTop: "20px",
    },

    "& .btn": {
      borderRadius: "6px",
      border: "none",
      fontSize: "14px",
      padding: "1em 3em",
      fontWeight: 600,
      cursor: "pointer",

      "&:hover": {
        filter: "brightness(0.95)",
      },

      "&-submit": {
        backgroundColor: "#157390",
        color: "#FFF",
      },

      "&-clear": {
        backgroundColor: "#F3F7F8",
        color: "#267390",
      },
    },
  },
});
