import Image from "next/image";
import { motion } from "framer-motion";
export default function LoadingPage() {
  return (
    <div className="loading-page">
      <motion.div
        initial={{ opacity: 0, rotate:0 }}
        animate={{ opacity:1, rotate:360  }}
        transition={{ duration: 2 }}
      >
        <Image
          className=""
          src={"/loading.png"}
          height={300}
          width={300}
          alt="loading-image"
        />
      </motion.div>
      <div className="bottom-design"></div>
    </div>
  );
}
