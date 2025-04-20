import Authcomponent from "../components/authcomponent";
import Quote from "../components/quote";

export default function Signin() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Authcomponent type={"signin"} />
        </div>
        <Quote type={"signin"} />
      </div>
    </div>
  );
}
