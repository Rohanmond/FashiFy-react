import { Plane } from "react-loader-spinner";
import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <Plane color={"var(--primary-color)"} />
    </div>
  );
};
export default Loader;
