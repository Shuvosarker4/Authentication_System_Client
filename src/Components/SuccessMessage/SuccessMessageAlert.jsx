import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const SuccessMessageAlert = ({ message }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 bg-gradient-to-r from-green-100 to-green-50 border border-green-400 text-green-800 px-5 py-4 rounded-2xl shadow-lg max-w-md w-full"
    >
      <CheckCircle className="w-6 h-6 text-green-600 animate-bounce-slow mt-1" />
      <div className="flex-1">
        <div className="font-semibold text-green-700 text-base mb-0.5">
          Success
        </div>
        <div className="text-sm">{message}</div>
      </div>
    </motion.div>
  );
};

export default SuccessMessageAlert;
