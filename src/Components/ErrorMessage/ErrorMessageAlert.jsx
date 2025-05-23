import { AlertTriangle } from "lucide-react";

const ErrorMessageAlert = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-start gap-3 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md max-w-md w-full">
      <AlertTriangle className="mt-1 w-5 h-5 text-red-600" />
      <div className="flex-1 text-sm">{error}</div>
    </div>
  );
};

export default ErrorMessageAlert;
