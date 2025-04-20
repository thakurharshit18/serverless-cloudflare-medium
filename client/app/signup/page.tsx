import Authcomponent from "../components/authcomponent";
import Quote from "../components/quote";

export default function Signup() {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Authcomponent type={"signup"} />
        </div>
        <Quote type={"signup"} />
      </div>
    </div>
  );
}
