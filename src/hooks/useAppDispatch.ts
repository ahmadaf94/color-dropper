import { useDispatch } from "react-redux";
import type { AppDispatch } from "../stores";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default useAppDispatch;
