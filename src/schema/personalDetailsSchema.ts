import * as yup from "yup"

export const personalDetailsSchema = yup.object().shape({
    username:yup.string().required("Required").min(4,"Username should be atleast 4 characters"),
    phone:yup.number().optional().typeError("It says Phone number, cant you read")
})
