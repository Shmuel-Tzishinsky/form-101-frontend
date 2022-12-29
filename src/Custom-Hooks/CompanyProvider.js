import { createContext, useEffect } from "react";
import { axiosInstance } from "../components/config";
import Loading from "../components/loading/Loading";
import { useAsync } from "./useAsync";

export const CompanyContext = createContext([]);

const fatchData = async () => {
  const data = await axiosInstance.post("api/companys/get-company");
  return data;
};

const CompanyProvider = ({ children }) => {
  const { execute, status, value, error } = useAsync(fatchData, false);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <>
      <CompanyContext.Provider value={value?.data?.data}>
        {status === "pending" && <Loading />}
        {status === "success" && children}
        {status === "error" && <div>{error}</div>}
      </CompanyContext.Provider>
    </>
  );
};

export default CompanyProvider;
