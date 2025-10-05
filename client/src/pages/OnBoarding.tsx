import { useOwnerMutation } from "../hooks/useOwnerMutation";
import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();
  const { mutate: ownerMutate } = useOwnerMutation({
    url: "/owner/onboarding",
    onSuccessRedirect: () => navigate("/"),
    invalidateKey: "owner",
  });
  return (
    <div>
      <p>Comming soon</p>
      <button onClick={() => ownerMutate(null)}>
        Change role directly now
      </button>
    </div>
  );
};

export default OnBoarding;
