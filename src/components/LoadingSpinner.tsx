import { Spinner } from "@nextui-org/react";

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center align-middle pr-12">
      <Spinner color="danger" />
    </div>
  );
}

export default LoadingSpinner;
