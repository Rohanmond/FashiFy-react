import { v4 as uuid } from "uuid";
import bcyrpt from "bcryptjs";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    email: "adarshbalika@gmail.com",
    password: bcyrpt.hashSync("adarshBalika123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@gmail.com",
    password: bcyrpt.hashSync("johnDoe123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
    wishlist:[{
      _id: "f08af0cc-ecdb-4b95-a645-151feebde03c",
      title: "Men Premium Jeans",
      price: "400",
      rating: "4",
      size: "S",
      image:
        "https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2275365/2022/3/9/c61603b5-1c8d-49ea-887f-9d92378469751646808173028-The-Roadster-Lifestyle-Co-Men-White--Pure-Cotton-T-shirt-551-6.jpg",
      category: "Men",
    }],
    cart:[{
      _id: "f08af0cc-ecdb-4b95-a645-151feebde03c",
      title: "Men Premium Jeans",
      price: "400",
      rating: "4",
      size: "S",
      image:
        "https://assets.myntassets.com/f_webp,dpr_2.0,q_60,w_210,c_limit,fl_progressive/assets/images/2275365/2022/3/9/c61603b5-1c8d-49ea-887f-9d92378469751646808173028-The-Roadster-Lifestyle-Co-Men-White--Pure-Cotton-T-shirt-551-6.jpg",
      category: "Men",
    }]
  },
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balak",
    email: "adarshbalak@gmail.com",
    password: bcyrpt.hashSync("adarshBalaki123", 5),
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
