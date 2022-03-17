import { Plane } from "react-loader-spinner";
import "./Loader.css";
const Loader = ({ visible }) => {
  return (
    <div className="loader">
      <Plane visible={visible} color={"var(--primary-color)"} />
    </div>
  );
};
export default Loader;
