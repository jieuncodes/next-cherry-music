import { Spinner } from "@nextui-org/react";

function LoadingSpinner({ ...props }) {
  return (
    <div
      className="w-full h-full flex justify-center align-middle pr-12"
      {...props}
    >
      <Spinner color="danger" />
    </div>
  );
}

export default LoadingSpinner;
