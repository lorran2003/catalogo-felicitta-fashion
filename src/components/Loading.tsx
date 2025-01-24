import { faC } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <span className="animate-spin">
        <FontAwesomeIcon icon={faC} size="2xl" color="#f76382" />
      </span>
    </div>
  )
}
